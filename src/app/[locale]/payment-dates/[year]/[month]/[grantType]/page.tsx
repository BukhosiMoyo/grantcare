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
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getPaymentEntry,
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { GRANT_AMOUNT_SOURCE, getGrantAmountDetails } from "@/lib/official-resources";
import { buildLocalePath, isLocale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string; grantType: string }>;
}): Promise<Metadata> {
  const { locale, year, month, grantType } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const [paymentMonth, paymentEntry] = await Promise.all([
    getPaymentPeriod(locale, Number(year), month),
    getPaymentEntry(locale, Number(year), month, grantType),
  ]);

  if (!paymentMonth || !paymentEntry) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}/${grantType}`,
    title: `${paymentEntry.grantName} Payment Date — ${paymentMonth.label} SASSA Schedule`,
    description: `Find the ${paymentEntry.grantName} payment date for ${paymentMonth.label}. See the confirmed pay day, grant amount, and current status.`,
  });
}

export default async function PaymentGrantPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string; grantType: string }>;
}) {
  const { locale, year, month, grantType } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [paymentMonth, paymentEntry] = await Promise.all([
    getPaymentPeriod(locale, Number(year), month),
    getPaymentEntry(locale, Number(year), month, grantType),
  ]);

  if (!paymentMonth || !paymentEntry) {
    notFound();
  }

  const [relatedGuides, recentPeriods, blocks] = await Promise.all([
    listRelatedGuides(
      locale,
      2,
      undefined,
      `${paymentEntry.grantName} ${paymentMonth.label} payment date`,
    ),
    listRecentPaymentPeriods(locale, {
      excludeMonth: paymentMonth.month,
      excludeYear: paymentMonth.year,
      limit: 2,
    }),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      grantSlug: grantType,
      limit: 2,
    }),
  ]);
  const hubLinks = [
    {
      href: `/grants/${paymentEntry.grantSlug}`,
      title: `${paymentEntry.grantName} grant guide`,
      description: "Open the grant page for checks, documents, and official next-step links tied to this payment category.",
    },
    {
      href: "/status/approved",
      title: "Approved status meaning",
      description: "Read the approved page when the payment date matters but the status wording still needs context.",
    },
    {
      href: "/guides/how-to-know-if-your-payment-is-ready",
      title: "How to know if payment is ready",
      description: "Use the readiness guide after approval or when you are waiting for release wording to change.",
    },
    {
      href: "/guides/how-to-fix-missing-payment-issues",
      title: "Missing payment help",
      description: "Open the missing-payment guide if the date passed and the payment still has not arrived.",
    },
  ];
  const amountDetails = getGrantAmountDetails(paymentEntry.grantSlug);

  const eventSchema = paymentEntry.date
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${paymentEntry.grantName} Payment — ${paymentMonth.label}`,
        description: `SASSA ${paymentEntry.grantName} payment date for ${paymentMonth.label}.`,
        startDate: paymentEntry.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        organizer: {
          "@type": "Organization",
          name: "SASSA",
          url: "https://www.sassa.gov.za/",
        },
        location: {
          "@type": "VirtualLocation",
          url: paymentEntry.officialHref,
        },
      }
    : null;

  return (
    <div className="space-y-8">
      {eventSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      ) : null}
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Payment dates", path: "/payment-dates" },
          { label: paymentMonth.label, path: `/payment-dates/${year}/${month}` },
          { label: paymentEntry.grantName, path: `/payment-dates/${year}/${month}/${grantType}` },
        ]}
      />
      <PageViewTracker
        name="payment_date.viewed"
        locale={locale}
        payload={{
          grantSlug: paymentEntry.grantSlug,
          month: paymentMonth.monthSlug,
          scope: "grant",
          year: paymentMonth.year,
        }}
      />
      <Section eyebrow={copy.paymentDates} title={`${paymentEntry.grantName} for ${paymentMonth.label}`}>
        <GrantSummaryCard
          amountDetails={amountDetails}
          amountLabel={copy.summaryAmountLabel}
          footer={
            <>
              {amountDetails ? (
                <a
                  href={GRANT_AMOUNT_SOURCE.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-primary"
                >
                  Official amount source
                </a>
              ) : null}
              <p className="max-w-2xl text-base text-muted">{paymentEntry.note}</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={buildLocalePath(locale, "/dashboard")}>{copy.saveDate}</ButtonLink>
                <ButtonLink href={buildLocalePath(locale, "/dashboard")} variant="secondary">
                  {copy.notifyMe}
                </ButtonLink>
                <TrackedExternalLink
                  href={paymentEntry.officialHref}
                  locale={locale}
                  eventName="official_resource.clicked"
                  eventPayload={{
                    destination: "payment-date",
                    grantSlug: paymentEntry.grantSlug,
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 text-base font-semibold hover:bg-surface-muted"
                >
                  {copy.officialLink}
                </TrackedExternalLink>
              </div>
            </>
          }
          payDayLabel={copy.summaryPayDayLabel}
          payDayText={getPaymentSummaryDayText(copy, {
            date: paymentEntry.date ? formatDateLabel(paymentEntry.date) : null,
            state: paymentEntry.state,
          })}
          statusText={getPaymentSummaryStatusText(copy, paymentEntry.state)}
          title={paymentEntry.grantName}
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

      <Section title={copy.morePaymentDatesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {recentPeriods.map((period) => (
            <Link
              key={`${period.year}-${period.month}`}
              href={buildLocalePath(locale, `/payment-dates/${period.year}/${period.monthSlug}`)}
            >
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{period.label}</h3>
                <p className="text-sm text-muted">{copy.morePaymentDatesText}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <InternalLinkGrid locale={locale} title="Related payment help" items={hubLinks} />

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
