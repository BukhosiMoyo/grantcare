import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
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
    title: `SASSA Grants in South Africa ${currentYear}: Types, Amounts and Eligibility`,
    description:
      "Compare social grants in South Africa, including SRD, Older Persons, Disability, and Child Support, with current amounts, eligibility rules, and document requirements.",
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
      title: "Check SRD grant (R370)",
      description: "Open Social Relief of Distress if you need SRD grant, R370 grant, application, status, or payment guidance.",
    },
    {
      href: "/grants/older-persons",
      title: "Check old age grant",
      description: "Open the Older Persons Grant page for old age grant eligibility, amounts, and pay date links.",
    },
    {
      href: "/payment-dates",
      title: "Check payment dates",
      description: "Open social grant and grant pay dates after you identify the grant type you need to follow.",
    },
    {
      href: "/eligibility-checker",
      title: "Check grant eligibility",
      description: "Use the checker when you are not sure which grant type to read first.",
    },
    {
      href: "/grant-amounts",
      title: "Check grant amounts",
      description: "Open current SASSA grant amounts and increase-focused guides in one place.",
    },
    {
      href: "/claim-checker",
      title: "Check grant rumours",
      description: "Open the checker if you want to test whether a grant, increase, status, or payment story sounds real.",
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
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Grants", path: "/grants" },
        ]}
      />
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
