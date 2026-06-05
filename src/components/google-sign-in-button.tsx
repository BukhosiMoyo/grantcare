"use client";

import { googleSignInAction } from "@/actions/auth";
import { GoogleIcon } from "@/components/icons";
import type { Locale } from "@/lib/site";

export function GoogleSignInButton({
  locale,
  nextPath,
  enabled,
}: {
  locale: Locale;
  nextPath?: string;
  enabled: boolean;
}) {
  return (
    <form action={googleSignInAction}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="next" value={nextPath ?? ""} />
      <button
        type="submit"
        disabled={!enabled}
        className="focus-ring tap-target inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-surface px-5 font-semibold text-foreground transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </button>
    </form>
  );
}

