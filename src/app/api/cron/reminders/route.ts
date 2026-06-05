import { NextResponse } from "next/server";

import { processDueAppealReminderJobs } from "@/lib/appeal-reminders";
import { processDueReminderJobs } from "@/lib/reminders";
import {
  canRunReminderProcessing,
  getCronSecret,
  isProductionServer,
} from "@/lib/server-env";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/site";

export const runtime = "nodejs";

const CRON_REMINDER_COPY: Partial<Record<Locale, { processingNotConfigured: string }>> = {
  en: {
    processingNotConfigured: "Reminder processing is not configured.",
  },
  zu: {
    processingNotConfigured: "Ukucubungula izikhumbuzi akulungiselelwe.",
  },
};

function getCronReminderCopy(locale: Locale) {
  return CRON_REMINDER_COPY[locale] ?? (CRON_REMINDER_COPY.en as { processingNotConfigured: string });
}

function getRequestLocale(request: Request): Locale {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  for (const entry of acceptLanguage.split(",")) {
    const language = entry.split(";")[0]?.trim().toLowerCase();
    const locale = language?.split("-")[0];

    if (isLocale(locale)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export async function GET(request: Request) {
  const copy = getCronReminderCopy(getRequestLocale(request));
  const cronSecret = getCronSecret();

  if (isProductionServer() && !cronSecret) {
    console.error("Cron secret missing in production.");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  if (cronSecret) {
    const authorization = request.headers.get("authorization");

    if (authorization !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  if (!canRunReminderProcessing()) {
    const status = isProductionServer() ? 503 : 200;
    return NextResponse.json(
      {
        ok: !isProductionServer(),
        reason: copy.processingNotConfigured,
      },
      { status },
    );
  }

  const [paymentResult, appealResult] = await Promise.all([
    processDueReminderJobs(),
    processDueAppealReminderJobs(),
  ]);
  console.info("Reminder cron processed", { appealResult, paymentResult });
  return NextResponse.json({ ok: true, result: { appeal: appealResult, payment: paymentResult } });
}
