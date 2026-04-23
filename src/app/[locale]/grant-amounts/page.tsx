import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { GrantAmountDisplay } from "@/components/grant-amount-display";
import { GrantAmountTable } from "@/components/grant-amount-table";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listPublicGrantTypes, listRelatedGuides } from "@/lib/content";
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

  return buildLocalizedMetadata({
    locale,
    path: "/grant-amounts",
    title: "SASSA Grant Amounts — Current Amounts and Increase Updates",
    description:
      "Check current SASSA grant amounts in South Africa. Compare Older Persons, Disability, Child Support, Foster Child, Care Dependency, Grant-in-Aid, and SRD amounts with official source links and increase guidance.",
  });
}

export default async function GrantAmountsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [grants, relatedGuides] = await Promise.all([
    listPublicGrantTypes(locale),
    listRelatedGuides(
      locale,
      6,
      undefined,
      "grant amounts grant increase social grant increase disability grant amount old age grant increase srd grant increase r350 grant r370 grant r700 grant youth grant r12500 youth grant r1500 grocery grant r1400 grant r2090 grant r1370 grant r2315 grant r3070 grant r530 grant r500 grant r500 payment delay senior grant bonus old age bonus pension bonus older persons bonus fake grant amount fake application beneficiary list payment promise",
    ),
  ]);

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SASSA Grant Amounts",
    numberOfItems: grants.length,
    itemListElement: grants.map((grant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getGrantSeoDisplayName(grant),
      url: new URL(buildLocalePath(locale, `/grants/${grant.slug}`), siteUrl).toString(),
    })),
  };

  const hubLinks = [
    {
      href: "/grants",
      title: "Grant types",
      description: "Open the grant library to compare eligibility, documents, and the right grant page for each amount.",
    },
    {
      href: "/payment-dates",
      title: "Payment dates",
      description: "Open payment dates after you identify the amount and grant type you need to follow.",
    },
    {
      href: "/grants/older-persons",
      title: "Old age grant",
      description: "Open the Older Persons Grant page for old age grant checks, payment links, and related increase guidance.",
    },
    {
      href: "/grants/social-relief",
      title: "SRD grant",
      description: "Open the SRD page for Social Relief of Distress and R370 guidance alongside the current amount.",
    },
    {
      href: "/claim-checker",
      title: "Claim checker",
      description: "Open the checker if you want to test whether a grant, increase, or payment story sounds real.",
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Grant amounts", path: "/grant-amounts" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      <Section eyebrow="Grant amounts" title="SASSA grant amounts">
        <Card className="space-y-3">
          <p className="text-base text-muted">
            Check current amounts, then open the matching grant page or related guide if you need more detail.
          </p>
        </Card>
      </Section>

      <Section title="Current grant amounts">
        <Card>
          <GrantAmountTable />
        </Card>
      </Section>

      <Section title="Amounts by grant type">
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => {
            const details = getGrantAmountDetails(grant.slug);

            return (
              <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
                <Card className="space-y-3">
                  <h3 className="text-xl font-semibold">{getGrantSeoDisplayName(grant)}</h3>
                  {details ? <GrantAmountDisplay details={details} variant="summary" /> : null}
                  <p className="text-sm text-muted">{grant.summary}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="Related guides">
        <div className="grid gap-4 md:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <InternalLinkGrid locale={locale} title="More amount help" items={hubLinks} />
    </div>
  );
}
