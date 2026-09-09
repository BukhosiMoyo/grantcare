import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listNewsArticles } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
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

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA News and Payment Updates",
      metaDescription:
        "Read the latest SASSA news, payment-date changes, official announcement summaries, and GrantCare coverage updates.",
    },
    {
      metaTitle: "Izindaba ze-SASSA Nezibuyekezo Zokukhokha",
      metaDescription:
        "Funda izindaba zakamuva ze-SASSA, izinguquko zezinsuku zokukhokha, izifinyezo zezaziso ezisemthethweni, nezibuyekezo ze-GrantCare.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/news",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
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
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbNews: "News",
      hubPaymentDescription: "Open the latest payment schedule when a news update changes a date.",
      hubGuidesDescription: "Read related guides when a news update needs more context.",
      hubGrantsDescription: "Move to the grant library for grant-specific background and amounts.",
      hubFaqDescription: "Use the short answers first when you only need the basics.",
      latestNewsTitle: "Latest news",
      noNewsText: "No published news yet.",
      moreToExploreTitle: "More to explore",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbNews: "Izindaba",
      hubPaymentDescription: "Vula uhlelo lwakamuva lokukhokha uma isibuyekezo sezindaba sishintsha usuku.",
      hubGuidesDescription: "Funda imihlahlandlela ehlobene uma isibuyekezo sezindaba sidinga umongo owengeziwe.",
      hubGrantsDescription: "Dlulela kulabhulali yezibonelelo ukuze uthole isizinda namanani aqondene nesibonelelo.",
      hubFaqDescription: "Sebenzisa izimpendulo ezimfishane kuqala uma udinga okuyisisekelo kuphela.",
      latestNewsTitle: "Izindaba zakamuva",
      noNewsText: "Azikho izindaba ezishicilelwe okwamanje.",
      moreToExploreTitle: "Okunye ongakuhlola",
    },
  );
  const articles = await listNewsArticles(locale);
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: routeCopy.hubPaymentDescription,
    },
    {
      href: "/guides",
      title: copy.guides,
      description: routeCopy.hubGuidesDescription,
    },
    {
      href: "/grants",
      title: copy.grantTypesTitle,
      description: routeCopy.hubGrantsDescription,
    },
    {
      href: "/faq",
      title: copy.faq,
      description: routeCopy.hubFaqDescription,
    },
  ];

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbNews, path: "/news" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <Section headingAs="h1" eyebrow={copy.news} title={routeCopy.latestNewsTitle}>
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
            <p className="text-sm text-muted">{routeCopy.noNewsText}</p>
          </Card>
        )}
      </Section>
      <InternalLinkGrid locale={locale} title={routeCopy.moreToExploreTitle} items={hubLinks} />
    </div>
  );
}
