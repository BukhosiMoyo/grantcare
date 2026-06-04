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
  failedGenerate: "Failed to generate templates",
  unauthorized: "Unauthorized",
  missingGenerationId: "Missing generationId",
  invalidPaid: "Invalid or already paid",
  internalError: "Internal Error",
  productName: "Premium Email Templates",
  productDescription: "AI-generated tailored email templates for job applications and outreach.",
  outputLanguageInstruction: "",
  typeLabels: {
    "application": "Job Application",
    "cold-cv": "Send CV without a specific vacancy",
    "follow-up": "Follow up on a past application",
    "confirm-interview": "Confirm interview invite",
    "thank-you": "Thank you after interview",
    "internship": "Internship / Learnership Application",
  },
  experienceLabels: {
    "none": "No experience",
    "some": "Some experience",
    "experienced": "Experienced",
  },
  toneLabels: {
    "professional": "Professional (balanced, neutral)",
    "friendly": "Friendly professional (slightly warm)",
    "formal": "Formal (more structured)",
    "confident": "Confident (stronger closing, assertive language)",
  },
};

const ZULU_COPY: typeof ENGLISH_COPY = {
  apiMissing: "I-OpenAI API ayikho",
  failedGenerate: "Kuhlulekile ukwakha ama-template",
  unauthorized: "Awugunyaziwe",
  missingGenerationId: "I-generationId ayikho",
  invalidPaid: "Ayivumelekile noma isivele ikhokhelwe",
  internalError: "Iphutha Langaphakathi",
  productName: "Ama-email Templates Aphelele",
  productDescription: "Ama-email templates enziwe nge-AI ezicelo zomsebenzi nokuxhumana.",
  outputLanguageInstruction:
    "\nLanguage: Generate all user-facing output in isiZulu. Keep the JSON keys exactly as defined by the schema.",
  typeLabels: {
    "application": "Isicelo Somsebenzi",
    "cold-cv": "Thumela i-CV ngaphandle kwesikhala esithile",
    "follow-up": "Landela isicelo esedlule",
    "confirm-interview": "Qinisekisa isimemo senhlolokhono",
    "thank-you": "Bonga emva kwenhlolokhono",
    "internship": "Isicelo se-Internship / Learnership",
  },
  experienceLabels: {
    "none": "Anginalo ulwazi",
    "some": "Nginalo ulwazi oluthile",
    "experienced": "Nginolwazi",
  },
  toneLabels: {
    "professional": "Echwepheshile (elinganisile, engathathi hlangothi)",
    "friendly": "Enobungane kodwa echwepheshile (ifudumele kancane)",
    "formal": "Esemthethweni (ehleleke kakhulu)",
    "confident": "Ezethembayo (ukuvala okuqinile nolimi oluqinile)",
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

export function getEmailTemplateApiCopy(locale: Locale) {
  return locale === "zu"
    ? ZULU_COPY
    : locale === "tn"
      ? SETSWANA_COPY
      : locale === "xh"
        ? XHOSA_COPY
        : ENGLISH_COPY;
}
