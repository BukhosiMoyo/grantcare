import type { PublicFaq } from "@/lib/fallback-content";

/**
 * Renders FAQPage structured data matching the questions and answers on the page.
 * Search engines decide whether to show enhanced results.
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
