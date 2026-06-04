import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/site";
import { toGeneratedSetswanaValue, toGeneratedXhosaValue } from "@/lib/generated-guide-translations";

export function getRequestLocale(req: Request): Locale {
  const headerLocale = req.headers.get("x-grantcare-locale");

  if (isLocale(headerLocale)) {
    return headerLocale;
  }

  return DEFAULT_LOCALE;
}

const ENGLISH_COPY = {
  apiMissing: "OpenAI API missing",
  failedGenerate: "Failed to generate appeal",
  unauthorized: "Unauthorized",
  missingGenerationId: "Missing generationId",
  invalidPaid: "Invalid or already paid",
  internalError: "Internal Error",
  productName: "SASSA Appeal Letter",
  productDescription: "Formal appeal letter for SASSA Independent Tribunal.",
  outputLanguageInstruction: "",
  grantLabels: {
    "srd_r370": "SRD R370 Grant",
    "child_support": "Child Support Grant",
    "disability": "Disability Grant",
    "older_persons": "Older Persons Grant",
  },
  reasonLabels: {
    "alternative_income": "Alternative Income Source Identified",
    "uif_registered": "UIF Registered",
    "nsfas_registered": "NSFAS Registered",
    "identity_failed": "Identity Verification Failed",
    "medical_failed": "Medical Assessment Failed",
    "other": "Other / Unspecified",
  },
};

const ZULU_COPY: typeof ENGLISH_COPY = {
  apiMissing: "I-OpenAI API ayikho",
  failedGenerate: "Kuhlulekile ukwakha isikhalazo",
  unauthorized: "Awugunyaziwe",
  missingGenerationId: "I-generationId ayikho",
  invalidPaid: "Ayivumelekile noma isivele ikhokhelwe",
  internalError: "Iphutha Langaphakathi",
  productName: "Incwadi Yesikhalazo Kwa-SASSA",
  productDescription: "Incwadi yesikhalazo esemthethweni ye-SASSA Independent Tribunal.",
  outputLanguageInstruction:
    "\nLanguage: Generate all user-facing output in isiZulu. Keep the JSON keys exactly as defined by the schema.",
  grantLabels: {
    "srd_r370": "Isibonelelo se-SRD R370",
    "child_support": "Isibonelelo Sengane",
    "disability": "Isibonelelo Sokukhubazeka",
    "older_persons": "Isibonelelo Sabadala",
  },
  reasonLabels: {
    "alternative_income": "Kutholakale Umthombo Wemali Ongomunye",
    "uif_registered": "Ubhaliswe ku-UIF",
    "nsfas_registered": "Ubhaliswe ku-NSFAS",
    "identity_failed": "Ukuqinisekiswa Kobuwena Kwehlulekile",
    "medical_failed": "Ukuhlolwa Kwezempilo Kwehlulekile",
    "other": "Okunye / Akucacisiwe",
  },
};

const SETSWANA_COPY: typeof ENGLISH_COPY = {
  ...toGeneratedSetswanaValue(ENGLISH_COPY),
  outputLanguageInstruction:
    "\nLanguage: Generate all user-facing output in Setswana. Keep the JSON keys exactly as defined by the schema.",
};

const XHOSA_COPY: typeof ENGLISH_COPY = {
  ...toGeneratedXhosaValue(ENGLISH_COPY),
  outputLanguageInstruction:
    "\nLanguage: Generate all user-facing output in isiXhosa. Keep the JSON keys exactly as defined by the schema.",
};

export function getSassaAppealApiCopy(locale: Locale) {
  return locale === "zu"
    ? ZULU_COPY
    : locale === "tn"
      ? SETSWANA_COPY
      : locale === "xh"
        ? XHOSA_COPY
        : ENGLISH_COPY;
}
