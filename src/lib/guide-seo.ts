const ALWAYS_INDEXED_GUIDE_SLUGS = new Set([
  "how-to-understand-payment-dates",
  "how-to-know-if-your-payment-is-ready",
  "how-to-fix-missing-payment-issues",
  "why-payment-is-delayed",
  "how-to-update-banking-details",
  "what-to-do-after-approval",
  "how-to-fix-declined-status",
  "how-sassa-appeals-work",
  "appeal-vs-reapplication-guide",
  "how-to-use-sassa-status-check-for-r350",
  "srd-sassa-gov-za-status-check-guide",
  "how-to-use-srd-status-check-safely",
]);

const GUIDE_NOINDEX_PATTERNS = [
  /(^|-)20(24|25|27)(-|$)/,
  /wording-usually-means/,
  /^payment-dates-/,
  /^srd-payment-dates-/,
  /^sassa-status-check-for-r350-payment/,
  /(^|-)payment-dates?(-|$)/,
  /(^|-)pay-dates?(-|$)/,
  /(^|-)grant-date(-|$)/,
];

export function isGuideIndexable(guide: { slug: string }) {
  if (ALWAYS_INDEXED_GUIDE_SLUGS.has(guide.slug)) {
    return true;
  }

  return !GUIDE_NOINDEX_PATTERNS.some((pattern) => pattern.test(guide.slug));
}

export function filterIndexableGuides<T extends { slug: string }>(guides: T[]) {
  return guides.filter(isGuideIndexable);
}
