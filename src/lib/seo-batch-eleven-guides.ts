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

export const SEO_BATCH_ELEVEN_GUIDES = [
  guide({
    slug: "what-payment-status-check-means",
    title: "What payment status check means",
    summary:
      "A clear explanation of what a payment status check actually tells you, and why it is completely different from your application status.",
    quickAnswer:
      "Your payment status tells you exactly where your money is in the banking system right now. It is a separate update from your application approval.",
    whatThisMeans:
      "Many people see 'Approved' and immediately run to the ATM. But approval just means you legally qualify. Your payment status is what tells you if the money has actually been scheduled, released, or delayed by a banking error.",
    whyThisMatters:
      "If you confuse these two statuses, you will waste money traveling to an ATM when the funds have not yet been released. Checking your payment status separately saves you time and stress.",
    steps:
      "1. Log into the official SASSA portal and look past the 'Approved' message.\n2. Find the specific 'Payment Status' line.\n3. Check if it says 'Scheduled', 'Released', or 'Pending'.\n4. Compare this status to the official payment dates for the month.\n5. If the status points to a banking error, do not wait—fix it immediately via the official route.",
    keyFocusTitle: "What this check is really for",
    keyFocus:
      "Think of your payment status as a delivery tracking number. It tells you if the package is in the warehouse (Pending), on the truck (Scheduled), or at your door (Released).",
    important:
      "GrantCare explains what these confusing terms mean in plain English. However, we cannot speed up the banking system or release your payment faster.",
    help:
      "We break down every single payment status message so you know exactly whether you should go to the ATM or wait another day.",
    related:
      "Useful next pages:\n• /guides/how-to-read-payment-status-after-approval\n• /guides/what-payment-released-means\n• /guides/what-payment-scheduled-means\n• /guides/how-to-understand-payment-dates\n• /payment-dates",
    faqs: [
      {
        question: "Is payment status the same as application status?",
        answer: "No. Application status tells you if you qualify. Payment status tells you where the money is.",
      },
      {
        question: "Does a payment status check mean money is already available?",
        answer: "Not always. It might say 'Pending' or 'Scheduled', which means you still need to wait.",
      },
      {
        question: "What should I read first?",
        answer: "Read the exact payment wording first, then compare it with the payment date page.",
      },
    ],
    sortOrder: 204,
  }),
  guide({
    slug: "how-to-read-payment-status-after-approval",
    title: "How to read payment status after approval",
    summary:
      "A calming guide explaining why 'Approved' does not always mean your money is ready to withdraw right this second.",
    quickAnswer:
      "An 'Approved' status means you passed all the checks and SASSA owes you money. But you must still wait for the system to process the actual bank transfer.",
    whatThisMeans:
      "Approval is a legal decision. Payment release is a banking process. Even after SASSA approves you, their finance department still has to queue your payment, send it to the bank, and wait for the bank to clear it.",
    whyThisMatters:
      "This is the most stressful part of the process. You know you are getting paid, but the money isn't there. If you understand that banking clearance takes a few days, you can avoid panic.",
    steps:
      "1. Celebrate the 'Approved' status—the hard part is over.\n2. Now, look for the 'Payment Status' update.\n3. Check the official SASSA payment calendar for your specific grant.\n4. Wait for the status to change from 'Pending' to 'Released'.\n5. Give your bank 24 to 48 hours to clear the funds once released.",
    keyFocusTitle: "Why approval is followed by a waiting period",
    keyFocus:
      "SASSA processes millions of payments at once. They do not send money the exact second an application is approved. The money moves in massive batches, which takes time.",
    important:
      "GrantCare cannot force SASSA to process your payment faster after approval. We can only help you understand where you are in the queue.",
    help:
      "We explain the timeline between an approval decision and the actual cash hitting your account, so you know what is normal and what is a real delay.",
    related:
      "Useful next pages:\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /payment-dates",
    faqs: [
      {
        question: "Why can approved still show a payment delay?",
        answer: "Because approval is a legal decision, but payment is a banking process that takes time.",
      },
      {
        question: "Should I panic if payment is not instant after approval?",
        answer: "No. Your money is safe, it is just sitting in the payment queue.",
      },
      {
        question: "What should I compare with approved wording?",
        answer: "Compare it with the payment status and the latest payment date page.",
      },
    ],
    sortOrder: 205,
  }),
  guide({
    slug: "what-payment-released-means",
    title: "What payment released means",
    summary:
      "Exactly what 'Payment Released' means for your bank account, and why you might still need to wait a few more hours.",
    quickAnswer:
      "'Payment Released' means SASSA has officially sent the money from their bank to yours. It is the best sign you can get, but standard banking delays may still apply.",
    whatThisMeans:
      "The government has done its job. The money has left the SASSA treasury. Now, it is up to your specific bank (Capitec, Standard Bank, FNB, etc.) to process the incoming transfer and reflect it in your balance.",
    whyThisMatters:
      "Many users see 'Released' and expect the money to be there that exact minute. When it isn't, they panic. Understanding that banks need time to clear transfers prevents this unnecessary stress.",
    steps:
      "1. Take a breath—'Released' means your money is safe and on the way.\n2. Check the date next to the 'Released' message.\n3. Allow up to 48 hours for the funds to reflect in your account.\n4. Factor in weekends or public holidays, which pause bank processing.\n5. Only contact your bank if the money has not appeared after three business days.",
    keyFocusTitle: "Released means sent, not instantly available",
    keyFocus:
      "'Released' is like someone handing a letter to the post office. The letter has been sent, but the postman still needs to drive it to your house. The money is coming.",
    important:
      "GrantCare is an educational guide. We do not have access to your bank account and cannot tell you exactly what time the money will reflect.",
    help:
      "We teach you how different banks handle clearing times so you know exactly when to expect your cash after seeing 'Released'.",
    related:
      "Useful next pages:\n• /guides/how-to-know-when-funds-should-show\n• /guides/what-payment-scheduled-means\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/why-payment-is-delayed\n• /payment-dates",
    faqs: [
      {
        question: "Does released mean the money is already visible?",
        answer: "Not always. It means the money has been sent, but bank clearing takes time.",
      },
      {
        question: "Is released a good sign?",
        answer: "Yes, it is the best sign. It means your payment is successfully moving.",
      },
      {
        question: "What should I do if released does not reflect?",
        answer: "Wait 48 business hours. If it is a weekend, wait until Monday afternoon.",
      },
    ],
    sortOrder: 206,
  }),
  guide({
    slug: "what-payment-not-yet-available-means",
    title: "What payment not yet available means",
    summary:
      "Don't panic if you see 'Payment not yet available'. We explain why this is a normal waiting message and not a rejection.",
    quickAnswer:
      "'Payment not yet available' simply means your money is not ready to be collected today. It does not mean your grant was declined or cancelled.",
    whatThisMeans:
      "SASSA pays different grants on different days. If you check your status before your specific payday, the system will tell you the funds are not available yet. It is just a timing message.",
    whyThisMatters:
      "People see this message and assume they have been blocked. This causes them to rush to SASSA offices unnecessarily, wasting taxi fare and standing in long queues for no reason.",
    steps:
      "1. Do not panic—this is a normal scheduling message.\n2. Check the exact date you saw the message.\n3. Look up the official SASSA payment calendar for the current month.\n4. Wait until your specific grant category's payment day arrives.\n5. Check your status again on the correct day.",
    keyFocusTitle: "This message means 'Wait', not 'No'",
    keyFocus:
      "'Not yet available' is the system's way of telling you that you are early. The money is safe, it is just locked until the correct release date.",
    important:
      "GrantCare can explain this wording to calm your nerves, but we cannot unlock your funds. Only the official SASSA timeline dictates when the money is released.",
    help:
      "We provide clear, easy-to-read payment calendars so you know exactly when 'not yet available' will turn into 'released'.",
    related:
      "Useful next pages:\n• /guides/what-payment-pending-means\n• /guides/what-payment-scheduled-means\n• /guides/how-to-know-when-funds-should-show\n• /guides/why-payment-is-delayed\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay",
    faqs: [
      {
        question: "Does not yet available mean the payment failed?",
        answer: "No. It means you are checking before the release date.",
      },
      {
        question: "Should I wait or act straight away?",
        answer: "Wait for your official payment date to arrive before you worry.",
      },
      {
        question: "What should I compare this wording with?",
        answer: "Check the SASSA payment schedule for the current month.",
      },
    ],
    sortOrder: 207,
  }),
  guide({
    slug: "how-to-know-when-funds-should-show",
    title: "How to know when funds should show",
    summary:
      "How to realistically judge when your funds will show up in your account, without relying on Facebook rumours.",
    quickAnswer:
      "Funds usually show up 24 to 48 hours after SASSA officially releases them. The exact time depends entirely on which bank you use and whether it is a weekend.",
    whatThisMeans:
      "There is no single 'magic minute' when everyone in South Africa gets paid at once. Capitec might clear payments at 2 AM, while Standard Bank might clear them at 8 AM. It varies wildly.",
    whyThisMatters:
      "If you expect your money at midnight because a WhatsApp group said so, you will spend the whole night stressing. Setting realistic expectations based on banking rules is much healthier.",
    steps:
      "1. Confirm that your status actually says 'Released'.\n2. Note the time and date of the release.\n3. Check if today is a Friday or a public holiday (this delays processing).\n4. Understand your specific bank's normal clearance times.\n5. Wait 48 business hours before assuming the payment is missing.",
    keyFocusTitle: "Ask the right question about timing",
    keyFocus:
      "Stop asking 'What time exactly will the money show?' Start asking 'Has enough normal banking time passed since the release?' This approach removes the panic.",
    important:
      "GrantCare cannot see into the banking system. We provide guidance based on standard banking times, but your bank controls the final reflection.",
    help:
      "We explain how weekends, public holidays, and different bank systems affect your payment time so you can plan your shopping trips safely.",
    related:
      "Useful next pages:\n• /guides/what-payment-released-means\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/how-to-check-payment-method-before-pay-date\n• /payment-dates",
    faqs: [
      {
        question: "Can funds show on the same day as released wording?",
        answer: "Yes, but often it takes an extra 24 hours depending on the bank.",
      },
      {
        question: "What affects when funds show?",
        answer: "Your specific bank, the time of day it was released, and weekends.",
      },
      {
        question: "What if the money still does not show?",
        answer: "If 48 business hours have passed since release, contact your bank first.",
      },
    ],
    sortOrder: 208,
  }),
  guide({
    slug: "what-payment-scheduled-means",
    title: "What payment scheduled means",
    summary:
      "What 'Scheduled' means for your SASSA payment, and why it is a positive sign that your money is moving in the right direction.",
    quickAnswer:
      "'Payment Scheduled' means your grant has been assigned a specific release date. It is a very good sign, but the money has not been transferred to your bank yet.",
    whatThisMeans:
      "Think of 'Scheduled' like booking a flight. You have your ticket and your seat, but the plane has not taken off yet. SASSA has queued your payment, and it is waiting for its exact dispatch date.",
    whyThisMatters:
      "People often confuse 'Scheduled' with 'Released' and rush to the bank too early. If you wait until the status changes from Scheduled to Released, you will not waste your time.",
    steps:
      "1. See the 'Scheduled' status and note the date provided.\n2. Do not go to the ATM or bank yet.\n3. Wait for the scheduled date to arrive.\n4. Check the portal again to see if the status changes to 'Released'.\n5. Once released, allow normal banking clearance time.",
    keyFocusTitle: "Scheduled is not the final step",
    keyFocus:
      "Scheduled means the system has a plan for your money. It is much better than 'Pending', but it still requires patience.",
    important:
      "GrantCare helps you understand what these banking terms mean, but we cannot move a scheduled payment to an earlier date.",
    help:
      "We help you distinguish between the different waiting stages so you only travel to the bank when your money is actually there.",
    related:
      "Useful next pages:\n• /guides/what-payment-released-means\n• /guides/what-payment-not-yet-available-means\n• /guides/how-to-read-payment-status-after-approval\n• /guides/how-to-understand-payment-dates\n• /payment-dates",
    faqs: [
      {
        question: "Does scheduled mean I can collect right now?",
        answer: "No. It means your payment date has been set, but the money has not been sent yet.",
      },
      {
        question: "Is scheduled better than pending?",
        answer: "Yes. It means you are out of the waiting queue and have a confirmed payment plan.",
      },
      {
        question: "What should I compare scheduled with?",
        answer: "Compare it with the payment date page to know when it will change to 'Released'.",
      },
    ],
    sortOrder: 209,
  }),
  guide({
    slug: "how-to-check-if-payment-was-sent-back",
    title: "How to check if payment was sent back",
    summary:
      "How to spot the warning signs that your payment was returned or failed to clear, and what you need to do next.",
    quickAnswer:
      "If your payment was sent back, your status will usually mention a 'Return', 'Reversal', or 'Failed Bank Details'. This means SASSA tried to pay you, but your bank rejected it.",
    whatThisMeans:
      "A returned payment is not a SASSA delay—it is a banking failure. It usually happens if your bank account is closed, frozen, or if the name on the account does not match your SASSA ID exactly.",
    whyThisMatters:
      "If you think a returned payment is just 'late', you will wait forever. A returned payment will never fix itself. You have to actively update your banking details to get your money.",
    steps:
      "1. Read your payment status carefully for words like 'Returned' or 'Failed'.\n2. Call your bank immediately to check if your account is active.\n3. Ensure your bank account name perfectly matches your ID document.\n4. If the account is closed, open a new one in your own name.\n5. Log into the official SASSA portal and securely update your banking details.",
    keyFocusTitle: "Return is not the same as delay",
    keyFocus:
      "A delayed payment requires patience. A returned payment requires action. If the money bounced back, SASSA will not try again until you provide new, working bank details.",
    important:
      "GrantCare cannot see why your specific bank rejected the payment. You must contact your bank directly to understand the block.",
    help:
      "We guide you on how to safely update your SASSA banking details after a payment bounces, so you can recover your funds.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/how-to-fix-missing-payment-issues\n• /status/banking-issue",
    faqs: [
      {
        question: "Does sent back mean the same as delayed?",
        answer: "No. Sent back means the payment failed at the bank and requires you to fix your details.",
      },
      {
        question: "What kind of wording should I watch for?",
        answer: "Watch for words like 'Returned', 'Failed', 'Reversed', or 'Banking Details Issue'.",
      },
      {
        question: "Why save the wording?",
        answer: "So you know exactly what to tell the SASSA office or your bank when you ask for help.",
      },
    ],
    sortOrder: 210,
  }),
  guide({
    slug: "what-to-do-if-payment-was-returned",
    title: "What to do if payment was returned",
    summary:
      "A step-by-step recovery guide for when SASSA tries to pay you, but the money bounces back from your bank account.",
    quickAnswer:
      "If your payment was returned, you must immediately check with your bank to find out why the account is blocked, and then update your details on the official SASSA portal.",
    whatThisMeans:
      "SASSA did not decline your grant. They sent the money, but your bank's system said 'No'. This happens most often with dormant accounts or accounts that have reached their deposit limit.",
    whyThisMatters:
      "When money is returned, SASSA holds it safely for you. However, you will not get paid until the banking issue is completely resolved and verified, which can take weeks.",
    steps:
      "1. Do not panic—your money is not lost, it has just been paused.\n2. Visit your bank branch and ask them why a SASSA transfer would bounce.\n3. Fix the account issue or open a new standard savings account.\n4. Log into the official SASSA website and upload the new banking details.\n5. Wait for SASSA to verify the new account before they attempt payment again.",
    keyFocusTitle: "Focus on the bank, not the application",
    keyFocus:
      "Your application is fine. The problem is the destination. Until you provide a clear, working path for the money to travel, it will remain safely with SASSA.",
    important:
      "Never give your new banking details to an 'agent' or someone offering to fix this on WhatsApp. Only upload them to the official SASSA website.",
    help:
      "We walk you through the correct, official channels to update your banking details so your money stops bouncing and starts clearing.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/why-payment-is-delayed\n• /status/banking-issue",
    faqs: [
      {
        question: "Should I just wait if payment was returned?",
        answer: "No. A returned payment means the banking details failed. You must take action to fix them.",
      },
      {
        question: "Does returned mean the application is declined now?",
        answer: "No. Your grant is still approved, but the money has nowhere safe to land.",
      },
      {
        question: "What should I check first?",
        answer: "Check with your bank to ensure your account is active and in your exact name.",
      },
    ],
    sortOrder: 211,
  }),
  guide({
    slug: "how-payment-batches-can-cause-delays",
    title: "How payment batches can cause delays",
    summary:
      "Why your friend got paid before you, and how SASSA's massive batch processing system actually works.",
    quickAnswer:
      "SASSA pays millions of people by sending money in massive batches. Even if you and your neighbor have the same grant, your payments might be processed hours or days apart.",
    whatThisMeans:
      "The banking system cannot process ten million payments in one second without crashing. So, SASSA breaks them into groups (batches). Being in a later batch does not mean your payment failed.",
    whyThisMatters:
      "Comparing your payment time to someone else's is the fastest way to cause yourself unnecessary panic. Just because your brother got his SMS at 8 AM does not mean your 2 PM payment is broken.",
    steps:
      "1. Stop comparing your payment exact time to other people.\n2. Check the official SASSA payment date for your grant type.\n3. Understand that processing runs from the morning until the evening.\n4. Give the system the full day to process your specific batch.\n5. Only start worrying if your payment does not reflect 48 hours after the release date.",
    keyFocusTitle: "Why comparison causes panic",
    keyFocus:
      "Your payment is linked to your specific ID and bank combination. It is in its own batch. Do not assume a problem exists just because you are in a later group.",
    important:
      "GrantCare cannot tell you exactly which batch your payment is in. We provide this information to help you manage your expectations calmly.",
    help:
      "We explain how these massive banking systems work behind the scenes, so you understand that a slight delay is completely normal.",
    related:
      "Useful next pages:\n• /guides/why-payment-is-delayed\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /payment-dates",
    faqs: [
      {
        question: "Can batch timing make one person get paid earlier than another?",
        answer: "Yes, this is completely normal and happens every single month.",
      },
      {
        question: "Does a slower payment always mean a problem?",
        answer: "No. It just means you were placed in a later processing batch for the day.",
      },
      {
        question: "When should I worry more?",
        answer: "Only if 48 business hours have passed since the payment date and you still have nothing.",
      },
    ],
    sortOrder: 212,
  }),
  guide({
    slug: "what-weekends-and-holidays-can-do-to-payments",
    title: "What weekends and holidays can do to payments",
    summary:
      "How weekends and public holidays freeze your payment in the banking system, and why you should not panic.",
    quickAnswer:
      "Banks do not process electronic fund transfers on Sundays or public holidays. If SASSA releases your payment on a Friday afternoon, you will likely only see the money on Monday or Tuesday.",
    whatThisMeans:
      "The banking system has working hours. A payment sent outside of those hours gets queued. It is not lost; it is just resting until the bank's clearing system switches back on.",
    whyThisMatters:
      "Millions of people panic when a Friday payday results in an empty weekend bank account. Knowing that banks pause processing over the weekend saves you from massive stress.",
    steps:
      "1. Look at a calendar to see if your payday falls on a Friday or weekend.\n2. If it does, expect the money to reflect early the following week.\n3. Do not waste airtime checking your balance repeatedly on a Sunday.\n4. Wait until Monday afternoon before getting concerned.\n5. Factor in public holidays, which also act exactly like a Sunday for bank processing.",
    keyFocusTitle: "The banking clock pauses on weekends",
    keyFocus:
      "SASSA may be open 24/7 online, but standard bank clearing systems are not. If your payment hits the bank on a weekend, it waits in line until Monday.",
    important:
      "GrantCare cannot force your bank to process money on a weekend. This is a standard South African banking rule that applies to everyone.",
    help:
      "We help you predict how the calendar will affect your real-world payday, allowing you to plan your budget without weekend anxiety.",
    related:
      "Useful next pages:\n• /guides/how-to-know-when-funds-should-show\n• /guides/what-payment-released-means\n• /guides/what-to-do-if-payment-arrives-later-than-expected\n• /guides/why-payment-is-delayed\n• /payment-dates",
    faqs: [
      {
        question: "Can a weekend delay a payment that already looks released?",
        answer: "Yes. The payment is released, but the bank's system is paused for the weekend.",
      },
      {
        question: "Does a holiday delay mean the payment failed?",
        answer: "No. It just means the bank staff and systems are off duty.",
      },
      {
        question: "What should I compare with the calendar?",
        answer: "Always check if your SASSA payday touches a Friday, Saturday, Sunday, or public holiday.",
      },
    ],
    sortOrder: 213,
  }),
  guide({
    slug: "how-to-read-payment-notes-on-date-pages",
    title: "How to read payment notes on date pages",
    summary:
      "Why the small notes next to SASSA payment dates are often more important than the date itself, and how to read them.",
    quickAnswer:
      "Payment dates often come with notes like 'Estimated', 'Pending Verification', or 'Excludes SRD'. If you ignore the note, you might trust a date that does not apply to you.",
    whatThisMeans:
      "A date alone is just a number. The note tells you if that date is a 100% confirmed promise, or just an educated guess by the system based on normal timelines.",
    whyThisMatters:
      "The biggest cause of SASSA frustration is expecting money on a date that was clearly marked 'Estimated'. Reading the fine print saves you from travelling to the bank for an unconfirmed payment.",
    steps:
      "1. Look at the payment date on the SASSA portal or official schedule.\n2. Read the text directly beneath or beside the date.\n3. Check if it says 'Published' (Confirmed) or 'Expected' (Guess).\n4. Ensure the date explicitly applies to your specific grant type.\n5. Only trust dates that are confirmed without warnings or conditions.",
    keyFocusTitle: "The note changes the meaning of the date",
    keyFocus:
      "Do not just screenshot the date and share it. The note attached to it is what tells you how safe it is to spend money you haven't received yet.",
    important:
      "GrantCare highlights these notes so you don't get caught out, but we do not create the dates. Only SASSA can finalize a payment schedule.",
    help:
      "We teach you how to read the official schedules properly so you never mistake an 'Expected' date for a guaranteed payday.",
    related:
      "Useful next pages:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates\n• /guides/where-to-confirm-payment-problems-officially",
    faqs: [
      {
        question: "Why is the note on the payment page so important?",
        answer: "Because it tells you if the date is a guaranteed promise or just an estimate.",
      },
      {
        question: "Should I trust a copied date without the note?",
        answer: "Never. Scammers often crop out the warning notes when sharing fake dates on WhatsApp.",
      },
      {
        question: "What should I look for in the note?",
        answer: "Look for words like 'Estimated', 'Confirmed', 'Expected', or specific grant names.",
      },
    ],
    sortOrder: 214,
  }),
  guide({
    slug: "what-to-do-if-payment-ready-but-not-reflecting",
    title: "What to do if payment ready but not reflecting",
    summary:
      "What to do when SASSA says your payment is ready, but your bank account is still completely empty.",
    quickAnswer:
      "If your payment is 'Ready' but not reflecting, wait 48 hours for bank clearing. If it still doesn't show, check if your bank account is blocked or inactive.",
    whatThisMeans:
      "SASSA has lined the money up at the door, but it hasn't stepped into your bank account yet. The delay is almost always on the banking side, not the SASSA side.",
    whyThisMatters:
      "When people see 'Ready' but no cash, they immediately assume they've been scammed or hacked. Usually, the bank is simply processing the transfer, or your account needs a quick FICA update.",
    steps:
      "1. Take a screenshot of the 'Payment Ready' message.\n2. Wait a full 48 business hours (ignoring weekends).\n3. Check your bank app to see if your account is active and accepting deposits.\n4. Call your bank and ask if there are any pending incoming transfers.\n5. Only go to SASSA if your bank confirms they have rejected the payment.",
    keyFocusTitle: "Ready means prepared, not delivered",
    keyFocus:
      "Think of 'Ready' like a pizza sitting on the counter. It is cooked and boxed, but the delivery driver (the bank) still needs time to bring it to your house.",
    important:
      "GrantCare cannot see your bank balance or force your bank to clear funds faster. We can only tell you the standard waiting times.",
    help:
      "We help you stop panicking by explaining the exact steps to take when your SASSA money is stuck in transit between the government and your bank.",
    related:
      "Useful next pages:\n• /guides/what-payment-released-means\n• /guides/how-to-know-when-funds-should-show\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/how-to-fix-missing-payment-issues",
    faqs: [
      {
        question: "Does payment ready mean the money must already show?",
        answer: "No. 'Ready' means SASSA has prepared it, but bank clearing still takes time.",
      },
      {
        question: "What should I check besides the wording?",
        answer: "Check your bank account to ensure it is active and not frozen due to FICA rules.",
      },
      {
        question: "When does it stop looking normal?",
        answer: "If the money does not reflect after 3 full business days, you need to contact your bank.",
      },
    ],
    sortOrder: 215,
  }),
  guide({
    slug: "how-to-check-payment-method-before-pay-date",
    title: "How to check payment method before pay date",
    summary:
      "How checking your banking details *before* payday can save you from a month-long payment failure.",
    quickAnswer:
      "Always log into the SASSA portal a week before payday to ensure your banking details are still active and verified. Catching an error early prevents your payment from bouncing.",
    whatThisMeans:
      "Many people only check their banking details *after* their money doesn't arrive. By then, the payment has bounced, and fixing it takes weeks. A quick pre-check avoids this nightmare entirely.",
    whyThisMatters:
      "A bounced payment means you will not get your money this month. If your bank account was closed due to inactivity, or if you changed your surname, SASSA will reject the transfer.",
    steps:
      "1. Log into the official SASSA portal at least 7 days before your payday.\n2. Navigate to the 'Banking Details' section.\n3. Verify that your current account number is correct and marked as 'Active'.\n4. If the details are wrong, update them immediately.\n5. Do not make changes if the details are correct—unnecessary updates cause delays.",
    keyFocusTitle: "Prevention is better than waiting",
    keyFocus:
      "A 2-minute check today can save you 30 days of waiting. Make sure the 'pipe' is clear before SASSA tries to send the water.",
    important:
      "GrantCare reminds you to check your details, but you must make the actual updates on the secure, official SASSA government portal.",
    help:
      "We explain exactly what to look for when verifying your bank details so you don't accidentally trigger a fraud alert by changing things too often.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/banking-details-pending-meaning\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/how-banking-details-updates-work\n• /status/banking-issue",
    faqs: [
      {
        question: "Why check payment method before the pay date?",
        answer: "Because if you catch an error early, you can fix it before the payment bounces.",
      },
      {
        question: "Should I keep editing bank details just before payment?",
        answer: "Never. Only edit them if they are definitely wrong. Editing them restarts the verification process.",
      },
      {
        question: "What is the main sign to watch for?",
        answer: "Make sure your bank hasn't closed your account because you haven't used it recently.",
      },
    ],
    sortOrder: 216,
  }),
  guide({
    slug: "how-to-track-payment-dates-without-rumours",
    title: "How to track payment dates without rumours",
    summary:
      "How to stop falling for fake SASSA payment dates on WhatsApp and Facebook, and where to find the real ones.",
    quickAnswer:
      "Never trust a payment date from a random social media post. Always verify dates using the official SASSA portal, their verified social media accounts, or trusted government press releases.",
    whatThisMeans:
      "Scammers and engagement-farmers constantly post fake 'Urgent SASSA Payment Dates' to get clicks. Relying on these rumors will leave you standing at an empty ATM.",
    whyThisMatters:
      "Fake dates cause real financial harm. You might borrow money expecting to be paid on Tuesday, only to find out the real date is Friday. Always verify the source.",
    steps:
      "1. Ignore screenshots of dates sent in WhatsApp groups without a link.\n2. Go directly to the official SASSA website (sassa.gov.za).\n3. Check their verified Twitter (X) or Facebook pages for official infographics.\n4. Compare the dates to your specific grant type (e.g., Older Persons vs SRD).\n5. Plan your budget around the verified date, not the rumor.",
    keyFocusTitle: "If there is no official link, it is a rumor",
    keyFocus:
      "A true payment schedule is always published by SASSA directly. If someone shares a date but cannot provide the official SASSA link, do not trust it.",
    important:
      "GrantCare publishes dates based *only* on official SASSA releases. We do not invent dates or spread unverified community rumors.",
    help:
      "We teach you how to spot a fake SASSA schedule so you can protect yourself and your community from unnecessary stress.",
    related:
      "Useful next pages:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why are payment date rumours risky?",
        answer: "Because they cause you to travel to the bank on the wrong day, wasting your transport money.",
      },
      {
        question: "What is safer than a screenshot?",
        answer: "A direct link to the official SASSA government website or their verified social media page.",
      },
      {
        question: "Should I still confirm uncertain dates officially?",
        answer: "Yes. If a date says 'Expected', you should keep checking the official portal until it is confirmed.",
      },
    ],
    sortOrder: 217,
  }),
  guide({
    slug: "what-to-do-if-payment-date-passed-with-no-update",
    title: "What to do if payment date passed with no update",
    summary:
      "A calm guide on what to do if your official payment date has come and gone, but your money is still missing.",
    quickAnswer:
      "If your payment date passed without money, do not panic. First, check if the date was 'Expected' or 'Confirmed'. Then, check for banking errors or weekend delays.",
    whatThisMeans:
      "A passed date feels terrible, but it is rarely a total cancellation. Usually, it means your payment was pushed to a later processing batch, or your bank rejected the deposit.",
    whyThisMatters:
      "Rushing to the SASSA office the morning after a missed date is usually a waste of time. Most late payments resolve themselves within 48 hours or require a simple bank update.",
    steps:
      "1. Confirm the date that passed was definitely your grant's official payday.\n2. Log into the portal and read your current 'Payment Status' word-for-word.\n3. Check if the status says 'Returned' or 'Failed' (which requires action).\n4. If it still says 'Approved' or 'Scheduled', wait 48 business hours.\n5. If the money is still missing after 3 days, escalate via the official SASSA toll-free number.",
    keyFocusTitle: "A late payment is not a cancelled payment",
    keyFocus:
      "The date is a target, not a guarantee. If the date passes, the system is still trying to pay you. You just need to figure out what is slowing it down.",
    important:
      "GrantCare helps you diagnose why the payment is late, but we cannot access the SASSA system to force the payment through.",
    help:
      "We walk you through the troubleshooting steps so you know exactly whether you should wait, call your bank, or contact SASSA.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /guides/why-payment-is-delayed\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-read-payment-notes-on-date-pages\n• /payment-dates",
    faqs: [
      {
        question: "Does a passed date always mean the payment failed?",
        answer: "No. It usually just means the bank is taking longer to process the transfer.",
      },
      {
        question: "What should I check first?",
        answer: "Check if the passed date was a Friday, which means you must wait until Monday.",
      },
      {
        question: "When should I escalate officially?",
        answer: "If 3 business days have passed and your portal status has not changed to 'Returned' or 'Failed'.",
      },
    ],
    sortOrder: 218,
  }),
  guide({
    slug: "how-to-know-if-a-payment-date-is-still-current",
    title: "How to know if a payment date is still current",
    summary:
      "How to tell if a payment date screenshot on Facebook is a fresh update or a recycled rumor from last year.",
    quickAnswer:
      "A payment date is only current if you can log into the SASSA portal today and see it for yourself, or if it was posted on SASSA's verified social media this week.",
    whatThisMeans:
      "People often share old payment schedules from previous months or years, claiming they are new. This causes mass confusion and makes people expect money on the wrong dates.",
    whyThisMatters:
      "If you rely on a screenshot from a Facebook group, you might stand in a bank queue for 4 hours for a payment that isn't due until next week. Always verify freshness.",
    steps:
      "1. Never trust a screenshot of a date that has no link attached to it.\n2. Go to the official SASSA website (sassa.gov.za).\n3. Check the month written on the schedule—is it exactly the current month and year?\n4. Log into your own SASSA portal to see your personal status date.\n5. If the dates don't match, trust your personal portal date, not the screenshot.",
    keyFocusTitle: "Screenshots can lie; the portal does not",
    keyFocus:
      "It takes two seconds to change a date on a picture before sharing it on WhatsApp. It is impossible to fake the date shown when you log into your own SASSA profile.",
    important:
      "GrantCare updates its payment calendars directly from SASSA's press office. We never recycle old dates.",
    help:
      "We teach you how to fact-check dates instantly so you are never fooled by recycled social media posts.",
    related:
      "Useful next pages:\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/what-to-do-if-payment-date-passed-with-no-update\n• /payment-dates\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Can an old screenshot make a payment date look current?",
        answer: "Yes. Scammers constantly recycle old dates to get shares and likes on Facebook.",
      },
      {
        question: "What makes a payment date look current?",
        answer: "It must be clearly published on the official SASSA portal for the exact current month.",
      },
      {
        question: "Should I trust a date without its note?",
        answer: "No. Never trust a date that has been cropped out of its original official context.",
      },
    ],
    sortOrder: 219,
  }),
  guide({
    slug: "how-to-check-payment-readiness-for-r350-support",
    title: "How to check payment readiness for R350 support",
    summary:
      "How to check if your R350 SRD grant is actually ready for payment, without confusing 'Approved' with 'Paid'.",
    quickAnswer:
      "For the SRD grant, 'Approved' just means you passed the means test. Your payment is only ready when the status updates to 'Payment Released' with a specific date.",
    whatThisMeans:
      "The SRD grant requires a fresh means test every single month. Just because you were approved for May does not mean your money is immediately ready to collect.",
    whyThisMatters:
      "Millions of R350 beneficiaries see 'Approved' and rush to the supermarket to withdraw, only to find an empty account. You must wait for the exact 'Payday' date to show on your profile.",
    steps:
      "1. Log into the SRD website (srd.sassa.gov.za) and check the current month.\n2. If it says 'Approved', look at the 'Payday' field below it.\n3. If the 'Payday' field is blank, your money is not ready yet.\n4. Wait for a specific date to appear in the 'Payday' field.\n5. Wait for an SMS, or allow 48 hours after the 'Payday' before attempting to withdraw.",
    keyFocusTitle: "Approval and Payday are two different things",
    keyFocus:
      "The SRD system works in two steps. Step 1: They check if you are poor enough this month (Approval). Step 2: They schedule your cash transfer (Payday). You need both.",
    important:
      "GrantCare cannot speed up the SRD means test or force SASSA to allocate a payday faster.",
    help:
      "We break down the exact meaning of every SRD status message so you only go to the shop when your cash is definitely there.",
    related:
      "Useful next pages:\n• /guides/how-to-read-r350-payment-status-safely\n• /guides/what-payment-pending-means\n• /guides/what-payment-released-means\n• /guides/payment-processing-meaning\n• /payment-dates",
    faqs: [
      {
        question: "Is readiness the same as approval for R350 support?",
        answer: "No. Approval means you passed the test. Readiness means the money has been scheduled.",
      },
      {
        question: "What should I check besides approval?",
        answer: "Always check the 'Payday' date on your SRD portal.",
      },
      {
        question: "Can GrantCare confirm official R350 payment release?",
        answer: "No. We can tell you how to read the status, but only the official SRD site provides your exact payday.",
      },
    ],
    sortOrder: 220,
  }),
  guide({
    slug: "what-payment-pending-means",
    title: "What payment pending means",
    summary:
      "A plain-language explanation of why your payment says 'Pending' and how long you might have to wait.",
    quickAnswer:
      "'Payment Pending' means SASSA is still processing your file for this month. You have not been declined, but your money has not been scheduled for release yet.",
    whatThisMeans:
      "Pending is the waiting room. It usually means SASSA is busy running routine checks on your ID or bank account before they press the button to send your cash.",
    whyThisMatters:
      "Pending can feel very stressful because it is not a 'Yes' or a 'No'. But understanding that it is just a normal administrative pause prevents you from making unnecessary changes to your profile.",
    steps:
      "1. Note that 'Pending' is not a rejection—your grant is still active.\n2. Do not change your banking details while your status is Pending (this causes further delays).\n3. Wait 3 to 5 business days and check the portal again.\n4. Look for the status to change to 'Approved' or 'Scheduled'.\n5. If it stays Pending for more than 14 days, call the SASSA toll-free line.",
    keyFocusTitle: "Pending is the system thinking",
    keyFocus:
      "When a status is pending, the system is just doing its background checks. Changing your phone number or bank details right now will force the system to start thinking all over again.",
    important:
      "GrantCare cannot 'un-pend' your status. We can only advise you on the safest way to wait without causing further delays.",
    help:
      "We help you understand how long the 'Pending' phase usually lasts so you know when it is time to escalate.",
    related:
      "Useful next pages:\n• /guides/what-payment-scheduled-means\n• /guides/what-payment-not-yet-available-means\n• /guides/why-payment-is-delayed\n• /status/pending\n• /payment-dates",
    faqs: [
      {
        question: "Does payment pending mean the payment failed?",
        answer: "No. It means the system is still checking your details for this month's payout.",
      },
      {
        question: "Should I keep changing my details while pending shows?",
        answer: "Never. Changing your details while pending forces the system to restart the entire check.",
      },
      {
        question: "What should pending turn into next?",
        answer: "It should eventually change to 'Approved' and then 'Scheduled' or 'Released'.",
      },
    ],
    sortOrder: 221,
  }),
  guide({
    slug: "what-payment-hold-may-mean",
    title: "What payment hold may mean",
    summary:
      "What it means when SASSA places a 'Hold' on your payment, and the steps you must take to unlock it.",
    quickAnswer:
      "'Payment on Hold' means SASSA has deliberately paused your money because they detected a problem. This is usually due to a banking error or an unverified ID.",
    whatThisMeans:
      "A hold is much more serious than 'Pending'. Pending means 'wait'. Hold means 'stop'. The system found a mismatch—like a closed bank account or an expired ID—and locked your funds to prevent fraud.",
    whyThisMatters:
      "A hold will never fix itself. If you just sit and wait, you will never get paid. You have to actively identify the problem and submit the correct information to lift the hold.",
    steps:
      "1. Log into your SASSA portal and look for any error messages next to the 'Hold' status.\n2. Call your bank immediately and ask if your account is frozen or closed.\n3. Check if your phone number or ID details have changed recently.\n4. Update any incorrect details directly on the SASSA portal.\n5. Wait for SASSA to verify the new details, which will automatically lift the hold.",
    keyFocusTitle: "A hold requires you to take action",
    keyFocus:
      "SASSA places a hold to protect your money from bouncing or going to the wrong person. It is a security feature, not a punishment, but you must provide the missing puzzle piece.",
    important:
      "GrantCare cannot lift a payment hold. Only the official SASSA system can remove the block once you provide the correct, verified information.",
    help:
      "We guide you on how to find the exact reason for the hold so you can fix your banking or ID details quickly and safely.",
    related:
      "Useful next pages:\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-pending-verification-means\n• /guides/banking-details-pending-meaning\n• /guides/why-identity-verification-fails\n• /status/banking-issue",
    faqs: [
      {
        question: "Is a payment hold worse than pending?",
        answer: "Yes. Pending is a normal wait. A hold means the system found a problem and stopped the payment.",
      },
      {
        question: "What kinds of issues can cause a hold?",
        answer: "Usually incorrect bank details, a frozen bank account, or a failed identity verification.",
      },
      {
        question: "What should I do first?",
        answer: "Log into the official SASSA portal to see if they are asking you to update your banking details.",
      },
    ],
    sortOrder: 222,
  }),
  guide({
    slug: "how-to-fix-common-payment-release-problems",
    title: "How to fix common payment release problems",
    summary:
      "A problem-solving guide for the most common reasons your payment is approved but not reflecting in your bank.",
    quickAnswer:
      "If your payment is stuck, it is almost always due to one of three things: a closed bank account, a name mismatch between your ID and bank, or a weekend processing delay.",
    whatThisMeans:
      "When a payment fails to release, people assume the whole system is broken. In reality, 90% of release problems are caused by tiny admin errors on the beneficiary's banking profile.",
    whyThisMatters:
      "If you know the common reasons for a delay, you can check them off a list instead of panicking. Finding the exact error is the only way to get your money moving again.",
    steps:
      "1. Check the calendar: Is it a weekend or a public holiday? If yes, wait until Monday.\n2. Check your bank: Is your account active, or was it closed due to zero balance?\n3. Check your name: Does the name on your bank account perfectly match your SASSA ID?\n4. Check your limit: Does your bank account have a limit on how much money it can hold?\n5. Fix the specific error via your bank or the SASSA portal.",
    keyFocusTitle: "Find the exact roadblock",
    keyFocus:
      "Do not guess. Do not assume SASSA 'forgot' you. There is a specific technical reason the money stopped moving. Find it, fix it, and the money will flow.",
    important:
      "GrantCare helps you diagnose the most likely cause of your delay, but you must make the actual corrections on the official government portal.",
    help:
      "We provide a simple checklist of common banking and ID errors so you can quickly find out exactly why your payment is stuck.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/why-payment-is-delayed\n• /guides/where-to-confirm-payment-problems-officially",
    faqs: [
      {
        question: "What is the first thing to identify?",
        answer: "Check if the problem is a banking error, a weekend delay, or an ID mismatch.",
      },
      {
        question: "Why does one fix not work for every payment problem?",
        answer: "Because a frozen bank account requires a different fix than a weekend processing delay.",
      },
      {
        question: "What should I keep while troubleshooting?",
        answer: "Keep screenshots of your SASSA portal and your bank statement so you can prove the money did not arrive.",
      },
    ],
    sortOrder: 223,
  }),
  guide({
    slug: "what-to-do-if-payment-arrives-later-than-expected",
    title: "What to do if payment arrives later than expected",
    summary:
      "What to do if your payment arrived, but it was days or weeks later than the official SASSA schedule.",
    quickAnswer:
      "If your payment arrived late, check if you updated your banking details recently, or if there was a public holiday. Late payments do not mean next month will also be late.",
    whatThisMeans:
      "An unusually late payment is usually caused by a one-off event—like a system upgrade at your bank, a public holiday, or a manual verification check on your profile.",
    whyThisMatters:
      "People who receive a late payment often panic, thinking their grant has been permanently changed or downgraded. Usually, it was just a temporary hiccup.",
    steps:
      "1. Confirm the money has actually cleared and is in your account.\n2. Note the date it arrived compared to the official schedule.\n3. Check if there were any public holidays or weekend overlaps.\n4. Check if you recently changed your phone number or banking details.\n5. Plan your budget assuming next month will return to the normal schedule.",
    keyFocusTitle: "Late once does not mean late always",
    keyFocus:
      "A single late payment is usually a temporary glitch. Do not assume your payment date has permanently changed unless SASSA officially announces it.",
    important:
      "GrantCare cannot backdate a payment or explain the specific technical reason for a once-off delay. We provide the most common reasons to give you peace of mind.",
    help:
      "We explain the administrative reasons why payments sometimes arrive late, so you do not spend the rest of the year worrying about it happening again.",
    related:
      "Useful next pages:\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/how-payment-batches-can-cause-delays\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/what-to-do-if-payment-date-passed-with-no-update\n• /payment-dates",
    faqs: [
      {
        question: "Does a late payment mean something is wrong with my grant?",
        answer: "No. Usually, it is just a temporary banking or processing delay for that specific month.",
      },
      {
        question: "Will next month also be late?",
        answer: "Not usually. Most single late payments do not repeat unless there is an ongoing bank issue.",
      },
      {
        question: "Should I report a late payment that already arrived?",
        answer: "No. If the money has cleared, the problem is already solved.",
      },
    ],
    sortOrder: 224,
  }),
  guide({
    slug: "how-to-read-payment-pages-and-status-pages-together",
    title: "How to read payment pages and status pages together",
    summary:
      "How to combine the SASSA payment schedule with your personal status page to get the complete picture.",
    quickAnswer:
      "The payment schedule tells you *when* money moves generally. Your personal status page tells you *if* your specific money is moving. You need both to know your payday.",
    whatThisMeans:
      "The payment schedule is like a bus timetable—it tells you when the bus runs. Your status page is your ticket—it tells you if you are allowed on that bus this month.",
    whyThisMatters:
      "Many people look at the public payment schedule and assume they will be paid, only to find out their personal status was 'Pending'. Checking both stops you from making assumptions.",
    steps:
      "1. Look at the official SASSA payment date schedule for the month.\n2. Find the exact date listed for your specific grant type.\n3. Log into your personal SASSA SRD or grant portal.\n4. Check if your personal status says 'Approved' or 'Released' for that same month.\n5. If your status is 'Pending', the public schedule date does not apply to you yet.",
    keyFocusTitle: "The schedule is public; the status is personal",
    keyFocus:
      "Never trust a public payment date without verifying your personal approval status first. A date means nothing if your specific file hasn't been approved for release.",
    important:
      "GrantCare provides the schedules and teaches you how to check your status, but only the official portal has your real-time approval data.",
    help:
      "We show you how to cross-reference the calendar with your actual profile, so you never wait for a payment that hasn't been approved.",
    related:
      "Useful next pages:\n• /payment-dates\n• /status\n• /guides/how-to-understand-payment-dates\n• /guides/what-payment-status-check-means\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay",
    faqs: [
      {
        question: "Why do I need to check both?",
        answer: "Because the calendar shows the general payday, but your status confirms if you are actually on the list.",
      },
      {
        question: "What if the date has passed but my status is pending?",
        answer: "It means you were not included in that payment batch, and must wait for your status to update.",
      },
      {
        question: "Which page is more important?",
        answer: "Your personal status page is always more accurate for your specific situation.",
      },
    ],
    sortOrder: 225,
  }),
  guide({
    slug: "how-to-check-if-a-missing-payment-is-just-a-delay",
    title: "How to check if a missing payment is just a delay",
    summary:
      "How to tell if your missing payment is just a normal 48-hour banking delay, or a serious problem requiring action.",
    quickAnswer:
      "A missing payment is usually just a banking delay if it has been less than 48 hours since the official payment date. If it has been more than 3 days, it might be a real issue.",
    whatThisMeans:
      "We often use the word 'missing' when we really mean 'delayed'. True missing payments (where the money is lost) are incredibly rare. Most of the time, the bank's computers are just running slow.",
    whyThisMatters:
      "If you treat a normal delay like a missing payment, you will waste hours calling support lines for no reason. Knowing the difference saves you time, airtime, and stress.",
    steps:
      "1. Check the official payment date for your specific grant.\n2. Count exactly how many business days have passed since that date.\n3. If it is less than 48 hours, it is a normal delay. Do nothing.\n4. If the payment status says 'Returned' or 'Failed', it is an issue you must fix.\n5. If 3 days have passed and the status still says 'Approved' or 'Released', contact your bank.",
    keyFocusTitle: "Delayed is not missing",
    keyFocus:
      "A delayed payment is on its way. A missing payment means the system failed. Give the banking system 48 hours to do its job before assuming the money is gone.",
    important:
      "GrantCare helps you diagnose the delay, but we cannot track the exact location of your money inside the banking network.",
    help:
      "We help you calm down by showing you the normal timeframes for electronic bank transfers so you know exactly when to start worrying.",
    related:
      "Useful next pages:\n• /guides/why-payment-is-delayed\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-arrives-later-than-expected\n• /guides/how-to-fix-missing-payment-issues",
    faqs: [
      {
        question: "How long should I wait before calling it a missing payment?",
        answer: "Wait at least 48 to 72 business hours after the official payment date.",
      },
      {
        question: "What is the biggest clue that it is only a delay?",
        answer: "The date recently passed, but there is no 'Return' or 'Failed' message on your portal yet.",
      },
      {
        question: "When should I assume there is a real problem?",
        answer: "If the status changes to a clear error message, or if it stays missing long after the 3-day window.",
      },
    ],
    sortOrder: 226,
  }),
  guide({
    slug: "how-to-know-if-your-payment-method-is-blocking-release",
    title: "How to know if your payment method is blocking release",
    summary:
      "How to spot when your own bank account is the exact reason SASSA cannot release your funds.",
    quickAnswer:
      "If your status is approved but you aren't getting paid, check if your bank account is dormant, frozen, or if the name on the account differs from your ID. These will block the release.",
    whatThisMeans:
      "SASSA's system will not release money into an account that looks suspicious or inactive. It is a security feature to stop fraudsters from stealing your money.",
    whyThisMatters:
      "If your payment method is blocking the release, the money will sit at SASSA indefinitely. You must fix the 'pipe' before the water can flow.",
    steps:
      "1. Log into your SASSA portal and look for 'Banking Details Pending' or similar warnings.\n2. Check your banking app to confirm your account is fully active.\n3. Ensure your bank account limit hasn't been reached (common with basic accounts).\n4. Confirm that the exact spelling of your name matches both SASSA and the bank.\n5. Update your banking details on the SASSA portal if you find any errors.",
    keyFocusTitle: "SASSA won't pay a blocked account",
    keyFocus:
      "A blocked payment method is a hard stop. SASSA is ready, but your bank's front door is locked. You are the only one who can unlock it by updating your details.",
    important:
      "GrantCare can help you identify these banking blockers, but you must contact your bank directly to unfreeze an account.",
    help:
      "We provide a simple checklist of banking errors so you can quickly see if your account is the reason your money hasn't arrived.",
    related:
      "Useful next pages:\n• /guides/banking-details-pending-meaning\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/what-to-do-if-payment-keeps-failing\n• /status/banking-issue",
    faqs: [
      {
        question: "Can an old bank account stop a payment?",
        answer: "Yes. If an account is inactive, the bank will automatically reject the SASSA transfer.",
      },
      {
        question: "How do I fix a blocked payment method?",
        answer: "Visit your bank to resolve the account issue, then log into SASSA to update the details securely.",
      },
      {
        question: "Does this mean my grant is cancelled?",
        answer: "No. Your grant is still approved, but the money has nowhere to go until the account is fixed.",
      },
    ],
    sortOrder: 227,
  }),
  guide({
    slug: "what-to-do-if-payment-keeps-failing",
    title: "What to do if payment keeps failing",
    summary:
      "What to do if your SASSA payment fails multiple times, and how to break the cycle of bounced transfers.",
    quickAnswer:
      "If a payment keeps failing, your banking details are likely causing a permanent block. You must visit your bank to get a stamped bank statement, then upload it to the SASSA portal.",
    whatThisMeans:
      "A repeated failure means the system is not just 'glitching'. It means every time SASSA tries to send money, your bank's system automatically rejects it due to a hard error on your account.",
    whyThisMatters:
      "If you just keep waiting, the payment will keep failing every month. You must break the cycle by proving to SASSA that you have a new, working, verified bank account.",
    steps:
      "1. Stop waiting for the money to suddenly appear.\n2. Go to your nearest bank branch and ask why transfers are bouncing.\n3. Fix the issue with your bank, or open a completely new basic account.\n4. Ask the bank for a stamped letter confirming your new account details.\n5. Log into the official SASSA portal and update your banking details using the new information.",
    keyFocusTitle: "A repeated failure is a blocked pipe",
    keyFocus:
      "Think of your bank account like a pipe. If it is blocked, SASSA can keep pouring money into it, but it will just keep splashing back. You have to fix the pipe.",
    important:
      "GrantCare cannot fix your bank account. You must deal directly with your bank to resolve the account issue before SASSA can successfully pay you.",
    help:
      "We explain how to stop the cycle of bounced payments by updating your banking details securely and officially.",
    related:
      "Useful next pages:\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-was-returned\n• /status/banking-issue",
    faqs: [
      {
        question: "Will a repeated failure fix itself?",
        answer: "No. If a payment bounces multiple times, you must actively update your bank details to fix it.",
      },
      {
        question: "What is the most common reason for repeated failure?",
        answer: "A closed bank account, or a name on the account that does not match your SASSA ID.",
      },
      {
        question: "What should my next step be?",
        answer: "Visit your bank to fix the account, then update your details on the official SASSA portal.",
      },
    ],
    sortOrder: 228,
  }),
  guide({
    slug: "how-to-keep-records-of-payment-problems",
    title: "How to keep records of payment problems",
    summary:
      "How to properly track your SASSA payment issues so you have exact proof when you need to escalate.",
    quickAnswer:
      "Always take screenshots of your SASSA portal, especially when statuses change. Write down the exact dates and times you checked, so you can build a clear timeline for the support agent.",
    whatThisMeans:
      "When you call SASSA, saying 'My money hasn't come for a long time' isn't helpful. Saying 'My status changed from Scheduled to Pending on the 14th of May' gets results.",
    whyThisMatters:
      "Good records prove you are not guessing. If your payment bounced, having a screenshot of the exact error message saves you from starting the investigation from scratch.",
    steps:
      "1. Take a screenshot every time your SASSA status changes.\n2. Ensure the screenshot clearly shows the date and your ID number.\n3. Write down any SMS or email updates you receive from SASSA or your bank.\n4. Keep all your bank statements from the months you were not paid.\n5. Give this exact timeline to the SASSA official if you need to escalate.",
    keyFocusTitle: "Proof is power",
    keyFocus:
      "Do not rely on your memory. In large government systems, documented timelines get problems solved much faster than vague complaints.",
    important:
      "GrantCare advises keeping records, but we never ask you to send your private screenshots to us. Only share them with official SASSA staff.",
    help:
      "We teach you how to gather the right evidence so that when you finally speak to an official, they can fix your problem immediately.",
    related:
      "Useful next pages:\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-fix-common-payment-release-problems\n• /guides/where-to-confirm-payment-problems-officially\n• /guides/how-grant-reminders-can-help",
    faqs: [
      {
        question: "What should I record first?",
        answer: "Record the exact wording and the date you saw it first.",
      },
      {
        question: "Why do screenshots help?",
        answer: "They provide exact proof of what the portal said before the status disappeared or changed.",
      },
      {
        question: "Should I keep track of bank-detail changes too?",
        answer: "Yes. Changing your bank details is the number one cause of delayed payments.",
      },
    ],
    sortOrder: 229,
  }),
  guide({
    slug: "how-to-use-reminders-for-payment-readiness",
    title: "How to use reminders for payment readiness",
    summary:
      "How to use your phone's calendar to track your SASSA payment without stressing every single day.",
    quickAnswer:
      "Set a calendar reminder for your specific payday, and another one for 48 hours later. Only check your bank balance after the second reminder goes off.",
    whatThisMeans:
      "Checking your banking app ten times a day won't make the money arrive faster—it will just drain your data and your mental health.",
    whyThisMatters:
      "Anxiety spikes when you sit waiting for an SMS that might be delayed by a massive batch processing system. Reminders let you step away and live your life.",
    steps:
      "1. Find the official SASSA payment date for your grant type.\n2. Set a reminder on your phone for 8 AM on that exact date.\n3. Set a second reminder for 48 hours later (the 'clearance' window).\n4. Ignore all rumors on social media between those two dates.\n5. Only take action or worry if the second reminder passes with no money.",
    keyFocusTitle: "Control the wait, don't let it control you",
    keyFocus:
      "The banking system moves at its own pace. Setting a boundary with a reminder stops you from obsessing over something you cannot speed up.",
    important:
      "GrantCare provides the dates for you to set your reminders, but we cannot send you an SMS when your personal funds clear.",
    help:
      "We help you build healthy waiting habits so you aren't wasting airtime calling the bank every few hours.",
    related:
      "Useful next pages:\n• /guides/how-grant-reminders-can-help\n• /payment-dates\n• /dashboard\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-when-funds-should-show",
    faqs: [
      {
        question: "Do reminders mean the payment is confirmed?",
        answer: "No. Reminders just stop you from worrying and checking every single day.",
      },
      {
        question: "When is the best time for a reminder?",
        answer: "Set one on the actual payment date, and one 48 hours later to allow for bank clearing.",
      },
      {
        question: "Can reminders help with stress?",
        answer: "Yes. They give you permission to stop thinking about the money until the reminder goes off.",
      },
    ],
    sortOrder: 230,
  }),
  guide({
    slug: "what-to-do-if-payment-ready-message-disappears",
    title: "What to do if payment ready message disappears",
    summary:
      "Why your 'Payment Ready' status suddenly vanished, and what it actually means for your money.",
    quickAnswer:
      "If your 'Payment Ready' status disappears, do not panic. It usually means the system is updating for the new month, or the payment has fully cleared and the old message was removed.",
    whatThisMeans:
      "The SASSA portal is a live system. Status messages do not stay there forever. When a payment cycle finishes, old messages are archived to make room for the next month.",
    whyThisMatters:
      "A disappearing message feels like the payment was cancelled. In reality, it is usually just an administrative clean-up. Wait to see what message replaces it.",
    steps:
      "1. Do not assume your grant was cancelled just because the text vanished.\n2. Check your bank account to see if the money actually arrived while the message was gone.\n3. Wait 24 hours for the SASSA portal to finish its system update.\n4. Log in again to see the fresh status for the current month.\n5. Only escalate if the new status says 'Failed' or 'Declined'.",
    keyFocusTitle: "A blank screen is usually just an update",
    keyFocus:
      "Think of the portal like a blackboard. Sometimes they have to wipe the board clean before they can write the next set of instructions. It is rarely a cancellation.",
    important:
      "GrantCare explains system behaviors, but we cannot retrieve a deleted message from your personal SASSA profile.",
    help:
      "We help you understand how the digital portal works so a simple screen update doesn't cause unnecessary panic.",
    related:
      "Useful next pages:\n• /guides/what-payment-pending-means\n• /guides/what-payment-hold-may-mean\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/how-to-fix-common-payment-release-problems\n• /status/banking-issue",
    faqs: [
      {
        question: "Does a disappeared ready message always mean the payment is gone?",
        answer: "No. It usually just means the system is refreshing the page for the new month.",
      },
      {
        question: "What should I compare first?",
        answer: "Compare the disappeared message to your actual bank balance. Often, the money arrives just as the message vanishes.",
      },
      {
        question: "Why save the new wording quickly?",
        answer: "Because it tells you exactly what the system is doing next.",
      },
    ],
    sortOrder: 231,
  }),
  guide({
    slug: "how-to-read-r350-payment-status-safely",
    title: "How to read R350 payment status safely",
    summary:
      "How to check your SRD R350 status without getting scammed by fake links or unofficial apps.",
    quickAnswer:
      "Only ever check your SRD R350 status on the official website: srd.sassa.gov.za. Never use third-party apps, WhatsApp bots, or links sent by strangers.",
    whatThisMeans:
      "Because millions of people check the R350 status daily, scammers build fake websites that look exactly like SASSA to steal your ID and phone number.",
    whyThisMatters:
      "If you enter your details into a fake status checker, the scammer can hijack your profile, change your banking details, and steal your grant.",
    steps:
      "1. Type 'srd.sassa.gov.za' directly into your browser.\n2. Never click on links that say 'Check SRD Status Here' on Facebook or WhatsApp.\n3. Look for the 'gov.za' at the end of the website address—this proves it is the real government site.\n4. Do not download any 'SASSA Status Apps' from the app store (SASSA does not have an official app).\n5. Enter your ID and phone number securely.",
    keyFocusTitle: "Protect your details like cash",
    keyFocus:
      "Your ID number and phone number are the keys to your grant. If you give those keys to a fake website, you are giving away your money.",
    important:
      "GrantCare will never ask for your ID or phone number. We provide guides, but all actual status checking must be done on the government site.",
    help:
      "We teach you how to spot fake websites and apps so you can check your status with 100% confidence.",
    related:
      "Useful next pages:\n• /guides/how-to-check-payment-readiness-for-r350-support\n• /guides/what-payment-status-check-means\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/payment-processing-meaning\n• /guides/where-to-find-official-updates-safely",
    faqs: [
      {
        question: "Why is R350 payment wording easy to misread?",
        answer: "Because scammers create fake websites that give you fake answers just to steal your data.",
      },
      {
        question: "What should I compare with the wording?",
        answer: "Always ensure the website URL says 'gov.za' before you type anything.",
      },
      {
        question: "When should I use the official route?",
        answer: "You must always use the official SASSA route to check your personal, private status.",
      },
    ],
    sortOrder: 232,
  }),
  guide({
    slug: "where-to-confirm-payment-problems-officially",
    title: "Where to confirm payment problems officially",
    summary:
      "The only official channels you should use to report a serious SASSA payment issue.",
    quickAnswer:
      "If you have a real payment problem, you must contact SASSA directly via their toll-free number (0800 60 10 11), email (GrantEnquiries@sassa.gov.za), or visit a local branch.",
    whatThisMeans:
      "Blogs, Facebook groups, and news websites cannot fix your SASSA problem. They can give you advice, but only SASSA has the power to unlock your account or reissue a payment.",
    whyThisMatters:
      "People waste weeks complaining on social media, hoping someone will fix it. The only way to get your money is to log a formal query through the correct government channels.",
    steps:
      "1. Use GrantCare to figure out what the problem is (e.g., failed bank details vs normal delay).\n2. Gather your ID, your phone, and a screenshot of your portal status.\n3. Call the official toll-free line: 0800 60 10 11.\n4. If calling fails, email GrantEnquiries@sassa.gov.za with your ID number in the subject line.\n5. If both fail, take your ID and a bank statement to your nearest physical SASSA office.",
    keyFocusTitle: "Only the source can fix the problem",
    keyFocus:
      "We are here to be your trusted advisor, to explain the confusing terms, and to save you trips to the bank. But when the system truly breaks, you must go to the source.",
    important:
      "GrantCare is an independent educational platform. We are not SASSA, and we cannot access your file or resolve payment errors on your behalf.",
    help:
      "We help you prepare the exact information you need before you call SASSA, so your problem gets resolved as quickly as possible.",
    related:
      "Useful next pages:\n• /guides/how-to-fix-common-payment-release-problems\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/where-to-find-official-updates-safely\n• /payment-dates",
    faqs: [
      {
        question: "When is GrantCare not enough on its own?",
        answer: "When you actually need someone to press a button and fix your account. That requires SASSA.",
      },
      {
        question: "Why use GrantCare first at all?",
        answer: "Because we help you figure out exactly what to say to the SASSA agent, so they understand you instantly.",
      },
      {
        question: "What should I take with me to official follow-up?",
        answer: "Your ID, your phone, any screenshots, and a stamped bank statement.",
      },
    ],
    sortOrder: 233,
  }),
];
