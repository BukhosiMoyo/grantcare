import { getSiteUrl } from "@/lib/site-url";

/**
 * Site-wide Organization + WebSite schema markup.
 * Renders on every page via the root layout.
 *
 * - Organization: Powers Google Knowledge Panel
 * - WebSite: Enables sitelinks search box in SERPs
 */
export function SiteSchema() {
  const siteUrl = getSiteUrl();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GrantCare",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.png`,
        width: 512,
        height: 512,
      },
      description:
        "Independent SASSA grant help for payment dates, status checks, eligibility, reminders, and official contact routes in South Africa.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "hello@symaxx.com",
          contactType: "customer support",
          availableLanguage: ["English", "Zulu", "Xhosa", "Afrikaans"],
        },
      ],
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "GrantCare",
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: ["en", "zu", "xh", "af", "nso", "tn"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/en/guides?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
