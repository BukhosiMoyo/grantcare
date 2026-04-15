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
import { getGrantSeoDisplayName } from "@/lib/seo-aliases";
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
    title: `SASSA Grants and SRD ${currentYear}: Eligibility and Amounts`,
    description: `Compare SASSA grants, current amounts, eligibility rules, and documents for Older Persons, Disability, Child Support, and SRD.`,
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
      href: "/grants/social-relief",
      title: "SRD grant",
      description: "Open Social Relief of Distress if you need SRD, R350, or R370 grant guidance.",
    },
    {
      href: "/grants/older-persons",
      title: "Old age grant",
      description: "Open the Older Persons Grant page for old age grant eligibility, amounts, and pay date links.",
    },
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open social grant and grant pay dates after you identify the grant type you need to follow.",
    },
    {
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: "Use the checker when you are not sure which grant type to read first.",
    },
    {
      href: "/grant-amounts",
      title: "Grant amounts",
      description: "Open current SASSA grant amounts and increase-focused guides in one place.",
    },
    {
      href: "/claim-checker",
      title: "Claim checker",
      description: "Open the checker if you want to test whether a grant, increase, or payment story sounds real.",
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
      name: getGrantSeoDisplayName(grant),
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
      <Section eyebrow={copy.eligibility} title="SASSA grants in South Africa">
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => {
            const amountDetails = getGrantAmountDetails(grant.slug);

            return (
              <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
                <Card className="space-y-3">
                  <h3 className="text-xl font-semibold">{getGrantSeoDisplayName(grant)}</h3>
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
      <InternalLinkGrid locale={locale} title="Popular grant routes" items={hubLinks} />
    </>
  );
}
