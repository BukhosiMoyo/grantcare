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
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import {
  filterIndexablePaymentPeriods,
  formatPaymentPageLastUpdated,
  getPaymentIndexYear,
} from "@/lib/payment-seo";
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

  const currentYear = new Date().getUTCFullYear();
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: `SASSA Payment Dates ${currentYear}: Monthly Grant Schedule`,
      metaDescription: `Find the ${currentYear} SASSA payment schedule for older persons, disability and children's grants. Check monthly dates, grant amounts and individual SRD payment guidance.`,
    },
    {
      metaTitle: `Izinsuku Zokukhokha Zezibonelelo ze-SASSA ${currentYear} | Izinsuku Zokukhokha ze-SRD, R350 ne-R370`,
      metaDescription: `Hlola izinsuku zokukhokha zezibonelelo ze-SASSA zango-${currentYear} ngenyanga, okuhlanganisa izinsuku ze-SRD, ukusesha kwe-R350 ne-R370, izinsuku zesibonelelo sabadala, nezinye izigaba ezinkulu zezibonelelo.`,
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/payment-dates",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbPaymentDates: "Payment dates",
      hubOldAgeTitle: "Check old age grant pay dates",
      hubOldAgeDescription: (label: string) => `Open ${label} Older Persons Grant payment dates when you need the old age grant pay day first.`,
      hubSrdTitle: "Check SRD payment dates",
      hubSrdDescription: (label: string) => `Open ${label} SRD payment dates for Social Relief of Distress and R370 timing.`,
      hubStatusTitle: "Check status meanings",
      hubStatusDescription: "Open status meanings when payment timing depends on approved, pending, banking, or reapplication wording.",
      hubBankingTitle: "Fix banking-related payment delays",
      hubBankingDescription: "Use the banking guide when payment timing may be delayed by bank details, verification, or a changed payment method.",
      hubAmountsTitle: "Check grant amounts",
      hubAmountsDescription: "Open current SASSA grant amounts if you need the amount beside the pay date.",
      hubDelayTitle: "Why payment is delayed",
      hubDelayDescription: "Open the delay guide if the date has passed or the wording still does not make sense.",
      heroTitle: (year: number) => `SASSA payment dates ${year}`,
      heroDescription: "Find your grant's payment date and amount. Published dates are listed below; SRD payment dates vary by person.",
      quickPayoutCalendarsTitle: (label: string) => `Quick Payout Calendars (${label})`,
      srdDatesTitle: (label: string) => `SASSA SRD Dates (${label})`,
      grantDatesTitle: (grantName: string, label: string) => `${grantName} (${label})`,
      srdDatesDescription: "Check SRD R370 status, banking updates, and payment windows.",
      grantDatesDescription: (grantName: string) => `View official and estimated ${grantName.toLowerCase()} payout schedules.`,
      upcomingPaymentsTitle: "Payment schedule",
      updatedLabel: "Updated",
      currentGrantAmountsTitle: "Current grant amounts",
      standardBaselineText: (year: number) => `Standard baseline ${year} amounts.`,
      paymentTablesTitle: (year: number) => `${year} Payment Tables`,
      quickCheckOptionsTitle: "Quick Check Options",
      faqTitle: "Frequently Asked Questions",
      popularPaymentRoutesTitle: "Popular payment routes",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbPaymentDates: "Izinsuku zokukhokha",
      hubOldAgeTitle: "Hlola izinsuku zokukhokha zesibonelelo sabadala",
      hubOldAgeDescription: (label: string) => `Vula izinsuku zokukhokha ze-Older Persons Grant zango-${label} uma udinga kuqala usuku lwesibonelelo sabadala.`,
      hubSrdTitle: "Hlola izinsuku zokukhokha ze-SRD",
      hubSrdDescription: (label: string) => `Vula izinsuku zokukhokha ze-SRD zango-${label} ze-Social Relief of Distress nesikhathi se-R370.`,
      hubStatusTitle: "Hlola izincazelo zesimo",
      hubStatusDescription: "Vula izincazelo zesimo uma isikhathi sokukhokha sincike kumagama athi approved, pending, banking, noma reapplication.",
      hubBankingTitle: "Lungisa ukubambezeleka kokukhokha okuhlobene nebhange",
      hubBankingDescription: "Sebenzisa umhlahlandlela wasebhange uma isikhathi sokukhokha singabambezeleka ngenxa yemininingwane yasebhange, ukuqinisekiswa, noma indlela yokukhokha eshintshiwe.",
      hubAmountsTitle: "Hlola amanani ezibonelelo",
      hubAmountsDescription: "Vula amanani amanje ezibonelelo ze-SASSA uma udinga inani eduze kosuku lokukhokha.",
      hubDelayTitle: "Kungani inkokhelo ibambezelekile",
      hubDelayDescription: "Vula umhlahlandlela wokubambezeleka uma usuku seludlulile noma amagama engakacaci.",
      heroTitle: (year: number) => `Izinsuku zokukhokha zezibonelelo ze-SASSA ${year}`,
      heroDescription: "Hlola izinsuku zokukhokha ze-SRD, izinsuku ze-R370, izinsuku zesibonelelo sabadala, nohlelo lwenyanga lwazo zonke izigaba ezinkulu zezibonelelo.",
      quickPayoutCalendarsTitle: (label: string) => `Amakhalenda asheshayo okukhokha (${label})`,
      srdDatesTitle: (label: string) => `Izinsuku ze-SASSA SRD (${label})`,
      grantDatesTitle: (grantName: string, label: string) => `${grantName} (${label})`,
      srdDatesDescription: "Hlola isimo se-SRD R370, izibuyekezo zasebhange, namawindi okukhokha.",
      grantDatesDescription: (grantName: string) => `Buka izinhlelo zokukhokha ezisemthethweni nezilinganisiwe ze-${grantName.toLowerCase()}.`,
      upcomingPaymentsTitle: "Izinkokhelo ezizayo",
      updatedLabel: "Kubuyekezwe",
      currentGrantAmountsTitle: "Amanani amanje ezibonelelo",
      standardBaselineText: (year: number) => `Amanani ayisisekelo ajwayelekile ka-${year}.`,
      paymentTablesTitle: (year: number) => `Amathebula Okukhokha ${year}`,
      quickCheckOptionsTitle: "Izindlela zokuhlola ngokushesha",
      faqTitle: "Imibuzo Evame Ukubuzwa",
      popularPaymentRoutesTitle: "Izindlela zokukhokha ezidumile",
    },
  );
  const [periods, paymentCategories, defaults, latestGuides, faqs] = await Promise.all([
    listPaymentPeriods(locale),
    listPaymentCategories(locale),
    getPaymentRouteDefaults(locale),
    listLatestGuides(locale, 4),
    listFaqs(locale),
  ]);

  const currentYear = getPaymentIndexYear();
  const lastUpdated = formatPaymentPageLastUpdated();
  const archive = filterIndexablePaymentPeriods(periods).slice(0, 12);
  const annualPeriods = periods.filter((entry) => entry.year === currentYear);
  const annualCategories = paymentCategories.filter((category) =>
    annualPeriods.some((period) => Boolean(period.grants[category.slug])),
  );
  const hubLinks = [
    {
      href: `/payment-dates/${defaults.year}/${defaults.monthSlug}/older-persons`,
      title: routeCopy.hubOldAgeTitle,
      description: routeCopy.hubOldAgeDescription(defaults.label),
    },
    {
      href: `/payment-dates/${defaults.year}/${defaults.monthSlug}/social-relief`,
      title: routeCopy.hubSrdTitle,
      description: routeCopy.hubSrdDescription(defaults.label),
    },
    {
      href: "/status",
      title: routeCopy.hubStatusTitle,
      description: routeCopy.hubStatusDescription,
    },
    {
      href: "/guides/how-to-update-banking-details",
      title: routeCopy.hubBankingTitle,
      description: routeCopy.hubBankingDescription,
    },
    {
      href: "/grant-amounts",
      title: routeCopy.hubAmountsTitle,
      description: routeCopy.hubAmountsDescription,
    },
    {
      href: "/guides/why-payment-is-delayed",
      title: routeCopy.hubDelayTitle,
      description: routeCopy.hubDelayDescription,
    },
  ];

  const paymentFaqs = faqs.slice(0, 5);

  return (
    <div className="payment-page space-y-10">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbPaymentDates, path: "/payment-dates" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      {/* ── 1. Hero Redesign ── */}
      <section className="page-intro">
        <div className="space-y-4">
          <h1 className="page-title">
            {routeCopy.heroTitle(defaults.year)}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            {routeCopy.heroDescription}
          </p>
        </div>

      </section>

      <div className="space-y-8 lg:space-y-12">
        {/* ── 2. Current Month Schedule ── */}
        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{routeCopy.upcomingPaymentsTitle}</h2>
          </div>
          <PaymentScheduleTable
            entries={defaults.entries}
            locale={locale}
            month={defaults.month}
            monthLabel={defaults.label}
            monthPath={`/payment-dates/${defaults.year}/${defaults.monthSlug}`}
            year={defaults.year}
          />
          <p className="text-xs text-muted">{routeCopy.updatedLabel} {lastUpdated}</p>
        </section>

        <section id="choose-month" className="section-block">
          <h2 className="section-title">{locale === "en" ? "Choose another month" : copy.moreMonthsTitle}</h2>
          <div className="w-full">
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
        </section>

        {/* ── 3. Current Grant Amounts ── */}
        <section className="space-y-6 rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{routeCopy.currentGrantAmountsTitle}</h2>
            <p className="text-muted">{routeCopy.standardBaselineText(currentYear)}</p>
          </div>
          <GrantAmountTable locale={locale} />
        </section>
      </div>

      {annualCategories.length > 0 ? (
        <Section title={routeCopy.paymentTablesTitle(currentYear)}>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
             {annualCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}-${currentYear}`}
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
                anchorId={`${category.slug}-${currentYear}`}
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
        <Section title={routeCopy.quickCheckOptionsTitle}>
          <QuickCheckOptions locale={locale} />
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
        <Section title={routeCopy.faqTitle}>
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

      <InternalLinkGrid locale={locale} title={routeCopy.popularPaymentRoutesTitle} items={hubLinks} />
    </div>
  );
}
