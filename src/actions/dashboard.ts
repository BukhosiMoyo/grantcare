"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { trackServerEvent } from "@/lib/analytics";
import { requireUser } from "@/lib/auth-guards";
import { buildLocalePath, isLocale } from "@/lib/site";
import { syncReminderJobsForSubscription } from "@/lib/reminders";
import {
  getReminderSubscription,
  toggleSavedGuide,
  updateUserProfile,
  upsertReminderSubscription,
} from "@/lib/users";
import { profileSchema, reminderSubscriptionSchema } from "@/lib/validation";

function getLocale(value: FormDataEntryValue | null) {
  return typeof value === "string" && isLocale(value) ? value : "en";
}

function buildRedirect(path: string, params: Record<string, string | null | undefined>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  return `${path}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
}

export async function updateProfileAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const user = await requireUser(locale, buildLocalePath(locale, "/dashboard"));

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    preferredLocale: formData.get("preferredLocale"),
    preferredGrantTypeId:
      typeof formData.get("preferredGrantTypeId") === "string" &&
      String(formData.get("preferredGrantTypeId")).trim().length > 0
        ? String(formData.get("preferredGrantTypeId"))
        : null,
  });

  if (!parsed.success) {
    redirect(
      buildRedirect(buildLocalePath(locale, "/dashboard"), {
        error: "Check your profile details and try again.",
      }),
    );
  }

  try {
    await updateUserProfile({
      userId: user.id,
      ...parsed.data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect(
        buildRedirect(buildLocalePath(locale, "/dashboard"), {
          error: "That email is already in use.",
        }),
      );
    }

    throw error;
  }

  if (user.preferredLocale !== parsed.data.preferredLocale) {
    await trackServerEvent({
      name: "language.changed",
      locale: parsed.data.preferredLocale,
      path: buildLocalePath(locale, "/dashboard"),
      payload: {
        nextLocale: parsed.data.preferredLocale,
        previousLocale: user.preferredLocale,
      },
      userId: user.id,
    });
  }

  if (user.preferredGrantTypeId !== parsed.data.preferredGrantTypeId) {
    await trackServerEvent({
      name: "preference.grant_type_saved",
      locale,
      path: buildLocalePath(locale, "/dashboard"),
      payload: {
        nextGrantTypeId: parsed.data.preferredGrantTypeId,
        previousGrantTypeId: user.preferredGrantTypeId,
      },
      userId: user.id,
    });
  }

  revalidatePath(buildLocalePath(locale, "/dashboard"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/dashboard"), {
      message: "Profile updated.",
    }),
  );
}

export async function updateReminderSubscriptionAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const user = await requireUser(locale, buildLocalePath(locale, "/dashboard"));

  const parsed = reminderSubscriptionSchema.safeParse({
    grantTypeId: formData.get("grantTypeId"),
    active: formData.get("active") === "on",
    oneDayBefore: formData.get("oneDayBefore") === "on",
    twoDaysBefore: formData.get("twoDaysBefore") === "on",
    onPublish: formData.get("onPublish") === "on",
  });

  if (!parsed.success) {
    redirect(
      buildRedirect(buildLocalePath(locale, "/dashboard"), {
        error: "Check the reminder settings and try again.",
      }),
    );
  }

  const existingSubscription = await getReminderSubscription(user.id, parsed.data.grantTypeId);
  const subscription = await upsertReminderSubscription({
    userId: user.id,
    ...parsed.data,
  });

  await syncReminderJobsForSubscription(subscription.id);

  const reminderEventName =
    (!existingSubscription || !existingSubscription.active) && parsed.data.active
      ? "reminder.signup"
      : "reminder.update";

  await trackServerEvent({
    name: reminderEventName,
    locale,
    path: buildLocalePath(locale, "/dashboard"),
    payload: {
      active: parsed.data.active,
      grantTypeId: parsed.data.grantTypeId,
      onPublish: parsed.data.onPublish,
      oneDayBefore: parsed.data.oneDayBefore,
      twoDaysBefore: parsed.data.twoDaysBefore,
    },
    userId: user.id,
  });

  revalidatePath(buildLocalePath(locale, "/dashboard"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/dashboard"), {
      message: "Reminder settings updated.",
    }),
  );
}

export async function toggleSavedGuideAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  const returnPath =
    typeof formData.get("returnPath") === "string" && String(formData.get("returnPath")).length > 0
      ? String(formData.get("returnPath"))
      : buildLocalePath(locale, "/guides");

  const user = await requireUser(locale, returnPath);
  const guideId =
    typeof formData.get("guideId") === "string" ? String(formData.get("guideId")) : "";

  if (!guideId) {
    redirect(returnPath);
  }

  await toggleSavedGuide({
    userId: user.id,
    guideId,
  });

  revalidatePath(buildLocalePath(locale, "/dashboard"));
  revalidatePath(returnPath);
  redirect(returnPath);
}
