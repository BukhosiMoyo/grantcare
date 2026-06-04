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

const SEO_BATCH_TWELVE_GUIDES_SOURCE = [
  guide({
    slug: "what-the-sassa-service-portal-is-for",
    title: "What the SASSA service portal is for",
    summary:
      "A plain-language guide to what people usually mean when they search for the SASSA service portal and how to use the right official route safely.",
    quickAnswer:
      "The SASSA service portal usually refers to an official online route for grant-related information or actions. The safest way to use it is to confirm the task first, then make sure you are on the real official site before entering any details.",
    whatThisMeans:
      "People often search for the service portal when they want one place to handle status, application, or contact-related tasks. The problem is that different tasks may use different official pages. That is why portal searches can feel simpler than they really are.",
    whyThisMatters:
      "If users treat every portal-looking page as the same thing, they can end up on the wrong route or mistake an independent guide for the official action page. Clear separation matters here.",
    steps:
      "1. Decide what you actually need to do.\n2. Check whether the task is status, application, payment, or contact related.\n3. Start from the official route that matches that task.\n4. Confirm the page before entering personal details.\n5. Use GrantCare for explanation, not as the official action page.",
    keyFocusTitle: "Portal is a broad word, not one simple answer",
    keyFocus:
      "The search term portal sounds like one door for everything. In practice, the safest move is to identify the exact task first and then use the official route that matches it.",
    important:
      "GrantCare is an independent information platform. It does not replace the official SASSA service portal or any official application, status, or payment route.",
    help:
      "GrantCare can help you work out which official path you actually need before you click through, which lowers the chance of using the wrong page.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/where-to-find-official-updates-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/official-status-check-vs-independent-guide",
    faqs: [
      {
        question: "Is the service portal the same as GrantCare?",
        answer: "No. GrantCare explains the process, while official actions still belong to official government pages.",
      },
      {
        question: "Why does portal searching feel confusing?",
        answer: "Because people use the word portal for different tasks that may not all happen on the same page.",
      },
      {
        question: "What should I do before entering details?",
        answer: "Confirm that the page is the correct official route for the task you need.",
      },
    ],
    sortOrder: 234,
  }),
  guide({
    slug: "how-to-use-services-sassa-gov-za-safely",
    title: "How to use services.sassa.gov.za safely",
    summary:
      "A safety-first guide to using services.sassa.gov.za without confusing it with copied pages, fake links, or unrelated grant-help websites.",
    quickAnswer:
      "Use services.sassa.gov.za safely by opening it from a trusted source, checking the address carefully, and making sure the page matches the task you want to complete.",
    whatThisMeans:
      "Many users search for the services.sassa.gov.za address because they want to reach an official starting point quickly. That makes it a common target for confusion when copied links or lookalike pages appear.",
    whyThisMatters:
      "A page can use the right words and still not be the right place for an official action. Safe use starts with checking the address and the task before you trust the page.",
    steps:
      "1. Type the address carefully or use a trusted saved source.\n2. Check that the page belongs to the official domain.\n3. Confirm that the page matches your task.\n4. Avoid entering personal details on copied or shortened links.\n5. Return to GrantCare if you need help understanding what the official page is asking.",
    keyFocusTitle: "Safety starts before the page even loads",
    keyFocus:
      "The safest habit is not only reading the page. It is also checking how you reached it. That reduces the chance of landing on a page that only looks official.",
    important:
      "GrantCare is independent and should not be used as the official services.sassa.gov.za page. It is here to guide you toward the right route, not replace it.",
    help:
      "GrantCare can help you figure out which official task page you need before you use the official domain, especially if you are switching between status, application, and payment questions.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why should I check the full address carefully?",
        answer: "Because copied or lookalike links can use similar words without being the official route.",
      },
      {
        question: "Should I bookmark the real page once I find it?",
        answer: "That can help, as long as you are sure the first page was the correct official one.",
      },
      {
        question: "What if I still feel unsure?",
        answer: "Use GrantCare to confirm the type of official page you need before you proceed.",
      },
    ],
    sortOrder: 235,
  }),
  guide({
    slug: "how-to-use-services-sassa-gov-za-login-safely",
    title: "How to use services.sassa.gov.za login safely",
    summary:
      "A practical guide to safe login habits for official portal pages, with a focus on avoiding fake login screens and rushed mistakes.",
    quickAnswer:
      "Use services.sassa.gov.za login safely by confirming the page first, using only the details the official route actually asks for, and avoiding links from untrusted messages.",
    whatThisMeans:
      "Login pages create more pressure than ordinary information pages because users may be about to enter personal information. That makes address-checking and page-matching especially important.",
    whyThisMatters:
      "A fake information page is confusing. A fake login page is riskier, because it may try to capture personal details. That is why login pages need extra caution.",
    steps:
      "1. Open the login page from a trusted source.\n2. Check the domain carefully.\n3. Make sure the page matches the official task you want.\n4. Enter details only if the page clearly belongs to the official route.\n5. Stop and recheck if anything about the page feels unfamiliar or rushed.",
    keyFocusTitle: "Login pages need a slower reading pace",
    keyFocus:
      "People often move fastest on login pages because they want quick access. That is exactly why slowing down for a few seconds can protect you most.",
    important:
      "GrantCare does not handle official logins. It helps you understand how to reach the correct official page safely and when to step back if something looks wrong.",
    help:
      "GrantCare can help you separate official login needs from guide content so you know when you should be on an official page and when you only need an explanation.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-the-portal-login-page-keeps-failing\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/official-status-check-vs-independent-guide",
    faqs: [
      {
        question: "Why are login pages riskier than normal pages?",
        answer: "Because users may enter personal details there, so a fake page can cause more harm.",
      },
      {
        question: "Should I log in from a random message link?",
        answer: "No. It is safer to start from a trusted route you already know.",
      },
      {
        question: "What if the page looks slightly different from last time?",
        answer: "Check the full address and the task before you continue.",
      },
    ],
    sortOrder: 236,
  }),
  guide({
    slug: "what-sassa-portal-login-is-for",
    title: "What SASSA portal login is for",
    summary:
      "A clear guide to what users usually mean by SASSA portal login and how to decide whether you actually need a login page at all.",
    quickAnswer:
      "SASSA portal login usually refers to an official sign-in route for a specific online task. Before you search for login, it helps to check whether your task really needs sign-in or only an official information page.",
    whatThisMeans:
      "Some users search for login because they want faster access. Others search because they are not sure which page they need. In practice, not every grant-related action begins with the same kind of login page.",
    whyThisMatters:
      "If you search for login before you know the task, you can waste time on the wrong route or end up entering details where you do not need to.",
    steps:
      "1. Decide the task first.\n2. Check whether that task truly needs an official sign-in page.\n3. Use the correct official route for the task.\n4. Confirm the domain before entering any details.\n5. Keep GrantCare for explanations and the official page for the actual action.",
    keyFocusTitle: "Task first, login second",
    keyFocus:
      "The safest sequence is to understand the task first and only then decide whether a login page belongs to it. That reduces a lot of avoidable confusion.",
    important:
      "GrantCare is not an official portal login page and should never be treated as one. Official sign-in actions still belong to official government systems.",
    help:
      "GrantCare can help you work out whether you need a status page, an application page, a payment page, or a true login route before you go further.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-find-the-official-application-form-safely",
    faqs: [
      {
        question: "Does every grant-related action use the same login page?",
        answer: "No. Different official tasks may use different routes or no login at all.",
      },
      {
        question: "Why is task-first thinking safer?",
        answer: "Because it keeps you from chasing the wrong page before you know what you actually need.",
      },
      {
        question: "Can GrantCare log me in?",
        answer: "No. GrantCare only explains the process and points you to the correct type of official route.",
      },
    ],
    sortOrder: 237,
  }),
  guide({
    slug: "how-to-use-srd-sassa-gov-za-login-safely",
    title: "How to use SRD SASSA gov za login safely",
    summary:
      "A guide to safe use of SRD-style login pages, written for users who want official access without landing on fake or copied pages.",
    quickAnswer:
      "Use SRD-style login pages safely by starting from the official SRD route, checking the address carefully, and treating copied social-media links with caution.",
    whatThisMeans:
      "SRD-related searches often happen under pressure because people want status, appeal, application, or payment information quickly. That makes users more likely to click the first page that looks familiar.",
    whyThisMatters:
      "The faster a user wants the result, the easier it is to skip the safety checks that protect them from fake or unrelated pages.",
    steps:
      "1. Start from the official SRD route.\n2. Confirm the address and the purpose of the page.\n3. Avoid opening copied links from comments or group chats.\n4. Use only the details the official page asks for.\n5. Return to GrantCare if you need help understanding the next step after the official page loads.",
    keyFocusTitle: "Speed creates risk here",
    keyFocus:
      "SRD login searches often come from urgent situations. That urgency can make fake or confusing pages more effective, so slowing down for a few seconds matters a lot.",
    important:
      "GrantCare is not the official SRD portal. It can help you reach the right kind of official page safely, but it does not replace official login or official status actions.",
    help:
      "GrantCare can help you tell the difference between SRD status checks, appeals, payment pages, and login-like routes so you do not click around blindly.",
    related:
      "Useful next pages:\n• /guides/official-srd-status-check-link-guide\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-find-official-status-check-updates-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-apply-without-using-unofficial-websites",
    faqs: [
      {
        question: "Why do SRD searches often attract fake links?",
        answer: "Because the demand is high and many users want quick answers under pressure.",
      },
      {
        question: "Should I trust an SRD login link from a chat group?",
        answer: "It is safer to go through a trusted official route you already know.",
      },
      {
        question: "What should I do after the official page loads?",
        answer: "Complete only the official action there and use GrantCare if you need help understanding the result.",
      },
    ],
    sortOrder: 238,
  }),
  guide({
    slug: "how-to-know-if-a-sassa-website-is-official",
    title: "How to know if a SASSA website is official",
    summary:
      "A trust-focused guide for checking whether a SASSA-related website is truly official before you rely on it for status, applications, or personal details.",
    quickAnswer:
      "You can judge whether a SASSA-related website is official by checking the domain carefully, matching the page to the task, and being cautious with sites that copy official wording without clear official ownership.",
    whatThisMeans:
      "Many pages use the same search terms, but not all of them serve the same role. Some are official action pages. Some are independent guides. Others may simply copy official language. The difference matters.",
    whyThisMatters:
      "Without a basic trust check, users can mistake a guide or a fake page for the real action route. That can lead to confusion or unsafe sharing of personal details.",
    steps:
      "1. Check the full address carefully.\n2. Confirm whether the page matches the official task you need.\n3. Look for clear signs that the page belongs to the official route.\n4. Avoid trusting copied text alone.\n5. Use GrantCare for explanation and official routes for official actions.",
    keyFocusTitle: "Correct words are not enough",
    keyFocus:
      "A page can use the right grant words and still not be the right place for an official action. The address and the role of the page matter as much as the wording.",
    important:
      "GrantCare is independent and says so clearly. That honesty is part of how users can distinguish independent guidance from official action pages.",
    help:
      "GrantCare can help you understand what kind of official page you need before you try to verify whether a website is the real route.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-use-services-sassa-gov-za-safely\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Can a non-official site still be useful?",
        answer: "Yes, if it clearly stays in the guidance role and does not pretend to be the official action page.",
      },
      {
        question: "What matters most besides the wording?",
        answer: "The domain, the task, and whether the page is clearly the official action route.",
      },
      {
        question: "Should I enter personal details on a page that only looks familiar?",
        answer: "No. Confirm the page first before entering anything sensitive.",
      },
    ],
    sortOrder: 239,
  }),
  guide({
    slug: "how-to-find-the-right-sassa-website-for-your-task",
    title: "How to find the right SASSA website for your task",
    summary:
      "A practical guide to choosing the right official route for status, application, payment, and contact tasks instead of searching blindly.",
    quickAnswer:
      "Find the right SASSA website by deciding the task first. Status, application, payment, and contact tasks often use different official routes, so task-first searching is much safer.",
    whatThisMeans:
      "Users often start by searching for the word website when what they actually need is a very specific type of page. That is why one broad search can bring up too many routes that look similar.",
    whyThisMatters:
      "Once the task is clear, the right route becomes easier to identify. That helps users avoid fake links, copied pages, and unnecessary confusion.",
    steps:
      "1. Write down the task you need.\n2. Decide whether it is status, application, payment, or contact related.\n3. Look for the official route that matches that task.\n4. Check the address and purpose of the page.\n5. Return to GrantCare if you need help understanding which task category applies.",
    keyFocusTitle: "A broad search needs a narrower question",
    keyFocus:
      "Website searches become much easier when you narrow them into one clear task. That simple shift often removes most of the confusion.",
    important:
      "GrantCare is not the official website for government actions. It helps users understand which official route they actually need before they click through.",
    help:
      "GrantCare can help you sort tasks into status, payment, application, and contact categories so you can use the right official page with more confidence.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-find-official-contact-details-safely\n• /guides/what-the-sassa-service-portal-is-for",
    faqs: [
      {
        question: "Why does one general website search feel messy?",
        answer: "Because different grant tasks may use different official pages even when the search terms look similar.",
      },
      {
        question: "What should I decide first?",
        answer: "Decide the task before you decide the page.",
      },
      {
        question: "Can GrantCare choose the official page for me?",
        answer: "It can guide you toward the right type of route, but the official page itself remains separate.",
      },
    ],
    sortOrder: 240,
  }),
  guide({
    slug: "sassa-website-vs-srd-portal-guide",
    title: "SASSA website vs SRD portal guide",
    summary:
      "A simple comparison guide showing why a general SASSA website search and an SRD portal search do not always point to the same official route.",
    quickAnswer:
      "A general SASSA website search and an SRD portal search can lead to different official routes because they often serve different tasks. The safest move is to match the page to the task instead of assuming they are interchangeable.",
    whatThisMeans:
      "Users often mix broad SASSA searches with SRD-specific searches because the words overlap. In practice, SRD-related actions can point to a more specific official route than general grant information or contact tasks.",
    whyThisMatters:
      "If you treat every official-looking page as the same thing, you may read the wrong information or miss the page that actually handles your task.",
    steps:
      "1. Decide whether your task is SRD-specific or general-grant related.\n2. Match the route to that task.\n3. Confirm the page before using it.\n4. Avoid relying on shared screenshots that remove the context.\n5. Use GrantCare if you need help separating the routes before proceeding.",
    keyFocusTitle: "Overlap in wording is not the same as overlap in purpose",
    keyFocus:
      "The words SASSA and SRD often appear together, but the page you need depends on what you are trying to do. That purpose matters more than the broad label.",
    important:
      "GrantCare is an independent guide. It can explain the difference between broad grant routes and SRD-specific routes, but it does not replace either official system.",
    help:
      "GrantCare can help you decide whether your next step belongs on a general information page, a status check route, a payment page, or an SRD-specific portal.",
    related:
      "Useful next pages:\n• /guides/what-the-srd-portal-is-for\n• /guides/what-the-sassa-service-portal-is-for\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-find-the-right-status-check-for-your-grant",
    faqs: [
      {
        question: "Are the SASSA website and SRD portal always the same thing?",
        answer: "No. They can point to different official routes depending on the task.",
      },
      {
        question: "Why do users mix them up?",
        answer: "Because the search terms overlap and both are connected to grant-related tasks.",
      },
      {
        question: "What should I match first?",
        answer: "Match the task to the route before you treat the pages as interchangeable.",
      },
    ],
    sortOrder: 241,
  }),
  guide({
    slug: "how-to-open-the-sassa-website-on-mobile",
    title: "How to open the SASSA website on mobile",
    summary:
      "A mobile-first guide to reaching the right SASSA-related website safely on a phone without getting lost in copied links or overloaded pages.",
    quickAnswer:
      "Open the SASSA website on mobile by starting from a trusted route, checking the address carefully, and making sure you are loading the page that matches your task rather than a copied shortcut.",
    whatThisMeans:
      "Many users do everything on a phone, so mobile searches often happen under data pressure or on small screens. That can make it harder to spot the difference between the right route and a confusing one.",
    whyThisMatters:
      "On a phone, users may only see part of the address or click quickly through search results. A slower mobile habit can prevent the wrong page from becoming the next problem.",
    steps:
      "1. Use a trusted bookmark or carefully type the route.\n2. Check the page address on your phone before proceeding.\n3. Make sure the page matches your task.\n4. Avoid links from random messages or image posts.\n5. Save the correct page once you confirm it is the right official route.",
    keyFocusTitle: "Mobile convenience needs mobile caution",
    keyFocus:
      "Phones make access easier, but they also hide some details. A short address check on mobile can save a lot of trouble later.",
    important:
      "GrantCare is built to be mobile-friendly, but it is still independent guidance. Official actions must still happen on the right official page you open from your phone.",
    help:
      "GrantCare can help you choose the correct route before you start clicking through search results on mobile, which makes the phone journey much calmer.",
    related:
      "Useful next pages:\n• /guides/how-to-use-sassa-status-check-for-r350\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages",
    faqs: [
      {
        question: "Why is mobile access easier to get wrong?",
        answer: "Because the address and page details may be less visible on a small screen.",
      },
      {
        question: "Should I save the right page once I find it?",
        answer: "Yes, if you are sure it is the correct official route for the task.",
      },
      {
        question: "What should I avoid on mobile?",
        answer: "Avoid random message links and copied screenshots that do not show the full route clearly.",
      },
    ],
    sortOrder: 242,
  }),
  guide({
    slug: "how-to-check-application-status-on-the-official-portal-safely",
    title: "How to check application status on the official portal safely",
    summary:
      "A guide to reaching the correct official status route carefully and reading the result without confusing it with unrelated pages.",
    quickAnswer:
      "Check application status safely by using the correct official status route for your grant, confirming the page first, and then reading the status wording before jumping to conclusions.",
    whatThisMeans:
      "Many users search for status because they want certainty fast. That can lead them to any page that mentions status, even when the page is not the official route or not the correct route for their grant type.",
    whyThisMatters:
      "Using the wrong page can waste time, and reading the right page too quickly can still create confusion. Safe checking depends on both the route and the interpretation.",
    steps:
      "1. Identify which grant or support category you are checking.\n2. Open the correct official status route for that category.\n3. Confirm the address before entering any details.\n4. Read the result wording carefully.\n5. Use GrantCare to understand the meaning after the official page gives the result.",
    keyFocusTitle: "Safe checking has two parts",
    keyFocus:
      "The first part is reaching the right official page. The second part is reading the result carefully. Many users only think about one of those two.",
    important:
      "GrantCare does not run the official status system. It helps you reach the correct route and interpret the wording you see there.",
    help:
      "GrantCare can help you choose the right status route, understand what the result means, and decide what kind of next step fits that wording.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-use-status-check-before-appealing\n• /guides/how-to-read-your-status-check-result\n• /guides/what-to-do-after-a-status-check-result\n• /status",
    faqs: [
      {
        question: "Why should I identify the grant first?",
        answer: "Because the correct official status route can depend on the type of grant or support you are checking.",
      },
      {
        question: "Should I trust the first result that mentions status?",
        answer: "No. Confirm that the page is the correct official route before you use it.",
      },
      {
        question: "What should I do after I see the status?",
        answer: "Use GrantCare to understand the wording before deciding the next step.",
      },
    ],
    sortOrder: 243,
  }),
  guide({
    slug: "what-to-do-if-the-portal-login-page-keeps-failing",
    title: "What to do if the portal login page keeps failing",
    summary:
      "A troubleshooting guide for official portal login pages that will not load, refresh badly, or seem stuck before you can continue.",
    quickAnswer:
      "If the portal login page keeps failing, start by checking the route, connection, and page itself before you assume your case or details are the problem.",
    whatThisMeans:
      "A login page failure is usually a page-access problem first, not a final decision about your application or status. That distinction matters because it changes how you should respond.",
    whyThisMatters:
      "Users sometimes panic and jump to copied links when the official page fails. That can create a trust problem on top of the technical one.",
    steps:
      "1. Check that you are on the correct official route.\n2. Refresh the page and retry the browser.\n3. Check whether your connection is stable.\n4. Avoid opening random replacement links.\n5. Return to the official route once the access problem is resolved.",
    keyFocusTitle: "Treat this as access trouble first",
    keyFocus:
      "A failing login page usually means the page is not loading properly or the route is wrong. That is different from your grant result itself being a problem.",
    important:
      "GrantCare cannot repair an official login page. It can help you stay on the right route and avoid turning a temporary access problem into a bigger safety problem.",
    help:
      "GrantCare can help you separate technical access issues from status or payment issues so you do not react to the wrong problem.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-you-cannot-log-in-to-the-sassa-portal\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/what-to-do-if-the-status-check-page-will-not-load",
    faqs: [
      {
        question: "Does a failing login page mean my application failed?",
        answer: "No. It is usually a page access or route issue first.",
      },
      {
        question: "Should I click a different link from social media right away?",
        answer: "No. Stay with trusted official routes instead of random replacements.",
      },
      {
        question: "What should I check first?",
        answer: "Check the official route, the connection, and the browser before assuming a bigger problem.",
      },
    ],
    sortOrder: 244,
  }),
  guide({
    slug: "what-to-do-if-you-cannot-log-in-to-the-sassa-portal",
    title: "What to do if you cannot log in to the SASSA portal",
    summary:
      "A recovery guide for portal sign-in problems, focused on safe next steps instead of rushed guesses.",
    quickAnswer:
      "If you cannot log in to the SASSA portal, first confirm that you are on the correct page, then work through the access problem carefully instead of entering details repeatedly on uncertain pages.",
    whatThisMeans:
      "A login problem can come from the route, the page, the connection, or the details you are trying to use. The key is to narrow the problem safely rather than trying many random fixes.",
    whyThisMatters:
      "Repeated failed attempts on the wrong page or with rushed guesses can make the situation more stressful and less clear.",
    steps:
      "1. Confirm the page is the correct official route.\n2. Recheck the details you are trying to use.\n3. Retry carefully instead of rushing repeated attempts.\n4. Keep a note of what step is actually failing.\n5. Use official contact or support routes if the access problem clearly continues.",
    keyFocusTitle: "A calm login check works better than repeated guessing",
    keyFocus:
      "The safest login recovery is step-by-step. Once you know whether the problem is the page, the route, or the sign-in details, the next move becomes more obvious.",
    important:
      "GrantCare does not control official login access. It can help you stay on the right route and understand which part of the login flow seems to be the real problem.",
    help:
      "GrantCare can help you pair login problems with official contact, website-safety, and portal-navigation guides so you are not troubleshooting in the dark.",
    related:
      "Useful next pages:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages",
    faqs: [
      {
        question: "Why should I confirm the page first?",
        answer: "Because a login problem on the wrong page will never be solved by entering the same details again.",
      },
      {
        question: "Should I keep trying the same thing over and over?",
        answer: "Usually no. It helps more to identify which exact part of the login is failing.",
      },
      {
        question: "When should I use official contact routes?",
        answer: "Use them when the official login issue continues after you confirm you are on the right page.",
      },
    ],
    sortOrder: 245,
  }),
  guide({
    slug: "how-to-keep-your-portal-login-details-safe",
    title: "How to keep your portal login details safe",
    summary:
      "A practical safety guide for protecting portal login details when searching for status, payments, or application help online.",
    quickAnswer:
      "Keep your portal login details safe by entering them only on confirmed official pages, avoiding copied login links, and not sharing them casually through chats or social posts.",
    whatThisMeans:
      "People often think about page safety but not about detail safety. The details themselves matter just as much, especially when stress makes users less careful about where they type them.",
    whyThisMatters:
      "Once login details are used on the wrong page, the damage can be harder to reverse than a simple wrong click. That is why safety habits around login information matter.",
    steps:
      "1. Enter details only on a confirmed official page.\n2. Avoid sharing login information in chats or comments.\n3. Be cautious with links from unknown messages.\n4. Stop if the page feels unfamiliar or rushed.\n5. Use official contact routes if you think your login details were used on the wrong page.",
    keyFocusTitle: "Protect the details, not only the device",
    keyFocus:
      "Many safety mistakes happen because users focus on finding the page and forget that the details themselves are what need protection once the page appears.",
    important:
      "GrantCare will never ask you to complete official login actions inside its guide pages. That separation is intentional and protects trust.",
    help:
      "GrantCare can help you tell the difference between a guide page and a real official route so you know when login details should never be entered.",
    related:
      "Useful next pages:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /privacy",
    faqs: [
      {
        question: "Should I share login details with someone helping me?",
        answer: "It is safer not to. Official login details should stay protected and used only on confirmed official pages.",
      },
      {
        question: "Why is a copied login link risky?",
        answer: "Because it may send you to a page that looks right without actually being the official route.",
      },
      {
        question: "How does GrantCare handle official logins?",
        answer: "It does not handle them. Official login actions stay on official systems only.",
      },
    ],
    sortOrder: 246,
  }),
  guide({
    slug: "how-to-find-official-contact-details-safely",
    title: "How to find official contact details safely",
    summary:
      "A trust-focused guide to finding official SASSA contact details without relying on copied numbers, old screenshots, or unsafe pages.",
    quickAnswer:
      "Find official contact details safely by starting from official contact pages, checking that the page matches the service you need, and being cautious with numbers shared out of context.",
    whatThisMeans:
      "Contact details can change, and not every shared number is current or suitable for every task. That is why a safe contact search should start with the right official contact page, not with a random post.",
    whyThisMatters:
      "Users often search for contact details when they are frustrated and need help quickly. That urgency can make outdated or unofficial numbers look more trustworthy than they are.",
    steps:
      "1. Decide what kind of help you need.\n2. Use the official contact page for that type of help.\n3. Check whether the contact details still look current there.\n4. Avoid trusting numbers copied without source or date.\n5. Keep the official contact page saved once you confirm it.",
    keyFocusTitle: "Contact details need source and context",
    keyFocus:
      "A number on its own is not enough. You also need to know whether it came from an official page and whether it fits the help you need.",
    important:
      "GrantCare does not publish itself as an official contact center. It can guide you toward official contact routes, but it does not replace them.",
    help:
      "GrantCare can help you work out whether your issue needs contact, status checking, office help, or another official route before you start searching for numbers.",
    related:
      "Useful next pages:\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-find-the-right-contact-number-for-r350-help\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why should I not trust copied numbers right away?",
        answer: "Because they may be outdated, incomplete, or not tied to the right official service page.",
      },
      {
        question: "What should I decide first?",
        answer: "Decide what help you need before you search for a number.",
      },
      {
        question: "Can GrantCare give official contact help directly?",
        answer: "No. It helps you find the right official contact route instead.",
      },
    ],
    sortOrder: 247,
  }),
  guide({
    slug: "how-to-use-sassa-contact-numbers-safely",
    title: "How to use SASSA contact numbers safely",
    summary:
      "A practical guide to using contact numbers carefully so you do not waste time on the wrong number or trust an unofficial one.",
    quickAnswer:
      "Use SASSA contact numbers safely by confirming the number on an official contact page, matching it to your task, and keeping a record of what help you asked for.",
    whatThisMeans:
      "Users often think the main challenge is finding any number. The safer challenge is finding the right number for the right task and making sure the number really comes from an official source.",
    whyThisMatters:
      "A wrong or outdated number can create more delay, more stress, and more confusion. Safe number use reduces that risk.",
    steps:
      "1. Confirm the number on an official contact page.\n2. Match the number to the help you need.\n3. Keep notes about what you asked and what answer you got.\n4. Avoid trusting numbers with no clear official source.\n5. Return to the official contact page if you need to recheck the details later.",
    keyFocusTitle: "The number and the task must fit each other",
    keyFocus:
      "Even a real official number is only useful if it matches the help you actually need. That is why task-matching matters just as much as the number itself.",
    important:
      "GrantCare does not act as an official call center. It is an independent guide that helps users decide when phone help is the right next step.",
    help:
      "GrantCare can help you narrow the issue before you call, which makes it easier to know whether phone support is the right route at all.",
    related:
      "Useful next pages:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-find-the-right-contact-number-for-r350-help\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-keep-records-of-payment-problems",
    faqs: [
      {
        question: "Why should I match the number to the task?",
        answer: "Because not every official number handles every kind of grant-related problem.",
      },
      {
        question: "What should I record after calling?",
        answer: "Record what you asked, what you were told, and when the call happened.",
      },
      {
        question: "Should I keep reusing a number from an old screenshot?",
        answer: "It is safer to recheck the official contact page first.",
      },
    ],
    sortOrder: 248,
  }),
  guide({
    slug: "how-to-find-the-right-contact-number-for-r350-help",
    title: "How to find the right contact number for R350 help",
    summary:
      "A focused guide for users looking for R350-related contact help without mixing general grant contacts with SRD-specific issues.",
    quickAnswer:
      "Find the right contact number for R350 help by checking the official route that fits your specific SRD-related issue before you trust a copied number.",
    whatThisMeans:
      "R350-related searches often come from urgent situations, so users may search for any number that sounds helpful. The safer move is to decide whether the issue is about status, payment, application, or another SRD-related problem first.",
    whyThisMatters:
      "Without that task check, users can waste time on the wrong contact route or keep repeating the same question in the wrong place.",
    steps:
      "1. Identify the exact R350-related issue.\n2. Check the official contact route linked to that issue.\n3. Confirm the source before calling.\n4. Keep a short note of the problem and any records you may need.\n5. Save the official page rather than relying on a copied number alone.",
    keyFocusTitle: "R350 help works better when the issue is specific",
    keyFocus:
      "The more specific the issue is, the easier it is to find the right official contact route. Broad searching often creates more confusion than clarity.",
    important:
      "GrantCare can help you narrow the SRD-related problem, but it does not provide the official phone support itself.",
    help:
      "GrantCare can help you sort R350-related issues into status, payment, appeal, contact, or application categories before you use the official contact route.",
    related:
      "Useful next pages:\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-check-srd-status-online\n• /guides/how-sassa-appeals-work\n• /guides/where-to-confirm-payment-problems-officially\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Why should I narrow the issue before looking for a number?",
        answer: "Because the right official contact route depends on the type of help you actually need.",
      },
      {
        question: "Should I use the first R350 number I see online?",
        answer: "No. Confirm the official source first.",
      },
      {
        question: "What helps before I call?",
        answer: "A clear summary of the issue and any relevant dates or wording.",
      },
    ],
    sortOrder: 249,
  }),
  guide({
    slug: "how-to-use-sassa-toll-free-and-contact-pages-safely",
    title: "How to use SASSA toll-free and contact pages safely",
    summary:
      "A guide to using toll-free and official contact pages carefully, especially when numbers may be copied or outdated elsewhere online.",
    quickAnswer:
      "Use toll-free and contact pages safely by starting from the official contact page, checking whether the details still apply to your issue, and avoiding unverified numbers shared without context.",
    whatThisMeans:
      "Users often search for toll-free or free-call help when they want lower-cost access. That is understandable, but it makes official source-checking even more important because old or copied numbers can spread easily.",
    whyThisMatters:
      "If users trust an outdated or unofficial number, they may spend time and money without getting the right help. The source of the number matters as much as the number itself.",
    steps:
      "1. Start from the official contact page.\n2. Check whether the toll-free or contact option fits your issue.\n3. Confirm that the details are current on the official page.\n4. Keep the official page saved for later checks.\n5. Use office or status routes instead if contact by phone is not the best next step.",
    keyFocusTitle: "Low-cost contact still needs high-trust sourcing",
    keyFocus:
      "People often focus on whether a number is toll-free and forget to check whether it is current and official. The trust check still comes first.",
    important:
      "GrantCare does not claim to be an official toll-free help desk. It helps users find official contact routes more safely.",
    help:
      "GrantCare can help you decide whether phone contact, an office visit, or an official status route makes more sense for your problem before you start calling.",
    related:
      "Useful next pages:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-the-right-contact-number-for-r350-help",
    faqs: [
      {
        question: "Why should I check the official contact page first?",
        answer: "Because copied toll-free numbers may be old, incomplete, or not linked to the right service.",
      },
      {
        question: "Does toll-free automatically mean official?",
        answer: "No. You still need to confirm the source.",
      },
      {
        question: "What if phone contact does not seem like the best next step?",
        answer: "Use GrantCare to compare contact, office, status, and payment routes first.",
      },
    ],
    sortOrder: 250,
  }),
  guide({
    slug: "how-to-know-if-a-sassa-whatsapp-number-is-official",
    title: "How to know if a SASSA WhatsApp number is official",
    summary:
      "A trust guide for checking whether a WhatsApp number or message claiming to help with grant issues is truly official.",
    quickAnswer:
      "Know if a SASSA-related WhatsApp number is official by checking it against official contact pages and being cautious with numbers shared in screenshots, chats, or comments without a clear official source.",
    whatThisMeans:
      "WhatsApp feels familiar and easy to use, which can make unofficial numbers look more trustworthy than they should. That is why WhatsApp-related searches need the same source-checking as website searches.",
    whyThisMatters:
      "A wrong WhatsApp number can lead users into confusion or pressure quickly, especially if it sounds helpful and urgent. That is why verification matters before you rely on it.",
    steps:
      "1. Check whether the number appears on an official contact page.\n2. Be cautious with numbers shared in screenshots or group chats.\n3. Compare the purpose of the number with the help you need.\n4. Avoid sharing personal details until you are sure of the source.\n5. Use official contact pages if the WhatsApp route still feels uncertain.",
    keyFocusTitle: "Easy messaging does not remove the trust check",
    keyFocus:
      "WhatsApp can feel simpler than a website, but the same safety rule still applies: confirm the source before you trust the route.",
    important:
      "GrantCare is not an official WhatsApp service. It helps users evaluate whether a messaging route looks trustworthy before they use it.",
    help:
      "GrantCare can help you decide whether your issue belongs on a status page, contact route, or office route before you rely on a WhatsApp number.",
    related:
      "Useful next pages:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-status-check-on-whatsapp-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why is WhatsApp easier to trust too quickly?",
        answer: "Because it feels personal and familiar, which can lower a user's guard.",
      },
      {
        question: "Should I trust a WhatsApp number from a screenshot alone?",
        answer: "No. Confirm it on an official contact page first.",
      },
      {
        question: "What if the number sounds urgent and helpful?",
        answer: "That is exactly when checking the official source matters most.",
      },
    ],
    sortOrder: 251,
  }),
  guide({
    slug: "how-to-use-status-check-on-whatsapp-safely",
    title: "How to use status check on WhatsApp safely",
    summary:
      "A guide for users who search for WhatsApp-based status help and need to stay on a trustworthy route without confusing chat support with official status systems.",
    quickAnswer:
      "Use status-check help on WhatsApp safely by treating chat messages carefully and confirming the official route before trusting any status-related claim or link.",
    whatThisMeans:
      "Many users look for WhatsApp help because chat feels easier than navigating a website. The main risk is assuming a chat route can replace the official status system without checking how official or current it really is.",
    whyThisMatters:
      "Status wording already creates anxiety. Adding an unclear chat route on top of that can make the situation even more confusing if the source is not clear.",
    steps:
      "1. Confirm whether the WhatsApp route comes from an official source.\n2. Check whether your task really needs the official status page instead.\n3. Avoid trusting forwarded status claims without source.\n4. Use official status routes for final confirmation.\n5. Use GrantCare afterward if you need help reading the result wording.",
    keyFocusTitle: "Chat help and official status are not the same thing",
    keyFocus:
      "A chat can feel convenient, but official status confirmation still belongs to the official system. That difference is what keeps the process trustworthy.",
    important:
      "GrantCare does not replace official status systems and should not be confused with a WhatsApp-based official checker.",
    help:
      "GrantCare can help you understand when a chat route may be only support and when you still need the official status page for the real answer.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-sassa-whatsapp-number-is-official\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-find-the-right-status-check-for-your-grant",
    faqs: [
      {
        question: "Can WhatsApp replace the official status page?",
        answer: "Not safely on its own. Official status confirmation still belongs to the official system.",
      },
      {
        question: "Why do users look for WhatsApp status help?",
        answer: "Because it feels easier and more familiar than a website, especially on mobile.",
      },
      {
        question: "What should I do after a chat-based update?",
        answer: "Use the official status route for final confirmation and GrantCare for interpretation.",
      },
    ],
    sortOrder: 252,
  }),
  guide({
    slug: "how-to-find-a-sassa-office-near-you-safely",
    title: "How to find a SASSA office near you safely",
    summary:
      "A practical guide to finding a nearby office through trustworthy routes instead of relying on copied addresses or outdated posts.",
    quickAnswer:
      "Find a SASSA office near you safely by using official contact or office-location routes, checking that the location information still looks current, and not relying on old social posts alone.",
    whatThisMeans:
      "Office searches often happen when online routes feel confusing or unavailable. That makes users more likely to trust the first address they see, even if it is outdated or unclear.",
    whyThisMatters:
      "A wrong office trip can cost time, money, and energy. That is why safe office searching matters just as much as safe website searching.",
    steps:
      "1. Use official contact or office-location information.\n2. Check that the location details still look current.\n3. Match the office visit to the kind of help you need.\n4. Keep the address and any contact note together.\n5. Prepare your documents before travelling if the office visit is necessary.",
    keyFocusTitle: "Location details need the same trust check as links",
    keyFocus:
      "People often check websites carefully but trust office addresses too quickly. Both need source-checking if the trip matters.",
    important:
      "GrantCare does not operate offices. It can help users decide when office help is worth pursuing and how to find official location details more safely.",
    help:
      "GrantCare can help you decide whether you really need an office visit or whether a status, payment, or contact route would solve the problem first.",
    related:
      "Useful next pages:\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-prepare-for-a-sassa-office-visit\n• /guides/when-to-use-contact-details-instead-of-status-check",
    faqs: [
      {
        question: "Why should I not trust any office address online?",
        answer: "Because location details can be old, incomplete, or shared without a reliable source.",
      },
      {
        question: "Should I prepare before travelling?",
        answer: "Yes. It helps to confirm the reason for the visit and the documents you may need.",
      },
      {
        question: "Can GrantCare tell me if I need an office visit?",
        answer: "It can help you think through whether an office visit is likely the best next step.",
      },
    ],
    sortOrder: 253,
  }),
  guide({
    slug: "what-to-check-before-visiting-a-sassa-office",
    title: "What to check before visiting a SASSA office",
    summary:
      "A preparation guide for office visits so users do not travel without clear reasons, basic records, or the right expectations.",
    quickAnswer:
      "Before visiting a SASSA office, check whether an office visit is truly needed, confirm the location details, and prepare the records or documents linked to your issue.",
    whatThisMeans:
      "Many users go to an office because online routes feel uncertain. That can still be the right step, but it helps to make the trip intentional instead of going with no clear task in mind.",
    whyThisMatters:
      "An office visit can take time and money. A short preparation check can make the visit more useful and reduce the chance of having to return again for something simple.",
    steps:
      "1. Decide the exact reason for the visit.\n2. Confirm the office details through official routes.\n3. Gather the documents or records linked to the issue.\n4. Keep notes of the wording or dates that matter.\n5. Make sure the problem is not something an official online route could solve first.",
    keyFocusTitle: "Travel should solve a problem, not create a new one",
    keyFocus:
      "The best office visit starts with a specific reason and the right records. That turns a stressful trip into a more focused next step.",
    important:
      "GrantCare cannot act as an office or official case desk. It can only help you decide whether travelling is likely to be the most useful next move.",
    help:
      "GrantCare can help you narrow the problem before the visit so you know what wording, dates, and records are worth bringing with you.",
    related:
      "Useful next pages:\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-prepare-for-a-sassa-office-visit\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Why should I decide the reason first?",
        answer: "Because the clearer the reason is, the easier it is to bring the right records and use the visit well.",
      },
      {
        question: "Should I travel before checking the location details?",
        answer: "No. Confirm the official location details first.",
      },
      {
        question: "What should I bring?",
        answer: "Bring the records, documents, and dates that are directly linked to your issue.",
      },
    ],
    sortOrder: 254,
  }),
  guide({
    slug: "when-to-use-a-sassa-office-instead-of-the-portal",
    title: "When to use a SASSA office instead of the portal",
    summary:
      "A decision guide for users who are unsure whether their next step belongs online or in person.",
    quickAnswer:
      "Use a SASSA office instead of the portal when the issue clearly needs in-person help or when online routes are not resolving the problem after you have confirmed you are using the right official page.",
    whatThisMeans:
      "Some problems are mainly about understanding wording, checking timing, or using the correct official page. Others may reach a point where in-person help makes more sense. The challenge is knowing the difference.",
    whyThisMatters:
      "If you go to an office too early, you may waste a trip. If you avoid the office too long when it is clearly needed, the problem may drag on. A balanced decision matters here.",
    steps:
      "1. Check whether the issue can still be handled on the correct official online route.\n2. Use GrantCare to understand the wording and task first.\n3. Decide whether the problem now needs in-person help.\n4. Confirm the office details before travelling.\n5. Prepare the relevant records if you do need to go.",
    keyFocusTitle: "Online first does not mean online forever",
    keyFocus:
      "A smart next step is not always the same for every issue. Some problems only need clearer reading. Others reach a point where in-person support is more realistic.",
    important:
      "GrantCare can help with the decision, but it cannot replace official in-person support when that becomes necessary.",
    help:
      "GrantCare can help you tell the difference between a problem that still needs better explanation and a problem that may now need direct official help.",
    related:
      "Useful next pages:\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/how-to-find-official-contact-details-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Should I go to an office as soon as I feel confused?",
        answer: "Not always. Some confusion can be solved first by understanding the task and the correct official route.",
      },
      {
        question: "What if the online route still does not solve it?",
        answer: "That may be the point where an office visit becomes more reasonable.",
      },
      {
        question: "What helps me decide?",
        answer: "A clear sense of whether the issue still needs explanation or now needs direct official action in person.",
      },
    ],
    sortOrder: 255,
  }),
  guide({
    slug: "how-to-prepare-for-a-sassa-office-visit",
    title: "How to prepare for a SASSA office visit",
    summary:
      "A practical preparation guide to ensure you bring the right documents to a SASSA office, preventing you from being turned away after waiting in line all day.",
    quickAnswer:
      "Before visiting a SASSA office, always bring your original green ID book or smart card, a certified copy of it, and proof of residence. Arrive as early as safely possible, as queues form before the doors open.",
    whatThisMeans:
      "A SASSA office visit is not a quick trip. It is a formal government process. If you arrive missing just one piece of paper, the officials cannot help you by law, and you will have to come back another day.",
    whyThisMatters:
      "Preparation is your best defense against frustration. Knowing exactly what is required means you only have to stand in that long queue once.",
    steps:
      "1. Confirm exactly why you are going. Can it be done online instead?\n2. Gather your original ID and a recently certified copy (less than 3 months old).\n3. Bring a pen, a bottle of water, and any letters or SMS messages SASSA sent you.\n4. Do not pay anyone standing outside offering to 'hold your place in line' or 'speed up your file'.\n5. Once inside, only hand your documents to someone sitting behind an official SASSA desk.",
    keyFocusTitle: "Beware the outside 'helpers'",
    keyFocus:
      "Scammers often hang around outside SASSA offices wearing official-looking lanyards. They will offer to help you skip the queue for a fee. Ignore them. Only speak to officials inside the building.",
    important:
      "GrantCare helps you prepare mentally and administratively for your visit. We cannot speed up the queue or book an appointment for you.",
    help:
      "We explain the exact requirements for different grants, so you know precisely which documents to put in your folder before you leave the house.",
    related:
      "Useful next pages:\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-find-official-contact-details-safely\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal",
    faqs: [
      {
        question: "Can someone else go to the office for me?",
        answer: "Usually not, unless they have a formal, legal Power of Attorney. SASSA needs to verify the identity of the actual applicant.",
      },
      {
        question: "Do I need to print my bank statements?",
        answer: "If you are applying for a new grant or changing banking details, yes, you usually need 3 months of stamped bank statements.",
      },
      {
        question: "Is there a fee to enter the SASSA office?",
        answer: "Never. Access to a government office and government services is 100% free.",
      },
    ],
    sortOrder: 256,
  }),
  guide({
    slug: "what-the-search-for-a-sassa-app-usually-means",
    title: "Why you probably don't need a SASSA app",
    summary:
      "A safety guide explaining why looking for a SASSA app often leads to downloading dangerous scam software, and what to do instead.",
    quickAnswer:
      "There is rarely a reason to download a 'SASSA App'. Scammers create fake apps in the Google Play Store to steal your passwords. The safest way to access SASSA on your phone is by typing 'srd.sassa.gov.za' into your internet browser.",
    whatThisMeans:
      "It is very easy for a scammer to build an app, call it 'SASSA Status Checker', and put it in the app store. When you download it and type your ID number in, it sends your details directly to the scammer, not the government.",
    whyThisMatters:
      "If you install a malicious app, it might not just steal your SASSA login—it could also steal your banking passwords or read your SMS messages to intercept OTPs.",
    steps:
      "1. Do not search the Google Play Store or Apple App Store for 'SASSA'.\n2. Open your internet browser (Chrome, Safari) instead.\n3. Type the official address yourself (e.g., srd.sassa.gov.za).\n4. If you really want an app, only download one if there is a direct link to it from the official sassa.gov.za website.\n5. Uninstall any 'Grant Helper' apps you currently have on your phone to protect your privacy.",
    keyFocusTitle: "Apps have access to your phone",
    keyFocus:
      "A website can only see what you type into it. An app can often see your files, your location, and your messages. Giving a fake app access to your phone is incredibly dangerous.",
    important:
      "GrantCare is a website, not an app. You do not need to download anything to read our guides, keeping your phone safe and secure.",
    help:
      "We teach you how to use the official websites smoothly on your phone so you never feel the need to download a risky app.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "But the app has the SASSA logo. Is it safe?",
        answer: "No. Scammers copy the logo to trick you. Always use the .gov.za website instead.",
      },
      {
        question: "What if the app is free?",
        answer: "Scam apps are always free because they make money by stealing your grant or selling your data.",
      },
      {
        question: "Can an app check my status faster?",
        answer: "No. The official website is the direct source of truth. Any app is just pulling from the website anyway, adding an unnecessary middleman.",
      },
    ],
    sortOrder: 257,
  }),
  guide({
    slug: "what-the-search-for-an-srd-sassa-app-usually-means",
    title: "What the search for an SRD SASSA app usually means",
    summary:
      "A quick guide explaining why you shouldn't rely on third-party apps to manage your SRD grant, and how to safely access the official SRD portal on your mobile.",
    quickAnswer:
      "Most people search for an SRD app hoping for a faster way to check their status. However, there is no official app for this. The only safe way to handle your R350 grant is via the official srd.sassa.gov.za mobile website.",
    whatThisMeans:
      "Because the SRD grant is handled entirely online, scammers know millions of people will search for an app. They build fake apps that mimic the SRD portal to harvest ID numbers and cell phone numbers.",
    whyThisMatters:
      "If you download a fake SRD app and enter your details, scammers can immediately log into the real SRD portal and change your banking details. You are handing them the keys to your R350.",
    steps:
      "1. Delete any 'SRD Check' or 'R350 Status' apps you have downloaded.\n2. Open your phone's web browser.\n3. Type srd.sassa.gov.za into the address bar yourself.\n4. Bookmark the page on your phone's home screen for easy access next time.\n5. Never trust an app that asks for your SRD portal PIN or OTP.",
    keyFocusTitle: "The website is built for mobile",
    keyFocus:
      "The official srd.sassa.gov.za website was specifically designed to work perfectly on cheap smartphones. You do not need an app to get a fast, smooth experience.",
    important:
      "GrantCare provides educational guides on how to use the SRD system. We do not offer an app to check your status, as that would violate your privacy.",
    help:
      "We show you how to bookmark the official SRD website on your phone, giving you app-like convenience without the security risks.",
    related:
      "Useful next pages:\n• /guides/what-the-srd-portal-is-for\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-know-if-a-sassa-app-is-official",
    faqs: [
      {
        question: "Why are there so many SRD apps on the Play Store?",
        answer: "Because Google doesn't immediately catch all the scammers. They upload fake apps faster than they can be removed.",
      },
      {
        question: "Can an app help me appeal my SRD decline?",
        answer: "No. Appeals must be lodged directly with the Independent Tribunal via their official website.",
      },
      {
        question: "Is there any official SRD app at all?",
        answer: "Currently, no. The government prefers to use zero-rated websites to save you data.",
      },
    ],
    sortOrder: 258,
  }),
  guide({
    slug: "how-to-know-if-a-sassa-app-is-official",
    title: "How to know if a SASSA app is official",
    summary:
      "A strict verification checklist to help you determine if an app is truly published by the government or if it's a clever scam.",
    quickAnswer:
      "The only way to know if an app is officially from SASSA is to look for a direct download link on the official sassa.gov.za website. Never trust an app just because it appears in an app store.",
    whatThisMeans:
      "App stores (like Google Play or Apple App Store) do not thoroughly verify who owns a government logo. Scammers can easily name their company 'SASSA Official Updates' and upload a fake app.",
    whyThisMatters:
      "If you trust the app store search results, you will almost certainly download a scam. This is the fastest way to have your identity stolen and your grant intercepted.",
    steps:
      "1. Do not search your app store for SASSA tools.\n2. Open your web browser and go directly to sassa.gov.za.\n3. Search the official website for mentions of a mobile app.\n4. If there is no app mentioned on the .gov.za website, then no official app exists.\n5. When in doubt, always use the website instead.",
    keyFocusTitle: "The source of truth is the .gov.za site",
    keyFocus:
      "The government will always advertise its official tools on its own secure website. If the app isn't linked from a .gov.za address, it is a scam.",
    important:
      "GrantCare is an independent educational platform. We do not have a mobile app that processes grants, and any app claiming to be 'GrantCare Official' for grant processing is fake.",
    help:
      "We teach you how to spot these fakes instantly, protecting your phone and your money from malicious software.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-a-sassa-app-usually-means\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Can a polished app still be unofficial?",
        answer: "Yes. Scammers hire professional developers to make their fake apps look incredibly convincing.",
      },
      {
        question: "Should I enter personal details before I confirm the app?",
        answer: "Absolutely not. Confirming the app's legitimacy is your first line of defense.",
      },
      {
        question: "What should I compare the app with?",
        answer: "Compare it with the announcements on the official sassa.gov.za website. If it's not announced there, ignore it.",
      },
    ],
    sortOrder: 259,
  }),
  guide({
    slug: "should-you-use-a-sassa-app-or-the-website",
    title: "Should you use a SASSA app or the website?",
    summary:
      "A simple comparison explaining why the official government website is almost always the safer and smarter choice over downloading an app.",
    quickAnswer:
      "You should almost always use the official SASSA website (ending in .gov.za). Because fake apps are so common and dangerous, relying on your web browser is the safest way to manage your grant.",
    whatThisMeans:
      "While apps feel faster, they require you to install software on your phone that can potentially access your personal files, SMS messages, and location. A website only sees what you explicitly type into it.",
    whyThisMatters:
      "Choosing an app over the website often means trading your security for a tiny bit of convenience. When dealing with your income and identity, security must always come first.",
    steps:
      "1. Always start by opening your phone's web browser (Chrome, Safari).\n2. Type the official address (like srd.sassa.gov.za) yourself.\n3. Ignore pop-ups or ads suggesting you download a 'faster app'.\n4. If you really want an app-like experience, tap your browser's menu and select 'Add to Home Screen'.\n5. This creates a safe shortcut directly to the official website.",
    keyFocusTitle: "Websites are strictly controlled",
    keyFocus:
      "The South African government strictly controls who can own a '.gov.za' web address. It is incredibly hard for scammers to fake. App store names are not controlled at all.",
    important:
      "GrantCare advises against downloading third-party grant management apps. We strongly believe the official website is the only secure route.",
    help:
      "We show you how to use the official website effectively, so you never feel frustrated enough to risk downloading a shady app.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-services-sassa-gov-za-safely\n• /guides/what-the-search-for-a-sassa-app-usually-means",
    faqs: [
      {
        question: "Should I always choose the app because it feels easier?",
        answer: "No. With SASSA, the website is the intended, official, and most secure method of contact.",
      },
      {
        question: "Is the website often a safer starting point?",
        answer: "Yes, it is the only guaranteed safe starting point as long as you verify the .gov.za address.",
      },
      {
        question: "What should guide the decision most?",
        answer: "Your security. The risk of identity theft from a fake app far outweighs the convenience it offers.",
      },
    ],
    sortOrder: 260,
  }),
  guide({
    slug: "what-moya-app-searches-usually-mean-for-r350",
    title: "Using data-free apps like Moya for R350",
    summary:
      "A straightforward guide to understanding how data-free apps fit into your SASSA journey, and the risks of relying on them for official actions.",
    quickAnswer:
      "Many people use data-free apps like Moya to access the internet when they have no airtime. While these apps can load the SASSA website, you must still ensure you are navigating to the official srd.sassa.gov.za page within the app.",
    whatThisMeans:
      "Data-free apps act as a window to the internet. However, just because the app itself is legitimate does not mean every link inside it is official. You still need to verify the web address you are looking at.",
    whyThisMatters:
      "If you click a random link inside a data-free app assuming it is safe just because the app is safe, you might land on a scammer's site. You must maintain your guard.",
    steps:
      "1. Open your data-free app (like Moya).\n2. Instead of clicking on generalized 'SASSA Help' banners, look for the 'Discover' or web browser section.\n3. Type srd.sassa.gov.za directly into the app's browser bar.\n4. Verify the address before entering your ID.\n5. Never pay a fee to access 'premium' SASSA links inside an app.",
    keyFocusTitle: "The official site is also data-free",
    keyFocus:
      "The government has made the official srd.sassa.gov.za website zero-rated. This means you do not need data to access it directly from your phone's normal browser (like Chrome).",
    important:
      "GrantCare is an independent platform and is not affiliated with the Moya app. We recommend using your phone's built-in browser to directly access the official zero-rated SASSA site.",
    help:
      "We remind you that the official SASSA site won't cost you data, giving you the confidence to use your standard browser securely.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages",
    faqs: [
      {
        question: "Why do users search Moya app with R350 help?",
        answer: "Because they are out of data and need a free way to check their status.",
      },
      {
        question: "Does app convenience prove official status?",
        answer: "No. The app is just the browser; the website inside it must still be officially verified.",
      },
      {
        question: "Do I need an app to check my status for free?",
        answer: "No. The official srd.sassa.gov.za site is zero-rated and won't charge you data on most major networks.",
      },
    ],
    sortOrder: 261,
  }),
  guide({
    slug: "how-to-use-app-based-r350-information-safely",
    title: "How to use app-based R350 information safely",
    summary:
      "A safety guide for users who read SASSA advice on third-party apps, explaining the vital difference between reading advice and taking official action.",
    quickAnswer:
      "It is perfectly fine to read news or guides about your R350 grant on an app, but you should never enter your ID number, password, or banking details into that app. Always go to the official website to take action.",
    whatThisMeans:
      "Apps and independent websites (like GrantCare) are great for learning. But they are not the government. If an app tries to move from 'giving advice' to 'processing your grant', they are crossing a dangerous line.",
    whyThisMatters:
      "If you confuse an educational app with an official portal, you will hand your sensitive details over to a third party. This puts your identity and your grant money at severe risk.",
    steps:
      "1. Use apps or independent sites to read up on how the process works.\n2. When you are ready to apply, appeal, or check your status, close the app.\n3. Open your phone's web browser (Chrome, Safari).\n4. Type srd.sassa.gov.za into the address bar yourself.\n5. Perform the action securely on the official government site.",
    keyFocusTitle: "Learn anywhere, transact only on .gov.za",
    keyFocus:
      "Think of independent apps like a library where you read about banking. But when it's time to actually deposit your money, you must walk into the official bank.",
    important:
      "GrantCare strictly follows this rule. We provide the library of information, but we never ask for your ID or attempt to process your grant for you.",
    help:
      "We keep you safe by clearly marking the boundary between education and official government action.",
    related:
      "Useful next pages:\n• /guides/what-moya-app-searches-usually-mean-for-r350\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-check-srd-status-online\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-apply-without-using-unofficial-websites",
    faqs: [
      {
        question: "Can app-based information still be useful?",
        answer: "Yes, reading advice and guides is very helpful, as long as you don't use the app to submit your actual application.",
      },
      {
        question: "What is the main risk?",
        answer: "The main risk is entering your ID number into an app that isn't run by the government.",
      },
      {
        question: "What should I do before entering any details?",
        answer: "Close the app and go directly to the official government website.",
      },
    ],
    sortOrder: 262,
  }),
  guide({
    slug: "when-to-use-contact-details-instead-of-status-check",
    title: "When to use contact details instead of status check",
    summary:
      "A decision guide to help you know when it's time to stop checking your status online and start calling SASSA for direct intervention.",
    quickAnswer:
      "If your status has been stuck on 'Pending' for over 90 days, or if your banking details have been changed without your permission, stop checking your status and immediately call the official SASSA toll-free number (0800 60 10 11).",
    whatThisMeans:
      "The status check portal only tells you what the computer currently thinks. It cannot fix errors. If there is a massive delay or a fraud issue, repeatedly refreshing the page won't help. You need a human to intervene.",
    whyThisMatters:
      "Many people waste months simply checking their status every day, hoping it will change. Recognizing when the automated system has failed saves you time and gets your issue escalated to someone who can actually help.",
    steps:
      "1. Has your status been pending for more than 3 months? If yes, call.\n2. Does your status say 'Approved' but you haven't been paid for 2 months? If yes, call.\n3. Do you suspect someone else is receiving your money? If yes, call immediately.\n4. When you call 0800 60 10 11, have your ID number ready.\n5. Write down the reference number the agent gives you before you hang up.",
    keyFocusTitle: "Computers report, humans resolve",
    keyFocus:
      "The website is an automated reporter. It cannot fix a broken file. When the file is stuck, you must contact a human official to manually push it forward.",
    important:
      "GrantCare cannot contact SASSA on your behalf. Privacy laws dictate that you, the applicant, must make the call yourself.",
    help:
      "We explain the typical timelines for status changes so you know exactly when a delay has become abnormal enough to warrant a phone call.",
    related:
      "Useful next pages:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/where-to-confirm-payment-problems-officially",
    faqs: [
      {
        question: "How do I know when status checks are no longer enough?",
        answer: "When your status remains unchanged far beyond the normal processing time, or if you spot obvious fraud like changed banking details.",
      },
      {
        question: "What should I gather before I make contact?",
        answer: "Your ID number, the phone number you registered with, and the exact wording of the status you are stuck on.",
      },
      {
        question: "Can GrantCare still help after I make contact?",
        answer: "Yes. After speaking to an agent, you can use our guides to understand the technical terms they used or the next steps they recommended.",
      },
    ],
    sortOrder: 263,
  }),
];

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "what-the-sassa-service-portal-is-for": {
    "title": "Iyini ingosi yesevisi ye-SASSA",
    "summary": "Umhlahlandlela wolimi olulula wokuthi abantu bavame ukusho ukuthini uma besesha ingosi yesevisi ye-SASSA kanye nendlela yokusebenzisa umzila osemthethweni olungile ngokuphepha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ingosi yesevisi ye-SASSA ngokuvamile ibhekisela emzileni osemthethweni we-inthanethi ukuze uthole ulwazi oluhlobene nezibonelelo noma izenzo. Indlela ephephe kunazo zonke yokuyisebenzisa ukuqinisekisa umsebenzi kuqala, bese uqinisekisa ukuthi ukusayithi elisemthethweni langempela ngaphambi kokufaka noma yimiphi imininingwane."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukucinga iphothali yesevisi lapho befuna indawo eyodwa yokuphatha isimo, isicelo, noma imisebenzi ehlobene nokuxhumana. Inkinga ukuthi imisebenzi ehlukene ingase isebenzise amakhasi asemthethweni ahlukene. Yingakho ukusesha kwengosi kungazwakala kulula kunalokho okuyikho ngempela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephatha lonke ikhasi elibukeka njengephothali njengento efanayo, bangagcina sebesendleleni engalungile noma benze iphutha umhlahlandlela ozimele wekhasi lesenzo elisemthethweni. Sula izindaba zokuhlukana lapha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi yini ngempela okudingeka uyenze.\n2. Hlola ukuthi umsebenzi uhlobene yini nesimo, isicelo, inkokhelo, noma uhlobene.\n3. Qala emzileni osemthethweni ofana nalowo msebenzi.\n4. Qinisekisa ikhasi ngaphambi kokufaka imininingwane yakho.\n5. Sebenzisa i-GrantCare ukuze uthole incazelo, hhayi njengekhasi lesenzo elisemthethweni."
      },
      {
        "title": "I-portal yigama elibanzi, hhayi impendulo eyodwa elula",
        "body": "Ingosi yetemu lokusesha izwakala njengomnyango owodwa wayo yonke into. Empeleni, umnyakazo ophephe kakhulu ukukhomba umsebenzi oqondile kuqala bese usebenzisa umzila osemthethweni ofana nawo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ayithathi indawo yengosi yesevisi ye-SASSA esemthethweni nanoma yiluphi uhlelo lokusebenza olusemthethweni, isimo, noma umzila wokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uthole ukuthi iyiphi indlela esemthethweni oyidingayo ngaphambi kokuchofoza, okwehlisa ithuba lokusebenzisa ikhasi elingalungile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/where-to-find-official-updates-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/official-status-check-vs-independent-guide"
      },
      {
        "title": "I-FAQ: Ingabe ingosi yesevisi iyafana ne-GrantCare?",
        "body": "Cha. I-GrantCare ichaza inqubo, kuyilapho izenzo ezisemthethweni zisengezamakhasi kahulumeni asemthethweni."
      },
      {
        "title": "I-FAQ: Kungani ukusesha ngephothali kuzwakala kudida?",
        "body": "Ngoba abantu basebenzisa igama elithi portal emisebenzini ehlukene okungenzeka ingenzeki yonke ekhasini elilodwa."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngaphambi kokufaka imininingwane?",
        "body": "Qinisekisa ukuthi ikhasi liwumzila osemthethweni olungile womsebenzi owudingayo."
      }
    ]
  },
  "how-to-use-services-sassa-gov-za-safely": {
    "title": "Isetshenziswa kanjani izinsiza.sassa.gov.za ngokuphepha",
    "summary": "Igayidi yokuphepha yokuqala yokusebenzisa izinsiza.sassa.gov.za ngaphandle kokuyidida namakhasi akopishiwe, izixhumanisi ezingamanga, noma amawebhusayithi osizo lwemalimboleko angahlobene.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amasevisi.sassa.gov.za ngokuphepha ngokuyivula emthonjeni othembekile, uhlole ikheli ngokucophelela, futhi uqinisekise ukuthi ikhasi lifana nomsebenzi ofuna ukuwuqedela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basesha ikheli lezinsizakalo.sassa.gov.za ngoba bafuna ukufinyelela lapho beqala khona ngokusemthethweni ngokushesha. Lokho kwenza kube okujwayelekile okuhloswe ngakho ukudideka lapho kuvela izixhumanisi ezikopishiwe noma amakhasi afanayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lingasebenzisa amagama alungile futhi lingabi yindawo efanele yesenzo esisemthethweni. Ukusetshenziswa okuphephile kuqala ngokuhlola ikheli kanye nomsebenzi ngaphambi kokuthi uthembe ikhasi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thayipha ikheli ngokucophelela noma usebenzise umthombo othembekile olondoloziwe.\n2. Hlola ukuthi ikhasi lingelesizinda esisemthethweni.\n3. Qinisekisa ukuthi ikhasi lifana nomsebenzi wakho.\n4. Gwema ukufaka imininingwane yomuntu siqu kuzixhumanisi ezikopishiwe noma ezifushanisiwe.\n5. Buyela ku-GrantCare uma udinga usizo lokuqonda ukuthi ikhasi elisemthethweni libuza ini."
      },
      {
        "title": "Ukuphepha kuqala ngaphambi kokuthi ikhasi lilayishe",
        "body": "Umkhuba ophephe kakhulu awukona nje ukufunda ikhasi. Iphinde ihlole ukuthi uyifinyelele kanjani. Lokho kunciphisa ithuba lokufika ekhasini elibukeka lisemthethweni kuphela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akufanele isetshenziswe njengezinkonzo ezisemthethweni.sassa.gov.za ikhasi. Ilapha ukuze ikuqondise emzileni olungile, hhayi esikhundleni sayo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uthole ukuthi yiliphi ikhasi lomsebenzi elisemthethweni olidingayo ngaphambi kokusebenzisa isizinda esisemthethweni, ikakhulukazi uma ushintsha phakathi kwemibandela, isicelo, kanye nemibuzo yokukhokha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngihlole ikheli eligcwele ngokucophelela?",
        "body": "Ngoba izixhumanisi ezikopishiwe noma ezifanayo zingasebenzisa amagama afanayo ngaphandle kokuba umzila osemthethweni."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngibekise ikhasi langempela uma ngilitholile?",
        "body": "Lokho kungasiza, inqobo nje uma uqinisekile ukuthi ikhasi lokuqala bekuyilo elisemthethweni elilungile."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ngisazizwa ngingaqiniseki?",
        "body": "Sebenzisa i-GrantCare ukuze uqinisekise uhlobo lwekhasi elisemthethweni oludingayo ngaphambi kokuthi uqhubeke."
      }
    ]
  },
  "how-to-use-services-sassa-gov-za-login-safely": {
    "title": "Isetshenziswa kanjani izinsiza.sassa.gov.za ngena ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wemikhuba yokungena ephephile yamakhasi ephothali asemthethweni, ngokugxila ekugwemeni izikrini zokungena ezingamanga namaphutha asheshayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amasevisi.sassa.gov.za ngena ngokuphepha ngokuqinisekisa ikhasi kuqala, usebenzisa kuphela imininingwane umzila osemthethweni oyibuzayo, nokugwema izixhumanisi ezivela emilayezweni engathenjwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi okungena ngemvume adala ingcindezi enkulu kunamakhasi olwazi olujwayelekile ngoba abasebenzisi bangase bafake imininingwane yomuntu siqu. Lokho kwenza ukuhlola ikheli kanye nokufanisa ikhasi kubaluleke kakhulu."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lolwazi olungelona iqiniso liyadida. Ikhasi lokungena elingelona iqiniso liyingozi kakhulu, ngoba lingase lizame ukuthwebula imininingwane yomuntu siqu. Yingakho amakhasi okungena ngemvume adinga ukuqaphela okwengeziwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula ikhasi lokungena kumthombo othembekile.\n2. Hlola isizinda ngokucophelela.\n3. Qiniseka ukuthi ikhasi lifana nomsebenzi osemthethweni owufunayo.\n4. Faka imininingwane kuphela uma ngokusobala ikhasi lingelomzila osemthethweni.\n5. Yima uphinde uhlole uma kukhona okumayelana nekhasi okuzwakala njengokungajwayelekile noma kuphuthuma."
      },
      {
        "title": "Amakhasi okungena ngemvume adinga ijubane lokufunda eliphansi",
        "body": "Abantu bavame ukuhamba ngokushesha emakhasini okungena ngemvume ngoba bafuna ukufinyelela okusheshayo. Yingakho nje ukwehlisa ijubane imizuzwana embalwa kungakuvikela kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikuphathi ukungena okusemthethweni. Kukusiza ukuthi uqonde ukuthi ungafinyelela kanjani ekhasini elisemthethweni elilungile ngokuphepha nokuthi uhlehla nini uma kukhona okungalungile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise izidingo zokungena ezisemthethweni kokuqukethwe komhlahlandlela ukuze wazi ukuthi kufanele ube nini ekhasini elisemthethweni nalapho udinga khona incazelo kuphela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-the-portal-login-page-keeps-failing\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/official-status-check-vs-independent-guide"
      },
      {
        "title": "I-FAQ: Kungani amakhasi okungena ngemvume eyingozi kunamakhasi avamile?",
        "body": "Ngoba abasebenzisi bangafaka imininingwane yomuntu lapho, ngakho-ke ikhasi elingelona iqiniso lingabangela ukulimala okwengeziwe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngingene ngisuka kusixhumanisi somlayezo ongahleliwe?",
        "body": "Cha. Kuphephe kakhudlwana ukuqala emzileni owethembekile osuwazi."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ikhasi libukeka lihluke kancane kunelakudala?",
        "body": "Hlola ikheli eligcwele nomsebenzi ngaphambi kokuthi uqhubeke."
      }
    ]
  },
  "what-sassa-portal-login-is-for": {
    "title": "Yini i-SASSA yokungena ngemvume yengosi",
    "summary": "Umhlahlandlela ocacile wokuthi abasebenzisi ngokuvamile bathini ngokungena kwengosi ye-SASSA nokuthi unganquma kanjani ukuthi uyalidinga ngempela ikhasi lokungena ngemvume.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukungena kwengosi ye-SASSA kuvame ukusho indlela yokungena esemthethweni yomsebenzi othile we-inthanethi. Ngaphambi kokuthi useshele ukungena, kuyasiza ukuhlola ukuthi umsebenzi wakho udinga ngempela ukungena ngemvume noma ikhasi lolwazi elisemthethweni kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abanye abasebenzisi basesha ukungena ngemvume ngoba bafuna ukufinyelela okusheshayo. Abanye basesha ngoba abanaso isiqiniseko sokuthi badinga liphi ikhasi. Empeleni, akuzona zonke izenzo ezihlobene nezibonelelo eziqala ngohlobo olufanayo lwekhasi lokungena ngemvume."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma useshela ukungena ngaphambi kokuthi wazi umsebenzi, ungamosha isikhathi emzileni ongalungile noma ugcine ngokufaka imininingwane lapho ungadingi khona."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma umsebenzi kuqala.\n2. Hlola ukuthi lowo msebenzi udinga ngempela ikhasi lokungena ngemvume elisemthethweni.\n3. Sebenzisa umzila osemthethweni olungile wokwenza umsebenzi.\n4. Qinisekisa isizinda ngaphambi kokufaka noma yimiphi imininingwane.\n5. Gcina i-GrantCare ukuze uthole izincazelo kanye nekhasi elisemthethweni lesenzo sangempela."
      },
      {
        "title": "Yenza kuqala, ngena ngemvume okwesibili",
        "body": "Ukulandelana okuphephe kakhulu ukuqonda umsebenzi kuqala bese kuphela unquma ukuthi ikhasi lokungena engelalo yini. Lokho kunciphisa ukudideka okuningi okungagwemeka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akulona ikhasi lokungena elisemthethweni lephothali futhi akufanele lithathwe njengelilodwa. Izenzo zokungena ngemvume ezisemthethweni zisengezohlelo lukahulumeni olusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uthole ukuthi uyalidinga yini ikhasi lesimo, ikhasi lesicelo, ikhasi lokukhokha, noma umzila wokungena wangempela ngaphambi kokudlulela phambili."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-find-the-official-application-form-safely"
      },
      {
        "title": "I-FAQ: Ingabe zonke izenzo ezihlobene nesibonelelo zisebenzisa ikhasi lokungena elifanayo?",
        "body": "Cha. Imisebenzi ehlukene esemthethweni ingase isebenzise imizila ehlukene noma ingangeni nhlobo."
      },
      {
        "title": "I-FAQ: Kungani ukucabanga komsebenzi wokuqala kuphephile?",
        "body": "Ngoba ikwenza ungajahi ikhasi elingalungile ngaphambi kokuthi wazi ukuthi yini oyidingayo ngempela."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangifaka?",
        "body": "Cha. I-GrantCare ichaza kuphela inqubo futhi ikukhomba ohlotsheni olulungile lomzila osemthethweni."
      }
    ]
  },
  "how-to-use-srd-sassa-gov-za-login-safely": {
    "title": "Isetshenziswa kanjani i-SRD SASSA gov za login ngokuphepha",
    "summary": "Umhlahlandlela wokusetshenziswa okuphephile kwamakhasi okungena esitayela se-SRD, ebhalelwe abasebenzisi abafuna ukufinyelela okusemthethweni ngaphandle kokufika emakhasini omgunyathi noma akopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amakhasi okungena esitayela se-SRD ngokuphepha ngokuqala emzileni osemthethweni we-SRD, uhlole ikheli ngokucophelela, futhi uphathe izixhumanisi ezikopishiwe zenkundla yezokuxhumana ngokuqapha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuhlobene ne-SRD kuvame ukwenzeka ngaphansi kwengcindezi ngoba abantu bafuna isimo, isikhalazo, isicelo, noma imininingwane yokukhokha ngokushesha. Lokho kwenza abasebenzisi ukuthi bachofoze ikhasi lokuqala elibukeka belijwayele."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma umsebenzisi efuna ngokushesha umphumela, kuba lula ukweqa ukuhlola okuphepha okubavikela emakhasini mbumbulu noma angahlobene."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala emzileni osemthethweni we-SRD.\n2. Qinisekisa ikheli kanye nenjongo yekhasi.\n3. Gwema ukuvula izixhumanisi ezikopishiwe kumazwana noma ezingxoxweni zeqembu.\n4. Sebenzisa kuphela imininingwane ikhasi elisemthethweni eliyicelayo.\n5. Buyela ku-GrantCare uma udinga usizo lokuqonda isinyathelo esilandelayo ngemva kokulayishwa kwekhasi elisemthethweni."
      },
      {
        "title": "Isivinini sidala ubungozi lapha",
        "body": "Ukusesha kokungena kwe-SRD kuvame ukuvela ezimeni eziphuthumayo. Lokho kuphuthuma kungenza amakhasi mbumbulu noma adidayo aphumelele kakhulu, ngakho ukwehlisa ijubane imizuzwana embalwa kubaluleke kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akuyona ingosi ye-SRD esemthethweni. Ingakusiza ukuthi ufinyelele uhlobo olulungile lwekhasi elisemthethweni ngokuphepha, kodwa ayithathi indawo yokungena esemthethweni noma izenzo zesimo ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ubone umehluko phakathi kokuhlolwa kwesimo se-SRD, izikhalazo, amakhasi okukhokha, nemizila efana nokungena ngemvume ukuze ungachofozi ngokungaboni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/official-srd-status-check-link-guide\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-find-official-status-check-updates-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-apply-without-using-unofficial-websites"
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwe-SRD kuvame ukuheha izixhumanisi ezingamanga?",
        "body": "Ngoba isidingo siphezulu futhi abasebenzisi abaningi bafuna izimpendulo ezisheshayo ngaphansi kwengcindezi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isixhumanisi sokungena se-SRD esivela eqenjini lengxoxo?",
        "body": "Kuphephe kakhudlwana ukudlula umzila osemthethweni owethembekile osuwazi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokulayishwa kwekhasi elisemthethweni?",
        "body": "Qedela kuphela isenzo esisemthethweni lapho futhi usebenzise i-GrantCare uma udinga usizo lokuqonda umphumela."
      }
    ]
  },
  "how-to-know-if-a-sassa-website-is-official": {
    "title": "Ungazi kanjani ukuthi iwebhusayithi ye-SASSA isemthethweni",
    "summary": "Umhlahlandlela ogxile ekuthembekeni wokuhlola ukuthi iwebhusayithi ehlobene ne-SASSA isemthethweni ngempela yini ngaphambi kokuthi uthembele kuyo ngesimo, izinhlelo zokusebenza, noma imininingwane yomuntu siqu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungahlulela ukuthi iwebhusayithi ehlobene ne-SASSA isemthethweni yini ngokubheka isizinda ngokucophelela, ukufanisa ikhasi nomsebenzi, kanye nokuqapha kumasayithi akopisha amagama asemthethweni ngaphandle kobunikazi obusemthethweni obucacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi amaningi asebenzisa amagama okusesha afanayo, kodwa akuwona wonke asebenza indima efanayo. Amanye angamakhasi esenzo asemthethweni. Abanye bangabaqondisi abazimele. Abanye bangase bamane bakopishe ulimi olusemthethweni. Umehluko ubalulekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngaphandle kokuhlolwa kokuthenjwa okuyisisekelo, abasebenzisi bangenza iphutha umhlahlandlela noma ikhasi lomgunyathi lomzila wesenzo sangempela. Lokho kungaholela ekudidekeni noma ekwabelaneni okungaphephile kwemininingwane yomuntu siqu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ikheli eligcwele ngokucophelela.\n2. Qinisekisa ukuthi ikhasi liyahambisana yini nomsebenzi osemthethweni owudingayo.\n3. Bheka izimpawu ezicacile zokuthi ikhasi elomzila osemthethweni.\n4. Gwema ukwethemba umbhalo okopishiwe uwedwa.\n5. Sebenzisa i-GrantCare ukuze uthole incazelo kanye nemizila esemthethweni yezenzo ezisemthethweni."
      },
      {
        "title": "Amagama alungile awanele",
        "body": "Ikhasi lingasebenzisa amagama alungile esibonelelo futhi lingabi yindawo efanele yesenzo esisemthethweni. Ikheli kanye neqhaza lekhasi kubaluleke kakhulu njengokusho kwamagama."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi isho ngokucacile. Lokho kwethembeka kuyingxenye yokuthi abasebenzisi bangahlukanisa kanjani isiqondiso esizimele emakhasini esenzo asemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqonde ukuthi hlobo luni lwekhasi elisemthethweni oludingayo ngaphambi kokuthi uzame ukuqinisekisa ukuthi iwebhusayithi iwumzila wangempela yini."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-use-services-sassa-gov-za-safely\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Ingabe isayithi elingelona elisemthethweni lingase libe usizo?",
        "body": "Yebo, uma lihlala ngokucacile endimeni yokuqondisa futhi lingenzi sengathi ikhasi lesenzo elisemthethweni."
      },
      {
        "title": "I-FAQ: Yini ebaluleke kakhulu ngaphandle kwamagama?",
        "body": "Isizinda, umsebenzi, nokuthi ikhasi liwumzila osemthethweni wesenzo ngokusobala yini."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake imininingwane yomuntu siqu ekhasini elibonakala lijwayelekile kuphela?",
        "body": "Cha. Qinisekisa ikhasi kuqala ngaphambi kokufaka noma yini ebucayi."
      }
    ]
  },
  "how-to-find-the-right-sassa-website-for-your-task": {
    "title": "Ungayithola kanjani iwebhusayithi ye-SASSA efanele yomsebenzi wakho",
    "summary": "Umhlahlandlela osebenzayo wokukhetha umzila osemthethweni olungile wesimo, isicelo, inkokhelo, nemisebenzi yokuxhumana esikhundleni sokusesha ngokungaboni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola iwebhusayithi elungile ye-SASSA ngokunquma umsebenzi kuqala. Isimo, isicelo, inkokhelo, kanye nemisebenzi yokuxhumana ngokuvamile isebenzisa imizila esemthethweni ehlukene, ngakho ukusesha umsebenzi wokuqala kuphephe kakhulu."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukuqala ngokusesha igama elithi iwebhusayithi lapho abakudingayo kuwuhlobo oluthile lwekhasi. Yingakho ukusesha okukodwa okubanzi kungaletha imizila eminingi kakhulu ebukeka ifana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma umsebenzi usucacile, indlela efanele iba lula ukuyibona. Lokho kusiza abasebenzisi ukuthi bagweme izixhumanisi ezingamanga, amakhasi akopishiwe, nokudideka okungadingekile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bhala phansi umsebenzi owudingayo.\n2. Nquma ukuthi kuhlobene yini nesimo, isicelo, inkokhelo, noma othintana naye.\n3. Bheka umzila osemthethweni ofana nalowo msebenzi.\n4. Hlola ikheli nenjongo yekhasi.\n5. Buyela ku-GrantCare uma udinga usizo lokuqonda ukuthi yisiphi isigaba somsebenzi esisebenzayo."
      },
      {
        "title": "Ukusesha okubanzi kudinga umbuzo omncane",
        "body": "Ukusesha kwewebhusayithi kuba lula kakhulu uma ukufinyela kube umsebenzi owodwa ocacile. Lokho kushintsha okulula kuvame ukususa iningi lokudideka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akuyona iwebhusayithi esemthethweni yezenzo zikahulumeni. Isiza abasebenzisi ukuthi baqonde ukuthi yimuphi umzila osemthethweni abawudingayo ngaphambi kokuthi bachofoze."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlele imisebenzi ibe yisimo, inkokhelo, isicelo, nezigaba zokuxhumana ukuze ukwazi ukusebenzisa ikhasi elisemthethweni elifanele ngokuzethemba okwengeziwe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-find-official-contact-details-safely\n• /guides/what-the-sassa-service-portal-is-for"
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwewebhusayithi okujwayelekile kuzwakala kungcolile?",
        "body": "Ngoba imisebenzi ehlukene yesibonelelo ingase isebenzise amakhasi asemthethweni ahlukene nanoma amagama okusesha abukeka afana."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume kuqala?",
        "body": "Nquma umsebenzi ngaphambi kokunquma ikhasi."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangikhethela ikhasi elisemthethweni?",
        "body": "Ingakuholela ohlotsheni olulungile lomzila, kodwa ikhasi elisemthethweni ngokwalo lihlala lihlukile."
      }
    ]
  },
  "sassa-website-vs-srd-portal-guide": {
    "title": "Iwebhusayithi ye-SASSA vs SRD portal guide",
    "summary": "Umhlahlandlela olula wokuqhathanisa obonisa ukuthi kungani ukusesha kwewebhusayithi ye-SASSA jikelele kanye nosesho lwengosi ye-SRD lungakhombisi ngaso sonke isikhathi umzila ofanayo osemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusesha okujwayelekile kwewebhusayithi ye-SASSA kanye nosesho lwengosi ye-SRD kungaholela emizileni esemthethweni ehlukene ngoba ngokuvamile kuvame ukwenza imisebenzi eyahlukene. Ukunyakaza okuphephe kakhulu ukufanisa ikhasi nomsebenzi esikhundleni sokuthatha ukuthi ziyashintshana."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukuhlanganisa ukusesha okubanzi kwe-SASSA nosesho oluthize lwe-SRD ngoba amagama ayagqagqana. Empeleni, izenzo ezihlobene ne-SRD zingakhomba umzila osemthethweni okhethekile kunolwazi olujwayelekile lwesibonelelo noma imisebenzi yokuxhumana."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uphatha wonke amakhasi asemthethweni njengento efanayo, ungase ufunde ulwazi olungalungile noma uphuthelwe ikhasi eliphethe umsebenzi wakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi umsebenzi wakho uhlobene ne-SRD-specific noma i-general-grant.\n2. Qondanisa indlela eya kulowo msebenzi.\n3. Qinisekisa ikhasi ngaphambi kokulisebenzisa.\n4. Gwema ukuthembela ezithombeni-skrini ezabiwe ezisusa umongo.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhlukanisa imizila ngaphambi kokuqhubeka."
      },
      {
        "title": "Ukugqagqana emagameni akufani nokugqagqana ngenjongo",
        "body": "Amagama SASSA kanye SRD avame ukuvela ndawonye, ​​kodwa ikhasi olidingayo lincike kulokho ozama ukukwenza. Leyo njongo ibaluleke ngaphezu kwelebula elibanzi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele. Ingakwazi ukuchaza umehluko phakathi kwemizila yesibonelelo sikahulumeni ebanzi kanye nemizila ethize ye-SRD, kodwa ayithathi indawo yanoma yiluphi uhlelo olusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza unqume ukuthi isinyathelo sakho esilandelayo sisekhasini lolwazi olujwayelekile, umzila wokuhlola isimo, ikhasi lokukhokha, noma ingosi ethize ye-SRD."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-the-srd-portal-is-for\n• /guides/what-the-sassa-service-portal-is-for\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-find-the-right-status-check-for-your-grant"
      },
      {
        "title": "I-FAQ: Ingabe iwebhusayithi ye-SASSA kanye nengosi ye-SRD ihlala iyinto efanayo?",
        "body": "Cha. Bangakhomba imizila esemthethweni eyahlukene kuye ngomsebenzi."
      },
      {
        "title": "I-FAQ: Kungani abasebenzisi beyixuba?",
        "body": "Ngoba amagama okusesha ayagqagqana futhi womabili axhunywe emisebenzini ehlobene nokunikezwayo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyifanise kuqala?",
        "body": "Qondanisa umsebenzi nomzila ngaphambi kokuthi uphathe amakhasi njenganokushintshwa."
      }
    ]
  },
  "how-to-open-the-sassa-website-on-mobile": {
    "title": "Uyivula kanjani iwebhusayithi ye-SASSA kuselula",
    "summary": "Umhlahlandlela wokuqala weselula wokufinyelela iwebhusayithi elungile ehlobene ne-SASSA ngokuphepha ocingweni ngaphandle kokulahleka kuzixhumanisi ezikopishiwe noma amakhasi alayishwe kakhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Vula iwebhusayithi ye-SASSA kuselula ngokuqala emzileni owethembekile, uhlole ikheli ngokucophelela, futhi uqinisekise ukuthi ulayisha ikhasi elifana nomsebenzi wakho kunesinqamuleli esikopishiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi benza yonke into ocingweni, ngakho ukusesha kweselula kuvame ukwenzeka ngaphansi kwengcindezi yedatha noma ezikrinini ezincane. Lokho kungenza kube nzima ukubona umehluko phakathi komzila olungile nodidayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ocingweni, abasebenzisi bangabona kuphela ingxenye yekheli noma bachofoze ngokushesha ngemiphumela yosesho. Umkhuba weselula ohamba kancane ungavimbela ikhasi elingalungile ekubeni yinkinga elandelayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Sebenzisa ibhukhimakhi ethembekile noma uthayiphe ngokucophelela umzila.\n2. Hlola ikheli lekhasi efonini yakho ngaphambi kokuqhubeka.\n3. Qiniseka ukuthi ikhasi lifana nomsebenzi wakho.\n4. Gwema izixhumanisi ezivela emilayezweni engahleliwe noma okuthunyelwe kwezithombe.\n5. Londoloza ikhasi elilungile uma usuqinisekise ukuthi liyindlela esemthethweni elungile."
      },
      {
        "title": "Iselula idinga ukuqapha kweselula",
        "body": "Amafoni enza ukufinyelela kube lula, kodwa futhi afihla imininingwane ethile. Ukuhlolwa kwekheli okufushane kuselula kungasindisa izinkinga eziningi kamuva."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare yakhelwe ukuthi isebenzise iselula, kodwa iseyisiqondiso esizimele. Izenzo ezisemthethweni kusafanele zenzeke ekhasini elisemthethweni elilungile olivula ocingweni lwakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukhethe umzila olungile ngaphambi kokuthi uqale ukuchofoza emiphumeleni yosesho kuselula, okwenza uhambo lwefoni luzole kakhulu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-sassa-status-check-for-r350\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kulula ukuthola ukufinyelela kumakhalekhukhwini okungalungile?",
        "body": "Ngoba ikheli nemininingwane yekhasi kungase kungabonakali esikrinini esincane."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngilondoloze ikhasi elilungile uma ngilitholile?",
        "body": "Yebo, uma uqinisekile ukuthi umzila osemthethweni olungile womsebenzi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyigweme kumakhalekhukhwini?",
        "body": "Gwema izixhumanisi zemiyalezo engahleliwe nezithombe-skrini ezikopishiwe ezingawubonisi umzila ogcwele ngokucacile."
      }
    ]
  },
  "how-to-check-application-status-on-the-official-portal-safely": {
    "title": "Ungasihlola kanjani isimo sohlelo lokusebenza kuphothali esemthethweni ngokuphepha",
    "summary": "Umhlahlandlela wokufinyelela umzila olungile wesimo esisemthethweni ngokucophelela nokufunda umphumela ngaphandle kokuwudida namakhasi angahlobene.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola isimo sohlelo lokusebenza ngokuphepha ngokusebenzisa umzila olungile wesimo osemthethweni wesibonelelo sakho, uqinisekise ikhasi kuqala, bese ufunda amagama esimo ngaphambi kokugxumela esiphethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basesha isimo ngoba bafuna isiqiniseko ngokushesha. Lokho kungabaholela kunoma yiliphi ikhasi elisho isimo, ngisho noma ikhasi lingewona umzila osemthethweni noma kungewona umzila olungile wohlobo lwabo lwesibonelelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukusebenzisa ikhasi elingalungile kungamosha isikhathi, futhi ukufunda ikhasi elilungile ngokushesha kusengadala ukudideka. Ukuhlola okuphephile kuncike kukho kokubili umzila kanye nencazelo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Khomba ukuthi yisiphi isigaba sesibonelelo noma sosekelo osihlolayo.\n2. Vula umzila wesimo osemthethweni olungile waleso sigaba.\n3. Qinisekisa ikheli ngaphambi kokufaka noma yimiphi imininingwane.\n4. Funda ngokucophelela amagama omphumela.\n5. Sebenzisa i-GrantCare ukuze uqonde incazelo ngemuva kokuthi ikhasi elisemthethweni linikeze umphumela."
      },
      {
        "title": "Ukuhlola okuphephile kunezingxenye ezimbili",
        "body": "Ingxenye yokuqala ifinyelela ekhasini elisemthethweni elifanele. Ingxenye yesibili ifunda umphumela ngokucophelela. Abasebenzisi abaningi bacabanga kuphela ngomunye walabo ababili."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisebenzisi uhlelo olusemthethweni lwesimo. Kukusiza ukuthi ufinyelele umzila olungile futhi uhumushe amagama owabona lapho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukhethe umzila wesimo olungile, uqonde ukuthi umphumela usho ukuthini, futhi unqume ukuthi hlobo luni lwesinyathelo esilandelayo esifanelana nalawo magama."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-right-status-check-for-your-grant\n• /guides/how-to-use-status-check-before-appealing\n• /guides/how-to-read-your-status-check-result\n• /guides/what-to-do-after-a-status-check-result\n• /status"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Kungani kufanele ngihlonze isibonelelo kuqala?",
        "body": "Ngoba umzila osemthethweni wesimo ungancika ohlotsheni lwesibonelelo noma usekelo oluhlolayo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe umphumela wokuqala okhuluma ngesimo?",
        "body": "Cha. Qinisekisa ukuthi ikhasi liwumzila osemthethweni olungile ngaphambi kokuwusebenzisa."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokubona isimo?",
        "body": "Sebenzisa i-GrantCare ukuze uqonde amagama ngaphambi kokunquma ngesinyathelo esilandelayo."
      }
    ]
  },
  "what-to-do-if-the-portal-login-page-keeps-failing": {
    "title": "Okufanele ukwenze uma ikhasi lokungena ngemvume lephothali lihlala lihluleka",
    "summary": "Umhlahlandlela wokuxazulula izinkinga wamakhasi okungena ngemvume engosi esemthethweni angeke alayishe, avuselele kabi, noma abonakale ebambekile ngaphambi kokuthi uqhubeke.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ikhasi lokungena ngemvume lephothali lihlala lihluleka, qala ngokubheka umzila, uxhumano, kanye nekhasi ngokwalo ngaphambi kokuthi ucabange ukuthi inkinga yakho noma imininingwane iyinkinga."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuhluleka kwekhasi lokungena kuvamise ukuba yinkinga yokufinyelela ikhasi kuqala, akusona isinqumo sokugcina mayelana nesicelo sakho noma isimo. Lowo mehluko ubalulekile ngoba ushintsha indlela okufanele uphendule ngayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi kwesinye isikhathi bayethuka futhi bagxumele ezixhumanisini ezikopishiwe lapho ikhasi elisemthethweni lehluleka. Lokho kungadala inkinga yokuthembana ngaphezulu kweyobuchwepheshe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi usendleleni efanele esemthethweni.\n2. Vuselela ikhasi bese uzama futhi isiphequluli.\n3. Hlola ukuthi uxhumano lwakho luzinzile yini.\n4. Gwema ukuvula izixhumanisi ezishintshayo ezingahleliwe.\n5. Buyela emzileni osemthethweni uma inkinga yokufinyelela isixazululiwe."
      },
      {
        "title": "Phatha lokhu njengenkinga yokufinyelela kuqala",
        "body": "Ikhasi lokungena elihlulekayo ngokuvamile lisho ukuthi ikhasi alilayishi kahle noma umzila awulungile. Lokho kwehlukile emphumeleni wakho wesibonelelo sikahulumeni ngokwawo wokuba inkinga."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukulungisa ikhasi lokungena elisemthethweni. Ingakusiza ukuthi uhlale emzileni olungile futhi ugweme ukushintsha inkinga yokufinyelela yesikhashana ibe inkinga enkulu yokuphepha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise izinkinga zokufinyelela kobuchwepheshe kusimo noma izinkinga zokukhokha ukuze ungaphenduli enkingeni engalungile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-you-cannot-log-in-to-the-sassa-portal\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/what-to-do-if-the-status-check-page-will-not-load"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lokungena elihlulekayo lisho ukuthi isicelo sami sehlulekile?",
        "body": "Cha. Ngokuvamile kuwukufinyelela kwekhasi noma inkinga yomzila kuqala."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngichofoze isixhumanisi esihlukile senkundla yezokuxhumana ngokushesha?",
        "body": "Cha. Hlala nemizila esemthethweni ethembekile esikhundleni sokushintshwa okungahleliwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola umzila osemthethweni, uxhumano, kanye nesiphequluli ngaphambi kokuthatha inkinga enkulu."
      }
    ]
  },
  "what-to-do-if-you-cannot-log-in-to-the-sassa-portal": {
    "title": "Okufanele ukwenze uma ungakwazi ukungena ku-portal ye-SASSA",
    "summary": "Umhlahlandlela wokutakula wezinkinga zokungena ngemvume zephothali, ugxile ezinyathelweni ezilandelayo eziphephile esikhundleni sokuqagela okuphuthumayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ungeke ukwazi ukungena kuphothali ye-SASSA, qala uqinisekise ukuthi usekhasini elilungile, bese usebenzisa inkinga yokufinyelela ngokucophelela esikhundleni sokufaka imininingwane ngokuphindaphindiwe emakhasini angaqinisekile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Inkinga yokungena ingavela emzileni, ekhasini, ekuxhumekeni, noma emininingwaneni ozama ukuyisebenzisa. Okubalulekile wukunciphisa inkinga ngokuphepha kunokuzama ukulungisa okungahleliwe okuningi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Imizamo ephindaphindiwe yehlulekile ekhasini elingalungile noma ngokuqagela okusheshayo kungenza isimo sibe nengcindezi futhi singabi sobala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi ikhasi liwumzila osemthethweni olungile.\n2. Hlola kabusha imininingwane ozama ukuyisebenzisa.\n3. Zama futhi ngokucophelela esikhundleni sokujaha imizamo ephindaphindiwe.\n4. Gcina inothi ukuthi yisiphi isinyathelo esihlulekayo ngempela.\n5. Sebenzisa ukuxhumana okusemthethweni noma imizila yosekelo uma inkinga yokufinyelela iqhubeka ngokucacile."
      },
      {
        "title": "Ukuhlola ukungena ngemvume okuzolile kusebenza kangcono kunokuqagela okuphindaphindiwe",
        "body": "Ukuthola kabusha okuphephile kokungena ngemvume isinyathelo nesinyathelo. Uma wazi ukuthi ingabe inkinga yikhasi, umzila, noma imininingwane yokungena ngemvume, umnyakazo olandelayo uba sobala kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayilawuli ukufinyelela kokungena okusemthethweni. Ingakusiza ukuthi uhlale kumzila olungile futhi uqonde ukuthi iyiphi ingxenye yokugeleza kokungena ebonakala iyinkinga yangempela."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukubhanqa izinkinga zokungena noxhumana naye osemthethweni, ukuphepha kwewebhusayithi, nemihlahlandlela yokuzulazula yengosi ukuze ungaxazululi inkinga ebumnyameni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-keep-your-portal-login-details-safe\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise ikhasi kuqala?",
        "body": "Ngoba inkinga yokungena ekhasini elingalungile ngeke ixazululwe ngokufaka imininingwane efanayo futhi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqhubeke ngizama into efanayo ngokuphindaphindiwe?",
        "body": "Ngokuvamile akukho. Kuyasiza kakhulu ukukhomba ukuthi iyiphi ingxenye yokungena ehlulekayo."
      },
      {
        "title": "I-FAQ: Kufanele ngiyisebenzise nini imizila yokuxhumana esemthethweni?",
        "body": "Wasebenzise lapho inkinga yokungena ngokusemthethweni iqhubeka ngemva kokuqinisekisa ukuthi usekhasini elilungile."
      }
    ]
  },
  "how-to-keep-your-portal-login-details-safe": {
    "title": "Uyigcina kanjani imininingwane yakho yokungena kwiphothali iphephile",
    "summary": "Umhlahlandlela osebenzayo wokuphepha wokuvikela imininingwane yokungena kwiphothali uma usesha isimo, izinkokhelo, noma usizo lohlelo lokusebenza ku-inthanethi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Gcina imininingwane yakho yokungena kuphothali iphephile ngokuyifaka kuphela emakhasini asemthethweni aqinisekisiwe, ugweme izixhumanisi zokungena ezikopishiwe, futhi ungabelani ngazo ngokunethezeka ngezingxoxo noma ngokuthunyelwe komphakathi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukucabanga ngokuphepha kwekhasi kodwa hhayi mayelana nokuphepha kwemininingwane. Imininingwane ngokwayo ibalulekile kakhulu, ikakhulukazi uma ingcindezi yenza abasebenzisi bangaqapheli ukuthi bayibhala kuphi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma imininingwane yokungena isisetshenziswe ekhasini elingalungile, umonakalo ungaba nzima ukuhlehla kunokuchofoza okungalungile. Yingakho imikhuba yokuphepha emayelana nolwazi lokungena ibalulekile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Faka imininingwane kuphela ekhasini elisemthethweni eliqinisekisiwe.\n2. Gwema ukwabelana ngolwazi lokungena ezingxoxweni noma kumazwana.\n3. Qaphela ngezixhumanisi ezivela emilayezweni engaziwa.\n4. Yima uma ikhasi lizwakala ungalijwayele noma liphuthuma.\n5. Sebenzisa imizila yokuxhumana esemthethweni uma ucabanga ukuthi imininingwane yakho yokungena isetshenziswe ekhasini elingelona."
      },
      {
        "title": "Vikela imininingwane, hhayi idivayisi kuphela",
        "body": "Amaphutha amaningi okuphepha ayenzeka ngoba abasebenzisi bagxila ekutholeni ikhasi futhi bakhohlwe ukuthi imininingwane ngokwayo iyona edinga ukuvikelwa uma ikhasi selivele."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisoze yakucela ukuthi ugcwalise izenzo zokungena ezisemthethweni ngaphakathi kwamakhasi ayo omhlahlandlela. Lokho kuhlukana kwenziwa ngamabomu futhi kuvikela ukwethembana."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza utshele umehluko phakathi kwekhasi lomhlahlandlela kanye nomzila wangempela osemthethweni ukuze wazi ukuthi kunini lapho imininingwane yokungena kungafanele ifakwe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /privacy"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngabelane ngemininingwane yokungena nomuntu ongisizayo?",
        "body": "Kuphephile ukungakwenzi. Imininingwane yokungena esemthethweni kufanele ihlale ivikelekile futhi isetshenziswe kuphela emakhasini asemthethweni aqinisekisiwe."
      },
      {
        "title": "I-FAQ: Kungani isixhumanisi sokungena esikopishiwe siyingozi?",
        "body": "Ngoba ingase ikuthumele ekhasini elibukeka lilungile ngaphandle kokuba umzila osemthethweni."
      },
      {
        "title": "I-FAQ: I-GrantCare ikuphatha kanjani ukungena okusemthethweni?",
        "body": "Ayizibambi. Izenzo zokungena ezisemthethweni zihlala kumasistimu asemthethweni kuphela."
      }
    ]
  },
  "how-to-find-official-contact-details-safely": {
    "title": "Uyithola kanjani imininingwane yokuxhumana esemthethweni ngokuphepha",
    "summary": "Umhlahlandlela ogxile ekuthembekeni wokuthola imininingwane yokuxhumana esemthethweni ye-SASSA ngaphandle kokuncika ezinombolweni ezikopishiwe, izithombe-skrini ezindala, noma amakhasi angaphephile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola imininingwane yokuxhumana esemthethweni ngokuphepha ngokuqala emakhasini okuxhumana asemthethweni, uhlole ukuthi ikhasi liyahambisana yini nesevisi oyidingayo, futhi uqaphe ngezinombolo ezabiwe ngaphandle komongo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Imininingwane yokuxhumana ingashintsha, futhi akuzona zonke izinombolo okwabelwana ngazo ezamanje noma ezifanele wonke umsebenzi. Yingakho ukusesha othintana naye okuphephile kufanele kuqale ngekhasi lokuxhumana elisemthethweni elilungile, hhayi ngokuthunyelwe okungahleliwe."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukucinga imininingwane yokuxhumana lapho bekhungathekile futhi bedinga usizo ngokushesha. Lokho kuphuthuma kungenza izinombolo eziphelelwe yisikhathi noma ezingekho emthethweni zibukeke zithembeke kakhulu kunalokho eziyikho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi yiluphi uhlobo losizo oludingayo.\n2. Sebenzisa ikhasi lokuxhumana elisemthethweni ngalolo hlobo losizo.\n3. Hlola ukuthi imininingwane yokuxhumana isabukeka njengeyamanje yini lapho.\n4. Gwema ukwethemba izinombolo ezikopishwe ngaphandle komthombo noma usuku.\n5. Gcina ikhasi lokuxhumana elisemthethweni ligciniwe uma usuliqinisekisile."
      },
      {
        "title": "Imininingwane yokuxhumana idinga umthombo nomongo",
        "body": "Inombolo iyodwa ayanele. Udinga futhi ukwazi ukuthi ingabe iphuma ekhasini elisemthethweni nokuthi iyahambisana yini nosizo oludingayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayizishicileli njengesikhungo sokuxhumana esisemthethweni. Ingakuqondisa emizileni yokuxhumana esemthethweni, kodwa ayikushintshi."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uthole ukuthi inkinga yakho idinga ukuthintwa, ukuhlolwa isimo, usizo lwehhovisi, noma omunye umzila osemthethweni ngaphambi kokuthi uqale ukusesha izinombolo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-find-the-right-contact-number-for-r350-help\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani kungafanele ngithembe izinombolo ezikopishiwe ngaso leso sikhathi?",
        "body": "Ngoba kungenzeka ukuthi zidlulelwe yisikhathi, aziphelele, noma aziboshelwe ekhasini elisemthethweni lesevisi elisemthethweni."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume kuqala?",
        "body": "Nquma ukuthi yiluphi usizo oludingayo ngaphambi kokuthi useshe inombolo."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare inganikeza usizo lokuxhumana olusemthethweni ngokuqondile?",
        "body": "Cha. Ikusiza ukuthi uthole umzila olungile wokuxhumana naye esikhundleni salokho."
      }
    ]
  },
  "how-to-use-sassa-contact-numbers-safely": {
    "title": "Zisetshenziswa kanjani izinombolo zokuxhumana ze-SASSA ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokusebenzisa izinombolo ngokucophelela ukuze ungachithi isikhathi enombolweni okungeyona noma uthembele engagunyaziwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa izinombolo zokuxhumana ze-SASSA ngokuphephile ngokuqinisekisa inombolo ekhasini lokuxhumana elisemthethweni, ukuyifanisa nomsebenzi wakho, nokugcina irekhodi lokuthi yiluphi usizo olucelile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukucabanga ukuthi inselele enkulu ukuthola noma iyiphi inombolo. Inselele ephephile ukuthola inombolo efanelekile yomsebenzi ofanele nokuqinisekisa ukuthi inombolo iphuma emthonjeni osemthethweni ngempela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inombolo engalungile noma ephelelwe yisikhathi ingadala ukubambezeleka okwengeziwe, ingcindezi eyengeziwe, nokudideka okwengeziwe. Ukusetshenziswa kwenombolo ephephile kunciphisa leyo ngozi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa inombolo ekhasini lokuxhumana elisemthethweni.\n2. Qondanisa inombolo nosizo oludingayo.\n3. Gcina amaphuzu ngalokho okubuzile kanye nempendulo oyitholile.\n4. Gwema ukwethemba izinombolo ezingenamthombo osemthethweni ocacile.\n5. Buyela ekhasini lokuxhumana elisemthethweni uma udinga ukuphinda uhlole imininingwane ngokuhamba kwesikhathi."
      },
      {
        "title": "Inombolo nomsebenzi kufanele kulingane",
        "body": "Ngisho nenombolo yangempela esemthethweni iwusizo kuphela uma ifana nosizo oludinga ngempela. Yingakho ukufanisa umsebenzi kubaluleke kakhulu njengenombolo ngokwayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisebenzi njengesikhungo sezingcingo esisemthethweni. Iwumhlahlandlela ozimele osiza abasebenzisi ukunquma lapho usizo lwefoni kuyisinyathelo esilandelayo esifanele."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unciphise inkinga ngaphambi kokuthi ushaye ucingo, okwenza kube lula ukwazi ukuthi ukusekelwa kwefoni kuwumzila olungile nhlobo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-find-the-right-contact-number-for-r350-help\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-keep-records-of-payment-problems"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngifanise inombolo nomsebenzi?",
        "body": "Ngoba akuzona zonke izinombolo ezisemthethweni ezisingatha zonke izinhlobo zezinkinga ezihlobene nezibonelelo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyiqophe ngemva kokushaya ucingo?",
        "body": "Rekhoda lokho okubuzile, lokho okutsheliwe, nokuthi ucingo lwenzeke nini."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqhubeke ngisebenzisa kabusha inombolo evela kusithombe-skrini esidala?",
        "body": "Kuphephe kakhudlwana ukuhlola kabusha ikhasi lokuxhumana elisemthethweni kuqala."
      }
    ]
  },
  "how-to-find-the-right-contact-number-for-r350-help": {
    "title": "Ungayithola kanjani inombolo yokuxhumana efanele ukuze uthole usizo lwe-R350",
    "summary": "Umhlahlandlela ogxilisiwe wabasebenzisi abafuna usizo lokuxhumana oluhlobene ne-R350 ngaphandle kokuxuba oxhumana nabo besibonelelo sikahulumeni nezinkinga ezithize ze-SRD.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola inombolo yokuxhumana efanele yosizo lwe-R350 ngokubheka umzila osemthethweni olingana nenkinga yakho ethile ehlobene ne-SRD ngaphambi kokuthi uthembe inombolo ekopishiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha okuhlobene ne-R350 kuvame ukuvela ezimeni eziphuthumayo, ngakho abasebenzisi bangase baseshe noma iyiphi inombolo ezwakala iwusizo. Ukuthutha okuphephile ukunquma ukuthi inkinga imayelana nesimo, inkokhelo, isicelo, noma enye inkinga ehlobene ne-SRD kuqala."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ngaphandle kwalokho kuhlolwa komsebenzi, abasebenzisi bangamosha isikhathi emzileni ongalungile wokuxhumana noma baqhubeke nokuphinda umbuzo ofanayo endaweni engafanele."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thola inkinga ehlobene ne-R350 ngqo.\n2. Hlola umzila wokuxhumana osemthethweni oxhunywe kuleyo nkinga.\n3. Qinisekisa umthombo ngaphambi kokushaya ucingo.\n4. Gcina inothi elifushane lenkinga nanoma imaphi amarekhodi ongase uwadinge.\n5. Londoloza ikhasi elisemthethweni kunokuthembela enombolweni ekopishiwe iyodwa."
      },
      {
        "title": "Usizo lwe-R350 lusebenza kangcono uma udaba lucacisiwe",
        "body": "Uma inkinga icacile, kuba lula ukuthola umzila olungile wokuxhumana osemthethweni. Ukusesha okubanzi kuvame ukudala ukudideka okuningi kunokucaca."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingakusiza unciphise inkinga ehlobene ne-SRD, kodwa ayinikezi usekelo lwefoni olusemthethweni ngokwalo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlele izindaba ezihlobene ne-R350 zibe isimo, inkokhelo, isikhalazo, ukuthintana, noma izigaba zohlelo ngaphambi kokusebenzisa umzila osemthethweni wokuxhumana."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-check-srd-status-online\n• /guides/how-sassa-appeals-work\n• /guides/where-to-confirm-payment-problems-officially\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele nginciphise inkinga ngaphambi kokubheka inombolo?",
        "body": "Ngoba indlela yokuxhumana esemthethweni efanele incike ohlotsheni losizo oludinga ngempela."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise inombolo yokuqala ye-R350 engiyibona ku-inthanethi?",
        "body": "Cha. Qinisekisa umthombo osemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Yini esiza ngaphambi kokuthi ngishaye ucingo?",
        "body": "Isifinyezo esicacile sodaba nanoma yiziphi izinsuku ezifanele noma amagama."
      }
    ]
  },
  "how-to-use-sassa-toll-free-and-contact-pages-safely": {
    "title": "Ungayisebenzisa kanjani i-SASSA yamahhala kanye namakhasi wokuxhumana ngokuphepha",
    "summary": "Umhlahlandlela wokusebenzisa amakhasi okuxhumana amahhala nasemthethweni ngokucophelela, ikakhulukazi uma izinombolo zingakopishwa noma ziphelelwe yisikhathi kwenye indawo ku-inthanethi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amakhasi amahhala nawokuxhumana ngokuphepha ngokuqala ekhasini lokuxhumana elisemthethweni, uhlole ukuthi imininingwane isasebenza yini odabeni lwakho, futhi ugweme izinombolo ezingaqinisekisiwe ezabiwe ngaphandle komongo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukucinga usizo lwamahhala noma ucingo lwamahhala uma befuna ukufinyelela okunezindleko eziphansi. Lokho kuyaqondakala, kodwa kwenza ukuhlola umthombo okusemthethweni kubaluleke nakakhulu ngoba izinombolo ezindala noma ezikopishiwe zingasabalala kalula."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bethemba inombolo ephelelwe yisikhathi noma engekho emthethweni, bangase bachithe isikhathi nemali ngaphandle kokuthola usizo olufanele. Umthombo wenombolo ubaluleke kakhulu njengenombolo ngokwayo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qala ekhasini lokuxhumana elisemthethweni.\n2. Hlola ukuthi inketho yamahhala noma yokuxhumana iyahambisana yini nenkinga yakho.\n3. Qinisekisa ukuthi imininingwane ingeyakamuva ekhasini elisemthethweni.\n4. Gcina ikhasi elisemthethweni lilondolozwe ukuze lihlolwe kamuva.\n5. Sebenzisa imizila yehhovisi noma yesimo uma ukuxhumana ngocingo kungesona isinyathelo esilandelayo esingcono kakhulu."
      },
      {
        "title": "Ukuxhumana okunezindleko eziphansi kusadinga ukuthola ukuthola ukwethenjwa okuphezulu",
        "body": "Abantu bavame ukugxila ekutheni inombolo ayikhokhelwa yini bakhohlwe ukubheka ukuthi eyamanje noma esemthethweni. Ukuhlola ukwethenjwa kusaza kuqala."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisho ukuthi iyideski losizo elisemthethweni lamahhala. Isiza abasebenzisi ukuthi bathole imizila yokuxhumana esemthethweni ngokuphepha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi ukuthintana ngocingo, ukuvakasha kwehhovisi, noma umzila osemthethweni wesimo wenza umqondo owengeziwe ngenkinga yakho ngaphambi kokuthi uqale ukushayela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-the-right-contact-number-for-r350-help"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngihlole ikhasi lokuxhumana elisemthethweni kuqala?",
        "body": "Ngoba izinombolo zamahhala ezikopishiwe zingase zibe ezindala, ezingaphelele, noma zingaxhunywanga kusevisi efanele."
      },
      {
        "title": "I-FAQ: Ingabe i-toll-free isho ngokuzenzakalelayo ukuthi isemthethweni?",
        "body": "Cha. Usadinga ukuqinisekisa umthombo."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ukuthintana naye ngocingo kungabonakali njengesinyathelo esilandelayo esingcono kakhulu?",
        "body": "Sebenzisa i-GrantCare ukuze uqhathanise othintana naye, ihhovisi, isimo, nezindlela zokukhokha kuqala."
      }
    ]
  },
  "how-to-know-if-a-sassa-whatsapp-number-is-official": {
    "title": "Ungazi kanjani ukuthi inombolo ye-SASSA WhatsApp isemthethweni",
    "summary": "Umhlahlandlela wokwethenjwa wokuhlola ukuthi inombolo ye-WhatsApp noma umlayezo othi usiza ngezinkinga zesibonelelo sikahulumeni usemthethweni ngempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Yazi ukuthi inombolo ye-WhatsApp ehlobene ne-SASSA isemthethweni yini ngokuyibheka ngokumelene namakhasi okuxhumana asemthethweni futhi uqaphele izinombolo ezabiwe kuzithombe-skrini, izingxoxo, noma amazwana ngaphandle komthombo osemthethweni ocacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-WhatsApp izizwa ijwayelekile futhi kulula ukuyisebenzisa, engenza izinombolo ezingekho emthethweni zibukeke zithembeke kakhulu kunalokho okufanele. Kungakho ukusesha okuhlobene ne-WhatsApp kudinga ukuhlolwa komthombo okufanayo njengosesho lwewebhusayithi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inombolo engalungile ye-WhatsApp ingaholela abasebenzisi ekudidekeni noma ekucindezelweni ngokushesha, ikakhulukazi uma izwakala iwusizo futhi iphuthuma. Yingakho ukuqinisekiswa kubalulekile ngaphambi kokuthi uthembele kukho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi inombolo iyavela yini ekhasini lokuxhumana elisemthethweni.\n2. Qaphela izinombolo ezabiwe ezithombeni-skrini noma ezingxoxweni zeqembu.\n3. Qhathanisa inhloso yenombolo nosizo oludingayo.\n4. Gwema ukwabelana ngemininingwane yomuntu siqu uze uqiniseke ngomthombo.\n5. Sebenzisa amakhasi okuxhumana asemthethweni uma umzila we-WhatsApp usazizwa ungaqinisekile."
      },
      {
        "title": "Imiyalezo elula ayisusi isheke lokwethenjwa",
        "body": "I-WhatsApp ingazizwa ilula kunewebhusayithi, kodwa umthetho ofanayo wokuphepha usasebenza: qinisekisa umthombo ngaphambi kokuthemba umzila."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akuyona isevisi ye-WhatsApp esemthethweni. Isiza abasebenzisi ukuthi bahlole ukuthi ingabe umzila wemiyalezo ubukeka uthembekile ngaphambi kokuba bawusebenzise."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi inkinga yakho ingeyekhasi lesimo, umzila wokuxhumana, noma umzila wasehhovisi ngaphambi kokuthi uthembele kunombolo ye-WhatsApp."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-status-check-on-whatsapp-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani i-WhatsApp kulula ukuyethemba ngokushesha?",
        "body": "Ngoba kuzwakala okomuntu siqu futhi kujwayelekile, okungehlisa ukuqapha komsebenzisi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe inombolo ye-WhatsApp kusukela kusithombe-skrini sodwa?",
        "body": "Cha. Kuqinisekise ekhasini lokuxhumana elisemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Kuthiwani uma inombolo izwakala iphuthumayo futhi iwusizo?",
        "body": "Yilapho kanye ukuhlola umthombo osemthethweni kubaluleke kakhulu."
      }
    ]
  },
  "how-to-use-status-check-on-whatsapp-safely": {
    "title": "Ungasisebenzisa kanjani ukuhlola isimo ku-WhatsApp ngokuphepha",
    "summary": "Umhlahlandlela wabasebenzisi abafuna usizo lwesimo esisekelwe ku-WhatsApp futhi badinga ukuhlala emzileni othembekile ngaphandle kokudida usekelo lwengxoxo nezinhlelo ezisemthethweni zesimo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa usizo lokuhlola isimo ku-WhatsApp ngokuphepha ngokuphatha imilayezo yengxoxo ngokucophelela futhi uqinisekise umzila osemthethweni ngaphambi kokwethemba noma yisiphi isimangalo noma isixhumanisi esihlobene nesimo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi bafuna usizo lwe-WhatsApp ngoba ingxoxo izwakala ilula kunokuzulazula kuwebhusayithi. Ingozi enkulu iwukuba umzila wengxoxo ungangena esikhundleni sesistimu yesimo esisemthethweni ngaphandle kokuhlola ukuthi isemthethweni noma yamanje kangakanani."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Igama lesimo selivele lidala ukukhathazeka. Ukwengeza umzila wengxoxo ongacacile ngaphezulu kwalokho kungenza isimo sidide nakakhulu uma umthombo ungacacile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi umzila we-WhatsApp uvela emthonjeni osemthethweni yini.\n2. Hlola ukuthi umsebenzi wakho udinga ngempela ikhasi lesimo esisemthethweni esikhundleni salokho.\n3. Gwema ukwethemba izimangalo zesimo esidluliselwe ngaphandle komthombo.\n4. Sebenzisa imizila yesimo esisemthethweni ukuze uqinisekiswe okokugcina.\n5. Sebenzisa i-GrantCare kamuva uma udinga usizo lokufunda umbhalo womphumela."
      },
      {
        "title": "Usizo lwengxoxo nesimo esisemthethweni akuyona into efanayo",
        "body": "Ingxoxo ingazwakala ilula, kodwa ukuqinisekiswa kwesimo esisemthethweni kusengokwesistimu esemthethweni. Lowo mehluko yiwo ogcina inqubo ithembekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayithathi indawo yezinhlelo zezimo ezisemthethweni futhi akufanele kudidaniswe nokuhlola okusemthethweni okusekelwe ku-WhatsApp."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqonde lapho umzila wengxoxo ungase usekelwe kuphela nalapho usadinga ikhasi lesimo esisemthethweni ukuze uthole impendulo yangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-a-sassa-whatsapp-number-is-official\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-find-the-right-status-check-for-your-grant"
      },
      {
        "title": "I-FAQ: Ingabe i-WhatsApp ingakwazi ukufaka ikhasi lesimo esisemthethweni?",
        "body": "Hhayi ngokuphepha iyodwa. Ukuqinisekiswa kwesimo esisemthethweni kusengokwesistimu esemthethweni."
      },
      {
        "title": "I-FAQ: Kungani abasebenzisi befuna usizo lwesimo se-WhatsApp?",
        "body": "Ngoba kuzwakala kulula futhi kujwayeleke kakhulu kunewebhusayithi, ikakhulukazi kuselula."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kwesibuyekezo esisekelwe engxoxweni?",
        "body": "Sebenzisa umzila osemthethweni wesimo ukuze uthole isiqinisekiso sokugcina kanye ne-GrantCare ukuze uhunyushwe."
      }
    ]
  },
  "how-to-find-a-sassa-office-near-you-safely": {
    "title": "Ungalithola kanjani ihhovisi le-SASSA eduze nawe ngokuphepha",
    "summary": "Umhlahlandlela osebenzayo wokuthola ihhovisi eliseduze ngemizila ethembekile esikhundleni sokuncika kumakheli akopishiwe noma okuthunyelwe okuphelelwe yisikhathi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola ihhovisi le-SASSA eliseduze nawe ngokuphepha ngokusebenzisa othintana naye osemthethweni noma imizila yendawo yehhovisi, uhlole ukuthi ulwazi lwendawo lusabukeka lwamanje, futhi unganciki ekuthunyelweni komphakathi kwakudala kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwamahhovisi kuvame ukwenzeka lapho imizila eku-inthanethi izizwa idida noma ingatholakali. Lokho kwenza abasebenzisi bathembeke kakhulu ikheli lokuqala abalibonayo, ngisho noma liphelelwe yisikhathi noma lingacacile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uhambo lwasehhovisi olungalungile lungadla isikhathi, imali, namandla. Yingakho ukusesha ihhovisi okuphephile kubaluleke kakhulu njengokuseshwa kwewebhusayithi okuphephile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Sebenzisa imininingwane yokuxhumana esemthethweni noma yendawo yehhovisi.\n2. Hlola ukuthi imininingwane yendawo isabukeka ingeyamanje.\n3. Qondanisa ukuvakashelwa kwehhovisi nohlobo losizo oludingayo.\n4. Gcina ikheli kanye nanoma iyiphi inothi yokuxhumana ndawonye.\n5. Lungiselela imibhalo yakho ngaphambi kokuhamba uma ukuvakasha kwehhovisi kudingekile."
      },
      {
        "title": "Imininingwane yendawo idinga ukuhlolwa kokwethenjwa okufanayo njengezixhumanisi",
        "body": "Abantu bavame ukuhlola amawebhusayithi ngokucophelela kodwa bathembe amakheli ehhovisi ngokushesha okukhulu. Zombili zidinga ukuhlolwa komthombo uma uhambo lubalulekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiwasebenzisi amahhovisi. Ingasiza abasebenzisi banqume ukuthi usizo lwehhovisi lufanele ukulandelwa nini nokuthi bangayithola kanjani imininingwane yendawo esemthethweni ngokuphepha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi uyakudinga ngempela ukuvakashelwa kwehhovisi noma ukuthi isimo, inkokhelo, noma umzila wokuxhumana uzoyixazulula yini inkinga kuqala."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-prepare-for-a-sassa-office-visit\n• /guides/when-to-use-contact-details-instead-of-status-check"
      },
      {
        "title": "I-FAQ: Kungani kungafanele ngithembe noma yiliphi ikheli lehhovisi ku-inthanethi?",
        "body": "Ngoba imininingwane yendawo ingaba midala, ingaphelele, noma yabiwe ngaphandle komthombo othembekile."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngilungiselele ngaphambi kokuhamba?",
        "body": "Yebo. Kuyasiza ukuqinisekisa isizathu sokuvakasha kanye namadokhumenti ongawadinga."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangitshela uma ngidinga ukuvakashelwa ehhovisi?",
        "body": "Ingakusiza ucabange ukuthi ukuvakasha kwehhovisi cishe kuyisinyathelo esilandelayo esingcono kakhulu."
      }
    ]
  },
  "what-to-check-before-visiting-a-sassa-office": {
    "title": "Yini okufanele uyihlole ngaphambi kokuvakashela ihhovisi le-SASSA",
    "summary": "Umhlahlandlela wokulungiselela ukuvakasha kwamahhovisi ukuze abasebenzisi bangahambi ngaphandle kwezizathu ezicacile, amarekhodi ayisisekelo, noma okulindelekile okufanele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuvakashela ihhovisi le-SASSA, hlola ukuthi ukuvakasha kwehhovisi kuyadingeka ngempela, qinisekisa imininingwane yendawo, bese ulungisa amarekhodi noma imibhalo exhunywe nenkinga yakho."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi baya ehhovisi ngoba imizila ye-inthanethi izizwa ingaqinisekile. Lokho kusengaba yisinyathelo esifanele, kodwa kuyasiza ukwenza uhambo lube ngamabomu esikhundleni sokuhamba ungenawo umsebenzi ocacile engqondweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukuvakashela ehhovisi kungathatha isikhathi nemali. Ukuhlola okufushane kokulungiselela kungenza ukuvakasha kube usizo kakhulu futhi kunciphise ithuba lokubuya futhi ukuze uthole okuthile okulula."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma isizathu esiqondile sokuvakasha.\n2. Qinisekisa imininingwane yehhovisi ngokusebenzisa imizila esemthethweni.\n3. Qoqa imibhalo noma amarekhodi axhunywe nenkinga.\n4. Gcina amanothi amagama noma izinsuku ezibalulekile.\n5. Qiniseka ukuthi inkinga akuyona into umzila osemthethweni we-inthanethi ongayixazulula kuqala."
      },
      {
        "title": "Ukuhamba kufanele kuxazulule inkinga, hhayi ukudala entsha",
        "body": "Ukuvakasha kwehhovisi okuhle kakhulu kuqala ngesizathu esithile kanye namarekhodi alungile. Lokho kuguqula uhambo olucindezelayo lube isinyathelo esilandelayo esigxile kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusebenza njengehhovisi noma ideski lamacala asemthethweni. Ingakusiza kuphela ukuthi unqume ukuthi ukuhamba kungase kube umnyakazo olandelayo owusizo kakhulu."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unciphise inkinga ngaphambi kokuvakasha ukuze wazi ukuthi yimaphi amagama, izinsuku, namarekhodi okufanele uze nawe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-prepare-for-a-sassa-office-visit\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Kungani kufanele nginqume isizathu kuqala?",
        "body": "Ngenxa yokuthi isizathu esicacile siwukuthi, kuba lula ukuletha amarekhodi afanele futhi usebenzise ukuvakasha kahle."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihambe ngaphambi kokuhlola imininingwane yendawo?",
        "body": "Cha. Qinisekisa imininingwane yendawo esemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Kufanele ngiphathe ini?",
        "body": "Letha amarekhodi, imibhalo, kanye nezinsuku ezixhumene ngqo nenkinga yakho."
      }
    ]
  },
  "when-to-use-a-sassa-office-instead-of-the-portal": {
    "title": "Isetshenziswa nini ihhovisi le-SASSA esikhundleni sephothali",
    "summary": "Umhlahlandlela wesinqumo wabasebenzisi abangenaso isiqiniseko sokuthi isinyathelo sabo esilandelayo singe-inthanethi noma mathupha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa ihhovisi le-SASSA esikhundleni sephothali lapho udaba ludinga ngokusobala usizo lomuntu siqu noma lapho imizila ye-inthanethi ingaxazululi inkinga ngemva kokuqinisekisa ukuthi usebenzisa ikhasi elisemthethweni elilungile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ezinye izinkinga zimayelana nokuqonda amagama, ukuhlola isikhathi, noma ukusebenzisa ikhasi elisemthethweni elilungile. Abanye bangase bafinyelele iphuzu lapho usizo lomuntu siqu lunengqondo. Inselele ukwazi umehluko."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uye ehhovisi ngaphambi kwesikhathi kakhulu, ungamosha uhambo. Uma ugwema ihhovisi isikhathi eside kakhulu lapho lidingeka ngokucacile, inkinga ingase iqhubeke. Isinqumo esinokulinganisela sibalulekile lapha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi udaba lusengasingathwa yini emzileni osemthethweni osemthethweni ku-inthanethi.\n2. Sebenzisa i-GrantCare ukuze uqonde amagama nomsebenzi kuqala.\n3. Nquma ukuthi ingabe inkinga manje idinga usizo lomuntu siqu.\n4. Qinisekisa imininingwane yehhovisi ngaphambi kokuhamba.\n5. Lungiselela amarekhodi afanele uma udinga ukuhamba."
      },
      {
        "title": "I-inthanethi kuqala akusho ukuthi ku-inthanethi unomphela",
        "body": "Isinyathelo esilandelayo esihlakaniphile asihlali sifana kuyo yonke inkinga. Ezinye izinkinga zidinga kuphela ukufunda okucacile. Abanye bafinyelela eqophelweni lapho ukwesekwa komuntu mathupha kuba okungokoqobo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza ngesinqumo, kodwa ayikwazi ukufaka esikhundleni sokusekela okusemthethweni komuntu uma lokho kudingekile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uveze umehluko phakathi kwenkinga esadinga incazelo engcono kanye nenkinga okungenzeka manje idinga usizo oluqondile olusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/how-to-find-official-contact-details-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /guides/how-to-find-the-right-sassa-website-for-your-task"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiye ehhovisi ngokushesha nje lapho ngizizwa ngididekile?",
        "body": "Hhayi njalo. Okunye ukudideka kungaxazululwa kuqala ngokuqonda umsebenzi kanye nomzila osemthethweni olungile."
      },
      {
        "title": "I-FAQ: Kuthiwani uma umzila we-inthanethi ungakawuxazululi?",
        "body": "Lokho kungase kube iphuzu lapho ukuvakasha kwehhovisi kuba okunengqondo."
      },
      {
        "title": "I-FAQ: Yini engisiza ukuthi nginqume?",
        "body": "Umqondo ocacile wokuthi ngabe udaba lusadinga incazelo noma manje ludinga isenzo esisemthethweni esiqondile mathupha."
      }
    ]
  },
  "how-to-prepare-for-a-sassa-office-visit": {
    "title": "Ungakulungiselela kanjani ukuvakasha kwehhovisi le-SASSA",
    "summary": "Umhlahlandlela osebenzayo wokulungiselela wokuqinisekisa ukuthi uletha amadokhumenti alungile ehhovisi le-SASSA, okuvimbela ukuthi ujikiswe ngemva kokulinda kulayini usuku lonke.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokuvakashela ihhovisi le-SASSA, hlala uletha incwadi yakho yokuqala kamazisi eluhlaza noma ikhadi elihlakaniphile, ikhophi yalo eqinisekisiwe, nobufakazi bendawo ohlala kuyo. Fika ngokushesha ngokuphepha ngangokunokwenzeka, njengoba olayini bakheka ngaphambi kokuba iminyango ivuleke."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuvakasha kwehhovisi le-SASSA akulona uhambo olusheshayo. Kuwuhlelo lukahulumeni olusemthethweni. Uma ufika ulahlekelwe yiphepha elilodwa nje, izikhulu azikwazi ukukusiza ngokomthetho, futhi kuzomele ubuye ngolunye usuku."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukulungiselela kuyisivikelo sakho esingcono kakhulu ekukhungathekeni. Ukwazi kahle ukuthi yini edingekayo kusho ukuthi kufanele ume kulowo mugqa omude kanye."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi kungani uhamba. Ingabe kungenziwa ku-inthanethi esikhundleni salokho?\n2. Qoqa umazisi wakho wokuqala kanye nekhophi esanda kuqinisekiswa (ngaphansi kwezinyanga ezi-3 ubudala).\n3. Phatha ipeni, ibhodlela lamanzi, nanoma yiziphi izinhlamvu noma imiyalezo ye-SMS SASSA okuthumelele yona.\n4. Ungakhokhi noma ubani omi ngaphandle enikela ku-'hold your place in line' noma 'speed up your file'.\n5. Uma usungaphakathi, nikeza kuphela amadokhumenti akho kothile ohlezi ngemva kwedeski elisemthethweni le-SASSA."
      },
      {
        "title": "Qaphela i-'helpers' yangaphandle",
        "body": "Abakhwabanisi bavame ukuhlala ngaphandle kwamahhovisi e-SASSA begqoke imichilo ebukeka isemthethweni. Bazokunikeza ukukusiza weqe ulayini ngenkokhelo. Ungabanaki. Khuluma nezikhulu kuphela ngaphakathi kwesakhiwo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi ulungiselele ngokwengqondo nokuphatha ukuvakasha kwakho. Asikwazi ukusheshisa ulayini noma sikubhukhele i-aphoyintimenti."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza izidingo eziqondile zezibonelelo ezahlukene, ukuze wazi kahle ukuthi imaphi amadokhumenti okufanele uwafake kufolda yakho ngaphambi kokuba uphume endlini."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-find-official-contact-details-safely\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal"
      },
      {
        "title": "I-FAQ: Ingabe omunye umuntu angangiyela ehhovisi?",
        "body": "Ngokuvamile akunjalo, ngaphandle uma benegunya elisemthethweni, elisemthethweni Lommeli. I-SASSA idinga ukuqinisekisa ukuthi ungubani umfakisicelo wangempela."
      },
      {
        "title": "I-FAQ: Ingabe ngidinga ukuphrinta izitatimende zami zasebhange?",
        "body": "Uma ufaka isicelo sesibonelelo esisha noma ushintsha imininingwane yasebhange, yebo, ngokuvamile udinga izinyanga ezi-3 zezitatimende zasebhange ezinesitembu."
      },
      {
        "title": "I-FAQ: Ingabe ikhona imali yokungena ehhovisi le-SASSA?",
        "body": "Ungalokothi. Ukufinyelela ehhovisi likahulumeni nasezinsizeni zikahulumeni kumahhala 100%."
      }
    ]
  },
  "what-the-search-for-a-sassa-app-usually-means": {
    "title": "Kungani mhlawumbe ungaludingi uhlelo lokusebenza lwe-SASSA",
    "summary": "Umhlahlandlela wokuphepha ochaza ukuthi kungani ufuna uhlelo lokusebenza lwe-SASSA kuvame ukuholela ekulandeni isofthiwe yomkhonyovu eyingozi, nokuthi yini okufanele uyenze esikhundleni salokho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Akuvamile ukuthi kube nesizathu sokulanda i-'SASSA App'. Abakhwabanisi badala izinhlelo zokusebenza ezingelona iqiniso ku-Google Play Store ukuze bantshontshe amaphasiwedi akho. Indlela ephephe kunazo zonke yokufinyelela i-SASSA ocingweni lwakho ukuthayipha 'srd.sassa.gov.za' esipheqululini sakho se-inthanethi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Kulula kakhulu kumuntu okhohlisayo ukwakha uhlelo lokusebenza, alubize ngokuthi 'SASSA Status Checker', futhi alubeke esitolo sezinhlelo zokusebenza. Uma uyilanda futhi uthayipha inombolo yakho kamazisi, ithumela imininingwane yakho ngqo kumkhohlisi, hhayi kuhulumeni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ufaka uhlelo lokusebenza olunonya, ingase ingamane intshontshe ukungena kwakho kwe-SASSA—ingase futhi intshontshe amagama ayimfihlo akho ebhange noma ifunde imilayezo yakho ye-SMS ukuze ibambe ama-OTP."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungacingi i-Google Play Store noma i-Apple App Store ukuze uthole i-'SASSA'.\n2. Vula isiphequluli sakho se-inthanethi (Chrome, Safari) esikhundleni salokho.\n3. Thayipha ngokwakho ikheli elisemthethweni (isb., srd.sassa.gov.za).\n4. Uma ulufuna ngempela uhlelo lokusebenza, landa olulodwa kuphela uma kunesixhumanisi esiqondile kulo kusuka kuwebhusayithi esemthethweni ye-sassa.gov.za.\n5. Khipha noma yiziphi izinhlelo zokusebenza ze-'Grant Helper' onazo njengamanje ocingweni lwakho ukuze uvikele ubumfihlo bakho."
      },
      {
        "title": "Izinhlelo zokusebenza zinokufinyelela kufoni yakho",
        "body": "Iwebhusayithi ingabona kuphela ukuthi uthayipha ini kuyo. Uhlelo lokusebenza lungakwazi ukubona amafayela akho, indawo yakho, nemilayezo yakho. Ukunikeza uhlelo lomgunyathi ukufinyelela kufoni yakho kuyingozi ngendlela emangalisayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare yiwebhusayithi, hhayi uhlelo lokusebenza. Awudingi ukulanda noma yini ukuze ufunde imihlahlandlela yethu, ugcine ifoni yakho iphephile futhi ivikelekile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa indlela yokusebenzisa amawebhusayithi asemthethweni ngokushelela kufoni yakho ukuze ungalokothi uzizwe unesidingo sokulanda uhlelo lokusebenza oluyingozi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task"
      },
      {
        "title": "I-FAQ: Kodwa uhlelo lokusebenza lunophawu lwe-SASSA. Ingabe iphephile?",
        "body": "Cha. Abakhohlisi bakopisha ilogo ukuze bakhohlise. Hlala usebenzisa iwebhusayithi ye-.gov.za esikhundleni salokho."
      },
      {
        "title": "I-FAQ: Kuthiwani uma uhlelo lokusebenza lumahhala?",
        "body": "Izinhlelo zokusebenza zomkhonyovu zihlala zimahhala ngoba zenza imali ngokweba isibonelelo sakho noma ngokuthengisa idatha yakho."
      },
      {
        "title": "I-FAQ: Ingabe uhlelo lokusebenza lungahlola isimo sami ngokushesha?",
        "body": "Cha. Isizindalwazi esisemthethweni siwumthombo oqondile weqiniso. Noma yiluphi uhlelo lokusebenza luvele lukhiphe kuwebhusayithi noma kunjalo, lwengeza umuntu ophakathi nendawo ongadingekile."
      }
    ]
  },
  "what-the-search-for-an-srd-sassa-app-usually-means": {
    "title": "Ngokuvamile kusho ukuthini ukusesha kohlelo lokusebenza lwe-SRD SASSA",
    "summary": "Umhlahlandlela osheshayo ochaza ukuthi kungani kungafanele uthembele kuzinhlelo zokusebenza zezinkampani zangaphandle ukuze uphathe isibonelelo sakho se-SRD, nokuthi ungafinyelela kanjani ngokuphephile ingosi esemthethweni ye-SRD kuselula yakho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Abantu abaningi basesha uhlelo lokusebenza lwe-SRD ngethemba lendlela esheshayo yokuhlola isimo sabo. Nokho, alukho uhlelo lokusebenza olusemthethweni lwalokhu. Okuwukuphela kwendlela ephephile yokuphatha isibonelelo sakho se-R350 ukusebenzisa iwebhusayithi esemthethweni yeselula ye-srd.sassa.gov.za."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngenxa yokuthi isibonelelo se-SRD siphathwa ku-inthanethi ngokuphelele, abakhohlisi bayazi ukuthi izigidi zabantu zizosesha uhlelo lokusebenza. Bakha izinhlelo zokusebenza zomgunyathi ezilingisa ingosi ye-SRD ukuze zivune izinombolo zikamazisi nezinombolo zomakhalekhukhwini."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ulanda uhlelo lokusebenza olungelona iqiniso lwe-SRD bese ufaka imininingwane yakho, abakhwabanisi bangangena ngokushesha kuphothali yangempela ye-SRD futhi bashintshe imininingwane yakho yasebhange. Ubanika okhiye be-R350 yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Susa noma yiziphi izinhlelo zokusebenza ze-'SRD Check' noma 'R350 Status' ozilandile.\n2. Vula isikrini sasekhaya sefoni's web browser.\n3. Type srd.sassa.gov.za into the address bar yourself.\n4. Bookmark the page on your phone's ukuze ufinyelele kalula ngokuzayo.\n5. Ungalokothi uthembe uhlelo lokusebenza olukucela i-PIN yephothali ye-SRD noma i-OTP."
      },
      {
        "title": "Iwebhusayithi yakhelwe iselula",
        "body": "Iwebhusayithi esemthethweni ye-srd.sassa.gov.za yakhelwe ngokuqondile ukusebenza kahle kuma-smartphones ashibhile. Awudingi uhlelo lokusebenza ukuze uthole umuzwa osheshayo, oshelelayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare inikeza imihlahlandlela yezemfundo yokuthi ungalusebenzisa kanjani uhlelo lwe-SRD. Asinikezeli ngohlelo lokusebenza ukuhlola isimo sakho, njengoba lokho kungaphula ubumfihlo bakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikubonisa ukuthi ungabhukhima kanjani iwebhusayithi esemthethweni ye-SRD kufoni yakho, ikunikeza ukunethezeka okufana nohlelo lokusebenza ngaphandle kwezingozi zokuphepha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-the-srd-portal-is-for\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-know-if-a-sassa-app-is-official"
      },
      {
        "title": "I-FAQ: Kungani kunezinhlelo zokusebenza eziningi ze-SRD ku-Google Play Isitolo?",
        "body": "Ngoba i-Google ayibambi ngokushesha bonke abakhohlisi. Balayisha izinhlelo zokusebenza ezingamanga ngokushesha kunokuba zingasuswa."
      },
      {
        "title": "I-FAQ: Ingabe uhlelo lokusebenza lungangisiza ngifake isicelo sokwenqaba kwe-SRD yami?",
        "body": "Cha. Izikhalazo kufanele zifakwe ngqo kusiGungu Ezizimele ngokusebenzisa iwebhusayithi yabo esemthethweni."
      },
      {
        "title": "I-FAQ: Ingabe lukhona uhlelo lokusebenza olusemthethweni lwe-SRD nhlobo?",
        "body": "Okwamanje, cha. Uhulumeni ukhetha ukusebenzisa amawebhusayithi anezinga elinguziro ukuze akulondolozele idatha."
      }
    ]
  },
  "how-to-know-if-a-sassa-app-is-official": {
    "title": "Ungazi kanjani ukuthi uhlelo lokusebenza lwe-SASSA lusemthethweni",
    "summary": "Uhlu lokuqinisekisa oluqinile lokukusiza ukuthi unqume ukuthi ingabe uhlelo lokusebenza lushicilelwe ngempela uhulumeni noma luwumkhonyovu ohlakaniphile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Okuwukuphela kwendlela yokwazi ukuthi uhlelo lokusebenza lusuka ku-SASSA ngokusemthethweni ukufuna isixhumanisi sokulanda esiqondile kuwebhusayithi esemthethweni ye-sassa.gov.za. Ungalokothi uthembe uhlelo lokusebenza ngoba luvela esitolo sezinhlelo zokusebenza."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izitolo zezinhlelo zokusebenza (njenge-Google Play noma i-Apple App Store) aziqinisekisi kahle ukuthi ubani umnikazi welogo kahulumeni. Abakhwabanisi bangaqamba kalula inkampani yabo i-'SASSA Official Updates' futhi balayishe uhlelo lokusebenza olungelona iqiniso."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uthemba imiphumela yosesho yesitolo sohlelo lokusebenza, cishe uzolanda umkhonyovu. Lena indlela eshesha kakhulu yokuthi ubunikazi bakho buntshontshwe futhi kuthathwe nesibonelelo sakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungacingi isitolo sakho sohlelo lokusebenza ukuthola amathuluzi e-SASSA.\n2. Vula isiphequluli sakho sewebhu bese uya ngqo ku-sassa.gov.za.\n3. Sesha iwebhusayithi esemthethweni ukuze uthole okukhulunywe ngakho ngohlelo lokusebenza leselula.\n4. Uma lungekho uhlelo lokusebenza olushiwo kuwebhusayithi ye-.gov.za, alukho uhlelo lokusebenza olusemthethweni olukhona.\n5. Uma ungabaza, sebenzisa iwebhusayithi esikhundleni salokho."
      },
      {
        "title": "Umthombo weqiniso yisiza se-.gov.za",
        "body": "Uhulumeni uzohlale ekhangisa amathuluzi akhe asemthethweni kuwebhusayithi yakhe evikelekile. Uma uhlelo lokusebenza lungaxhunywanga ekhelini le-.gov.za, liwumkhonyovu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yezemfundo ezimele. Asinalo uhlelo lokusebenza lweselula olucubungula izibonelelo, futhi noma yiluphi uhlelo lokusebenza oluthi 'GrantCare Official' lokucubungula isibonelelo luyinkohliso."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi ungawabona kanjani lawa manga ngokushesha, ukuvikela ifoni yakho nemali yakho kuma-software anonya."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-the-search-for-a-sassa-app-usually-means\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task"
      },
      {
        "title": "I-FAQ: Ingabe uhlelo lokusebenza olupholishiwe lusengaba olungekho emthethweni?",
        "body": "Yebo. Abakhwabanisi baqasha onjiniyela abangochwepheshe ukuze benze izinhlelo zabo zokusebenza zomgunyathi zibukeke zikholisa ngendlela emangalisayo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake imininingwane yomuntu siqu ngaphambi kokuthi ngiqinisekise uhlelo lokusebenza?",
        "body": "Lutho neze. Ukuqinisekisa ukuba semthethweni kohlelo lokusebenza umugqa wakho wokuqala wokuzivikela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise nayo uhlelo lokusebenza?",
        "body": "Qhathanisa nezimemezelo ezikuwebhusayithi esemthethweni ye-sassa.gov.za. Uma kungamenyezelwa lapho, kushaya indiva."
      }
    ]
  },
  "should-you-use-a-sassa-app-or-the-website": {
    "title": "Ingabe kufanele usebenzise uhlelo lokusebenza lwe-SASSA noma iwebhusayithi?",
    "summary": "Ukuqhathanisa okulula okuchaza ukuthi kungani iwebhusayithi esemthethweni kahulumeni cishe njalo iyisinqumo esiphephile nesihlakaniphe ngaphezu kokulanda uhlelo lokusebenza.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Kuzomele usebenzise njalo iwebhusayithi esemthethweni ye-SASSA (egcina ngo-.gov.za). Ngoba izinhlelo zokusebenza zomgunyathi zivame kakhulu futhi ziyingozi, ukuthembela kusiphequluli sakho sewebhu kuyindlela ephephe kakhulu yokuphatha isibonelelo sakho."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Nakuba izinhlelo zokusebenza zizizwa zishesha, zidinga ukuthi ufake isofthiwe efonini yakho engakwazi ukufinyelela amafayela akho omuntu siqu, imilayezo ye-SMS, nendawo. Iwebhusayithi ibona kuphela lokho okubhalayo kuyo ngokucacile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukukhetha uhlelo lokusebenza ngaphezu kwewebhusayithi ngokuvamile kusho ukuhweba ngokuvikeleka kwakho ukuze kube lula. Lapho usebenza ngeholo lakho kanye nomazisi, ukuphepha kufanele kuze kuqala ngaso sonke isikhathi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Njalo qala ngokuvula ifoni yakho's web browser (Chrome, Safari).\n2. Type the official address (like srd.sassa.gov.za) yourself.\n3. Ignore pop-ups or ads suggesting you download a 'imenyu yohlelo lokusebenza olusheshayo'.\n4. If you really want an app-like experience, tap your browser's bese ukhetha 'Add to Home Screen'.\n5. Lokhu kudala isinqamuleli esiphephile ngqo kuwebhusayithi esemthethweni."
      },
      {
        "title": "Amawebhusayithi alawulwa ngokuqinile",
        "body": "Uhulumeni waseNingizimu Afrika ulawula ngokuqinile ukuthi ubani ongaba umnikazi wekheli lewebhu le-'.gov.za'. Kunzima ngendlela emangalisayo ukuthi abakhwabanisi benze umgunyathi. Amagama esitolo sezinhlelo zokusebenza awalawulwa nhlobo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare yeluleka ngokumelene nokulanda izinhlelo zokusebenza zokuphatha izibonelelo zezinkampani zangaphandle. Sikholelwa ngokuqinile ukuthi iwebhusayithi esemthethweni ukuphela kwendlela evikelekile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikubonisa ukuthi uyisebenzisa kanjani iwebhusayithi esemthethweni ngempumelelo, ukuze ungalokothi uzizwe ukhungathekile ukuze ube sengcupheni yokulanda uhlelo lokusebenza olunomthunzi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-services-sassa-gov-za-safely\n• /guides/what-the-search-for-a-sassa-app-usually-means"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlale ngikhetha uhlelo lokusebenza ngoba luzwakala lulula?",
        "body": "Cha. Nge-SASSA, iwebhusayithi iyindlela yokuxhumana ehlosiwe, esemthethweni, nephephe kakhulu."
      },
      {
        "title": "I-FAQ: Ingabe iwebhusayithi ivamise ukuba yindawo ephephile yokuqala?",
        "body": "Yebo, iyona kuphela indawo yokuqala ephephile eqinisekisiwe inqobo nje uma uqinisekise ikheli le-.gov.za."
      },
      {
        "title": "I-FAQ: Yini okufanele iqondise isinqumo kakhulu?",
        "body": "Ukuphepha kwakho. Ubungozi bokwebiwa kobunikazi kuhlelo lokusebenza olungelona iqiniso kukudlula kude ukusebenziseka elikunikezayo."
      }
    ]
  },
  "what-moya-app-searches-usually-mean-for-r350": {
    "title": "Ukusebenzisa izinhlelo zokusebenza ezingenadatha njenge-Moya ye-R350",
    "summary": "Umhlahlandlela oqondile wokuqonda ukuthi izinhlelo zokusebenza ezingenazo idatha zingena kanjani ohambweni lwakho lwe-SASSA, kanye nezingozi zokuthembela kuzo ukuze wenze izenzo ezisemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Abantu abaningi basebenzisa izinhlelo zokusebenza ezingenadatha njenge-Moya ukuze bafinyelele i-inthanethi uma bengenaso isikhathi somoya. Nakuba lezi zinhlelo zokusebenza zingalayisha iwebhusayithi ye-SASSA, kusafanele uqinisekise ukuthi uzulazulela ekhasini elisemthethweni elithi srd.sassa.gov.za ngaphakathi kohlelo lokusebenza."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izinhlelo zokusebenza ezingenazo idatha zisebenza njengewindi le-inthanethi. Nokho, ngenxa yokuthi uhlelo lokusebenza ngokwalo lusemthethweni akusho ukuthi zonke izixhumanisi ezingaphakathi kulo zisemthethweni. Usadinga ukuqinisekisa ikheli lewebhu olibhekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uchofoza isixhumanisi esingahleliwe ngaphakathi kohlelo lokusebenza olungenayo idatha uthatha ngokuthi luphephile ngoba uhlelo lokusebenza luphephile, ungase ufike kusayithi lomkhonyovu. Kufanele ugcine ukuqapha kwakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula uhlelo lwakho lokusebenza olungenayo idatha (njenge-Moya).\n2. Esikhundleni sokuchofoza izibhengezo ezijwayelekile ze-'SASSA Help', bheka 'Discover' noma ingxenye yesiphequluli sewebhu.\n3. Thayipha okuthi srd.sassa.gov.za ngqo ku-app's browser bar.\n4. Verify the address before entering your ID.\n5. Never pay a fee to access 'premium' SASSA izixhumanisi ngaphakathi kohlelo lokusebenza."
      },
      {
        "title": "Isayithi elisemthethweni nalo alinayo idatha",
        "body": "Uhulumeni wenze iwebhusayithi ye-srd.sassa.gov.za esemthethweni yaba nguziro. Lokhu kusho ukuthi awudingi idatha ukuze ufinyelele kuyo ngokuqondile esipheqululini esivamile sefoni yakho (njenge-Chrome)."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla ezimele futhi ayixhunyanisiwe nohlelo lokusebenza lwe-Moya. Sincoma ukusebenzisa isiphequluli esakhelwe ngaphakathi sefoni yakho ukuze ufinyelele ngokuqondile isayithi elisemthethweni le-SASSA elilinganiselwe ngoziro."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikukhumbuza ukuthi isayithi elisemthethweni le-SASSA ngeke likubize ngedatha, likunikeza ukuzethemba kokusebenzisa isiphequluli sakho esijwayelekile ngokuphephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages"
      },
      {
        "title": "I-FAQ: Kungani abasebenzisi besesha uhlelo lokusebenza lwe-Moya ngosizo lwe-R350?",
        "body": "Ngoba ziphelelwe yidatha futhi zidinga indlela yamahhala yokuhlola isimo sazo."
      },
      {
        "title": "I-FAQ: Ingabe ukufaneleka kohlelo lokusebenza kufakazela isimo esisemthethweni?",
        "body": "Cha. Uhlelo lokusebenza isiphequluli nje; iwebhusayithi engaphakathi kuyo kusafanele iqinisekiswe ngokusemthethweni."
      },
      {
        "title": "I-FAQ: Ingabe ngidinga uhlelo lokusebenza ukuhlola isimo sami mahhala?",
        "body": "Cha. Isayithi elisemthethweni le-srd.sassa.gov.za lilinganiselwe futhi ngeke likukhokhise idatha kumanethiwekhi amaningi amakhulu."
      }
    ]
  },
  "how-to-use-app-based-r350-information-safely": {
    "title": "Ungalusebenzisa kanjani ulwazi olususelwe kuhlelo lokusebenza lwe-R350 ngokuphepha",
    "summary": "Umhlahlandlela wokuphepha wabasebenzisi abafunda iseluleko se-SASSA kuzinhlelo zokusebenza zezinkampani zangaphandle, echaza umehluko obalulekile phakathi kweseluleko sokufunda nokuthatha isinyathelo esisemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Kuhle kakhulu ukufunda izindaba noma imihlahlandlela mayelana nesibonelelo sakho se-R350 kuhlelo lokusebenza, kodwa akufanele neze ufake inombolo yakho ye-ID, iphasiwedi, noma imininingwane yasebhange kulolo hlelo lokusebenza. Ngaso sonke isikhathi iya kuwebhusayithi esemthethweni ukuze uthathe isinyathelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izinhlelo zokusebenza namawebhusayithi azimele (njenge-GrantCare) alungele ukufunda. Kodwa ababona uhulumeni. Uma uhlelo lokusebenza luzama ukusuka ku-'giving advice' ukuya ku-'processing your grant', lweqa umugqa oyingozi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma udida uhlelo lokusebenza lwezemfundo nephothali esemthethweni, uzonikezela imininingwane yakho ebucayi komunye umuntu. Lokhu kubeka ubuwena kanye nemali yakho yesibonelelo engozini enkulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Sebenzisa izinhlelo zokusebenza noma amasayithi azimele ukuze ufunde ukuthi inqubo isebenza kanjani.\n2. Uma usulungele ukufaka isicelo, isikhalazo, noma uhlole isimo sakho, vala uhlelo lokusebenza.\n3. Vula isiphequluli sewebhu socingo lwakho (Chrome, Safari).\n4. Thayipha u-srd.sassa.gov.za kubha yekheli ngokwakho.\n5. Yenza isenzo ngokuphephile kusayithi likahulumeni elisemthethweni."
      },
      {
        "title": "Funda noma yikuphi, sebenzisa kuphela ku-.gov.za",
        "body": "Cabanga ngezinhlelo zokusebenza ezizimele njengomtapo wolwazi lapho ufunda khona mayelana nokubhanga. Kodwa uma sekuyisikhathi sokufaka imali yakho, kufanele ungene ebhange elisemthethweni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwulandela ngokuqinile lo mthetho. Sihlinzeka ngelabhulali yolwazi, kodwa asilokothi sikucele i-ID yakho noma sizame ukukucubungula isibonelelo sakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikugcina uphephile ngokumaka ngokucacile umngcele phakathi kwezemfundo nesenzo sikahulumeni esisemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-moya-app-searches-usually-mean-for-r350\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-check-srd-status-online\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-apply-without-using-unofficial-websites"
      },
      {
        "title": "I-FAQ: Ingabe ulwazi olusekelwe kuhlelo lokusebenza lusengaba usizo?",
        "body": "Yebo, iseluleko sokufunda nemihlahlandlela kuyasiza kakhulu, inqobo nje uma ungasebenzisi uhlelo lokusebenza ukuthumela isicelo sakho sangempela."
      },
      {
        "title": "I-FAQ: Iyiphi ingozi enkulu?",
        "body": "Ingozi enkulu ukufaka inombolo yakho kamazisi ohlelweni lokusebenza olungaphethwe uhulumeni."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngaphambi kokufaka noma yimiphi imininingwane?",
        "body": "Vala uhlelo lokusebenza bese uye ngqo kuwebhusayithi esemthethweni kahulumeni."
      }
    ]
  },
  "when-to-use-contact-details-instead-of-status-check": {
    "title": "Isetshenziswa nini imininingwane yokuxhumana esikhundleni sokuhlola isimo",
    "summary": "Umhlahlandlela wesinqumo ongakusiza wazi ukuthi sekuyisikhathi sokuyeka ukuhlola isimo sakho ku-inthanethi futhi uqale ukushayela i-SASSA ukuze uthole ukungenelela okuqondile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma isimo sakho sibambeke ku-'Pending' izinsuku ezingaphezu kwezingu-90, noma uma imininingwane yakho yasebhange ishintshiwe ngaphandle kwemvume yakho, yeka ukuhlola isimo sakho bese ushayela ngokushesha inombolo yamahhala ethi SASSA (0800 60 10 11)."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Iphothali yokuhlola isimo ikutshela kuphela ukuthi ikhompuyutha icabangani njengamanje. Ayikwazi ukulungisa amaphutha. Uma kukhona ukubambezeleka okukhulu noma inkinga yokukhwabanisa, ukuvuselela ikhasi ngokuphindaphindiwe ngeke kusize. Udinga umuntu ozongenelela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi bamosha izinyanga ngokubheka isimo sabo nsuku zonke, ngethemba lokuthi kuzoshintsha. Ukubona lapho isistimu ezenzakalelayo yehlulekile kukongela isikhathi futhi kwenza inkinga yakho ifinyelele othile ongasiza ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ingabe isimo sakho sesilinde isikhathi esingaphezu kwezinyanga ezi-3? Uma kunjalo, shayela.\n2. Ingabe isimo sakho sithi 'Approved' kodwa awukaholi izinyanga ezi-2? Uma kunjalo, shayela.\n3. Ngabe usola ukuthi kukhona othola imali yakho? Uma kunjalo, shayela ngokushesha.\n4. Uma ushayela ku-0800 60 10 11, yiba nenombolo yakho kamazisi isilungile.\n5. Bhala phansi inombolo yereferensi i-ejenti ekunika yona ngaphambi kokuvala ucingo."
      },
      {
        "title": "Amakhompiyutha abika, abantu bayaxazulula",
        "body": "Iwebhusayithi iyintatheli ezenzakalelayo. Ayikwazi ukulungisa ifayela eliphukile. Uma ifayela libhajwe, kufanele uxhumane nesikhulu esingumuntu ukuze uliphushele phambili mathupha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuxhumana ne-SASSA esikhundleni sakho. Imithetho yobumfihlo ibeka ukuthi wena, ofake isicelo, kufanele ushayele wena ucingo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza imigqa yesikhathi evamile yoshintsho lwesimo ukuze wazi kahle ukuthi ukubambezeleka sekungajwayelekile nini ukuze kugunyazwe ucingo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/where-to-confirm-payment-problems-officially"
      },
      {
        "title": "I-FAQ: Ngazi kanjani uma ukuhlolwa kwesimo kungasaneli?",
        "body": "Uma isimo sakho sihlala singashintshile ngaphezu kwesikhathi esijwayelekile sokucubungula, noma uma ubona ukukhwabanisa okusobala njengemininingwane yasebhange eshintshile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyiqoqe ngaphambi kokuthi ngixhumane?",
        "body": "Inombolo yakho kamazisi, inombolo yocingo obhalise ngayo, kanye negama eliqondile lesimo obambelele kuso."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare isengasiza ngemva kokuxhumana kwami?",
        "body": "Yebo. Ngemva kokukhuluma nomenzeli, ungasebenzisa imihlahlandlela yethu ukuze uqonde amagama obuchwepheshe abawasebenzisile noma izinyathelo ezilandelayo abazincomile."
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

export const SEO_BATCH_TWELVE_GUIDES = SEO_BATCH_TWELVE_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
