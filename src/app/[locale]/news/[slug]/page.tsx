import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import {
  getNewsArticleBySlug,
  listRelatedGuides,
  listRelatedNews,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import {
  buildLocalizedMetadata,
  buildNewsMetaDescription,
  buildNewsMetaTitle,
} from "@/lib/metadata";
import { type Locale, buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

type ArticleBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "ordered-list"; items: string[] }
  | { type: "unordered-list"; items: string[] };

function titleCase(value: string) {
  return value
    .split(/[-/ ]+/)
    .filter(Boolean)
    .map((part) => {
      if (part.toLowerCase() === "srd") {
        return "SRD";
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

function getInternalPathLabel(path: string) {
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) {
    return path;
  }

  if ((segments[0] === "guides" || segments[0] === "news") && segments[1]) {
    return titleCase(segments[1]);
  }

  if (segments[0] === "status" && segments[1]) {
    return `${titleCase(segments[1])} status meaning`;
  }

  if (segments[0] === "payment-dates") {
    if (segments.length === 1) {
      return "Payment dates";
    }

    if (segments.length === 3) {
      return `${titleCase(segments[2])} ${segments[1]} payment dates`;
    }

    if (segments.length >= 4) {
      return `${titleCase(segments[3])} payment dates for ${titleCase(segments[2])} ${segments[1]}`;
    }
  }

  if (segments[0] === "grants") {
    return segments[1] ? `${titleCase(segments[1])} grant` : "Grant types";
  }

  if (segments[0] === "eligibility-checker") {
    return "Eligibility checker";
  }

  return path;
}

function parseArticleBody(body: string): ArticleBodyBlock[] {
  const blocks: ArticleBodyBlock[] = [];
  const lines = body.split("\n");
  let paragraphBuffer: string[] = [];
  let listType: "ordered-list" | "unordered-list" | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphBuffer.join(" "),
    });
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listType || listItems.length === 0) {
      listType = null;
      listItems = [];
      return;
    }

    blocks.push({
      type: listType,
      items: listItems,
    });
    listType = null;
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== "ordered-list") {
        flushList();
      }
      listType = "ordered-list";
      listItems.push(orderedMatch[1]);
      continue;
    }

    const unorderedMatch = line.match(/^[•-]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== "unordered-list") {
        flushList();
      }
      listType = "unordered-list";
      listItems.push(unorderedMatch[1]);
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderArticleText(locale: Locale, text: string) {
  if (text.startsWith("/")) {
    return (
      <Link
        href={buildLocalePath(locale, text)}
        className="font-medium text-primary underline decoration-border underline-offset-4"
      >
        {getInternalPathLabel(text)}
      </Link>
    );
  }

  return text;
}

function renderArticleBlocks(locale: Locale, blocks: ArticleBodyBlock[]) {
  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={`paragraph-${index}`}>{block.text}</p>;
    }

    const ListTag = block.type === "ordered-list" ? "ol" : "ul";

    return (
      <ListTag key={`${block.type}-${index}`}>
        {block.items.map((item) => (
          <li key={item}>
            {renderArticleText(locale, item)}
          </li>
        ))}
      </ListTag>
    );
  });
}

function getSourceLabel(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return sourceUrl;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const article = await getNewsArticleBySlug(locale, slug);

  if (!article) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/news/${slug}`,
    title: buildNewsMetaTitle(article.title),
    description: buildNewsMetaDescription(article.summary),
    openGraphType: "article",
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [article, relatedNews, relatedGuides] = await Promise.all([
    getNewsArticleBySlug(locale, slug),
    listRelatedNews(locale, 3, slug, slug),
    listRelatedGuides(locale, 3, slug, slug),
  ]);

  if (!article) {
    notFound();
  }

  const copy = getCopy(locale);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    mainEntityOfPage: new URL(
      buildLocalePath(locale, `/news/${article.slug}`),
      getSiteUrl(),
    ).toString(),
    inLanguage: locale,
    datePublished: article.publishedAt ?? undefined,
  };

  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Check the payment schedule after a date-related update.",
    },
    {
      href: "/guides",
      title: copy.guides,
      description: "Open the guide library for deeper context around the update.",
    },
    {
      href: "/news",
      title: copy.news,
      description: "Go back to the news archive for newer and older updates.",
    },
  ];

  return (
    <div className="space-y-8">
      <PageViewTracker name="page.viewed" locale={locale} />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: copy.news, path: "/news" },
          { label: article.title, path: `/news/${article.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Section eyebrow={copy.news} title={article.title}>
        <div className="space-y-3">
          <p className="text-lg leading-8 text-muted">{article.summary}</p>
          {article.publishedAt ? (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
              {article.publishedAt.slice(0, 10)}
            </p>
          ) : null}
        </div>
      </Section>

      <Section title="Update">
        <Card className="space-y-6">
          {article.sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              <div className="guide-body">
                {renderArticleBlocks(locale, parseArticleBody(section.body))}
              </div>
            </div>
          ))}
        </Card>
      </Section>

      {article.sourceUrls.length > 0 ? (
        <Section title="Sources">
          <div className="grid gap-3">
            {article.sourceUrls.map((sourceUrl) => (
              <Card key={sourceUrl}>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary"
                >
                  {getSourceLabel(sourceUrl)}
                </a>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {relatedNews.length > 0 ? (
        <Section title="Related news">
          <div className="grid gap-4 md:grid-cols-3">
            {relatedNews.map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={buildLocalePath(locale, `/news/${relatedArticle.slug}`)}>
                <Card className="space-y-2">
                  <h3 className="text-xl font-semibold">{relatedArticle.title}</h3>
                  <p className="text-sm text-muted">{relatedArticle.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {relatedGuides.length > 0 ? (
        <Section title={copy.relatedGuidesTitle}>
          <div className="grid gap-4 md:grid-cols-3">
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
      ) : null}

      <Section title="More to explore">
        <div className="grid gap-4 md:grid-cols-3">
          {hubLinks.map((item) => (
            <Link key={item.href} href={buildLocalePath(locale, item.href)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
