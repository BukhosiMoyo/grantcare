const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

export const SEO_BATCH_ONE_GUIDES = [
  {
    slug: "why-is-my-status-pending",
    title: "Why your status is pending",
    summary:
      "What a pending status usually means, why it can stay that way for a while, and what to do next without making the situation worse.",
    sections: [
      section(
        "Quick answer",
        "Pending just means the system hasn't finished checking things yet. You haven't been declined — you're still in the queue waiting for a final answer. It's frustrating, but it's not the end of the road.",
      ),
      section(
        "What this means",
        "When your status says pending, SASSA is still working through the checks on their side. Most of the time nothing is actually wrong with your application — it just hasn't reached a decision yet for this cycle. Think of it as being in a queue: you're still in it, which is better than being out.",
      ),
      section(
        "Why this happens",
        "A few things can keep a status on pending. The system might still be cross-checking your ID or income details against other government records. Sometimes it's just volume — thousands of applications are reviewed at the same time and the queue takes time to move. If you recently changed your phone number, bank details, or any personal info, that can also trigger a temporary pending state while the system processes the update.",
      ),
      section(
        "What you can do next",
        "1. Open the official status page and read the exact wording carefully — sometimes there's more detail there than just the word pending.\n2. Double-check that your banking and contact details are still correct and haven't changed.\n3. Don't resubmit anything unless the system tells you to — sending duplicate information can create more confusion.\n4. Give it time and check again after the next official update cycle.\n5. If nothing has moved for an unusually long time, that's when it makes sense to reach out through the official SASSA contact route.",
      ),
      section(
        "Important things to remember",
        "Checking the status ten times a day won't make it update faster — SASSA runs updates on their own schedule, not yours. Be careful of anyone who promises to fix or speed up your application, especially if they're asking for money. No one outside the official system can change what SASSA decides.",
      ),
      section(
        "Where GrantCare fits in",
        "GrantCare is an independent information platform. Use it to understand common status wording, follow payment date updates, and keep track of the right pages to check while you wait for an official update.",
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
        "Only reapply if the official system clearly tells you to. A duplicate application can create more confusion.",
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
      "What a declined status means, why it happens, and how to decide whether to gather proof, appeal, or review your details first.",
    sections: [
      section(
        "Quick answer",
        "Declined means your application didn't pass one or more of the official checks for that review period. It's a final answer for that round — but it doesn't automatically mean there's nothing you can do about it.",
      ),
      section(
        "What this means",
        "When a status shows declined, SASSA found a reason not to approve the application at that stage. The most useful thing you can do right now is look at the exact decline reason on the official system — not just the word declined, but the reason shown next to it. That tells you whether it's about income, identity, a duplicate record, another form of support, or missing information.",
      ),
      section(
        "Why this happens",
        "A decline can happen for a few different reasons. The system might have picked up income or support from another source that affects your eligibility. Your records might not have matched what was on the application. There could already be a previous application on the system. Or a specific rule wasn't met for that period. Sometimes people are declined even when they genuinely believe they should qualify — often because a detail on the form didn't line up exactly with official records.",
      ),
      section(
        "What you can do next",
        "1. Read the exact decline reason on the official system — don't guess.\n2. Compare that reason with your ID number, phone number, bank details, and any other support you might be receiving.\n3. Gather any documents that might help before you take the next step.\n4. If you genuinely believe the decision is wrong, use the official appeal or reconsideration route.\n5. Write down the dates and take screenshots of any status changes — you may need them later.",
      ),
      section(
        "Important things to remember",
        "Don't try to guess the reason if the system already shows you one — read that first. And don't pay anyone outside the official channels to fix your decline — it won't work and it'll cost you money for nothing. A decline is serious, but there's almost always a next step available. Sometimes it's an appeal. Sometimes it means correcting information. Sometimes it's waiting for a new application window.",
      ),
      section(
        "What you can use GrantCare for",
        "Use GrantCare to understand common decline reasons in plain language, compare the next-step options available to you, and read through practical guidance before you contact the official channel. The aim is to reduce confusion, not to replace the official process.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/declined\n• /guides/appeal-after-decline\n• /guides/what-does-approved-mean\n• /guides/what-documents-you-may-need\n• /eligibility-checker",
      ),
      faq(
        "Can a declined status be appealed?",
        "Often, yes. There is usually an official appeal or reconsideration path, but follow the exact option shown on the official system.",
      ),
      faq(
        "Should I submit a new application straight away?",
        "Not unless the official system tells you to reapply. Sometimes an appeal is the correct route, not a fresh application.",
      ),
      faq(
        "Does declined mean I can never qualify?",
        "No. It means the application was not approved for that review. Whether you may qualify later depends on your circumstances and the current rules.",
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
      "What an approved status usually means, what it does not mean yet, and the next checks to make before expecting payment.",
    sections: [
      section(
        "Quick answer",
        "Approved means your application passed the official checks for that period. It's genuinely good news — but it doesn't always mean the money has been sent yet.",
      ),
      section(
        "What this means",
        "When your status shows approved, the system has accepted your application for this stage. But there's usually still one more practical step before money actually reaches you — payment scheduling, confirming your payment method, or waiting for the next payout cycle to run. The relief is real when you see that word, but don't assume the money is already on its way that same day.",
      ),
      section(
        "Why this happens",
        "Approval can show up before a payment date has even been published. It can appear before your bank account or collection method has been confirmed. And it can sit there for a little while the next payout run is being prepared. That's completely normal — approved and paid are two separate things in this process, and they don't always happen at the same time.",
      ),
      section(
        "What you can do next",
        "1. Check whether there's already a payment date linked to your approved result.\n2. Make sure your banking or collection details are still correct and current.\n3. Keep your phone nearby in case the system needs to verify something.\n4. Watch your status — if it changes from approved to a payment-related message, that's the system moving to the next step.\n5. If you've been approved for a while with no payment update, go back to the official system before assuming something has gone wrong.",
      ),
      section(
        "Important things to remember",
        "Approved doesn't mean paid — those are two separate stages. Payment timing can also vary depending on whether you bank with certain providers or collect at a specific location. If the money doesn't arrive when you expected, go back to the official SASSA system for confirmation rather than assuming the worst.",
      ),
      section(
        "Using GrantCare after approval",
        "GrantCare breaks down the difference between approved, payment processing, banking issues, and missing-payment situations. You can also use the payment date pages and reminders to know when to check again.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/approved\n• /guides/approved-but-no-payment\n• /payment-dates\n• /guides/payment-dates-by-month\n• /guides/sassa-status-meaning",
      ),
      faq(
        "If I am approved, when will I be paid?",
        "There is no single answer. Look for an official payment date or payment-related update rather than assuming payment is immediate.",
      ),
      faq(
        "Can approved change later?",
        "Sometimes the wording after approval changes into a payment or verification step. This does not always mean the approval was taken away, but read the latest message carefully.",
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
      "If you can see approved on the official system but still have not received payment, here are calm checks to make before escalating.",
    sections: [
      section(
        "Quick answer",
        "If your status says approved but no money has come through, the most likely reason is that the payment step is still catching up. Approval and payment happen at different points in the process — and the gap between them can feel longer than expected.",
      ),
      section(
        "What this means",
        "Approved without payment usually means your application passed the review, but the actual payout hasn't happened yet. This might be a short wait. But sometimes the official system will show a new message later — something about banking details, verification, or processing — that gives a clearer picture of what's holding things up.",
      ),
      section(
        "Why this happens",
        "This gap is more common than people expect. It can happen because a payment date hasn't been published yet, because your bank or collection details still need to clear, because a payment batch got delayed, or because a previous payment attempt failed and the money was sent back. Weekends, public holidays, and busy update periods on SASSA's side can also slow things down.",
      ),
      section(
        "What you can do next",
        "1. Check whether the official system shows a payment date — or only the approval result.\n2. Review your banking or collection details and confirm nothing has changed.\n3. Look for any new wording like 'payment processing' or 'banking issue' — those are signs the system is moving.\n4. Give it a bit of time if your approval is very recent.\n5. If approval has been sitting there for a while with no payment and no new update, that's when it's worth contacting the official SASSA channel.",
      ),
      section(
        "Important things to remember",
        "Try not to change your banking details every time you get worried — one unnecessary change can create a fresh delay of its own. If you genuinely can't figure out what's happening from the status page, go to the official SASSA channel for confirmation. Don't assume approved means same-day payment.",
      ),
      section(
        "How GrantCare helps with this",
        "Compare approval wording with payment-related wording on GrantCare, track the latest published dates, and save the pages that matter while you wait for the next update.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/approved\n• /guides/payment-processing-meaning\n• /guides/fix-banking-details\n• /payment-dates\n• /guides/how-grant-reminders-can-help",
      ),
      faq(
        "Can I be approved and still have a banking problem?",
        "Yes. Approval can happen before the payment method issue is fully visible, so check for any new payment-related message.",
      ),
      faq(
        "Should I wait or report the problem straight away?",
        "If approval is very recent, waiting for the next update is reasonable. If the delay has gone on for a while, use the official route to check whether another step is needed.",
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
    title: "SASSA banking details pending meaning",
    summary:
      "What SASSA banking details pending usually means, why it happens, and what to check before you update anything again.",
    sections: [
      section(
        "Quick answer",
        "Banking details pending means your payment method information hasn't fully cleared yet. Your application can still move forward — but payment will be on hold until that part is sorted out.",
      ),
      section(
        "What this means",
        "This is a payment-side issue, not necessarily an approval issue. SASSA's system is still checking whether the banking details you submitted are correct, whether the account belongs to you, or whether the payment method you selected is ready to use. It's a verification step, not a final rejection.",
      ),
      section(
        "Why this happens",
        "The most common causes are: the account isn't registered in your own name, an account number was entered with a typo, you changed your bank details recently, you chose a payment option that still needs to be approved, or there's a verification check running between SASSA and your bank. Even one wrong digit in an account number can trigger this status.",
      ),
      section(
        "What you can do next",
        "1. Go back to the official payment details page and go through everything carefully.\n2. Make sure the account is active and registered specifically in your name.\n3. Fix any typos or errors in the account information.\n4. Once you've corrected it, leave it — don't keep changing things again and again.\n5. Wait for the next official update before assuming the correction didn't go through.",
      ),
      section(
        "Important things to remember",
        "Using someone else's account — even a family member's — can cause delays and create problems that are hard to undo. A banking pending status doesn't mean your whole application has failed. It usually just means the payment route hasn't settled yet. And always update banking details through the official SASSA system only — not through WhatsApp groups, unofficial websites, or anyone claiming they can help you for a fee.",
      ),
      section(
        "GrantCare resources for banking issues",
        "GrantCare explains payment method wording, covers common banking issues in dedicated guides, and tracks payment date pages you can check once the banking step is sorted out.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/banking-issue\n• /guides/how-to-update-banking-details\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/why-bank-verification-fails\n• /guides/how-to-find-official-banking-and-verification-pages-safely",
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
        "It varies, but it usually takes a few days. It depends on the official update cycle and whether the submitted details match correctly.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 8,
  },
  {
    slug: "identity-verification-required-meaning",
    title: "SASSA identity verification required meaning",
    summary:
      "What SASSA identity verification required usually means, why the step appears, and how to handle it safely through official channels.",
    sections: [
      section(
        "Quick answer",
        "Identity verification required means the system still needs to confirm who you are before things can move forward. It's a security step, not a rejection.",
      ),
      section(
        "What this means",
        "This status comes up when SASSA's system couldn't complete the ID check with enough confidence. It needs another confirmation before it can approve or continue paying you. The exact steps depend on which official route triggered it, so always follow the instruction shown alongside that status — don't guess or try a different route.",
      ),
      section(
        "Why this happens",
        "The most common reasons are mismatched details — your name, ID number, or date of birth might not match what's on the application exactly. A phone number linked to a different record can also cause this. Sometimes it's triggered by a routine security check rather than anything you did wrong. Either way, it needs to be resolved before the process can move forward.",
      ),
      section(
        "What you can do next",
        "1. Read the exact verification message on the official system — the wording matters.\n2. Check your ID number, full names, and date of birth carefully.\n3. Complete the verification step only through the official link or process — not through a WhatsApp link or third-party site.\n4. Screenshot or write down what you completed and when.\n5. Give it time to reflect on the system before assuming it didn't work.",
      ),
      section(
        "Important things to remember",
        "Don't pay anyone to handle your identity verification for you — it won't work, and you'll be handing over sensitive personal information to someone who can misuse it. Verification is fixable in most cases. It feels stressful, but it's usually something the official process can sort out.",
      ),
      section(
        "What GrantCare covers on this topic",
        "GrantCare explains why identity wording appears, compares it with pending or declined statuses, and points you to the right guide before you return to the official system.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/identity-verification\n• /guides/why-identity-verification-fails\n• /guides/what-identity-verification-link-means\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/how-to-know-if-a-verification-request-is-official",
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
      "What a failed status can mean, why the exact wording matters, and how to work out whether the problem is with payment, verification, or another step.",
    sections: [
      section(
        "Quick answer",
        "A failed status usually means one part of the process broke down — not necessarily everything. The key is figuring out what exactly failed, because a failed payment is a very different problem from a failed identity check or bank verification.",
      ),
      section(
        "What this means",
        "Failed is a broad word on its own. It tells you something went wrong, but not what. On some records the failure is about a payment that didn't go through. On others it's about banking details that couldn't be verified, an identity check that didn't clear, or a technical problem in the system. You need to look at all the wording around it — not just the word failed in isolation.",
      ),
      section(
        "Why this happens",
        "A failed result can appear because banking details didn't validate, because an identity check didn't complete, because a payment attempt was rejected, or because the system needs a fresh action to continue. It can also come up after someone changed their details recently and those changes haven't fully processed yet.",
      ),
      section(
        "What you can do next",
        "1. Read the full status wording, not just the word failed — there's usually more context around it.\n2. Work out whether the failure is linked to payment, banking, or identity.\n3. Only fix what the official system is pointing to — don't make changes blindly.\n4. Note the date the failed status appeared.\n5. If the same failure keeps coming back with no explanation, contact the official SASSA channel.",
      ),
      section(
        "Important things to remember",
        "Failed on its own doesn't tell the whole story. Think of it as a signal to look more closely, not as a complete explanation. And don't share personal information with anyone who claims they can repair a failed record for a fee — that's not how any of this works.",
      ),
      section(
        "How GrantCare breaks this down",
        "GrantCare breaks down failed wording into common categories so you know whether to read a banking guide, a verification guide, or a payment issue guide next.",
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
      "If your status has stayed on pending for too long, here are calm checks that help you decide whether to wait, verify details, or follow up officially.",
    sections: [
      section(
        "Quick answer",
        "If your status has been stuck on pending for a while, it usually means the review hasn't cleared yet — or there's another step sitting behind it that hasn't become visible. It's not necessarily a permanent problem, but it's worth looking into rather than just refreshing the page every day.",
      ),
      section(
        "What this means",
        "A status that stays on pending for a long time feels different from one that just appeared. At some point you start wondering if the system missed something, if your details are holding it back, or if you need to take action. The truth is usually less dramatic — the review just hasn't resolved yet. But it's worth checking for clues around the status rather than staring at the same word.",
      ),
      section(
        "Why this happens",
        "A status can stay on pending because there's a backlog, because records still need to be matched, because an earlier update hasn't fully reflected yet, or because an identity or banking issue is sitting quietly behind it and hasn't surfaced as its own status yet. Some people see pending for longer than expected simply because they're checking before the next official update cycle has actually run.",
      ),
      section(
        "What you can do next",
        "1. Take note of how long the status has stayed the same.\n2. Check whether you recently made any changes to important details.\n3. Look at related statuses like identity verification or banking issue — sometimes the real issue is hiding there.\n4. Wait for the next official update rather than checking multiple times a day.\n5. If it's been well beyond a normal waiting period and there's still no new instruction, use the official SASSA contact route.",
      ),
      section(
        "Important things to remember",
        "A stuck pending feels awful, especially when you're waiting on money you need. But submitting again or changing details repeatedly usually makes it worse, not better. The safer move is to calmly check your details, read the wording carefully, and then decide on the next official step.",
      ),
      section(
        "Useful GrantCare pages for this situation",
        "Compare pending with other common statuses on GrantCare, read the most relevant guide for your situation, and track payment-date updates if the status later clears to approved.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/pending\n• /guides/why-is-my-status-pending\n• /status/identity-verification\n• /status/banking-issue\n• /guides/sassa-status-meaning",
      ),
      faq(
        "How long is too long for pending?",
        "There is no fixed rule, but a status that has not changed after multiple normal update cycles is worth checking more closely.",
      ),
      faq(
        "Should I keep checking every day?",
        "You can check, but repeated checking does not make the system move faster. It is more useful to watch for the next real update window.",
      ),
      faq(
        "Can pending stay there even if I need to verify something?",
        "Yes. Sometimes the related issue only becomes obvious later, which is why it helps to look out for new wording.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 11,
  },
  {
    slug: "reapplication-needed-meaning",
    title: "SASSA reapplication needed meaning",
    summary:
      "What SASSA reapplication needed usually means, when a fresh application is the right move, and when you should first check for another official option.",
    sections: [
      section(
        "Quick answer",
        "Reapplication needed means the system wants a fresh application from you, not a continuation of the old one. Sitting and waiting on the previous record probably won't get things moving.",
      ),
      section(
        "What this means",
        "This wording usually shows up when an earlier application can't continue under the current process or cycle. The system is asking you to start fresh with your current details. It doesn't always mean something went badly wrong — in many cases it just means a new submission is required to keep things moving.",
      ),
      section(
        "Why this happens",
        "This can come up when a previous support cycle has ended, when your earlier record is no longer active, when the official system has moved to a new application flow, or when a previous incomplete record can't be revived. It can also appear after a long gap in activity on your account.",
      ),
      section(
        "What you can do next",
        "1. Confirm the reapplication message on the official system before doing anything else.\n2. Check if there's a deadline or application window attached to it.\n3. Get your documents and details together before you start the new application.\n4. Apply through the official route only.\n5. Keep your phone number active — you'll need it for OTPs and status updates.",
      ),
      section(
        "Important things to remember",
        "Reapplication needed is not the same as declined — it's an instruction, not a rejection. At the same time, don't ignore it and keep hoping the old application resolves itself. If the official system says you need to apply again, that's the step you need to take.",
      ),
      section(
        "Preparing with GrantCare",
        "Use GrantCare to prepare before starting again — check which details to double-check, read related pages about documents and status wording, and understand what to expect for payment-date timing after reapplying.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/reapplication-needed\n• /guides/how-to-know-if-reapplication-is-the-right-step\n• /guides/how-to-prepare-before-reapplying\n• /guides/how-to-find-the-official-reapplication-page-safely\n• /guides/appeal-vs-reapplication-guide",
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
      "What payment processing usually means, why it does not always mean money is already available, and how to tell when to wait versus when to follow up.",
    sections: [
      section(
        "Quick answer",
        "Payment processing means your case has moved into the payout stage — which is a positive sign. But it doesn't mean the money is already in your account. It's the in-between moment: after approval, before the payment actually lands.",
      ),
      section(
        "What this means",
        "Payment processing usually appears after approval and before the money actually lands. It means the system is preparing, scheduling, or handing over the payment. A lot of people read this as confirmation that the money is already there — but that's not quite right. It means the transfer is in motion, not that it's finished.",
      ),
      section(
        "Why this happens",
        "Processing can stick around while the payment date is being finalised, while a payment batch is being run, while the chosen payment method is being used, or while the system works around weekends and public holidays. Sometimes it shows up again after a failed payment that's being retried.",
      ),
      section(
        "What you can do next",
        "1. Look for a payment date or any recent payment update.\n2. Confirm your payment method details are still correct.\n3. Give it time if this status changed very recently.\n4. Watch for the next move — processing should eventually change to paid, failed, or a banking-related message.\n5. If it stays on processing for too long with no result, use the official SASSA channel to check what's happening.",
      ),
      section(
        "Important things to remember",
        "Processing is not the same as paid. It's also not the same as approved. It sits in the middle of those two stages. Treat it as a genuinely good sign that still needs the final step to complete.",
      ),
      section(
        "GrantCare's payment guides",
        "Compare payment processing with approved, failed, and missing-payment situations on GrantCare. Use the payment-date pages and reminders so you know when to check again.",
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
        "It varies — it depends on the payment cycle and the payment method being used. A few days is common.",
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
