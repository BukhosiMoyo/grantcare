"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState } from "react";

import { submitInterestAction, type InterestActionState } from "@/actions/interests";
import { SubmitButton } from "@/components/submit-button";
import { Input, Select } from "@/components/ui";
import { trackClientEvent } from "@/lib/analytics-client";
import { INTEREST_TOPICS, interestConsentText, type InterestTopic } from "@/lib/interest-schema";

export function InterestForm({ sourcePath }: { sourcePath: string }) {
  const [state, action] = useActionState(submitInterestAction, {} as InterestActionState);
  const [topic, setTopic] = useState<InterestTopic | "">("");
  const [channel, setChannel] = useState<"email" | "phone">("phone");
  const [consent, setConsent] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        trackClientEvent({ name: "interest.form_viewed", locale: "en", path: sourcePath });
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [sourcePath]);

  return (
    <div ref={root}>
      {state.success ? (
        <div role="status" className="space-y-4 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
          <h3 className="text-xl font-semibold">Thank you for telling us.</h3>
          <p className="text-base leading-7 text-muted">If this is a new request, we&apos;ve saved your interest. This is not an application or a promise of an offer. Your details have not been sent to a bank or partner.</p>
          {state.withdrawalCode ? (
            <div className="space-y-2">
              <label htmlFor={`${id}-receipt`} className="block text-sm font-semibold">Keep your withdrawal code</label>
              <textarea id={`${id}-receipt`} readOnly value={state.withdrawalCode} rows={2} className="w-full resize-none rounded-xl border border-border bg-white p-3 font-mono text-sm [overflow-wrap:anywhere]" />
              <p className="text-sm text-muted">Save this code to remove your contact details at any time. It is only shown here once.</p>
            </div>
          ) : null}
          <Link href="/interests/manage" className="focus-ring inline-flex min-h-11 items-center text-sm font-semibold text-primary underline">Withdraw an interest</Link>
          <p className="text-sm text-muted">Lost your code? Contact hello@symaxx.com to request removal.</p>
        </div>
      ) : (
        <form action={action} className="space-y-5">
          <input type="hidden" name="sourcePath" value={sourcePath} />
          <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
            <label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" maxLength={0} /></label>
          </div>
          <fieldset className="space-y-2" aria-describedby={state.fieldErrors?.topic ? `${id}-topic-error` : undefined}>
            <legend className="mb-2 text-base font-semibold">What interests you?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {INTEREST_TOPICS.map((item) => (
                <label key={item.value} className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-colors ${topic === item.value ? "border-primary/50 bg-primary/[0.05]" : "border-border bg-white"}`}>
                  <input className="mt-1 h-4 w-4 shrink-0 accent-primary" type="radio" name="topic" value={item.value} checked={topic === item.value} onChange={() => { setTopic(item.value); setConsent(false); }} required />
                  <span><span className="block text-sm font-semibold">{item.label}</span><span className="mt-1 block text-sm leading-5 text-muted">{item.detail}</span></span>
                </label>
              ))}
            </div>
            {state.fieldErrors?.topic ? <p id={`${id}-topic-error`} className="text-sm text-danger">{state.fieldErrors.topic}</p> : null}
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-2">
              <label htmlFor={`${id}-channel`} className="block text-sm font-semibold">How can GrantCare contact you?</label>
              <Select id={`${id}-channel`} name="contactChannel" value={channel} onChange={(event) => { setChannel(event.target.value as "email" | "phone"); setConsent(false); }}>
                <option value="phone">Phone / WhatsApp</option><option value="email">Email</option>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor={`${id}-contact`} className="block text-sm font-semibold">{channel === "phone" ? "South African phone number" : "Email address"}</label>
              <Input key={channel} id={`${id}-contact`} name="contactValue" type={channel === "phone" ? "tel" : "email"} inputMode={channel === "phone" ? "tel" : "email"} autoComplete={channel === "phone" ? "tel" : "email"} placeholder={channel === "phone" ? "082 123 4567" : "you@example.com"} maxLength={160} required aria-invalid={Boolean(state.fieldErrors?.contactValue)} aria-describedby={state.fieldErrors?.contactValue ? `${id}-contact-error` : undefined} />
              {state.fieldErrors?.contactValue ? <p id={`${id}-contact-error`} className="text-sm text-danger">{state.fieldErrors.contactValue}</p> : null}
            </div>
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-muted">
            <input className="mt-1 h-5 w-5 shrink-0 accent-primary" name="consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} disabled={!topic} required aria-invalid={Boolean(state.fieldErrors?.consent)} />
            <span>{topic ? interestConsentText(topic, channel) : "Choose an interest above to see exactly what you are agreeing to."}</span>
          </label>
          {state.error ? <p role="alert" className="rounded-xl border border-danger/20 p-3 text-sm text-danger">{state.error}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SubmitButton className="w-full sm:w-auto" pendingLabel="Saving your interest…">Register my interest</SubmitButton>
            <Link href="/interests#privacy" className="focus-ring inline-flex min-h-11 items-center justify-center text-sm font-medium text-primary underline">How we use your details</Link>
          </div>
        </form>
      )}
    </div>
  );
}
