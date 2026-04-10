import { ContentStatus, ReminderChannel } from "@prisma/client";

import { canQueryDatabase, isRecoverableDatabaseError, markDatabaseUnavailable } from "@/lib/database-readiness";
import { db } from "@/lib/prisma";
import { assertDatabaseConfigured, isDatabaseConfigured } from "@/lib/server-env";
import type { Locale } from "@/lib/site";

export async function getUserByEmail(email: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!(await canQueryDatabase())) {
    return null;
  }

  try {
    return await db.user.findUnique({
      where: { email },
      include: {
        preferredGrantType: {
          include: {
            paymentGroup: true,
          },
        },
      },
    });
  } catch (error) {
    if (isRecoverableDatabaseError(error)) {
      markDatabaseUnavailable();
      return null;
    }

    throw error;
  }
}

export async function getUserById(id: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!(await canQueryDatabase())) {
    return null;
  }

  try {
    return await db.user.findUnique({
      where: { id },
      include: {
        preferredGrantType: {
          include: {
            paymentGroup: true,
          },
        },
      },
    });
  } catch (error) {
    if (isRecoverableDatabaseError(error)) {
      markDatabaseUnavailable();
      return null;
    }

    throw error;
  }
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  preferredLocale: Locale;
}) {
  assertDatabaseConfigured();

  return db.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      preferredLocale: input.preferredLocale,
    },
  });
}

export async function getDashboardData(userId: string) {
  assertDatabaseConfigured();

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      preferredGrantType: {
        include: {
          paymentGroup: true,
        },
      },
      reminderSubscriptions: {
        include: {
          grantType: {
            include: {
              paymentGroup: true,
            },
          },
        },
        orderBy: {
          grantType: {
            sortOrder: "asc",
          },
        },
      },
      savedGuides: {
        include: {
          guide: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const paymentGrant =
    user.preferredGrantType?.paymentGroup ?? user.preferredGrantType ?? null;

  const latestPaymentEntries = paymentGrant
    ? await db.paymentDateEntry.findMany({
        where: {
          grantTypeId: paymentGrant.id,
          published: true,
          period: {
            published: true,
          },
        },
        include: {
          period: true,
          grantType: true,
        },
      })
    : [];

  latestPaymentEntries.sort((left, right) => {
    if (left.period.year !== right.period.year) {
      return left.period.year - right.period.year;
    }

    return left.period.month - right.period.month;
  });

  return {
    user,
    latestPaymentEntries: latestPaymentEntries.slice(0, 3),
  };
}

export async function updateUserProfile(input: {
  userId: string;
  name: string;
  email: string;
  preferredLocale: Locale;
  preferredGrantTypeId: string | null;
}) {
  assertDatabaseConfigured();

  return db.user.update({
    where: { id: input.userId },
    data: {
      name: input.name,
      email: input.email,
      preferredLocale: input.preferredLocale,
      preferredGrantTypeId: input.preferredGrantTypeId,
    },
  });
}

export async function getReminderSubscription(userId: string, grantTypeId: string) {
  assertDatabaseConfigured();

  return db.reminderSubscription.findUnique({
    where: {
      userId_grantTypeId_channel: {
        userId,
        grantTypeId,
        channel: ReminderChannel.email,
      },
    },
  });
}

export async function upsertReminderSubscription(input: {
  userId: string;
  grantTypeId: string;
  active: boolean;
  oneDayBefore: boolean;
  twoDaysBefore: boolean;
  onPublish: boolean;
}) {
  assertDatabaseConfigured();

  return db.reminderSubscription.upsert({
    where: {
      userId_grantTypeId_channel: {
        userId: input.userId,
        grantTypeId: input.grantTypeId,
        channel: ReminderChannel.email,
      },
    },
    update: {
      active: input.active,
      oneDayBefore: input.oneDayBefore,
      twoDaysBefore: input.twoDaysBefore,
      onPublish: input.onPublish,
    },
    create: {
      userId: input.userId,
      grantTypeId: input.grantTypeId,
      active: input.active,
      oneDayBefore: input.oneDayBefore,
      twoDaysBefore: input.twoDaysBefore,
      onPublish: input.onPublish,
      channel: ReminderChannel.email,
    },
    include: {
      grantType: true,
    },
  });
}

export async function toggleSavedGuide(input: {
  userId: string;
  guideId: string;
}) {
  assertDatabaseConfigured();

  const existing = await db.savedGuide.findFirst({
    where: {
      userId: input.userId,
      guideId: input.guideId,
    },
  });

  if (existing) {
    await db.savedGuide.delete({
      where: { id: existing.id },
    });
    return false;
  }

  const guide = await db.guideArticle.findUnique({
    where: { id: input.guideId },
  });

  if (!guide || guide.status !== ContentStatus.published) {
    return false;
  }

  await db.savedGuide.create({
    data: {
      userId: input.userId,
      guideId: input.guideId,
    },
  });

  return true;
}
