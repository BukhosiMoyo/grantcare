import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listNewsArticles } from "@/lib/content";
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
    path: "/news",
    title: "SASSA News and Payment Updates",
    description:
      "Read the latest SASSA news, payment-date changes, official announcement summaries, and GrantCare coverage updates.",
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const articles = await listNewsArticles(locale);
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open the latest payment schedule when a news update changes a date.",
    },
    {
      href: "/guides",
      title: copy.guides,
      description: "Read related guides when a news update needs more context.",
    },
    {
      href: "/grants",
      title: copy.grantTypesTitle,
      description: "Move to the grant library for grant-specific background and amounts.",
    },
    {
      href: "/faq",
      title: copy.faq,
      description: "Use the short answers first when you only need the basics.",
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "News", path: "/news" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section eyebrow={copy.news} title="Latest news">
        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Link key={article.slug} href={buildLocalePath(locale, `/news/${article.slug}`)}>
                <Card className="space-y-2">
                  {article.publishedAt ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                      {article.publishedAt.slice(0, 10)}
                    </p>
                  ) : null}
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  <p className="text-sm text-muted">{article.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted">No published news yet.</p>
          </Card>
        )}
      </Section>
      <InternalLinkGrid locale={locale} title="More to explore" items={hubLinks} />
    </div>
  );
}
