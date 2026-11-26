"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth-guards";
import { interestSchema } from "@/lib/interest-schema";
import { saveInterest, withdrawInterest, changeInterestStatus, isInterestCaptureEnabled, InterestRateLimitError } from "@/lib/interests";
import { isLocale } from "@/lib/site";

export type InterestActionState = {
  error?: string;
  success?: boolean;
  withdrawalCode?: string | null;
  fieldErrors?: Partial<Record<"topic" | "contactValue" | "consent", string>>;
};

export async function submitInterestAction(_previous: InterestActionState, data: FormData): Promise<InterestActionState> {
  if (!isInterestCaptureEnabled()) return { error: "We're not taking requests just yet. Please try again later." };
  const parsed = interestSchema.safeParse({
    topic: data.get("topic"), contactChannel: data.get("contactChannel"), contactValue: data.get("contactValue"),
    consent: data.get("consent") === "on", website: data.get("website") ?? "", sourcePath: data.get("sourcePath"),
  });
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { error: "Please check the form and try again.", fieldErrors: { topic: errors.topic?.[0], contactValue: errors.contactValue?.[0], consent: errors.consent?.[0] } };
  }
  const requestHeaders = await headers();
  // On Vercel this header is set by the platform; never store the raw value.
  const address = process.env.VERCEL === "1"
    ? requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    : "local-or-unconfigured-proxy";
  try {
    const result = await saveInterest(parsed.data, address);
    revalidatePath("/admin/interests");
    return { success: true, ...result };
  } catch (error) {
    return { error: error instanceof InterestRateLimitError
      ? "Too many requests. Please try again later."
      : "We couldn't save your interest. Please try again later." };
  }
}

export async function withdrawInterestAction(_previous: InterestActionState, data: FormData): Promise<InterestActionState> {
  const token = z.string().regex(/^[a-f0-9]{48}$/).safeParse(String(data.get("code") ?? "").trim());
  if (!token.success) return { error: "Enter the withdrawal code shown when you submitted your interest." };
  try {
    await withdrawInterest(token.data);
    revalidatePath("/admin/interests");
    return { success: true };
  } catch {
    return { error: "We couldn't process this request. Please try again later." };
  }
}

export async function updateInterestStatusAction(data: FormData) {
  const requestedLocale = String(data.get("locale"));
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const admin = await requireAdmin(locale, "/admin/interests");
  const parsed = z.object({ id: z.string().cuid(), status: z.enum(["contacted", "confirmed", "withdrawn"]), confirmation: z.literal("on") }).safeParse({ id: data.get("id"), status: data.get("status"), confirmation: data.get("confirmation") });
  if (!parsed.success) return;
  await changeInterestStatus(parsed.data.id, parsed.data.status, admin.id);
  revalidatePath("/admin/interests");
}
