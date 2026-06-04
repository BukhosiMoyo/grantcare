"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/interview-guide/progress-bar";
import { FlowScreen } from "@/components/interview-guide/flow-screen";
import { OptionGroup } from "@/components/interview-guide/option-card";
import { LoadingSequence } from "@/components/interview-guide/loading-sequence";
import { buildLocalePath, type Locale } from "@/lib/site";
import { getEmailTemplateCopy } from "../copy";

import "./builder.css";

const TOTAL_STEPS = 8; 

/* ── Types ── */

type FlowData = {
  emailType: string;
  jobTitle: string;
  companyName: string;
  experienceLevel: string;
  tone: string;
  length: string;
  userName: string;
};

type Screen = "type" | "job" | "company" | "experience" | "tone" | "length" | "name" | "loading";

/* ── Component ── */

export function BuilderClient({ locale }: { locale: Locale }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const copy = getEmailTemplateCopy(locale);

  const [screen, setScreen] = useState<Screen>("type");
  const [formData, setFormData] = useState<FlowData>({
    emailType: "",
    jobTitle: "",
    companyName: "",
    experienceLevel: "",
    tone: "",
    length: "",
    userName: "",
  });
  const [error, setError] = useState<string | null>(null);

  const stepIndex: Record<Screen, number> = {
    type: 1,
    job: 2,
    company: 3,
    experience: 4,
    tone: 5,
    length: 6,
    name: 7,
    loading: 8,
  };

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const selectAndAdvance = useCallback(
    (field: keyof FlowData, value: string, next: Screen) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setTimeout(() => goTo(next), 250);
    },
    [goTo],
  );

  const generate = useCallback(async () => {
    setError(null);
    setScreen("loading");

    try {
      const res = await fetch("/api/tools/email-template/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-grantcare-locale": locale },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || copy.failedGenerate);
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/email-template/result/${data.id}`));
    } catch (err: unknown) {
      console.error("[builder]", err);
      setError(err instanceof Error ? err.message : copy.genericError);
    }
  }, [copy.failedGenerate, copy.genericError, formData, locale, router]);

  return (
    <>
      {screen !== "loading" && (
        <ProgressBar current={stepIndex[screen]} total={TOTAL_STEPS} />
      )}

      {/* ── Screen 1: Email Type ── */}
      {screen === "type" && (
        <FlowScreen
          question={copy.typeQuestion}
        >
          <OptionGroup
            options={copy.emailTypes}
            value={formData.emailType}
            onChange={(v) => selectAndAdvance("emailType", v, "job")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 2: Job Role ── */}
      {screen === "job" && (
        <FlowScreen
          question={copy.jobQuestion}
          subtitle={copy.jobSubtitle}
          onBack={() => goTo("type")}
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
                    setTimeout(() => goTo("company"), 250);
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
              onClick={() => goTo("company")}
            >
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 3: Company Name ── */}
      {screen === "company" && (
        <FlowScreen
          question={copy.companyQuestion}
          subtitle={copy.companySubtitle}
          onBack={() => goTo("job")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder={copy.companyPlaceholder}
              value={formData.companyName}
              onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
              autoFocus
            />
            <div className="flow-chips">
              {copy.companySuggestions.map((comp) => (
                <button
                  key={comp}
                  type="button"
                  className="flow-chip"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, companyName: comp }));
                    setTimeout(() => goTo("experience"), 250);
                  }}
                >
                  {comp}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              disabled={formData.companyName.trim().length < 2}
              onClick={() => goTo("experience")}
            >
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 4: Experience Level ── */}
      {screen === "experience" && (
        <FlowScreen
          question={copy.experienceQuestion}
          onBack={() => goTo("company")}
        >
          <OptionGroup
            options={copy.experienceOptions}
            value={formData.experienceLevel}
            onChange={(v) => selectAndAdvance("experienceLevel", v, "tone")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 5: Tone ── */}
      {screen === "tone" && (
        <FlowScreen
          question={copy.toneQuestion}
          onBack={() => goTo("experience")}
        >
          <OptionGroup
            options={copy.toneOptions}
            value={formData.tone}
            onChange={(v) => selectAndAdvance("tone", v, "length")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 6: Email Length ── */}
      {screen === "length" && (
        <FlowScreen
          question={copy.lengthQuestion}
          onBack={() => goTo("tone")}
        >
          <OptionGroup
            options={copy.lengthOptions}
            value={formData.length}
            onChange={(v) => selectAndAdvance("length", v, "name")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 7: Name Input ── */}
      {screen === "name" && (
        <FlowScreen
          question={copy.nameQuestion}
          subtitle={copy.nameSubtitle}
          onBack={() => goTo("length")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder={copy.namePlaceholder}
              value={formData.userName}
              onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && formData.userName.trim().length >= 2) {
                  generate();
                }
              }}
              autoFocus
            />
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              disabled={formData.userName.trim().length < 2}
              onClick={generate}
            >
              {copy.cta}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 8: Loading ── */}
      {screen === "loading" && (
        <LoadingSequence
          error={error}
          onRetry={generate}
          title={copy.loadingTitle}
          messages={copy.loadingMessages}
        />
      )}
    </>
  );
}
