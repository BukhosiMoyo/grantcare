const section = (title: string, body: string) => ({ title, body });
const faq = (question: string, answer: string) =>
  section(`FAQ: ${question}`, answer);

export const SEO_BATCH_THREE_GUIDES = [
  {
    slug: "how-to-fix-declined-status",
    title: "How to fix a declined status",
    summary:
      "How to respond to a declined status by checking the official reason first, correcting details where needed, and using the right appeal path.",
    sections: [
      section(
        "Quick answer",
        "Start by reading the exact official decline reason before you do anything else. The right fix depends entirely on why you were declined — whether it's income, identity, a duplicate record, banking, or a rule that wasn't met. Guessing without reading the reason first usually wastes time and can make things worse.",
      ),
      section(
        "What this means",
        "A declined status is not one single problem with one single fix. It's a result with a specific reason attached to it. Some people need to appeal. Others need to correct details or wait for a new application window. The key is matching your next step to the actual official reason — not just reacting to the word declined.",
      ),
      section(
        "Why this happens",
        "A status can be declined because the official system found income or support that affects eligibility, because records did not match, because another application or support record caused a conflict, or because an important rule was not met for that period. Even a small mistake in personal details can trigger a result that looks worse than the real problem.",
      ),
      section(
        "What you can do next",
        "1. Open the official status result and read the decline reason carefully.\n2. Compare that reason with your own documents and details.\n3. Check whether the problem is something you can correct, such as a mismatch in information.\n4. Use the official appeal or reconsideration route if you believe the decline is incorrect.\n5. Keep screenshots, dates, and notes so you can track what happened and when.",
      ),
      section(
        "Common mistakes to avoid",
        "Don't appeal before you've actually understood why you were declined. Don't submit random changes hoping something sticks — if the official system has given you a reason, work from that. And don't pay anyone who claims they can remove a decline outside the official process — they can't, and you'll lose money on top of the situation you're already in.",
      ),
      section(
        "Important things to remember",
        "Declined doesn't mean the same next step for everyone. Some people need to appeal. Some need to reapply later. Some have a record issue that needs to be resolved first. GrantCare is an independent platform — whatever action you take has to happen on the relevant official government system.",
      ),
      section(
        "Decline guides on GrantCare",
        "Translate decline wording into plain language, compare related guides, and follow a calm sequence of steps before you go back to the official system.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/declined\n• /guides/how-to-appeal-rejection\n• /guides/what-documents-you-may-need\n• /guides/who-may-qualify-for-support\n• /eligibility-checker",
      ),
      faq(
        "Can a declined status be fixed without an appeal?",
        "Sometimes yes, if the official issue is something that can be corrected directly. In other cases, an official appeal is the correct route.",
      ),
      faq(
        "Should I submit a new application instead?",
        "Only if the official system tells you to reapply. A new application is not always the right answer after a decline.",
      ),
      faq(
        "What if I do not understand the decline reason?",
        "Start with the wording shown on the official system, then use a plain-language guide to help before taking the next official step.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 24,
  },
  {
    slug: "why-payment-is-delayed",
    title: "Why payment is delayed",
    summary:
      "Common reasons payments are delayed, how to check whether the delay is normal or needs action, and where to look before assuming payment has failed.",
    sections: [
      section(
        "Quick answer",
        "A delayed payment usually means the payment process hasn't finished yet, your payment method still has an issue, or the official timing shifted. It doesn't always mean your money is gone or permanently lost.",
      ),
      section(
        "What this means",
        "Payment delays can happen after approval, during payment processing, or even after a payment date has been expected. The key is working out whether you are seeing a normal timing delay, a banking problem, a verification problem, or a true missing-payment issue.",
      ),
      section(
        "Why this happens",
        "Common causes include a payment batch running later than expected, bank or collection details still being checked, a recent change to personal or banking information, public holidays, weekends, system backlogs, or a payment attempt that failed and needs another update cycle.",
      ),
      section(
        "What you can do next",
        "1. Check the latest status wording, not only the last date you saw.\n2. Look for payment processing, banking issue, or verification wording.\n3. Confirm your payment details are still current.\n4. Give the system time if the update is very recent.\n5. Use the official route if the delay continues beyond a reasonable update window.",
      ),
      section(
        "How to tell normal waiting from a real problem",
        "A short delay right after an update can be completely normal — the system is still catching up. A longer delay with no new wording, or one that stretches well past a clearly published date, is worth looking into more carefully. If the status does change while you're waiting, follow the new wording rather than sticking to assumptions you made before.",
      ),
      section(
        "Important things to remember",
        "Don't keep changing your details without a clear reason — each unnecessary change can create a new delay of its own. And don't trust social media posts claiming that every delayed payment is proof of a hidden rejection. The official wording still matters more than anything else.",
      ),
      section(
        "Delayed payment pages on GrantCare",
        "Compare delayed-payment situations with approved, pending, payment processing, and banking-issue guides so you can take a calmer and more informed next step.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /status/banking-issue\n• /guides/how-to-fix-missing-payment-issues\n• /payment-dates",
      ),
      faq(
        "Does a delayed payment mean I was declined?",
        "Not necessarily. Many delays happen after approval or during payment processing.",
      ),
      faq(
        "Should I wait first if payment is late?",
        "If the delay is very short, waiting for the next update can make sense. If it continues, the official route becomes more important.",
      ),
      faq(
        "Can bank details cause a payment delay?",
        "Yes. Banking issues are one of the most common reasons for payment delays.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 25,
  },
  {
    slug: "how-to-update-banking-details",
    title: "How to update SASSA banking details safely",
    summary:
      "How to update SASSA banking details through the correct official route, avoid common errors, and understand what to expect after you submit the change.",
    sections: [
      section(
        "Quick answer",
        "Use the official system for your grant or support category and take your time entering the information correctly. The most important rule: use the right official channel and avoid making repeated changes just because you're anxious about whether it went through.",
      ),
      section(
        "What this means",
        "Updating banking details is a payment-method task, not only a profile task. A small mistake can delay payment, so the goal is not speed at any cost — the goal is to submit clean, accurate information once, through the right official route.",
      ),
      section(
        "Why this happens",
        "People usually need to update banking details because they changed banks, closed an account, entered the wrong account details before, or received a status that points to banking verification or payment failure. Sometimes the issue is not the bank itself but a mismatch between the account name and the application record.",
      ),
      section(
        "What you can do next",
        "1. Open the relevant official payment-details route.\n2. Confirm which support record or grant the change applies to.\n3. Enter the account information exactly as it appears on official bank records.\n4. Make sure the account is active and in your own name if that is required.\n5. Submit once and wait for the next official update before changing it again.",
      ),
      section(
        "What to check before submitting",
        "Check the account number carefully. Check the branch or bank selection carefully. Check whether the name on the account matches the person receiving support. If the official system offers a confirmation message or reference, keep a record of it.",
      ),
      section(
        "Important things to remember",
        "Don't enter banking details on unofficial websites. Don't pay anyone to change your banking information for you — that's a common scam targeting grant recipients. And don't keep resubmitting different details out of anxiety — each new change creates another verification step and usually makes things take longer.",
      ),
      section(
        "Banking guides on GrantCare",
        "Understand banking-issue wording, compare common payment-method problems, and track what to watch for after a banking update has been submitted.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/banking-issue\n• /guides/banking-details-pending-meaning\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/why-bank-verification-fails\n• /guides/how-to-find-official-banking-and-verification-pages-safely",
      ),
      faq(
        "How long does a banking update take to reflect?",
        "It varies. It depends on the official update cycle and whether the new details pass verification cleanly. A few days is common.",
      ),
      faq(
        "Can I use a different person's bank account?",
        "That often causes problems. Follow the official payment-method rules closely and use the allowed account type.",
      ),
      faq(
        "What if I already submitted the wrong details?",
        "Use the official route to correct them, then wait for the system to update before making more changes.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 26,
  },
  {
    slug: "how-to-change-phone-number",
    title: "How to change your SASSA phone number",
    summary:
      "How to change the phone number linked to your SASSA or SRD record, why the number matters, and how to avoid creating verification or OTP problems.",
    sections: [
      section(
        "Quick answer",
        "To change your phone number, use the relevant official system and make sure the new number is active and under your control. Your phone number matters because it is often tied to OTPs, status updates, and account access.",
      ),
      section(
        "What this means",
        "A phone number is not just a contact detail — it is often part of how the official system confirms identity and sends updates. Changing it carelessly can lock you out of important steps, while leaving an old number active can mean you miss messages that matter.",
      ),
      section(
        "Why this happens",
        "Users usually need to change numbers after a lost SIM card, a new contract or prepaid number, a stolen phone, or a long gap where the original number is no longer available. Sometimes the number must also be corrected because the wrong one was entered during the first application.",
      ),
      section(
        "What you can do next",
        "1. Use the official number-change route for the relevant support record.\n2. Check that the new number is working and available for OTPs.\n3. Keep the old number active during the change if possible, unless it is no longer safe or available.\n4. Save proof or screenshots of the change if the official system provides them.\n5. Check your status again after the update has had time to reflect.",
      ),
      section(
        "Why the phone number matters so much",
        "A phone number can be tied to login access, one-time pins, account recovery, and update messages. If the number is wrong, it can delay or block progress when the system asks you to verify something.",
      ),
      section(
        "Important things to remember",
        "Never give OTPs or phone access to someone who claims they will update your details for you. Use official channels only. If your number change is linked to a fraud concern, official action becomes even more important.",
      ),
      section(
        "Phone number guides on GrantCare",
        "Understand why a number change matters, what problems often follow a phone-number mismatch, and which related guide to read if your status becomes pending or verification-related after the change.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/how-to-change-your-phone-number-online-safely\n• /guides/what-to-do-if-you-need-to-change-phone-number-without-otp\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/why-identity-verification-fails\n• /status/identity-verification",
      ),
      faq(
        "Can changing my phone number delay my status?",
        "It can, especially if the system needs to verify the updated detail before moving forward.",
      ),
      faq(
        "Should I change my phone number if the old one still works?",
        "Only if you actually need to. Unnecessary changes can create extra complications.",
      ),
      faq(
        "What if I cannot access my old number anymore?",
        "Use the official recovery or update path as soon as possible so your record can be tied to the correct active number.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 27,
  },
  {
    slug: "what-to-do-after-approval",
    title: "What to do after approval",
    summary:
      "What comes next after approval — payment dates, payment method checks, and the signs that tell you whether to wait, prepare, or follow up.",
    sections: [
      section(
        "Quick answer",
        "After approval, shift your focus to payment timing and your payment method. Approval is a genuine step forward — but it's not always the last step before money is available.",
      ),
      section(
        "What this means",
        "An approved status tells you the review has passed for that stage. The next practical questions are whether a payment date is available, whether the bank or collection method is correct, and whether any payment-related wording appears after the approval message.",
      ),
      section(
        "Why this matters",
        "A lot of people stop checking carefully once they see approved because it feels like the hard part is done. Sometimes that's true. But sometimes the next complication only shows up after approval — especially if the payment method still needs attention or the payment date hasn't been confirmed yet.",
      ),
      section(
        "What you can do next",
        "1. Check whether there is already a payment date for your category.\n2. Confirm your banking or collection details are still correct.\n3. Watch for wording such as payment processing or banking issue.\n4. Save the month page or reminder if you want to track the next update.\n5. Use the official route if approval remains in place but payment does not arrive.",
      ),
      section(
        "What not to do",
        "Don't make random profile changes just because you feel nervous after approval. Don't assume the money is already in your account just because the status says approved. And don't rely on what someone told you in a WhatsApp group when the official system can still show you what's actually happening.",
      ),
      section(
        "Important things to remember",
        "Approval is encouraging, but it's worth staying engaged with the next stages rather than switching off completely. GrantCare is an independent platform — for official payment confirmation, always go back to the relevant government channel.",
      ),
      section(
        "Post-approval pages on GrantCare",
        "Move from approval to the right next page quickly, whether that means checking payment dates, understanding payment processing, or reading a missing-payment guide.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/approved\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /payment-dates\n• /guides/how-to-know-if-your-payment-is-ready",
      ),
      faq(
        "Does approval mean I can stop checking my status?",
        "Not yet. It is still wise to follow the payment side of the process carefully.",
      ),
      faq(
        "Should I expect money immediately after approval?",
        "Not always. Payment timing can still take another step or update cycle.",
      ),
      faq(
        "What if approval stays there but nothing else happens?",
        "Compare it with the approved-but-no-payment guide and then use the official route if the delay continues.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 28,
  },
  {
    slug: "how-to-appeal-rejection",
    title: "How to appeal a rejection",
    summary:
      "How to prepare an appeal after a rejection, what to check first, and how to use the official appeal route carefully and correctly.",
    sections: [
      section(
        "Quick answer",
        "Read the exact official rejection reason first, then gather documents or facts that support your case, and submit through the official appeal route only. A good appeal is built around the actual reason for the rejection — not just the feeling that the decision was wrong.",
      ),
      section(
        "What this means",
        "An appeal is your chance to challenge a result you believe is incorrect. It is not simply a second application — it is a response to a specific official decision. The strongest appeals are tied closely to the exact rejection reason.",
      ),
      section(
        "Why appeals fail",
        "Appeals often go wrong when people don't understand the original reason, submit without any supporting information, or follow unofficial advice instead of the official process. Another very common problem is challenging the wrong thing entirely because the wording was misread. Understanding what you're actually appealing is half the work.",
      ),
      section(
        "What you can do next",
        "1. Read the rejection reason carefully on the official system.\n2. Decide whether the reason looks factually wrong, incomplete, or based on outdated information.\n3. Gather documents or records that support your appeal.\n4. Submit through the official appeal route only.\n5. Keep a record of the submission date and any reference information.",
      ),
      section(
        "How to prepare a stronger appeal",
        "Be specific — match your supporting information directly to the reason given. If it's an income issue, focus on income records. If it's an identity issue, focus on identity details. A focused, evidence-based appeal almost always goes better than a general complaint that doesn't address the actual reason.",
      ),
      section(
        "Important things to remember",
        "An appeal doesn't guarantee a different outcome — it's an official review step, not a promise of reversal. GrantCare is independent and can help you prepare and understand what you're dealing with, but the actual appeal submission has to happen on the official system.",
      ),
      section(
        "Appeal preparation on GrantCare",
        "Understand rejection wording, prepare supporting information, and move through related guides before you submit the official appeal.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/appeal-after-decline\n• /status/declined\n• /guides/how-long-an-appeal-takes\n• /guides/what-documents-you-may-need\n• /guides/how-to-fix-declined-status",
      ),
      faq(
        "Can I appeal without documents?",
        "Sometimes the official system may still allow it, but supporting information usually makes your case clearer and stronger.",
      ),
      faq(
        "Is an appeal the same as reapplying?",
        "No. An appeal challenges a specific result. Reapplying starts a new application process.",
      ),
      faq(
        "Should I appeal immediately?",
        "Read the reason first. Acting fast helps, but acting without understanding the reason can weaken your next step.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 29,
  },
  {
    slug: "how-long-an-appeal-takes",
    title: "How long an appeal can take",
    summary:
      "Realistic guidance on appeal waiting times, what affects the pace of a decision, and how to stay organised while the appeal is still under review.",
    sections: [
      section(
        "Quick answer",
        "There's no single fixed timeline that applies to every appeal. Some move faster than others depending on the case, the backlog, and the reason behind the original decision. The most realistic approach is to treat appeal timing as a genuine waiting process rather than counting down to a specific date.",
      ),
      section(
        "What this means",
        "Appeals take time because they involve another review step. Many users want a simple number of days or weeks, but a more honest answer is that the timing varies. It depends on workload, the reason for the original decision, and whether the case needs extra checking.",
      ),
      section(
        "Why timing can vary",
        "Appeal timing changes because different cases need different checks, because official backlogs rise and fall, or because the original issue itself was complex. An appeal linked to identity or data matching may move differently from one linked to income or another eligibility rule.",
      ),
      section(
        "What you can do while you wait",
        "1. Keep the appeal submission date written down.\n2. Save any reference details or screenshots.\n3. Check your status at reasonable intervals instead of constantly refreshing.\n4. Keep your phone, email, and payment details current in the official system.\n5. Read related guides so you know what each new status message could mean if it changes.",
      ),
      section(
        "How to tell whether the wait is still normal",
        "A short wait after submitting is completely expected. A longer wait with no movement can feel worrying, but it doesn't automatically mean the appeal has failed. The safest thing to do is follow the latest official status wording rather than measuring the wait against how anxious it feels.",
      ),
      section(
        "Important things to remember",
        "No independent site can tell you exactly when your appeal will be decided. Be cautious of anyone who claims they can speed up an appeal for a fee — that's not how the official review process works, and it's a common way people lose money while already in a difficult situation.",
      ),
      section(
        "Staying organised with GrantCare",
        "Stay organised during the wait, understand related status messages, and know which page to read next if the appeal result changes to approved, declined again, or another review status.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/how-to-appeal-rejection\n• /guides/what-to-do-if-your-status-does-not-change\n• /status/pending\n• /status/approved\n• /status/declined",
      ),
      faq(
        "Can an appeal take longer than expected?",
        "Yes. Timing varies, and some cases move more slowly than others.",
      ),
      faq(
        "Should I submit a second appeal if the first one is slow?",
        "Not unless the official system tells you to. A second submission can create more confusion.",
      ),
      faq(
        "What should I do while waiting for an appeal result?",
        "Keep your records organised, check status sensibly, and follow the latest official wording if it changes.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 30,
  },
  {
    slug: "why-bank-verification-fails",
    title: "Why SASSA bank verification fails",
    summary:
      "Why SASSA bank verification fails, what usually causes the mismatch, and how to correct the issue without creating extra payment delays.",
    sections: [
      section(
        "Quick answer",
        "Bank verification usually fails when the account details you submitted don't match the official record closely enough. The most common causes are name mismatches, wrong account numbers, or using an account that doesn't meet the official requirements for that grant.",
      ),
      section(
        "What this means",
        "Bank verification is the system checking whether the payment details can actually be trusted for that payout. A failed verification doesn't always mean fraud or a permanent rejection — it usually just means the payment details and the person's official record aren't lining up cleanly enough yet for the system to proceed.",
      ),
      section(
        "Why this happens",
        "Common causes include using an account not in your own name, typing the wrong account number, entering the wrong bank information, using a recently changed account that has not settled properly, or having personal details on the account that do not match the application record.",
      ),
      section(
        "What you can do next",
        "1. Recheck the exact banking details entered.\n2. Confirm the account is active and matches the allowed payment rules.\n3. Make sure the account holder details line up with your official record.\n4. Correct the details through the official route if needed.\n5. Wait for the updated verification result before making more changes.",
      ),
      section(
        "How to avoid making it worse",
        "Don't change details repeatedly when you're not sure what the problem is. And don't try submitting completely different accounts just to see what works — a clean correction based on the actual issue is far better than a series of guesses that each trigger a new verification step.",
      ),
      section(
        "Important things to remember",
        "Bank verification failure is almost always a payment-detail problem, not a full decision on your eligibility. For any official correction you must use the official SASSA channel — GrantCare can help you understand what went wrong, but the fix itself happens there.",
      ),
      section(
        "Banking verification on GrantCare",
        "Understand banking language, compare it with payment-failed or delayed-payment scenarios, and work through the likely causes before you resubmit anything.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/how-to-update-banking-details\n• /guides/banking-details-pending-meaning\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-to-find-official-banking-and-verification-pages-safely\n• /status/banking-issue",
      ),
      faq(
        "Can bank verification fail even if I am approved?",
        "Yes. Approval and payment verification are related, but they are not exactly the same step.",
      ),
      faq(
        "Should I use another account if verification fails?",
        "Only if the official rules allow it and the new account clearly meets the requirements.",
      ),
      faq(
        "Does a failed bank check mean no payment will come?",
        "Not permanently. It usually means the payment details need to be corrected or verified before payment can move forward.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 31,
  },
  {
    slug: "why-identity-verification-fails",
    title: "Why SASSA identity verification fails",
    summary:
      "Why SASSA identity verification can fail, the common record mismatches behind it, and how to approach the official fix without panic.",
    sections: [
      section(
        "Quick answer",
        "Identity verification usually fails when the details on your application don't match official records closely enough, or when the system needs another identity check before it can carry on.",
      ),
      section(
        "What this means",
        "An identity verification failure isn't always an accusation of fraud. It usually means the system couldn't confirm your identity with enough confidence — because of small detail mismatches, a linked record problem, or an extra check that still needs to happen. In most cases it's fixable.",
      ),
      section(
        "Why this happens",
        "Common causes include an incorrect ID number, a name mismatch, outdated personal records, a phone number linked to another record, or an official verification step that was not completed properly. Sometimes the underlying issue is very small, but the system still stops until the identity check clears.",
      ),
      section(
        "What you can do next",
        "1. Read the exact official identity-related wording.\n2. Compare your entered details carefully with your ID and other records.\n3. Complete any official verification step shown on the system.\n4. Keep a record of what you did and when.\n5. Check again after the system has had time to update.",
      ),
      section(
        "What not to do",
        "Do not try unofficial shortcuts. Do not share sensitive identity information with anyone who is not part of the official process. Do not keep retrying the same incorrect details and expect a different result.",
      ),
      section(
        "Important things to remember",
        "Identity verification failure is stressful because it sounds serious. But in most cases it's a record problem that can be resolved through the official process. The most useful response is calm accuracy — double-check the actual details, make the right correction, and give the system time to update.",
      ),
      section(
        "Identity guides on GrantCare",
        "Understand identity wording, compare it with pending or declined statuses, and work out whether you need to verify, wait, or review your details more carefully.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /status/identity-verification\n• /guides/identity-verification-required-meaning\n• /guides/what-identity-verification-link-means\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/how-to-change-phone-number",
      ),
      faq(
        "Can identity verification fail because of a phone number issue?",
        "Yes. A number mismatch or linked-record problem can sometimes affect identity-related checks.",
      ),
      faq(
        "Should I expect my status to change right away after fixing it?",
        "Not always. The official system may need another update cycle before the result changes.",
      ),
      faq(
        "Is identity verification failure the same as declined?",
        "No. It usually points to a verification problem that must be cleared before the final process can continue.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 32,
  },
  {
    slug: "what-to-do-if-your-status-does-not-change",
    title: "What to do if your status does not change",
    summary:
      "If your status seems frozen, here is how to tell whether the pause is still normal, what to check first, and when to follow up through official channels.",
    sections: [
      section(
        "Quick answer",
        "If your status hasn't changed, the first thing to check is how long it's actually been the same and exactly what the wording says. A slow update isn't always a problem — but a status that's been frozen for a long time deserves a more careful look.",
      ),
      section(
        "What this means",
        "A status that does not change can feel like nothing is happening. Sometimes that is simply because the next official update has not run yet. Other times it can mean a record issue, a pending verification, or a step that has not become visible in the wording yet.",
      ),
      section(
        "Why this happens",
        "No-change situations often come from backlogs, slow update cycles, recent changes to details, hidden payment-method problems, or an appeal or review that is still in progress. Users also often feel the status is frozen because they are checking very frequently during a period when no real updates are expected.",
      ),
      section(
        "What you can do next",
        "1. Write down how long the status has stayed the same.\n2. Check whether you recently changed your bank details, phone number, or other important information.\n3. Compare the wording with related guides for pending, identity verification, and banking issues.\n4. Wait for the next normal update if the pause is still short.\n5. Use the official route if the status remains unchanged well beyond a reasonable period.",
      ),
      section(
        "How to stay organised while waiting",
        "Keep a simple running note of when you checked, what the status said, and what changes you submitted. It's easy to lose track when you're checking frequently and anxious about the result. That record also makes it easier to explain the situation clearly if you need to contact the official channel.",
      ),
      section(
        "Important things to remember",
        "A frozen status does not always mean a negative outcome. But endless waiting without checking the right things can waste time. Balance patience with a sensible review of the facts.",
      ),
      section(
        "Status tracking on GrantCare",
        "Compare unchanged statuses with more specific guides, keep track of related payment-date pages, and understand the likely next step before you escalate anything officially.",
      ),
      section(
        "Related help",
        "Useful next pages:\n• /guides/status-stuck-pending\n• /guides/why-is-my-status-pending\n• /guides/how-long-an-appeal-takes\n• /guides/why-payment-is-delayed\n• /status/pending",
      ),
      faq(
        "How long should I wait before I worry?",
        "A status that stays unchanged across multiple normal update windows deserves a closer look. There is no fixed number, but use your judgement.",
      ),
      faq(
        "Can changing details cause the status to stop moving for a while?",
        "Yes. Recent changes can create a short delay while the system catches up.",
      ),
      faq(
        "Should I submit a new application because nothing changes?",
        "Not unless the official system tells you to reapply. A frozen status does not necessarily mean a new application is the answer.",
      ),
    ],
    featured: false,
    sponsored: false,
    sortOrder: 33,
  },
];
