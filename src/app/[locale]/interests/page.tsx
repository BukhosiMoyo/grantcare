import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InterestCapture } from "@/components/interest-capture";
import { Card } from "@/components/ui";
import { isInterestCaptureEnabled } from "@/lib/interests";
import { isLocale } from "@/lib/site";

export const metadata: Metadata = { title: "Tell GrantCare what interests you", robots: { index: false, follow: true } };

export default async function InterestsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <div className="mx-auto w-full max-w-3xl space-y-6">
    <header className="space-y-3"><p className="text-xs font-semibold uppercase tracking-widest text-primary">GrantCare interests</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tell us what would be useful.</h1><p className="text-base leading-7 text-muted">Help shape the services and updates we explore. This form is currently available in English.</p></header>
    {isInterestCaptureEnabled() ? <InterestCapture sourcePath="/interests" /> : <Card><p>We&apos;re not taking requests just yet. Please check back later.</p></Card>}
    <section id="privacy" className="scroll-mt-24 space-y-3 rounded-2xl border border-border p-5">
      <h2 className="text-xl font-semibold">Your interest. Your choice.</h2>
      <p className="text-sm leading-7 text-muted">GrantCare, operated by Symaxx Digital, stores the contact detail you enter, your selected interest, the page you came from, and the wording and time of your permission. We use this to understand demand and contact you about your selected interest for up to 90 days.</p>
      <p className="text-sm leading-7 text-muted">We do not send these details to banks or other partners through this form. If a referral becomes available, we will identify the recipient and ask for separate permission. Interest does not mean you qualify for a product or that an offer is available.</p>
      <p className="text-sm leading-7 text-muted">Only authorised GrantCare administrators can access contact details. Reports for potential partners contain aggregate counts, not names or contact details. We delete expired interest records after 90 days. On withdrawal, we remove the contact detail immediately and retain a limited suppression and permission record until expiry.</p>
      <p className="text-sm leading-7 text-muted">Use your withdrawal code to stop contact, or email <a className="text-primary underline" href="mailto:hello@symaxx.com">hello@symaxx.com</a> to request access, correction or removal. We do not ask for ID numbers, bank details or grant documents here.</p>
      <div className="flex flex-wrap gap-4 text-sm"><Link href="/interests/manage" className="focus-ring inline-flex min-h-11 items-center text-primary underline">Withdraw an interest</Link><Link href="/privacy" className="focus-ring inline-flex min-h-11 items-center text-primary underline">Privacy policy</Link><a href="https://inforegulator.org.za/" className="focus-ring inline-flex min-h-11 items-center text-primary underline" rel="noreferrer" target="_blank">Information Regulator</a></div>
    </section>
  </div>;
}
