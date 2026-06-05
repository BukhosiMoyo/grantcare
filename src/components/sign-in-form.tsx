"use client";

import Link from "next/link";
import { useActionState } from "react";

import { authenticateAction, type AuthActionState } from "@/actions/auth";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { SubmitButton } from "@/components/submit-button";
import { Field, Input, StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import { buildLocalePath } from "@/lib/site";
import type { Locale } from "@/lib/site";

const INITIAL_STATE: AuthActionState = {};

export function SignInForm({
  locale,
  nextPath,
  googleAuthEnabled,
}: {
  locale: Locale;
  nextPath?: string;
  googleAuthEnabled: boolean;
}) {
  const copy = getCopy(locale);
  const [state, formAction] = useActionState(authenticateAction, INITIAL_STATE);

  return (
    <div className="space-y-5">
      <GoogleSignInButton locale={locale} nextPath={nextPath} enabled={googleAuthEnabled} />
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span className="h-px flex-1 bg-border" />
        <span>Email</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath ?? ""} />
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
        <label className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-muted">{copy.passwordLabel}</span>
            <Link
              href={buildLocalePath(locale, "/forgot-password")}
              className="text-sm font-semibold text-primary"
            >
              {copy.forgotPassword}
            </Link>
          </div>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={Boolean(state.fieldErrors?.password)}
          />
          {state.fieldErrors?.password ? (
            <p className="text-sm font-medium text-danger">{state.fieldErrors.password}</p>
          ) : null}
        </label>
        {state.error ? <StatusMessage tone="error">{state.error}</StatusMessage> : null}
        <SubmitButton className="w-full justify-center" pendingLabel={copy.signingIn}>
          {copy.signIn}
        </SubmitButton>
      </form>
      {!googleAuthEnabled ? (
        <p className="text-center text-sm text-muted">Google sign-in is not configured yet.</p>
      ) : null}
    </div>
  );
}
