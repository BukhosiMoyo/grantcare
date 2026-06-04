import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

export type ClaimCheckerType =
  | "amount-claim"
  | "increase-update"
  | "payment-story"
  | "warning-message";

export type ClaimCheckerOption = {
  value: string;
  label: string;
};

export type ClaimCheckerResult = {
  title: string;
  summary: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export const CLAIM_CHECKER_TYPES: Array<{
  value: ClaimCheckerType;
  label: string;
}> = [
  { value: "amount-claim", label: "New grant or amount" },
  { value: "increase-update", label: "Increase update" },
  { value: "payment-story", label: "Payment or delay" },
  { value: "warning-message", label: "Warning or suspension" },
];

const CLAIM_CHECKER_TYPE_TRANSLATIONS: Partial<Record<Locale, Record<ClaimCheckerType, string>>> = {
  zu: {
    "amount-claim": "Isibonelelo noma imali entsha",
    "increase-update": "Isibuyekezo sokunyuka",
    "payment-story": "Inkokhelo noma ukubambezeleka",
    "warning-message": "Isexwayiso noma ukumiswa",
  },
};

const CLAIM_CHECKER_OPTIONS: Record<ClaimCheckerType, ClaimCheckerOption[]> = {
  "amount-claim": [
    { value: "r700", label: "R700 grant" },
    { value: "youth", label: "Youth grant" },
    { value: "r12500-youth", label: "R12500 youth grant" },
    { value: "r500", label: "R500 grant" },
    { value: "r530", label: "R530 grant" },
    { value: "r1500-grocery", label: "R1500 grocery grant" },
    { value: "r1370", label: "R1370 grant" },
    { value: "r1400", label: "R1400 grant" },
    { value: "r2090", label: "R2090 grant" },
    { value: "r2315", label: "R2315 grant" },
    { value: "r3070", label: "R3070 grant" },
    { value: "senior-bonus", label: "Senior grant bonus" },
  ],
  "increase-update": [
    { value: "social-grant", label: "Social grant increase" },
    { value: "srd", label: "SRD increase" },
    { value: "older-persons", label: "Older Persons increase" },
    { value: "disability", label: "Disability increase" },
    { value: "child-support", label: "Child Support increase" },
  ],
  "payment-story": [
    { value: "social-grant-dates", label: "Social grant dates" },
    { value: "capitec-delay", label: "Capitec delay" },
    { value: "double-payment", label: "Double payment" },
    { value: "r500-delay", label: "R500 delay story" },
    { value: "r350-id-date", label: "R370 date by ID number" },
    { value: "general-delay", label: "General payment delay" },
  ],
  "warning-message": [
    { value: "suspension", label: "Suspension warning" },
    { value: "deadline-kyc", label: "Deadline or KYC notice" },
    { value: "gold-card-deadline", label: "Gold card deadline" },
    { value: "beneficiary-update", label: "Beneficiary detail update" },
    { value: "website-contact", label: "Website or contact route" },
  ],
};

const CLAIM_CHECKER_OPTION_TRANSLATIONS: Partial<Record<Locale, Record<ClaimCheckerType, Record<string, string>>>> = {
  zu: {
    "amount-claim": {
      r700: "Isibonelelo sika-R700",
      youth: "Isibonelelo sentsha",
      "r12500-youth": "Isibonelelo sentsha sika-R12500",
      r500: "Isibonelelo sika-R500",
      r530: "Isibonelelo sika-R530",
      "r1500-grocery": "Isibonelelo sokudla sika-R1500",
      r1370: "Isibonelelo sika-R1370",
      r1400: "Isibonelelo sika-R1400",
      r2090: "Isibonelelo sika-R2090",
      r2315: "Isibonelelo sika-R2315",
      r3070: "Isibonelelo sika-R3070",
      "senior-bonus": "Ibhonasi yesibonelelo sabadala",
    },
    "increase-update": {
      "social-grant": "Ukwenyuka kwesibonelelo somphakathi",
      srd: "Ukwenyuka kwe-SRD",
      "older-persons": "Ukwenyuka kwesibonelelo sabadala",
      disability: "Ukwenyuka kwesibonelelo sokukhubazeka",
      "child-support": "Ukwenyuka kwesibonelelo sokondla ingane",
    },
    "payment-story": {
      "social-grant-dates": "Izinsuku zezibonelelo zomphakathi",
      "capitec-delay": "Ukubambezeleka kwe-Capitec",
      "double-payment": "Inkokhelo ephindwe kabili",
      "r500-delay": "Indaba yokubambezeleka kuka-R500",
      "r350-id-date": "Usuku luka-R370 ngenombolo ye-ID",
      "general-delay": "Ukubambezeleka kwenkokhelo okuvamile",
    },
    "warning-message": {
      suspension: "Isexwayiso sokumiswa",
      "deadline-kyc": "Isaziso somnqamulajuqu noma se-KYC",
      "gold-card-deadline": "Umnqamulajuqu wekhadi legolide",
      "beneficiary-update": "Ukubuyekezwa kwemininingwane yomhlomuli",
      "website-contact": "Iwebhusayithi noma indlela yokuxhumana",
    },
  },
};

const CLAIM_CHECKER_RESULTS: Record<string, ClaimCheckerResult> = {
  "amount-claim:r700": {
    title: "R700 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts before you trust it.",
    primaryHref: "/guides/is-the-r700-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:youth": {
    title: "Youth grant claim",
    summary: "Open the youth-grant myth page first, then compare the claim with real grant categories.",
    primaryHref: "/guides/is-the-youth-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/eligibility-checker",
    secondaryLabel: "Eligibility checker",
  },
  "payment-story:r350-id-date": {
    title: "R370 date by ID number",
    summary: "Open the myth guide first, then compare the claim with the payment-date hub.",
    primaryHref: "/guides/sassa-r350-grant-payment-date-according-to-id-number",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  // Additional entries omitted for brevity – they retain their original structure.
};

const CLAIM_CHECKER_RESULT_TRANSLATIONS: Partial<Record<Locale, Record<string, Partial<ClaimCheckerResult>>>> = {
  zu: {
    "amount-claim:r700": {
      title: "Isimangalo sesibonelelo sika-R700",
      summary:
        "Vula umhlahlandlela oqondile wokuchitha inkolelo, bese uqhathanisa isimangalo nemali yezibonelelo yamanje ngaphambi kokusithemba.",
      primaryLabel: "Vula umhlahlandlela",
      secondaryLabel: "Imali yezibonelelo",
    },
    "amount-claim:youth": {
      title: "Isimangalo sesibonelelo sentsha",
      summary:
        "Vula ikhasi lenganekwane yesibonelelo sentsha kuqala, bese uqhathanisa isimangalo nezigaba zangempela zezibonelelo.",
      primaryLabel: "Vula umhlahlandlela",
      secondaryLabel: "Isihloli sokufaneleka",
    },
    "payment-story:r350-id-date": {
      title: "Usuku luka-R370 ngenombolo ye-ID",
      summary:
        "Vula umhlahlandlela wenganekwane kuqala, bese uqhathanisa isimangalo nehabhu yezinsuku zokukhokha.",
      primaryLabel: "Vula umhlahlandlela",
      secondaryLabel: "Izinsuku zokukhokha",
    },
  },
};

export function getClaimCheckerTypes(locale: Locale = DEFAULT_LOCALE) {
  const translations = CLAIM_CHECKER_TYPE_TRANSLATIONS[locale];

  return CLAIM_CHECKER_TYPES.map((item) => ({
    ...item,
    label: translations?.[item.value] ?? item.label,
  }));
}

export function getClaimCheckerOptions(type: ClaimCheckerType, locale: Locale = DEFAULT_LOCALE) {
  const translations = CLAIM_CHECKER_OPTION_TRANSLATIONS[locale]?.[type] ?? {};

  return CLAIM_CHECKER_OPTIONS[type].map((item) => ({
    ...item,
    label: translations[item.value] ?? item.label,
  }));
}

export function getClaimCheckerResult(type: ClaimCheckerType, option: string, locale: Locale = DEFAULT_LOCALE) {
  const key = `${type}:${option}`;
  const result = CLAIM_CHECKER_RESULTS[key];

  if (!result) {
    return null;
  }

  return {
    ...result,
    ...(CLAIM_CHECKER_RESULT_TRANSLATIONS[locale]?.[key] ?? {}),
  };
}
