import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BellIcon, CalendarIcon, CompassIcon, StatusIcon } from "@/components/icons";
import { FaqSchema } from "@/components/faq-schema";
import { GrantAmountTable } from "@/components/grant-amount-table";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
} from "@/components/grant-summary-card";
import { HomepageYearSchedule } from "@/components/homepage-year-schedule";
import { OfficialContactGrid } from "@/components/official-contact-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { ButtonLink, Card, Section } from "@/components/ui";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
import {
  getPaymentRouteDefaults,
  listLatestNews,
  getNextPaymentPeriod,
  listPaymentPeriodsForYear,
  listFaqs,
  listLatestGuides,
  listHomepageNotices,
  listStatusMeanings,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getHomepageContent } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { REPORTED_CHECK_METHODS } from "@/lib/official-resources";
import { buildLocalePath, isLocale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const defaults = await getPaymentRouteDefaults(locale);
  const homepage = getHomepageContent(locale, defaults.month, defaults.year);

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
  const homeSteps = [copy.homeStepOne, copy.homeStepTwo, copy.homeStepThree];
  const [defaults, statuses, notices, latestNews, latestGuides, faqs] = await Promise.all([
    getPaymentRouteDefaults(locale),
    listStatusMeanings(locale),
    listHomepageNotices(locale),
    listLatestNews(locale, 3),
    listLatestGuides(locale, 6),
    listFaqs(locale),
  ]);

  const homepage = getHomepageContent(locale, defaults.month, defaults.year);
  const [nextPeriod, yearPeriods] = await Promise.all([
    getNextPaymentPeriod(locale, defaults),
    listPaymentPeriodsForYear(locale, defaults.year),
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
      <FaqSchema faqs={faqs} />

      {/* ── 1. Hero ── */}
      <section className="space-y-6 pt-2">
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
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start">
          <div className="flex items-center gap-3">
            <ButtonLink href={buildLocalePath(locale, "/payment-dates")}>
              {copy.checkDates}
            </ButtonLink>
            <ButtonLink href={buildLocalePath(locale, "/status")} variant="secondary">
              {copy.statusHelp}
            </ButtonLink>
          </div>
          <WhatsAppChannelBanner compact />
        </div>
        <p className="max-w-3xl text-[16px] leading-[1.7] text-muted">{homepage.heroDisclaimer}</p>
      </section>

      {/* ── 1b. Payment Preview ── */}
      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-[18px] font-semibold uppercase text-primary/70 sm:text-[20px]">
              {copy.summaryMonthLabel}
            </p>
            <h2 className="text-[26px] font-bold tracking-tight text-foreground sm:text-[32px]">{defaults.label}</h2>
            <p className="max-w-2xl text-[16px] leading-[1.7] text-muted">{homepage.heroPreviewBody}</p>
          </div>
          <ButtonLink
            href={buildLocalePath(locale, `/payment-dates/${defaults.year}/${defaults.monthSlug}`)}
            variant="secondary"
          >
            {copy.viewMonth}
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:gap-4">
          {Object.values(defaults.grants).map((entry) => {
            const amountDetails = getGrantAmountDetails(entry.grantSlug);
            const payDayText = getPaymentSummaryDayText(copy, {
              date: entry.date ? formatDateLabel(entry.date) : null,
              state: entry.state,
            });
            const statusText = getPaymentSummaryStatusText(copy, entry.state);

            return (
              <Link
                key={entry.grantSlug}
                href={buildLocalePath(locale, `/payment-dates/${defaults.year}/${defaults.monthSlug}/${entry.grantSlug}`)}
                className="group flex flex-col justify-between gap-4 rounded-3xl border border-border bg-surface p-4 transition-all hover:scale-[1.02] hover:border-primary/30 hover:bg-surface-muted hover:shadow-sm sm:p-5"
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary sm:text-lg">{entry.grantName}</h3>
                  </div>
                  <div className="rounded-xl border border-primary/10 bg-primary/5 px-3 py-2 text-sm">
                    <span className="font-semibold text-primary">{statusText}:</span> <span className="text-primary">{payDayText}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {amountDetails ? (
                    amountDetails.map((detail) => (
                      <div key={detail.label} className="flex flex-col overflow-hidden rounded-2xl bg-surface-strong shadow-inner">
                        <div className="bg-foreground/5 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-muted">
                          {detail.label}
                        </div>
                        <div className="px-3 py-2 text-center text-2xl font-black tracking-tight text-primary sm:text-3xl">
                          {detail.amount}
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 2. Notices ── */}
      {notices.length > 0 ? (
        <section className="grid gap-3">
          {notices.map((notice) => (
            <Card key={notice.slug} className="space-y-2">
              <h2 className="text-lg font-semibold">{notice.title}</h2>
              <p className="text-[16px] leading-[1.7] text-muted">{notice.body}</p>
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

      {latestNews.length > 0 ? (
        <Section eyebrow={copy.news} title="Latest news">
          <div className="grid gap-4 md:grid-cols-3">
            {latestNews.map((article) => (
              <Link key={article.slug} href={buildLocalePath(locale, `/news/${article.slug}`)}>
                <Card className="space-y-2">
                  {article.publishedAt ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      {article.publishedAt.slice(0, 10)}
                    </p>
                  ) : null}
                  <h2 className="text-xl font-semibold tracking-tight">{article.title}</h2>
                  <p className="text-[16px] leading-[1.7] text-muted">{article.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── 3. Popular Tools ── */}
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
                    <p className="text-[16px] leading-[1.7] text-muted">{card.text}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── 4. Full Year Payment Schedule Table ── */}
      <Section eyebrow={copy.paymentDates} title={homepage.yearScheduleTitle}>
        <Card>
          <HomepageYearSchedule
            currentMonth={defaults.month}
            currentYear={defaults.year}
            locale={locale}
            periods={yearPeriods}
            title={homepage.yearScheduleTitle}
            description={homepage.yearScheduleBody}
          />
        </Card>
      </Section>

      {/* ── 5. How It Works ── */}
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

      {/* ── 6. Quick Check Options ── */}
      <Section eyebrow={copy.paymentDates} title="Quick check options">
        <QuickCheckOptions />
      </Section>

      {/* ── 7. Current Grant Amounts ── */}
      <Section eyebrow={copy.paymentDates} title="Current grant amounts">
        <Card>
          <GrantAmountTable />
        </Card>
      </Section>

      {/* ── 8. Ways to Check Your Status ── */}
      <Section eyebrow={copy.statusHelp} title={homepage.waysToCheckTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.waysToCheckBody}</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {REPORTED_CHECK_METHODS.map((method) => (
            <Card key={method.title} className="space-y-3">
              <h3 className="text-lg font-semibold tracking-tight">{method.title}</h3>
              <p className="text-xl font-semibold text-primary">{method.value}</p>
              <p className="text-[16px] leading-[1.7] text-muted">{method.detail}</p>
              {"href" in method && method.href ? (
                <a
                  href={method.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Open →
                </a>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 9. Status Meanings Preview ── */}
      <Section eyebrow={copy.statusMeanings} title={copy.commonStatusMeaningsTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          {statuses.slice(0, 4).map((status) => (
            <Link
              key={status.slug}
              href={buildLocalePath(locale, `/status/${status.slug}`)}
              className="rounded-3xl border border-border bg-surface px-4 py-4 transition-colors hover:bg-surface-muted"
            >
              <p className="font-semibold">{status.title}</p>
              <p className="mt-1 text-[16px] leading-[1.7] text-muted">{status.meaning}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 10. Next Month Preview ── */}
      {nextPeriod ? (
        <Section eyebrow={copy.paymentDates} title={homepage.nextMonthTitle}>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <p className="text-[26px] font-bold uppercase tracking-tight text-foreground sm:text-[32px]">
                  {nextPeriod.label}
                </p>
                <p className="text-[16px] leading-[1.7] text-muted">{homepage.nextMonthBody}</p>
              </div>
              <ButtonLink
                href={buildLocalePath(locale, `/payment-dates/${nextPeriod.year}/${nextPeriod.monthSlug}`)}
                variant="secondary"
              >
                {copy.viewMonth}
              </ButtonLink>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:gap-4">
              {Object.values(nextPeriod.grants).map((entry) => {
                  const amountDetails = getGrantAmountDetails(entry.grantSlug);
                  const payDayText = getPaymentSummaryDayText(copy, {
                    date: entry.date ? formatDateLabel(entry.date) : null,
                    state: entry.state,
                  });
                  const statusText = getPaymentSummaryStatusText(copy, entry.state);

                  return (
                    <Link
                      key={entry.grantSlug}
                      href={buildLocalePath(locale, `/payment-dates/${nextPeriod.year}/${nextPeriod.monthSlug}/${entry.grantSlug}`)}
                      className="group flex flex-col justify-between gap-4 rounded-3xl border border-border bg-surface p-4 transition-all hover:scale-[1.02] hover:border-primary/30 hover:bg-surface-muted hover:shadow-sm sm:p-5"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary sm:text-lg">{entry.grantName}</h3>
                        </div>
                        <div className="rounded-xl border border-primary/10 bg-primary/5 px-3 py-2 text-sm">
                          <span className="font-semibold text-primary">{statusText}:</span> <span className="text-primary">{payDayText}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        {amountDetails ? (
                          amountDetails.map((detail) => (
                            <div key={detail.label} className="flex flex-col overflow-hidden rounded-2xl bg-surface-strong shadow-inner">
                              <div className="bg-foreground/5 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-widest text-muted">
                                {detail.label}
                              </div>
                              <div className="px-3 py-2 text-center text-2xl font-black tracking-tight text-primary sm:text-3xl">
                                {detail.amount}
                              </div>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </Section>
      ) : null}

      {/* ── 11. Why People Use GrantCare ── */}
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
            <ul className="space-y-3 text-[16px] leading-[1.7] text-foreground">
              {homepage.supportPoints.map((point) => (
                <li key={point} className="rounded-3xl bg-surface px-4 py-3">
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── 12. Official Contacts ── */}
      <Section eyebrow={copy.officialLinks} title="Official contacts">
        <OfficialContactGrid />
      </Section>

      {/* ── 13. Latest Guides ── */}
      <Section eyebrow={copy.guides} title={homepage.latestGuidesTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.latestGuidesBody}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{guide.title}</h2>
                <p className="text-[16px] leading-[1.7] text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── 14. FAQs ── */}
      <Section eyebrow={copy.faq} title={homepage.faqTitle}>
        <p className="max-w-3xl text-base leading-8 text-muted">{homepage.faqBody}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.slice(0, 6).map((faq) => (
            <Card key={faq.id} className="space-y-2">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <p className="text-[16px] leading-[1.7] text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 15. Deeper Help CTA ── */}
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
