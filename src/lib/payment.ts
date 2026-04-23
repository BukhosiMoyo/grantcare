import "server-only";

/**
 * Payment Gateway Abstraction
 * 
 * Currently a placeholder — swap this implementation when your
 * SA-compatible payment gateway is ready (PayFast, Yoco, Paystack, etc.)
 * 
 * The rest of the app only calls createCheckoutSession() and
 * handlePaymentWebhook() — so you only need to update this file.
 */

export type CheckoutParams = {
  generationId: string;
  userId: string;
  userEmail: string | null;
  locale: string;
  amount: number;       // in cents (e.g. 4900 = R49)
  currency: string;     // e.g. "ZAR"
  productName: string;
  productDescription: string;
};

export type CheckoutResult = {
  url: string;          // redirect URL to payment page
  sessionId: string;    // payment provider session/reference ID
};

/**
 * Create a checkout session with the payment provider.
 * Returns a URL to redirect the user to.
 * 
 * TODO: Replace with real payment gateway integration
 */
export async function createCheckoutSession(
  params: CheckoutParams,
): Promise<CheckoutResult> {
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const successUrl = `${appUrl}/${params.locale}/tools/interview-guide/result/${params.generationId}?success=true`;
  const cancelUrl = `${appUrl}/${params.locale}/tools/interview-guide/result/${params.generationId}?canceled=true`;

  // ──────────────────────────────────────────
  // PLACEHOLDER: Replace with real gateway
  // ──────────────────────────────────────────
  // 
  // Example for PayFast:
  //   const session = await payfast.createPayment({ ... });
  //   return { url: session.redirectUrl, sessionId: session.paymentId };
  //
  // Example for Yoco:
  //   const checkout = await yoco.createCheckout({ ... });
  //   return { url: checkout.redirectUrl, sessionId: checkout.id };
  //
  // For now, return an error since no gateway is configured:

  console.warn("[payment] No payment gateway configured. Params:", {
    generationId: params.generationId,
    amount: params.amount,
    successUrl,
    cancelUrl,
  });

  throw new Error(
    "Payment gateway not configured. Please set up a SA-compatible payment provider."
  );
}

/**
 * Verify and process a payment webhook from the provider.
 * Should return the generationId and userId to mark as paid.
 * 
 * TODO: Replace with real webhook verification
 */
export async function verifyPaymentWebhook(
  body: string,
  signature: string | null,
): Promise<{ generationId: string; userId: string; amount: number } | null> {
  // ──────────────────────────────────────────
  // PLACEHOLDER: Replace with real verification
  // ──────────────────────────────────────────
  void body;
  void signature;

  console.warn("[payment] Webhook verification not implemented");
  return null;
}
