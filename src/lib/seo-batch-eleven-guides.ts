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

const SEO_BATCH_ELEVEN_GUIDES_SOURCE = [
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

type GuideTranslation = {
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
};

const ZU_TRANSLATIONS: Record<string, GuideTranslation> = {
  "what-payment-status-check-means": {
    "title": "Kusho ukuthini ukuhlola isimo sokukhokha",
    "summary": "Incazelo ecacile yokuthi isheke lesimo sokukhokha likutshelani ngempela, nokuthi kungani lihluke ngokuphelele esimweni sakho sesicelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isimo sakho sokukhokha sikutshela kahle ukuthi imali yakho ikuphi ohlelweni lwamabhange njengamanje. Isibuyekezo esihlukile ekugunyazweni kwesicelo sakho."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu abaningi babona i-'Approved' futhi ngokushesha bagijimele ku-ATM. Kodwa ukugunyazwa kusho ukuthi ufanelekile ngokusemthethweni. Isimo sakho sokukhokha yisona esikutshela ukuthi ingabe imali ihleliwe, ikhululiwe, noma ibambezeleke ngephutha lasebhange."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma udida lezi zimo ezimbili, uzomosha imali uhambela i-ATM ekubeni imali ingakakhishwa. Ukuhlola isimo sakho sokukhokha ngokwehlukana kongela isikhathi nengcindezi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ngena kuphothali esemthethweni ye-SASSA bese ubheka udlule umlayezo we-'Approved'.\n2. Thola umugqa othize we-'Payment Status'.\n3. Hlola ukuthi ithi 'Scheduled', 'Released', noma 'Pending'.\n4. Qhathanisa lesi simo nezinsuku zokukhokha ezisemthethweni zenyanga.\n5. Uma isimo sikhomba iphutha lasebhange, ungalindi—lilungise ngokushesha ngomzila osemthethweni."
      },
      {
        "title": "Leli sheke lingeleni ngempela",
        "body": "Cabanga ngesimo sakho sokukhokha njengenombolo yokulandelela ukulethwa. Ikutshela uma iphakheji isendaweni yokugcina impahla (Ilindile), elolini (Kuhleliwe), noma emnyango wakho (Ikhishiwe)."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza ukuthi la magama adidayo asho ukuthini ngesiNgisi esilula. Nokho, asikwazi ukusheshisa uhlelo lwamabhange noma ukukhulula inkokhelo yakho ngokushesha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlukanisa yonke imilayezo yesimo sokukhokha ukuze wazi kahle ukuthi kufanele uye ku-ATM noma ulinde olunye usuku."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-payment-status-after-approval\n• /guides/what-payment-released-means\n• /guides/what-payment-scheduled-means\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe isimo sokukhokha siyefana nesimo sohlelo lokusebenza?",
        "body": "Cha. Isimo sesicelo siyakutshela ukuthi ufanelekile yini. Isimo sokukhokha siyakutshela ukuthi imali ikuphi."
      },
      {
        "title": "I-FAQ: Ingabe ukuhlola isimo sokukhokha kusho ukuthi imali isikhona kakade?",
        "body": "Hhayi njalo. Ingase ithi 'Pending' noma 'Scheduled', okusho ukuthi usadinga ukulinda."
      },
      {
        "title": "I-FAQ: Yini okufanele ngifunde kuqala?",
        "body": "Funda amagama aqondile okukhokha kuqala, bese uwaqhathanisa nekhasi ledethi yokukhokha."
      }
    ]
  },
  "how-to-read-payment-status-after-approval": {
    "title": "Usifunda kanjani isimo sokukhokha ngemuva kokugunyazwa",
    "summary": "Umhlahlandlela opholile ochaza ukuthi kungani i-'Approved' ingasho ukuthi imali yakho isilungele ukuhoxiswa ngalo mzuzwana.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isimo se-'Approved' sisho ukuthi uphumelele wonke amasheke futhi i-SASSA ikukweleta imali. Kodwa kusamele ulinde uhlelo ukuthi lucubungule ukudluliselwa kwebhange kwangempela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukugunyazwa kuyisinqumo esisemthethweni. Ukukhishwa kwenkokhelo kuyinqubo yasebhange. Ngisho nangemva kokuba i-SASSA ikugunyazile, umnyango wabo wezezimali kusafanele ufake umugqa wenkokhelo yakho, uyithumele ebhange, bese ulinda ibhange ukuthi likusule."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Lena ingxenye ecindezela kakhulu yenqubo. Uyazi ukuthi uyahola, kodwa imali ayikho. Uma uqonda ukuthi imvume yasebhange ithatha izinsuku ezimbalwa, ungagwema ukwethuka."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bungaza isimo se-'Approved'—ingxenye enzima isiphelile.\n2. Manje, bheka isibuyekezo se-'Payment Status'.\n3. Hlola ikhalenda elisemthethweni lokukhokha le-SASSA ukuze uthole isibonelelo sakho esithile.\n4. Linda isimo sishintshe sisuke ku-'Pending' siye ku-'Released'.\n5. Nikeza ibhange lakho amahora angu-24 kuya kwangu-48 ukuze usule izimali uma sezikhishiwe."
      },
      {
        "title": "Kungani ukugunyazwa kulandelwa isikhathi sokulinda",
        "body": "I-SASSA icubungula izigidi zezinkokhelo ngesikhathi esisodwa. Abayithumeli imali ngokwesibili lapho isicelo sivunyiwe. Imali ihamba ngamaqoqo amakhulu, okuthatha isikhathi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuphoqa i-SASSA ukuthi icubungule inkokhelo yakho ngokushesha ngemva kokugunyazwa. Singakusiza kuphela ukuthi uqonde ukuthi ukuphi kulayini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza umugqa wesikhathi phakathi kwesinqumo sokugunyaza kanye nemali yangempela eshaya i-akhawunti yakho, ukuze wazi ukuthi yini evamile nokuthi yini ukubambezeleka kwangempela."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/approved-but-no-payment\n• /guides/payment-processing-meaning\n• /guides/how-to-know-if-your-payment-is-ready\n• /status/approved\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Kungani ukugunyazwa kusengabonisa ukubambezeleka kwenkokhelo?",
        "body": "Ngoba ukugunyaza kuyisinqumo esingokomthetho, kodwa inkokhelo iyinqubo yasebhange ethatha isikhathi."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithuke uma inkokhelo ingasheshi ngemva kokugunyazwa?",
        "body": "Cha. Imali yakho iphephile, ihlezi nje emgqeni wokukhokha."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise namagama agunyaziwe?",
        "body": "Qhathanisa nesimo sokukhokha kanye nekhasi ledethi yokukhokha yakamuva."
      }
    ]
  },
  "what-payment-released-means": {
    "title": "Kusho ukuthini inkokhelo ekhishiwe",
    "summary": "Kahle kahle ukuthi i-'Payment Released' isho ukuthini ku-akhawunti yakho yasebhange, nokuthi kungani kungase kudingeke ulinde amahora ambalwa engeziwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-'Payment Released' isho ukuthi i-SASSA isithumele ngokusemthethweni imali isuka ebhange labo kweyakho. Kuwuphawu oluhle kakhulu ongaluthola, kodwa ukubambezeleka okujwayelekile kwebhange kusengasebenza."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uhulumeni uwenzile umsebenzi wakhe. Imali ishiye umgcinimafa we-SASSA. Manje, kuphuma ebhange lakho elithile (Capitec, Standard Bank, FNB, njll.) ukucubungula ukudlulisa okungenayo futhi likubonise kubhalansi yakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abasebenzisi abaningi babona i-'Released' futhi balindele ukuthi imali ibe lapho ngalowo mzuzu. Uma ingekho, bayatatazela. Ukuqonda ukuthi amabhange adinga isikhathi sokusula ukudluliselwa kuvimbela lokhu kucindezeleka okungadingekile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thatha umoya—'Released' kusho ukuthi imali yakho iphephile futhi isendleleni.\n2. Hlola usuku oluseduze nomlayezo we-'Released'.\n3. Vumela kufika emahoreni angu-48 ukuze imali ibonakale ku-akhawunti yakho.\n4. Isici ngezimpelaviki noma ngamaholide, okumisa kancane ukucubungula kwebhange.\n5. Thinta ibhange lakho kuphela uma imali ingakaveli ngemva kwezinsuku ezintathu zebhizinisi."
      },
      {
        "title": "Okukhishiwe kusho okuthunyelwe, akutholakali ngokushesha",
        "body": "I-'Released' ifana nomuntu onikeza incwadi eposini. Incwadi ithunyelwe, kodwa unoposi usadinga ukuyishayela endlini yakho. Imali iyeza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkomba yezemfundo. Asikwazi ukufinyelela i-akhawunti yakho yasebhange futhi asikwazi ukukutshela ngokuqondile ukuthi imali izoveza ngasiphi isikhathi."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi amabhange ahlukene aziphatha kanjani izikhathi zokukhokha ukuze wazi kahle ukuthi ungayilindela nini imali yakho ngemuva kokubona i-'Released'."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-when-funds-should-show\n• /guides/what-payment-scheduled-means\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/why-payment-is-delayed\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ukukhishwa kusho ukuthi imali isivele ibonakala?",
        "body": "Hhayi njalo. Kusho ukuthi imali isithunyelwe, kodwa ukukhishwa kwebhange kuthatha isikhathi."
      },
      {
        "title": "I-FAQ: Ingabe ukukhululwa kuwuphawu oluhle?",
        "body": "Yebo, kuwuphawu oluhle kakhulu. Kusho ukuthi inkokhelo yakho ihamba ngempumelelo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze uma ukukhululwa kungabonisi?",
        "body": "Linda amahora webhizinisi angama-48. Uma kuyimpelasonto, linda kuze kube uMsombuluko ntambama."
      }
    ]
  },
  "what-payment-not-yet-available-means": {
    "title": "Ukuthi inkokhelo engakatholakali isho ukuthini",
    "summary": "I-Don't panic if you see 'Payment ayikakatholakali'. Siyachaza ukuthi kungani lona kuwumlayezo ojwayelekile wokulinda hhayi ukunqatshelwa.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-'Payment not yet available' imane isho ukuthi imali yakho ayikakalungeli ukuqoqwa namuhla. Akusho ukuthi isibonelelo sakho sinqatshiwe noma sikhanseliwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-SASSA ikhokha izibonelelo ezahlukene ngezinsuku ezahlukene. Uma uhlola isimo sakho ngaphambi kosuku lwakho oluqondile lokukhokha, isistimu izokutshela ukuthi izimali azikakatholakali. Kumane kuwumlayezo wesikhathi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu babona lo mlayezo bese becabanga ukuthi bavinjiwe. Lokhu kubangela ukuthi baphuthume emahhovisi e-SASSA kungenasidingo, bamoshe imali yokugibela amatekisi nokuma kolayini abade ngaphandle kwesizathu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungathuki—lona umlayezo ojwayelekile wokuhlela.\n2. Hlola usuku oluqondile owabona ngalo umlayezo.\n3. Bheka ikhalenda lokukhokha le-SASSA lenyanga yamanje.\n4. Linda kuze kufike usuku lokukhokha lwesigaba sakho sezibonelelo ezithile.\n5. Hlola isimo sakho futhi ngosuku olufanele."
      },
      {
        "title": "Lo mlayezo usho ukuthi 'Wait', hhayi 'No'",
        "body": "I-'Not yet available' yindlela yesistimu yokukutshela ukuthi usheshe. Imali iphephile, ivaliwe nje kuze kufike usuku olulungile lokukhishwa."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingakuchaza la magama ukuze uthulise izinzwa zakho, kodwa asikwazi ukuvula izimali zakho. Umugqa wesikhathi osemthethweni we-SASSA kuphela oshoyo ukuthi imali ikhishwa nini."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sinikeza amakhalenda okukhokha acacile, afundeka kalula ukuze wazi kahle ukuthi i-'not yet available' izophenduka nini i-'released'."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-pending-means\n• /guides/what-payment-scheduled-means\n• /guides/how-to-know-when-funds-should-show\n• /guides/why-payment-is-delayed\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay"
      },
      {
        "title": "I-FAQ: Ingabe okwamanje ayitholakali kusho ukuthi inkokhelo yehlulekile?",
        "body": "Cha. Kusho ukuthi uhlola ngaphambi kwedethi yokukhishwa."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngilinde noma ngithathe isinyathelo ngokushesha?",
        "body": "Linda idethi yakho yokukhokha esemthethweni ukuthi ifike ngaphambi kokuba ukhathazeke."
      },
      {
        "title": "I-FAQ: Kufanele ngiqhathanise nani leli gama?",
        "body": "Hlola ishejuli yokukhokha ye-SASSA yenyanga yamanje."
      }
    ]
  },
  "how-to-know-when-funds-should-show": {
    "title": "Ungazi kanjani ukuthi imali kufanele ibonakale nini",
    "summary": "Ungahlulela kanjani ngokweqiniso ukuthi imali yakho izovela nini ku-akhawunti yakho, ngaphandle kokuncika kumahemuhemu e-Facebook.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Izimali zivame ukuvela emahoreni angama-24 kuye kwangama-48 ngemuva kokuthi i-SASSA izikhiphe ngokusemthethweni. Isikhathi esiqondile sincike ngokuphelele ekutheni yiliphi ibhange olisebenzisayo nokuthi impelasonto."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ayikho i-'magic minute' eyodwa lapho wonke umuntu waseNingizimu Afrika ehola ngesikhathi esisodwa. I-Capitec ingase isule izinkokhelo ngo-2 AM, kuyilapho i-Standard Bank ingazisula ngo-8 AM. Iyahluka ngokugqamile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ulindele imali yakho phakathi kwamabili ngoba iqembu le-WhatsApp lisho njalo, uzochitha ubusuku bonke ucindezelekile. Ukubeka okulindelwe okungokoqobo okusekelwe emithethweni yasebhange kunempilo kakhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi isimo sakho sithi 'Released'.\n2. Qaphela isikhathi nosuku lokukhishwa.\n3. Hlola ukuthi namuhla uLwesihlanu noma iholidi lomphakathi (lokhu kubambezela ukucutshungulwa).\n4. Qonda izikhathi ezijwayelekile zokugunyazwa kwebhange lakho.\n5. Linda amahora webhizinisi angama-48 ngaphambi kokuthi ucabange ukuthi inkokhelo ayikho."
      },
      {
        "title": "Buza umbuzo ofanele mayelana nesikhathi",
        "body": "Yeka ukubuza 'What time exactly will the money show?' Qala ukubuza 'Has enough normal banking time passed since the release?' Le ndlela isusa ukwethuka."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubona ohlelweni lwamabhange. Sinikeza isiqondiso ngokusekelwe ezikhathini ezijwayelekile zokubhanga, kodwa ibhange lakho lilawula ukubonakaliswa kokugcina."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza ukuthi izimpelasonto, amaholide omphakathi, nezinhlelo zamabhange ezihlukene zisithinta kanjani isikhathi sakho sokukhokha ukuze ukwazi ukuhlela uhambo lwakho lokuthenga ngokuphepha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-released-means\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/how-to-check-payment-method-before-pay-date\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe izimali zingaboniswa ngosuku olufanayo namagama akhishiwe?",
        "body": "Yebo, kodwa ngokuvamile kuthatha amahora angu-24 engeziwe kuye ngebhange."
      },
      {
        "title": "I-FAQ: Kwenzekani lapho izimali zibonisa?",
        "body": "Ibhange lakho elithile, isikhathi sosuku elikhishwe ngalo, nezimpelasonto."
      },
      {
        "title": "I-FAQ: Kuthiwani uma imali ingakabonakali?",
        "body": "Uma sekudlule amahora angu-48 ebhizinisi kusukela ekukhululweni, xhumana nebhange lakho kuqala."
      }
    ]
  },
  "what-payment-scheduled-means": {
    "title": "Kusho ukuthini ukukhokha okuhleliwe",
    "summary": "Isho ukuthini i-'Scheduled' ngenkokhelo yakho ye-SASSA, futhi kungani kuwuphawu oluhle lokuthi imali yakho ihamba ngendlela efanele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-'Payment Scheduled' isho ukuthi imali yakho yesibonelelo inikezwe idethi ethile yokukhishwa. Kuwuphawu oluhle kakhulu, kodwa imali ayikadluliswa ebhange lakho kuze kube manje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Cabanga nge-'Scheduled' njengokubhuka indiza. Unalo ithikithi lakho nesihlalo sakho, kodwa indiza ayikasuki. I-SASSA ikumugqa wenkokhelo yakho, futhi ilinde usuku oluqondile lokuthunyelwa kwayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu bavame ukudida i-'Scheduled' ne-'Released' futhi baphuthume ebhange kusenesikhathi. Uma ulinda kuze kube yilapho isimo sishintsha kokuthi Okuhlelelwe ukuya Kokhishiwe, ngeke uchithe isikhathi sakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka isimo se-'Scheduled' futhi uqaphele usuku olunikeziwe.\n2. Ungayi e-ATM noma ebhange okwamanje.\n3. Linda usuku oluhleliwe ukuthi lufike.\n4. Hlola iphothali futhi ukuze ubone ukuthi isimo siyashintsha yini sibe 'Released'.\n5. Uma usukhululiwe, vumela isikhathi esijwayelekile sokubhanga."
      },
      {
        "title": "Okuhleliwe akusona isinyathelo sokugcina",
        "body": "Okuhleliwe kusho ukuthi uhlelo lunohlelo lwemali yakho. Ingcono kakhulu kune-'Pending', kodwa isadinga ukubekezela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi uqonde ukuthi le migomo yasebhange isho ukuthini, kodwa asikwazi ukuhambisa inkokhelo ehleliwe ngedethi yangaphambili."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi uhlukanise phakathi kwezigaba zokulinda ezihlukene ukuze uhambe uye ebhange kuphela uma imali yakho ikhona."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-released-means\n• /guides/what-payment-not-yet-available-means\n• /guides/how-to-read-payment-status-after-approval\n• /guides/how-to-understand-payment-dates\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ukuhlela kusho ukuthi ngingakwazi ukuqoqa khona manje?",
        "body": "Cha. Kusho ukuthi usuku lwakho lokukhokha selumisiwe, kodwa imali ayikathunyelwa."
      },
      {
        "title": "I-FAQ: Ingabe ishejuliwe ingcono kunokulinda?",
        "body": "Yebo. Kusho ukuthi usuphumile kulayini wokulinda futhi unohlelo lokukhokha oluqinisekisiwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise okuhleliwe nayo?",
        "body": "Iqhathanise nekhasi ledethi yokukhokha ukuze wazi ukuthi izoshintsha nini ibe yi-'Released'."
      }
    ]
  },
  "how-to-check-if-payment-was-sent-back": {
    "title": "Ungahlola kanjani ukuthi inkokhelo ibuyiselwe emuva",
    "summary": "Uzibona kanjani izimpawu eziyisixwayiso zokuthi inkokhelo yakho ibuyisiwe noma yehlulekile ukusulwa, nokuthi yini okufanele uyenze ngokulandelayo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo yakho ibuyiselwe emuva, isimo sakho ngokuvamile sizokhuluma nge-'Return', 'Reversal', noma 'Failed Bank Details'. Lokhu kusho ukuthi i-SASSA izamile ukukukhokhela, kodwa ibhange lakho linqabile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Inkokhelo ebuyisiwe ayikona ukubambezeleka kwe-SASSA—ukwehluleka kwebhange. Ngokuvamile kwenzeka uma i-akhawunti yakho yasebhange ivaliwe, imisiwe, noma uma igama eliku-akhawunti lingahambisani ne-ID yakho ye-SASSA ncamashi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ucabanga ukuthi inkokhelo ebuyisiwe yi-'late' nje, uzolinda unomphela. Inkokhelo ebuyisiwe ayisoze yazilungisa yona. Kufanele uvuselele imininingwane yakho yasebhange ukuze uthole imali yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Funda ngokucophelela isimo sakho sokukhokha ukuze uthole amagama afana ne-'Returned' noma 'Failed'.\n2. Shayela ibhange lakho ngokushesha ukuze uhlole ukuthi i-akhawunti yakho iyasebenza yini.\n3. Qinisekisa ukuthi igama le-akhawunti yakho yasebhange lifana kahle nedokhumenti yakho kamazisi.\n4. Uma i-akhawunti ivaliwe, vula entsha egameni lakho.\n5. Ngena kuphothali esemthethweni ye-SASSA futhi ubuyekeze ngokuphephile imininingwane yakho yasebhange."
      },
      {
        "title": "Ukubuyisela akufani nokubambezeleka",
        "body": "Inkokhelo ebambezelekile idinga isineke. Inkokhelo ebuyisiwe idinga isenzo. Uma imali ibuyile, i-SASSA ngeke iphinde izame kuze kube yilapho uhlinzeka ngemininingwane yasebhange emisha, esebenzayo."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubona ukuthi kungani ibhange lakho elithile linqabe inkokhelo. Kufanele uxhumane nebhange lakho ngokuqondile ukuze uqonde ibhulokhi."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Siyakuqondisa ukuthi ungayibuyekeza kanjani ngokuphephile imininingwane yakho yasebhange ye-SASSA ngemva kokubhampa kwenkokhelo, ukuze ukwazi ukubuyisela imali yakho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/how-to-fix-missing-payment-issues\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe ukuthunyelwa emuva kusho okufanayo nokubambezeleka?",
        "body": "Cha. Ukubuyiselwa kusho ukuthi inkokhelo yehlulekile ebhange futhi kudinga ukuthi ulungise imininingwane yakho."
      },
      {
        "title": "I-FAQ: Hlobo luni lwamagama okufanele ngilubuke?",
        "body": "Buka amagama afana ne-'Returned', 'Failed', 'Reversed', noma 'Banking Details Issue'."
      },
      {
        "title": "I-FAQ: Kungani ugcine amagama?",
        "body": "Ngakho wazi kahle ukuthi yini okufanele uyitshele ihhovisi le-SASSA noma ibhange lakho lapho ucela usizo."
      }
    ]
  },
  "what-to-do-if-payment-was-returned": {
    "title": "Okufanele ukwenze uma inkokhelo ibuyiswa",
    "summary": "Umhlahlandlela wesinyathelo ngesinyathelo sokuthola uma i-SASSA izama ukukukhokhela, kodwa imali ibuya isuka ku-akhawunti yakho yasebhange.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo yakho ibuyisiwe, kufanele uhlole ngokushesha ibhange lakho ukuze uthole ukuthi kungani i-akhawunti ivinjiwe, bese ubuyekeza imininingwane yakho kuphothali esemthethweni ye-SASSA."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-SASSA ayizange inqabe imali yakho yesibonelelo. Bayithumele imali, kodwa ibhange lakho's system said 'No'. Lokhu kwenzeka kaningi ngama-akhawunti angasebenzi noma ama-akhawunti afinyelele umkhawulo wawo wokufaka imali."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma imali ibuyiswa, i-SASSA ikubambele yona ngokuphephile. Kodwa-ke, ngeke ukhokhelwe kuze kube yilapho inkinga yasebhange isixazululiwe ngokuphelele futhi iqinisekiswa, okungathatha amasonto."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungathuki—imali yakho ayilahleki, isanda kumiswa.\n2. Vakashela igatsha lakho lasebhange ubabuze ukuthi kungani ukudluliswa kwe-SASSA kungabhampa.\n3. Lungisa inkinga ye-akhawunti noma uvule i-akhawunti entsha evamile yokonga.\n4. Ngena kuwebhusayithi esemthethweni ye-SASSA bese ulayisha imininingwane emisha yasebhange.\n5. Linda i-SASSA ukuze uqinisekise i-akhawunti entsha ngaphambi kokuba bazame ukukhokha futhi."
      },
      {
        "title": "Gxila ebhange, hhayi isicelo",
        "body": "Isicelo sakho silungile. Inkinga indawo oya kuyo. Kuze kube yilapho unikeza indlela ecacile, yokusebenza ukuze imali ihambe, izohlala iphephile ku-SASSA."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "Ungalokothi unikeze imininingwane yakho yasebhange emisha ku-'agent' noma othile othembisa ukulungisa lokhu ku-WhatsApp. Zilayishe kuphela kuwebhusayithi esemthethweni ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikudlulisa eziteshini ezifanele, ezisemthethweni ukuze ubuyekeze imininingwane yakho yasebhange ukuze imali yakho iyeke ukubhampa futhi iqale ukuqedwa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/why-payment-is-delayed\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngilinde uma inkokhelo ibuyiswa?",
        "body": "Cha. Inkokhelo ebuyisiwe isho ukuthi imininingwane yasebhange yehlulekile. Kufanele uthathe isinyathelo ukuze uzilungise."
      },
      {
        "title": "I-FAQ: Ingabe ukubuyiselwa kusho ukuthi isicelo senqatshiwe manje?",
        "body": "Cha. Isibonelelo sakho sisavunyiwe, kodwa imali ayikho indawo ephephile ukuthi ingahlala kuyo."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola nebhange lakho ukuze uqinisekise ukuthi i-akhawunti yakho iyasebenza futhi isegameni lakho ngqo."
      }
    ]
  },
  "how-payment-batches-can-cause-delays": {
    "title": "Ukuthi amaqoqo okukhokha angadala kanjani ukubambezeleka",
    "summary": "Kungani umngane wakho ekhokhelwa ngaphambi kwakho, nokuthi uhlelo olukhulu lokucubungula iqoqo lwe-SASSA lusebenza kanjani ngempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-SASSA ikhokha izigidi zabantu ngokuthumela imali ngamaqoqo amakhulu. Ngisho noma wena nomakhelwane wakho ninesibonelelo esifanayo, izinkokhelo zakho zingase zicutshungulwe ngamahora noma izinsuku ngokuhlukana."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uhlelo lwamabhange alukwazi ukucubungula izinkokhelo eziyizigidi eziyishumi ngomzuzwana owodwa ngaphandle kokuphahlazeka. Ngakho-ke, i-SASSA iwahlukanisa ngamaqembu (amaqoqo). Ukuba seqenjini lakamuva akusho ukuthi inkokhelo yakho yehlulekile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukuqhathanisa isikhathi sakho sokukhokha nesomunye umuntu kuyindlela esheshayo yokuzibangela ukwethuka okungadingekile. Ukuthi umfowenu uthole i-SMS yakhe ngo-8 AM akusho ukuthi inkokhelo yakho ka-2 PM yephukile."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Yeka ukuqhathanisa isikhathi sakho esiqondile sokukhokha nabanye abantu.\n2. Hlola idethi yokukhokha ye-SASSA esemthethweni yohlobo lwakho lwesibonelelo.\n3. Qonda ukuthi ukucubungula kuqala kusukela ekuseni kuze kube kusihlwa.\n4. Nikeza isistimu usuku olugcwele lokucubungula iqoqo lakho elithile.\n5. Qala ukukhathazeka kuphela uma inkokhelo yakho ingabonisi amahora angu-48 ngemva kwedethi yokukhishwa."
      },
      {
        "title": "Kungani ukuqhathanisa kubangela ukwethuka",
        "body": "Inkokhelo yakho ixhunywe ku-ID yakho ethile kanye nenhlanganisela yebhange. Iseqenjini layo. Ungacabangi ukuthi inkinga ikhona ngoba useqenjini lakamuva."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukukutshela kahle ukuthi iyiphi inqwaba yenkokhelo yakho. Sinikeza lolu lwazi ukuze sikusize ulawule okulindele ngokuzola."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza ukuthi lezi zinhlelo zamabhange ezinkulu zisebenza kanjani ngemuva, ukuze uqonde ukuthi ukubambezeleka okuncane kuyinto evamile ngokuphelele."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/why-payment-is-delayed\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe isikhathi seqoqo singenza umuntu oyedwa akhokhelwe ngaphambi komunye?",
        "body": "Yebo, lokhu kujwayelekile ngokuphelele futhi kwenzeka njalo ngenyanga eyodwa."
      },
      {
        "title": "I-FAQ: Ingabe ukukhokha kancane njalo kusho inkinga?",
        "body": "Cha. Kusho ukuthi ubekwe eqeqebeni lokucubungula kamuva losuku."
      },
      {
        "title": "I-FAQ: Kunini lapho kufanele ngikhathazeke kakhulu?",
        "body": "Kuphela uma sekudlule amahora webhizinisi angama-48 kusukela ngedethi yokukhokha futhi ungakabi nalutho."
      }
    ]
  },
  "what-weekends-and-holidays-can-do-to-payments": {
    "title": "Yiziphi izimpelaviki namaholide angakwenza ukuze ukhokhe",
    "summary": "Ukuthi izimpelaviki kanye namaholide omphakathi akumisa kanjani inkokhelo yakho ohlelweni lwamabhange, nokuthi kungani ungathuki.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Amabhange awakucubunguli ukudluliswa kwezimali nge-elekthronikhi ngamaSonto noma ngamaholide. Uma i-SASSA ikhipha inkokhelo yakho ngoLwesihlanu ntambama, cishe uzobona kuphela imali ngoMsombuluko noma ngoLwesibili."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uhlelo lwamabhange lunamahora okusebenza. Inkokhelo ethunyelwa ngaphandle kwalawo mahora ifakwa kulayini. Alilahleki; isaphumula kuze kube yilapho uhlelo lokusula lwebhange luphinde lukhanyise."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izigidi zabantu ziyatatazela lapho usuku lomholo lwangoLwesihlanu luba ne-akhawunti yasebhange yangempelasonto engenalutho. Ukwazi ukuthi amabhange amise okwesikhashana ukucubungula ngempelasonto kukusindisa ekucindezelekeni okukhulu."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka ikhalenda ukuze ubone ukuthi usuku lwakho lokuhola lungoLwesihlanu noma ngempelasonto.\n2. Uma kwenzeka, lindela ukuthi imali ibonakale kusenesikhathi ngesonto elilandelayo.\n3. Ungamoshi isikhathi somoya ngokuhlola ibhalansi yakho ngokuphindaphindiwe ngeSonto.\n4. Linda kuze kube uMsombuluko ntambama ngaphambi kokuba ukhathazeke.\n5. Isici samaholide, nawo asebenza njengeSonto lokucutshungulwa kwebhange."
      },
      {
        "title": "Iwashi lasebhange liyaphumula ngezimpelasonto",
        "body": "I-SASSA ingase ivuleke 24/7 ku-inthanethi, kodwa izinhlelo ezijwayelekile zokusula amabhange azinjalo. Uma inkokhelo yakho ifika ebhange ngempelasonto, ilinda emgqeni kuze kube uMsombuluko."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukuphoqa ibhange lakho ukuthi licubungule imali ngempelasonto. Lona umthetho wamabhange waseNingizimu Afrika osebenza kuwo wonke umuntu."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi ubikezele ukuthi ikhalenda lizoluthinta kanjani usuku lwakho lokukhokhelwa lomhlaba wangempela, likuvumela ukuthi uhlele ibhajethi yakho ngaphandle kokukhathazeka ngempelasonto."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-when-funds-should-show\n• /guides/what-payment-released-means\n• /guides/what-to-do-if-payment-arrives-later-than-expected\n• /guides/why-payment-is-delayed\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe impelasonto ingalibazisa inkokhelo ebonakala isikhishiwe?",
        "body": "Yebo. Inkokhelo iyakhululwa, kodwa uhlelo lwebhange lumiswe okwesikhashana ngempelasonto."
      },
      {
        "title": "I-FAQ: Ingabe ukubambezeleka kweholide kusho ukuthi inkokhelo yehlulekile?",
        "body": "Cha. Kusho ukuthi abasebenzi basebhange kanye nezinhlelo basuke bengekho emsebenzini."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise nekhalenda?",
        "body": "Ngaso sonke isikhathi hlola ukuthi usuku lwakho lokuhola lwe-SASSA luthinta uLwesihlanu, uMgqibelo, iSonto, noma iholidi lomphakathi."
      }
    ]
  },
  "how-to-read-payment-notes-on-date-pages": {
    "title": "Ungawafunda kanjani amanothi okukhokha emakhasini edethi",
    "summary": "Kungani amanothi amancane eduze nezinsuku zokukhokha ze-SASSA ngokuvamile ebaluleke kakhulu kunosuku ngokwalo, nokuthi afundwa kanjani.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Izinsuku zokukhokha zivame ukuza namanothi afana ne-'Estimated', 'Pending Verification', noma 'Excludes SRD'. Uma uziba inothi, ungase uthembe idethi engasebenzi kuwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Idethi iyodwa iyinombolo nje. Inothi likutshela uma lolo suku luyisithembiso esiqinisekiswa ngo-100%, noma ukuqagela nje okufundisiwe yisistimu okusekelwe emigqeni yesikhathi evamile."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Imbangela enkulu ye-SASSA ukukhungatheka ukulindela imali ngedethi ebhalwe ngokucacile ukuthi 'Estimated'. Ukufunda imibhalo emihle kukusindisa ekuyeni ebhange ukuze uthole inkokhelo engaqinisekisiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka usuku lokukhokha ku-portal ye-SASSA noma isimiso esisemthethweni.\n2. Funda umbhalo ngokuqondile ngaphansi noma eceleni kosuku.\n3. Hlola ukuthi ithi 'Published' (Kuqinisekisiwe) noma 'Expected' (Qagela).\n4. Qinisekisa ukuthi usuku lusebenza ngokusobala ohlotsheni lwakho oluthile lwesibonelelo.\n5. Amadethi okuthenjwa kuphela aqinisekiswa ngaphandle kwezixwayiso noma imibandela."
      },
      {
        "title": "Inothi lishintsha incazelo yedethi",
        "body": "Ungagcini nje ngokuthwebula idethi bese uyabelana ngayo. Inothi elinamathiselwe kuyo yilona elikutshela ukuthi kuphephe kangakanani ukusebenzisa imali ongakayitholi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare igqamisa lawa manothi ukuze ungabanjwa, kodwa asiwadali amadethi. I-SASSA kuphela engaphothula uhlelo lokukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi ungawafunda kanjani amashejuli asemthethweni ukuze ungalokothi wenze iphutha idethi ye-'Expected' ngosuku lokukhokha oluqinisekisiwe."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates\n• /guides/where-to-confirm-payment-problems-officially"
      },
      {
        "title": "I-FAQ: Kungani inothi ekhasini lokukhokha libaluleke kangaka?",
        "body": "Ngoba ikutshela uma usuku luyisithembiso esiqinisekisiwe noma isilinganiso nje."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe idethi ekopishiwe ngaphandle kwenothi?",
        "body": "Ungalokothi. Abakhwabanisi bavamise ukukhipha amanothi esixwayiso lapho babelana ngezinsuku ezingamanga ku-WhatsApp."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyibheke encwadzini?",
        "body": "Bheka amagama afana ne-'Estimated', 'Confirmed', 'Expected', noma amagama athile ezibonelelo."
      }
    ]
  },
  "what-to-do-if-payment-ready-but-not-reflecting": {
    "title": "Okufanele ukwenze uma inkokhelo isilungile kodwa ingabonisi",
    "summary": "Okufanele ukwenze uma i-SASSA ithi inkokhelo yakho isilungile, kodwa i-akhawunti yakho yasebhange isangenalutho ngokuphelele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo yakho ithi 'Ready' kodwa ingabonisi, linda amahora angu-48 ukuze uthole ukukhishwa kwebhange. Uma ingakabonakali, hlola ukuthi i-akhawunti yakho yasebhange ivinjiwe noma ayisebenzi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "I-SASSA ifake imali emnyango, kodwa ayikangeni ku-akhawunti yakho yasebhange. Ukubambezeleka kuhlale kuhlangothi lwasebhange, hhayi ohlangothini lwe-SASSA."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma abantu bebona i-'Ready' kodwa bengenayo imali, bavele bacabange ukuthi baqoliwe noma bagetshengiwe. Ngokuvamile, ibhange limane licubungula ukudluliselwa, noma i-akhawunti yakho idinga isibuyekezo esisheshayo se-FICA."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thatha isithombe-skrini somlayezo we-'Payment Ready'.\n2. Linda amahora ebhizinisi angu-48 agcwele (ungazinaki izimpelasonto).\n3. Hlola uhlelo lwakho lokusebenza lwasebhange ukuze ubone ukuthi i-akhawunti yakho iyasebenza futhi iyayamukela yini imali efakwayo.\n4. Shayela ibhange lakho futhi ubuze ukuthi kukhona yini ukudluliselwa okungenayo okulindile.\n5. Yiya ku-SASSA kuphela uma ibhange lakho liqinisekisa ukuthi liyinqabile inkokhelo."
      },
      {
        "title": "Ukulungele kusho okulungiselelwe, akulethiwe",
        "body": "Cabanga nge-'Ready' njengepizza ehlezi phezu kwekhawunta. Kuyaphekwa futhi kufakwe ebhokisini, kodwa umshayeli wokulethwa (ibhange) usadinga isikhathi sokukuletha endlini yakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubona ibhalansi yakho yasebhange noma iphoqelele ibhange lakho ukuthi lisule izimali ngokushesha. Singakutshela kuphela izikhathi zokulinda ezijwayelekile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi uyeke ukwethuka ngokukuchazela izinyathelo eziqondile ongazithatha uma imali yakho ye-SASSA ibambekile endleleni yokuhamba phakathi kukahulumeni nebhange lakho."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-released-means\n• /guides/how-to-know-when-funds-should-show\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/how-to-fix-missing-payment-issues"
      },
      {
        "title": "I-FAQ: Ingabe inkokhelo isilungile kusho ukuthi imali kufanele isivele isivele?",
        "body": "Cha. I-'Ready' isho ukuthi i-SASSA isiyilungisile, kodwa ukususa amabhange kusathatha isikhathi."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphandle kwamagama?",
        "body": "Hlola i-akhawunti yakho yasebhange ukuze uqinisekise ukuthi iyasebenza futhi ayimiswa ngenxa yemithetho ye-FICA."
      },
      {
        "title": "I-FAQ: Iyeka nini ukubonakala ijwayelekile?",
        "body": "Uma imali ingabonisi ngemva kwezinsuku ezigcwele zebhizinisi ezingu-3, ​​udinga ukuxhumana nebhange lakho."
      }
    ]
  },
  "how-to-check-payment-method-before-pay-date": {
    "title": "Uyibheka kanjani indlela yokukhokha ngaphambi kwedethi yokukhokha",
    "summary": "Ukuthi ukuhlola imininingwane yakho yasebhange *ngaphambi* kosuku lokukhokha kungakonga kanjani ekuhlulekeni kwenkokhelo yenyanga yonke.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Hlala ungena ngemvume kuphothali ye-SASSA isonto ngaphambi kosuku lokuhola ukuze uqinisekise ukuthi imininingwane yakho yasebhange isasebenza futhi iqinisekisiwe. Ukubamba iphutha kusenesikhathi kuvimbela inkokhelo yakho ekubhampini."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu abaningi babheka kuphela imininingwane yabo yasebhange *ngemuva kokuba* imali yabo ingafiki. Ngaleso sikhathi, inkokhelo isiyehlile, futhi ukuyilungisa kuthatha amasonto. Ukuhlola kusengaphambili okusheshayo kugwema ngokuphelele leli phupho elibi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Inkokhelo ebhanseliwe isho ukuthi ngeke uyithole imali yakho kule nyanga. Uma i-akhawunti yakho yasebhange ivaliwe ngenxa yokungasebenzi, noma uma ushintshe isibongo sakho, i-SASSA izokwala ukudluliselwa."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ngena kuphothali esemthethweni ye-SASSA okungenani izinsuku ezingu-7 ngaphambi kosuku lwakho lokuhola.\n2. Zulazulela esigabeni 'Banking Details'.\n3. Qinisekisa ukuthi inombolo ye-akhawunti yakho yamanje ilungile futhi imakwe ngokuthi 'Active'.\n4. Uma imininingwane iyiphutha, yibuyekeze ngokushesha.\n5. Ungenzi izinguquko uma imininingwane ilungile—izibuyekezo ezingadingekile zibangela ukubambezeleka."
      },
      {
        "title": "Ukuvimbela kungcono kunokulinda",
        "body": "Ukuhlolwa kwemizuzu emi-2 namuhla kungakongela izinsuku ezingu-30 zokulinda. Qiniseka ukuthi i-'pipe' icacile ngaphambi kokuthi i-SASSA izame ukuthumela amanzi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikukhumbuza ukuthi uhlole imininingwane yakho, kodwa kufanele wenze izibuyekezo zangempela kuphothali kahulumeni ye-SASSA evikelekile, esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza kahle ukuthi yini okufanele uyibheke lapho uqinisekisa imininingwane yakho yasebhange ukuze ungaqalisi ngephutha isexwayiso sokukhwabanisa ngokushintsha izinto kaningi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/banking-details-pending-meaning\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/how-banking-details-updates-work\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Kungani ubheka indlela yokukhokha ngaphambi kosuku lokukhokha?",
        "body": "Ngoba uma uthola iphutha kusenesikhathi, ungalilungisa ngaphambi kokuthi inkokhelo iqhume."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqhubeke ngihlela imininingwane yasebhange ngaphambi nje kokukhokha?",
        "body": "Ungalokothi. Zihlele kuphela uma zinephutha ngempela. Ukuzihlela kuqalisa kabusha inqubo yokuqinisekisa."
      },
      {
        "title": "I-FAQ: Iluphi uphawu oluyinhloko okufanele ulubuke?",
        "body": "Qiniseka ukuthi ibhange lakho seliyisebenzisile muva nje't closed your account because you haven't."
      }
    ]
  },
  "how-to-track-payment-dates-without-rumours": {
    "title": "Ungawalandela kanjani amadethi okukhokha ngaphandle kwamahemuhemu",
    "summary": "Ungakuyeka kanjani ukuwela ngezinsuku zokukhokha ze-SASSA ezingamanga ku-WhatsApp naku-Facebook, nokuthi ungazithola kuphi ezangempela.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ungalokothi uthembe idethi yokukhokha evela kokuthunyelwe okungahleliwe kwenkundla yezokuxhumana. Njalo qinisekisa izinsuku usebenzisa ingosi esemthethweni ye-SASSA, ama-akhawunti abo enkundla yezokuxhumana aqinisekisiwe, noma ukukhishwa kwezindaba okuthembekile kukahulumeni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abakhohlisi nabalimi abasebenzisanayo bahlale bethumela i-'Urgent SASSA Payment Dates' yomgunyathi ukuze bathole ukuchofoza. Ukuthembela kula mahemuhemu kuzokushiya umile ku-ATM engenalutho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amadethi mbumbulu adala ukulimala kwezimali kwangempela. Ungase uboleke imali olindele ukukhokhwa ngoLwesibili, uthole ukuthi usuku lwangempela uLwesihlanu. Njalo qinisekisa umthombo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ziba izithombe-skrini zezinsuku ezithunyelwe ngamaqembu e-WhatsApp ngaphandle kwesixhumanisi.\n2. Iya ngqo kuwebhusayithi esemthethweni ye-SASSA (sassa.gov.za).\n3. Hlola amakhasi abo e-Twitter (X) aqinisekisiwe (X) noma e-Facebook ukuze uthole imininingwane esemthethweni.\n4. Qhathanisa amadethi ngohlobo lwakho oluthile lwesibonelelo (isb., Abantu Abadala vs SRD).\n5. Hlela ibhajethi yakho ngosuku oluqinisekisiwe, hhayi amahlebezi."
      },
      {
        "title": "Uma singekho isixhumanisi esisemthethweni, amahemuhemu",
        "body": "Isheduli yokukhokha yeqiniso ihlala ishicilelwa yi-SASSA ngokuqondile. Uma othile abelana ngedethi kodwa engakwazi ukunikeza isixhumanisi esisemthethweni se-SASSA, ungayethembi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ishicilela izinsuku ezisuselwe *kuphela* ekukhishweni okusemthethweni kwe-SASSA. Asizisunguli izinsuku noma sisabalalisi amahlebezi omphakathi angaqinisekisiwe."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi ungalubona kanjani uhlelo lwe-SASSA olungamanga ukuze uzivikele wena nomphakathi wakho ekucindezelekeni okungadingekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-understand-payment-dates\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /payment-dates\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani amahlebezi ezinsuku zokukhokha eyingozi?",
        "body": "Ngoba zenza ukuthi uhambe uye ebhange ngosuku olungalungile, uchithe imali yakho yokuthutha."
      },
      {
        "title": "I-FAQ: Yini ephephe ngaphezu kwesithombe-skrini?",
        "body": "Isixhumanisi esiqondile esiya kuwebhusayithi kahulumeni ye-SASSA esemthethweni noma ikhasi labo lenkundla yezokuxhumana eliqinisekisiwe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqinisekise izinsuku ezingaqinisekile ngokusemthethweni?",
        "body": "Yebo. Uma idethi ithi 'Expected', kufanele uqhubeke ubheka ingosi esemthethweni ize iqinisekiswe."
      }
    ]
  },
  "what-to-do-if-payment-date-passed-with-no-update": {
    "title": "Okufanele ukwenze uma usuku lokukhokha ludlula ngaphandle kokubuyekezwa",
    "summary": "Umhlahlandlela ozolile wokuthi yini okufanele uyenze uma usuku lwakho lokukhokha olusemthethweni selufikile futhi lwadlula, kodwa imali yakho isekhona.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma usuku lwakho lokukhokha ludlule ngaphandle kwemali, ungathuki. Okokuqala, hlola ukuthi ingabe idethi bekuyi-'Expected' noma i-'Confirmed'. Bese, hlola amaphutha ebhange noma ukubambezeleka kwempelasonto."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Idethi ephasisiwe izwakala kabi, kodwa akuvamile ukukhansela ngokuphelele. Ngokuvamile, kusho ukuthi inkokhelo yakho iphushelwe eqoqweni lokucubungula kamuva, noma ibhange lakho liyinqabele idiphozi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukuphuthuma ehhovisi le-SASSA ekuseni ngemva kwedethi ephuthelwe ngokuvamile kuwukuchitha isikhathi. Izinkokhelo eziningi sekwephuzile ziyazixazulula emahoreni angu-48 noma zidinga isibuyekezo esilula sasebhange."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi usuku oludlulile bekuyisimo sakho sokukhokha's official payday.\n2. Log into the portal and read your current 'Qiniso' word-for-word.\n3. Check if the status says 'Ibuyiswe' or 'Yehlulekile' (which requires action).\n4. If it still says 'Ivunyiwe' or 'Qikiwe', linda amahora angu-48 ebhizinisi.\n5. Uma imali isashoda ngemva kwezinsuku ezi-3, khuphuka usebenzise inombolo yamahhala ethi SASSA."
      },
      {
        "title": "Ukukhokha sekwephuzile akuyona inkokhelo ekhanseliwe",
        "body": "Idethi iyinhloso, akusona isiqinisekiso. Uma idethi idlula, isistimu isazama ukukukhokhela. Udinga nje ukuthola ukuthi yini eyenza ukubambezela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi uhlole ukuthi kungani inkokhelo yephuzile, kodwa asikwazi ukufinyelela uhlelo lwe-SASSA ukuze siphoqelele ukukhokha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihamba nawe ezinyathelweni zokuxazulula inkinga ukuze wazi kahle ukuthi kufanele yini ulinde, shayela ibhange lakho, noma uthinte i-SASSA."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-a-payment-date-is-still-current\n• /guides/why-payment-is-delayed\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-read-payment-notes-on-date-pages\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe idethi yokuphasiswa ihlala isho ukuthi inkokhelo yehlulekile?",
        "body": "Cha. Ngokuvamile kusho ukuthi ibhange lithatha isikhathi eside ukucubungula ukudluliselwa."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole kuqala?",
        "body": "Hlola ukuthi idethi ephasisiwe bekungoLwesihlanu yini, okusho ukuthi kufanele ulinde kuze kube uMsombuluko."
      },
      {
        "title": "I-FAQ: Kufanele ngenyuke nini ngokusemthethweni?",
        "body": "Uma sekudlule izinsuku zebhizinisi ezi-3 futhi isimo sakho sephothali singakashintshi ukuze sibe 'Returned' noma 'Failed'."
      }
    ]
  },
  "how-to-know-if-a-payment-date-is-still-current": {
    "title": "Ungazi kanjani ukuthi idethi yokukhokha isengamanje",
    "summary": "Ungazi kanjani uma isithombe-skrini sedethi yokukhokha ku-Facebook siyisibuyekezo esisha noma amahemuhemu agaywe kabusha angonyaka odlule.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Idethi yokukhokha ingeyamanje kuphela uma ungangena kuphothali ye-SASSA namuhla futhi uzibonele yona, noma uma ithunyelwe ezinkundleni zokuxhumana eziqinisekisiwe ze-SASSA kuleli sonto."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Abantu bavame ukwabelana ngamashejuli okukhokha amadala ezinyanga noma iminyaka edlule, bethi masha. Lokhu kubangela ukudideka okukhulu futhi kwenza abantu balindele imali ngezinsuku ezingafanele."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uthembele kusithombe-skrini esivela eqenjini le-Facebook, ungase ume kulayini wasebhange amahora angu-4 ukuze uthole inkokhelo engafanele ikhokhwe kuze kube iviki elizayo. Njalo qinisekisa ubusha."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungalokothi uthembe isithombe-skrini sedethi engenaso isixhumanisi esinamathiselwe kuso.\n2. Iya kuwebhusayithi esemthethweni ye-SASSA (sassa.gov.za).\n3. Hlola inyanga ebhalwe ohlelweni—ingabe iyinyanga kanye nonyaka wamanje?\n4. Ngena ku-portal yakho ye-SASSA ukuze ubone usuku lwakho lomuntu siqu.\n5. Uma amadethi engafani, themba idethi yakho yephothali, hhayi isithombe-skrini."
      },
      {
        "title": "Izithombe-skrini zingaqamba amanga; i-portal ayifuni",
        "body": "Kuthatha imizuzwana emibili ukushintsha idethi esithombeni ngaphambi kokwabelana ngaso ku-WhatsApp. Akunakwenzeka ukwenza umgunyathi usuku olubonisiwe lapho ungena kuphrofayela yakho ye-SASSA."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ibuyekeza amakhalenda ayo okukhokha ngokuqondile ehhovisi lezindaba le-SASSA. Asilokothi sisebenzise amadethi amadala."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa ukuthi ungabheka kanjani amaqiniso ngokushesha ukuze ungalokothi ukhohliswe okuthunyelwe kwenkundla yezokuxhumana okugaywe kabusha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-payment-notes-on-date-pages\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/what-to-do-if-payment-date-passed-with-no-update\n• /payment-dates\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Ingabe isithombe-skrini esidala singenza idethi yokukhokha ibukeke ingeyamanje?",
        "body": "Yebo. Abakhwabanisi bahlala besebenzisa kabusha amadethi amadala ukuze bathole ukwabelana nokuthandwa ku-Facebook."
      },
      {
        "title": "I-FAQ: Yini eyenza idethi yokukhokha ibukeke ingeyamanje?",
        "body": "Kufanele ishicilelwe ngokucacile kuphothali esemthethweni ye-SASSA yenyanga yamanje."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngithembe usuku olungenayo inothi layo?",
        "body": "Cha. Ungalokothi uthembe idethi enqanyuliwe isuswe engqikithini yayo yasekuqaleni esemthethweni."
      }
    ]
  },
  "how-to-check-payment-readiness-for-r350-support": {
    "title": "Ungabheka kanjani ukulungela ukukhokha ukuze uthole ukwesekwa kwe-R350",
    "summary": "Ungahlola kanjani ukuthi imali yakho yesibonelelo ye-R350 SRD isikulungele ngempela ukukhokhelwa, ngaphandle kokudida i-'Approved' ne-'Paid'.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Ngomnikelo we-SRD, i-'Approved' isho nje ukuthi uphumelele ukuhlolwa kwezindlela. Inkokhelo yakho isilungile kuphela uma isimo sithuthukela ku-'Payment Released' ngedethi ethile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Isibonelelo se-SRD sidinga ukuhlolwa kwezindlela ezintsha njalo ngenyanga eyodwa. Ukuthi ugunyazwe ngoMeyi akusho ukuthi imali yakho isilungele ukuqoqwa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Izigidi zabazuzi be-R350 zibona i-'Approved' bese ziphuthuma esitolo ukuze zihoxe, bese zithola i-akhawunti engenalutho. Kufanele ulinde usuku oluqondile lwe-'Payday' ukuze lubonakale kuphrofayela yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ngena kuwebhusayithi ye-SRD (srd.sassa.gov.za) futhi uhlole inyanga yamanje.\n2. Uma ithi 'Approved', bheka inkundla 'Payday' ngaphansi kwayo.\n3. Uma inkundla ye-'Payday' ingenalutho, imali yakho ayikalungi.\n4. Linda usuku oluthile oluzovela kunkambu ye-'Payday'.\n5. Linda i-SMS, noma uvumele amahora angu-48 ngemva kwe-'Payday' ngaphambi kokuzama ukuhoxa."
      },
      {
        "title": "Ukugunyazwa kanye ne-Payday yizinto ezimbili ezihlukene",
        "body": "Uhlelo lwe-SRD lusebenza ngezinyathelo ezimbili. Isinyathelo 1: Bahlola ukuthi umpofu ngokwanele yini kule nyanga (Ukugunyazwa). Isinyathelo sesi-2: Bahlela ukudluliswa kwemali kwakho (I-Payday). Udinga kokubili."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukusheshisa i-SRD isho ukuhlola noma ukuphoqa i-SASSA ukuthi yabele usuku lokukhokha ngokushesha."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlaziya incazelo eqondile yayo yonke imilayezo yesimo ye-SRD ukuze uye esitolo kuphela uma imali yakho isikhona."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-read-r350-payment-status-safely\n• /guides/what-payment-pending-means\n• /guides/what-payment-released-means\n• /guides/payment-processing-meaning\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe ukulungela kuyafana nokugunyazwa kosekelo lwe-R350?",
        "body": "Cha. Ukugunyazwa kusho ukuthi uphumelele ukuhlolwa. Ukulungela kusho ukuthi imali isihleliwe."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyihlole ngaphandle kokugunyazwa?",
        "body": "Njalo hlola usuku lwe-'Payday' kuphothali yakho ye-SRD."
      },
      {
        "title": "I-FAQ: Ingabe i-GrantCare ingaqinisekisa ukukhishwa kwenkokhelo kwe-R350 esemthethweni?",
        "body": "Cha. Singakutshela ukuthi usifunde kanjani isimo, kodwa isayithi elisemthethweni le-SRD kuphela elihlinzeka ngosuku lwakho oluqondile lokukhokha."
      }
    ]
  },
  "what-payment-pending-means": {
    "title": "Kusho ukuthini ukukhokha okulindile",
    "summary": "Incazelo yolimi olulula yokuthi kungani inkokhelo yakho ithi 'Pending' nokuthi kungase kudingeke ulinde isikhathi esingakanani.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-'Payment Pending' isho ukuthi i-SASSA isacubungula ifayela lakho lale nyanga. Awukanqatshwa, kodwa imali yakho ayikahlelelwe ukukhululwa okwamanje."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Igumbi lokulinda elilindile. Ngokuvamile kusho ukuthi i-SASSA imatasa yenza amasheke avamile ku-ID yakho noma i-akhawunti yasebhange ngaphambi kokuba bacindezele inkinobho ukuthumela imali yakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Okulindile kungase kuzwakale kucindezeleke kakhulu ngoba akuyona i-'Yes' noma i-'No'. Kodwa ukuqonda ukuthi kuwukumisa okwesikhashana nje kokuphatha kukuvimbela ekwenzeni izinguquko ezingadingekile kuphrofayela yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qaphela ukuthi i-'Pending' ayikona ukunqatshelwa—isibonelelo sakho sisasebenza.\n2. Ungayishintshi imininingwane yakho yasebhange ngenkathi isimo sakho sisalindile (lokhu kubangela ukubambezeleka okwengeziwe).\n3. Linda izinsuku zebhizinisi ezi-3 kuya kwezi-5 bese uhlola iphothali futhi.\n4. Bheka ukuthi isimo sizoshintsha sibe 'Approved' noma 'Scheduled'.\n5. Uma ihlala Ilindile izinsuku ezingaphezu kweziyi-14, shayela ucingo lwamahhala lwe-SASSA."
      },
      {
        "title": "Okusalindile wukucabanga kwesistimu",
        "body": "Uma isimo silindile, isistimu yenza ukuhlola kwayo kwangemuva. Ukushintsha inombolo yakho yocingo noma imininingwane yasebhange khona manje kuzophoqa isistimu ukuthi iqale ukucabanga kabusha."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi 'un-pend' isimo sakho. Singakucebisa kuphela ngendlela ephephe kunazo zonke yokulinda ngaphandle kokubangela ukubambezeleka okwengeziwe."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi uqonde ukuthi isigaba se-'Pending' sivamise ukuthatha isikhathi esingakanani ukuze wazi ukuthi sekuyisikhathi sokukhuphuka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-scheduled-means\n• /guides/what-payment-not-yet-available-means\n• /guides/why-payment-is-delayed\n• /status/pending\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Ingabe inkokhelo elindile isho ukuthi inkokhelo yehlulekile?",
        "body": "Cha. Kusho ukuthi isistimu isahlola imininingwane yakho ngenkokhelo yale nyanga."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngiqhubeke ngishintsha imininingwane yami ngenkathi ngisalindile imibukiso?",
        "body": "Ungalokothi. Ukushintsha imininingwane yakho ngesikhathi kusalindile kuphoqa isistimu ukuthi iqale kabusha lonke isheke."
      },
      {
        "title": "I-FAQ: Yini okufanele okulindile iphenduke ibe ngokulandelayo?",
        "body": "Kufanele ekugcineni ishintshe ibe 'Approved' bese kuba 'Scheduled' noma 'Released'."
      }
    ]
  },
  "what-payment-hold-may-mean": {
    "title": "Ukuthi ukubanjwa kwenkokhelo okungase kusho ukuthini",
    "summary": "Kusho ukuthini uma i-SASSA ibeka i-'Hold' enkokhelweni yakho, kanye nezinyathelo okufanele uzithathe ukuze uyivule.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "I-'Payment on Hold' isho ukuthi i-SASSA imise imali yakho ngamabomu ngoba ibone inkinga. Lokhu ngokuvamile kungenxa yephutha lasebhange noma i-ID engaqinisekisiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukubamba kubi kakhulu kune-'Pending'. Okulindile kusho ukuthi 'wait'. Ukubamba kusho i-'stop'. Isistimu ithole ukungafani—njenge-akhawunti yasebhange evaliwe noma i-ID ephelelwe yisikhathi—futhi yakhiya izimali zakho ukuze kuvinjelwe ukukhwabanisa."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukubamba akusoze kwazilungisa. Uma uhlezi ulindile, awusoze wahola. Kufanele ukhombe inkinga futhi uthumele ulwazi olulungile ukuze uphakamise ukubamba."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ngena kuphothali yakho ye-SASSA bese ubheka noma yimiphi imilayezo yephutha eduze kwesimo se-'Hold'.\n2. Shayela ibhange lakho ngokushesha futhi ubuze ukuthi i-akhawunti yakho imisiwe noma ivaliwe.\n3. Hlola ukuthi inombolo yakho yocingo noma imininingwane ye-ID ishintshile muva nje.\n4. Buyekeza noma yimiphi imininingwane engalungile ngokuqondile kuphothali ye-SASSA.\n5. Linda i-SASSA ukuze uqinisekise imininingwane emisha, ezophakamisa ngokuzenzakalelayo ukubamba."
      },
      {
        "title": "Ukubamba kudinga ukuthi wenze okuthile",
        "body": "I-SASSA ibamba ukuze uvikele imali yakho ekubhampini noma ukuya kumuntu ongafanele. Kuyisici sokuvikela, hhayi isijeziso, kodwa kufanele unikeze ucezu lwendida olungekho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukususa ukubanjwa kwenkokhelo. Uhlelo olusemthethweni lwe-SASSA kuphela olungasusa ibhulokhi uma usunikeze ulwazi olulungile, oluqinisekisiwe."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Siyakuqondisa ukuthi usithola kanjani isizathu esiqondile sokubamba ukuze ukwazi ukulungisa imininingwane yakho yasebhange noma kamazisi ngokushesha nangokuphephile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-pending-verification-means\n• /guides/banking-details-pending-meaning\n• /guides/why-identity-verification-fails\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe ukubanjwa kwenkokhelo kubi kakhulu kunokulindile?",
        "body": "Yebo. Okulindile ukulinda okuvamile. Ukubamba kusho ukuthi isistimu ithole inkinga yase imisa inkokhelo."
      },
      {
        "title": "I-FAQ: Yiziphi izinhlobo zezinkinga ezingabangela ukubanjwa?",
        "body": "Ngokuvamile imininingwane yasebhange engalungile, i-akhawunti yasebhange efriziwe, noma ukuqinisekiswa kukamazisi okuhlulekile."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyenze kuqala?",
        "body": "Ngena kuphothali esemthethweni ye-SASSA ukuze ubone ukuthi bayakucela yini ukuthi ubuyekeze imininingwane yakho yasebhange."
      }
    ]
  },
  "how-to-fix-common-payment-release-problems": {
    "title": "Uzilungisa kanjani izinkinga ezijwayelekile zokukhishwa kwenkokhelo",
    "summary": "Umhlahlandlela wokuxazulula izinkinga wezizathu ezivame kakhulu ukugunyazwa kwenkokhelo yakho kodwa ungabonisi ebhange lakho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo yakho ibambekile, cishe njalo ibangelwa enye yezinto ezintathu: i-akhawunti yasebhange evaliwe, ukungafani kwegama phakathi kwe-ID yakho nebhange, noma ukubambezeleka kokucubungula ngempelasonto."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma inkokhelo ihluleka ukukhululwa, abantu bacabanga ukuthi lonke uhlelo luphukile. Eqinisweni, u-90% wezinkinga zokukhishwa zidalwa amaphutha amancane omphathi kuphrofayela yasebhange yomzuzi."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uzazi izizathu ezijwayelekile zokubambezeleka, ungazihlola ohlwini esikhundleni sokwethuka. Ukuthola iphutha eliqondile ukuphela kwendlela yokwenza imali yakho ihambe futhi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola ikhalenda: Ingabe impelasonto noma iholidi? Uma kunjalo, linda kuze kube uMsombuluko.\n2. Hlola ibhange lakho: Ingabe i-akhawunti yakho iyasebenza, noma ivalwe ngenxa yebhalansi enguziro?\n3. Hlola igama lakho: Ingabe igama eliku-akhawunti yakho yasebhange lihambisana kahle ne-ID yakho ye-SASSA?\n4. Hlola umkhawulo wakho: Ingabe i-akhawunti yakho yasebhange inomkhawulo wokuthi ingabamba malini?\n5. Lungisa iphutha elithile ngebhange lakho noma ingosi ye-SASSA."
      },
      {
        "title": "Thola isivimbamgwaqo esiqondile",
        "body": "Ungaqageli. Ungacabangi ukuthi SASSA 'forgot' wena. Kunesizathu esithile sobuchwepheshe sokuthi imali iyeke ukuhamba. Yithole, uyilungise, futhi imali izogeleza."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi uhlonze imbangela okungenzeka kakhulu yokubambezeleka kwakho, kodwa kufanele wenze izilungiso zangempela kuphothali kahulumeni esemthethweni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sihlinzeka ngohlu lokuhlola olulula lwamaphutha avamile ebhange nawomazisi ukuze uthole ngokushesha ukuthi kungani inkokhelo yakho ibambekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/why-payment-is-delayed\n• /guides/where-to-confirm-payment-problems-officially"
      },
      {
        "title": "I-FAQ: Iyiphi into yokuqala okumele uyibone?",
        "body": "Hlola ukuthi ingabe inkinga iyiphutha lasebhange, ukubambezeleka kwempelasonto, noma ukungqubuzana kwe-ID."
      },
      {
        "title": "I-FAQ: Kungani ukulungisa okukodwa kungasebenzi kuzo zonke izinkinga zokukhokha?",
        "body": "Ngoba i-akhawunti yasebhange efriziwe idinga ukulungiswa okuhlukile kunokulibaziseka kokucubungula ngempelasonto."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyigcine ngenkathi ngixazulula inkinga?",
        "body": "Gcina izithombe-skrini zengosi yakho ye-SASSA kanye nesitatimende sakho sasebhange ukuze ukwazi ukufakazela ukuthi imali ayifikanga."
      }
    ]
  },
  "what-to-do-if-payment-arrives-later-than-expected": {
    "title": "Okufanele ukwenze uma inkokhelo ifika ngemva kwesikhathi kunobekulindelekile",
    "summary": "Okufanele ukwenze uma inkokhelo yakho ifika, kodwa kwaba yizinsuku noma amasonto kamuva kuneshejuli esemthethweni ye-SASSA.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo yakho ifike sekwephuzile, hlola ukuthi ubuyekeze imininingwane yakho yasebhange muva nje, noma belikhona yini iholide lomphakathi. Ukukhokha sekwephuzile akusho ukuthi inyanga ezayo nayo izofika sekwephuzile."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Inkokhelo efike sekwephuzile ngokungavamile ngokuvamile ibangelwa umcimbi ophuma kanye—njengokuthuthukiswa kwesistimu ebhange lakho, iholide lomphakathi, noma isheke lokuqinisekisa mathupha kuphrofayela yakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abathola inkokhelo sekwephuzile bavame ukwethuka, becabanga ukuthi imali yabo yesibonelelo sishintshiwe unomphela noma yehlisiwe. Ngokuvamile, kwakumane kuyisiphithiphithi sesikhashana."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Qinisekisa ukuthi imali isisuliwe ngempela futhi iku-akhawunti yakho.\n2. Qaphela usuku efike ngalo uma kuqhathaniswa nohlelo olusemthethweni.\n3. Hlola ukuthi abekhona yini amaholide omphakathi noma ukugqagqana kwezimpelaviki.\n4. Hlola ukuthi usanda kushintsha inombolo yakho yocingo noma imininingwane yasebhange.\n5. Hlela isabelomali sakho ucabanga ukuthi ngenyanga ezayo izobuyela ohlelweni olujwayelekile."
      },
      {
        "title": "Ukuhlwa kanye akusho ukuthi sekwephuzile njalo",
        "body": "Inkokhelo eyodwa sekwephuzile ngokuvamile kuba inkinga yesikhashana. Ungacabangi ukuthi idethi yakho yokukhokha isishintshe unomphela ngaphandle kwalapho i-SASSA iyimemezela ngokusemthethweni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukubuyisela emuva inkokhelo noma ukuchaza isizathu esithile sobuchwepheshe sokubambezeleka okukhona kanye. Sinikeza izizathu ezivame kakhulu zokukunikeza ukuthula kwengqondo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza izizathu zokuphatha zokuthi kungani izinkokhelo ngezinye izikhathi zifika sekwephuzile, ukuze ungachithi unyaka wonke ukhathazeke ngokuthi kuzokwenzeka futhi."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-weekends-and-holidays-can-do-to-payments\n• /guides/how-payment-batches-can-cause-delays\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/what-to-do-if-payment-date-passed-with-no-update\n• /payment-dates"
      },
      {
        "title": "Imibuzo Evame Ukubuzwa: Ingabe ukukhokha sekwephuzile kusho ukuthi kukhona okungahambi kahle ngesibonelelo sami?",
        "body": "Cha. Ngokuvamile, kumane kuwukubambezeleka kwebhange noma ukucubungula ukucubungula kwaleyo nyanga ethile."
      },
      {
        "title": "I-FAQ: Ngabe ngenyanga ezayo nayo izofika sekwephuzile?",
        "body": "Akuvamile. Izinkokhelo eziningi ezifika sekwephuzile eziningi aziphindi ngaphandle uma kunenkinga yasebhange eqhubekayo."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngibike inkokhelo sekwephuzile esesifikile kakade?",
        "body": "Cha. Uma imali isisuliwe, inkinga isixazululekile."
      }
    ]
  },
  "how-to-read-payment-pages-and-status-pages-together": {
    "title": "Ungawafunda kanjani amakhasi okukhokha kanye namakhasi ezimo ndawonye",
    "summary": "Ungaluhlanganisa kanjani uhlelo lokukhokha lwe-SASSA nekhasi lakho lesimo somuntu siqu ukuze uthole isithombe esiphelele.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Isheduli yokukhokha ikutshela ukuthi *nini* imali ihamba ngokujwayelekile. Ikhasi lakho lesimo somuntu siqu likutshela *uma* imali yakho ethile ihamba. Udinga kokubili ukwazi usuku lwakho lokukhokha."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uhlelo lokukhokha lufana nohlelo lwezikhathi zebhasi—likutshela ukuthi ibhasi lihamba nini. Ikhasi lakho lesimo yithikithi lakho—likutshela ukuthi uvunyelwe yini kulelo bhasi kule nyanga."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu abaningi babheka ishejuli yokukhokha yomphakathi bese becabanga ukuthi bazokhokhelwa, bese bethola ukuthi isimo sabo siqu sasingu-'Pending'. Ukuhlola kokubili kukuvimbela ekwenzeni ukucabangela."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Bheka uhlelo olusemthethweni lwedethi yokukhokha ye-SASSA yenyanga.\n2. Thola usuku oluqondile olusohlwini lohlobo oluthile lwesibonelelo sakho.\n3. Ngena ku-SASSA SRD yakho siqu noma unikeze ingosi yakho.\n4. Hlola ukuthi isimo sakho siqu sithi 'Approved' noma 'Released' kuleyo nyanga efanayo.\n5. Uma isimo sakho sithi 'Pending', idethi yeshejuli yomphakathi ayisebenzi kuwe okwamanje."
      },
      {
        "title": "Uhlelo lusesidlangalaleni; isimo esomuntu siqu",
        "body": "Ungalokothi uthembe idethi yokukhokha yomphakathi ngaphandle kokuqinisekisa isimo sakho sokugunyaza kuqala. Idethi ayisho lutho uma ifayela lakho elithile lingagunyaziwe ukuthi likhishwe."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ihlinzeka ngamashejuli futhi ikufundise ukuthi usihlola kanjani isimo sakho, kodwa ingosi esemthethweni kuphela enedatha yakho yokugunyaza yesikhathi sangempela."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikubonisa indlela yokuphambanisa ikhalenda nephrofayela yakho yangempela, ukuze ungalokothi ulinde inkokhelo engakagunyazwa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /payment-dates\n• /status\n• /guides/how-to-understand-payment-dates\n• /guides/what-payment-status-check-means\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay"
      },
      {
        "title": "I-FAQ: Kungani ngidinga ukuhlola kokubili?",
        "body": "Ngoba ikhalenda libonisa usuku lomholo olujwayelekile, kodwa isimo sakho siyaqinisekisa ukuthi usohlwini ngempela yini."
      },
      {
        "title": "I-FAQ: Kuthiwani uma usuku seludlulile kodwa isimo sami sisalindile?",
        "body": "Kusho ukuthi awufakiwe kuleyo nqwaba yokukhokha, futhi kufanele ulinde isimo sakho ukuthi sibuyekezwe."
      },
      {
        "title": "I-FAQ: Iliphi ikhasi elibaluleke kakhulu?",
        "body": "Ikhasi lakho lesimo somuntu siqu lihlala linembe kakhulu esimweni sakho esithile."
      }
    ]
  },
  "how-to-check-if-a-missing-payment-is-just-a-delay": {
    "title": "Ungabheka kanjani ukuthi inkokhelo engekho iwukubambezeleka nje",
    "summary": "Ungabona kanjani ukuthi inkokhelo yakho elahlekile iwukubambezeleka okuvamile kokubhanga kwamahora angu-48, noma inkinga enkulu edinga isinyathelo.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Inkokhelo engekho ngokuvamile iwukubambezeleka kwasebhange uma sekungaphansi kwamahora angu-48 kusukela ngedethi yokukhokha esemthethweni. Uma sekudlule izinsuku ezi-3, kungase kube inkinga yangempela."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Sivamise ukusebenzisa igama elithi 'missing' uma siqonde 'delayed' ngempela. Izinkokhelo zangempela ezingekho (lapho kulahleka khona imali) ziyivelakancane kakhulu. Isikhathi esiningi, amakhompyutha ebhange asuke esebenza kancane."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uphatha ukubambezeleka okuvamile njengenkokhelo engekho, uzomosha amahora ushayela izintambo zosekelo ngaphandle kwesizathu. Ukwazi umehluko kongela isikhathi, i-airtime, kanye nengcindezi."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Hlola usuku lokukhokha olusemthethweni lwesibonelelo sakho esithile.\n2. Bala kahle ukuthi zingaki izinsuku zebhizinisi ezidlulile kusukela ngalolo suku.\n3. Uma kungaphansi kwamahora angu-48, kuwukubambezeleka okuvamile. Ungenzi lutho.\n4. Uma isimo sokukhokha sithi 'Returned' noma 'Failed', kuyindaba okufanele uyilungise.\n5. Uma sekudlule izinsuku ezi-3 futhi isimo sisathi 'Approved' noma 'Released', xhumana nebhange lakho."
      },
      {
        "title": "Ukubambezeleka akushoda",
        "body": "Inkokhelo ebambezelekile isendleleni. Inkokhelo engekho kusho ukuthi isistimu yehlulekile. Nikeza uhlelo lwamabhange amahora angu-48 ukwenza umsebenzi walo ngaphambi kokuthi imali isihambile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ikusiza ukuthi uhlole ukubambezeleka, kodwa asikwazi ukulandelela indawo ngqo yemali yakho ngaphakathi kwenethiwekhi yamabhange."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi wehlise umoya ngokukubonisa izikhathi ezijwayelekile zokudluliswa kwemali ebhange nge-elekthronikhi ukuze wazi kahle ukuthi ungaqala nini ukukhathazeka."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/why-payment-is-delayed\n• /guides/what-to-do-if-payment-was-returned\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-arrives-later-than-expected\n• /guides/how-to-fix-missing-payment-issues"
      },
      {
        "title": "I-FAQ: Kufanele ngilinde isikhathi esingakanani ngaphambi kokuyibiza ngenkokhelo engekho?",
        "body": "Linda okungenani amahora webhizinisi angama-48 kuye kwangama-72 ngemuva kwedethi yokukhokha esemthethweni."
      },
      {
        "title": "I-FAQ: Iyiphi inkomba enkulu yokuthi ukubambezeleka kuphela?",
        "body": "Idethi isanda kudlula, kodwa awukho umlayezo we-'Return' noma 'Failed' kuphothali yakho okwamanje."
      },
      {
        "title": "I-FAQ: Kufanele ngicabange nini ukuthi kunenkinga yangempela?",
        "body": "Uma isimo sishintshela kumlayezo wephutha ocacile, noma uma sihlala isikhathi eside singekho ngemva kwewindi lezinsuku ezi-3."
      }
    ]
  },
  "how-to-know-if-your-payment-method-is-blocking-release": {
    "title": "Ungazi kanjani ukuthi indlela yakho yokukhokha ivimba ukukhishwa",
    "summary": "Ungabona kanjani lapho i-akhawunti yakho yasebhange iyisizathu esiqondile i-SASSA ingakwazi ukukhipha izimali zakho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma isimo sakho sigunyaziwe kodwa ungakhokhelwa, hlola ukuthi i-akhawunti yakho yasebhange ithule, imisiwe, noma igama eliku-akhawunti lihlukile yini ku-ID yakho. Lezi zizovimba ukukhishwa."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uhlelo lwe-SASSA ngeke lukhiphe imali ku-akhawunti ebukeka isolisa noma ingasebenzi. Kuyisici sokuvikela ukumisa abakhwabanisi ukuthi bantshontshe imali yakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma indlela yakho yokukhokha ivimbela ukukhishwa, imali izohlala ku-SASSA unomphela. Kufanele ulungise i-'pipe' ngaphambi kokuthi amanzi akwazi ukugeleza."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ngena kuphothali yakho ye-SASSA bese ubheka i-'Banking Details Pending' noma izixwayiso ezifanayo.\n2. Hlola uhlelo lwakho lokusebenza lokubhanga ukuze uqinisekise ukuthi i-akhawunti yakho isebenza ngokugcwele.\n3. Qiniseka ukuthi umkhawulo we-akhawunti yakho yasebhange awukafinyelelwa (uvamile nama-akhawunti ayisisekelo).\n4. Qinisekisa ukuthi isipelingi esinembile segama lakho sifana no-SASSA kanye nebhange.\n5. Buyekeza imininingwane yakho yasebhange kuphothali ye-SASSA uma uthola amaphutha."
      },
      {
        "title": "I-SASSA ngeke ikhokhe i-akhawunti evinjiwe",
        "body": "Indlela yokukhokha evinjiwe iyisitobhi esiqinile. I-SASSA isilungile, kodwa umnyango wangaphambili webhange lakho ukhiyiwe. Uwena kuphela ongakwazi ukuyivula ngokubuyekeza imininingwane yakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ingakusiza ukuthi ubone laba bavimbi basebhange, kodwa kufanele uxhumane nebhange lakho ngokuqondile ukuze uvule i-akhawunti."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sinikeza uhlu lokuhlola olulula lwamaphutha ebhange ukuze ukwazi ukubona ngokushesha ukuthi i-akhawunti yakho iyisizathu esenza imali yakho ingafiki."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/banking-details-pending-meaning\n• /guides/what-to-do-if-your-bank-details-changed\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/what-to-do-if-payment-keeps-failing\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe i-akhawunti yasebhange endala ingamisa inkokhelo?",
        "body": "Yebo. Uma i-akhawunti ingasebenzi, ibhange lizokwenqaba ngokuzenzakalelayo ukudluliselwa kwe-SASSA."
      },
      {
        "title": "I-FAQ: Ngiyilungisa kanjani indlela yokukhokha evinjiwe?",
        "body": "Vakashela ibhange lakho ukuze uxazulule inkinga ye-akhawunti, bese ungena ngemvume ku-SASSA ukuze ubuyekeze imininingwane ngokuphephile."
      },
      {
        "title": "I-FAQ: Ingabe lokhu kusho ukuthi isibonelelo sami sikhanseliwe?",
        "body": "Cha. Isibonelelo sakho sisavunyiwe, kodwa imali ayinandawo engaya kuyo kuze kulungiswe i-akhawunti."
      }
    ]
  },
  "what-to-do-if-payment-keeps-failing": {
    "title": "Okufanele ukwenze uma inkokhelo ilokhu ihluleka",
    "summary": "Okufanele ukwenze uma inkokhelo yakho ye-SASSA yehluleka izikhathi eziningi, nokuthi ungawunqamula kanjani umjikelezo wokudluliswa kwemali okubhampisiwe.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma inkokhelo iqhubeka nokwehluleka, imininingwane yakho yasebhange kungenzeka ibangele ukuvinjwa unomphela. Kufanele uvakashele ibhange lakho ukuze uthole isitatimende sasebhange esigxivizwe, bese usilayisha kuphothali ye-SASSA."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukwehluleka okuphindaphindiwe kusho ukuthi uhlelo aluyona nje i-'glitching'. Kusho ukuthi ngaso sonke isikhathi i-SASSA izama ukuthumela imali, isistimu yebhange lakho iyayenqaba ngokuzenzakalelayo ngenxa yephutha elinzima ku-akhawunti yakho."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma uqhubeka ulindile, inkokhelo izolokhu ihluleka njalo ngenyanga. Kufanele wephule umjikelezo ngokufakazela ku-SASSA ukuthi une-akhawunti yasebhange entsha, esebenzayo, eqinisekisiwe."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Yeka ukulinda ukuthi imali ivele ngokuzumayo.\n2. Yiya egatsheni lebhange eliseduze nawe futhi ubuze ukuthi kungani ukudluliselwa kwezimali kubhampa.\n3. Lungisa udaba nebhange lakho, noma uvule i-akhawunti entsha ngokuphelele eyisisekelo.\n4. Cela ibhange incwadi enesitembu eqinisekisa imininingwane ye-akhawunti yakho entsha.\n5. Ngena kuphothali esemthethweni ye-SASSA futhi ubuyekeze imininingwane yakho yasebhange usebenzisa ulwazi olusha."
      },
      {
        "title": "Ukwehluleka okuphindaphindiwe yipayipi elivinjiwe",
        "body": "Cabanga nge-akhawunti yakho yasebhange njengepayipi. Uma ivinjiwe, i-SASSA ingaqhubeka nokuthela imali kuyo, kodwa izoqhubeka nokuchafaza emuva. Kufanele ulungise ipayipi."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayikwazi ukulungisa i-akhawunti yakho yasebhange. Kufanele usebenzelane ngokuqondile nebhange lakho ukuze uxazulule inkinga ye-akhawunti ngaphambi kokuthi i-SASSA ikukhokhele ngempumelelo."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sichaza ukuthi ungamisa kanjani umjikelezo wezinkokhelo ezibhampa ngokubuyekeza imininingwane yakho yasebhange ngokuphephile nangokusemthethweni."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-if-payment-was-sent-back\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-know-if-your-payment-method-is-blocking-release\n• /guides/what-to-do-if-payment-was-returned\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe ukwehluleka okuphindaphindiwe kuzilungisa?",
        "body": "Cha. Uma inkokhelo igxuma izikhathi eziningi, kufanele ubuyekeze imininingwane yakho yasebhange ukuze uyilungise."
      },
      {
        "title": "I-FAQ: Isiphi isizathu esivame kakhulu sokwehluleka okuphindaphindiwe?",
        "body": "I-akhawunti yasebhange evaliwe, noma igama eliku-akhawunti elingafani ne-ID yakho ye-SASSA."
      },
      {
        "title": "I-FAQ: Isinyathelo sami esilandelayo kufanele sibe yini?",
        "body": "Vakashela ibhange lakho ukuze ulungise i-akhawunti, bese ubuyekeza imininingwane yakho kuphothali esemthethweni ye-SASSA."
      }
    ]
  },
  "how-to-keep-records-of-payment-problems": {
    "title": "Ungawagcina kanjani amarekhodi ezinkinga zokukhokha",
    "summary": "Uzilandelela kanjani kahle izindaba zakho zokukhokha ze-SASSA ukuze ube nobufakazi obuqondile lapho udinga ukwenyuka.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Thatha njalo izithombe-skrini zengosi yakho ye-SASSA, ikakhulukazi uma izimo zishintsha. Bhala phansi amadethi aqondile nezikhathi ozihlolile, ukuze ukwazi ukwakha umugqa wesikhathi ocacile we-ejenti yosekelo."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Uma ushayela i-SASSA, uthi 'My money hasn't woza isikhathi eside' isn't kuyasiza. Ukuthi 'My status changed from Scheduled to Pending on the 14th of May' uthola imiphumela."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Amarekhodi amahle afakazela ukuthi awuqageli. Uma inkokhelo yakho yehla, ukuba nesithombe-skrini somlayezo wephutha wangempela kukusindisa kusukela ekuqaleni uphenyo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thatha isithombe-skrini njalo uma isimo sakho se-SASSA sishintsha.\n2. Qinisekisa ukuthi isithombe-skrini sikhombisa ngokusobala usuku kanye nenombolo yakho kamazisi.\n3. Bhala phansi noma yimiphi i-SMS noma izibuyekezo ze-imeyili ozithola zivela kwa-SASSA noma ibhange lakho.\n4. Gcina zonke izitatimende zakho zasebhange kusukela ezinyangeni ongazange ukhokhelwe ngazo.\n5. Nikeza lo mugqa wesikhathi oqondile kusikhulu se-SASSA uma udinga ukwenyuka."
      },
      {
        "title": "Ubufakazi amandla",
        "body": "Unganciki enkumbulweni yakho. Ezinhlelweni ezinkulu zikahulumeni, imigqa yesikhathi ebhaliwe ixazulula izinkinga ngokushesha kunezikhalazo ezingacacile."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iluleka ngokugcina amarekhodi, kodwa asilokothi sikucele ukuthi usithumelele izithombe-skrini zakho eziyimfihlo. Yabelana ngazo kuphela nabasebenzi abasemthethweni be-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa indlela yokuqoqa ubufakazi obufanele ukuze kuthi lapho ekugcineni ukhuluma nesikhulu, sikwazi ukulungisa inkinga yakho ngokushesha."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-to-do-if-payment-keeps-failing\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/how-to-fix-common-payment-release-problems\n• /guides/where-to-confirm-payment-problems-officially\n• /guides/how-grant-reminders-can-help"
      },
      {
        "title": "I-FAQ: Yini okufanele ngiyiqophe kuqala?",
        "body": "Qopha amagama aqondile kanye nosuku owakubona ngalo kuqala."
      },
      {
        "title": "I-FAQ: Kungani izithombe-skrini zisiza?",
        "body": "Banikeza ubufakazi obuqondile balokho okwashiwo yingosi ngaphambi kokuthi isimo sinyamalale noma sishintshwe."
      },
      {
        "title": "I-FAQ: Ingabe kufanele ngilandele izinguquko zemininingwane yasebhange futhi?",
        "body": "Yebo. Ukushintsha imininingwane yakho yasebhange kuyimbangela yokuqala yokubambezeleka kwezinkokhelo."
      }
    ]
  },
  "how-to-use-reminders-for-payment-readiness": {
    "title": "Ungazisebenzisa kanjani izikhumbuzi ukuze ulungele ukukhokha",
    "summary": "Ungalisebenzisa kanjani ikhalenda lefoni yakho ukulandelela inkokhelo yakho ye-SASSA ngaphandle kokugcizelela nsuku zonke.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Setha isikhumbuzi sekhalenda sosuku lwakho oluqondile lokukhokha, kanye nesinye amahora angama-48 kamuva. Hlola ibhalansi yakho yasebhange kuphela ngemva kokuba isikhumbuzi sesibili sivaliwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ukuhlola uhlelo lwakho lokusebenza lokubhanga izikhathi eziyishumi ngosuku ngeke kwenze imali ifike ngokushesha—kuzoqeda idatha yakho nempilo yakho yengqondo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Ukukhathazeka kuyakhula uma uhlezi ulindele i-SMS engase ibambezeleke uhlelo olukhulu lokucubungula iqoqo. Izikhumbuzi zikuvumela ukuthi usuke futhi uphile impilo yakho."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thola idethi yokukhokha ye-SASSA esemthethweni yohlobo lwakho lwesibonelelo.\n2. Setha isikhumbuzi efonini yakho se-8 AM ngalolo suku oluqondile.\n3. Setha isikhumbuzi sesibili samahora angu-48 kamuva (iwindi le-'clearance').\n4. Ungawanaki wonke amahemuhemu ezinkundleni zokuxhumana phakathi kwalezo zinsuku ezimbili.\n5. Thatha isinyathelo kuphela noma ukhathazeke uma isikhumbuzi sesibili sidlula ngaphandle kwemali."
      },
      {
        "title": "Lawula ukulinda, ungakuvumeli kukulawule",
        "body": "Uhlelo lwamabhange luzihambela ngokwalo ijubane. Ukubeka umngcele ngesikhumbuzi kukuvimbela ekubeni ugxile entweni ongakwazi ukuyisheshisa."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ihlinzeka ngezinsuku zokuthi usethe izikhumbuzi zakho, kodwa asikwazi ukukuthumelela i-SMS uma imali yakho siqu isiphelile."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi wakhe imikhuba yokulinda enempilo ukuze ungachithi isikhathi somoya ushayela ibhange njalo ngamahora ambalwa."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-grant-reminders-can-help\n• /payment-dates\n• /dashboard\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/how-to-know-when-funds-should-show"
      },
      {
        "title": "I-FAQ: Ingabe izikhumbuzi zisho ukuthi inkokhelo iqinisekisiwe?",
        "body": "Cha. Izikhumbuzi zivele zikuvimbe ekukhathazekeni nasekuhloleni nsuku zonke."
      },
      {
        "title": "I-FAQ: Yisiphi isikhathi esingcono kakhulu sesikhumbuzi?",
        "body": "Zibekele usuku lwangempela lokukhokha, bese kuthi ngemva kwamahora angu-48 uvumele ukugunyazwa kwebhange."
      },
      {
        "title": "I-FAQ: Ingabe izikhumbuzi zingasiza ekucindezelekeni?",
        "body": "Yebo. Bakunikeza imvume yokuyeka ukucabanga ngemali kuze kube yilapho isikhumbuzi sihamba."
      }
    ]
  },
  "what-to-do-if-payment-ready-message-disappears": {
    "title": "Okufanele ukwenze uma umlayezo olungile wokukhokha unyamalala",
    "summary": "Kungani isimo sakho se-'Payment Ready' sishabalala kungazelelwe, nokuthi empeleni kusho ukuthini ngemali yakho.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma isimo sakho se-'Payment Ready' sinyamalala, ungathuki. Ngokuvamile kusho ukuthi isistimu ibuyekezela inyanga entsha, noma inkokhelo isulwe ngokuphelele futhi umlayezo omdala ususiwe."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ingosi ye-SASSA iyisistimu ebukhoma. Imilayezo yesimo ayihlali lapho unomphela. Uma umjikelezo wokukhokha uphela, imilayezo emidala ifakwa kungobo yomlando ukuze kuvuleke indawo yenyanga elandelayo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Umlayezo onyamalalayo uzwakala sengathi inkokhelo ikhanseliwe. Eqinisweni, ngokuvamile kuwukuhlanza nje kokuphatha. Linda ukuze ubone ukuthi yimuphi umlayezo ozongena esikhundleni sawo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Ungacabangi ukuthi isibonelelo sakho sikhanseliwe ngoba umbhalo unyamalele.\n2. Hlola i-akhawunti yakho yasebhange ukuze ubone ukuthi imali ifikile ngempela umlayezo ungekho.\n3. Linda amahora angu-24 ukuze ingosi ye-SASSA iqedele ukubuyekezwa kwesistimu yayo.\n4. Ngena futhi ukuze ubone isimo esisha senyanga yamanje.\n5. Yinyuka kuphela uma isimo esisha sithi 'Failed' noma 'Declined'."
      },
      {
        "title": "Isikrini esingenalutho ngokuvamile siyisibuyekezo",
        "body": "Cabanga ngephothali njengebhodi. Ngezinye izikhathi kufanele basule ibhodi ngaphambi kokuba babhale isethi elandelayo yemiyalelo. Akuvamile ukukhansela."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ichaza ukuziphatha kwesistimu, kodwa asikwazi ukubuyisa umlayezo osusiwe kuphrofayela yakho yomuntu siqu ye-SASSA."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi uqonde ukuthi ingosi yedijithali isebenza kanjani ukuze isibuyekezo esilula singabangeli ukwethuka okungadingekile."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/what-payment-pending-means\n• /guides/what-payment-hold-may-mean\n• /guides/what-to-do-if-payment-ready-but-not-reflecting\n• /guides/how-to-fix-common-payment-release-problems\n• /status/banking-issue"
      },
      {
        "title": "I-FAQ: Ingabe umlayezo olungile onyamalele uhlala usho ukuthi inkokhelo ayisekho?",
        "body": "Cha. Ngokuvamile kusho ukuthi isistimu ivuselela ikhasi lenyanga entsha."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise kuqala?",
        "body": "Qhathanisa umlayezo onyamalele nebhalansi yakho yangempela yasebhange. Ngokuvamile, imali ifika lapho umyalezo uphela."
      },
      {
        "title": "I-FAQ: Kungani ugcine amagama amasha ngokushesha?",
        "body": "Ngoba ikutshela kahle ukuthi isistimu yenzani ngokulandelayo."
      }
    ]
  },
  "how-to-read-r350-payment-status-safely": {
    "title": "Usifunda kanjani isimo sokukhokha se-R350 ngokuphepha",
    "summary": "Ungasibheka kanjani isimo sakho se-SRD R350 ngaphandle kokukhohliswa izixhumanisi ezingamanga noma izinhlelo zokusebenza ezingekho emthethweni.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Njalo nje hlola isimo sakho se-SRD R350 kuwebhusayithi esemthethweni: srd.sassa.gov.za. Ungalokothi usebenzise izinhlelo zokusebenza zezinkampani zangaphandle, WhatsApp bots, noma izixhumanisi ezithunyelwe abantu ongabazi."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Ngenxa yokuthi izigidi zabantu zihlola isimo se-R350 nsuku zonke, abakhohlisi bakha amawebhusayithi mbumbulu afana ncamashi ne-SASSA ukuze bantshontshe i-ID yakho nenombolo yocingo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Uma ufaka imininingwane yakho kusihloli sesimo esingelona iqiniso, umkhohlisi angaduna iphrofayela yakho, ashintshe imininingwane yakho yasebhange, futhi antshontshe imali yakho yesibonelelo."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Thayipha i-'srd.sassa.gov.za' ngqo esipheqululini sakho.\n2. Ungalokothi uchofoze izixhumanisi ezithi 'Check SRD Status Here' ku-Facebook noma WhatsApp.\n3. Bheka i-'gov.za' ekugcineni kwekheli lesizindalwazi—lokhu kufakazela ukuthi iyisizinda sikahulumeni sangempela.\n4. Ungalandi noma iyiphi i-'SASSA Status Apps' esitolo sohlelo lokusebenza (i-SASSA ayinalo uhlelo lokusebenza olusemthethweni).\n5. Faka i-ID yakho nenombolo yocingo ngokuphephile."
      },
      {
        "title": "Vikela imininingwane yakho njengokheshi",
        "body": "Inombolo yakho kamazisi kanye nenombolo yocingo izikhiye zesibonelelo sakho. Uma unikeza labo khiye kuwebhusayithi mbumbulu, unikeza imali yakho."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare ayisoze yakucela umazisi wakho noma inombolo yocingo. Sinikeza imihlahlandlela, kodwa konke ukuhlola isimo kwangempela kufanele kwenziwe kusayithi likahulumeni."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikufundisa indlela yokubona amawebhusayithi nezinhlelo zokusebenza ezingamanga ukuze uhlole isimo sakho ngokuzethemba okungu-100%."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-check-payment-readiness-for-r350-support\n• /guides/what-payment-status-check-means\n• /guides/how-to-track-payment-dates-without-rumours\n• /guides/payment-processing-meaning\n• /guides/where-to-find-official-updates-safely"
      },
      {
        "title": "I-FAQ: Kungani amagama okukhokha e-R350 kulula ukuwasebenzisa kabi?",
        "body": "Ngoba abakhwabanisi bakha amawebhusayithi mbumbulu akunikeza izimpendulo ezingelona iqiniso ukuze nje bantshontshe idatha yakho."
      },
      {
        "title": "I-FAQ: Yini okufanele ngiqhathanise namagama?",
        "body": "Njalo qinisekisa ukuthi i-URL yewebhusayithi ithi 'gov.za' ngaphambi kokuthayipha noma yini."
      },
      {
        "title": "I-FAQ: Kufanele ngiwusebenzise nini umzila osemthethweni?",
        "body": "Kufanele ngaso sonke isikhathi usebenzise umzila osemthethweni we-SASSA ukuze uhlole isimo sakho siqu, esiyimfihlo."
      }
    ]
  },
  "where-to-confirm-payment-problems-officially": {
    "title": "Kuzoqinisekisa kuphi izinkinga zokukhokha ngokusemthethweni",
    "summary": "Iziteshi ezisemthethweni kuphela okufanele uzisebenzise ukubika udaba lokukhokha lwe-SASSA olubucayi.",
    "sections": [
      {
        "title": "Impendulo esheshayo",
        "body": "Uma unenkinga yokukhokha yangempela, kufanele uthinte i-SASSA ngokuqondile ngenombolo yabo yamahhala (0800 60 10 11), i-imeyili (GrantEnquiries@sassa.gov.za), noma uvakashele igatsha lasendaweni."
      },
      {
        "title": "Kusho ukuthini lokhu",
        "body": "Amabhulogi, amaqembu e-Facebook, namawebhusayithi ezindaba awakwazi ukulungisa inkinga yakho ye-SASSA. Bangakunikeza iseluleko, kodwa i-SASSA kuphela enamandla okuvula i-akhawunti yakho noma ukukhipha kabusha inkokhelo."
      },
      {
        "title": "Kungani lokhu kubalulekile",
        "body": "Abantu bachitha amasonto bekhononda ezinkundleni zokuxhumana, benethemba lokuthi kukhona ozokulungisa. Okuwukuphela kwendlela yokuthola imali yakho iwukuba ungene ngemvume ngokusemthethweni ngemigudu efanele kahulumeni."
      },
      {
        "title": "Ongakwenza ngokulandelayo",
        "body": "1. Sebenzisa i-GrantCare ukuze uthole ukuthi iyini inkinga (isb., imininingwane yasebhange ehlulekile uma iqhathaniswa nokubambezeleka okuvamile).\n2. Qoqa i-ID yakho, ifoni yakho, kanye nesithombe-skrini sesimo sakho sephothali.\n3. Shayela ucingo lwamahhala olusemthethweni: 0800 60 10 11.\n4. Uma ucingo luhluleka, thumela i-imeyili ku- GrantEnquiries@sassa.gov.za kanye nenombolo yakho kamazisi emugqeni wesihloko.\n5. Uma kokubili kwehluleka, thatha umazisi wakho kanye nesitatimende sasebhange uye ehhovisi eliseduze nawe le-SASSA."
      },
      {
        "title": "Umthombo kuphela ongalungisa inkinga",
        "body": "Silapha ukuze sibe umeluleki wakho omethembayo, ukuze sikuchazele imigomo edidayo, futhi sikugcinele uhambo oluya ebhange. Kodwa uma uhlelo luphuka ngempela, kufanele uye emthonjeni."
      },
      {
        "title": "Izinto ezibalulekile okufanele uzikhumbule",
        "body": "I-GrantCare iyinkundla yezemfundo ezimele. Asiyona i-SASSA, futhi asikwazi ukufinyelela ifayela lakho noma ukuxazulula amaphutha okukhokha esikhundleni sakho."
      },
      {
        "title": "I-GrantCare ingasiza kanjani",
        "body": "Sikusiza ukuthi ulungiselele ulwazi oluqondile oludingayo ngaphambi kokuthi ushayele i-SASSA, ukuze inkinga yakho ixazululwe ngokushesha okukhulu."
      },
      {
        "title": "Usizo oluhlobene",
        "body": "Amakhasi alandelayo awusizo:\n• /guides/how-to-fix-common-payment-release-problems\n• /guides/how-to-keep-records-of-payment-problems\n• /guides/how-to-check-if-a-missing-payment-is-just-a-delay\n• /guides/where-to-find-official-updates-safely\n• /payment-dates"
      },
      {
        "title": "I-FAQ: Kunini lapho i-GrantCare inganele iyodwa?",
        "body": "Uma udinga ngempela othile ukuze acindezele inkinobho futhi alungise i-akhawunti yakho. Lokho kudinga i-SASSA."
      },
      {
        "title": "I-FAQ: Kungani usebenzise i-GrantCare kuqala?",
        "body": "Ngoba sikusiza ukuthi uthole ukuthi yini okufanele uyisho kumenzeli we-SASSA, ukuze bakuqonde ngokushesha."
      },
      {
        "title": "I-FAQ: Yini okufanele ngihambe nayo uma ngiyolandelela ngokusemthethweni?",
        "body": "I-ID yakho, ifoni yakho, noma yiziphi izithombe-skrini, nesitatimende sasebhange esigxivizwe."
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

export const SEO_BATCH_ELEVEN_GUIDES = SEO_BATCH_ELEVEN_GUIDES_SOURCE.map((guide) =>
  addSetswanaTranslations(withZuTranslations(guide, ZU_TRANSLATIONS[guide.slug])),
);
