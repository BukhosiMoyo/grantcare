import Link from "next/link";

import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { getPaymentSummaryDayText } from "@/components/grant-summary-card";
import { getCopy } from "@/lib/copy";
import type { PublicPaymentPeriod } from "@/lib/fallback-content";
import { PAYMENT_SCHEDULE_SOURCE } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";
import { formatDateLabel } from "@/lib/utils";

export function PaymentPreview({
  period,
  locale,
}: {
  period: PublicPaymentPeriod;
  locale: Locale;
}) {
  const copy = getCopy(locale);
  const periodPath = `/payment-dates/${period.year}/${period.monthSlug}`;
  const scheduled = period.entries.filter(
    (entry) => entry.grantSlug !== "social-relief",
  );
  const srd = period.entries.find(
    (entry) => entry.grantSlug === "social-relief",
  );

  return (
    <section
      className="payment-preview"
      aria-labelledby="payment-preview-title"
    >
      <div className="payment-preview-head">
        <div>
          <p className="eyebrow">{copy.summaryMonthLabel}</p>
          <h2 id="payment-preview-title">{period.label}</h2>
        </div>
        <span className="preview-calendar-icon">
          <CalendarIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="payment-preview-list">
        {scheduled.map((entry) => {
          const date = entry.date ? new Date(`${entry.date}T12:00:00Z`) : null;
          const dateText = getPaymentSummaryDayText(copy, {
            date: entry.date ? formatDateLabel(entry.date, locale) : null,
            state: entry.state,
          });
          return (
            <Link
              key={entry.grantSlug}
              href={buildLocalePath(locale, `${periodPath}/${entry.grantSlug}`)}
              className="payment-preview-row"
            >
              <span className="preview-day" aria-hidden="true">
                <strong>
                  {date ? String(date.getUTCDate()).padStart(2, "0") : "—"}
                </strong>
                <small>
                  {date
                    ? new Intl.DateTimeFormat(
                        locale === "en" ? "en-ZA" : locale,
                        { month: "short", timeZone: "UTC" },
                      ).format(date)
                    : ""}
                </small>
              </span>
              <span>
                <span className="preview-grant">{entry.grantName}</span>
                <span className="preview-date block">{dateText}</span>
              </span>
              <ChevronRightIcon
                className="h-4 w-4 text-[#c2e4b4]"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
      {srd ? (
        <Link
          href={buildLocalePath(locale, `${periodPath}/social-relief`)}
          className="preview-srd"
        >
          <span>
            <strong>{srd.grantName}</strong>
            {getPaymentSummaryDayText(copy, {
              date: srd.date ? formatDateLabel(srd.date, locale) : null,
              state: srd.state,
            })}
          </span>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
      <div className="preview-footer">
        <Link href={buildLocalePath(locale, periodPath)}>
          {copy.viewMonth}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <a href={PAYMENT_SCHEDULE_SOURCE.href} target="_blank" rel="noreferrer">
          {copy.officialLink} ↗
        </a>
      </div>
    </section>
  );
}
