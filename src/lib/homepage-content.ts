import { sentenceCase } from "@/lib/utils";
import { getMonthSlugFromNumber } from "@/lib/fallback-content";
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
  waysToCheckTitle: string;
  waysToCheckBody: string;
  yearScheduleTitle: string;
  yearScheduleBody: string;
  nextMonthTitle: string;
  nextMonthBody: string;
};

function buildHomepageContent(month: number, year: number): HomepageContent {
  const monthSlug = getMonthSlugFromNumber(month);
  const monthLabel = sentenceCase(monthSlug);

  return {
    metaTitle: `SASSA Payment Dates ${monthLabel} ${year} — Status Help`,
    metaDescription: `Check SASSA ${monthLabel} ${year} payment dates for all grant types, understand grant status wording, and find your next step. Free, independent grant help for South African beneficiaries.`,
    heroEyebrow: "Independent grant help",
    heroTitle: `SASSA Payment Dates for ${monthLabel} ${year}`,
    heroDescription: `Check ${monthLabel} ${year} pay days, understand status words, and find the next step — with calm, independent support.`,
    heroDisclaimer:
      "GrantCare is not SASSA or the South African government. Use official government channels for applications, appeals, and official status checks.",
    heroPreviewTitle: `${monthLabel} ${year} grant summary`,
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
    waysToCheckTitle: "Ways to check your SASSA status",
    waysToCheckBody:
      "Use any of these methods to check your grant application status or payment dates. For accuracy and privacy, try the official SRD portal first.",
    yearScheduleTitle: `SASSA Payment Dates ${year} — Full Year Schedule`,
    yearScheduleBody: `All confirmed and expected SASSA payment dates for ${year}. Dates are based on usual business-day patterns and may change when officially published by SASSA.`,
    nextMonthTitle: "Coming up next",
    nextMonthBody: "Preview the following month's expected payment dates so you can plan ahead.",
  };
}

export function getHomepageContent(locale: Locale, month: number, year: number) {
  void locale;
  return buildHomepageContent(month, year);
}
