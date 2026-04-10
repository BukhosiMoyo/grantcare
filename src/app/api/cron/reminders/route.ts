import { NextResponse } from "next/server";

import { processDueReminderJobs } from "@/lib/reminders";
import {
  canRunReminderProcessing,
  getCronSecret,
  isProductionServer,
} from "@/lib/server-env";

export const runtime = "nodejs";

export async function GET(request: Request) {
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
        reason: "Reminder processing is not configured.",
      },
      { status },
    );
  }

  const result = await processDueReminderJobs();
  console.info("Reminder cron processed", result);
  return NextResponse.json({ ok: true, result });
}
