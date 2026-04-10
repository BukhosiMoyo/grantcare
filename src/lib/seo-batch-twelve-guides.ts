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

export const SEO_BATCH_TWELVE_GUIDES = [
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
      "A practical office-visit checklist guide for users who have decided that in-person help is the next best step.",
    quickAnswer:
      "Prepare for a SASSA office visit by confirming the reason for the trip, gathering the relevant records, and making sure you can explain the issue clearly.",
    whatThisMeans:
      "An office visit works best when the issue is already narrowed down. If you travel without a clear reason or without the records that explain the problem, the visit may become harder than it needs to be.",
    whyThisMatters:
      "Good preparation reduces repeated trips and helps users speak more clearly about the problem they need help with.",
    steps:
      "1. Write down the issue in one or two clear sentences.\n2. Bring the records, dates, and wording linked to the issue.\n3. Confirm the office details through official routes.\n4. Keep any ID or supporting documents that may be relevant.\n5. Note any recent official actions or changes before you go.",
    keyFocusTitle: "Clarity makes the visit more useful",
    keyFocus:
      "The more clearly you can explain the problem, the easier it is for the visit to move beyond confusion and toward the next real step.",
    important:
      "GrantCare can help you prepare for the visit, but it cannot replace the official in-person help itself.",
    help:
      "GrantCare can help you organise the wording, dates, and problem type so your office visit starts from a clearer place.",
    related:
      "Useful next pages:\n• /guides/what-to-check-before-visiting-a-sassa-office\n• /guides/how-to-find-a-sassa-office-near-you-safely\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-find-official-contact-details-safely\n• /guides/when-to-use-a-sassa-office-instead-of-the-portal",
    faqs: [
      {
        question: "Why should I write the issue down first?",
        answer: "Because it helps you explain the problem more clearly and keeps the visit focused.",
      },
      {
        question: "What records help most?",
        answer: "The records that show what happened, when it happened, and what wording or updates you saw.",
      },
      {
        question: "Should I confirm the office details before travelling?",
        answer: "Yes. That helps you avoid wasted time and travel.",
      },
    ],
    sortOrder: 256,
  }),
  guide({
    slug: "what-the-search-for-a-sassa-app-usually-means",
    title: "What the search for a SASSA app usually means",
    summary:
      "A guide to why users search for a SASSA app and how to turn that search into a safer route without assuming every app result is official.",
    quickAnswer:
      "A search for a SASSA app usually means the user wants faster, simpler mobile access. The safest next step is to confirm whether you really need an app or whether the correct official website route already covers the task.",
    whatThisMeans:
      "People often search for an app because a mobile website feels harder or because they want one easy button for status, payment, or applications. That search intent is understandable, but it can bring up pages that are not clearly official.",
    whyThisMatters:
      "If users assume any app result is official, they may trust the wrong route too quickly. App-style convenience should never remove the trust check.",
    steps:
      "1. Decide what task you want to complete.\n2. Check whether the official website route already covers that task.\n3. Be cautious with app results that do not clearly show official ownership.\n4. Avoid entering details into an app you have not verified.\n5. Use GrantCare to work out the right route before you install or open anything.",
    keyFocusTitle: "The app search is really a convenience search",
    keyFocus:
      "Most users are not looking for an app for its own sake. They are looking for a simpler way to finish a task. The safest move is to keep the task clear before trusting the app result.",
    important:
      "GrantCare is not a government app and does not pretend to be one. It helps users think more clearly about what route they actually need.",
    help:
      "GrantCare can help you decide whether a task should happen on an official website, official portal, contact route, or office route before you go looking for an app shortcut.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Why do users search for a SASSA app?",
        answer: "Usually because they want a simpler mobile route for a grant-related task.",
      },
      {
        question: "Does an app result automatically mean official access?",
        answer: "No. It still needs the same trust checks as a website result.",
      },
      {
        question: "What should I decide first?",
        answer: "Decide the task first, then decide whether you truly need an app route.",
      },
    ],
    sortOrder: 257,
  }),
  guide({
    slug: "what-the-search-for-an-srd-sassa-app-usually-means",
    title: "What the search for an SRD SASSA app usually means",
    summary:
      "A practical guide to SRD app-style searches and why users should stay focused on the official task route instead of only the app idea.",
    quickAnswer:
      "A search for an SRD-style app usually means the user wants quick mobile access to status, application, or payment information. The safest next step is to confirm the official route for the task before trusting any app result.",
    whatThisMeans:
      "SRD users often search on mobile and under pressure, so app-style queries are common. That does not always mean an app is the correct or safest answer for the task.",
    whyThisMatters:
      "If convenience becomes the only goal, users may stop checking whether the route is official. That is where confusion and risk start to grow.",
    steps:
      "1. Decide whether your task is status, payment, appeal, or application related.\n2. Check the official route for that task first.\n3. Be cautious with app-style search results that are not clearly official.\n4. Avoid entering personal details into uncertain tools.\n5. Use GrantCare to compare the official task routes before you continue.",
    keyFocusTitle: "The task still matters more than the app idea",
    keyFocus:
      "Most SRD app searches are really searches for speed. The safest answer is still to match the task to the correct official route before you trust the app result.",
    important:
      "GrantCare does not operate as an official SRD app. It remains clearly separate from official government systems and actions.",
    help:
      "GrantCare can help you narrow SRD-related tasks into the right official status, appeal, payment, or application route before you click an app-looking result.",
    related:
      "Useful next pages:\n• /guides/what-the-srd-portal-is-for\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages\n• /guides/how-to-know-if-a-sassa-app-is-official",
    faqs: [
      {
        question: "Why are SRD app searches so common?",
        answer: "Because many users want quick mobile access to urgent grant-related tasks.",
      },
      {
        question: "Should I trust an SRD app result without checking the route?",
        answer: "No. Confirm the official task route first.",
      },
      {
        question: "What should I compare before I proceed?",
        answer: "Compare the task you need with the official route that actually handles it.",
      },
    ],
    sortOrder: 258,
  }),
  guide({
    slug: "how-to-know-if-a-sassa-app-is-official",
    title: "How to know if a SASSA app is official",
    summary:
      "A trust guide for checking whether an app claiming to help with SASSA-related tasks is truly official or just using familiar grant language.",
    quickAnswer:
      "Know if a SASSA-related app is official by checking whether it clearly matches an official route, avoiding vague app claims, and being cautious before entering any personal details.",
    whatThisMeans:
      "App results can look polished and trustworthy, especially on mobile. That can make users less careful about checking whether the app is really the official route for the task they want.",
    whyThisMatters:
      "An uncertain app can create the same problems as an uncertain website, and sometimes more, because users may trust it quickly and keep returning to it.",
    steps:
      "1. Check whether the app clearly matches an official route.\n2. Be cautious with vague promises or copied grant wording.\n3. Avoid entering personal details until the route is confirmed.\n4. Compare the app result with the known official website or portal route.\n5. Use GrantCare if you need help deciding whether the task should happen on an official app or website at all.",
    keyFocusTitle: "Official-looking design is not proof",
    keyFocus:
      "An app can look clean, modern, and convincing without actually being the right official route. Design is not the same thing as official authority.",
    important:
      "GrantCare is independent and does not claim to be an official app. It helps users think through app safety without pretending to be the official answer.",
    help:
      "GrantCare can help you compare app results with official website and portal routes so you stay focused on the real task instead of the most convenient-looking option.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-a-sassa-app-usually-means\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/should-you-use-a-sassa-app-or-the-website\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Can a polished app still be unofficial?",
        answer: "Yes. Good design alone does not prove official ownership or the correct task route.",
      },
      {
        question: "Should I enter personal details before I confirm the app?",
        answer: "No. Confirm the route first.",
      },
      {
        question: "What should I compare the app with?",
        answer: "Compare it with the known official website or portal route for the task.",
      },
    ],
    sortOrder: 259,
  }),
  guide({
    slug: "should-you-use-a-sassa-app-or-the-website",
    title: "Should you use a SASSA app or the website",
    summary:
      "A decision guide to help users choose between app-style access and official website routes without chasing convenience at the cost of trust.",
    quickAnswer:
      "Use the route that clearly matches the official task. If the website or portal already handles the task safely, that is often the better starting point than guessing with an app result.",
    whatThisMeans:
      "Users often frame the decision as app or website, but the more useful question is which route clearly handles the task safely and officially. That may vary by what you are trying to do.",
    whyThisMatters:
      "A website can feel slower but be safer. An app can feel easier but be less clear. The decision should come from the task and trust level, not only convenience.",
    steps:
      "1. Define the task first.\n2. Check the known official website or portal route.\n3. Compare whether an app route is clearly official and necessary.\n4. Avoid choosing only on speed or familiarity.\n5. Use GrantCare to clarify the task if you are still unsure.",
    keyFocusTitle: "Convenience is not the only decision factor",
    keyFocus:
      "The safest route is the one that clearly fits the task and clearly belongs to the official system. That matters more than whether it looks like an app or a website.",
    important:
      "GrantCare is independent and does not tell users to replace official actions with unofficial app shortcuts.",
    help:
      "GrantCare can help you decide which official route fits the task before you start comparing app convenience with website familiarity.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-open-the-sassa-website-on-mobile\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-services-sassa-gov-za-safely\n• /guides/what-the-search-for-a-sassa-app-usually-means",
    faqs: [
      {
        question: "Should I always choose the app because it feels easier?",
        answer: "No. Choose the route that clearly and safely handles the task.",
      },
      {
        question: "Is the website often a safer starting point?",
        answer: "Yes, especially when it is clearly the known official route for the task.",
      },
      {
        question: "What should guide the decision most?",
        answer: "The task, the trust level of the route, and whether the route is clearly official.",
      },
    ],
    sortOrder: 260,
  }),
  guide({
    slug: "what-moya-app-searches-usually-mean-for-r350",
    title: "What Moya app searches usually mean for R350",
    summary:
      "A plain-language guide to why users search for Moya app and R350 together, and how to keep that search safe and realistic.",
    quickAnswer:
      "Moya app and R350 searches usually mean users want a lighter-data or easier mobile route. The safest move is still to confirm the official task route before trusting any app-based path.",
    whatThisMeans:
      "Users often connect R350 help with app searches when they want a simpler mobile experience. That does not automatically mean the app route is the official action route for the task they need.",
    whyThisMatters:
      "If users assume an app mention equals an official process, they can confuse convenience with authority. That is where misunderstandings start.",
    steps:
      "1. Decide the exact R350-related task.\n2. Check the official route that handles it.\n3. Treat app mentions as possible convenience routes, not automatic proof of official action.\n4. Avoid entering personal details on uncertain pages.\n5. Use GrantCare to compare the task with the right official route before you continue.",
    keyFocusTitle: "App interest often starts with data and ease",
    keyFocus:
      "Many users are really searching for a lighter, easier mobile path. That need is valid, but it still should not replace the trust check on the route itself.",
    important:
      "GrantCare does not present itself as an official app route and does not replace official SRD or R350 systems.",
    help:
      "GrantCare can help you keep the focus on the real task, which makes it easier to decide whether the app-related result is even relevant.",
    related:
      "Useful next pages:\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-use-srd-status-check-safely\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-know-if-a-sassa-app-is-official\n• /guides/how-to-find-official-portal-updates-without-fake-login-pages",
    faqs: [
      {
        question: "Why do users search Moya app with R350 help?",
        answer: "Usually because they want a simpler or lighter-data mobile route.",
      },
      {
        question: "Does app convenience prove official status?",
        answer: "No. You still need to confirm the route and the task.",
      },
      {
        question: "What should I check before using an app-related route?",
        answer: "Check whether the task is actually handled by an official route you can confirm.",
      },
    ],
    sortOrder: 261,
  }),
  guide({
    slug: "how-to-use-app-based-r350-information-safely",
    title: "How to use app-based R350 information safely",
    summary:
      "A safety guide for users who find R350-related information through apps and want to avoid confusing guidance with official action.",
    quickAnswer:
      "Use app-based R350 information safely by treating it as guidance unless you can clearly confirm it belongs to an official route for the task you need.",
    whatThisMeans:
      "Some app-based information can help users understand the process, but that is different from handling official status, application, or payment actions. Mixing those roles together creates confusion.",
    whyThisMatters:
      "Users who trust app-based information too quickly may treat guidance like confirmation, or treat a simple explainer like the official system itself.",
    steps:
      "1. Check what the app is actually showing you.\n2. Decide whether it is guidance or an official action route.\n3. Confirm any official-looking step before entering personal details.\n4. Use official pages for official actions.\n5. Use GrantCare if you need a clear explanation of the wording before you move on.",
    keyFocusTitle: "Guidance and official action must stay separate",
    keyFocus:
      "The safest habit is to let independent guidance remain guidance and official systems remain official systems. Once those lines blur, users lose trust and clarity.",
    important:
      "GrantCare follows that same rule. It is an independent guide and reminder platform, not an official R350 action system.",
    help:
      "GrantCare can help you interpret app-based information without mistaking it for the official route that handles the real action.",
    related:
      "Useful next pages:\n• /guides/what-moya-app-searches-usually-mean-for-r350\n• /guides/what-the-search-for-an-srd-sassa-app-usually-means\n• /guides/how-to-check-srd-status-online\n• /guides/official-status-check-vs-independent-guide\n• /guides/how-to-apply-without-using-unofficial-websites",
    faqs: [
      {
        question: "Can app-based information still be useful?",
        answer: "Yes, if you keep it in the guidance role and do not confuse it with official action.",
      },
      {
        question: "What is the main risk?",
        answer: "The main risk is treating guidance like official confirmation.",
      },
      {
        question: "What should I do before entering any details?",
        answer: "Confirm that the route is truly the official one for the task.",
      },
    ],
    sortOrder: 262,
  }),
  guide({
    slug: "when-to-use-contact-details-instead-of-status-check",
    title: "When to use contact details instead of status check",
    summary:
      "A decision guide for users who are unsure whether their next step is another status check or a move to official contact support.",
    quickAnswer:
      "Use contact details instead of status check when another check is no longer answering the real problem and the issue now needs direct official support or clarification.",
    whatThisMeans:
      "Status checking is useful when the issue is mainly about reading the latest result. Contact support becomes more useful when the issue clearly needs a human response, a correction route, or a more direct follow-up.",
    whyThisMatters:
      "Users often keep checking status because it feels simpler than making contact. Sometimes that helps. Other times it only repeats the same uncertainty and delays the next real step.",
    steps:
      "1. Decide whether a new status check is likely to tell you something new.\n2. Check whether the issue now needs direct clarification or action.\n3. Gather the wording, dates, and records first.\n4. Move to official contact routes if status checking is no longer enough.\n5. Use GrantCare afterward to understand any new wording you receive.",
    keyFocusTitle: "Repeated checking is not always progress",
    keyFocus:
      "The best question is not can I check again. The better question is will another check solve this, or does the problem now need direct official follow-up.",
    important:
      "GrantCare can help you decide between another check and official contact, but it does not replace the official support route once direct action is needed.",
    help:
      "GrantCare can help you tell the difference between a case that still needs interpretation and one that now needs direct contact, which saves time and frustration.",
    related:
      "Useful next pages:\n• /guides/how-to-find-official-contact-details-safely\n• /guides/how-to-use-sassa-contact-numbers-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/where-to-confirm-payment-problems-officially",
    faqs: [
      {
        question: "How do I know when status checks are no longer enough?",
        answer: "When repeated checks do not change the picture and the issue clearly needs direct clarification or action.",
      },
      {
        question: "What should I gather before I make contact?",
        answer: "Gather the wording, dates, and any records that explain what has already happened.",
      },
      {
        question: "Can GrantCare still help after I make contact?",
        answer: "Yes. It can help you understand the new wording or next-step message you receive afterward.",
      },
    ],
    sortOrder: 263,
  }),
];
