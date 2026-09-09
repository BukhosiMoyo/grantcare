"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import { type Locale, buildLocalePath } from "@/lib/site";

type PaymentToolMonth = {
  year: number;
  monthSlug: string;
  label: string;
};

type PaymentToolGrant = {
  slug: string;
  name: string;
};

export function PaymentDateTool({
  locale,
  months,
  grants,
  defaultSelection,
  monthLabel,
  grantTypeLabel,
  openLabel,
}: {
  locale: Locale;
  months: PaymentToolMonth[];
  grants: PaymentToolGrant[];
  defaultSelection: {
    year: number;
    monthSlug: string;
    grantSlug: string;
  };
  monthLabel: string;
  grantTypeLabel: string;
  openLabel: string;
}) {
  const router = useRouter();
  const [year, setYear] = useState(String(defaultSelection.year));
  const [month, setMonth] = useState(defaultSelection.monthSlug);
  const [grant, setGrant] = useState(defaultSelection.grantSlug);

  return (
    <div className="input-panel grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
      <label className="space-y-2">
        <span className="text-sm font-medium text-muted">{monthLabel}</span>
        <select
          value={`${year}-${month}`}
          onChange={(event) => {
            const [nextYear, nextMonth] = event.target.value.split("-");
            setYear(nextYear);
            setMonth(nextMonth);
          }}
          className="focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4"
        >
          {months.map((entry) => (
            <option key={`${entry.year}-${entry.monthSlug}`} value={`${entry.year}-${entry.monthSlug}`}>
              {entry.label}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-muted">{grantTypeLabel}</span>
        <select
          value={grant}
          onChange={(event) => setGrant(event.target.value)}
          className="focus-ring tap-target w-full rounded-2xl border border-border bg-surface px-4"
        >
          {grants.map((entry) => (
            <option key={entry.slug} value={entry.slug}>
              {entry.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={() =>
          startTransition(() => {
            router.push(buildLocalePath(locale, `/payment-dates/${year}/${month}/${grant}`));
          })
        }
        className="primary-action focus-ring tap-target rounded-xl bg-primary px-6 text-base font-bold text-white hover:bg-primary-strong"
      >
        {openLabel}
      </button>
    </div>
  );
}
