import type { ReminderTrigger } from "@prisma/client";

import { canRunReminderProcessing } from "@/lib/server-env";
import {
  claimDueReminderJobs,
  createReminderAttempt,
  markReminderJobCancelled,
  markReminderJobFailed,
  markReminderJobSent,
} from "@/lib/reminders/jobs";
import { sendReminderEmail } from "@/lib/reminders/sender";

function triggerAllowed(trigger: ReminderTrigger, subscription: {
  active: boolean;
  onPublish: boolean;
  oneDayBefore: boolean;
  twoDaysBefore: boolean;
}) {
  if (!subscription.active) {
    return false;
  }

  if (trigger === "on_publish") {
    return subscription.onPublish;
  }

  if (trigger === "one_day_before") {
    return subscription.oneDayBefore;
  }

  return subscription.twoDaysBefore;
}

export async function processDueReminderJobs(limit = 20) {
  if (!canRunReminderProcessing()) {
    return {
      blocked: true,
      cancelledCount: 0,
      failedCount: 0,
      sentCount: 0,
      total: 0,
    };
  }

  const jobs = await claimDueReminderJobs(limit);
  let sentCount = 0;
  let failedCount = 0;
  let cancelledCount = 0;

  for (const job of jobs) {
    if (!job.subscription || !job.user.email) {
      await markReminderJobCancelled({
        jobId: job.id,
        reason: "Reminder subscription is missing.",
      });
      await createReminderAttempt({
        jobId: job.id,
        attemptNumber: job.attemptCount,
        status: "skipped",
        errorMessage: "Reminder subscription is missing.",
      });
      cancelledCount += 1;
      continue;
    }

    if (!triggerAllowed(job.trigger, job.subscription)) {
      await markReminderJobCancelled({
        jobId: job.id,
        reason: "Reminder preference no longer allows this send.",
      });
      await createReminderAttempt({
        jobId: job.id,
        attemptNumber: job.attemptCount,
        status: "skipped",
        errorMessage: "Reminder preference no longer allows this send.",
      });
      cancelledCount += 1;
      continue;
    }

    try {
      const providerMessageId = await sendReminderEmail(job);

      await createReminderAttempt({
        jobId: job.id,
        attemptNumber: job.attemptCount,
        status: "sent",
        payload: job.payload,
        providerMessageId,
      });
      await markReminderJobSent({
        jobId: job.id,
        providerMessageId,
      });
      sentCount += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Reminder delivery failed.";

      await createReminderAttempt({
        jobId: job.id,
        attemptNumber: job.attemptCount,
        status: "failed",
        errorMessage: message,
        payload: job.payload,
      });
      await markReminderJobFailed({
        attemptCount: job.attemptCount,
        errorMessage: message,
        jobId: job.id,
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
