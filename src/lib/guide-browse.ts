export const GUIDE_TOPICS = [
  "all",
  "payments",
  "status",
  "banking",
  "applications",
  "other",
] as const;
export type GuideTopic = (typeof GUIDE_TOPICS)[number];
export type BrowsableGuide = { slug: string; title: string; summary: string };

export function getGuideTopic(slug: string): Exclude<GuideTopic, "all"> {
  if (/bank|account-details|payment-method/.test(slug)) return "banking";
  if (/appeal|declin|pending|status|reconsider/.test(slug)) return "status";
  if (/payment|pay-date|grant-amount|payday/.test(slug)) return "payments";
  if (/appl|document|eligib|register/.test(slug)) return "applications";
  return "other";
}

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function filterBrowsableGuides<T extends BrowsableGuide>(
  guides: readonly T[],
  query: string,
  topic: GuideTopic,
): T[] {
  const terms = normalize(query).split(" ").filter(Boolean);
  return guides.filter((guide) => {
    if (topic !== "all" && getGuideTopic(guide.slug) !== topic) return false;
    const searchable = normalize(
      `${guide.title} ${guide.summary} ${guide.slug}`,
    );
    return terms.every((term) => searchable.includes(term));
  });
}
