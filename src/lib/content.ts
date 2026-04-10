import { ContentStatus, MonetizationPlacement } from "@prisma/client";

import { canQueryDatabase, isRecoverableDatabaseError, markDatabaseUnavailable } from "@/lib/database-readiness";
import { db } from "@/lib/prisma";
import {
  ELIGIBILITY_RESULT_SLUGS,
  FALLBACK_FAQS,
  FALLBACK_GRANT_TYPES,
  FALLBACK_GUIDES,
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
  findFallbackPaymentPeriod,
  findFallbackStatusMeaning,
  getFallbackPaymentRouteDefaults,
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
  type PublicNotice,
  type PublicPaymentDateState,
  type PublicPaymentEntry,
  type PublicPaymentPeriod,
  type PublicStatusMeaning,
} from "@/lib/fallback-content";
import type { Locale } from "@/lib/site";
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
  type PublicNotice,
  type PublicPaymentDateState,
  type PublicPaymentEntry,
  type PublicPaymentPeriod,
  type PublicStatusMeaning,
};

type TranslationFields = Record<string, unknown>;

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
          ? "SRD payment timing varies by application outcome. Use the official SRD portal."
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
      note: getLocalizedString(
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

      return records.map((record) => mapGuideRecord(record, locale));
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

      return records.map((record) => mapGuideRecord(record, locale));
    },
    () => [...FALLBACK_GUIDES].slice(-limit).reverse(),
  );
}

export async function getGuideBySlug(locale: Locale, slug: string) {
  return withPublicFallback(
    async () => {
      const record = await db.guideArticle.findUnique({ where: { slug } });
      if (!record || record.status !== ContentStatus.published) {
        return null;
      }

      return mapGuideRecord(record, locale);
    },
    () => findFallbackGuide(slug),
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

  return (
    periods.find((entry) => entry.year === currentYear && entry.month === currentMonth) ??
    getFallbackPaymentRouteDefaults()
  );
}

export async function listRecentPaymentPeriods(
  locale: Locale,
  input?: { excludeMonth?: number; excludeYear?: number; limit?: number },
) {
  return (await listPaymentPeriods(locale))
    .filter((period) => {
      if (input?.excludeYear === undefined || input?.excludeMonth === undefined) {
        return true;
      }

      return !(period.year === input.excludeYear && period.month === input.excludeMonth);
    })
    .sort((left, right) => {
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

  return (await listGuides(locale))
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
