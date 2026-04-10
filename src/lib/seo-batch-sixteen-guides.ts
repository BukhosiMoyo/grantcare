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
    title: "SASSA 350 payment date",
    searchAngle:
      "A shorthand 350 payment-date search usually means the user wants the simplest possible wording for the current cycle.",
    subjectLabel: "350 payment date wording",
    timingFocus: "the current social-relief payment page",
    caution:
      "Shorter wording can make users trust whichever date they see first, even when the page still needs context.",
    relatedLinks: [
      "/guides/how-to-understand-payment-dates",
      "/guides/approved-but-no-payment",
      "/guides/how-to-check-payment-readiness-for-r350-support",
      "/payment-dates",
    ],
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

export const SEO_BATCH_SIXTEEN_GUIDES = [
  ...statusTimingVariants.map(statusTimingGuide),
  ...paymentPhraseVariants.map(paymentPhraseGuide),
  ...oldAgeVariants.map(oldAgeGuide),
];
