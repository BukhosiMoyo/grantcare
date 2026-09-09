export const NEWS_REDIRECTS: Record<string, string> = {
  "sassa-confirms-2026-2027-payment-schedule-and-increases": "sassa-payment-schedule-2026-2027",
};

export function filterCanonicalNews<T extends { slug: string }>(articles: T[]): T[] {
  return articles.filter(article => !NEWS_REDIRECTS[article.slug]);
}
