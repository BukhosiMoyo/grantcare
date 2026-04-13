import Link from "next/link";

import { getGrantAmountLabel, PAYMENT_SCHEDULE_SOURCE } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

type PaymentScheduleEntry = {
  date: string | null;
  grantName: string;
  grantSlug: string;
  state: "expected" | "pending" | "portal-only";
};

function getStateLabel(state: PaymentScheduleEntry["state"]) {
  if (state === "expected") {
    return "Expected";
  }

  if (state === "pending") {
    return "Pending";
  }

  return "Portal only";
}

export function PaymentScheduleTable({
  entries,
  locale,
  monthLabel,
  monthPath,
}: {
  entries: PaymentScheduleEntry[];
  locale: Locale;
  monthLabel: string;
  monthPath: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{monthLabel}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href={PAYMENT_SCHEDULE_SOURCE.href} target="_blank" rel="noreferrer" className="font-semibold text-primary">
            Official schedule source
          </a>
          <Link href={buildLocalePath(locale, monthPath)} className="font-semibold text-primary">
            Open month
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-border">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Grant</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Current amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {entries.map((entry) => (
              <tr key={entry.grantSlug}>
                <td className="px-4 py-3 font-semibold text-foreground">
                  <Link href={buildLocalePath(locale, `${monthPath}/${entry.grantSlug}`)} className="hover:text-primary">
                    {entry.grantName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">
                  {entry.date ? formatDateLabel(entry.date) : "Use official portal"}
                </td>
                <td className="px-4 py-3 text-muted">{getStateLabel(entry.state)}</td>
                <td className="px-4 py-3 font-semibold text-primary">
                  {getGrantAmountLabel(entry.grantSlug) ?? "Check official update"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
