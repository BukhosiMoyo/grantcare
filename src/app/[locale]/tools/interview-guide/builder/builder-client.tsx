"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/interview-guide/progress-bar";
import { FlowScreen } from "@/components/interview-guide/flow-screen";
import { OptionGroup } from "@/components/interview-guide/option-card";
import { LoadingSequence } from "@/components/interview-guide/loading-sequence";
import { buildLocalePath, type Locale } from "@/lib/site";

import "./builder.css";

/* ── Flow Data ── */

const INDUSTRY_OPTIONS = [
  { label: "Retail", value: "Retail" },
  { label: "Customer Service", value: "Customer Service" },
  { label: "Government", value: "Government" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Other", value: "Other" },
];

const EXPERIENCE_OPTIONS = [
  { label: "No experience", value: "none" },
  { label: "Less than 1 year", value: "less-than-1" },
  { label: "1–3 years", value: "1-3" },
  { label: "3+ years", value: "3-plus" },
];

const CONCERN_OPTIONS = [
  { label: "I don\u2019t know what to say", value: "dont-know-what-to-say" },
  { label: "I get nervous", value: "get-nervous" },
  { label: "I don\u2019t have experience", value: "no-experience" },
  { label: "I don\u2019t know what questions they\u2019ll ask", value: "unknown-questions" },
];

const JOB_SUGGESTIONS = [
  "Retail Assistant",
  "Call Centre Agent",
  "Admin Clerk",
  "General Worker",
];

const TOTAL_STEPS = 5; // Job + Industry + Experience + Concern + CV(skip)

/* ── Types ── */

type FlowData = {
  jobTitle: string;
  industry: string;
  experienceLevel: string;
  concern: string;
};

type Screen = "job" | "industry" | "experience" | "concern" | "cv" | "loading";

/* ── Component ── */

export function BuilderClient({ locale }: { locale: Locale }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [screen, setScreen] = useState<Screen>("job");
  const [formData, setFormData] = useState<FlowData>({
    jobTitle: "",
    industry: "",
    experienceLevel: "",
    concern: "",
  });
  const [error, setError] = useState<string | null>(null);

  /* ── Step index for progress bar ── */
  const stepIndex: Record<Screen, number> = {
    job: 1,
    industry: 2,
    experience: 3,
    concern: 4,
    cv: 5,
    loading: 5,
  };

  /* ── Navigation helpers ── */
  const goTo = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const selectAndAdvance = useCallback(
    (field: keyof FlowData, value: string, next: Screen) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Small delay so user sees the selection before advancing
      setTimeout(() => goTo(next), 300);
    },
    [goTo],
  );

  /* ── Generate ── */
  const generate = useCallback(async () => {
    setError(null);
    setScreen("loading");

    try {
      const res = await fetch("/api/tools/interview-guide/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate guide");
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/interview-guide/result/${data.id}`));
    } catch (err: unknown) {
      console.error("[builder]", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }, [formData, locale, router]);

  /* ── Render ── */
  return (
    <>
      {screen !== "loading" && (
        <ProgressBar current={stepIndex[screen]} total={TOTAL_STEPS} />
      )}

      {/* ── Screen 1: Job Role ── */}
      {screen === "job" && (
        <FlowScreen
          question="What job are you preparing for?"
          subtitle="Type below or pick a suggestion"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder="e.g. Sales Assistant"
              value={formData.jobTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
              autoFocus
            />
            <div className="flow-chips">
              {JOB_SUGGESTIONS.map((job) => (
                <button
                  key={job}
                  type="button"
                  className="flow-chip"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, jobTitle: job }));
                    setTimeout(() => goTo("industry"), 250);
                  }}
                >
                  {job}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              disabled={formData.jobTitle.trim().length < 2}
              onClick={() => goTo("industry")}
            >
              Continue
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 2: Industry ── */}
      {screen === "industry" && (
        <FlowScreen
          question="Which industry is this job in?"
          onBack={() => goTo("job")}
        >
          <OptionGroup
            options={INDUSTRY_OPTIONS}
            value={formData.industry}
            onChange={(v) => selectAndAdvance("industry", v, "experience")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 3: Experience Level ── */}
      {screen === "experience" && (
        <FlowScreen
          question="How much experience do you have?"
          onBack={() => goTo("industry")}
        >
          <OptionGroup
            options={EXPERIENCE_OPTIONS}
            value={formData.experienceLevel}
            onChange={(v) => selectAndAdvance("experienceLevel", v, "concern")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 4: Biggest Concern ── */}
      {screen === "concern" && (
        <FlowScreen
          question="What worries you most about interviews?"
          subtitle="This helps us personalise your answers"
          onBack={() => goTo("experience")}
        >
          <OptionGroup
            options={CONCERN_OPTIONS}
            value={formData.concern}
            onChange={(v) => selectAndAdvance("concern", v, "cv")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 5: CV Upload (MVP: Skip) ── */}
      {screen === "cv" && (
        <FlowScreen
          question="Want better, personalised answers?"
          subtitle="Upload your CV for more tailored responses"
          onBack={() => goTo("concern")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                padding: "2rem",
                borderRadius: "1rem",
                border: "2px dashed var(--border)",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "0.9375rem",
              }}
            >
              <p style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>📄</p>
              <p>CV upload coming soon</p>
            </div>
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              onClick={generate}
            >
              Skip & Generate My Guide
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 6: Loading ── */}
      {screen === "loading" && (
        <LoadingSequence
          error={error}
          onRetry={generate}
        />
      )}
    </>
  );
}
