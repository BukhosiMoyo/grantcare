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

const SEO_BATCH_TEN_GUIDES_SOURCE = [
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

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "older-persons-grant-how-to-apply": {
    "title": "Isibonelelo Sabantu Abadala ukuthi usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi usifaka kanjani isicelo seSibonelelo Sabantu Abadala. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuthi ubheke ifomu lesicelo seSibonelelo Sabantu Abadala, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sabantu Abadala siklanyelwe ngokukhethekile abantu abaneminyaka engama-60 noma ngaphezulu abangase badinge ukwesekwa. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. iminyaka nezindlela zokuhlola isikhundla, ngakho kuyasiza ukufunda isiqondiso esiqondene nesibonelelo ngaphambi kokuthi ucabange ukuthi uyafaneleka. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyakufanelekela ngempela ukuthola isibonelelo sikahulumeni sabantu abadala.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. umzila wesicelo osemthethweni kufanele usasetshenziselwa isicelo sangempela kanye nokuqinisekiswa komthetho wokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/older-persons\n• /guides/older-persons-grant-who-may-qualify\n• /guides/older-persons-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo sesibonelelo sikahulumeni sabantu abadala ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni sabantu abadala ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sesibonelelo sikahulumeni sabantu abadala?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "older-persons-grant-who-may-qualify": {
    "title": "Isibonelelo Sabantu Abadala abangase bafaneleke",
    "summary": "Ukuhlukaniswa okuqondile kokuthi ubani ofanelekela Isibonelelo Sikahulumeni Sabantu Abadala. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola Isibonelelo Sabantu Abadala uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kuhlanganisa ukuba neminyaka engama-60 noma ngaphezulu, ukuhlala eNingizimu Afrika, kanye nokuhlangabezana nemithetho yokuhlola indlela yokuphila."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sabantu Abadala sikhona ngokukhethekile kubantu abaneminyaka engama-60 noma ngaphezulu abangase badinge ukwesekwa. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yesibonelelo sikahulumeni.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/older-persons\n• /guides/older-persons-grant-how-to-apply\n• /guides/older-persons-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe leli khasi lisho ukuthi ngizogunyazwa isibonelelo sikahulumeni sabantu abadala?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu ngesibonelelo sabantu abadala?",
        "body": "Ukulingana okubanzi kuvame ukuhlanganisa ukuba neminyaka engama-60 noma ngaphezulu, ukuhlala eNingizimu Afrika, kanye nokuhlangabezana nemithetho yokuhlola izindlela."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "older-persons-grant-documents-you-may-need": {
    "title": "Amadokhumenti eSibonelelo Sabantu Abadala ongawadinga",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo Sabantu Abadala. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuze ufake isicelo seSibonelelo Sabantu Abadala, ngokuvamile uzodinga idokhumenti kamazisi, ubufakazi besimo somshado lapho kufanele khona, kanye nemininingwane yemali engenayo noma yempahla. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/older-persons\n• /guides/older-persons-grant-how-to-apply\n• /guides/older-persons-grant-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yimiphi imibhalo ebanzi evame ukuba nendaba yesibonelelo sikahulumeni sabantu abadala?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti kamazisi, ubufakazi besimo somshado lapho kufanele khona, kanye nemininingwane yemali engenayo noma yempahla."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe i-GrantCare inganginika uhlu lokugcina olusemthethweni lwemali yesibonelelo sikahulumeni yabantu abadala?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "disability-grant-how-to-apply": {
    "title": "Isibonelelo Sokukhubazeka usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi usifaka kanjani isicelo seSibonelelo Sokukhubazeka. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuthi ubheke ifomu lesicelo seSibonelelo Sokukhubazeka, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sokukhubazeka siklanyelwe ngokukhethekile abantu abadala abanokukhubazeka okukhawulela umsebenzi noma umsebenzi wansuku zonke. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. ukuhlolwa kwezokwelapha kanye nezidingo ezisemthethweni ezihlobene nokukhubazeka zibalulekile, ngakho ukuqondisa okubanzi akufanele kuthathwe njengokugunyazwa okuqinisekisiwe. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyafaneleka ngempela ukuthola isibonelelo sokukhubazeka.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. umzila osemthethweni uhlala uyindawo yezinqumo zezokwelapha, zokufaka isicelo, nezokugcina zokufaneleka."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/disability\n• /guides/disability-grant-who-may-qualify\n• /guides/disability-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo sesibonelelo sikahulumeni sokukhubazeka ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni sokukhubazeka ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sesibonelelo sikahulumeni sokukhubazeka?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "disability-grant-who-may-qualify": {
    "title": "Isibonelelo Sikahulumeni Sokukhubazeka abangase bafaneleke",
    "summary": "Ukuchazwa okuqondile kokuthi ubani ofanelekela Isibonelelo Sikahulumeni Sokukhubazeka. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola Isibonelelo Sikahulumeni Sokukhubazeka uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kuhlanganisa ukuba sebangeni elibanzi leminyaka yabantu abadala lesibonelelo, ukuba nesidingo esihlobene nokukhubazeka, kanye nokuhlangabezana nemithetho yokuhlola izindlela ngemva kokuhlolwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sokukhubazeka sikhona ngokukhethekile kubantu abadala abakhubazekile esikhawulela umsebenzi noma umsebenzi wansuku zonke. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yesibonelelo sokukhubazeka.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/disability\n• /guides/disability-grant-how-to-apply\n• /guides/disability-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "I-FAQ: Ingabe leli khasi lisho ukuthi ngizogunyazwa isibonelelo sokukhubazeka?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "I-FAQ: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu ngesibonelelo sokukhubazeka?",
        "body": "Ukulingana okubanzi kuvame ukuhlanganisa ukuba sebangeni elibanzi leminyaka yabantu abadala lesibonelelo, ukuba nesidingo esihlobene nokukhubazeka, kanye nokuhlangabezana nemithetho yokuhlola izindlela ngemva kokuhlola."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "disability-grant-documents-you-may-need": {
    "title": "Amadokhumenti eSibonelelo Sokukhubazeka ongawadinga",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo Sokukhubazeka. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuze ufake isicelo seSibonelelo Sokukhubazeka, ngokuvamile uzodinga idokhumenti kamazisi, umbiko wakamuva wezokwelapha, kanye nemininingwane yemali engenayo noma yempahla. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/disability\n• /guides/disability-grant-how-to-apply\n• /guides/disability-grant-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yimaphi amadokhumenti abanzi avame ukuba nendaba ngesibonelelo sokukhubazeka?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti kamazisi, umbiko wakamuva wezokwelapha, kanye nemininingwane yemali engenayo noma yempahla."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare inganginika uhlu lokugcina olusemthethweni lwesibonelelo sokukhubazeka?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "child-support-grant-how-to-apply": {
    "title": "Isibonelelo Sikahulumeni Sezingane ukuthi usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi usifaka kanjani isicelo seSibonelelo Sezingane. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuthi ubheke ifomu lesicelo Sesibonelelo Sikahulumeni Sezingane, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sezingane siklanyelwe ngokukhethekile abanakekeli bengane abangase badinge ukwesekwa njalo. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. isimo somnakekeli kanye nemithetho yokuhlola izindlela zombili zibalulekile, ngakho kusiza ukuqinisekisa imininingwane esemthethweni ngaphambi kokufaka isicelo. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyakufanelekela ngempela ukuthola isibonelelo sezingane.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. isicelo sangempela kanye nohlu lokugcina lwemibhalo kusengokwenqubo kahulumeni esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/child-support\n• /guides/child-support-grant-who-may-qualify\n• /guides/child-support-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo sesibonelelo sikahulumeni sezingane ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni sengane ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo semali yesibonelelo sikahulumeni?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "child-support-grant-who-may-qualify": {
    "title": "Isibonelelo Sikahulumeni Sezingane esingase sifaneleke",
    "summary": "Incazelo eqondile yokuthi ubani ofanelekela Isibonelelo Sikahulumeni Sezingane. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola Isibonelelo Sikahulumeni Sezingane uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kuhlanganisa ukuba umnakekeli oyinhloko, ukuba nengane oyinakekelayo, nokuwela ngaphansi kwemithetho yokuhlola esebenzayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sezingane sikhona ngokukhethekile kubanakekeli bengane abangase badinge ukwesekwa njalo. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yesibonelelo sikahulumeni sezingane.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/child-support\n• /guides/child-support-grant-how-to-apply\n• /guides/child-support-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "I-FAQ: Ingabe leli khasi lisho ukuthi ngizogunyazwa isibonelelo sikahulumeni sezingane?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu ngesibonelelo sezingane?",
        "body": "Ukulingana okubanzi kuvame ukuhlanganisa ukuba ngumnakekeli oyinhloko, ukuba nengane oyinakekelayo, nokuwela ngaphansi kwemithetho yokuhlola esebenzayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "child-support-grant-documents-you-may-need": {
    "title": "Amadokhumenti eSibonelelo Sezingane ongawadinga",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo Sokusekela Ingane. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukufaka isicelo seSibonelelo Sezingane, uzodinga umazisi, isitifiketi sokuzalwa somntwana, kanye nobufakazi beholo lapho kudingeka khona. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/child-support\n• /guides/child-support-grant-how-to-apply\n• /guides/child-support-grant-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yimaphi amadokhumenti abanzi avame ukuba nendaba yesibonelelo sikahulumeni sezingane?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti kamazisi, isitifiketi sokuzalwa somntwana, kanye nobufakazi beholo lapho kudingeka khona."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe i-GrantCare inganginika uhlu lokuhlola lokugcina olusemthethweni lwesibonelelo sikahulumeni sezingane?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "social-relief-how-to-apply": {
    "title": "I-Social Relief of Distress ukuthi usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi ungasifaka kanjani isicelo Sosizo Lomphakathi Ekuhluphekeni. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuthi ubheke Ifomu lesicelo Sosizo Lokukhululeka Kwezenhlalakahle, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-Social Relief of Distress yakhelwe ngokuqondile abantu abanokwesekwa kwemali engenayo okulinganiselwe kakhulu noma abangenakho abangase badinge ukukhululeka kwesikhashana. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. lesi sigaba ngokuvamile sincike kuzibuyekezo ezisekelwe kuphothali namagama omthetho osemthethweni, ngakho umhlahlandlela akufanele uthathwe njengokugunyazwa kokugcina. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyafaneleka ngempela ukuthola impumuzo yomphakathi ekucindezelekeni.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. umzila osemthethweni ohlobene ne-SRD useyindawo yohlelo lokusebenza lwangempela kanye nezenzo zesimo ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /guides/social-relief-who-may-qualify\n• /guides/social-relief-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo sokukhululeka komphakathi ekucindezelekeni ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sokusiza umphakathi ekucindezelekeni ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sosizo lomphakathi ekucindezelekeni?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "social-relief-who-may-qualify": {
    "title": "Usizo Lomphakathi Lokuhlukumezeka okungenzeka bafaneleke",
    "summary": "Ukwahlukaniswa okuqondile kokuthi ubani ofanelekela Usizo Lomphakathi Lokukhululeka Ekucindezelekeni. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufanelekele Ukukhululwa Komphakathi Kokucindezeleka uma ulingana nephrofayela ewumnyombo efunwa yi-SASSA. Lokhu kuhlanganisa ukuba nosekelo oluncane lwemali engenayo noma ukungabi bikho nhlobo, ukufaka imithetho yokusiza esemthethweni, kanye nokusebenzisa isimo esisemthethweni esilungile noma umzila wokufaka isicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-Social Relief of Distress ikhona ngokukhethekile kubantu abanokwesekwa kwemali engenayo okulinganiselwe noma abangenakho abangase badinge ukukhululeka kwesikhashana. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yokukhululeka komphakathi ekucindezelekeni.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /guides/social-relief-how-to-apply\n• /guides/social-relief-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe leli khasi lisho ukuthi ngizogunyazwa ukukhululeka komphakathi ekucindezelekeni?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "I-FAQ: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu ekukhululekeni komphakathi ekucindezelekeni?",
        "body": "Ukulingana okubanzi kuvame ukufaka ukwesekwa okuncane noma ukungabi bikho nhlobo, ukufaka imithetho yokusiza esemthethweni, kanye nokusebenzisa isimo esisemthethweni esilungile noma umzila wokufaka isicelo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "social-relief-documents-you-may-need": {
    "title": "Amadokhumenti Osizo Lomphakathi Ekuhluphekeni ongawadinga",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo Sosizo Lwezenhlalakahle Lokukhululeka Ekucindezelekeni. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukufaka isicelo Sosizo Lokukhululeka Komphakathi Ekucindezelekeni, ngokuvamile uzodinga idokhumenti kamazisi, inombolo yocingo esebenzayo, kanye nemininingwane yasebhange lapho kudingeka khona. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/social-relief\n• /guides/social-relief-how-to-apply\n• /guides/social-relief-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "I-FAQ: Yimaphi amadokhumenti abanzi avame ukuba nendaba ekusizeni umphakathi ekucindezelekeni?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti kamazisi, inombolo yocingo esebenzayo, kanye nemininingwane yasebhange lapho kudingeka khona."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare inganginika uhlu lokuhlola lokugcina olusemthethweni lokukhululeka komphakathi ekucindezelekeni?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "foster-child-grant-how-to-apply": {
    "title": "Isibonelelo Sengane Yokutholwa ukuthi usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi ungasifaka kanjani isicelo seSibonelelo Sengane Esinganayo. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuba ubheke ifomu lesicelo Sesibonelelo Sikahulumeni Sengane Engatholwa Ngayo, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "ISibonelelo Sengane Esinganayo siklanyelwe ngokukhethekile abanakekeli bengane ebekwe endaweni yokunakekelwa okungeyona eyakho. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. irekhodi lokubekwa elisemthethweni libaluleke kakhulu lapha, ngakho isiqondiso sedokhumenti esemthethweni kufanele sibhekwe ngokucophelela. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyafaneleka ngempela ukuthola isibonelelo sengane ekungeyona eyakho.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. umzila osemthethweni uhlala uyindawo yesicelo sangempela kanye nokuqinisekisa ukuthi imaphi amarekhodi adingekayo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/foster-child\n• /guides/foster-child-grant-who-may-qualify\n• /guides/foster-child-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo semali yesibonelelo sikahulumeni ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni sengane yokutholwa ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sesibonelelo sikahulumeni sengane ekungeyona eyakhe?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "foster-child-grant-who-may-qualify": {
    "title": "Isibonelelo Sengane Yokutholwa engase ifaneleke",
    "summary": "Ukuhlukaniswa okuqondile kokuthi ubani ofanelekela Isibonelelo Sikahulumeni Sokutholwa Kwengane. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola Isibonelelo Sikahulumeni Sokutholwa Uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kuhlanganisa nokuba nendawo esemthethweni yokukhuliswa, ingane oyinakekelayo, kanye nerekhodi elisekelayo elingokomthetho elidingekayo ecaleni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "ISibonelelo Sengane Esinganayo sikhona ngokukhethekile kubanakekeli bengane ebekwe endaweni yokunakekelwa okungeyona eyakho. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yesibonelelo sikahulumeni sengane yokutholwa.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/foster-child\n• /guides/foster-child-grant-how-to-apply\n• /guides/foster-child-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe leli khasi lisho ukuthi ngizogunyazwa isibonelelo sikahulumeni sengane yokutholwa?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "I-FAQ: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu ngesibonelelo sengane ekungeyona eyakho?",
        "body": "Ukulingana okubanzi kuvame ukuhlanganisa ukuba nendawo yokukhuliswa okusemthethweni, ingane oyinakekelayo, kanye nerekhodi elisekelayo elingokomthetho elidingekayo ecaleni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "foster-child-grant-documents-you-may-need": {
    "title": "Amadokhumenti e-Foster Child Grant ongase uwadinge",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo Sengane Yokutholwa. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuze ufake isicelo seSibonelelo Sengane Esinganayo, ngokuvamile uzodinga idokhumenti ye-ID, isitifiketi sokuzalwa somntwana, kanye nomyalelo wenkantolo ofanele. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/foster-child\n• /guides/foster-child-grant-how-to-apply\n• /guides/foster-child-grant-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yimaphi amadokhumenti abanzi avame ukuba nendaba yesibonelelo sikahulumeni sengane yokutholwa?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti ye-ID, isitifiketi sokuzalwa somntwana, kanye nesinqumo senkantolo esifanele."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe i-GrantCare inganginika uhlu lokuhlola lokugcina olusemthethweni lwemali yesibonelelo sikahulumeni?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "care-dependency-grant-how-to-apply": {
    "title": "Isibonelelo Sokuncika Kokunakekelwa usifaka kanjani isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi usifaka kanjani isicelo seSibonelelo Sokuncika Kokunakekelwa. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuba ubheke ifomu lesicelo Sesibonelelo Sikahulumeni Sokunakekela, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sokuncika siklanyelwe ngokukhethekile abanakekeli bengane enezidingo ezinzima zokunakekelwa okuhlobene nokukhubazeka. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. ukuhlolwa kwezokwelapha kanye nomxholo womnakekeli kokubili kuphakathi, ngakho isiqondiso esibanzi kufanele sibhekwe ngendlela esemthethweni ngaphambi kokufaka isicelo. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi uyafaneleka ngempela ukuthola isibonelelo sikahulumeni sokunakekela.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. inqubo esemthethweni isadingeka ekuhlolweni kwangempela, imibhalo, kanye nesinqumo sokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/care-dependency\n• /guides/care-dependency-grant-who-may-qualify\n• /guides/care-dependency-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ngingakwazi yini ukufaka isicelo sesibonelelo sikahulumeni sokuncika ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni sokunakekela izingane ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sesibonelelo sikahulumeni sokunakekela izingane?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "care-dependency-grant-who-may-qualify": {
    "title": "Isibonelelo Sikahulumeni Sokuncika Abangase bafaneleke",
    "summary": "Ukuhlukaniswa okuqondile kokuthi ubani ofanelekela Isibonelelo Sikahulumeni Sokuncika. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola Isibonelelo Sikahulumeni Sokuncika uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kuhlanganisa ukunakekela ingane engaphansi kweminyaka engu-18, ukuba nezidingo zokunakekelwa okuhlobene nokukhubazeka eziqinisekiswa ngenqubo efanele, kanye nokuhlangabezana nemithetho yokuhlola indlela esebenzayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo Sikahulumeni Sokunakekela sikhona ikakhulukazi abanakekeli bengane enezidingo ezinzima zokunakekelwa okuhlobene nokukhubazeka. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yesibonelelo sikahulumeni sokunakekela.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/care-dependency\n• /guides/care-dependency-grant-how-to-apply\n• /guides/care-dependency-grant-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe leli khasi lisho ukuthi ngizogunyazwa isibonelelo sikahulumeni sokunakekela izingane?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "I-FAQ: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu kwisibonelelo sikahulumeni sokunakekela?",
        "body": "Ukulingana okubanzi ngokuvamile kuhlanganisa ukunakekela ingane engaphansi kweminyaka engu-18, ukuba nezidingo zokunakekelwa okuhlobene nokukhubazeka eziqinisekiswa ngenqubo efanele, kanye nokuhlangabezana nemithetho yokuhlola indlela esebenzayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "care-dependency-grant-documents-you-may-need": {
    "title": "Amadokhumenti eSibonelelo Sokuncika Kokunakekela ungase uwadinge",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo Sokuncika Kokunakekelwa. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuze ufake isicelo seSibonelelo Sokuncika Kokunakekelwa, uzodinga umazisi, isitifiketi sokuzalwa somntwana, kanye nombiko wezempilo. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/care-dependency\n• /guides/care-dependency-grant-how-to-apply\n• /guides/care-dependency-grant-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yimaphi amadokhumenti abanzi avame ukuba nendaba yesibonelelo sikahulumeni sokunakekela izingane?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti ye-ID, isitifiketi sokuzalwa somntwana, kanye nombiko wezokwelapha."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare inganginika uhlu lokuhlola lokugcina olusemthethweni lwesibonelelo sikahulumeni sokunakekela?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "grant-in-aid-how-to-apply": {
    "title": "I-Grant-in-Aid indlela yokufaka isicelo",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokuthi usifaka kanjani isicelo seSibonelelo-sosizo. Sichaza indlela yokulungisa amadokhumenti akho futhi sigweme amaphutha abangela ukubambezeleka okukhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuthi ubheke ifomu lesicelo se-Grand-in-Aid, kufanele uqoqe imibhalo yakho. Uma amaphepha akho eselungile, uzohambisa isicelo sakho ngqo ngengosi ye-SASSA esemthethweni noma ehhovisi lendawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-Grand-in-Aid yakhelwe ngokuqondile abantu asebevele bathola isibonelelo sikahulumeni futhi manje abadinga ukusekelwa ngokugcwele. Ungajahi ukugcwalisa ifomu uma ungakabi nabo ubufakazi obusekelayo. Isicelo esingaphelele sizobambezeleka noma senqatshwe ngokushesha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bayatatazela futhi bahambise noma yimiphi imibhalo abanayo ukuze nje bangene ohlelweni. lesi akusona isibonelelo sokuqala esizimele sodwa sabasebenzisi abaningi, ngakho-ke isibonelelo esikhona esifanelekayo nokunakekelwa kudinga kokubili okubalulekile. Ukuthatha isonto elengeziwe ukulungiselela kungcono kunokulinda izinyanga eziyisithupha ukulungisa isicelo esinqatshiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qiniseka ukuthi uyafaneleka ngempela ukuthola isibonelelo sikahulumeni.\n2. Beka wonke amadokhumenti akho adingekayo kufolda eyodwa ebonakalayo.\n3. Qiniseka ukuthi inombolo yakho yocingo iyasebenza futhi ibhalisiwe egameni lakho.\n4. Qala isicelo usebenzisa ingosi esemthethweni ye-SASSA noma uvakashele ihhovisi.\n5. Gcina inombolo yakho yesithenjwa iphephile—uzoyidinga ukuze uhlole isimo sakho kamuva."
      },
      {
        "title": "Indlela engcono kakhulu yokuqala isicelo",
        "body": "Ijubane akulona igoli lapha; ukunemba kuyinto. Uhlelo lokusebenza olunembile, olubhalwe ngokugcwele lucutshungulwa ngokushesha kakhulu kunoluphuthuma oludinga ukuthi i-SASSA ikucele amafayela angekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele wokukusiza uzilungiselele. Asikwazi ukukuthumelela isicelo sakho. umzila osemthethweni kusafanele usetshenziselwe isicelo sangempela kanye nesiqinisekiso sokugcina sokuthi ubudlelwano besibonelelo sikahulumeni buyafaneleka."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa inqubo yesicelo se-SASSA esinamandla sibe izinyathelo ezilula, ezilawulekayo ukuze wazi kahle ukuthi yini okumele uyenze ngokulandelayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/grant-in-aid\n• /guides/grant-in-aid-who-may-qualify\n• /guides/grant-in-aid-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "I-FAQ: Ngingakwazi yini ukufaka isicelo sosizo lwe-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngiqale isicelo sesibonelelo sikahulumeni ngaphambi kokuba ngiqoqe amadokhumenti?",
        "body": "Ngokuvamile kuphephe kakhudlwana ukuqoqa amadokhumenti okungenzeka kuqala ukuze ungadali ukubambezeleka okungagwemeka."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Yini ebaluleke kakhulu ngaphambi kokuthi ngifake isicelo sesibonelelo sikahulumeni?",
        "body": "Qinisekisa ukuthi isibonelelo silingana nesimo sakho nokuthi usebenzisa umzila osemthethweni olungile."
      }
    ]
  },
  "grant-in-aid-who-may-qualify": {
    "title": "Grant-in-Aid abangase bafaneleke",
    "summary": "Ukuhlukaniswa okuqondile kokuthi ubani ofanelekela i-Grand-in-Aid. Yeka ukuqagela futhi uthole ukuthi uyahlangabezana yini nezidingo ezibalulekile ngaphambi kokufaka isicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungase ufaneleke ukuthola i-Grant-in-Aid uma ulingana nephrofayela eyinhloko efunwa yi-SASSA. Lokhu kubandakanya kakade ukuthola isibonelelo esifanelekayo, odinga ukunakekelwa okugcwele njalo, nokuba nobufakazi obusekelayo bezokwelapha noma bokunakekelwa okudingekayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-Grand-in-Aid ikhona ngokukhethekileyo kubantu asebevele bathola isibonelelo sikahulumeni esifanelekayo futhi manje abadinga ukusekelwa ngokugcwele. I-SASSA isebenzisa indlela yokuhlola eqinile nezimo ezithile zempilo ukuze ihlunge abafake izicelo abangahambisani nale phrofayela ngqo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kumosha isikhathi sakho futhi kuvimbe uhlelo lwe-SASSA. Kungcono kakhulu ukuqinisekisa ukufaneleka kwakho manje kunokulinda izinyanga kuphela ukuze uthole isimo se-'Declined'."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda imithetho eqinile yokufaneleka yomnikelo wokusiza.\n2. Qiniseka ukuthi unobufakazi obudingekayo ukufakazela isimo sakho.\n3. Hlola ukuthi iholo lakho lamanje liwela ngaphansi kwe-SASSA lisho umkhawulo wokuhlola.\n4. Sebenzisa isihloli sethu sokufaneleka ukuze ubone ukuthi esinye isibonelelo singalingana kangcono yini.\n5. Qhubekela kuphothali esemthethweni ye-SASSA ukuze uqale isicelo sakho."
      },
      {
        "title": "Ungacabanga kanjani ngeziqu ngokuphepha",
        "body": "Sebenzisa leli khasi ukuze uhlole ukuthi usendleleni efanele yini. Khumbula, ukuhlangabezana nemibandela eyisisekelo akuqinisekisi ukugunyazwa. I-SASSA isazoqinisekisa imali engenayo, ubunikazi bakho, nama-akhawunti asebhange."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza isiqondiso esizimele esisekelwe emithethweni yomphakathi ye-SASSA. I-SASSA kuphela engenza isinqumo sokugcina, esibopha ngokomthetho sokuthi uyafaneleka yini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise lolu xhaso nezinye izinhlobo zosekelo, uqonde izindawo zemithetho ebanzi ngolimi olulula, futhi uye ekusetshenzisweni okufanele kanye nemihlahlandlela yamadokhumenti."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/grant-in-aid\n• /guides/grant-in-aid-how-to-apply\n• /guides/grant-in-aid-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-know-which-grant-application-fits-you"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe leli khasi lisho ukuthi ngizogunyazwa uxhaso-mali?",
        "body": "Cha. Inikeza isiqondiso esibanzi kuphela. Inqubo esemthethweni isanquma umphumela."
      },
      {
        "title": "I-FAQ: Yiziphi izimpawu ezibanzi ezibaluleke kakhulu kuxhaso-mali?",
        "body": "Ukulingana okubanzi kuvame ukuhlanganisa kakade ukuthola isibonelelo esifanelekayo, okudinga ukunakekelwa okugcwele njalo, nokuba nobufakazi obusekelayo bezokwelapha noma bokunakekelwa okudingekayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma ngingenaso isiqiniseko sokuthi lesi sibonelelo siyangifanela?",
        "body": "Sebenzisa isihloli sokufaneleka futhi uqhathanise lesi sibonelelo namanye amakhasi ohlobo lwesibonelelo ngaphambi kokuqala isicelo esisemthethweni."
      }
    ]
  },
  "grant-in-aid-documents-you-may-need": {
    "title": "Amadokhumenti e-grant-in-Aid ongase uwadinge",
    "summary": "Uhlu lokuhlola oluphelele lwamadokhumenti owadingayo ukuze ufake isicelo seSibonelelo-sosizo. Lungiselela ifolda yakho ngendlela efanele ukuze ugweme ukwenqatshwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukuze ufake isicelo seSibonelelo-sosizo, ngokuvamile uzodinga idokhumenti ye-ID, umbiko wezokwelapha, kanye nemininingwane yesibonelelo esikhona esifanelekayo. Kufanele ulungiselele lawa mafayela ngaphambi kokuthi uvule ifomu lesicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amadokhumenti angekho yisizathu sokuqala sezizathu zokubambezeleka kwezicelo ze-SASSA. Uma uthumela isithombe esilufifi noma isitatimende sasebhange esiphelelwe yisikhathi, isistimu izomisa isicelo sakho uze usilungise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Njalo uma i-SASSA kufanele ikucele idokhumenti engekho, inkokhelo yakho ibambezeleka ngamaviki. Ukwenza amaphepha akho aphelele ngosuku lokuqala kuyindlela eshesha kakhulu yokuthola imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Dala ifolda ebonakalayo noma ifolda yedijithali ecacile efonini yakho.\n2. Qoqa umazisi othize kanye namadokhumenti asekelayo adingekayo.\n3. Qiniseka ukuthi wonke amagama afana ncamashi kuwo wonke amadokhumenti.\n4. Thatha izithombe ezicacile, ezikhanyayo, ezifundeka kalula zamaphepha akho uma usebenzisa ku-inthanethi.\n5. Thumela ifayela lakho eliphelele ngomzila osemthethweni we-SASSA."
      },
      {
        "title": "Imuphi amalungiselelo amadokhumenti okwakho ngempela",
        "body": "Ungalokothi ucabange ukuthi SASSA izo'figure it out.' Uma igama lakho le-ID lithi 'John' kodwa isitatimende sakho sasebhange sithi 'Jonathan', isicelo sakho singamakwa ngokukhwabanisa. Ukuvumelana kubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele ekusiza ukuthi uhlele amaphepha akho. Akumele ulayishe i-ID yakho noma amadokhumenti asebhange ku-GrantCare—kuphela kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ucabange ngezigaba ezingaba zemibhalo, uqhathanise amakhasi esibonelelo sikahulumeni, futhi usuke emibuzweni yedokhumenti uye kuhlelo lokusebenza olufanele noma inkomba yokufaneleka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /grants/grant-in-aid\n• /guides/grant-in-aid-how-to-apply\n• /guides/grant-in-aid-who-may-qualify\n• /guides/what-documents-you-may-need\n• /guides/how-to-prepare-before-applying"
      },
      {
        "title": "I-FAQ: Yimaphi amadokhumenti abanzi avame ukuba nendaba kuxhaso-mali?",
        "body": "Izigaba ezijwayelekile ngokuvamile zihlanganisa idokhumenti ye-ID, umbiko wezokwelapha, kanye nemininingwane yesibonelelo esikhona esifanelekayo."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe kufanele ngilinde kuze kube yilapho kuvulwa ifomu elisemthethweni ngaphambi kokuhlola amadokhumenti?",
        "body": "Ngokuvamile kungcono ukulungiselela kusenesikhathi ukuze ungajahi kamuva."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare inganginika uhlu lokuhlola lokugcina olusemthethweni lwesibonelelo sikahulumeni?",
        "body": "I-GrantCare ingakuqondisa, kodwa uhlu lokuhlola lokugcina olusemthethweni luselusemzileni kahulumeni ofanele."
      }
    ]
  },
  "how-to-apply-online-for-social-relief": {
    "title": "Ungasifaka kanjani isicelo ku-inthanethi ukuze uthole usizo lomphakathi",
    "summary": "Umhlahlandlela ocacile, wesinyathelo nesinyathelo wokufaka isicelo se-SRD R350/R370 ku-inthanethi. Sikubonisa kahle ukuthi usihambisa kanjani isicelo sakho ngokuphepha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukufaka isicelo sesibonelelo se-SRD, kufanele usebenzise iwebhusayithi esemthethweni ye-SRD (srd.sassa.gov.za) noma ulayini osemthethweni we-SASSA WhatsApp. Uzodinga inombolo yakho kamazisi kanye nenombolo yeselula esebenzayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukufaka isicelo ku-inthanethi ukuphela kwendlela yokuthola isibonelelo se-SRD. Amahhovisi e-SASSA awacubunguli izicelo ze-SRD mathupha. Lokhu kusho ukuthi kufanele ube nenombolo yocingo esebenzayo okungeyakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ufaka isicelo usebenzisa inombolo yocingo yomngane, ngeke ukwazi ukufinyelela emalini yakho noma uthole ama-OTP (Amaphinikhodi esikhathi esisodwa) kamuva. Inombolo yakho yocingo isiginesha yakho yedijithali yesibonelelo se-SRD."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Iya ngqo kuphothali esemthethweni ye-srd.sassa.gov.za.\n2. Faka inombolo yakho kamazisi yaseNingizimu Afrika kanye nenombolo yakho yeselula esebenzayo.\n3. Linda i-OTP SMS bese uyifaka kuwebhusayithi.\n4. Yamukela amafomu esimemezelo kanye nemvume.\n5. Linda isimo sakho ukuthi sithuthuke sisuka ku-'Pending' siye ku-'Approved'."
      },
      {
        "title": "Umkhuba ophephe kakhulu wohlelo lokusebenza ku-inthanethi",
        "body": "Ungalokothi ukhokhele noma ubani ukuthi akufakele isicelo somnikelo we-SRD. Isicelo nhlobo. Abakhwabanisi abakhokhisa imali ngokuvamile bazontshontsha imininingwane yakho kanye nezinkokhelo zakho ekugcineni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele. Asicubunguli izicelo ze-SRD. Kufanele ufake imininingwane yakho ngqo kuwebhusayithi esemthethweni ye-.gov.za."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sephula izinyathelo zohlelo lokusebenza le-SRD ukuze wazi kahle ukuthi yini okufanele uyichofoze, yini ongayilindela, nokuthi ungakuvikela kanjani ubunikazi bakho kubakhohlisi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/social-relief-how-to-apply\n• /guides/social-relief-who-may-qualify\n• /guides/social-relief-documents-you-may-need\n• /eligibility-checker\n• /guides/how-to-find-the-official-application-form-safely"
      },
      {
        "title": "I-FAQ: Ngingakwazi ukugcwalisa isicelo sokusiza umphakathi esiku-inthanethi ku-GrantCare?",
        "body": "Cha. I-GrantCare ikusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo esisemthethweni kufanele senzeke emzileni osemthethweni."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngilungiselele ngaphambi kokufaka isicelo ku-inthanethi?",
        "body": "Ukulungiselela kunciphisa amaphutha angagwemeka futhi kukusiza ukuthi usebenzise umzila osemthethweni ngokuzethemba okukhulu."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokufaka isicelo ku-inthanethi?",
        "body": "Gcina isiqinisekiso sakho, landela umzila osemthethweni ukuze uthole izibuyekezo, futhi usebenzise i-GrantCare uma udinga usizo lokuqonda amagama ozowabona kamuva."
      }
    ]
  },
  "how-to-prepare-for-an-online-application": {
    "title": "Ungasilungiselela kanjani isicelo se-inthanethi",
    "summary": "Uhlu lokuhlola oluqinile lwanoma yiluphi uhlelo lokusebenza oluku-inthanethi lwe-SASSA. Thola amadokhumenti akho ngaphambi kokuthi uchofoze ukuhambisa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokufaka isicelo ku-inthanethi, udinga izithombe ezicacile ze-ID yakho, ubufakazi bemininingwane yasebhange, kanye nenombolo yocingo esebenzayo. Ukushoda kwalezi zisekelo kuzoholela ekwenqatshweni okusheshayo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ingosi ye-inthanethi ye-SASSA ayikuniki ithuba lokuchazela umuntu isimo sakho. Uhlelo lubheka kuphela amadokhumenti afanayo owalayishayo. Uma ifayela lifiphele, isistimu iyalenqaba."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu bavame ukuqala uhlelo lokusebenza ku-inthanethi, babone ukuthi bashoda ngedokhumenti, bese beshiya ifomu phakathi. Izinhlelo zokusebenza eziqedwe uhhafu zidala ikhanda lokuphatha elikhulu futhi zibambezele ukugunyazwa kwakho ekugcineni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Khomba ukuthi yisiphi isibonelelo osifakela isicelo.\n2. Thatha izithombe ezigqamile, ezifundekayo zikamazisi wakho namadokhumenti asekelayo.\n3. Qiniseka ukuthi ifoni yakho ishajiwe ngokugcwele futhi inesikhathi somoya sokwamukela ama-SMS OTP.\n4. Vula ingosi yewebhu ye-SASSA esemthethweni.\n5. Gcwalisa lonke ifomu ngesikhathi esisodwa ukuze ugweme ukuphela kwesikhathi seseshini."
      },
      {
        "title": "Inhloso yangempela yokulungiselela",
        "body": "Ukulungiselela umehluko phakathi kokuhola ngenyanga ezayo noma ukulinda izinyanga eziyisithupha. Ungayivuli ingosi yohlelo lokusebenza kuze kube yilapho yonke idokhumenti ihlezi etafuleni lakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi wakhe ifolda yohlelo lwakho lokusebenza ngokwengqondo nangokomzimba. Asikwazi ukulungisa isicelo esinqatshiwe uma usuthumele imibhalo engalungile ku-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlinzeka ngohlu lokuhlola lwesiNgisi esilula lwemibhalo oyidingayo esigabeni ngasinye sesibonelelo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-prepare-before-applying\n• /guides/what-to-check-before-you-start-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/what-documents-you-may-need\n• /eligibility-checker"
      },
      {
        "title": "I-FAQ: Kungani uzilungiselela ngaphambi kokuvula ifomu elisemthethweni?",
        "body": "Ngoba ifomu kulula kakhulu ukuligcwalisa uma usulwazi uhlobo lwesibonelelo futhi usunamarekhodi okungenzeka aselungile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola uhlobo lwesibonelelo kanye nemininingwane yakho yomuntu siqu eyinhloko kuqala, bese uqoqa amarekhodi okungenzeka asekelayo."
      },
      {
        "title": "I-FAQ: Ingabe ukulungiselela kungathuthukisa amathuba ami?",
        "body": "Ayikwazi ukuthembisa ukugunyazwa, kodwa inganciphisa amaphutha angagwemeka nokudideka."
      }
    ]
  },
  "what-to-do-if-an-online-application-form-confuses-you": {
    "title": "Okufanele ukwenze uma ifomu lesicelo esiku-inthanethi likudida",
    "summary": "Okufanele ukwenze lapho ifomu le-inthanethi le-SASSA liba nokudida. Umhlahlandlela opholile wokumisa isikhashana, ufunde, futhi uphendule ngendlela efanele ngaphandle kokwethuka.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ungawuqondi umbuzo kuphothali ye-SASSA, yeka ukuthayipha. Ukuqagela izimpendulo kumafomu kahulumeni asemthethweni kungaholela ekuhlabeni umkhosi noma ekunqatshweni kwezicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amafomu kahulumeni asebenzisa ulimi olusemthethweni oluqinile. Uma becela i-'remuneration', basho umholo wakho. Uma umbuzo uzwakala unzima kakhulu, ungavele ukhethe okuthi 'Yes' ukuze usuke."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Yonke impendulo oyinikezayo ibophezela ngokomthetho. Uma ngephutha uthi uneholo ube ungenalo, i-SASSA izokwenqaba imali yakho yesibonelelo ngenxa yephutha lakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thatha umoya futhi ungachofozi okuthi hambisa.\n2. Thola igama noma umbuzo othize okudidayo.\n3. Bheka leli gama kumhlahlandlela wethu we-GrantCare noma ubuze ilungu lomndeni elithembekile.\n4. Hlola ukuthi unayo yini idokhumenti ephathekayo ephendula umbuzo.\n5. Buyela efomini bese ufaka impendulo efanele nethembekile."
      },
      {
        "title": "Impendulo ephephe kunazo zonke ekudidekeni",
        "body": "Asikho isijeziso sokuthatha isikhathi sakho. Isistimu ingase ikukhiphe uma uthatha isikhathi eside kakhulu, kodwa ungakwazi njalo ukungena futhi bese uqala futhi. Ukunemba kubaluleke kakhulu kunejubane."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza amagama angu-SASSA ayinkimbinkimbi ngesiNgisi esilula, kodwa ngeke sikwazi ukukweluleka ngokusemthethweni ukuthi ungayiphendula kanjani imibuzo ethile mayelana nezimali zakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihumusha i-bureaucratic jargon ye-SASSA olimini olujwayelekile ukuze ukwazi ukugcwalisa isicelo sakho ngokuzethemba okuphelele."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/what-documents-you-may-need\n• /guides/common-online-application-mistakes\n• /eligibility-checker"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngicabange futhi ngiqhubeke?",
        "body": "Cha. Kuphephe kakhudlwana ukumisa kancane futhi uqonde ingxenye edidayo kuqala."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ngingenaso isiqiniseko sokuthi uhlobo lwesibonelelo lulungile?",
        "body": "Qala lapho kuqala. Ukudideka kohlobo lwe-grant ngokuvamile kudala yonke enye indlela yokudideka."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingachaza ifomu ngokwalo?",
        "body": "I-GrantCare ingachaza izihloko ezizungezile ngolimi olulula, okuvamise ukwenza ifomu elisemthethweni liqondeke kalula."
      }
    ]
  },
  "common-online-application-mistakes": {
    "title": "Amaphutha ohlelo lokusebenza lwe-inthanethi ajwayelekile",
    "summary": "Amaphutha avame kakhulu abantu abawenza kuphothali ye-inthanethi ye-SASSA, kanye nendlela yokuwagwema ukuze uqinisekise ukuthi isicelo sakho siyavunywa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Izizathu ezivame kakhulu zokwenqatshwa ukufaka inombolo yocingo okungeyona, ukulayisha amadokhumenti alufifi, noma amagama angapeliwe kahle ukuze angafani ne-ID."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "SASSA's automated systems are ruthless. If your ID says 'Sipho' but you type 'Sipo' efomini, isistimu izokumaka njengokungafani kobunikazi bese imisa isicelo sakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukuthayipha okukodwa kungakubiza izinyanga zosekelo lwezezimali. Uzophoqeleka ukuthi udlule kuzikhalazo ezinde noma inqubo yokucutshungulwa kabusha ukuze nje ulungise iphutha elilodwa lesipelingi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thayipha inombolo yakho kamazisi kancane, uyihlole umazisi wakho ophathekayo.\n2. Qinisekisa ukuthi inombolo yocingo oyifakile ngeyakho futhi iyasebenza njengamanje.\n3. Qinisekisa ukuthi imininingwane yakho yasebhange ifana ncamashi negama lakho.\n4. Hlola ukukhanya kwezithombe zakho zedokhumenti—ungakwazi ukufunda igama ngalinye?\n5. Funda lonke ifomu okokugcina ngaphambi kokuchofoza 'Submit'."
      },
      {
        "title": "Iphutha ngemuva kwamanye amaphutha amaningi",
        "body": "Hlola kabili yonke into. Unganciki ekugcwaliseni okuzenzakalelayo okuvela esipheqululini sakho, njengoba kungase kufake ikheli elidala noma inombolo yocingo enqanyuliwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukungena ohlelweni lwe-SASSA futhi ikulungisele ukuthayipha. Uma usuchofozile thumela, i-SASSA kuphela engachibiyela imininingwane yakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sigqamisa kahle ukuthi izicupho zikuphi ohlelweni lokufaka isicelo ku-inthanethi ukuze ukwazi ukuzulazula kuzo ngokuphephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/what-to-check-before-you-start-an-online-application\n• /guides/what-to-do-if-an-online-application-form-confuses-you\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-apply-without-using-unofficial-websites"
      },
      {
        "title": "I-FAQ: Iliphi iphutha elivame kakhulu lesicelo se-inthanethi?",
        "body": "Iqala ngokushesha kakhulu ngaphandle kokuqinisekisa uhlobo lwesibonelelo, umzila, nemininingwane ebalulekile."
      },
      {
        "title": "I-FAQ: Ingabe amaphutha amancane angabangela ukubambezeleka?",
        "body": "Yebo. Ukungafani kwemininingwane encane kungadala inkinga enkulu kakhulu ngokuhamba kwesikhathi."
      },
      {
        "title": "I-FAQ: Yimuphi umkhuba ovimbela amaphutha amaningi?",
        "body": "Ukuhamba kancane, ukulungiselela ngokucophelela ngaphambi kokuvula ifomu elisemthethweni."
      }
    ]
  },
  "how-to-know-which-grant-application-fits-you": {
    "title": "Ungazi kanjani ukuthi yisiphi isicelo sesibonelelo esikufanela",
    "summary": "Yeka ukuqagela futhi uthole uxhaso oluqondile lwe-SASSA olufanelana nesimo sakho sempilo ngaphambi kokuba uchithe isikhathi ufaka isicelo sokungesona.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-SASSA inikeza izibonelelo ezahlukene zabantu abadala, izingane, abantu abakhubazekile, kanye nalabo abadinga usizo lomphakathi (SRD). Iminyaka yakho, imali engenayo, kanye nempilo yakho inquma ukuthi iyiphi okufanele uyifakele isicelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Awukwazi ukufaka isicelo se-'a grant'. Kufanele ufake isicelo sesigaba esithile. Uma ufaka isicelo seSibonelelo Sokukhubazeka kodwa ufaneleka ukuthola usizo lwe-SRD kuphela, i-SASSA izosenqaba ngokuphelele isicelo sakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufaka isicelo soxhaso olungalungile kukumoshela isikhathi. Uzolinda izinyanga ukuze uthole umphumela, bese wenqatshwa futhi utshelwe ukuthi uqale kabusha esigabeni esifanele."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka iminyaka yakho yamanje—uma uneminyaka engama-60 noma ngaphezulu, bheka Isibonelelo Sikahulumeni Sabantu Abadala.\n2. Ingabe unayo ingane oyinakekelayo? Bheka Isibonelelo Sikahulumeni Sezingane.\n3. Ingabe awusebenzi phakathi kuka-18 no-59? Bheka i-SRD Grant.\n4. Hlola ukuthi i-SASSA eqinile isho imikhawulo yokuhlola yaleso sibonelelo esithile.\n5. Sebenzisa isihloli sethu sokufaneleka se-GrantCare ukuze uqinisekise ukukhetha kwakho ngaphambi kokufaka isicelo."
      },
      {
        "title": "Umbuzo oxazulula ukudideka okuningi",
        "body": "Ungabuzi 'Where is the application form?' Buza 'Which grant am I actually legally entitled to receive?' Ukuphendula umbuzo wesibili kukusindisa ekunqatshweni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi uzulazule emithethweni eyinkimbinkimbi ye-SASSA ukuze uthole okulingana kahle kakhulu. Nokho, i-SASSA kuphela enganquma ngokusemthethweni uma uhlangabezana nemibandela yayo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa izimfuneko ezingokomthetho zesigaba ngasinye sesibonelelo sikahulumeni sibe isiNgisi esilula ukuze ukwazi ukukhetha indlela efanele."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /eligibility-checker\n• /grants\n• /guides/who-may-qualify-for-support\n• /guides/how-to-apply-for-support\n• /guides/how-to-prepare-for-an-online-application"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngikhethe ifomu lokuqala engilithola ku-inthanethi?",
        "body": "Cha. Qala ngokukhetha uhlobo lwesibonelelo esifanelana nesimo sakho."
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kuthiwani uma kunesibonelelo esingaphezu kwesisodwa?",
        "body": "Qhathanisa amakhasi ezibonelelo kanye nemihlahlandlela ebanzi yokufaneleka kuqala, bese uqinisekisa umzila osemthethweni ofana necala lakho."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangikhethela isibonelelo sokugcina?",
        "body": "Cha. Ingakuqondisa, kodwa umzila osemthethweni usalawula isicelo sangempela nesinqumo."
      }
    ]
  },
  "what-to-check-before-you-start-an-online-application": {
    "title": "Okufanele ukuhlole ngaphambi kokuqala uhlelo lokusebenza lwe-inthanethi",
    "summary": "Uhlu lokuhlola lwangaphambi kokufaka isicelo. Qiniseka ukuthi unalezi zinto ezinhlanu ngomumo ngaphambi kokuthi uvule ingosi ye-inthanethi ye-SASSA.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuqala isicelo sakho se-SASSA, kufanele uhlole ibhuku lakho kamazisi, inombolo yakho yocingo esebenzayo, imininingwane yakho yasebhange, ubufakazi bakho bendawo ohlala kuyo, kanye nokuxhumana kwakho kwe-inthanethi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ingosi eku-inthanethi ye-SASSA iqinile futhi ayithetheleli. Uma ukuxhumeka kwakho kwe-inthanethi kwehla phakathi, noma uma ufaka inombolo yefoni okungeyona, isicelo sakho singabhajwa ohlelweni izinyanga."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukulungisa iphutha kuhlelo lokusebenza olusebenzayo lwe-SASSA kunzima ngendlela emangalisayo. Kudinga izingcingo, ukuvakashelwa kwamahhovisi, kanye nama-afidavithi. Ukuyenza iphelele okokuqala kuwukuphela kwendlela yokuqinisekisa inkokhelo esheshayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Khipha umazisi wakho obonakalayo oluhlaza noma ikhadi elihlakaniphile.\n2. Bhala phansi inombolo yakho yocingo futhi uqinisekise ukuthi unesignali yenethiwekhi.\n3. Thola isitatimende sasebhange sakamuva ukuze uqinisekise inombolo ye-akhawunti yakho ngqo.\n4. Qiniseka ukuthi unedatha yeselula eyanele ukuze ugcwalise ifomu le-inthanethi lemizuzu engu-15.\n5. Hlola kabili ukuthi ukuwebhusayithi esemthethweni ye-'.gov.za'."
      },
      {
        "title": "Kungani lolu hlu lokuhlola lubaluleke kangaka",
        "body": "Ungakuphathi lokhu njengokubhalisela i-akhawunti yenkundla yezokuxhumana. Lesi isicelo sezezimali esisemthethweni. Idijithi eyodwa engalungile enombolweni ye-akhawunti yakho yasebhange isho ukuthi imali yakho izogxuma."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubuyisa isicelo uma usuchofoze okuthi hambisa. Kufanele ubuyekeze imininingwane yakho ngokucophelela ngaphambi kokuyiqinisekisa kuphothali esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sinikeza imihlahlandlela enemininingwane yokuthi yimiphi imibhalo i-SASSA elindeleke kulo lonke uhlobo lwesibonelelo sikahulumeni, ukuze ungabanjwa ungalindele."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-prepare-for-an-online-application\n• /guides/common-online-application-mistakes\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/what-documents-you-may-need\n• /eligibility-checker"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola uhlobo lwesibonelelo kuqala, bese kulandela imibhalo kanye nemininingwane yomuntu siqu ebalulekile."
      },
      {
        "title": "I-FAQ: Kungani uhlola umzila ngaphambi kokuthi ifomu liqale?",
        "body": "Ngoba ukusebenzisa umzila ongalungile kungadala ukudideka ngaphambi kokuthi inqubo yangempela iqale."
      },
      {
        "title": "I-FAQ: Ingabe lolu hlu lokuhlola lunganciphisa ukubambezeleka?",
        "body": "Ayinakuqinisekisa isivinini, kodwa inganciphisa amaphutha asobala agwemeka."
      }
    ]
  },
  "what-to-do-if-your-application-form-will-not-open": {
    "title": "Okufanele ukwenze uma ifomu lakho lesicelo lingavulwa",
    "summary": "Umhlahlandlela wokuxazulula izinkinga lapho iwebhusayithi esemthethweni ye-SASSA iphahlazeka, yehluleka ukulayisha, noma ikunikeza umlayezo wephutha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma iwebhusayithi ye-SASSA ingeke ivuleke, akusho ukuthi isicelo sakho sinqatshiwe. Ngokuvamile kusho ukuthi amaseva kahulumeni agcwele kakhulu noma uxhumo lwakho lwe-inthanethi alunamandla."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ingosi ye-SASSA iphatha izigidi zabasebenzisi. Ngeviki lokuqala lenyanga, noma lapho izicelo ezintsha ze-SRD zivuleka, iwebhusayithi ivamise ukuphahlazeka ngaphansi kwethrafikhi enkulu."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Lapho isiza siphahlazeka, abafake izicelo abaphelelwe yithemba bavame ukusesha i-Google futhi bachofoze amawebhusayithi mbumbulu, omkhonyovu afana ne-SASSA. Lena yindlela obunikazi nemininingwane yasebhange ebiwa ngayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola uxhumo lwakho lwe-inthanethi kanye nebhalansi yedatha kuqala.\n2. Vala ithebhu yesiphequluli bese ulinda imizuzu engu-30 ngaphambi kokuzama futhi.\n3. Zama ukungena kuphothali ekuseni kakhulu noma ebusuku kakhulu.\n4. Ungalokothi uchofoze okuthi 'Alternative SASSA Links' ethunyelwe nge-WhatsApp.\n5. Uma isayithi liphansi izinsuku, lalela ukuze uthole izibuyekezo ezisemthethweni ezindabeni noma emsakazweni."
      },
      {
        "title": "Le nkinga ngokuvamile iyini",
        "body": "Isikrini esingenalutho siyiphutha leseva, hhayi ukwenqatshwa komuntu siqu. Ungathuki futhi unganikezi inombolo yakho kamazisi kuwebhusayithi engekho emthethweni ngoba nje ilayisha ngokushesha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayilibambi ifomu lesicelo le-SASSA. Asikwazi ukulungisa amaseva kahulumeni uma engaxhunyiwe ku-inthanethi."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza indlela yokuqinisekisa ukuthi uhlelo lwe-SASSA luhlangabezana nokunqamuka kuzwelonke, sikusiza ukuthi ugweme izixhumanisi eziyingozi zomkhonyovu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-for-an-online-application\n• /guides/what-to-do-if-an-online-application-form-confuses-you\n• /privacy"
      },
      {
        "title": "I-FAQ: Ingabe ifomu elingeke livulwe lisho ukuthi angifaneleki?",
        "body": "Cha. Ngokuvamile kuba inkinga yokufinyelela noma yomzila, hhayi isinqumo mayelana necala lakho."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngichofoze ifomu elihlukile kwenye iwebhusayithi ngokushesha?",
        "body": "Cha. Qinisekisa umzila osemthethweni olungile kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphambi kokuzama futhi?",
        "body": "Hlola umzila, isiphequluli, nokuxhumana ngaphambi kokuthi ucabange ukuthi noma yini enkulu akulungile."
      }
    ]
  },
  "how-to-find-the-official-application-form-safely": {
    "title": "Ungalithola kanjani ifomu lesicelo elisemthethweni ngokuphepha",
    "summary": "Ungakugwema kanjani ukukhwabanisa futhi uthole ngokuphephile ingosi yesicelo esemthethweni ye-SASSA oyidingayo ngesibonelelo sakho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Indawo ephephile kuphela yokufaka isicelo soxhaso lwe-SASSA iwebhusayithi egcina ngo-'.gov.za' noma ehhovisi eliphathekayo le-SASSA. Ungalokothi ufake isicelo ngesixhumanisi esithunyelwe kuwe kokuthi Facebook noma WhatsApp."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abakhwabanisi badala amawebhusayithi mbumbulu afana ncamashi nengosi ye-SASSA yangempela. Uma ufaka umazisi wakho kanye nemininingwane yasebhange lapho, bazokweba imali yakho yesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukwebiwa komazisi kuyinkinga enkulu ohlelweni lwezibonelelo. Uma umkhohlisi engenela isicelo sakho, kungathatha iminyaka yezincwadi ezifungelwe zamaphoyisa kanye nokuvakasha kwehhovisi ukuze kusule igama lakho futhi uthole imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula isiphequluli sakho bese uthayipha 'sassa.gov.za' ngqo kubha yekheli.\n2. Bheka isithonjana sengidi eduze kwekheli lewebhu.\n3. Qinisekisa ukuthi ikheli lewebhu ligcina ngo-'.gov.za' ngokuphelele.\n4. Ungalokothi ukhokhe i-'agent' imali ekhokhwa ngaphambili ukuze ikunikeze isixhumanisi sohlelo lokusebenza.\n5. Uma isayithi likucela i-PIN yakho yasebhange, ivale ngokushesha."
      },
      {
        "title": "Indlela ephephe kunazo zonke",
        "body": "Amawebhusayithi kahulumeni asemthethweni awasebenzisi izizinda ezifana ne-'.com', '.co.za', noma '.net'. Basebenzisa njalo i-'.gov.za'. Lesi isiqinisekiso sakho esiphelele sokuthi ukusayithi elilungile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza imihlahlandlela yezemfundo ezimele. Asisoze sakucela inombolo yakho kamazisi noma imininingwane yasebhange, futhi asizicubunguli izicelo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi uwabona kanjani amawebhusayithi e-SASSA mbumbulu futhi uvikele imininingwane yakho yomuntu siqu kubahlaseli abaku-inthanethi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /grants\n• /eligibility-checker"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise uhlobo lwesibonelelo kuqala?",
        "body": "Ngoba ifomu elilungile lincike emzileni wesibonelelo olingana necala lakho."
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lingakwazi ukusho ifomu kodwa lingabi yilona langempela?",
        "body": "Yebo. Yingakho umzila osemthethweni usadinga ukubhekwa ngokucophelela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngingalokothi ngiyiphathe njengobufakazi bokugcina befomu elilungile?",
        "body": "Isixhumanisi esikopishiwe noma okuthunyelwe okungahleliwe okuphinda amagama alungile kuphela ngaphandle kobunikazi obusemthethweni obucacile."
      }
    ]
  },
  "how-to-apply-without-using-unofficial-websites": {
    "title": "Ungasifaka kanjani isicelo ngaphandle kokusebenzisa amawebhusayithi angekho emthethweni",
    "summary": "Umhlahlandlela wokugcina ukuphepha kwakho ku-inthanethi. Funda ukuthi ungahlukanisa kanjani iziqondiso ezizimele eziyingozi kumaphothali ezicelo angekho emthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amasayithi azimele njenge-GrantCare ukuze ufunde imithetho, uhlole ukufaneleka kwakho, futhi ulungise amadokhumenti akho. Kodwa kufanele usebenzise ingosi ye-SASSA esemthethweni yohlelo lokusebenza lwangempela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Umhlahlandlela othembekile uzokusiza uqonde uhlelo oludidayo lwe-SASSA. Kodwa umhlahlandlela othembekile akasoze wakucela ukuthi ulayishe umazisi wakho noma izitatimende zasebhange ngqo kubo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukufiphalisa imigqa phakathi kwesiqondiso nokusetshenziswa kuyingozi. Uma unikezela ngesicelo sakho kumuntu wesithathu ongekho emthethweni, ulahlekelwa yikho konke ukulawula idatha yakho yomuntu siqu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda i-GrantCare ukuze uqonde kahle ukuthi yisiphi isibonelelo osifanelekela.\n2. Sebenzisa izinhla zokuhlola ukuze uqoqe imibhalo yakho ephathekayo.\n3. Shiya iwebhusayithi ye-GrantCare uma usulungele ukufaka isicelo.\n4. Vula ingosi ye-SASSA '.gov.za' esemthethweni.\n5. Gcwalisa isicelo sakho ngqo kuhulumeni."
      },
      {
        "title": "Usizo oluzimele lusetshenziswa kanjani kangcono",
        "body": "Cabanga nge-GrantCare njengemephu. Sikubonisa indlela ephephe kakhulu, eshesha kakhulu eya endaweni oya kuyo. Kodwa kusafanele uzishayele ngokwakho imoto ngokuvakashela ihhovisi elisemthethweni le-SASSA noma ingosi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yokufundisa ngokuphelele. Asikwazi ukufinyelela kusizindalwazi se-SASSA futhi asithumeleli noma ubani izicelo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikunikeza imihlahlandlela yokulungiselela ecacile, enembe kunayo yonke eNingizimu Afrika, ekunika amandla okuphatha uhlelo olusemthethweni lwe-SASSA ngokuzethemba nangokuphepha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /guides/how-to-apply-for-support\n• /privacy"
      },
      {
        "title": "I-FAQ: Ingabe amawebhusayithi azimele asengaba usizo?",
        "body": "Yebo, uma behlala ngokucacile endimeni yokuqondisa futhi bengenzi sengathi bayindlela esemthethweni yokufaka isicelo."
      },
      {
        "title": "I-FAQ: Yini okufanele ihlale njalo kumzila osemthethweni?",
        "body": "Isenzo sangempela sohlelo kanye nanoma yisiphi isimo esisemthethweni noma isinyathelo sokuhambisa idokhumenti."
      },
      {
        "title": "I-FAQ: Iyiphi indlela ephephe kunazo zonke yokusebenzisa i-GrantCare lapha?",
        "body": "Sebenzisa i-GrantCare ukuze ulungiselele nencazelo, bese ushintshela emzileni osemthethweni wohlelo lokusebenza lwangempela."
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

export const SEO_BATCH_TEN_GUIDES = SEO_BATCH_TEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
