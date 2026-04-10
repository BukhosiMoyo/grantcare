import type { Metadata } from "next";

import { LOCALES, SITE_URL, buildLocalePath, type Locale } from "@/lib/site";

export function buildLocalizedMetadata(input: {
  description: string;
  locale: Locale;
  path: string;
  title: string;
}) {
  const canonicalPath = buildLocalePath(input.locale, input.path);
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        LOCALES.map((entry) => [
          entry.code,
          new URL(buildLocalePath(entry.code, input.path), SITE_URL).toString(),
        ]),
      ),
    },
    openGraph: {
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
