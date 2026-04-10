import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { analyticsEventSchema, getAnalyticsLocale, trackServerEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const session = await auth();

  await trackServerEvent({
    name: parsed.data.name,
    locale: getAnalyticsLocale(parsed.data.locale),
    path: parsed.data.path,
    payload: parsed.data.payload,
    userId: session?.user?.id ?? undefined,
  });

  return NextResponse.json({ ok: true });
}
