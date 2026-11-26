import { InterestForm } from "@/components/interest-form";
import { isInterestCaptureEnabled } from "@/lib/interests";

export function InterestInvitation() {
  if (!isInterestCaptureEnabled()) return null;
  return <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-muted p-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm leading-6 text-muted">Would account options, mobile offers or payment updates be useful to you?</p>
    <a href="#register-interest" className="focus-ring flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-surface px-4 text-sm font-semibold text-primary">Tell us your interests</a>
  </div>;
}

export function InterestCapture({ sourcePath }: { sourcePath: string }) {
  if (!isInterestCaptureEnabled()) return null;
  return (
    <section id="register-interest" aria-labelledby="interest-heading" className="scroll-mt-24 rounded-[1.5rem] border border-primary/15 bg-surface p-5 sm:p-7">
      <div className="mb-5 max-w-2xl space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Your choice</p>
        <h2 id="interest-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">What would you like help finding?</h2>
        <p className="text-base leading-7 text-muted">Tell GrantCare what interests you. We&apos;re exploring useful services and updates; there may not be an offer available yet.</p>
        <p className="text-sm leading-6 text-muted">This is optional and separate from SASSA. You never need to leave your details to read grant information.</p>
      </div>
      <InterestForm sourcePath={sourcePath} />
    </section>
  );
}
