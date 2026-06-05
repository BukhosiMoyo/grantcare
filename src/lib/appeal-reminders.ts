import {
  AppealReminderTrigger,
  ReminderJobStatus,
  type Prisma,
} from "@prisma/client";

import {
  AppealReminderEmail,
  getAppealReminderSubject,
} from "@/emails/appeal-reminder-email";
import {
  buildAppealResultPath,
  buildAppealReminderPayload,
  parseAppealReminderPayload,
} from "@/lib/appeals";
import { db } from "@/lib/prisma";
import { getResendClient } from "@/lib/resend";
import { canRunReminderProcessing, isReminderEmailConfigured } from "@/lib/server-env";
import { SUPPORT_EMAIL, type Locale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const MAX_APPEAL_REMINDER_ATTEMPTS = 3;

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function buildAppealReminderSchedules(finalDeadline: Date) {
  return [
    {
      trigger: AppealReminderTrigger.fourteen_days_before,
      scheduledFor: addDays(finalDeadline, -14),
    },
    {
      trigger: AppealReminderTrigger.seven_days_before,
      scheduledFor: addDays(finalDeadline, -7),
    },
    {
      trigger: AppealReminderTrigger.two_days_before,
      scheduledFor: addDays(finalDeadline, -2),
    },
  ].filter((job) => job.scheduledFor > new Date());
}

export async function syncAppealReminderJobs(input: {
  appealCaseId: string;
  finalDeadline: Date;
  generationId: string;
  grantType: string;
  locale: Locale;
  rejectionReason: string;
  userId: string;
}) {
  await db.appealReminderJob.updateMany({
    where: {
      appealCaseId: input.appealCaseId,
      status: {
        in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
      },
    },
    data: {
      status: ReminderJobStatus.cancelled,
      cancelReason: "Appeal reminder settings changed.",
      processingStartedAt: null,
    },
  });

  const payload = buildAppealReminderPayload({
    appealCaseId: input.appealCaseId,
    finalDeadline: input.finalDeadline,
    grantType: input.grantType,
    locale: input.locale,
    rejectionReason: input.rejectionReason,
    resultPath: buildAppealResultPath(input.locale, input.generationId),
  });

  for (const job of buildAppealReminderSchedules(input.finalDeadline)) {
    await db.appealReminderJob.upsert({
      where: {
        appealCaseId_trigger: {
          appealCaseId: input.appealCaseId,
          trigger: job.trigger,
        },
      },
      update: {
        cancelReason: null,
        lastError: null,
        payload,
        scheduledFor: job.scheduledFor,
        status: ReminderJobStatus.pending,
      },
      create: {
        appealCaseId: input.appealCaseId,
        payload,
        scheduledFor: job.scheduledFor,
        trigger: job.trigger,
        userId: input.userId,
      },
    });
  }
}

type AppealReminderJobForSend = Prisma.AppealReminderJobGetPayload<{
  include: {
    appealCase: true;
    user: true;
  };
}>;

function toAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

async function sendAppealReminderEmail(job: AppealReminderJobForSend) {
  const payload = parseAppealReminderPayload(job.payload);

  if (!payload) {
    throw new Error("Appeal reminder payload is missing.");
  }

  if (!isReminderEmailConfigured()) {
    throw new Error("Reminder email is not configured.");
  }

  const resend = getResendClient();
  if (!resend) {
    throw new Error("Reminder email client is not available.");
  }

  const { data, error } = await resend.emails.send(
    {
      from: process.env.REMINDER_FROM_EMAIL as string,
      replyTo: SUPPORT_EMAIL,
      to: job.user.email,
      subject: getAppealReminderSubject(payload.locale, payload.grantLabel),
      react: AppealReminderEmail({
        finalDeadline: payload.finalDeadline,
        grantLabel: payload.grantLabel,
        locale: payload.locale,
        reasonLabel: payload.reasonLabel,
        resultUrl: toAbsoluteUrl(payload.resultPath),
        trigger: job.trigger,
      }),
    },
    {
      headers: {
        "Idempotency-Key": `appeal-reminder-job-${job.id}`,
      },
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  return data?.id ?? null;
}

async function claimDueAppealReminderJobs(limit = 20) {
  const dueJobs = await db.appealReminderJob.findMany({
    where: {
      status: {
        in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
      },
      scheduledFor: {
        lte: new Date(),
      },
      attemptCount: {
        lt: MAX_APPEAL_REMINDER_ATTEMPTS,
      },
    },
    include: {
      appealCase: true,
      user: true,
    },
    orderBy: [{ scheduledFor: "asc" }, { createdAt: "asc" }],
    take: limit,
  });

  const claimedJobs = [];

  for (const job of dueJobs) {
    const claim = await db.appealReminderJob.updateMany({
      where: {
        id: job.id,
        status: {
          in: [ReminderJobStatus.pending, ReminderJobStatus.failed],
        },
      },
      data: {
        attemptCount: {
          increment: 1,
        },
        lastAttemptAt: new Date(),
        processingStartedAt: new Date(),
        status: ReminderJobStatus.processing,
      },
    });

    if (claim.count > 0) {
      claimedJobs.push({
        ...job,
        attemptCount: job.attemptCount + 1,
        status: ReminderJobStatus.processing,
      });
    }
  }

  return claimedJobs;
}

export async function processDueAppealReminderJobs(limit = 20) {
  if (!canRunReminderProcessing()) {
    return {
      blocked: true,
      cancelledCount: 0,
      failedCount: 0,
      sentCount: 0,
      total: 0,
    };
  }

  const jobs = await claimDueAppealReminderJobs(limit);
  let cancelledCount = 0;
  let failedCount = 0;
  let sentCount = 0;

  for (const job of jobs) {
    if (!job.appealCase.remindersEnabled || !job.user.email) {
      await db.appealReminderJob.update({
        where: { id: job.id },
        data: {
          cancelReason: "Appeal reminder is disabled.",
          processingStartedAt: null,
          status: ReminderJobStatus.cancelled,
        },
      });
      cancelledCount += 1;
      continue;
    }

    try {
      const providerMessageId = await sendAppealReminderEmail(job);

      await db.appealReminderJob.update({
        where: { id: job.id },
        data: {
          lastError: null,
          processingStartedAt: null,
          providerMessageId,
          sentAt: new Date(),
          status: ReminderJobStatus.sent,
        },
      });
      sentCount += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Appeal reminder delivery failed.";

      await db.appealReminderJob.update({
        where: { id: job.id },
        data: {
          lastError: message,
          processingStartedAt: null,
          scheduledFor:
            job.attemptCount >= MAX_APPEAL_REMINDER_ATTEMPTS
              ? job.scheduledFor
              : addDays(new Date(), 1),
          status: ReminderJobStatus.failed,
        },
      });
      failedCount += 1;
    }
  }

  return {
    blocked: false,
    cancelledCount,
    failedCount,
    sentCount,
    total: jobs.length,
  };
}
