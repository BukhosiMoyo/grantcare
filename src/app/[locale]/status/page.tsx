import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/page-view-tracker";
import { StatusPicker } from "@/components/status-picker";
import { Card, Section } from "@/components/ui";
import { listStatusMeanings } from "@/lib/content";
import { getCopy } from "@/lib/copy";
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

  const copy = getCopy(locale);

  return {
    title: copy.statusMeanings,
    alternates: {
      canonical: `/${locale}/status`,
    },
  };
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
    </div>
  );
}
