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
  keyFocusTitle = "How to think about it",
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

type GrantProfile = {
  guideSlugBase: string;
  slug:
    | "older-persons"
    | "disability"
    | "child-support"
    | "social-relief"
    | "foster-child"
    | "care-dependency"
    | "grant-in-aid";
  name: string;
  audience: string;
  fitSignals: string;
  docs: string;
  caution: string;
  routeNote: string;
};

const GRANTS: GrantProfile[] = [
  {
    guideSlugBase: "older-persons-grant",
    slug: "older-persons",
    name: "Older Persons Grant",
    audience: "people aged 60 or older who may need support",
    fitSignals: "being 60 or older, living in South Africa, and meeting the means-test rules",
    docs: "an ID document, marital-status proof where relevant, and income or asset details",
    caution:
      "the age and means-test position matter, so it helps to read the grant-specific guidance before assuming you qualify",
    routeNote:
      "the official application route should still be used for the actual application and final rule confirmation",
  },
  {
    guideSlugBase: "disability-grant",
    slug: "disability",
    name: "Disability Grant",
    audience: "adults with a disability that limits work or daily function",
    fitSignals:
      "being in the broad adult age range for the grant, having a disability-related need, and meeting the means-test rules after assessment",
    docs: "an ID document, a recent medical report, and income or asset details",
    caution:
      "medical assessment and official disability-related requirements matter, so broad guidance should not be treated as guaranteed approval",
    routeNote:
      "the official route remains the place for medical, application, and final eligibility decisions",
  },
  {
    guideSlugBase: "child-support-grant",
    slug: "child-support",
    name: "Child Support Grant",
    audience: "primary caregivers of a child who may need regular support",
    fitSignals:
      "being the primary caregiver, having a child in your care, and falling within the means-test rules that apply",
    docs: "an ID document, the child’s birth certificate, and proof of income where required",
    caution:
      "caregiver status and means-test rules both matter, so it helps to confirm the official details before applying",
    routeNote:
      "the actual application and final document list still belong to the official government process",
  },
  {
    guideSlugBase: "social-relief",
    slug: "social-relief",
    name: "Social Relief of Distress",
    audience: "people with very limited or no income support who may need short-term relief",
    fitSignals:
      "having little or no income support, fitting the official relief rules, and using the right official status or application route",
    docs: "an ID document, a working phone number, and banking details where required",
    caution:
      "this category often depends on portal-based updates and official rule wording, so a guide should not be treated as final approval",
    routeNote:
      "the official SRD-related route is still the place for the real application and official status actions",
  },
  {
    guideSlugBase: "foster-child-grant",
    slug: "foster-child",
    name: "Foster Child Grant",
    audience: "caregivers of a child placed in foster care",
    fitSignals:
      "having a valid foster-care placement, the child in your care, and the supporting legal record needed for the case",
    docs: "an ID document, the child’s birth certificate, and the relevant court order",
    caution:
      "the legal placement record matters a lot here, so official document guidance should be checked carefully",
    routeNote:
      "the official route remains the place for the actual application and for confirming which records are required",
  },
  {
    guideSlugBase: "care-dependency-grant",
    slug: "care-dependency",
    name: "Care Dependency Grant",
    audience: "caregivers of a child with severe disability-related care needs",
    fitSignals:
      "caring for a child under 18, having disability-related care needs confirmed through the proper process, and meeting the means-test rules that apply",
    docs: "an ID document, the child’s birth certificate, and a medical report",
    caution:
      "medical assessment and caregiver context are both central, so broad guidance should be checked against the official route before applying",
    routeNote:
      "the official process is still required for the real assessment, documents, and final decision",
  },
  {
    guideSlugBase: "grant-in-aid",
    slug: "grant-in-aid",
    name: "Grant-in-Aid",
    audience: "people who already receive a qualifying grant and now need full-time care support",
    fitSignals:
      "already receiving a qualifying grant, needing regular full-time care, and having the supporting medical or care evidence required",
    docs: "an ID document, a medical report, and the details of the existing qualifying grant",
    caution:
      "this is not a stand-alone starting grant for most users, so the existing qualifying grant and care need both matter",
    routeNote:
      "the official route should still be used for the actual application and final confirmation that the grant relationship qualifies",
  },
];

function applicationGuide(grant: GrantProfile, sortOrder: number) {
  return guide({
    slug: `${grant.guideSlugBase}-how-to-apply`,
    title: `${grant.name} how to apply`,
    summary:
      `A simple guide to preparing for a ${grant.name.toLowerCase()} application, using the correct official route, and avoiding mistakes that create early delays.`,
    quickAnswer:
      `To apply for the ${grant.name.toLowerCase()}, first confirm that this grant fits your situation, gather the likely documents, and then use the correct official application route. GrantCare can help you prepare, but it does not submit the application for you.`,
    whatThisMeans:
      `Applying works best when it starts with the right grant category. The ${grant.name.toLowerCase()} is meant for ${grant.audience}. That makes preparation important, because using the wrong route or starting without the right records can create delays before the case really begins.`,
    whyThisMatters:
      `Users often jump straight into an online search for the form and only later realise that they were missing the right documents or were unclear about the grant itself. ${grant.caution}.`,
    steps:
      `1. Confirm that the ${grant.name.toLowerCase()} matches your situation.\n2. Gather the likely documents before starting.\n3. Check your personal details and contact details carefully.\n4. Use the proper official route to begin the application.\n5. Save any official references or confirmations once the application step is done.`,
    keyFocusTitle: "The best way to start the application",
    keyFocus:
      `The best start is not speed on its own. The better start is clarity: the right grant, the right documents, the right official route. That keeps the process cleaner and reduces avoidable stress later.`,
    important:
      `GrantCare is an independent information platform. It does not replace the official application route. ${grant.routeNote}.`,
    help:
      `GrantCare can help you compare grant types, understand what broad documents may be needed, and move from general application questions into the one guide that fits your case most closely.`,
    related:
      `Useful next pages:\n• /grants/${grant.slug}\n• /guides/${grant.guideSlugBase}-who-may-qualify\n• /guides/${grant.guideSlugBase}-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying`,
    faqs: [
      {
        question: `Can I apply for the ${grant.name.toLowerCase()} on GrantCare?`,
        answer: "No. GrantCare helps you prepare and understand the process, but the official application must happen on the official route.",
      },
      {
        question: `Should I start the ${grant.name.toLowerCase()} application before I gather documents?`,
        answer: "It is usually safer to gather the likely documents first so you do not create avoidable delays.",
      },
      {
        question: `What matters most before I apply for the ${grant.name.toLowerCase()}?`,
        answer: "Confirm that the grant fits your situation and that you are using the correct official route.",
      },
    ],
    sortOrder,
  });
}

function eligibilityGuide(grant: GrantProfile, sortOrder: number) {
  return guide({
    slug: `${grant.guideSlugBase}-who-may-qualify`,
    title: `${grant.name} who may qualify`,
    summary:
      `A plain-language guide to the broad signs that may point toward ${grant.name.toLowerCase()} eligibility, without promising an official outcome.`,
    quickAnswer:
      `You may qualify for the ${grant.name.toLowerCase()} if your situation matches the broad purpose of the grant and the official rules that go with it. The safest way to treat this page is as guidance, not as final approval.`,
    whatThisMeans:
      `The ${grant.name.toLowerCase()} is meant for ${grant.audience}. Broadly, people usually start by checking whether the grant’s purpose matches their life situation before they worry about forms or status pages.`,
    whyThisMatters:
      `A lot of confusion starts when users try to force their situation into the wrong grant type. The more useful question is whether the grant’s purpose really fits your circumstances. For this grant, the broad signs often include ${grant.fitSignals}.`,
    steps:
      `1. Compare your situation with the broad purpose of the ${grant.name.toLowerCase()}.\n2. Check whether the main official rule areas seem relevant to you.\n3. Review the likely document categories that support the case.\n4. Use the eligibility checker if you still feel unsure.\n5. Confirm the final rules through the official route before applying.`,
    keyFocusTitle: "How to think about qualification safely",
    keyFocus:
      `Qualification guidance is most useful when it narrows the direction without pretending to decide the case. That means using the broad signs to guide your next step, while still leaving the final answer to the official process.`,
    important:
      `GrantCare cannot guarantee approval or tell you the final official outcome. It can only help you understand whether the ${grant.name.toLowerCase()} looks like a reasonable direction to explore next.`,
    help:
      `GrantCare can help you compare this grant with other support types, understand the broad rule areas in simple language, and move toward the correct application and document guides.`,
    related:
      `Useful next pages:\n• /grants/${grant.slug}\n• /guides/${grant.guideSlugBase}-how-to-apply\n• /guides/${grant.guideSlugBase}-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you`,
    faqs: [
      {
        question: `Does this page mean I will be approved for the ${grant.name.toLowerCase()}?`,
        answer: "No. It gives broad guidance only. The official process still decides the outcome.",
      },
      {
        question: `What broad signs matter most for the ${grant.name.toLowerCase()}?`,
        answer: `The broad fit usually includes ${grant.fitSignals}.`,
      },
      {
        question: `What if I am not sure whether this grant fits me?`,
        answer: "Use the eligibility checker and compare this grant with the other grant-type pages before starting an official application.",
      },
    ],
    sortOrder,
  });
}

function documentsGuide(grant: GrantProfile, sortOrder: number) {
  return guide({
    slug: `${grant.guideSlugBase}-documents-you-may-need`,
    title: `${grant.name} documents you may need`,
    summary:
      `A practical guide to the likely document categories for the ${grant.name.toLowerCase()} so you can prepare early without guessing.`,
    quickAnswer:
      `For the ${grant.name.toLowerCase()}, it helps to prepare the main identity, support, and grant-specific records before you start. The final official checklist still belongs to the official route, but early preparation reduces stress.`,
    whatThisMeans:
      `Documents are often where an application becomes easier or harder. For the ${grant.name.toLowerCase()}, users usually need to think about ${grant.docs}. The exact official list can vary, which is why this page should be used as preparation guidance rather than as the last word.`,
    whyThisMatters:
      `People often discover document gaps too late, when they are already trying to submit or fix a problem. A better approach is to think in categories first and then confirm the final list on the official route.`,
    steps:
      `1. Start with the broad document categories linked to the ${grant.name.toLowerCase()}.\n2. Check that names and personal details match across the records.\n3. Keep the main documents together in one place.\n4. Use the official route to confirm the final checklist.\n5. Save the final checklist for reference before you begin the application.`,
    keyFocusTitle: "What document preparation is really for",
    keyFocus:
      `Document preparation is not about collecting everything in panic. It is about making sure the grant-specific proof makes sense for your case before you start the official process.`,
    important:
      `GrantCare should not be treated as the final official document list. Sensitive records should only be used through the proper official route when you are ready to submit or confirm the case.`,
    help:
      `GrantCare can help you think about likely document categories, compare grant pages, and move from document questions into the next relevant application or eligibility guide.`,
    related:
      `Useful next pages:\n• /grants/${grant.slug}\n• /guides/${grant.guideSlugBase}-how-to-apply\n• /guides/${grant.guideSlugBase}-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying`,
    faqs: [
      {
        question: `What broad documents often matter for the ${grant.name.toLowerCase()}?`,
        answer: `Common categories often include ${grant.docs}.`,
      },
      {
        question: `Should I wait until the official form opens before checking documents?`,
        answer: "It is usually better to prepare early so you are not rushed later.",
      },
      {
        question: `Can GrantCare give me the final official checklist for the ${grant.name.toLowerCase()}?`,
        answer: "GrantCare can guide you, but the final official checklist still belongs to the relevant government route.",
      },
    ],
    sortOrder,
  });
}

const grantSpecificGuides = GRANTS.flatMap((grant, index) => {
  const baseSortOrder = 174 + index * 3;
  return [
    applicationGuide(grant, baseSortOrder),
    eligibilityGuide(grant, baseSortOrder + 1),
    documentsGuide(grant, baseSortOrder + 2),
  ];
});

export const SEO_BATCH_TEN_GUIDES = [
  ...grantSpecificGuides,
  guide({
    slug: "how-to-apply-online-for-social-relief",
    title: "How to apply online for social relief",
    summary:
      "A simple guide to preparing for an online social-relief application and using the official route safely without mixing it up with independent guidance.",
    quickAnswer:
      "To apply online for social relief, first confirm that social relief looks like the right support type for your situation, gather the likely details you need, and then use the correct official route for the actual application.",
    whatThisMeans:
      "Online social-relief applications feel urgent because people often search for them when they need support quickly. That makes it even more important to separate preparation from official action. The official route handles the real application. GrantCare helps you prepare for it.",
    whyThisMatters:
      "Rushing into the first page you find can lead to the wrong route, missing details, or confusion about what the online process is really asking you to do. A little preparation makes the online step much easier to handle.",
    steps:
      "1. Check whether social relief seems like the right support category.\n2. Gather your main personal details and likely supporting information.\n3. Use the correct official online route for the application.\n4. Save any confirmation or reference after the official step.\n5. Use GrantCare afterward if you need help understanding status or payment wording.",
    keyFocusTitle: "The safest online-application habit",
    keyFocus:
      "The safest habit is to let the official route handle the action while you use GrantCare only for preparation and explanation. That keeps the process clear and protects trust.",
    important:
      "GrantCare is not the official online application portal. It should never be treated as one. Official social-relief applications still belong to the official route.",
    help:
      "GrantCare can help you compare social relief with other grant types, check likely document categories, and understand the next steps once the official application has been started.",
    related:
      "Useful next pages:\n• /guides/social-relief-how-to-apply\n• /guides/social-relief-who-may-qualify\n• /guides/social-relief-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-find-the-official-application-form-safely",
    faqs: [
      {
        question: "Can I complete the online social-relief application on GrantCare?",
        answer: "No. GrantCare helps you prepare and understand the process, but the official application must happen on the official route.",
      },
      {
        question: "Why should I prepare before applying online?",
        answer: "Preparation reduces avoidable mistakes and helps you use the official route more confidently.",
      },
      {
        question: "What should I do after I apply online?",
        answer: "Keep your confirmation, follow the official route for updates, and use GrantCare if you need help understanding the wording you later see.",
      },
    ],
    sortOrder: 195,
  }),
  guide({
    slug: "how-to-prepare-for-an-online-application",
    title: "How to prepare for an online application",
    summary:
      "A practical checklist guide for getting ready before you start an online grant-related application on the official route.",
    quickAnswer:
      "Prepare for an online application by checking the grant type first, gathering your likely documents, making sure your phone and details are current, and only then moving into the official form.",
    whatThisMeans:
      "Online application problems often begin before the form opens. Users may not know which grant fits, may not have the right details nearby, or may try to complete the form while missing key information.",
    whyThisMatters:
      "The better prepared you are, the less likely you are to make avoidable mistakes once you are inside the official route. Preparation also makes it easier to stop and confirm something before it becomes a bigger problem.",
    steps:
      "1. Confirm which grant or support type fits your case.\n2. Gather the likely documents and supporting information.\n3. Check your phone number, personal details, and payment details where relevant.\n4. Make sure you are using the right official route.\n5. Start the official application only once the basics are ready.",
    keyFocusTitle: "The real purpose of preparation",
    keyFocus:
      "Preparation is not delay for the sake of delay. It is the fastest way to avoid avoidable confusion once the online form is open and asking for real answers.",
    important:
      "GrantCare can help you prepare, but the official application still belongs to the official route. Preparation should make that step easier, not replace it.",
    help:
      "GrantCare can help you choose the right grant type, review likely document categories, and read grant-specific guides before the official online form begins.",
    related:
      "Useful next pages:\n• /guides/how-to-prepare-before-applying\n• /guides/what-to-check-before-you-start-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/what-documents-you-may-need\n• /eligibility-checker",
    faqs: [
      {
        question: "Why prepare before opening the official form?",
        answer: "Because the form is much easier to complete when you already know the grant type and have the likely records ready.",
      },
      {
        question: "What should I check first?",
        answer: "Check the grant type and your main personal details first, then gather the likely supporting records.",
      },
      {
        question: "Can preparation improve my chances?",
        answer: "It cannot promise approval, but it can reduce avoidable mistakes and confusion.",
      },
    ],
    sortOrder: 196,
  }),
  guide({
    slug: "what-to-do-if-an-online-application-form-confuses-you",
    title: "What to do if an online application form confuses you",
    summary:
      "A low-pressure guide for users who open an official application form and feel lost, overwhelmed, or unsure what the questions are really asking.",
    quickAnswer:
      "If an online application form confuses you, slow down, leave the form for a moment if needed, and work out which part is unclear before continuing. Confusion is a sign to clarify, not to guess.",
    whatThisMeans:
      "Many people assume they should keep pushing forward when a form becomes confusing. In reality, a short pause often prevents bigger mistakes. The safest move is to understand the confusing part before continuing with the official form.",
    whyThisMatters:
      "Guessing inside an official application form can create the kind of mistake that later turns into a decline, a delay, or a document problem. It is better to stop and clarify one section than to rush through the whole thing.",
    steps:
      "1. Pause and identify which part of the form feels confusing.\n2. Check whether the confusion is about the grant type, the wording, or a document request.\n3. Use the matching GrantCare guide to understand that topic.\n4. Return to the official form only once the issue is clearer.\n5. Save any progress if the official route allows it.",
    keyFocusTitle: "The safest response to confusion",
    keyFocus:
      "The safest response is not speed. It is clarity. Once you know whether the confusion comes from wording, documents, or the grant type itself, the form becomes much easier to handle correctly.",
    important:
      "GrantCare does not complete official forms for you, but it can explain the surrounding concepts so you are not guessing your way through the official process.",
    help:
      "GrantCare can help you clarify grant-type fit, likely documents, and application wording before you return to the official form with more confidence.",
    related:
      "Useful next pages:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/what-documents-you-may-need\n• /guides/common-online-application-mistakes\n• /eligibility-checker",
    faqs: [
      {
        question: "Should I just guess and keep going?",
        answer: "No. It is safer to pause and understand the confusing part first.",
      },
      {
        question: "What if I am not even sure the grant type is right?",
        answer: "Start there first. Grant-type confusion often creates the rest of the form confusion.",
      },
      {
        question: "Can GrantCare explain the form itself?",
        answer: "GrantCare can explain the surrounding topics in plain language, which often makes the official form easier to understand.",
      },
    ],
    sortOrder: 197,
  }),
  guide({
    slug: "common-online-application-mistakes",
    title: "Common online application mistakes",
    summary:
      "A practical guide to the avoidable mistakes people make in online grant applications and the habits that reduce them.",
    quickAnswer:
      "Common online application mistakes usually come from rushing, using the wrong grant route, typing details carelessly, or starting before the necessary documents are ready.",
    whatThisMeans:
      "Most online application problems are not dramatic. They are small mistakes that become bigger later because the form is official and the information matters. That is why prevention matters so much.",
    whyThisMatters:
      "If users know the usual mistake patterns ahead of time, they can avoid the most common delays before they happen. That is usually easier than fixing the problem after submission.",
    steps:
      "1. Confirm the correct grant type before opening the form.\n2. Gather your likely documents first.\n3. Enter details slowly and check them once more.\n4. Avoid unofficial routes that only look convenient.\n5. Save confirmation or references after the official step is done.",
    keyFocusTitle: "The mistake behind many other mistakes",
    keyFocus:
      "The mistake behind many other mistakes is rushing. Once users slow down enough to confirm the route, the grant type, and the key details, many smaller errors disappear on their own.",
    important:
      "GrantCare cannot remove official mistakes after the fact, but it can help users recognise the most common patterns before they create bigger problems.",
    help:
      "GrantCare can help you prepare for the form, choose the right grant type, and check likely document needs before the official application starts.",
    related:
      "Useful next pages:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/what-to-check-before-you-start-an-online-application\n• /guides/what-to-do-if-an-online-application-form-confuses-you\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-apply-without-using-unofficial-websites",
    faqs: [
      {
        question: "What is the most common online application mistake?",
        answer: "Starting too fast without first confirming the grant type, route, and key details.",
      },
      {
        question: "Can small mistakes really cause delays?",
        answer: "Yes. A small detail mismatch can create a much bigger problem later in the process.",
      },
      {
        question: "What habit prevents the most mistakes?",
        answer: "Slow, careful preparation before the official form opens.",
      },
    ],
    sortOrder: 198,
  }),
  guide({
    slug: "how-to-know-which-grant-application-fits-you",
    title: "How to know which grant application fits you",
    summary:
      "A decision-focused guide to choosing the right grant direction before starting an official application route.",
    quickAnswer:
      "The right grant application fits when the purpose of the grant matches your real situation. Start there first before looking for forms or online portals.",
    whatThisMeans:
      "Many users start by searching for any application form they can find. A better start is to ask which grant category actually fits their circumstances. That often prevents the biggest type of application mistake: using the wrong route from the beginning.",
    whyThisMatters:
      "If you choose the wrong grant direction, later document questions, status messages, and delays can all become more confusing. Choosing the right direction first keeps the whole process simpler.",
    steps:
      "1. Think about who the support is meant for in your situation.\n2. Compare your case with the main grant categories.\n3. Read the broad qualification and document guides for the likely fit.\n4. Use the eligibility checker if you still feel unsure.\n5. Move to the official application route only once the grant direction makes sense.",
    keyFocusTitle: "The question that solves most confusion",
    keyFocus:
      "The most useful question is not where is the form. The better question is which grant is this really for. Once that becomes clear, most of the later application decisions become easier.",
    important:
      "GrantCare can help narrow the direction, but it cannot make the final official decision about eligibility or approval. The official route still decides that.",
    help:
      "GrantCare can help you compare grants, review broad qualification signs, and move from confusion into the one application path that looks most relevant.",
    related:
      "Useful next pages:\n• /eligibility-checker\n• /grants\n• /guides/who-may-qualify-for-support\n• /guides/how-to-apply-for-support\n• /guides/how-to-prepare-for-an-online-application",
    faqs: [
      {
        question: "Should I pick the first form I find online?",
        answer: "No. Start by choosing the grant type that actually fits your situation.",
      },
      {
        question: "What if more than one grant seems possible?",
        answer: "Compare the grant pages and broad qualification guides first, then confirm the official route that matches your case.",
      },
      {
        question: "Can GrantCare choose the final grant for me?",
        answer: "No. It can guide you, but the official route still controls the actual application and decision.",
      },
    ],
    sortOrder: 199,
  }),
  guide({
    slug: "what-to-check-before-you-start-an-online-application",
    title: "What to check before you start an online application",
    summary:
      "A readiness checklist guide for users who want to avoid obvious problems before they begin an official online application.",
    quickAnswer:
      "Before you start an online application, check the grant type, likely documents, personal details, phone access, and the official route itself. Those checks prevent many avoidable problems.",
    whatThisMeans:
      "The easiest time to fix a mistake is before the official form starts. Once you are inside the application flow, the pressure usually increases and clear thinking becomes harder.",
    whyThisMatters:
      "A short readiness check can prevent the biggest types of online-form confusion: wrong grant category, missing records, incorrect details, and unsafe routes.",
    steps:
      "1. Confirm which grant or support type fits you.\n2. Gather the likely documents.\n3. Check your phone number and personal details.\n4. Make sure the route you plan to use is the correct official one.\n5. Only then begin the online application.",
    keyFocusTitle: "Why this checklist matters so much",
    keyFocus:
      "The point of a readiness check is not to slow you down for no reason. It is to stop simple avoidable problems from turning into official delays once the form is underway.",
    important:
      "GrantCare can help you prepare and think clearly, but the official application still needs to happen on the official route. Readiness should make that step easier, not replace it.",
    help:
      "GrantCare can help you compare grant categories, likely document needs, and form-preparation pages before you open the official application route.",
    related:
      "Useful next pages:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/common-online-application-mistakes\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/what-documents-you-may-need\n• /eligibility-checker",
    faqs: [
      {
        question: "What should I check first?",
        answer: "Check the grant type first, then the documents and key personal details.",
      },
      {
        question: "Why check the route before the form starts?",
        answer: "Because using the wrong route can create confusion before the real process even begins.",
      },
      {
        question: "Can this checklist reduce delays?",
        answer: "It cannot guarantee speed, but it can reduce obvious avoidable mistakes.",
      },
    ],
    sortOrder: 200,
  }),
  guide({
    slug: "what-to-do-if-your-application-form-will-not-open",
    title: "What to do if your application form will not open",
    summary:
      "A simple troubleshooting guide for official application forms that fail to load or seem unavailable, without turning the issue into more than it is.",
    quickAnswer:
      "If your application form will not open, start by checking the route, the connection, and the page itself before assuming the application process is gone or blocked.",
    whatThisMeans:
      "A form that will not open is usually a technical or route problem first, not a result or eligibility decision. That distinction matters because it changes how you should respond.",
    whyThisMatters:
      "Users often panic when a form fails to open and then jump to copied links or unofficial pages. A slower technical check is safer than a rushed move to the wrong route.",
    steps:
      "1. Check that you are on the correct official route.\n2. Refresh the page or retry the browser.\n3. Confirm your connection is stable.\n4. Avoid random copied links that promise the same form.\n5. Return to the official route once the access problem is solved.",
    keyFocusTitle: "What this problem usually is",
    keyFocus:
      "A form that will not open is usually a route, browser, or timing issue. Treating it like a technical access problem first often prevents riskier mistakes later.",
    important:
      "GrantCare cannot repair an official application form. It can help you stay on the right route and avoid turning a temporary access problem into a larger trust problem.",
    help:
      "GrantCare can help you confirm which grant route should matter, how to prepare before retrying the form, and how to avoid unsafe alternative pages.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-for-an-online-application\n• /guides/what-to-do-if-an-online-application-form-confuses-you\n• /privacy",
    faqs: [
      {
        question: "Does a form that will not open mean I do not qualify?",
        answer: "No. It is usually an access or route problem, not a decision about your case.",
      },
      {
        question: "Should I click a different form from another website right away?",
        answer: "No. Confirm the correct official route first.",
      },
      {
        question: "What should I check before trying again?",
        answer: "Check the route, browser, and connection before assuming anything larger is wrong.",
      },
    ],
    sortOrder: 201,
  }),
  guide({
    slug: "how-to-find-the-official-application-form-safely",
    title: "How to find the official application form safely",
    summary:
      "A trust-focused guide to locating the correct official application form without getting trapped by copied pages or unofficial shortcuts.",
    quickAnswer:
      "Find the official application form safely by starting from a known official route, confirming the page before entering any information, and treating independent guides only as support, not as the form itself.",
    whatThisMeans:
      "Users often search for a form before they even know which grant fits them. That creates a risk of landing on pages that talk about forms but do not actually belong to the official process.",
    whyThisMatters:
      "Application forms involve personal details and sometimes sensitive records. Using the wrong route can create confusion or risk before the real application even begins.",
    steps:
      "1. Confirm the grant type first.\n2. Start from the correct official route for that grant.\n3. Check the page carefully before entering details.\n4. Avoid copied or unofficial form links.\n5. Use GrantCare only for preparation and explanation around the form.",
    keyFocusTitle: "The safest route habit",
    keyFocus:
      "The safest habit is to find the grant type first and the official form second. That order makes it much easier to judge whether the form really belongs to the process you need.",
    important:
      "GrantCare is not the official application form. It is an independent guide that helps users understand where to go and what to prepare before using the official route.",
    help:
      "GrantCare can help you compare grant pages, application preparation guides, and trust/safety pages so you are more likely to reach the correct official form calmly.",
    related:
      "Useful next pages:\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /grants\n• /eligibility-checker",
    faqs: [
      {
        question: "Why should I confirm the grant type first?",
        answer: "Because the correct form depends on the grant route that actually fits your case.",
      },
      {
        question: "Can a page mention the form and still not be the real form?",
        answer: "Yes. That is why the official route still needs to be checked carefully.",
      },
      {
        question: "What should I never treat as final proof of the right form?",
        answer: "A copied link or random post that only repeats the right words without clear official ownership.",
      },
    ],
    sortOrder: 202,
  }),
  guide({
    slug: "how-to-apply-without-using-unofficial-websites",
    title: "How to apply without using unofficial websites",
    summary:
      "A trust-first guide to staying on the official application route while still using independent help platforms like GrantCare in the right way.",
    quickAnswer:
      "Apply without using unofficial websites by keeping official actions on the official route and using independent platforms like GrantCare only for preparation, explanation, and reminders.",
    whatThisMeans:
      "Users can benefit from independent help, but they should not hand the official application over to an unofficial page. The cleanest path is official action plus independent guidance, not a mixture that blurs the two.",
    whyThisMatters:
      "When official and unofficial roles get mixed together, users can share sensitive information in the wrong place or mistake guidance for an actual application step. Clear separation protects trust and safety.",
    steps:
      "1. Use GrantCare to understand the grant type, likely documents, and next steps.\n2. Move to the correct official route for the actual application.\n3. Confirm the official route before entering personal details.\n4. Keep your official application records and references.\n5. Return to GrantCare later for status or payment guidance if needed.",
    keyFocusTitle: "How independent help is best used",
    keyFocus:
      "Independent help is strongest when it supports your thinking, not when it pretends to be the official action route. That is how GrantCare is designed to help safely.",
    important:
      "GrantCare is an independent information and reminder platform. It must stay clearly separate from official government application systems.",
    help:
      "GrantCare can help you choose the right grant direction, prepare your documents, and understand later status or payment wording after the official application is complete.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/how-to-apply-for-support\n• /privacy",
    faqs: [
      {
        question: "Can independent websites still be useful?",
        answer: "Yes, if they clearly stay in the guidance role and do not pretend to be the official application route.",
      },
      {
        question: "What should always stay on the official route?",
        answer: "The actual application action and any official status or document submission step.",
      },
      {
        question: "What is the safest way to use GrantCare here?",
        answer: "Use GrantCare for preparation and explanation, then switch to the official route for the actual application.",
      },
    ],
    sortOrder: 203,
  }),
];
