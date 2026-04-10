import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import {
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";
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
    title: `${paymentMonth.label} payment dates`,
    description: `Published and expected payment dates for ${paymentMonth.label}.`,
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

  const [relatedPeriods, blocks] = await Promise.all([
    listRecentPaymentPeriods(locale, {
      excludeMonth: paymentMonth.month,
      excludeYear: paymentMonth.year,
      limit: 3,
    }),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      limit: 2,
    }),
  ]);

  return (
    <div className="space-y-8">
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
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMonth.entries.map((entry) => (
            <Link
              key={entry.grantSlug}
              href={buildLocalePath(locale, `/payment-dates/${year}/${month}/${entry.grantSlug}`)}
            >
              <Card className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{entry.grantName}</h3>
                  <p className="text-sm text-muted">
                    {entry.state === "expected"
                      ? copy.paymentEstimate
                      : entry.state === "pending"
                        ? copy.paymentPending
                        : copy.paymentPortalOnly}
                  </p>
                </div>
                <p className="text-base font-medium text-primary">
                  {entry.date ? formatDateLabel(entry.date) : copy.paymentPortalOnly}
                </p>
                <p className="text-sm text-muted">{entry.note}</p>
              </Card>
            </Link>
          ))}
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

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
