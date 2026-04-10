import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { SignUpForm } from "@/components/sign-up-form";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: "/sign-up",
    title: "Create account",
    description: "Create a GrantCare account to save reminders, language preferences, and guides.",
    noIndex: true,
  });
}

export default async function SignUpPage({
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
      title={copy.createAccount}
      footer={
        <p className="text-center sm:text-left">
          {copy.alreadyHaveAccount}{" "}
          <Link href={buildLocalePath(locale, "/sign-in")} className="font-semibold text-primary">
            {copy.signIn}
          </Link>
        </p>
      }
    >
        <SignUpForm locale={locale} />
    </AuthShell>
  );
}
