"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import { type Locale, buildLocalePath } from "@/lib/site";

export function StatusPicker({
  locale,
  statuses,
  statusLabel,
  showLabel,
}: {
  locale: Locale;
  statuses: Array<{ slug: string; title: string }>;
  statusLabel: string;
  showLabel: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(statuses[0]?.slug ?? "");

  return (
    <div className="input-panel flex flex-col gap-4 sm:flex-row sm:items-end">
      <label className="flex-1 space-y-2">
        <span className="text-sm font-medium text-muted">{statusLabel}</span>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4"
        >
          {statuses.map((entry) => (
            <option key={entry.slug} value={entry.slug}>
              {entry.title}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        disabled={!status}
        onClick={() =>
          startTransition(() => {
            router.push(buildLocalePath(locale, `/status/${status}`));
          })
        }
        className="primary-action focus-ring tap-target rounded-xl bg-primary px-6 text-base font-bold text-white hover:bg-primary-strong disabled:opacity-60"
      >
        {showLabel}
      </button>
    </div>
  );
}
