import {
  ReminderChannel,
  ReminderJobStatus,
  ReminderTrigger,
} from "@prisma/client";

import { db } from "@/lib/prisma";
import { assertDatabaseConfigured, isDatabaseConfigured } from "@/lib/server-env";
import { buildReminderPayload, buildReminderPaymentPath } from "@/lib/reminders/payload";

export const MAX_REMINDER_ATTEMPTS = 3;

function buildTriggerJobs(input: {
  onPublish: boolean;
  oneDayBefore: boolean;
  twoDaysBefore: boolean;
  paymentDate: Date | null;
  publishNow?: boolean;
}) {
  const now = new Date();
  const jobs: Array<{ trigger: ReminderTrigger; scheduledFor: Date }> = [];

  if (input.publishNow && input.onPublish) {
    jobs.push({
      trigger: ReminderTrigger.on_publish,
      scheduledFor: now,
    });
  }

  if (input.paymentDate) {
    if (input.oneDayBefore) {
      jobs.push({
        trigger: ReminderTrigger.one_day_before,
        scheduledFor: new Date(input.paymentDate.getTime() - 24 * 60 * 60 * 1000),
      });
    }

    if (input.twoDaysBefore) {
      jobs.push({
        trigger: ReminderTrigger.two_days_before,
        scheduledFor: new Date(input.paymentDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      });
    }
  }

  return jobs.filter((job) => job.trigger === ReminderTrigger.on_publish || job.scheduledFor > now);
}

async function cancelReminderJobs(where: {
  paymentDateEntryId?: string;
  subscriptionId?: string;
}) {
  await db.reminderJob.updateMany({
    where: {
      ...where,
      status: {
        in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
      },
    },
    data: {
      status: ReminderJobStatus.cancelled,
      cancelReason: "Reminder settings changed.",
      processingStartedAt: null,
    },
  });
}

export async function syncReminderJobsForSubscription(subscriptionId: string) {
  if (!isDatabaseConfigured()) {
    return;
  }

  const subscription = await db.reminderSubscription.findUnique({
    where: { id: subscriptionId },
    include: {
      grantType: true,
      user: true,
    },
  });

  if (!subscription) {
    return;
  }

  await cancelReminderJobs({ subscriptionId });

  if (!subscription.active) {
    return;
  }

  const entries = await db.paymentDateEntry.findMany({
    where: {
      grantTypeId: subscription.grantTypeId,
      published: true,
    },
    include: {
      period: true,
      grantType: true,
    },
  });

  for (const entry of entries) {
    const jobs = buildTriggerJobs({
      onPublish: subscription.onPublish,
      oneDayBefore: subscription.oneDayBefore,
      twoDaysBefore: subscription.twoDaysBefore,
      paymentDate: entry.paymentDate,
    });

    for (const job of jobs) {
      await db.reminderJob.create({
        data: {
          userId: subscription.userId,
          subscriptionId: subscription.id,
          grantTypeId: subscription.grantTypeId,
          paymentDateEntryId: entry.id,
          channel: ReminderChannel.email,
          trigger: job.trigger,
          status: ReminderJobStatus.pending,
          scheduledFor: job.scheduledFor,
          payload: buildReminderPayload({
            grantName: subscription.grantType.name,
            paymentDate: entry.paymentDate?.toISOString().slice(0, 10) ?? null,
            note: entry.note,
            paymentPagePath: buildReminderPaymentPath({
              grantSlug: subscription.grantType.slug,
              locale: subscription.user.preferredLocale,
              month: entry.period.month,
              year: entry.period.year,
            }),
            officialHref: subscription.grantType.officialHref,
            locale: subscription.user.preferredLocale,
          }),
        },
      });
    }
  }
}

export async function syncReminderJobsForPaymentEntry(
  paymentDateEntryId: string,
  options?: { enqueuePublishNotification?: boolean },
) {
  assertDatabaseConfigured();

  const entry = await db.paymentDateEntry.findUnique({
    where: { id: paymentDateEntryId },
    include: {
      period: true,
      grantType: true,
    },
  });

  if (!entry) {
    return;
  }

  await cancelReminderJobs({ paymentDateEntryId });

  const subscriptions = await db.reminderSubscription.findMany({
    where: {
      grantTypeId: entry.grantTypeId,
      active: true,
    },
    include: {
      user: true,
    },
  });

  for (const subscription of subscriptions) {
    const jobs = buildTriggerJobs({
      onPublish: subscription.onPublish,
      oneDayBefore: subscription.oneDayBefore,
      twoDaysBefore: subscription.twoDaysBefore,
      paymentDate: entry.paymentDate,
      publishNow: options?.enqueuePublishNotification,
    });

    for (const job of jobs) {
      await db.reminderJob.create({
        data: {
          userId: subscription.userId,
          subscriptionId: subscription.id,
          grantTypeId: entry.grantTypeId,
          paymentDateEntryId: entry.id,
          channel: ReminderChannel.email,
          trigger: job.trigger,
          status: ReminderJobStatus.pending,
          scheduledFor: job.scheduledFor,
          payload: buildReminderPayload({
            grantName: entry.grantType.name,
            paymentDate: entry.paymentDate?.toISOString().slice(0, 10) ?? null,
            note: entry.note,
            paymentPagePath: buildReminderPaymentPath({
              grantSlug: entry.grantType.slug,
              locale: subscription.user.preferredLocale,
              month: entry.period.month,
              year: entry.period.year,
            }),
            officialHref: entry.grantType.officialHref,
            locale: subscription.user.preferredLocale,
          }),
        },
      });
    }
  }
}

export async function claimDueReminderJobs(limit = 20) {
  assertDatabaseConfigured();

  const dueJobs = await db.reminderJob.findMany({
    where: {
      status: {
        in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
      },
      scheduledFor: {
        lte: new Date(),
      },
      attemptCount: {
        lt: MAX_REMINDER_ATTEMPTS,
      },
      channel: ReminderChannel.email,
    },
    include: {
      user: true,
      subscription: true,
      grantType: true,
      paymentDateEntry: {
        include: {
          period: true,
        },
      },
    },
    orderBy: [{ scheduledFor: "asc" }, { createdAt: "asc" }],
    take: limit,
  });

  const claimedJobs = [];

  for (const job of dueJobs) {
    const claim = await db.reminderJob.updateMany({
      where: {
        id: job.id,
        status: {
          in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
        },
      },
      data: {
        status: ReminderJobStatus.processing,
        processingStartedAt: new Date(),
        lastAttemptAt: new Date(),
        attemptCount: {
          increment: 1,
        },
      },
    });

    if (claim.count > 0) {
      claimedJobs.push({
        ...job,
        status: ReminderJobStatus.processing,
        attemptCount: job.attemptCount + 1,
      });
    }
  }

  return claimedJobs;
}

export async function markReminderJobSent(input: {
  jobId: string;
  providerMessageId?: string | null;
}) {
  await db.reminderJob.update({
    where: { id: input.jobId },
    data: {
      status: ReminderJobStatus.sent,
      sentAt: new Date(),
      providerMessageId: input.providerMessageId ?? null,
      lastError: null,
      processingStartedAt: null,
    },
  });
}

export async function markReminderJobCancelled(input: {
  jobId: string;
  reason: string;
}) {
  await db.reminderJob.update({
    where: { id: input.jobId },
    data: {
      status: ReminderJobStatus.cancelled,
      cancelReason: input.reason,
      processingStartedAt: null,
    },
  });
}

export async function markReminderJobFailed(input: {
  attemptCount: number;
  errorMessage: string;
  jobId: string;
}) {
  const retryDelayMinutes = input.attemptCount >= MAX_REMINDER_ATTEMPTS ? 0 : input.attemptCount * 15;

  await db.reminderJob.update({
    where: { id: input.jobId },
    data: {
      status: ReminderJobStatus.failed,
      lastError: input.errorMessage,
      processingStartedAt: null,
      scheduledFor: new Date(Date.now() + retryDelayMinutes * 60 * 1000),
    },
  });
}

export async function createReminderAttempt(input: {
  jobId: string;
  attemptNumber: number;
  status: "sent" | "failed" | "skipped";
  errorMessage?: string | null;
  providerMessageId?: string | null;
  payload?: unknown;
}) {
  await db.reminderJobAttempt.create({
    data: {
      jobId: input.jobId,
      attemptNumber: input.attemptNumber,
      status: input.status,
      errorMessage: input.errorMessage ?? null,
      providerMessageId: input.providerMessageId ?? null,
      payload: (input.payload ?? undefined) as never,
    },
  });
}
