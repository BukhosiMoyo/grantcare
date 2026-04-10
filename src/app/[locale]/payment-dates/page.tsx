import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/page-view-tracker";
import { PaymentDateTool } from "@/components/payment-date-tool";
import { Card, Section } from "@/components/ui";
import {
  getPaymentRouteDefaults,
  listPaymentCategories,
  listPaymentPeriods,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getCopy(locale);

  return {
    title: copy.paymentDates,
    alternates: {
      canonical: `/${locale}/payment-dates`,
    },
  };
}

export default async function PaymentDatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [periods, paymentCategories, defaults] = await Promise.all([
    listPaymentPeriods(locale),
    listPaymentCategories(locale),
    getPaymentRouteDefaults(locale),
  ]);

  const archive = periods.filter((entry) => entry.year >= new Date().getFullYear()).slice(0, 12);

  return (
    <div className="space-y-8">
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.paymentDates} title={copy.monthlyPaymentSchedule}>
        <Card className="space-y-5">
          <p className="max-w-2xl text-sm text-muted">{copy.paymentScheduleIntro}</p>
          <PaymentDateTool
            locale={locale}
            months={archive.map((entry) => ({
              year: entry.year,
              monthSlug: entry.monthSlug,
              label: entry.label,
            }))}
            grants={paymentCategories.map((entry) => ({
              slug: entry.slug,
              name: entry.name,
            }))}
            defaultSelection={{
              year: defaults.year,
              monthSlug: defaults.monthSlug,
              grantSlug: defaults.entries[0]?.grantSlug ?? paymentCategories[0]?.slug ?? "older-persons",
            }}
            monthLabel={copy.monthLabel}
            grantTypeLabel={copy.grantTypeLabel}
            openLabel={copy.open}
          />
        </Card>
      </Section>

      <Section title={copy.archiveTitle}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {archive.map((entry) => (
            <Link
              key={`${entry.year}-${entry.month}`}
              href={buildLocalePath(locale, `/payment-dates/${entry.year}/${entry.monthSlug}`)}
            >
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{entry.label}</h3>
                <p className="text-sm text-muted">{copy.archiveCardText}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
