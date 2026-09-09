import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
  GrantSummaryCard,
} from "@/components/grant-summary-card";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getGrantBySlug,
  getPaymentRouteDefaults,
  listRelatedGrantTypes,
  listRelatedGuides,
  listStatusMeanings,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { GRANT_AMOUNT_SOURCE, getGrantAmountDetails } from "@/lib/official-resources";
import {
  getGrantSeoDescription,
  getGrantSeoDisplayName,
  getGrantSeoMetadataName,
  getGrantSeoReferenceText,
} from "@/lib/seo-aliases";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { formatDateLabel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; grantType: string }>;
}): Promise<Metadata> {
  const { locale, grantType } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const grant = await getGrantBySlug(locale, grantType);

  if (!grant) {
    return {};
  }

  const amountLabel = (await import("@/lib/official-resources")).getGrantAmountLabel(grantType, locale);

  const seoName = getGrantSeoMetadataName(grant, locale);
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      socialReliefMetaTitle: (name: string) => `${name}: SASSA Application, Status and Payment Help`,
      grantMetaTitle: (name: string) => `${name}: SASSA Eligibility, Amount and How to Apply`,
    },
    {
      socialReliefMetaTitle: (name: string) => `${name}: Isicelo se-SASSA, Isimo Nosizo Lokukhokha`,
      grantMetaTitle: (name: string) => `${name}: Ukufaneleka kwe-SASSA, Inani Nendlela Yokufaka Isicelo`,
    },
  );
  const metadataTitle =
    grant.slug === "social-relief"
      ? routeCopy.socialReliefMetaTitle(seoName)
      : routeCopy.grantMetaTitle(seoName);

  return buildLocalizedMetadata({
    locale,
    path: `/grants/${grantType}`,
    title: metadataTitle,
    description: getGrantSeoDescription(grant, amountLabel, locale),
  });
}

export default async function GrantDetailPage({
  params,
}: {
  params: Promise<{ locale: string; grantType: string }>;
}) {
  const { locale, grantType } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbGrants: "Grants",
      serviceType: "Social grant",
      areaServed: "South Africa",
      officialAmountSource: "Official amount source",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbGrants: "Izibonelelo",
      serviceType: "Isibonelelo somphakathi",
      areaServed: "INingizimu Afrika",
      officialAmountSource: "Umthombo osemthethweni wenani",
    },
  );
  const [grant, relatedGrants, statuses, paymentDefaults] = await Promise.all([
    getGrantBySlug(locale, grantType),
    listRelatedGrantTypes(locale, grantType, 3),
    listStatusMeanings(locale),
    getPaymentRouteDefaults(locale),
  ]);

  if (!grant) {
    notFound();
  }

  const relatedGuides = await listRelatedGuides(
    locale,
    2,
    undefined,
    getGrantSeoReferenceText(grant),
  );

  const paymentGrantSlug = grant.showInPaymentTool ? grant.slug : grant.paymentGroupSlug;
  const paymentDatesHref = paymentGrantSlug
    ? buildLocalePath(
        locale,
        `/payment-dates/${paymentDefaults.year}/${paymentDefaults.monthSlug}/${paymentGrantSlug}`,
      )
    : buildLocalePath(locale, "/payment-dates");
  const amountDetails = getGrantAmountDetails(grant.slug, locale);
  const paymentEntry = paymentGrantSlug ? paymentDefaults.grants[paymentGrantSlug] ?? null : null;
  const displayGrantName = getGrantSeoDisplayName(grant, locale);
  const hubLinks = (grant.slug === "social-relief"
    ? statuses.filter((status) =>
        ["pending", "identity-verification", "banking-issue", "reapplication-needed"].includes(
          status.slug,
        ),
      )
    : statuses.slice(0, 4)
  ).map((status) => ({
    href: `/status/${status.slug}`,
    title: status.title,
    description: status.meaning,
  }));

  const siteUrl = getSiteUrl();
  const govServiceSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: `SASSA ${displayGrantName}`,
    description: grant.summary,
    serviceType: routeCopy.serviceType,
    provider: {
      "@type": "GovernmentOrganization",
      name: "South African Social Security Agency (SASSA)",
      url: "https://www.sassa.gov.za/",
    },
    areaServed: {
      "@type": "Country",
      name: routeCopy.areaServed,
    },
    url: new URL(buildLocalePath(locale, `/grants/${grantType}`), siteUrl).toString(),
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(govServiceSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbGrants, path: "/grants" },
          { label: displayGrantName, path: `/grants/${grantType}` },
        ]}
      />
      <Section headingAs="h1" eyebrow={copy.eligibility} title={displayGrantName}>
        <GrantSummaryCard
          amountDetails={amountDetails}
          amountLabel={copy.summaryAmountLabel}
          footer={
            <>
              <p className="max-w-2xl text-base text-muted">{grant.summary}</p>
              {amountDetails ? (
                <a
                  href={GRANT_AMOUNT_SOURCE.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-primary"
                >
                  {routeCopy.officialAmountSource}
                </a>
              ) : null}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="font-semibold">{copy.whoItMayFit}</p>
                  <ul className="space-y-2 text-sm text-muted">
                    {grant.checks.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">{copy.documents}</p>
                  <ul className="space-y-2 text-sm text-muted">
                    {grant.documents.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <TrackedExternalLink
                  href={grant.officialHref}
                  locale={locale}
                  eventName="official_resource.clicked"
                  eventPayload={{ destination: "grant", grantSlug: grant.slug }}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-5 text-base font-semibold text-white hover:bg-primary-strong"
                >
                  {copy.officialNextStep}
                </TrackedExternalLink>
                <ButtonLink href={buildLocalePath(locale, "/eligibility-checker")} variant="secondary">
                  {copy.eligibility}
                </ButtonLink>
                <ButtonLink href={paymentDatesHref} variant="secondary">
                  {copy.paymentDates}
                </ButtonLink>
              </div>
            </>
          }
          payDayLabel={copy.summaryPayDayLabel}
          payDayText={
            paymentEntry
              ? getPaymentSummaryDayText(copy, {
                  date: paymentEntry.date ? formatDateLabel(paymentEntry.date, locale) : null,
                  grantSlug: paymentEntry.grantSlug,
                  month: paymentDefaults.month,
                  state: paymentEntry.state,
                  year: paymentDefaults.year,
                })
              : copy.summarySeePaymentDates
          }
          statusText={
            paymentEntry
              ? getPaymentSummaryStatusText(copy, paymentEntry.state)
              : copy.summarySeePaymentDates
          }
          title={displayGrantName}
        />
      </Section>

      <Section title={copy.relatedGuidesTitle}>
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

      <InternalLinkGrid locale={locale} title={copy.relatedStatusesTitle} items={hubLinks} columns="md:grid-cols-2" />

      <Section title={copy.otherGrantsTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedGrants.map((relatedGrant) => (
            <Link key={relatedGrant.slug} href={buildLocalePath(locale, `/grants/${relatedGrant.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{getGrantSeoDisplayName(relatedGrant, locale)}</h3>
                <p className="text-sm text-muted">{relatedGrant.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
