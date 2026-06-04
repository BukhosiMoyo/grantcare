import type { Locale } from "@/lib/site";
import { toGeneratedSetswanaValue, toGeneratedXhosaValue } from "@/lib/generated-guide-translations";

const ENGLISH_COPY = {
  metadataTitle: "SASSA Appeal Letter Builder | Draft Your Grant Appeal",
  metadataDescription:
    "Create a formal appeal letter draft for a rejected SASSA SRD R370, Disability, or Child Support grant, then submit it yourself through the official appeal route.",
  builderMetadataTitle: "Build SASSA Appeal Letter",
  resultMetadataTitle: "Your SASSA Appeal Draft",
  eyebrow: "SASSA Independent Tribunal Appeals",
  heroTitle: "Was your SASSA grant rejected unfairly?",
  heroBody:
    "Stop struggling with what to say. Generate a formal, professional appeal letter draft in 60 seconds, then submit it yourself through the official appeal route.",
  cta: "Draft My Appeal Letter",
  rejectionTitle: "We help overturn common SRD rejections.",
  statusesTitle: "Did you get one of these statuses?",
  statusItems: [
    `"Alternative Income Source Identified"`,
    `"UIF Registered" (Even if you haven't worked in years)`,
    `"Identify Verification Failed"`,
    `"NSFAS Registered" (When you aren't a student)`,
  ],
  helpTitle: "How our letter helps you",
  helpBody:
    "The Tribunal requires a formal written defense. We give you exactly what they want to see.",
  helpItems: [
    "Properly addressed to the Independent Tribunal",
    "Includes your ID and Grant Type correctly",
    "Explains your financial situation formally",
    "Tells you exactly which affidavits/documents to attach",
  ],
  howItWorksTitle: "How it works",
  steps: [
    {
      step: "1",
      title: "Tell us the problem",
      desc: "Select your grant and the exact reason SASSA rejected you.",
    },
    {
      step: "2",
      title: "Explain your side",
      desc: "Briefly tell us why they are wrong. Don't worry about sounding fancy, we'll fix it.",
    },
    {
      step: "3",
      title: "Get your appeal draft",
      desc: "We generate a formal appeal letter draft you can review before submission.",
    },
  ],
  bottomTitle: "Don't wait 90 days.",
  bottomBody:
    "You only have a limited time to appeal a rejection. Let us help you prepare a strong defense today.",
  grantTypes: [
    { label: "SRD R370 Grant", value: "srd_r370" },
    { label: "Child Support Grant", value: "child_support" },
    { label: "Disability Grant", value: "disability" },
    { label: "Older Persons Grant", value: "older_persons" },
  ],
  rejectionReasons: [
    { label: "Alternative Income Source", value: "alternative_income" },
    { label: "UIF Registered", value: "uif_registered" },
    { label: "NSFAS Registered", value: "nsfas_registered" },
    { label: "Identity Verification Failed", value: "identity_failed" },
    { label: "Medical Assessment Failed", value: "medical_failed" },
    { label: "Other / Unsure", value: "other" },
  ],
  grantQuestion: "Which SASSA grant was rejected?",
  reasonQuestion: "Why did SASSA reject your application?",
  reasonSubtitle: "You can check your status on the SASSA portal to confirm.",
  defenseQuestion: "Why is this rejection incorrect?",
  defenseSubtitle:
    "Briefly explain the truth. We will structure it professionally for the Tribunal.",
  defensePlaceholder:
    "e.g. I have not received any income since 2021. The bank deposit was a gift from my sister...",
  continue: "Continue",
  identityQuestion: "Your Details for the Appeal",
  identitySubtitle: "Your information is used to generate your appeal draft.",
  fullName: "Full Name",
  fullNamePlaceholder: "e.g. Sipho Nkosi",
  idNumber: "ID Number",
  idNumberPlaceholder: "e.g. 9001015043081",
  loadingTitle: "Drafting appeal letter…",
  loadingMessages: [
    "Structuring format for the Independent Tribunal...",
    "Formalising your defense and circumstances...",
    "Generating list of required supporting affidavits...",
    "Preparing final document...",
  ],
  failedGenerate: "Failed to generate appeal letter",
  genericError: "Something went wrong. Please try again.",
  packEyebrow: "Your Appeal Pack",
  draftEyebrow: "Your Appeal Draft",
  appealTitlePrefix: "Appeal for",
  missingGeneration: "Generation missing or corrupted.",
  paidStatus: "Your appeal letter draft and required document checklist are ready.",
  previewStatus:
    "Your formal defense has been drafted according to ITSAA guidelines. Unlock it to submit your appeal today.",
  letterDraftTitle: "Appeal Letter Draft",
  requiredDocsTitle: "📎 Required Documents to Attach",
  warningsTitle: "⚠️ Critical Warnings",
  readyTitle: "You're ready to appeal.",
  readyBody:
    "Make sure you print and sign the letter before uploading it to the SASSA portal or delivering it to the DSD office.",
  draftAnother: "Draft Another Appeal",
  letterPreviewTitle: "Letter Preview",
  paywallTitle: "Unlock full appeal pack",
  paywallBody: "A strong, legal defense is the only way to overturn a rejected grant.",
  paywallBenefits: [
    "✔ Full formal appeal letter",
    "✔ Required document checklist",
    "✔ Critical SASSA timeline warnings",
    "✔ Copy & paste ready",
  ],
  unlock: "Unlock Now — R19",
  accountRequired: "You'll need a free account to save your letters",
  processing: "Processing…",
  checkoutFailed: "Checkout failed. Please try again.",
  reasonLabels: {
    "alternative_income": "Alternative Income",
    "uif_registered": "UIF Registration",
    "nsfas_registered": "NSFAS Registration",
    "identity_failed": "Failed Identity Verification",
    "medical_failed": "Medical Assessment",
    "other": "General Rejection",
  },
};

const ZULU_COPY: typeof ENGLISH_COPY = {
  metadataTitle: "Umakhi Wencwadi Yesikhalazo Kwa-SASSA | Bhala Isikhalazo Sakho",
  metadataDescription:
    "Yakha uhlaka lwencwadi yesikhalazo esemthethweni yesibonelelo se-SASSA esinqatshiwe, bese uyithumela ngokwakho ngomzila osemthethweni.",
  builderMetadataTitle: "Yakha Incwadi Yesikhalazo Kwa-SASSA",
  resultMetadataTitle: "Uhlaka Lwakho Lwesikhalazo Kwa-SASSA",
  eyebrow: "Izikhalazo Ze-SASSA Independent Tribunal",
  heroTitle: "Isibonelelo sakho se-SASSA senqatshwe ngokungafanele?",
  heroBody:
    "Yeka ukulwa nokuthi uthini. Yakha uhlaka lwencwadi yesikhalazo olusemthethweni noluchwepheshile ngemizuzwana engu-60, bese uyithumela ngokwakho ngomzila osemthethweni.",
  cta: "Bhala Incwadi Yami Yesikhalazo",
  rejectionTitle: "Sisiza ukuphikisa ukwenqatshwa okuvamile kwe-SRD.",
  statusesTitle: "Uthole esinye salezi zimo?",
  statusItems: [
    `"Alternative Income Source Identified"`,
    `"UIF Registered" (Ngisho ungasebenzanga iminyaka)`,
    `"Identify Verification Failed"`,
    `"NSFAS Registered" (Uma ungeyena umfundi)`,
  ],
  helpTitle: "Incwadi yethu ikusiza kanjani",
  helpBody:
    "I-Tribunal idinga ukuzivikela okubhaliwe okusemthethweni. Sikunikeza lokho abafuna ukukubona.",
  helpItems: [
    "Ibhekiswe kahle ku-Independent Tribunal",
    "Ifaka kahle i-ID yakho nohlobo lwesibonelelo",
    "Ichaza isimo sakho sezimali ngokusemthethweni",
    "Ikutshela ukuthi yimaphi ama-affidavit/imibhalo okufanele uyinamathisele",
  ],
  howItWorksTitle: "Isebenza kanjani",
  steps: [
    {
      step: "1",
      title: "Sitshele inkinga",
      desc: "Khetha isibonelelo sakho nesizathu esiqondile sokwenqatshwa yi-SASSA.",
    },
    {
      step: "2",
      title: "Chaza uhlangothi lwakho",
      desc: "Sitshele kafushane ukuthi kungani bengalungile. Ungakhathazeki ngokubhala ngobunono, sizokulungisa.",
    },
    {
      step: "3",
      title: "Thola uhlaka lwesikhalazo",
      desc: "Sakha uhlaka lwencwadi yesikhalazo ongayibuyekeza ngaphambi kokuyithumela.",
    },
  ],
  bottomTitle: "Ungalindi izinsuku ezingu-90.",
  bottomBody:
    "Unesikhathi esilinganiselwe sokufaka isikhalazo sokwenqatshwa. Masikusize ulungise ukuzivikela okuqinile namuhla.",
  grantTypes: [
    { label: "Isibonelelo se-SRD R370", value: "srd_r370" },
    { label: "Isibonelelo Sengane", value: "child_support" },
    { label: "Isibonelelo Sokukhubazeka", value: "disability" },
    { label: "Isibonelelo Sabadala", value: "older_persons" },
  ],
  rejectionReasons: [
    { label: "Umthombo Wemali Ongomunye", value: "alternative_income" },
    { label: "Ubhaliswe ku-UIF", value: "uif_registered" },
    { label: "Ubhaliswe ku-NSFAS", value: "nsfas_registered" },
    { label: "Ukuqinisekiswa Kobuwena Kwehlulekile", value: "identity_failed" },
    { label: "Ukuhlolwa Kwezempilo Kwehlulekile", value: "medical_failed" },
    { label: "Okunye / Angiqiniseki", value: "other" },
  ],
  grantQuestion: "Yisiphi isibonelelo se-SASSA esinqatshiwe?",
  reasonQuestion: "Kungani i-SASSA inqabe isicelo sakho?",
  reasonSubtitle: "Ungahlola isimo sakho ku-portal ye-SASSA ukuze uqinisekise.",
  defenseQuestion: "Kungani lokhu kwenqatshwa kungalungile?",
  defenseSubtitle:
    "Chaza iqiniso kafushane. Sizokuhlela ngobuchwepheshe ukuze kulungele i-Tribunal.",
  defensePlaceholder:
    "isb. Angikaze ngithole imali kusukela ngo-2021. Imali efakwe ebhange yayiyisipho sikadadewethu...",
  continue: "Qhubeka",
  identityQuestion: "Imininingwane Yakho Yesikhalazo",
  identitySubtitle: "Imininingwane yakho isetshenziswa ukwakha uhlaka lwesikhalazo sakho.",
  fullName: "Igama eligcwele",
  fullNamePlaceholder: "isb. Sipho Nkosi",
  idNumber: "Inombolo ye-ID",
  idNumberPlaceholder: "isb. 9001015043081",
  loadingTitle: "Kubhalwa incwadi yesikhalazo…",
  loadingMessages: [
    "Kuhlelwa ifomethi ye-Independent Tribunal...",
    "Kwenziwa ukuzivikela kwakho kube semthethweni...",
    "Kwakhiwa uhlu lwama-affidavit adingekayo...",
    "Kulungiswa umbhalo wokugcina...",
  ],
  failedGenerate: "Kuhlulekile ukwakha incwadi yesikhalazo",
  genericError: "Kukhona okungahambanga kahle. Sicela uzame futhi.",
  packEyebrow: "Iphakethe Lakho Lesikhalazo",
  draftEyebrow: "Uhlaka Lwesikhalazo Sakho",
  appealTitlePrefix: "Isikhalazo se",
  missingGeneration: "Umphumela awukho noma wonakele.",
  paidStatus: "Uhlaka lwencwadi yesikhalazo nohlu lwemibhalo edingekayo sekulungile.",
  previewStatus:
    "Ukuzivikela kwakho okusemthethweni kubhaliwe ngokweziqondiso ze-ITSAA. Kuvule ukuze uthumele isikhalazo sakho namuhla.",
  letterDraftTitle: "Uhlaka Lwencwadi Yesikhalazo",
  requiredDocsTitle: "📎 Imibhalo Okufanele Uyinamathisele",
  warningsTitle: "⚠️ Izexwayiso Ezibalulekile",
  readyTitle: "Usukulungele ukufaka isikhalazo.",
  readyBody:
    "Qiniseka ukuthi uyaphrinta futhi uyasayina incwadi ngaphambi kokuyilayisha ku-portal ye-SASSA noma ukuyisa ehhovisi le-DSD.",
  draftAnother: "Bhala Esinye Isikhalazo",
  letterPreviewTitle: "Ukubuka Incwadi",
  paywallTitle: "Vula iphakethe lesikhalazo eligcwele",
  paywallBody:
    "Ukuzivikela okuqinile nokusemthethweni kuyindlela yokuphikisa isibonelelo esinqatshiwe.",
  paywallBenefits: [
    "✔ Incwadi yesikhalazo egcwele esemthethweni",
    "✔ Uhlu lwemibhalo edingekayo",
    "✔ Izexwayiso zesikhathi ze-SASSA",
    "✔ Ilungele ukukopisha nokunamathisela",
  ],
  unlock: "Vula Manje — R19",
  accountRequired: "Kudingeka i-akhawunti yamahhala ukuze ulondoloze izincwadi zakho",
  processing: "Kuyacutshungulwa…",
  checkoutFailed: "Ukuya ekukhokheni kuhlulekile. Sicela uzame futhi.",
  reasonLabels: {
    "alternative_income": "Umthombo Wemali Ongomunye",
    "uif_registered": "Ukubhaliswa ku-UIF",
    "nsfas_registered": "Ukubhaliswa ku-NSFAS",
    "identity_failed": "Ukuqinisekiswa Kobuwena Kwehlulekile",
    "medical_failed": "Ukuhlolwa Kwezempilo",
    "other": "Ukwenqatshwa Okujwayelekile",
  },
};

export function getSassaAppealCopy(locale: Locale) {
  return locale === "zu"
    ? ZULU_COPY
    : locale === "tn"
      ? toGeneratedSetswanaValue(ENGLISH_COPY)
      : locale === "xh"
        ? toGeneratedXhosaValue(ENGLISH_COPY)
        : ENGLISH_COPY;
}
