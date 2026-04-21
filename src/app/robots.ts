import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/",
          "/dashboard",
          "/forgot-password",
          "/reset-password",
          "/sign-in",
          "/sign-up",
          "/unsubscribe",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
