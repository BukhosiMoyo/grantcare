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
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
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
    ? formatDateLabel(paymentEntry.date, locale)
    : paymentEntry.grantSlug === "social-relief"
      ? getSrdPaymentWindowText(paymentMonth.year, paymentMonth.month)
      : null;

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}/${grantType}`,
    title: getPaymentGrantSeoTitle(paymentEntry, paymentMonth.label, paymentDateText, locale),
    description: getPaymentGrantSeoDescription(paymentEntry, paymentMonth.label, paymentDateText, locale),
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbPaymentDates: "Payment dates",
      hubGrantTitle: (grantName: string) => `Check ${grantName} guide`,
      hubGrantDescription: "Open the grant page for checks, documents, and official next-step links tied to this payment category.",
      hubApprovedTitle: "Approved status meaning",
      hubApprovedDescription: "Read the approved page when the payment date matters but the status wording still needs context.",
      hubReadyTitle: "How to know if payment is ready",
      hubReadyDescription: "Use the readiness guide after approval or when you are waiting for release wording to change.",
      hubMissingTitle: "Missing payment help",
      hubMissingDescription: "Open the missing-payment guide if the date passed and the payment still has not arrived.",
      paymentResultTitle: (grantName: string, paymentKind: string, payDayText: string) => `${grantName} payment ${paymentKind}: ${payDayText}`,
      paymentDatesTitle: (grantName: string, label: string) => `${grantName} payment dates for ${label}`,
      paymentWindow: "window",
      paymentDate: "date",
      faqReflectQuestion: (grantName: string, label: string) => `When will the SASSA ${grantName} payment for ${label} reflect?`,
      faqSrdReflectAnswer: (label: string) => `SASSA Social Relief of Distress (SRD) R370 payments do not have a single fixed pay date. Instead, they are processed during the designated payment window at the end of the month (normally between the 20th and 30th of ${label}) once your status on the portal shows 'Approved'.`,
      faqReflectAnswer: (grantName: string, payDayText: string) => `The SASSA ${grantName} is officially scheduled for payout on ${payDayText}. Commercial banks typically process these payments early in the morning, meaning your funds should reflect in your bank account or be ready for retail collection on that day.`,
      faqCollectQuestion: (grantName: string) => `Where can I collect my ${grantName} payout once it is paid?`,
      faqCollectAnswer: (grantName: string) => `Once paid, you can withdraw your SASSA ${grantName} funds directly from CAPITEC, FNB, Standard Bank, Nedbank, or TymeBank if you submitted bank details. Alternatively, you can collect your cash at participating South African retail merchants including Pick n Pay, Boxer, Shoprite, Checkers, and Usave.`,
      faqApprovedQuestion: (grantName: string) => `What does it mean if my ${grantName} status is 'Approved' but there is no payment date?`,
      faqApprovedAnswer: (label: string) => `If your SASSA status is 'Approved' for ${label} but has no payment date, it means your application has been verified, but SASSA is still processing the bank payment batch. Keep monitoring the SASSA Services Portal as payment dates are updated in batches.`,
      eventName: (grantName: string, label: string) => `${grantName} Payment — ${label}`,
      eventDescription: (grantName: string, label: string) => `SASSA ${grantName} payment date for ${label}.`,
      officialAmountSource: "Official amount source",
      updatedLabel: "Updated",
      paymentWindowLabel: "Payment window",
      securityAlert: "Security Alert",
      scamTitle: "Scam & Fraud Prevention",
      scamPrefix: "SASSA will",
      scamStrong: "never",
      scamSuffix: "ask you for your portal password, PIN, or full banking credentials via SMS, WhatsApp, or phone call. Always protect your personal details:",
      scamBullets: [
        "Do not share your R370 status check SMS link with anyone.",
        "Never pay anyone to speed up or approve your grant application.",
        "Only update banking details through the secure official portal.",
        "Beware of fake WhatsApp support channels claiming to represent SASSA.",
      ],
      payoutFaqTitle: (grantName: string) => `${grantName} Payout FAQs`,
      relatedPaymentHelpTitle: "Related payment help",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbPaymentDates: "Izinsuku zokukhokha",
      hubGrantTitle: (grantName: string) => `Hlola umhlahlandlela we-${grantName}`,
      hubGrantDescription: "Vula ikhasi lesibonelelo ukuze ubone ukuhlola, imibhalo, nezixhumanisi zezinyathelo ezisemthethweni ezihlobene nalesi sigaba sokukhokha.",
      hubApprovedTitle: "Incazelo yesimo esithi Approved",
      hubApprovedDescription: "Funda ikhasi le-approved uma usuku lokukhokha lubalulekile kodwa amagama esimo esadinga umongo.",
      hubReadyTitle: "Indlela yokwazi ukuthi inkokhelo isilungile",
      hubReadyDescription: "Sebenzisa umhlahlandlela wokulungela ngemva kokuvunywa noma uma ulinde amagama okukhishwa ukuthi ashintshe.",
      hubMissingTitle: "Usizo lwenkokhelo engekho",
      hubMissingDescription: "Vula umhlahlandlela wenkokhelo engekho uma usuku seludlulile kodwa inkokhelo ingakafiki.",
      paymentResultTitle: (grantName: string, paymentKind: string, payDayText: string) => `Inkokhelo ye-${grantName} ${paymentKind}: ${payDayText}`,
      paymentDatesTitle: (grantName: string, label: string) => `Izinsuku zokukhokha ze-${grantName} zango-${label}`,
      paymentWindow: "iwindi",
      paymentDate: "usuku",
      faqReflectQuestion: (grantName: string, label: string) => `Inkokhelo ye-SASSA ${grantName} yango-${label} izovela nini?`,
      faqSrdReflectAnswer: (label: string) => `Izinkokhelo ze-SASSA Social Relief of Distress (SRD) R370 azinalo usuku olulodwa olumisiwe. Zicutshungulwa ngesikhathi sewindi lokukhokha ekupheleni kwenyanga, ngokuvamile phakathi komhla ka-20 no-30 ka-${label}, uma isimo sakho ephothali sithi 'Approved'.`,
      faqReflectAnswer: (grantName: string, payDayText: string) => `I-SASSA ${grantName} ihlelelwe ngokusemthethweni ukukhokhwa ngo-${payDayText}. Amabhange avame ukucubungula lezi zinkokhelo ekuseni kakhulu, okusho ukuthi imali ingavela ku-akhawunti yakho yasebhange noma ilungele ukuqoqwa ngalolo suku.`,
      faqCollectQuestion: (grantName: string) => `Ngingayiqoqa kuphi inkokhelo yami ye-${grantName} uma isikhokhiwe?`,
      faqCollectAnswer: (grantName: string) => `Uma isikhokhiwe, ungakhipha imali yakho ye-SASSA ${grantName} ngqo kwa-CAPITEC, FNB, Standard Bank, Nedbank, noma TymeBank uma ufake imininingwane yasebhange. Ungaqoqa futhi ukheshi kubadayisi baseNingizimu Afrika ababambe iqhaza, okuhlanganisa Pick n Pay, Boxer, Shoprite, Checkers, no-Usave.`,
      faqApprovedQuestion: (grantName: string) => `Kusho ukuthini uma isimo sami se-${grantName} sithi 'Approved' kodwa kungekho usuku lokukhokha?`,
      faqApprovedAnswer: (label: string) => `Uma isimo sakho se-SASSA sithi 'Approved' ngo-${label} kodwa kungekho usuku lokukhokha, kusho ukuthi isicelo sakho sesiqinisekisiwe, kodwa i-SASSA isacubungula iqoqo lenkokhelo yasebhange. Qhubeka uhlola i-SASSA Services Portal njengoba izinsuku zokukhokha zibuyekezwa ngamaqoqo.`,
      eventName: (grantName: string, label: string) => `Inkokhelo ye-${grantName} — ${label}`,
      eventDescription: (grantName: string, label: string) => `Usuku lokukhokha lwe-SASSA ${grantName} lwango-${label}.`,
      officialAmountSource: "Umthombo osemthethweni wenani",
      updatedLabel: "Kubuyekezwe",
      paymentWindowLabel: "Iwindi lokukhokha",
      securityAlert: "Isixwayiso sokuphepha",
      scamTitle: "Ukuvimbela imikhonyovu nokukhwabanisa",
      scamPrefix: "I-SASSA",
      scamStrong: "ayisoze",
      scamSuffix: "yakucela iphasiwedi yephothali, i-PIN, noma yonke imininingwane yasebhange nge-SMS, WhatsApp, noma ngocingo. Vikela imininingwane yakho:",
      scamBullets: [
        "Ungabelani ngesixhumanisi sakho se-SMS sokuhlola isimo se-R370 nanoma ubani.",
        "Ungalokothi ukhokhele noma ubani ukuze asheshise noma avume isicelo sakho sesibonelelo.",
        "Buyekeza imininingwane yasebhange kuphela ngephothali esemthethweni evikelekile.",
        "Qaphela iziteshi ze-WhatsApp ezingamanga ezithi zimele i-SASSA.",
      ],
      payoutFaqTitle: (grantName: string) => `Imibuzo ye-payout ye-${grantName}`,
      relatedPaymentHelpTitle: "Usizo lokukhokha oluhlobene",
    },
  );
  const [paymentMonth, paymentEntry] = await Promise.all([
    getPaymentPeriod(locale, Number(year), month),
    getPaymentEntry(locale, Number(year), month, grantType),
  ]);

  if (!paymentMonth || !paymentEntry) {
    notFound();
  }

  const displayGrantName = getPaymentGrantSeoDisplayName(paymentEntry, locale);

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
      title: routeCopy.hubGrantTitle(displayGrantName),
      description: routeCopy.hubGrantDescription,
    },
    {
      href: "/status/approved",
      title: routeCopy.hubApprovedTitle,
      description: routeCopy.hubApprovedDescription,
    },
    {
      href: "/guides/how-to-know-if-your-payment-is-ready",
      title: routeCopy.hubReadyTitle,
      description: routeCopy.hubReadyDescription,
    },
    {
      href: "/guides/how-to-fix-missing-payment-issues",
      title: routeCopy.hubMissingTitle,
      description: routeCopy.hubMissingDescription,
    },
  ];
  const amountDetails = getGrantAmountDetails(paymentEntry.grantSlug, locale);
  const payDayText = getPaymentSummaryDayText(copy, {
    date: paymentEntry.date ? formatDateLabel(paymentEntry.date, locale) : null,
    grantSlug: paymentEntry.grantSlug,
    month: paymentMonth.month,
    state: paymentEntry.state,
    year: paymentMonth.year,
  });
  const resultTitle =
    paymentEntry.date || paymentEntry.grantSlug === "social-relief"
      ? routeCopy.paymentResultTitle(
          displayGrantName,
          paymentEntry.grantSlug === "social-relief" ? routeCopy.paymentWindow : routeCopy.paymentDate,
          payDayText,
        )
      : routeCopy.paymentDatesTitle(displayGrantName, paymentMonth.label);
  const lastUpdated = formatPaymentPageLastUpdated();

  const scheduleFaqs = [
    {
      question: routeCopy.faqReflectQuestion(displayGrantName, paymentMonth.label),
      answer: paymentEntry.grantSlug === "social-relief"
        ? routeCopy.faqSrdReflectAnswer(paymentMonth.label)
        : routeCopy.faqReflectAnswer(displayGrantName, payDayText),
    },
    {
      question: routeCopy.faqCollectQuestion(displayGrantName),
      answer: routeCopy.faqCollectAnswer(displayGrantName),
    },
    {
      question: routeCopy.faqApprovedQuestion(displayGrantName),
      answer: routeCopy.faqApprovedAnswer(paymentMonth.label),
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
        name: routeCopy.eventName(displayGrantName, paymentMonth.label),
        description: routeCopy.eventDescription(displayGrantName, paymentMonth.label),
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
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbPaymentDates, path: "/payment-dates" },
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
                  {routeCopy.officialAmountSource}
                </a>
              ) : null}
              <p className="text-sm text-muted">{routeCopy.updatedLabel} {lastUpdated}</p>
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
              ? routeCopy.paymentWindowLabel
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
                {routeCopy.securityAlert}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{routeCopy.scamTitle}</h3>
            </div>
            <p className="text-sm leading-6 text-muted">
              {routeCopy.scamPrefix} <strong>{routeCopy.scamStrong}</strong> {routeCopy.scamSuffix}
            </p>
            <ul className="grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2 mt-2 list-none pl-0">
              {routeCopy.scamBullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ── Schedules FAQ Section ── */}
      <Section title={routeCopy.payoutFaqTitle(displayGrantName)}>
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

      <InternalLinkGrid locale={locale} title={routeCopy.relatedPaymentHelpTitle} items={hubLinks} />

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
