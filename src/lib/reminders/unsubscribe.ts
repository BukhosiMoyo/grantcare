import { createHmac, timingSafeEqual } from "node:crypto";

import { ReminderJobStatus } from "@prisma/client";

import { trackServerEvent } from "@/lib/analytics";
import { db } from "@/lib/prisma";
import { assertDatabaseConfigured, isDatabaseConfigured } from "@/lib/server-env";
import { DEFAULT_LOCALE, type Locale, isLocale } from "@/lib/site";

type ReminderUnsubscribeTokenPayload = {
  email: string;
  locale: Locale;
  subscriptionId: string;
};

function getTokenSecret() {
  if (!process.env.AUTH_SECRET) {
    throw new Error("AUTH_SECRET is required for reminder unsubscribe tokens.");
  }

  return process.env.AUTH_SECRET;
}

function signToken(value: string) {
  return createHmac("sha256", getTokenSecret()).update(value).digest("base64url");
}

export function createReminderUnsubscribeToken(payload: ReminderUnsubscribeTokenPayload) {
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${value}.${signToken(value)}`;
}

function parseToken(token: string): ReminderUnsubscribeTokenPayload | null {
  const [value, signature] = token.split(".");

  if (!value || !signature) {
    return null;
  }

  const expected = signToken(value);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  let payload: Partial<ReminderUnsubscribeTokenPayload>;

  try {
    payload = JSON.parse(
      Buffer.from(value, "base64url").toString("utf8"),
    ) as Partial<ReminderUnsubscribeTokenPayload>;
  } catch {
    return null;
  }

  if (
    typeof payload.email !== "string" ||
    typeof payload.subscriptionId !== "string" ||
    typeof payload.locale !== "string" ||
    !isLocale(payload.locale)
  ) {
    return null;
  }

  return {
    email: payload.email,
    locale: payload.locale,
    subscriptionId: payload.subscriptionId,
  };
}

export async function unsubscribeFromReminderToken(token: string) {
  const payload = parseToken(token);

  if (!payload || !isDatabaseConfigured()) {
    return {
      grantName: null,
      locale: payload?.locale ?? DEFAULT_LOCALE,
      success: false,
    };
  }

  assertDatabaseConfigured();

  const subscription = await db.reminderSubscription.findUnique({
    where: { id: payload.subscriptionId },
    include: {
      grantType: true,
      user: true,
    },
  });

  if (!subscription || subscription.user.email !== payload.email) {
    return {
      grantName: null,
      locale: payload.locale,
      success: false,
    };
  }

  if (!subscription.active && subscription.unsubscribedAt) {
    return {
      grantName: subscription.grantType.name,
      locale: payload.locale,
      success: true,
    };
  }

  await db.reminderSubscription.update({
    where: { id: subscription.id },
    data: {
      active: false,
      oneDayBefore: false,
      twoDaysBefore: false,
      onPublish: false,
      unsubscribedAt: new Date(),
    },
  });

  await db.reminderJob.updateMany({
    where: {
      subscriptionId: subscription.id,
      status: {
        in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
      },
    },
    data: {
      status: ReminderJobStatus.cancelled,
      cancelReason: "User unsubscribed.",
      processingStartedAt: null,
    },
  });

  await trackServerEvent({
    name: "reminder.unsubscribe",
    locale: payload.locale,
    path: `/${payload.locale}/unsubscribe`,
    payload: {
      grantTypeId: subscription.grantTypeId,
      subscriptionId: subscription.id,
    },
    userId: subscription.userId,
  });

  return {
    grantName: subscription.grantType.name,
    locale: payload.locale,
    success: true,
  };
}
