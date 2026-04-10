"use client";

import { useActionState } from "react";

import { registerAction, type AuthActionState } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Field, Input, StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";

const INITIAL_STATE: AuthActionState = {};

export function SignUpForm({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [state, formAction] = useActionState(registerAction, INITIAL_STATE);

  return (
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
  );
}
