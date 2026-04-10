const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

const monthMeta = {
  may: {
    title: "May",
    intro:
      "May 2026 payment planning is often about checking whether the new month is fully updated yet and whether your grant category is showing a published date or only guidance.",
    planning:
      "May can feel urgent because users often want certainty early in the month. That makes it even more important to read the payment label and note, not just the date itself.",
  },
  june: {
    title: "June",
    intro:
      "June 2026 payment planning usually sits in a mid-year budgeting period, so users often need a calmer way to separate expected dates from officially published ones.",
    planning:
      "June pages are most useful when they help users plan carefully without pretending that every date is final before the official release confirms it.",
  },
  july: {
    title: "July",
    intro:
      "July 2026 payment-date searches usually come from users who want a reliable month view before making travel, household, or collection plans.",
    planning:
      "Because July can bring a lot of repeat checking, a good page should focus on the payment label, the grant category, and any note that explains whether the timing is published or still expected.",
  },
  august: {
    title: "August",
    intro:
      "August 2026 payment planning often depends on seeing the month clearly enough to know which grant category applies and whether the visible date is final or still only guidance.",
    planning:
      "The safest August payment habit is to treat the month page as a structured guide and to return to the official source when the page still shows expected or portal-only wording.",
  },
  september: {
    title: "September",
    intro:
      "September 2026 payment-date searches are usually driven by users who want to plan early without being misled by copied screenshots or outdated posts.",
    planning:
      "That makes September pages most useful when they help users compare published, expected, and portal-only wording clearly before any payment plan is treated as final.",
  },
  october: {
    title: "October",
    intro:
      "October 2026 payment-date searches often increase because users want timing certainty before the month moves too far, especially when different grant categories update in different ways.",
    planning:
      "A useful October guide should help people read the note attached to the date, not only the date itself, so they understand whether the month is fully confirmed yet.",
  },
  november: {
    title: "November",
    intro:
      "November 2026 payment planning usually depends on reading the month page with care, because users often need a dependable view before year-end pressures start building.",
    planning:
      "For November, the safest approach is to use the page as a structured guide, watch the payment state carefully, and keep official confirmation separate from independent explanation.",
  },
  december: {
    title: "December",
    intro:
      "December 2026 payment-date searches are especially sensitive because people want strong timing clarity before the end of the year, but official dates can still need careful confirmation.",
    planning:
      "That is why December pages should help users plan responsibly without treating an expected date as if it were already the final official schedule.",
  },
} as const;

type MonthSlug = keyof typeof monthMeta;

type PaymentGuideConfig = {
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
}: PaymentGuideConfig) {
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

function monthlyOverviewGuide(month: MonthSlug, sortOrder: number) {
  const meta = monthMeta[month];
  const monthLabel = meta.title;

  return guide({
    slug: `payment-dates-${month}-2026`,
    title: `Payment dates ${monthLabel} 2026`,
    summary:
      `A month-specific ${monthLabel} 2026 payment-date guide that explains how to read the page safely, use expected dates carefully, and know when official confirmation matters most.`,
    quickAnswer:
      `For ${monthLabel} 2026 payment dates, start with the ${monthLabel.toLowerCase()} month page and check the exact grant category first. A date shown as expected is not the same as a date shown as officially published.`,
    whatThisMeans:
      `${meta.intro} The safest way to use the ${monthLabel} 2026 payment page is to match the right grant type and read the payment state before building plans around the date.`,
    whyThisMatters:
      `${meta.planning} Confusion usually starts when one visible date is treated as if it applies to every grant category, even though regular grants, grouped children’s grants, and SRD-style support can appear differently.`,
    steps:
      `1. Open the ${monthLabel.toLowerCase()} 2026 payment page.\n2. Find your grant category or grouped schedule.\n3. Check whether the date is marked published, expected, or portal-only.\n4. Read the note attached to the payment entry, not only the date.\n5. Use the relevant official route if the ${monthLabel.toLowerCase()} wording changes or still needs confirmation.`,
    keyFocus:
      `A good ${monthLabel} payment-date page is most useful when you treat it like a guide to the month rather than a promise. The date, the label, and the grant category all need to agree before you treat the schedule as final.`,
    important:
      `GrantCare is an independent information platform. It helps organise ${monthLabel} 2026 timing clearly, but final official confirmation still belongs to the relevant government channel when dates are missing, changed, or still marked as expected.`,
    help:
      `GrantCare can help you compare ${monthLabel} 2026 with other months, understand payment states in plain language, and move to the next relevant guide if the page shows portal-only or delayed-payment wording.`,
    related:
      `Useful next pages:\n• /payment-dates/2026/${month}\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates`,
    faqs: [
      {
        question: `Are all ${monthLabel} 2026 dates final?`,
        answer: "No. Some may be officially published while others may still be expected or portal-based.",
      },
      {
        question: `Why can one ${monthLabel} page show different payment wording by grant type?`,
        answer: "Because not every grant category is updated in exactly the same way or on the same public schedule.",
      },
      {
        question: `Should I still confirm ${monthLabel} 2026 dates officially?`,
        answer: "Yes, especially when you need final certainty or the page still shows expected or portal-only wording.",
      },
    ],
    sortOrder,
  });
}

function srdGuide(month: Exclude<MonthSlug, "may">, sortOrder: number) {
  const meta = monthMeta[month];
  const monthLabel = meta.title;

  return guide({
    slug: `srd-payment-dates-${month}-2026`,
    title: `SRD payment dates ${monthLabel} 2026`,
    summary:
      `A practical ${monthLabel} 2026 SRD payment guide explaining why SRD timing can differ from regular grants and why portal-based checking still matters.`,
    quickAnswer:
      `For SRD payment dates in ${monthLabel} 2026, the safest approach is to use the ${monthLabel.toLowerCase()} payment page as guidance and then confirm through the official SRD route. SRD timing is often shown differently from regular grants.`,
    whatThisMeans:
      `${monthLabel} 2026 SRD searches usually come from users who want one simple public date, but SRD timing can depend on portal-based updates and individual results. That is why a careful guide may show portal-only wording instead of pretending one public day fits everyone.`,
    whyThisMatters:
      `${meta.planning} For SRD, a single copied date can create false certainty very quickly. The better approach is to treat the month page as a guide to the timing state, then use the official SRD route for the final check.`,
    steps:
      `1. Open the ${monthLabel.toLowerCase()} 2026 payment page.\n2. Find the social-relief or SRD category.\n3. Read whether the entry is published, expected, or portal-only.\n4. Use the official SRD route for final confirmation on your own case.\n5. Compare the timing with payment-processing or approved-but-no-payment guidance if the result still feels unclear.`,
    keyFocusTitle: "Why SRD timing pages need extra caution",
    keyFocus:
      `SRD timing is often more individual than regular grant payment pages suggest. That is why a portal-based note can be more trustworthy than a bold public date that looks simple but does not safely fit every case.`,
    important:
      `GrantCare is independent and is not the official SRD system. It can help organise ${monthLabel} timing in plain language, but official final timing still belongs to the proper SRD route.`,
    help:
      `GrantCare can help you understand whether the ${monthLabel} SRD page is pointing to guidance, portal-checking, payment processing, or a missing-payment problem, without making the page sound official.`,
    related:
      `Useful next pages:\n• /payment-dates/2026/${month}/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely`,
    faqs: [
      {
        question: `Why might ${monthLabel} 2026 SRD show portal-only wording?`,
        answer: "Because a single public date may not safely reflect every SRD case and the official route may still be the best final source.",
      },
      {
        question: `Can I still use GrantCare to track ${monthLabel} SRD timing?`,
        answer: "Yes. GrantCare can help with guidance and reminders, but not with official confirmation itself.",
      },
      {
        question: `What if another website shows one simple ${monthLabel} SRD date?`,
        answer: "Treat the official SRD route as the final authority before trusting a copied public date.",
      },
    ],
    sortOrder,
  });
}

function grantSpecificGuide({
  month,
  grantSlug,
  grantTitle,
  shortLabel,
  summaryAngle,
  riskAngle,
  routePath,
  relatedGuideSlug,
  relatedStatusPath,
  sortOrder,
}: {
  month: MonthSlug;
  grantSlug: string;
  grantTitle: string;
  shortLabel: string;
  summaryAngle: string;
  riskAngle: string;
  routePath: string;
  relatedGuideSlug: string;
  relatedStatusPath: string;
  sortOrder: number;
}) {
  const meta = monthMeta[month];
  const monthLabel = meta.title;

  return guide({
    slug: `${grantSlug}-payment-dates-${month}-2026`,
    title: `${grantTitle} payment dates ${monthLabel} 2026`,
    summary:
      `A ${monthLabel} 2026 guide for ${shortLabel.toLowerCase()} payment timing, written to help users read the month page carefully and avoid treating guidance as final too early.`,
    quickAnswer:
      `For ${grantTitle.toLowerCase()} payment dates in ${monthLabel} 2026, use the ${monthLabel.toLowerCase()} payment page for that grant category and check whether the visible date is published or still expected before planning around it.`,
    whatThisMeans:
      `${summaryAngle} The safest way to use the ${monthLabel} page is to match the exact grant category and read the payment state together with any note attached to it.`,
    whyThisMatters:
      `${riskAngle} ${meta.planning} A page that clearly separates published timing from expected timing helps users plan more calmly and reduces the risk of acting on copied or outdated date claims.`,
    steps:
      `1. Open the ${monthLabel.toLowerCase()} 2026 page for ${shortLabel.toLowerCase()} timing.\n2. Check whether the payment entry is published, expected, or still awaiting official confirmation.\n3. Read the attached note for context.\n4. Save the page if you expect to return before the payment window.\n5. Use the relevant official route if the wording changes or the date still needs final confirmation.`,
    keyFocus:
      `The most useful habit is to treat the ${grantTitle.toLowerCase()} ${monthLabel.toLowerCase()} page as a structured month guide, not as a promise. The payment state matters as much as the date itself.`,
    important:
      `GrantCare is an independent information platform. It can help organise ${grantTitle.toLowerCase()} timing for ${monthLabel} 2026, but the final official payment update still belongs to the relevant government channel.`,
    help:
      `GrantCare can help you compare ${monthLabel} timing for ${shortLabel.toLowerCase()} support with related payment, status, and reminder guides so you know what page to read next if something still feels unclear.`,
    related:
      `Useful next pages:\n• ${routePath}\n• /guides/${relatedGuideSlug}\n• ${relatedStatusPath}\n• /guides/how-to-understand-payment-dates\n• /payment-dates`,
    faqs: [
      {
        question: `Does the ${monthLabel} 2026 ${shortLabel.toLowerCase()} page always show a final official date?`,
        answer: "Not always. The page may show published, expected, or other timing labels depending on the current state of the information.",
      },
      {
        question: `Why should I read the note next to the ${shortLabel.toLowerCase()} date?`,
        answer: "Because the note often explains whether the date is confirmed, estimated, or still needs official confirmation.",
      },
      {
        question: `What if the ${shortLabel.toLowerCase()} payment still does not arrive after the visible date?`,
        answer: "Check the latest wording, then compare it with the related payment and status guides before assuming the payment is missing.",
      },
    ],
    sortOrder,
  });
}

export const SEO_BATCH_NINE_GUIDES = [
  monthlyOverviewGuide("june", 144),
  monthlyOverviewGuide("july", 145),
  monthlyOverviewGuide("august", 146),
  monthlyOverviewGuide("september", 147),
  monthlyOverviewGuide("october", 148),
  monthlyOverviewGuide("november", 149),
  monthlyOverviewGuide("december", 150),
  srdGuide("june", 151),
  srdGuide("july", 152),
  srdGuide("august", 153),
  srdGuide("september", 154),
  srdGuide("october", 155),
  srdGuide("november", 156),
  srdGuide("december", 157),
  grantSpecificGuide({
    month: "june",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "Older Persons Grant timing pages are often used for careful household and collection planning, which makes clear payment-state wording especially useful.",
    riskAngle:
      "When one copied date is treated as final without checking the grant category properly, users can plan around the wrong information.",
    routePath: "/payment-dates/2026/june/older-persons",
    relatedGuideSlug: "how-to-know-if-your-payment-is-ready",
    relatedStatusPath: "/status/approved",
    sortOrder: 158,
  }),
  grantSpecificGuide({
    month: "july",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "Older Persons Grant pages for July are most useful when they make the month feel easy to read and separate planning guidance from final official confirmation.",
    riskAngle:
      "Because users often check this category repeatedly, copied dates and old screenshots can create unnecessary confusion if the payment state is ignored.",
    routePath: "/payment-dates/2026/july/older-persons",
    relatedGuideSlug: "why-payment-is-delayed",
    relatedStatusPath: "/status/approved",
    sortOrder: 159,
  }),
  grantSpecificGuide({
    month: "august",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "August Older Persons Grant timing pages work best when they help users read the sequence for the month clearly instead of relying on one copied date from outside the page.",
    riskAngle:
      "A visible date without its payment state can create false certainty, especially when users are planning travel or collection around it.",
    routePath: "/payment-dates/2026/august/older-persons",
    relatedGuideSlug: "how-to-understand-payment-dates",
    relatedStatusPath: "/status/approved",
    sortOrder: 160,
  }),
  grantSpecificGuide({
    month: "september",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "September Older Persons Grant pages are especially useful when they help users confirm that the right grant category and the right month are both being read together.",
    riskAngle:
      "Planning against a date that is still expected rather than published can create avoidable stress later in the month.",
    routePath: "/payment-dates/2026/september/older-persons",
    relatedGuideSlug: "approved-but-no-payment",
    relatedStatusPath: "/status/approved",
    sortOrder: 161,
  }),
  grantSpecificGuide({
    month: "october",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "October Older Persons Grant timing is easiest to use when the page makes the payment label, the month, and the grant category all visible together.",
    riskAngle:
      "Without that structure, a copied October date can be treated as final even when the page still shows guidance rather than a published release.",
    routePath: "/payment-dates/2026/october/older-persons",
    relatedGuideSlug: "how-payments-work",
    relatedStatusPath: "/status/approved",
    sortOrder: 162,
  }),
  grantSpecificGuide({
    month: "november",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "November Older Persons Grant pages often need to support calm planning, which is why clear labels and notes matter just as much as the date itself.",
    riskAngle:
      "Users can become overconfident when a visible date is detached from the note that explains whether it is final or still expected.",
    routePath: "/payment-dates/2026/november/older-persons",
    relatedGuideSlug: "how-to-know-if-your-payment-is-ready",
    relatedStatusPath: "/status/approved",
    sortOrder: 163,
  }),
  grantSpecificGuide({
    month: "december",
    grantSlug: "older-persons-grant",
    grantTitle: "Older Persons Grant",
    shortLabel: "Older persons grant",
    summaryAngle:
      "December Older Persons Grant pages carry extra planning pressure, so a structured and cautious reading of the payment state becomes even more important.",
    riskAngle:
      "That pressure can make copied dates feel more final than they are, especially when the official page still needs to confirm the latest timing.",
    routePath: "/payment-dates/2026/december/older-persons",
    relatedGuideSlug: "why-payment-is-delayed",
    relatedStatusPath: "/status/approved",
    sortOrder: 164,
  }),
  grantSpecificGuide({
    month: "june",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "Child Support Grant timing pages often matter to caregivers who need a simple way to plan around the month without mistaking guidance for final release information.",
    riskAngle:
      "If the grant category or payment state is read carelessly, users can plan around the wrong version of the month’s information.",
    routePath: "/payment-dates/2026/june/children",
    relatedGuideSlug: "how-to-understand-payment-dates",
    relatedStatusPath: "/status/approved",
    sortOrder: 165,
  }),
  grantSpecificGuide({
    month: "july",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "July Child Support Grant pages are most useful when they make the monthly category clear enough for caregivers to check timing without depending on rumours or old screenshots.",
    riskAngle:
      "A copied July date can spread quickly, but the payment state on the real page still matters more than a shared image.",
    routePath: "/payment-dates/2026/july/children",
    relatedGuideSlug: "how-to-know-if-your-payment-is-ready",
    relatedStatusPath: "/status/approved",
    sortOrder: 166,
  }),
  grantSpecificGuide({
    month: "august",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "August Child Support Grant timing is easiest to use when the page keeps the category, month, and timing label together in one readable place.",
    riskAngle:
      "Without that structure, a caregiver may treat an expected date as if it were already final and plan too tightly around it.",
    routePath: "/payment-dates/2026/august/children",
    relatedGuideSlug: "why-payment-is-delayed",
    relatedStatusPath: "/status/approved",
    sortOrder: 167,
  }),
  grantSpecificGuide({
    month: "september",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "September Child Support Grant pages help most when they show the timing state clearly enough that families can plan around it without confusing guidance with official final release.",
    riskAngle:
      "If only the date is remembered and the note is forgotten, a September payment page can be misread very easily.",
    routePath: "/payment-dates/2026/september/children",
    relatedGuideSlug: "how-payments-work",
    relatedStatusPath: "/status/approved",
    sortOrder: 168,
  }),
  grantSpecificGuide({
    month: "october",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "October Child Support Grant pages work well when they help users confirm the timing category first and then read whether the month is published, expected, or still awaiting confirmation.",
    riskAngle:
      "A shared October date without its payment state can create avoidable confusion for caregivers returning to the page later.",
    routePath: "/payment-dates/2026/october/children",
    relatedGuideSlug: "how-to-fix-missing-payment-issues",
    relatedStatusPath: "/status/approved",
    sortOrder: 169,
  }),
  grantSpecificGuide({
    month: "november",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "November Child Support Grant timing pages are most useful when they give a stable month view and reduce the need to rely on copied posts or unclear summaries elsewhere.",
    riskAngle:
      "That clarity matters because a visible date can be over-trusted when the page still needs to be read together with the note and payment label.",
    routePath: "/payment-dates/2026/november/children",
    relatedGuideSlug: "how-to-understand-payment-dates",
    relatedStatusPath: "/status/approved",
    sortOrder: 170,
  }),
  grantSpecificGuide({
    month: "december",
    grantSlug: "child-support-grant",
    grantTitle: "Child Support Grant",
    shortLabel: "Child support grant",
    summaryAngle:
      "December Child Support Grant pages carry more month-end planning pressure, which makes careful reading of the payment state even more important.",
    riskAngle:
      "That pressure can make users cling to the first date they see instead of checking whether December is fully published yet.",
    routePath: "/payment-dates/2026/december/children",
    relatedGuideSlug: "why-payment-is-delayed",
    relatedStatusPath: "/status/approved",
    sortOrder: 171,
  }),
  grantSpecificGuide({
    month: "may",
    grantSlug: "disability-grant",
    grantTitle: "Disability Grant",
    shortLabel: "Disability grant",
    summaryAngle:
      "Disability Grant timing pages usually matter most when they help users plan around the month carefully without treating guidance as final before the official release is clear.",
    riskAngle:
      "If the page is read too quickly, an expected date can be mistaken for a published one, which raises anxiety later if timing still shifts.",
    routePath: "/payment-dates/2026/may/disability",
    relatedGuideSlug: "how-to-know-if-your-payment-is-ready",
    relatedStatusPath: "/status/approved",
    sortOrder: 172,
  }),
  grantSpecificGuide({
    month: "june",
    grantSlug: "disability-grant",
    grantTitle: "Disability Grant",
    shortLabel: "Disability grant",
    summaryAngle:
      "June Disability Grant pages are most useful when they separate month guidance from final confirmation and help users read the payment state before planning too tightly.",
    riskAngle:
      "That matters because copied June dates can feel final even when the official timing state still needs careful confirmation.",
    routePath: "/payment-dates/2026/june/disability",
    relatedGuideSlug: "how-payments-work",
    relatedStatusPath: "/status/approved",
    sortOrder: 173,
  }),
];
