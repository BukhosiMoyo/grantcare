import type { PublicFaq } from "@/lib/fallback-content";

/**
 * Renders FAQPage structured data (JSON-LD) for rich snippet eligibility.
 * Google uses this to show FAQ accordions directly in search results.
 */
export function FaqSchema({ faqs }: { faqs: PublicFaq[] }) {
  if (faqs.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
