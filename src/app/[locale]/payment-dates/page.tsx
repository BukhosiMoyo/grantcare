import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FaqSchema } from "@/components/faq-schema";
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
  listFaqs,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";

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

  return buildLocalizedMetadata({
    locale,
    path: "/payment-dates",
    title: `SASSA Grant Pay Dates ${currentYear} | SRD, R350 and R370 Payment Dates`,
    description: `Check SASSA grant pay dates for ${currentYear} by month, including SRD payment dates, R350 and R370 search intent, old age grant pay dates, and other main grant categories.`,
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
  const [periods, paymentCategories, defaults, latestGuides, faqs] = await Promise.all([
    listPaymentPeriods(locale),
    listPaymentCategories(locale),
    getPaymentRouteDefaults(locale),
    listLatestGuides(locale, 4),
    listFaqs(locale),
  ]);

  const archive = periods.filter((entry) => entry.year >= new Date().getFullYear()).slice(0, 12);
  const annualPeriods = periods.filter((entry) => entry.year === 2026);
  const annualCategories = paymentCategories.filter((category) =>
    annualPeriods.some((period) => Boolean(period.grants[category.slug])),
  );
  const hubLinks = [
    {
      href: `/payment-dates/${defaults.year}/${defaults.monthSlug}/older-persons`,
      title: "Check old age grant pay dates",
      description: `Open ${defaults.label} Older Persons Grant payment dates when you need the old age grant pay day first.`,
    },
    {
      href: `/payment-dates/${defaults.year}/${defaults.monthSlug}/social-relief`,
      title: "Check SRD payment dates",
      description: `Open ${defaults.label} SRD payment dates for Social Relief of Distress and R370 timing.`,
    },
    {
      href: "/status",
      title: "Check status meanings",
      description: "Open status meanings when payment timing depends on approved, pending, banking, or reapplication wording.",
    },
    {
      href: "/guides/how-to-update-banking-details",
      title: "Fix banking-related payment delays",
      description: "Use the banking guide when payment timing may be delayed by bank details, verification, or a changed payment method.",
    },
    {
      href: "/grant-amounts",
      title: "Check grant amounts",
      description: "Open current SASSA grant amounts if you need the amount beside the pay date.",
    },
    {
      href: "/guides/why-payment-is-delayed",
      title: "Why payment is delayed",
      description: "Open the delay guide if the date has passed or the wording still does not make sense.",
    },
  ];

  const paymentFaqs = faqs.slice(0, 5);

  return (
    <div className="space-y-12">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Payment dates", path: "/payment-dates" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      {/* ── 1. Hero Redesign ── */}
      <section className="flex flex-col items-center justify-center space-y-8 rounded-[2rem] bg-surface px-4 py-12 text-center shadow-sm sm:px-6 sm:py-20 lg:py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-7xl">
            SASSA grant pay dates {defaults.year}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Check SRD payment dates, R370 payment dates, old age grant pay dates, and the monthly schedule for every main grant category.
          </p>
        </div>

        <div className="w-full max-w-4xl rounded-3xl bg-surface-strong p-2 shadow-inner sm:p-4">
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
        </div>

        <div className="pt-4">
           <WhatsAppChannelBanner compact />
        </div>
      </section>

      <div className="space-y-8 lg:space-y-12">
        {/* ── 2. Current Month Schedule ── */}
        <section className="space-y-6 rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Upcoming Payments</h2>
            <p className="text-muted">{defaults.label}</p>
          </div>
          <PaymentScheduleTable
            entries={defaults.entries}
            locale={locale}
            monthLabel={defaults.label}
            monthPath={`/payment-dates/${defaults.year}/${defaults.monthSlug}`}
          />
        </section>

        {/* ── 3. Current Grant Amounts ── */}
        <section className="space-y-6 rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Current grant amounts</h2>
            <p className="text-muted">Standard baseline 2026 amounts.</p>
          </div>
          <GrantAmountTable />
        </section>
      </div>

      {annualCategories.length > 0 ? (
        <Section title="2026 Payment Tables">
          <div className="mb-8 flex flex-wrap justify-center gap-3">
             {annualCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}-2026`}
                  className="focus-ring tap-target inline-flex items-center justify-center rounded-2xl border border-border bg-surface px-6 py-2.5 text-sm font-bold tracking-wide transition-colors hover:bg-primary hover:text-white"
                >
                  {category.name}
                </a>
              ))}
          </div>
          <div className="space-y-8 lg:space-y-12">
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

      <div className="space-y-8 lg:space-y-12">
        <Section title="Quick Check Options">
          <QuickCheckOptions />
        </Section>

        <Section title={copy.archiveTitle}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((entry) => (
              <Link
                key={`${entry.year}-${entry.month}`}
                href={buildLocalePath(locale, `/payment-dates/${entry.year}/${entry.monthSlug}`)}
              >
                <Card className="space-y-2 transition-colors hover:border-primary/20 hover:bg-surface-muted">
                  <h3 className="text-xl font-semibold">{entry.label}</h3>
                  <p className="text-sm text-muted">{copy.archiveCardText}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {latestGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2 transition-colors hover:border-primary/20 hover:bg-surface-muted">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm leading-7 text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── FAQ Section ── */}
      {paymentFaqs.length > 0 ? (
        <Section title="Frequently Asked Questions">
          <FaqSchema faqs={paymentFaqs} />
          <div className="space-y-4">
            {paymentFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.5rem] border border-border bg-surface p-6 transition-colors hover:border-primary/20 hover:bg-surface-muted">
                <summary className="flex cursor-pointer items-center justify-between font-semibold tracking-tight text-foreground sm:text-lg">
                  {faq.question}
                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-strong transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div className="mt-4 text-sm leading-7 text-muted prose prose-sm prose-p:mb-4">
                  {faq.answer.split('\n').map((line, i) => (
                    line.trim() ? <p key={i}>{line}</p> : null
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      <InternalLinkGrid locale={locale} title="Popular payment routes" items={hubLinks} />
    </div>
  );
}
