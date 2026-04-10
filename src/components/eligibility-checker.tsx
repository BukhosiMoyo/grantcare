"use client";

import { useMemo, useState } from "react";

import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ELIGIBILITY_RESULT_SLUGS, type PublicGrantType } from "@/lib/fallback-content";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";

type Answers = {
  ageBand?: "under18" | "adult" | "older";
  supportsChild?: "yes" | "no";
  fosterCare?: "yes" | "no";
  disabledAdult?: "yes" | "no";
  disabledChild?: "yes" | "no";
  noIncome?: "yes" | "no";
};

const QUESTIONS = [
  {
    key: "ageBand",
    label: "Age",
    options: [
      { value: "under18", label: "Under 18" },
      { value: "adult", label: "18 to 59" },
      { value: "older", label: "60 or older" },
    ],
  },
  {
    key: "supportsChild",
    label: "Do you care for a child?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "fosterCare",
    label: "Is the child in foster care?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "disabledAdult",
    label: "Do you need disability support for yourself?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "disabledChild",
    label: "Are you caring for a child with a severe disability?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "noIncome",
    label: "Do you currently have little or no income?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
] as const;

function findGrant(answers: Answers) {
  if (answers.ageBand === "older") {
    return ELIGIBILITY_RESULT_SLUGS.older;
  }

  if (answers.disabledChild === "yes") {
    return ELIGIBILITY_RESULT_SLUGS.disabledChild;
  }

  if (answers.fosterCare === "yes") {
    return ELIGIBILITY_RESULT_SLUGS.fosterCare;
  }

  if (answers.supportsChild === "yes") {
    return ELIGIBILITY_RESULT_SLUGS.supportsChild;
  }

  if (answers.disabledAdult === "yes") {
    return ELIGIBILITY_RESULT_SLUGS.disabledAdult;
  }

  if (answers.noIncome === "yes" && answers.ageBand === "adult") {
    return ELIGIBILITY_RESULT_SLUGS.noIncome;
  }

  return ELIGIBILITY_RESULT_SLUGS.fallback;
}

export function EligibilityChecker({
  locale,
  grants,
}: {
  locale: Locale;
  grants: PublicGrantType[];
}) {
  const copy = getCopy(locale);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const isComplete = step >= QUESTIONS.length;

  const result = useMemo(() => {
    if (!isComplete) {
      return null;
    }

    return grants.find((grant) => grant.slug === findGrant(answers)) ?? grants[0];
  }, [answers, grants, isComplete]);

  if (isComplete && result) {
    return (
      <div className="space-y-4">
        <div className="surface-card space-y-4 rounded-[var(--radius-card)] p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{copy.likelyMatch}</p>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">{result.name}</h3>
            <p className="text-base text-muted">{result.summary}</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">{copy.documents}</p>
            <ul className="space-y-2 text-sm text-muted">
              {result.documents.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
              className="focus-ring tap-target rounded-full border border-border bg-surface px-5 font-semibold"
            >
              {copy.startAgain}
            </button>
            <TrackedExternalLink
              href={result.officialHref}
              locale={locale}
              eventName="official_resource.clicked"
              eventPayload={{
                destination: "eligibility",
                grantSlug: result.slug,
              }}
              target="_blank"
              rel="noreferrer"
              className="primary-action focus-ring tap-target inline-flex items-center rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
            >
              {copy.officialNextStep}
            </TrackedExternalLink>
          </div>
        </div>
        <p className="text-sm text-muted">{copy.eligibilityResultsNote}</p>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="surface-card space-y-5 rounded-[var(--radius-card)] p-5 sm:p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
          Step {step + 1} of {QUESTIONS.length}
        </p>
        <h3 className="text-2xl font-semibold tracking-tight">{question.label}</h3>
      </div>
      <div className="grid gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setAnswers((current) => ({ ...current, [question.key]: option.value }));
              setStep((current) => current + 1);
            }}
            className="focus-ring tap-target rounded-3xl border border-border bg-surface px-5 text-left font-medium hover:bg-surface-muted"
          >
            {option.label}
          </button>
        ))}
      </div>
      {step > 0 ? (
        <button
          type="button"
          onClick={() => setStep((current) => current - 1)}
          className="focus-ring tap-target rounded-full border border-border bg-surface px-5 text-sm font-semibold"
        >
          Back
        </button>
      ) : null}
    </div>
  );
}
