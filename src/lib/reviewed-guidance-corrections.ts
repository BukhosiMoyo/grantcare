import type { PublicGuide } from "./fallback-content";

// Exact legacy text guards preserve later editorial replacements in the CMS.
const CORRECTIONS = [
  {
    "slug": "how-to-avoid-common-appeal-mistakes",
    "title": "What this means",
    "before": "When you get declined, it's easy to just click 'appeal' immediately without thinking. That is the biggest mistake you can make. Take 24 hours to calm down and find your documents first.",
    "after": "Read the decline reason and gather relevant evidence before submitting an appeal. Check the deadline in the official instructions; do not delay an appeal for an arbitrary cooling-off period."
  },
  {
    "slug": "how-to-read-payment-status-after-approval",
    "title": "What you can do next",
    "before": "1. Celebrate the 'Approved' status—the hard part is over.\n2. Now, look for the 'Payment Status' update.\n3. Check the official SASSA payment calendar for your specific grant.\n4. Wait for the status to change from 'Pending' to 'Released'.\n5. Give your bank 24 to 48 hours to clear the funds once released.",
    "after": "1. Read the result for the correct grant and month.\n2. Check for a published payment date or an individual SRD payday.\n3. Check the payment method recorded by SASSA.\n4. Follow any specific instruction in the official result.\n5. Contact SASSA or your bank about an unresolved payment; this guide cannot confirm a bank-clearing deadline."
  },
  {
    "slug": "what-payment-released-means",
    "title": "What you can do next",
    "before": "1. Take a breath—'Released' means your money is safe and on the way.\n2. Check the date next to the 'Released' message.\n3. Allow up to 48 hours for the funds to reflect in your account.\n4. Factor in weekends or public holidays, which pause bank processing.\n5. Only contact your bank if the money has not appeared after three business days.",
    "after": "1. Confirm the message on the official system.\n2. Check the relevant month and any payment date shown.\n3. Check whether funds are available through your recorded payment method.\n4. Contact SASSA or your bank if payment is unresolved.\n5. Do not treat released wording as a guarantee that funds are already accessible."
  },
  {
    "slug": "how-to-know-when-funds-should-show",
    "title": "Quick answer",
    "before": "Funds usually show up 24 to 48 hours after SASSA officially releases them. The exact time depends entirely on which bank you use and whether it is a weekend.",
    "after": "This guide cannot confirm when funds will reach an individual account. Check the official payment information and ask your bank or SASSA about an unresolved payment."
  },
  {
    "slug": "how-to-know-when-funds-should-show",
    "title": "FAQ: Can funds show on the same day as released wording?",
    "before": "Yes, but often it takes an extra 24 hours depending on the bank.",
    "after": "The message alone does not confirm when funds will be accessible. Check the actual account or collection status."
  },
  {
    "slug": "how-payment-batches-can-cause-delays",
    "title": "What you can do next",
    "before": "1. Stop comparing your payment exact time to other people.\n2. Check the official SASSA payment date for your grant type.\n3. Understand that processing runs from the morning until the evening.\n4. Give the system the full day to process your specific batch.\n5. Only start worrying if your payment does not reflect 48 hours after the release date.",
    "after": "1. Check the correct grant and payment month.\n2. Use the official calendar for ordinary grants or the individual SRD result.\n3. Check any instruction about your payment method.\n4. Compare your account or collection result with the official information.\n5. Contact the relevant official support channel if the payment remains unresolved."
  },
  {
    "slug": "what-to-do-if-payment-ready-but-not-reflecting",
    "title": "Quick answer",
    "before": "If your payment is 'Ready' but not reflecting, wait 48 hours for bank clearing. If it still doesn't show, check if your bank account is blocked or inactive.",
    "after": "A ready message does not prove funds are available in your account. Check the official result, recorded payment method and bank account. Ask SASSA or your bank about an unresolved payment rather than relying on a fixed waiting period."
  },
  {
    "slug": "how-to-check-payment-method-before-pay-date",
    "title": "What you can do next",
    "before": "1. Log into the official SASSA portal at least 7 days before your payday.\n2. Navigate to the 'Banking Details' section.\n3. Verify that your current account number is correct and marked as 'Active'.\n4. If the details are wrong, update them immediately.\n5. Do not make changes if the details are correct—unnecessary updates cause delays.",
    "after": "1. Open the official route for your grant.\n2. Check which payment method is recorded.\n3. Compare the details with your current account or collection information.\n4. Follow the official correction process if information is wrong.\n5. Do not change accurate details simply to try to accelerate payment."
  },
  {
    "slug": "what-to-do-if-payment-date-passed-with-no-update",
    "title": "Why this matters",
    "before": "Rushing to the SASSA office the morning after a missed date is usually a waste of time. Most late payments resolve themselves within 48 hours or require a simple bank update.",
    "after": "A missed date needs checking against the correct grant, month and payment method. The cause cannot be diagnosed from elapsed time alone."
  },
  {
    "slug": "what-to-do-if-payment-date-passed-with-no-update",
    "title": "What you can do next",
    "before": "1. Confirm the date that passed was definitely your grant's official payday.\n2. Log into the portal and read your current 'Payment Status' word-for-word.\n3. Check if the status says 'Returned' or 'Failed' (which requires action).\n4. If it still says 'Approved' or 'Scheduled', wait 48 business hours.\n5. If the money is still missing after 3 days, escalate via the official SASSA toll-free number.",
    "after": "1. Confirm whether the date applies to your grant and month.\n2. Read the current official result.\n3. Follow any failed, returned or verification instruction.\n4. Check the recorded payment method and account.\n5. Contact SASSA or the payment provider if the discrepancy remains unresolved."
  },
  {
    "slug": "how-to-know-if-a-payment-date-is-still-current",
    "title": "Why this matters",
    "before": "If you rely on a screenshot from a Facebook group, you might stand in a bank queue for 4 hours for a payment that isn't due until next week. Always verify freshness.",
    "after": "An old screenshot can show a superseded schedule. Compare its month, year and source with the current official announcement before making travel plans."
  },
  {
    "slug": "how-to-check-payment-readiness-for-r350-support",
    "title": "What you can do next",
    "before": "1. Log into the SRD website (srd.sassa.gov.za) and check the current month.\n2. If it says 'Approved', look at the 'Payday' field below it.\n3. If the 'Payday' field is blank, your money is not ready yet.\n4. Wait for a specific date to appear in the 'Payday' field.\n5. Wait for an SMS, or allow 48 hours after the 'Payday' before attempting to withdraw.",
    "after": "1. Open the official SRD portal.\n2. Check the result for the month concerned.\n3. Look for an individual payment date if one is shown.\n4. Do not infer a payday from approved wording alone.\n5. Follow official instructions and check actual payment availability."
  },
  {
    "slug": "what-payment-pending-means",
    "title": "What you can do next",
    "before": "1. Note that 'Pending' is not a rejection—your grant is still active.\n2. Do not change your banking details while your status is Pending (this causes further delays).\n3. Wait 3 to 5 business days and check the portal again.\n4. Look for the status to change to 'Approved' or 'Scheduled'.\n5. If it stays Pending for more than 14 days, call the SASSA toll-free line.",
    "after": "1. Read the complete message for the correct month.\n2. Check whether the result asks for information or action.\n3. Verify that your recorded contact and payment details are accurate.\n4. Check the official system for updates.\n5. Contact SASSA if you need help with an unresolved result; there is no universal escalation day established by this guide."
  },
  {
    "slug": "how-to-check-if-a-missing-payment-is-just-a-delay",
    "title": "Quick answer",
    "before": "A missing payment is usually just a banking delay if it has been less than 48 hours since the official payment date. If it has been more than 3 days, it might be a real issue.",
    "after": "Elapsed time alone does not establish why a payment is missing. Compare the official result, payment date and payment method, then contact the relevant provider if you need help."
  },
  {
    "slug": "how-to-check-if-a-missing-payment-is-just-a-delay",
    "title": "What you can do next",
    "before": "1. Check the official payment date for your specific grant.\n2. Count exactly how many business days have passed since that date.\n3. If it is less than 48 hours, it is a normal delay. Do nothing.\n4. If the payment status says 'Returned' or 'Failed', it is an issue you must fix.\n5. If 3 days have passed and the status still says 'Approved' or 'Released', contact your bank.",
    "after": "1. Confirm the payment month and grant.\n2. Check the official date or individual SRD result.\n3. Read any failed, returned or verification instruction.\n4. Check your actual account or collection status.\n5. Contact SASSA or the payment provider about an unresolved discrepancy."
  },
  {
    "slug": "how-to-check-if-a-missing-payment-is-just-a-delay",
    "title": "Delayed is not missing",
    "before": "A delayed payment is on its way. A missing payment means the system failed. Give the banking system 48 hours to do its job before assuming the money is gone.",
    "after": "A guide cannot determine whether your payment is merely delayed or has failed. Use the official result and payment provider to establish what happened."
  },
  {
    "slug": "how-to-use-reminders-for-payment-readiness",
    "title": "Quick answer",
    "before": "Set a calendar reminder for your specific payday, and another one for 48 hours later. Only check your bank balance after the second reminder goes off.",
    "after": "Set a reminder for the relevant published date or a convenient time to check your individual SRD result. A reminder does not establish a bank-clearing window."
  },
  {
    "slug": "how-to-use-reminders-for-payment-readiness",
    "title": "What you can do next",
    "before": "1. Find the official SASSA payment date for your grant type.\n2. Set a reminder on your phone for 8 AM on that exact date.\n3. Set a second reminder for 48 hours later (the 'clearance' window).\n4. Ignore all rumors on social media between those two dates.\n5. Only take action or worry if the second reminder passes with no money.",
    "after": "1. Find the date applicable to your grant or individual result.\n2. Save a reminder on your phone.\n3. Keep the official source with the reminder.\n4. Recheck for later schedule revisions.\n5. Contact the relevant support channel if your payment remains unresolved."
  },
  {
    "slug": "how-to-use-reminders-for-payment-readiness",
    "title": "FAQ: When is the best time for a reminder?",
    "before": "Set one on the actual payment date, and one 48 hours later to allow for bank clearing.",
    "after": "Choose a time useful to you and link it to the applicable published information. No particular hour guarantees that funds will be available."
  },
  {
    "slug": "what-to-do-if-payment-ready-message-disappears",
    "title": "What you can do next",
    "before": "1. Do not assume your grant was cancelled just because the text vanished.\n2. Check your bank account to see if the money actually arrived while the message was gone.\n3. Wait 24 hours for the SASSA portal to finish its system update.\n4. Log in again to see the fresh status for the current month.\n5. Only escalate if the new status says 'Failed' or 'Declined'.",
    "after": "1. Confirm you are viewing the correct official account and month.\n2. Check whether a new result or instruction is shown.\n3. Check actual payment availability.\n4. Keep a private record of relevant messages.\n5. Contact SASSA if the changed or missing message needs explanation."
  },
  {
    "slug": "how-to-prepare-for-a-sassa-office-visit",
    "title": "What you can do next",
    "before": "1. Confirm exactly why you are going. Can it be done online instead?\n2. Gather your original ID and a recently certified copy (less than 3 months old).\n3. Bring a pen, a bottle of water, and any letters or SMS messages SASSA sent you.\n4. Do not pay anyone standing outside offering to 'hold your place in line' or 'speed up your file'.\n5. Once inside, only hand your documents to someone sitting behind an official SASSA desk.",
    "after": "1. Confirm the office can help with your enquiry.\n2. Ask which documents and certification requirements apply to your grant.\n3. Take relevant official letters or messages.\n4. Applying through SASSA is free; avoid paying unofficial intermediaries.\n5. Keep the application receipt or reference issued by the office."
  },
  {
    "slug": "how-to-prepare-for-a-sassa-office-visit",
    "title": "FAQ: Do I need to print my bank statements?",
    "before": "If you are applying for a new grant or changing banking details, yes, you usually need 3 months of stamped bank statements.",
    "after": "Document requirements depend on the grant and enquiry. Confirm the applicable statement period, format and certification requirements with SASSA before travelling."
  },
  {
    "slug": "when-to-use-contact-details-instead-of-status-check",
    "title": "What you can do next",
    "before": "1. Has your status been pending for more than 3 months? If yes, call.\n2. Does your status say 'Approved' but you haven't been paid for 2 months? If yes, call.\n3. Do you suspect someone else is receiving your money? If yes, call immediately.\n4. When you call 0800 60 10 11, have your ID number ready.\n5. Write down the reference number the agent gives you before you hang up.",
    "after": "1. Contact SASSA if you need help with an unresolved result or payment.\n2. Report suspected unauthorised changes promptly.\n3. Use the contact information on the official government directory.\n4. Provide personal information only through an official support channel.\n5. Keep any enquiry reference the official gives you."
  },
  {
    "slug": "how-payment-batches-can-cause-delays",
    "title": "FAQ: When should I worry more?",
    "before": "Only if 48 business hours have passed since the payment date and you still have nothing.",
    "after": "Contact SASSA or your payment provider if you cannot resolve a discrepancy between the official result and actual payment availability. This guide does not establish a waiting period."
  },
  {
    "slug": "how-to-check-if-a-missing-payment-is-just-a-delay",
    "title": "FAQ: How long should I wait before calling it a missing payment?",
    "before": "Wait at least 48 to 72 business hours after the official payment date.",
    "after": "There is no universal bank-clearing interval established here. Check your official result and ask the relevant provider about the specific payment."
  },
  {
    "slug": "how-to-know-when-funds-should-show",
    "title": "What this means",
    "before": "There is no single 'magic minute' when everyone in South Africa gets paid at once. Capitec might clear payments at 2 AM, while Standard Bank might clear them at 8 AM. It varies wildly.",
    "after": "A message on a status page does not confirm an exact bank posting time. Ask your payment provider about an unresolved transfer."
  },
  {
    "slug": "how-to-know-when-funds-should-show",
    "title": "What you can do next",
    "before": "1. Confirm that your status actually says 'Released'.\n2. Note the time and date of the release.\n3. Check if today is a Friday or a public holiday (this delays processing).\n4. Understand your specific bank's normal clearance times.\n5. Wait 48 business hours before assuming the payment is missing.",
    "after": "1. Check the correct grant and month on the official system.\n2. Read any payment date and instruction shown.\n3. Check actual account or collection availability.\n4. Keep a private record of the result.\n5. Contact SASSA or the relevant payment provider about an unresolved discrepancy."
  },
  {
    "slug": "how-to-know-when-funds-should-show",
    "title": "FAQ: What if the money still does not show?",
    "before": "If 48 business hours have passed since release, contact your bank first.",
    "after": "Check the official result and recorded payment method, then ask SASSA or the relevant provider about the unresolved payment."
  },
  {
    "slug": "what-payment-released-means",
    "title": "FAQ: What should I do if released does not reflect?",
    "before": "Wait 48 business hours. If it is a weekend, wait until Monday afternoon.",
    "after": "Check the official result and actual payment availability. Ask SASSA or your bank about the specific payment; do not rely on a universal clearing deadline."
  },
  {
    "slug": "what-payment-released-means",
    "title": "How GrantCare can help",
    "before": "We teach you how different banks handle clearing times so you know exactly when to expect your cash after seeing 'Released'.",
    "after": "GrantCare helps you identify relevant official information and questions to ask the payment provider. We cannot see the transfer or predict its arrival."
  },
  {
    "slug": "what-payment-released-means",
    "title": "Released means sent, not instantly available",
    "before": "'Released' is like someone handing a letter to the post office. The letter has been sent, but the postman still needs to drive it to your house. The money is coming.",
    "after": "The wording alone does not establish that funds are available. Confirm payment availability through the provider."
  },
  {
    "slug": "what-to-do-if-payment-ready-but-not-reflecting",
    "title": "What you can do next",
    "before": "1. Take a screenshot of the 'Payment Ready' message.\n2. Wait a full 48 business hours (ignoring weekends).\n3. Check your bank app to see if your account is active and accepting deposits.\n4. Call your bank and ask if there are any pending incoming transfers.\n5. Only go to SASSA if your bank confirms they have rejected the payment.",
    "after": "1. Keep a private record of the official message.\n2. Confirm the correct grant and month.\n3. Check the recorded payment method and actual availability.\n4. Ask the relevant payment provider about any account issue.\n5. Contact SASSA if the discrepancy remains unresolved."
  },
  {
    "slug": "what-to-do-if-your-appeal-status-does-not-change",
    "title": "Quick answer",
    "before": "If your appeal status hasn't moved in two months, do absolutely nothing. Resist the urge to 'update' your application, because doing that can accidentally push you back to the start of the line.",
    "after": "Read the current appeal result and contact the tribunal if you need an update. Follow any official instruction or deadline; an unchanged status does not justify ignoring a request or assuming your appeal has restarted."
  },
  {
    "slug": "how-to-prepare-for-an-online-application",
    "title": "The real purpose of preparation",
    "before": "Preparation is the difference between getting paid next month or waiting six months. Do not open the application portal until every single document is resting on your table.",
    "after": "Confirm which information and supporting documents apply to your grant. Missing information can need follow-up, but this guide cannot predict a processing or payment date. Ask about official alternatives if a document is unavailable."
  },
  {
    "slug": "when-to-use-contact-details-instead-of-status-check",
    "title": "Important things to remember",
    "before": "GrantCare cannot contact SASSA on your behalf. Privacy laws dictate that you, the applicant, must make the call yourself.",
    "after": "GrantCare cannot access your file or contact SASSA on your behalf through this website. If you need someone to assist you, ask SASSA about its authorised assistance or proxy process."
  },
  {
    "slug": "when-to-use-contact-details-instead-of-status-check",
    "title": "How GrantCare can help",
    "before": "We explain the typical timelines for status changes so you know exactly when a delay has become abnormal enough to warrant a phone call.",
    "after": "We explain relevant messages and official contact routes. We cannot determine from this guide alone whether the processing time for your case is abnormal."
  },
  {
    "slug": "how-banking-details-updates-work",
    "title": "Quick answer",
    "before": "Updating your banking details temporarily pauses your payments. The system must verify your new account to prevent fraud before they can send you money again.",
    "after": "New SRD banking details are used for future payments after verification, according to the official banking-update page. This does not establish that every change pauses every payment.\n• https://srd.sassa.gov.za/sc19/banking-details-update"
  },
  {
    "slug": "how-to-update-banking-details",
    "title": "What you can do next",
    "before": "1. Open the relevant official payment-details route.\n2. Confirm which support record or grant the change applies to.\n3. Enter the account information exactly as it appears on official bank records.\n4. Make sure the account is active and in your own name if that is required.\n5. Submit once and wait for the next official update before changing it again.",
    "after": "1. For SRD, open the official banking-update page linked below.\n2. Follow the ID and registered-mobile verification instructions on that official site.\n3. If selecting a bank account, use an account you own.\n4. Follow the official instructions to submit the change.\n5. New details apply to future payments after verification. For another grant, ask SASSA which process applies.\n• https://srd.sassa.gov.za/sc19/banking-details-update"
  },
  {
    "slug": "how-to-update-banking-details",
    "title": "FAQ: How long does a banking update take to reflect?",
    "before": "It varies. It depends on the official update cycle and whether the new details pass verification cleanly. A few days is common.",
    "after": "The official SRD page says new details are used for future payments after verification. It does not establish a universal completion time for every applicant."
  },
  {
    "slug": "how-to-update-banking-details",
    "title": "FAQ: Can I use a different person's bank account?",
    "before": "That often causes problems. Follow the official payment-method rules closely and use the allowed account type.",
    "after": "For SRD bank-account payment, the official page says the account must belong to the beneficiary. Ask SASSA about the permitted payment method for your circumstances."
  },
  {
    "slug": "what-identity-verification-link-means",
    "title": "Quick answer",
    "before": "An identity verification link means SASSA has paused your application to prove you are who you say you are. You must complete it before your grant can move forward.",
    "after": "A verification request asks you to confirm identity through the official process. Check its authenticity and follow the instructions for your case; the message alone does not establish why the request was made."
  },
  {
    "slug": "what-to-do-if-your-identity-verification-link-does-not-work",
    "title": "Important things to remember",
    "before": "GrantCare cannot generate a new link for you. You must go back to the official SASSA portal and trigger a new identity check.",
    "after": "GrantCare cannot issue or repair an official verification link. Use SASSA's published contact or support route if the official process is not working."
  },
  {
    "slug": "what-pending-id-verification-means",
    "title": "Important things to remember",
    "before": "GrantCare cannot contact Home Affairs for you. You must wait for the database sync to finish on the official SASSA portal.",
    "after": "GrantCare cannot access the verification record. Check the official instructions and contact SASSA if you need help with an unresolved request."
  },
  {
    "slug": "older-persons-grant-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. the age and means-test position matter, so it helps to read the grant-specific guidance before assuming you qualify. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "disability-grant-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. medical assessment and official disability-related requirements matter, so broad guidance should not be treated as guaranteed approval. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "child-support-grant-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. caregiver status and means-test rules both matter, so it helps to confirm the official details before applying. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "social-relief-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. this category often depends on portal-based updates and official rule wording, so a guide should not be treated as final approval. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "social-relief-how-to-apply",
    "title": "Quick answer",
    "before": "Before you look for the Social Relief of Distress application form, you must gather your documents. Once your paperwork is ready, you will submit your application directly through the official SASSA portal or at a local office.",
    "after": "Apply for SRD through the official SRD portal. Its published instructions say information is supplied electronically and no documents need to be uploaded. Read the declaration and consent information there.\n• https://srd.sassa.gov.za/"
  },
  {
    "slug": "foster-child-grant-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. the legal placement record matters a lot here, so official document guidance should be checked carefully. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "care-dependency-grant-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. medical assessment and caregiver context are both central, so broad guidance should be checked against the official route before applying. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "grant-in-aid-how-to-apply",
    "title": "Why this matters",
    "before": "Many people panic and submit whatever documents they have on hand just to get into the system. this is not a stand-alone starting grant for most users, so the existing qualifying grant and care need both matter. Taking an extra week to prepare is better than waiting six months to fix a rejected application.",
    "after": "Check the requirements and application route for this particular grant. Prepare the information requested and ask SASSA about alternatives if a document is unavailable. Preparation does not guarantee an outcome or a processing time."
  },
  {
    "slug": "what-payment-released-means",
    "title": "Quick answer",
    "before": "'Payment Released' means SASSA has officially sent the money from their bank to yours. It is the best sign you can get, but standard banking delays may still apply.",
    "after": "If your official result uses released wording, read it with the month, date and any accompanying instruction. This guide cannot confirm that a transfer has reached your bank or that funds are accessible."
  },
  {
    "slug": "what-payment-released-means",
    "title": "What this means",
    "before": "The government has done its job. The money has left the SASSA treasury. Now, it is up to your specific bank (Capitec, Standard Bank, FNB, etc.) to process the incoming transfer and reflect it in your balance.",
    "after": "A status description is not a bank statement. Confirm the actual payment through your recorded provider rather than infer that SASSA or a bank has completed every step."
  },
  {
    "slug": "what-payment-released-means",
    "title": "FAQ: Does released mean the money is already visible?",
    "before": "Not always. It means the money has been sent, but bank clearing takes time.",
    "after": "Check actual account or collection availability. The wording alone does not establish that funds are accessible."
  },
  {
    "slug": "what-payment-released-means",
    "title": "FAQ: Is released a good sign?",
    "before": "Yes, it is the best sign. It means your payment is successfully moving.",
    "after": "It may describe a payment stage, but the full official result and actual payment availability are what matter."
  },
  {
    "slug": "when-to-appeal-a-declined-status",
    "title": "What this means",
    "before": "Not every decline needs an appeal. Sometimes you just entered your ID number wrong, which requires a simple update, not a 90-day appeal process. Always read the exact reason before hitting the appeal button.",
    "after": "Read the official decline reason and the appeal instructions for that month. Correcting information and appealing are different steps; a correction should not be assumed to replace an appeal or extend its deadline."
  },
  {
    "slug": "what-documents-help-with-an-appeal",
    "title": "Quick answer",
    "before": "Don't just upload every document you own. If you were declined because of a banking error, only upload your bank statement. If you were declined for identity issues, only upload your ID.",
    "after": "Read the evidence requirements and submission options for your particular appeal. Keep relevant records, but do not assume that one document is sufficient or that every appeal portal accepts uploads."
  },
  {
    "slug": "how-to-use-status-reasons-in-an-appeal",
    "title": "Quick answer",
    "before": "Your entire appeal must focus purely on the reason they declined you. If they declined you for 'Alternative Income Source,' your appeal must prove you have no income.",
    "after": "Address the actual decline reason and the applicable rules for the month concerned. Explain relevant evidence accurately; do not assume that every income-related decline requires proof of zero income."
  },
  {
    "slug": "how-phone-number-changes-affect-status-checks",
    "title": "Quick answer",
    "before": "Changing your phone number temporarily freezes your account. The system has to sync your new number before you can check your status or get updates.",
    "after": "A phone-number change can affect access to messages or verification. Use the official update process and check the result; a change does not by itself prove that the grant or account is frozen."
  },
  {
    "slug": "how-to-fix-verification-problems-after-changing-details",
    "title": "What this means",
    "before": "SASSA treats any change to your profile as a potential security threat. They freeze your account temporarily to make sure a scammer didn't change your details.",
    "after": "If a verification issue appears after a change, check the full official message and follow the stated instructions. This guide cannot determine what triggered the check or whether payments are paused."
  },
  {
    "slug": "how-to-check-status-after-changing-details",
    "title": "FAQ: Can detail amendments instigate interim delays visibly?",
    "before": "Yes. Interim evaluations freeze progression routinely while the refreshed data synchronizes throughout related databases securely.",
    "after": "Check the official result after an update. New SRD bank details require verification, but this does not establish that every type of change freezes an application."
  },
  {
    "slug": "what-pending-id-verification-means",
    "title": "Quick answer",
    "before": "Pending ID verification means SASSA is checking your details against the Department of Home Affairs database. Your grant is paused, but not declined.",
    "after": "Pending identity verification indicates that the identity step is not yet confirmed in the displayed result. Check any official instruction; the message alone does not determine the cause or establish that every payment is paused."
  },
  {
    "slug": "how-to-check-if-payment-was-sent-back",
    "title": "Why this matters",
    "before": "If you think a returned payment is just 'late', you will wait forever. A returned payment will never fix itself. You have to actively update your banking details to get your money.",
    "after": "Ask the payment provider or SASSA to establish why a payment was returned and what action is required. Do not change correct banking details merely because a payment is unresolved."
  },
  {
    "slug": "what-weekends-and-holidays-can-do-to-payments",
    "title": "FAQ: Can a weekend delay a payment that already looks released?",
    "before": "Yes. The payment is released, but the bank's system is paused for the weekend.",
    "after": "Ask the relevant payment provider about its processing arrangements. This guide cannot establish that a bank stops processing every payment over a weekend."
  },
  {
    "slug": "how-to-read-payment-notes-on-date-pages",
    "title": "FAQ: Why is the note on the payment page so important?",
    "before": "Because it tells you if the date is a guaranteed promise or just an estimate.",
    "after": "It explains the relevant date, confirmation state and limitations. A published schedule does not guarantee that a particular account has received funds."
  },
  {
    "slug": "what-payment-hold-may-mean",
    "title": "Quick answer",
    "before": "'Payment on Hold' means SASSA has deliberately paused your money because they detected a problem. This is usually due to a banking error or an unverified ID.",
    "after": "If the official result shows a hold, read any reason or required action alongside it. The word alone does not establish a banking or identity problem."
  },
  {
    "slug": "what-payment-hold-may-mean",
    "title": "What you can do next",
    "before": "1. Log into your SASSA portal and look for any error messages next to the 'Hold' status.\n2. Call your bank immediately and ask if your account is frozen or closed.\n3. Check if your phone number or ID details have changed recently.\n4. Update any incorrect details directly on the SASSA portal.\n5. Wait for SASSA to verify the new details, which will automatically lift the hold.",
    "after": "1. Confirm the result on the official system.\n2. Read any reason and instruction shown.\n3. Check relevant contact or payment information.\n4. Follow the official correction process only where needed.\n5. Ask SASSA or the payment provider about an unresolved hold; a change does not guarantee its removal."
  },
  {
    "slug": "how-to-know-if-your-payment-method-is-blocking-release",
    "title": "Quick answer",
    "before": "If your status is approved but you aren't getting paid, check if your bank account is dormant, frozen, or if the name on the account differs from your ID. These will block the release.",
    "after": "Check the payment method and any official verification message. If there is a discrepancy, ask SASSA or the relevant provider what applies; this guide cannot diagnose a blocked release from approved wording alone."
  },
  {
    "slug": "how-to-know-if-your-payment-method-is-blocking-release",
    "title": "FAQ: Can an old bank account stop a payment?",
    "before": "Yes. If an account is inactive, the bank will automatically reject the SASSA transfer.",
    "after": "Ask your bank whether the recorded account can receive the payment. Do not infer account status or rejection from its age alone."
  },
  {
    "slug": "what-to-do-if-payment-ready-message-disappears",
    "title": "What this means",
    "before": "The SASSA portal is a live system. Status messages do not stay there forever. When a payment cycle finishes, old messages are archived to make room for the next month.",
    "after": "A changed or missing message should be checked on the official system for the correct month. This guide cannot establish whether the cause is archiving, a technical issue or a new decision."
  },
  {
    "slug": "should-you-use-a-sassa-app-or-the-website",
    "title": "FAQ: Is the website often a safer starting point?",
    "before": "Yes, it is the only guaranteed safe starting point as long as you verify the .gov.za address.",
    "after": "Use a known official address reached from SASSA's published links. Verify the complete domain and the requested action before entering personal information; no label alone guarantees safety."
  },
  {
    "slug": "how-banking-details-updates-work",
    "title": "What this means",
    "before": "You cannot just type in a new account number and expect a payment tomorrow. SASSA has to contact your bank, verify your ID against the account holder, and confirm the account is active. This process takes time.",
    "after": "The official SRD page says new banking details are used for future payments after verification. It does not promise an immediate change or specify every verification step.\n• https://srd.sassa.gov.za/sc19/banking-details-update"
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "Quick answer",
    "before": "If you miss the 90-day appeal deadline, that door is closed forever. Stop trying to appeal it, and check the portal to see if you are allowed to submit a brand new application instead.",
    "after": "If you may have missed an appeal deadline, contact the tribunal or an appropriately qualified adviser promptly. Confirm the decision date, the month concerned and any remaining procedure; do not assume that every legal option is permanently closed."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "What this means",
    "before": "Missing an appeal window is a serious structural limitation. Deadlines are typically hard stops enforced by the system. Once that window closes, the original decision usually becomes final. Your focus must shift from appealing the past to looking at current or future options.",
    "after": "An appeal deadline matters, but a general guide cannot determine the remaining options in your case. Read the official decision and obtain advice about any late procedure or review that may apply."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "Why this matters",
    "before": "Panic often causes applicants to try forcing appeals through the wrong channels after a deadline, which simply creates administrative mess. Accepting the limitation allows you to move systematically toward valid alternative paths rather than wasting effort.",
    "after": "Act promptly and keep the decision and relevant dates. A new application is not automatically a substitute for challenging an earlier decision."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "Respecting the limit",
    "before": "The most effective response to a missed deadline is respect for the process. Do not try to bypass the systemic lock. The critical question shifts from 'how do I appeal?' to 'what is my current overall status?'",
    "after": "Confirm the applicable procedure rather than try unofficial workarounds. If the portal will not accept a submission, ask the tribunal how to address your circumstances."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "Important things to remember",
    "before": "We will always tell you the hard truth: missed deadlines cannot be fixed. GrantCare helps you focus your energy on new applications instead of fighting a lost cause.",
    "after": "GrantCare does not provide a legal determination of your appeal or review rights. Seek official clarification or qualified advice before abandoning a possible remedy."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "FAQ: Is missing the deadline a permanent block on all future support?",
    "before": "Not necessarily. It typically ends that specific review cycle, but future applications might be possible depending on the exact program rules.",
    "after": "The position depends on the grant, decision and applicable procedure. Ask the relevant authority about your case."
  },
  {
    "slug": "what-to-do-if-you-missed-the-appeal-window",
    "title": "FAQ: Should I submit an appeal anyway and hope they accept it late?",
    "before": "Only if the official portal explicitly provides a channel for late or exceptional submissions. Otherwise, it will likely be automatically rejected.",
    "after": "Ask the tribunal or a qualified adviser about the correct procedure and any applicable deadline. Do not assume a late submission will be accepted or rejected from this guide alone."
  }
] as const;

export function correctUnverifiedTiming(guide: PublicGuide): PublicGuide {
  const corrections = CORRECTIONS.filter(c => c.slug === guide.slug);
  let changed = false;
  const sections = guide.sections.map(section => {
    const replacement = corrections.find(c => c.title === section.title && c.before === section.body);
    if (!replacement) return section;
    changed = true;
    return {...section, body: replacement.after};
  });
  return changed ? {...guide, sections, translations: {}, updatedAt: "2026-11-26"} : guide;
}
