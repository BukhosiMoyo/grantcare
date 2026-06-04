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

const LOCAL_COPY: Partial<Record<Locale, {
  checkOfficialUpdate: string;
  howMuchYouGet: string;
  month: string;
  payDay: string;
  status: string;
}>> = {
  zu: {
    checkOfficialUpdate: "Hlola isibuyekezo esisemthethweni",
    howMuchYouGet: "Imali oyitholayo",
    month: "Inyanga",
    payDay: "Usuku lokukhokha",
    status: "Isimo",
  },
  tn: {
    checkOfficialUpdate: "Tlhola ntšhwafatso ya semmuso",
    howMuchYouGet: "Madi a o a bonang",
    month: "Kgwedi",
    payDay: "Letsatsi la tefo",
    status: "Maemo",
  },
  xh: {
    checkOfficialUpdate: "Jonga uhlaziyo olusemthethweni",
    howMuchYouGet: "Imali oyifumanayo",
    month: "Inyanga",
    payDay: "Umhla wokuhlawula",
    status: "Isimo",
  },
};

function getLocalCopy(locale: Locale) {
  return {
    checkOfficialUpdate: "Check official update",
    howMuchYouGet: "How much you get",
    month: "Month",
    payDay: "Pay day",
    status: "Status",
    ...(LOCAL_COPY[locale] ?? {}),
  };
}

function formatLocalizedDateLabel(date: string, locale: Locale) {
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
  const localCopy = getLocalCopy(locale);
  const amountDetails = getGrantAmountDetails(grantSlug, locale);

  return (
    <div id={anchorId} className="scroll-mt-24">
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="overflow-x-auto rounded-[1.5rem] border border-border">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-surface-muted text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{localCopy.month}</th>
                <th className="px-4 py-3 font-medium">{localCopy.payDay}</th>
                <th className="px-4 py-3 font-medium">{localCopy.status}</th>
                <th className="px-4 py-3 font-medium">{localCopy.howMuchYouGet}</th>
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
                        date: entry.date ? formatLocalizedDateLabel(entry.date, locale) : null,
                        grantSlug: entry.grantSlug,
                        locale,
                        month: period.month,
                        state: entry.state,
                        year: period.year,
                      })}
                    </td>
                    <td className="px-4 py-4 align-top text-base text-muted sm:text-lg">
                      {getPaymentSummaryStatusText(copy, entry.state)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {amountDetails ? (
                        <GrantAmountDisplay details={amountDetails} variant="table" />
                      ) : (
                        <p className="text-lg font-semibold text-primary">{localCopy.checkOfficialUpdate}</p>
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
