import { getSiteUrl } from "@/lib/site-url";
import { buildLocalePath, type Locale } from "@/lib/site";

type BreadcrumbItem = {
  label: string;
  path: string;
};

/**
 * BreadcrumbList schema for better SERP appearance.
 * Google displays breadcrumb trails under page titles in search results.
 */
export function BreadcrumbSchema({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: Locale;
}) {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(buildLocalePath(locale, item.path), siteUrl).toString(),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
