import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import { getPasswordResetTokenRecord } from "@/lib/password-reset";
import { buildLocalePath, isLocale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const token = typeof resolvedSearchParams.token === "string" ? resolvedSearchParams.token : "";
  const tokenRecord =
    token && isDatabaseConfigured() ? await getPasswordResetTokenRecord(token) : null;
  const canReset = Boolean(tokenRecord);

  return (
    <AuthShell eyebrow={copy.account} title={copy.resetPasswordTitle}>
        {canReset ? (
          <ResetPasswordForm locale={locale} token={token} />
        ) : (
          <div className="space-y-4">
            <StatusMessage tone="error">{copy.resetPasswordInvalid}</StatusMessage>
            <div className="flex flex-wrap gap-3">
              <Link
                href={buildLocalePath(locale, "/forgot-password")}
                className="focus-ring inline-flex h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-muted"
              >
                {copy.requestAnotherReset}
              </Link>
              <Link
                href={buildLocalePath(locale, "/sign-in")}
                className="focus-ring inline-flex h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-muted"
              >
                {copy.backToSignIn}
              </Link>
            </div>
          </div>
        )}
    </AuthShell>
  );
}
