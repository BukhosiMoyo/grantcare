import type { Metadata, MetadataRoute } from "next";

import { LOCALES, buildLocalePath, type Locale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

const META_DESCRIPTION_MAX_LENGTH = 160;

function buildLanguageAlternates(path: string) {
  const siteUrl = getSiteUrl();

  return Object.fromEntries(
    LOCALES.map((entry) => [
      entry.code,
      new URL(buildLocalePath(entry.code, path), siteUrl).toString(),
    ]),
  );
}

function normalizeMetaText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function truncateMetaDescription(
  value: string,
  maxLength = META_DESCRIPTION_MAX_LENGTH,
) {
  const normalized = normalizeMetaText(value);

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const truncated = normalized.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeTruncate = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${safeTruncate.trim()}…`;
}

export function buildGuideMetaTitle(title: string) {
  const normalized = normalizeMetaText(title);

  return /\bsassa\b/i.test(normalized) ? normalized : `${normalized} — SASSA`;
}

export function buildNewsMetaTitle(title: string) {
  const normalized = normalizeMetaText(title);

  if (/\bsassa\b/i.test(normalized)) {
    return normalized;
  }

  return `${normalized} — SASSA news`;
}

export function buildGuideMetaDescription(summary: string) {
  const normalized = normalizeMetaText(summary);

  if (/\b(sassa|srd|grant)\b/i.test(normalized)) {
    return truncateMetaDescription(normalized);
  }

  const firstCharacter = normalized.charAt(0);
  const lowerCasedSummary = `${firstCharacter.toLowerCase()}${normalized.slice(1)}`;

  return truncateMetaDescription(`SASSA guide: ${lowerCasedSummary}`);
}

export function buildNewsMetaDescription(summary: string) {
  const normalized = normalizeMetaText(summary);

  if (/\b(sassa|srd|grant|payment)\b/i.test(normalized)) {
    return truncateMetaDescription(normalized);
  }

  const firstCharacter = normalized.charAt(0);
  const lowerCasedSummary = `${firstCharacter.toLowerCase()}${normalized.slice(1)}`;

  return truncateMetaDescription(`SASSA news update: ${lowerCasedSummary}`);
}

export function buildLocalizedMetadata(input: {
  description: string;
  locale: Locale;
  noIndex?: boolean;
  openGraphType?: "article" | "website";
  path: string;
  title: string;
}) {
  const siteUrl = getSiteUrl();
  const canonicalPath = buildLocalePath(input.locale, input.path);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
  const languages = buildLanguageAlternates(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    openGraph: {
      type: input.openGraphType ?? "website",
      siteName: "GrantCare",
      locale: input.locale,
      title: input.title,
      description: input.description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  } satisfies Metadata;
}

export function buildLocalizedSitemapEntry(input: {
  path: string;
  locale: Locale;
  lastModified?: string | Date | null;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
}) {
  const siteUrl = getSiteUrl();
  const canonicalPath = buildLocalePath(input.locale, input.path);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();

  return {
    url: canonicalUrl,
    lastModified: input.lastModified ? new Date(input.lastModified) : new Date(),
    changeFrequency: input.changeFrequency,
    priority: input.priority,
    alternates: {
      languages: buildLanguageAlternates(input.path),
    },
  } satisfies MetadataRoute.Sitemap[number];
}
