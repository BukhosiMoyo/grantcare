import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { StatusPicker } from "@/components/status-picker";
import { Card, Section } from "@/components/ui";
import { listStatusMeanings } from "@/lib/content";
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
    path: "/status",
    title: "Grant status meanings and next steps",
    description:
      "Read clear explanations for common status messages, possible causes, common fixes, and the next step to check.",
  });
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const statuses = await listStatusMeanings(locale);
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open payment dates when your status moved forward and you need the next timing check.",
    },
    {
      href: "/guides/how-to-fix-declined-status",
      title: "Fix declined status",
      description: "Read the decline guide if your result points to a rejection or reconsideration issue.",
    },
    {
      href: "/guides/what-to-do-if-your-status-does-not-change",
      title: "Status not changing",
      description: "Use the stuck-status guide when the wording stays the same for too long.",
    },
    {
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: "Return to general guidance if you need to reassess which grant path fits best.",
    },
  ];

  return (
    <div className="space-y-8">
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.statusHelp} title={copy.commonStatusMeaningsTitle}>
        <Card className="space-y-5">
          <p className="max-w-2xl text-sm text-muted">{copy.statusToolIntro}</p>
          <StatusPicker
            locale={locale}
            statuses={statuses.map((status) => ({
              slug: status.slug,
              title: status.title,
            }))}
            statusLabel={copy.statusLabel}
            showLabel={copy.showLabel}
          />
        </Card>
      </Section>

      <Section title={copy.statusListTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {statuses.map((status) => (
            <Link key={status.slug} href={buildLocalePath(locale, `/status/${status.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{status.title}</h3>
                <p className="text-sm text-muted">{status.meaning}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Quick check options">
        <QuickCheckOptions />
      </Section>
      <InternalLinkGrid locale={locale} title="Related help" items={hubLinks} />
    </div>
  );
}
