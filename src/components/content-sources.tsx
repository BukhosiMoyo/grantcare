import Link from "next/link";
import { getEvidenceSources, isEvidenceUrl, type EvidenceTopic } from "@/lib/content-evidence";
import { buildLocalePath, SUPPORT_EMAIL, type Locale } from "@/lib/site";

const LABELS = {
  en: { title: "Sources and review", scope: "What this source supports", checked: "Source checked", pending: "Further verification needed", correction: "Report a correction", policy: "How we check information" },
  zu: { title: "Imithombo nokubuyekezwa", scope: "Okusekelwa yilo mthombo", checked: "Umthombo uhloliwe", pending: "Kusadingeka ukuqinisekiswa", correction: "Bika iphutha", policy: "Indlela esihlola ngayo ulwazi" },
  xh: { title: "Imithombo nophononongo", scope: "Okuxhaswa ngulo mthombo", checked: "Umthombo ujongiwe", pending: "Kusafuneka ukuqinisekiswa", correction: "Xela impazamo", policy: "Indlela esijonga ngayo ulwazi" },
  tn: { title: "Metswedi le tshekatsheko", scope: "Se se tshegediwang ke motswedi", checked: "Motswedi o tlhotlhilwe", pending: "Go sa tlhokega netefatso", correction: "Bega phoso", policy: "Ka fa re tlhatlhobang tshedimosetso ka teng" },
};

export function ContentSources({ locale, topic = "general", path, article = false }: {
  locale: Locale; topic?: EvidenceTopic; path: string; article?: boolean;
}) {
  const copy = LABELS[locale as keyof typeof LABELS] ?? LABELS.en;
  const sources = getEvidenceSources(topic).filter(source => isEvidenceUrl(source.href));
  return <section className="rounded-2xl border border-border bg-surface-muted p-5 sm:p-6" aria-label={copy.title} data-content-sources data-review-state={article ? "pending" : "scoped"}>
    <h2 className="text-xl font-semibold">{copy.title}</h2>
    {article ? <p className="mt-2 text-base leading-7 text-muted" lang="en">These are relevant references, not confirmation that every claim in this article has been verified. A full factual review of this article is still pending.</p> : null}
    <ul className="mt-4 space-y-5">{sources.map(source => <li key={source.id} className="space-y-1" lang="en">
      <a className="focus-ring text-base font-semibold text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
      <p className="text-sm leading-6 text-muted">{source.checkedOn ? <>{copy.checked}: <time dateTime={source.checkedOn}>{new Intl.DateTimeFormat("en-ZA", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"}).format(new Date(source.checkedOn + "T00:00:00Z"))}</time>. </> : <>{copy.pending}. </>}{source.publishedOn ? <>Published: <time dateTime={source.publishedOn}>{source.publishedOn}</time>. </> : null}</p>
      <p className="text-base leading-7 text-muted"><span className="font-semibold">{copy.scope}: </span>{source.scope}</p>
    </li>)}</ul>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-primary">
      <Link className="focus-ring underline underline-offset-4" href={buildLocalePath(locale, "/editorial-policy")}>{copy.policy}</Link>
      <a className="focus-ring underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("GrantCare correction: " + path)}`}>{copy.correction}</a>
    </div>
  </section>;
}
