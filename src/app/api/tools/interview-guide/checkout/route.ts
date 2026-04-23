import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/payment";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { generationId, locale } = await req.json();

    if (!generationId) {
      return NextResponse.json({ error: "Missing generationId" }, { status: 400 });
    }

    const generation = await db.toolGeneration.findUnique({
      where: { id: generationId },
    });

    if (!generation || generation.isPaid) {
      return NextResponse.json({ error: "Invalid or already paid" }, { status: 400 });
    }

    // Claim the generation for this user if anonymous
    if (!generation.userId) {
      await db.toolGeneration.update({
        where: { id: generationId },
        data: { userId },
      });
    }

    const result = await createCheckoutSession({
      generationId,
      userId,
      userEmail: session.user.email ?? null,
      locale: locale || "en",
      amount: 4900,         // R49 in cents
      currency: "ZAR",
      productName: "Premium Interview Guide",
      productDescription: "AI-generated tailored interview questions and best-practice answers.",
    });

    return NextResponse.json({ url: result.url });
  } catch (error: unknown) {
    console.error("[checkout]", error);
    const message = error instanceof Error ? error.message : "Internal Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
