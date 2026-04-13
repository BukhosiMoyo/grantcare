import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GrantAmountDisplay } from "@/components/grant-amount-display";
import { GrantAmountTable } from "@/components/grant-amount-table";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { Card, Section } from "@/components/ui";
import { listPublicGrantTypes } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const currentYear = new Date().getUTCFullYear();

  return buildLocalizedMetadata({
    locale,
    path: "/grants",
    title: `SASSA Grant Types ${currentYear} — Eligibility, Amounts & Documents`,
    description: `Compare all SASSA grant types for ${currentYear}. Check eligibility requirements, see current amounts, and find what documents you need.`,
  });
}

export default async function GrantsPage({
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
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: "Use the checker when you are not sure which grant type to read first.",
    },
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open payment dates after you identify the grant type you need to follow.",
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: "Use status help when your question is about wording rather than grant type.",
    },
    {
      href: "/guides",
      title: copy.guides,
      description: "Read deeper support guides for appeals, delays, banking details, and documents.",
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SASSA Grant Types",
    numberOfItems: grants.length,
    itemListElement: grants.map((grant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: grant.name,
      url: new URL(buildLocalePath(locale, `/grants/${grant.slug}`), siteUrl).toString(),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.eligibility} title={copy.grantTypesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => {
            const amountDetails = getGrantAmountDetails(grant.slug);

            return (
              <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
                <Card className="space-y-3">
                  <h3 className="text-xl font-semibold">{grant.name}</h3>
                  {amountDetails ? <GrantAmountDisplay details={amountDetails} /> : null}
                  <p className="text-sm text-muted">{grant.summary}</p>
                  <ul className="space-y-2 text-sm text-muted">
                    {grant.checks.slice(0, 2).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
      <Section title="Current grant amounts">
        <Card>
          <GrantAmountTable />
        </Card>
      </Section>
      <Section title="Quick check options">
        <QuickCheckOptions />
      </Section>
      <InternalLinkGrid locale={locale} title="Start from the right hub" items={hubLinks} />
    </>
  );
}
