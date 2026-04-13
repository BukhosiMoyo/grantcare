import type { MetadataRoute } from "next";

import {
  listGuides,
  listPaymentPeriods,
  listPublicGrantTypes,
  listStatusMeanings,
} from "@/lib/content";
import { buildLocalizedSitemapEntry } from "@/lib/metadata";
import { LOCALES } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const [guides, grants, statuses, paymentPeriods] = await Promise.all([
    listGuides("en"),
    listPublicGrantTypes("en"),
    listStatusMeanings("en"),
    listPaymentPeriods("en"),
  ]);

  const staticRoutes = LOCALES.flatMap((locale) => [
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/",
      changeFrequency: "daily",
      priority: 1,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/payment-dates",
      changeFrequency: "daily",
      priority: 0.9,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/status",
      changeFrequency: "weekly",
      priority: 0.85,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/eligibility-checker",
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/grants",
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/guides",
      changeFrequency: "daily",
      priority: 0.85,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/faq",
      changeFrequency: "weekly",
      priority: 0.6,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/privacy",
      changeFrequency: "monthly",
      priority: 0.3,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/contact",
      changeFrequency: "monthly",
      priority: 0.35,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/disclaimer",
      changeFrequency: "monthly",
      priority: 0.2,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/terms",
      changeFrequency: "monthly",
      priority: 0.2,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/editorial-policy",
      changeFrequency: "monthly",
      priority: 0.2,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/cookie-policy",
      changeFrequency: "monthly",
      priority: 0.2,
    }),
    buildLocalizedSitemapEntry({
      locale: locale.code,
      path: "/sitemap",
      changeFrequency: "weekly",
      priority: 0.2,
    }),
  ]);

  const paymentRoutes = LOCALES.flatMap((locale) =>
    paymentPeriods.flatMap((period) => [
      buildLocalizedSitemapEntry({
        locale: locale.code,
        path: `/payment-dates/${period.year}/${period.monthSlug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      }),
      ...period.entries.map((entry) =>
        buildLocalizedSitemapEntry({
          locale: locale.code,
          path: `/payment-dates/${period.year}/${period.monthSlug}/${entry.grantSlug}`,
          changeFrequency: "monthly",
          priority: 0.78,
        }),
      ),
    ]),
  );

  const guideRoutes = LOCALES.flatMap((locale) =>
    guides.map((guide) =>
      buildLocalizedSitemapEntry({
        locale: locale.code,
        path: `/guides/${guide.slug}`,
        changeFrequency: "weekly",
        priority: 0.75,
      }),
    ),
  );

  const grantRoutes = LOCALES.flatMap((locale) =>
    grants.map((grant) =>
      buildLocalizedSitemapEntry({
        locale: locale.code,
        path: `/grants/${grant.slug}`,
        changeFrequency: "monthly",
        priority: 0.72,
      }),
    ),
  );

  const statusRoutes = LOCALES.flatMap((locale) =>
    statuses.map((status) =>
      buildLocalizedSitemapEntry({
        locale: locale.code,
        path: `/status/${status.slug}`,
        changeFrequency: "weekly",
        priority: 0.76,
      }),
    ),
  );

  return [...staticRoutes, ...paymentRoutes, ...guideRoutes, ...grantRoutes, ...statusRoutes];
}

export function buildSitemapXml(entries: MetadataRoute.Sitemap) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const entry of entries) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.url)}</loc>`);

    const languages = entry.alternates?.languages
      ? Object.entries(entry.alternates.languages)
      : [];

    for (const [locale, href] of languages) {
      if (typeof href !== "string") {
        continue;
      }

      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}" />`,
      );
    }

    if (entry.lastModified) {
      lines.push(`    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>`);
    }

    if (entry.changeFrequency) {
      lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
    }

    if (typeof entry.priority === "number") {
      lines.push(`    <priority>${entry.priority}</priority>`);
    }

    lines.push("  </url>");
  }

  lines.push("</urlset>");

  return `${lines.join("\n")}\n`;
}
