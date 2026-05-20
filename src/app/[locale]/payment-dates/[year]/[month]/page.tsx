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
import { formatPaymentPageLastUpdated, isPaymentYearIndexable } from "@/lib/payment-seo";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { formatDateLabel } from "@/lib/utils";

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
    title: `SASSA Grant Payout Dates for ${paymentMonth.label} (Official Calendar)`,
    description: `Looking for the official SASSA grant payout dates for ${paymentMonth.label}? View the confirmed payment schedule, see status definitions, and calculate when child, old age, and disability payments release.`,
    noIndex: !isPaymentYearIndexable(paymentMonth.year),
    noIndexFollow: true,
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
    listRelatedGuides(locale, 4, undefined, `${paymentMonth.label} grant dates social grant dates grant pay date`),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      limit: 2,
    }),
  ]);
  const lastUpdated = formatPaymentPageLastUpdated();
  const scheduleFaqs = [
    {
      question: `When do SASSA payment dates usually clear for ${paymentMonth.label}?`,
      answer: `SASSA payments are typically cleared on the morning of the published payment date. Bank processing times can vary, so funds may reflect later in the day depending on your commercial bank (such as Capitec, FNB, Nedbank, Standard Bank, or TymeBank).`,
    },
    {
      question: "What happens if a payment day falls on a weekend or public holiday?",
      answer: "SASSA payments are never released on weekends or national public holidays. If a scheduled date falls on a Saturday, Sunday, or public holiday, the release is usually shifted to the next standard business day.",
    },
    {
      question: "How do I check if my payment is ready or verify banking details?",
      answer: "You can check your payment status and banking details verification state by logging in securely to the official SASSA Services Portal. If your status shows 'Approved', your funds will be released during the designated payment window.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": scheduleFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

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
      name: `${entry.grantName} — ${getPaymentSummaryDayText(copy, {
        date: entry.date ? formatDateLabel(entry.date) : null,
        grantSlug: entry.grantSlug,
        month: paymentMonth.month,
        state: entry.state,
        year: paymentMonth.year,
      })}`,
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
        <p className="text-sm text-muted">Updated {lastUpdated}</p>
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
                    grantSlug: entry.grantSlug,
                    month: paymentMonth.month,
                    state: entry.state,
                    year: paymentMonth.year,
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

      {/* ── Schedules FAQ Section ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section title={`${paymentMonth.label} Payout FAQs`}>
        <div className="space-y-4">
          {scheduleFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[1.5rem] border border-border bg-surface p-6 transition-all hover:border-primary/20 hover:bg-surface-muted hover:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold tracking-tight text-foreground sm:text-lg">
                {faq.question}
                <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-strong transition-transform group-open:rotate-180">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-muted">
                {faq.answer}
              </p>
            </details>
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
