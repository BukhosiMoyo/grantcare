import { addSetswanaTranslations } from "./generated-guide-translations";

const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

const MONTH_LABELS = {
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
} as const;

const MONTH_NOTES = {
  january:
    "January searches usually come from users checking the first payment window of the year or trying to verify whether a copied image is still current.",
  february:
    "February payment-date searches often sit close to month-end planning, so users need help separating fresh timing from recycled posts.",
  march:
    "March payment-date searches usually come from users comparing an older month with a newer cycle or checking whether a shared date still applies.",
  april:
    "April payment-date searches often rise around budget planning, which makes clear payment-state labels more important than copied dates.",
  may:
    "May payment-date searches often carry urgency because users want certainty before the month settles, even when some timing may still be expected rather than final.",
  june:
    "June payment-date searches usually sit in a mid-year planning period where archive checks and current planning can easily get mixed together.",
  july:
    "July payment-date searches often come from users comparing one winter payment cycle with another, which makes month and year labels especially important.",
  august:
    "August payment-date searches often pick up around repeated checking and rumours, so clear labels help users stay calmer.",
  september:
    "September payment-date searches usually come from users who are trying to verify timing before a new month cycle is fully settled.",
  october:
    "October payment-date searches often create confusion when older screenshots keep circulating alongside newer published information.",
  november:
    "November payment-date searches usually carry year-end pressure, which makes it easier for copied date claims to spread without enough context.",
  december:
    "December payment-date searches are especially sensitive because users want stronger timing certainty before the end of the year.",
} as const;

type MonthSlug = keyof typeof MONTH_LABELS;

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
  related: string;
  faqs: Array<{ question: string; answer: string }>;
  sortOrder: number;
};

function guide({
  slug,
  title,
  summary,
  quickAnswer,
  whatThisMeans,
  whyThisMatters,
  steps,
  keyFocusTitle = "How to read the page well",
  keyFocus,
  important,
  help,
  related,
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
      section("Related help", related),
      ...faqs.map((item) => faq(item.question, item.answer)),
    ],
    featured: false,
    sponsored: false,
    sortOrder,
  };
}

function archiveMonthGuide(month: MonthSlug, sortOrder: number) {
  const label = MONTH_LABELS[month];
  const note = MONTH_NOTES[month];

  return guide({
    slug: `payment-dates-${month}-2025`,
    title: `Payment dates ${label} 2025`,
    summary:
      `An archive-style ${label} 2025 payment-date guide that helps users verify older dates safely and avoid treating old month pages like current official schedules.`,
    quickAnswer:
      `For ${label} 2025 payment dates, treat the page as a historical guide rather than a current promise. The safest use is to verify older screenshots, compare past timing, and avoid mixing archived dates with current-month planning.`,
    whatThisMeans:
      `${note} A ${label} 2025 page is most useful when it helps users understand what applied to that older month without pretending that the same timing still applies now.`,
    whyThisMatters:
      `Archived payment dates are often reused in messages and screenshots long after the month has passed. That is why the month, year, grant category, and payment note all matter when users search for older payment cycles.`,
    steps:
      `1. Open the ${label.toLowerCase()} 2025 payment page.\n2. Match the date to the correct grant category.\n3. Read the payment note and state, not only the date.\n4. Treat the page as archive context rather than a live schedule.\n5. Use current payment pages or official routes if you need a present-day confirmation instead of a historical check.`,
    keyFocus:
      `A ${label} 2025 payment page is safest when used as context. It helps users check what a shared date used to mean, not what the current month will necessarily do now.`,
    important:
      `GrantCare is an independent information platform. It can organise archived ${label} 2025 timing clearly, but official current payment confirmation still belongs to the relevant government channel.`,
    help:
      `GrantCare can help users compare ${label} 2025 with later cycles, understand payment-state wording, and move from archive checking into safer current-month planning.`,
    related:
      `Useful next pages:\n• /payment-dates/2025/${month}\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates`,
    faqs: [
      {
        question: `Should I use ${label} 2025 dates for current planning?`,
        answer: "No. It is safer to treat them as archive context unless you are specifically checking an older month.",
      },
      {
        question: `Why do people still search ${label} 2025 payment dates?`,
        answer: "Often to verify old screenshots, compare earlier cycles, or check whether a copied date is being reused out of context.",
      },
      {
        question: `What matters most on an archive page?`,
        answer: "The month, year, grant type, and payment note matter more than the date alone.",
      },
    ],
    sortOrder,
  });
}

function early2026MonthGuide(month: "january" | "february" | "march", sortOrder: number) {
  const label = MONTH_LABELS[month];
  const note = MONTH_NOTES[month];

  return guide({
    slug: `payment-dates-${month}-2026`,
    title: `Payment dates ${label} 2026`,
    summary:
      `A ${label} 2026 payment-date guide that helps users read the month safely, separate expected dates from published ones, and plan without relying on copied rumours.`,
    quickAnswer:
      `For ${label} 2026 payment dates, start with the month page, then check the grant category and the payment state together. A date marked expected is not the same as a date marked officially published.`,
    whatThisMeans:
      `${note} The safest way to use the ${label} 2026 page is to read the payment note together with the date so you know whether the timing is already confirmed or still only guidance.`,
    whyThisMatters:
      `Users often see one date and assume it fits every grant category. In practice, regular grants, grouped children’s grants, and SRD-style support can appear with different timing notes or different levels of certainty.`,
    steps:
      `1. Open the ${label.toLowerCase()} 2026 payment page.\n2. Find the correct grant category.\n3. Check whether the timing is published, expected, or portal-based.\n4. Read the note beside the date carefully.\n5. Use the official route when the page still shows uncertainty or when final confirmation matters most.`,
    keyFocus:
      `A good ${label} 2026 payment page should feel like a guide to the month, not a promise without context. The note and the grant category matter as much as the visible date.`,
    important:
      `GrantCare helps organise ${label} 2026 timing clearly, but final official payment confirmation still belongs to the relevant government channel when the page shows caution or change.`,
    help:
      `GrantCare can help users compare early-2026 timing, understand payment states, and move to the next guide if the page still points to delay, portal-only, or missing-payment wording.`,
    related:
      `Useful next pages:\n• /payment-dates/2026/${month}\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates`,
    faqs: [
      {
        question: `Are all ${label} 2026 payment dates final?`,
        answer: "Not always. Some may still be expected or tied to another note rather than fully published.",
      },
      {
        question: `Why should I read the note beside the ${label} date?`,
        answer: "Because the note usually tells you how safe it is to treat the visible date as final.",
      },
      {
        question: `Should I still confirm ${label} 2026 timing officially?`,
        answer: "Yes, especially when the page still shows expected or portal-style wording.",
      },
    ],
    sortOrder,
  });
}

function yearOverviewGuide(year: 2025, sortOrder: number) {
  return guide({
    slug: `payment-dates-${year}`,
    title: `Payment dates ${year}`,
    summary:
      `A year-overview guide for ${year} payment-date searches, written to help users verify archive months safely and avoid mixing older payment cycles with current planning.`,
    quickAnswer:
      `For ${year} payment dates, use the year page as an archive guide. It is most useful when you need to compare older months, verify a shared date, or check whether a payment screenshot is being reused out of context.`,
    whatThisMeans:
      `${year} payment-date searches often come from users who are looking backward rather than forward. That makes the page especially useful for archive checking, historical comparison, and rumour control rather than live planning.`,
    whyThisMatters:
      `An older year can still circulate heavily in screenshots, PDFs, and social posts. Without a clear archive-style guide, users can easily confuse a past schedule with a current one.`,
    steps:
      `1. Open the ${year} year page.\n2. Move to the specific month you need.\n3. Match the timing to the correct grant category.\n4. Read the note and payment state, not only the date.\n5. Use current pages or official routes if you need present-day confirmation instead of archive context.`,
    keyFocusTitle: "A year archive should reduce confusion, not create it",
    keyFocus:
      `A strong ${year} overview page helps users verify what applied to earlier months without letting those older dates bleed into current-month planning.`,
    important:
      "GrantCare is independent and should not be mistaken for an official archive. It helps users read older payment cycles safely while keeping official confirmation separate.",
    help:
      "GrantCare can help users compare archived and current payment cycles, understand why old dates keep circulating, and move from year-overview searches into the exact month guide they need.",
    related:
      `Useful next pages:\n• /guides/payment-dates-2025-to-2026\n• /payment-dates/${year}/january\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates`,
    faqs: [
      {
        question: `Why do people still search ${year} payment dates?`,
        answer: "Usually to check older screenshots, compare payment cycles, or verify whether a reused date is stale.",
      },
      {
        question: `Should I use ${year} dates for current planning?`,
        answer: "No. It is safer to use them only as archive context unless you are checking an older payment period.",
      },
      {
        question: "What should I check inside the year page?",
        answer: "Check the specific month, the grant category, and the payment note together.",
      },
    ],
    sortOrder,
  });
}

function yearBridgeGuide(sortOrder: number) {
  return guide({
    slug: "payment-dates-2025-to-2026",
    title: "Payment dates 2025 to 2026",
    summary:
      "A cross-year guide that helps users compare 2025 and 2026 payment-date searches without mixing archived months with current or upcoming ones.",
    quickAnswer:
      "Use a 2025 to 2026 payment-date guide to separate archived months from current planning. The safest habit is to check the year first, then the month, then the grant type and payment note.",
    whatThisMeans:
      "Cross-year payment-date searches often happen when users compare an older screenshot with a newer schedule or try to see whether a shared date still applies in a later year.",
    whyThisMatters:
      "A date can look believable simply because the month name matches. Without the year and payment note, users can easily trust timing that belongs to the wrong cycle.",
    steps:
      "1. Check the year before you trust the month.\n2. Move from the year into the correct month page.\n3. Match the date to the correct grant category.\n4. Read the payment note and state carefully.\n5. Use official current routes when you need final live confirmation instead of archive comparison.",
    keyFocusTitle: "The year is part of the payment date, not extra detail",
    keyFocus:
      "Cross-year confusion often starts when users treat the month as the only important part of the schedule. The year is not a small detail. It is part of the meaning of the date itself.",
    important:
      "GrantCare helps users compare archived and current payment cycles clearly, but official live payment confirmation still belongs to the relevant government channel.",
    help:
      "GrantCare can help users move from broad 2025-to-2026 searches into the exact month, grant, and payment-state pages that make the date easier to read safely.",
    related:
      "Useful next pages:\n• /guides/payment-dates-2025\n• /guides/payment-dates-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates",
    faqs: [
      {
        question: "Why do 2025-to-2026 payment searches create confusion?",
        answer: "Because users often compare older screenshots with newer schedules and overlook the year difference.",
      },
      {
        question: "What should I check first in a cross-year search?",
        answer: "Check the year first, then the month and grant type.",
      },
      {
        question: "What if a shared date looks familiar but the year is unclear?",
        answer: "Treat it as uncertain until you confirm the year and the payment note on the correct page.",
      },
    ],
    sortOrder,
  });
}

function grantYearOverviewGuide({
  slug,
  title,
  year,
  routePath,
  shortLabel,
  supportNote,
  sortOrder,
}: {
  slug: string;
  title: string;
  year: number;
  routePath: string;
  shortLabel: string;
  supportNote: string;
  sortOrder: number;
}) {
  return guide({
    slug,
    title,
    summary:
      `A year-overview guide for ${shortLabel.toLowerCase()} ${year} payment-date searches, written to help users compare months safely and avoid treating archive timing as current proof.`,
    quickAnswer:
      `For ${shortLabel.toLowerCase()} payment dates in ${year}, use the year page as a structured archive or year view rather than a single live promise. The safest approach is to compare the month, the payment note, and the official route together.`,
    whatThisMeans:
      `${supportNote} A ${year} year guide is most useful when users need to verify timing across several months without losing track of whether the page is archive-style or current-year planning.`,
    whyThisMatters:
      `${shortLabel} pages often get copied without the note that explains whether a date is published, expected, or still dependent on another route. A year overview helps users keep the full context in view.`,
    steps:
      `1. Open the ${year} year page for ${shortLabel.toLowerCase()} timing.\n2. Move to the month you need.\n3. Read the payment note and state beside the date.\n4. Treat archive months and current months differently.\n5. Use the relevant official route if the page still points to uncertainty or portal-based confirmation.`,
    keyFocusTitle: "A year page should help users compare months, not flatten them",
    keyFocus:
      `The safest way to use a ${shortLabel.toLowerCase()} ${year} guide is to treat each month as its own timing context rather than assuming one date style or one note fits the whole year.`,
    important:
      `GrantCare is independent and does not replace the official ${shortLabel.toLowerCase()} timing source. It helps users read the year more clearly while keeping final confirmation separate.`,
    help:
      `GrantCare can help users compare year-wide timing, move into the right month page, and understand whether the note points to a final date, a guidance date, or another official route.`,
    related:
      `Useful next pages:\n• ${routePath}\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates`,
    faqs: [
      {
        question: `Should I treat a ${year} ${shortLabel.toLowerCase()} page like one final schedule?`,
        answer: "No. It is safer to read each month and its note separately.",
      },
      {
        question: "Why does the payment note still matter on a year page?",
        answer: "Because the note explains how certain the date is and whether more official checking may still be needed.",
      },
      {
        question: "What should I do if I need current confirmation?",
        answer: "Move to the exact month page and then use the relevant official route if final confirmation still matters.",
      },
    ],
    sortOrder,
  });
}

function grantMonthGuide({
  slug,
  title,
  year,
  month,
  routePath,
  shortLabel,
  caution,
  relatedGuideSlug,
  relatedStatusPath,
  sortOrder,
}: {
  slug: string;
  title: string;
  year: number;
  month: MonthSlug;
  routePath: string;
  shortLabel: string;
  caution: string;
  relatedGuideSlug: string;
  relatedStatusPath: string;
  sortOrder: number;
}) {
  const label = MONTH_LABELS[month];
  const note = MONTH_NOTES[month];

  return guide({
    slug,
    title,
    summary:
      `A ${label} ${year} guide for ${shortLabel.toLowerCase()} payment timing, written to help users read the month safely and avoid trusting copied dates too quickly.`,
    quickAnswer:
      `For ${shortLabel.toLowerCase()} payment dates in ${label} ${year}, open the month page for that grant category and read the payment note together with the date. A published date is different from an expected or portal-based note.`,
    whatThisMeans:
      `${note} ${caution} The safest way to use the ${label} ${year} page is to match the exact grant category and then read the note before you build plans around the date.`,
    whyThisMatters:
      `Grant-specific payment pages are often shared without the surrounding context. That can make one date look more definite than it really is, especially when the note has been cropped away or ignored.`,
    steps:
      `1. Open the ${label.toLowerCase()} ${year} page for ${shortLabel.toLowerCase()} timing.\n2. Check whether the date is published, expected, or tied to another route.\n3. Read the note attached to the timing.\n4. Keep the month and year clear when comparing screenshots.\n5. Use the relevant official route if the note still points to uncertainty or a blocked payment issue.`,
    keyFocus:
      `A strong ${shortLabel.toLowerCase()} ${label.toLowerCase()} page is not only about the date. It is about the date, the note, and the grant type all agreeing before the user treats the timing as safe to plan around.`,
    important:
      `GrantCare helps users read ${shortLabel.toLowerCase()} timing clearly, but official final confirmation still belongs to the relevant government channel when the page shows caution or change.`,
    help:
      `GrantCare can help users compare ${shortLabel.toLowerCase()} timing with related payment, status, and reminder guides so they know what to read next if the page still feels uncertain.`,
    related:
      `Useful next pages:\n• ${routePath}\n• /guides/${relatedGuideSlug}\n• ${relatedStatusPath}\n• /guides/how-to-understand-payment-dates\n• /payment-dates`,
    faqs: [
      {
        question: `Does the ${label} ${year} ${shortLabel.toLowerCase()} page always show a final official date?`,
        answer: "Not always. Some months may still show expected or route-dependent timing rather than a fully published date.",
      },
      {
        question: `Why should I read the note next to the ${shortLabel.toLowerCase()} date?`,
        answer: "Because the note usually explains how certain the timing is and whether another official route still matters.",
      },
      {
        question: `What if another website shows the date with no note?`,
        answer: "Treat the official or structured page as more trustworthy than a copied date with no context attached.",
      },
    ],
    sortOrder,
  });
}

const archiveMonths: MonthSlug[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const early2026Months: Array<"january" | "february" | "march"> = [
  "january",
  "february",
  "march",
];

const archiveMonthGuides = archiveMonths.map((month, index) =>
  archiveMonthGuide(month, 326 + index),
);

const early2026Guides = early2026Months.map((month, index) =>
  early2026MonthGuide(month, 338 + index),
);

const srdEarly2026Guides = early2026Months.map((month, index) =>
  grantMonthGuide({
    slug: `srd-payment-dates-${month}-2026`,
    title: `SRD payment dates ${MONTH_LABELS[month]} 2026`,
    year: 2026,
    month,
    routePath: `/payment-dates/2026/${month}/social-relief`,
    shortLabel: "SRD",
    caution:
      "SRD timing can depend on portal-based updates and individual results more than some regular grant pages do.",
    relatedGuideSlug: "approved-but-no-payment",
    relatedStatusPath: "/status/payment-processing",
    sortOrder: 342 + index,
  }),
);

const olderEarly2026Guides = early2026Months.map((month, index) =>
  grantMonthGuide({
    slug: `older-persons-grant-payment-dates-${month}-2026`,
    title: `Older Persons Grant payment dates ${MONTH_LABELS[month]} 2026`,
    year: 2026,
    month,
    routePath: `/payment-dates/2026/${month}/older-persons`,
    shortLabel: "Older persons",
    caution:
      "Older persons grant timing is often searched heavily, which means copied month pages can spread quickly if the note is removed.",
    relatedGuideSlug: "how-to-know-if-your-payment-is-ready",
    relatedStatusPath: "/status/approved",
    sortOrder: 346 + index,
  }),
);

const disabilityLate2026Months: Array<
  "july" | "august" | "september" | "october" | "november"
> = ["july", "august", "september", "october", "november"];

const disabilityLate2026Guides = disabilityLate2026Months.map((month, index) =>
  grantMonthGuide({
    slug: `disability-grant-payment-dates-${month}-2026`,
    title: `Disability Grant payment dates ${MONTH_LABELS[month]} 2026`,
    year: 2026,
    month,
    routePath: `/payment-dates/2026/${month}/disability`,
    shortLabel: "Disability",
    caution:
      "Disability grant payment pages are most useful when they help users separate month-specific guidance from claims that look current but actually belong to another period.",
    relatedGuideSlug: "why-payment-is-delayed",
    relatedStatusPath: "/status/approved",
    sortOrder: 349 + index,
  }),
);

const SEO_BATCH_FIFTEEN_GUIDES_SOURCE = [
  yearBridgeGuide(324),
  yearOverviewGuide(2025, 325),
  ...archiveMonthGuides,
  ...early2026Guides,
  grantYearOverviewGuide({
    slug: "srd-payment-dates-2025",
    title: "SRD payment dates 2025",
    year: 2025,
    routePath: "/payment-dates/2025/january/social-relief",
    shortLabel: "SRD",
    supportNote:
      "SRD year searches often come from users trying to verify archive timing or compare a current portal result with an older public claim.",
    sortOrder: 341,
  }),
  ...srdEarly2026Guides,
  grantYearOverviewGuide({
    slug: "older-persons-grant-payment-dates-2025",
    title: "Older Persons Grant payment dates 2025",
    year: 2025,
    routePath: "/payment-dates/2025/january/older-persons",
    shortLabel: "Older persons",
    supportNote:
      "Older persons grant year searches often come from users checking whether an older pay date screenshot is still being shared as if it were current.",
    sortOrder: 345,
  }),
  ...olderEarly2026Guides,
  ...disabilityLate2026Guides,
];

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "payment-dates-2025-to-2026": {
    "title": "Izinsuku zokukhokha zika-2025 kuya ku-2026",
    "summary": "Umhlahlandlela weminyaka yonke osiza abasebenzisi ukuqhathanisa ukusesha kwedethi yokukhokha yango-2025 kanye no-2026 ngaphandle kokuhlanganisa izinyanga ezifakwe kungobo yomlando nezamanje noma ezizayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa umhlahlandlela wedethi yokukhokha yango-2025 ukuya ku-2026 ukuze uhlukanise izinyanga ezifakwe kungobo yomlando kusukela ekuhleleni kwamanje. Umkhuba ophephe kakhulu ukuhlola unyaka kuqala, emva kwalokho inyanga, bese kuba uhlobo lwesibonelelo sikahulumeni kanye nenothi lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha yeminyaka yonke kuvame ukwenzeka lapho abasebenzisi beqhathanisa isithombe-skrini esidala neshejuli entsha noma bezama ukubona ukuthi idethi eyabiwe isasebenza yini onyakeni olandelayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Idethi ingabukeka ikholeka ngoba nje igama lenyanga liyafana. Ngaphandle konyaka nenothi lokukhokha, abasebenzisi bangathembela kalula isikhathi esingesomjikelezo ongalungile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola unyaka ngaphambi kokuthi uyethembe inyanga.\n2. Suka onyakeni uye ekhasini elifanele lenyanga.\n3. Qondanisa usuku nesigaba esifanele sesibonelelo.\n4. Funda inothi lokukhokha bese usho kahle.\n5. Sebenzisa imizila yamanje esemthethweni uma udinga isiqinisekiso sokugcina esibukhoma esikhundleni sokuqhathanisa ingobo yomlando."
      },
      {
        "title": "Unyaka uyingxenye yedethi yokukhokha, hhayi imininingwane eyengeziwe",
        "body": "Ukudideka kweminyaka kuvame ukuqala lapho abasebenzisi bephatha inyanga njengengxenye ebalulekile kuphela yeshejuli. Unyaka akuyona imininingwane encane. Iyingxenye yencazelo yedethi ngokwayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi baqhathanise umjikelezo wokukhokha ofakwe kungobo yomlando nowamanje, kodwa isiqinisekiso sokukhokha bukhoma esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukusuka ekusesheni okubanzi kuka-2025-kuya ku-2026 baye enyangeni ngqo, amakhasi esibonelelo, kanye nezimo zokukhokha enza idethi ifundeke kalula ngokuphepha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2025\n• /guides/payment-dates-2026\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwenkokhelo ka-2025-to-2026 kudala ukudideka?",
        "body": "Ngoba abasebenzisi bavame ukuqhathanisa izithombe-skrini ezindala namashejuli amasha futhi bashaye indiva umehluko wonyaka."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala ekusesheni konyaka?",
        "body": "Hlola unyaka kuqala, bese kuba yinyanga kanye nohlobo lwesibonelelo."
      },
      {
        "title": "I-FAQ: Kuthiwani uma usuku okwabiwe lubukeka lujwayelekile kodwa unyaka ungacacile?",
        "body": "Kuthathe njengokungaqinisekile uze uqinisekise unyaka kanye nephepha lenkokhelo ekhasini elifanele."
      }
    ]
  },
  "payment-dates-2025": {
    "title": "Izinsuku zokukhokha zango-2025",
    "summary": "Umhlahlandlela wokubuka konke wonyaka wokusesha kwedethi yokukhokha yango-2025, ebhalelwe ukusiza abasebenzisi ukuthi baqinisekise izinyanga zengobo yomlando ngokuphephile futhi bagweme ukuhlanganisa imijikelezo yokukhokha emidala nokuhlela kwamanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zango-2025, sebenzisa ikhasi lonyaka njengomhlahlandlela wokulondoloza umlando. Kuwusizo kakhulu uma udinga ukuqhathanisa izinyanga ezindala, uqinisekise idethi eyabiwe, noma uhlole ukuthi isithombe-skrini sokukhokha sisetshenziswa kabusha ngaphandle komongo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yango-2025 ngokuvamile luvela kubasebenzisi ababheke emuva kunokuya phambili. Lokho kwenza ikhasi lisebenziseke ikakhulukazi ekuhloleni ingobo yomlando, ukuqhathanisa komlando, nokulawula amahemuhemu esikhundleni sokuhlela bukhoma."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Unyaka omdala usengazungeza kakhulu kuzithombe-skrini, ama-PDF, nokuthunyelwe komphakathi. Ngaphandle komhlahlandlela ocacile wesitayela sengobo yomlando, abasebenzisi bangadida kalula ishejuli yangaphambilini neyamanje."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lonyaka ka-2025.\n2. Hambisa enyangeni ethile oyidingayo.\n3. Qondanisa isikhathi nesigaba esifanele sesibonelelo.\n4. Funda inothi nesimo sokukhokha, hhayi usuku kuphela.\n5. Sebenzisa amakhasi amanje noma imizila esemthethweni uma udinga ukuqinisekiswa kosuku lwamanje esikhundleni somongo wengobo yomlando."
      },
      {
        "title": "Ingobo yomlando yonyaka kufanele yehlise ukudideka, hhayi ukuyidala",
        "body": "Ikhasi eliqinile lokubuka konke lango-2025 lisiza abasebenzisi ukuthi baqinisekise ukuthi yini esebenze ezinyangeni zangaphambilini ngaphandle kokuvumela lezo zinsuku ezindala zingene ekuhlelweni kwenyanga yamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele kwenziwe iphutha nengobo yomlando esemthethweni. Isiza abasebenzisi ukuthi bafunde imijikelezo yokukhokha emidala ngokuphepha kuyilapho begcina ukuqinisekiswa okusemthethweni kuhlukene."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi baqhathanise imijikelezo yokukhokha efakwe kungobo yomlando neyamanje, baqonde ukuthi kungani amadethi amadala eqhubeka nokuzungeza, futhi basuke ekusesheni kohlolojikelele baye kumhlahlandlela wenyanga oqondile abawudingayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/payment-dates-2025-to-2026\n• /payment-dates/2025/january\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zika-2025?",
        "body": "Ngokuvamile ukuze uhlole izithombe-skrini ezindala, uqhathanise imijikelezo yokukhokha, noma uqinisekise ukuthi idethi ephinde yasetshenziswa isidala yini."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zika-2025 ezinhlelweni zamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwasebenzisa kuphela njengomongo wengobo yomlando ngaphandle kwalapho uhlola isikhathi sokukhokha esidala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphakathi kwekhasi lonyaka?",
        "body": "Hlola inyanga ethile, isigaba sesibonelelo, kanye nenothi lokukhokha ndawonye."
      }
    ]
  },
  "payment-dates-january-2025": {
    "title": "Izinsuku zokukhokha zikaJanuwari 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando kaJanuwari 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaJanuwari 2025, phatha ikhasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lukaJanuwari ngokuvamile luvela kubasebenzisi abahlola iwindi lokuqala lokukhokha lonyaka noma abazama ukuqinisekisa ukuthi isithombe esikopishiwe sisasebenza yini. Ikhasi likaJanuwari 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaJanuwari 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha likaJanuwari 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando sikaJanuwari 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uJanuwari 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/january\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaJanuwari 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaJanuwari 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-february-2025": {
    "title": "Izinsuku zokukhokha zikaFebhuwari 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando kaFebruwari 2025 esiza abasebenzisi ukuqinisekisa amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaFebhuwari 2025, phatha leli khasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kaFebhuwari kuvame ukuhlala eduze nokuhlelwa kokuphela kwenyanga, ngakho abasebenzisi badinga usizo lokuhlukanisa isikhathi esisha nokuthunyelwe okugaywe kabusha. Ikhasi langoFebruwari 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaFebruwari 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoFebhuwari 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando kaFebruwari 2025 ngokucacile, kodwa isiqinisekiso sokukhokha samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uFebruwari 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/february\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngisebenzise izinsuku zikaFebruwari 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zika-February 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-march-2025": {
    "title": "Izinsuku zokukhokha zikaMashi 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-March 2025 esiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zangoMashi 2025, phatha ikhasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha kaMashi ngokuvamile luvela kubasebenzisi abaqhathanisa inyanga endala nomjikelezo omusha noma ukuhlola ukuthi idethi okwabelwana ngayo isasebenza yini. Ikhasi langoMashi 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-March 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoMashi 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando ka-March 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uMashi 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/march\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zika-March 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaMashi 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-april-2025": {
    "title": "Izinsuku zokukhokha zika-Ephreli 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-April 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zango-April 2025, phatha ikhasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha ka-April kuvame ukukhuphuka mayelana nokuhlelwa kwesabelomali, okwenza amalebula acacile ezwe lokukhokha abaluleke kakhulu kunezinsuku ezikopishiwe. Ikhasi lango-April 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-April 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha lango-Ephreli 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando sika-April 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa u-April 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/april\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zika-April 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zika-April 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-may-2025": {
    "title": "Izinsuku zokukhokha zikaMeyi 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-Meyi 2025 esiza abasebenzisi ukuqinisekisa amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zangoMeyi 2025, phatha ikhasi njengegayidi yomlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kwangathi kuvame ukuphuthuma ngoba abasebenzisi bafuna isiqiniseko ngaphambi kokuba inyanga izinze, ngisho noma isikhathi esithile singase silindelwe kunokuba sibe esokugcina. Ikhasi langoMeyi 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaMeyi 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoMeyi 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando kaMeyi 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uMeyi 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/may\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaMeyi 2025 ezinhlelweni zamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zangoMeyi 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-june-2025": {
    "title": "Izinsuku zokukhokha zikaJuni 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando kaJuni 2025 esiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaJuni 2025, phatha ikhasi njengegayidi yomlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yangoJuni ngokuvamile luhlala esikhathini sokuhlela esimaphakathi nonyaka lapho amasheke wengobo yomlando kanye nokuhlelwa kwamanje kungahlanganiswa kalula. Ikhasi langoJuni 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaJuni 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoJuni 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando sikaJuni 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uJuni 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/june\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaJuni 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaJuni 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-july-2025": {
    "title": "Izinsuku zokukhokha zikaJulayi 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando kaJulayi 2025 esiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaJulayi 2025, phatha ikhasi njengegayidi yomlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yangoJulayi ngokuvamile luvela kubasebenzisi abaqhathanisa umjikelezo wokukhokha wasebusika owodwa nomunye, okwenza amalebula enyanga nonyaka abaluleke kakhulu. Ikhasi langoJulayi 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenze kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaJulayi 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoJulayi 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando kaJulayi 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uJulayi 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/july\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaJulayi 2025 ezinhlelweni zamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaJulayi 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-august-2025": {
    "title": "Izinsuku zokukhokha zika-Agasti 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-Agasti 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zika-Agasti 2025, phatha leli khasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha ka-Agasti kuvame ukuqala ekuhloleni okuphindaphindiwe namahemuhemu, ngakho amalebula acacile asiza abasebenzisi ukuthi bahlale bezolile. Ikhasi lango-Agasti 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-Agasti 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha lango-Agasti 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando ka-Agasti 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa u-Agasti 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/august\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zika-Agasti 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zika-Agasti 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-september-2025": {
    "title": "Izinsuku zokukhokha zikaSepthemba 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-Septhemba 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaSepthemba 2025, phatha leli khasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yangoSepthemba ngokuvamile luvela kubasebenzisi abazama ukuqinisekisa isikhathi ngaphambi kokuthi umjikelezo wenyanga entsha uxazululwe ngokugcwele. Ikhasi langoSepthemba 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-September 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoSepthemba 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando sango-Septhemba 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uSepthemba 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/september\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaSepthemba 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaSepthemba 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-october-2025": {
    "title": "Izinsuku zokukhokha zika-Okthoba 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-Okthoba 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zango-Okthoba 2025, phatha ikhasi njengomhlahlandlela womlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha yango-Okthoba kuvame ukudala ukudideka lapho izithombe-skrini ezindala ziqhubeka nokuzungeza kanye nolwazi olusha olushicilelwe. Ikhasi lango-Okthoba 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-Okthoba 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha lango-Okthoba 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando ka-Okthoba 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa u-Okthoba 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/october\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zika-Okthoba 2025 ezinhlelweni zamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zika-Okthoba 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-november-2025": {
    "title": "Izinsuku zokukhokha zikaNovemba 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando kaNovemba 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zangoNovemba 2025, phatha ikhasi njengegayidi yomlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha yangoNovemba kuvame ukuba nengcindezi yokuphela konyaka, okwenza kube lula ukuthi izimangalo zedethi ekopishiwe zisabalale ngaphandle komongo owanele. Ikhasi langoNovemba 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likanovember 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha langoNovemba 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando kaNovemba 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uNovemba 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/november\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaNovemba 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaNovemba 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-december-2025": {
    "title": "Izinsuku zokukhokha zikaDisemba 2025",
    "summary": "Umhlahlandlela wedethi yokukhokha wesitayela sengobo yomlando ka-December 2025 osiza abasebenzisi ukuthi baqinisekise amadethi amadala ngokuphephile futhi bagweme ukuphatha amakhasi enyanga endala njengamashejuli asemthethweni amanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaDisemba 2025, phatha ikhasi njengegayidi yomlando kunesithembiso samanje. Ukusetshenziswa okuphephe kakhulu ukuqinisekisa izithombe-skrini ezindala, ukuqhathanisa isikhathi esedlule, nokugwema ukuhlanganisa amadethi afakwe kungobo yomlando nokuhlela kwenyanga yamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kaDisemba kuzwela kakhulu ngoba abasebenzisi bafuna isiqiniseko sesikhathi esiqinile ngaphambi kokuphela konyaka. Ikhasi langoDisemba 2025 liwusizo kakhulu uma lisiza abasebenzisi ukuthi baqonde ukuthi yini esebenza kuleyo nyanga endala ngaphandle kokwenza sengathi isikhathi esifanayo sisasebenza manje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi okukhokha afakwe kungobo yomlando avame ukusetshenziswa kabusha emilayezweni nasezithombeni-skrini isikhathi eside ngemva kokuba inyanga isidlulile. Kungakho inyanga, unyaka, isigaba sesibonelelo, kanye nenothi lokukhokha kubalulekile lapho abasebenzisi besesha imijikelezo yokukhokha emidala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaDisemba 2025.\n2. Qondanisa usuku nesigaba esifanele sesibonelelo.\n3. Funda inothi lokukhokha futhi usho, hhayi usuku kuphela.\n4. Phatha ikhasi njengomongo wengobo yomlando kuneshejuli ebukhoma.\n5. Sebenzisa amakhasi okukhokha amanje noma imizila esemthethweni uma udinga isiqinisekiso sosuku lwamanje esikhundleni sesheke lomlando."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lokukhokha likaDisemba 2025 liphephe kakhulu uma lisetshenziswa njengomongo. Isiza abasebenzisi ukuthi bahlole ukuthi idethi eyabiwe ibisho ukuthini, hhayi ukuthi inyanga yamanje izokwenzani manje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ingakwazi ukuhlela isikhathi esifakwe kungobo yomlando kaDisemba 2025 ngokucacile, kodwa isiqinisekiso senkokhelo samanje esisemthethweni sisesesiteshini sikahulumeni esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa uDisemba 2025 nemijikelezo yakamuva, baqonde amagama esimo sokukhokha, futhi basuke ekuhloleni kungobo yomlando baye ekuhleleni kwenyanga yamanje ephephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/december\n• /guides/payment-dates-2025\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise izinsuku zikaDisemba 2025 ukuhlela kwamanje?",
        "body": "Cha. Kuphephe kakhudlwana ukuwaphatha njengomongo wengobo yomlando ngaphandle kwalapho uhlola inyanga endala."
      },
      {
        "title": "I-FAQ: Kungani abantu besasesha izinsuku zokukhokha zikaDisemba 2025?",
        "body": "Ngokuvamile ukuze uqinisekise izithombe-skrini ezindala, uqhathanise imijikelezo yangaphambili, noma uhlole ukuthi idethi ekopishiwe iphinda isetshenziswe ngaphandle komongo."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ekhasini lengobo yomlando?",
        "body": "Inyanga, unyaka, uhlobo lwesibonelelo, kanye nenothi lokukhokha kubaluleke ngaphezu kosuku lodwa."
      }
    ]
  },
  "payment-dates-january-2026": {
    "title": "Izinsuku zokukhokha zikaJanuwari 2026",
    "summary": "Umhlahlandlela wedethi yokukhokha yangoJanuwari 2026 osiza abasebenzisi ukuthi bafunde inyanga ngokuphepha, bahlukanise izinsuku ezilindelwe kwezishicilelwe, futhi bahlele ngaphandle kokuthembela emahlebezi akopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaJanuwari 2026, qala ngekhasi lenyanga, bese uhlola isigaba sesibonelelo kanye nesimo sokukhokha ndawonye. Idethi ephawulwe njengelindelekile ayifani nedethi ephawulwe ukuthi ishicilelwe ngokusemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lukaJanuwari ngokuvamile luvela kubasebenzisi abahlola iwindi lokuqala lokukhokha lonyaka noma abazama ukuqinisekisa ukuthi isithombe esikopishiwe sisasebenza yini. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaJanuwari 2026 iwukufunda inothi lokukhokha kanye nedethi ukuze wazi ukuthi isikhathi sesivele siqinisekisiwe yini noma kuseyisiqondiso kuphela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukubona idethi eyodwa futhi bacabange ukuthi ifanela zonke izigaba zesibonelelo. Empeleni, izibonelelo ezivamile, izibonelelo zezingane eziqoqwe, nokusekelwa kwesitayela se-SRD kungavela ngamanothi esikhathi ahlukene noma amazinga ahlukene okuqinisekisa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaJanuwari 2026.\n2. Thola isigaba esifanele sesibonelelo.\n3. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma sisekelwe kuphothali.\n4. Funda inothi eliseduze nosuku ngokucophelela.\n5. Sebenzisa umzila osemthethweni lapho ikhasi lisabonisa ukungaqiniseki noma lapho ukuqinisekiswa kokugcina kubaluleke kakhulu."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi elihle lokukhokha likaJanuwari 2026 kufanele lizizwe njengomhlahlandlela wenyanga, hhayi isithembiso esingenawo umongo. Inothi kanye nesigaba sesibonelelo sikahulumeni kubaluleke kakhulu njengedethi ebonakalayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza ukuhlela isikhathi sikaJanuwari 2026 ngokucacile, kodwa isiqinisekiso sokugcina senkokhelo esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sangaphambi kwesikhathi sika-2026, baqonde izimo zokukhokha, futhi baye kumhlahlandlela olandelayo uma ikhasi lisakhomba ukubambezeleka, ingosi kuphela, noma amagama okukhokha angekho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/january\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zokukhokha zikaJanuwari 2026 zigcina?",
        "body": "Hhayi njalo. Ezinye zingase zilindelwe noma ziboshwe kwelinye inothi kunokuba zishicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eceleni kosuku lukaJanuwari?",
        "body": "Ngoba inothi livame ukukutshela ukuthi kuphephe kangakanani ukuphatha usuku olubonakalayo njengolugcina."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi sikaJanuwari 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma ikhasi lisabonisa amagama alindelekile noma esitayela sephothali."
      }
    ]
  },
  "payment-dates-february-2026": {
    "title": "Izinsuku zokukhokha zikaFebhuwari 2026",
    "summary": "Umhlahlandlela wedethi yokukhokha wangoFebhuwari 2026 osiza abasebenzisi ukuthi bafunde inyanga ngokuphepha, bahlukanise izinsuku ezilindelwe kwezishicilelwe, futhi bahlele ngaphandle kokuthembela emahlebezi akopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaFebhuwari 2026, qala ngekhasi lenyanga, bese uhlola isigaba sesibonelelo kanye nesimo sokukhokha ndawonye. Idethi ephawulwe njengelindelekile ayifani nedethi ephawulwe ukuthi ishicilelwe ngokusemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kaFebhuwari kuvame ukuhlala eduze nokuhlelwa kokuphela kwenyanga, ngakho abasebenzisi badinga usizo lokuhlukanisa isikhathi esisha nokuthunyelwe okugaywe kabusha. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaFebruwari 2026 iwukufunda inothi lokukhokha kanye nedethi ukuze wazi ukuthi isikhathi sesiqinisekisiwe yini noma sisaqondiswa kuphela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukubona idethi eyodwa futhi bacabange ukuthi ifanela zonke izigaba zesibonelelo. Empeleni, izibonelelo ezivamile, izibonelelo zezingane eziqoqwe, nokusekelwa kwesitayela se-SRD kungavela ngamanothi esikhathi ahlukene noma amazinga ahlukene okuqinisekisa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha likaFebruwari 2026.\n2. Thola isigaba esifanele sesibonelelo.\n3. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma sisekelwe kuphothali.\n4. Funda inothi eliseduze nosuku ngokucophelela.\n5. Sebenzisa umzila osemthethweni lapho ikhasi lisabonisa ukungaqiniseki noma lapho ukuqinisekiswa kokugcina kubaluleke kakhulu."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi elihle lokukhokha likaFebhuwari 2026 kufanele lizizwe njengomhlahlandlela wenyanga, hhayi isithembiso esingenawo umongo. Inothi kanye nesigaba sesibonelelo sikahulumeni kubaluleke kakhulu njengedethi ebonakalayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza ukuhlela isikhathi sikaFebruwari 2026 ngokucacile, kodwa isiqinisekiso sokugcina senkokhelo esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sangaphambi kwesikhathi sika-2026, baqonde izimo zokukhokha, futhi baye kumhlahlandlela olandelayo uma ikhasi lisakhomba ukubambezeleka, ingosi kuphela, noma amagama okukhokha angekho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/february\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zokukhokha zango-February 2026 ziphelele?",
        "body": "Hhayi njalo. Ezinye zingase zilindelwe noma ziboshwe kwelinye inothi kunokuba zishicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eceleni kosuku lukaFebhuwari?",
        "body": "Ngoba inothi livame ukukutshela ukuthi kuphephe kangakanani ukuphatha usuku olubonakalayo njengolugcina."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi sika-February 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma ikhasi lisabonisa amagama alindelekile noma esitayela sephothali."
      }
    ]
  },
  "payment-dates-march-2026": {
    "title": "Izinsuku zokukhokha zikaMashi 2026",
    "summary": "Umhlahlandlela wedethi yokukhokha yangoMashi 2026 osiza abasebenzisi ukuthi bafunde inyanga ngokuphepha, bahlukanise izinsuku ezilindelwe kwezishicilelwe, futhi bahlele ngaphandle kokuthembela emahlebezi akopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zikaMashi 2026, qala ngekhasi lenyanga, bese uhlola isigaba sesibonelelo kanye nesimo sokukhokha ndawonye. Idethi ephawulwe njengelindelekile ayifani nedethi ephawulwe ukuthi ishicilelwe ngokusemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha kaMashi ngokuvamile luvela kubasebenzisi abaqhathanisa inyanga endala nomjikelezo omusha noma ukuhlola ukuthi idethi okwabelwana ngayo isasebenza yini. Indlela ephephe kunazo zonke yokusebenzisa ikhasi langoMashi 2026 iwukufunda inothi lokukhokha kanye nosuku ukuze wazi ukuthi isikhathi sesiqinisekisiwe yini noma sisaqondiswa kuphela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukubona idethi eyodwa futhi bacabange ukuthi ifanela zonke izigaba zesibonelelo. Empeleni, izibonelelo ezivamile, izibonelelo zezingane eziqoqwe, nokusekelwa kwesitayela se-SRD kungavela ngamanothi esikhathi ahlukene noma amazinga ahlukene okuqinisekisa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokukhokha lika-March 2026.\n2. Thola isigaba esifanele sesibonelelo.\n3. Hlola ukuthi isikhathi sishicilelwe, silindelwe, noma sisekelwe kuphothali.\n4. Funda inothi eliseduze nosuku ngokucophelela.\n5. Sebenzisa umzila osemthethweni lapho ikhasi lisabonisa ukungaqiniseki noma lapho ukuqinisekiswa kokugcina kubaluleke kakhulu."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi elihle lokukhokha langoMashi 2026 kufanele lizizwe njengomhlahlandlela wenyanga, hhayi isithembiso esingenawo umongo. Inothi kanye nesigaba sesibonelelo sikahulumeni kubaluleke kakhulu njengedethi ebonakalayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza ukuhlela isikhathi sangoMashi 2026 ngokucacile, kodwa isiqinisekiso sokugcina senkokhelo esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sangaphambi kwesikhathi sika-2026, baqonde izimo zokukhokha, futhi baye kumhlahlandlela olandelayo uma ikhasi lisakhomba ukubambezeleka, ingosi kuphela, noma amagama okukhokha angekho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/march\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zokukhokha zangoMashi 2026 ziphelele?",
        "body": "Hhayi njalo. Ezinye zingase zilindelwe noma ziboshwe kwelinye inothi kunokuba zishicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eceleni kosuku lukaMashi?",
        "body": "Ngoba inothi livame ukukutshela ukuthi kuphephe kangakanani ukuphatha usuku olubonakalayo njengolugcina."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise isikhathi sangoMashi 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma ikhasi lisabonisa amagama alindelekile noma esitayela sephothali."
      }
    ]
  },
  "srd-payment-dates-2025": {
    "title": "Izinsuku zokukhokha ze-SRD zango-2025",
    "summary": "Umhlahlandlela wokubuka wonke unyaka wokusesha kwedethi yokukhokha ye-srd 2025, ebhalelwe ukusiza abasebenzisi ukuqhathanisa izinyanga ngokuphepha futhi bagweme ukuphatha isikhathi sengobo yomlando njengobufakazi bamanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha ze-srd ngo-2025, sebenzisa ikhasi lonyaka njengengobo yomlando ehlelekile noma ukubuka konyaka kunesithembiso esisodwa esibukhoma. Indlela ephephe kakhulu ukuqhathanisa inyanga, inothi lokukhokha, kanye nomzila osemthethweni ndawonye."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha konyaka kwe-SRD kuvame ukuvela kubasebenzisi abazama ukuqinisekisa isikhathi sengobo yomlando noma ukuqhathanisa umphumela wamanje wephothali nesimangalo esidala esidlangalaleni. Umhlahlandlela wonyaka ka-2025 uwusizo kakhulu lapho abasebenzisi badinga ukuqinisekisa isikhathi phakathi nezinyanga ezimbalwa ngaphandle kokulahlekelwa ukuthi ikhasi liyisitayela sengobo yomlando noma ukuhlela konyaka wamanje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi we-SRD avame ukukopishwa ngaphandle kwenothi elichaza ukuthi idethi ishicilelwe, ilindelwe, noma isancike komunye umzila. Ukubuka konke konyaka kusiza abasebenzisi ukugcina umongo ogcwele ubuka."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lonyaka ka-2025 ukuze uthole isikhathi se-srd.\n2. Hambisa enyangeni oyidingayo.\n3. Funda inothi lokukhokha bese usho eceleni kosuku.\n4. Phatha izinyanga zengobo yomlando ngendlela ehlukile.\n5. Sebenzisa umzila osemthethweni ofanele uma ikhasi lisakhomba ukungaqiniseki noma ukuqinisekiswa okusekelwe kuphothali."
      },
      {
        "title": "Ikhasi lonyaka kufanele lisize abasebenzisi ukuqhathanisa izinyanga, hhayi ukuzenza caba",
        "body": "Indlela ephephe kunazo zonke yokusebenzisa umhlahlandlela we-srd 2025 ukuphatha inyanga ngayinye njengomongo wayo wesikhathi kunokuthatha isitayela sosuku olulodwa noma inothi elilodwa lilingana unyaka wonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi ayithathi indawo yomthombo wesikhathi we-srd osemthethweni. Isiza abasebenzisi ukuthi bafunde unyaka ngokucacile ngenkathi begcina ukuqinisekiswa kokugcina kuhlukene."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sonyaka wonke, baye ekhasini elilungile lenyanga, futhi baqonde ukuthi inothi likhomba idethi yokugcina, idethi yokuqondisa, noma omunye umzila osemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/january/social-relief\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiphathe ikhasi lika-2025 srd njengeshejuli eyodwa yokugcina?",
        "body": "Cha. Kuphephe kakhudlwana ukufunda inyanga ngayinye kanye nombhalo wayo ngokwehlukana."
      },
      {
        "title": "I-FAQ: Kungani inothi lokukhokha lisabalulekile ekhasini lonyaka?",
        "body": "Ngoba inothi lichaza ukuthi idethi iqinisekile kangakanani nokuthi kusengadingeka yini ukuhlola okusemthethweni okwengeziwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma ngidinga ukuqinisekiswa kwamanje?",
        "body": "Hambisa ekhasini lenyanga ngqo bese usebenzisa umzila osemthethweni ofanele uma ukuqinisekiswa kokugcina kusabalulekile."
      }
    ]
  },
  "srd-payment-dates-january-2026": {
    "title": "Izinsuku zokukhokha ze-SRD ngoJanuwari 2026",
    "summary": "Umhlahlandlela kaJanuwari 2026 wesikhathi sokukhokha se-srd, esibhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha ze-srd ngoJanuwari 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lukaJanuwari ngokuvamile luvela kubasebenzisi abahlola iwindi lokuqala lokukhokha lonyaka noma abazama ukuqinisekisa ukuthi isithombe esikopishiwe sisasebenza yini. Isikhathi se-SRD singancika kuzibuyekezo ezisuselwe kuphothali kanye nemiphumela yomuntu ngamunye ngaphezu kwamakhasi athile avamile esibonelelo. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaJanuwari 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaJanuwari 2026 ukuze uthole isikhathi se-srd.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi eliqinile le-srd january aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi se-srd ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi se-srd nenkokhelo ehlobene, isimo, nemihlahlandlela yesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/january/social-relief\n• /guides/approved-but-no-payment\n• /status/payment-processing\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi likaJanuwari 2026 srd lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze nosuku lwe-srd?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "srd-payment-dates-february-2026": {
    "title": "Izinsuku zokukhokha ze-SRD zikaFebhuwari 2026",
    "summary": "Umhlahlandlela wangoFebhuwari 2026 wesikhathi sokukhokha se-srd, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha ze-srd ngoFebhuwari 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kaFebhuwari kuvame ukuhlala eduze nokuhlelwa kokuphela kwenyanga, ngakho abasebenzisi badinga usizo lokuhlukanisa isikhathi esisha nokuthunyelwe okugaywe kabusha. Isikhathi se-SRD singancika kuzibuyekezo ezisuselwe kuphothali kanye nemiphumela yomuntu ngamunye ngaphezu kwamakhasi athile avamile esibonelelo. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaFebruwari 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaFebhuwari 2026 ukuze uthole isikhathi se-srd.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi eliqinile le-srd February aligcini ngokuphathelene nosuku. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi se-srd ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi se-srd nenkokhelo ehlobene, isimo, nemihlahlandlela yesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/february/social-relief\n• /guides/approved-but-no-payment\n• /status/payment-processing\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi likaFebhuwari 2026 srd lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze nosuku lwe-srd?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "srd-payment-dates-march-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Mashi 2026",
    "summary": "Umhlahlandlela wangoMashi 2026 wesikhathi sokukhokha se-srd, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha ze-srd ngoMashi 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha kaMashi ngokuvamile luvela kubasebenzisi abaqhathanisa inyanga endala nomjikelezo omusha noma ukuhlola ukuthi idethi okwabelwana ngayo isasebenza yini. Isikhathi se-SRD singancika kuzibuyekezo ezisuselwe kuphothali kanye nemiphumela yomuntu ngamunye ngaphezu kwamakhasi athile avamile esibonelelo. Indlela ephephe kunazo zonke yokusebenzisa ikhasi lika-March 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lika-March 2026 ukuze uthole isikhathi se-srd.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi eliqinile le-srd mashi aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi se-srd ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi se-srd nenkokhelo ehlobene, isimo, nemihlahlandlela yesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/march/social-relief\n• /guides/approved-but-no-payment\n• /status/payment-processing\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lika-March 2026 srd lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze nosuku lwe-srd?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "older-persons-grant-payment-dates-2025": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala zango-2025",
    "summary": "Umhlahlandlela wokubuka konke wonyaka wabantu abadala usesho lwedethi yokukhokha yango-2025, ebhalelwe ukusiza abasebenzisi ukuqhathanisa izinyanga ngokuphepha futhi bagweme ukuphatha isikhathi sengobo yomlando njengobufakazi bamanje.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabantu abadala ngo-2025, sebenzisa ikhasi lonyaka njengendawo yomlando ehlelekile noma ukubuka konyaka kunesithembiso esisodwa esibukhoma. Indlela ephephe kakhulu ukuqhathanisa inyanga, inothi lokukhokha, kanye nomzila osemthethweni ndawonye."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwabantu abadala ngonyaka kuvame ukuvela kubasebenzisi abahlola ukuthi isithombe-skrini sedethi yokuhola endala sisabiwa sengathi esamanje. Umhlahlandlela wonyaka ka-2025 uwusizo kakhulu lapho abasebenzisi badinga ukuqinisekisa isikhathi phakathi nezinyanga ezimbalwa ngaphandle kokulahlekelwa ukuthi ikhasi liyisitayela sengobo yomlando noma ukuhlela konyaka wamanje."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi abantu abadala avame ukukopishwa ngaphandle kwenothi elichaza ukuthi idethi iyashicilelwa, ilindelwe, noma isancike komunye umzila. Ukubuka konke konyaka kusiza abasebenzisi ukugcina umongo ogcwele ubuka."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lonyaka ka-2025 ukuze uthole isikhathi sabantu abadala.\n2. Hambisa enyangeni oyidingayo.\n3. Funda inothi lokukhokha bese usho eceleni kosuku.\n4. Phatha izinyanga zengobo yomlando ngendlela ehlukile.\n5. Sebenzisa umzila osemthethweni ofanele uma ikhasi lisakhomba ukungaqiniseki noma ukuqinisekiswa okusekelwe kuphothali."
      },
      {
        "title": "Ikhasi lonyaka kufanele lisize abasebenzisi ukuqhathanisa izinyanga, hhayi ukuzenza caba",
        "body": "Indlela ephephe kunazo zonke yokusebenzisa umhlahlandlela wabantu abadala 2025 ukuphatha inyanga ngayinye njengomongo wayo wesikhathi kunokuthatha isitayela sosuku olulodwa noma inothi elilodwa lilingana unyaka wonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi ayithathi indawo yomthombo wesikhathi wabadala osemthethweni. Isiza abasebenzisi ukuthi bafunde unyaka ngokucacile ngenkathi begcina ukuqinisekiswa kokugcina kuhlukene."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sonyaka wonke, baye ekhasini elilungile lenyanga, futhi baqonde ukuthi inothi likhomba idethi yokugcina, idethi yokuqondisa, noma omunye umzila osemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2025/january/older-persons\n• /guides/payment-dates-2025-to-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiphathe ikhasi labantu abadala lango-2025 njengeshejuli eyodwa yokugcina?",
        "body": "Cha. Kuphephe kakhudlwana ukufunda inyanga ngayinye kanye nombhalo wayo ngokwehlukana."
      },
      {
        "title": "I-FAQ: Kungani inothi lokukhokha lisabalulekile ekhasini lonyaka?",
        "body": "Ngoba inothi lichaza ukuthi idethi iqinisekile kangakanani nokuthi kusengadingeka yini ukuhlola okusemthethweni okwengeziwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma ngidinga ukuqinisekiswa kwamanje?",
        "body": "Hambisa ekhasini lenyanga ngqo bese usebenzisa umzila osemthethweni ofanele uma ukuqinisekiswa kokugcina kusabalulekile."
      }
    ]
  },
  "older-persons-grant-payment-dates-january-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngoJanuwari 2026",
    "summary": "Umhlahlandlela kaJanuwari 2026 wesikhathi sokukhokha sabantu asebekhulile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabantu abadala ngoJanuwari 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni bese ufunda inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lukaJanuwari ngokuvamile luvela kubasebenzisi abahlola iwindi lokuqala lokukhokha lonyaka noma abazama ukuqinisekisa ukuthi isithombe esikopishiwe sisasebenza yini. Isikhathi sesibonelelo sabantu abadala sivame ukuseshwa kakhulu, okusho ukuthi amakhasi enyanga akopishiwe angasabalala ngokushesha uma inothi likhishwa. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaJanuwari 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaJanuwari 2026 ukuze uthole isikhathi sabantu abadala.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi labantu abadala eliqinile likaJanuwari aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi abantu asebekhulile ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sabantu asebekhulile nezinkokhelo ezihlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/january/older-persons\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labantu abadala likaJanuwari 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze nosuku lwabantu abadala?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "older-persons-grant-payment-dates-february-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngoFebhuwari 2026",
    "summary": "Umhlahlandlela wangoFebhuwari 2026 wesikhathi sokukhokha sabantu asebekhulile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabantu abadala ngoFebhuwari 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni bese ufunda inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha kaFebhuwari kuvame ukuhlala eduze nokuhlelwa kokuphela kwenyanga, ngakho abasebenzisi badinga usizo lokuhlukanisa isikhathi esisha nokuthunyelwe okugaywe kabusha. Isikhathi sesibonelelo sabantu abadala sivame ukuseshwa kakhulu, okusho ukuthi amakhasi enyanga akopishiwe angasabalala ngokushesha uma inothi likhishwa. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaFebruwari 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaFebhuwari 2026 ukuze uthole isikhathi sabantu abadala.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi langoFebhuwari eliqinile labantu abadala aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi abantu asebekhulile ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sabantu asebekhulile nezinkokhelo ezihlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/february/older-persons\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labantu abadala langoFebhuwari 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze nosuku lwabantu abadala?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "older-persons-grant-payment-dates-march-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala Mashi 2026",
    "summary": "Umhlahlandlela wangoMashi 2026 wesikhathi sokukhokha sabantu asebekhulile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabantu abadala ngoMashi 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni bese ufunda inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha kaMashi ngokuvamile luvela kubasebenzisi abaqhathanisa inyanga endala nomjikelezo omusha noma ukuhlola ukuthi idethi okwabelwana ngayo isasebenza yini. Isikhathi sesibonelelo sabantu abadala sivame ukuseshwa kakhulu, okusho ukuthi amakhasi enyanga akopishiwe angasabalala ngokushesha uma inothi likhishwa. Indlela ephephe kunazo zonke yokusebenzisa ikhasi lika-March 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lika-March 2026 ukuze uthole isikhathi sabantu abadala.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi lemashi labantu abadala eliqinile aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi abantu asebekhulile ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sabantu asebekhulile nezinkokhelo ezihlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/march/older-persons\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labantu abadala langoMashi 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze nosuku lwabantu abadala?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "disability-grant-payment-dates-july-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka ngoJulayi 2026",
    "summary": "Umhlahlandlela wangoJulayi 2026 wesikhathi sokukhokha kwabakhubazekile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabakhubazekile ngoJulayi 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yangoJulayi ngokuvamile luvela kubasebenzisi abaqhathanisa umjikelezo wokukhokha wasebusika owodwa nomunye, okwenza amalebula enyanga nonyaka abaluleke kakhulu. Amakhasi enkokhelo yesibonelelo sokukhubazeka awusizo kakhulu lapho esiza abasebenzisi ukuthi bahlukanise isiqondiso senyanga ethile nezimangalo ezibukeka zingezamanje kodwa empeleni ezesinye isikhathi. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaJulayi 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaJulayi 2026 ukuze uthole isikhathi sokukhubazeka.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi likaJulayi lokukhubazeka eliqinile aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi sokukhubazeka ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sokukhubazeka nenkokhelo ehlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/july/disability\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labakhubazekile likaJulayi 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze kosuku lokukhubazeka?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "disability-grant-payment-dates-august-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka Agasti 2026",
    "summary": "Umhlahlandlela wango-Agasti 2026 wesikhathi sokukhokha kwabakhubazekile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabakhubazekile ngo-Agasti 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha ka-Agasti kuvame ukuqala ekuhloleni okuphindaphindiwe namahemuhemu, ngakho amalebula acacile asiza abasebenzisi ukuthi bahlale bezolile. Amakhasi enkokhelo yesibonelelo sokukhubazeka awusizo kakhulu lapho esiza abasebenzisi ukuthi bahlukanise isiqondiso senyanga ethile nezimangalo ezibukeka zingezamanje kodwa empeleni ezesinye isikhathi. Indlela ephephe kunazo zonke yokusebenzisa ikhasi lika-Agasti 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lika-Agasti 2026 ukuze uthole isikhathi sokukhubazeka.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi eliqinile lango-Agasti aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi sokukhubazeka ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sokukhubazeka nenkokhelo ehlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/august/disability\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labakhubazekile lika-Agasti 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze kosuku lokukhubazeka?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "disability-grant-payment-dates-september-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka ngoSepthemba 2026",
    "summary": "Umhlahlandlela wangoSepthemba 2026 wesikhathi sokukhokha kwabakhubazekile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabakhubazekile ngoSepthemba 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Usesho lwedethi yokukhokha yangoSepthemba ngokuvamile luvela kubasebenzisi abazama ukuqinisekisa isikhathi ngaphambi kokuthi umjikelezo wenyanga entsha uxazululwe ngokugcwele. Amakhasi enkokhelo yesibonelelo sokukhubazeka awusizo kakhulu lapho esiza abasebenzisi ukuthi bahlukanise isiqondiso senyanga ethile nezimangalo ezibukeka zingezamanje kodwa empeleni ezesinye isikhathi. Indlela ephephe kunazo zonke yokusebenzisa ikhasi likaSepthemba 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likaSepthemba 2026 ukuze uthole isikhathi sokukhubazeka.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi likaSepthemba lokukhubazeka eliqinile aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi sokukhubazeka ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sokukhubazeka nenkokhelo ehlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/september/disability\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labakhubazekile likaSepthemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze kosuku lokukhubazeka?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "disability-grant-payment-dates-october-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka ngo-Okthoba 2026",
    "summary": "Umhlahlandlela wango-Okthoba 2026 wesikhathi sokukhokha kwabakhubazekile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabakhubazekile ngo-Okthoba 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha yango-Okthoba kuvame ukudala ukudideka lapho izithombe-skrini ezindala ziqhubeka nokuzungeza kanye nolwazi olusha olushicilelwe. Amakhasi enkokhelo yesibonelelo sokukhubazeka awusizo kakhulu lapho esiza abasebenzisi ukuthi bahlukanise isiqondiso senyanga ethile nezimangalo ezibukeka zingezamanje kodwa empeleni ezesinye isikhathi. Indlela ephephe kunazo zonke yokusebenzisa ikhasi lika-Okthoba 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lika-Okthoba 2026 ukuze uthole isikhathi sokukhubazeka.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi eliqinile lika-Okthoba lokukhubazeka aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi sokukhubazeka ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sokukhubazeka nenkokhelo ehlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/october/disability\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labakhubazekile lango-Okthoba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze kosuku lokukhubazeka?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
      }
    ]
  },
  "disability-grant-payment-dates-november-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka Novemba 2026",
    "summary": "Umhlahlandlela wangoNovemba 2026 wesikhathi sokukhokha kwabakhubazekile, obhalelwe ukusiza abasebenzisi ukuthi bafunde inyanga ngokuphepha futhi bagweme ukwethemba amadethi akopishiwe ngokushesha okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngezinsuku zokukhokha zabakhubazekile ngoNovemba 2026, vula ikhasi lenyanga laleso sigaba sesibonelelo sikahulumeni futhi ufunde inothi lokukhokha kanye nosuku. Idethi eshicilelwe ihlukile kunothi okulindelekile noma elisekelwe kuphothali."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwedethi yokukhokha yangoNovemba kuvame ukuba nengcindezi yokuphela konyaka, okwenza kube lula ukuthi izimangalo zedethi ekopishiwe zisabalale ngaphandle komongo owanele. Amakhasi enkokhelo yesibonelelo sokukhubazeka awusizo kakhulu lapho esiza abasebenzisi ukuthi bahlukanise isiqondiso senyanga ethile nezimangalo ezibukeka zingezamanje kodwa empeleni ezesinye isikhathi. Indlela ephephe kunazo zonke yokusebenzisa ikhasi langoNovemba 2026 ukufanisa isigaba esiqondile sesibonelelo bese ufunda inothi ngaphambi kokwakha izinhlelo ngosuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amakhasi okukhokha okuqondene nesibonelelo sikahulumeni avame ukwabelwa ngaphandle komongo ozungezile. Lokho kungenza idethi eyodwa ibukeke iqinisekile kakhulu kunalokho eyikho ngempela, ikakhulukazi uma inothi linqanyuliwe noma lishaywe indiva."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi likanovemba 2026 ukuze uthole isikhathi sokukhubazeka.\n2. Hlola ukuthi idethi ishicilelwe, ilindelwe, noma iboshelwe komunye umzila.\n3. Funda inothi elifakwe esikhathini.\n4. Gcina inyanga nonyaka kucacile uma uqhathanisa izithombe-skrini.\n5. Sebenzisa umzila osemthethweni ofanele uma inothi lisakhomba ukungaqiniseki noma inkinga yokukhokha evinjiwe."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Ikhasi likanovemba lokukhubazeka eliqinile aliphathelene nosuku kuphela. Kumayelana nosuku, inothi, kanye nohlobo lwesibonelelo konke okuvumayo ngaphambi kokuthi umsebenzisi aphathe isikhathi njengokuphephile ukuhlela nxazonke."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi ukuthi bafunde isikhathi sokukhubazeka ngokucacile, kodwa isiqinisekiso sokugcina esisemthethweni sisesesiteshini sikahulumeni esifanele uma ikhasi libonisa ukuqaphela noma ushintsho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi ukuqhathanisa isikhathi sokukhubazeka nenkokhelo ehlobene, isimo, neziqondiso zesikhumbuzi ukuze bazi ukuthi yini okufanele bayifunde ngokulandelayo uma ikhasi lisazizwa lingaqinisekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/november/disability\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi labakhubazekile langoNovemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ezinye izinyanga zingase zibonise isikhathi esilindelwe noma esincike emzileni kunedethi eshicilelwe ngokugcwele."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifunde inothi eduze kosuku lokukhubazeka?",
        "body": "Ngoba inothi ngokuvamile lichaza ukuthi isikhathi siqinisekile kangakanani nokuthi usabalulekile yini omunye umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku ngaphandle kwenothi?",
        "body": "Phatha ikhasi elisemthethweni noma elihlelekile njengelithembeke kakhulu kunosuku olukopishiwe ngaphandle kokuqukethwe okunamathiselwe."
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

export const SEO_BATCH_FIFTEEN_GUIDES = SEO_BATCH_FIFTEEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
