import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/page-view-tracker";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { Card, Section } from "@/components/ui";
import { listPublicGrantTypes } from "@/lib/content";
import { getCopy } from "@/lib/copy";
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

  const copy = getCopy(locale);

  return {
    title: copy.eligibilityTitle,
    alternates: {
      canonical: `/${locale}/eligibility-checker`,
    },
  };
}

export default async function EligibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const grants = await listPublicGrantTypes(locale);

  return (
    <div className="space-y-8">
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.eligibility} title={copy.eligibilityTitle}>
        <Card className="space-y-4">
          <p className="max-w-2xl text-sm text-muted">{copy.eligibilityIntro}</p>
          <EligibilityChecker locale={locale} grants={grants} />
        </Card>
      </Section>

      <Section title={copy.grantTypesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => (
            <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{grant.name}</h3>
                <p className="text-sm text-muted">{grant.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
