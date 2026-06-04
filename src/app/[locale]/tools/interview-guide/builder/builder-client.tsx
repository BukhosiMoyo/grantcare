"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/interview-guide/progress-bar";
import { FlowScreen } from "@/components/interview-guide/flow-screen";
import { OptionGroup } from "@/components/interview-guide/option-card";
import { LoadingSequence } from "@/components/interview-guide/loading-sequence";
import { buildLocalePath, type Locale } from "@/lib/site";
import { getInterviewGuideCopy } from "../copy";

import "./builder.css";

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
  const copy = getInterviewGuideCopy(locale);

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
        headers: { "Content-Type": "application/json", "x-grantcare-locale": locale },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || copy.failedGenerate);
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/interview-guide/result/${data.id}`));
    } catch (err: unknown) {
      console.error("[builder]", err);
      setError(err instanceof Error ? err.message : copy.genericError);
    }
  }, [copy.failedGenerate, copy.genericError, formData, locale, router]);

  /* ── Render ── */
  return (
    <>
      {screen !== "loading" && (
        <ProgressBar current={stepIndex[screen]} total={TOTAL_STEPS} />
      )}

      {/* ── Screen 1: Job Role ── */}
      {screen === "job" && (
        <FlowScreen
          question={copy.jobQuestion}
          subtitle={copy.jobSubtitle}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder={copy.jobPlaceholder}
              value={formData.jobTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
              autoFocus
            />
            <div className="flow-chips">
              {copy.jobSuggestions.map((job) => (
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
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 2: Industry ── */}
      {screen === "industry" && (
        <FlowScreen
          question={copy.industryQuestion}
          onBack={() => goTo("job")}
        >
          <OptionGroup
            options={copy.industryOptions}
            value={formData.industry}
            onChange={(v) => selectAndAdvance("industry", v, "experience")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 3: Experience Level ── */}
      {screen === "experience" && (
        <FlowScreen
          question={copy.experienceQuestion}
          onBack={() => goTo("industry")}
        >
          <OptionGroup
            options={copy.experienceOptions}
            value={formData.experienceLevel}
            onChange={(v) => selectAndAdvance("experienceLevel", v, "concern")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 4: Biggest Concern ── */}
      {screen === "concern" && (
        <FlowScreen
          question={copy.concernQuestion}
          subtitle={copy.concernSubtitle}
          onBack={() => goTo("experience")}
        >
          <OptionGroup
            options={copy.concernOptions}
            value={formData.concern}
            onChange={(v) => selectAndAdvance("concern", v, "cv")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 5: CV Upload (MVP: Skip) ── */}
      {screen === "cv" && (
        <FlowScreen
          question={copy.cvQuestion}
          subtitle={copy.cvSubtitle}
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
              <p>{copy.cvUploadComingSoon}</p>
            </div>
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              onClick={generate}
            >
              {copy.generateButton}
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
