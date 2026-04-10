"use client";

import Link from "next/link";
import { useActionState } from "react";

import { resetPasswordAction, type AuthActionState } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Field, Input, StatusMessage } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, type Locale } from "@/lib/site";

const INITIAL_STATE: AuthActionState = {};

export function ResetPasswordForm({
  locale,
  token,
}: {
  locale: Locale;
  token: string;
}) {
  const copy = getCopy(locale);
  const [state, formAction] = useActionState(resetPasswordAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="token" value={token} />
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
      {state.success ? (
        <StatusMessage>
          {state.success}{" "}
          <Link href={buildLocalePath(locale, "/sign-in")} className="font-semibold text-primary">
            {copy.signIn}
          </Link>
        </StatusMessage>
      ) : null}
      <SubmitButton className="w-full justify-center" pendingLabel={copy.resettingPassword}>
        {copy.resetPassword}
      </SubmitButton>
    </form>
  );
}
