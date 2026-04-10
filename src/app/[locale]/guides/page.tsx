import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listGuides } from "@/lib/content";
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
    title: copy.guides,
    alternates: {
      canonical: `/${locale}/guides`,
    },
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const guides = await listGuides(locale);

  return (
    <div className="space-y-8">
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.guides} title={copy.guideLibraryTitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
