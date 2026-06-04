import { addSetswanaTranslations } from "./generated-guide-translations";

const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

type GuideConfig = {
  slug: string;
  title: string;
  summary: string;
  quickAnswer: string;
  whatThisMeans: string;
  whyThisMatters: string;
  steps: string;
  keyFocusTitle?: string;
  keyFocus: string;
  important: string;
  help: string;
  relatedLinks: string[];
  faqs: Array<{ question: string; answer: string }>;
  sortOrder: number;
};

function formatRelatedLinks(links: string[]) {
  return `Useful next pages:\n${links.map((link) => `• ${link}`).join("\n")}`;
}

function guide({
  slug,
  title,
  summary,
  quickAnswer,
  whatThisMeans,
  whyThisMatters,
  steps,
  keyFocusTitle = "How to read the search well",
  keyFocus,
  important,
  help,
  relatedLinks,
  faqs,
  sortOrder,
}: GuideConfig) {
  return {
    slug,
    title,
    summary,
    sections: [
      section("Quick answer", quickAnswer),
      section("What this means", whatThisMeans),
      section("Why this matters", whyThisMatters),
      section("What you can do next", steps),
      section(keyFocusTitle, keyFocus),
      section("Important things to remember", important),
      section("How GrantCare can help", help),
      section("Related help", formatRelatedLinks(relatedLinks)),
      ...faqs.map((item) => faq(item.question, item.answer)),
    ],
    featured: false,
    sponsored: false,
    sortOrder,
  };
}

type StatusTimingVariant = {
  slug: string;
  title: string;
  searchAngle: string;
  statusSubject: string;
  timingFocus: string;
  caution: string;
  relatedLinks: string[];
  sortOrder: number;
};

function statusTimingGuide({
  slug,
  title,
  searchAngle,
  statusSubject,
  timingFocus,
  caution,
  relatedLinks,
  sortOrder,
}: StatusTimingVariant) {
  return guide({
    slug,
    title,
    summary:
      `A guide to ${title.toLowerCase()} searches, explaining how status results and payment-date pages work together without treating them as the same thing.`,
    quickAnswer:
      `${searchAngle} The safer approach is to read the status result first and then use ${timingFocus} for timing context. A status result does not automatically work like a final payment calendar.`,
    whatThisMeans:
      `${statusSubject} searches often blend two different questions into one line: what the current result says and when a payment may be ready. In practice, status pages explain case progress, while payment-date pages help users read month timing and payment states.`,
    whyThisMatters:
      `${caution} Confusion usually starts when one status message is treated like a full payment answer even though timing may still depend on the month page, a payment note, or official confirmation.`,
    steps:
      `1. Start with the correct status route for ${statusSubject.toLowerCase()}.\n2. Read the current result carefully instead of jumping straight to a date.\n3. If timing is what you need, open ${timingFocus}.\n4. Check whether the timing is published, expected, or portal-only.\n5. Use the relevant official route when final confirmation still depends on your own case.`,
    keyFocus:
      `The safest habit is to separate status reading from payment-date reading. They support each other, but they are not the same tool and should not be treated as if they answer the exact same question.`,
    important:
      "GrantCare is an independent information platform. It explains status and payment-date wording in plain language, but it is not the official status or payment system.",
    help:
      "GrantCare can help you move from a mixed search phrase into the right next page, whether that is a status explanation, a payment-date guide, or a reminder option.",
    relatedLinks,
    faqs: [
      {
        question: `Can a ${statusSubject.toLowerCase()} status result show a final payment date by itself?`,
        answer:
          "Not always. A status result may still need to be read together with the right month page or official route before timing is clear.",
      },
      {
        question: "Why do status and payment-date searches get mixed together so often?",
        answer:
          "Because users usually want one simple answer, even though case progress and payment timing are separate parts of the process.",
      },
      {
        question: "Should I still confirm timing officially?",
        answer:
          "Yes, especially when the wording still looks uncertain or your own case needs direct confirmation.",
      },
    ],
    sortOrder,
  });
}

type PaymentPhraseVariant = {
  slug: string;
  title: string;
  searchAngle: string;
  subjectLabel: string;
  timingFocus: string;
  caution: string;
  relatedLinks: string[];
  sortOrder: number;
  keyFocusTitle?: string;
  keyFocus?: string;
  steps?: string;
};

function paymentPhraseGuide({
  slug,
  title,
  searchAngle,
  subjectLabel,
  timingFocus,
  caution,
  relatedLinks,
  sortOrder,
  keyFocusTitle = "How to think about the wording",
  keyFocus,
  steps,
}: PaymentPhraseVariant) {
  return guide({
    slug,
    title,
    summary:
      `A guide to ${title.toLowerCase()} searches, written to help users read month-based timing more safely and avoid treating copied dates like final official answers.`,
    quickAnswer:
      `${searchAngle} The safest approach is to match the wording to ${timingFocus} and then check whether the timing is published, expected, or portal-only before you rely on it.`,
    whatThisMeans:
      `${subjectLabel} searches often sound like there should be one simple public date for everyone. In practice, month, year, grant wording, and official confirmation all matter, especially when people are copying dates from older posts.`,
    whyThisMatters:
      `${caution} That is why a guide page should slow the search down a little and help users confirm what kind of payment information they are actually looking at.`,
    steps:
      steps ??
      `1. Check what grant wording the search is pointing to.\n2. Match it to ${timingFocus}.\n3. Read the payment state and note, not only the visible date.\n4. Treat archive years as archive context rather than a live payment promise.\n5. Use official channels when you need final case-specific confirmation.`,
    keyFocusTitle,
    keyFocus:
      keyFocus ??
      "The safer habit is to read payment-date wording like a guide, not like a guarantee. A date on its own is not the full meaning of a payment page.",
    important:
      "GrantCare is independent and should not be mistaken for an official payment page. It helps explain wording and timing safely while leaving official actions to official channels.",
    help:
      "GrantCare can help you move from a broad payment-date search into the exact month, grant type, or status guide that makes the wording easier to understand.",
    relatedLinks,
    faqs: [
      {
        question: `Does ${subjectLabel.toLowerCase()} always point to one public date?`,
        answer:
          "No. The right answer can still depend on the month, the grant wording, and whether the timing is already officially confirmed.",
      },
      {
        question: "Why do copied payment-date posts cause so much confusion?",
        answer:
          "Because a date can look believable even when the month, year, or payment note is missing.",
      },
      {
        question: "What should I check before trusting a payment-date page?",
        answer:
          "Check the month, year, grant category, and payment state together before you treat the timing as final.",
      },
    ],
    sortOrder,
  });
}

type OldAgeVariant = {
  slug: string;
  title: string;
  searchAngle: string;
  timingFocus: string;
  caution: string;
  relatedLinks: string[];
  sortOrder: number;
};

function oldAgeGuide({
  slug,
  title,
  searchAngle,
  timingFocus,
  caution,
  relatedLinks,
  sortOrder,
}: OldAgeVariant) {
  return guide({
    slug,
    title,
    summary:
      `A guide to ${title.toLowerCase()} searches, explaining how old-age wording usually maps to the older persons grant and how to read payment timing more safely.`,
    quickAnswer:
      `${searchAngle} In most cases, the search is pointing to older persons grant timing, so the safest next step is to match the wording to ${timingFocus} and then read the payment note carefully.`,
    whatThisMeans:
      "Many users still search with old-age or pension wording even when newer pages use older persons grant wording. That does not usually mean a different grant. It usually means the same grant category is being described in more familiar words.",
    whyThisMatters:
      `${caution} Once the wording is matched properly, users can usually move from a broad old-age search into the correct month or archive page with much less confusion.`,
    steps:
      `1. Treat old-age or pension wording as a search for older persons grant timing.\n2. Open ${timingFocus}.\n3. Check the month, year, and payment state together.\n4. Read the note beside the date, not only the date itself.\n5. Use the official route when your case still needs final confirmation.`,
    keyFocusTitle: "Old-age wording and older persons wording usually meet at the same page",
    keyFocus:
      "The search wording can change from person to person, but the safest reading habit stays the same: confirm the grant category, then confirm the month, then confirm the payment state.",
    important:
      "GrantCare is an independent information platform. It helps translate old-age wording into the right grant-help path, but it is not an official grant payment service.",
    help:
      "GrantCare can help you move from familiar search wording into the right payment-date guide, grant page, or reminder option without making the page sound official.",
    relatedLinks,
    faqs: [
      {
        question: "Is old-age grant wording different from older persons grant wording?",
        answer:
          "People often use the words differently, but they usually mean the same grant category in search.",
      },
      {
        question: "Should I rely on old screenshots of old-age payment dates?",
        answer:
          "No. It is safer to treat old images as archive context and confirm the current month separately.",
      },
      {
        question: "Can GrantCare confirm my official payment date?",
        answer:
          "No. GrantCare explains the wording and timing, but official confirmation still belongs to the relevant government channel.",
      },
    ],
    sortOrder,
  });
}

const statusTimingVariants: StatusTimingVariant[] = [
  {
    slug: "sassa-status-check-for-r350-payment-dates",
    title: "SASSA status check for R350 payment dates",
    searchAngle:
      "A search for SASSA status check for R350 payment dates usually means someone wants both a current result and a timing answer at the same time.",
    statusSubject: "R350 support",
    timingFocus: "the current SRD or social-relief payment page",
    caution:
      "The risky part is assuming a status tool and a payment-date page are the same thing.",
    relatedLinks: [
      "/guides/how-to-use-sassa-status-check-for-r350",
      "/guides/how-to-read-r350-status-check-and-payment-pages-together",
      "/guides/payment-dates-2026",
      "/payment-dates",
    ],
    sortOrder: 354,
  },
  {
    slug: "sassa-status-check-for-r350-payment-date",
    title: "SASSA status check for R350 payment date",
    searchAngle:
      "A search for one R350 payment date often means the user hopes the status result will lead to one exact day straight away.",
    statusSubject: "R350 payment timing",
    timingFocus: "the matching month page for SRD-style support",
    caution:
      "One exact day can look simpler than the real situation, especially when timing is still month-based or portal-based.",
    relatedLinks: [
      "/guides/how-to-read-r350-payment-status-safely",
      "/guides/payment-processing-meaning",
      "/guides/how-to-know-if-your-payment-is-ready",
      "/payment-dates",
    ],
    sortOrder: 355,
  },
  {
    slug: "sassa-status-check-for-r350-payment-dates-2025",
    title: "SASSA status check for R350 payment dates for 2025",
    searchAngle:
      "This kind of search usually points to archive-year checking, not only current planning.",
    statusSubject: "R350 2025 archive timing",
    timingFocus: "the 2025 archive pages for social-relief timing",
    caution:
      "Without an archive lens, older payment screenshots can be mistaken for current schedules.",
    relatedLinks: [
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2025-to-2026",
      "/guides/how-to-know-if-a-payment-date-is-still-current",
      "/payment-dates",
    ],
    sortOrder: 356,
  },
  {
    slug: "sassa-status-check-for-r350-payments",
    title: "SASSA status check for R350 payments",
    searchAngle:
      "A search for R350 payments is usually broader than a date search and can include approval, payment processing, or missing-payment concerns.",
    statusSubject: "R350 payments",
    timingFocus: "the current payment guide and the status meaning pages together",
    caution:
      "When users search broadly for payments, it becomes easier to miss whether the problem is the status result or the timing itself.",
    relatedLinks: [
      "/guides/approved-but-no-payment",
      "/guides/why-payment-is-delayed",
      "/guides/how-to-fix-missing-payment-issues",
      "/payment-dates",
    ],
    sortOrder: 357,
  },
  {
    slug: "sassa-status-check-for-r350-payment",
    title: "SASSA status check for R350 payment",
    searchAngle:
      "This search usually means the user wants to know whether payment should already be happening after a status result.",
    statusSubject: "R350 payment progress",
    timingFocus: "the payment-readiness and payment-processing guides",
    caution:
      "A positive status does not always mean money is already released, so payment-progress wording needs to be read carefully.",
    relatedLinks: [
      "/guides/what-payment-status-check-means",
      "/guides/what-payment-pending-means",
      "/guides/how-to-read-payment-status-after-approval",
      "/payment-dates",
    ],
    sortOrder: 358,
  },
  {
    slug: "sassa-status-check-for-r370-payment",
    title: "SASSA status check for R370 payment",
    searchAngle:
      "A search for R370 payment usually reflects the newer amount wording, but the same separation still matters between status and timing.",
    statusSubject: "R370 payment timing",
    timingFocus: "the social-relief payment pages for the relevant month",
    caution:
      "A change in amount wording can make people think they need a different system when they often need the same process read more carefully.",
    relatedLinks: [
      "/guides/how-to-check-r370-status-safely",
      "/guides/srd-payment-dates-april-2026",
      "/guides/srd-payment-dates-may-2026",
      "/payment-dates",
    ],
    sortOrder: 359,
  },
  {
    slug: "sassa-status-check-for-r350-pay-day",
    title: "SASSA status check for R350 pay day",
    searchAngle:
      "A pay-day search usually means the user is looking for a plain-language payment date, not a technical status explanation.",
    statusSubject: "R350 pay-day timing",
    timingFocus: "the month page that matches the current payment cycle",
    caution:
      "Colloquial wording like pay day can make a portal-based or expected date look more final than it really is.",
    relatedLinks: [
      "/guides/how-to-understand-payment-dates",
      "/guides/how-to-check-payment-readiness-for-r350-support",
      "/guides/how-to-track-payment-dates-without-rumours",
      "/payment-dates",
    ],
    sortOrder: 360,
  },
  {
    slug: "sassa-status-check-for-r350-payment-dates-2024",
    title: "SASSA status check for R350 payment dates for 2024",
    searchAngle:
      "This search is usually about archive checking and should be treated as historical context rather than a live schedule.",
    statusSubject: "R350 2024 archive timing",
    timingFocus: "archive pages and year-comparison guides",
    caution:
      "Older year searches create confusion quickly when screenshots are shared without the year visible.",
    relatedLinks: [
      "/guides/payment-dates-2025-to-2026",
      "/guides/how-to-know-if-a-payment-date-is-still-current",
      "/guides/how-to-track-payment-dates-without-rumours",
      "/payment-dates",
    ],
    sortOrder: 361,
  },
  {
    slug: "sassa-status-check-payment-dates-2025",
    title: "SASSA status check payment dates for 2025",
    searchAngle:
      "A general 2025 search usually means users want archive payment context but are phrasing it through status-check language.",
    statusSubject: "2025 grant payment timing",
    timingFocus: "the 2025 archive guides and monthly payment pages",
    caution:
      "When a whole year is searched through status-check wording, users can overlook that they are actually looking for an archive calendar.",
    relatedLinks: [
      "/guides/payment-dates-2025",
      "/guides/payment-dates-2025-to-2026",
      "/guides/how-to-understand-payment-dates",
      "/payment-dates",
    ],
    sortOrder: 362,
  },
  {
    slug: "sassa-status-check-payment-dates-2026",
    title: "SASSA status check payment dates for 2026",
    searchAngle:
      "A 2026 search usually means users want a current-year view but are still mixing status language with payment-date planning.",
    statusSubject: "2026 grant payment timing",
    timingFocus: "the current-year payment pages for the right month and grant type",
    caution:
      "Current-year pages are helpful only when users read the month, the grant category, and the payment state together.",
    relatedLinks: [
      "/guides/payment-dates-2026",
      "/guides/how-to-know-if-your-payment-is-ready",
      "/guides/what-payment-released-means",
      "/payment-dates",
    ],
    sortOrder: 363,
  },
  {
    slug: "sassa-status-check-for-r350-payment-dates-june",
    title: "SASSA status check for R350 payment dates for June",
    searchAngle:
      "A June-specific search usually means someone is trying to match a status result to one month of SRD timing.",
    statusSubject: "June R350 timing",
    timingFocus: "the June social-relief payment page",
    caution:
      "Month-only searches are easy to misread when an old screenshot is missing the year or payment note.",
    relatedLinks: [
      "/guides/payment-dates-june-2026",
      "/guides/srd-payment-dates-june-2026",
      "/guides/how-to-know-if-a-payment-date-is-still-current",
      "/payment-dates/2026/june/social-relief",
    ],
    sortOrder: 364,
  },
  {
    slug: "sassa-status-check-for-r350-payment-dates-july",
    title: "SASSA status check for R350 payment dates for July",
    searchAngle:
      "A July-specific search usually means the user wants to connect one month of payment timing with the latest status wording.",
    statusSubject: "July R350 timing",
    timingFocus: "the July social-relief payment page",
    caution:
      "A month name on its own can hide whether the search is about the current cycle or an older archive month.",
    relatedLinks: [
      "/guides/payment-dates-july-2026",
      "/guides/srd-payment-dates-july-2026",
      "/guides/how-to-track-payment-dates-without-rumours",
      "/payment-dates/2026/july/social-relief",
    ],
    sortOrder: 365,
  },
  {
    slug: "sassa-status-check-for-srd-r370",
    title: "SASSA status check for SRD R370",
    searchAngle:
      "A search for SRD R370 usually means users want a current status answer but are also watching for payment timing in the same visit.",
    statusSubject: "SRD R370 status",
    timingFocus: "the current SRD month guide after the status result is read",
    caution:
      "The amount wording can make a search look new even when the safest reading habits are still the same as other SRD pages.",
    relatedLinks: [
      "/guides/how-to-check-r370-status-safely",
      "/guides/how-to-check-srd-status-online",
      "/guides/what-pending-verification-means",
      "/payment-dates",
    ],
    sortOrder: 366,
  },
  {
    slug: "sassa-status-check-for-r370-payment-dates",
    title: "SASSA status check for R370 payment dates",
    searchAngle:
      "A search for R370 payment dates usually means users want timing tied to the newer amount wording, not only a status explanation.",
    statusSubject: "R370 payment dates",
    timingFocus: "the relevant month page for social-relief timing",
    caution:
      "When amount wording changes, users can start trusting copied date lists that do not explain the month or payment state clearly enough.",
    relatedLinks: [
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2026",
      "/guides/how-to-read-r350-payment-status-safely",
      "/payment-dates",
    ],
    sortOrder: 367,
  },
];

const paymentPhraseVariants: PaymentPhraseVariant[] = [
  {
    slug: "sassa-srd-status-check-dates",
    title: "SASSA SRD status check dates",
    searchAngle:
      "A search for SRD status check dates usually means users are looking for timing through a status lens.",
    subjectLabel: "SRD status check dates",
    timingFocus: "the current SRD month page and the status guide together",
    caution:
      "If the search is treated like a single-date request, it can hide the difference between status wording and payment timing.",
    relatedLinks: [
      "/guides/how-to-check-srd-status-online",
      "/guides/payment-processing-meaning",
      "/guides/srd-payment-dates-2025",
      "/payment-dates",
    ],
    sortOrder: 368,
  },
  {
    slug: "sassa-srd-status-check-dates-370",
    title: "SASSA SRD status check dates 370",
    searchAngle:
      "A search for SRD status check dates 370 usually means the user is mixing the newer amount wording with date expectations.",
    subjectLabel: "SRD 370 status check dates",
    timingFocus: "the matching SRD month page for the current cycle",
    caution:
      "A number in the query can make the page feel more exact than it really is if the month and payment note are missing.",
    relatedLinks: [
      "/guides/how-to-check-r370-status-safely",
      "/guides/srd-payment-dates-january-2026",
      "/guides/srd-payment-dates-february-2026",
      "/payment-dates",
    ],
    sortOrder: 369,
  },
  {
    slug: "sassa-srd-payment-date",
    title: "SASSA SRD payment date",
    searchAngle:
      "A search for one SRD payment date usually means the user wants a simple answer for the current cycle.",
    subjectLabel: "SRD payment date wording",
    timingFocus: "the right month page for SRD timing",
    caution:
      "SRD timing is often safest when read with the month page and official route together rather than as one floating date.",
    relatedLinks: [
      "/guides/payment-processing-meaning",
      "/guides/how-to-know-if-your-payment-is-ready",
      "/guides/srd-payment-dates-march-2026",
      "/payment-dates",
    ],
    sortOrder: 370,
  },
  {
    slug: "sassa-srd-pay-date",
    title: "SASSA SRD pay date",
    searchAngle:
      "A pay-date search usually means the user wants plain-language timing without technical wording.",
    subjectLabel: "SRD pay-date wording",
    timingFocus: "the current SRD payment-date guide",
    caution:
      "Simple pay-date wording can hide whether the date is final, expected, or still portal-based.",
    relatedLinks: [
      "/guides/how-to-understand-payment-dates",
      "/guides/how-to-track-payment-dates-without-rumours",
      "/guides/what-payment-pending-means",
      "/payment-dates",
    ],
    sortOrder: 371,
  },
  {
    slug: "sassa-srd-grant-payment-date",
    title: "SASSA SRD grant payment date",
    searchAngle:
      "A grant payment date search often means the user wants to move from broad SRD wording into one clearer timing answer.",
    subjectLabel: "SRD grant payment date wording",
    timingFocus: "the correct SRD month or archive page",
    caution:
      "Without the month and year, even a true-looking grant payment date can become misleading.",
    relatedLinks: [
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2026",
      "/guides/how-to-know-if-a-payment-date-is-still-current",
      "/payment-dates",
    ],
    sortOrder: 372,
  },
  {
    slug: "sassa-srd-grant-payment-dates",
    title: "SASSA SRD grant payment dates",
    searchAngle:
      "A plural search for SRD grant payment dates usually means the user wants a page that can cover more than one month or cycle.",
    subjectLabel: "SRD grant payment dates",
    timingFocus: "the year guide first and then the exact month page",
    caution:
      "Plural date searches can easily blur current timing and archive timing unless the year is checked first.",
    relatedLinks: [
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2025-to-2026",
      "/guides/payment-dates-2026",
      "/payment-dates",
    ],
    sortOrder: 373,
  },
  {
    slug: "sassa-r350-grant-payment-date-according-to-id-number",
    title: "SASSA R350 grant payment date according to ID number",
    searchAngle:
      "A search for an R350 payment date according to ID number usually means the user hopes there is a fixed ID-based payment calendar.",
    subjectLabel: "R350 payment date according to ID number",
    timingFocus: "the official result route and the correct month guide",
    caution:
      "This wording often points to a myth that an ID number alone can safely predict a final payment date.",
    relatedLinks: [
      "/guides/how-to-avoid-fake-status-check-sites",
      "/guides/how-to-read-r350-status-check-and-payment-pages-together",
      "/guides/where-to-find-official-updates-safely",
      "/payment-dates",
    ],
    keyFocusTitle: "ID number is not a payment calendar",
    keyFocus:
      "An ID number can matter in official identity and case checks, but it should not be treated like a simple calendar that predicts payment timing on its own.",
    steps:
      "1. Do not trust pages that promise a guaranteed R350 payment date from an ID number alone.\n2. Read your status or official result first.\n3. Use the matching month guide for timing context.\n4. Check the payment state and note carefully.\n5. Use official channels when your own case still needs a direct answer.",
    sortOrder: 374,
  },
  {
    slug: "check-sassa-r350-grant-payment-date",
    title: "Check SASSA R350 grant payment date",
    searchAngle:
      "A search like this usually means the user wants the quickest safe path to current timing.",
    subjectLabel: "checking an R350 grant payment date",
    timingFocus: "the current payment-date page for social-relief support",
    caution:
      "The quick path only stays safe if the month, payment state, and official confirmation are read together.",
    relatedLinks: [
      "/guides/how-to-check-payment-readiness-for-r350-support",
      "/guides/how-to-check-srd-status-online",
      "/guides/payment-processing-meaning",
      "/payment-dates",
    ],
    sortOrder: 375,
  },
  {
    slug: "sassa-payment-dates-2025-r350",
    title: "SASSA payment dates for 2025 R350",
    searchAngle:
      "A 2025 R350 search usually means archive-year comparison rather than current-month planning.",
    subjectLabel: "2025 R350 payment dates",
    timingFocus: "the 2025 SRD archive pages",
    caution:
      "Archive-year date lists are useful only when they stay clearly separate from current payment planning.",
    relatedLinks: [
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2025",
      "/guides/payment-dates-2025-to-2026",
      "/payment-dates",
    ],
    sortOrder: 376,
  },
  {
    slug: "sassa-payment-dates-r350",
    title: "SASSA payment dates R350",
    searchAngle:
      "A broad R350 payment-dates search usually means the user wants a current timing hub rather than one month only.",
    subjectLabel: "R350 payment dates",
    timingFocus: "the current year page first and then the right month page",
    caution:
      "Broad searches feel convenient, but they become risky when users trust one recycled date without checking the payment state.",
    relatedLinks: [
      "/guides/payment-dates-2026",
      "/guides/srd-payment-dates-june-2026",
      "/guides/srd-payment-dates-july-2026",
      "/payment-dates",
    ],
    sortOrder: 377,
  },
  {
    slug: "sassa-r370-payment-dates",
    title: "SASSA R370 payment dates",
    searchAngle:
      "A search for R370 payment dates usually means the user is following the newer amount wording and wants current timing.",
    subjectLabel: "R370 payment dates",
    timingFocus: "the relevant SRD month guide for the current cycle",
    caution:
      "Even when the amount wording changes, the safest reading habit still depends on the month, the note, and the payment state.",
    relatedLinks: [
      "/guides/how-to-check-r370-status-safely",
      "/guides/srd-payment-dates-2025",
      "/guides/payment-dates-2026",
      "/payment-dates",
    ],
    sortOrder: 378,
  },
  {
    slug: "sassa-350-payment-date",
    title: "SASSA 350 payment date for the current month",
    searchAngle:
      "A shorthand 350 payment-date search usually means the user wants the current month's R350 or SRD timing in the simplest possible wording.",
    subjectLabel: "R350 or 350 payment date wording",
    timingFocus: "the current SRD payment page and matching month guide",
    caution:
      "Shorter wording can make users trust whichever date they see first, even when the page still needs context.",
    relatedLinks: [
      "/payment-dates",
      "/guides/payment-dates-2026",
      "/guides/how-to-understand-payment-dates",
      "/guides/approved-but-no-payment",
      "/guides/how-to-check-payment-readiness-for-r350-support",
    ],
    keyFocusTitle: "Current-month context matters more than the short search phrase",
    keyFocus:
      "A short 350 payment-date search can sound like there should be one simple answer, but the safest reading still depends on the current month, the payment state, and whether the timing is already published.",
    steps:
      "1. Start with the current SRD payment page instead of a copied screenshot.\n2. Match the timing to the current month.\n3. Read the payment state and note, not only the visible date.\n4. Use the matching status guide if approval or verification wording is still affecting payment.\n5. Use official channels when your own case still needs direct confirmation.",
    sortOrder: 379,
  },
  {
    slug: "sassa-370-payment-date",
    title: "SASSA 370 payment date",
    searchAngle:
      "A shorthand 370 payment-date search usually means the user is using current amount wording but still wants one clear timing answer.",
    subjectLabel: "370 payment date wording",
    timingFocus: "the right SRD month page and payment-status guide",
    caution:
      "A short query can still hide important details like the month, year, and whether the timing is already final.",
    relatedLinks: [
      "/guides/how-to-check-r370-status-safely",
      "/guides/what-payment-released-means",
      "/guides/what-payment-pending-means",
      "/payment-dates",
    ],
    sortOrder: 380,
  },
];

const oldAgeVariants: OldAgeVariant[] = [
  {
    slug: "sassa-old-age-grant-pay-date",
    title: "SASSA old age grant pay date",
    searchAngle:
      "A search for old age grant pay date usually means the user wants older persons grant timing in familiar wording.",
    timingFocus: "the older persons grant payment pages",
    caution:
      "If old-age wording is treated like a separate grant, users can miss the actual page they need.",
    relatedLinks: [
      "/grants/older-persons",
      "/guides/older-persons-grant-payment-dates-2025",
      "/guides/older-persons-grant-payment-dates-january-2026",
      "/payment-dates",
    ],
    sortOrder: 381,
  },
  {
    slug: "sassa-payment-date-for-old-age",
    title: "SASSA payment date for old age",
    searchAngle:
      "A search for payment date for old age usually means the user wants one clear next step for older persons grant timing.",
    timingFocus: "the current month page for older persons support",
    caution:
      "One broad old-age search can still point to different months, so the year and month should always be checked before the date is trusted.",
    relatedLinks: [
      "/guides/payment-dates-2026",
      "/guides/older-persons-grant-payment-dates-february-2026",
      "/guides/how-to-know-if-your-payment-is-ready",
      "/payment-dates",
    ],
    sortOrder: 382,
  },
  {
    slug: "sassa-old-age-pension-2025",
    title: "SASSA old age pension 2025",
    searchAngle:
      "A search for old age pension 2025 usually points to archive-year checking for older persons grant timing.",
    timingFocus: "the 2025 archive guides for older persons grant timing",
    caution:
      "Archive-year searches are helpful only when users understand that 2025 dates are not the same as current payment planning.",
    relatedLinks: [
      "/guides/older-persons-grant-payment-dates-2025",
      "/guides/payment-dates-2025",
      "/guides/payment-dates-2025-to-2026",
      "/payment-dates",
    ],
    sortOrder: 383,
  },
];

const SEO_BATCH_SIXTEEN_GUIDES_SOURCE = [
  ...statusTimingVariants.map(statusTimingGuide),
  ...paymentPhraseVariants.map(paymentPhraseGuide),
  ...oldAgeVariants.map(oldAgeGuide),
];

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "sassa-status-check-for-r350-payment-dates": {
    "title": "Isheke lesimo le-SASSA lezinsuku zokukhokha ze-R350",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa sezinsuku zokukhokha zika-r350 uyaseshwa, uchaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha isheke lesimo se-SASSA sezinsuku zokukhokha ze-R350 ngokuvamile kusho ukuthi othile ufuna kokubili umphumela wamanje kanye nempendulo yesikhathi ngesikhathi esisodwa. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa i-SRD yamanje noma ikhasi lokukhokha le-social-relief ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kosekelo lwe-R350 kuvame ukuhlanganisa imibuzo emibili ehlukene ibe umugqa owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ingxenye eyingozi ukuthatha ithuluzi lesimo futhi ikhasi ledethi yokukhokha liyinto efanayo. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo ukuze uthole ukwesekwa kwe-r350.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula i-SRD yamanje noma ikhasi lokukhokha lokusiza umphakathi.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-sassa-status-check-for-r350\n• /guides/how-to-read-r350-status-check-and-payment-pages-together\n• /guides/payment-dates-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sokusekela i-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment-date": {
    "title": "Isheke lesimo le-SASSA ledethi yokukhokha ye-R350",
    "summary": "Umhlahlandlela wesheke lesimo sakwa-sassa sosesho lwezinsuku zokukhokha zika-r350, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha idethi yokukhokha ye-R350 ngokuvamile kusho ukuthi umsebenzisi uthemba ukuthi umphumela wesimo uzoholela osukwini olulodwa ngqo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa ikhasi lenyanga elifanayo losekelo lwesitayela se-SRD ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R350 usesho lwesikhathi sokukhokha ngokuvamile luhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Usuku olulodwa oluqondile lungabukeka lulula kunesimo sangempela, ikakhulukazi uma isikhathi sisasekelwe enyangeni noma ingosi. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesikhathi sokukhokha sika-r350.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokhu okudingayo, vula ikhasi lenyanga elifanayo ukuze uthole ukwesekwa kwesitayela se-SRD.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-r350-payment-status-safely\n• /guides/payment-processing-meaning\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sokukhokha sika-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment-dates-2025": {
    "title": "I-SASSA isheke isimo sezinsuku zokukhokha ze-R350 zika-2025",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa wezinsuku zokukhokha u-r350 zosesho lwango-2025, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Lolu hlobo lokusesha luvamise ukukhomba ekuhlolweni konyaka wengobo yomlando, hhayi ukuhlela kwamanje kuphela. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa amakhasi engobo yomlando ka-2025 ukuze uthole isikhathi sokusiza umphakathi somongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi se-R350 2025 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngaphandle kwelensi yengobo yomlando, izithombe-skrini zokukhokha ezindala zingaphambanisa namashejuli amanje. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesikhathi se-r350 2025 sengobo yomlando.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokhu okudingayo, vula amakhasi engobo yomlando ka-2025 ukuze uthole isikhathi sokusiza umphakathi.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sengobo yomlando ka-r350 2025 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payments": {
    "title": "Isheke lesimo le-SASSA lezinkokhelo ze-R350",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa sokuseshwa kwezinkokhelo zika-r350, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha izinkokhelo ze-R350 kuvame ukuba banzi kunosesho lwedethi futhi kungabandakanya ukugunyazwa, ukucutshungulwa kwenkokhelo, noma ukukhathazeka ngokukhokha. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa inkomba yamanje yokukhokha kanye namakhasi encazelo yesimo ndawonye ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwezinkokhelo ze-R350 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi basesha kabanzi izinkokhelo, kuba lula ukuphuthelwa ukuthi inkinga ingumphumela wesimo noma isikhathi ngokwaso. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo sokukhokha u-r350.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula inkomba yamanje yokukhokha kanye namakhasi encazelo yesimo ndawonye.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/approved-but-no-payment\n• /guides/why-payment-is-delayed\n• /guides/how-to-fix-missing-payment-issues\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sokukhokha sika-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment": {
    "title": "Isheke lesimo le-SASSA lenkokhelo ye-R350",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa sokuseshwa kwenkokhelo ka-r350, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Lokhu sesho ngokuvamile kusho ukuthi umsebenzisi ufuna ukwazi ukuthi inkokhelo kufanele ngabe isivele yenzeka yini ngemuva komphumela wesimo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa imihlahlandlela yokulungela ukukhokha kanye nokucubungula inkokhelo ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwenqubekelaphambili yenkokhelo ye-R350 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isimo esihle asisho njalo ukuthi imali isikhishiwe, ngakho amagama enqubekelaphambili yokukhokha adinga ukufundwa ngokucophelela. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo senqubekelaphambili yokukhokha u-r350.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula iziqondiso zokulungela ukukhokha kanye nokucubungula inkokhelo.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-status-check-means\n• /guides/what-payment-pending-means\n• /guides/how-to-read-payment-status-after-approval\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wenqubekelaphambili yenkokhelo ka-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r370-payment": {
    "title": "Isheke lesimo le-SASSA lenkokhelo ye-R370",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa sokuseshwa kwenkokhelo ka-r370, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha inkokhelo ye-R370 ngokuvamile kubonisa inani elisha lamagama, kodwa ukuhlukana okufanayo kusabalulekile phakathi kwesimo nesikhathi. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa amakhasi okukhokha okusiza umphakathi enyanga efanele ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R370 usesho lwesikhathi sokukhokha ngokuvamile luhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukushintsha inani lamagama kungenza abantu bacabange ukuthi badinga isistimu ehlukile kuyilapho ngokuvamile bedinga inqubo efanayo ifundwe ngokucophelela. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesikhathi sokukhokha sika-r370.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula amakhasi okukhokha okusiza umphakathi enyanga efanele.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r370-status-safely\n• /guides/srd-payment-dates-april-2026\n• /guides/srd-payment-dates-may-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sokukhokha sika-r370 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-pay-day": {
    "title": "I-SASSA isheke isimo sosuku lokukhokha lwe-R350",
    "summary": "Umhlahlandlela wesheke lesimo sakwa-sassa sosesho lwezinsuku zokuhola lika-r350, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kosuku olukhokha ngokuvamile kusho ukuthi umsebenzisi ufuna idethi yokukhokha yolimi olulula, hhayi incazelo yesimo sobuchwepheshe. Indlela ephephile iwukufunda umphumela wesimo kuqala bese usebenzisa ikhasi lenyanga elifana nomjikelezo wokukhokha wamanje womongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R350 usesho lwesikhathi sosuku lokukhokha luvamise ukuhlanganisa imibuzo emibili ehlukene ibe umugqa owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amagama angajwayelekile afana nosuku lomholo angenza idethi esuselwe kuphothali noma elindelwe ibukeke ingeyokugcina kunokuba injalo ngempela. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo ngo-r350 wosuku lokukhokha.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula ikhasi lenyanga elihambisana nomjikelezo wokukhokha wamanje.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-check-payment-readiness-for-r350-support\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe umphumela wesimo sesikhathi sosuku lokukhokha sika-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment-dates-2024": {
    "title": "I-SASSA isheke isimo sezinsuku zokukhokha ze-R350 zika-2024",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa wezinsuku zokukhokha u-r350 zosesho lwango-2024, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Lokhu kusesha ngokuvamile kumayelana nokuhlola ingobo yomlando futhi kufanele kuthathwe njengomongo womlando kuneshejuli ebukhoma. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa amakhasi engobo yomlando nemihlahlandlela yokuqhathanisa unyaka ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi se-R350 2024 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusesha konyaka omdala kudala ukudideka ngokushesha uma izithombe-skrini zabiwa ngaphandle kokuthi unyaka ubonakale. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila olungile wesimo sesikhathi se-r350 2024 sengobo yomlando.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula amakhasi engobo yomlando kanye nemihlahlandlela yokuqhathanisa yonyaka.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sengobo yomlando ka-r350 2024 ungabonisa idethi yokugcina yokukhokha iyodwa?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-payment-dates-2025": {
    "title": "Izinsuku zokukhokha zesheke lesimo se-SASSA zika-2025",
    "summary": "Umhlahlandlela wezinsuku zokukhokha isheke lesimo se-sassa osesho lwango-2025, ochaza ukuthi imiphumela yesimo namakhasi edethi yokukhokha asebenza kanjani ngaphandle kokuwaphatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha okuvamile kwango-2025 ngokuvamile kusho ukuthi abasebenzisi bafuna umongo wenkokhelo ongobo yomlando kodwa bawubeka ngolimi lokuhlola isimo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa imihlahlandlela yengobo yomlando yango-2025 namakhasi okukhokha anyanga zonke ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi sokukhokha kwesibonelelo sikahulumeni kwango-2025 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma unyaka wonke useshwa ngamagama okuhlola isimo, abasebenzisi bangakwazi ukunaka ukuthi empeleni bafuna ikhalenda yengobo yomlando. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesikhathi sokukhokha isibonelelo sika-2025.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi sikudinga, vula imihlahlandlela yengobo yomlando yango-2025 namakhasi okukhokha nyanga zonke.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sokukhokha isibonelelo sikahulumeni sika-2025 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-payment-dates-2026": {
    "title": "Izinsuku zokukhokha zesheke lesimo se-SASSA zango-2026",
    "summary": "Umhlahlandlela wezinsuku zokukhokha isheke lesimo se-sassa osesho lwango-2026, ochaza ukuthi imiphumela yesimo namakhasi edethi yokukhokha asebenza kanjani ngaphandle kokuwaphatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwango-2026 ngokuvamile lusho ukuthi abasebenzisi bafuna ukubuka konyaka wamanje kodwa basahlanganisa ulimi lwesimo nokuhlela usuku lokukhokha. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa amakhasi okukhokha onyaka wamanje wenyanga elungile kanye nohlobo lwesibonelelo somongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi sokukhokha kwesibonelelo sikahulumeni kwango-2026 kuvame ukuhlanganisa imibuzo emibili ehlukene ibe umugqa owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi onyaka wamanje awusizo kuphela lapho abasebenzisi befunda inyanga, isigaba sesibonelelo, kanye nesimo sokukhokha ndawonye. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesikhathi sokukhokha isibonelelo sika-2026.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula amakhasi okukhokha onyaka wamanje wenyanga efanele kanye nohlobo lwesibonelelo.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2026\n• /guides/how-to-know-if-your-payment-is-ready\n• /guides/what-payment-released-means\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sokukhokha isibonelelo sikahulumeni sika-2026 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment-dates-june": {
    "title": "Isheke lesimo le-SASSA lezinsuku zokukhokha ze-R350 zangoJuni",
    "summary": "Umhlahlandlela wesheke lesimo sakwa-sassa wezinsuku zokukhokha zika-r350 zosesho lwangoJuni, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho oluqondile lukaJuni ngokuvamile lusho ukuthi othile uzama ukufanisa umphumela wesimo nenyanga eyodwa yesikhathi se-SRD. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa ikhasi likaJuni lokukhokha impumuzo yomphakathi ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi kukaJuni R350 kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusesha kwenyanga kuphela kulula ukufundwa kabi uma isithombe-skrini esidala sishoda unyaka noma inothi lokukhokha. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo sikaJuni R350 isikhathi.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula ikhasi lokukhokha likaJuni lokusiza umphakathi.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-june-2026\n• /guides/srd-payment-dates-june-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates/2026/june/social-relief"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe umphumela wesimo sesikhathi sikaJuni r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r350-payment-dates-july": {
    "title": "Isheke lesimo le-SASSA lezinsuku zokukhokha ze-R350 zangoJulayi",
    "summary": "Umhlahlandlela wesheke lesimo sakwa-sassa wezinsuku zokukhokha zika-r350 zosesho lwangoJulayi, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho oluqondile lukaJulayi ngokuvamile lusho ukuthi umsebenzisi ufuna ukuxhuma isikhathi sokukhokha senyanga eyodwa namagama akamuva esimo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa ikhasi likaJulayi lokukhokha impumuzo yomphakathi ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesikhathi kwe-R350 kaJulayi kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Igama lenyanga ngokwalo lingafihla ukuthi ingabe ukusesha kumayelana nomjikelezo wamanje noma inyanga endala yengobo yomlando. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo wangoJulayi R350 wesikhathi.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula ikhasi likaJulayi lokukhokha impumuzo yomphakathi.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-july-2026\n• /guides/srd-payment-dates-july-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates/2026/july/social-relief"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo sesikhathi sikaJulayi ka-r350 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-srd-r370": {
    "title": "I-SASSA isheke isimo se-SRD R370",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa wokusesha kwe-srd r370, ochaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ndawonye ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha i-SRD R370 ngokuvamile kusho ukuthi abasebenzisi bafuna impendulo yesimo samanje kodwa futhi babheke isikhathi sokukhokha ngokuvakasha okufanayo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa umhlahlandlela wamanje wenyanga we-SRD ngemva kokuba umphumela wesimo ufundwe ukuze uthole umongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD R370 ukusesha isimo kuvame ukuhlanganisa imibuzo emibili ehlukene ibe umugqa owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inani lamagama lingenza ukusesha kubukeke kukusha ngisho nalapho imikhuba yokufunda ephephe kakhulu isafana namanye amakhasi we-SRD. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila wesimo olungile wesimo se-srd r370.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula inkomba yenyanga ye-SRD yamanje ngemva kokuba umphumela wesimo usufundiwe.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r370-status-safely\n• /guides/how-to-check-srd-status-online\n• /guides/what-pending-verification-means\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe umphumela wesimo se-srd r370 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-status-check-for-r370-payment-dates": {
    "title": "Isheke lesimo le-SASSA lezinsuku zokukhokha ze-R370",
    "summary": "Umhlahlandlela wokuhlola isimo sakwa-sassa sezinsuku zokukhokha zika-r370 uyaseshwa, uchaza ukuthi imiphumela yesimo namakhasi osuku lokukhokha asebenza kanjani ngaphandle kokuwathatha njengento efanayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha izinsuku zokukhokha ze-R370 ngokuvamile kusho ukuthi abasebenzisi bafuna isikhathi esiboshelwe enanini elisha lamagama, hhayi nje incazelo yesimo. Indlela ephephile ukufunda umphumela wesimo kuqala bese usebenzisa ikhasi lenyanga elifanele ukuze uthole isikhathi sokusiza umphakathi somongo wesikhathi. Umphumela wesimo awusebenzi ngokuzenzakalelayo njengekhalenda lokugcina lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R370 ukusesha izinsuku zokukhokha kuvame ukuhlanganisa imibuzo emibili ehlukene emugqeni owodwa: ukuthi uthini umphumela wamanje nokuthi inkokhelo ingase isilungile nini. Empeleni, amakhasi ezimo achaza ukuqhubeka kwecala, kuyilapho amakhasi edethi yokukhokha asiza abasebenzisi ukuthi bafunde isikhathi senyanga nezimo zokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma inani lamagama lishintsha, abasebenzisi bangaqala ukwethemba uhlu lwezinsuku ezikopishiwe olungachazi inyanga noma isimo sokukhokha ngokucacile ngokwanele. Ukudideka kuvame ukuqala lapho umlayezo wesimo owodwa uthathwa njengempendulo yokukhokha egcwele nakuba isikhathi singase sincike ekhasini lenyanga, inothi lokukhokha, noma ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngomzila ofanele wesimo ngezinsuku zokukhokha zika-r370.\n2. Funda umphumela wamanje ngokucophelela esikhundleni sokugxumela usuku oluthile.\n3. Uma isikhathi siyilokho okudingayo, vula ikhasi lenyanga elifanele ukuze uthole isikhathi sokusiza umphakathi.\n4. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela.\n5. Sebenzisa umzila osemthethweni ofanele lapho ukuqinisekiswa kokugcina kusancike endabeni yakho."
      },
      {
        "title": "Indlela yokufunda kahle usesho",
        "body": "Umkhuba ophephe kakhulu ukuhlukanisa ukufunda isimo nokufunda ngedethi yokukhokha. Ziyasekelana, kodwa azilona ithuluzi elifanayo futhi akufanele kuthathwe sengathi ziphendula umbuzo ofanayo ncamashi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ichaza isimo namagama osuku lokukhokha ngolimi olulula, kodwa akusona isimo esisemthethweni noma uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emshweni wokusesha oxubile uye ekhasini elilandelayo elingakwesokudla, noma ngabe lokho kuyincazelo yesimo, inkomba yedethi yokukhokha, noma inketho yesikhumbuzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2026\n• /guides/how-to-read-r350-payment-status-safely\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe umphumela wesimo sezinsuku zokukhokha ezingu-r370 ungabonisa usuku lokugcina lokukhokha ngokwakho?",
        "body": "Hhayi njalo. Umphumela wesimo ungase udinge ukufundwa kanye nekhasi lenyanga elilungile noma umzila osemthethweni ngaphambi kokuthi kucace isikhathi."
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwesimo nosuku lokukhokha kuxutshwa ndawonye kaningi?",
        "body": "Ngoba abasebenzisi ngokuvamile bafuna impendulo eyodwa elula, nakuba ukuqhubeka kwecala nesikhathi sokukhokha kuyizingxenye ezihlukene zenqubo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma amagama asabukeka engaqinisekile noma icala lakho lidinga ukuqinisekiswa okuqondile."
      }
    ]
  },
  "sassa-srd-status-check-dates": {
    "title": "SASSA SRD izinsuku zokuhlola isimo",
    "summary": "Umhlahlandlela wokusesha amadethi okuhlola isimo se-sassa srd, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha izinsuku zokuhlola isimo se-SRD ngokuvamile kusho ukuthi abasebenzisi bafuna isikhathi ngelensi yesimo. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lenyanga le-SRD lamanje kanye negayidi yesimo ndawonye bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD amadethi okuhlola isimo ngokuvamile azwakala sengathi kufanele kube nedethi eyodwa elula yomphakathi yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ukusesha kuthathwa njengesicelo sosuku olulodwa, kungafihla umehluko phakathi kwamagama esimo nesikhathi sokukhokha. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi lenyanga le-SRD lamanje kanye negayidi yesimo ndawonye.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-srd-status-online\n• /guides/payment-processing-meaning\n• /guides/srd-payment-dates-2025\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokuhlola isimo se-srd zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-srd-status-check-dates-370": {
    "title": "SASSA SRD izinsuku zokuhlola isimo 370",
    "summary": "Umhlahlandlela wokuhlola isimo se-sassa srd izinsuku zokuseshwa okungama-370, ezibhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha kakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwezinsuku zokuhlola isimo ezingu-SRD 370 ngokuvamile kusho ukuthi umsebenzisi uhlanganisa amagama amasha yenani kanye nedethi elindelwe. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lenyanga le-SRD elimeshayo lomjikelezo wamanje bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD 370 ukusesha kwezinsuku zokuhlola isimo kuvame ukuzwakala sengathi kufanele kube nedethi eyodwa elula yomphakathi yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inombolo embuzweni ingenza ikhasi lizizwe linembe kakhulu kunalokho eliyikho ngempela uma inyanga nenothi lokukhokha lingekho. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi lenyanga le-SRD elifanayo lomjikelezo wamanje.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r370-status-safely\n• /guides/srd-payment-dates-january-2026\n• /guides/srd-payment-dates-february-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokuhlolwa kwesimo se-srd 370 zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-srd-payment-date": {
    "title": "SASSA SRD usuku lokukhokha",
    "summary": "Umhlahlandlela osesho lwedethi yokukhokha ye-sassa srd, ebhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha idethi yokukhokha ye-SRD ngokuvamile kusho ukuthi umsebenzisi ufuna impendulo elula yomjikelezo wamanje. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lenyanga elifanele le-SRD bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD usesho lwamagama lwedethi yokukhokha ngokuvamile luzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isikhathi se-SRD sivamise ukuphepheka kakhulu uma kufundwa nekhasi lenyanga kanye nomzila osemthethweni ndawonye kunokuba kube njengedethi eyodwa entantayo. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi lenyanga elilungile le-SRD lesikhathi.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-processing-meaning\n• /guides/how-to-know-if-your-payment-is-ready\n• /guides/srd-payment-dates-march-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe amagama edethi yokukhokha ye-srd ahlala ekhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-srd-pay-date": {
    "title": "SASSA SRD idethi yokukhokha",
    "summary": "Umhlahlandlela osesho lwedethi yokukhokha ye-sassa srd, ebhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha amadethi akopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha kwedethi yokukhokha ngokuvamile kusho ukuthi umsebenzisi ufuna isikhathi solimi olulula ngaphandle kwamagama obuchwepheshe. Indlela ephephe kunazo zonke iwukufanisa amagama nenkomba yedethi yokukhokha ye-SRD yamanje bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD ukusesha amagama osuku lokukhokha kuvame ukuzwakala sengathi kufanele kube nedethi eyodwa elula yomphakathi yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amagama alula wedethi yokukhokha angafihla ukuthi idethi eyokugcina, ilindelekile, noma isasekelwe kuphothali. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Ifanise nomhlahlandlela wamanje wosuku lokukhokha we-SRD.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/what-payment-pending-means\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe amagama osuku lokukhokha lwe-srd ahlala ekhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-srd-grant-payment-date": {
    "title": "SASSA SRD usuku lokukhokha lwesibonelelo",
    "summary": "Umhlahlandlela osesho lwedethi yokukhokha ye-sassa srd, ebhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwedethi yokukhokha yesibonelelo sikahulumeni ngokuvamile lusho ukuthi umsebenzisi ufuna ukusuka emazwini abanzi angu-SRD aye empendulweni eyodwa yesikhathi ecacile. Indlela ephephe kunazo zonke ukufanisa amagama nenyanga ye-SRD efanele noma ikhasi lengobo yomlando bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD usesho lwamagama lwedethi yokukhokha yesibonelelo sikahulumeni ngokuvamile luzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngaphandle kwenyanga nonyaka, ngisho nedethi yokukhokha yesibonelelo sikahulumeni ebukeka njengeqiniso ingadukisa. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nenyanga eyi-SRD noma ikhasi lengobo yomlando.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe amagama osuku lokukhokha lwesibonelelo se-srd ahlala ekhomba osukwini olulodwa lwasesidlangalaleni?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-srd-grant-payment-dates": {
    "title": "SASSA SRD izinsuku zokukhokha kwesibonelelo",
    "summary": "Umhlahlandlela osesho lwezinsuku zokukhokha zesibonelelo se-sassa srd, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha ngobuningi bezinsuku zokukhokha zegranti ye-SRD ngokuvamile kusho ukuthi umsebenzisi ufuna ikhasi elingakwazi ukufaka ngaphezu kwenyanga eyodwa noma umjikelezo. Indlela ephephe kunazo zonke ukufanisa amagama negayidi yonyaka kuqala bese kuba ikhasi lenyanga eliqondile bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SRD ukusesha izinsuku zokukhokha kwesibonelelo sikahulumeni kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusesha kwedethi yobuningi kungafiphalisa kalula isikhathi samanje nesikhathi esigcina kungobo yomlando ngaphandle kwalapho unyaka uhlolwa kuqala. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nomhlahlandlela wonyaka kuqala bese emva kwalokho ikhasi lenyanga ngqo.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/payment-dates-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokukhokha zesibonelelo se-srd zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-r350-grant-payment-date-according-to-id-number": {
    "title": "SASSA R350 idethi yokukhokha yesibonelelo sikahulumeni ngokwenombolo kamazisi",
    "summary": "Umhlahlandlela wedethi yokukhokha yesibonelelo sikahulumeni sika-sassa u-r350 ngokosesho lwezinombolo zikamazisi, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha kakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha idethi yokukhokha ye-R350 ngokwenombolo kamazisi ngokuvamile kusho ukuthi umsebenzisi uthemba ukuthi kukhona ikhalenda lokukhokha elisekelwe ku-ID. Indlela ephephe kunazo zonke iwukufanisa amagama nomzila wemiphumela osemthethweni kanye negayidi efanele yenyanga bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Idethi yokukhokha ye-R350 ngokuya ngokuseshwa kwenombolo kamazisi kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Lawa magama avame ukukhomba inganekwane yokuthi inombolo kamazisi iyodwa engabikezela ngokuphephile usuku lokugcina lokukhokha. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungawathembi amakhasi athembisa usuku lokukhokha lwe-R350 oluqinisekisiwe ukusuka enombolweni kamazisi iyodwa.\n2. Funda isimo sakho noma umphumela osemthethweni kuqala.\n3. Sebenzisa umhlahlandlela wenyanga ofanayo ukuze uthole umongo wesikhathi.\n4. Hlola isimo sokukhokha futhi uqaphele ngokucophelela.\n5. Sebenzisa iziteshi ezisemthethweni lapho icala lakho lisadinga impendulo eqondile."
      },
      {
        "title": "Inombolo ye-ID ayilona ikhalenda lokukhokha",
        "body": "Inombolo kamazisi ingaba nendaba umazisi osemthethweni kanye nokuhlolwa kwamacala, kodwa akufanele ithathwe njengekhalenda elilula elibikezela isikhathi sokukhokha ngokwalo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-avoid-fake-status-check-sites\n• /guides/how-to-read-r350-status-check-and-payment-pages-together\n• /guides/where-to-find-official-updates-safely\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe usuku lokukhokha luka-r350 ngokwenombolo kamazisi luhlala lukhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "check-sassa-r350-grant-payment-date": {
    "title": "Hlola idethi yokukhokha ye-SASSA R350",
    "summary": "Umhlahlandlela wokuhlola ukusesha kwedethi yokukhokha kwesibonelelo sikahulumeni sika-sassa u-r350, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha okufana nalokhu ngokuvamile kusho ukuthi umsebenzisi ufuna indlela ephephile esheshayo eya kusikhathi samanje. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lamanje ledethi yokukhokha ukuze uthole usizo lokusiza umphakathi bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "ukuhlola idethi yokukhokha yesibonelelo se-R350 ukusesha ngokuvamile kuzwakala sengathi kufanele kube nedethi eyodwa elula yomphakathi yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Indlela esheshayo ihlala iphephile kuphela uma inyanga, isimo sokukhokha, nokuqinisekiswa okusemthethweni kufundwa ndawonye. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi lamanje ledethi yokukhokha ukuze uthole ukwesekwa komphakathi.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-payment-readiness-for-r350-support\n• /guides/how-to-check-srd-status-online\n• /guides/payment-processing-meaning\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ukuhlola usuku lokukhokha isibonelelo sikahulumeni sika-r350 kuhlale kukhomba osukwini olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-payment-dates-2025-r350": {
    "title": "Izinsuku zokukhokha ze-SASSA zika-2025 R350",
    "summary": "Umhlahlandlela wezinsuku zokukhokha zakwa-sassa zosesho luka-2025 r350, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwe-R350 lwango-2025 ngokuvamile lusho ukuqhathanisa konyaka wengobo yomlando kunokuhlela kwenyanga yamanje. Indlela ephephe kunazo zonke ukufanisa amagama namakhasi wengobo yomlando we-2025 SRD bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuthi uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwezinsuku zokukhokha zika-2025 R350 kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uhlu lwedethi yengobo yomlando luwusizo kuphela uma luhlala luhluke ngokusobala ezinhlelweni zamanje zokukhokha. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Ifanise namakhasi engobo yomlando we-SRD ka-2025.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokukhokha zika-2025 r350 zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-payment-dates-r350": {
    "title": "SASSA izinsuku zokukhokha R350",
    "summary": "Umhlahlandlela wezinsuku zokukhokha zakwa-sassa usesho lwe-r350, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha kakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho olubanzi lwezinsuku zokukhokha lwe-R350 ngokuvamile lusho ukuthi umsebenzisi ufuna ihabhu lesikhathi lamanje kunenyanga eyodwa kuphela. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lonyaka wamanje kuqala bese kuthi ikhasi lenyanga elifanele bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R350 ukusesha izinsuku zokukhokha kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusesha okubanzi kuzwakala kulula, kodwa kuba yingozi uma abasebenzisi bethemba usuku olulodwa olugaywe kabusha ngaphandle kokuhlola isimo sokukhokha. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi lonyaka wamanje kuqala bese emva kwalokho ikhasi lenyanga elifanele.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2026\n• /guides/srd-payment-dates-june-2026\n• /guides/srd-payment-dates-july-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokukhokha zika-r350 zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-r370-payment-dates": {
    "title": "SASSA R370 izinsuku zokukhokha",
    "summary": "Umhlahlandlela osesho lwezinsuku zokukhokha ze-sassa r370, obhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha izinsuku zokukhokha ze-R370 ngokuvamile kusho ukuthi umsebenzisi ulandela amagama amanani amasha futhi ufuna isikhathi samanje. Indlela ephephe kunazo zonke iwukufanisa amagama negayidi efanele yenyanga ye-SRD yomjikelezo wamanje bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "R370 ukusesha izinsuku zokukhokha kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngisho noma inani lamagama lishintsha, umkhuba wokufunda ophephe kakhulu usancike enyangeni, inothi, kanye nesimo sokukhokha. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa negayidi efanele yenyanga ye-SRD yomjikelezo wamanje.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r370-status-safely\n• /guides/srd-payment-dates-2025\n• /guides/payment-dates-2026\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izinsuku zokukhokha zika-r370 zihlala zikhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-350-payment-date": {
    "title": "Idethi yokukhokha ye-SASSA 350 yenyanga yamanje",
    "summary": "Umhlahlandlela wedethi yokukhokha ye-sassa 350 yokusesha kwenyanga yamanje, ebhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwedethi yokukhokha ye-shorthand 350 ngokuvamile lusho ukuthi umsebenzisi ufuna isikhathi senyanga yamanje R350 noma SRD ngamagama alula ngangokunokwenzeka. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lamanje lokukhokha le-SRD kanye negayidi yenyanga efanayo bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-R350 noma ukusesha amagama edethi yokukhokha engu-350 kuvame ukuzwakala sengathi kufanele kube nedethi yomphakathi eyodwa elula yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amagama amafushane angenza abasebenzisi bathembe noma iyiphi idethi abayibona kuqala, nanoma ikhasi lisadinga umongo. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ngekhasi lamanje lokukhokha le-SRD esikhundleni sesithombe-skrini esikopishiwe.\n2. Qondanisa isikhathi nenyanga yamanje.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Sebenzisa inkomba yesimo esifanayo uma ukugunyazwa noma amagama okuqinisekisa kusathinta inkokhelo.\n5. Sebenzisa iziteshi ezisemthethweni lapho icala lakho lisadinga ukuqinisekiswa okuqondile."
      },
      {
        "title": "Umongo wenyanga yamanje ubaluleke kakhulu kunomusho omfushane wokusesha",
        "body": "Usesho olufushane lwedethi yokukhokha engu-350 lungazwakala sengathi kufanele kube nempendulo eyodwa elula, kodwa ukufunda okuphephe kakhulu kusancike enyangeni yamanje, isimo sokukhokha, kanye nokuthi isikhathi sesishicilelwe yini."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/approved-but-no-payment\n• /guides/how-to-check-payment-readiness-for-r350-support"
      },
      {
        "title": "I-FAQ: Ingabe amagama edethi yokukhokha angu-r350 noma angu-350 ahlala ekhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-370-payment-date": {
    "title": "Idethi yokukhokha ye-SASSA 370",
    "summary": "Umhlahlandlela osesho lwedethi yokukhokha ye-sassa 370, ebhalelwe ukusiza abasebenzisi ukuthi bafunde isikhathi esisekelwe enyangeni ngokuphepha nakakhulu futhi bagweme ukuphatha izinsuku ezikopishiwe njengezimpendulo ezisemthethweni zokugcina.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Usesho lwedethi yokukhokha ye-shorthand 370 ngokuvamile lusho ukuthi umsebenzisi usebenzisa igama lenani lamanje kodwa usafuna impendulo eyodwa ecacile yesikhathi. Indlela ephephe kunazo zonke ukufanisa amagama nekhasi lenyanga le-SRD elifanele kanye negayidi yesimo sokukhokha bese uhlola ukuthi isikhathi sishicilelwe, silindelwe, noma ingosi kuphela ngaphambi kokuba uthembele kuyo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwamagama lwedethi yokukhokha engu-370 ngokuvamile luzwakala sengathi kufanele kube nedethi eyodwa elula yomphakathi yawo wonke umuntu. Empeleni, inyanga, unyaka, ukunikezwa kwamagama, kanye nokuqinisekiswa okusemthethweni konke kunendaba, ikakhulukazi uma abantu bekopisha izinsuku kokuthunyelwe amadala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Umbuzo omfushane usengafihla imininingwane ebalulekile njengenyanga, unyaka, nokuthi isikhathi sesivele siwujuqu yini. Yingakho ikhasi lomhlahlandlela kufanele lehlise ukusesha kancane futhi lisize abasebenzisi baqinisekise ukuthi hlobo luni lolwazi lokukhokha abalubhekayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usesho lukhomba luphi uhlobo lwamagama.\n2. Qondanisa nekhasi elilungile lenyanga ye-SRD kanye nomhlahlandlela wesimo sokukhokha.\n3. Funda isimo sokukhokha futhi uqaphele, hhayi kuphela usuku olubonakalayo.\n4. Phatha iminyaka yengobo yomlando njengomongo wengobo yomlando kunesithembiso sokukhokha bukhoma.\n5. Sebenzisa iziteshi ezisemthethweni uma udinga isiqinisekiso sokugcina esiqondene ngqo necala."
      },
      {
        "title": "Ungacabanga kanjani ngamagama",
        "body": "Umkhuba ophephile ukufunda amagama osuku lokukhokha njengomhlahlandlela, hhayi njengesiqinisekiso. Idethi ngokwayo ayiyona incazelo ephelele yekhasi lokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nekhasi lokukhokha elisemthethweni. Kuyasiza ukuchaza amagama nesikhathi ngokuphepha kuyilapho ushiyela izenzo ezisemthethweni eziteshini ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusesheni okubanzi kwedethi yokukhokha ungene enyangeni ngqo, uhlobo lwesibonelelo, noma umhlahlandlela wesimo owenza amagama aqondeke kalula."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r370-status-safely\n• /guides/what-payment-released-means\n• /guides/what-payment-pending-means\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe amagama edethi yokukhokha engu-370 ahlala ekhomba usuku olulodwa lomphakathi?",
        "body": "Cha. Impendulo efanele isengancika enyangeni, emazwini esibonelelo, kanye nokuthi isikhathi sesivele siqinisekisiwe ngokusemthethweni yini."
      },
      {
        "title": "I-FAQ: Kungani okuthunyelwe ngedethi yokukhokha okukopishiwe kudala ukudideka okungaka?",
        "body": "Ngoba idethi ingabonakala ikholeka ngisho nalapho inyanga, unyaka, noma inothi lokukhokha lingekho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokwethemba ikhasi ledethi yokukhokha?",
        "body": "Hlola inyanga, unyaka, isigaba sesibonelelo, nesimo sokukhokha ndawonye ngaphambi kokuthi uphathe isikhathi njengokugcina."
      }
    ]
  },
  "sassa-old-age-grant-pay-date": {
    "title": "SASSA usuku lokukhokhela isibonelelo sikahulumeni sabadala",
    "summary": "Umhlahlandlela wokuseshwa kwezinsuku zokukhokhelwa kwesibonelelo sikahulumeni kwa-sassa, ochaza ukuthi amagama abantu abadala ngokuvamile adweba kanjani isibonelelo sikahulumeni kanye nendlela yokufunda isikhathi sokukhokha ngokuphepha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuseshwa kwedethi yokukhokha yesibonelelo sikahulumeni sabadala ngokuvamile kusho ukuthi umsebenzisi ufuna ukunikeza abantu abadala isikhathi ngamagama ajwayelekile. Ezimweni eziningi, ukusesha kukhomba isikhathi sokunikezwa kwabantu abadala, ngakho-ke isinyathelo esilandelayo esiphephe kakhulu ukufanisa amagama namakhasi okukhokha ezibonelelo zabantu abadala bese ufunda inothi lokukhokha ngokucophelela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basasesha ngamagama asebekhulile noma empesheni ngisho nalapho amakhasi amasha esebenzisa amagama anikezwa abantu abadala. Lokho akusho ngokuvamile isibonelelo esihlukile. Ngokuvamile kusho ukuthi isigaba esifanayo sesibonelelo sichazwa ngamagama ajwayelekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma amagama abantu abadala athathwa njengesibonelelo esihlukile, abasebenzisi bangaphuthelwa yikhasi langempela abalidingayo. Uma amagama esefaniswe kahle, abasebenzisi ngokuvamile bangasuka ekusesheni kwabadala baye enyangeni elungile noma ikhasi lengobo yomlando elinokudideka okuncane kakhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha amagama abantu abadala noma impesheni njengokusesha isikhathi sezibonelelo zabantu abadala.\n2. Vula amakhasi okukhokha ezibonelelo zabantu abadala.\n3. Hlolani inyanga, unyaka, nesimo sokukhokha ndawonye.\n4. Funda inothi eceleni kosuku, hhayi usuku uqobo lwalo kuphela.\n5. Sebenzisa umzila osemthethweni lapho icala lakho lisadinga ukuqinisekiswa kokugcina."
      },
      {
        "title": "Amagama abantu abadala kanye namagama abantu abadala ngokuvamile ahlangana ekhasini elifanayo",
        "body": "Amagama okusesha angashintsha ukusuka kumuntu kuye komunye, kodwa umkhuba wokufunda ophephe kakhulu uhlala unjalo: qinisekisa isigaba sesibonelelo, bese uqinisekisa inyanga, bese uqinisekisa isimo sokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Kuyasiza ukuhumusha amagama abantu abadala abe yindlela efanele yosizo lwesibonelelo, kodwa akuyona isevisi yokukhokha yesibonelelo sikahulumeni esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emazwini okusesha ajwayelekile uye kumhlahlandlela ofanele wedethi yokukhokha, ikhasi lesibonelelo, noma inketho yesikhumbuzi ngaphandle kokwenza ikhasi lizwakale ngokusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/older-persons\n• /guides/older-persons-grant-payment-dates-2025\n• /guides/older-persons-grant-payment-dates-january-2026\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama emali yesibonelelo sabadala ahlukile kwabadala anikeza amagama?",
        "body": "Abantu bavame ukusebenzisa amagama ngendlela ehlukile, kodwa ngokuvamile asho isigaba sesibonelelo esifanayo ekusesheni."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembele ezithombeni-skrini ezindala zezinsuku zokukhokha zabantu abadala?",
        "body": "Cha. Kuphephe kakhudlwana ukuphatha izithombe ezindala njengomongo wengobo yomlando futhi uqinisekise inyanga yamanje ngokuhlukene."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa usuku lwami lokukhokha olusemthethweni?",
        "body": "Cha. I-GrantCare ichaza amagama nesikhathi, kodwa ukuqinisekiswa okusemthethweni kusesesiteshini sikahulumeni esifanele."
      }
    ]
  },
  "sassa-payment-date-for-old-age": {
    "title": "SASSA usuku lokukhokha lokuguga",
    "summary": "Umhlahlandlela wedethi yokukhokha yakwa-sassa yokusesha kwabadala, echaza ukuthi amagama abantu abadala ngokuvamile adweba kanjani imali yesibonelelo sikahulumeni kanye nendlela yokufunda isikhathi sokukhokha ngokuphepha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuseshwa kwedethi yokukhokha yabantu abadala ngokuvamile kusho ukuthi umsebenzisi ufuna isinyathelo esilandelayo esicacile sabantu abadala abanikeza isikhathi. Ezimweni eziningi, ukusesha kukhomba isikhathi sokunikezwa kwabantu abadala, ngakho isinyathelo esilandelayo esiphephe kakhulu ukufanisa amagama nekhasi lenyanga yamanje ukuze uthole ukwesekwa kwabantu asebekhulile bese ufunda inothi lokukhokha ngokucophelela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basasesha ngamagama asebekhulile noma empesheni ngisho nalapho amakhasi amasha esebenzisa amagama anikezwa abantu abadala. Lokho akusho ngokuvamile isibonelelo esihlukile. Ngokuvamile kusho ukuthi isigaba esifanayo sesibonelelo sichazwa ngamagama ajwayelekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Usesho olulodwa olubanzi lwabadala lusengakhomba ezinyangeni ezihlukene, ngakho unyaka nenyanga kufanele zihlale zihlolwa ngaphambi kokuthi idethi ithenjwe. Uma amagama esefaniswe kahle, abasebenzisi ngokuvamile bangasuka ekusesheni kwabadala baye enyangeni elungile noma ikhasi lengobo yomlando elinokudideka okuncane kakhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha amagama abantu abadala noma impesheni njengokusesha isikhathi sezibonelelo zabantu abadala.\n2. Vula ikhasi lenyanga yamanje ukuze uthole ukwesekwa kwabantu abadala.\n3. Hlolani inyanga, unyaka, nesimo sokukhokha ndawonye.\n4. Funda inothi eceleni kosuku, hhayi usuku uqobo lwalo kuphela.\n5. Sebenzisa umzila osemthethweni lapho icala lakho lisadinga ukuqinisekiswa kokugcina."
      },
      {
        "title": "Amagama abantu abadala kanye namagama abantu abadala ngokuvamile ahlangana ekhasini elifanayo",
        "body": "Amagama okusesha angashintsha ukusuka kumuntu kuye komunye, kodwa umkhuba wokufunda ophephe kakhulu uhlala unjalo: qinisekisa isigaba sesibonelelo, bese uqinisekisa inyanga, bese uqinisekisa isimo sokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Kuyasiza ukuhumusha amagama abantu abadala abe yindlela efanele yosizo lwesibonelelo, kodwa akuyona isevisi yokukhokha yesibonelelo sikahulumeni esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emazwini okusesha ajwayelekile uye kumhlahlandlela ofanele wedethi yokukhokha, ikhasi lesibonelelo, noma inketho yesikhumbuzi ngaphandle kokwenza ikhasi lizwakale ngokusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2026\n• /guides/older-persons-grant-payment-dates-february-2026\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama emali yesibonelelo sabadala ahlukile kwabadala anikeza amagama?",
        "body": "Abantu bavame ukusebenzisa amagama ngendlela ehlukile, kodwa ngokuvamile asho isigaba sesibonelelo esifanayo ekusesheni."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembele ezithombeni-skrini ezindala zezinsuku zokukhokha zabantu abadala?",
        "body": "Cha. Kuphephe kakhudlwana ukuphatha izithombe ezindala njengomongo wengobo yomlando futhi uqinisekise inyanga yamanje ngokuhlukene."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa usuku lwami lokukhokha olusemthethweni?",
        "body": "Cha. I-GrantCare ichaza amagama nesikhathi, kodwa ukuqinisekiswa okusemthethweni kusesesiteshini sikahulumeni esifanele."
      }
    ]
  },
  "sassa-old-age-pension-2025": {
    "title": "SASSA impesheni yabadala 2025",
    "summary": "Umhlahlandlela wokuseshwa kwempesheni yabadala kwa-sassa ka-2025, echaza ukuthi amagama abantu abadala ajwayele ukumela isibonelelo sabadala kanye nendlela yokufunda isikhathi sokukhokha ngokuphepha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuseshwa kwempesheni yabadala ka-2025 kuvame ukukhomba ekuhloleni ukugcinwa kwengobo yomlando isikhathi sezibonelelo zabantu abadala. Ezimweni eziningi, ukusesha kukhomba isikhathi sokunikezwa kwabantu abadala, ngakho-ke isinyathelo esilandelayo esiphephe kakhulu ukufanisa amagama neziqondiso zengobo yomlando zika-2025 zezikhathi zezibonelelo zabantu abadala bese ufunda inothi lokukhokha ngokucophelela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basasesha ngamagama asebekhulile noma empesheni ngisho nalapho amakhasi amasha esebenzisa amagama anikezwa abantu abadala. Lokho akusho ngokuvamile isibonelelo esihlukile. Ngokuvamile kusho ukuthi isigaba esifanayo sesibonelelo sichazwa ngamagama ajwayelekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Usesho lonyaka wengobo yomlando luwusizo kuphela uma abasebenzisi baqonda ukuthi amadethi ka-2025 awafani nokuhlela ukukhokha kwamanje. Uma amagama esefaniswe kahle, abasebenzisi ngokuvamile bangasuka ekusesheni kwabadala baye enyangeni elungile noma ikhasi lengobo yomlando elinokudideka okuncane kakhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Phatha amagama abantu abadala noma impesheni njengokusesha isikhathi sezibonelelo zabantu abadala.\n2. Vula imihlahlandlela yengobo yomlando yango-2025 yabantu abadala abanikeza isikhathi.\n3. Hlolani inyanga, unyaka, nesimo sokukhokha ndawonye.\n4. Funda inothi eceleni kosuku, hhayi usuku uqobo lwalo kuphela.\n5. Sebenzisa umzila osemthethweni lapho icala lakho lisadinga ukuqinisekiswa kokugcina."
      },
      {
        "title": "Amagama abantu abadala kanye namagama abantu abadala ngokuvamile ahlangana ekhasini elifanayo",
        "body": "Amagama okusesha angashintsha ukusuka kumuntu kuye komunye, kodwa umkhuba wokufunda ophephe kakhulu uhlala unjalo: qinisekisa isigaba sesibonelelo, bese uqinisekisa inyanga, bese uqinisekisa isimo sokukhokha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Kuyasiza ukuhumusha amagama abantu abadala abe yindlela efanele yosizo lwesibonelelo, kodwa akuyona isevisi yokukhokha yesibonelelo sikahulumeni esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza usuke emazwini okusesha ajwayelekile uye kumhlahlandlela ofanele wedethi yokukhokha, ikhasi lesibonelelo, noma inketho yesikhumbuzi ngaphandle kokwenza ikhasi lizwakale ngokusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/older-persons-grant-payment-dates-2025\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe amagama emali yesibonelelo sabadala ahlukile kwabadala anikeza amagama?",
        "body": "Abantu bavame ukusebenzisa amagama ngendlela ehlukile, kodwa ngokuvamile asho isigaba sesibonelelo esifanayo ekusesheni."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembele ezithombeni-skrini ezindala zezinsuku zokukhokha zabantu abadala?",
        "body": "Cha. Kuphephe kakhudlwana ukuphatha izithombe ezindala njengomongo wengobo yomlando futhi uqinisekise inyanga yamanje ngokuhlukene."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa usuku lwami lokukhokha olusemthethweni?",
        "body": "Cha. I-GrantCare ichaza amagama nesikhathi, kodwa ukuqinisekiswa okusemthethweni kusesesiteshini sikahulumeni esifanele."
      }
    ]
  }
};

function withZuTranslations<
  T extends {
    slug: string;
    title: string;
    summary: string;
    sections: Array<{ title: string; body: string }>;
    translations?: Record<string, unknown>;
  },
>(guide: T, translation: GuideTranslation) {
  return {
    ...guide,
    translations: {
      ...(guide.translations ?? {}),
      zu: translation,
    },
  };
}

export const SEO_BATCH_SIXTEEN_GUIDES = SEO_BATCH_SIXTEEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
