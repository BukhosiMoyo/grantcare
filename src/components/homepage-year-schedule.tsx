import Link from "next/link";

import type { PublicPaymentPeriod } from "@/lib/fallback-content";
import { buildLocalePath, type Locale } from "@/lib/site";

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
  const copy = {
    current: "Current",
    dateVaries: "Date varies",
    grantHeaders: ["Older Persons", "Disability", "Children's"],
    month: "Month",
    notConfirmed: "Not confirmed",
    ...(locale === "zu"
      ? {
          current: "Okwamanje",
          dateVaries: "Usuku luyahlukahluka",
          grantHeaders: ["Abadala", "Ukukhubazeka", "Ezingane"],
          month: "Inyanga",
          notConfirmed: "Akukakaqinisekiswa",
        }
      : locale === "tn"
        ? {
            current: "Ya jaanong",
            dateVaries: "Letsatsi le a farologana",
            grantHeaders: ["Bagodi", "Bogole", "Bana"],
            month: "Kgwedi",
            notConfirmed: "Ga e ise e netefadiwe",
          }
        : locale === "xh"
          ? {
              current: "Eyangoku",
              dateVaries: "Umhla uyahluka",
              grantHeaders: ["Abantu abadala", "Ukukhubazeka", "Abantwana"],
              month: "Inyanga",
              notConfirmed: "Akuqinisekiswanga",
            }
      : {}),
  };

  function formatLocalizedDateLabel(date: string) {
    if (locale === "xh") {
      const parsedDate = new Date(`${date}T00:00:00`);
      const weekdays = ["Cawa", "Mvulo", "Lwesibini", "Lwesithathu", "Lwesine", "Lwesihlanu", "Mgqibelo"];
      const months = [
        "Januwari",
        "Februwari",
        "Matshi",
        "Epreli",
        "Meyi",
        "Juni",
        "Julayi",
        "Agasti",
        "Septemba",
        "Oktobha",
        "Novemba",
        "Disemba",
      ];

      return `${weekdays[parsedDate.getDay()]}, ${parsedDate.getDate()} ${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
    }

    const dateLocale = locale === "zu" ? "zu-ZA" : locale === "tn" ? "tn-ZA" : "en-ZA";

    return new Intl.DateTimeFormat(dateLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  }

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
              <th className="px-4 py-3 font-medium">{copy.month}</th>
              {copy.grantHeaders.map((header) => (
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
                          {copy.current}
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
                            ? copy.notConfirmed
                            : copy.dateVaries}
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
                          {formatLocalizedDateLabel(entry.date)}
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
