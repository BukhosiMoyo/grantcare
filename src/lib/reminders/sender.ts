import type { Prisma } from "@prisma/client";

import { ReminderEmail, getReminderSubject } from "@/emails/reminder-email";
import { getResendClient } from "@/lib/resend";
import { parseReminderPayload } from "@/lib/reminders/payload";
import { createReminderUnsubscribeToken } from "@/lib/reminders/unsubscribe";
import { isReminderEmailConfigured } from "@/lib/server-env";
import { SUPPORT_EMAIL, buildLocalePath, type Locale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export type ReminderJobForSend = Prisma.ReminderJobGetPayload<{
  include: {
    grantType: true;
    paymentDateEntry: {
      include: {
        period: true;
      };
    };
    subscription: true;
    user: true;
  };
}>;

function toAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

type ReminderSenderCopy = {
  clientNotAvailable: string;
  emailNotConfigured: string;
  payloadMissing: string;
  subscriptionMissing: string;
};

const REMINDER_SENDER_COPY: Partial<Record<Locale, ReminderSenderCopy>> = {
  en: {
    clientNotAvailable: "Reminder email client is not available.",
    emailNotConfigured: "Reminder email is not configured.",
    payloadMissing: "Reminder payload is missing.",
    subscriptionMissing: "Reminder subscription is missing.",
  },
  zu: {
    clientNotAvailable: "Ikhasimende le-imeyili yezikhumbuzi alitholakali.",
    emailNotConfigured: "I-imeyili yezikhumbuzi ayilungiselelwe.",
    payloadMissing: "I-payload yesikhumbuzi ayikho.",
    subscriptionMissing: "Ukubhalisela isikhumbuzi akukho.",
  },
};

function getReminderSenderCopy(locale: Locale) {
  return REMINDER_SENDER_COPY[locale] ?? (REMINDER_SENDER_COPY.en as ReminderSenderCopy);
}

export async function sendReminderEmail(job: ReminderJobForSend) {
  const payload = parseReminderPayload(job.payload);

  if (!payload) {
    throw new Error(getReminderSenderCopy("en").payloadMissing);
  }

  const copy = getReminderSenderCopy(payload.locale);

  if (!job.subscriptionId) {
    throw new Error(copy.subscriptionMissing);
  }

  if (!isReminderEmailConfigured()) {
    throw new Error(copy.emailNotConfigured);
  }

  const resend = getResendClient();
  if (!resend) {
    throw new Error(copy.clientNotAvailable);
  }

  const unsubscribeUrl = toAbsoluteUrl(
    buildLocalePath(payload.locale, `/unsubscribe?token=${createReminderUnsubscribeToken({
      email: job.user.email,
      locale: payload.locale,
      subscriptionId: job.subscriptionId ?? "",
    })}`),
  );

  const { data, error } = await resend.emails.send(
    {
      from: process.env.REMINDER_FROM_EMAIL as string,
      replyTo: SUPPORT_EMAIL,
      to: job.user.email,
      subject: getReminderSubject(payload.locale, payload.grantName),
      react: ReminderEmail({
        dashboardUrl: toAbsoluteUrl(buildLocalePath(payload.locale, "/dashboard")),
        grantName: payload.grantName,
        locale: payload.locale,
        note: payload.note,
        officialUrl: payload.officialHref,
        paymentDate: payload.paymentDate,
        paymentPageUrl: toAbsoluteUrl(payload.paymentPagePath),
        trigger: job.trigger,
        unsubscribeUrl,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `reminder-job-${job.id}`,
      },
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return data?.id ?? null;
}
