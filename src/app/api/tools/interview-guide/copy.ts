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
  failedGenerate: "Failed to generate guide",
  unauthorized: "Unauthorized",
  missingGenerationId: "Missing generationId",
  invalidPaid: "Invalid or already paid",
  internalError: "Internal Error",
  productName: "Premium Interview Guide",
  productDescription: "AI-generated tailored interview questions and best-practice answers.",
  outputLanguageInstruction: "",
  concernLabels: {
    "dont-know-what-to-say": "I don't know what to say",
    "get-nervous": "I get nervous",
    "no-experience": "I don't have experience",
    "unknown-questions": "I don't know what questions they'll ask",
  },
  experienceLabels: {
    "none": "No experience",
    "less-than-1": "Less than 1 year",
    "1-3": "1-3 years",
    "3-plus": "3+ years",
  },
};

const ZULU_COPY: typeof ENGLISH_COPY = {
  apiMissing: "I-OpenAI API ayikho",
  failedGenerate: "Kuhlulekile ukwakha umhlahlandlela",
  unauthorized: "Awugunyaziwe",
  missingGenerationId: "I-generationId ayikho",
  invalidPaid: "Ayivumelekile noma isivele ikhokhelwe",
  internalError: "Iphutha Langaphakathi",
  productName: "Umhlahlandlela Wenhlolokhono Ophelele",
  productDescription: "Imibuzo yenhlolokhono nezimpendulo ezenziwe nge-AI ezihambisana nawe.",
  outputLanguageInstruction:
    "\nLanguage: Generate all user-facing output in isiZulu. Keep the JSON keys exactly as defined by the schema.",
  concernLabels: {
    "dont-know-what-to-say": "Angazi ukuthi ngithini",
    "get-nervous": "Ngiba novalo",
    "no-experience": "Anginalo ulwazi",
    "unknown-questions": "Angazi ukuthi bazobuza miphi imibuzo",
  },
  experienceLabels: {
    "none": "Anginalo ulwazi",
    "less-than-1": "Ngaphansi konyaka owodwa",
    "1-3": "Iminyaka engu-1-3",
    "3-plus": "Iminyaka engu-3+",
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

export function getInterviewGuideApiCopy(locale: Locale) {
  return locale === "zu"
    ? ZULU_COPY
    : locale === "tn"
      ? SETSWANA_COPY
      : locale === "xh"
        ? XHOSA_COPY
        : ENGLISH_COPY;
}
