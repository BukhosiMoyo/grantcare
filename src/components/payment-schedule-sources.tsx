import Link from "next/link";
import { buildLocalePath, SUPPORT_EMAIL } from "@/lib/site";
import { getPaymentDateSources, PAYMENT_DATE_SOURCES, PAYMENT_SCHEDULE_REVIEWED_ON } from "@/lib/payment-schedule";
import type { Locale } from "@/lib/site";

const COPY = {
  en: {heading: "Payment date sources", reviewed: "Sources checked", pending: "Awaiting an official schedule", unknown: "No confirmed dates were found for this month in the sources reviewed. We will not estimate a payday from a weekday pattern."},
  zu: {heading: "Imithombo yezinsuku zokukhokha", reviewed: "Imithombo ihlolwe", pending: "Kusalindwe uhlelo olusemthethweni", unknown: "Asitholanga izinsuku eziqinisekisiwe zale nyanga emithonjeni ehloliwe. Ngeke siqagele usuku lokukhokha ngokulandelana kwezinsuku zeviki."},
  xh: {heading: "Imithombo yemihla yokuhlawula", reviewed: "Imithombo ijongiwe", pending: "Kusalindwe ishedyuli esemthethweni", unknown: "Akukho mihla iqinisekisiweyo yale nyanga efunyenwe kwimithombo ejongiweyo. Asiyi kuqikelela umhla ngokulandelelana kweentsuku zeveki."},
  tn: {heading: "Metswedi ya malatsi a tefo", reviewed: "Metswedi e tlhotlhilwe", pending: "Go sa letetswe lenaneo la semmuso", unknown: "Ga go a bonwa malatsi a a netefaditsweng a kgwedi eno mo metsweding e e sekasekilweng. Ga re kitla re fopholetsa letsatsi go ya ka malatsi a beke."},
} as const;

export function PaymentScheduleSources({ locale, year, month }: {locale: Locale; year?: number; month?: number}) {
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const sources = year !== undefined && month !== undefined ? getPaymentDateSources(year, month) : [PAYMENT_DATE_SOURCES.current, PAYMENT_DATE_SOURCES.novemberRevision];
  const reviewedDate = new Intl.DateTimeFormat(locale === "en" ? "en-ZA" : locale, {day:"numeric", month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(`${PAYMENT_SCHEDULE_REVIEWED_ON}T00:00:00Z`));
  return (
    <section className="rounded-2xl border border-border bg-surface-muted p-5 sm:p-6" aria-label={copy.heading} data-payment-sources>
      <h2 className="text-xl font-semibold">{sources.length ? copy.heading : copy.pending}</h2>
      <p className="mt-2 text-sm text-muted">{copy.reviewed}: <time dateTime={PAYMENT_SCHEDULE_REVIEWED_ON}>{reviewedDate}</time></p>
      <p className="mt-2 text-base leading-7 text-muted" lang="en">{year !== undefined && month !== undefined && year * 100 + month < 202604 ? "Historical dates were cross-checked against an archived secondary report; the original SASSA calendar is no longer available at its former address." : "This check covers the published ordinary-grant calendar and its November revision. It does not confirm an individual's SRD payment date or eligibility."}</p>
      {sources.length ? <ul className="mt-3 space-y-3">{sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="focus-ring text-base font-semibold text-primary underline decoration-primary/30 underline-offset-4">{source.label}</a></li>)}</ul> : <p className="mt-3 text-base leading-7 text-muted">{copy.unknown}</p>}
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-primary" lang="en">
        <Link className="focus-ring underline underline-offset-4" href={buildLocalePath(locale, "/editorial-policy")}>How we check information</Link>
        <a className="focus-ring underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}?subject=GrantCare%20payment%20date%20correction`}>Report a correction</a>
      </div>
    </section>
  );
}
