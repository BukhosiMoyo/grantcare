import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
  getSrdPaymentWindowText,
  GrantSummaryCard,
} from "@/components/grant-summary-card";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getPaymentEntry,
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { GRANT_AMOUNT_SOURCE, getGrantAmountDetails } from "@/lib/official-resources";
import { formatPaymentPageLastUpdated, isPaymentYearIndexable } from "@/lib/payment-seo";
import {
  getPaymentGrantSeoDescription,
  getPaymentGrantSeoDisplayName,
  getPaymentGrantSeoReferenceText,
  getPaymentGrantSeoTitle,
} from "@/lib/seo-aliases";
import { buildLocalePath, isLocale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string; grantType: string }>;
}): Promise<Metadata> {
  const { locale, year, month, grantType } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const [paymentMonth, paymentEntry] = await Promise.all([
    getPaymentPeriod(locale, Number(year), month),
    getPaymentEntry(locale, Number(year), month, grantType),
  ]);

  if (!paymentMonth || !paymentEntry) {
    return {};
  }

  const paymentDateText = paymentEntry.date
    ? formatDateLabel(paymentEntry.date)
    : paymentEntry.grantSlug === "social-relief"
      ? getSrdPaymentWindowText(paymentMonth.year, paymentMonth.month)
      : null;

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}/${grantType}`,
    title: getPaymentGrantSeoTitle(paymentEntry, paymentMonth.label, paymentDateText),
    description: getPaymentGrantSeoDescription(paymentEntry, paymentMonth.label, paymentDateText),
    noIndex: !isPaymentYearIndexable(paymentMonth.year),
    noIndexFollow: true,
  });
}

export default async function PaymentGrantPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string; grantType: string }>;
}) {
  const { locale, year, month, grantType } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [paymentMonth, paymentEntry] = await Promise.all([
    getPaymentPeriod(locale, Number(year), month),
    getPaymentEntry(locale, Number(year), month, grantType),
  ]);

  if (!paymentMonth || !paymentEntry) {
    notFound();
  }

  const displayGrantName = getPaymentGrantSeoDisplayName(paymentEntry);

  const [relatedGuides, recentPeriods, blocks] = await Promise.all([
    listRelatedGuides(locale, 2, undefined, getPaymentGrantSeoReferenceText(paymentEntry, paymentMonth.label)),
    listRecentPaymentPeriods(locale, {
      excludeMonth: paymentMonth.month,
      excludeYear: paymentMonth.year,
      limit: 2,
    }),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      grantSlug: grantType,
      limit: 2,
    }),
  ]);
  const hubLinks = [
    {
      href: `/grants/${paymentEntry.grantSlug}`,
      title: `Check ${displayGrantName} guide`,
      description: "Open the grant page for checks, documents, and official next-step links tied to this payment category.",
    },
    {
      href: "/status/approved",
      title: "Approved status meaning",
      description: "Read the approved page when the payment date matters but the status wording still needs context.",
    },
    {
      href: "/guides/how-to-know-if-your-payment-is-ready",
      title: "How to know if payment is ready",
      description: "Use the readiness guide after approval or when you are waiting for release wording to change.",
    },
    {
      href: "/guides/how-to-fix-missing-payment-issues",
      title: "Missing payment help",
      description: "Open the missing-payment guide if the date passed and the payment still has not arrived.",
    },
  ];
  const amountDetails = getGrantAmountDetails(paymentEntry.grantSlug);
  const payDayText = getPaymentSummaryDayText(copy, {
    date: paymentEntry.date ? formatDateLabel(paymentEntry.date) : null,
    grantSlug: paymentEntry.grantSlug,
    month: paymentMonth.month,
    state: paymentEntry.state,
    year: paymentMonth.year,
  });
  const resultTitle =
    paymentEntry.date || paymentEntry.grantSlug === "social-relief"
      ? `${displayGrantName} payment ${paymentEntry.grantSlug === "social-relief" ? "window" : "date"}: ${payDayText}`
      : `${displayGrantName} payment dates for ${paymentMonth.label}`;
  const lastUpdated = formatPaymentPageLastUpdated();

  const scheduleFaqs = [
    {
      question: `When will the SASSA ${displayGrantName} payment for ${paymentMonth.label} reflect?`,
      answer: paymentEntry.grantSlug === "social-relief"
        ? `SASSA Social Relief of Distress (SRD) R370 payments do not have a single fixed pay date. Instead, they are processed during the designated payment window at the end of the month (normally between the 20th and 30th of ${paymentMonth.label}) once your status on the portal shows 'Approved'.`
        : `The SASSA ${displayGrantName} is officially scheduled for payout on ${payDayText}. Commercial banks typically process these payments early in the morning, meaning your funds should reflect in your bank account or be ready for retail collection on that day.`,
    },
    {
      question: `Where can I collect my ${displayGrantName} payout once it is paid?`,
      answer: `Once paid, you can withdraw your SASSA ${displayGrantName} funds directly from CAPITEC, FNB, Standard Bank, Nedbank, or TymeBank if you submitted bank details. Alternatively, you can collect your cash at participating South African retail merchants including Pick n Pay, Boxer, Shoprite, Checkers, and Usave.`,
    },
    {
      question: `What does it mean if my ${displayGrantName} status is 'Approved' but there is no payment date?`,
      answer: `If your SASSA status is 'Approved' for ${paymentMonth.label} but has no payment date, it means your application has been verified, but SASSA is still processing the bank payment batch. Keep monitoring the SASSA Services Portal as payment dates are updated in batches.`,
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

  const eventSchema = paymentEntry.date
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${displayGrantName} Payment — ${paymentMonth.label}`,
        description: `SASSA ${displayGrantName} payment date for ${paymentMonth.label}.`,
        startDate: paymentEntry.date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        organizer: {
          "@type": "Organization",
          name: "SASSA",
          url: "https://www.sassa.gov.za/",
        },
        location: {
          "@type": "VirtualLocation",
          url: paymentEntry.officialHref,
        },
      }
    : null;

  return (
    <div className="space-y-8">
      {eventSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Payment dates", path: "/payment-dates" },
          { label: paymentMonth.label, path: `/payment-dates/${year}/${month}` },
          { label: displayGrantName, path: `/payment-dates/${year}/${month}/${grantType}` },
        ]}
      />
      <PageViewTracker
        name="payment_date.viewed"
        locale={locale}
        payload={{
          grantSlug: paymentEntry.grantSlug,
          month: paymentMonth.monthSlug,
          scope: "grant",
          year: paymentMonth.year,
        }}
      />
      <Section
        eyebrow={copy.paymentDates}
        title={resultTitle}
      >
        <GrantSummaryCard
          amountDetails={amountDetails}
          amountLabel={copy.summaryAmountLabel}
          footer={
            <>
              {amountDetails ? (
                <a
                  href={GRANT_AMOUNT_SOURCE.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-semibold text-primary"
                >
                  Official amount source
                </a>
              ) : null}
              <p className="text-sm text-muted">Updated {lastUpdated}</p>
              <p className="max-w-2xl text-base text-muted">{paymentEntry.note}</p>
              {paymentEntry.date ? (
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={buildLocalePath(locale, "/dashboard")}>{copy.saveDate}</ButtonLink>
                  <ButtonLink href={buildLocalePath(locale, "/dashboard")} variant="secondary">
                    {copy.notifyMe}
                  </ButtonLink>
                </div>
              ) : null}
            </>
          }
          payDayLabel={
            paymentEntry.grantSlug === "social-relief" && !paymentEntry.date
              ? "Payment window"
              : copy.summaryPayDayLabel
          }
          payDayText={payDayText}
          statusText={getPaymentSummaryStatusText(copy, paymentEntry.state)}
          title={displayGrantName}
        />
      </Section>

      {/* ── Scam & Fraud Prevention Callout ── */}
      <Card className="border border-amber-500/15 bg-amber-500/[0.03] space-y-4 p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Security Alert
              </span>
              <h3 className="text-lg font-semibold text-foreground">Scam & Fraud Prevention</h3>
            </div>
            <p className="text-sm leading-6 text-muted">
              SASSA will <strong>never</strong> ask you for your portal password, PIN, or full banking credentials via SMS, WhatsApp, or phone call. Always protect your personal details:
            </p>
            <ul className="grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2 mt-2 list-none pl-0">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Do not share your R370 status check SMS link with anyone.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Never pay anyone to speed up or approve your grant application.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Only update banking details through the secure official portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Beware of fake WhatsApp support channels claiming to represent SASSA.</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* ── Schedules FAQ Section ── */}
      <Section title={`${displayGrantName} Payout FAQs`}>
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

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={copy.morePaymentDatesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {recentPeriods.map((period) => (
            <Link
              key={`${period.year}-${period.month}`}
              href={buildLocalePath(locale, `/payment-dates/${period.year}/${period.monthSlug}`)}
            >
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{period.label}</h3>
                <p className="text-sm text-muted">{copy.morePaymentDatesText}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <InternalLinkGrid locale={locale} title="Related payment help" items={hubLinks} />

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
