import Link from "next/link";

import { GrantAmountDisplay } from "@/components/grant-amount-display";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
} from "@/components/grant-summary-card";
import { Card } from "@/components/ui";
import type { PublicPaymentPeriod } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getGrantAmountDetails } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

export function PaymentYearTable({
  anchorId,
  grantSlug,
  locale,
  periods,
  title,
}: {
  anchorId: string;
  grantSlug: string;
  locale: Locale;
  periods: PublicPaymentPeriod[];
  title: string;
}) {
  const copy = getCopy(locale);
  const amountDetails = getGrantAmountDetails(grantSlug);

  return (
    <div id={anchorId} className="scroll-mt-24">
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="overflow-x-auto rounded-[1.5rem] border border-border">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-surface-muted text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Month</th>
                <th className="px-4 py-3 font-medium">Pay day</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">How much you get</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface">
              {periods.map((period) => {
                const entry = period.grants[grantSlug];

                if (!entry) {
                  return null;
                }

                return (
                  <tr key={`${period.year}-${period.month}-${grantSlug}`}>
                    <td className="px-4 py-4 align-top text-base font-semibold text-foreground sm:text-lg">
                      <Link
                        href={buildLocalePath(
                          locale,
                          `/payment-dates/${period.year}/${period.monthSlug}/${grantSlug}`,
                        )}
                        className="hover:text-primary"
                      >
                        {period.label}
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
      </Card>
    </div>
  );
}
