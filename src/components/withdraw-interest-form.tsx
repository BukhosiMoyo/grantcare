"use client";

import { useActionState } from "react";
import { withdrawInterestAction, type InterestActionState } from "@/actions/interests";
import { Input } from "@/components/ui";
import { SubmitButton } from "@/components/submit-button";

export function WithdrawInterestForm() {
  const [state, action] = useActionState(withdrawInterestAction, {} as InterestActionState);
  if (state.success) return <p role="status" className="rounded-xl bg-primary/[0.05] p-4">If this code matched an interest, its contact details have been removed. No further contact should be made for that request.</p>;
  return <form action={action} className="space-y-4">
    <label className="block space-y-2"><span className="text-sm font-semibold">Withdrawal code</span><Input name="code" autoComplete="off" required minLength={48} maxLength={48} pattern="[a-f0-9]{48}" /></label>
    {state.error ? <p role="alert" className="text-sm text-danger">{state.error}</p> : null}
    <SubmitButton pendingLabel="Removing your details…">Withdraw my interest</SubmitButton>
  </form>;
}
