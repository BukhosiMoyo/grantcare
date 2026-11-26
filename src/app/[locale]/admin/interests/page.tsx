import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateInterestStatusAction } from "@/actions/interests";
import { Card, Select } from "@/components/ui";
import { requireAdmin } from "@/lib/auth-guards";
import { getInterestReport, isInterestCaptureEnabled } from "@/lib/interests";
import { interestLabel } from "@/lib/interest-schema";
import { db } from "@/lib/prisma";
import { isLocale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";

export const metadata: Metadata = { title: "Interest leads" };

export default async function AdminInterestsPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ days?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  await requireAdmin(locale, "/admin/interests");
  const days = (await searchParams).days === "7" ? 7 : 30;
  if (!isDatabaseConfigured()) return <Card>Interest reporting requires the configured database.</Card>;
  let report;
  let leads;
  try {
    [report, leads] = await Promise.all([
      getInterestReport(days),
      db.interestLead.findMany({ where: { expiresAt: { gt: new Date() }, status: { not: "withdrawn" } }, orderBy: { createdAt: "desc" }, take: 100 }),
    ]);
  } catch {
    return <Card><h1 className="text-2xl font-semibold">Interest reporting is not ready</h1><p className="mt-3 text-muted">Apply the interest-table database update before enabling capture. No sample leads are shown.</p></Card>;
  }
  return <div className="space-y-6">
    <header className="space-y-3"><p className="text-xs font-semibold uppercase tracking-widest text-primary">Demand evidence</p><h1 className="text-3xl font-semibold">What people are asking for</h1><p className="max-w-3xl text-sm leading-7 text-muted">Submissions are self-reported interest, not qualified leads or verified identities. Mark an interest confirmed only after the person has personally confirmed it. No contact-sharing permission is collected in this version.</p>
      <div className="flex flex-wrap items-center gap-3"><a href="?days=7" className="focus-ring tap-target inline-flex items-center rounded-full border border-border px-4">7 days</a><a href="?days=30" className="focus-ring tap-target inline-flex items-center rounded-full border border-border px-4">30 days</a><a href={`/api/admin/interests/report?days=${days}`} className="focus-ring tap-target inline-flex items-center rounded-full bg-primary px-4 text-white">Download aggregate report</a><span className="text-sm text-muted">Capture {isInterestCaptureEnabled() ? "enabled" : "disabled"}</span></div>
    </header>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[
      ["Active interests", report.submitted], ["Unique contact details", report.uniqueContacts], ["Personally confirmed", report.confirmed], ["Form view events", report.views],
    ].map(([label, value]) => <Card key={label}><p className="text-sm text-muted">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted">Last {days} days</p></Card>)}</div>
    <p className="text-sm leading-6 text-muted">Repeated submissions for the same contact and interest count once. One contact may choose several interests. Phone and email are different contact details; these counts do not establish unique people. Form views are events, not unique visitors.</p>
    <div className="grid gap-4 lg:grid-cols-2"><Card><h2 className="mb-4 text-xl font-semibold">By interest</h2>{report.topics.map((row) => <div key={row.topic} className="flex justify-between gap-4 border-t border-border py-3 text-sm"><span>{interestLabel(row.topic)}</span><span>{row.submitted} interests · {row.confirmed} confirmed</span></div>)}</Card><Card><h2 className="mb-4 text-xl font-semibold">Pages producing interest</h2>{report.sources.length ? report.sources.map(([path, count]) => <div key={path} className="flex justify-between gap-4 border-t border-border py-3 text-sm"><span className="min-w-0 break-words">{path}</span><span>{count}</span></div>) : <p className="text-sm text-muted">No active submissions in this period.</p>}</Card></div>
    <section className="space-y-3"><h2 className="text-2xl font-semibold">Latest active interests</h2><p className="text-sm text-muted">Up to 100 active records, across all dates. Contact details are for authorised GrantCare follow-up about the selected interest only.</p>
      {leads.length ? leads.map((lead) => <Card key={lead.id} className="space-y-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0 space-y-1"><h3 className="font-semibold">{interestLabel(lead.topic)}</h3><p className="break-all text-sm">{lead.contactValue}</p><p className="text-xs text-muted">{lead.contactChannel} · {lead.status} · {lead.createdAt.toISOString().slice(0, 10)}</p><p className="break-words text-xs text-muted">Source: {lead.sourcePath}</p></div><span className="text-xs text-muted">Expires {lead.expiresAt.toISOString().slice(0, 10)}</span></div><details className="text-sm"><summary className="cursor-pointer font-medium">Recorded permission</summary><p className="mt-2 leading-6 text-muted">{lead.consentText}</p><p className="mt-2 text-xs text-muted">{lead.consentVersion} · {lead.consentedAt.toISOString()}</p></details>
        <form action={updateInterestStatusAction} className="space-y-3 border-t border-border pt-4"><input type="hidden" name="id" value={lead.id} /><input type="hidden" name="locale" value={locale} /><label className="block space-y-2"><span className="text-xs font-semibold">Update record</span><Select name="status" defaultValue="contacted"><option value="contacted">Contacted about this interest</option><option value="confirmed">Person confirmed this interest</option><option value="withdrawn">Withdraw and remove contact detail</option></Select></label><label className="flex items-start gap-3 text-xs leading-6 text-muted"><input type="checkbox" name="confirmation" required className="mt-1 h-4 w-4" /><span>I have evidence for this change. For confirmed interest, the person has responded and confirmed their request. This does not authorise sharing their details.</span></label><button type="submit" className="focus-ring tap-target rounded-full border border-border px-4 text-sm font-semibold">Save status</button></form>
      </Card>) : <Card>No interest records yet. Real submissions will appear here.</Card>}
    </section>
  </div>;
}
