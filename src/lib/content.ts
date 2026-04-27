import { ContentStatus, MonetizationPlacement, Prisma } from "@prisma/client";

import { canQueryDatabase, isRecoverableDatabaseError, markDatabaseUnavailable } from "@/lib/database-readiness";
import { db } from "@/lib/prisma";
import {
  ELIGIBILITY_RESULT_SLUGS,
  FALLBACK_FAQS,
  FALLBACK_GRANT_TYPES,
  FALLBACK_GUIDES,
  FALLBACK_NEWS_ARTICLES,
  FALLBACK_MONETIZATION_BLOCKS,
  FALLBACK_NOTICES,
  FALLBACK_PAYMENT_PERIODS,
  FALLBACK_STATUS_MEANINGS,
  HOME_STEPS,
  MONTHS,
  OFFICIAL_LINKS,
  SEO_KEYWORD_CLUSTERS,
  findFallbackGrantType,
  findFallbackGuide,
  findFallbackNewsArticle,
  findFallbackPaymentPeriod,
  findFallbackStatusMeaning,
  getFallbackPaymentRouteDefaults,
  hasAllDatesPassed,
  getMonthLabel,
  getMonthNumberFromSlug,
  getMonthSlugFromNumber,
  type LocalizedFields,
  type MonthSlug,
  type PublicFaq,
  type PublicGrantType,
  type PublicGuide,
  type PublicMonetizationBlock,
  type PublicMonetizationPlacement,
  type PublicNewsArticle,
  type PublicNotice,
  type PublicPaymentDateState,
  type PublicPaymentEntry,
  type PublicPaymentPeriod,
  type PublicStatusMeaning,
} from "@/lib/fallback-content";
import type { Locale } from "@/lib/site";
import { filterIndexableGuides } from "@/lib/guide-seo";
import { filterIndexablePaymentPeriods } from "@/lib/payment-seo";
import { isDatabaseConfigured, isProductionServer } from "@/lib/server-env";

export {
  ELIGIBILITY_RESULT_SLUGS,
  HOME_STEPS,
  MONTHS,
  OFFICIAL_LINKS,
  SEO_KEYWORD_CLUSTERS,
  getMonthLabel,
  getMonthNumberFromSlug,
  getMonthSlugFromNumber,
  type MonthSlug,
  type PublicFaq,
  type PublicGrantType,
  type PublicGuide,
  type PublicMonetizationBlock,
  type PublicMonetizationPlacement,
  type PublicNewsArticle,
  type PublicNotice,
  type PublicPaymentDateState,
  type PublicPaymentEntry,
  type PublicPaymentPeriod,
  type PublicStatusMeaning,
};

type TranslationFields = Record<string, unknown>;

function isMissingNewsArticleTableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021" &&
    String(error.meta?.table ?? "").includes("NewsArticle")
  );
}

function parseLocalizedFields(value: unknown): LocalizedFields {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as LocalizedFields;
}

function getLocalizedFields(value: unknown, locale: Locale): TranslationFields {
  const translations = parseLocalizedFields(value);
  return (translations[locale] ?? {}) as TranslationFields;
}

function getLocalizedString(
  baseValue: string,
  value: unknown,
  locale: Locale,
  key: string,
) {
  const translated = getLocalizedFields(value, locale)[key];
  return typeof translated === "string" && translated.trim().length > 0
    ? translated
    : baseValue;
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getLocalizedStringArray(
  baseValue: unknown,
  value: unknown,
  locale: Locale,
  key: string,
) {
  const translated = getLocalizedFields(value, locale)[key];
  const translatedList = toStringArray(translated);
  return translatedList.length > 0 ? translatedList : toStringArray(baseValue);
}

function toSections(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const title = "title" in item && typeof item.title === "string" ? item.title.trim() : "";
      const body = "body" in item && typeof item.body === "string" ? item.body.trim() : "";

      if (!title || !body) {
        return null;
      }

      return { title, body };
    })
    .filter((item): item is { title: string; body: string } => Boolean(item));
}

function getLocalizedSections(
  baseValue: unknown,
  value: unknown,
  locale: Locale,
  key: string,
) {
  const translated = getLocalizedFields(value, locale)[key];
  const translatedSections = toSections(translated);
  return translatedSections.length > 0 ? translatedSections : toSections(baseValue);
}

function tokenizeSeoValue(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 2);
}

function scoreRelatedGuide(
  guide: PublicGuide,
  referenceTerms: string[],
) {
  if (referenceTerms.length === 0) {
    return guide.featured ? 2 : 0;
  }

  const guideTerms = new Set([
    ...tokenizeSeoValue(guide.slug),
    ...tokenizeSeoValue(guide.title),
    ...tokenizeSeoValue(guide.summary),
    ...guide.sections.flatMap((section) => [
      ...tokenizeSeoValue(section.title),
      ...tokenizeSeoValue(section.body),
    ]),
  ]);

  let score = guide.featured ? 2 : 0;

  for (const term of referenceTerms) {
    if (guideTerms.has(term)) {
      score += 3;
    }
  }

  return score;
}

async function withPublicFallback<T>(query: () => Promise<T>, fallback: () => T) {
  if (!isDatabaseConfigured()) {
    return fallback();
  }

  if (!(await canQueryDatabase())) {
    return fallback();
  }

  try {
    return await query();
  } catch (error) {
    if (!isProductionServer()) {
      if (isRecoverableDatabaseError(error)) {
        markDatabaseUnavailable();
      }
      return fallback();
    }

    throw error;
  }
}

function mapGrantTypeRecord(
  record: {
    id: string;
    slug: string;
    name: string;
    shortName: string | null;
    summary: string;
    officialHref: string;
    checks: unknown;
    documents: unknown;
    showInPaymentTool: boolean;
    showInGrantLibrary: boolean;
    sortOrder: number;
    translations: unknown;
    paymentGroup: { slug: string } | null;
  },
  locale: Locale,
): PublicGrantType {
  return {
    id: record.id,
    slug: record.slug,
    name: getLocalizedString(record.name, record.translations, locale, "name"),
    shortName: getLocalizedString(
      record.shortName ?? record.name,
      record.translations,
      locale,
      "shortName",
    ),
    summary: getLocalizedString(record.summary, record.translations, locale, "summary"),
    officialHref: record.officialHref,
    checks: getLocalizedStringArray(record.checks, record.translations, locale, "checks"),
    documents: getLocalizedStringArray(record.documents, record.translations, locale, "documents"),
    showInPaymentTool: record.showInPaymentTool,
    showInGrantLibrary: record.showInGrantLibrary,
    paymentGroupSlug: record.paymentGroup?.slug ?? null,
    sortOrder: record.sortOrder,
  };
}

function mapStatusMeaningRecord(
  record: {
    id: string;
    slug: string;
    title: string;
    meaning: string;
    causes: unknown;
    fixes: unknown;
    nextSteps: unknown;
    officialHref: string;
    sortOrder: number;
    translations: unknown;
  },
  locale: Locale,
): PublicStatusMeaning {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedString(record.title, record.translations, locale, "title"),
    meaning: getLocalizedString(record.meaning, record.translations, locale, "meaning"),
    causes: getLocalizedStringArray(record.causes, record.translations, locale, "causes"),
    fixes: getLocalizedStringArray(record.fixes, record.translations, locale, "fixes"),
    nextSteps: getLocalizedStringArray(record.nextSteps, record.translations, locale, "nextSteps"),
    officialHref: record.officialHref,
    sortOrder: record.sortOrder,
  };
}

function mapGuideRecord(
  record: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    sections: unknown;
    featured: boolean;
    sponsored: boolean;
    sortOrder: number;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    translations: unknown;
  },
  locale: Locale,
): PublicGuide {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedString(record.title, record.translations, locale, "title"),
    summary: getLocalizedString(record.summary, record.translations, locale, "summary"),
    sections: getLocalizedSections(record.sections, record.translations, locale, "sections"),
    featured: record.featured,
    sponsored: record.sponsored,
    sortOrder: record.sortOrder,
    authorName: "GrantCare Editorial Team",
    publishedAt: record.publishedAt?.toISOString() ?? null,
    updatedAt: record.updatedAt?.toISOString() ?? record.createdAt.toISOString(),
  };
}

function mapFaqRecord(
  record: {
    id: string;
    question: string;
    answer: string;
    sortOrder: number;
    translations: unknown;
  },
  locale: Locale,
): PublicFaq {
  return {
    id: record.id,
    question: getLocalizedString(record.question, record.translations, locale, "question"),
    answer: getLocalizedString(record.answer, record.translations, locale, "answer"),
    sortOrder: record.sortOrder,
  };
}

function mapNewsRecord(
  record: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    sections: unknown;
    sourceUrls: unknown;
    featured: boolean;
    sortOrder: number;
    publishedAt: Date | null;
    translations: unknown;
  },
  locale: Locale,
): PublicNewsArticle {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedString(record.title, record.translations, locale, "title"),
    summary: getLocalizedString(record.summary, record.translations, locale, "summary"),
    sections: getLocalizedSections(record.sections, record.translations, locale, "sections"),
    sourceUrls: toStringArray(record.sourceUrls),
    featured: record.featured,
    sortOrder: record.sortOrder,
    publishedAt: record.publishedAt?.toISOString() ?? null,
  };
}

function mapNoticeRecord(
  record: {
    id: string;
    slug: string;
    title: string;
    body: string;
    href: string | null;
    tone: string;
    sortOrder: number;
    translations: unknown;
  },
  locale: Locale,
): PublicNotice {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedString(record.title, record.translations, locale, "title"),
    body: getLocalizedString(record.body, record.translations, locale, "body"),
    href: record.href,
    tone: record.tone,
    sortOrder: record.sortOrder,
    status: "published",
  };
}

function mapMonetizationPlacement(
  value: MonetizationPlacement | string,
): PublicMonetizationPlacement {
  if (value === MonetizationPlacement.dashboard_helpful) {
    return "dashboard-helpful";
  }

  if (value === MonetizationPlacement.guide_inline) {
    return "guide-inline";
  }

  return "payment-dates";
}

function mapMonetizationRecord(
  record: {
    id: string;
    slug: string;
    title: string;
    body: string;
    href: string;
    ctaLabel: string | null;
    disclosureLabel: string;
    placement: MonetizationPlacement;
    sortOrder: number;
    translations: unknown;
    grantType: { slug: string } | null;
    guide: { slug: string } | null;
  },
  locale: Locale,
): PublicMonetizationBlock {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedString(record.title, record.translations, locale, "title"),
    body: getLocalizedString(record.body, record.translations, locale, "body"),
    href: record.href,
    ctaLabel: getLocalizedString(
      record.ctaLabel ?? "Open",
      record.translations,
      locale,
      "ctaLabel",
    ),
    disclosureLabel: getLocalizedString(
      record.disclosureLabel,
      record.translations,
      locale,
      "disclosureLabel",
    ),
    placement: mapMonetizationPlacement(record.placement),
    sortOrder: record.sortOrder,
    grantSlug: record.grantType?.slug ?? null,
    guideSlug: record.guide?.slug ?? null,
    status: "published",
  };
}

function mapPaymentState(value: string): PublicPaymentDateState {
  return value === "portal_only" ? "portal-only" : value === "pending" ? "pending" : "expected";
}

function createDefaultPaymentEntry(grant: PublicGrantType, fallback?: PublicPaymentEntry | null) {
  return (
    fallback ?? {
      grantSlug: grant.slug,
      grantName: grant.name,
      shortName: grant.shortName ?? grant.name,
      officialHref: grant.officialHref,
      state: grant.slug === "social-relief" ? "portal-only" : "pending",
      date: null,
      note:
        grant.slug === "social-relief"
          ? "SRD paydays are assigned per approved applicant during the monthly payment window."
          : "Awaiting an official update for this period.",
      published: false,
    }
  );
}

async function mapPaymentPeriodRecord(
  locale: Locale,
  record: {
    id: string;
    year: number;
    month: number;
    published: boolean;
    entries: Array<{
      id: string;
      state: string;
      paymentDate: Date | null;
      note: string | null;
      published: boolean;
      translations: unknown;
      grantType: {
        id: string;
        slug: string;
        name: string;
        shortName: string | null;
        summary: string;
        officialHref: string;
        checks: unknown;
        documents: unknown;
        showInPaymentTool: boolean;
        showInGrantLibrary: boolean;
        sortOrder: number;
        translations: unknown;
        paymentGroup: { slug: string } | null;
      };
    }>;
  },
): Promise<PublicPaymentPeriod> {
  const categories = await listPaymentCategories(locale);
  const fallbackPeriod = findFallbackPaymentPeriod(record.year, record.month);
  const fallbackEntries = fallbackPeriod?.grants ?? {};
  const entryMap = new Map<string, PublicPaymentEntry>();

  for (const entry of record.entries) {
    const grantType = mapGrantTypeRecord(entry.grantType, locale);
    entryMap.set(grantType.slug, {
      id: entry.id,
      grantSlug: grantType.slug,
      grantName: grantType.name,
      shortName: grantType.shortName ?? grantType.name,
      officialHref: grantType.officialHref,
      state: mapPaymentState(entry.state),
      date: entry.paymentDate ? entry.paymentDate.toISOString().slice(0, 10) : null,
      note:
        grantType.slug === "social-relief" && entry.note?.includes("Use the official SRD portal")
          ? "SRD paydays are assigned per approved applicant during the monthly payment window."
          : getLocalizedString(
              entry.note ?? fallbackEntries[grantType.slug]?.note ?? "",
              entry.translations,
              locale,
              "note",
            ),
      published: entry.published,
    });
  }

  const entries = categories.map((category) =>
    entryMap.get(category.slug) ?? createDefaultPaymentEntry(category, fallbackEntries[category.slug]),
  );

  return {
    id: record.id,
    year: record.year,
    month: record.month,
    monthSlug: getMonthSlugFromNumber(record.month),
    label: getMonthLabel(record.year, record.month),
    published: record.published,
    entries,
    grants: Object.fromEntries(entries.map((entry) => [entry.grantSlug, entry])),
  };
}

export async function listGrantTypes(locale: Locale) {
  return withPublicFallback(
    async () => {
      const records = await db.grantType.findMany({
        where: { status: ContentStatus.published },
        include: { paymentGroup: { select: { slug: true } } },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      });

      return records.map((record) => mapGrantTypeRecord(record, locale));
    },
    () => [...FALLBACK_GRANT_TYPES],
  );
}

export async function listPaymentCategories(locale: Locale) {
  return (await listGrantTypes(locale)).filter((grant) => grant.showInPaymentTool);
}

export async function listPublicGrantTypes(locale: Locale) {
  return (await listGrantTypes(locale)).filter((grant) => grant.showInGrantLibrary);
}

export async function getGrantBySlug(locale: Locale, slug: string) {
  return withPublicFallback(
    async () => {
      const record = await db.grantType.findUnique({
        where: { slug },
        include: { paymentGroup: { select: { slug: true } } },
      });

      if (!record || record.status !== ContentStatus.published) {
        return null;
      }

      return mapGrantTypeRecord(record, locale);
    },
    () => findFallbackGrantType(slug),
  );
}

export async function listStatusMeanings(locale: Locale) {
  return withPublicFallback(
    async () => {
      const records = await db.statusMeaning.findMany({
        where: { status: ContentStatus.published },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      });

      return records.map((record) => mapStatusMeaningRecord(record, locale));
    },
    () => [...FALLBACK_STATUS_MEANINGS],
  );
}

export async function getStatusMeaningBySlug(locale: Locale, slug: string) {
  return withPublicFallback(
    async () => {
      const record = await db.statusMeaning.findUnique({ where: { slug } });
      if (!record || record.status !== ContentStatus.published) {
        return null;
      }

      return mapStatusMeaningRecord(record, locale);
    },
    () => findFallbackStatusMeaning(slug),
  );
}

export async function listGuides(locale: Locale) {
  return withPublicFallback(
    async () => {
      const records = await db.guideArticle.findMany({
        where: { status: ContentStatus.published },
        orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      });

      const mappedGuides = records.map((record) => mapGuideRecord(record, locale));
      const existingSlugs = new Set(mappedGuides.map((guide) => guide.slug));
      const fallbackOnlyGuides = FALLBACK_GUIDES.filter((guide) => !existingSlugs.has(guide.slug));

      return [...mappedGuides, ...fallbackOnlyGuides].sort((left, right) => {
        if (left.sortOrder !== right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }

        return left.title.localeCompare(right.title);
      });
    },
    () => [...FALLBACK_GUIDES],
  );
}

export async function listLatestGuides(locale: Locale, limit = 6) {
  return withPublicFallback(
    async () => {
      const records = await db.guideArticle.findMany({
        where: { status: ContentStatus.published },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }, { sortOrder: "asc" }],
        take: limit,
      });

      return filterIndexableGuides(records.map((record) => mapGuideRecord(record, locale))).slice(
        0,
        limit,
      );
    },
    () => filterIndexableGuides([...FALLBACK_GUIDES]).slice(-limit).reverse(),
  );
}

export async function getGuideBySlug(locale: Locale, slug: string) {
  return withPublicFallback(
    async () => {
      const record = await db.guideArticle.findUnique({ where: { slug } });
      if (!record || record.status !== ContentStatus.published) {
        return findFallbackGuide(slug);
      }

      return mapGuideRecord(record, locale);
    },
    () => findFallbackGuide(slug),
  );
}

export async function listNewsArticles(locale: Locale) {
  return withPublicFallback(
    async () => {
      let records;

      try {
        records = await db.newsArticle.findMany({
          where: { status: ContentStatus.published },
          orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
        });
      } catch (error) {
        if (isMissingNewsArticleTableError(error)) {
          return [...FALLBACK_NEWS_ARTICLES];
        }

        throw error;
      }

      return records.map((record) => mapNewsRecord(record, locale));
    },
    () =>
      [...FALLBACK_NEWS_ARTICLES].sort((left, right) => {
        const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
        const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : 0;

        return rightTime - leftTime || left.sortOrder - right.sortOrder;
      }),
  );
}

export async function listLatestNews(locale: Locale, limit = 6) {
  return (await listNewsArticles(locale)).slice(0, limit);
}

export async function getNewsArticleBySlug(locale: Locale, slug: string) {
  return withPublicFallback(
    async () => {
      let record;

      try {
        record = await db.newsArticle.findUnique({ where: { slug } });
      } catch (error) {
        if (isMissingNewsArticleTableError(error)) {
          return findFallbackNewsArticle(slug);
        }

        throw error;
      }

      if (!record || record.status !== ContentStatus.published) {
        return null;
      }

      return mapNewsRecord(record, locale);
    },
    () => findFallbackNewsArticle(slug),
  );
}

export async function listFaqs(locale: Locale) {
  return withPublicFallback(
    async () => {
      const records = await db.faqEntry.findMany({
        where: { status: ContentStatus.published },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      });

      return records.map((record) => mapFaqRecord(record, locale));
    },
    () => [...FALLBACK_FAQS],
  );
}

export async function listHomepageNotices(locale: Locale) {
  return withPublicFallback(
    async () => {
      const now = new Date();
      const records = await db.notice.findMany({
        where: {
          status: ContentStatus.published,
          OR: [{ startsAt: null }, { startsAt: { lte: now } }],
          AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });

      return records.map((record) => mapNoticeRecord(record, locale));
    },
    () => [...FALLBACK_NOTICES],
  );
}

export async function listMonetizationBlocks(
  locale: Locale,
  input: {
    guideSlug?: string;
    grantSlug?: string;
    limit?: number;
    placement: PublicMonetizationPlacement;
  },
) {
  return withPublicFallback(
    async () => {
      const now = new Date();
      const placement =
        input.placement === "dashboard-helpful"
          ? MonetizationPlacement.dashboard_helpful
          : input.placement === "guide-inline"
            ? MonetizationPlacement.guide_inline
            : MonetizationPlacement.payment_dates;

      const records = await db.monetizationBlock.findMany({
        where: {
          placement,
          status: ContentStatus.published,
          AND: [
            {
              OR: [{ startsAt: null }, { startsAt: { lte: now } }],
            },
            {
              OR: [{ endsAt: null }, { endsAt: { gte: now } }],
            },
            input.grantSlug
              ? {
                  OR: [{ grantType: { slug: input.grantSlug } }, { grantTypeId: null }],
                }
              : {},
            input.guideSlug
              ? {
                  OR: [{ guide: { slug: input.guideSlug } }, { guideId: null }],
                }
              : {},
          ],
        },
        include: {
          grantType: { select: { slug: true } },
          guide: { select: { slug: true } },
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: input.limit ?? 3,
      });

      return records.map((record) => mapMonetizationRecord(record, locale));
    },
    () =>
      FALLBACK_MONETIZATION_BLOCKS.filter((block) => block.placement === input.placement).slice(
        0,
        input.limit ?? 3,
      ),
  );
}

export async function listPaymentPeriods(locale: Locale) {
  return withPublicFallback(
    async () => {
      const records = await db.paymentPeriod.findMany({
        where: { published: true },
        include: {
          entries: {
            where: {
              published: true,
              grantType: {
                status: ContentStatus.published,
                showInPaymentTool: true,
              },
            },
            include: {
              grantType: {
                include: {
                  paymentGroup: { select: { slug: true } },
                },
              },
            },
          },
        },
        orderBy: [{ year: "asc" }, { month: "asc" }],
      });

      if (records.length === 0) {
        return FALLBACK_PAYMENT_PERIODS;
      }

      const mapped = await Promise.all(records.map((record) => mapPaymentPeriodRecord(locale, record)));
      return mapped;
    },
    () => [...FALLBACK_PAYMENT_PERIODS],
  );
}

export async function getPaymentPeriod(locale: Locale, year: number, monthSlug: string) {
  return withPublicFallback(
    async () => {
      const month = getMonthNumberFromSlug(monthSlug);
      if (!month) {
        return null;
      }

      const record = await db.paymentPeriod.findUnique({
        where: {
          year_month: {
            year,
            month,
          },
        },
        include: {
          entries: {
            where: {
              published: true,
              grantType: {
                status: ContentStatus.published,
                showInPaymentTool: true,
              },
            },
            include: {
              grantType: {
                include: {
                  paymentGroup: { select: { slug: true } },
                },
              },
            },
          },
        },
      });

      if (!record || !record.published) {
        return null;
      }

      return mapPaymentPeriodRecord(locale, record);
    },
    () => findFallbackPaymentPeriod(year, monthSlug),
  );
}

export async function getPaymentEntry(locale: Locale, year: number, monthSlug: string, grantSlug: string) {
  const period = await getPaymentPeriod(locale, year, monthSlug);
  if (!period) {
    return null;
  }

  return period.grants[grantSlug] ?? null;
}

export async function getPaymentRouteDefaults(locale: Locale) {
  const periods = await listPaymentPeriods(locale);
  const currentYear = new Date().getUTCFullYear();
  const currentMonth = new Date().getUTCMonth() + 1;

  const currentPeriod = periods.find(
    (entry) => entry.year === currentYear && entry.month === currentMonth,
  );

  // If the current month's dates have all passed, advance to next month
  if (currentPeriod && hasAllDatesPassed(currentPeriod)) {
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    const nextPeriod = periods.find(
      (entry) => entry.year === nextYear && entry.month === nextMonth,
    );

    if (nextPeriod) {
      return nextPeriod;
    }
  }

  return currentPeriod ?? getFallbackPaymentRouteDefaults();
}

export async function getNextPaymentPeriod(locale: Locale, currentPeriod: PublicPaymentPeriod) {
  const periods = await listPaymentPeriods(locale);
  const nextMonth = currentPeriod.month === 12 ? 1 : currentPeriod.month + 1;
  const nextYear = currentPeriod.month === 12 ? currentPeriod.year + 1 : currentPeriod.year;

  return periods.find((entry) => entry.year === nextYear && entry.month === nextMonth) ?? null;
}

export async function listPaymentPeriodsForYear(locale: Locale, year: number) {
  const periods = await listPaymentPeriods(locale);
  return periods
    .filter((entry) => entry.year === year)
    .sort((a, b) => a.month - b.month);
}

export async function listRecentPaymentPeriods(
  locale: Locale,
  input?: { excludeMonth?: number; excludeYear?: number; limit?: number },
) {
  const indexablePeriods = filterIndexablePaymentPeriods(await listPaymentPeriods(locale));

  return indexablePeriods
    .filter((period) => {
      if (input?.excludeYear === undefined || input?.excludeMonth === undefined) {
        return true;
      }

      return !(period.year === input.excludeYear && period.month === input.excludeMonth);
    })
    .sort((left, right) => {
      if (input?.excludeYear !== undefined && input?.excludeMonth !== undefined) {
        const leftDistance = Math.abs(
          (left.year - input.excludeYear) * 12 + (left.month - input.excludeMonth),
        );
        const rightDistance = Math.abs(
          (right.year - input.excludeYear) * 12 + (right.month - input.excludeMonth),
        );

        if (leftDistance !== rightDistance) {
          return leftDistance - rightDistance;
        }
      }

      if (left.year !== right.year) {
        return right.year - left.year;
      }

      return right.month - left.month;
    })
    .slice(0, input?.limit ?? 3);
}

export async function listRelatedGuides(
  locale: Locale,
  limit = 2,
  excludeSlug?: string,
  referenceText?: string,
) {
  const referenceTerms = tokenizeSeoValue(referenceText ?? excludeSlug ?? "");

  return filterIndexableGuides(await listGuides(locale))
    .filter((guide) => guide.slug !== excludeSlug)
    .sort((left, right) => {
      const scoreDiff =
        scoreRelatedGuide(right, referenceTerms) - scoreRelatedGuide(left, referenceTerms);

      if (scoreDiff !== 0) {
        return scoreDiff;
      }

      return left.sortOrder - right.sortOrder;
    })
    .slice(0, limit);
}

export async function listRelatedNews(
  locale: Locale,
  limit = 3,
  excludeSlug?: string,
  referenceText?: string,
) {
  const referenceTerms = tokenizeSeoValue(referenceText ?? excludeSlug ?? "");

  return (await listNewsArticles(locale))
    .filter((article) => article.slug !== excludeSlug)
    .sort((left, right) => {
      const leftTerms = new Set([
        ...tokenizeSeoValue(left.slug),
        ...tokenizeSeoValue(left.title),
        ...tokenizeSeoValue(left.summary),
      ]);
      const rightTerms = new Set([
        ...tokenizeSeoValue(right.slug),
        ...tokenizeSeoValue(right.title),
        ...tokenizeSeoValue(right.summary),
      ]);

      const leftScore = referenceTerms.reduce(
        (score, term) => score + (leftTerms.has(term) ? 3 : 0),
        left.featured ? 2 : 0,
      );
      const rightScore = referenceTerms.reduce(
        (score, term) => score + (rightTerms.has(term) ? 3 : 0),
        right.featured ? 2 : 0,
      );

      if (rightScore !== leftScore) {
        return rightScore - leftScore;
      }

      const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : 0;
      const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : 0;

      return rightTime - leftTime || left.sortOrder - right.sortOrder;
    })
    .slice(0, limit);
}

export async function listRelatedStatuses(locale: Locale, currentSlug: string, limit = 3) {
  return (await listStatusMeanings(locale))
    .filter((status) => status.slug !== currentSlug)
    .slice(0, limit);
}

export async function listRelatedGrantTypes(locale: Locale, currentSlug: string, limit = 3) {
  return (await listPublicGrantTypes(locale))
    .filter((grant) => grant.slug !== currentSlug)
    .slice(0, limit);
}

export async function listRelatedFaqs(locale: Locale, limit = 3) {
  return (await listFaqs(locale)).slice(0, limit);
}
