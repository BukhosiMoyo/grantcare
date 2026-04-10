import { Prisma } from "@prisma/client";
import { z } from "zod";

import { canQueryDatabase, isRecoverableDatabaseError, markDatabaseUnavailable } from "@/lib/database-readiness";
import { db } from "@/lib/prisma";
import { isDatabaseConfigured, isProductionServer } from "@/lib/server-env";
import { LOCALES, type Locale, isLocale } from "@/lib/site";

export const ANALYTICS_EVENT_NAMES = [
  "account.login",
  "account.password_reset_completed",
  "account.signup",
  "guide.viewed",
  "language.changed",
  "monetization.clicked",
  "official_resource.clicked",
  "page.viewed",
  "payment_date.viewed",
  "preference.grant_type_saved",
  "reminder.signup",
  "reminder.unsubscribe",
  "reminder.update",
  "status.viewed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

const localeCodes = LOCALES.map((entry) => entry.code) as [Locale, ...Locale[]];

export const analyticsEventSchema = z.object({
  name: z.enum(ANALYTICS_EVENT_NAMES),
  locale: z.enum(localeCodes).optional(),
  path: z.string().trim().max(300).optional(),
  payload: z.record(z.string(), z.any()).optional(),
});

type AnalyticsPayload = Record<string, Prisma.JsonValue>;

export async function trackServerEvent(input: {
  name: AnalyticsEventName;
  locale?: Locale | null;
  path?: string | null;
  userId?: string | null;
  payload?: AnalyticsPayload;
}) {
  if (!isDatabaseConfigured()) {
    return;
  }

  if (!(await canQueryDatabase())) {
    return;
  }

  try {
    await db.analyticsEvent.create({
      data: {
        name: input.name,
        locale: input.locale ?? undefined,
        path: input.path ?? undefined,
        userId: input.userId ?? undefined,
        payload: input.payload as Prisma.InputJsonValue | undefined,
      },
    });
  } catch (error) {
    if (isRecoverableDatabaseError(error)) {
      markDatabaseUnavailable();
      return;
    }

    if (!isProductionServer()) {
      console.error("Analytics event failed", error);
    }
  }
}

export function getAnalyticsLocale(value: string | null | undefined): Locale | undefined {
  return value && isLocale(value) ? value : undefined;
}
