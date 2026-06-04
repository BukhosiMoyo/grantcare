import { addSetswanaTranslations } from "./generated-guide-translations";

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

const SEO_BATCH_NINE_GUIDES_SOURCE = [
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

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "payment-dates-june-2026": {
    "title": "Izinsuku zokukhokha zikaJuni 2026",
    "summary": "Umhlahlandlela ocacile, ongenangqondo wezinsuku zokukhokha zikaJuni 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha kaJuni, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "UJuni uphawula phakathi nonyaka, isikhathi esibalulekile sokuthola izikweletu zaphakathi nonyaka noma imali yesikole. Inkokhelo ebambezelekile ngoJuni ithinta kakhulu imindeni. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi imali iqinile maphakathi nonyaka, amashejuli mbumbulu we-'early payment' angena egazini njalo ngoJuni. Zivikele ngezinsuku zokwethemba kuphela eziphethe umaka we-'published' emithonjeni esemthethweni. Uma wenza iphutha ngosuku lokukhokha isibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha olusemthethweni lukaJuni 2026 lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo lukaJuni njengemephu yomgwaqo, hhayi isithembiso esibophezela ngokomthetho. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zikaJuni zibambezeleka kuzwelonke, yi-SASSA kuphela engaxazulula lolu daba."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli yangoJuni ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/june\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe zonke izinsuku zikaJuni 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa likaJuni lingakhombisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zikaJuni 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-july-2026": {
    "title": "Izinsuku zokukhokha zikaJulayi 2026",
    "summary": "Umhlahlandlela ocacile, ongenawo umbhedo wezinsuku zokukhokha zikaJulayi 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha kaJulayi, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "UJulayi ubusika obujulile eNingizimu Afrika. Uma imali yakho yesibonelelo siyindlela yakho yokuphila ngopharafini, izifudumezi, noma imithi, awukwazi ukuqagela ukuthi imali yakho izophela nini. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungavumeli ukucindezeleka kwasebusika kukuphoqelele ekwenzeni izithembiso zezimali ngaphambi kokuba imali yakho ifike. Linda kuze kube yilapho isimo sakho sibuyekezwa ku-'approved' ngedethi yokugcina, eqinisekisiwe yokukhokha. Uma wenza iphutha ngosuku lokukhokha isibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha lukaJulayi 2026 olusemthethweni lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo lukaJulayi njengemephu yomgwaqo, hhayi isithembiso esibophezelayo. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zikaJulayi zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula lolu daba."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli yangoJulayi ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/july\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe zonke izinsuku zikaJulayi 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa likaJulayi lingakhombisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zikaJulayi 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-august-2026": {
    "title": "Izinsuku zokukhokha zika-Agasti 2026",
    "summary": "Umhlahlandlela ocacile, ongenangqondo wezinsuku zokukhokha zika-Agasti 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha ka-Agasti, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Njengoba singena ku-August, izindleko zokuphila kwansuku zonke ziyaqhubeka nokucindezela imindeni. Ukwazi usuku lwakho oluqondile lokukhokha kukusiza ukuthi ugweme ukuboleka imali ukuze uvale igebe. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi basebenzisa igebe elide eliphakathi kwezinkokhelo zikaJulayi no-Agasti. Ngaphambi kokuthi uboleke imali kwisibonelelo sakho, qinisekisa ukuthi usuku lwakho luka-Agasti luqinisekisiwe ngokusemthethweni. Uma wenza iphutha ngosuku lokukhokhelwa kwesibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa ngisho namanje."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha luka-August 2026 olusemthethweni lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo luka-Agasti njengemephu yomgwaqo, hhayi isithembiso esibophezela ngokomthetho. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zika-Agasti zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula inkinga."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli ka-Agasti ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/august\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zika-Agasti 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa lika-Agasti lingabonisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zika-Agasti 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-september-2026": {
    "title": "Izinsuku zokukhokha zikaSepthemba 2026",
    "summary": "Umhlahlandlela ocacile, ongenawo umbhedo wezinsuku zokukhokha zikaSepthemba 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha kaSepthemba, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "USepthemba uletha intwasahlobo, kodwa futhi uletha iqiniso lekota yokugcina yonyaka. Isenti ngalinye libalulekile njengoba uqala ukubheka isikhathi samaholide esibizayo. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungayethembi idethi kaSepthemba ethunyelwe kuwe ngeqembu le-WhatsApp. Lezi kuvame ukuba amashejuli amadala kusukela eminyakeni edlule. Njalo hlola kabili unyaka kanye nokukhishwa okusemthethweni kwe-SASSA. Uma wenza iphutha ngosuku lokukhokha isibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha luka-September 2026 olusemthethweni lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo lukaSepthemba njengemephu yomgwaqo, hhayi isithembiso esibophezela ngokomthetho. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zikaSepthemba zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula inkinga."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli kaSepthemba ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/september\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zango-Septhemba 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa likaSepthemba lingabonisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zikaSepthemba 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-october-2026": {
    "title": "Izinsuku zokukhokha zika-Okthoba 2026",
    "summary": "Umhlahlandlela ocacile, ongenawo umbhedo wezinsuku zokukhokha zika-Okthoba 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha ka-Okthoba, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngo-Okthoba, wonke umuntu uzwa ukukhathala kwezimali konyaka. Ukubambezeleka ngo-Okthoba kungaphazamisa ngokuphelele izinhlelo zakho zikaNovemba noDisemba. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njengoba amaholide esondela, uhlelo lwe-SASSA luvamise ukuba nethrafikhi ephezulu. Lokhu kusho ukuthi inkokhelo yakho ka-Okthoba ingase ithathe usuku olwengeziwe ukubonakala, ngisho nangemva kwedethi esemthethweni. Uma wenza iphutha ngosuku lokukhokha isibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha olusemthethweni luka-Okthoba 2026 lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo luka-Okthoba njengemephu yomgwaqo, hhayi isithembiso esibophezelayo. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zika-Okthoba zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula inkinga."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli ka-Okthoba ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/october\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zika-Okthoba 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa lika-Okthoba lingabonisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zika-Okthoba 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-november-2026": {
    "title": "Izinsuku zokukhokha zikaNovemba 2026",
    "summary": "Umhlahlandlela ocacile, ongenawo umbhedo wezinsuku zokukhokha zikaNovemba 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha yangoNovemba, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "UNovemba yinyanga ebaluleke kakhulu ekuhleleni imali. Uzama ukwelula lesi sibonelelo ukuze ukhokhele izindleko zangaphambi kukaDisemba, okwenza isikhathi sokukhokha sibe esibaluleke kakhulu. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi uNovemba uyisango lokuya emaholidini, noma yikuphi ukubambezeleka kubangela ukukhathazeka okukhulu. Khumbula ukuthi isibonelelo sakho siphela ngezinsuku ezahlukene kuye ngokuthi ingane, umuntu omdala, noma isibonelelo se-SRD. Uma wenza iphutha ngosuku lokukhokha isibonelelo sezingane ngosuku lwe-SRD, uzogcina ulinde ulayini wemali engakaqedwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha lukanovemba 2026 olusemthethweni lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo lukaNovemba njengemephu yomgwaqo, hhayi isithembiso esibophezelayo. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zangoNovemba zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula lolu daba."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli yangoNovemba ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/november\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zangoNovemba 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa langoNovemba lingakhombisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zikaNovemba 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "payment-dates-december-2026": {
    "title": "Izinsuku zokukhokha zikaDisemba 2026",
    "summary": "Umhlahlandlela ocacile, ongenawo umbhedo wezinsuku zokukhokha zikaDisemba 2026. Sichaza kahle ukuthi isibonelelo ngasinye sikhokha nini nokuthi ungaluqinisekisa kanjani usuku lwakho ngaphambi kokuthembela kulo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ufuna ukwazi idethi yakho yokukhokha kaDisemba, bheka isigaba sakho semali yesibonelelo kuqala. Khumbula: abantu abadala, izibonelelo zezingane, kanye ne-SRD zonke zikhokha ngezinsuku ezihluke ngokuphelele."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "UZibandlela uyinyanga ecindezela kakhulu onyakeni kwabamukeli bezibonelelo. Izitolo ezinkulu zigcwele phama, amanani aphakeme, futhi wonke umuntu ufisa ukuthola imali yakhe ngaphambi kwamaholide. Ungacabangi ukuthi imali yakho izofika ngosuku lokuqala lwenyanga. I-SASSA ikhipha izinkokhelo ukuze kuvinjelwe ama-ATM nezitolo ezinkulu ukuthi zingaminyana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "I-SASSA kwesinye isikhathi ishintsha izinsuku zikaDisemba ngaphambi kwesikhathi ukuze kuhlangatshezwane namaholide, okubangela ukudideka okukhulu. Unganciki onyakeni odlule's schedule. Check the official confirmation before joining a long ATM queue. If you mistake a children's usuku lokukhokha lwesibonelelo sosuku lwe-SRD, uzogcina ulinde ulayini wemali engakasulwa ngisho namanje."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lokukhokha luka-December 2026 olusemthethweni lwe-SASSA.\n2. Skrolela phansi uze uthole uhlobo oluqondile lwesibonelelo sakho.\n3. Bheka igama elithi \"Published\" eduze nosuku ukuze uqinisekise ukuthi liwujuqu.\n4. Khumbula ukuthi izimpelasonto namaholide azobambezela inkokhelo yakho.\n5. Uma usuku lwakho seludlulile futhi ungenayo imali, ngena kuphothali esemthethweni ukuze uhlole isimo sakho."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Phatha lolu hlelo lukaDisemba njengomhlahlandlela, hhayi isithembiso esibophezela ngokomthetho. Ngisho noma izinsuku zishicilelwa, ukubambezeleka kwebhange lobuchwepheshe kusengakuphoqa ukuthi ulinde amahora angama-24 engeziwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza lo mugqa wesikhathi ukukusiza wenze isabelomali, kodwa asabalalisi imali. Uma izinkokhelo zikaDisemba zibambezeleka kuzwelonke, i-SASSA kuphela engaxazulula inkinga."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa ishejuli kaDisemba ukuze wazi kahle ukuthi yini ongayilindela. Uma inkokhelo yakho yephuzile, i-GrantCare ikusiza ukuthi uqonde ukuthi ingabe kuwukubambezeleka kukazwelonke noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/december\n• /guides/payment-dates-2026\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-know-if-your-payment-is-ready\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe zonke izinsuku zika-December 2026 ziwujuqu?",
        "body": "Cha. Ezinye zingashicilelwa ngokusemthethweni kuyilapho ezinye zisalindelwe noma zisekelwe kuphothali."
      },
      {
        "title": "I-FAQ: Kungani ikhasi elilodwa likaDisemba lingabonisa amagama ahlukene okukhokha ngohlobo lwesibonelelo?",
        "body": "Ngoba akuzona zonke izigaba zesibonelelo ezibuyekezwa ngendlela efanayo ncamashi noma ohlelweni olufanayo lomphakathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku zikaDisemba 2026 ngokusemthethweni?",
        "body": "Yebo, ikakhulukazi uma udinga isiqiniseko sokugcina noma ikhasi lisabonisa amagama alindelekile noma engosi kuphela."
      }
    ]
  },
  "srd-payment-dates-june-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Juni 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zikaJuni 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngoJuni. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa kaJuni SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Ngenxa yokuthi imali iqinile maphakathi nonyaka, amashejuli mbumbulu we-'early payment' angena egazini njalo ngoJuni. Zivikele ngezinsuku zokwethemba kuphela eziphethe umaka we-'published' emithonjeni esemthethweni. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni ngoJuni.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sikaJuni. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi wango-June, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho kaJuni ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho kaJuni iyeza, ibambezelekile, noma ibambekile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/june/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani ngoJuni 2026 i-SRD ingase ibonise amagama engosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sikaJuni SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula lukaJuni SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-july-2026": {
    "title": "Izinsuku zokukhokha ze-SRD zikaJulayi 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zikaJulayi 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngoJulayi. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa kaJulayi SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Ungavumeli ukucindezeleka kwasebusika kukuphoqelele ekwenzeni izithembiso zezimali ngaphambi kokuba imali yakho ifike. Linda kuze kube yilapho isimo sakho sibuyekezwa ku-'approved' ngedethi yokugcina, eqinisekisiwe yokukhokha. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni ngoJulayi.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sikaJulayi. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi wangoJulayi, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho kaJulayi ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho kaJulayi iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/july/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani uJulayi 2026 i-SRD ingabonisa amagama asebenzisa ingosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sikaJulayi SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula lukaJulayi SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-august-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Agasti 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zika-Agasti 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngo-Agasti. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa ka-Agasti SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Abakhwabanisi basebenzisa igebe elide eliphakathi kwezinkokhelo zikaJulayi no-Agasti. Ngaphambi kokuthi uboleke imali kwisibonelelo sakho, qinisekisa ukuthi usuku lwakho luka-Agasti luqinisekisiwe ngokusemthethweni. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni ka-Agasti.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sika-August. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi wango-August, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho ka-Agasti ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho ka-Agasti iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/august/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani u-Agasti 2026 i-SRD ingase ibonise amagama engosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sika-August SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula luka-August SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-september-2026": {
    "title": "Izinsuku zokukhokha ze-SRD ngoSepthemba 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zikaSepthemba 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngoSepthemba. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa kaSepthemba SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Ungayethembi idethi kaSepthemba ethunyelwe kuwe ngeqembu le-WhatsApp. Lezi kuvame ukuba amashejuli amadala kusukela eminyakeni edlule. Njalo hlola kabili unyaka kanye nokukhishwa okusemthethweni kwe-SASSA. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi esemthethweni yesimo se-SRD kaSepthemba.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sikaSepthemba. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi kaSepthemba, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho kaSepthemba ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho kaSepthemba iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/september/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani uSepthemba 2026 i-SRD ingabonisa amagama asebenzisa ingosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi se-September SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula lwe-September SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-october-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Okthoba 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zika-Okthoba 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngo-Okthoba. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa ka-Okthoba SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Njengoba amaholide esondela, uhlelo lwe-SASSA luvamise ukuba nethrafikhi ephezulu. Lokhu kusho ukuthi inkokhelo yakho ka-Okthoba ingase ithathe usuku olwengeziwe ukubonakala, ngisho nangemva kwedethi esemthethweni. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni ka-Okthoba.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sika-Okthoba. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi wango-Okthoba, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho ka-Okthoba ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho ka-Okthoba iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/october/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani u-Okthoba 2026 i-SRD ingabonisa amagama asebenzisa ingosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sika-Okthoba SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula luka-Okthoba SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-november-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Novemba 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zikaNovemba 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngoNovemba. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa kaNovemba SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. Ngenxa yokuthi uNovemba uyisango lokuya emaholidini, noma yikuphi ukubambezeleka kubangela ukukhathazeka okukhulu. Khumbula ukuthi isibonelelo sakho siphela ngezinsuku ezahlukene kuye ngokuthi ingane, umuntu omdala, noma isibonelelo se-SRD. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni kaNovemba.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sangoNovemba. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi kaNovemba, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho yangoNovemba ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho yangoNovemba iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/november/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani uNovemba 2026 i-SRD ingabonisa amagama asebenzisa ingosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sika-November SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula lukaNovemba SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "srd-payment-dates-december-2026": {
    "title": "Izinsuku zokukhokha ze-SRD Disemba 2026",
    "summary": "Umhlahlandlela obalulekile wezinsuku zokukhokha zikaDisemba 2026 SRD. Sichaza ukuthi kungani isibonelelo sakho se-R350/R370 singalandeli ishejuli efanayo nezibonelelo ezivamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo se-SRD asinalo usuku olulodwa olukhulu lomholo lukazwelonke ngoDisemba. Kunalokho, i-SASSA icubungula lezi zinkokhelo ngamaqoqo isonto lonke lokugcina lenyanga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ufuna idethi eyodwa kaDisemba SRD, ufuna into engekho. Idethi yakho yokukhokha iyingqayizivele enombolweni yakho kamazisi futhi iqinisekiswa kuphela uma isimo sakho sishintsha sibe 'Approved' ngedethi ethile yokukhokha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi bayazi ukuthi abantu balangazelela izinsuku ze-SRD. Bazothumela amakhalenda mbumbulu ku-inthanethi ukuze bakhohlise. I-SASSA kwesinye isikhathi ishintsha izinsuku zikaDisemba ngaphambi kwesikhathi ukuze kuhlangatshezwane namaholide, okubangela ukudideka okukhulu. Unganciki ohlelweni lwangonyaka odlule. Hlola ukuqinisekiswa okusemthethweni ngaphambi kokujoyina ulayini omude we-ATM. Ungawi ngenxa yamahemuhemu e-\"SRD Payday\" eyodwa—hlola eyakho ingosi esikhundleni salokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ingosi yesimo ye-SRD esemthethweni ngoDisemba.\n2. Faka i-ID yakho nenombolo yocingo.\n3. Bheka isimo sakho sikaDisemba. Ingabe ilindile noma igunyaziwe?\n4. Uma kuvunyiwe, funda usuku oluqondile lokukhokha olubhalwe ngezansi.\n5. Linda i-SMS evela ebhange lakho, noma uyinikeze izinsuku ezingu-2-3 ukuze ibonakale."
      },
      {
        "title": "Kungani amakhasi esikhathi we-SRD edinga ukuqaphela okwengeziwe",
        "body": "Inkokhelo yakho ye-SRD iboshelwe ngqo ekuqinisekiseni kwakho kwanyanga zonke. Uma i-SASSA isahlola imininingwane yakho yasebhange noma umazisi wango-December, idethi yakho yokukhokha ngeke ivele okwamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa inkokhelo yakho ye-SRD. Uma idethi yakho kaDisemba ithi 'Null' noma ishoda ngokuphelele, kusho ukuthi i-SASSA isacubungula ifayela lakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imilayezo edidayo yesimo se-SRD ukuze wazi ukuthi inkokhelo yakho kaDisemba iyeza, ibambezelekile, noma isamile ku-loop yokuqinisekisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/december/social-relief\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-check-srd-status-online\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani u-December 2026 i-SRD ingase ibonise amagama engosi kuphela?",
        "body": "Ngoba idethi yomphakathi eyodwa ingase ingabonisi ngokuphephile zonke izimo ze-SRD futhi umzila osemthethweni usengaba umthombo wokugcina ongcono kakhulu."
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukusebenzisa i-GrantCare ukulandelela isikhathi sika-December SRD?",
        "body": "Yebo. I-GrantCare ingasiza ngesiqondiso nezikhumbuzi, kodwa hhayi ngokuqinisekiswa okusemthethweni ngokwako."
      },
      {
        "title": "I-FAQ: Kuthiwani uma enye iwebhusayithi ibonisa usuku olulodwa olulula luka-December SRD?",
        "body": "Phatha umzila osemthethweni we-SRD njengegunya lokugcina ngaphambi kokwethemba idethi yomphakathi ekopishiwe."
      }
    ]
  },
  "older-persons-grant-payment-dates-june-2026": {
    "title": "Izinsuku zokukhokhwa kweSibonelelo Sabantu Abadala ngoJuni 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaJuni 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngoJuni, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uJuni ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi imali iqinile maphakathi nonyaka, amashejuli mbumbulu we-'early payment' angena egazini njalo ngoJuni. Zivikele ngezinsuku zokwethemba kuphela eziphethe umaka we-'published' emithonjeni esemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoJuni ngokuqondile Isibonelelo Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala ngoJuni. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sabantu Abadala sibambezeleka ngoJuni, iphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sikaJuni. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/june/older-persons\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lesibonelelo sangoJuni 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-july-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngoJulayi 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaJulayi 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngoJulayi, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uJulayi ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungavumeli ukucindezeleka kwasebusika kukuphoqelele ekwenzeni izithembiso zezimali ngaphambi kokuba imali yakho ifike. Linda kuze kube yilapho isimo sakho sibuyekezwa ku-'approved' ngedethi yokugcina, eqinisekisiwe yokukhokha. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoJulayi ngokuqondile Yesibonelelo Sikahulumeni Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala ngoJulayi. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sabantu Abadala sibambezeleka ngoJulayi, yiphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sikaJulayi. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/july/older-persons\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sangoJulayi 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-august-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sabantu Abadala Agasti 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zika-Agasti 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngo-Agasti, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi u-August ulandela iphethini efana nse nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi basebenzisa igebe elide eliphakathi kwezinkokhelo zikaJulayi no-Agasti. Ngaphambi kokuthi uboleke imali kwisibonelelo sakho, qinisekisa ukuthi usuku lwakho luka-Agasti luqinisekisiwe ngokusemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha ka-Agasti yeSibonelelo Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala ka-Agasti. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sabantu Abadala sibambezeleka ngo-Agasti, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sika-Agasti. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/august/older-persons\n• /guides/how-to-understand-payment-dates\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lika-August 2026 elinikeza abantu abadala lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-september-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngoSepthemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaSepthemba 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngoSepthemba, sihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uSepthemba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungayethembi idethi kaSepthemba ethunyelwe kuwe ngeqembu le-WhatsApp. Lezi kuvame ukuba amashejuli amadala kusukela eminyakeni edlule. Njalo hlola kabili unyaka kanye nokukhishwa okusemthethweni kwe-SASSA. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoSepthemba ngokuqondile Yesibonelelo Sikahulumeni Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala kaSepthemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sabantu Abadala sibambezeleka ngoSepthemba, iphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sikaSepthemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/september/older-persons\n• /guides/approved-but-no-payment\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi elinikeza abantu abadala likaSepthemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-october-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngo-Okthoba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zika-Okthoba 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngo-Okthoba, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi u-Okthoba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njengoba amaholide esondela, uhlelo lwe-SASSA luvamise ukuba nethrafikhi ephezulu. Lokhu kusho ukuthi inkokhelo yakho ka-Okthoba ingase ithathe usuku olwengeziwe ukubonakala, ngisho nangemva kwedethi esemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha ka-Okthoba ngokuqondile Yesibonelelo Sikahulumeni Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala ka-Okthoba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sabantu Abadala sibambezeleka ngo-Okthoba, ingosi esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sika-Okthoba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/october/older-persons\n• /guides/how-payments-work\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lika-Okthoba 2026 elinikeza abantu abadala lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-november-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala Novemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaNovemba 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso oluqondile ngoNovemba, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uNovemba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi uNovemba uyisango lokuya emaholidini, noma yikuphi ukubambezeleka kubangela ukukhathazeka okukhulu. Khumbula ukuthi isibonelelo sakho siphela ngezinsuku ezahlukene kuye ngokuthi ingane, umuntu omdala, noma isibonelelo se-SRD. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoNovemba ngokuqondile Yesibonelelo Sikahulumeni Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala kaNovemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sabantu Abadala sibambezeleka ngoNovemba, iphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sikaNovemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/november/older-persons\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lezibonelelo langoNovemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "older-persons-grant-payment-dates-december-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sabantu Abadala ngoDisemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaDisemba 2026 zeSibonelelo Sabantu Abadala. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sabantu Abadala ngokuvamile sikhokha ngosuku lwaso olukhethekile ngo-December, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uDisemba ulandela iphethini efana ncamashi nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "I-SASSA kwesinye isikhathi ishintsha izinsuku zikaDisemba ngaphambi kwesikhathi ukuze kuhlangatshezwane namaholide, okubangela ukudideka okukhulu. Unganciki ohlelweni lwangonyaka odlule. Hlola ukuqinisekiswa okusemthethweni ngaphambi kokujoyina ulayini omude we-ATM. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yango-December ukuze uthole Isibonelelo Sabantu Abadala.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sabantu Abadala kaDisemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sabantu Abadala sibambezeleka ngo-December, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sabadala sikaDisemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/december/older-persons\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lango-December 2026 elinikeza abantu abadala lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sabantu abadala?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yabantu abadala ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-june-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sikahulumeni Sezingane ngoJuni 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaJuni 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngoJuni, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uJuni ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi imali iqinile maphakathi nonyaka, amashejuli mbumbulu we-'early payment' angena egazini njalo ngoJuni. Zivikele ngezinsuku zokwethemba kuphela eziphethe umaka we-'published' emithonjeni esemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoJuni ngokuqondile Isibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sikaJuni. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngoJuni, yiphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sikaJuni. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/june/children\n• /guides/how-to-understand-payment-dates\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi likaJuni 2026 lesibonelelo sengane lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-july-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sezingane zikaJulayi 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaJulayi 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngoJulayi, oluhluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uJulayi ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungavumeli ukucindezeleka kwasebusika kukuphoqelele ekwenzeni izithembiso zezimali ngaphambi kokuba imali yakho ifike. Linda kuze kube yilapho isimo sakho sibuyekezwa ku-'approved' ngedethi yokugcina, eqinisekisiwe yokukhokha. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoJulayi ngokuqondile Yesibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sikaJulayi. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngo-Julayi, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sikaJulayi. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/july/children\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi likaJulayi 2026 lesibonelelo sengane lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-august-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sikahulumeni Sezingane Agasti 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zika-Agasti 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngo-Agasti, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi u-August ulandela iphethini efana nse nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abakhwabanisi basebenzisa igebe elide eliphakathi kwezinkokhelo zikaJulayi no-Agasti. Ngaphambi kokuthi uboleke imali kwisibonelelo sakho, qinisekisa ukuthi usuku lwakho luka-Agasti luqinisekisiwe ngokusemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha ka-August ngokuqondile Yesibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sika-Agasti. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngo-Agasti, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sika-Agasti. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/august/children\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sezingane lika-Agasti 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-september-2026": {
    "title": "Izinsuku zokukhokha zeSibonelelo Sezingane zikaSepthemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaSepthemba 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngoSepthemba, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uSepthemba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ungayethembi idethi kaSepthemba ethunyelwe kuwe ngeqembu le-WhatsApp. Lezi kuvame ukuba amashejuli amadala kusukela eminyakeni edlule. Njalo hlola kabili unyaka kanye nokukhishwa okusemthethweni kwe-SASSA. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoSepthemba ngokukhethekileyo Yesibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sikaSepthemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngoSepthemba, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sikaSepthemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/september/children\n• /guides/how-payments-work\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sezingane likaSepthemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-october-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sikahulumeni Sezingane Okthoba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zika-Okthoba 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngo-Okthoba, oluhluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi u-Okthoba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njengoba amaholide esondela, uhlelo lwe-SASSA luvamise ukuba nethrafikhi ephezulu. Lokhu kusho ukuthi inkokhelo yakho ka-Okthoba ingase ithathe usuku olwengeziwe ukubonakala, ngisho nangemva kwedethi esemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha ka-Okthoba ngokuqondile Yesibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sika-Okthoba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngo-Okthoba, yiphothali esemthethweni ye-SASSA kuphela engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sika-Okthoba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/october/children\n• /guides/how-to-fix-missing-payment-issues\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi lesibonelelo sezingane lika-Okthoba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-november-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sikahulumeni Sezingane Novemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaNovemba 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngoNovemba, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uNovemba ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi uNovemba uyisango lokuya emaholidini, noma yikuphi ukubambezeleka kubangela ukukhathazeka okukhulu. Khumbula ukuthi isibonelelo sakho siphela ngezinsuku ezahlukene kuye ngokuthi ingane, umuntu omdala, noma isibonelelo se-SRD. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoNovemba ngokuqondile Yesibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sangoNovemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngoNovemba, yingosi esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sikaNovemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/november/children\n• /guides/how-to-understand-payment-dates\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sezingane likaNovemba 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "child-support-grant-payment-dates-december-2026": {
    "title": "Izinsuku zokukhokha Isibonelelo Sikahulumeni Sezingane Disemba 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaDisemba 2026 zeSibonelelo Sezingane. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sezingane ngokuvamile sikhokha ngosuku lwaso oluqondile ngo-December, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uDisemba ulandela iphethini efana ncamashi nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "I-SASSA kwesinye isikhathi ishintsha izinsuku zikaDisemba ngaphambi kwesikhathi ukuze kuhlangatshezwane namaholide, okubangela ukudideka okukhulu. Unganciki ohlelweni lwangonyaka odlule. Hlola ukuqinisekiswa okusemthethweni ngaphambi kokujoyina ulayini omude we-ATM. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yango-December ukuze uthole Isibonelelo Sikahulumeni Sezingane.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sezingane sangoDisemba. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sezingane sibambezeleka ngo-December, yingosi esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sezingane sikaDisemba. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/december/children\n• /guides/why-payment-is-delayed\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ikhasi likaDisemba 2026 lesibonelelo sikahulumeni lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sezingane?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sikahulumeni yengane ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "disability-grant-payment-dates-may-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka ngoMeyi 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaMeyi 2026 zeSibonelelo Sokukhubazeka. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sokukhubazeka ngokuvamile sikhokha ngosuku lwaso oluqondile ngoMeyi, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uMeyi ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Kuyakulinga ukukholelwa idethi yokuqala yokukhokha kaMeyi oyibona ku-Facebook. Ungakwenzi. Ngaso sonke isikhathi hlola ukuthi idethi ishicilelwe ngokusemthethweni yi-SASSA noma iwukuqagela nje okufundile. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoMeyi ngokuqondile yeSibonelelo Sokukhubazeka.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sokukhubazeka kaMeyi. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sokukhubazeka sibambezeleka ngoMeyi, yingosi esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sokukhubazeka ngoMeyi. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/may/disability\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sabakhubazekile langoMeyi 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sokukhubazeka?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sokukhubazeka ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
      }
    ]
  },
  "disability-grant-payment-dates-june-2026": {
    "title": "Izinsuku zokukhokha Zesibonelelo Sikahulumeni Sokukhubazeka ngoJuni 2026",
    "summary": "Umhlahlandlela ogxile wezinsuku zokukhokha zikaJuni 2026 zeSibonelelo Sokukhubazeka. Sinqamule umsindo ukuze wazi kahle ukuthi imali yakho iphuma nini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isibonelelo Sikahulumeni Sokukhubazeka ngokuvamile sikhokha ngosuku lwaso oluqondile ngoJuni, esihluke ngokuphelele kwezinye izibonelelo. Kufanele uqinisekise isimo se-'Published' salolu suku ngaphambi kokuya ku-ATM."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngisho noma ubona idethi ku-inthanethi, i-SASSA ingase ilungise ishejuli ngenxa yezimpelasonto noma amaholide omphakathi. Ungacabangi ukuthi uJuni ulandela iphethini efanayo nenyanga edlule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngenxa yokuthi imali iqinile maphakathi nonyaka, amashejuli mbumbulu we-'early payment' angena egazini njalo ngoJuni. Zivikele ngezinsuku zokwethemba kuphela eziphethe umaka we-'published' emithonjeni esemthethweni. Ukufika e-ATM ngosuku kusenesikhathi kusho ukumosha imali yokugibela amatekisi nokuchitha amahora emgqeni ungenalutho. Vikela isikhathi sakho ngokuhlola kabili isimo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ishejuli yokukhokha yangoJuni ngokuqondile iSibonelelo Sokukhubazeka.\n2. Bheka ilebula yokukhokha—ingabe ithi 'Expected' noma 'Published'?\n3. Maka usuku olushicilelwe ekhalendeni lakho.\n4. Linda kuze kube ntambama yalolo suku ngaphambi kokuhoxa, ukuze uqinisekise ukuthi amaseva asebhange avumelanisiwe.\n5. Uma usuku ludlula ngaphandle kwemali, hlola isimo sakho esisemthethweni se-SASSA."
      },
      {
        "title": "Ungalifunda kanjani ikhasi kahle",
        "body": "Leli khasi lihlinzeka ngomugqa wesikhathi osemthethweni weSibonelelo Sokukhubazeka kaJuni. Kuphathe lokhu njengomhlahlandlela oqinisekisiwe, kodwa khumbula ukuthi ukubambezeleka kobuchwepheshe phakathi koMnyango Wezezimali nebhange lakho elithile kusengenzeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso sokuhlela esizimele. Uma Isibonelelo Sakho Sokukhubazeka sibambezeleka ngoJuni, iphothali esemthethweni kuphela ye-SASSA engakutshela ukuthi kungani."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina unolwazi mayelana nesikhathi sesibonelelo sokukhubazeka sangoJuni. Uma kukhona okungahambi kahle, sebenzisa i-GrantCare ukuze uthole ukuthi ingabe kuwukubambezeleka kwebhange okuvamile noma inkinga ye-akhawunti yomuntu siqu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates/2026/june/disability\n• /guides/how-payments-work\n• /status/approved\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lesibonelelo sabakhubazekile likaJuni 2026 lihlala libonisa usuku lokugcina olusemthethweni?",
        "body": "Hhayi njalo. Ikhasi lingabonisa amalebula ashicilelwe, alindelwe, noma amanye esikhathi kuye ngesimo samanje solwazi."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngifunde inothi eduze kosuku lwesibonelelo sokukhubazeka?",
        "body": "Ngoba inothi livame ukuchaza ukuthi idethi iqinisekisiwe, iyalinganiselwa, noma isadinga ukuqinisekiswa okusemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma inkokhelo yesibonelelo sokukhubazeka ingakafiki ngemva kosuku olubonakalayo?",
        "body": "Hlola amagama akamuva, bese uwaqhathanisa nezinkokhelo ezihlobene neziqondiso zesimo ngaphambi kokuthatha ukuthi inkokhelo ayikho."
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

export const SEO_BATCH_NINE_GUIDES = SEO_BATCH_NINE_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
