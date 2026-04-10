"use client";

import Link from "next/link";
import { useActionState } from "react";

import { requestPasswordResetAction, type AuthActionState } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Field, Input, StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";

const INITIAL_STATE: AuthActionState = {};

export function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [state, formAction] = useActionState(requestPasswordResetAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <Field label={copy.emailLabel}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? (
          <p className="text-sm font-medium text-danger">{state.fieldErrors.email}</p>
        ) : null}
      </Field>
      {state.error ? <StatusMessage tone="error">{state.error}</StatusMessage> : null}
      {state.success ? <StatusMessage>{state.success}</StatusMessage> : null}
      {state.debugPath ? (
        <Link
          href={state.debugPath}
          className="focus-ring inline-flex h-11 items-center rounded-full border border-border bg-surface px-4 text-sm font-medium hover:bg-surface-muted"
        >
          {copy.resetPassword}
        </Link>
      ) : null}
      <SubmitButton className="w-full justify-center" pendingLabel={copy.sendingResetLink}>
        {copy.sendResetLink}
      </SubmitButton>
    </form>
  );
}
