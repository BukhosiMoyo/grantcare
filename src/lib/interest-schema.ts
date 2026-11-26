import { z } from "zod";

export const INTEREST_TOPICS = [
  { value: "bank_account", label: "Bank accounts", detail: "Finding an account that fits my needs." },
  { value: "mobile_data", label: "Airtime & data", detail: "Hearing about relevant mobile offers." },
  { value: "payment_updates", label: "Payment updates", detail: "Keeping up with grant payment information." },
] as const;

export type InterestTopic = (typeof INTEREST_TOPICS)[number]["value"];
export const INTEREST_CONSENT_VERSION = "2026-11-25-v1";
export const INTEREST_RETENTION_DAYS = 90;

export function interestLabel(topic: string) {
  return INTEREST_TOPICS.find((item) => item.value === topic)?.label ?? topic;
}

export function interestConsentText(topic: InterestTopic, channel: "email" | "phone") {
  const subject = { bank_account: "bank-account options", mobile_data: "airtime and data offers", payment_updates: "grant payment updates" }[topic];
  const method = channel === "email" ? "by email" : "by phone or WhatsApp";
  return `I am 18 or older and want GrantCare to contact me ${method} about ${subject} for up to 90 days. This is optional. My details will not be shared with a bank or other partner unless I separately agree to that referral.`;
}

export function normalizePhone(value: string) {
  const clean = value.replace(/[\s()-]/g, "");
  return clean.replace(/^0(?=[1-9]\d{8}$)/, "+27").replace(/^27(?=[1-9]\d{8}$)/, "+27");
}

// Attribution never carries queries, fragments, email addresses or arbitrary URLs.
export function safeInterestSource(value: unknown) {
  if (typeof value !== "string") return "/interests";
  const path = value.split(/[?#]/)[0];
  if (path.length > 220 || !/^\/(?:guides(?:\/[a-z0-9-]+)?|payment-dates(?:\/[a-z0-9-]+){0,3}|interests)?$/.test(path)) return "/interests";
  return path || "/interests";
}

export const interestSchema = z.object({
  topic: z.enum(["bank_account", "mobile_data", "payment_updates"], { error: "Choose what you are interested in." }),
  contactChannel: z.enum(["email", "phone"]),
  contactValue: z.string().trim().min(1, "Enter your contact details.").max(160),
  consent: z.literal(true, { error: "Please read and agree to GrantCare contacting you about this interest." }),
  website: z.string().max(0),
  sourcePath: z.unknown().transform(safeInterestSource),
}).superRefine((data, context) => {
  if (data.contactChannel === "email" && !z.email().safeParse(data.contactValue).success) {
    context.addIssue({ code: "custom", path: ["contactValue"], message: "Enter a valid email address." });
  }
  if (data.contactChannel === "phone" && !/^\+27[1-9]\d{8}$/.test(normalizePhone(data.contactValue))) {
    context.addIssue({ code: "custom", path: ["contactValue"], message: "Enter a South African number, for example 082 123 4567." });
  }
}).transform((data) => ({ ...data, contactValue: data.contactChannel === "email" ? data.contactValue.toLowerCase() : normalizePhone(data.contactValue) }));

export function csvCell(value: unknown) {
  const text = String(value ?? "");
  const safe = /^[=+\-@\t\r\n]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}
