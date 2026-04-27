import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { toggleSavedGuideAction } from "@/actions/dashboard";
import { auth } from "@/auth";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { BookmarkIcon, CalendarIcon, CompassIcon, StatusIcon, UserIcon } from "@/components/icons";
import { GuideShareActions } from "@/components/guide-share-actions";
import { GuideTableOfContents } from "@/components/guide-table-of-contents";
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ButtonLink, Card, Pill, Section } from "@/components/ui";
import {
  getGuideBySlug,
  getPaymentRouteDefaults,
  listMonetizationBlocks,
  listRelatedFaqs,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { isGuideIndexable } from "@/lib/guide-seo";
import {
  buildGuideMetaDescription,
  buildGuideMetaTitle,
  buildLocalizedMetadata,
} from "@/lib/metadata";
import { db } from "@/lib/prisma";
import { type Locale, buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { isDatabaseConfigured } from "@/lib/server-env";

type GuideBodyBlock =
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

function getSectionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getInternalPathLabel(path: string) {
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) {
    return path;
  }

  if (segments[0] === "guides" && segments[1]) {
    return titleCase(segments[1]);
  }

  if (segments[0] === "news" && segments[1]) {
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

function parseGuideBody(body: string): GuideBodyBlock[] {
  const blocks: GuideBodyBlock[] = [];
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

function renderGuideText(locale: Locale, text: string) {
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

function renderGuideBlocks(locale: Locale, blocks: GuideBodyBlock[]) {
  return blocks.map((block, index) => {
    if (block.type === "paragraph") {
      return <p key={`paragraph-${index}`}>{block.text}</p>;
    }

    const ListTag = block.type === "ordered-list" ? "ol" : "ul";

    return (
      <ListTag key={`${block.type}-${index}`}>
        {block.items.map((item) => (
          <li key={item}>
            {renderGuideText(locale, item)}
          </li>
        ))}
      </ListTag>
    );
  });
}

function formatDisplayDate(locale: Locale, value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
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

  const guide = await getGuideBySlug(locale, slug);

  if (!guide) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/guides/${slug}`,
    title: buildGuideMetaTitle(guide.title),
    description: buildGuideMetaDescription(guide.summary),
    noIndex: !isGuideIndexable(guide),
    openGraphType: "article",
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const guide = await getGuideBySlug(locale, slug);

  if (!guide) {
    notFound();
  }

  const guideReferenceText = [
    guide.slug,
    guide.title,
    guide.summary,
    ...guide.sections.flatMap((section) => [section.title, section.body]),
  ].join(" ");

  const [relatedGuides, relatedFaqs, blocks, paymentDefaults] = await Promise.all([
    listRelatedGuides(locale, 6, slug, guideReferenceText),
    listRelatedFaqs(locale, 4),
    listMonetizationBlocks(locale, {
      placement: "guide-inline",
      guideSlug: slug,
      limit: 2,
    }),
    getPaymentRouteDefaults(locale),
  ]);

  const copy = getCopy(locale);

  const session = await auth();
  const savedGuide =
    session?.user?.id && guide.id && isDatabaseConfigured()
      ? await db.savedGuide.findFirst({
          where: {
            userId: session.user.id,
            guideId: guide.id,
          },
        })
      : null;

  const guidePath = buildLocalePath(locale, `/guides/${guide.slug}`);
  const currentPaymentPath = buildLocalePath(
    locale,
    `/payment-dates/${paymentDefaults.year}/${paymentDefaults.monthSlug}`,
  );
  const shareUrl = new URL(guidePath, getSiteUrl()).toString();
  const authorName = guide.authorName ?? "GrantCare Editorial Team";
  const lastUpdatedAt = guide.updatedAt ?? guide.publishedAt ?? null;
  const formattedLastUpdated = formatDisplayDate(locale, lastUpdatedAt);
  const faqSectionId = "frequently-asked-questions";
  const relatedGuidesId = "related-guides";
  const commonQuestionsId = "common-questions";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    mainEntityOfPage: shareUrl,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    datePublished: guide.publishedAt ?? undefined,
    dateModified: lastUpdatedAt ?? undefined,
  };
  const faqSections = guide.sections.filter((section) => section.title.startsWith("FAQ: "));
  const contentSections = guide.sections.filter((section) => !section.title.startsWith("FAQ: "));
  const tocItems = [
    ...contentSections.map((section) => ({
      id: getSectionId(section.title),
      label: section.title,
    })),
    ...(faqSections.length > 0
      ? [{ id: faqSectionId, label: copy.frequentlyAskedQuestionsTitle }]
      : []),
  ];
  const faqSchema =
    faqSections.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSections.map((section) => ({
            "@type": "Question",
            name: section.title.replace(/^FAQ:\s*/, ""),
            acceptedAnswer: {
              "@type": "Answer",
              text: section.body,
            },
          })),
        }
      : null;

  return (
    <div className="space-y-8">
      <PageViewTracker
        name="guide.viewed"
        locale={locale}
        payload={{
          slug: guide.slug,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Guides", path: "/guides" },
          { label: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0 space-y-8 lg:max-w-3xl">
          <header className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">{copy.guideLabel}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{guide.title}</h1>
              <p className="text-lg leading-8 text-muted">{guide.summary}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={buildLocalePath(locale, "/status")} variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{copy.checkStatus}</span>
                </span>
              </ButtonLink>
              <ButtonLink href={currentPaymentPath}>
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                  <span>{copy.checkPaymentDates}</span>
                </span>
              </ButtonLink>
              {session?.user?.id && guide.id ? (
                <form action={toggleSavedGuideAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="guideId" value={guide.id} />
                  <input type="hidden" name="returnPath" value={guidePath} />
                  <button
                    type="submit"
                    className="focus-ring tap-target inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-base font-semibold"
                  >
                    <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
                    {savedGuide ? copy.removeSavedGuide : copy.saveGuide}
                  </button>
                </form>
              ) : null}
            </div>
          </header>

          <article className="space-y-14">
            {contentSections.map((section) => {
              const sectionBlocks = renderGuideBlocks(locale, parseGuideBody(section.body));
              const sectionId = getSectionId(section.title);

              if (section.title === "Quick answer") {
                return (
                  <section key={section.title} id={sectionId} className="scroll-mt-28">
                    <h2 className="sr-only">{section.title}</h2>
                    <Card className="space-y-4 border border-primary/15 bg-primary/[0.04] sm:p-7">
                      <Pill>
                        <span className="inline-flex items-center gap-2">
                          <CompassIcon className="h-4 w-4" aria-hidden="true" />
                          <span>{section.title}</span>
                        </span>
                      </Pill>
                      <div className="guide-body text-lg leading-8 text-foreground">
                        {sectionBlocks}
                      </div>
                    </Card>
                  </section>
                );
              }

              return (
                <section key={section.title} id={sectionId} className="scroll-mt-28 space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {section.title}
                  </h2>
                  <div className="guide-body">{sectionBlocks}</div>
                </section>
              );
            })}

            {faqSections.length > 0 ? (
              <section id={faqSectionId} className="scroll-mt-28 space-y-6 pt-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {copy.frequentlyAskedQuestionsTitle}
                </h2>
                <div className="space-y-6">
                  {faqSections.map((faqSection, index) => (
                    <Fragment key={faqSection.title}>
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {faqSection.title.replace(/^FAQ:\s*/, "")}
                        </h3>
                        <div className="guide-body">
                          {renderGuideBlocks(locale, parseGuideBody(faqSection.body))}
                        </div>
                      </div>
                      {index < faqSections.length - 1 ? <div className="h-2" /> : null}
                    </Fragment>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          {blocks.length > 0 ? (
            <Section title={copy.sponsoredTitle}>
              <MonetizationBlocks blocks={blocks} locale={locale} placement="guide-inline" />
            </Section>
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <GuideTableOfContents
            title={copy.tableOfContents}
            items={tocItems}
          />
          <Card className="space-y-4 p-4 text-left sm:p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-left">
                <UserIcon className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                <div className="space-y-1 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                    {copy.authorLabel}
                  </p>
                  <p className="text-sm font-medium text-foreground">{authorName}</p>
                </div>
              </div>
              {formattedLastUpdated ? (
                <div className="flex items-start gap-2.5 text-left">
                  <CalendarIcon className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                  <div className="space-y-1 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                      {copy.lastUpdated}
                    </p>
                    <p className="text-sm font-medium text-foreground">{formattedLastUpdated}</p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-2 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                {copy.shareGuide}
              </p>
              <GuideShareActions
                shareLabel={copy.share}
                copyLabel={copy.copyLink}
                url={shareUrl}
                title={guide.title}
              />
            </div>
          </Card>
        </aside>
      </div>

      {relatedGuides.length > 0 ? (
        <section id={relatedGuidesId} className="mx-auto max-w-6xl scroll-mt-28 pt-2">
          <Section title={copy.relatedGuidesTitle}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={buildLocalePath(locale, `/guides/${relatedGuide.slug}`)}
                >
                  <Card className="flex h-full flex-col space-y-3 transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-surface-muted hover:shadow-md">
                    <Pill>{copy.guideLabel}</Pill>
                    <h3 className="text-xl font-semibold">{relatedGuide.title}</h3>
                    <p className="text-sm leading-7 text-muted">{relatedGuide.summary}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        </section>
      ) : null}

      {relatedFaqs.length > 0 ? (
        <section id={commonQuestionsId} className="mx-auto max-w-6xl scroll-mt-28 pt-2">
          <Section title={copy.commonQuestionsTitle}>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedFaqs.map((faq) => (
                <Card key={faq.id} className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{faq.question}</h3>
                  <p className="text-sm leading-7 text-muted">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </Section>
        </section>
      ) : null}
    </div>
  );
}
