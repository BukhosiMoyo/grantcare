import Link from "next/link";

import { GrantAmountDisplay } from "@/components/grant-amount-display";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
} from "@/components/grant-summary-card";
import { getCopy } from "@/lib/copy";
import { getGrantAmountDetails, PAYMENT_SCHEDULE_SOURCE } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

type PaymentScheduleEntry = {
  date: string | null;
  grantName: string;
  grantSlug: string;
  state: "expected" | "pending" | "portal-only";
};

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
  const copy = getCopy(locale);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted sm:text-lg">{monthLabel}</p>
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
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Grant</th>
              <th className="px-4 py-3 font-medium">Pay day</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">How much you get</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {entries.map((entry) => {
              const amountDetails = getGrantAmountDetails(entry.grantSlug);

              return (
                <tr key={entry.grantSlug}>
                  <td className="px-4 py-4 align-top text-base font-semibold text-foreground sm:text-lg">
                    <Link href={buildLocalePath(locale, `${monthPath}/${entry.grantSlug}`)} className="hover:text-primary">
                      {entry.grantName}
                    </Link>
                  </td>
                  <td className="px-4 py-4 align-top text-base font-semibold text-primary sm:text-lg">
                    {getPaymentSummaryDayText(copy, {
                      date: entry.date ? formatDateLabel(entry.date) : null,
                      state: entry.state,
                    })}
                  </td>
                  <td className="px-4 py-4 align-top text-base text-muted sm:text-lg">
                    {getPaymentSummaryStatusText(copy, entry.state)}
                  </td>
                  <td className="px-4 py-4 align-top">
                    {amountDetails ? (
                      <GrantAmountDisplay details={amountDetails} variant="table" />
                    ) : (
                      <p className="text-lg font-semibold text-primary">Check official update</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
