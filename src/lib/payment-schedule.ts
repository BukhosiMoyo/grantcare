import type { PublicPaymentEntry } from "./fallback-content";
import type { Locale } from "./site";

// Checked 26 November 2026. November's later announcement supersedes the annual table.
// Never derive a future payday from weekday patterns.
export const PAYMENT_SCHEDULE_REVIEWED_ON = "2026-11-26";
export const PAYMENT_DATE_SOURCES = {
  current: {label: "DSD: 2026/2027 payment schedule", href: "https://www.dsd.gov.za/index.php/21-latest-news/680-sassa-confirms-2026-2027-social-grant-payment-schedule-and-increases"},
  novemberRevision: {label: "SAnews: revised November 2026 dates, 29 October 2026", href: "https://www.sanews.gov.za/south-africa/sassa-revises-november-grant-payment-dates-ahead-elections-0"},
  archive: {label: "SASSA: official announcement archive", href: "https://sassa.gov.za/newsroom/media-statements"},
  archiveCopy: {label: "2025/2026 archived schedule cross-check", href: "https://www.skillsportal.co.za/news/sassa-grant-payment-dates-20252026-released"},
} as const;

export const REVIEWED_PAYMENT_SCHEDULE: Record<
  string,
  { olderPersons: string; disability: string; children: string }
> = {
  "2025-04": { olderPersons: "2025-04-02", disability: "2025-04-03", children: "2025-04-04" },
  "2025-05": { olderPersons: "2025-05-06", disability: "2025-05-07", children: "2025-05-08" },
  "2025-06": { olderPersons: "2025-06-03", disability: "2025-06-04", children: "2025-06-05" },
  "2025-07": { olderPersons: "2025-07-02", disability: "2025-07-03", children: "2025-07-04" },
  "2025-08": { olderPersons: "2025-08-05", disability: "2025-08-06", children: "2025-08-07" },
  "2025-09": { olderPersons: "2025-09-02", disability: "2025-09-03", children: "2025-09-04" },
  "2025-10": { olderPersons: "2025-10-02", disability: "2025-10-03", children: "2025-10-06" },
  "2025-11": { olderPersons: "2025-11-04", disability: "2025-11-05", children: "2025-11-06" },
  "2025-12": { olderPersons: "2025-12-02", disability: "2025-12-03", children: "2025-12-04" },
  "2026-01": { olderPersons: "2026-01-06", disability: "2026-01-07", children: "2026-01-08" },
  "2026-02": { olderPersons: "2026-02-03", disability: "2026-02-04", children: "2026-02-05" },
  "2026-03": { olderPersons: "2026-03-03", disability: "2026-03-04", children: "2026-03-05" },
  "2026-04": { olderPersons: "2026-04-02", disability: "2026-04-07", children: "2026-04-08" },
  "2026-05": { olderPersons: "2026-05-05", disability: "2026-05-06", children: "2026-05-07" },
  "2026-06": { olderPersons: "2026-06-02", disability: "2026-06-03", children: "2026-06-04" },
  "2026-07": { olderPersons: "2026-07-02", disability: "2026-07-03", children: "2026-07-06" },
  "2026-08": { olderPersons: "2026-08-04", disability: "2026-08-05", children: "2026-08-06" },
  "2026-09": { olderPersons: "2026-09-02", disability: "2026-09-03", children: "2026-09-04" },
  "2026-10": { olderPersons: "2026-10-02", disability: "2026-10-05", children: "2026-10-06" },
  "2026-11": { olderPersons: "2026-10-30", disability: "2026-11-02", children: "2026-11-03" },
  "2026-12": { olderPersons: "2026-12-02", disability: "2026-12-03", children: "2026-12-04" },
  "2027-01": { olderPersons: "2027-01-05", disability: "2027-01-06", children: "2027-01-07" },
  "2027-02": { olderPersons: "2027-02-02", disability: "2027-02-03", children: "2027-02-04" },
  "2027-03": { olderPersons: "2027-03-02", disability: "2027-03-03", children: "2027-03-04" },
};


export function getReviewedPaymentSchedule(year: number, month: number) {
  return REVIEWED_PAYMENT_SCHEDULE[`${year}-${String(month).padStart(2, "0")}`] ?? null;
}

export function getPaymentDateSources(year: number, month: number) {
  if (!getReviewedPaymentSchedule(year, month)) return [];
  if (year === 2026 && month === 11) return [PAYMENT_DATE_SOURCES.novemberRevision, PAYMENT_DATE_SOURCES.current];
  if (year < 2026 || (year === 2026 && month <= 3)) return [PAYMENT_DATE_SOURCES.archive, PAYMENT_DATE_SOURCES.archiveCopy];
  return [PAYMENT_DATE_SOURCES.current];
}

const NOTES = {
  en: {current: "Published 2026/2027 financial-year schedule.", archive: "Archived 2025/2026 financial-year schedule.", revised: "Revised November 2026 payment cycle: older persons paid from 30 October; disability from 2 November; children from 3 November. Separate review-group arrangements were announced for 5 November, subject to eligibility.", unknown: "No confirmed date in our reviewed sources. Check SASSA for a published update.", srd: "SRD payment dates are individual. Check your own official SRD status result."},
  zu: {current: "Uhlelo olushicilelwe lonyaka wezimali ka-2026/2027.", archive: "Uhlelo olugciniwe lonyaka wezimali ka-2025/2026.", revised: "Uhlelo lukaNovemba 2026 lubuyekeziwe: abadala kusukela mhla ka-30 Okthoba; ukukhubazeka mhla ka-2 Novemba; izingane mhla ka-3 Novemba. Uhlelo oluhlukile lwababuyekezwayo lwamenyezelwa lomhla ka-5 Novemba, kuye ngokufaneleka.", unknown: "Alukho usuku oluqinisekisiwe emithonjeni esiyibuyekezile. Hlola izibuyekezo ezishicilelwe ze-SASSA.", srd: "Izinsuku zokukhokha ze-SRD ziqondene nomuntu ngamunye. Hlola umphumela wakho osemthethweni we-SRD."},
  xh: {current: "Ishedyuli epapashiweyo yonyaka-mali ka-2026/2027.", archive: "Ishedyuli egciniweyo yonyaka-mali ka-2025/2026.", revised: "Ishedyuli kaNovemba 2026 ihlaziyiwe: abadala ukusuka nge-30 Okthobha; ukukhubazeka nge-2 Novemba; abantwana nge-3 Novemba. Amalungiselelo ahlukeneyo eqela eliphononongwayo abhengezwa nge-5 Novemba, ngokuxhomekeke ekufanelekeni.", unknown: "Akukho mhla uqinisekisiweyo kwimithombo esiyiphononongileyo. Jonga uhlaziyo olupapashiweyo lwe-SASSA.", srd: "Imihla yentlawulo ye-SRD yeyomntu ngamnye. Jonga isiphumo sakho esisemthethweni se-SRD."},
  tn: {current: "Lenaneo le le phasaladitsweng la ngwaga wa ditšhelete wa 2026/2027.", archive: "Lenaneo le le bolokilweng la ngwaga wa ditšhelete wa 2025/2026.", revised: "Lenaneo la Ngwanatsele 2026 le fetotswe: bagodi go simolola ka 30 Diphalane; bogole ka 2 Ngwanatsele; bana ka 3 Ngwanatsele. Go itsisitswe dithulaganyo tse di farologaneng tsa ba ba sekasekiwang ka 5 Ngwanatsele, go ya ka tshwanelo.", unknown: "Ga go na letsatsi le le netefaditsweng mo metsweding e re e sekasekileng. Tlhola dintšhwafatso tse di phasaladitsweng tsa SASSA.", srd: "Malatsi a tefo ya SRD a farologana go ya ka motho. Tlhola dipholo tsa gago tsa semmuso tsa SRD."},
} as const;

/** Apply the same reviewed calendar to CMS records and bundled fallback data. */
export function reconcilePaymentEntry<T extends PublicPaymentEntry>(entry: T, year: number, month: number, locale: Locale): T {
  const notes = NOTES[locale as keyof typeof NOTES] ?? NOTES.en;
  if (entry.grantSlug === "social-relief") return {...entry, date: null, state: "portal-only", note: notes.srd};
  const field = ({"older-persons":"olderPersons", disability:"disability", children:"children"} as const)[entry.grantSlug as "older-persons" | "disability" | "children"];
  if (!field) return entry;
  const schedule = getReviewedPaymentSchedule(year, month);
  if (!schedule) return {...entry, date: null, state: "pending", note: notes.unknown};
  const note = year === 2026 && month === 11 ? notes.revised : year < 2026 || (year === 2026 && month <= 3) ? notes.archive : notes.current;
  return {...entry, date: schedule[field], state: "expected", note};
}
