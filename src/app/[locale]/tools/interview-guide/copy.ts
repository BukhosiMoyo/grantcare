import type { Locale } from "@/lib/site";
import { toGeneratedSetswanaValue, toGeneratedXhosaValue } from "@/lib/generated-guide-translations";

const ENGLISH_COPY = {
  metadataTitle: "Interview Questions and Answers Guide (South Africa)",
  metadataDescription:
    "Get personalized, AI-generated interview answers tailored to your job title and experience level. Build confidence and pass your interview.",
  builderMetadataTitle: "Build Interview Guide",
  resultMetadataTitle: "Your Interview Guide",
  eyebrow: "AI-Powered Interview Prep",
  heroTitle: "Pass your next interview with answers tailored to you.",
  heroBody:
    "Get a personalised interview guide based on your job, experience, and situation. Takes less than 60 seconds.",
  cta: "Start My Interview Guide",
  painTitle: "Stop guessing what they'll ask you.",
  withoutTitle: "Without this guide",
  withoutItems: [
    "Not sure what to say in interviews",
    "Feeling nervous and unprepared",
    "Don't have experience and don't know how to explain it",
    "Guessing what employers want to hear",
  ],
  withTitle: "With your custom guide",
  withItems: [
    "Confident, natural-sounding answers",
    "Clear structure using the STAR method",
    "Ready for any question they throw at you",
    "Knowing exactly what you bring to the table",
  ],
  howItWorksTitle: "How it works",
  steps: [
    {
      step: "1",
      title: "Tell us about the job",
      desc: "Your role, industry, and experience level — so we know exactly what you need.",
    },
    {
      step: "2",
      title: "Get your personalised guide",
      desc: "Our AI creates tailored questions, answers, and tips specific to your situation.",
    },
    {
      step: "3",
      title: "Walk into your interview prepared",
      desc: "Preview free questions, then unlock your full pack.",
    },
  ],
  trustTitle: "Built to help real people get real jobs.",
  trustBody: "Used by job seekers across South Africa to build confidence.",
  bottomTitle: "Ready to feel confident?",
  bottomBody:
    "One small investment to walk into your interview prepared. Less than the cost of transport to your interview — but could help you get the job.",
  industryOptions: [
    { label: "Retail", value: "Retail" },
    { label: "Customer Service", value: "Customer Service" },
    { label: "Government", value: "Government" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Other", value: "Other" },
  ],
  experienceOptions: [
    { label: "No experience", value: "none" },
    { label: "Less than 1 year", value: "less-than-1" },
    { label: "1–3 years", value: "1-3" },
    { label: "3+ years", value: "3-plus" },
  ],
  concernOptions: [
    { label: "I don\u2019t know what to say", value: "dont-know-what-to-say" },
    { label: "I get nervous", value: "get-nervous" },
    { label: "I don\u2019t have experience", value: "no-experience" },
    { label: "I don\u2019t know what questions they\u2019ll ask", value: "unknown-questions" },
  ],
  jobSuggestions: ["Retail Assistant", "Call Centre Agent", "Admin Clerk", "General Worker"],
  jobQuestion: "What job are you preparing for?",
  jobSubtitle: "Type below or pick a suggestion",
  jobPlaceholder: "e.g. Sales Assistant",
  continue: "Continue",
  industryQuestion: "Which industry is this job in?",
  experienceQuestion: "How much experience do you have?",
  concernQuestion: "What worries you most about interviews?",
  concernSubtitle: "This helps us personalise your answers",
  cvQuestion: "Want better, personalised answers?",
  cvSubtitle: "Upload your CV for more tailored responses",
  cvUploadComingSoon: "CV upload coming soon",
  generateButton: "Skip & Generate My Guide",
  failedGenerate: "Failed to generate guide",
  genericError: "Something went wrong. Please try again.",
  fullGuideEyebrow: "Your Full Guide",
  freePreviewEyebrow: "Free Preview",
  resultTitlePrefix: "Your personalised guide for:",
  resultTitle: "Your Personalised Interview Guide",
  missingGeneration: "Generation missing or corrupted.",
  paidStatus:
    "Your full guide is ready. Study these answers and walk into your interview with confidence.",
  previewStatusStart: "Here's a free preview —",
  previewStatusMiddle: "of",
  previewStatusEnd: "questions with short answers. Unlock the rest to fully prepare.",
  previewStatus: (freeCount: number, totalCount: number) =>
    `Here's a free preview — ${freeCount} of ${totalCount} questions with short answers. Unlock the rest to fully prepare.`,
  paidQuestionsTitle: "Interview Questions & Answers",
  previewQuestionsTitle: "Preview Questions",
  concernTipsTitle: "💡 Tips for Your Biggest Concern",
  mistakesTitle: "⚠️ Common Mistakes to Avoid",
  employerQuestionsTitle: "🎯 Questions to Ask the Interviewer",
  readyTitle: "You're ready!",
  readyBody:
    "Practice these answers out loud. The more you rehearse, the more confident you'll be. Good luck with your interview!",
  buildAnother: "Build Another Guide",
  paywallTitle: "You're almost ready.",
  paywallBody: "Unlock your full interview guide and go in confident.",
  paywallBenefits: [
    "✔ 10 tailored questions",
    "✔ Strong sample answers",
    "✔ What to say (step-by-step)",
    "✔ Questions to ask the employer",
    "✔ Mistakes to avoid",
  ],
  unlock: "Unlock Now — R49",
  accountRequired: "You'll need to sign in or create a free account",
  shortPreview: "Short Preview",
  sampleAnswer: "Sample Answer",
  fullAnswerAvailable: "Full answer available in the complete guide",
  processing: "Processing…",
  checkoutFailed: "Checkout failed. Please try again.",
};

const ZULU_COPY: typeof ENGLISH_COPY = {
  metadataTitle: "Umhlahlandlela Wemibuzo Nezimpendulo Zenhlolokhono (eNingizimu Afrika)",
  metadataDescription:
    "Thola izimpendulo zenhlolokhono ezenzelwe isikhundla sakho nezinga lakho lolwazi. Yakha ukuzethemba uphumelele inhlolokhono.",
  builderMetadataTitle: "Yakha Umhlahlandlela Wenhlolokhono",
  resultMetadataTitle: "Umhlahlandlela Wakho Wenhlolokhono",
  eyebrow: "Ukulungiselela Inhlolokhono Nge-AI",
  heroTitle: "Phumelela inhlolokhono elandelayo ngezimpendulo ezenzelwe wena.",
  heroBody:
    "Thola umhlahlandlela wenhlolokhono owenzelwe umsebenzi wakho, ulwazi lwakho, nesimo sakho. Kuthatha ngaphansi kwemizuzwana engu-60.",
  cta: "Qala Umhlahlandlela Wami",
  painTitle: "Yeka ukuqagela ukuthi bazokubuza ini.",
  withoutTitle: "Ngaphandle kwalo mhlahlandlela",
  withoutItems: [
    "Awunasiqiniseko sokuthi uthini enhlolokhonweni",
    "Uzizwa unovalo futhi ungakulungele",
    "Awunalo ulwazi futhi awazi ukuthi ukuchaza kanjani",
    "Uqagela ukuthi abaqashi bafuna ukuzwa ini",
  ],
  withTitle: "Ngomhlahlandlela wakho",
  withItems: [
    "Izimpendulo ezizwakala ngokuzethemba nangokwemvelo",
    "Isakhiwo esicacile usebenzisa indlela ye-STAR",
    "Ukulungela noma yimuphi umbuzo",
    "Ukwazi kahle ukuthi uletha ini emsebenzini",
  ],
  howItWorksTitle: "Isebenza kanjani",
  steps: [
    {
      step: "1",
      title: "Sitshele ngomsebenzi",
      desc: "Isikhundla, imboni, nezinga lakho lolwazi — ukuze sazi kahle okudingayo.",
    },
    {
      step: "2",
      title: "Thola umhlahlandlela wakho",
      desc: "I-AI yethu yakha imibuzo, izimpendulo, namathiphu ahambisana nesimo sakho.",
    },
    {
      step: "3",
      title: "Ngena enhlolokhonweni ulungile",
      desc: "Buka imibuzo yamahhala, bese uvula iphakethe eligcwele.",
    },
  ],
  trustTitle: "Yakhelwe ukusiza abantu bangempela bathole imisebenzi.",
  trustBody: "Isetshenziswa abafuna umsebenzi eNingizimu Afrika ukwakha ukuzethemba.",
  bottomTitle: "Usukulungele ukuzethemba?",
  bottomBody:
    "Utshalomali oluncane ukuze ungene enhlolokhonweni ulungile. Luncane kunemali yokugibela ukuya enhlolokhonweni — kodwa lungakusiza uthole umsebenzi.",
  industryOptions: [
    { label: "Ukuthengisa", value: "Retail" },
    { label: "Ukunakekela amakhasimende", value: "Customer Service" },
    { label: "Uhulumeni", value: "Government" },
    { label: "Ezempilo", value: "Healthcare" },
    { label: "Okunye", value: "Other" },
  ],
  experienceOptions: [
    { label: "Anginalo ulwazi", value: "none" },
    { label: "Ngaphansi konyaka owodwa", value: "less-than-1" },
    { label: "Iminyaka engu-1–3", value: "1-3" },
    { label: "Iminyaka engu-3+", value: "3-plus" },
  ],
  concernOptions: [
    { label: "Angazi ukuthi ngithini", value: "dont-know-what-to-say" },
    { label: "Ngiba novalo", value: "get-nervous" },
    { label: "Anginalo ulwazi", value: "no-experience" },
    { label: "Angazi ukuthi bazobuza miphi imibuzo", value: "unknown-questions" },
  ],
  jobSuggestions: ["Retail Assistant", "Call Centre Agent", "Admin Clerk", "General Worker"],
  jobQuestion: "Yimuphi umsebenzi owulungiselelayo?",
  jobSubtitle: "Bhala ngezansi noma ukhethe isiphakamiso",
  jobPlaceholder: "isb. Sales Assistant",
  continue: "Qhubeka",
  industryQuestion: "Lo msebenzi ukweyiphi imboni?",
  experienceQuestion: "Unolwazi olungakanani?",
  concernQuestion: "Yini ekukhathaza kakhulu ngenhlolokhono?",
  concernSubtitle: "Lokhu kusisiza senze izimpendulo zakho zihambisane nawe",
  cvQuestion: "Ufuna izimpendulo ezingcono ezenzelwe wena?",
  cvSubtitle: "Layisha i-CV yakho ukuze izimpendulo zihambisane kakhulu nawe",
  cvUploadComingSoon: "Ukulayisha i-CV kuyeza maduze",
  generateButton: "Yeqa & Yakha Umhlahlandlela Wami",
  failedGenerate: "Kuhlulekile ukwakha umhlahlandlela",
  genericError: "Kukhona okungahambanga kahle. Sicela uzame futhi.",
  fullGuideEyebrow: "Umhlahlandlela Ogcwele",
  freePreviewEyebrow: "Ukubuka Kwamahhala",
  resultTitlePrefix: "Umhlahlandlela wakho owenzelwe:",
  resultTitle: "Umhlahlandlela Wakho Wenhlolokhono",
  missingGeneration: "Umphumela awukho noma wonakele.",
  paidStatus:
    "Umhlahlandlela wakho ogcwele usulungile. Funda lezi zimpendulo ungene enhlolokhonweni ngokuzethemba.",
  previewStatusStart: "Nanku umbono wamahhala —",
  previewStatusMiddle: "ku-",
  previewStatusEnd:
    "imibuzo enezimpendulo ezimfishane. Vula okusele ukuze uzilungiselele ngokuphelele.",
  previewStatus: (freeCount: number, totalCount: number) =>
    `Nanku umbono wamahhala — imibuzo engu-${freeCount} kwe-${totalCount} enezimpendulo ezimfishane. Vula okusele ukuze uzilungiselele ngokuphelele.`,
  paidQuestionsTitle: "Imibuzo Nezimpendulo Zenhlolokhono",
  previewQuestionsTitle: "Imibuzo Yokubuka",
  concernTipsTitle: "💡 Amathiphu Ngokukukhathaza Kakhulu",
  mistakesTitle: "⚠️ Amaphutha Avamile Okufanele Uwagweme",
  employerQuestionsTitle: "🎯 Imibuzo Ongayibuza Umxoxi",
  readyTitle: "Usulungile!",
  readyBody:
    "Zijwayeze lezi zimpendulo uzisho ngokuzwakalayo. Uma uziphindaphinda kakhulu, uzozethemba kakhulu. Sikufisela inhlanhla enhlolokhonweni!",
  buildAnother: "Yakha Omunye Umhlahlandlela",
  paywallTitle: "Ususeduze nokulungela.",
  paywallBody: "Vula umhlahlandlela ogcwele wenhlolokhono ungene ngokuzethemba.",
  paywallBenefits: [
    "✔ Imibuzo engu-10 eyenzelwe wena",
    "✔ Izimpendulo eziyisibonelo eziqinile",
    "✔ Okufanele ukusho (ngesinyathelo ngesinyathelo)",
    "✔ Imibuzo ongayibuza umqashi",
    "✔ Amaphutha okufanele uwagweme",
  ],
  unlock: "Vula Manje — R49",
  accountRequired: "Kuzodingeka ungene ngemvume noma udale i-akhawunti yamahhala",
  shortPreview: "Umbono Omfishane",
  sampleAnswer: "Impendulo Eyisibonelo",
  fullAnswerAvailable: "Impendulo egcwele iyatholakala kumhlahlandlela ophelele",
  processing: "Kuyacutshungulwa…",
  checkoutFailed: "Ukuya ekukhokheni kuhlulekile. Sicela uzame futhi.",
};

export function getInterviewGuideCopy(locale: Locale) {
  return locale === "zu"
    ? ZULU_COPY
    : locale === "tn"
      ? toGeneratedSetswanaValue(ENGLISH_COPY)
      : locale === "xh"
        ? toGeneratedXhosaValue(ENGLISH_COPY)
        : ENGLISH_COPY;
}
