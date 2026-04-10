import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { SignInForm } from "@/components/sign-in-form";
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
    path: "/sign-in",
    title: "Sign in",
    description: "Sign in to GrantCare to manage reminders, preferences, and saved guides.",
    noIndex: true,
  });
}

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);

  return (
    <AuthShell
      eyebrow={copy.account}
      title={copy.signIn}
      footer={
        <p className="text-center sm:text-left">
          {copy.needAccount}{" "}
          <Link href={buildLocalePath(locale, "/sign-up")} className="font-semibold text-primary">
            {copy.createAccount}
          </Link>
        </p>
      }
    >
        <SignInForm locale={locale} nextPath={resolvedSearchParams.next} />
    </AuthShell>
  );
}
