import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, isLocale } from "@/lib/site";

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);

  return (
    <AuthShell
      eyebrow={copy.account}
      title={copy.forgotPasswordTitle}
      footer={
        <p className="text-center sm:text-left">
          <Link href={buildLocalePath(locale, "/sign-in")} className="font-semibold text-primary">
            {copy.backToSignIn}
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm locale={locale} />
    </AuthShell>
  );
}
