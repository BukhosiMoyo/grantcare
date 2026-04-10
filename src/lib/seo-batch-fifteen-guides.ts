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

export const SEO_BATCH_FIFTEEN_GUIDES = [
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
