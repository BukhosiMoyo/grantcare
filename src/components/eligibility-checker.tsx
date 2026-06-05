"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ComponentType, SVGProps } from "react";

import {
  ChildIcon,
  ChevronRightIcon,
  FileCheckIcon,
  HeartPulseIcon,
  ShieldCheckIcon,
  SparkIcon,
  UserIcon,
  WalletIcon,
} from "@/components/icons";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { getCopy } from "@/lib/copy";
import {
  ELIGIBILITY_QUESTIONS,
  getEligibilityResult,
  getEligibilityStatusLabel,
  getNextEligibilityQuestion,
  getVisibleEligibilityQuestions,
  type ChecklistItem,
  type EligibilityAnswers,
  type EligibilityQuestionKey,
} from "@/lib/eligibility-wizard";
import { buildLocalePath, type Locale } from "@/lib/site";

const RESULT_NOTE =
  "GrantCare gives general guidance only. SASSA makes the final decision.";

const QUESTION_ICONS: Partial<Record<EligibilityQuestionKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  focus: SparkIcon,
  ageBand: UserIcon,
  citizenship: ShieldCheckIcon,
  residesInSa: ShieldCheckIcon,
  adultDisability: HeartPulseIcon,
  childSevereDisability: HeartPulseIcon,
  medicalAssessment: FileCheckIcon,
  caresForChild: ChildIcon,
  childUnder18: ChildIcon,
  primaryCaregiver: ChildIcon,
  fosterCourtOrder: FileCheckIcon,
  receivesQualifyingGrant: WalletIcon,
  needsDailyCare: HeartPulseIcon,
  srdNoSupport: WalletIcon,
  meansConcern: WalletIcon,
  stateInstitution: ShieldCheckIcon,
  receivesOwnGrant: WalletIcon,
};

const FOCUS_OPTION_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  myself: UserIcon,
  child: ChildIcon,
  care: HeartPulseIcon,
  srd: WalletIcon,
};

function clearLaterAnswers(answers: EligibilityAnswers, key: EligibilityQuestionKey) {
  const index = ELIGIBILITY_QUESTIONS.findIndex((question) => question.key === key);

  return ELIGIBILITY_QUESTIONS.reduce<EligibilityAnswers>((next, question, questionIndex) => {
    if (questionIndex <= index && answers[question.key] !== undefined) {
      next[question.key] = answers[question.key];
    }

    return next;
  }, {});
}

function Progress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const width = `${Math.min(100, Math.max(8, (current / Math.max(total, 1)) * 100))}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
        <span>Readiness flow</span>
        <span>{Math.round((current / Math.max(total, 1)) * 100)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-surface-strong shadow-inner">
        <div className="h-full rounded-full bg-primary shadow-[0_8px_18px_-10px_var(--primary)] transition-all" style={{ width }} />
      </div>
    </div>
  );
}

function Checklist({
  items,
  completed,
  onToggle,
}: {
  items: ChecklistItem[];
  completed: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <label
          key={item.key}
          className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
        >
          <input
            type="checkbox"
            className="mt-1"
            checked={completed.includes(item.key)}
            onChange={() => onToggle(item.key)}
          />
          <span className="grid gap-1">
            <span className="font-medium text-foreground">{item.label}</span>
            {item.sourceHref ? (
              <a
                href={item.sourceHref}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary underline decoration-border underline-offset-4"
              >
                Official source
              </a>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
}

export function EligibilityChecker({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const [answers, setAnswers] = useState<EligibilityAnswers>({});
  const [completedKeys, setCompletedKeys] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error" | "signin">("idle");

  const question = getNextEligibilityQuestion(answers);
  const visibleQuestions = getVisibleEligibilityQuestions(answers);
  const answeredCount = visibleQuestions.filter((item) => answers[item.key] !== undefined).length;
  const result = useMemo(() => {
    if (question) {
      return null;
    }

    return getEligibilityResult(answers, locale);
  }, [answers, locale, question]);

  const currentIndex = question
    ? visibleQuestions.findIndex((item) => item.key === question.key) + 1
    : visibleQuestions.length;

  async function updateSavedChecklist(nextCompletedKeys: string[]) {
    if (!sessionId) {
      return;
    }

    await fetch(`/api/eligibility-wizard/sessions/${sessionId}/checklist`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completedKeys: nextCompletedKeys }),
    }).catch(() => undefined);
  }

  function toggleChecklistItem(key: string) {
    setCompletedKeys((current) => {
      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key];

      void updateSavedChecklist(next);
      return next;
    });
  }

  async function saveChecklist() {
    if (!result) {
      return;
    }

    setSaveStatus("saving");

    const response = await fetch("/api/eligibility-wizard/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-grantcare-locale": locale },
      body: JSON.stringify({
        answers,
        completedKeys,
        result,
      }),
    });

    if (response.status === 401) {
      setSaveStatus("signin");
      return;
    }

    if (!response.ok) {
      setSaveStatus("error");
      return;
    }

    const data = await response.json();
    setSessionId(typeof data.id === "string" ? data.id : null);
    setSaveStatus("saved");
  }

  if (result) {
    const completedCount = completedKeys.filter((key) =>
      result.checklist.some((item) => item.key === key),
    ).length;
    const signInHref = `${buildLocalePath(locale, "/sign-in")}?next=${encodeURIComponent(
      buildLocalePath(locale, "/eligibility-checker"),
    )}`;

    return (
      <div className="space-y-5">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="surface-card relative overflow-hidden space-y-6 rounded-[var(--radius-card)] p-5 sm:p-6">
            <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <ShieldCheckIcon className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                {getEligibilityStatusLabel(result.status)}
              </p>
              <h3 className="max-w-[13ch] text-3xl font-semibold leading-tight tracking-tight">{result.title}</h3>
              <p className="text-base text-muted">{result.reason}</p>
            </div>

            {result.blockers.length > 0 ? (
              <div className="space-y-2">
                <p className="font-medium text-foreground">Review</p>
                <ul className="space-y-2 text-sm text-muted">
                  {result.blockers.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setCompletedKeys([]);
                  setSessionId(null);
                  setSaveStatus("idle");
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
                  destination: "eligibility_wizard",
                  grantSlug: result.grantSlug,
                }}
                target="_blank"
                rel="noreferrer"
                className="primary-action focus-ring tap-target inline-flex items-center rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-strong"
              >
                {copy.officialNextStep}
              </TrackedExternalLink>
            </div>
          </div>

          <div className="surface-card space-y-5 rounded-[var(--radius-card)] p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <FileCheckIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                      Documents
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight">Checklist</h3>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-muted">
                {completedCount}/{result.checklist.length}
              </p>
            </div>

            <Checklist
              items={result.checklist}
              completed={completedKeys}
              onToggle={toggleChecklistItem}
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={saveStatus === "saving"}
                onClick={saveChecklist}
                className="primary-action focus-ring tap-target rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saveStatus === "saving" ? "Saving" : saveStatus === "saved" ? "Saved" : "Save"}
              </button>
              {sessionId ? (
                <a
                  href={`/api/eligibility-wizard/sessions/${sessionId}/pdf`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-5 font-semibold hover:bg-surface-muted"
                >
                  Download PDF
                </a>
              ) : null}
              {saveStatus === "signin" ? (
                <Link
                  href={signInHref}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-5 font-semibold hover:bg-surface-muted"
                >
                  Sign in
                </Link>
              ) : null}
            </div>

            {saveStatus === "error" ? (
              <p className="text-sm font-medium text-danger">Could not save.</p>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-muted">{RESULT_NOTE}</p>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  const QuestionIcon = QUESTION_ICONS[question.key] ?? SparkIcon;

  return (
    <div className="surface-card overflow-hidden rounded-[var(--radius-card)] p-0">
      <div className="grid gap-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="border-b border-border bg-surface-strong/65 p-5 lg:border-b-0 lg:border-r">
          <div className="space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_16px_30px_-22px_var(--primary)]">
              <QuestionIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                Step {Math.min(currentIndex, visibleQuestions.length)} of {visibleQuestions.length}
              </p>
              <p className="text-sm text-muted">Pre-application check</p>
            </div>
            <Progress current={Math.max(currentIndex, answeredCount + 1)} total={visibleQuestions.length} />
          </div>
        </aside>
        <div className="space-y-6 p-5 sm:p-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold tracking-tight">{question.label}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const OptionIcon = question.key === "focus" ? (FOCUS_OPTION_ICONS[option.value] ?? QuestionIcon) : QuestionIcon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setAnswers((current) =>
                      clearLaterAnswers(
                        { ...current, [question.key]: option.value },
                        question.key,
                      ),
                    );
                    setCompletedKeys([]);
                    setSessionId(null);
                    setSaveStatus("idle");
                  }}
                  className="focus-ring group grid min-h-24 grid-cols-[2.75rem_minmax(0,1fr)_1.25rem] items-center gap-3 rounded-3xl border border-border bg-surface px-4 py-4 text-left transition-colors hover:border-primary/30 hover:bg-surface-muted"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <OptionIcon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold leading-snug text-foreground">{option.label}</span>
                  <ChevronRightIcon className="h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })}
          </div>
          {answeredCount > 0 ? (
            <button
              type="button"
              onClick={() => {
                const answeredVisible = visibleQuestions.filter((item) => answers[item.key] !== undefined);
                const previous = answeredVisible.at(-1);

                if (!previous) {
                  return;
                }

                const nextAnswers = { ...answers };
                delete nextAnswers[previous.key];
                setAnswers(clearLaterAnswers(nextAnswers, previous.key));
              }}
              className="focus-ring tap-target w-fit rounded-full border border-border bg-surface px-5 text-sm font-semibold"
            >
              Back
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
