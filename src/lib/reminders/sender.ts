import type { Prisma } from "@prisma/client";

import { ReminderEmail, getReminderSubject } from "@/emails/reminder-email";
import { getResendClient } from "@/lib/resend";
import { parseReminderPayload } from "@/lib/reminders/payload";
import { createReminderUnsubscribeToken } from "@/lib/reminders/unsubscribe";
import { isReminderEmailConfigured } from "@/lib/server-env";
import { SITE_URL, buildLocalePath } from "@/lib/site";

export type ReminderJobForSend = Prisma.ReminderJobGetPayload<{
  include: {
    grantType: true;
    paymentDateEntry: {
      include: {
        period: true;
      };
    };
    subscription: true;
    user: true;
  };
}>;

function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export async function sendReminderEmail(job: ReminderJobForSend) {
  const payload = parseReminderPayload(job.payload);

  if (!payload) {
    throw new Error("Reminder payload is missing.");
  }

  if (!job.subscriptionId) {
    throw new Error("Reminder subscription is missing.");
  }

  if (!isReminderEmailConfigured()) {
    throw new Error("Reminder email is not configured.");
  }

  const resend = getResendClient();
  if (!resend) {
    throw new Error("Reminder email client is not available.");
  }

  const unsubscribeUrl = toAbsoluteUrl(
    buildLocalePath(payload.locale, `/unsubscribe?token=${createReminderUnsubscribeToken({
      email: job.user.email,
      locale: payload.locale,
      subscriptionId: job.subscriptionId ?? "",
    })}`),
  );

  const { data, error } = await resend.emails.send(
    {
      from: process.env.REMINDER_FROM_EMAIL as string,
      to: job.user.email,
      subject: getReminderSubject(payload.locale, payload.grantName),
      react: ReminderEmail({
        dashboardUrl: toAbsoluteUrl(buildLocalePath(payload.locale, "/dashboard")),
        grantName: payload.grantName,
        locale: payload.locale,
        note: payload.note,
        officialUrl: payload.officialHref,
        paymentDate: payload.paymentDate,
        paymentPageUrl: toAbsoluteUrl(payload.paymentPagePath),
        trigger: job.trigger,
        unsubscribeUrl,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `reminder-job-${job.id}`,
      },
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return data?.id ?? null;
}
