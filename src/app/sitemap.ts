import type { MetadataRoute } from "next";

import {
  listGuides,
  listPaymentPeriods,
  listPublicGrantTypes,
  listStatusMeanings,
} from "@/lib/content";
import { buildLocalizedSitemapEntry } from "@/lib/metadata";
import { LOCALES } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
