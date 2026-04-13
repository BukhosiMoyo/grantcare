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
import { Card, Section } from "@/components/ui";
import {
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { formatDateLabel, sentenceCase } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}): Promise<Metadata> {
  const { locale, year, month } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const paymentMonth = await getPaymentPeriod(locale, Number(year), month);

  if (!paymentMonth) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}`,
    title: `SASSA Payment Dates for ${paymentMonth.label} — All Grant Types`,
    description: `Check SASSA payment dates for ${paymentMonth.label}. See confirmed dates for Older Persons, Disability, and Children's grants.`,
  });
}

export default async function PaymentMonthPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}) {
  const { locale, year, month } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const paymentMonth = await getPaymentPeriod(locale, Number(year), month);

  if (!paymentMonth) {
    notFound();
  }

  const [relatedPeriods, relatedGuides, blocks] = await Promise.all([
    listRecentPaymentPeriods(locale, {
      excludeMonth: paymentMonth.month,
      excludeYear: paymentMonth.year,
      limit: 3,
    }),
    listRelatedGuides(locale, 4, undefined, `${paymentMonth.label} payment dates`),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      limit: 2,
    }),
  ]);
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Return to the payment-date hub if you need another month or grant category.",
    },
    {
      href: "/status/approved",
      title: "Approved status meaning",
      description: "Read the approved status page if the timing makes more sense once the status is clear.",
    },
    {
      href: "/guides/how-to-understand-payment-dates",
      title: "How to understand payment dates",
      description: "Use the guide when you need help reading expected, pending, or portal-only timing.",
    },
    {
      href: "/guides/why-payment-is-delayed",
      title: "Why payment is delayed",
      description: "Open the delay guide if the payment window feels unclear or late.",
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `SASSA Payment Dates for ${paymentMonth.label}`,
    numberOfItems: paymentMonth.entries.length,
    itemListElement: paymentMonth.entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${entry.grantName} — ${entry.date ? formatDateLabel(entry.date) : sentenceCase(entry.state)}`,
      url: new URL(
        buildLocalePath(locale, `/payment-dates/${year}/${month}/${entry.grantSlug}`),
        siteUrl,
      ).toString(),
    })),
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Payment dates", path: "/payment-dates" },
          { label: paymentMonth.label, path: `/payment-dates/${year}/${month}` },
        ]}
      />
      <PageViewTracker
        name="payment_date.viewed"
        locale={locale}
        payload={{
          month: paymentMonth.monthSlug,
          scope: "month",
          year: paymentMonth.year,
        }}
      />
      <Section eyebrow={copy.paymentDates} title={paymentMonth.label}>
        <div className="grid gap-4">
          {paymentMonth.entries.map((entry) => {
            const amountDetails = getGrantAmountDetails(entry.grantSlug);

            return (
              <Link
                key={entry.grantSlug}
                href={buildLocalePath(locale, `/payment-dates/${year}/${month}/${entry.grantSlug}`)}
                className="block"
              >
                <GrantSummaryCard
                  amountDetails={amountDetails}
                  amountLabel={copy.summaryAmountLabel}
                  className="h-full transition-colors hover:bg-surface-muted"
                  footer={<p className="text-base text-muted">{entry.note}</p>}
                  payDayLabel={copy.summaryPayDayLabel}
                  payDayText={getPaymentSummaryDayText(copy, {
                    date: entry.date ? formatDateLabel(entry.date) : null,
                    state: entry.state,
                  })}
                  statusText={getPaymentSummaryStatusText(copy, entry.state)}
                  title={entry.grantName}
                />
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title={copy.moreMonthsTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPeriods.map((period) => (
            <Link
              key={`${period.year}-${period.month}`}
              href={buildLocalePath(locale, `/payment-dates/${period.year}/${period.monthSlug}`)}
            >
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{period.label}</h3>
                <p className="text-sm text-muted">{copy.moreMonthsText}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm leading-7 text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <InternalLinkGrid locale={locale} title="More payment help" items={hubLinks} />

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
