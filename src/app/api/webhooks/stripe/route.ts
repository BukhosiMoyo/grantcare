import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyPaymentWebhook } from "@/lib/payment";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("x-webhook-signature") 
    ?? headersList.get("stripe-signature")
    ?? headersList.get("x-payfast-signature")
    ?? null;

  try {
    const result = await verifyPaymentWebhook(body, signature);

    if (!result) {
      return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
    }

    const { generationId, userId, amount } = result;

    await db.$transaction(async (tx) => {
      await tx.toolGeneration.update({
        where: { id: generationId },
        data: { isPaid: true },
      });

      await tx.purchase.create({
        data: {
          userId,
          toolGenerationId: generationId,
          stripeSessionId: `payment_${Date.now()}`, // generic session ID — rename column when migrating
          amount,
          status: "completed",
        }
      });
    });

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("[webhook]", error);
    const message = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
