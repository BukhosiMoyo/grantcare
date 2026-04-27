import Link from "next/link";

import type { PublicPaymentPeriod } from "@/lib/fallback-content";
import { buildLocalePath, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

/**
 * Full-year payment schedule table showing all 3 main grant categories across 12 months.
 * Modelled after competitor tables that rank well for "SASSA payment dates 2026" queries.
 * The current/upcoming month row is highlighted for quick scanning.
 */
export function HomepageYearSchedule({
  currentMonth,
  currentYear,
  locale,
  periods,
  title,
  description,
}: {
  currentMonth: number;
  currentYear: number;
  locale: Locale;
  periods: PublicPaymentPeriod[];
  title: string;
  description: string;
}) {
  const mainGrants = ["older-persons", "disability", "children"] as const;
  const grantHeaders = ["Older Persons", "Disability", "Children's"];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="max-w-3xl text-base leading-8 text-muted">{description}</p>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-border">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Month</th>
              {grantHeaders.map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {periods.map((period) => {
              const isCurrentRow =
                period.year === currentYear && period.month === currentMonth;

              return (
                <tr
                  key={`${period.year}-${period.month}`}
                  className={
                    isCurrentRow
                      ? "bg-primary/5 font-semibold"
                      : ""
                  }
                >
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={buildLocalePath(
                        locale,
                        `/payment-dates/${period.year}/${period.monthSlug}`,
                      )}
                      className="font-semibold text-foreground hover:text-primary"
                    >
                      {period.label}
                      {isCurrentRow ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          Current
                        </span>
                      ) : null}
                    </Link>
                  </td>
                  {mainGrants.map((grantSlug) => {
                    const entry = period.grants[grantSlug];

                    if (!entry || !entry.date) {
                      return (
                        <td
                          key={grantSlug}
                          className="px-4 py-3 align-top text-sm text-muted"
                        >
                          {entry?.state === "pending"
                            ? "Not confirmed"
                            : "Date varies"}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={grantSlug}
                        className="px-4 py-3 align-top text-sm text-foreground"
                      >
                        <Link
                          href={buildLocalePath(
                            locale,
                            `/payment-dates/${period.year}/${period.monthSlug}/${grantSlug}`,
                          )}
                          className="hover:text-primary"
                        >
                          {formatDateLabel(entry.date)}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
