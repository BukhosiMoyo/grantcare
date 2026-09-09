import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRightIcon,
  BookmarkIcon,
  CalendarIcon,
  MapPinIcon,
  PlusIcon,
  ShieldCheckIcon,
  StatusIcon,
} from "@/components/icons";
import { FaqSchema } from "@/components/faq-schema";
import { HomepageYearSchedule } from "@/components/homepage-year-schedule";
import { PageViewTracker } from "@/components/page-view-tracker";
import { PaymentPreview } from "@/components/payment-preview";
import { ButtonLink, Card } from "@/components/ui";
import { WhatsAppChannelLink } from "@/components/whatsapp-channel";
import {
  getPaymentRouteDefaults,
  listLatestNews,
  listPaymentPeriodsForYear,
  listFaqs,
  listGuides,
  listHomepageNotices,
  listStatusMeanings,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { filterIndexableGuides } from "@/lib/guide-seo";
import { getHomepageContent } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const defaults = await getPaymentRouteDefaults(locale);
  const homepage = getHomepageContent(locale, defaults.month, defaults.year);
  return buildLocalizedMetadata({
    locale,
    path: "/",
    title:
      locale === "en"
        ? `SASSA Payment Dates ${defaults.label} & Grant Help`
        : homepage.metaTitle,
    description: homepage.metaDescription,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getCopy(locale);
  const english = locale === "en";
  const [defaults, statuses, notices, latestNews, guides, faqs] =
    await Promise.all([
      getPaymentRouteDefaults(locale),
      listStatusMeanings(locale),
      listHomepageNotices(locale),
      listLatestNews(locale, 3),
      listGuides(locale),
      listFaqs(locale),
    ]);
  const homepage = getHomepageContent(locale, defaults.month, defaults.year);
  const yearPeriods = await listPaymentPeriodsForYear(locale, defaults.year);
  const visibleFaqs = faqs.slice(0, 6);
  const priorityGuides = [
    "sassa-office-visit-survival-guide",
    "how-to-update-banking-details",
    "why-is-my-status-pending",
  ];
  const selectedGuides = filterIndexableGuides(guides)
    .sort((a, b) => {
      const aPriority = priorityGuides.indexOf(a.slug);
      const bPriority = priorityGuides.indexOf(b.slug);
      return (
        (aPriority < 0 ? priorityGuides.length : aPriority) -
          (bPriority < 0 ? priorityGuides.length : bPriority) ||
        Number(b.featured) - Number(a.featured) ||
        a.sortOrder - b.sortOrder
      );
    })
    .slice(0, 3);
  const tools = [
    {
      title: copy.statusHelp,
      text: english
        ? "Understand approved, pending or declined."
        : copy.homepageStatusText,
      href: "/status",
      icon: StatusIcon,
    },
    {
      title: copy.eligibilityChecker,
      text: english
        ? "Explore the grant that may fit your situation."
        : copy.homepageEligibilityText,
      href: "/eligibility-checker",
      icon: ShieldCheckIcon,
    },
    {
      title: english ? "Find a SASSA office" : copy.officialLinks,
      text: english
        ? "Find regional contacts and directions."
        : homepage.waysToCheckBody,
      href: "/sassa-office-locator",
      icon: MapPinIcon,
    },
    {
      title: copy.guides,
      text: english
        ? "Get help with applications, appeals and payments."
        : homepage.latestGuidesBody,
      href: "/guides",
      icon: BookmarkIcon,
    },
  ];

  return (
    <div className="home-layout">
      <PageViewTracker name="page.viewed" locale={locale} />
      <FaqSchema faqs={visibleFaqs} />

      <div className="home-hero">
        <section className="hero-copy">
          <p className="eyebrow">{homepage.heroEyebrow}</p>
          <h1 className="hero-title">
            {english ? (
              <>
                SASSA payment dates. <br />
                <span>Made clear.</span>
              </>
            ) : (
              homepage.heroTitle
            )}
          </h1>
          <p className="hero-description">
            {english
              ? `Find ${defaults.label} grant dates, understand your status and take your next step.`
              : homepage.heroDescription}
          </p>
          <div className="hero-actions">
            <ButtonLink href={buildLocalePath(locale, "/payment-dates")}>
              {copy.checkDates}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={buildLocalePath(locale, "/status")}
              variant="secondary"
            >
              {copy.statusHelp}
            </ButtonLink>
          </div>
          <div className="hero-independence">
            <ShieldCheckIcon aria-hidden="true" />
            <p>{homepage.heroDisclaimer}</p>
          </div>
        </section>
        <PaymentPreview period={defaults} locale={locale} />
      </div>

      {notices.length > 0 ? (
        <section className="grid gap-3">
          {notices.map((notice) => (
            <Card key={notice.slug} className="space-y-2">
              <h2 className="text-lg font-bold">{notice.title}</h2>
              <p className="text-sm leading-7 text-muted">{notice.body}</p>
              {notice.href ? (
                <a
                  href={notice.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-action"
                >
                  {copy.open}
                  <ArrowRightIcon />
                </a>
              ) : null}
            </Card>
          ))}
        </section>
      ) : null}

      <section>
        <div className="section-topline">
          <div>
            <p className="eyebrow">{copy.popularTools}</p>
            <h2 className="section-title">
              {english ? "What can we help you with?" : homepage.toolsTitle}
            </h2>
          </div>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <Link
              href={buildLocalePath(locale, tool.href)}
              key={tool.href}
              className="tool-tile"
            >
              <span className="tool-icon">
                <tool.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.text}</p>
              <span className="tile-arrow">
                <ArrowRightIcon className="h-5 w-5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="status-feature">
        <div className="status-feature-intro">
          <p className="eyebrow">{copy.statusHelp}</p>
          <h2 className="section-title">
            {english
              ? "Make sense of your SASSA status."
              : copy.commonStatusMeaningsTitle}
          </h2>
          <p>
            {english
              ? "A status message is a starting point. Understand what it means and what to check before you take action."
              : homepage.waysToCheckBody}
          </p>
          <Link
            href={buildLocalePath(locale, "/status")}
            className="text-action"
          >
            {copy.statusHelp}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="status-list">
          {statuses.slice(0, 4).map((status) => (
            <Link
              key={status.slug}
              href={buildLocalePath(locale, `/status/${status.slug}`)}
              data-status={status.slug}
              className="status-row"
            >
              <span className="status-dot" aria-hidden="true" />
              <span>
                <strong>{status.title}</strong>
                <small>{status.meaning}</small>
              </span>
              <ArrowRightIcon className="h-4 w-4 text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {selectedGuides.length > 0 ? (
        <section>
          <div className="section-topline">
            <div>
              <p className="eyebrow">{copy.guides}</p>
              <h2 className="section-title">
                {english
                  ? "A little guidance. A clearer next step."
                  : homepage.latestGuidesTitle}
              </h2>
            </div>
            <Link
              href={buildLocalePath(locale, "/guides")}
              className="text-action"
            >
              {copy.readGuides}
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="guide-grid">
            {selectedGuides.map((guide, index) => (
              <Link
                key={guide.slug}
                href={buildLocalePath(locale, `/guides/${guide.slug}`)}
                className="story-card"
              >
                <div className="story-card-top">
                  <BookmarkIcon aria-hidden="true" />
                  <span>
                    {copy.guideLabel} / {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="story-card-body">
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <span className="text-action">
                    {copy.open}
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <div className="section-topline">
          <div>
            <p className="eyebrow">{copy.paymentDates}</p>
            <h2 className="section-title">
              {english
                ? `${defaults.year}, at a glance.`
                : homepage.yearScheduleTitle}
            </h2>
          </div>
          <Link
            href={buildLocalePath(locale, "/grant-amounts")}
            className="text-action"
          >
            {english ? "Grant amounts" : copy.summaryAmountLabel}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {yearPeriods.map((period) => (
            <Link
              key={`${period.year}-${period.month}`}
              href={buildLocalePath(
                locale,
                `/payment-dates/${period.year}/${period.monthSlug}`,
              )}
              className={`focus-ring flex min-h-14 items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${period.month === defaults.month ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground hover:border-primary/40"}`}
            >
              <span>{period.label}</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          ))}
        </div>
        <details className="rounded-xl border border-border bg-white p-5">
          <summary className="flex list-none items-center justify-between gap-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
            {homepage.yearScheduleTitle}
            <PlusIcon className="h-4 w-4" />
          </summary>
          <div className="mt-5">
            <HomepageYearSchedule
              currentMonth={defaults.month}
              currentYear={defaults.year}
              locale={locale}
              periods={yearPeriods}
              description={homepage.yearScheduleBody}
            />
          </div>
        </details>
      </section>

      {latestNews.length > 0 ? (
        <section>
          <div className="section-topline">
            <div>
              <p className="eyebrow">{copy.news}</p>
              <h2 className="section-title">
                {english ? "The updates that matter." : copy.news}
              </h2>
            </div>
            <Link
              href={buildLocalePath(locale, "/news")}
              className="text-action"
            >
              {copy.news}
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="news-list">
            {latestNews.map((article) => (
              <Link
                href={buildLocalePath(locale, `/news/${article.slug}`)}
                key={article.slug}
                className="news-row"
              >
                {article.publishedAt ? (
                  <time dateTime={article.publishedAt}>
                    {new Intl.DateTimeFormat(
                      locale === "en" ? "en-ZA" : locale,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      },
                    ).format(new Date(article.publishedAt))}
                  </time>
                ) : (
                  <span />
                )}
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-primary" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="faq-layout">
        <div className="space-y-4">
          <p className="eyebrow">{copy.faq}</p>
          <h2 className="section-title">{homepage.faqTitle}</h2>
          <Link href={buildLocalePath(locale, "/faq")} className="text-action">
            {copy.frequentlyAskedQuestionsTitle}
            <ArrowRightIcon />
          </Link>
        </div>
        <div className="faq-list">
          {visibleFaqs.map((faq) => (
            <details className="faq-item" key={faq.id}>
              <summary>
                {faq.question}
                <PlusIcon />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="official-strip">
        <div className="flex items-start gap-4">
          <span className="tool-icon mb-0 shrink-0">
            <CalendarIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2>{english ? "Keep useful updates close." : copy.reminders}</h2>
            <p>
              {english
                ? "Follow GrantCare on WhatsApp for payment-date updates and grant news."
                : homepage.toolsIntro}
            </p>
          </div>
        </div>
        <WhatsAppChannelLink locale={locale} className="text-action" />
      </section>
    </div>
  );
}
