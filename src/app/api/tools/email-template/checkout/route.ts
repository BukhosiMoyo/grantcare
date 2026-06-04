import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/payment";
import { db } from "@/lib/prisma";
import { auth } from "@/auth";
import { getEmailTemplateApiCopy, getRequestLocale } from "../copy";

export async function POST(req: Request) {
  try {
    const copy = getEmailTemplateApiCopy(getRequestLocale(req));
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: copy.unauthorized }, { status: 401 });
    }

    const { generationId, locale } = await req.json();

    if (!generationId) {
      return NextResponse.json({ error: copy.missingGenerationId }, { status: 400 });
    }

    const generation = await db.toolGeneration.findUnique({
      where: { id: generationId },
    });

    if (!generation || generation.isPaid) {
      return NextResponse.json({ error: copy.invalidPaid }, { status: 400 });
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
      amount: 1900,         // R19 in cents
      currency: "ZAR",
      productName: copy.productName,
      productDescription: copy.productDescription,
    });

    return NextResponse.json({ url: result.url });
  } catch (error: unknown) {
    console.error("[checkout]", error);
    const message = error instanceof Error ? error.message : getEmailTemplateApiCopy("en").internalError;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
