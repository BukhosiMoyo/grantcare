import type { Prisma } from "@prisma/client";

import { getMonthSlugFromNumber } from "@/lib/fallback-content";
import { buildLocalePath, type Locale } from "@/lib/site";

export type ReminderPayload = {
  grantName: string;
  paymentDate: string | null;
  note: string | null;
  paymentPagePath: string;
  officialHref: string;
  locale: Locale;
};

export function buildReminderPaymentPath(input: {
  grantSlug: string;
  locale: Locale;
  month: number;
  year: number;
}) {
  const monthSlug = getMonthSlugFromNumber(input.month);
  return buildLocalePath(
    input.locale,
    `/payment-dates/${input.year}/${monthSlug}/${input.grantSlug}`,
  );
}

export function buildReminderPayload(input: ReminderPayload): Prisma.InputJsonObject {
  return {
    grantName: input.grantName,
    paymentDate: input.paymentDate,
    note: input.note,
    paymentPagePath: input.paymentPagePath,
    officialHref: input.officialHref,
    locale: input.locale,
  };
}

export function parseReminderPayload(value: unknown): ReminderPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const payload = value as Record<string, unknown>;

  if (
    typeof payload.grantName !== "string" ||
    typeof payload.paymentPagePath !== "string" ||
    typeof payload.officialHref !== "string" ||
    typeof payload.locale !== "string"
  ) {
    return null;
  }

  return {
    grantName: payload.grantName,
    paymentDate: typeof payload.paymentDate === "string" ? payload.paymentDate : null,
    note: typeof payload.note === "string" ? payload.note : null,
    paymentPagePath: payload.paymentPagePath,
    officialHref: payload.officialHref,
    locale: payload.locale as Locale,
  };
}
