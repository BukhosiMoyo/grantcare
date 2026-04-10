import { createHash, randomBytes } from "node:crypto";

import { db } from "@/lib/prisma";
import { getResendClient } from "@/lib/resend";
import { isProductionServer } from "@/lib/server-env";
import { SITE_URL, SUPPORT_EMAIL, type Locale, buildLocalePath } from "@/lib/site";
import { getUserByEmail } from "@/lib/users";
import { PasswordResetEmail } from "@/emails/password-reset-email";

const PASSWORD_RESET_TTL_MS = 1000 * 60 * 60 * 2;

function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getResetPath(locale: Locale, token: string) {
  return buildLocalePath(locale, `/reset-password?token=${token}`);
}

function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export async function createPasswordResetRequest(input: {
  email: string;
  locale: Locale;
}) {
  const user = await getUserByEmail(input.email);

  if (!user) {
    return { debugPath: null };
  }

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashResetToken(rawToken);
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);
  const resetPath = getResetPath(input.locale, rawToken);

  await db.$transaction(async (tx) => {
    await tx.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await tx.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });
  });

  const resend = getResendClient();
  const fromEmail = process.env.REMINDER_FROM_EMAIL;

  if (resend && fromEmail) {
    await resend.emails.send(
      {
        from: fromEmail,
        replyTo: SUPPORT_EMAIL,
        to: user.email,
        subject: "GrantCare password reset",
        react: PasswordResetEmail({
          resetUrl: toAbsoluteUrl(resetPath),
        }),
      },
      {
        headers: {
          "Idempotency-Key": `password-reset-${user.id}-${tokenHash}`,
        },
      },
    );

    return { debugPath: null };
  }

  if (!isProductionServer()) {
    console.info(`[auth] Password reset link for ${user.email}: ${resetPath}`);
    return { debugPath: resetPath };
  }

  return { debugPath: null };
}

export async function getPasswordResetTokenRecord(token: string) {
  if (!token.trim()) {
    return null;
  }

  const record = await db.passwordResetToken.findUnique({
    where: {
      tokenHash: hashResetToken(token),
    },
    include: {
      user: true,
    },
  });

  if (!record) {
    return null;
  }

  if (record.usedAt || record.expiresAt.getTime() < Date.now()) {
    return null;
  }

  return record;
}

export async function completePasswordReset(input: {
  token: string;
  passwordHash: string;
}) {
  const record = await getPasswordResetTokenRecord(input.token);

  if (!record) {
    return null;
  }

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: record.userId },
      data: {
        passwordHash: input.passwordHash,
      },
    });

    await tx.passwordResetToken.update({
      where: { id: record.id },
      data: {
        usedAt: new Date(),
      },
    });

    await tx.passwordResetToken.deleteMany({
      where: {
        userId: record.userId,
        id: {
          not: record.id,
        },
      },
    });
  });

  return {
    userId: record.userId,
  };
}
