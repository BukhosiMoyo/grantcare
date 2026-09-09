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
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: `SASSA Grants in South Africa ${currentYear}: Types, Amounts and Eligibility`,
      metaDescription:
        "Compare social grants in South Africa, including SRD, Older Persons, Disability, and Child Support, with current amounts, eligibility rules, and document requirements.",
    },
    {
      metaTitle: `Izibonelelo ze-SASSA eNingizimu Afrika ${currentYear}: Izinhlobo, Amanani Nokufaneleka`,
      metaDescription:
        "Qhathanisa izibonelelo zomphakathi eNingizimu Afrika, okuhlanganisa i-SRD, Older Persons, Disability, ne-Child Support, kanye namanani amanje, imithetho yokufaneleka, nezidingo zemibhalo.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/grants",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbGrants: "Grants",
      hubSrdTitle: "Check SRD grant (R370)",
      hubSrdDescription: "Open Social Relief of Distress if you need SRD grant, R370 grant, application, status, or payment guidance.",
      hubOldAgeTitle: "Check old age grant",
      hubOldAgeDescription: "Open the Older Persons Grant page for old age grant eligibility, amounts, and pay date links.",
      hubPaymentTitle: "Check payment dates",
      hubPaymentDescription: "Open social grant and grant pay dates after you identify the grant type you need to follow.",
      hubEligibilityTitle: "Check grant eligibility",
      hubEligibilityDescription: "Use the checker when you are not sure which grant type to read first.",
      hubAmountsTitle: "Check grant amounts",
      hubAmountsDescription: "Open current SASSA grant amounts and increase-focused guides in one place.",
      hubClaimTitle: "Check grant rumours",
      hubClaimDescription: "Open the checker if you want to test whether a grant, increase, status, or payment story sounds real.",
      itemListName: "SASSA Grant Types",
      pageTitle: "SASSA grants in South Africa",
      currentGrantAmountsTitle: "Current grant amounts",
      quickCheckOptionsTitle: "Quick check options",
      popularGrantRoutesTitle: "Popular grant routes",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbGrants: "Izibonelelo",
      hubSrdTitle: "Hlola isibonelelo se-SRD (R370)",
      hubSrdDescription: "Vula i-Social Relief of Distress uma udinga isibonelelo se-SRD, i-R370, isicelo, isimo, noma isiqondiso sokukhokha.",
      hubOldAgeTitle: "Hlola isibonelelo sabadala",
      hubOldAgeDescription: "Vula ikhasi le-Older Persons Grant ukuze ubone ukufaneleka, amanani, nezixhumanisi zezinsuku zokukhokha.",
      hubPaymentTitle: "Hlola izinsuku zokukhokha",
      hubPaymentDescription: "Vula izinsuku zezibonelelo zomphakathi nezokukhokha ngemva kokuthola uhlobo lwesibonelelo okudingeka ululandele.",
      hubEligibilityTitle: "Hlola ukufaneleka kwesibonelelo",
      hubEligibilityDescription: "Sebenzisa isihloli uma ungaqiniseki ukuthi yiluphi uhlobo lwesibonelelo okufanele ulufunde kuqala.",
      hubAmountsTitle: "Hlola amanani ezibonelelo",
      hubAmountsDescription: "Vula amanani amanje ezibonelelo ze-SASSA nemihlahlandlela egxile ekunyusweni endaweni eyodwa.",
      hubClaimTitle: "Hlola amahemuhemu ngezibonelelo",
      hubClaimDescription: "Vula isihloli uma ufuna ukuhlola ukuthi indaba yesibonelelo, ukunyuswa, isimo, noma inkokhelo izwakala iyiqiniso yini.",
      itemListName: "Izinhlobo Zezibonelelo ze-SASSA",
      pageTitle: "Izibonelelo ze-SASSA eNingizimu Afrika",
      currentGrantAmountsTitle: "Amanani amanje ezibonelelo",
      quickCheckOptionsTitle: "Izindlela zokuhlola ngokushesha",
      popularGrantRoutesTitle: "Izindlela zezibonelelo ezidumile",
    },
  );
  const grants = await listPublicGrantTypes(locale);
  const hubLinks = [
    {
      href: "/grants/social-relief",
      title: routeCopy.hubSrdTitle,
      description: routeCopy.hubSrdDescription,
    },
    {
      href: "/grants/older-persons",
      title: routeCopy.hubOldAgeTitle,
      description: routeCopy.hubOldAgeDescription,
    },
    {
      href: "/payment-dates",
      title: routeCopy.hubPaymentTitle,
      description: routeCopy.hubPaymentDescription,
    },
    {
      href: "/eligibility-checker",
      title: routeCopy.hubEligibilityTitle,
      description: routeCopy.hubEligibilityDescription,
    },
    {
      href: "/grant-amounts",
      title: routeCopy.hubAmountsTitle,
      description: routeCopy.hubAmountsDescription,
    },
    {
      href: "/claim-checker",
      title: routeCopy.hubClaimTitle,
      description: routeCopy.hubClaimDescription,
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: routeCopy.itemListName,
    numberOfItems: grants.length,
    itemListElement: grants.map((grant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getGrantSeoDisplayName(grant, locale),
      url: new URL(buildLocalePath(locale, `/grants/${grant.slug}`), siteUrl).toString(),
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbGrants, path: "/grants" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section headingAs="h1" eyebrow={copy.eligibility} title={routeCopy.pageTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => {
            const amountDetails = getGrantAmountDetails(grant.slug, locale);

            return (
              <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
                <Card className="space-y-3">
                  <h3 className="text-xl font-semibold">{getGrantSeoDisplayName(grant, locale)}</h3>
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
      <Section title={routeCopy.currentGrantAmountsTitle}>
        <Card>
          <GrantAmountTable locale={locale} />
        </Card>
      </Section>
      <Section title={routeCopy.quickCheckOptionsTitle}>
        <QuickCheckOptions locale={locale} />
      </Section>
      <InternalLinkGrid locale={locale} title={routeCopy.popularGrantRoutesTitle} items={hubLinks} />
    </>
  );
}
