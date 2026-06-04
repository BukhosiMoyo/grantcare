import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
  GrantSummaryCard,
} from "@/components/grant-summary-card";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import {
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { formatPaymentPageLastUpdated, isPaymentYearIndexable } from "@/lib/payment-seo";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
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

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: (label: string) => `SASSA Grant Payout Dates for ${label} (Official Calendar)`,
      metaDescription: (label: string) => `Looking for the official SASSA grant payout dates for ${label}? View the confirmed payment schedule, see status definitions, and calculate when child, old age, and disability payments release.`,
    },
    {
      metaTitle: (label: string) => `Izinsuku Zokukhokha Zezibonelelo ze-SASSA zango-${label} (Ikhalenda Esemthethweni)`,
      metaDescription: (label: string) => `Ufuna izinsuku zokukhokha zezibonelelo ze-SASSA ezisemthethweni zango-${label}? Buka uhlelo lokukhokha oluqinisekisiwe, izincazelo zesimo, nokuthi izinkokhelo zezingane, abadala, nezokukhubazeka zikhishwa nini.`,
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}`,
    title: routeCopy.metaTitle(paymentMonth.label),
    description: routeCopy.metaDescription(paymentMonth.label),
    noIndex: !isPaymentYearIndexable(paymentMonth.year),
    noIndexFollow: true,
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbPaymentDates: "Payment dates",
      updatedLabel: "Updated",
      faqClearQuestion: (label: string) => `When do SASSA payment dates usually clear for ${label}?`,
      faqClearAnswer: "SASSA payments are typically cleared on the morning of the published payment date. Bank processing times can vary, so funds may reflect later in the day depending on your commercial bank (such as Capitec, FNB, Nedbank, Standard Bank, or TymeBank).",
      faqWeekendQuestion: "What happens if a payment day falls on a weekend or public holiday?",
      faqWeekendAnswer: "SASSA payments are never released on weekends or national public holidays. If a scheduled date falls on a Saturday, Sunday, or public holiday, the release is usually shifted to the next standard business day.",
      faqVerifyQuestion: "How do I check if my payment is ready or verify banking details?",
      faqVerifyAnswer: "You can check your payment status and banking details verification state by logging in securely to the official SASSA Services Portal. If your status shows 'Approved', your funds will be released during the designated payment window.",
      hubPaymentDatesDescription: "Return to the payment-date hub if you need another month or grant category.",
      hubApprovedTitle: "Approved status meaning",
      hubApprovedDescription: "Read the approved status page if the timing makes more sense once the status is clear.",
      hubUnderstandTitle: "How to understand payment dates",
      hubUnderstandDescription: "Use the guide when you need help reading expected, pending, or portal-only timing.",
      hubDelayTitle: "Why payment is delayed",
      hubDelayDescription: "Open the delay guide if the payment window feels unclear or late.",
      itemListName: (label: string) => `SASSA Payment Dates for ${label}`,
      payoutFaqTitle: (label: string) => `${label} Payout FAQs`,
      morePaymentHelpTitle: "More payment help",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbPaymentDates: "Izinsuku zokukhokha",
      updatedLabel: "Kubuyekezwe",
      faqClearQuestion: (label: string) => `Izinsuku zokukhokha ze-SASSA zivame ukungena nini zango-${label}?`,
      faqClearAnswer: "Izinkokhelo ze-SASSA zivame ukucaciswa ekuseni ngosuku lokukhokha olushicilelwe. Izikhathi zamabhange zingahluka, ngakho imali ingavela kamuva ngalolo suku kuye ngebhange lakho.",
      faqWeekendQuestion: "Kwenzekani uma usuku lokukhokha luwela ngempelasonto noma ngeholide lomphakathi?",
      faqWeekendAnswer: "Izinkokhelo ze-SASSA azikhishwa ngezimpelasonto noma ngamaholide omphakathi kazwelonke. Uma usuku luwela ngoMgqibelo, ngeSonto, noma ngeholide, ukukhishwa kuvame ukuhanjiswa osukwini lwebhizinisi olulandelayo.",
      faqVerifyQuestion: "Ngihlola kanjani ukuthi inkokhelo yami isilungile noma ngiqinisekise imininingwane yasebhange?",
      faqVerifyAnswer: "Ungahlola isimo senkokhelo nokuqinisekiswa kwemininingwane yasebhange ngokungena ngokuphepha ku-SASSA Services Portal esemthethweni. Uma isimo sakho sithi 'Approved', imali izokhishwa ngesikhathi sewindi lokukhokha elibekiwe.",
      hubPaymentDatesDescription: "Buyela kuhabhu yezinsuku zokukhokha uma udinga enye inyanga noma isigaba sesibonelelo.",
      hubApprovedTitle: "Incazelo yesimo esithi Approved",
      hubApprovedDescription: "Funda ikhasi lesimo esithi approved uma isikhathi sokukhokha sicaca kangcono lapho isimo sesicacile.",
      hubUnderstandTitle: "Indlela yokuqonda izinsuku zokukhokha",
      hubUnderstandDescription: "Sebenzisa umhlahlandlela uma udinga usizo lokufunda isikhathi esilindelekile, esisalindile, noma esibonakala ephothali kuphela.",
      hubDelayTitle: "Kungani inkokhelo ibambezelekile",
      hubDelayDescription: "Vula umhlahlandlela wokubambezeleka uma iwindi lokukhokha lingacaci noma libonakala sekwephuzile.",
      itemListName: (label: string) => `Izinsuku Zokukhokha ze-SASSA zango-${label}`,
      payoutFaqTitle: (label: string) => `Imibuzo ye-Payout zango-${label}`,
      morePaymentHelpTitle: "Olunye usizo lokukhokha",
    },
  );
  const paymentMonth = await getPaymentPeriod(locale, Number(year), month);

  if (!paymentMonth) {
    notFound();
  }

  const [relatedPeriods, relatedGuides, blocks] = await Promise.all([
    listRecentPaymentPeriods(locale, {
      excludeMonth: paymentMonth.month,
      excludeYear: paymentMonth.year,
      limit: 3,
    }),
    listRelatedGuides(locale, 4, undefined, `${paymentMonth.label} grant dates social grant dates grant pay date`),
    listMonetizationBlocks(locale, {
      placement: "payment-dates",
      limit: 2,
    }),
  ]);
  const lastUpdated = formatPaymentPageLastUpdated();
  const scheduleFaqs = [
    {
      question: routeCopy.faqClearQuestion(paymentMonth.label),
      answer: routeCopy.faqClearAnswer,
    },
    {
      question: routeCopy.faqWeekendQuestion,
      answer: routeCopy.faqWeekendAnswer,
    },
    {
      question: routeCopy.faqVerifyQuestion,
      answer: routeCopy.faqVerifyAnswer,
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

  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: routeCopy.hubPaymentDatesDescription,
    },
    {
      href: "/status/approved",
      title: routeCopy.hubApprovedTitle,
      description: routeCopy.hubApprovedDescription,
    },
    {
      href: "/guides/how-to-understand-payment-dates",
      title: routeCopy.hubUnderstandTitle,
      description: routeCopy.hubUnderstandDescription,
    },
    {
      href: "/guides/why-payment-is-delayed",
      title: routeCopy.hubDelayTitle,
      description: routeCopy.hubDelayDescription,
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: routeCopy.itemListName(paymentMonth.label),
    numberOfItems: paymentMonth.entries.length,
    itemListElement: paymentMonth.entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${entry.grantName} — ${getPaymentSummaryDayText(copy, {
        date: entry.date ? formatDateLabel(entry.date, locale) : null,
        grantSlug: entry.grantSlug,
        month: paymentMonth.month,
        state: entry.state,
        year: paymentMonth.year,
      })}`,
      url: new URL(
        buildLocalePath(locale, `/payment-dates/${year}/${month}/${entry.grantSlug}`),
        siteUrl,
      ).toString(),
    })),
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbPaymentDates, path: "/payment-dates" },
          { label: paymentMonth.label, path: `/payment-dates/${year}/${month}` },
        ]}
      />
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
        <p className="text-sm text-muted">{routeCopy.updatedLabel} {lastUpdated}</p>
        <div className="grid gap-4">
          {paymentMonth.entries.map((entry) => {
            const amountDetails = getGrantAmountDetails(entry.grantSlug, locale);

            return (
              <Link
                key={entry.grantSlug}
                href={buildLocalePath(locale, `/payment-dates/${year}/${month}/${entry.grantSlug}`)}
                className="block"
              >
                <GrantSummaryCard
                  amountDetails={amountDetails}
                  amountLabel={copy.summaryAmountLabel}
                  className="h-full transition-colors hover:bg-surface-muted"
                  footer={<p className="text-base text-muted">{entry.note}</p>}
                  payDayLabel={copy.summaryPayDayLabel}
                  payDayText={getPaymentSummaryDayText(copy, {
                    date: entry.date ? formatDateLabel(entry.date, locale) : null,
                    grantSlug: entry.grantSlug,
                    month: paymentMonth.month,
                    state: entry.state,
                    year: paymentMonth.year,
                  })}
                  statusText={getPaymentSummaryStatusText(copy, entry.state)}
                  title={entry.grantName}
                />
              </Link>
            );
          })}
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

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm leading-7 text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Schedules FAQ Section ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section title={routeCopy.payoutFaqTitle(paymentMonth.label)}>
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

      <InternalLinkGrid locale={locale} title={routeCopy.morePaymentHelpTitle} items={hubLinks} />

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
