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

const SEO_BATCH_THIRTEEN_GUIDES_SOURCE = [
  guide({
    slug: "how-to-check-if-an-online-application-link-is-official",
    title: "How to check if an online application link is official",
    summary:
      "A trust-first guide for checking whether an online application link really belongs to the official route before you use it.",
    quickAnswer:
      "Check whether an online application link is official by matching the link to the task, checking the address carefully, and not trusting copied application wording on its own.",
    whatThisMeans:
      "Many users search for an application link because they want the quickest route to start. That urgency can make a copied or unclear link look more trustworthy than it really is.",
    whyThisMatters:
      "If the link is wrong, everything after it becomes less safe. That is why link-checking matters before you think about forms, login, or submission.",
    steps:
      "1. Decide what grant-related task the link claims to handle.\n2. Check the address carefully.\n3. Compare it with the known official route for that task.\n4. Avoid entering details if the source still feels unclear.\n5. Use GrantCare to confirm the type of official page you need before trying again.",
    keyFocusTitle: "A good-looking link is not enough",
    keyFocus:
      "Application links often feel trustworthy because they use familiar words. The safer test is whether the link clearly belongs to the official route for the exact task you need.",
    important:
      "GrantCare is an independent information platform. It does not replace official application routes and should never be mistaken for the official application page itself.",
    help:
      "GrantCare can help you work out whether you need an application page, a status page, or another official route before you trust the link you found.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-sassa-online-application-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-know-if-a-sassa-website-is-official",
    faqs: [
      {
        question: "Why should I check the task before the link?",
        answer: "Because the right link depends on the exact task you are trying to complete.",
      },
      {
        question: "Can copied grant wording make a link look official?",
        answer: "Yes. Familiar wording is not proof on its own.",
      },
      {
        question: "What should I do if the link still feels unclear?",
        answer: "Step back and confirm the right official route before entering anything.",
      },
    ],
    sortOrder: 264,
  }),
  guide({
    slug: "how-to-use-sassa-online-application-safely",
    title: "How to use SASSA online application safely",
    summary:
      "A simple guide to using online application pages carefully without confusing preparation, guidance, and official submission.",
    quickAnswer:
      "Use an online application safely by confirming the grant type first, opening the correct official route, and treating independent guides only as preparation support.",
    whatThisMeans:
      "Online application searches often happen when users want a simple first step. The safest start is not just finding any form. It is matching the right form to the right grant route.",
    whyThisMatters:
      "If users rush into the wrong application page, later status, document, and payment questions become harder to untangle.",
    steps:
      "1. Confirm which grant or support type fits your case.\n2. Gather the likely documents before you start.\n3. Open the correct official application route.\n4. Save any confirmation or reference once you submit.\n5. Use GrantCare afterward if you need help understanding what happens next.",
    keyFocusTitle: "Safety starts with the right route",
    keyFocus:
      "The safest online application habit is simple: the right grant, the right official page, and clear separation between guidance and official action.",
    important:
      "GrantCare cannot submit an official application for you. It helps you prepare and understand the process, but the actual application still belongs to the official route.",
    help:
      "GrantCare can help you compare grant types, prepare documents, and move from application questions into status and payment guides later on.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /eligibility-checker",
    faqs: [
      {
        question: "Can GrantCare submit the application for me?",
        answer: "No. It helps you prepare, but official submission still happens on the official route.",
      },
      {
        question: "Why should I confirm the grant type first?",
        answer: "Because the correct application route depends on the grant or support type.",
      },
      {
        question: "What should I save after submission?",
        answer: "Save the official confirmation or reference if the system gives you one.",
      },
    ],
    sortOrder: 265,
  }),
  guide({
    slug: "how-to-start-an-r350-online-application-safely",
    title: "How to start an R350 online application safely",
    summary:
      "A mobile-friendly guide to beginning an R350-style online application without confusing official action with independent guidance.",
    quickAnswer:
      "Start an R350-style online application safely by confirming that the support type fits your situation, then moving to the correct official route for the actual application step.",
    whatThisMeans:
      "R350-related application searches are usually urgent. That makes users more likely to click quickly and less likely to separate preparation from official submission.",
    whyThisMatters:
      "A rushed start can create mistakes that later show up as confusion, status anxiety, or missing details.",
    steps:
      "1. Confirm that the support type fits your situation.\n2. Prepare your key details and documents.\n3. Open the correct official application route.\n4. Submit carefully and save any reference provided.\n5. Use GrantCare later for status, payment, or next-step explanations.",
    keyFocusTitle: "Urgency is not the same as readiness",
    keyFocus:
      "R350-related applications often feel urgent, but the safest start still comes from checking the right route and preparing properly before you submit.",
    important:
      "GrantCare is independent and not the official R350 or SRD application system. It should not be treated as the official application page.",
    help:
      "GrantCare can help you decide whether the support type fits, what documents may matter, and how to read the result after the official application begins.",
    related:
      "Useful next pages:\n• /guides/how-to-apply-online-for-social-relief\n• /guides/social-relief-who-may-qualify\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-check-srd-status-online",
    faqs: [
      {
        question: "Should I use the first R350 application link I see?",
        answer: "No. Confirm the official route first.",
      },
      {
        question: "What should I prepare before starting?",
        answer: "Prepare the key details and likely documents linked to the application.",
      },
      {
        question: "What happens after I submit?",
        answer: "Save your reference and use the official route for updates, then use GrantCare for explanations if needed.",
      },
    ],
    sortOrder: 266,
  }),
  guide({
    slug: "how-to-use-an-r370-application-page-safely",
    title: "How to use an R370 application page safely",
    summary:
      "A guide for users who search for R370 application pages and need a safer way to separate official routes from copied or unclear links.",
    quickAnswer:
      "Use an R370-style application page safely by confirming the official route for the support you are applying for and not relying on copied page claims alone.",
    whatThisMeans:
      "R370-style searches often reflect changing public wording or year-based references. That makes it even more important to match the page to the current official task rather than the most familiar number in a search result.",
    whyThisMatters:
      "Users can lose time by chasing page labels instead of confirming what support route the page really handles.",
    steps:
      "1. Check what support type the page is actually referring to.\n2. Confirm the official route for that support type.\n3. Avoid trusting a page only because it uses a familiar amount.\n4. Save the correct official route once confirmed.\n5. Use GrantCare if you need help interpreting the wording around the application.",
    keyFocusTitle: "The route matters more than the amount label",
    keyFocus:
      "A familiar amount in a search result is not enough to prove that the page is the right official route. The underlying support type and official task matter more.",
    important:
      "GrantCare does not operate official application pages. It helps users interpret changing search language without mistaking it for official authority.",
    help:
      "GrantCare can help you translate amount-based searches into the right official support route before you use any application page.",
    related:
      "Useful next pages:\n• /guides/how-to-start-an-r350-online-application-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-understand-r370-application-status-safely\n• /guides/how-to-check-370-application-pages-safely",
    faqs: [
      {
        question: "Why should I not trust the amount label alone?",
        answer: "Because a familiar number does not prove the page is the correct official route.",
      },
      {
        question: "What should I confirm first?",
        answer: "Confirm the actual support type and the official route that handles it.",
      },
      {
        question: "Can GrantCare tell me whether the page is safe?",
        answer: "It can guide you on what to check, but official confirmation still depends on the route itself.",
      },
    ],
    sortOrder: 267,
  }),
  guide({
    slug: "how-to-use-online-application-login-safely",
    title: "How to use online application login safely",
    summary:
      "A safety guide for users who search for online application login pages and need to avoid fake login screens or rushed mistakes.",
    quickAnswer:
      "Use online application login safely by confirming the page first, checking that the login belongs to the official route for your task, and not entering details on uncertain pages.",
    whatThisMeans:
      "Application login pages often feel urgent because users think one login will solve everything. In practice, the page still needs the same trust checks as any other official route.",
    whyThisMatters:
      "A wrong login page is more dangerous than a wrong information page because users may hand over details before they realise the route is unclear.",
    steps:
      "1. Confirm the task first.\n2. Open the known official login route for that task.\n3. Check the address carefully.\n4. Enter details only if the page clearly matches the official route.\n5. Stop and recheck if the page feels unfamiliar or too different from the task you expected.",
    keyFocusTitle: "Login safety depends on task clarity",
    keyFocus:
      "The safest login habit is to know exactly what task you are signing in for. That makes it easier to spot when the page does not match what you actually need.",
    important:
      "GrantCare does not handle official login actions. It helps users reach the correct official route safely and understand what comes after login.",
    help:
      "GrantCare can help you decide whether you need a true login route, a status page, or an information page before you start typing details.",
    related:
      "Useful next pages:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/what-sassa-portal-login-is-for\n• /guides/what-to-do-if-online-application-login-is-not-working\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-keep-your-portal-login-details-safe",
    faqs: [
      {
        question: "Why is task clarity so important before login?",
        answer: "Because the correct login page depends on the task you are trying to complete.",
      },
      {
        question: "Should I log in on a page that only looks familiar?",
        answer: "No. Confirm the route first.",
      },
      {
        question: "What should I do if the page feels wrong?",
        answer: "Stop and recheck the official route before continuing.",
      },
    ],
    sortOrder: 268,
  }),
  guide({
    slug: "what-to-do-if-online-application-login-is-not-working",
    title: "What to do if online application login is not working",
    summary:
      "A troubleshooting guide for official online application login problems, focused on safe next steps instead of guesswork.",
    quickAnswer:
      "If online application login is not working, first confirm the route and the page itself before you assume the problem is with your application or details.",
    whatThisMeans:
      "A login problem may come from the page, the route, the connection, or the sign-in step itself. It should not automatically be treated as an application problem.",
    whyThisMatters:
      "Users who guess repeatedly on the wrong page can create more stress without getting closer to the real problem.",
    steps:
      "1. Confirm that you are on the correct official login page.\n2. Retry carefully instead of rushing repeated attempts.\n3. Check the connection and page load.\n4. Keep a note of what step is failing.\n5. Use official support routes if the confirmed official login still does not work.",
    keyFocusTitle: "Login trouble is not the same as application trouble",
    keyFocus:
      "The most useful distinction is between access trouble and case trouble. Login failure usually belongs to access first, not to your actual application result.",
    important:
      "GrantCare cannot fix official login access. It helps users avoid unsafe workarounds and think through the problem more clearly.",
    help:
      "GrantCare can help you separate login issues from application-status issues, which makes the next step easier to judge.",
    related:
      "Useful next pages:\n• /guides/how-to-use-online-application-login-safely\n• /guides/what-to-do-if-you-cannot-log-in-to-the-sassa-portal\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Does a login problem mean my application failed?",
        answer: "No. It usually points to an access issue first.",
      },
      {
        question: "Why should I stop repeated guessing?",
        answer: "Because repeated guessing can make the situation more confusing without fixing the real problem.",
      },
      {
        question: "When should I use official support?",
        answer: "Use it when the confirmed official login still does not work after careful retrying.",
      },
    ],
    sortOrder: 269,
  }),
  guide({
    slug: "how-to-find-an-official-application-status-page-safely",
    title: "How to find an official application status page safely",
    summary:
      "A guide to finding the right official application-status page without confusing it with a general guide, a copied link, or the wrong portal.",
    quickAnswer:
      "Find an official application-status page safely by matching the page to the grant or support type first, then confirming the route before you enter any details.",
    whatThisMeans:
      "Application-status pages can look similar to general status-check guides, but the correct route still depends on the exact support type and official process you are trying to follow.",
    whyThisMatters:
      "A wrong status page can produce confusion even before you see the result. Safe page matching matters before interpretation begins.",
    steps:
      "1. Identify the support type you are checking.\n2. Look for the official status route linked to that type.\n3. Confirm the page address and purpose.\n4. Avoid using copied links with no clear source.\n5. Use GrantCare only to interpret the result after the official page gives it.",
    keyFocusTitle: "The correct status page starts with the correct category",
    keyFocus:
      "Application-status searching works best when it starts with the support type, not just the word status. That one shift removes a lot of confusion.",
    important:
      "GrantCare is not the official status page. It helps users find the right official route and understand the wording they see there.",
    help:
      "GrantCare can help you narrow the task, choose the right status route, and understand what the result means once the official page shows it.",
    related:
      "Useful next pages:\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-avoid-fake-application-status-pages\n• /status",
    faqs: [
      {
        question: "Why should I start with the support type?",
        answer: "Because the correct official status route may depend on what kind of support you applied for.",
      },
      {
        question: "Should I trust a copied status link?",
        answer: "No. Confirm the source and the route first.",
      },
      {
        question: "What should I do after I find the page?",
        answer: "Use the official page for the check, then use GrantCare if you need help reading the result.",
      },
    ],
    sortOrder: 270,
  }),
  guide({
    slug: "what-to-do-after-you-submit-an-online-application",
    title: "What to do after you submit an online application",
    summary:
      "A calm guide to the first steps after online submission so users do not lose their reference or start guessing too early.",
    quickAnswer:
      "After you submit an online application, save the confirmation or reference, note the date, and give the official system time before you start checking for updates.",
    whatThisMeans:
      "Submission is the end of one stage, not the end of the whole process. The next stage is usually waiting for official movement, which is easier to handle if the records are clear.",
    whyThisMatters:
      "Users often move straight from submission into anxious checking and forget to save the information that proves the application was actually sent.",
    steps:
      "1. Save the confirmation or reference.\n2. Note the submission date.\n3. Keep the main details and screenshots together.\n4. Wait for the proper status-check window instead of checking too early.\n5. Use GrantCare if you need help understanding the next status or payment step later on.",
    keyFocusTitle: "Submission should leave you with a record",
    keyFocus:
      "The most useful thing after submission is not more clicking. It is a clear record that shows the application went through and when it happened.",
    important:
      "GrantCare cannot confirm official submission from inside the official system. It can only help you understand the next steps once you have your own official record.",
    help:
      "GrantCare can help you move from submission into status checking, payment timing, and reminder setup without losing track of the basics.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-check-application-status-on-mobile\n• /guides/how-grant-reminders-can-help\n• /dashboard",
    faqs: [
      {
        question: "What should I save first?",
        answer: "Save the confirmation or reference the official system gives you.",
      },
      {
        question: "Why note the submission date?",
        answer: "Because it helps you judge the timing of later status checks and updates.",
      },
      {
        question: "Should I check status immediately after submitting?",
        answer: "Usually it helps to give the official system some time first.",
      },
    ],
    sortOrder: 271,
  }),
  guide({
    slug: "how-to-check-if-your-online-application-was-submitted",
    title: "How to check if your online application was submitted",
    summary:
      "A practical guide to checking whether online submission actually went through before you start worrying about status updates.",
    quickAnswer:
      "Check whether your online application was submitted by looking for the official confirmation, reference, or final submission step rather than guessing from memory.",
    whatThisMeans:
      "Users sometimes leave a page too quickly, lose the last screen, or feel unsure whether the final submit step really happened. The best clue is the official confirmation, not the feeling that it probably went through.",
    whyThisMatters:
      "If submission never completed, later status checking will only create more confusion. That is why confirming submission matters first.",
    steps:
      "1. Look for the official confirmation or reference.\n2. Check whether you reached the final submission step.\n3. Save any confirmation screens or messages.\n4. Keep the submission date on record.\n5. Use the official route again only if you genuinely cannot confirm submission.",
    keyFocusTitle: "Confirmation matters more than memory",
    keyFocus:
      "A lot of confusion starts because users rely on memory instead of the official confirmation. A clear record is much more useful than guessing later.",
    important:
      "GrantCare cannot see inside the official application system. It helps users know what evidence of submission is worth keeping.",
    help:
      "GrantCare can help you pair submission confirmation with later status and payment guides so you do not skip ahead too soon.",
    related:
      "Useful next pages:\n• /guides/what-to-do-after-you-submit-an-online-application\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/how-to-keep-records-after-reapplying",
    faqs: [
      {
        question: "What is the best sign that submission went through?",
        answer: "The best sign is the official confirmation or reference from the final submission step.",
      },
      {
        question: "Why should I save the confirmation screen?",
        answer: "Because it helps prove what happened if you later feel unsure.",
      },
      {
        question: "What if I have no confirmation at all?",
        answer: "Recheck carefully before assuming submission completed.",
      },
    ],
    sortOrder: 272,
  }),
  guide({
    slug: "how-to-move-from-application-to-status-check",
    title: "How to move from application to status check",
    summary:
      "A bridge guide for users who have already applied and want to know when and how to switch into status-checking safely.",
    quickAnswer:
      "Move from application to status check by keeping your submission record, waiting for the right stage, and then using the correct official status route for the support type.",
    whatThisMeans:
      "Application and status checking are linked, but they are not the same stage. Users often jump too quickly from one to the other without first confirming submission or giving the system time to move.",
    whyThisMatters:
      "If you begin status checking too early or on the wrong route, it can feel like nothing is happening even when the issue is only timing.",
    steps:
      "1. Confirm that your application was submitted.\n2. Keep your reference and submission date.\n3. Give the official system time to move to the next stage.\n4. Use the correct official status route for the support type.\n5. Use GrantCare to interpret the wording once the official page shows it.",
    keyFocusTitle: "This is a stage change, not a shortcut",
    keyFocus:
      "Moving into status checking works best when you treat it as the next stage of the same process, not as an instant shortcut to certainty.",
    important:
      "GrantCare helps users understand the handoff between stages, but it does not replace either the official application route or the official status route.",
    help:
      "GrantCare can help you manage the shift from submission into status, then from status into payment guides if your case moves forward.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-check-application-status-on-mobile\n• /guides/how-to-check-your-status-without-making-mistakes",
    faqs: [
      {
        question: "Why should I confirm submission before checking status?",
        answer: "Because status checking is less useful if you are not even sure the application went through.",
      },
      {
        question: "Should I check status immediately after submitting?",
        answer: "Usually it helps to give the official system time first.",
      },
      {
        question: "What route should I use for status?",
        answer: "Use the official status route that matches the support type you applied for.",
      },
    ],
    sortOrder: 273,
  }),
  guide({
    slug: "how-to-read-application-status-after-applying-online",
    title: "How to read application status after applying online",
    summary:
      "A straightforward guide to reading application-status wording after online submission without overreacting to early uncertainty.",
    quickAnswer:
      "Read application status after applying online by checking the exact wording, separating it from payment expectations, and using the message as a stage update rather than a final story.",
    whatThisMeans:
      "After an online application, users often want one simple answer. In practice, the status wording usually shows which stage the case is in rather than answering every later question at once.",
    whyThisMatters:
      "If users treat every early status message as a final outcome, they can panic or act too soon. A stage-based reading is calmer and usually more accurate.",
    steps:
      "1. Read the exact wording on the official page.\n2. Separate application status from payment timing.\n3. Compare the message with the matching GrantCare guide.\n4. Save the wording and date for reference.\n5. Use the official route for the next real action only if the message clearly points to one.",
    keyFocusTitle: "Status is usually a stage message",
    keyFocus:
      "Most early application-status wording is best understood as a progress message. That helps users wait or act for the right reason instead of reacting to fear.",
    important:
      "GrantCare explains status wording in plain language, but official confirmation and official actions still happen on official systems.",
    help:
      "GrantCare can help you compare application-status wording with grant-status meanings, payment guides, and follow-up pages so the result makes more sense.",
    related:
      "Useful next pages:\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-read-your-status-check-result\n• /guides/how-to-check-application-status-on-mobile\n• /status\n• /guides/what-to-do-after-a-status-check-result",
    faqs: [
      {
        question: "Why should I treat status like a stage message?",
        answer: "Because many status messages show progress or waiting rather than a final outcome.",
      },
      {
        question: "Should I mix status and payment questions together?",
        answer: "It helps to separate them, because they usually belong to different stages.",
      },
      {
        question: "What should I save when I read status?",
        answer: "Save the wording and the date you saw it.",
      },
    ],
    sortOrder: 274,
  }),
  guide({
    slug: "how-to-check-application-status-on-mobile",
    title: "How to check application status on mobile",
    summary:
      "A mobile-first guide to checking application status safely on a phone without losing track of the route, wording, or source.",
    quickAnswer:
      "Check application status on mobile by opening the correct official route, checking the page address on your phone, and reading the wording carefully before you close the page.",
    whatThisMeans:
      "Many users do everything on a phone. That makes mobile status checking normal, but it also means less screen space for addresses, notes, and context.",
    whyThisMatters:
      "On a phone it is easier to miss the full address, rush through a result, or forget to save the wording you saw. A slower mobile habit can reduce that.",
    steps:
      "1. Open the correct official status route on your phone.\n2. Check the page address before continuing.\n3. Read the full wording, not only one keyword.\n4. Save a screenshot or note for reference.\n5. Use GrantCare to interpret the result if you need help afterward.",
    keyFocusTitle: "Mobile checking needs one extra pause",
    keyFocus:
      "A short pause to check the address and save the wording matters more on a phone because the smaller screen hides context more easily.",
    important:
      "GrantCare is mobile-friendly, but it is not the official status system. Official checking still belongs to the official route.",
    help:
      "GrantCare can help you turn a quick phone result into a clearer understanding by explaining the wording in simple language after you check it officially.",
    related:
      "Useful next pages:\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/how-to-check-your-status-without-making-mistakes",
    faqs: [
      {
        question: "Why is mobile status checking easier to misread?",
        answer: "Because the smaller screen can hide the address and make users move too quickly.",
      },
      {
        question: "Should I save the wording on my phone?",
        answer: "Yes. A screenshot or note can help you compare it later.",
      },
      {
        question: "What should I do after I see the result?",
        answer: "Use GrantCare to interpret it if the wording still feels unclear.",
      },
    ],
    sortOrder: 275,
  }),
  guide({
    slug: "what-to-do-if-your-application-status-does-not-update",
    title: "What to do if your application status does not update",
    summary:
      "A next-step guide for users whose application status stays the same for too long and no longer feels like normal waiting.",
    quickAnswer:
      "If your application status does not update, first save the wording and date, then decide whether the issue still looks like normal waiting or now needs official follow-up.",
    whatThisMeans:
      "A status that does not change can mean routine waiting, but it can also mean the process has reached a point where another step or clarification may be needed.",
    whyThisMatters:
      "If users react too early, they can create more confusion. If they wait too long when the case clearly needs help, the stress only grows.",
    steps:
      "1. Save the current wording and date.\n2. Check how long the same message has remained.\n3. Compare it with the matching GrantCare status guide.\n4. Keep records of any other changes that happened around it.\n5. Use the official route if the status now clearly needs direct follow-up rather than another wait.",
    keyFocusTitle: "The goal is to judge whether this is still normal waiting",
    keyFocus:
      "A long wait is easier to handle when you can decide whether the same message still fits the stage or whether it now points to a stalled case.",
    important:
      "GrantCare cannot force an official status update. It helps users judge when another wait still makes sense and when the issue may need direct official attention.",
    help:
      "GrantCare can help you compare unchanged status wording with pending, verification, appeal, and payment-delay guides so you stop guessing blindly.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-your-status-does-not-change\n• /guides/how-status-check-pages-can-change-over-time\n• /guides/how-to-find-official-application-status-updates-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /status/pending",
    faqs: [
      {
        question: "Does an unchanged status always mean something is wrong?",
        answer: "No. It can still reflect waiting, but the timing and pattern matter.",
      },
      {
        question: "What should I keep while waiting?",
        answer: "Keep the wording, dates, and any related changes on record.",
      },
      {
        question: "When should I move beyond waiting?",
        answer: "When the unchanged message no longer seems to fit the normal stage of the process.",
      },
    ],
    sortOrder: 276,
  }),
  guide({
    slug: "how-to-read-application-status-after-changing-details",
    title: "How to read application status after changing details",
    summary:
      "A guide to understanding status messages after updating phone, banking, or other application details.",
    quickAnswer:
      "After changing details, read application status with extra caution because the system may still be updating or verifying the new information.",
    whatThisMeans:
      "A detail change can temporarily affect how a status looks. That does not always mean the whole case changed. Sometimes it only means the updated information still needs to settle or verify.",
    whyThisMatters:
      "Users often panic when status wording changes after an update. A calmer reading starts by asking whether the change may simply reflect the update itself.",
    steps:
      "1. Note what detail was changed and when.\n2. Save the new status wording.\n3. Compare the wording with guides about detail updates and verification.\n4. Avoid repeated unnecessary edits.\n5. Use the official route if the new wording clearly points to a separate problem that does not clear.",
    keyFocusTitle: "A status shift after an update needs context",
    keyFocus:
      "The timing of the detail change matters. Without that context, users can misread a temporary verification stage as a bigger failure than it really is.",
    important:
      "GrantCare cannot confirm the internal effect of a detail change on the official system. It can only help users read the surrounding patterns more carefully.",
    help:
      "GrantCare can help you compare changed-details status patterns with phone, bank, and verification guides so the new wording feels less mysterious.",
    related:
      "Useful next pages:\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/what-pending-verification-means\n• /guides/how-to-check-status-after-changing-details\n• /status/banking-issue",
    faqs: [
      {
        question: "Can changing details affect what the status page shows?",
        answer: "Yes. It can sometimes change the wording while the new information is being processed.",
      },
      {
        question: "Should I panic if the wording changes after an update?",
        answer: "No. First compare the change with the timing of your update and the type of detail you changed.",
      },
      {
        question: "What should I avoid doing?",
        answer: "Avoid repeated unnecessary edits before you understand what the first update changed.",
      },
    ],
    sortOrder: 277,
  }),
  guide({
    slug: "how-to-avoid-fake-application-status-pages",
    title: "How to avoid fake application status pages",
    summary:
      "A trust guide to spotting and avoiding fake or misleading application-status pages before you rely on them.",
    quickAnswer:
      "Avoid fake application-status pages by matching the page to the correct official route, checking the address carefully, and not trusting copied status claims without a clear official source.",
    whatThisMeans:
      "Status pages are a common target for confusion because users want quick answers. That makes status-related searches one of the easiest places for copied pages to look convincing.",
    whyThisMatters:
      "A fake status page can create false hope, false panic, or unsafe requests for personal details. That is why source-checking matters before result-checking.",
    steps:
      "1. Confirm the support type and the correct official route.\n2. Check the address carefully.\n3. Avoid trusting pages that only repeat common status words.\n4. Stop if the page asks for unusual details or feels unclear.\n5. Use the official route for the real check and GrantCare for explanation afterward.",
    keyFocusTitle: "Familiar wording is easy to copy",
    keyFocus:
      "The words approved, pending, or declined are not what make a status page official. The route and the source are what matter most.",
    important:
      "GrantCare is independent and says so clearly. It explains status messages, but it never pretends to be the official status page.",
    help:
      "GrantCare can help you identify the type of status route you need so you are less likely to trust a fake page by mistake.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-find-official-status-check-updates-safely\n• /guides/official-status-check-vs-independent-guide",
    faqs: [
      {
        question: "Why are fake status pages so convincing?",
        answer: "Because they often copy the same grant words users expect to see.",
      },
      {
        question: "What matters more than the wording?",
        answer: "The route, the address, and whether the page clearly belongs to the official system.",
      },
      {
        question: "What should I do if a page feels unclear?",
        answer: "Stop and confirm the official route before you continue.",
      },
    ],
    sortOrder: 278,
  }),
  guide({
    slug: "how-to-find-official-application-status-updates-safely",
    title: "How to find official application status updates safely",
    summary:
      "A guide to finding official status updates safely without relying on rumours, screenshots, or copied messages.",
    quickAnswer:
      "Find official application-status updates safely by returning to the correct official status route, checking the message directly, and not depending on second-hand status claims.",
    whatThisMeans:
      "Status updates feel urgent, which is why users often accept copied information too quickly. The safer habit is to check the official route directly instead of trusting someone else’s version of the update.",
    whyThisMatters:
      "A copied update can remove the surrounding context that gives the status its real meaning. That makes it easier to misunderstand what changed.",
    steps:
      "1. Reopen the correct official status route.\n2. Check the current wording directly.\n3. Save the new message and date.\n4. Avoid relying on shared screenshots without source.\n5. Use GrantCare to interpret the wording after the official page gives it.",
    keyFocusTitle: "Direct checking is safer than second-hand updates",
    keyFocus:
      "The safest status update is the one you read yourself on the correct official page. That is what protects the meaning of the message from being stripped away.",
    important:
      "GrantCare can help explain official status updates, but it should never replace official checking itself.",
    help:
      "GrantCare can help users understand whether a new status update changes the stage, the likely next step, or only the wording around the same issue.",
    related:
      "Useful next pages:\n• /guides/how-status-check-pages-can-change-over-time\n• /guides/how-to-read-your-status-check-result\n• /guides/how-to-avoid-fake-application-status-pages\n• /guides/how-to-save-your-status-results-for-reference\n• /status",
    faqs: [
      {
        question: "Why are shared status updates risky?",
        answer: "Because they often remove the source, the date, or the full context of the message.",
      },
      {
        question: "What should I save when I see a new status update?",
        answer: "Save the wording and the date so you can compare it later.",
      },
      {
        question: "What should I do after I read the update?",
        answer: "Use GrantCare to interpret it if the wording still feels unclear.",
      },
    ],
    sortOrder: 279,
  }),
  guide({
    slug: "what-an-application-update-page-usually-means",
    title: "What an application update page usually means",
    summary:
      "A plain-language guide to pages that talk about application updates and what users should look for before treating them as official action pages.",
    quickAnswer:
      "An application update page usually means a page connected to checking, changing, or following an existing application. The safest move is to confirm exactly what kind of update the page handles before you use it.",
    whatThisMeans:
      "Users often search for update when they mean different things: checking status, changing details, or following up on an existing application. That is why update pages can feel unclear at first.",
    whyThisMatters:
      "If you do not know whether the page is for checking, changing, or confirming something, it is easy to use the wrong route.",
    steps:
      "1. Decide whether you mean status update, detail update, or application follow-up.\n2. Check whether the page matches that exact purpose.\n3. Confirm the route before entering anything.\n4. Keep your earlier application reference nearby.\n5. Use GrantCare if you need help understanding what kind of update page you actually need.",
    keyFocusTitle: "Update is a broad word",
    keyFocus:
      "The word update often hides the real task. The safer route appears once you name the task more clearly and match the page to it.",
    important:
      "GrantCare does not serve as an official application update page. It helps users understand which kind of official route may fit the word update in their situation.",
    help:
      "GrantCare can help you separate detail changes, application follow-up, and status checking so you know which official update page to trust.",
    related:
      "Useful next pages:\n• /guides/how-to-read-application-status-after-changing-details\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/what-to-do-after-you-submit-an-online-application\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Why is the word update confusing?",
        answer: "Because it can mean status checking, changing details, or following an existing application.",
      },
      {
        question: "What should I decide first?",
        answer: "Decide what kind of update you are actually trying to make or read.",
      },
      {
        question: "What helps after I identify the task?",
        answer: "Match the page to that exact task before you trust it.",
      },
    ],
    sortOrder: 280,
  }),
  guide({
    slug: "how-reapplication-pages-usually-work",
    title: "How reapplication pages usually work",
    summary:
      "A guide to understanding what reapplication pages are for and how they differ from first-time application routes.",
    quickAnswer:
      "Reapplication pages usually exist for cases where a fresh application step is needed. The key is to confirm that reapplication is really the right step before using the page.",
    whatThisMeans:
      "Reapplication is not always the same as appeal and not always the same as starting from zero. It usually belongs to a specific situation where the official system needs a fresh application stage.",
    whyThisMatters:
      "Users can waste time if they move to reapplication before they understand whether the case actually needs that route.",
    steps:
      "1. Read the latest official wording about your case.\n2. Check whether it clearly points to reapplication.\n3. Confirm the official reapplication route.\n4. Prepare the details and records you may need again.\n5. Use GrantCare if you need help understanding whether reapplication really fits your situation.",
    keyFocusTitle: "Reapplication is a route, not a guess",
    keyFocus:
      "The safest way to approach reapplication is to treat it like a specific official route for a specific case, not like a general shortcut when you feel stuck.",
    important:
      "GrantCare explains reapplication in plain language, but the official reapplication step still belongs to the official system.",
    help:
      "GrantCare can help you compare reapplication with appeal, ordinary status waiting, and new application routes so you choose the next step more accurately.",
    related:
      "Useful next pages:\n• /guides/reapplication-needed-meaning\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /status/reapplication-needed\n• /guides/how-to-find-the-official-reapplication-page-safely",
    faqs: [
      {
        question: "Is reapplication the same as appeal?",
        answer: "No. They are different routes and should not be mixed together.",
      },
      {
        question: "Should I reapply just because I feel stuck?",
        answer: "No. First check whether the official wording actually points to reapplication.",
      },
      {
        question: "What should I confirm before reapplying?",
        answer: "Confirm that reapplication is the correct official next step for your case.",
      },
    ],
    sortOrder: 281,
  }),
  guide({
    slug: "how-to-know-if-reapplication-is-the-right-step",
    title: "How to know if SASSA reapplication is the right step",
    summary:
      "A decision guide for users who are unsure whether they should wait, appeal, or use a SASSA reapplication route.",
    quickAnswer:
      "Reapplication is the right step only when the latest official wording clearly points toward a fresh application route rather than ordinary waiting or appeal.",
    whatThisMeans:
      "Users often reach reapplication searches when they feel blocked. That feeling is real, but the correct step still depends on what the official wording actually says.",
    whyThisMatters:
      "If you choose reapplication too early, you may move away from the route that really fits the case. If you avoid it when it is clearly needed, the process can drag on.",
    steps:
      "1. Read the latest official message carefully.\n2. Decide whether it points to waiting, appeal, or reapplication.\n3. Compare the message with GrantCare guides for those three routes.\n4. Keep your records and dates nearby.\n5. Move to the official reapplication route only when the wording clearly supports it.",
    keyFocusTitle: "Feeling stuck is not the same as needing reapplication",
    keyFocus:
      "The right test is not frustration. The right test is whether the official message truly points to a fresh application route.",
    important:
      "GrantCare cannot make the official decision for you. It can only help you compare the most likely next-step routes more clearly.",
    help:
      "GrantCare can help you sort the difference between appeal, waiting, and reapplication so the choice feels less like a guess.",
    related:
      "Useful next pages:\n• /guides/reapplication-needed-meaning\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-reapplication-pages-usually-work\n• /guides/how-to-prepare-before-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely",
    faqs: [
      {
        question: "Should I reapply just because the process feels slow?",
        answer: "No. Slow progress alone does not prove that reapplication is needed.",
      },
      {
        question: "What should guide the decision most?",
        answer: "The latest official wording about your case should guide it most.",
      },
      {
        question: "What if I still feel unsure?",
        answer: "Compare the waiting, appeal, and reapplication guides before you act.",
      },
    ],
    sortOrder: 282,
  }),
  guide({
    slug: "how-to-prepare-before-reapplying",
    title: "How to prepare before SASSA reapplication",
    summary:
      "A preparation guide for users who have confirmed that SASSA reapplication is needed and want to avoid repeating earlier confusion.",
    quickAnswer:
      "Prepare before reapplying by checking why reapplication is needed, gathering your records, and making sure you understand the official route you are about to use.",
    whatThisMeans:
      "Reapplication works best when users do not treat it as a blind repeat of the earlier step. The goal is to understand what changed or what still matters before you start again.",
    whyThisMatters:
      "If you reapply without preparation, you may repeat the same confusion or lose track of the records that explain the earlier case.",
    steps:
      "1. Save the latest official wording that points to reapplication.\n2. Gather your earlier reference and records.\n3. Check whether any details or documents need attention.\n4. Confirm the official reapplication route.\n5. Start the reapplication only once the main points are clear.",
    keyFocusTitle: "A better second start comes from clearer records",
    keyFocus:
      "Reapplication is not only about trying again. It is also about carrying forward the right records and understanding from the earlier process.",
    important:
      "GrantCare cannot submit a reapplication for you. It helps you prepare more clearly for the official route.",
    help:
      "GrantCare can help you organise earlier records, compare reapplication with appeal, and prepare for the status stage that follows afterward.",
    related:
      "Useful next pages:\n• /guides/reapplication-needed-meaning\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-reapplication-pages-usually-work",
    faqs: [
      {
        question: "Why save the earlier wording before reapplying?",
        answer: "Because it helps explain why reapplication is needed and keeps the second step grounded.",
      },
      {
        question: "Should I treat reapplication like a blind repeat?",
        answer: "No. It helps to understand the earlier context first.",
      },
      {
        question: "What records matter most?",
        answer: "Earlier references, recent status wording, and any documents linked to the case.",
      },
    ],
    sortOrder: 283,
  }),
  guide({
    slug: "what-to-check-before-you-reapply",
    title: "What to check before you reapply",
    summary:
      "A simple checklist guide for users who want to make sure reapplication really is the right next step before they submit it.",
    quickAnswer:
      "Before you reapply, check the latest official message, your earlier records, the correct official route, and whether any key details need reviewing.",
    whatThisMeans:
      "Reapplication can feel like the obvious answer when a case is stuck, but a short checklist helps users avoid moving too fast into the wrong route.",
    whyThisMatters:
      "A few clear checks can reduce repeat confusion and make the second step cleaner than the first.",
    steps:
      "1. Check that the official wording really points to reapplication.\n2. Keep your earlier reference and records nearby.\n3. Confirm the correct official reapplication route.\n4. Review key details for anything that changed.\n5. Save the route and timing before you proceed.",
    keyFocusTitle: "A short checklist protects the second attempt",
    keyFocus:
      "The point of this checklist is not delay for its own sake. It is to make sure the next step is accurate before you commit to it.",
    important:
      "GrantCare can help with the decision and preparation, but the official reapplication step still belongs to the official system.",
    help:
      "GrantCare can help you compare reapplication with other next-step options and make the checklist feel more practical than overwhelming.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /guides/how-to-prepare-before-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/reapplication-needed-meaning\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites",
    faqs: [
      {
        question: "Why use a checklist before reapplying?",
        answer: "Because it reduces the chance of taking the wrong next step too quickly.",
      },
      {
        question: "What should I confirm first?",
        answer: "Confirm that the latest official message really supports reapplication.",
      },
      {
        question: "Should I recheck my details too?",
        answer: "Yes. It helps to review anything important before you begin again.",
      },
    ],
    sortOrder: 284,
  }),
  guide({
    slug: "how-to-find-the-official-reapplication-page-safely",
    title: "How to find the official SASSA reapplication page safely",
    summary:
      "A trust-focused guide for users who need the SASSA reapplication route and want to avoid copied or misleading pages.",
    quickAnswer:
      "Find the official reapplication page safely by confirming that reapplication is truly needed, then checking the route carefully before you enter any details.",
    whatThisMeans:
      "Reapplication pages can attract confusion because users often search for them while stressed. That makes official-route checking especially important.",
    whyThisMatters:
      "A wrong reapplication page is a double problem: it delays the correct next step and can create fresh confusion on top of an already stressful case.",
    steps:
      "1. Confirm that reapplication is the correct route.\n2. Open the official page from a trusted source.\n3. Check the address and the page purpose carefully.\n4. Avoid copied reapplication links with no clear official source.\n5. Use GrantCare only for explanation and preparation around the page.",
    keyFocusTitle: "The right page depends on the right decision first",
    keyFocus:
      "Finding the official reapplication page starts with confirming that reapplication is truly the step you need. The link check comes after that, not before.",
    important:
      "GrantCare is not the official reapplication page and should never be mistaken for one.",
    help:
      "GrantCare can help you decide whether you need reapplication at all, then help you recognise the kind of official page you should be looking for.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /guides/reapplication-needed-meaning\n• /guides/how-to-prepare-before-reapplying\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites",
    faqs: [
      {
        question: "Why should I confirm reapplication first?",
        answer: "Because the safest route depends on whether reapplication is actually the correct next step.",
      },
      {
        question: "Should I trust a reapplication link from a chat group?",
        answer: "No. Confirm the official source first.",
      },
      {
        question: "What should I check on the page itself?",
        answer: "Check that the page clearly matches the official reapplication task you need.",
      },
    ],
    sortOrder: 285,
  }),
  guide({
    slug: "how-to-use-reapplication-pages-without-unofficial-sites",
    title: "How to use reapplication pages without unofficial sites",
    summary:
      "A safety guide for users who need to reapply and want to keep official action separate from independent guidance.",
    quickAnswer:
      "Use reapplication pages without unofficial sites by keeping the actual reapplication step on the official route and using independent guides only for preparation and understanding.",
    whatThisMeans:
      "Independent guidance can still be useful during reapplication, but the official action itself should stay on the official route. That separation protects trust and reduces confusion.",
    whyThisMatters:
      "When users blur the line between guidance and official action, they can end up handing the important step to the wrong page.",
    steps:
      "1. Use GrantCare to understand whether reapplication fits your case.\n2. Move to the official reapplication route for the actual step.\n3. Confirm the page before entering personal details.\n4. Save the official confirmation after submission.\n5. Return to GrantCare later for help reading the next status or payment message.",
    keyFocusTitle: "Guidance can support reapplication without replacing it",
    keyFocus:
      "The safest use of independent guidance is before or after the official step, not instead of it. That rule matters even more when the case already feels complicated.",
    important:
      "GrantCare is an independent information and reminder platform. It must remain clearly separate from official reapplication systems.",
    help:
      "GrantCare can help you prepare for the reapplication and understand what follows, while keeping the official submission exactly where it belongs.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-before-reapplying\n• /guides/official-status-check-vs-independent-guide\n• /guides/where-to-confirm-payment-problems-officially",
    faqs: [
      {
        question: "Can independent sites still help with reapplication?",
        answer: "Yes, if they clearly stay in the guidance role and do not pretend to be the official reapplication route.",
      },
      {
        question: "What should always stay on the official route?",
        answer: "The real reapplication action and any official submission step should stay there.",
      },
      {
        question: "How can GrantCare still help?",
        answer: "GrantCare can help with preparation, understanding, and next-step interpretation around the official route.",
      },
    ],
    sortOrder: 286,
  }),
  guide({
    slug: "what-to-do-if-the-reapplication-page-will-not-open",
    title: "What to do if the reapplication page will not open",
    summary:
      "A troubleshooting guide for official reapplication pages that fail to load or seem unavailable when users need them most.",
    quickAnswer:
      "If the reapplication page will not open, first treat it as a route or access problem and avoid jumping to replacement links that may not be official.",
    whatThisMeans:
      "A non-loading reapplication page usually means access trouble first, not that your case itself has been decided differently.",
    whyThisMatters:
      "Users who panic at this point are more likely to click copied links or use the wrong route, which adds a trust problem to a technical problem.",
    steps:
      "1. Confirm that the route you are using is the official one.\n2. Refresh the page or retry the browser.\n3. Check the connection and page load again.\n4. Avoid random replacement links.\n5. Return to the official route once the access problem is resolved.",
    keyFocusTitle: "Treat this as access trouble before anything else",
    keyFocus:
      "The safest first reading is that the page is not opening properly, not that your whole case has suddenly changed.",
    important:
      "GrantCare cannot repair the official reapplication page. It helps users avoid unsafe workarounds while they confirm the right route.",
    help:
      "GrantCare can help you stay focused on the correct official page and avoid turning a temporary access problem into a bigger trust problem.",
    related:
      "Useful next pages:\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-reapplication-pages-usually-work\n• /guides/what-to-do-if-your-application-form-will-not-open\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites\n• /guides/how-to-find-official-contact-details-safely",
    faqs: [
      {
        question: "Does a non-loading reapplication page mean reapplication is no longer allowed?",
        answer: "Not usually. It often points to an access or route problem first.",
      },
      {
        question: "Should I click any replacement link I find?",
        answer: "No. Stay with trusted official routes instead of random replacements.",
      },
      {
        question: "What should I check first?",
        answer: "Check that the route is official and the page is loading from the correct place.",
      },
    ],
    sortOrder: 287,
  }),
  guide({
    slug: "how-to-check-reapplication-status-safely",
    title: "How to check reapplication status safely",
    summary:
      "A guide to following the status after reapplying without confusing the reapplication route with the later status route.",
    quickAnswer:
      "Check reapplication status safely by confirming that the reapplication was submitted, then using the correct official status route for the support type instead of guessing from the application page itself.",
    whatThisMeans:
      "Reapplication and reapplication status are connected, but they are not the same step. Users often stay too long on the application page when the next useful information now belongs on the status route.",
    whyThisMatters:
      "If you confuse reapplication with reapplication status, it becomes harder to tell whether the next stage has actually begun.",
    steps:
      "1. Confirm that the reapplication was submitted.\n2. Save the reference and date.\n3. Wait for the right stage before checking status.\n4. Use the correct official status route.\n5. Use GrantCare to interpret the result once the official page shows it.",
    keyFocusTitle: "The reapplication route and the status route are not the same page",
    keyFocus:
      "Reapplication gets the next stage started. Status checking tells you what stage the case is now in. Keeping those roles separate makes the process much easier to follow.",
    important:
      "GrantCare cannot check official reapplication status directly. It helps users understand which route to use and how to read the wording safely.",
    help:
      "GrantCare can help you move from reapplication into status checking and then into payment or next-step guides when the wording changes.",
    related:
      "Useful next pages:\n• /guides/what-to-do-after-you-reapply-online\n• /guides/how-to-read-application-status-after-reapplication\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/reapplication-needed-meaning\n• /status",
    faqs: [
      {
        question: "Why should I confirm reapplication first?",
        answer: "Because status checking is less useful if you are not sure the reapplication was submitted.",
      },
      {
        question: "Can I check reapplication status on the reapplication page itself?",
        answer: "The safer habit is to use the correct official status route once the reapplication stage is complete.",
      },
      {
        question: "What should I save before checking status?",
        answer: "Save the reapplication reference and the date it was submitted.",
      },
    ],
    sortOrder: 288,
  }),
  guide({
    slug: "what-to-do-after-you-reapply-online",
    title: "What to do after you reapply online",
    summary:
      "A calm guide to the first steps after online reapplication so users keep the right records and expectations.",
    quickAnswer:
      "After you reapply online, save the official confirmation, note the date, and give the process time before you start checking for the next status movement.",
    whatThisMeans:
      "Reapplication ends one stage and starts another. The most useful next step is to keep clear records so the later status stage is easier to follow.",
    whyThisMatters:
      "Users can lose the benefit of a fresh start if they forget to keep the records that prove when the reapplication happened.",
    steps:
      "1. Save the reapplication confirmation or reference.\n2. Note the submission date.\n3. Keep the earlier and new records together.\n4. Wait for the correct status-check stage.\n5. Use GrantCare later to interpret the new wording if needed.",
    keyFocusTitle: "A fresh submission still needs a fresh record",
    keyFocus:
      "The most useful result of reapplying is not only that the step is done. It is also that you now have a clear new record for what happened next.",
    important:
      "GrantCare does not confirm official reapplication submission from inside the official system. It helps users know what to keep and what to do next.",
    help:
      "GrantCare can help you move from reapplication into status, timing, and payment interpretation without losing track of the new stage.",
    related:
      "Useful next pages:\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-read-application-status-after-reapplication\n• /dashboard",
    faqs: [
      {
        question: "What should I save after reapplying?",
        answer: "Save the official confirmation or reference and the submission date.",
      },
      {
        question: "Why keep the earlier and new records together?",
        answer: "Because they help show the full story of the case across both stages.",
      },
      {
        question: "Should I check status immediately again?",
        answer: "Usually it helps to give the process some time first.",
      },
    ],
    sortOrder: 289,
  }),
  guide({
    slug: "how-to-keep-records-after-reapplying",
    title: "How to keep records after reapplying",
    summary:
      "A practical guide to keeping reapplication records clear so later status and payment questions are easier to follow.",
    quickAnswer:
      "Keep records after reapplying by saving the new reference, the submission date, the latest official wording, and any earlier records that explain why reapplication happened.",
    whatThisMeans:
      "A reapplication creates a second layer of records. Without a simple record-keeping habit, it becomes much harder to compare what changed from the earlier stage to the new one.",
    whyThisMatters:
      "Good records help users avoid mixing earlier status messages with new ones and make later follow-up much clearer.",
    steps:
      "1. Save the new reapplication reference.\n2. Keep the new and earlier dates together.\n3. Save the latest official wording after reapplying.\n4. Group related screenshots and notes in one place.\n5. Review the timeline before taking the next official step.",
    keyFocusTitle: "A second stage needs a clearer timeline",
    keyFocus:
      "Reapplication creates a before and after. A simple timeline makes it much easier to see what changed and what still did not move.",
    important:
      "GrantCare does not store the official records for you automatically. Users should keep their own copies of important official updates.",
    help:
      "GrantCare can help you interpret the timeline in your records by comparing it with reapplication, status, and payment guides.",
    related:
      "Useful next pages:\n• /guides/what-to-do-after-you-reapply-online\n• /guides/how-to-read-application-status-after-reapplication\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-for-an-appeal\n• /guides/how-to-keep-records-of-payment-problems",
    faqs: [
      {
        question: "What should I record first after reapplying?",
        answer: "Record the new reference and the date of the reapplication first.",
      },
      {
        question: "Why keep the old records too?",
        answer: "Because they explain why the reapplication happened and help you compare what changed later.",
      },
      {
        question: "How does a timeline help?",
        answer: "It helps you separate the earlier stage from the new one more clearly.",
      },
    ],
    sortOrder: 290,
  }),
  guide({
    slug: "how-to-read-application-status-after-reapplication",
    title: "How to read application status after reapplication",
    summary:
      "A guide to reading status wording after reapplying without mixing the old case stage with the new one.",
    quickAnswer:
      "Read application status after reapplication by treating it as a fresh stage, saving the new wording, and comparing it with the reapplication date rather than with older expectations alone.",
    whatThisMeans:
      "After reapplication, users often still carry the frustration of the earlier stage into the new one. That is understandable, but it helps to read the new status as part of a new stage with its own timeline.",
    whyThisMatters:
      "If users compare every new message only to the earlier problem, they may miss what the new stage is actually showing.",
    steps:
      "1. Save the new wording after reapplication.\n2. Compare it with the reapplication date and reference.\n3. Read the new message as part of a fresh stage.\n4. Use the matching GrantCare guide for the wording you see.\n5. Keep the earlier and current records separate enough to compare them clearly.",
    keyFocusTitle: "The new stage deserves its own reading",
    keyFocus:
      "A reapplication status message should be read in the light of the new stage, not only through the frustration of the old stage. That shift often makes the wording easier to understand.",
    important:
      "GrantCare can explain the new wording, but official status confirmation still belongs to the official route that shows it.",
    help:
      "GrantCare can help you connect the reapplication timeline to the new status wording so you do not collapse two stages into one confusing story.",
    related:
      "Useful next pages:\n• /guides/how-to-check-reapplication-status-safely\n• /guides/reapplication-needed-meaning\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-read-application-status-after-applying-online\n• /status",
    faqs: [
      {
        question: "Why should I treat this as a fresh stage?",
        answer: "Because the reapplication starts a new timeline and the new status needs to be read in that context.",
      },
      {
        question: "Should I still keep the earlier records?",
        answer: "Yes, but compare them carefully instead of mixing all the messages together.",
      },
      {
        question: "What should I save from the new stage?",
        answer: "Save the new wording, the date, and the reapplication reference.",
      },
    ],
    sortOrder: 291,
  }),
  guide({
    slug: "what-sc19-searches-usually-mean",
    title: "What SC19 means on SRD pages",
    summary:
      "A plain-language guide to what SC19 means on SRD status or application pages, and why users should focus on the official task behind the term rather than the code alone.",
    quickAnswer:
      "If you searched SC19, you are usually trying to reach a specific SRD-related application or status route. The safest move is to identify the task behind the code before you trust the page.",
    whatThisMeans:
      "Codes like SC19 can look very specific and therefore very trustworthy. The problem is that users may focus on the code itself and forget to check whether the page still matches the official task they need.",
    whyThisMatters:
      "A code-based search can feel precise while still leading to confusion if the user does not know whether they need application, status, or another route.",
    steps:
      "1. Decide whether you need application, status, or another SRD-related task.\n2. Match the code-based search to that task.\n3. Confirm the page route before using it.\n4. Avoid trusting code-based links shared without context.\n5. Use GrantCare if you need help translating the search term into the right official task.",
    keyFocusTitle: "The code is not the task",
    keyFocus:
      "SC19-style terms can help users find pages, but they should never replace the more important question of what official task the page is actually meant to handle.",
    important:
      "GrantCare is not an official SC19 page. It helps users understand code-based searches without pretending to be the official route itself.",
    help:
      "GrantCare can help you translate code-like search terms into the right official application, status, or follow-up route before you click too far.",
    related:
      "Useful next pages:\n• /guides/how-to-use-sc19-pages-safely\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-start-an-r350-online-application-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task",
    faqs: [
      {
        question: "Why do SC19 searches feel trustworthy?",
        answer: "Because the code sounds specific, which can make users trust the result too quickly.",
      },
      {
        question: "What should I decide before trusting an SC19 page?",
        answer: "Decide what task you actually need the page to handle.",
      },
      {
        question: "Can GrantCare use SC19 as an official route?",
        answer: "No. It only helps explain what the search term may be pointing toward.",
      },
    ],
    sortOrder: 292,
  }),
  guide({
    slug: "how-to-use-sc19-pages-safely",
    title: "How to use SC19 pages safely",
    summary:
      "A safety guide for users who land on SC19-style application or status pages and want to make sure they are using the route correctly.",
    quickAnswer:
      "Use SC19-style pages safely by confirming whether the page is for application or status, checking the route carefully, and treating copied code-based links with caution.",
    whatThisMeans:
      "SC19-style pages are often found through direct search or shared links. That makes it especially important to confirm the page purpose before entering details or trusting the result you see.",
    whyThisMatters:
      "A user who confuses an application page with a status page can lose time, misread the next step, or trust the wrong route too quickly.",
    steps:
      "1. Check whether the page is for application, status, or another follow-up task.\n2. Confirm the route and address carefully.\n3. Avoid trusting forwarded SC19 links without source.\n4. Use the page only for the task it clearly handles.\n5. Use GrantCare to interpret the result or wording after the official page gives it.",
    keyFocusTitle: "Page purpose comes before page code",
    keyFocus:
      "The most useful question is not only is this an SC19 page. The better question is what task is this page actually for right now.",
    important:
      "GrantCare is an independent guide and not the official SC19 route. Official actions still belong to official systems.",
    help:
      "GrantCare can help you decide whether the SC19 page is being used for the right task and can explain the wording that appears there afterward.",
    related:
      "Useful next pages:\n• /guides/what-sc19-searches-usually-mean\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-srd-status-online\n• /guides/official-status-check-vs-independent-guide",
    faqs: [
      {
        question: "Why should I check whether the page is for application or status?",
        answer: "Because using the wrong page purpose creates unnecessary confusion about the next step.",
      },
      {
        question: "Should I trust any SC19 link someone sends me?",
        answer: "No. Confirm the source and the task first.",
      },
      {
        question: "What should I do after I see the result?",
        answer: "Use GrantCare to interpret the wording once the official page has shown it.",
      },
    ],
    sortOrder: 293,
  }),
];

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "how-to-check-if-an-online-application-link-is-official": {
    "title": "Ungabheka kanjani ukuthi isixhumanisi sesicelo se-inthanethi sisemthethweni",
    "summary": "Igayidi yokuthembana kuqala yokuhlola ukuthi ingabe isixhumanisi sohlelo lokusebenza esiku-inthanethi singesomzila osemthethweni ngaphambi kokuba usisebenzise.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isixhumanisi sohlelo lokusebenza ku-inthanethi sisemthethweni yini ngokufanisa isixhumanisi nomsebenzi, uhlole ikheli ngokucophelela, futhi ungawathembi amagama ohlelo lokusebenza olukopishiwe ngokwawo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi basesha isixhumanisi sohlelo lokusebenza ngoba bafuna indlela esheshayo ukuqala. Lokho kuphuthuma kungenza isixhumanisi esikopishiwe noma esingacacile sibonakale sithembeke kakhulu kunalokho esiyikho ngempela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma isixhumanisi singalungile, yonke into ngemva kokuvikeleka kancane. Kungakho ukuhlola isixhumanisi kubalulekile ngaphambi kokuthi ucabange ngamafomu, ukungena ngemvume, noma ukuhambisa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi yimuphi umsebenzi ohlobene nesibonelelo isixhumanisi esifuna ukusisingatha.\n2. Hlola ikheli ngokucophelela.\n3. Qhathanisa nendlela esemthethweni eyaziwayo yalowo msebenzi.\n4. Gwema ukufaka imininingwane uma umthombo usazizwa ungacacile.\n5. Sebenzisa i-GrantCare ukuze uqinisekise uhlobo lwekhasi elisemthethweni olidingayo ngaphambi kokuzama futhi."
      },
      {
        "title": "Isixhumanisi esibukeka kahle asanele",
        "body": "Izixhumanisi zohlelo lokusebenza zivame ukuzizwa zithembekile ngoba zisebenzisa amagama ajwayelekile. Ukuhlola okuphephile ukuthi isixhumanisi singesomzila osemthethweni womsebenzi oqondile owudingayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yolwazi ezimele. Ayithathi indawo yezindlela ezisemthethweni zohlelo lokusebenza futhi akufanele neze kwenziwe iphutha nekhasi lesicelo elisemthethweni ngokwalo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uthole ukuthi uyalidinga yini ikhasi lesicelo, ikhasi lesimo, noma omunye umzila osemthethweni ngaphambi kokuthi uthembe isixhumanisi ositholile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-use-sassa-online-application-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-know-if-a-sassa-website-is-official"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngihlole umsebenzi ngaphambi kwesixhumanisi?",
        "body": "Ngoba isixhumanisi esifanele sincike emsebenzini ozama ukuwuqedela."
      },
      {
        "title": "I-FAQ: Ingabe amagama esibonelelo sikahulumeni akopishiwe angenza isixhumanisi sibukeke sisemthethweni?",
        "body": "Yebo. Amagama ajwayelekile akuwona ubufakazi ngokwawo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma isixhumanisi sisazwakala singacacile?",
        "body": "Buyela emuva futhi uqinisekise umzila osemthethweni olungile ngaphambi kokufaka noma yini."
      }
    ]
  },
  "how-to-use-sassa-online-application-safely": {
    "title": "Ungalusebenzisa kanjani uhlelo lwe-inthanethi lwe-SASSA ngokuphepha",
    "summary": "Umhlahlandlela olula wokusebenzisa amakhasi ohlelo lokusebenza ku-inthanethi ngokucophelela ngaphandle kokudida ukulungiselela, isiqondiso, nokuhambisa okusemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa uhlelo lokusebenza oluku-inthanethi ngokuphepha ngokuqinisekisa uhlobo lwesibonelelo kuqala, uvule umzila osemthethweni olungile, futhi uphathe imihlahlandlela ezimele kuphela njengosekelo lokulungiselela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kohlelo lokusebenza ku-inthanethi kuvame ukwenzeka lapho abasebenzisi befuna isinyathelo sokuqala esilula. Isiqalo esiphephe kunazo zonke akukhona nje ukuthola noma yiluphi uhlobo. Ifanisa ifomu elifanele nomzila wesibonelelo olungile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephuthuma ekhasini lesicelo elingalungile, isimo sakamuva, idokhumenti, nemibuzo yokukhokha kuba nzima ukuyixazulula."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi iyiphi isibonelelo noma uhlobo losekelo olufanelana necala lakho.\n2. Qoqa amadokhumenti okungenzeka ngaphambi kokuthi uqale.\n3. Vula umzila osemthethweni wokufaka isicelo.\n4. Londoloza noma isiphi isiqinisekiso noma ireferensi uma usuthumele.\n5. Sebenzisa i-GrantCare kamuva uma udinga usizo lokuqonda ukuthi kwenzekani ngokulandelayo."
      },
      {
        "title": "Ukuphepha kuqala ngomzila olungile",
        "body": "Umkhuba wokufaka isicelo ku-inthanethi ophephe kakhulu ulula: isibonelelo esilungile, ikhasi elisemthethweni elilungile, nokwehlukana okucacile phakathi kwesiqondiso nesenzo esisemthethweni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukukuthumelela isicelo esisemthethweni. Kukusiza ukuthi ulungiselele futhi uqonde inqubo, kodwa isicelo sangempela sisesemzileni osemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise izinhlobo zezibonelelo, ulungise amadokhumenti, futhi usuke emibuzweni yesicelo uye kusimo nemihlahlandlela yokukhokha ngokuhamba kwesikhathi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-prepare-for-an-online-application\n• /guides/how-to-know-which-grant-application-fits-you\n• /eligibility-checker"
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangilethela isicelo?",
        "body": "Cha. Kukusiza ukuthi ulungiselele, kodwa ukuhambisa okusemthethweni kusenzeka emzileni osemthethweni."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise uhlobo lwesibonelelo kuqala?",
        "body": "Ngoba umzila wesicelo olungile uncike ohlotsheni lwesibonelelo noma lokusekela."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze ngemva kokuhambisa?",
        "body": "Londoloza ukuqinisekiswa okusemthethweni noma ireferensi uma isistimu ikunikeza eyodwa."
      }
    ]
  },
  "how-to-start-an-r350-online-application-safely": {
    "title": "Ungaluqala kanjani uhlelo lwe-inthanethi lwe-R350 ngokuphepha",
    "summary": "Umhlahlandlela osebenziseka kalula ukuze uqale uhlelo lokusebenza lwe-inthanethi lwesitayela se-R350 ngaphandle kokudida isenzo esisemthethweni nesiqondiso esizimele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Qala uhlelo lokusebenza lwe-inthanethi lwesitayela se-R350 ngokuphephile ngokuqinisekisa ukuthi uhlobo losekelo lufanelana nesimo sakho, bese uya emzileni osemthethweni olungile wesinyathelo sangempela sohlelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwezinhlelo zokusebenza okuhlobene ne-R350 kuvame ukuphuthuma. Lokho kwenza abasebenzisi ukuthi bachofoze ngokushesha futhi mancane amathuba okuthi bahlukanise ukulungiselela nokuthunyelwe okusemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isiqalo esisheshayo singadala amaphutha azovela kamuva njengokudideka, ukukhathazeka ngesimo, noma imininingwane engekho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi uhlobo lokusekela luhambisana nesimo sakho.\n2. Lungiselela imininingwane yakho ebalulekile kanye namadokhumenti.\n3. Vula umzila osemthethweni wokufaka isicelo.\n4. Thumela ngokucophelela futhi ugcine noma iyiphi ireferensi enikeziwe.\n5. Sebenzisa i-GrantCare kamuva ukuze uthole isimo, inkokhelo, noma izincazelo zesinyathelo esilandelayo."
      },
      {
        "title": "Ukuphuthuma akufani nokulungela",
        "body": "Izinhlelo zokusebenza ezihlobene ne-R350 zivame ukuzizwa ziphuthuma, kodwa isiqalo esiphephe kakhulu sisuka ekuhloleni umzila olungile nokulungiselela kahle ngaphambi kokuthi uthumele."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi akulona uhlelo olusemthethweni lwe-R350 noma i-SRD. Akufanele ithathwe njengekhasi lesicelo elisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi uhlobo losekelo luyalingana, yimiphi imibhalo engabaluleka, nokuthi ungayifunda kanjani umphumela ngemva kokuqala kwesicelo esisemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-apply-online-for-social-relief\n• /guides/social-relief-who-may-qualify\n• /guides/how-to-find-the-official-application-form-safely\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-check-srd-status-online"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngisebenzise isixhumanisi sokuqala sohlelo lokusebenza le-R350 engisibonayo?",
        "body": "Cha. Qinisekisa umzila osemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilungiselele ngaphambi kokuqala?",
        "body": "Lungiselela imininingwane ebalulekile kanye namadokhumenti okungenzeka axhunywe nesicelo."
      },
      {
        "title": "I-FAQ: Kwenzekani ngemva kokuhambisa?",
        "body": "Londoloza isithenjwa sakho futhi usebenzise umzila osemthethweni ukuze uthole izibuyekezo, bese usebenzisa i-GrantCare ukuze uthole izincazelo uma kudingeka."
      }
    ]
  },
  "how-to-use-an-r370-application-page-safely": {
    "title": "Isetshenziswa kanjani ikhasi lesicelo le-R370 ngokuphepha",
    "summary": "Umhlahlandlela wabasebenzisi abasesha amakhasi ohlelo lwe-R370 futhi badinga indlela ephephile yokuhlukanisa imizila esemthethweni kuzixhumanisi ezikopishiwe noma ezingacacile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa ikhasi lesicelo lesitayela se-R370 ngokuphephile ngokuqinisekisa umzila osemthethweni wosekelo olucelayo futhi unganciki ekumangalweni kwekhasi elikopishiwe kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukusesha kwesitayela se-R370 kuvame ukubonisa ukushintsha amagama asesidlangalaleni noma izinkomba ezisuselwe onyakeni. Lokho kwenza kubaluleke nakakhulu ukufanisa ikhasi nomsebenzi wamanje osemthethweni kunenombolo eyaziwa kakhulu kumphumela wosesho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bangalahlekelwa isikhathi ngokujaha amalebula ekhasi esikhundleni sokuqinisekisa ukuthi imuphi umzila wosekelo ophethwe yikhasi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi yiliphi uhlobo losekelo leli khasi elibhekise kulo.\n2. Qinisekisa umzila osemthethweni walolo hlobo losekelo.\n3. Gwema ukuthemba ikhasi kuphela ngoba lisebenzisa inani elijwayelekile.\n4. Londoloza umzila osemthethweni olungile uma usuqinisekisiwe.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhumusha amagama azungeze uhlelo lokusebenza."
      },
      {
        "title": "Umzila ubaluleke ngaphezu kwelebula yenani",
        "body": "Inani elijwayelekile kumphumela wosesho alanele ukufakazela ukuthi ikhasi liwumzila osemthethweni olungile. Uhlobo losekelo oluyisisekelo nomsebenzi osemthethweni kubaluleke kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayiwasebenzisi amakhasi ohlelo lokusebenza asemthethweni. Isiza abasebenzisi ukuthi bahumushe ukushintsha ulimi lokusesha ngaphandle kokulenza iphutha njengegunya elisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uhumushele ukusesha okusekelwe enanini kumzila wosekelo osemthethweni olungile ngaphambi kokusebenzisa noma yiliphi ikhasi lohlelo lokusebenza."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-start-an-r350-online-application-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-understand-r370-application-status-safely\n• /guides/how-to-check-370-application-pages-safely"
      },
      {
        "title": "I-FAQ: Kungani kungafanele ngithembe ilebula yenani iyodwa?",
        "body": "Ngoba inombolo ejwayelekile ayifakazi ukuthi ikhasi liwumzila osemthethweni olungile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqinisekise kuqala?",
        "body": "Qinisekisa uhlobo lwangempela losekelo kanye nomzila osemthethweni osiphathayo."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingangitshela ukuthi ikhasi liphephile yini?",
        "body": "Ingakuqondisa kokuthi yini okufanele uyihlole, kodwa ukuqinisekiswa okusemthethweni kusancike emzileni ngokwawo."
      }
    ]
  },
  "how-to-use-online-application-login-safely": {
    "title": "Ungakusebenzisa kanjani ukungena ngemvume kohlelo lokusebenza ku-inthanethi ngokuphepha",
    "summary": "Umhlahlandlela wokuphepha wabasebenzisi abafuna amakhasi okungena ngemvume ku-inthanethi futhi badinga ukugwema izikrini zokungena ezingelona iqiniso noma amaphutha asheshayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa ukungena ngemvume kohlelo lokusebenza ku-inthanethi ngokuphepha ngokuqinisekisa ikhasi kuqala, uhlole ukuthi ukungena ngemvume kuyindlela esemthethweni yomsebenzi wakho, futhi ungafaki imininingwane emakhasini angaqinisekile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi okungena ngemvume kuhlelo lokusebenza ngokuvamile azizwa ephuthumayo ngoba abasebenzisi bacabanga ukuthi ukungena ngemvume okukodwa kuzoxazulula yonke into. Empeleni, ikhasi lisadinga ukuhlolwa okufanayo kokwethenjwa njenganoma yimuphi omunye umzila osemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lokungena elingalungile liyingozi kakhulu kunekhasi lemininingwane engalungile ngoba abasebenzisi bangase banikeze imininingwane ngaphambi kokuba babone ukuthi umzila awucacile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa umsebenzi kuqala.\n2. Vula umzila wokungena osemthethweni owaziwayo walowo msebenzi.\n3. Hlola ikheli ngokucophelela.\n4. Faka imininingwane kuphela uma ikhasi lifana ngokusobala nomzila osemthethweni.\n5. Yima uphinde uhlole ukuthi ikhasi lizwakala lingajwayelekile yini noma lihluke kakhulu kumsebenzi obuwulindele."
      },
      {
        "title": "Ukuphepha kokungena ngemvume kuncike ekucaceni komsebenzi",
        "body": "Umkhuba wokungena ophephe kakhulu ukwazi kahle ukuthi yimuphi umsebenzi ongena ngemvume. Lokho kwenza kube lula ukubona uma ikhasi lingafani nalokho okudingayo ngempela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayizibambi izenzo zokungena ezisemthethweni. Isiza abasebenzisi ukuthi bafinyelele umzila osemthethweni olungile ngokuphepha futhi baqonde ukuthi yini ezayo ngemva kokungena ngemvume."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi uyawudinga yini umzila wokungena wangempela, ikhasi lesimo, noma ikhasi lolwazi ngaphambi kokuthi uqale ukuthayipha imininingwane."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-services-sassa-gov-za-login-safely\n• /guides/what-sassa-portal-login-is-for\n• /guides/what-to-do-if-online-application-login-is-not-working\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-keep-your-portal-login-details-safe"
      },
      {
        "title": "I-FAQ: Kungani ukucaca komsebenzi kubaluleke kangaka ngaphambi kokungena ngemvume?",
        "body": "Ngoba ikhasi lokungena elilungile lincike kumsebenzi ozama ukuwuqeda."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngingene ekhasini elibukeka ngilijwayele kuphela?",
        "body": "Cha. Qinisekisa umzila kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma ikhasi lizwakala lingalungile?",
        "body": "Yima uphinde uhlole umzila osemthethweni ngaphambi kokuqhubeka."
      }
    ]
  },
  "what-to-do-if-online-application-login-is-not-working": {
    "title": "Okufanele ukwenze uma ukungena kwesicelo se-inthanethi kungasebenzi",
    "summary": "Umhlahlandlela wokuxazulula izinkinga wezinkinga zokungena ku-inthanethi ezisemthethweni, ugxile ezinyathelweni ezilandelayo eziphephile esikhundleni sokuqagela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ukungena kuhlelo lokusebenza ku-inthanethi kungasebenzi, qala uqinisekise umzila kanye nekhasi ngokwalo ngaphambi kokuthi ucabange ukuthi inkinga isesicelo sakho noma imininingwane."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Inkinga yokungena ingase ivele ekhasini, emzileni, ekuxhumekeni, noma esinyathelweni sokungena ngokwaso. Akumele iphathwe ngokuzenzakalela njengenkinga yohlelo lokusebenza."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi abaqagela ngokuphindaphindiwe ekhasini elingalungile bangakha ingcindezi eyengeziwe ngaphandle kokusondela enkingeni yangempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi usekhasini lokungena elisemthethweni elilungile.\n2. Zama futhi ngokucophelela esikhundleni sokujaha imizamo ephindaphindiwe.\n3. Hlola uxhumano nomthwalo wekhasi.\n4. Gcina inothi ukuthi yisiphi isinyathelo esihlulekayo.\n5. Sebenzisa imizila yokwesekwa esemthethweni uma ukungena ngemvume okusemthethweni okuqinisekisiwe namanje kungasebenzi."
      },
      {
        "title": "Inkinga yokungena ayifani nenkinga yohlelo lokusebenza",
        "body": "Umehluko owusizo kakhulu uphakathi kwenkinga yokufinyelela nenkinga yecala. Ukwehluleka kokungena ngokuvamile okokufinyelela kuqala, hhayi kumphumela wakho wangempela wohlelo lokusebenza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukulungisa ukufinyelela kokungena ngemvume okusemthethweni. Isiza abasebenzisi ukugwema ama-workaround angaphephile futhi bacabange inkinga ngokucacile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise izinkinga zokungena ezinkingeni zesimo sohlelo lokusebenza, okwenza isinyathelo esilandelayo sibe lula ukwehlulela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-online-application-login-safely\n• /guides/what-to-do-if-you-cannot-log-in-to-the-sassa-portal\n• /guides/how-to-find-the-right-sassa-website-for-your-task\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Ingabe inkinga yokungena isho ukuthi isicelo sami sehlulekile?",
        "body": "Cha. Ivamise ukukhomba inkinga yokufinyelela kuqala."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiyeke ukuqagela okuphindaphindiwe?",
        "body": "Ngoba ukuqagela ngokuphindaphindiwe kungenza isimo sidideke ngaphandle kokulungisa inkinga yangempela."
      },
      {
        "title": "I-FAQ: Kufanele ngisebenzise nini ukwesekwa okusemthethweni?",
        "body": "Yisebenzise lapho ukungena okusemthethweni okuqinisekisiwe namanje kungasebenzi ngemva kokuzama kabusha ngokucophelela."
      }
    ]
  },
  "how-to-find-an-official-application-status-page-safely": {
    "title": "Ungalithola kanjani ikhasi lesimo sohlelo lokusebenza ngokuphephile",
    "summary": "Umhlahlandlela wokuthola ikhasi elisemthethweni lesimo sohlelo lokusebenza ngaphandle kokulidida ngomhlahlandlela ojwayelekile, isixhumanisi esikopishiwe, noma iphothali engalungile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola ikhasi elisemthethweni lesimo sohlelo lokusebenza ngokuphepha ngokufanisa ikhasi nesibonelelo noma uhlobo losekelo kuqala, bese uqinisekisa umzila ngaphambi kokufaka noma yimiphi imininingwane."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi wesimo sohlelo lokusebenza angabukeka afana neziqondiso ezijwayelekile zokuhlola isimo, kodwa umzila olungile usancike ohlotsheni oluqondile losekelo nenqubo esemthethweni ozama ukuyilandela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lesimo elingalungile lingaveza ukudideka nangaphambi kokuba ubone umphumela. Izindaba zokufanisa ikhasi eliphephile ngaphambi kokuthi ukuhumusha kuqale."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Khomba uhlobo lokusekela oluhlolayo.\n2. Bheka umzila osemthethweni wesimo oxhunywe kulolo hlobo.\n3. Qinisekisa ikheli lekhasi nenjongo.\n4. Gwema ukusebenzisa izixhumanisi ezikopishiwe ezingenamthombo ocacile.\n5. Sebenzisa i-GrantCare kuphela ukuze utolike umphumela ngemva kokuba ikhasi elisemthethweni liwunikeze."
      },
      {
        "title": "Ikhasi lesimo elilungile liqala ngesigaba esifanele",
        "body": "Ukusesha isimo sohlelo lokusebenza kusebenza kahle kakhulu uma kuqala ngohlobo losekelo, hhayi nje isimo segama. Lelo shifu elilodwa lisusa ukudideka okukhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akulona ikhasi lesimo esisemthethweni. Isiza abasebenzisi ukuthi bathole umzila osemthethweni olungile futhi baqonde amagama abawabona lapho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unciphise umsebenzi, ukhethe umzila ofanele wesimo, futhi uqonde ukuthi umphumela usho ukuthini uma ikhasi elisemthethweni liwubonisa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-avoid-fake-application-status-pages\n• /status"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqale ngohlobo losekelo?",
        "body": "Ngoba indlela efanele yesimo esemthethweni ingase incike ekutheni ubhalisele uhlobo luni loxhaso."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isixhumanisi sesimo esikopishiwe?",
        "body": "Cha. Qinisekisa umthombo nomzila kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokuthola ikhasi?",
        "body": "Sebenzisa ikhasi elisemthethweni ukuze uthole isheke, bese usebenzisa i-GrantCare uma udinga usizo lokufunda umphumela."
      }
    ]
  },
  "what-to-do-after-you-submit-an-online-application": {
    "title": "Okufanele ukwenze ngemuva kokufaka isicelo se-inthanethi",
    "summary": "Umhlahlandlela ozolile wezinyathelo zokuqala ngemuva kokuthunyelwa ku-inthanethi ukuze abasebenzisi bangalahlekelwa isithenjwa sabo noma baqale ukuqagela kusenesikhathi kakhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngemva kokuhambisa isicelo ku-inthanethi, gcina isiqinisekiso noma ireferensi, phawula usuku, bese unikeza isistimu esemthethweni isikhathi ngaphambi kokuthi uqale ukuhlola izibuyekezo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuzithoba kuwukuphela kwesigaba esisodwa, hhayi ukuphela kwayo yonke inqubo. Isigaba esilandelayo sivame ukulinda ukunyakaza okusemthethweni, okulula ukusiphatha uma amarekhodi ecacile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukusuka baqonde ekuhambiseni baye ekuhloleni ukukhathazeka futhi bakhohlwe ukulondoloza ulwazi olufakazela ukuthi uhlelo lokusebenza luthunyelwe ngempela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina isiqinisekiso noma ireferensi.\n2. Qaphela usuku lokuhambisa.\n3. Gcina imininingwane eyinhloko nezithombe-skrini ndawonye.\n4. Linda iwindi lokuhlola isimo elifanele esikhundleni sokuhlola kusenesikhathi.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuqonda isimo esilandelayo noma isinyathelo sokukhokha kamuva."
      },
      {
        "title": "Ukuhambisa kufanele kukushiye nerekhodi",
        "body": "Into ewusizo kakhulu ngemuva kokuhambisa ayikona ukuchofoza ngaphezulu. Kuyirekhodi elicacile elikhombisa ukuthi isicelo sidlulile nokuthi senzeka nini."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuqinisekisa ukuthunyelwa okusemthethweni ngaphakathi kwesistimu esemthethweni. Ingakusiza kuphela ukuthi uqonde izinyathelo ezilandelayo uma usunerekhodi lakho elisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekuthumeleni uye ekuhloleni isimo, isikhathi sokukhokha, kanye nokusetha isikhumbuzi ngaphandle kokulahlekelwa okuyisisekelo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-check-application-status-on-mobile\n• /guides/how-grant-reminders-can-help\n• /dashboard"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyonge kuqala?",
        "body": "Londoloza isiqinisekiso noma ireferensi isistimu esemthethweni ekunika yona."
      },
      {
        "title": "I-FAQ: Kungani uqaphele usuku lokuhambisa?",
        "body": "Ngoba ikusiza ukuthi wehlulele isikhathi sokuhlolwa kwesimo sakamuva nezibuyekezo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlole isimo ngokushesha ngemva kokuhambisa?",
        "body": "Ngokuvamile kuyasiza ukunikeza uhlelo olusemthethweni isikhathi esithile kuqala."
      }
    ]
  },
  "how-to-check-if-your-online-application-was-submitted": {
    "title": "Ungahlola kanjani ukuthi isicelo sakho esiku-inthanethi sithunyelwe",
    "summary": "Umhlahlandlela osebenzayo wokuhlola ukuthi ingabe ukuthunyelwa ku-inthanethi kwenzeke ngempela yini ngaphambi kokuthi uqale ukukhathazeka ngezibuyekezo zesimo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola ukuthi isicelo sakho esiku-inthanethi sithunyelwe yini ngokubheka isiqinisekiso esisemthethweni, ireferensi, noma isinyathelo sokugcina sokuhambisa kunokuqagela ngekhanda."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi ngezinye izikhathi bashiya ikhasi ngokushesha okukhulu, balahlekelwe isikrini sokugcina, noma bazizwe bengenasiqiniseko sokuthi isinyathelo sokugcina sokuhambisa senzeke ngempela yini. Umkhondo ongcono kakhulu ukuqinisekiswa okusemthethweni, hhayi umuzwa okungenzeka ukuthi udlule kuwo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ukuhambisa kungazange kuqedwe, ukuhlola isimo kamuva kuzodala ukudideka okwengeziwe. Yingakho ukuqinisekisa ukuhanjiswa kubalulekile kuqala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka isiqinisekiso esisemthethweni noma ireferensi.\n2. Hlola ukuthi ufinyelele esinyathelweni sokugcina sokuhambisa.\n3. Gcina noma yiziphi izikrini zokuqinisekisa noma imilayezo.\n4. Gcina usuku lokuthumela luserekhodini.\n5. Sebenzisa umzila osemthethweni futhi kuphela uma ungakwazi ukuqinisekisa ukuthunyelwa."
      },
      {
        "title": "Ukuqinisekisa kubaluleke ngaphezu kwenkumbulo",
        "body": "Kuqala ukudideka ngoba abasebenzisi bathembele enkumbulweni esikhundleni sokuqinisekisa okusemthethweni. Irekhodi elicacile liwusizo kakhulu kunokuqagela kamuva."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubona ngaphakathi kwesistimu yesicelo esemthethweni. Isiza abasebenzisi bazi ukuthi ibuphi ubufakazi bokuthunyelwe okufanele bugcinwe."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi ubhanqe ukuqinisekiswa kokuthunyelwa nesimo sakamuva nemihlahlandlela yokukhokha ukuze ungeqi uye phambili maduzane."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-after-you-submit-an-online-application\n• /guides/how-to-move-from-application-to-status-check\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/how-to-keep-records-after-reapplying"
      },
      {
        "title": "I-FAQ: Iluphi uphawu olungcono kakhulu ukuhanjiswa okudlule kukho?",
        "body": "Uphawu oluhle kakhulu isiqinisekiso esisemthethweni noma inkomba evela esinyathelweni sokugcina sokuhambisa."
      },
      {
        "title": "I-FAQ: Kungani kufanele ngilondoloze isikrini sokuqinisekisa?",
        "body": "Ngoba kusiza ukufakazela okwenzekile uma kamuva uzizwa ungaqiniseki."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ngingenaso nhlobo isiqinisekiso?",
        "body": "Hlola kabusha ngokucophelela ngaphambi kokuthi ukuhambisa kuqediwe."
      }
    ]
  },
  "how-to-move-from-application-to-status-check": {
    "title": "Ungasuka kanjani kuhlelo lokusebenza uye ekuhlolweni kwesimo",
    "summary": "Umhlahlandlela webhuloho wabasebenzisi asebesifakile isicelo futhi abafuna ukwazi ukuthi bangashintshela nini futhi kanjani ekuhloleni isimo ngokuphephile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Suka kuhlelo lokusebenza uye ekuhloleni isimo ngokugcina irekhodi lakho lokuthumela, ulinde isigaba esifanele, bese usebenzisa umzila olungile wesimo osemthethweni wohlobo losekelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isicelo kanye nokuhlolwa kwesimo kuxhumene, kodwa akusona isigaba esifanayo. Abasebenzisi bavamise ukugxuma ngokushesha kakhulu besuka komunye baye komunye ngaphandle kokuqinisekisa ukuthunyelwa noma ukunikeza isistimu isikhathi sokuhamba."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uqala ukuhlola isimo kusenesikhathi kakhulu noma usendleleni engalungile, kungase kuzwakale sengathi akwenzeki lutho ngisho noma udaba lukusikhathi kuphela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi isicelo sakho sithunyelwe.\n2. Gcina ireferensi yakho kanye nosuku lokuthumela.\n3. Nikeza uhlelo olusemthethweni isikhathi sokudlulela esigabeni esilandelayo.\n4. Sebenzisa umzila wesimo osemthethweni olungile wohlobo losekelo.\n5. Sebenzisa i-GrantCare ukuhumusha amagama uma ikhasi elisemthethweni seliyibonisile."
      },
      {
        "title": "Lolu wushintsho lwesiteji, hhayi isinqamuleli",
        "body": "Ukudlulela ekuhloleni isimo kusebenza kangcono kakhulu uma ukuthatha njengesigaba esilandelayo senqubo efanayo, hhayi njengesinqamuleli esisheshayo esiya ekuqinisekiseni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isiza abasebenzisi baqonde i-handoff phakathi kwezigaba, kodwa ayithathi indawo yomzila wesicelo osemthethweni noma umzila osemthethweni wesimo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi ulawule ukusuka ekuhambiseni ukuya esimweni, bese usuka esimweni uye kumhlahlandlela wokukhokha uma icala lakho liya phambili."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-check-application-status-on-mobile\n• /guides/how-to-check-your-status-without-making-mistakes"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise ukuthunyelwa ngaphambi kokuhlola isimo?",
        "body": "Ngoba ukuhlola isimo akusizi kangako uma ungenaso isiqiniseko sokuthi isicelo sidlulile."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlole isimo ngokushesha ngemva kokuhambisa?",
        "body": "Ngokuvamile kuyasiza ukunikeza isistimu esemthethweni isikhathi kuqala."
      },
      {
        "title": "I-FAQ: Imuphi umzila okufanele ngiwusebenzisele isimo?",
        "body": "Sebenzisa umzila wesimo osemthethweni ofana nohlobo losekelo olufakele isicelo."
      }
    ]
  },
  "how-to-read-application-status-after-applying-online": {
    "title": "Usifunda kanjani isimo sesicelo ngemuva kokufaka isicelo ku-inthanethi",
    "summary": "Umhlahlandlela oqondile wokufunda amagama esimo sohlelo lokusebenza ngemuva kokuthunyelwa ku-inthanethi ngaphandle kokusabela ngokweqile ekungaqinisekini kwangaphambilini.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Funda isimo sohlelo lokusebenza ngemva kokufaka isicelo ku-inthanethi ngokuhlola amagama aqondile, uwahlukanise nalokho okulindelekile kwenkokhelo, nokusebenzisa umlayezo njengesibuyekezo sesiteji kunendaba yokugcina."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngemva kokufaka isicelo ku-inthanethi, abasebenzisi bavame ukufuna impendulo eyodwa elula. Empeleni, amagama esimo avame ukukhombisa ukuthi icala likusiphi isigaba esikhundleni sokuphendula yonke imibuzo yakamuva ngesikhathi esisodwa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi bephatha yonke imilayezo yesimo sangaphambi kwesikhathi njengomphumela wokugcina, bangethuka noma benze okuthile maduzane kakhulu. Ukufunda okusesiteji kuzolile futhi ngokuvamile kunembe kakhudlwana."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda amagama aqondile ekhasini elisemthethweni.\n2. Hlukanisa isimo sohlelo lokusebenza nesikhathi sokukhokha.\n3. Qhathanisa umlayezo nomhlahlandlela ofanayo we-GrantCare.\n4. Londoloza amagama kanye nosuku ukuze uthole ireferensi.\n5. Sebenzisa umzila osemthethweni esenzweni sangempela esilandelayo kuphela uma umlayezo ukhomba ngokusobala kokukodwa."
      },
      {
        "title": "Isimo ngokuvamile siwumlayezo wasesiteji",
        "body": "Amagama amaningi wesimo sohlelo lokusebenza aqondwa kangcono njengomlayezo wokuqhubeka. Lokho kusiza abasebenzisi ukuthi balinde noma benze ngesizathu esifanele esikhundleni sokusabela ekwesabeni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza amagama esimo ngolimi olulula, kodwa ukuqinisekiswa okusemthethweni nezenzo ezisemthethweni zisenzeka ezinhlelweni ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise amagama esimo sohlelo lokusebenza nezincazelo zesimo sesibonelelo, imihlahlandlela yokukhokha, namakhasi okulandelela ukuze umphumela ube nomqondo owengeziwe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-read-your-status-check-result\n• /guides/how-to-check-application-status-on-mobile\n• /status\n• /guides/what-to-do-after-a-status-check-result"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiphathe isimo njengomlayezo wasesiteji?",
        "body": "Ngoba imilayezo eminingi yesimo ibonisa ukuqhubeka noma ukulinda kunomphumela wokugcina."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlanganise imibuzo yesimo kanye nenkokhelo ndawonye?",
        "body": "Kuyasiza ukuwahlukanisa, ngoba ngokuvamile angokwezigaba ezahlukene."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze lapho ngifunda isimo?",
        "body": "Londoloza amagama kanye nosuku owakubona ngalo."
      }
    ]
  },
  "how-to-check-application-status-on-mobile": {
    "title": "Usihlola kanjani isimo sohlelo lokusebenza kuselula",
    "summary": "Umhlahlandlela wokuqala weselula wokuhlola isimo sohlelo lokusebenza ngokuphephile ocingweni ngaphandle kokulahlekelwa umzila, amagama, noma umthombo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola isimo sohlelo lokusebenza kumakhalekhukhwini ngokuvula umzila osemthethweni olungile, uhlole ikheli lekhasi ocingweni lwakho, futhi ufunde amagama ngokucophelela ngaphambi kokuvala ikhasi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi abaningi benza yonke into ocingweni. Lokho kwenza ukuhlola isimo seselula kuvame, kodwa futhi kusho indawo yesikrini esincane samakheli, amanothi, kanye nomxholo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ocingweni kulula ukugeja ikheli eligcwele, ukujaha umphumela, noma ukhohlwe ukulondoloza amagama owabonile. Umkhuba weselula ohamba kancane unganciphisa lokho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula umzila wesimo osemthethweni olungile kufoni yakho.\n2. Hlola ikheli lekhasi ngaphambi kokuqhubeka.\n3. Funda amagama aphelele, hhayi igama elingukhiye elilodwa kuphela.\n4. Londoloza isithombe-skrini noma inothi ukuze uthole ireferensi.\n5. Sebenzisa i-GrantCare ukuze utolike umphumela uma udinga usizo ngemva kwalokho."
      },
      {
        "title": "Ukuhlola kweselula kudinga ukuphunyuzwa okukodwa okwengeziwe",
        "body": "Ukuma kancane ukuhlola ikheli nokulondoloza amagama abaluleke kakhulu ocingweni ngoba isikrini esincane sifihla umongo kalula."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare isebenziseka kalula, kodwa akulona uhlelo olusemthethweni lwesimo. Ukuhlola okusemthethweni kusengokwendlela esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uguqule umphumela osheshayo wefoni ube ukuqonda okucacile ngokuchaza amagama ngolimi olulula ngemva kokuwuhlola ngokusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-r350-status-on-mobile\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/how-to-read-application-status-after-applying-online\n• /guides/how-to-save-your-status-results-for-reference\n• /guides/how-to-check-your-status-without-making-mistakes"
      },
      {
        "title": "I-FAQ: Kungani ukuhlola isimo seselula kulula ukusifunda kabi?",
        "body": "Ngoba isikrini esincane singafihla ikheli futhi senze abasebenzisi banyakaze ngokushesha kakhulu."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngigcine amagama efonini yami?",
        "body": "Yebo. Isithombe-skrini noma inothi lingakusiza ukuthi usiqhathanise ngokuhamba kwesikhathi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokubona umphumela?",
        "body": "Sebenzisa i-GrantCare ukuze uyitolike uma igama lisazwakala lingacacile."
      }
    ]
  },
  "what-to-do-if-your-application-status-does-not-update": {
    "title": "Okufanele ukwenze uma isimo sakho sohlelo lokusebenza singabuyekezi",
    "summary": "Umhlahlandlela wesinyathelo esilandelayo sabasebenzisi isimo sabo sohlelo lokusebenza esihlala sinjalo isikhathi eside futhi asisazizwa njengokulinda okuvamile.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma isimo sakho sesicelo singabuyekezi, qala ngokugcina amagama nosuku, bese unquma ukuthi udaba lusabukeka njengokulinda okuvamile noma manje ludinga ukulandelelwa ngokusemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isimo esingashintshi singasho ukulinda okuvamile, kodwa singasho futhi ukuthi inqubo isifinyelele endaweni lapho kungase kudingeke khona esinye isinyathelo noma ukucaciswa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi besabela ngaphambi kwesikhathi kakhulu, bangadala ukudideka okwengeziwe. Uma belinda isikhathi eside lapho icala lidinga usizo ngokucacile, ukucindezeleka kukhula kuphela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza amagama amanje kanye nosuku.\n2. Hlola ukuthi umyalezo ofanayo uhlale isikhathi esingakanani.\n3. Qhathanisa nomhlahlandlela wesimo we-GrantCare ofanayo.\n4. Gcina amarekhodi anoma yiziphi ezinye izinguquko ezenzeka eduze kwayo.\n5. Sebenzisa umzila osemthethweni uma isimo manje sidinga ukulandelela okuqondile kunokunye ukulinda."
      },
      {
        "title": "Inhloso wukwahlulela ukuthi ngabe lokhu kusekulindile yini okujwayelekile",
        "body": "Ukulinda isikhathi eside kulula ukukusingatha uma unganquma ukuthi umlayezo ofanayo usalingana yini nesiteji noma manje ukhomba icala elimile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuphoqa ukubuyekezwa kwesimo esisemthethweni. Isiza abasebenzisi ukuthi bahlulele lapho okunye ukulinda kusenengqondo nalapho udaba lungase ludinge ukunakwa okusemthethweni okuqondile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise amagama esimo angashintshiwe nemihlahlandlela elindile, yokuqinisekisa, yesikhalazo, nemihlahlandlela yokubambezeleka kokukhokha ukuze uyeke ukuqagela ngokungaboni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-your-status-does-not-change\n• /guides/how-status-check-pages-can-change-over-time\n• /guides/how-to-find-official-application-status-updates-safely\n• /guides/when-to-use-contact-details-instead-of-status-check\n• /status/pending"
      },
      {
        "title": "I-FAQ: Ingabe isimo esingashintshiwe sihlala sisho ukuthi kukhona okungalungile?",
        "body": "Cha. Kusengabonisa ukulinda, kodwa isikhathi nephethini kubalulekile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyigcine ngenkathi ngilindile?",
        "body": "Gcina amagama, izinsuku, nanoma yiziphi izinguquko ezihlobene nerekhodi."
      },
      {
        "title": "I-FAQ: Kunini lapho kufanele ngidlulele ngale kokulinda?",
        "body": "Lapho umlayezo ongashintshiwe awusabonakali ukulingana nesigaba esivamile senqubo."
      }
    ]
  },
  "how-to-read-application-status-after-changing-details": {
    "title": "Usifunda kanjani isimo sohlelo lokusebenza ngemuva kokushintsha imininingwane",
    "summary": "Umhlahlandlela wokuqonda imilayezo yesimo ngemva kokubuyekeza ifoni, ukubhanga, noma eminye imininingwane yohlelo lokusebenza.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngemva kokushintsha imininingwane, funda isimo sohlelo lokusebenza ngokuqaphela okwengeziwe ngoba kungenzeka ukuthi isistimu isabuyekeza noma iqinisekisa ulwazi olusha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ushintsho lwemininingwane lungathinta okwesikhashana indlela isimo esibukeka ngayo. Lokho akusho ngaso sonke isikhathi ukuthi lonke icala lishintshile. Kwesinye isikhathi kusho ukuthi ulwazi olubuyekeziwe lusadinga ukulungiswa noma ukuqinisekiswa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bavame ukwethuka lapho amagama esimo ashintsha ngemva kokubuyekezwa. Ukufunda okupholile kuqala ngokubuza ukuthi ingabe ushintsho lungase lubonise isibuyekezo ngokwaso."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qaphela ukuthi iyiphi imininingwane eyashintshwa futhi nini.\n2. Gcina amagama esimo esisha.\n3. Qhathanisa amagama neziqondiso mayelana nezibuyekezo zemininingwane nokuqinisekisa.\n4. Gwema ukuhlela okungadingekile okuphindaphindiwe.\n5. Sebenzisa umzila osemthethweni uma amagama amasha ekhomba ngokusobala inkinga ehlukile engayicacisi."
      },
      {
        "title": "Ukushintsha isimo ngemva kokubuyekezwa kudinga umongo",
        "body": "Isikhathi sokushintsha imininingwane sibalulekile. Ngaphandle kwalowo mongo, abasebenzisi bangakwazi ukufunda kabi isigaba sokuqinisekisa njengokwehluleka okukhulu kunalokho esiyikho ngempela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuqinisekisa umphumela wangaphakathi woshintsho lwemininingwane ohlelweni olusemthethweni. Ingasiza kuphela abasebenzisi ukuthi bafunde amaphethini azungezile ngokucophelela."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza uqhathanise amaphethini wesimo semininingwane eshintshile nefoni, ibhange, nemihlahlandlela yokuqinisekisa ukuze amagama amasha azwakale engaqondakali."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/what-pending-verification-means\n• /guides/how-to-check-status-after-changing-details\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe ukushintsha imininingwane kungaba nomthelela oboniswa yikhasi lesimo?",
        "body": "Yebo. Kwesinye isikhathi ingashintsha amagama ngesikhathi kusacutshungulwa ulwazi olusha."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithuke uma amagama eshintsha ngemva kokubuyekezwa?",
        "body": "Cha. Qala uqhathanise ushintsho nesikhathi sokubuyekeza kwakho kanye nohlobo lwemininingwane oyishintshile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngigweme ukuyenza?",
        "body": "Gwema ukuhlela okungadingekile okuphindaphindiwe ngaphambi kokuthi uqonde ukuthi isibuyekezo sokuqala sishintshe ini."
      }
    ]
  },
  "how-to-avoid-fake-application-status-pages": {
    "title": "Ungawagwema kanjani amakhasi wesimo sohlelo lokusebenza olungelona iqiniso",
    "summary": "Umhlahlandlela wokuthenjwa wokubona nokugwema amakhasi esimo sohlelo lokusebenza angamanga noma adukisayo ngaphambi kokuthi uthembele kuwo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Gwema amakhasi angamanga wesimo sohlelo lokusebenza ngokufanisa ikhasi nomzila osemthethweni olungile, uhlole ikheli ngokucophelela, futhi ungathembi izimangalo zesimo esikopishiwe ngaphandle komthombo osemthethweni ocacile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi wesimo ayimpokophelo evamile yokudideka ngoba abasebenzisi bafuna izimpendulo ezisheshayo. Lokho kwenza ukusesha okuhlobene nesimo kube enye yezindawo ezilula kakhulu zamakhasi akopishiwe ukuthi abukeke eqinisekisa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lesimo esingelona iqiniso lingadala ithemba elingamanga, ukwethuka okungamanga, noma izicelo ezingaphephile zemininingwane yomuntu siqu. Kungakho ukuhlola umthombo kubalulekile ngaphambi kokuhlolwa kwemiphumela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa uhlobo lokusekela kanye nomzila osemthethweni olungile.\n2. Hlola ikheli ngokucophelela.\n3. Gwema ukuthemba amakhasi aphinda amagama ezimo ezivamile kuphela.\n4. Yima uma ikhasi libuza imininingwane engajwayelekile noma lizizwa lingacacile.\n5. Sebenzisa umzila osemthethweni wesheke langempela kanye ne-GrantCare ukuze uthole incazelo kamuva."
      },
      {
        "title": "Amagama ajwayelekile kulula ukuwakopisha",
        "body": "Amagama agunyaziwe, alindile, noma anqatshiwe akukona okwenza ikhasi lesimo libe semthethweni. Umzila nomthombo yikona okubaluleke kakhulu."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare izimele futhi isho ngokucacile. Ichaza imilayezo yesimo, kodwa ayilokothi izenze ikhasi lesimo esisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi ukhombe uhlobo lomzila wesimo oludingayo ukuze mancane amathuba okuthi uthembe ikhasi elingumgunyathi ngephutha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-a-sassa-website-is-official\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-your-status-without-making-mistakes\n• /guides/how-to-find-official-status-check-updates-safely\n• /guides/official-status-check-vs-independent-guide"
      },
      {
        "title": "I-FAQ: Kungani amakhasi esimo somgunyathi ekholisa kangaka?",
        "body": "Ngoba bavame ukukopisha amagama afanayo esibonelelo abasebenzisi abalindele ukuwabona."
      },
      {
        "title": "I-FAQ: Yini ebaluleke ngaphezu kwamagama?",
        "body": "Umzila, ikheli, kanye nokuthi ngokusobala ikhasi elohlelo olusemthethweni yini."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma ikhasi lizwakala lingacacile?",
        "body": "Yima futhi uqinisekise umzila osemthethweni ngaphambi kokuthi uqhubeke."
      }
    ]
  },
  "how-to-find-official-application-status-updates-safely": {
    "title": "Uzithola kanjani izibuyekezo zesimo sohlelo lokusebenza ngokuphephile",
    "summary": "Umhlahlandlela wokuthola izibuyekezo zesimo esisemthethweni ngokuphepha ngaphandle kokuthembela emahlebeni, izithombe-skrini, noma imilayezo ekopishiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola izibuyekezo zesimo sohlelo lokusebenza ngokuphephile ngokubuyela emzileni olungile wesimo, uhlole umlayezo ngokuqondile, futhi unganciki ngezimangalo zesimo sesibili."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Izibuyekezo zesimo zizwakala ziphuthumayo, yingakho abasebenzisi bevamise ukwamukela ulwazi olukopishiwe ngokushesha okukhulu. Umkhuba ophephile ukuhlola umzila osemthethweni ngokuqondile esikhundleni sokuthemba inguqulo yomunye umuntu yesibuyekezo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Isibuyekezo esikopishiwe singasusa umongo ozungezile onikeza isimo incazelo yaso yangempela. Lokho kwenza kube lula ukungaqondi ukuthi yini eshintshile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Vula kabusha umzila osemthethweni wesimo.\n2. Hlola amagama amanje ngokuqondile.\n3. Gcina umlayezo omusha kanye nosuku.\n4. Gwema ukuthembela ezithombeni-skrini ezabiwe ezingenamthombo.\n5. Sebenzisa i-GrantCare ukuze uhumushe amagama ngemva kokuba ikhasi elisemthethweni likunikeze."
      },
      {
        "title": "Ukuhlola okuqondile kuphephile kunezibuyekezo ezenziwe ngesandla",
        "body": "Isibuyekezo sesimo esiphephe kunazo zonke yileso ozifundele sona ekhasini elisemthethweni elilungile. Yilokho okuvikela incazelo yomlayezo ekuphucweni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza ukuchaza izibuyekezo zesimo esisemthethweni, kodwa akufanele neze ithathe indawo yokuzihlola okusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingasiza abasebenzisi baqonde ukuthi ukubuyekezwa kwesimo esisha kuyasishintsha yini isiteji, isinyathelo esilandelayo esingaba khona, noma amagama kuphela azungeze udaba olufanayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-status-check-pages-can-change-over-time\n• /guides/how-to-read-your-status-check-result\n• /guides/how-to-avoid-fake-application-status-pages\n• /guides/how-to-save-your-status-results-for-reference\n• /status"
      },
      {
        "title": "I-FAQ: Kungani ukubuyekezwa kwesimo esabiwe kuyingozi?",
        "body": "Ngoba bavame ukususa umthombo, idethi, noma umongo ogcwele womlayezo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze lapho ngibona isibuyekezo esisha sesimo?",
        "body": "Londoloza amagama kanye nosuku ukuze ukwazi ukuqhathanisa kamuva."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokufunda isibuyekezo?",
        "body": "Sebenzisa i-GrantCare ukuze uyitolike uma igama lisazwakala lingacacile."
      }
    ]
  },
  "what-an-application-update-page-usually-means": {
    "title": "Ukuthi ikhasi lokubuyekeza uhlelo lokusebenza ngokuvamile lisho ukuthini",
    "summary": "Umhlahlandlela wolimi olulula wamakhasi akhuluma ngezibuyekezo zohlelo lokusebenza nokuthi yini abasebenzisi okufanele bayibheke ngaphambi kokuwaphatha njengamakhasi esenzo asemthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ikhasi lokubuyekeza uhlelo lokusebenza ngokuvamile lisho ikhasi elixhunywe ekuhloleni, ekuguquleni, noma ekulandeleni uhlelo olukhona kakade. Umnyakazo ophephe kakhulu uwukuqinisekisa ukuthi hlobo luni lwesibuyekezo esiphathwa yikhasi ngaphambi kokulisebenzisa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukucinga isibuyekezo lapho besho izinto ezihlukile: ukuhlola isimo, ukushintsha imininingwane, noma ukulandela uhlelo olukhona kakade. Kungakho amakhasi okuvuselela angazizwa engacacile ekuqaleni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ungazi ukuthi ikhasi elokuhlola, ukushintsha, noma ukuqinisekisa okuthile, kulula ukusebenzisa umzila ongalungile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi usho isibuyekezo sesimo, isibuyekezo semininingwane, noma ukulandelela uhlelo lokusebenza.\n2. Hlola ukuthi ikhasi liyahambisana yini naleyo nhloso.\n3. Qinisekisa umzila ngaphambi kokufaka noma yini.\n4. Gcina ireferensi yesicelo sakho sangaphambilini eduze.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuqonda ukuthi hlobo luni lwekhasi lokubuyekeza oludingayo ngempela."
      },
      {
        "title": "Isibuyekezo yigama elibanzi",
        "body": "Igama elithi update livame ukufihla umsebenzi wangempela. Umzila ophephile uvela uma ususho umsebenzi ngokucacile futhi uqondanise nekhasi nawo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisebenzi njengekhasi elisemthethweni lokubuyekeza uhlelo lokusebenza. Isiza abasebenzisi ukuthi baqonde ukuthi yiluphi uhlobo lomzila osemthethweni ongalingana nesibuyekezo samagama esimweni sabo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlukanise izinguquko zemininingwane, ukulandelela uhlelo lokusebenza, nokuhlola isimo ukuze wazi ukuthi yiliphi ikhasi lokubuyekeza elisemthethweni ongalethemba."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-application-status-after-changing-details\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/what-to-do-after-you-submit-an-online-application\n• /guides/how-to-find-the-right-sassa-website-for-your-task"
      },
      {
        "title": "I-FAQ: Kungani igama elithi update lidida?",
        "body": "Ngoba kungasho ukuhlola isimo, ukushintsha imininingwane, noma ukulandela uhlelo lokusebenza olukhona."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume kuqala?",
        "body": "Nquma ukuthi yiluphi uhlobo lwesibuyekezo ofuna ukusenza noma ukufunda."
      },
      {
        "title": "I-FAQ: Yini esiza ngemva kokuhlonza umsebenzi?",
        "body": "Qondanisa ikhasi nalowo msebenzi ngqo ngaphambi kokuwethemba."
      }
    ]
  },
  "how-reapplication-pages-usually-work": {
    "title": "Ngokuvamile amakhasi okufaka isicelo asebenza kanjani",
    "summary": "Umhlahlandlela wokuqonda ukuthi amakhasi okufaka isicelo angawaphi futhi nokuthi ahluke kanjani emizileni yokufaka isicelo sokuqala.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amakhasi wohlelo lokusebenza avamise ukuba khona ezimeni lapho kudingeka khona isinyathelo esisha sohlelo. Okubalulekile wukuqinisekisa ukuthi ukufaka isicelo kabusha kuyisinyathelo esifanele ngempela ngaphambi kokusebenzisa ikhasi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuphinda kufakwe isicelo akufani ngaso sonke isikhathi nesikhalazo futhi akufani ngaso sonke isikhathi nokuqala ku-zero. Ngokuvamile kungokwesimo esithile lapho uhlelo olusemthethweni ludinga isigaba esisha sokufaka isicelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bangamosha isikhathi uma bethuthela ekufakeni isicelo kabusha ngaphambi kokuthi baqonde ukuthi icala liyawudinga ngempela lowo mzila."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda amagama akamuva asemthethweni mayelana necala lakho.\n2. Hlola ukuthi ingabe ikhomba ngokusobala ekusetshenzisweni kabusha.\n3. Qinisekisa umzila osemthethweni wokufaka isicelo futhi.\n4. Lungiselela imininingwane namarekhodi ongawadinga futhi.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuqonda ukuthi ukufaka isicelo kabusha kuyasifanela ngempela yini isimo sakho."
      },
      {
        "title": "Ukusebenzisa kabusha kuyindlela, hhayi ukuqagela",
        "body": "Indlela ephephe kunazo zonke yokufinyelela ekufakweni kabusha ukukuphatha njengomzila othile osemthethweni wecala elithile, hhayi njengesinqamuleli esivamile lapho uzizwa ubambekile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza ukuphinda kusetshenziswe ngolimi olulula, kodwa isinyathelo esisemthethweni sokufaka isicelo sisesesohlelweni olusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ukuphinda usebenzise isicelo nesikhalazo, ukulinda isimo esijwayelekile, nemizila emisha yohlelo lokusebenza ukuze ukhethe isinyathelo esilandelayo ngokunembe kakhudlwana."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/reapplication-needed-meaning\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /status/reapplication-needed\n• /guides/how-to-find-the-official-reapplication-page-safely"
      },
      {
        "title": "I-FAQ: Ingabe ukufaka isicelo kabusha kuyafana nesikhalazo?",
        "body": "Cha. Ziyizindlela ezihlukene futhi akufanele zihlanganiswe ndawonye."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake isicelo kabusha ngoba nje ngizizwa ngibambekile?",
        "body": "Cha. Okokuqala hlola ukuthi amagama asemthethweni akhomba ukuphinda kusetshenziswe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqinisekise ngaphambi kokufaka isicelo kabusha?",
        "body": "Qinisekisa ukuthi ukufaka isicelo kabusha kuyisinyathelo esilandelayo esisemthethweni secala lakho."
      }
    ]
  },
  "how-to-know-if-reapplication-is-the-right-step": {
    "title": "Ungazi kanjani ukuthi isicelo se-SASSA siyisinyathelo esifanele",
    "summary": "Umhlahlandlela wesinqumo wabasebenzisi abangenaso isiqiniseko sokuthi kufanele balinde, bafake isikhalazo, noma basebenzise umzila wokuphinda usebenzise we-SASSA.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ukusebenzisa kabusha kuyisinyathelo esifanele kuphela lapho amagama akamuva asemthethweni ekhomba ngokusobala kumzila wohlelo lokusebenza omusha kunokulinda okuvamile noma isikhalazo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abasebenzisi bavame ukufinyelela usesho lohlelo lokusebenza futhi lapho bezizwa bevinjiwe. Lowo muzwa ungokoqobo, kodwa isinyathelo esifanele sisancike kulokho okushiwo igama elisemthethweni."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ukhetha ukufaka isicelo kusenesikhathi kakhulu, ungase usuke emzileni olingana necala. Uma uyigwema lapho idingeka ngokucacile, inqubo ingadonsa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda umlayezo wakamuva osemthethweni ngokucophelela.\n2. Nquma ukuthi kukhomba ekulindeni, ekudluliseleni icala, noma ekufakeni isicelo kabusha.\n3. Qhathanisa umlayezo neziqondiso ze-GrantCare zaleyo mizila emithathu.\n4. Gcina amarekhodi akho nezinsuku eduze.\n5. Yiya emzileni osemthethweni wokufaka isicelo kuphela uma amagama akusekela ngokucacile."
      },
      {
        "title": "Ukuzizwa ubambekile akufani nokudinga ukuphinda ufakwe isicelo",
        "body": "Ukuhlolwa okufanele akukona ukukhungatheka. Ukuhlola okulungile ukuthi umlayezo osemthethweni ukhomba ngempela umzila omusha wohlelo lokusebenza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukukwenzela isinqumo esisemthethweni. Ingakusiza kuphela ukuthi uqhathanise imizila yesinyathelo esilandelayo ngokucace kakhulu."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlele umehluko phakathi kwesikhalazo, ukulinda, nokusebenzisa futhi ukuze ukukhetha kuzwakale njengokuqagela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/reapplication-needed-meaning\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-reapplication-pages-usually-work\n• /guides/how-to-prepare-before-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngifake isicelo kabusha ngoba nje inqubo izwakala ihamba kancane?",
        "body": "Cha. Ukuthuthuka kancane kukodwa akufakazeli ukuthi ukuphinda kufakwe isicelo kuyadingeka."
      },
      {
        "title": "I-FAQ: Yini okufanele iqondise isinqumo kakhulu?",
        "body": "Amagama akamuva asemthethweni mayelana necala lakho kufanele aliqondise kakhulu."
      },
      {
        "title": "I-FAQ: Kuthiwani uma ngisazizwa ngingaqiniseki?",
        "body": "Qhathanisa imihlahlandlela yokulinda, isikhalazo, kanye nesicelo ngaphambi kokuthi wenze."
      }
    ]
  },
  "how-to-prepare-before-reapplying": {
    "title": "Uzilungiselela kanjani ngaphambi kokufaka kabusha kwe-SASSA",
    "summary": "Umhlahlandlela wokulungiselela wabasebenzisi abaqinisekise ukuthi ukufaka isicelo kabusha kwe-SASSA kuyadingeka futhi bafuna ukugwema ukuphinda ukudideka kwangaphambili.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Lungiselela ngaphambi kokufaka isicelo kabusha ngokuhlola ukuthi kungani isicelo futhi sidingeka, uqoqe amarekhodi akho, futhi uqinisekise ukuthi uyawuqonda umzila osemthethweni ozowusebenzisa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuphinda kusetshenziswe kusebenza kahle kakhulu uma abasebenzisi bengakuphathi njengokuphinda okungaboni kwesinyathelo sangaphambili. Umgomo uwukuqonda ukuthi yini eshintshile noma yini esabalulekile ngaphambi kokuba uqale futhi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ufaka isicelo kabusha ngaphandle kokulungiselela, ungase uphinde ukudideka okufanayo noma ulahlekelwe umkhondo wamarekhodi achaza icala langaphambili."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza amagama akamuva asemthethweni akhomba ukuphinda usebenzise.\n2. Qoqa ireferensi yakho yangaphambili namarekhodi.\n3. Hlola ukuthi ikhona yini imininingwane noma amadokhumenti adinga ukunakwa.\n4. Qinisekisa umzila osemthethweni wokufaka isicelo futhi.\n5. Qala ukufaka isicelo kabusha kuphela lapho amaphuzu ayinhloko esecacile."
      },
      {
        "title": "Isiqalo sesibili esingcono sivela kumarekhodi acacile",
        "body": "Ukuphinda ufake isicelo akukhona nje ukuthi uzame futhi. Kumayelana nokuqhubekisela phambili amarekhodi alungile kanye nokuqonda kusukela enqubweni yangaphambili."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukukuthumelela isicelo futhi. Kukusiza ukuthi ulungiselele ngokucace kakhudlwana umzila osemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlele amarekhodi angaphambili, uqhathanise ukuphinda usebenzise isicelo nesikhalazo, futhi ulungiselele isigaba sesimo esilandelayo ngemva kwalokho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/reapplication-needed-meaning\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-reapplication-pages-usually-work"
      },
      {
        "title": "I-FAQ: Kungani ulondoloza amagama angaphambili ngaphambi kokufaka isicelo kabusha?",
        "body": "Ngoba kuyasiza ukuchaza ukuthi kungani ukuphinda kufakwe isicelo futhi kugcina isinyathelo sesibili sigxilile."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiphathe ukufaka isicelo kabusha njengokuphinda okungaboni?",
        "body": "Cha. Kuyasiza ukuqonda umongo wangaphambili kuqala."
      },
      {
        "title": "I-FAQ: Yimaphi amarekhodi abaluleke kakhulu?",
        "body": "Izithenjwa zangaphambilini, amagama esimo sakamuva, nanoma imaphi amadokhumenti axhunywe necala."
      }
    ]
  },
  "what-to-check-before-you-reapply": {
    "title": "Okufanele ukuhlole ngaphambi kokufaka isicelo kabusha",
    "summary": "Umhlahlandlela olula wohlu lokuhlola wabasebenzisi abafuna ukwenza isiqiniseko sokuthi ukufaka isicelo kabusha kuyisinyathelo esilandelayo esilungile ngaphambi kokuthi bakuthumele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngaphambi kokufaka isicelo kabusha, hlola umlayezo wakamuva osemthethweni, amarekhodi akho angaphambili, umzila osemthethweni olungile, nokuthi ingabe ikhona imininingwane ebalulekile edinga ukubuyekezwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuphinda kusetshenziswe kungase kuzwakale njengempendulo esobala uma icala libambekile, kodwa uhlu lokuhlola olufushane lusiza abasebenzisi ukuthi bagweme ukuhamba ngesivinini esikhulu emzileni ongalungile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukuhlola okumbalwa okucacile kunganciphisa ukuphinda ukudideka futhi kwenze isinyathelo sesibili sihlanzeke kunesokuqala."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi amagama asemthethweni akhomba ngempela ekusetshenzisweni kabusha.\n2. Gcina ireferensi yakho yangaphambili namarekhodi eduze.\n3. Qinisekisa umzila osemthethweni wokufaka isicelo kabusha.\n4. Buyekeza imininingwane ebalulekile yanoma yini eshintshile.\n5. Londoloza umzila nesikhathi ngaphambi kokuthi uqhubeke."
      },
      {
        "title": "Uhlu lokuhlola olufushane luvikela umzamo wesibili",
        "body": "Iphuzu lalolu hlu lokuhlola alikona ukubambezeleka ngenxa yalo. Kuwukuqinisekisa ukuthi isinyathelo esilandelayo sinembile ngaphambi kokuthi uzibophezele kuso."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingasiza ngesinqumo namalungiselelo, kodwa isinyathelo esisemthethweni sokufaka isicelo sisesesohlelweni olusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uqhathanise ukuphinda usebenzise nezinye izinketho zesinyathelo esilandelayo futhi wenze uhlu lokuhlola luzizwe lusebenza kakhudlwana kunokungaphezu kwamandla."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /guides/how-to-prepare-before-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/reapplication-needed-meaning\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites"
      },
      {
        "title": "I-FAQ: Kungani kufanele usebenzise uhlu lokuhlola ngaphambi kokufaka isicelo kabusha?",
        "body": "Ngoba kunciphisa ithuba lokuthatha isinyathelo esilandelayo esingalungile ngokushesha."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqinisekise kuqala?",
        "body": "Qinisekisa ukuthi umlayezo wakamuva osemthethweni uyakweseka ukuphinda kusetshenziswe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlole kabusha imininingwane yami?",
        "body": "Yebo. Kuyasiza ukubuyekeza noma yini ebalulekile ngaphambi kokuthi uqale futhi."
      }
    ]
  },
  "how-to-find-the-official-reapplication-page-safely": {
    "title": "Ungalithola kanjani ngokuphepha ikhasi lokufaka isicelo le-SASSA elisemthethweni",
    "summary": "Umhlahlandlela ogxile ekuthembekeni wabasebenzisi abadinga umzila wokuphinda usebenzise i-SASSA futhi abafuna ukugwema amakhasi akopishiwe noma adukisayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thola ikhasi lokuphinda usebenzise elisemthethweni ngokuphepha ngokuqinisekisa ukuthi ukufaka isicelo kabusha kuyadingeka ngempela, bese uhlola umzila ngokucophelela ngaphambi kokufaka noma yimiphi imininingwane."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi okufaka isicelo kabusha angaheha ukudideka ngoba abasebenzisi bavame ukuwacinga ngenkathi becindezelwe. Lokho kwenza ukuhlola umzila osemthethweni kubaluleke kakhulu."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ikhasi lokufaka isicelo kabusha elingalungile liyinkinga ekabili: libambezela isinyathelo esilandelayo esifanele futhi lingadala ukudideka okusha phezu kwecala elivele linengcindezi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi ukufaka isicelo kabusha kuyindlela efanele.\n2. Vula ikhasi elisemthethweni emthonjeni othembekile.\n3. Hlola ikheli kanye nenjongo yekhasi ngokucophelela.\n4. Gwema izixhumanisi zokuphinda zikopishwe ezingenamthombo osemthethweni ocacile.\n5. Sebenzisa i-GrantCare kuphela ukuze uthole incazelo nokulungiselela ekhasini."
      },
      {
        "title": "Ikhasi elifanele lincike esinqumweni esifanele kuqala",
        "body": "Ukuthola ikhasi elisemthethweni lokufaka isicelo kabusha kuqala ngokuqinisekisa ukuthi ukufaka isicelo kabusha kuyisinyathelo osidingayo ngempela. Ukuhlola isixhumanisi kuza ngemva kwalokho, hhayi ngaphambili."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akulona ikhasi elisemthethweni lokuphinda ufake isicelo futhi akufanele neze kwenziwe iphutha nelilodwa."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi unqume ukuthi uyasidinga yini isicelo futhi, bese ikusiza ukuthi ubone uhlobo lwekhasi elisemthethweni okufanele ulufune."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /guides/reapplication-needed-meaning\n• /guides/how-to-prepare-before-reapplying\n• /guides/appeal-vs-reapplication-guide\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise ukufaka isicelo kabusha kuqala?",
        "body": "Ngoba indlela ephephe kakhulu incike ekutheni ukufaka kabusha kuyisinyathelo esilungile yini."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe isixhumanisi sokuphinda ngifake isicelo esivela eqenjini lengxoxo?",
        "body": "Cha. Qinisekisa umthombo osemthethweni kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ekhasini ngokwalo?",
        "body": "Hlola ukuthi ikhasi lifana kahle yini nomsebenzi osemthethweni wokufaka isicelo futhi owudingayo."
      }
    ]
  },
  "how-to-use-reapplication-pages-without-unofficial-sites": {
    "title": "Ungawasebenzisa kanjani amakhasi okufaka isicelo kabusha ngaphandle kwamasayithi angekho emthethweni",
    "summary": "Umhlahlandlela wokuphepha wabasebenzisi okudingeka baphinde bafake isicelo futhi abafuna ukugcina isenzo esisemthethweni sihlukile kunesiqondiso esizimele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amakhasi okufaka isicelo kabusha ngaphandle kwamasayithi angekho emthethweni ngokugcina isinyathelo sangempela sokufaka isicelo kumzila osemthethweni futhi usebenzise iziqondiso ezizimele kuphela ukulungiselela nokuqonda."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuqondisa okuzimele kusengaba usizo phakathi nokuphinda kufakwe isicelo, kodwa isenzo esisemthethweni ngokwaso kufanele sihlale emzileni osemthethweni. Lokho kwehlukana kuvikela ukwethembana futhi kunciphisa ukudideka."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi befiphalisa umugqa phakathi kwesiqondiso nesenzo esisemthethweni, bangagcina sebenikeze isinyathelo esibalulekile ekhasini elingalungile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Sebenzisa i-GrantCare ukuze uqonde ukuthi ukufaka isicelo kabusha kuyahambisana yini necala lakho.\n2. Yiya emzileni osemthethweni wokufaka isicelo ngesinyathelo sangempela.\n3. Qinisekisa ikhasi ngaphambi kokufaka imininingwane yakho.\n4. Londoloza isiqinisekiso esisemthethweni ngemva kokusithumela.\n5. Buyela ku-GrantCare kamuva ukuze uthole usizo lokufunda isimo esilandelayo noma umlayezo wokukhokha."
      },
      {
        "title": "Isiqondiso singasekela ukuphinda kufakwe isicelo ngaphandle kokusishintsha",
        "body": "Ukusetshenziswa okuphephe kakhulu kweziqondiso ezizimele kungaphambi noma ngemva kwesinyathelo esisemthethweni, hhayi esikhundleni saso. Lowo mthetho ubaluleke nakakhulu lapho icala selivele lizwakala liyinkimbinkimbi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwulwazi oluzimele kanye nenkundla yesikhumbuzo. Kufanele ihlale ihluke ngokusobala ezinhlelweni ezisemthethweni zokufaka isicelo kabusha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi ulungiselele ukuphinda usebenzise futhi uqonde ukuthi yini elandelayo, kuyilapho ugcina ukuthunyelwa okusemthethweni lapho kufanele khona."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-to-apply-without-using-unofficial-websites\n• /guides/how-to-prepare-before-reapplying\n• /guides/official-status-check-vs-independent-guide\n• /guides/where-to-confirm-payment-problems-officially"
      },
      {
        "title": "I-FAQ: Ingabe amasayithi azimele asengasiza ngokuphinda ufake isicelo?",
        "body": "Yebo, uma behlala ngokucacile endimeni yokuqondisa futhi bengazenzi umzila osemthethweni wokufaka isicelo kabusha."
      },
      {
        "title": "I-FAQ: Yini okufanele ihlale njalo kumzila osemthethweni?",
        "body": "Isenzo sangempela sokufaka isicelo futhi nanoma yisiphi isinyathelo esisemthethweni sokuhambisa kufanele kuhlale lapho."
      },
      {
        "title": "I-FAQ: I-GrantCare ingasiza kanjani?",
        "body": "I-GrantCare ingasiza ngokulungiselela, ukuqonda, kanye nokuhumusha kwesinyathelo esilandelayo emzileni osemthethweni."
      }
    ]
  },
  "what-to-do-if-the-reapplication-page-will-not-open": {
    "title": "Okufanele ukwenze uma ikhasi lokufaka isicelo kabusha lingavulwa",
    "summary": "Umhlahlandlela wokuxazulula izinkinga wamakhasi okusebenza kabusha asemthethweni ahlulekayo ukulayisha noma abonakala engatholakali uma abasebenzisi bewadinga kakhulu.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma ikhasi lokufaka isicelo kabusha lingeke livuleke, qala uliphathe njengomzila noma inkinga yokufinyelela futhi ugweme ukugxumela kwezinye izixhumanisi okungenzeka ukuthi azisemthethweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ikhasi lokuphinda lingalayishi livame ukusho inkinga yokufinyelela kuqala, hhayi ukuthi udaba lwakho ngokwalo lunqunywe ngendlela ehlukile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi abathuthumelayo kuleli phuzu kungenzeka ukuthi bachofoze izixhumanisi ezikopishiwe noma basebenzise umzila ongalungile, okwengeza inkinga yokwethembana enkingeni yobuchwepheshe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi umzila owusebenzisayo ungosemthethweni.\n2. Vuselela ikhasi noma uzame futhi isiphequluli.\n3. Hlola ukuxhumana nokulayisha ikhasi futhi.\n4. Gwema izixhumanisi ezishintshayo ezingahleliwe.\n5. Buyela emzileni osemthethweni uma inkinga yokufinyelela isixazululiwe."
      },
      {
        "title": "Phatha lokhu njengenkinga yokufinyelela ngaphambi kwanoma yini enye",
        "body": "Ukufundwa kokuqala okuphephe kakhulu ukuthi ikhasi alivulwa kahle, hhayi ukuthi icala lakho lonke lishintshe ngokuzumayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukulungisa ikhasi elisemthethweni lokuphinda usebenzise. Isiza abasebenzisi ukugwema ama-workaround angaphephile ngenkathi beqinisekisa umzila olungile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhlale ugxile ekhasini elisemthethweni elilungile futhi ugweme ukushintsha inkinga yesikhashana yokufinyelela ibe inkinga enkulu yokuthembana."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/how-reapplication-pages-usually-work\n• /guides/what-to-do-if-your-application-form-will-not-open\n• /guides/how-to-use-reapplication-pages-without-unofficial-sites\n• /guides/how-to-find-official-contact-details-safely"
      },
      {
        "title": "I-FAQ: Ingabe ikhasi lokuphinda lingalayishi lisho ukuthi ukuphinda kufakwe isicelo akusavunyelwe?",
        "body": "Akuvamile. Ivamise ukukhomba ekufinyeleleni noma enkingeni yomzila kuqala."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngichofoze noma yisiphi isixhumanisi esingena esikhundleni engisitholayo?",
        "body": "Cha. Hlala nemizila esemthethweni ethembekile esikhundleni sokushintshwa okungahleliwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola ukuthi umzila usemthethweni nokuthi ikhasi lilayisha lisuka endaweni efanele."
      }
    ]
  },
  "how-to-check-reapplication-status-safely": {
    "title": "Usihlola kanjani isimo sokufaka isicelo kabusha ngokuphepha",
    "summary": "Umhlahlandlela wokulandela isimo ngemuva kokufaka isicelo kabusha ngaphandle kokudida umzila wokufaka isicelo kabusha nomzila wesimo sakamuva.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlola isimo sokufaka isicelo kabusha ngokuphepha ngokuqinisekisa ukuthi isicelo sithunyelwe, bese usebenzisa umzila olungile wesimo osemthethweni wohlobo losekelo esikhundleni sokuqagela ekhasini lohlelo lokusebenza ngokwalo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isimo sokuphinda isicelo nesokufaka isicelo sixhumekile, kodwa azisona isinyathelo esifanayo. Abasebenzisi bavame ukuhlala isikhathi eside ekhasini lesicelo uma ulwazi olulandelayo oluwusizo manje selungomzila wesimo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma udida ukufaka isicelo kabusha nesimo sokufaka isicelo kabusha, kuba nzima ukusho ukuthi isigaba esilandelayo sesiqalile ngempela yini."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi isicelo kabusha sithunyelwe.\n2. Londoloza ireferensi nosuku.\n3. Linda isiteji esifanele ngaphambi kokuhlola isimo.\n4. Sebenzisa umzila osemthethweni wesimo.\n5. Sebenzisa i-GrantCare ukuze utolike umphumela uma ikhasi elisemthethweni seliwubonisile."
      },
      {
        "title": "Umzila wokufaka isicelo kabusha kanye nomzila wesimo awulona ikhasi elifanayo",
        "body": "Ukusebenzisa kabusha kuqalisa isigaba esilandelayo. Ukuhlola isimo kukutshela ukuthi icala likusiphi isigaba manje. Ukugcina lezo ndima zihlukene kwenza inqubo ibe lula kakhulu ukuyilandela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuhlola isimo sokuphinda sifake isicelo ngokuqondile. Isiza abasebenzisi ukuthi baqonde ukuthi yimuphi umzila okufanele bawusebenzise nokuthi bawafunda kanjani amagama ngokuphepha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekufakeni isicelo kabusha uye ekuhloleni isimo bese uye enkokhelweni noma kumhlahlandlela wesinyathelo esilandelayo lapho amagama ashintsha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-after-you-reapply-online\n• /guides/how-to-read-application-status-after-reapplication\n• /guides/how-to-check-application-status-on-the-official-portal-safely\n• /guides/reapplication-needed-meaning\n• /status"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngiqinisekise ukufaka isicelo kabusha kuqala?",
        "body": "Ngoba ukuhlola isimo akusizi kangako uma ungaqiniseki ukuthi isicelo kabusha sithunyelwe."
      },
      {
        "title": "I-FAQ: Ngingakwazi ukuhlola isimo sokufaka isicelo kabusha ekhasini lokufaka isicelo kabusha ngokwalo?",
        "body": "Umkhuba ophephile ukusebenzisa umzila osemthethweni wesimo lapho isigaba sokufaka isicelo kabusha sesiphelile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze ngaphambi kokuhlola isimo?",
        "body": "Londoloza isithenjwa sokufaka isicelo kabusha kanye nosuku esithunyelwe ngalo."
      }
    ]
  },
  "what-to-do-after-you-reapply-online": {
    "title": "Okufanele ukwenze ngemva kokufaka isicelo kabusha ku-inthanethi",
    "summary": "Umhlahlandlela ozolile wezinyathelo zokuqala ngemuva kokufaka kabusha ku-inthanethi ukuze abasebenzisi bagcine amarekhodi alungile kanye nokulindelwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngemva kokufaka isicelo kabusha ku-inthanethi, londoloza ukuqinisekiswa okusemthethweni, phawula idethi, futhi unikeze isikhathi senqubo ngaphambi kokuba uqale ukuhlola umnyakazo olandelayo wesimo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuphinda kuqedwe isigaba bese kuqala esinye. Isinyathelo esilandelayo esiwusizo kakhulu ukugcina amarekhodi acacile ukuze isigaba sesimo sakamuva sibe lula ukusilandela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi bangalahlekelwa inzuzo yesiqalo esisha uma bekhohlwa ukugcina amarekhodi afakazela ukuthi isicelo senzeka nini."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza isiqinisekiso sokufaka isicelo kabusha noma ireferensi.\n2. Qaphela usuku lokuhambisa.\n3. Gcina amarekhodi angaphambili namasha ndawonye.\n4. Linda isiteji sokuhlola isimo esifanele.\n5. Sebenzisa i-GrantCare kamuva ukuze uhumushe amagama amasha uma kudingeka."
      },
      {
        "title": "Ukuthunyelwa okusha kusadinga irekhodi elisha",
        "body": "Umphumela owusizo kakhulu wokufaka isicelo kabusha akukhona nje ukuthi isinyathelo senziwe. Futhi wukuthi manje usunerekhodi elisha elicacile lalokho okwenzeka ngokulandelayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikuqinisekisi ukuthunyelwa kwesicelo kabusha esisemthethweni ngaphakathi kwesistimu esemthethweni. Isiza abasebenzisi bazi ukuthi yini okufanele bayigcine nokuthi yini okufanele bayenze ngokulandelayo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi usuke ekusetshenzisweni kabusha uye esimweni, isikhathi, kanye nencazelo yokukhokha ngaphandle kokulahlekelwa umkhondo wesiteji esisha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-check-if-your-online-application-was-submitted\n• /guides/how-to-read-application-status-after-reapplication\n• /dashboard"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze ngemva kokufaka isicelo kabusha?",
        "body": "Londoloza ukuqinisekiswa okusemthethweni noma ireferensi kanye nosuku lokuthumela."
      },
      {
        "title": "I-FAQ: Kungani ugcina amarekhodi angaphambili namasha ndawonye?",
        "body": "Ngoba basiza ukukhombisa indaba ephelele yecala kuzo zombili izigaba."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngihlole isimo ngokushesha futhi?",
        "body": "Ngokuvamile kuyasiza ukunikeza inqubo isikhathi esithile kuqala."
      }
    ]
  },
  "how-to-keep-records-after-reapplying": {
    "title": "Ungawagcina kanjani amarekhodi ngemva kokufaka isicelo kabusha",
    "summary": "Umhlahlandlela osebenzayo wokugcina amarekhodi okufaka isicelo ecacile ukuze isimo sakamuva kanye nemibuzo yokukhokha kube lula ukuyilandela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Gcina amarekhodi ngemva kokufaka isicelo kabusha ngokulondoloza ireferensi entsha, idethi yokuthunyelwa, amagama akamuva asemthethweni, nanoma imaphi amarekhodi angaphambili achaza ukuthi kungani ukufaka isicelo futhi kwenzeke."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuphinda kufakwe isicelo kudala isendlalelo sesibili samarekhodi. Ngaphandle komkhuba olula wokugcina amarekhodi, kuba nzima kakhulu ukuqhathanisa okushintshile kusuka esigabeni sangaphambili kuya kwesisha."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amarekhodi amahle asiza abasebenzisi ukuthi bagweme ukuhlanganisa imilayezo yesimo yangaphambili nemisha futhi enze ukulandelela kwakamuva kucace nakakhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Londoloza ireferensi entsha yohlelo lokusebenza.\n2. Gcina izinsuku ezintsha nezangaphambili zindawonye.\n3. Londoloza amagama akamuva asemthethweni ngemva kokufaka isicelo kabusha.\n4. Izithombe-skrini namanothi ahlobene neqembu endaweni eyodwa.\n5. Buyekeza umugqa wesikhathi ngaphambi kokuthatha isinyathelo esilandelayo esisemthethweni."
      },
      {
        "title": "Isigaba sesibili sidinga umugqa wesikhathi ocacile",
        "body": "Ukusebenzisa kabusha kudala ngaphambi nangemuva. Umugqa wesikhathi olula wenza kube lula kakhulu ukubona ukuthi yini eshintshile nokuthi yini engazange inyakaze."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikugcineli amarekhodi asemthethweni ngokuzenzakalelayo. Abasebenzisi kufanele bagcine amakhophi abo ezibuyekezo ezibalulekile ezisemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe umugqa wesikhathi kumarekhodi akho ngokuwuqhathanisa nokuphinda usebenzise, ​​isimo, nemihlahlandlela yokukhokha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-after-you-reapply-online\n• /guides/how-to-read-application-status-after-reapplication\n• /guides/how-to-check-reapplication-status-safely\n• /guides/how-to-keep-records-for-an-appeal\n• /guides/how-to-keep-records-of-payment-problems"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyiqophe kuqala ngemva kokufaka isicelo kabusha?",
        "body": "Rekhoda ireferensi entsha kanye nosuku lokuphinda ufake isicelo kuqala."
      },
      {
        "title": "I-FAQ: Kungani futhi ugcine amarekhodi amadala?",
        "body": "Ngoba ziyachaza ukuthi kungani isicelo futhi senzeka futhi zikusiza ukuthi uqhathanise okushintshile kamuva."
      },
      {
        "title": "I-FAQ: Ngabe umugqa wesikhathi usiza kanjani?",
        "body": "Kukusiza ukuthi uhlukanise isiteji sangaphambili nesisha ngokucacile."
      }
    ]
  },
  "how-to-read-application-status-after-reapplication": {
    "title": "Usifunda kanjani isimo sohlelo lokusebenza ngemuva kokufaka isicelo futhi",
    "summary": "Umhlahlandlela wokufunda amagama esimo ngemva kokufaka isicelo kabusha ngaphandle kokuhlanganisa isigaba secala elidala nelisha.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Funda isimo sohlelo lokusebenza ngemva kokufaka kabusha ngokusiphatha njengesiteji esisha, ulondoloze amagama amasha, futhi usiqhathanise nedethi yokufakwa kabusha kwesicelo esikhundleni sokulindelwe okudala kuphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngemva kokufaka kabusha, abasebenzisi bavamise ukuthwala ukukhungatheka kwesigaba sangaphambili bakuyise kwesisha. Kuyaqondakala lokho, kodwa kuyasiza ukufunda isimo esisha njengengxenye yesiteji esisha esinomugqa wesikhathi waso."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abasebenzisi beqhathanisa yonke imilayezo emisha kuphela nenkinga yangaphambili, bangase baphuthelwe lokho okuboniswa yisiteji esisha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Gcina amagama amasha ngemva kokufaka isicelo futhi.\n2. Qhathanisa nosuku lokuphinda ufake isicelo kanye nereferensi.\n3. Funda umlayezo omusha njengengxenye yesiteji esisha.\n4. Sebenzisa umhlahlandlela ofanayo we-GrantCare wamagama owabonayo.\n5. Gcina amarekhodi angaphambili namanje ehlukene ngokwanele ukuze uwaqhathanise ngokucacile."
      },
      {
        "title": "Isiteji esisha sifanelwe ukufundwa kwaso",
        "body": "Umlayezo wesimo sokufaka isicelo kabusha kufanele ufundwe ekukhanyeni kwesiteji esisha, hhayi kuphela ngokukhungatheka kwesiteji esidala. Lokho kushintsha ngokuvamile kwenza amagama aqondwe kalula."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingachaza amagama amasha, kodwa ukuqinisekiswa kwesimo esisemthethweni kusesekumzila osemthethweni owubonisayo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uxhume umugqa wesikhathi wokufaka isicelo kabusha namagama esimo esisha ukuze ungagoqi izigaba ezimbili zibe indaba eyodwa edidayo."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-reapplication-status-safely\n• /guides/reapplication-needed-meaning\n• /guides/how-to-keep-records-after-reapplying\n• /guides/how-to-read-application-status-after-applying-online\n• /status"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngikuphathe njengesiteji esisha?",
        "body": "Ngoba ukuphinda kufakwe isicelo kuqala umugqa wesikhathi omusha futhi isimo esisha sidinga ukufundwa kulowo mongo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngigcine amarekhodi angaphambili?",
        "body": "Yebo, kodwa ziqhathanise ngokucophelela esikhundleni sokuhlanganisa yonke imilayezo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyilondoloze kusukela kusiteji esisha?",
        "body": "Londoloza amagama amasha, idethi, kanye nereferensi yokuphinda usebenzise isicelo."
      }
    ]
  },
  "what-sc19-searches-usually-mean": {
    "title": "Kusho ukuthini i-SC19 emakhasini we-SRD",
    "summary": "Umhlahlandlela wolimi olulula wokuthi i-SC19 isho ukuthini esimweni se-SRD noma emakhasini ohlelo lokusebenza, nokuthi kungani abasebenzisi kufanele bagxile emsebenzini osemthethweni ngemuva kwethemu esikhundleni sekhodi yodwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma useshe i-SC19, ngokuvamile uzama ukufinyelela uhlelo oluthile oluhlobene ne-SRD noma umzila wesimo. Ukunyakaza okuphephe kakhulu ukukhomba umsebenzi ongemuva kwekhodi ngaphambi kokuthi uthembe ikhasi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhodi afana ne-SC19 angabukeka ecacile futhi ngenxa yalokho ethembeke kakhulu. Inkinga ukuthi abasebenzisi bangase bagxile kukhodi ngokwayo futhi bakhohlwe ukuhlola ukuthi ikhasi lisafana yini nomsebenzi osemthethweni abawudingayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Usesho olusekelwe kukhodi lungazwakala lunembe ngenkathi lusaholela ekudidekeni uma umsebenzisi engazi ukuthi uyaludinga yini uhlelo lokusebenza, isimo, noma omunye umzila."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Nquma ukuthi uyaludinga yini uhlelo lokusebenza, isimo, noma omunye umsebenzi ohlobene ne-SRD.\n2. Qondanisa usesho olusekelwe kukhodi nalowo msebenzi.\n3. Qinisekisa umzila wekhasi ngaphambi kokuwusebenzisa.\n4. Gwema ukwethemba izixhumanisi ezisekelwe kukhodi ezabiwe ngaphandle komongo.\n5. Sebenzisa i-GrantCare uma udinga usizo lokuhumusha igama lokusesha libe umsebenzi osemthethweni ofanele."
      },
      {
        "title": "Ikhodi akuwona umsebenzi",
        "body": "Imigomo yesitayela se-SC19 ingasiza abasebenzisi ukuthi bathole amakhasi, kodwa akufanele bathathe indawo yombuzo obaluleke kakhulu wokuthi imuphi umsebenzi osemthethweni ikhasi elihloselwe ukuwenza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare akulona ikhasi le-SC19 elisemthethweni. Isiza abasebenzisi baqonde ukusesha okusekelwe kukhodi ngaphandle kokuzenza umzila osemthethweni ngokwawo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza ukuthi uhumushe amagama okusesha afana nekhodi kuhlelo lokusebenza olusemthethweni olulungile, isimo, noma umzila wokulandelela ngaphambi kokuthi uchofoze kude kakhulu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-use-sc19-pages-safely\n• /guides/how-to-check-srd-status-online\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-start-an-r350-online-application-safely\n• /guides/how-to-find-the-right-sassa-website-for-your-task"
      },
      {
        "title": "I-FAQ: Kungani ukusesha kwe-SC19 kuzwakala kuthembekile?",
        "body": "Ngoba ikhodi izwakala iqondile, okungenza abasebenzisi bathembe umphumela ngokushesha okukhulu."
      },
      {
        "title": "I-FAQ: Yini okufanele nginqume ngaphambi kokwethemba ikhasi le-SC19?",
        "body": "Nquma ukuthi yimuphi umsebenzi odinga ukuthi ikhasi liwuphathe."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingasebenzisa i-SC19 njengomzila osemthethweni?",
        "body": "Cha. Isiza kuphela ukuchaza ukuthi igama lokusesha lingase libhekisele kuphi."
      }
    ]
  },
  "how-to-use-sc19-pages-safely": {
    "title": "Asetshenziswa kanjani amakhasi e-SC19 ngokuphepha",
    "summary": "Umhlahlandlela wokuphepha wabasebenzisi abahlala kuhlelo lokusebenza lwesitayela se-SC19 noma amakhasi wesimo futhi abafuna ukwenza isiqiniseko sokuthi bawusebenzisa ngendlela efanele umzila.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Sebenzisa amakhasi esitayela se-SC19 ngokuphepha ngokuqinisekisa ukuthi ikhasi elokufaka isicelo noma isimo, uhlole umzila ngokucophelela, futhi uphathe izixhumanisi ezikopishiwe ngokuqaphela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amakhasi esitayela se-SC19 avame ukutholakala ngokusesha okuqondile noma izixhumanisi ezabiwe. Lokho kwenza kubaluleke kakhulu ukuqinisekisa injongo yekhasi ngaphambi kokufaka imininingwane noma ukwethemba umphumela owubonayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Umsebenzisi odida ikhasi lohlelo lokusebenza ngekhasi lesimo angalahlekelwa isikhathi, afunde kabi isinyathelo esilandelayo, noma athembe umzila ongalungile ngokushesha okukhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ukuthi ikhasi elokufaka isicelo, isimo, noma omunye umsebenzi wokulandelela.\n2. Qinisekisa umzila nekheli ngokucophelela.\n3. Gwema ukwethemba izixhumanisi ezidluliselwe phambili ze-SC19 ezingenamthombo.\n4. Sebenzisa ikhasi kuphela kumsebenzi eliwuphethe ngokucacile.\n5. Sebenzisa i-GrantCare ukuze uhumushe umphumela noma amagama ngemva kokuba ikhasi elisemthethweni liwunikeze."
      },
      {
        "title": "Inhloso yekhasi iza ngaphambi kwekhodi yekhasi",
        "body": "Umbuzo owusizo kakhulu akukhona nje ukuthi leli yikhasi le-SC19. Umbuzo ongcono ngowokuthi empeleni imuphi umsebenzi owenzelwa leli khasi njengamanje."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iwumhlahlandlela ozimele hhayi umzila osemthethweni we-SC19. Izenzo ezisemthethweni zisengezohlelo olusemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "I-GrantCare ingakusiza unqume ukuthi ikhasi le-SC19 lisetshenziselwa umsebenzi ofanele futhi lingachaza amagama avela lapho kamuva."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-sc19-searches-usually-mean\n• /guides/how-to-check-if-an-online-application-link-is-official\n• /guides/how-to-find-an-official-application-status-page-safely\n• /guides/how-to-check-srd-status-online\n• /guides/official-status-check-vs-independent-guide"
      },
      {
        "title": "I-FAQ: Kungani kufanele ngihlole ukuthi ikhasi elokufaka isicelo noma isimo?",
        "body": "Ngoba ukusebenzisa injongo yekhasi engalungile kudala ukudideka okungadingekile mayelana nesinyathelo esilandelayo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngethembe noma yisiphi isixhumanisi se-SC19 umuntu engithumelela sona?",
        "body": "Cha. Qinisekisa umthombo nomsebenzi kuqala."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze ngemva kokubona umphumela?",
        "body": "Sebenzisa i-GrantCare ukuhumusha amagama uma ikhasi elisemthethweni seliyibonisile."
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

export const SEO_BATCH_THIRTEEN_GUIDES = SEO_BATCH_THIRTEEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
