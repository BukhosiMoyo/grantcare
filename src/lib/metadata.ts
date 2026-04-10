import type { Metadata, MetadataRoute } from "next";

import { LOCALES, SITE_URL, buildLocalePath, type Locale } from "@/lib/site";

function buildLanguageAlternates(path: string) {
  return Object.fromEntries(
    LOCALES.map((entry) => [
      entry.code,
      new URL(buildLocalePath(entry.code, path), SITE_URL).toString(),
    ]),
  );
}

export function buildLocalizedMetadata(input: {
  description: string;
  locale: Locale;
  noIndex?: boolean;
  openGraphType?: "article" | "website";
  path: string;
  title: string;
}) {
  const canonicalPath = buildLocalePath(input.locale, input.path);
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
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
  const canonicalPath = buildLocalePath(input.locale, input.path);
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

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
