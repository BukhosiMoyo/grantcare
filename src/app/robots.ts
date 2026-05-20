import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";
import { getPublicLocales } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const locales = getPublicLocales();

  const baseDisallowed = [
    "/api/",
    "/admin",
    "/admin/",
    "/dashboard",
    "/forgot-password",
    "/reset-password",
    "/sign-in",
    "/sign-up",
    "/unsubscribe",
  ];

  // Dynamically multiply private routes across all public locales to lock them down
  const disallowedPaths = [
    ...baseDisallowed,
    ...locales.flatMap((locale) =>
      baseDisallowed.map((path) => `/${locale.code}${path}`)
    ),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
