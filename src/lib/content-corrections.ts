import type { PublicGuide, PublicNewsArticle } from "./fallback-content";

// Narrow corrections for the audited legacy records, including copies already
// stored in the CMS. A later editor's replacement does not match these guards.
const REVIEWED_AT = "2026-09-09";
const LIFE_CERTIFICATION_SOURCE = "https://www.gov.za/news/media-statements/sassa-self-service-system-restored-following-earlier-challenges-10-apr-2026";
const GUIDANCE_REPLACEMENTS: Record<string, Array<[string, string]>> = {
  "how-long-appeal-status-updates-take": [["An appeal can take anywhere from 30 days to 90 days. Instead of counting the days on your calendar, just keep an eye on the specific wording of your status.", "Appeal processing times vary. Check the official appeal status and any instructions or deadlines in your decision notice. Contact the appeal authority if you need an update on your case."]],
  "how-to-check-payment-method-before-pay-date": [["A 2-minute check today can save you 30 days of waiting.", "Checking your payment details before the pay date can help you identify a problem early."]],
  "how-to-know-if-an-appeal-is-worth-submitting": [["GrantCare helps you decide if you actually have a case before you waste 90 days waiting in the appeal queue.", "Check the official reason for the decision and the evidence available before preparing an appeal."]],
  "when-to-use-contact-details-instead-of-status-check": [["If your status has been stuck on 'Pending' for over 90 days, or if your banking details have been changed without your permission, stop checking your status and immediately call the official SASSA toll-free number (0800 60 10 11).", "Contact SASSA on 0800 60 10 11 if you need help with an unresolved status. If your banking details have changed without your permission, contact SASSA promptly rather than waiting for another status update."]],
  "what-identity-verification-sms-usually-means": [["But GrantCare strongly advises never clicking SMS links unless you requested them literally 5 minutes ago.", "Verify the message through an official SASSA contact or portal before following its instructions; the time it arrived does not establish that it is authentic."]],
};

export function correctGuide(guide: PublicGuide): PublicGuide {
  const replacements = GUIDANCE_REPLACEMENTS[guide.slug];
  if (replacements?.some(([before]) => guide.sections.some(section => section.body.includes(before)))) {
    return {
      ...guide,
      sections: guide.sections.map(section => ({ ...section, body: replacements.reduce((body, [before, after]) => body.replaceAll(before, after), section.body) })),
      translations: {},
      updatedAt: REVIEWED_AT,
    };
  }
  if (guide.slug === "sassa-office-visit-survival-guide" && guide.sections.some(section => section.body.includes("Tuesdays and Thursdays"))) {
    return {
      ...guide,
      title: "Preparing for a SASSA office visit: documents and application receipt",
      summary: "Check your office's opening hours and the documents required for your grant before travelling.",
      sections: [
        { title: "Before your visit", body: "Contact the office to confirm its opening hours and whether your enquiry needs an appointment. Queue lengths vary; there is no verified nationwide quiet weekday or guaranteed early arrival time.\n• /sassa-office-locator" },
        { title: "Documents for your application", body: "Requirements depend on the grant and your circumstances. For a child support grant, the government checklist includes your ID, the child's birth certificate, evidence of earnings and maintenance, and relevant marriage, custody or death records. If an ID or birth certificate is unavailable, SASSA has an affidavit and supporting-document process. Ask the office about the applicable alternatives and certification requirements before travelling. A school report is listed where available in the alternative-document process; it is not a universal condition for every application.\n• https://www.gov.za/services/child-care-social-benefits/child-support-grant" },
        { title: "At the office", body: "Confirm that you are in the correct queue for your enquiry. Keep the application receipt SASSA gives you as proof that you applied. Applying for a social grant through SASSA is free." },
      ],
      translations: {},
      updatedAt: REVIEWED_AT,
    };
  }
  if (guide.slug === "what-biometric-identity-verification-means" && guide.sections.some(section => section.body.includes("SASSA only asks for it when they suspect fraud"))) {
    return {
      ...guide,
      sections: guide.sections.map(section => section.body.includes("SASSA only asks for it when they suspect fraud")
        ? { ...section, body: `Biometric checks can also form part of routine life certification. SASSA's April 2026 statement describes e-Life Certification through its online services portal using eKYC. A request does not by itself mean SASSA suspects fraud. Follow the official instructions and deadline for your case.\n• ${LIFE_CERTIFICATION_SOURCE}` }
        : section.body.includes("This is their highest level of security")
          ? { ...section, body: "Biometric identity verification uses a physical characteristic, such as a facial image, to help confirm a person's identity. Check the request through the official SASSA route before sharing biometric information." }
          : section),
      translations: {},
      updatedAt: REVIEWED_AT,
    };
  }
  return guide;
}

export function correctNews(article: PublicNewsArticle): PublicNewsArticle {
  if (article.slug === "sassa-new-biometric-verification-rules" && article.sourceUrls.some(url => url.includes("biometric-facial-recognition-system") || url.includes("21-jun-2026"))) {
    return {
      ...article,
      title: "SASSA biometric verification and e-Life Certification",
      summary: "SASSA's April 2026 statement explains how beneficiaries can complete life certification through its online services portal.",
      sections: [
        { title: "What SASSA confirmed", body: "SASSA reported on 10 April 2026 that access problems with its self-service system had been resolved. The agency described e-Life Certification through the SASSA Online Services Portal, using biometric verification through eKYC." },
        { title: "Who needs to respond", body: "The statement encourages beneficiaries who can use the portal to complete life certification annually. Anyone specifically instructed by SASSA to complete it must follow the deadline in that request. Life certification checks that a beneficiary remains alive and eligible; a request does not automatically imply fraud." },
        { title: "Use the official route", body: "Use SASSA's official online services portal. Contact SASSA or your nearest office if you need help completing life certification." },
      ],
      sourceUrls: [LIFE_CERTIFICATION_SOURCE, "https://services.sassa.gov.za/portal/r/sassa/sassa"],
      translations: {},
      updatedAt: REVIEWED_AT,
    };
  }
  if (article.slug === "sassa-payment-schedule-2026-2027" && JSON.stringify([article.sections, article.translations]).includes("R1,295")) {
    const fix = (body: string) => body.replaceAll("R1,295", "R1,290");
    return {
      ...article,
      sections: article.sections.map(section => ({ ...section, body: fix(section.body) })),
      translations: JSON.parse(fix(JSON.stringify(article.translations ?? {}))),
      updatedAt: REVIEWED_AT,
    };
  }
  return article;
}
