import Link from "next/link";

import { GrantAmountDisplay } from "@/components/grant-amount-display";
import {
  getPaymentSummaryDayText,
  getPaymentSummaryStatusText,
} from "@/components/grant-summary-card";
import { getCopy } from "@/lib/copy";
import { getGrantAmountDetails, PAYMENT_SCHEDULE_SOURCE } from "@/lib/official-resources";
import { buildLocalePath, type Locale } from "@/lib/site";

type PaymentScheduleEntry = {
  date: string | null;
  grantName: string;
  grantSlug: string;
  state: "expected" | "pending" | "portal-only";
};

const LOCAL_COPY: Partial<Record<Locale, {
  checkOfficialUpdate: string;
  grant: string;
  howMuchYouGet: string;
  officialScheduleSource: string;
  openMonth: string;
  payDay: string;
  status: string;
}>> = {
  zu: {
    checkOfficialUpdate: "Hlola isibuyekezo esisemthethweni",
    grant: "Isibonelelo",
    howMuchYouGet: "Imali oyitholayo",
    officialScheduleSource: "Umthombo wohlelo olusemthethweni",
    openMonth: "Vula inyanga",
    payDay: "Usuku lokukhokha",
    status: "Isimo",
  },
  tn: {
    checkOfficialUpdate: "Tlhola ntšhwafatso ya semmuso",
    grant: "Thuso",
    howMuchYouGet: "Madi a o a bonang",
    officialScheduleSource: "Motswedi wa lenaneo la semmuso",
    openMonth: "Bula kgwedi",
    payDay: "Letsatsi la tefo",
    status: "Maemo",
  },
  xh: {
    checkOfficialUpdate: "Jonga uhlaziyo olusemthethweni",
    grant: "Isibonelelo",
    howMuchYouGet: "Imali oyifumanayo",
    officialScheduleSource: "Umthombo weshedyuli esemthethweni",
    openMonth: "Vula inyanga",
    payDay: "Umhla wokuhlawula",
    status: "Isimo",
  },
};

function getLocalCopy(locale: Locale) {
  return {
    checkOfficialUpdate: "Check official update",
    grant: "Grant",
    howMuchYouGet: "How much you get",
    officialScheduleSource: "Official schedule source",
    openMonth: "Open month",
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

export function PaymentScheduleTable({
  entries,
  locale,
  month,
  monthLabel,
  monthPath,
  year,
}: {
  entries: PaymentScheduleEntry[];
  locale: Locale;
  month: number;
  monthLabel: string;
  monthPath: string;
  year: number;
}) {
  const copy = getCopy(locale);
  const localCopy = getLocalCopy(locale);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted sm:text-lg">{monthLabel}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href={PAYMENT_SCHEDULE_SOURCE.href} target="_blank" rel="noreferrer" className="font-semibold text-primary">
            {localCopy.officialScheduleSource}
          </a>
          <Link href={buildLocalePath(locale, monthPath)} className="font-semibold text-primary">
            {localCopy.openMonth}
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-border">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{localCopy.grant}</th>
              <th className="px-4 py-3 font-medium">{localCopy.payDay}</th>
              <th className="px-4 py-3 font-medium">{localCopy.status}</th>
              <th className="px-4 py-3 font-medium">{localCopy.howMuchYouGet}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {entries.map((entry) => {
              const amountDetails = getGrantAmountDetails(entry.grantSlug, locale);

              return (
                <tr key={entry.grantSlug}>
                  <td className="px-4 py-4 align-top text-base font-semibold text-foreground sm:text-lg">
                    <Link href={buildLocalePath(locale, `${monthPath}/${entry.grantSlug}`)} className="hover:text-primary">
                      {entry.grantName}
                    </Link>
                  </td>
                  <td className="px-4 py-4 align-top text-base font-semibold text-primary sm:text-lg">
                    {getPaymentSummaryDayText(copy, {
                      date: entry.date ? formatLocalizedDateLabel(entry.date, locale) : null,
                      grantSlug: entry.grantSlug,
                      locale,
                      month,
                      state: entry.state,
                      year,
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
    </div>
  );
}
