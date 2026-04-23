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
      `A clear, step-by-step guide on how to apply for the ${grant.name}. We explain how to prepare your documents and avoid the mistakes that cause massive delays.`,
    quickAnswer:
      `Before you look for the ${grant.name} application form, you must gather your documents. Once your paperwork is ready, you will submit your application directly through the official SASSA portal or at a local office.`,
    whatThisMeans:
      `The ${grant.name} is specifically designed for ${grant.audience}. Do not rush to fill out a form if you do not have the supporting evidence ready yet. An incomplete application will instantly be delayed or rejected.`,
    whyThisMatters:
      `Many people panic and submit whatever documents they have on hand just to get into the system. ${grant.caution}. Taking an extra week to prepare is better than waiting six months to fix a rejected application.`,
    steps:
      `1. Ensure you actually qualify for the ${grant.name.toLowerCase()}.\n2. Place all your required documents into a single physical folder.\n3. Make sure your phone number is active and registered in your name.\n4. Start the application via the official SASSA portal or visit an office.\n5. Keep your reference number safe—you will need it to check your status later.`,
    keyFocusTitle: "The best way to start the application",
    keyFocus:
      `Speed is not the goal here; accuracy is. An accurate, fully documented application is processed much faster than a rushed one that requires SASSA to ask you for missing files.`,
    important:
      `GrantCare is an independent guide to help you prepare. We cannot submit your application for you. ${grant.routeNote}.`,
    help:
      `We break down the overwhelming SASSA application process into simple, manageable steps so you know exactly what to do next.`,
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
      `A straightforward breakdown of who qualifies for the ${grant.name}. Stop guessing and find out if you meet the core requirements before you apply.`,
    quickAnswer:
      `You may qualify for the ${grant.name} if you fit the core profile SASSA is looking for. This includes ${grant.fitSignals}.`,
    whatThisMeans:
      `The ${grant.name} exists specifically for ${grant.audience}. SASSA uses a strict means test and specific life circumstances to filter out applicants who do not fit this exact profile.`,
    whyThisMatters:
      `Applying for the wrong grant wastes your time and blocks up the SASSA system. It is much better to verify your eligibility now than to wait months only to receive a 'Declined' status.`,
    steps:
      `1. Read the strict eligibility rules for the ${grant.name.toLowerCase()}.\n2. Ensure you have the evidence required to prove your situation.\n3. Check if your current income falls below the SASSA means test threshold.\n4. Use our eligibility checker to see if another grant might be a better fit.\n5. Proceed to the official SASSA portal to begin your application.`,
    keyFocusTitle: "How to think about qualification safely",
    keyFocus:
      `Use this page to check if you are on the right track. Remember, meeting the basic criteria does not guarantee approval. SASSA will still verify your income, identity, and bank accounts.`,
    important:
      `GrantCare provides independent guidance based on public SASSA rules. Only SASSA can make the final, legally binding decision on whether you qualify.`,
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
      `A complete checklist of the documents you need to apply for the ${grant.name}. Prepare your folder correctly to avoid rejection.`,
    quickAnswer:
      `To apply for the ${grant.name}, you will generally need ${grant.docs}. You must prepare these files before you ever open an application form.`,
    whatThisMeans:
      `Missing documents are the number one reason SASSA applications are delayed. If you submit a blurry photo or an outdated bank statement, the system will pause your application until you fix it.`,
    whyThisMatters:
      `Every time SASSA has to ask you for a missing document, your payment is delayed by weeks. Getting your paperwork perfect on day one is the fastest way to get your money.`,
    steps:
      `1. Create a physical folder or a clear digital folder on your phone.\n2. Gather the specific identity and supporting documents required.\n3. Ensure that all names match exactly across every single document.\n4. Take clear, bright, easily readable photos of your paperwork if applying online.\n5. Submit your complete file via the official SASSA route.`,
    keyFocusTitle: "What document preparation is really for",
    keyFocus:
      `Never assume SASSA will 'figure it out.' If your ID name says 'John' but your bank statement says 'Jonathan', your application could be flagged for fraud. Consistency is critical.`,
    important:
      `GrantCare is an independent platform that helps you organise your paperwork. You must never upload your ID or banking documents to GrantCare—only to the official SASSA portal.`,
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
      "A clear, step-by-step guide to applying for the SRD R350/R370 grant online. We show you exactly how to submit your application safely.",
    quickAnswer:
      "To apply for the SRD grant, you must use the official SRD website (srd.sassa.gov.za) or the official SASSA WhatsApp line. You will need your ID number and an active cell phone number.",
    whatThisMeans:
      "Applying online is the only way to get the SRD grant. SASSA offices do not process SRD applications in person. This means you must have a working phone number that belongs to you.",
    whyThisMatters:
      "If you apply using a friend's phone number, you will not be able to access your money or receive OTPs (One Time PINs) later. Your phone number is your digital signature for the SRD grant.",
    steps:
      "1. Go directly to the official srd.sassa.gov.za portal.\n2. Enter your South African ID number and your active cell phone number.\n3. Wait for the OTP SMS and enter it into the website.\n4. Accept the declaration and consent forms.\n5. Wait for your status to update from 'Pending' to 'Approved'.",
    keyFocusTitle: "The safest online-application habit",
    keyFocus:
      "Never pay anyone to apply for the SRD grant on your behalf. The application is completely free. Scammers charging a fee will often steal your details and your eventual payments.",
    important:
      "GrantCare is an independent guide. We do not process SRD applications. You must enter your personal details directly into the official .gov.za website.",
    help:
      "We break down the SRD application steps so you know exactly what to click, what to expect, and how to protect your identity from scammers.",
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
      "A strict preparation checklist for any online SASSA application. Get your documents right before you click submit.",
    quickAnswer:
      "Before applying online, you need clear photos of your ID, proof of banking details, and an active phone number. Missing these basics will result in instant rejection.",
    whatThisMeans:
      "The SASSA online portal does not give you a chance to explain your situation to a human. The system only looks at the exact documents you upload. If a file is blurry, the system rejects it.",
    whyThisMatters:
      "People often start the online application, realise they are missing a document, and abandon the form halfway. Half-finished applications cause massive administrative headaches and delay your eventual approval.",
    steps:
      "1. Identify exactly which grant you are applying for.\n2. Take bright, readable photos of your ID and supporting documents.\n3. Ensure your phone is fully charged and has airtime to receive SMS OTPs.\n4. Open the official SASSA web portal.\n5. Complete the entire form in one sitting to avoid session timeouts.",
    keyFocusTitle: "The real purpose of preparation",
    keyFocus:
      "Preparation is the difference between getting paid next month or waiting six months. Do not open the application portal until every single document is resting on your table.",
    important:
      "GrantCare helps you build your application folder mentally and physically. We cannot fix a rejected application once you submit the wrong documents to SASSA.",
    help:
      "We provide plain-English checklists of the exact documents you need for each specific grant category.",
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
      "What to do when the SASSA online form becomes confusing. A calming guide to pausing, reading, and answering correctly without panic.",
    quickAnswer:
      "If you do not understand a question on the SASSA portal, stop typing. Guessing answers on official government forms can lead to fraud flags or application rejection.",
    whatThisMeans:
      "Government forms use strict legal language. When they ask for 'remuneration', they mean your income. If a question feels overwhelming, do not just select 'Yes' to make it go away.",
    whyThisMatters:
      "Every answer you provide is legally binding. If you accidentally say you have an income when you do not, SASSA will decline your grant based on your own mistake.",
    steps:
      "1. Take a breath and do not click submit.\n2. Identify the specific word or question that is confusing you.\n3. Look up the term in our GrantCare guides or ask a trusted family member.\n4. Check if you have the physical document that answers the question.\n5. Return to the form and enter the correct, honest answer.",
    keyFocusTitle: "The safest response to confusion",
    keyFocus:
      "There is no penalty for taking your time. The system may log you out if you take too long, but you can always log back in and start again. Accuracy is more important than speed.",
    important:
      "GrantCare explains complicated SASSA terms in simple English, but we cannot legally advise you on how to answer specific questions about your personal finances.",
    help:
      "We translate bureaucratic SASSA jargon into normal language so you can fill out your application with absolute confidence.",
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
      "The most common mistakes people make on the SASSA online portal, and exactly how to avoid them to ensure your application gets approved.",
    quickAnswer:
      "The most common reasons for rejection are entering the wrong phone number, uploading blurry documents, or misspelling names so they do not match the ID.",
    whatThisMeans:
      "SASSA's automated systems are ruthless. If your ID says 'Sipho' but you type 'Sipo' into the form, the system will flag it as an identity mismatch and halt your application.",
    whyThisMatters:
      "A single typo can cost you months of financial support. You will be forced to go through a lengthy appeals or reconsideration process just to fix one spelling mistake.",
    steps:
      "1. Type your ID number slowly, checking it against your physical ID book.\n2. Ensure the phone number you enter is yours and currently working.\n3. Verify that your banking details match your name exactly.\n4. Check the lighting on your document photos—can you read every word?\n5. Read through the entire form one last time before clicking 'Submit'.",
    keyFocusTitle: "The mistake behind many other mistakes",
    keyFocus:
      "Double-check everything. Do not rely on autofill from your browser, as it might insert an old address or a disconnected phone number.",
    important:
      "GrantCare cannot go into the SASSA system and fix a typo for you. Once you hit submit, only SASSA can amend your details.",
    help:
      "We highlight exactly where the traps are in the online application process so you can navigate around them safely.",
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
      "Stop guessing and find the exact SASSA grant that fits your life situation before you waste time applying for the wrong one.",
    quickAnswer:
      "SASSA offers different grants for older persons, children, people with disabilities, and those needing social relief (SRD). Your age, income, and health determine which one you should apply for.",
    whatThisMeans:
      "You cannot just apply for 'a grant'. You must apply for a specific category. If you apply for a Disability Grant but only qualify for the SRD grant, SASSA will reject your application entirely.",
    whyThisMatters:
      "Applying for the wrong grant wastes your time. You will wait months for an outcome, only to be rejected and told to start all over again in the correct category.",
    steps:
      "1. Look at your current age—if you are 60 or older, look at the Older Persons Grant.\n2. Do you have a child in your care? Look at the Child Support Grant.\n3. Are you unemployed between 18 and 59? Look at the SRD Grant.\n4. Check the strict SASSA means test limits for that specific grant.\n5. Use our GrantCare Eligibility Checker to confirm your choice before applying.",
    keyFocusTitle: "The question that solves most confusion",
    keyFocus:
      "Do not ask 'Where is the application form?' Ask 'Which grant am I actually legally entitled to receive?' Answering the second question saves you from rejection.",
    important:
      "GrantCare helps you navigate the complex SASSA rules to find your best fit. However, only SASSA can legally decide if you meet their criteria.",
    help:
      "We break down the legal requirements for every single grant category into plain English so you can choose the right path.",
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
      "The ultimate pre-application checklist. Make sure you have these five things ready before you open the SASSA online portal.",
    quickAnswer:
      "Before starting your SASSA application, you must check your ID book, your active phone number, your banking details, your proof of residence, and your internet connection.",
    whatThisMeans:
      "The SASSA online portal is strict and unforgiving. If your internet connection drops halfway through, or if you enter the wrong phone number, your application can get stuck in the system for months.",
    whyThisMatters:
      "Fixing a mistake on an active SASSA application is incredibly difficult. It requires phone calls, office visits, and affidavits. Getting it perfect the first time is the only way to ensure fast payment.",
    steps:
      "1. Take out your physical green ID book or smart card.\n2. Write down your exact phone number and ensure you have network signal.\n3. Get a recent bank statement to confirm your exact account number.\n4. Ensure you have enough mobile data to complete a 15-minute online form.\n5. Double-check that you are on the official '.gov.za' website.",
    keyFocusTitle: "Why this checklist matters so much",
    keyFocus:
      "Do not treat this like signing up for a social media account. This is a legal financial application. One wrong digit in your bank account number means your money will bounce.",
    important:
      "GrantCare cannot retrieve an application once you hit submit. You must review your details meticulously before confirming them on the official portal.",
    help:
      "We provide detailed guides on exactly what documents SASSA expects for every grant type, so you are never caught off guard.",
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
      "A calm troubleshooting guide for when the official SASSA application website crashes, fails to load, or gives you an error message.",
    quickAnswer:
      "If the SASSA website will not open, it does not mean your application was rejected. It usually means the government servers are overloaded or your internet connection is weak.",
    whatThisMeans:
      "The SASSA portal handles millions of users. During the first week of the month, or when new SRD applications open, the website frequently crashes under the massive traffic.",
    whyThisMatters:
      "When the site crashes, desperate applicants often search Google and click on fake, scam websites that look like SASSA. This is how identities and bank details get stolen.",
    steps:
      "1. Check your own internet connection and data balance first.\n2. Close the browser tab and wait for 30 minutes before trying again.\n3. Try accessing the portal very early in the morning or late at night.\n4. Never click on 'Alternative SASSA Links' sent via WhatsApp.\n5. If the site is down for days, listen for official updates on the news or radio.",
    keyFocusTitle: "What this problem usually is",
    keyFocus:
      "A blank screen is a server error, not a personal rejection. Do not panic and do not hand your ID number over to an unofficial website just because it loads faster.",
    important:
      "GrantCare does not host the SASSA application form. We cannot fix the government servers when they go offline.",
    help:
      "We explain how to verify if the SASSA system is experiencing a national outage, helping you avoid dangerous scam links.",
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
      "How to avoid scams and safely find the exact, official SASSA application portal you need for your grant.",
    quickAnswer:
      "The only safe place to apply for a SASSA grant is a website ending in '.gov.za' or at a physical SASSA office. Never apply through a link sent to you on Facebook or WhatsApp.",
    whatThisMeans:
      "Scammers create fake websites that look exactly like the real SASSA portal. If you enter your ID and banking details there, they will steal your grant money.",
    whyThisMatters:
      "Identity theft is a massive problem in the grant system. If a scammer intercepts your application, it can take years of police affidavits and office visits to clear your name and get your money.",
    steps:
      "1. Open your browser and type 'sassa.gov.za' directly into the address bar.\n2. Look for the padlock icon next to the web address.\n3. Ensure the web address ends strictly in '.gov.za'.\n4. Never pay an 'agent' an upfront fee to give you an application link.\n5. If a site asks you for your banking PIN, close it immediately.",
    keyFocusTitle: "The safest route habit",
    keyFocus:
      "Official government websites do not use domains like '.com', '.co.za', or '.net'. They always use '.gov.za'. This is your absolute guarantee that you are on the right site.",
    important:
      "GrantCare provides independent educational guides. We will never ask for your ID number or banking details, and we do not process applications.",
    help:
      "We teach you how to spot fake SASSA websites and protect your personal information from online predators.",
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
      "A guide to maintaining your safety online. Learn how to separate helpful independent guides from dangerous unofficial application portals.",
    quickAnswer:
      "Use independent sites like GrantCare to learn the rules, check your eligibility, and prepare your documents. But you must use the official SASSA portal for the actual application.",
    whatThisMeans:
      "A trustworthy guide will help you understand the confusing SASSA system. But a trustworthy guide will never ask you to upload your ID book or bank statements directly to them.",
    whyThisMatters:
      "Blurring the lines between guidance and application is dangerous. If you hand your application over to an unofficial third party, you lose all control over your personal data.",
    steps:
      "1. Read GrantCare to understand exactly what grant you qualify for.\n2. Use our checklists to gather your physical documents.\n3. Leave the GrantCare website when you are ready to apply.\n4. Open the official SASSA '.gov.za' portal.\n5. Complete your application directly with the government.",
    keyFocusTitle: "How independent help is best used",
    keyFocus:
      "Think of GrantCare as a map. We show you the safest, fastest route to your destination. But you still have to drive the car yourself by visiting the official SASSA office or portal.",
    important:
      "GrantCare is strictly an educational platform. We do not have access to the SASSA database and we do not submit applications on behalf of anyone.",
    help:
      "We provide the clearest, most accurate preparation guides in South Africa, empowering you to handle the official SASSA application confidently and safely.",
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
