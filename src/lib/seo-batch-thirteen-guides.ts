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

export const SEO_BATCH_THIRTEEN_GUIDES = [
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
