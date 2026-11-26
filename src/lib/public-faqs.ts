import type { PublicFaq } from "./fallback-content";
import type { Locale } from "./site";

export const MINIMUM_PUBLIC_FAQS = 5;

export function withMinimumFaqs(primary: PublicFaq[], fallback: PublicFaq[]) {
  const result: PublicFaq[] = [];
  const ids = new Set<string>();
  const questions = new Set<string>();
  for (const item of primary) {
    const key = item.question.trim().toLocaleLowerCase();
    if (!key || !item.answer.trim() || ids.has(item.id) || questions.has(key)) continue;
    result.push(item); ids.add(item.id); questions.add(key);
  }
  for (const item of fallback) {
    if (result.length >= MINIMUM_PUBLIC_FAQS) break;
    const key = item.question.trim().toLocaleLowerCase();
    if (!key || !item.answer.trim() || ids.has(item.id) || questions.has(key)) continue;
    result.push(item); ids.add(item.id); questions.add(key);
  }
  return result;
}

const topicFaqs = {
  status: [
    ["Where can I check my official SRD status?", "Use the official SRD website at srd.sassa.gov.za. GrantCare explains the result; it does not retrieve your personal SASSA record or need your ID number."],
    ["Does Approved mean my money is already available?", "Approval and payment are different steps. If an SRD result has no payment date, it does not establish when funds will arrive. Check your own official result and payment method."],
    ["What does Pending mean?", "The result is not final for the period shown. Check the correct month and the official result again; Pending by itself does not tell you a payment date."],
    ["What should I do if my status is Declined?", "Read the reason and the month on your official result. If you disagree, use the official appeal instructions and applicable deadline. Do not pay an intermediary to promise approval."],
    ["What if my banking details need attention?", "Use the official service for your grant to check or update the details. A banking update does not guarantee immediate payment. Never share a PIN, password or OTP with someone offering to fix your status."],
  ],
  eligibility: [
    ["Does this checker decide whether I qualify?", "No. It offers general guidance. SASSA makes the official decision after considering the requirements and your application."],
    ["Are the requirements the same for every grant?", "No. Age, income, residence, care and other requirements depend on the grant. Read the relevant grant page and official requirements before applying."],
    ["Which documents will I need?", "The documents depend on your grant and circumstances. Check the official application guidance or ask SASSA for the current list for your application."],
    ["Can I submit an application through GrantCare?", "No. Follow the official application channel for the grant you are applying for. This checker does not submit an application or create a SASSA account."],
    ["Does a likely match guarantee payment?", "No. A possible match is not approval, and approval is not a confirmed payment date. Use your official result to track your application."],
  ],
} as const;

export function getTopicFaqs(locale: Locale, topic: keyof typeof topicFaqs, fallback: PublicFaq[]) {
  if (locale !== "en") return fallback.slice(0, MINIMUM_PUBLIC_FAQS);
  return topicFaqs[topic].map(([question, answer], index) => ({id: `${topic}-faq-${index}`, question, answer}));
}

export function getPaymentFaqs(locale: Locale, context: { label?: string; grantName?: string; payDayText?: string; isSrd?: boolean }, fallback: PublicFaq[]) {
  if (locale !== "en") return fallback.slice(0, MINIMUM_PUBLIC_FAQS);
  const subject = context.grantName ?? "social grants";
  const period = context.label ? ` for ${context.label}` : "";
  return [
    { question: `When ${context.grantName ? "is" : "are"} ${subject} paid${period}?`, answer: context.payDayText
      ? (context.isSrd ? "SRD has no single payday for everyone. Check your individual payment date on the official SRD status result." : `The published payment information is shown above: ${context.payDayText}. A calendar date does not confirm that your individual payment has cleared.`)
      : "Choose the month and grant category in the calendar above. Where a date has not been published in our checked sources, it is shown as awaiting confirmation." },
    { question: "Are SRD payments made on the ordinary grant dates?", answer: "No single ordinary-grant date applies to all SRD beneficiaries. Check the month and payment date on your own official SRD result; approval without a date is not a confirmed payday." },
    { question: "Can SASSA change a published date?", answer: "Yes. A later official announcement can replace an earlier calendar. For example, November 2026 had a revised schedule. Use the source linked on the page and check official notices before making plans." },
    { question: "What if a payment is still missing after the published date?", answer: "Check your official status and payment method, then contact SASSA or your payment provider for your individual case. Do not assume every grant or bank has the same processing time." },
    { question: "Where can I verify the payment calendar?", answer: "Use the official source linked with the calendar, SASSA’s website, or its toll-free number 0800 60 10 11. Dates after the published schedule ends remain unconfirmed here until a new source is reviewed." },
  ].map((item, index) => ({...item, id:`payment-faq-${index}`}));
}

export function completeGuideFaqs(authored: Array<{title: string; body: string}>, fallback: PublicFaq[]) {
  const result = [...authored];
  const questions = new Set(result.map(item => item.title.replace(/^FAQ:\s*/, "").trim().toLocaleLowerCase()));
  for (const item of fallback) {
    if (result.length >= MINIMUM_PUBLIC_FAQS) break;
    const key = item.question.trim().toLocaleLowerCase();
    if (!questions.has(key)) {result.push({title: `FAQ: ${item.question}`, body: item.answer}); questions.add(key);}
  }
  return result;
}
