import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthShell } from "@/components/auth-shell";
import { SignInForm } from "@/components/sign-in-form";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, isLocale } from "@/lib/site";

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
