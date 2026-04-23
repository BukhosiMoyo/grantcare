const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

const monthMeta = {
  may: {
    title: "May",
    intro:
      "In May, winter starts setting in and household expenses rise. You need to know exactly when your grant is clearing so you can budget for electricity and warm clothes.",
    planning:
      "It is tempting to believe the first May payment date you see on Facebook. Do not do it. Always check if the date is officially published by SASSA or if it is just an educated guess.",
  },
  june: {
    title: "June",
    intro:
      "June marks the middle of the year, a crucial time for catching up on mid-year bills or school fees. A delayed payment in June hits families particularly hard.",
    planning:
      "Because money is tight mid-year, fake 'early payment' schedules go viral every June. Protect yourself by only trusting dates that carry a 'published' tag from official sources.",
  },
  july: {
    title: "July",
    intro:
      "July is deep winter in South Africa. When your grant is your lifeline for paraffin, heaters, or medicine, you cannot afford to guess when your money will clear.",
    planning:
      "Do not let the stress of winter force you into making financial promises before your money arrives. Wait until your status updates to 'approved' with a final, confirmed payment date.",
  },
  august: {
    title: "August",
    intro:
      "As we move into August, everyday living costs continue to pressure families. Knowing your exact payment date helps you avoid borrowing money to bridge the gap.",
    planning:
      "Scammers take advantage of the long gap between July and August payments. Before you borrow money against your grant, verify that your August date is officially confirmed.",
  },
  september: {
    title: "September",
    intro:
      "September brings spring, but it also brings the reality of the final quarter of the year. Every cent counts as you start looking toward the expensive holiday season.",
    planning:
      "Do not trust a September date sent to you in a WhatsApp group. These are often old schedules from previous years. Always double-check the year and the official SASSA release.",
  },
  october: {
    title: "October",
    intro:
      "By October, everyone is feeling the financial exhaustion of the year. Delays in October can completely derail your plans for November and December.",
    planning:
      "With the holidays approaching, the SASSA system often experiences high traffic. This means your October payment might take an extra day to reflect, even after the official date.",
  },
  november: {
    title: "November",
    intro:
      "November is the most critical month for financial planning. You are trying to stretch this grant to cover early December expenses, making payment timing absolutely crucial.",
    planning:
      "Because November is the gateway to the holidays, any delay causes massive anxiety. Remember that your grant clears on different days depending on whether it is a child, older person, or SRD grant.",
  },
  december: {
    title: "December",
    intro:
      "December is the most stressful month of the year for grant recipients. Supermarkets are packed, prices are high, and everyone is desperate to secure their money before the public holidays.",
    planning:
      "SASSA sometimes shifts December dates earlier to accommodate the holidays, which causes massive confusion. Do not rely on last year's schedule. Check the official confirmation before joining a long ATM queue.",
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
      `A clear, no-nonsense guide to ${monthLabel} 2026 payment dates. We explain exactly when each grant pays out and how to verify your date before relying on it.`,
    quickAnswer:
      `If you want to know your ${monthLabel} payment date, look up your specific grant category first. Remember: older persons, children's grants, and SRD all pay out on completely different days.`,
    whatThisMeans:
      `${meta.intro} Do not assume that your money will arrive on the first day of the month. SASSA spaces out payments to prevent ATMs and supermarkets from being overcrowded.`,
    whyThisMatters:
      `${meta.planning} If you mistake a children's grant payment date for an SRD date, you will end up waiting in line for money that has not even cleared yet.`,
    steps:
      `1. Open the ${monthLabel.toLowerCase()} 2026 official SASSA payment schedule.\n2. Scroll down until you find your exact grant type.\n3. Look for the word "Published" next to the date to confirm it is final.\n4. Remember that weekends and public holidays will delay your payment.\n5. If your date has passed and you have no money, log into the official portal to check your status.`,
    keyFocus:
      `Treat this ${monthLabel} schedule as a roadmap, not a legally binding promise. Even when dates are published, technical bank delays can still force you to wait an extra 24 hours.`,
    important:
      `GrantCare provides this timeline to help you budget, but we do not distribute the money. If ${monthLabel} payments are delayed nationally, only SASSA can resolve the issue.`,
    help:
      `We break down the ${monthLabel} schedule so you know exactly what to expect. If your payment is late, GrantCare helps you understand whether it is a national delay or a personal account issue.`,
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
      `An essential guide to ${monthLabel} 2026 SRD payment dates. We explain why your R350/R370 grant does not follow the same schedule as regular grants.`,
    quickAnswer:
      `The SRD grant does not have one massive national payday in ${monthLabel}. Instead, SASSA processes these payments in batches throughout the final week of the month.`,
    whatThisMeans:
      `If you are searching for a single ${monthLabel} SRD date, you are looking for something that does not exist. Your payment date is unique to your ID number and is only confirmed once your status changes to 'Approved' with a specific pay date.`,
    whyThisMatters:
      `Scammers know people are desperate for SRD dates. They will post fake calendars online to trick you. ${meta.planning} Do not fall for a single "SRD Payday" rumour—check your own portal instead.`,
    steps:
      `1. Open the official SRD status portal for ${monthLabel}.\n2. Enter your ID and phone number.\n3. Look at your ${monthLabel} status. Is it pending or approved?\n4. If approved, read the exact payment date listed below it.\n5. Wait for an SMS from your bank, or give it 2-3 days to reflect.`,
    keyFocusTitle: "Why SRD timing pages need extra caution",
    keyFocus:
      `Your SRD payment is tied directly to your monthly verification. If SASSA is still checking your banking details or identity for ${monthLabel}, your payment date will not appear yet.`,
    important:
      `GrantCare cannot speed up your SRD payment. If your ${monthLabel} date says 'Null' or is completely missing, it means SASSA is still processing your file.`,
    help:
      `We explain the confusing SRD status messages so you know whether your ${monthLabel} payment is coming, delayed, or stuck in a verification loop.`,
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
      `A focused guide to ${monthLabel} 2026 payment dates for the ${grantTitle}. We cut through the noise so you know exactly when your money is clearing.`,
    quickAnswer:
      `The ${grantTitle} usually pays out on its own specific day in ${monthLabel}, entirely separate from other grants. You must verify the 'Published' status of this date before going to the ATM.`,
    whatThisMeans:
      `Even if you see a date online, SASSA may adjust the schedule due to weekends or public holidays. Do not assume ${monthLabel} follows the exact same pattern as last month.`,
    whyThisMatters:
      `${meta.planning} Arriving at the ATM a day too early means wasting taxi fare and spending hours in a queue for nothing. Protect your time by double-checking the status.`,
    steps:
      `1. Open the ${monthLabel} payment schedule specifically for the ${grantTitle}.\n2. Look at the payment label—does it say 'Expected' or 'Published'?\n3. Mark the published date on your calendar.\n4. Wait until the afternoon of that date before withdrawing, to ensure bank servers have synced.\n5. If the date passes with no money, check your official SASSA status.`,
    keyFocus:
      `This page provides the official ${grantTitle} timeline for ${monthLabel}. Treat this as a verified guide, but remember that technical delays between the Treasury and your specific bank can still occur.`,
    important:
      `GrantCare provides independent scheduling guidance. If your ${grantTitle} is delayed for ${monthLabel}, only the official SASSA portal can tell you why.`,
    help:
      `We keep you updated on ${shortLabel.toLowerCase()} timing for ${monthLabel}. If something goes wrong, use GrantCare to figure out if it is a general bank delay or a personal account issue.`,
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
