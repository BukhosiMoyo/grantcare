import type { MetadataRoute } from "next";

import {
  listGuides,
  listPaymentPeriods,
  listPublicGrantTypes,
  listStatusMeanings,
} from "@/lib/content";
import { LOCALES, SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, grants, statuses, paymentPeriods] = await Promise.all([
    listGuides("en"),
    listPublicGrantTypes("en"),
    listStatusMeanings("en"),
    listPaymentPeriods("en"),
  ]);

  const staticRoutes = LOCALES.flatMap((locale) =>
    ["", "/payment-dates", "/status", "/eligibility-checker", "/grants", "/guides", "/faq", "/privacy"].map(
      (path) => ({
        url: `${SITE_URL}/${locale.code}${path}`,
        lastModified: new Date(),
      }),
    ),
  );

  const paymentRoutes = LOCALES.flatMap((locale) =>
    paymentPeriods.flatMap((period) => [
      {
        url: `${SITE_URL}/${locale.code}/payment-dates/${period.year}/${period.monthSlug}`,
        lastModified: new Date(),
      },
      ...period.entries.map((entry) => ({
        url: `${SITE_URL}/${locale.code}/payment-dates/${period.year}/${period.monthSlug}/${entry.grantSlug}`,
        lastModified: new Date(),
      })),
    ]),
  );

  const guideRoutes = LOCALES.flatMap((locale) =>
    guides.map((guide) => ({
      url: `${SITE_URL}/${locale.code}/guides/${guide.slug}`,
      lastModified: new Date(),
    })),
  );

  const grantRoutes = LOCALES.flatMap((locale) =>
    grants.map((grant) => ({
      url: `${SITE_URL}/${locale.code}/grants/${grant.slug}`,
      lastModified: new Date(),
    })),
  );

  const statusRoutes = LOCALES.flatMap((locale) =>
    statuses.map((status) => ({
      url: `${SITE_URL}/${locale.code}/status/${status.slug}`,
      lastModified: new Date(),
    })),
  );

  return [...staticRoutes, ...paymentRoutes, ...guideRoutes, ...grantRoutes, ...statusRoutes];
}
