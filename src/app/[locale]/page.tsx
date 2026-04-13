import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BellIcon, CalendarIcon, CompassIcon, StatusIcon } from "@/components/icons";
import { GrantAmountTable } from "@/components/grant-amount-table";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
  GrantSummaryCard,
} from "@/components/grant-summary-card";
import { OfficialContactGrid } from "@/components/official-contact-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getPaymentRouteDefaults,
  listFaqs,
  listLatestGuides,
  listHomepageNotices,
  listStatusMeanings,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getHomepageContent } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { buildLocalePath, isLocale, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

type HomepageGrantPreviewEntry = {
  date: string | null;
  grantName: string;
  grantSlug: string;
  state: "expected" | "pending" | "portal-only";
};

function HomepagePaymentPreviewCard({
  amountLabel,
  entry,
  locale,
  monthSlug,
  payDayLabel,
  payDayText,
  statusText,
  year,
}: {
  amountLabel: string;
  entry: HomepageGrantPreviewEntry;
  locale: Locale;
  monthSlug: string;
  payDayLabel: string;
  payDayText: string;
  statusText: string;
  year: number;
}) {
  const amountDetails = getGrantAmountDetails(entry.grantSlug);

  return (
    <Link
      href={buildLocalePath(locale, `/payment-dates/${year}/${monthSlug}/${entry.grantSlug}`)}
      className="block"
    >
      <GrantSummaryCard
        amountDetails={amountDetails}
        amountLabel={amountLabel}
        className="h-full transition-colors hover:bg-surface-muted"
        payDayLabel={payDayLabel}
        payDayText={payDayText}
        statusText={statusText}
        title={entry.grantName}
      />
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const homepage = getHomepageContent(locale);

  return buildLocalizedMetadata({
    locale,
    path: "/",
    title: homepage.metaTitle,
    description: homepage.metaDescription,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const homepage = getHomepageContent(locale);
  const homeSteps = [copy.homeStepOne, copy.homeStepTwo, copy.homeStepThree];
  const [defaults, statuses, notices, latestGuides, faqs] = await Promise.all([
    getPaymentRouteDefaults(locale),
    listStatusMeanings(locale),
    listHomepageNotices(locale),
    listLatestGuides(locale, 6),
    listFaqs(locale),
  ]);

  const actionCards = [
    {
      title: copy.paymentDates,
      text: "Check the month, the grant type, and the payment state in one place.",
      href: buildLocalePath(locale, "/payment-dates"),
      icon: CalendarIcon,
    },
    {
      title: copy.statusHelp,
      text: "Understand what common status wording usually means before you guess.",
      href: buildLocalePath(locale, "/status"),
      icon: StatusIcon,
    },
    {
      title: copy.eligibilityChecker,
      text: "Use simple guidance to narrow the right grant direction before applying.",
      href: buildLocalePath(locale, "/eligibility-checker"),
      icon: CompassIcon,
    },
    {
      title: copy.reminders,
      text: "Save a preferred grant, language, and reminder choice on your dashboard.",
      href: buildLocalePath(locale, "/dashboard"),
      icon: BellIcon,
    },
  ];

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />

      <section className="surface-card overflow-hidden rounded-[2rem] px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="space-y-8">
          <div className="space-y-6 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
              {homepage.heroEyebrow}
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {homepage.heroTitle}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
                {homepage.heroDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={buildLocalePath(locale, "/payment-dates")}>{copy.checkDates}</ButtonLink>
              <ButtonLink href={buildLocalePath(locale, "/status")} variant="secondary">
                {copy.statusHelp}
              </ButtonLink>
            </div>
            <p className="max-w-3xl text-base leading-8 text-muted">{homepage.heroDisclaimer}</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(180deg,rgba(23,76,60,0.06),rgba(255,250,240,0.96))] p-5 sm:p-6">
              <div className="rounded-[1.5rem] border border-border bg-surface px-5 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 sm:text-sm">
                      {copy.summaryMonthLabel}
                    </p>
                    <p className="text-xl font-semibold text-primary sm:text-2xl">{defaults.label}</p>
                  </div>
                  <ButtonLink
                    href={buildLocalePath(locale, `/payment-dates/${defaults.year}/${defaults.monthSlug}`)}
                    variant="secondary"
                  >
                    {copy.viewMonth}
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70 sm:text-sm">
                    {defaults.label}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight">{homepage.heroPreviewTitle}</h2>
                  <p className="max-w-3xl text-base leading-8 text-muted">{homepage.heroPreviewBody}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {Object.values(defaults.grants)
                  .slice(0, 3)
                  .map((entry) => (
                    <HomepagePaymentPreviewCard
                      key={entry.grantSlug}
                      amountLabel={copy.summaryAmountLabel}
                      entry={entry}
                      locale={locale}
                      monthSlug={defaults.monthSlug}
                      payDayLabel={copy.summaryPayDayLabel}
                      payDayText={getPaymentSummaryDayText(copy, {
                        date: entry.date ? formatDateLabel(entry.date) : null,
                        state: entry.state,
                      })}
                      statusText={getPaymentSummaryStatusText(copy, entry.state)}
                      year={defaults.year}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {notices.length > 0 ? (
        <section className="grid gap-3">
          {notices.map((notice) => (
            <Card key={notice.slug} className="space-y-2">
              <h2 className="text-lg font-semibold">{notice.title}</h2>
              <p className="text-sm leading-7 text-muted">{notice.body}</p>
              {notice.href ? (
                <a
                  href={notice.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary"
                >
                  {copy.open}
                </a>
              ) : null}
            </Card>
          ))}
        </section>
      ) : null}

      <Section eyebrow={copy.popularTools} title={homepage.toolsTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.toolsIntro}</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {actionCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.href} href={card.href}>
                <Card className="flex h-full flex-col gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-strong text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold tracking-tight">{card.title}</h2>
                    <p className="text-sm leading-7 text-muted">{card.text}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow={copy.howItWorks} title={copy.howItWorks}>
        <div className="grid gap-4 md:grid-cols-3">
          {homeSteps.map((step, index) => (
            <Card key={step} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Step {index + 1}</p>
              <p className="text-base text-foreground">{step}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.paymentDates} title="Quick check options">
        <QuickCheckOptions />
      </Section>

      <Section eyebrow={copy.paymentDates} title="Current grant amounts">
        <Card>
          <GrantAmountTable />
        </Card>
      </Section>

      <Section eyebrow={copy.latestDates} title="Read the latest month carefully before you plan around a date.">
        <div className="space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                  {defaults.label}
                </p>
                <h2 className="text-2xl font-semibold">{copy.paymentDates}</h2>
              </div>
              <ButtonLink
                href={buildLocalePath(locale, `/payment-dates/${defaults.year}/${defaults.monthSlug}`)}
                variant="secondary"
              >
                {copy.viewMonth}
              </ButtonLink>
            </div>
            <div className="grid gap-3">
              {Object.values(defaults.grants).map((entry) => {
                return (
                  <HomepagePaymentPreviewCard
                    key={entry.grantSlug}
                    amountLabel={copy.summaryAmountLabel}
                    entry={entry}
                    locale={locale}
                    monthSlug={defaults.monthSlug}
                    payDayLabel={copy.summaryPayDayLabel}
                    payDayText={getPaymentSummaryDayText(copy, {
                      date: entry.date ? formatDateLabel(entry.date) : null,
                      state: entry.state,
                    })}
                    statusText={getPaymentSummaryStatusText(copy, entry.state)}
                    year={defaults.year}
                  />
                );
              })}
            </div>
          </Card>

          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
              {copy.statusMeanings}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {statuses.slice(0, 4).map((status) => (
                <Link
                  key={status.slug}
                  href={buildLocalePath(locale, `/status/${status.slug}`)}
                  className="rounded-3xl border border-border bg-surface px-4 py-4"
                >
                  <p className="font-semibold">{status.title}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{status.meaning}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title={homepage.supportTitle}>
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="space-y-4">
            <div className="narrative-copy">
              {homepage.supportParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
          <Card className="self-start">
            <ul className="space-y-3 text-sm leading-7 text-foreground">
              {homepage.supportPoints.map((point) => (
                <li key={point} className="rounded-3xl bg-surface px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section eyebrow={copy.officialLinks} title="Official contacts">
        <OfficialContactGrid />
      </Section>

      <Section eyebrow={copy.guides} title={homepage.latestGuidesTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.latestGuidesBody}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{guide.title}</h2>
                <p className="text-sm leading-7 text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.faq} title={homepage.faqTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.faqBody}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.slice(0, 6).map((faq) => (
            <Card key={faq.id} className="space-y-2">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <p className="text-sm leading-7 text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.guides} title={homepage.libraryTitle}>
        <Card className="space-y-4 rounded-[2rem]">
          <p className="max-w-3xl text-base leading-8 text-muted">{homepage.libraryBody}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={buildLocalePath(locale, "/guides")}>{copy.readGuides}</ButtonLink>
            <ButtonLink href={buildLocalePath(locale, "/eligibility-checker")} variant="secondary">
              {copy.eligibilityChecker}
            </ButtonLink>
          </div>
        </Card>
      </Section>
    </>
  );
}
