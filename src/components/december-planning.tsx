import Link from "next/link";

import { DECEMBER_PLANNING_GUIDES } from "@/lib/december-planning-guides";

export function hasDecemberPlanning(locale: string, year: number, month: number) {
  return locale === "en" && year === 2026 && month === 12;
}

export function DecemberPaymentIntro() {
  return (
    <div className="space-y-4 rounded-2xl border border-primary/15 bg-surface-strong p-5 sm:p-6">
      <p className="max-w-3xl text-base leading-7 text-foreground">
        Start with your grant’s date and payment status below. Then plan for holiday costs and the essentials you’ll still need in January.
      </p>
      <nav aria-label="December page sections" className="flex flex-wrap gap-3">
        <a href="#december-schedule" className="focus-ring rounded-lg bg-primary px-4 py-3 text-base font-semibold !text-white">View payment details</a>
        <a href="#december-planning" className="focus-ring rounded-lg border border-primary/20 bg-white px-4 py-3 text-base font-semibold text-primary">Plan your December budget</a>
      </nav>
      <p className="max-w-3xl text-sm leading-6 text-muted">GrantCare is independent of SASSA. Read the status shown with each date; an SRD payment needs your individual official status check.</p>
    </div>
  );
}

const guideLabels = ["YOUR HOUSEHOLD BUDGET", "YOUR SHOPPING LIST", "YOUR JANUARY PLAN"];
const guideTitles = ["Make a December budget", "Compare before you buy", "Keep January in the plan"];

export function DecemberPlanning() {
  return (
    <section id="december-planning" aria-labelledby="december-planning-heading" className="overflow-hidden rounded-[1.5rem] border border-primary/15 bg-surface">
      <div className="grid gap-6 bg-primary-strong p-6 text-white sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:p-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">December planning</p>
          <h2 id="december-planning-heading" className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A little planning for December. More breathing room for January.</h2>
          <p className="max-w-xl text-base leading-7 text-white/90">Once you’ve checked your payment details, use these practical guides to plan food, bills, holiday costs and what comes next.</p>
        </div>
        <div className="self-center rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-6">
          <p className="text-lg font-semibold">Before the holiday shop</p>
          <ul className="mt-3 space-y-3 text-base leading-7 text-white/90">
            <li>Account for food, bills and transport.</li>
            <li>Check the full cost of a special.</li>
            <li>List essentials due before your next income.</li>
          </ul>
        </div>
      </div>
      <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-3">
        {DECEMBER_PLANNING_GUIDES.map((guide, index) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="focus-ring group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 hover:bg-surface-muted sm:p-6">
            <p className="text-sm font-semibold tracking-wide text-primary">{guideLabels[index]}</p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">{guideTitles[index]}</h3>
            <p className="mt-3 flex-1 text-base leading-7 text-muted">{guide.summary}</p>
            <span className="mt-5 text-base font-semibold text-primary underline decoration-primary/30 underline-offset-4">Read the guide</span>
          </Link>
        ))}
      </div>
      <p className="border-t border-border px-5 py-4 text-sm leading-6 text-muted sm:px-8">General household planning. No retailer prices, extra grant payments or individual payment dates are promised.</p>
    </section>
  );
}
