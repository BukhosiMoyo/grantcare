import type { Locale } from "@/lib/site";

export type HomepageContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroDisclaimer: string;
  heroPreviewTitle: string;
  heroPreviewBody: string;
  toolsTitle: string;
  toolsIntro: string;
  supportTitle: string;
  supportParagraphs: string[];
  supportPoints: string[];
  latestGuidesTitle: string;
  latestGuidesBody: string;
  faqTitle: string;
  faqBody: string;
  libraryTitle: string;
  libraryBody: string;
};

const ENGLISH_HOMEPAGE_CONTENT: HomepageContent = {
  metaTitle: "GrantCare | Payment dates and status help",
  metaDescription:
    "Check payment dates, understand status wording, and find the next guide or official step with calm, independent support.",
  heroEyebrow: "Independent grant help",
  heroTitle: "Need help checking payment dates or understanding your status?",
  heroDescription:
    "GrantCare helps you check pay days, understand status words, and find the next step.",
  heroDisclaimer:
    "GrantCare is not SASSA or the South African government. Use official government channels for applications, appeals, and official status checks.",
  heroPreviewTitle: "This month’s grant summary",
  heroPreviewBody: "See the pay day and the amount for each grant.",
  toolsTitle: "Choose the task you need today.",
  toolsIntro:
    "Start with the tool that matches your question, then move to the official route only when you need a formal action.",
  supportTitle: "Why people use GrantCare",
  supportParagraphs: [
    "Most visitors arrive with one urgent question. They want to know whether a date is ready, what a pending or declined message usually means, or what to check before following up. The homepage should answer that quickly and point them to the right next page.",
    "GrantCare stays useful by keeping those jobs separate. Payment pages focus on timing. Status pages explain wording. The eligibility checker offers general direction. Guides sit in the guide library so the homepage can stay clean and easier to use.",
  ],
  supportPoints: [
    "Check the latest month and grant type in one place.",
    "Read plain-language status help before you guess.",
    "Use reminders and saved preferences only if they help you.",
    "Switch to official channels for official actions.",
  ],
  latestGuidesTitle: "Latest guides",
  latestGuidesBody:
    "Read the newest guides when you want more detail on current payment-date searches, status wording, or common support questions.",
  faqTitle: "Common questions",
  faqBody:
    "These quick answers cover the questions people ask most often before they move to a guide or official channel.",
  libraryTitle: "Need deeper help?",
  libraryBody:
    "The full guide library covers common problems, document questions, monthly payment searches, and support topics without crowding the homepage.",
};

export function getHomepageContent(locale: Locale) {
  void locale;
  return ENGLISH_HOMEPAGE_CONTENT;
}
