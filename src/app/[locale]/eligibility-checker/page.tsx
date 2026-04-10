import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { Card, Section } from "@/components/ui";
import { listPublicGrantTypes } from "@/lib/content";
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
    path: "/eligibility-checker",
    title: "Eligibility checker and grant guidance",
    description:
      "Use the GrantCare eligibility checker for general guidance, then move to grant pages, payment dates, or official channels for the next step.",
  });
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
  const hubLinks = [
    {
      href: "/grants",
      title: copy.grantTypesTitle,
      description: "Compare grant pages if you want to read checks and documents side by side.",
    },
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open payment dates after you know which grant category you need to follow.",
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: "Use status help if your question is about wording, not eligibility.",
    },
    {
      href: "/guides/how-to-prepare-before-applying",
      title: "Prepare before applying",
      description: "Read the preparation guide if you want a calmer application checklist before using official channels.",
    },
  ];

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
      <InternalLinkGrid locale={locale} title="Next pages to open" items={hubLinks} />
    </div>
  );
}
