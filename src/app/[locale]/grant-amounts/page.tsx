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

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA Grant Amounts — Current Amounts and Increase Updates",
      metaDescription:
        "Check current SASSA grant amounts in South Africa. Compare Older Persons, Disability, Child Support, Foster Child, Care Dependency, Grant-in-Aid, and SRD amounts with official source links and increase guidance.",
    },
    {
      metaTitle: "Amanani Ezibonelelo ze-SASSA — Amanani Amanje Nezibuyekezo Zokunyuswa",
      metaDescription:
        "Hlola amanani amanje ezibonelelo ze-SASSA eNingizimu Afrika. Qhathanisa amanani e-Older Persons, Disability, Child Support, Foster Child, Care Dependency, Grant-in-Aid, ne-SRD nezixhumanisi zemithombo esemthethweni nesiqondiso sokunyuswa.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/grant-amounts",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
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

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbGrantAmounts: "Grant amounts",
      itemListName: "SASSA Grant Amounts",
      hubGrantTypesTitle: "Grant types",
      hubGrantTypesDescription: "Open the grant library to compare eligibility, documents, and the right grant page for each amount.",
      hubPaymentDatesTitle: "Payment dates",
      hubPaymentDatesDescription: "Open payment dates after you identify the amount and grant type you need to follow.",
      hubOldAgeTitle: "Old age grant",
      hubOldAgeDescription: "Open the Older Persons Grant page for old age grant checks, payment links, and related increase guidance.",
      hubSrdTitle: "SRD grant",
      hubSrdDescription: "Open the SRD page for Social Relief of Distress and R370 guidance alongside the current amount.",
      hubClaimTitle: "Claim checker",
      hubClaimDescription: "Open the checker if you want to test whether a grant, increase, or payment story sounds real.",
      eyebrow: "Grant amounts",
      pageTitle: "SASSA grant amounts",
      intro: "Check current amounts, then open the matching grant page or related guide if you need more detail.",
      currentGrantAmountsTitle: "Current grant amounts",
      amountsByGrantTypeTitle: "Amounts by grant type",
      relatedGuidesTitle: "Related guides",
      moreAmountHelpTitle: "More amount help",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbGrantAmounts: "Amanani ezibonelelo",
      itemListName: "Amanani Ezibonelelo ze-SASSA",
      hubGrantTypesTitle: "Izinhlobo zezibonelelo",
      hubGrantTypesDescription: "Vula ilabhulali yezibonelelo ukuze uqhathanise ukufaneleka, imibhalo, nekhasi lesibonelelo elifanele ngenani ngalinye.",
      hubPaymentDatesTitle: "Izinsuku zokukhokha",
      hubPaymentDatesDescription: "Vula izinsuku zokukhokha ngemva kokuthola inani nohlobo lwesibonelelo okudingeka ululandele.",
      hubOldAgeTitle: "Isibonelelo sabadala",
      hubOldAgeDescription: "Vula ikhasi le-Older Persons Grant ukuze ubone ukuhlola kwesibonelelo sabadala, izixhumanisi zokukhokha, nesiqondiso sokunyuswa esihlobene.",
      hubSrdTitle: "Isibonelelo se-SRD",
      hubSrdDescription: "Vula ikhasi le-SRD ukuze uthole isiqondiso se-Social Relief of Distress ne-R370 kanye nenani lamanje.",
      hubClaimTitle: "Isihloli sezimangalo",
      hubClaimDescription: "Vula isihloli uma ufuna ukuhlola ukuthi indaba yesibonelelo, ukunyuswa, noma inkokhelo izwakala iyiqiniso yini.",
      eyebrow: "Amanani ezibonelelo",
      pageTitle: "Amanani ezibonelelo ze-SASSA",
      intro: "Hlola amanani amanje, bese uvula ikhasi lesibonelelo elihambisanayo noma umhlahlandlela ohlobene uma udinga imininingwane eyengeziwe.",
      currentGrantAmountsTitle: "Amanani amanje ezibonelelo",
      amountsByGrantTypeTitle: "Amanani ngohlobo lwesibonelelo",
      relatedGuidesTitle: "Imihlahlandlela ehambisanayo",
      moreAmountHelpTitle: "Olunye usizo ngamanani",
    },
  );
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
    name: routeCopy.itemListName,
    numberOfItems: grants.length,
    itemListElement: grants.map((grant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getGrantSeoDisplayName(grant, locale),
      url: new URL(buildLocalePath(locale, `/grants/${grant.slug}`), siteUrl).toString(),
    })),
  };

  const hubLinks = [
    {
      href: "/grants",
      title: routeCopy.hubGrantTypesTitle,
      description: routeCopy.hubGrantTypesDescription,
    },
    {
      href: "/payment-dates",
      title: routeCopy.hubPaymentDatesTitle,
      description: routeCopy.hubPaymentDatesDescription,
    },
    {
      href: "/grants/older-persons",
      title: routeCopy.hubOldAgeTitle,
      description: routeCopy.hubOldAgeDescription,
    },
    {
      href: "/grants/social-relief",
      title: routeCopy.hubSrdTitle,
      description: routeCopy.hubSrdDescription,
    },
    {
      href: "/claim-checker",
      title: routeCopy.hubClaimTitle,
      description: routeCopy.hubClaimDescription,
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbGrantAmounts, path: "/grant-amounts" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      <Section eyebrow={routeCopy.eyebrow} title={routeCopy.pageTitle}>
        <Card className="space-y-3">
          <p className="text-base text-muted">
            {routeCopy.intro}
          </p>
        </Card>
      </Section>

      <Section title={routeCopy.currentGrantAmountsTitle}>
        <Card>
          <GrantAmountTable locale={locale} />
        </Card>
      </Section>

      <Section title={routeCopy.amountsByGrantTypeTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((grant) => {
            const details = getGrantAmountDetails(grant.slug, locale);

            return (
              <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
                <Card className="space-y-3">
                  <h3 className="text-xl font-semibold">{getGrantSeoDisplayName(grant, locale)}</h3>
                  {details ? <GrantAmountDisplay details={details} variant="summary" /> : null}
                  <p className="text-sm text-muted">{grant.summary}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title={routeCopy.relatedGuidesTitle}>
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

      <InternalLinkGrid locale={locale} title={routeCopy.moreAmountHelpTitle} items={hubLinks} />
    </div>
  );
}
