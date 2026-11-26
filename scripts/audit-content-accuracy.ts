import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { FALLBACK_GUIDES, FALLBACK_NEWS_ARTICLES, FALLBACK_GRANT_TYPES, FALLBACK_STATUS_MEANINGS, FALLBACK_PAYMENT_PERIODS, FALLBACK_FAQS } from "../src/lib/fallback-content";
import { reconcilePaymentEntry } from "../src/lib/payment-schedule";
import { correctGuide, correctNews } from "../src/lib/content-corrections";
import { EVIDENCE_SOURCES, getEvidenceTopic, getEvidenceSources } from "../src/lib/content-evidence";
import { getDuplicateGuideRedirectPath } from "../src/lib/guide-redirects";
import { isGuideIndexable } from "../src/lib/guide-seo";
import { NEWS_REDIRECTS } from "../src/lib/news-seo";
import { SASSA_OFFICES } from "../src/lib/sassa-offices";
import { buildLocalePath, getPublicLocales } from "../src/lib/site";

type Row = { path: string; family: string; locale: string; fingerprint: string; disposition: string; review: string; sources: string[]; flaggedClaims: string[] };
const rows: Row[] = [];
function add(route: string, family: string, record: unknown, review = "full factual review pending", disposition = "retain; inspect live index signals") {
  const text = JSON.stringify(record);
  const claims = Array.from(new Set(text.match(/R\s?\d[\d ,]*(?:\.\d{2})?|\b(?:\d+(?:\s*(?:to|-|–)\s*\d+)?|one|two|three|four|five|six|seven|fourteen|thirty|ninety)\s+(?:(?:business|working|calendar)\s+)?(?:day|hour|week|month|year)s?\b/gi) ?? []));
  const sources = getEvidenceSources(getEvidenceTopic(route)).map(source => source.id);
  for (const locale of getPublicLocales()) rows.push({
    path: buildLocalePath(locale.code, route), family, locale: locale.code,
    fingerprint: createHash("sha256").update(text).digest("hex"), disposition,
    review: locale.code === "en" ? review : review + "; fluent-speaker review pending",
    sources, flaggedClaims: claims,
  });
}

for (const guide of FALLBACK_GUIDES) {
  const redirect = getDuplicateGuideRedirectPath(guide.slug);
  add(`/guides/${guide.slug}`, "guide", correctGuide(guide), undefined, redirect ? `redirect: ${redirect}` : isGuideIndexable(guide) ? "index candidate; inspect live" : "intentionally excluded by current rule; inspect live");
}
for (const article of FALLBACK_NEWS_ARTICLES) add(`/news/${article.slug}`, "news", correctNews(article), undefined, NEWS_REDIRECTS[article.slug] ? `redirect: /news/${NEWS_REDIRECTS[article.slug]}` : undefined);
for (const grant of FALLBACK_GRANT_TYPES) add(`/grants/${grant.slug}`, "grant", grant);
for (const status of FALLBACK_STATUS_MEANINGS) add(`/status/${status.slug}`, "status", status);
for (const office of SASSA_OFFICES) add(`/sassa-office-locator/${office.slug}`, "office", office, "contact listings compared 2026-11-26; regional conflicts recorded; coordinates not verified");
for (const period of FALLBACK_PAYMENT_PERIODS) {
  const route = `/payment-dates/${period.year}/${period.monthSlug}`;
  const review = period.entries.some(entry => entry.date) ? "published dates reconciled to reviewed registry; historical source limits apply" : "no confirmed calendar; do not estimate";
  add(route, "calendar-month", period, review);
  for (const entry of period.entries) add(`${route}/${entry.grantSlug}`, "calendar-grant", entry, entry.grantSlug === "social-relief" ? "individual SRD dates only; no common date" : review);
}
for (const [route, family, data] of [
  ["/", "homepage", {}], ["/grant-amounts", "amounts", {}], ["/grants", "grant-hub", {}], ["/guides", "guide-hub", {}],
  ["/status", "status-hub", {}], ["/eligibility-checker", "eligibility", {}], ["/claim-checker", "claim-checker", {}],
  ["/sassa-office-locator", "office-hub", SASSA_OFFICES], ["/contact", "contact", {}], ["/payment-dates", "calendar-hub", {}],
  ["/faq", "faq", FALLBACK_FAQS], ["/news", "news-hub", {}],
  ["/tools/sassa-appeal", "public-tool", {}], ["/tools/interview-guide", "public-tool", {}], ["/tools/email-template", "public-tool", {}],
] as const) add(route, family, data);

async function main() {
const destination = path.resolve(process.argv[2] ?? "docs/audits/accuracy-20261126");
await mkdir(destination, {recursive: true});
const cmsFlag = process.argv.indexOf("--cms-snapshot");
let cmsReconciliation: unknown = null;
if (cmsFlag >= 0) {
  const cms = JSON.parse(await readFile(process.argv[cmsFlag + 1], "utf8"));
  const stable = (value: unknown): unknown => Array.isArray(value) ? value.map(stable) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a],[b]) => a.localeCompare(b)).map(([key, val]) => [key, stable(val)])) : value;
  const comparisons = [
    ["guides", FALLBACK_GUIDES, ["title","summary","sections"]],
    ["news", FALLBACK_NEWS_ARTICLES, ["title","summary","sections","sourceUrls"]],
    ["grants", FALLBACK_GRANT_TYPES, ["name","summary","checks","documents","officialHref"]],
    ["statuses", FALLBACK_STATUS_MEANINGS, ["title","meaning","causes","fixes","nextSteps","officialHref"]],
  ] as const;
  const families = comparisons.map(([family, bundled, fields]) => {
    const bySlug = new Map(bundled.map(record => [record.slug, record]));
    const records = cms[family] as Array<Record<string, unknown> & {slug: string}>;
    return {family, published: records.length, records: records.map(record => {
      const candidate = bySlug.get(record.slug);
      const differences = candidate ? fields.filter(field => JSON.stringify(stable((candidate as unknown as Record<string, unknown>)[field])) !== JSON.stringify(stable(record[field]))) : ["CMS-only"];
      return {slug: record.slug, fingerprint: createHash("sha256").update(JSON.stringify(stable(record))).digest("hex"), differences, redirect: family === "news" ? NEWS_REDIRECTS[record.slug] ?? null : family === "guides" ? getDuplicateGuideRedirectPath(record.slug) : null};
    })};
  });
  const paymentDifferences = (cms.paymentEntries as Array<{year:number;month:number;grantSlug:string;paymentDate:string|null;state:string;note:string|null}>).flatMap(entry => {
    const before = entry.paymentDate?.slice(0,10) ?? null;
    const reconciled = reconcilePaymentEntry({grantSlug:entry.grantSlug,grantName:entry.grantSlug,officialHref:"https://srd.sassa.gov.za/",state:entry.state === "portal_only" ? "portal-only" : entry.state as "expected"|"pending",date:before,note:entry.note ?? "",published:true},entry.year,entry.month,"en");
    return before !== reconciled.date ? [{year:entry.year,month:entry.month,grant:entry.grantSlug,before,after:reconciled.date}] : [];
  });
  cmsReconciliation = {capturedAt:cms.capturedAt,mode:"Read-only public content snapshot; no personal tables or database writes",families,paymentDifferences,faqs:cms.faqs.length};
}
const summary = {
  generatedOn: new Date().toISOString(), basis: cmsReconciliation ? "Bundled inventory reconciled with a read-only snapshot of published production content; see cmsReconciliation. Live HTTP/rendering verification remains separate." : "Bundled fallback inventory only; no CMS snapshot supplied.",
  records: rows.length, families: Object.fromEntries([...new Set(rows.map(row => row.family))].map(family => [family, rows.filter(row => row.family === family).length])),
  flaggedRows: rows.filter(row => row.flaggedClaims.length).length,
  note: "Flags are review candidates, not proven errors. References checked do not certify article contents. Fingerprints identify the reviewed snapshot; no reviewed status is inherited by changed CMS content.",
};
await writeFile(path.join(destination, "inventory.json"), JSON.stringify({summary, sources: EVIDENCE_SOURCES, cmsReconciliation, rows}, null, 2) + "\n");
const quote = (value: string) => '"' + value.replaceAll('"','""') + '"';
await writeFile(path.join(destination, "inventory.csv"), ["path,family,locale,fingerprint,disposition,review,sources,flagged_claims", ...rows.map(row => [row.path,row.family,row.locale,row.fingerprint,row.disposition,row.review,row.sources.join("; "),row.flaggedClaims.join("; ")].map(quote).join(","))].join("\n") + "\n");
console.log(JSON.stringify(summary, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
