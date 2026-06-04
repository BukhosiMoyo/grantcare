import { GrantAmountDisplay } from "@/components/grant-amount-display";
import {
  GRANT_AMOUNT_SOURCE,
  getCurrentGrantAmountRows,
  getGrantAmountDetails,
} from "@/lib/official-resources";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

const LOCAL_COPY: Partial<Record<Locale, {
  checkOfficialUpdate: string;
  currentAmounts: string;
  grant: string;
  howMuchYouGet: string;
  officialAmountSource: string;
}>> = {
  zu: {
    checkOfficialUpdate: "Hlola isibuyekezo esisemthethweni",
    currentAmounts: "Imali esemthethweni yamanje esebenza kusukela ngo-April 2026.",
    grant: "Isibonelelo",
    howMuchYouGet: "Imali oyitholayo",
    officialAmountSource: "Umthombo wemali esemthethweni",
  },
  tn: {
    checkOfficialUpdate: "Tlhola ntšhwafatso ya semmuso",
    currentAmounts: "Madi a semmuso a gone jaanong a simolola ka Moranang 2026.",
    grant: "Thuso",
    howMuchYouGet: "Madi a o a bonang",
    officialAmountSource: "Motswedi wa semmuso wa madi",
  },
  xh: {
    checkOfficialUpdate: "Jonga uhlaziyo olusemthethweni",
    currentAmounts: "Imali esemthethweni yangoku esebenza ukusukela ngo-Epreli 2026.",
    grant: "Isibonelelo",
    howMuchYouGet: "Imali oyifumanayo",
    officialAmountSource: "Umthombo wemali esemthethweni",
  },
};

function getLocalCopy(locale: Locale) {
  return {
    checkOfficialUpdate: "Check official update",
    currentAmounts: "Current official amounts effective April 2026.",
    grant: "Grant",
    howMuchYouGet: "How much you get",
    officialAmountSource: "Official amount source",
    ...(LOCAL_COPY[locale] ?? {}),
  };
}

export function GrantAmountTable({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  const copy = getLocalCopy(locale);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-muted sm:text-lg">{copy.currentAmounts}</p>
        <a href={GRANT_AMOUNT_SOURCE.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">
          {copy.officialAmountSource}
        </a>
      </div>

      <div className="overflow-x-auto rounded-[1.5rem] border border-border">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-surface-muted text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{copy.grant}</th>
              <th className="px-4 py-3 font-medium">{copy.howMuchYouGet}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {getCurrentGrantAmountRows(locale).map((row) => {
              const details = getGrantAmountDetails(row.slug, locale);

              return (
                <tr key={row.name}>
                  <td className="px-4 py-4 text-base font-semibold text-foreground sm:text-lg">
                    {row.name}
                  </td>
                  <td className="px-4 py-4">
                    {details ? (
                      <GrantAmountDisplay details={details} variant="table" />
                    ) : (
                      <p className="text-lg font-semibold text-primary">{copy.checkOfficialUpdate}</p>
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
