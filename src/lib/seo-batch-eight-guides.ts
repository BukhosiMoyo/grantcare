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

export const SEO_BATCH_EIGHT_GUIDES = [
  guide({
    slug: "how-banking-details-updates-work",
    title: "How banking details updates work",
    summary:
      "A clear guide to what usually happens when banking details are updated and why that step can affect payment timing.",
    quickAnswer:
      "Updating your banking details temporarily pauses your payments. The system must verify your new account to prevent fraud before they can send you money again.",
    whatThisMeans:
      "You cannot just type in a new account number and expect a payment tomorrow. SASSA has to contact your bank, verify your ID against the account holder, and confirm the account is active. This process takes time.",
    whyThisMatters:
      "Users often expect a banking update to work instantly. When that does not happen, they may think the update failed or try changing the details again. In many cases, the slower movement is simply part of the normal verification stage.",
    steps:
      "1. Use the relevant official route for the banking update.\n2. Enter the new details carefully once.\n3. Save any confirmation or reference the system provides.\n4. Give the new details time to reflect and verify.\n5. Watch for banking or payment-related wording instead of assuming the update worked immediately.",
    keyFocusTitle: "What a banking update really changes",
    keyFocus:
      "The update changes the payment route, not only the information on file. That is why the important question after submission is not did I type it in. The more useful question is has the system accepted and verified the new payment method yet.",
    important:
      "Never give anyone your banking details to 'update' them for you. GrantCare can guide you through the process, but you must make the change yourself on the official SASSA portal.",
    help:
      "GrantCare can help you compare banking update wording, payment delays, and verification guides so you can see what stage the update is likely in.",
    related:
      "Useful next pages:\n• /guides/how-to-update-banking-details\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/why-bank-verification-fails\n• /status/banking-issue\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Should a banking update reflect immediately?",
        answer: "Not always. Verification and system updates can take time.",
      },
      {
        question: "Does a banking change affect payment timing?",
        answer: "Yes. It can delay payment while the new method is being checked.",
      },
      {
        question: "What should I keep after submitting the update?",
        answer: "Keep any confirmation, reference, or screenshot that shows the change was submitted.",
      },
    ],
    sortOrder: 114,
  }),
  guide({
    slug: "what-banking-details-status-check-means",
    title: "What banking details status check means",
    summary:
      "A plain-language guide to reading banking-details status wording and understanding what it usually says about the payment method step.",
    quickAnswer:
      "This status simply tells you if SASSA has finished verifying your bank account yet. If it's pending, they are still checking; if it failed, you need to fix your details.",
    whatThisMeans:
      "Don't panic—this status has nothing to do with whether your grant was approved or declined. It only means the system is figuring out where to send your money, not if you get money.",
    whyThisMatters:
      "When users see banking-related wording, they often assume the whole application failed. In many cases, the issue is narrower than that. The main question is whether the payment method itself is still being checked, corrected, or accepted.",
    steps:
      "1. Read the full banking-related wording carefully.\n2. Check whether it says pending, failed, accepted, or another clear state.\n3. Confirm whether your bank details were changed recently.\n4. Keep a note of the wording and date.\n5. Use the official route only if the wording clearly points to another step or a correction.",
    keyFocus:
      "The useful way to read a banking-details status is to ask what it says about the payment method specifically. That keeps you from overreacting as if the entire support process has collapsed.",
    important:
      "GrantCare helps you understand what the banking status means, but you must log into the official SASSA portal to see your real, up-to-date verification result.",
    help:
      "GrantCare can help you compare banking status messages with payment delay, missing-payment, and verification pages so the wording becomes easier to interpret.",
    related:
      "Useful next pages:\n• /guides/what-bank-verification-is-checking\n• /guides/what-pending-bank-verification-means\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/how-to-fix-banking-details-verification-delays\n• /status/banking-issue",
    faqs: [
      {
        question: "Does banking wording mean my whole application is gone?",
        answer: "Not usually. It often points to a payment-method issue rather than the whole case.",
      },
      {
        question: "Should I update my bank details again straight away?",
        answer: "Only if you know something is wrong or the official system asks you to change them.",
      },
      {
        question: "What is the main thing this status tells me?",
        answer: "It tells you where the payment-method information stands right now.",
      },
    ],
    sortOrder: 115,
  }),
  guide({
    slug: "how-to-update-banking-details-after-changing-banks",
    title: "How to update banking details after changing banks",
    summary:
      "A practical guide for users who moved to a new bank and need to update the payment route carefully without creating extra delays.",
    quickAnswer:
      "If you move to a new bank, you must update your details on the official portal immediately. Do it once, do it carefully, and then wait.",
    whatThisMeans:
      "If you close your old bank account, any money SASSA sends there will bounce back. You have to tell them about your new bank account so they can reroute your payments.",
    whyThisMatters:
      "Switching banks is a common reason for payment delays because users sometimes keep old details active too long or enter the new ones in a rushed way. A careful update reduces avoidable errors.",
    steps:
      "1. Use the official banking-update route for the correct support record.\n2. Enter the new bank information carefully.\n3. Make sure the account is active and suitable for the official payment rules.\n4. Save the confirmation if the system gives one.\n5. Wait for the update to reflect before making further changes.",
    keyFocusTitle: "What matters most after switching banks",
    keyFocus:
      "The important thing is not only that the new bank exists. The important thing is that the official record now points cleanly to the new account and that the system has had time to verify it.",
    important:
      "GrantCare cannot change your banking details for you. We explain the correct way to do it so you don't accidentally freeze your own payments.",
    help:
      "GrantCare can help you compare changed-bank situations with banking verification, delayed payment, and missing-payment guides.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-banking-details-updates-work\n• /guides/how-to-check-whether-your-bank-update-reflected\n• /guides/why-payment-is-delayed\n• /status/banking-issue",
    faqs: [
      {
        question: "Should I update the details as soon as I switch banks?",
        answer: "If the old account is no longer the right payment route, updating through the official system is usually important.",
      },
      {
        question: "Can changing banks cause a temporary payment delay?",
        answer: "Yes. That is common while the new details are being checked.",
      },
      {
        question: "What should I avoid after entering the new bank?",
        answer: "Avoid repeated edits unless you know the first update was wrong.",
      },
    ],
    sortOrder: 116,
  }),
  guide({
    slug: "why-your-banking-details-update-is-not-working",
    title: "Why your banking details update is not working",
    summary:
      "A troubleshooting guide for banking updates that do not seem to reflect, do not pass, or keep returning to the same issue.",
    quickAnswer:
      "If your banking update isn't working, you either typed something wrong, your bank account is not in your own name, or the system is just being slow.",
    whatThisMeans:
      "The most common reason for a failed bank update is using an account that belongs to someone else. SASSA will only pay money into an account that perfectly matches your ID number.",
    whyThisMatters:
      "Users often keep repeating the update when they feel nothing changed. That can make the situation harder to track and may slow things down further if the first update was actually still under review.",
    steps:
      "1. Check whether the new details were entered correctly.\n2. Confirm whether the account meets the official payment rules.\n3. Save the current wording showing the problem.\n4. Give the system a chance to verify the latest update.\n5. Use the official route if the same problem remains after enough time has passed.",
    keyFocus:
      "A banking update that looks broken is often either still under review or tied to a detail mismatch. That is why the wording and timing matter more than the feeling that nothing happened.",
    important:
      "We can help you figure out what went wrong, but we cannot access your SASSA file to fix it. If your details keep failing, you may need to visit a SASSA branch.",
    help:
      "GrantCare can help you compare non-working banking updates with bank verification, pending payment-method messages, and bank-detail acceptance guides.",
    related:
      "Useful next pages:\n• /guides/how-to-fix-banking-details-verification-delays\n• /guides/what-bank-verification-is-checking\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/how-to-check-whether-your-bank-update-reflected\n• /guides/why-bank-verification-fails",
    faqs: [
      {
        question: "Does not working always mean I typed it wrong?",
        answer: "Not always. It can also mean the update is still being checked or another payment-method issue remains.",
      },
      {
        question: "Should I keep submitting the same update again?",
        answer: "Usually no. Repeating the same step too quickly can create more confusion.",
      },
      {
        question: "What is the best thing to keep while I troubleshoot it?",
        answer: "Keep the wording, the date, and any proof that the update was submitted.",
      },
    ],
    sortOrder: 117,
  }),
  guide({
    slug: "how-to-fix-banking-details-verification-delays",
    title: "How to fix banking details verification delays",
    summary:
      "A calm guide to banking-verification delays and the safest way to respond when payment details are still not clearing.",
    quickAnswer:
      "The best way to fix a verification delay is to stop touching your profile. If you know your details are correct, leave them alone and let the system do its job.",
    whatThisMeans:
      "Every time you 'update' your details because you are tired of waiting, you get pushed to the back of the queue. A delay is perfectly normal—it means they are checking your account, not that it failed.",
    whyThisMatters:
      "Users often try to solve banking delays by changing details again and again. That can create more uncertainty. In many cases, the key is to confirm the information once and then track the wording carefully.",
    steps:
      "1. Check that the latest banking details are correct.\n2. Save the current banking-verification wording.\n3. Avoid making another change too quickly.\n4. Watch for movement in the wording after the next update period.\n5. Use the official route if the wording remains blocked for an unusually long time or requests a correction.",
    keyFocusTitle: "What usually makes the delay harder",
    keyFocus:
      "The delay becomes harder when users stop reading the current wording and start reacting to stress instead. Clear records and fewer repeated edits usually make the next step easier to judge.",
    important:
      "We know waiting for money is stressful. GrantCare helps you understand these normal delays so you don't panic and accidentally sabotage your own verification.",
    help:
      "GrantCare can help you compare banking verification delays with failed bank verification, pending payment method messages, and delayed-payment guides.",
    related:
      "Useful next pages:\n• /guides/what-bank-verification-is-checking\n• /guides/what-pending-bank-verification-means\n• /guides/why-bank-verification-fails\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Does a banking verification delay mean the payment is gone?",
        answer: "Not usually. It often means the payment method still needs to clear before payment can move cleanly.",
      },
      {
        question: "Should I correct the details even if they look right?",
        answer: "Only if you know something is wrong or the official route clearly tells you to update them.",
      },
      {
        question: "What is the safest first habit?",
        answer: "Keep the latest wording, confirm the details, and avoid repeated unnecessary edits.",
      },
    ],
    sortOrder: 118,
  }),
  guide({
    slug: "how-to-check-if-your-bank-details-were-accepted",
    title: "How to check if your bank details were accepted",
    summary:
      "A straightforward guide to the signs that a banking update has been accepted or is still being processed.",
    quickAnswer:
      "You will know your bank details are accepted when the 'pending verification' message disappears and your grant status returns to a normal 'approved' state.",
    whatThisMeans:
      "SASSA rarely sends a big congratulations message when your bank is verified. You just have to watch your status page—when the warnings disappear, you are good to go.",
    whyThisMatters:
      "People often want a single yes-or-no confirmation. In practice, acceptance may be clearer from what disappears and what replaces it than from one obvious acceptance banner.",
    steps:
      "1. Save the previous banking-related wording.\n2. Check the current official wording after the update period.\n3. Look for whether the banking issue or pending message is gone.\n4. Notice whether payment-related wording now becomes more relevant.\n5. Keep the records so you can compare if the wording changes again.",
    keyFocusTitle: "The most useful sign of acceptance",
    keyFocus:
      "The most useful sign is often progress. If the system stops talking about a banking issue and starts moving toward payment or another normal stage, that is usually more meaningful than waiting for a perfect acceptance label.",
    important:
      "GrantCare cannot look into your account to confirm if your bank was accepted. If your status stops complaining about banking, that is your official confirmation.",
    help:
      "GrantCare can help you compare accepted-looking updates with bank-verification, payment-processing, and delayed-payment guides so you know what the next stage probably is.",
    related:
      "Useful next pages:\n• /guides/how-to-check-whether-your-bank-update-reflected\n• /guides/what-bank-verification-is-checking\n• /guides/how-banking-details-updates-work\n• /guides/how-payments-work\n• /status/banking-issue",
    faqs: [
      {
        question: "Will the system always say accepted clearly?",
        answer: "Not always. Progress in the wording can be the more useful sign.",
      },
      {
        question: "What if the banking wording disappears but payment is still not there?",
        answer: "That can mean the process moved into a later payment-related stage rather than ending completely.",
      },
      {
        question: "Why compare old and new wording?",
        answer: "Because the change between them often tells you more than the latest message alone.",
      },
    ],
    sortOrder: 119,
  }),
  guide({
    slug: "how-to-change-bank-details-for-r350-support",
    title: "How to change bank details for R350 support",
    summary:
      "A high-intent guide for users searching specifically for bank-detail changes linked to R350-related support, written in a safe and non-official way.",
    quickAnswer:
      "Only change your banking details directly on the SRD portal. Type your new account number slowly, submit it once, and wait for the verification message to appear.",
    whatThisMeans:
      "Scammers know people search for 'change R350 bank details' on Google. Never click on random links that promise a shortcut. The only real route is through the official gov.za website.",
    whyThisMatters:
      "Bank-detail changes for this kind of support are high-stress because they are directly connected to payment. That makes users more likely to trust wrong links or rush through the update.",
    steps:
      "1. Start from the relevant official banking-details route.\n2. Check the page carefully before entering information.\n3. Submit the new bank details once and carefully.\n4. Save the current wording and any reference.\n5. Watch for banking-verification or payment-method updates before assuming the change failed.",
    keyFocus:
      "The key is to separate the search phrase from the official route. The phrase may help you find the topic, but the official route still decides where the update belongs and how it is confirmed.",
    important:
      "GrantCare will never ask for your bank details. If a site claiming to be GrantCare asks for your account number, close the page immediately.",
    help:
      "GrantCare can help you compare changed bank details, pending payment method wording, and banking verification guidance after the official update is done.",
    related:
      "Useful next pages:\n• /guides/how-to-update-banking-details\n• /guides/how-banking-details-updates-work\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/how-to-find-official-banking-and-verification-pages-safely",
    faqs: [
      {
        question: "Is the search term enough to know I am on the right page?",
        answer: "No. You should still check that the route is the correct official one.",
      },
      {
        question: "Should I use a random link that mentions R350 bank details?",
        answer: "No. Use the relevant official route for the actual banking change.",
      },
      {
        question: "What should I look for after submitting the new details?",
        answer: "Look for banking-verification or payment-method wording that shows the new details are being processed.",
      },
    ],
    sortOrder: 120,
  }),
  guide({
    slug: "how-to-update-banking-details-without-making-mistakes",
    title: "How to update banking details without making mistakes",
    summary:
      "A mistake-prevention guide focused on the small banking-update errors that often cause bigger payment problems later.",
    quickAnswer:
      "The secret to a perfect bank update is patience. Open the official portal, type your details very carefully, click submit once, and do not touch it again.",
    whatThisMeans:
      "A single typo in your account number will fail the verification check and force you to wait another month for your money. Take an extra 30 seconds to double-check your typing.",
    whyThisMatters:
      "Users often focus on speed because they want the payment issue solved quickly. That can lead to typing errors, repeated updates, or using the wrong route. A slower, cleaner update is usually safer.",
    steps:
      "1. Start from the correct official route.\n2. Enter the bank details slowly and carefully.\n3. Double-check the information before submitting.\n4. Save proof of the update if available.\n5. Wait for the official wording to change before taking another action.",
    keyFocusTitle: "The main habit that prevents errors",
    keyFocus:
      "The habit that prevents most problems is simple: one careful update is better than several anxious ones. That helps the official system process a clear payment-method change instead of a moving target.",
    important:
      "We can teach you how to avoid delays, but you are the only one who can actually type the numbers into the SASSA portal safely.",
    help:
      "GrantCare can help you compare update mistakes with bank-verification delays, failed updates, and payment-delay guidance so you can see where a mistake may actually matter.",
    related:
      "Useful next pages:\n• /guides/why-your-banking-details-update-is-not-working\n• /guides/how-banking-details-updates-work\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/what-bank-verification-is-checking\n• /status/banking-issue",
    faqs: [
      {
        question: "Is moving too fast really a common problem?",
        answer: "Yes. Small errors made in a rush can create bigger payment delays later.",
      },
      {
        question: "Should I keep editing if I feel unsure after submitting?",
        answer: "Only if you know something is wrong. Repeated edits can make the process harder to track.",
      },
      {
        question: "What is the safest mindset during the update?",
        answer: "Slow, careful, and official-route-first.",
      },
    ],
    sortOrder: 121,
  }),
  guide({
    slug: "what-bank-verification-is-checking",
    title: "What bank verification is checking",
    summary:
      "A plain-language guide to what bank verification is usually trying to confirm and why that step can delay payment even after approval.",
    quickAnswer:
      "Bank verification is SASSA checking with your bank to make sure the account is real, active, and strictly in your own name.",
    whatThisMeans:
      "Even if you gave them the perfect account number, they still have to run it through Treasury databases to prevent fraud. This is why it takes time, even when you did everything perfectly.",
    whyThisMatters:
      "If users misunderstand verification, they may think the whole application is being rechecked. In many cases, the narrower issue is the payment route itself.",
    steps:
      "1. Read the banking-verification wording carefully.\n2. Check whether your account details are current and correct.\n3. Note whether the account changed recently.\n4. Save the wording and date.\n5. Watch for acceptance or movement in the payment-related stage before making another change.",
    keyFocus:
      "The important point is that verification is about trust in the payment route. That explains why the process can take time even when the rest of the case looks positive.",
    important:
      "GrantCare cannot speed up bank verification. We are here to reassure you that a delay is completely normal security protocol.",
    help:
      "GrantCare can help you compare bank-verification wording with pending payment method, delayed payment, and bank-details acceptance guidance.",
    related:
      "Useful next pages:\n• /guides/how-to-fix-banking-details-verification-delays\n• /guides/what-pending-bank-verification-means\n• /guides/why-bank-verification-fails\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Does bank verification mean I was declined?",
        answer: "Not usually. It often points to the payment route still being checked.",
      },
      {
        question: "Can verification happen after approval?",
        answer: "Yes. A payment-method issue can still appear after approval.",
      },
      {
        question: "What is the main thing being checked?",
        answer: "Whether the payment details match what the official system needs for a safe payment route.",
      },
    ],
    sortOrder: 122,
  }),
  guide({
    slug: "what-to-do-if-your-payment-method-is-still-pending",
    title: "What to do if your payment method is still pending",
    summary:
      "A practical guide for users whose payment method still shows a pending state and who need to know whether to wait, check details, or act.",
    quickAnswer:
      "If your payment method is pending, just wait. Changing your details again will only reset the clock and make you wait even longer.",
    whatThisMeans:
      "'Pending' means your file is sitting in a digital queue waiting for a fraud check. It does not mean there is a problem, it just means it is not your turn yet.",
    whyThisMatters:
      "Users often see pending and immediately start editing details. That is not always the right response. Sometimes the better step is to keep the latest details stable and watch for the wording to move.",
    steps:
      "1. Read the current payment-method wording carefully.\n2. Confirm whether your banking details changed recently.\n3. Keep a record of the wording and date.\n4. Avoid repeated changes unless you know something is wrong.\n5. Use the official route if the pending state lasts unusually long or turns into a clearer issue.",
    keyFocus:
      "The payment method is often one of the last practical stages before money can move properly. That is why a pending state here feels serious, but it still needs to be read as a process stage before it is read as a failure.",
    important:
      "We know waiting is the hardest part. GrantCare provides this guidance so you know the difference between a normal waiting period and a real failure.",
    help:
      "GrantCare can help you compare pending payment-method wording with bank verification, delayed payment, and missing-payment guidance so you know what to watch next.",
    related:
      "Useful next pages:\n• /guides/what-bank-verification-is-checking\n• /guides/what-pending-bank-verification-means\n• /guides/how-to-fix-banking-details-verification-delays\n• /guides/how-payments-work\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Does pending payment method mean no payment is possible?",
        answer: "It usually means payment may still be delayed until the method is accepted, not that the case is gone.",
      },
      {
        question: "Should I edit the details right away?",
        answer: "Only if you know there is a real mistake or the official route clearly asks for a change.",
      },
      {
        question: "Why is this stage so important?",
        answer: "Because the payment method has to be trusted before funds can usually move smoothly.",
      },
    ],
    sortOrder: 123,
  }),
  guide({
    slug: "how-to-change-your-phone-number-online-safely",
    title: "How to change your SASSA phone number online safely",
    summary:
      "A safe-step guide to changing your SASSA phone number online without losing access or exposing sensitive OTP-related details to the wrong page.",
    quickAnswer:
      "Only change your SASSA phone number on the official SRD website. Never use third-party links, and never give a stranger your OTP to do it for you.",
    whatThisMeans:
      "Your phone number is the master key to your grant. If someone else gets control of your number, they can steal your money. Treat it like your ATM PIN.",
    whyThisMatters:
      "Users usually change numbers when they are already under pressure because a SIM was lost, stolen, or replaced. That pressure can make them trust unsafe links or rush through the process.",
    steps:
      "1. Start from the correct official number-change route.\n2. Check that the new number is active and under your control.\n3. Complete the official change carefully.\n4. Save any confirmation or evidence of the update.\n5. Check later that the updated number now matches the official record.",
    keyFocusTitle: "Why phone changes need extra care",
    keyFocus:
      "A phone-number change affects access, not only communication. That means the quality of the update matters just as much as the fact of the change itself.",
    important:
      "GrantCare will never ask for your phone number or OTP. We cannot change your number for you, and anyone who says they can is trying to scam you.",
    help:
      "GrantCare can help you compare phone-number changes with OTP issues, identity checks, and status delays that appear after details change.",
    related:
      "Useful next pages:\n• /guides/how-to-change-phone-number\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-to-keep-access-after-changing-your-number\n• /guides/what-to-do-if-you-need-to-change-phone-number-without-otp\n• /guides/why-identity-verification-fails",
    faqs: [
      {
        question: "Why is the new number needing to be under my control so important?",
        answer: "Because the number is often used for OTPs, access, and official updates.",
      },
      {
        question: "Should I trust any website that says it can change my number online?",
        answer: "No. Use the correct official route for the actual change.",
      },
      {
        question: "What should I keep after changing the number?",
        answer: "Keep any confirmation, screenshot, or official reference linked to the update.",
      },
    ],
    sortOrder: 124,
  }),
  guide({
    slug: "what-to-do-if-you-need-to-change-phone-number-without-otp",
    title: "How to change your SASSA phone number without OTP",
    summary:
      "A cautious guide for users who lost access to the old number and cannot complete a normal OTP-based SASSA phone-number change in the usual way.",
    quickAnswer:
      "If you lost your old SIM card and cannot get an OTP, you must use the official SASSA 'Change Phone Number' option which requires your ID number.",
    whatThisMeans:
      "When you lose your phone, scammers will try to sell you 'shortcuts' to bypass the OTP. Do not fall for it. The official SASSA system is the only way to recover your account safely.",
    whyThisMatters:
      "People in this position are more likely to trust unsafe helpers because they feel blocked. That makes it especially important to stay on the official route and avoid sharing sensitive information in unofficial places.",
    steps:
      "1. Look for the relevant official recovery or number-update path.\n2. Confirm that the route is official before entering information.\n3. Gather any details that prove the record is yours.\n4. Save the wording and any confirmation during the process.\n5. Check later that the new number now reflects correctly on the official record.",
    keyFocus:
      "The real issue here is account control. The process is not only about changing a phone number. It is about proving that the record should still be updated even though the old number is not available.",
    important:
      "There is no magic trick to bypass SASSA security. GrantCare helps you find the correct official forms so you can recover your account legally.",
    help:
      "GrantCare can help you compare no-OTP phone-number changes with identity verification, number recovery, and post-update follow-up guides.",
    related:
      "Useful next pages:\n• /guides/how-to-change-phone-number\n• /guides/how-to-change-your-phone-number-online-safely\n• /guides/how-to-fix-phone-number-mismatch-problems\n• /guides/how-to-keep-access-after-changing-your-number\n• /guides/how-to-know-if-a-verification-request-is-official",
    faqs: [
      {
        question: "Can GrantCare change my number without OTP?",
        answer: "No. GrantCare is not the official system and cannot perform that kind of official recovery.",
      },
      {
        question: "Why are unofficial shortcuts risky here?",
        answer: "Because they often ask for sensitive details and may not be lawful or safe.",
      },
      {
        question: "What matters most when I cannot access the old number?",
        answer: "Using the correct official recovery or update route and keeping the process secure.",
      },
    ],
    sortOrder: 125,
  }),
  guide({
    slug: "how-phone-number-changes-affect-status-checks",
    title: "How phone number changes affect status checks",
    summary:
      "A practical guide to the link between phone-number changes, account access, and later status-check confusion.",
    quickAnswer:
      "Changing your phone number temporarily freezes your account. The system has to sync your new number before you can check your status or get updates.",
    whatThisMeans:
      "SASSA is highly suspicious of phone number changes because it is how scammers operate. They will intentionally slow down your account access to ensure you are the real owner.",
    whyThisMatters:
      "Users often change the number and then panic when the status page looks different or access becomes harder. That does not always mean the case is broken. It may simply mean the update still needs to settle.",
    steps:
      "1. Save proof that the number change was submitted.\n2. Check the status route again after the update has had time to reflect.\n3. Read any verification or pending wording carefully.\n4. Avoid random extra changes unless something is clearly wrong.\n5. Use the official route if the number mismatch still blocks access or updates.",
    keyFocus:
      "The most useful way to think about this is that the number change affects access and identity signals, not only messages. That is why later status checks can feel different right after the update.",
    important:
      "Do not panic if you cannot check your status immediately after a number change. GrantCare helps you understand this temporary lockout so you don't keep resetting things.",
    help:
      "GrantCare can help you compare post-number-change confusion with identity verification, pending checks, and number-recovery guides.",
    related:
      "Useful next pages:\n• /guides/how-to-change-phone-number\n• /guides/how-to-change-your-phone-number-online-safely\n• /guides/how-to-check-status-after-changing-details\n• /guides/what-pending-id-verification-means\n• /guides/why-identity-verification-fails",
    faqs: [
      {
        question: "Can a phone-number change make status checking harder for a while?",
        answer: "Yes. That can happen while the new number is settling into the official record.",
      },
      {
        question: "Does that mean my application is gone?",
        answer: "Not automatically. It often means the update still affects access or verification.",
      },
      {
        question: "What should I focus on first?",
        answer: "Focus on whether the number change was completed correctly and what the latest official wording now says.",
      },
    ],
    sortOrder: 126,
  }),
  guide({
    slug: "how-to-fix-phone-number-mismatch-problems",
    title: "How to fix phone number mismatch problems",
    summary:
      "A practical guide to number mismatches that cause access, OTP, or verification problems and how to think through them calmly.",
    quickAnswer:
      "If SASSA thinks your number does not match your ID, you must update your details officially. Do not try to trick the system with fake numbers.",
    whatThisMeans:
      "A mismatch usually means you applied with one phone number but are trying to check your status with a completely different one. The system blocks this automatically to protect you.",
    whyThisMatters:
      "Users often treat the mismatch as a small contact problem, but it can affect access and verification in a much bigger way. That is why the safest route is to correct the mismatch carefully, not casually.",
    steps:
      "1. Work out which number the system seems to expect.\n2. Use the relevant official number-update or recovery route.\n3. Save the wording and any confirmation.\n4. Give the corrected number time to reflect.\n5. Recheck the official status or access route once the change should have settled.",
    keyFocus:
      "The useful question is not only which number is new. The better question is which number the official record still believes is connected to the case. That helps you fix the mismatch more directly.",
    important:
      "GrantCare cannot sync your phone numbers for you. If your numbers are tangled up, you must log in to the official portal to fix the mismatch.",
    help:
      "GrantCare can help you compare number mismatches with no-OTP changes, identity verification issues, and post-update status-check confusion.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-you-need-to-change-phone-number-without-otp\n• /guides/how-to-change-your-phone-number-online-safely\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-to-check-whether-your-number-update-reflected\n• /guides/why-identity-verification-fails",
    faqs: [
      {
        question: "Does a mismatch always mean I changed the number wrongly?",
        answer: "Not always. It can also mean the official record still points to an older number.",
      },
      {
        question: "Should I use a shortcut if I cannot fix the mismatch quickly?",
        answer: "No. Unofficial shortcuts are risky, especially when OTPs and access are involved.",
      },
      {
        question: "What should I keep during the fix?",
        answer: "Keep the wording, dates, and any proof that the update or recovery step was completed.",
      },
    ],
    sortOrder: 127,
  }),
  guide({
    slug: "how-to-keep-access-after-changing-your-number",
    title: "How to keep access after changing your number",
    summary:
      "A practical recovery guide for users who changed numbers and want to reduce the chance of losing access to updates or future steps.",
    quickAnswer:
      "To ensure you don't lose access to your grant, only change your SASSA number to a SIM card you permanently own and keep active.",
    whatThisMeans:
      "Never use a friend's phone number or a temporary SIM. If you lose that SIM card, you will be permanently locked out of your SASSA profile and will stop getting paid.",
    whyThisMatters:
      "Once access is lost, users often have to solve a harder recovery problem instead of a simpler update problem. It is better to think about access protection at the same time as the number change itself.",
    steps:
      "1. Check that the new number is active and reliable.\n2. Use the correct official update route.\n3. Save any proof of the change.\n4. Recheck later that the new number now works where it should.\n5. If access still points to the old number, use the official recovery route rather than guesswork.",
    keyFocus:
      "Access is something to test after the change, not something to assume. A good number update is not finished until the new number works where it needs to work.",
    important:
      "We strongly advise keeping your number permanent. GrantCare cannot help you recover an account if you lose the SIM card you registered with.",
    help:
      "GrantCare can help you compare keeping access with number mismatches, no-OTP changes, and identity-verification issues that often follow number changes.",
    related:
      "Useful next pages:\n• /guides/how-to-change-your-phone-number-online-safely\n• /guides/what-to-do-if-you-need-to-change-phone-number-without-otp\n• /guides/how-to-fix-phone-number-mismatch-problems\n• /guides/how-to-check-whether-your-number-update-reflected\n• /guides/how-phone-number-changes-affect-status-checks",
    faqs: [
      {
        question: "Why does access still matter after the number update is submitted?",
        answer: "Because the system still needs to use the new number correctly for future verification and account steps.",
      },
      {
        question: "Should I test the new number later?",
        answer: "Yes. It is useful to confirm that the updated number now works where it should.",
      },
      {
        question: "What if the old number still seems active on the record?",
        answer: "Use the official recovery or update route to resolve it rather than trying unofficial fixes.",
      },
    ],
    sortOrder: 128,
  }),
  guide({
    slug: "what-identity-verification-link-means",
    title: "What SASSA identity verification link means",
    summary:
      "A plain-language explanation of what a SASSA identity verification link usually means and why it appears in some support-related processes.",
    quickAnswer:
      "An identity verification link means SASSA has paused your application to prove you are who you say you are. You must complete it before your grant can move forward.",
    whatThisMeans:
      "SASSA sends this link when something looks suspicious on your profile, like a changed bank account or phone number. They want to verify your face matches your ID before they pay you.",
    whyThisMatters:
      "Identity verification links create a lot of stress because users are worried about scams. That is a sensible concern. The safest response is to confirm that the request is official before you follow it.",
    steps:
      "1. Check whether the verification request came through the correct official route.\n2. Save the wording and the date.\n3. Confirm that the link belongs to the right official process.\n4. Complete the official step only if you are confident it is authentic.\n5. Watch for later status changes after the verification step is done.",
    keyFocus:
      "The link itself is less important than what it is trying to do. It is usually trying to confirm identity, which is why trust and route safety matter so much before you click anything.",
    important:
      "GrantCare will never send you a link to verify your identity. Only trust links that come directly from official SASSA SMS numbers.",
    help:
      "GrantCare can help you compare identity verification links with official-request safety guides, failed verification pages, and number-change related guides.",
    related:
      "Useful next pages:\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/what-identity-verification-sms-usually-means\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/why-identity-verification-fails\n• /status/identity-verification",
    faqs: [
      {
        question: "Does an identity verification link mean I was declined?",
        answer: "Not necessarily. It often means another identity step is needed before the process can move on.",
      },
      {
        question: "Should I click every link that mentions identity verification?",
        answer: "No. Confirm that the request is official before acting.",
      },
      {
        question: "Why would the system ask for this?",
        answer: "Usually because it wants more confidence that the record matches the correct person.",
      },
    ],
    sortOrder: 129,
  }),
  guide({
    slug: "how-to-use-an-identity-verification-link-safely",
    title: "How to use a SASSA identity verification link safely",
    summary:
      "A trust-focused guide to handling SASSA identity verification links carefully and reducing the risk of following fake or unsafe requests.",
    quickAnswer:
      "Never click a verification link sent to you on WhatsApp or Facebook. Only click links that are SMS'd directly from SASSA while you are actively busy with an application.",
    whatThisMeans:
      "Scammers love sending fake 'Verify your Identity' links to steal your ID number and hijack your grant. If a message tells you to 'click immediately or lose your grant', it is almost certainly a scam.",
    whyThisMatters:
      "A fake identity-verification link can expose sensitive information or send a user into the wrong process. A real one still needs to be handled carefully so the user stays in the official flow.",
    steps:
      "1. Confirm that the verification request matches the official process you are in.\n2. Check the route carefully before clicking.\n3. Avoid forwarded or copied links from uncertain sources.\n4. Complete the step only if the request looks authentic.\n5. Keep a record of the wording and what happened after the step.",
    keyFocusTitle: "The safest way to judge the link",
    keyFocus:
      "Do not judge the link only by how urgent it sounds. Judge it by whether it clearly belongs to the official process, clearly matches your current situation, and clearly connects to a real verification request you were expecting.",
    important:
      "GrantCare helps you spot fake links. If you are ever unsure, do not click. Log into the official SRD portal instead to see if they really need you to verify.",
    help:
      "GrantCare can help you compare identity-verification links with official-request checks, SMS meaning pages, and failed-verification guides.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/what-to-do-if-your-identity-verification-link-does-not-work\n• /guides/how-to-find-official-banking-and-verification-pages-safely\n• /status/identity-verification",
    faqs: [
      {
        question: "What is the biggest risk here?",
        answer: "Following a fake or misleading link that only looks official.",
      },
      {
        question: "Should urgency make me trust the request more?",
        answer: "No. Urgent wording should make you more careful, not less.",
      },
      {
        question: "What should I do before clicking?",
        answer: "Check that the request matches the official process and route you are already dealing with.",
      },
    ],
    sortOrder: 130,
  }),
  guide({
    slug: "what-identity-verification-sms-usually-means",
    title: "What identity verification SMS usually means",
    summary:
      "A plain-language guide to identity-verification SMS messages and how to read them without trusting every text that sounds official.",
    quickAnswer:
      "If you receive an SMS asking you to verify your identity, treat it with extreme caution. Check that it matches a recent action you took on your profile.",
    whatThisMeans:
      "It is incredibly easy for scammers to fake an SMS so it looks like it came from SASSA. Just because an SMS appears on your phone does not mean it is real.",
    whyThisMatters:
      "Text-message requests can be real, but copied or misleading messages can also spread easily. A careful reading protects users from acting on the wrong message.",
    steps:
      "1. Read the message carefully and save it.\n2. Check whether it matches the official process you are in.\n3. Avoid clicking links from uncertain or copied messages.\n4. Confirm the request through the proper official route if needed.\n5. Complete the official step only once you trust the request.",
    keyFocus:
      "The key is to match the SMS to your actual situation. If you were already in an identity-check stage, the message may fit. If the message appears out of nowhere and asks for sensitive action, extra caution is sensible.",
    important:
      "We cannot verify if your specific SMS is real. But GrantCare strongly advises never clicking SMS links unless you requested them literally 5 minutes ago.",
    help:
      "GrantCare can help you compare SMS requests with verification links, official-request safety checks, and failed-verification explanations.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/what-pending-id-verification-means\n• /status/identity-verification",
    faqs: [
      {
        question: "Should I trust every SMS that mentions verification?",
        answer: "No. It still needs to match the official process and look authentic.",
      },
      {
        question: "What if the SMS feels urgent?",
        answer: "Urgency is a reason to slow down and verify the request, not to trust it automatically.",
      },
      {
        question: "Why save the message first?",
        answer: "Keeping a record helps you compare it with the official route and avoid relying on memory.",
      },
    ],
    sortOrder: 131,
  }),
  guide({
    slug: "how-to-request-identity-verification-properly",
    title: "How to request identity verification properly",
    summary:
      "A practical guide to approaching identity verification requests the right way, using the official route and avoiding guesswork.",
    quickAnswer:
      "If SASSA tells you to verify your identity, follow their exact instructions on the official portal. Do not use third-party apps to scan your face.",
    whatThisMeans:
      "Identity verification is how you prove ownership of your grant. If you do it through an unofficial app or website, you are literally handing your identity over to strangers.",
    whyThisMatters:
      "If users get this step wrong, they may delay the case further or expose personal information. A proper request or response keeps the process connected to the official record instead of sending it sideways.",
    steps:
      "1. Confirm that identity verification is the actual issue on your case.\n2. Use the official route for the request or step.\n3. Save the wording and date.\n4. Complete only the official action that matches your case.\n5. Watch for later wording that shows whether the identity step moved forward.",
    keyFocus:
      "A proper identity-verification step starts with clarity about why the system is asking for it. Once that is clear, the safest path is the one that stays entirely within the official process.",
    important:
      "GrantCare cannot manually verify your identity. You must complete the official biometric or ID verification yourself through SASSA.",
    help:
      "GrantCare can help you connect identity verification to failed verification, verification links, and detail-change guides so the process feels less confusing.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/why-identity-verification-fails\n• /guides/how-to-fix-verification-problems-after-changing-details\n• /status/identity-verification",
    faqs: [
      {
        question: "Can I use any page that says it offers identity verification?",
        answer: "No. Use only the proper official route for the actual step.",
      },
      {
        question: "What should I confirm before requesting it?",
        answer: "Confirm that identity verification is really the issue shown on your case.",
      },
      {
        question: "What should I watch after the step is done?",
        answer: "Watch for the official wording to change into a later status or another next step.",
      },
    ],
    sortOrder: 132,
  }),
  guide({
    slug: "what-biometric-identity-verification-means",
    title: "What biometric identity verification means",
    summary:
      "A cautious explainer for biometric identity verification requests and what users should understand before treating them as normal or fake.",
    quickAnswer:
      "Biometric verification means SASSA wants to scan your face or fingerprints. This is their highest level of security to stop someone else from claiming your money.",
    whatThisMeans:
      "Because biometric data is your most private information, SASSA only asks for it when they suspect fraud or when a high-risk change (like banking details) is made. It is annoying, but it protects you.",
    whyThisMatters:
      "Because the term sounds official and advanced, users may trust it too quickly or fear it too much. A calmer reading helps you focus on whether the request truly belongs to the official process you are in.",
    steps:
      "1. Confirm that the biometric request matches your official case.\n2. Save the wording and date.\n3. Check that the route is authentic before acting.\n4. Follow only the official biometric step shown for your case.\n5. Watch for updated wording after the biometric step is completed.",
    keyFocus:
      "The important issue is not only the word biometric. It is whether the official system is genuinely asking for a stronger identity step and whether the request fits the case you are already dealing with.",
    important:
      "GrantCare will never ask to scan your face or take your fingerprints. Biometric checks must only happen on the official government portal.",
    help:
      "GrantCare can help you compare biometric requests with identity links, official-request safety guidance, and failed-verification explanations.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/why-identity-verification-fails\n• /status/identity-verification",
    faqs: [
      {
        question: "Does biometric verification always mean something is wrong?",
        answer: "Not always. It usually means the process wants a stronger identity check.",
      },
      {
        question: "Should I trust the word biometric on its own?",
        answer: "No. The request still needs to match the official route and your real case.",
      },
      {
        question: "What should I do before acting on it?",
        answer: "Confirm that the request is authentic and linked to the correct official process.",
      },
    ],
    sortOrder: 133,
  }),
  guide({
    slug: "what-to-do-if-your-identity-verification-link-does-not-work",
    title: "What to do if your identity verification link does not work",
    summary:
      "A troubleshooting guide for identity-verification links that will not open, fail to load, or seem unusable.",
    quickAnswer:
      "If your ID verification link is broken or expired, do not panic. It just means the link died, not that your grant was cancelled. You will need to request a new one.",
    whatThisMeans:
      "Verification links usually expire after a few days for security reasons. If you click it too late, or if the SASSA servers are down, the page simply won't load.",
    whyThisMatters:
      "Users often panic when a verification link fails because identity checks already feel stressful. That can lead to rushed clicks on other links that are less trustworthy.",
    steps:
      "1. Save the wording around the verification request.\n2. Check whether the link came from the proper official route.\n3. Retry carefully rather than clicking random alternatives.\n4. Use the official process to confirm what the next step should be.\n5. Keep a record of the issue in case the wording changes later.",
    keyFocus:
      "The link failure is often a route problem, not proof that the identity step itself disappeared. That distinction helps you stay focused on safety instead of chasing unsafe substitutes.",
    important:
      "GrantCare cannot generate a new link for you. You must go back to the official SASSA portal and trigger a new identity check.",
    help:
      "GrantCare can help you compare broken verification links with official-request checks, identity verification meaning pages, and post-detail-change verification problems.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/what-pending-id-verification-means\n• /guides/how-to-find-official-banking-and-verification-pages-safely",
    faqs: [
      {
        question: "Does a broken link mean the verification request was fake?",
        answer: "Not always. It can also mean the route failed or the link no longer works properly.",
      },
      {
        question: "Should I search for a different link right away?",
        answer: "Only through the proper official route, not through random alternatives.",
      },
      {
        question: "What should I save when the link fails?",
        answer: "Save the wording, the time, and any message that shows what happened.",
      },
    ],
    sortOrder: 134,
  }),
  guide({
    slug: "how-to-know-if-a-verification-request-is-official",
    title: "How to know if a verification request is official",
    summary:
      "A trust guide to help users judge whether a banking or identity verification request really belongs to the official process.",
    quickAnswer:
      "An official request will never ask for money, will never promise to 'speed up' your grant, and will only direct you to a website ending in '.gov.za'.",
    whatThisMeans:
      "If you did not recently change your bank details or apply for a grant, but suddenly get an SMS to 'verify your ID', it is almost certainly a scammer trying to steal your profile.",
    whyThisMatters:
      "Verification is one of the easiest points for fake requests to spread because users expect urgency and sensitive action. That makes trust checks especially important here.",
    steps:
      "1. Check whether the request matches the real issue on your case.\n2. Check whether the route clearly belongs to the proper official process.\n3. Avoid acting on copied messages from uncertain sources.\n4. Save the request if you need time to compare it carefully.\n5. Only proceed once you are confident it is part of the real official route.",
    keyFocus:
      "The safest way to judge a verification request is to compare it with your real situation. A message that appears without context or pushes you into unusual urgency deserves extra caution.",
    important:
      "We will never text you asking for your ID number. Always assume any random SMS is fake until you log into the official portal to check your status.",
    help:
      "GrantCare can help you compare verification requests with identity-link guidance, SMS meaning pages, and official-route safety pages so the difference between real and risky feels clearer.",
    related:
      "Useful next pages:\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/what-identity-verification-sms-usually-means\n• /guides/how-to-find-official-banking-and-verification-pages-safely\n• /guides/how-to-avoid-fake-status-check-sites\n• /privacy",
    faqs: [
      {
        question: "What is the best first test?",
        answer: "Ask whether the request clearly matches the issue and process you are already dealing with.",
      },
      {
        question: "Should urgency make me trust a request more?",
        answer: "No. Urgency should make you check it more carefully.",
      },
      {
        question: "Can a real request still look confusing?",
        answer: "Yes. That is why comparing it with the proper official route matters.",
      },
    ],
    sortOrder: 135,
  }),
  guide({
    slug: "how-to-fix-verification-problems-after-changing-details",
    title: "How to fix verification problems after changing details",
    summary:
      "A practical bridge guide for users whose verification problems started after changing phone, banking, or other official details.",
    quickAnswer:
      "If your verification failed right after you updated your phone or bank details, the system is simply pausing to check the new info. Do not change it back.",
    whatThisMeans:
      "SASSA treats any change to your profile as a potential security threat. They freeze your account temporarily to make sure a scammer didn't change your details.",
    whyThisMatters:
      "Users often fix one problem and accidentally create another temporary one through the update itself. That is why it helps to treat post-update verification issues as part of the same story, not as a completely separate mystery.",
    steps:
      "1. Write down which detail changed and when.\n2. Save the current verification wording.\n3. Check whether the problem seems linked to the new detail.\n4. Avoid random extra edits while the system is still catching up.\n5. Use the official route if the verification issue remains after enough time has passed.",
    keyFocus:
      "The most useful question is what changed just before verification became a problem. That often gives the clearest clue about whether the issue is still settling or whether another correction is truly needed.",
    important:
      "GrantCare helps you realize that this delay is actually protecting you. Let the system finish its security check.",
    help:
      "GrantCare can help you compare post-update verification problems with number-change guides, bank-verification guidance, and pending-verification explanations.",
    related:
      "Useful next pages:\n• /guides/how-to-check-status-after-changing-details\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-banking-details-updates-work\n• /guides/what-pending-id-verification-means\n• /guides/what-pending-bank-verification-means",
    faqs: [
      {
        question: "Can a correct update still trigger a temporary verification problem?",
        answer: "Yes. A correct change can still create a waiting stage while the new detail is being checked.",
      },
      {
        question: "Should I undo the change immediately?",
        answer: "Not unless you know it was wrong. Undoing changes too quickly can create more confusion.",
      },
      {
        question: "What should I track first?",
        answer: "Track what changed, when it changed, and what the new official wording now says.",
      },
    ],
    sortOrder: 136,
  }),
  guide({
    slug: "what-pending-bank-verification-means",
    title: "What pending bank verification means",
    summary:
      "A plain-language explanation of pending bank verification and what users should usually do while the payment route is still being checked.",
    quickAnswer:
      "Pending bank verification means Treasury is currently checking your account against your ID number. It is not a decline—it is just a waiting room.",
    whatThisMeans:
      "You cannot speed this up. The government has to communicate with your specific bank to confirm the account is active and belongs to you. This takes time.",
    whyThisMatters:
      "Because money is involved, this message feels heavier than many other pending states. That can lead to quick, repeated edits. In many cases, the better response is to read the wording carefully and give the check time to move.",
    steps:
      "1. Save the current pending wording and date.\n2. Confirm whether the latest bank details are correct.\n3. Avoid repeated unnecessary changes.\n4. Watch for movement after the next update period.\n5. Use the official route if the wording becomes a clearer banking problem or stays pending unusually long.",
    keyFocus:
      "Pending bank verification is mainly a message about trust in the payment route. That is why it belongs closer to payment timing than to the basic question of whether the case still exists.",
    important:
      "Do not update your bank details again while it says pending. GrantCare reminds you that resetting your details puts you at the back of the queue.",
    help:
      "GrantCare can help you compare pending bank verification with delayed-payment guidance, bank-verification explanations, and bank-details acceptance pages.",
    related:
      "Useful next pages:\n• /guides/what-bank-verification-is-checking\n• /guides/how-to-fix-banking-details-verification-delays\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/why-bank-verification-fails\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Does pending bank verification mean my application is gone?",
        answer: "No. It usually means the payment method still needs to clear.",
      },
      {
        question: "Should I change the bank details again now?",
        answer: "Only if you know they are wrong or the official route tells you to correct them.",
      },
      {
        question: "Why can this delay payment?",
        answer: "Because the payment route often needs to be trusted before money can move smoothly.",
      },
    ],
    sortOrder: 137,
  }),
  guide({
    slug: "what-pending-id-verification-means",
    title: "What pending ID verification means",
    summary:
      "A simple explanation of pending ID verification and how to read it as a process stage instead of an instant final outcome.",
    quickAnswer:
      "Pending ID verification means SASSA is checking your details against the Department of Home Affairs database. Your grant is paused, but not declined.",
    whatThisMeans:
      "If you recently got a new ID card, or if your name changed, the system needs time to update. It is doing a background check to prevent identity theft.",
    whyThisMatters:
      "Identity-related wording makes many users fear an immediate negative result. In practice, pending ID verification often means more waiting and careful reading are needed before anything final is clear.",
    steps:
      "1. Save the current ID-verification wording.\n2. Check whether any personal or phone details changed recently.\n3. Avoid random changes unless you know something is wrong.\n4. Watch for movement in the wording after the next update period.\n5. Use the official route if the process asks for a specific identity step.",
    keyFocus:
      "The safest way to read pending ID verification is as a signal that identity confidence is still being built. That keeps you focused on the process stage instead of assuming the worst immediately.",
    important:
      "GrantCare cannot contact Home Affairs for you. You must wait for the database sync to finish on the official SASSA portal.",
    help:
      "GrantCare can help you compare pending ID verification with identity links, failed identity checks, and changed-detail guides.",
    related:
      "Useful next pages:\n• /guides/what-identity-verification-link-means\n• /guides/why-identity-verification-fails\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/how-to-fix-verification-problems-after-changing-details\n• /status/identity-verification",
    faqs: [
      {
        question: "Does pending ID verification mean decline is certain?",
        answer: "No. It means the identity-related check is still not fully settled yet.",
      },
      {
        question: "Should I make changes while it is pending?",
        answer: "Only if you know a detail is wrong or the official route asks for a change.",
      },
      {
        question: "What can trigger this wording?",
        answer: "It can be triggered by identity mismatches, changed details, or a verification step that still needs to finish.",
      },
    ],
    sortOrder: 138,
  }),
  guide({
    slug: "how-to-check-whether-your-number-update-reflected",
    title: "How to check whether your number update reflected",
    summary:
      "A practical follow-up guide for users who changed a phone number and now need to see whether the official record caught up.",
    quickAnswer:
      "The easiest way to check if your new phone number is active is to log into the SASSA portal. If the OTP goes to your new SIM card, the update was successful.",
    whatThisMeans:
      "SASSA does not usually send an SMS saying 'Number Updated'. You just have to test it yourself. If you can access your profile using the new number, the system has fully synced.",
    whyThisMatters:
      "Users often assume the number changed just because they submitted the update. Reflection is the next question. Without it, the process may still act as if the old number is linked to the case.",
    steps:
      "1. Save proof that the number update was submitted.\n2. Give the system time to reflect the change.\n3. Check whether the new number now works where needed.\n4. Read any new wording tied to access or verification.\n5. Use the official recovery or update route if the old-number problem still appears.",
    keyFocus:
      "Reflection is about behavior, not only submission. The change is really reflected when the case responds as if the new number is now the correct one.",
    important:
      "GrantCare cannot see which number is linked to your ID. You must test the official login portal yourself to see if the OTP arrives.",
    help:
      "GrantCare can help you compare reflected and non-reflected number changes with access problems, OTP issues, and identity-verification messages.",
    related:
      "Useful next pages:\n• /guides/how-to-keep-access-after-changing-your-number\n• /guides/how-to-fix-phone-number-mismatch-problems\n• /guides/how-phone-number-changes-affect-status-checks\n• /guides/what-to-do-if-you-need-to-change-phone-number-without-otp\n• /guides/how-to-fix-verification-problems-after-changing-details",
    faqs: [
      {
        question: "Is submitting the update the same as it being reflected?",
        answer: "No. Reflection means the official record now behaves as if the new number is the correct one.",
      },
      {
        question: "What is the clearest sign that it reflected?",
        answer: "The new number works where it should and the old-number-related problem stops driving the process.",
      },
      {
        question: "Why check again later?",
        answer: "Because updates often need time before the official system fully catches up.",
      },
    ],
    sortOrder: 139,
  }),
  guide({
    slug: "how-to-check-whether-your-bank-update-reflected",
    title: "How to check whether your bank update reflected",
    summary:
      "A simple follow-up guide for users who changed bank details and now need to know whether the official payment route has caught up.",
    quickAnswer:
      "Your bank update is successful when your status changes from 'Pending Bank Verification' back to a normal 'Approved' status with a payment date.",
    whatThisMeans:
      "Do not expect a direct message confirming your new bank account. The system simply removes the warning message and resumes processing your money.",
    whyThisMatters:
      "Users often think the update is reflected because it was submitted. The more practical question is whether the process now looks different enough to show the new payment route is actually being used.",
    steps:
      "1. Save proof that the bank update was submitted.\n2. Check the wording after the next update period.\n3. Compare the current wording with the earlier banking message.\n4. Look for movement away from the banking problem stage.\n5. Use the official route if the old issue still appears to be unchanged.",
    keyFocus:
      "Reflection is a process signal. It usually appears when the old banking issue stops dominating the wording and the case starts to move into a more normal payment-related stage.",
    important:
      "We cannot look at your SASSA file to check if your bank account is loaded. The only way to know is by checking your official status page.",
    help:
      "GrantCare can help you compare reflected bank updates with pending bank verification, delayed-payment guides, and bank-acceptance guidance.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-your-bank-details-were-accepted\n• /guides/what-pending-bank-verification-means\n• /guides/how-banking-details-updates-work\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/why-payment-is-delayed",
    faqs: [
      {
        question: "Does a bank update reflect the same day?",
        answer: "Not always. It can take time before the wording changes enough to show progress.",
      },
      {
        question: "What if the old banking issue still appears?",
        answer: "That can mean the update has not fully reflected yet or another banking issue still remains.",
      },
      {
        question: "What should I compare?",
        answer: "Compare the current wording with the wording you saw before the update reflected.",
      },
    ],
    sortOrder: 140,
  }),
  guide({
    slug: "what-to-do-if-verification-keeps-failing",
    title: "What to do if verification keeps failing",
    summary:
      "A practical escalation guide for repeated identity or banking verification failures that do not seem to move forward.",
    quickAnswer:
      "If your verification keeps failing, stop trying. Every failed attempt locks your account further. Read the exact error message to figure out what is wrong.",
    whatThisMeans:
      "Doing the exact same thing ten times will not magically fix a verification error. If it fails twice, there is a hard mismatch between your application and Home Affairs.",
    whyThisMatters:
      "Users often respond to repeated failures with panic-driven retries. That can make the process feel endless. A better response is to identify whether the repeated failure is tied to identity, number changes, banking details, or route safety.",
    steps:
      "1. Save each failure message and date.\n2. Compare the wording between failures.\n3. Work out whether the same issue appears each time.\n4. Avoid random changes that are not tied to the repeated problem.\n5. Use the official route if a clearer recovery or correction step is shown.",
    keyFocusTitle: "What repeated failure usually tells you",
    keyFocus:
      "Repeated failure usually tells you that the process keeps finding the same unresolved issue. Once you treat the failures as a pattern instead of isolated moments, the next step becomes much clearer.",
    important:
      "GrantCare cannot override a failed verification. If your details are hopelessly stuck, your fastest option is physically visiting a SASSA office with your ID book.",
    help:
      "GrantCare can help you compare repeated failures with number mismatches, bank verification, identity-verification requests, and post-detail-change verification problems.",
    related:
      "Useful next pages:\n• /guides/why-bank-verification-fails\n• /guides/why-identity-verification-fails\n• /guides/how-to-fix-verification-problems-after-changing-details\n• /guides/how-to-fix-phone-number-mismatch-problems\n• /guides/what-bank-verification-is-checking",
    faqs: [
      {
        question: "Should I keep repeating the same step if verification keeps failing?",
        answer: "Usually no. It is better to identify the repeated issue first.",
      },
      {
        question: "Why save the failure messages?",
        answer: "Because comparing them can show whether the exact same problem keeps returning.",
      },
      {
        question: "Does repeated failure always mean fraud?",
        answer: "No. It can also mean the same detail mismatch or trust issue keeps blocking the process.",
      },
    ],
    sortOrder: 141,
  }),
  guide({
    slug: "what-to-do-if-your-verification-message-changes",
    title: "What to do if your verification message changes",
    summary:
      "A guide to reading changed verification wording without assuming that every wording change is either good news or bad news on its own.",
    quickAnswer:
      "If your verification message changes from 'Pending' to 'Failed' or 'Approved', it means SASSA has finished their security check. Read the new status carefully.",
    whatThisMeans:
      "A changed message means progress. Even if it changes to 'Failed', it is better than being stuck on 'Pending' because now you know exactly what to fix.",
    whyThisMatters:
      "Users often see a changed message and assume the process got worse or better immediately. The safer approach is to ask what the new wording is now asking you to understand or do.",
    steps:
      "1. Save the new verification wording and date.\n2. Compare it with the earlier message.\n3. Notice whether the focus moved from one issue to another.\n4. Match the new wording to the correct explanation guide.\n5. Use the official route only if the new wording clearly asks for an official action.",
    keyFocus:
      "A changed message is often a process clue. It can mean the system moved from checking one thing to checking another, or from waiting into a clearer result. That is why comparing old and new wording matters so much.",
    important:
      "We translate confusing SASSA messages so you understand your next steps, but you are still the only one who can log in and fix your profile.",
    help:
      "GrantCare can help you compare changed verification wording with pending ID checks, pending bank verification, failed verification, and post-detail-change pages.",
    related:
      "Useful next pages:\n• /guides/what-pending-id-verification-means\n• /guides/what-pending-bank-verification-means\n• /guides/how-to-fix-verification-problems-after-changing-details\n• /guides/what-to-do-if-verification-keeps-failing\n• /status/identity-verification",
    faqs: [
      {
        question: "Does a changed verification message always mean progress?",
        answer: "Not always. It means the process focus or stage changed, and that still needs interpretation.",
      },
      {
        question: "Why compare the old and new wording?",
        answer: "Because the change between them often reveals what the process is now focusing on.",
      },
      {
        question: "Should I react right away to every message change?",
        answer: "No. First read the new wording carefully and work out what kind of change it actually represents.",
      },
    ],
    sortOrder: 142,
  }),
  guide({
    slug: "how-to-find-official-banking-and-verification-pages-safely",
    title: "How to find official banking and verification pages safely",
    summary:
      "A trust-first guide to finding official pages for banking updates and verification steps without being pulled into fake forms or copied portals.",
    quickAnswer:
      "The only safe place to update your banking or verify your ID is srd.sassa.gov.za. Any other website asking for this information is a scam.",
    whatThisMeans:
      "Fraudsters build fake websites that look exactly like the SASSA portal to steal your ID and reroute your money to their own bank accounts. Always check the web address.",
    whyThisMatters:
      "If a user enters personal or banking information on the wrong page, the harm can be bigger than simple confusion. That is why this topic needs a clear safety habit rather than guesswork.",
    steps:
      "1. Start from a known official route for the banking or verification task.\n2. Check the page before entering any information.\n3. Avoid copied links from uncertain messages or posts.\n4. Use independent guides only for explanation, not for official data entry.\n5. Save the correct route once you have confirmed it carefully.",
    keyFocusTitle: "The safest habit to build",
    keyFocus:
      "The safest habit is to separate action from explanation. Use the official route for updating banking details or completing verification. Use GrantCare to understand what the process means before or after that official step.",
    important:
      "GrantCare is an independent guide. We will NEVER ask for your banking details or ID number. If you are asked for those here, you are on the wrong page.",
    help:
      "GrantCare can help you understand banking and verification wording, compare common problems, and avoid unsafe routes while still pointing you back to the correct official process.",
    related:
      "Useful next pages:\n• /guides/how-to-avoid-fake-status-check-sites\n• /guides/how-to-know-if-a-verification-request-is-official\n• /guides/how-to-use-an-identity-verification-link-safely\n• /guides/how-banking-details-updates-work\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are banking and verification pages so risky?",
        answer: "Because they often involve sensitive personal or payment information, which makes fake pages more dangerous.",
      },
      {
        question: "Can an independent page still help with these topics?",
        answer: "Yes, as long as it clearly stays in the explanation role and does not pretend to be the official action route.",
      },
      {
        question: "What should I do after I find the right official page?",
        answer: "Use it for the official step, then return to GrantCare if you need help understanding the wording or next stage.",
      },
    ],
    sortOrder: 143,
  }),
];
