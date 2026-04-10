import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ButtonLink, Card, Pill, Section } from "@/components/ui";
import {
  getPaymentEntry,
  getPaymentPeriod,
  listMonetizationBlocks,
  listRecentPaymentPeriods,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
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

  return buildLocalizedMetadata({
    locale,
    path: `/payment-dates/${year}/${month}/${grantType}`,
    title: `${paymentEntry.grantName} payment date for ${paymentMonth.label}`,
    description: paymentEntry.note,
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

  const [relatedGuides, recentPeriods, blocks] = await Promise.all([
    listRelatedGuides(locale, 2),
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

  return (
    <div className="space-y-8">
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
      <Section eyebrow={copy.paymentDates} title={`${paymentEntry.grantName} for ${paymentMonth.label}`}>
        <Card className="space-y-5">
          <Pill>
            {paymentEntry.state === "expected"
              ? copy.paymentEstimate
              : paymentEntry.state === "pending"
                ? copy.paymentPending
                : copy.paymentPortalOnly}
          </Pill>
          <div className="space-y-2">
            <p className="text-3xl font-semibold text-primary">
              {paymentEntry.date ? formatDateLabel(paymentEntry.date) : copy.paymentPortalOnly}
            </p>
            <p className="max-w-2xl text-sm text-muted">{paymentEntry.note}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={buildLocalePath(locale, "/dashboard")}>{copy.saveDate}</ButtonLink>
            <ButtonLink href={buildLocalePath(locale, "/dashboard")} variant="secondary">
              {copy.notifyMe}
            </ButtonLink>
            <TrackedExternalLink
              href={paymentEntry.officialHref}
              locale={locale}
              eventName="official_resource.clicked"
              eventPayload={{
                destination: "payment-date",
                grantSlug: paymentEntry.grantSlug,
              }}
              target="_blank"
              rel="noreferrer"
              className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 text-base font-semibold hover:bg-surface-muted"
            >
              {copy.officialLink}
            </TrackedExternalLink>
          </div>
        </Card>
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

      {blocks.length > 0 ? (
        <Section title={copy.sponsoredTitle}>
          <MonetizationBlocks blocks={blocks} locale={locale} placement="payment-dates" />
        </Section>
      ) : null}
    </div>
  );
}
