const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

export const SEO_BATCH_ONE_GUIDES = [
  {
    slug: "why-is-my-status-pending",
    title: "Why your status is pending",
    summary:
      "A plain-language guide to what a pending status usually means, why it can stay that way, and what to do next without making the situation worse.",
    sections: [
      section(
        "Quick answer",
        "A pending status usually means the official review is not finished yet. It does not automatically mean you will be declined, but it does mean the final outcome is still outstanding.",
      ),
      section(
        "What this means",
        "When a status shows pending, the official system is still checking records or waiting for a process to clear. In many cases, nothing is wrong on your side yet. It often means the application has not reached a final approved or declined result for that cycle.",
      ),
      section(
        "Why this happens",
        "Pending can happen when records still need to match, when updates are moving through the system, or when there is a high volume of applications under review. It can also happen after a recent change to your phone number, banking details, or personal information, because the system may need time to process the update.",
      ),
      section(
        "What you can do next",
        "1. Check the exact wording on the official status page.\n2. Make sure your contact and banking details are still correct.\n3. Avoid resubmitting the same information unless the official system asks you to do that.\n4. Check again after the next normal update cycle.\n5. If the status stays pending for a long time, use the official channel to see whether another step is required.",
      ),
      section(
        "Important things to remember",
        "Pending is a waiting status, not a final answer. Rechecking the page many times in one day usually does not change the result. Be careful of anyone who promises to speed up a pending application for money, because official decisions must stay on the official system.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare is an independent information and reminder platform. It can help you understand common status wording, follow payment date updates, and keep track of the next page to read while you wait for an official update.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/pending\n• /guides/status-stuck-pending\n• /guides/sassa-status-meaning\n• /payment-dates\n• /eligibility-checker",
      ),
      faq(
        "Can pending change to approved?",
        "Yes. Pending can later change to approved, declined, or another status depending on the official review outcome.",
      ),
      faq(
        "Does pending mean there is a problem?",
        "Not always. Sometimes it only means the checks are still running or the system has not updated yet.",
      ),
      faq(
        "Should I reapply while my status is pending?",
        "Only reapply if the official system clearly tells you to do that. A duplicate application can create more confusion.",
      ),
    ],
    featured: true,
    sponsored: false,
    sortOrder: 4,
  },
  {
    slug: "what-does-declined-mean",
    title: "What declined means",
    summary:
      "A calm guide to what a declined status means, why it happens, and how to decide whether you should gather proof, appeal, or review your details first.",
    sections: [
      section(
        "Quick answer",
        "A declined status means the official system decided that the application did not pass one or more rules for that period or review. It is a final result for that check, but it is not always the end of the road.",
      ),
      section(
        "What this means",
        "Declined usually means the official review found a reason not to approve the application at that stage. The key point is the exact decline reason shown on the official system. That reason tells you whether the issue is about income, identity, duplication, another form of support, or missing information.",
      ),
      section(
        "Why this happens",
        "A decline can happen because the system found income or support that affects eligibility, because records did not match, because a previous application already exists, or because a rule was not met for that period. Some users are declined because details on the application do not line up with official records, even when they believe they should qualify.",
      ),
      section(
        "What you can do next",
        "1. Read the exact decline reason on the official system.\n2. Compare that reason with your ID, phone, banking, and support details.\n3. Gather any documents you may need before taking the next step.\n4. Use the official appeal or reconsideration route if you believe the decline is wrong.\n5. Keep screenshots or notes of dates and status changes for your own record.",
      ),
      section(
        "Important things to remember",
        "Do not guess the reason for a decline if the official system already gives one. Do not pay anyone to 'fix' a decline outside the official route. A decline is serious, but it does not always mean you have no next step. In some cases, the best next move is an appeal. In others, it may be correcting information or waiting for a new application window.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you understand common decline reasons in plain language, compare the next-step options, and read practical guidance before you use the official channel. The aim is to reduce confusion, not replace the official process.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/declined\n• /guides/appeal-after-decline\n• /guides/what-does-approved-mean\n• /guides/what-documents-you-may-need\n• /eligibility-checker",
      ),
      faq(
        "Can a declined status be appealed?",
        "In many cases there is an official appeal or reconsideration path, but you should follow the exact option shown on the official system.",
      ),
      faq(
        "Should I submit a new application straight away?",
        "Not unless the official system tells you to reapply. Sometimes an appeal is the correct route, not a fresh application.",
      ),
      faq(
        "Does declined mean I can never qualify?",
        "No. It means the application was not approved for that review. Whether you may qualify later depends on your official circumstances and the current rules.",
      ),
    ],
    featured: true,
    sponsored: false,
    sortOrder: 5,
  },
  {
    slug: "what-does-approved-mean",
    title: "What approved means",
    summary:
      "A clear explanation of what an approved status usually means, what it does not mean yet, and the next checks to make before expecting payment.",
    sections: [
      section(
        "Quick answer",
        "Approved usually means the official checks for that application or period were passed. It is good news, but it does not always mean the money has already been sent.",
      ),
      section(
        "What this means",
        "When a status shows approved, the system has accepted the application for that stage. The next part is often payment scheduling, payment method confirmation, or waiting for the correct payment cycle. Many users feel relief when they see approved, but the process may still have one more practical step before funds are available.",
      ),
      section(
        "Why this happens",
        "Approved appears when the available records matched the rules closely enough for the application to pass. It may show before a payment date is published, before the bank or collection method is confirmed, or before the next payout run happens. That is why approved can exist for a while before a payment reflects.",
      ),
      section(
        "What you can do next",
        "1. Check whether there is already a payment date linked to the approved result.\n2. Make sure your banking or collection details are still correct.\n3. Keep your phone available in case the official system needs confirmation.\n4. Watch for new wording if the status changes from approved to a payment-related message.\n5. If the approval stays without payment for too long, check the official system again before assuming something is wrong.",
      ),
      section(
        "Important things to remember",
        "Approved does not always mean paid. The official payment date can still be pending, and different payment methods can move at different speeds. Always use the official system for confirmation if the payment does not arrive when expected.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you read the difference between approved, payment processing, banking issues, and missing-payment situations. You can also use the payment date pages and reminders to keep track of the next expected update.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/approved\n• /guides/approved-but-no-payment\n• /payment-dates\n• /guides/payment-dates-by-month\n• /guides/sassa-status-meaning",
      ),
      faq(
        "If I am approved, when will I be paid?",
        "There is no single answer for every case. Look for an official payment date or payment-related update rather than assuming payment is immediate.",
      ),
      faq(
        "Can approved change later?",
        "Sometimes the wording after approval changes into a payment or verification step. That does not always mean the approval was taken away, but it does mean you should read the latest message carefully.",
      ),
      faq(
        "Should I do anything after approval?",
        "Usually the best next step is to check your payment method, watch for the payment date, and use the official channel if the payment does not arrive.",
      ),
    ],
    featured: true,
    sponsored: false,
    sortOrder: 6,
  },
  {
    slug: "approved-but-no-payment",
    title: "Status says approved but no payment",
    summary:
      "A practical page for users who can see approved on the official system but still have not received payment, with calm checks to make before escalating.",
    sections: [
      section(
        "Quick answer",
        "If your status says approved but no payment has arrived, the most common reason is that the payment step is still catching up. Approval and payment do not always happen at the same time.",
      ),
      section(
        "What this means",
        "Approved without payment usually means the application passed review, but the payment date, payment batch, or payment method is still not complete. In some cases, the delay is short. In others, the official system may show a new message later that points to banking, verification, or processing.",
      ),
      section(
        "Why this happens",
        "This gap can happen when the payment date has not been published yet, when bank or collection details still need to clear, when a payment batch is delayed, or when the money was sent back because the payment method failed. It can also happen around weekends, public holidays, or heavy update periods.",
      ),
      section(
        "What you can do next",
        "1. Check whether the official system shows a payment date or only an approval result.\n2. Review your banking or collection details and make sure nothing changed.\n3. Look for any new wording such as payment processing or banking issue.\n4. Give the system a little time if the approval is very recent.\n5. Use the official channel if approval remains in place but payment still does not arrive after the next reasonable update.",
      ),
      section(
        "Important things to remember",
        "Do not assume approved means same-day payment. Do not change your details repeatedly unless something is actually wrong. A rushed change can create a new delay. For official confirmation, always go back to the relevant government channel.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you compare approval wording with payment-related wording, track the latest published dates, and save the pages that matter while you wait for the next update.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/approved\n• /guides/payment-processing-meaning\n• /guides/fix-banking-details\n• /payment-dates\n• /guides/how-grant-reminders-can-help",
      ),
      faq(
        "Can I be approved and still have a banking problem?",
        "Yes. Approval can happen before the payment method issue is fully visible, so it is worth checking for any new payment-related message.",
      ),
      faq(
        "Should I wait or report the problem straight away?",
        "If approval is very recent, waiting for the next update can be reasonable. If the delay has gone on for a while, use the official route to check whether another step is needed.",
      ),
      faq(
        "Could my payment date still be missing?",
        "Yes. An approved result can appear before a final payment date is shown.",
      ),
    ],
    featured: true,
    sponsored: false,
    sortOrder: 7,
  },
  {
    slug: "banking-details-pending-meaning",
    title: "Banking details pending meaning",
    summary:
      "A simple explanation of what banking details pending usually means, why it happens, and how to avoid common mistakes when fixing it.",
    sections: [
      section(
        "Quick answer",
        "Banking details pending usually means the payment method information has not been fully accepted or verified yet. The application may still move forward, but payment can be delayed until that step is cleared.",
      ),
      section(
        "What this means",
        "This status points to the payment side of the process, not always the approval side. The official system may still be checking whether the banking details belong to you, whether the account format is correct, or whether a chosen payment method is ready to use.",
      ),
      section(
        "Why this happens",
        "Common reasons include using an account that is not in your own name, entering details incorrectly, changing bank details recently, selecting a payment method that still needs approval, or waiting for a verification step between the official system and the bank.",
      ),
      section(
        "What you can do next",
        "1. Recheck the official payment details page carefully.\n2. Make sure the account is active and in your own name.\n3. Correct any small typing errors in account information.\n4. Avoid changing the details again and again after you submit the correct version.\n5. Watch for a new official update before assuming the change failed.",
      ),
      section(
        "Important things to remember",
        "Using someone else's account can cause problems. A pending banking status does not always mean the whole application failed. It often means the payment route is still being settled. Only update banking details through the official system.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you understand payment method wording, read guides about common banking issues, and keep track of payment date pages once the banking step is sorted out.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/banking-issue\n• /guides/fix-banking-details\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-to-keep-your-details-updated\n• /payment-dates",
      ),
      faq(
        "Does banking details pending mean I am declined?",
        "No. It usually means the payment method step still needs to clear.",
      ),
      faq(
        "Can I use another person's bank account?",
        "That often creates trouble. Use the payment method allowed by the official system and follow the official requirements closely.",
      ),
      faq(
        "How long does banking verification take?",
        "There is no single fixed answer. It depends on the official update cycle and whether the submitted details match correctly.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 8,
  },
  {
    slug: "identity-verification-required-meaning",
    title: "Identity verification required meaning",
    summary:
      "A practical guide to what identity verification required usually means, why the step appears, and how to handle it safely through official channels.",
    sections: [
      section(
        "Quick answer",
        "Identity verification required means the official system still needs to confirm who you are before the process can move on. It is a verification step, not automatically a rejection.",
      ),
      section(
        "What this means",
        "This status usually appears when the system cannot complete the ID check with enough confidence. The record may need another confirmation step before approval or payment can continue. The exact process depends on the official route being used, so the safest move is always to follow the official instruction shown with that status.",
      ),
      section(
        "Why this happens",
        "The most common reasons are mismatched identity details, a record that does not match what was entered on the application, a phone number linked to another record, or an official request for an extra verification step. Sometimes it is a small data problem. Sometimes it is a deliberate security check.",
      ),
      section(
        "What you can do next",
        "1. Read the exact identity verification message on the official system.\n2. Check your ID number, names, and other basic details carefully.\n3. Complete the official verification step only through the official link or process.\n4. Keep screenshots or notes of what you completed.\n5. Check again after the verification has had time to reflect on the system.",
      ),
      section(
        "Important things to remember",
        "Do not use third-party websites or pay someone to complete identity verification for you. Verification is sensitive, and official channels matter. A verification status is usually something to resolve, not something to panic about.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you understand why identity wording appears, compare it with pending or declined statuses, and read the next best guide before you return to the official system.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/identity-verification\n• /guides/why-identity-verification-fails\n• /guides/how-to-check-your-status\n• /guides/status-stuck-pending\n• /eligibility-checker",
      ),
      faq(
        "Does identity verification required mean I will be declined?",
        "No. It means another step must clear first. The final result still depends on the official review.",
      ),
      faq(
        "Can the status change after I complete verification?",
        "Yes. Once the verification clears, the wording may change to pending, approved, declined, or another update.",
      ),
      faq(
        "Should I keep retrying the verification step?",
        "Only retry when the official system allows it. Repeating the same step without a clear reason can create more confusion.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 9,
  },
  {
    slug: "failed-status-meaning",
    title: "Failed status meaning",
    summary:
      "A careful explanation of what a failed status can mean, why the exact wording matters, and how to work out whether the problem is with payment, verification, or another step.",
    sections: [
      section(
        "Quick answer",
        "A failed status usually means one part of the process did not complete successfully. The important thing is to check what failed, because a failed payment is different from a failed identity or bank verification.",
      ),
      section(
        "What this means",
        "Failed is a broad warning word. It often points to a broken step rather than a full explanation by itself. On some records, the failure is about payment. On others, it may be tied to banking details, verification, or a technical problem. That is why the exact wording around the failed message matters so much.",
      ),
      section(
        "Why this happens",
        "The process can fail because banking details did not validate, because identity checks did not complete, because a payment attempt was rejected, or because the system needs a fresh action before moving forward. A failed step can also appear after details were changed recently and have not yet cleared properly.",
      ),
      section(
        "What you can do next",
        "1. Read the full status wording, not just the word failed.\n2. Check whether the failed step is linked to payment, bank details, or identity verification.\n3. Correct the specific issue only if the official system shows what needs to be fixed.\n4. Keep a note of the date the failed status appeared.\n5. Use the official channel if the same failure keeps returning with no clear reason.",
      ),
      section(
        "Important things to remember",
        "Failed does not tell the whole story on its own. Treat it as a signal to look more closely, not as a final explanation. Do not share sensitive information with unofficial helpers who claim they can repair a failed record for a fee.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you break down failed wording into common categories, so you know whether to read a banking guide, a verification guide, or a payment issue guide next.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/payment-failed\n• /status/banking-issue\n• /status/identity-verification\n• /guides/how-to-fix-missing-payment-issues\n• /guides/fix-banking-details",
      ),
      faq(
        "Is failed the same as declined?",
        "No. Declined usually refers to the decision on eligibility or approval. Failed often points to a broken step inside the process.",
      ),
      faq(
        "Can a failed payment be corrected?",
        "Often yes, but the correct fix depends on why the payment failed. The official wording should guide the next step.",
      ),
      faq(
        "Should I wait first if I see failed?",
        "If the message appeared very recently, one update cycle may help. If the same failed wording remains, check the official system for a specific instruction.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 10,
  },
  {
    slug: "status-stuck-pending",
    title: "Status stuck on pending",
    summary:
      "A focused guide for users whose status stays on pending for too long, with calm checks that help you decide whether to wait, verify details, or follow up officially.",
    sections: [
      section(
        "Quick answer",
        "If your status seems stuck on pending, it usually means the review has not cleared yet or another hidden step has not moved forward. It does not automatically mean there is a permanent problem, but it does mean you should check carefully instead of only refreshing the page.",
      ),
      section(
        "What this means",
        "A long pending period is different from a fresh pending status. When it stays the same for an unusual amount of time, users often start wondering whether the system missed something, whether details are holding it up, or whether they need to act. The truth is usually less dramatic: the status has not resolved yet, and the next helpful step is to look for signals around it.",
      ),
      section(
        "Why this happens",
        "A status can stay pending because there is a backlog, because records still need to match, because an earlier update has not fully reflected, or because another issue such as identity or banking verification has not become visible yet. In some cases, users keep seeing pending because they are checking before the next official update cycle has run.",
      ),
      section(
        "What you can do next",
        "1. Note how long the status has remained unchanged.\n2. Check whether you recently changed any important details.\n3. Compare the current wording with related statuses such as identity verification or banking issue.\n4. Watch for the next official update instead of checking constantly.\n5. Use the official contact route if the delay is clearly beyond a normal waiting period and no new instruction appears.",
      ),
      section(
        "Important things to remember",
        "A stuck pending status feels stressful, but repeated applications or repeated changes can make things messier. The safest approach is a calm review of your details, the wording, and the available official next steps.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you compare pending with other common statuses, read the most relevant next guide, and keep track of payment-date updates if the status later clears to approved.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/pending\n• /guides/why-is-my-status-pending\n• /status/identity-verification\n• /status/banking-issue\n• /guides/sassa-status-meaning",
      ),
      faq(
        "How long is too long for pending?",
        "There is no single answer for every case, but a status that has not changed after multiple normal update cycles is worth checking more closely.",
      ),
      faq(
        "Should I keep checking every day?",
        "You can check, but repeated checking does not make the system move faster. It is more useful to watch for the next real update window.",
      ),
      faq(
        "Can pending stay there even if I need to verify something?",
        "Yes. Sometimes the related issue becomes obvious only later, which is why it helps to look out for new wording.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 11,
  },
  {
    slug: "reapplication-needed-meaning",
    title: "Reapplication needed meaning",
    summary:
      "A practical explanation of what reapplication needed usually means, when a fresh application is the right move, and when you should first check for another official option.",
    sections: [
      section(
        "Quick answer",
        "Reapplication needed usually means the official system wants a new application instead of continuing with the old one. It is a clear signal that waiting on the previous record is probably not enough on its own.",
      ),
      section(
        "What this means",
        "This wording usually appears when an earlier application cannot keep moving forward under the current cycle or process. The system may require a fresh submission with current details. That does not always mean something went badly wrong. In many cases, it simply means a new application step is now required.",
      ),
      section(
        "Why this happens",
        "Reapplication wording can appear when a support cycle has ended, when an earlier record is no longer active, when the official system has moved to a new application flow, or when a previous incomplete record cannot be revived. It can also appear after a long break in activity.",
      ),
      section(
        "What you can do next",
        "1. Confirm the reapplication message on the official system.\n2. Check whether there is an official deadline or application window linked to it.\n3. Gather your current documents and details before you start.\n4. Use the official route for the fresh application.\n5. Keep your phone number active so you do not miss OTPs or updates.",
      ),
      section(
        "Important things to remember",
        "Do not assume reapplication needed is the same as declined. It is a process instruction. At the same time, do not ignore it and keep waiting on the old application if the official system clearly says a new one is required.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you prepare before starting again, understand which details to double-check, and read related pages about documents, status wording, and payment-date expectations.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/reapplication-needed\n• /guides/how-to-prepare-before-applying\n• /guides/what-documents-you-may-need\n• /guides/how-to-apply-for-support\n• /eligibility-checker",
      ),
      faq(
        "Does reapplication needed mean I was declined?",
        "Not necessarily. It usually means a new application step is required, not simply that the old one was refused.",
      ),
      faq(
        "Should I use my old information again?",
        "Use current and accurate details. A fresh application is a good time to review everything carefully.",
      ),
      faq(
        "Can I wait instead of reapplying?",
        "If the official system clearly says reapplication is needed, waiting alone is unlikely to solve it.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 12,
  },
  {
    slug: "payment-processing-meaning",
    title: "Payment processing meaning",
    summary:
      "A clear guide to what payment processing usually means, why it does not always mean money is already available, and how to tell when to wait and when to follow up.",
    sections: [
      section(
        "Quick answer",
        "Payment processing usually means the case has moved into the payout stage, but the money is not necessarily available yet. It is a positive movement, not final proof that payment has already landed.",
      ),
      section(
        "What this means",
        "This wording usually appears after approval and before successful payment completion. It suggests that the system is preparing, scheduling, or handing over the payment. Many users read payment processing as if the money is already in the account, but that is not always correct. It often means the transfer is in motion, not finished.",
      ),
      section(
        "Why this happens",
        "Payment processing can remain visible while the payment date is being finalised, while a payment batch is being run, while the chosen payment method is being used, or while the system works through weekends, public holidays, or other timing delays. In some cases, it appears after a previous failed payment is being retried.",
      ),
      section(
        "What you can do next",
        "1. Check for a payment date or latest payment update.\n2. Confirm your payment method details are still correct.\n3. Give the status some time if it changed very recently.\n4. Watch for any move from processing to paid, failed, or a banking-related message.\n5. Use the official channel if processing remains in place for too long with no payment result.",
      ),
      section(
        "Important things to remember",
        "Processing is not the same as paid. It is also not the same as approved. It sits between those ideas. The safest approach is to treat payment processing as a good sign that still needs final confirmation.",
      ),
      section(
        "How GrantCare can help",
        "GrantCare can help you compare payment processing with approved, failed, and missing-payment situations. You can also use payment-date pages and reminders so you know when to check again.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/approved-but-no-payment\n• /guides/how-to-fix-missing-payment-issues\n• /payment-dates\n• /guides/payment-dates-by-month\n• /status/payment-failed",
      ),
      faq(
        "Does payment processing mean I will definitely be paid?",
        "It points in that direction, but final payment still depends on the process completing successfully.",
      ),
      faq(
        "How long can payment processing last?",
        "There is no single timeline for every user. It depends on the payment cycle and the payment method being used.",
      ),
      faq(
        "Should I change my details while it is processing?",
        "Only if something is actually wrong. Unnecessary changes during processing can create extra delays.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 13,
  },
];
