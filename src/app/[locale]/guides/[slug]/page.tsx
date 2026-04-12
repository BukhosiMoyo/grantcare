import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { toggleSavedGuideAction } from "@/actions/dashboard";
import { auth } from "@/auth";
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ButtonLink, Section } from "@/components/ui";
import {
  getGuideBySlug,
  listMonetizationBlocks,
  listRelatedFaqs,
  listRelatedGuides,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
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

function getInternalPathLabel(path: string) {
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) {
    return path;
  }

  if (segments[0] === "guides" && segments[1]) {
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
    title: guide.title,
    description: guide.summary,
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

  const [guide, relatedGuides, relatedFaqs, blocks] = await Promise.all([
    getGuideBySlug(locale, slug),
    listRelatedGuides(locale, 2, slug, slug),
    listRelatedFaqs(locale, 2),
    listMonetizationBlocks(locale, {
      placement: "guide-inline",
      guideSlug: slug,
      limit: 2,
    }),
  ]);

  if (!guide) {
    notFound();
  }

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    mainEntityOfPage: new URL(
      buildLocalePath(locale, `/guides/${guide.slug}`),
      getSiteUrl(),
    ).toString(),
    inLanguage: locale,
  };
  const faqSections = guide.sections.filter((section) => section.title.startsWith("FAQ: "));
  const contentSections = guide.sections.filter((section) => !section.title.startsWith("FAQ: "));
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
      <header className="mx-auto max-w-3xl space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">{copy.guideLabel}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{guide.title}</h1>
          <p className="text-lg leading-8 text-muted">{guide.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={buildLocalePath(locale, "/status")} variant="secondary">
            {copy.statusHelp}
          </ButtonLink>
          <ButtonLink href={buildLocalePath(locale, "/payment-dates")}>{copy.paymentDates}</ButtonLink>
          {session?.user?.id && guide.id ? (
            <form action={toggleSavedGuideAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="guideId" value={guide.id} />
              <input type="hidden" name="returnPath" value={buildLocalePath(locale, `/guides/${guide.slug}`)} />
              <button
                type="submit"
                className="focus-ring tap-target rounded-full border border-border bg-surface px-5 text-base font-semibold"
              >
                {savedGuide ? copy.removeSavedGuide : copy.saveGuide}
              </button>
            </form>
          ) : null}
        </div>
      </header>

      <article className="mx-auto max-w-3xl space-y-14">
        {contentSections.map((section) => (
          <section key={section.title} className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {section.title}
            </h2>
            <div className="guide-body">
              {renderGuideBlocks(locale, parseGuideBody(section.body))}
            </div>
          </section>
        ))}

        {faqSections.length > 0 ? (
          <section className="space-y-6 pt-2">
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

      <section className="mx-auto max-w-3xl space-y-4 pt-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {copy.relatedGuidesTitle}
        </h2>
        <div className="space-y-5">
          {relatedGuides.map((relatedGuide) => (
            <Link
              key={relatedGuide.slug}
              href={buildLocalePath(locale, `/guides/${relatedGuide.slug}`)}
              className="block space-y-2 transition-colors hover:text-primary"
            >
              <h3 className="text-xl font-semibold">{relatedGuide.title}</h3>
              <p className="text-base leading-7 text-muted">{relatedGuide.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 pt-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {copy.commonQuestionsTitle}
        </h2>
        <div className="space-y-5">
          {relatedFaqs.map((faq) => (
            <div key={faq.id} className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{faq.question}</h3>
              <p className="text-base leading-7 text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
