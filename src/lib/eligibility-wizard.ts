import type { Locale } from "@/lib/site";

export type EligibilityGrantSlug =
  | "older-persons"
  | "child-support"
  | "foster-child"
  | "disability"
  | "care-dependency"
  | "grant-in-aid"
  | "social-relief";

export type EligibilityStatus = "likely" | "possible" | "unlikely" | "official";

export type EligibilityAnswerValue = string;

export type EligibilityAnswers = Partial<Record<EligibilityQuestionKey, EligibilityAnswerValue>>;

export type EligibilityQuestionKey =
  | "focus"
  | "ageBand"
  | "citizenship"
  | "residesInSa"
  | "stateInstitution"
  | "receivesOwnGrant"
  | "meansConcern"
  | "adultDisability"
  | "medicalAssessment"
  | "caresForChild"
  | "childUnder18"
  | "primaryCaregiver"
  | "fosterCourtOrder"
  | "childSevereDisability"
  | "receivesQualifyingGrant"
  | "needsDailyCare"
  | "srdNoSupport";

export type EligibilityQuestion = {
  key: EligibilityQuestionKey;
  label: string;
  options: Array<{ value: string; label: string }>;
  when?: (answers: EligibilityAnswers) => boolean;
};

export type ChecklistItem = {
  key: string;
  label: string;
  sourceHref?: string;
};

export type EligibilityResult = {
  grantSlug: EligibilityGrantSlug;
  status: EligibilityStatus;
  title: string;
  reason: string;
  blockers: string[];
  checklist: ChecklistItem[];
  officialHref: string;
};

const SASSA_GRANTS_INFORMATION =
  "https://services.sassa.gov.za/portal/r/sassa/sassa/grants-information";
const SASSA_FAQ = "https://services.sassa.gov.za/portal/r/sassa/sassa/faq";
const SASSA_FORMS = "https://services.sassa.gov.za/portal/r/sassa/sassa/download-center";
const SRD_PORTAL = "https://srd.sassa.gov.za/";

export const ELIGIBILITY_OFFICIAL_SOURCES = [
  SASSA_GRANTS_INFORMATION,
  SASSA_FAQ,
  SASSA_FORMS,
  SRD_PORTAL,
] as const;

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    key: "focus",
    label: "Grant path",
    options: [
      { value: "myself", label: "For myself" },
      { value: "child", label: "For a child" },
      { value: "care", label: "Extra care support" },
      { value: "srd", label: "SRD / no income" },
    ],
  },
  {
    key: "ageBand",
    label: "Age",
    options: [
      { value: "under16", label: "Under 16" },
      { value: "16to17", label: "16 to 17" },
      { value: "18to59", label: "18 to 59" },
      { value: "60plus", label: "60 or older" },
    ],
  },
  {
    key: "citizenship",
    label: "Status",
    options: [
      { value: "yes", label: "Citizen / permanent resident / refugee" },
      { value: "no", label: "None of these" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    key: "residesInSa",
    label: "Residence",
    options: [
      { value: "yes", label: "Lives in South Africa" },
      { value: "no", label: "Lives outside South Africa" },
    ],
  },
  {
    key: "receivesOwnGrant",
    label: "Current grant",
    options: [
      { value: "no", label: "No other grant for myself" },
      { value: "yes", label: "Already receive one" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "myself" && answers.ageBand === "60plus",
  },
  {
    key: "adultDisability",
    label: "Disability",
    options: [
      { value: "yes", label: "Limits work" },
      { value: "no", label: "Does not limit work" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "myself" && answers.ageBand === "18to59",
  },
  {
    key: "caresForChild",
    label: "Child care",
    options: [
      { value: "yes", label: "I care for the child" },
      { value: "no", label: "I do not" },
    ],
    when: (answers) => answers.focus === "child",
  },
  {
    key: "childUnder18",
    label: "Child age",
    options: [
      { value: "yes", label: "Under 18" },
      { value: "no", label: "18 or older" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "child" && answers.caresForChild === "yes",
  },
  {
    key: "primaryCaregiver",
    label: "Caregiver role",
    options: [
      { value: "yes", label: "Primary caregiver" },
      { value: "no", label: "Not primary caregiver" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "child" && answers.childUnder18 === "yes",
  },
  {
    key: "fosterCourtOrder",
    label: "Court order",
    options: [
      { value: "yes", label: "Foster care order" },
      { value: "no", label: "No court order" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "child" && answers.childUnder18 === "yes",
  },
  {
    key: "childSevereDisability",
    label: "Child disability",
    options: [
      { value: "yes", label: "Severe disability" },
      { value: "no", label: "No severe disability" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "child" && answers.childUnder18 === "yes",
  },
  {
    key: "receivesQualifyingGrant",
    label: "Existing grant",
    options: [
      { value: "yes", label: "Older / Disability / War Veterans" },
      { value: "no", label: "No qualifying grant" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "care",
  },
  {
    key: "needsDailyCare",
    label: "Daily care",
    options: [
      { value: "yes", label: "Needs regular help" },
      { value: "no", label: "Does not need regular help" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "care" && answers.receivesQualifyingGrant !== undefined,
  },
  {
    key: "medicalAssessment",
    label: "Medical report",
    options: [
      { value: "yes", label: "Recent report available" },
      { value: "no", label: "No recent report" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) =>
      answers.adultDisability === "yes" ||
      answers.childSevereDisability === "yes" ||
      answers.needsDailyCare === "yes",
  },
  {
    key: "srdNoSupport",
    label: "Income support",
    options: [
      { value: "yes", label: "Little or no support" },
      { value: "no", label: "Has income support" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) => answers.focus === "srd",
  },
  {
    key: "meansConcern",
    label: "Income and assets",
    options: [
      { value: "likely", label: "Likely below the means test" },
      { value: "high", label: "May be too high" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) =>
      answers.focus === "myself" ||
      (answers.focus === "child" &&
        answers.childUnder18 === "yes" &&
        answers.fosterCourtOrder !== "yes") ||
      answers.focus === "srd",
  },
  {
    key: "stateInstitution",
    label: "State institution",
    options: [
      { value: "no", label: "Not cared for there" },
      { value: "yes", label: "Cared for there" },
      { value: "unsure", label: "Not sure" },
    ],
    when: (answers) =>
      answers.focus === "myself" ||
      answers.focus === "care" ||
      (answers.focus === "child" &&
        (answers.childSevereDisability === "yes" || answers.primaryCaregiver === "yes")),
  },
];

const GRANT_TITLES: Record<EligibilityGrantSlug, string> = {
  "older-persons": "Older Persons Grant",
  "child-support": "Child Support Grant",
  "foster-child": "Foster Child Grant",
  disability: "Disability Grant",
  "care-dependency": "Care Dependency Grant",
  "grant-in-aid": "Grant-in-Aid",
  "social-relief": "Social Relief of Distress",
};

const COMMON_DOCUMENTS: ChecklistItem[] = [
  { key: "id", label: "ID / refugee permit", sourceHref: SASSA_FAQ },
  { key: "residence", label: "Proof of residence", sourceHref: SASSA_GRANTS_INFORMATION },
];

const GRANT_CHECKLISTS: Record<EligibilityGrantSlug, ChecklistItem[]> = {
  "older-persons": [
    ...COMMON_DOCUMENTS,
    { key: "marital-status", label: "Proof of marital status", sourceHref: SASSA_FAQ },
    { key: "income", label: "Income proof", sourceHref: SASSA_FAQ },
    { key: "assets", label: "Asset proof", sourceHref: SASSA_FAQ },
    { key: "bank", label: "Bank statements / bank letter", sourceHref: SASSA_FAQ },
    { key: "older-affidavit", label: "Older persons affidavit", sourceHref: SASSA_FORMS },
  ],
  disability: [
    ...COMMON_DOCUMENTS,
    { key: "medical-report", label: "Medical assessment report", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "income", label: "Income proof", sourceHref: SASSA_FAQ },
    { key: "assets", label: "Asset proof", sourceHref: SASSA_FAQ },
    { key: "bank", label: "Bank statements / bank letter", sourceHref: SASSA_FAQ },
    { key: "disability-affidavit", label: "Disability affidavit", sourceHref: SASSA_FORMS },
  ],
  "child-support": [
    ...COMMON_DOCUMENTS,
    { key: "birth-certificate", label: "Child birth certificate", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "caregiver-proof", label: "Primary caregiver proof", sourceHref: SASSA_FAQ },
    { key: "income", label: "Income proof", sourceHref: SASSA_FAQ },
    { key: "bank", label: "Bank statements / bank letter", sourceHref: SASSA_FAQ },
  ],
  "foster-child": [
    ...COMMON_DOCUMENTS,
    { key: "birth-certificate", label: "Child birth certificate", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "court-order", label: "Foster care court order", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "school-proof", label: "School attendance proof if required", sourceHref: SASSA_FAQ },
  ],
  "care-dependency": [
    ...COMMON_DOCUMENTS,
    { key: "birth-certificate", label: "Child birth certificate", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "medical-report", label: "Medical assessment report", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "income", label: "Income proof if required", sourceHref: SASSA_FAQ },
    { key: "bank", label: "Bank statements / bank letter", sourceHref: SASSA_FAQ },
  ],
  "grant-in-aid": [
    ...COMMON_DOCUMENTS,
    { key: "existing-grant", label: "Existing grant details", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "medical-report", label: "Medical support proof", sourceHref: SASSA_GRANTS_INFORMATION },
    { key: "grant-in-aid-affidavit", label: "Grant-in-Aid affidavit", sourceHref: SASSA_FORMS },
  ],
  "social-relief": [
    { key: "id", label: "ID number", sourceHref: SRD_PORTAL },
    { key: "phone", label: "Mobile number", sourceHref: SRD_PORTAL },
    { key: "bank", label: "Banking details if required", sourceHref: SRD_PORTAL },
    { key: "consent", label: "Declaration and consent", sourceHref: SRD_PORTAL },
  ],
};

function no(value: string | undefined) {
  return value === "no" || value === "high";
}

function addBlocker(blockers: string[], condition: boolean, label: string) {
  if (condition) {
    blockers.push(label);
  }
}

function resolveGrantSlug(answers: EligibilityAnswers): EligibilityGrantSlug {
  if (answers.focus === "care") {
    return "grant-in-aid";
  }

  if (answers.focus === "srd") {
    return "social-relief";
  }

  if (answers.focus === "child") {
    if (answers.childSevereDisability === "yes") {
      return "care-dependency";
    }

    if (answers.fosterCourtOrder === "yes") {
      return "foster-child";
    }

    return "child-support";
  }

  if (answers.ageBand === "60plus") {
    return "older-persons";
  }

  if (answers.adultDisability === "yes") {
    return "disability";
  }

  return "social-relief";
}

export function getVisibleEligibilityQuestions(answers: EligibilityAnswers) {
  return ELIGIBILITY_QUESTIONS.filter((question) => !question.when || question.when(answers));
}

export function getNextEligibilityQuestion(answers: EligibilityAnswers) {
  return getVisibleEligibilityQuestions(answers).find((question) => answers[question.key] === undefined) ?? null;
}

export function getEligibilityResult(answers: EligibilityAnswers, locale: Locale = "en"): EligibilityResult {
  void locale;
  const grantSlug = resolveGrantSlug(answers);
  const blockers: string[] = [];

  addBlocker(blockers, no(answers.citizenship), "Status");
  addBlocker(blockers, no(answers.residesInSa), "Residence");
  addBlocker(blockers, answers.stateInstitution === "yes", "State institution");

  if (grantSlug === "older-persons") {
    addBlocker(blockers, answers.ageBand !== "60plus", "Age");
    addBlocker(blockers, answers.receivesOwnGrant === "yes", "Current grant");
    addBlocker(blockers, answers.meansConcern === "high", "Means test");
  }

  if (grantSlug === "disability") {
    addBlocker(blockers, answers.ageBand !== "18to59", "Age");
    addBlocker(blockers, answers.adultDisability === "no", "Disability");
    addBlocker(blockers, answers.medicalAssessment === "no", "Medical report");
    addBlocker(blockers, answers.meansConcern === "high", "Means test");
  }

  if (grantSlug === "child-support") {
    addBlocker(blockers, answers.caresForChild === "no", "Child care");
    addBlocker(blockers, answers.childUnder18 === "no", "Child age");
    addBlocker(blockers, answers.primaryCaregiver === "no", "Caregiver role");
    addBlocker(blockers, answers.meansConcern === "high", "Means test");
  }

  if (grantSlug === "foster-child") {
    addBlocker(blockers, answers.caresForChild === "no", "Child care");
    addBlocker(blockers, answers.childUnder18 === "no", "Child age");
    addBlocker(blockers, answers.fosterCourtOrder !== "yes", "Court order");
  }

  if (grantSlug === "care-dependency") {
    addBlocker(blockers, answers.caresForChild === "no", "Child care");
    addBlocker(blockers, answers.childUnder18 === "no", "Child age");
    addBlocker(blockers, answers.childSevereDisability === "no", "Child disability");
    addBlocker(blockers, answers.medicalAssessment === "no", "Medical report");
    addBlocker(blockers, answers.meansConcern === "high", "Means test");
  }

  if (grantSlug === "grant-in-aid") {
    addBlocker(blockers, answers.receivesQualifyingGrant === "no", "Existing grant");
    addBlocker(blockers, answers.needsDailyCare === "no", "Daily care");
    addBlocker(blockers, answers.medicalAssessment === "no", "Medical report");
  }

  if (grantSlug === "social-relief") {
    addBlocker(blockers, answers.srdNoSupport === "no", "Income support");
    addBlocker(blockers, answers.meansConcern === "high", "Income and assets");
  }

  const hasUnsure = Object.values(answers).some((value) => value === "unsure");
  const status: EligibilityStatus =
    blockers.length > 0 ? "unlikely" : hasUnsure ? "possible" : "likely";

  const reason =
    status === "likely"
      ? "General checks line up."
      : status === "possible"
        ? "Some answers need confirmation."
        : "One or more checks may block this path.";

  return {
    grantSlug,
    status,
    title: GRANT_TITLES[grantSlug],
    reason,
    blockers,
    checklist: GRANT_CHECKLISTS[grantSlug],
    officialHref: grantSlug === "social-relief" ? SRD_PORTAL : SASSA_GRANTS_INFORMATION,
  };
}

export function getEligibilityStatusLabel(status: EligibilityStatus) {
  if (status === "likely") {
    return "Likely match";
  }

  if (status === "possible") {
    return "Needs confirmation";
  }

  if (status === "official") {
    return "Official check needed";
  }

  return "May not qualify";
}

export function getEligibilityAnswerLabel(key: EligibilityQuestionKey, value: string) {
  const question = ELIGIBILITY_QUESTIONS.find((item) => item.key === key);
  return question?.options.find((option) => option.value === value)?.label ?? value;
}
