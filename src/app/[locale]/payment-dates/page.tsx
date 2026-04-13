import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { PaymentDateTool } from "@/components/payment-date-tool";
import { PaymentScheduleTable } from "@/components/payment-schedule-table";
import { PaymentYearTable } from "@/components/payment-year-table";
import { GrantAmountTable } from "@/components/grant-amount-table";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { Card, Section } from "@/components/ui";
import {
  getPaymentRouteDefaults,
  listLatestGuides,
  listPaymentCategories,
  listPaymentPeriods,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
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

  return buildLocalizedMetadata({
    locale,
    path: "/payment-dates",
    title: "Grant payment dates by month and grant type",
    description:
      "Check the latest month, open payment-date pages by grant type, and follow guides that explain delays, processing, and missing payments.",
  });
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
  const [periods, paymentCategories, defaults, latestGuides] = await Promise.all([
    listPaymentPeriods(locale),
    listPaymentCategories(locale),
    getPaymentRouteDefaults(locale),
    listLatestGuides(locale, 4),
  ]);

  const archive = periods.filter((entry) => entry.year >= new Date().getFullYear()).slice(0, 12);
  const annualPeriods = periods.filter((entry) => entry.year === 2026);
  const annualCategories = paymentCategories.filter((category) =>
    annualPeriods.some((period) => Boolean(period.grants[category.slug])),
  );
  const hubLinks = [
    {
      href: "/status/approved",
      title: "Approved but waiting",
      description: "Read the approved status meaning when the payment date is not the only thing you need to understand.",
    },
    {
      href: "/guides/how-to-understand-payment-dates",
      title: "How to understand payment dates",
      description: "Use the guide when you need help reading expected, pending, or portal-only timing.",
    },
    {
      href: "/guides/why-payment-is-delayed",
      title: "Why payment is delayed",
      description: "Open the delay guide if the date has passed or the wording still does not make sense.",
    },
    {
      href: "/guides/how-to-know-if-your-payment-is-ready",
      title: "How to know if payment is ready",
      description: "Check the readiness guide when you need the next step after approval or release wording.",
    },
  ];

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
          <PaymentScheduleTable
            entries={defaults.entries}
            locale={locale}
            monthLabel={defaults.label}
            monthPath={`/payment-dates/${defaults.year}/${defaults.monthSlug}`}
          />
          {annualCategories.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">2026 tables</p>
              <div className="flex flex-wrap gap-3">
                {annualCategories.map((category) => (
                  <a
                    key={category.slug}
                    href={`#${category.slug}-2026`}
                    className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 text-base font-semibold hover:bg-surface-muted"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Card>
      </Section>

      <Section title="Current grant amounts">
        <Card>
          <GrantAmountTable />
        </Card>
      </Section>

      {annualCategories.length > 0 ? (
        <Section title="2026 payment tables">
          <div className="space-y-4">
            {annualCategories.map((category) => (
              <PaymentYearTable
                key={category.slug}
                anchorId={`${category.slug}-2026`}
                grantSlug={category.slug}
                locale={locale}
                periods={annualPeriods}
                title={category.name}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="Quick check options">
        <QuickCheckOptions />
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

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {latestGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm leading-7 text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <InternalLinkGrid locale={locale} title="Payment-date follow-up" items={hubLinks} />
    </div>
  );
}
