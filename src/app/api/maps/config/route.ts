import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const key =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY ??
    process.env.GOOGLE_PLACES_API_KEY ??
    "";

  return NextResponse.json(
    { key },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
