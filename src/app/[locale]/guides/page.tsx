import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listGuides } from "@/lib/content";
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
    path: "/guides",
    title: "SASSA Guides for Status, Appeals and Payments",
    description:
      "Browse SASSA guides for status check problems, payment delays, appeals, banking details, documents, and SRD questions.",
  });
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
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Check the current month first, then use guides when you need more detail.",
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: "Open the status library when your question starts with a specific status message.",
    },
    {
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: "Use the checker for general direction before you read grant-specific guides.",
    },
    {
      href: "/news",
      title: copy.news,
      description: "Open the news archive when you need the latest announcement coverage first.",
    },
    {
      href: "/faq",
      title: copy.faq,
      description: "Read the short answers first if you only need the basics.",
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Guides", path: "/guides" },
        ]}
      />
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
      <InternalLinkGrid locale={locale} title="More ways to explore" items={hubLinks} />
    </div>
  );
}
