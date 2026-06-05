"use client";

import { useActionState } from "react";

import { registerAction, type AuthActionState } from "@/actions/auth";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { SubmitButton } from "@/components/submit-button";
import { Field, Input, StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";

const INITIAL_STATE: AuthActionState = {};

export function SignUpForm({
  locale,
  googleAuthEnabled,
}: {
  locale: Locale;
  googleAuthEnabled: boolean;
}) {
  const copy = getCopy(locale);
  const [state, formAction] = useActionState(registerAction, INITIAL_STATE);

  return (
    <div className="space-y-5">
      <GoogleSignInButton locale={locale} enabled={googleAuthEnabled} />
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span className="h-px flex-1 bg-border" />
        <span>Email</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="locale" value={locale} />
        <Field label={copy.nameLabel}>
          <Input
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
          {state.fieldErrors?.name ? (
            <p className="text-sm font-medium text-danger">{state.fieldErrors.name}</p>
          ) : null}
        </Field>
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
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.passwordLabel}>
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              aria-invalid={Boolean(state.fieldErrors?.password)}
            />
            {state.fieldErrors?.password ? (
              <p className="text-sm font-medium text-danger">{state.fieldErrors.password}</p>
            ) : null}
          </Field>
          <Field label={copy.confirmPasswordLabel}>
            <Input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
            />
            {state.fieldErrors?.confirmPassword ? (
              <p className="text-sm font-medium text-danger">{state.fieldErrors.confirmPassword}</p>
            ) : null}
          </Field>
        </div>
        {state.error ? <StatusMessage tone="error">{state.error}</StatusMessage> : null}
        <SubmitButton className="w-full justify-center" pendingLabel={copy.creatingAccount}>
          {copy.createAccount}
        </SubmitButton>
      </form>
      {!googleAuthEnabled ? (
        <p className="text-center text-sm text-muted">Google sign-in is not configured yet.</p>
      ) : null}
    </div>
  );
}
