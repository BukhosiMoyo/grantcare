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

const EMAIL_TYPES = [
  { label: "Apply for a job", value: "application" },
  { label: "Send CV without a vacancy", value: "cold-cv" },
  { label: "Follow up on application", value: "follow-up" },
  { label: "Confirm interview", value: "confirm-interview" },
  { label: "Thank you after interview", value: "thank-you" },
  { label: "Internship / Learnership", value: "internship" },
];

const EXPERIENCE_OPTIONS = [
  { label: "No experience", value: "none" },
  { label: "Some experience", value: "some" },
  { label: "Experienced", value: "experienced" },
];

const TONE_OPTIONS = [
  { label: "Professional", value: "professional" },
  { label: "Friendly professional", value: "friendly" },
  { label: "Formal", value: "formal" },
  { label: "Confident", value: "confident" },
];

const LENGTH_OPTIONS = [
  { label: "Short & simple", value: "short" },
  { label: "Detailed & strong", value: "detailed" },
];

const JOB_SUGGESTIONS = ["Admin Clerk", "Retail Assistant", "Call Centre Agent"];
const COMPANY_SUGGESTIONS = ["Shoprite", "Transnet", "Small business"];

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate email");
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/email-template/result/${data.id}`));
    } catch (err: unknown) {
      console.error("[builder]", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }, [formData, locale, router]);

  return (
    <>
      {screen !== "loading" && (
        <ProgressBar current={stepIndex[screen]} total={TOTAL_STEPS} />
      )}

      {/* ── Screen 1: Email Type ── */}
      {screen === "type" && (
        <FlowScreen
          question="What kind of email do you need?"
        >
          <OptionGroup
            options={EMAIL_TYPES}
            value={formData.emailType}
            onChange={(v) => selectAndAdvance("emailType", v, "job")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 2: Job Role ── */}
      {screen === "job" && (
        <FlowScreen
          question="What job are you applying for?"
          subtitle="If it's an internship/learnership, specify the field."
          onBack={() => goTo("type")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder="e.g. Admin Clerk, Retail Assistant"
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
              Continue
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 3: Company Name ── */}
      {screen === "company" && (
        <FlowScreen
          question="Which company is this for?"
          subtitle="Used to naturally personalise the email."
          onBack={() => goTo("job")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder="e.g. Shoprite, Transnet, Small business"
              value={formData.companyName}
              onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
              autoFocus
            />
            <div className="flow-chips">
              {COMPANY_SUGGESTIONS.map((comp) => (
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
              Continue
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 4: Experience Level ── */}
      {screen === "experience" && (
        <FlowScreen
          question="What's your experience level?"
          onBack={() => goTo("company")}
        >
          <OptionGroup
            options={EXPERIENCE_OPTIONS}
            value={formData.experienceLevel}
            onChange={(v) => selectAndAdvance("experienceLevel", v, "tone")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 5: Tone ── */}
      {screen === "tone" && (
        <FlowScreen
          question="How should your email sound?"
          onBack={() => goTo("experience")}
        >
          <OptionGroup
            options={TONE_OPTIONS}
            value={formData.tone}
            onChange={(v) => selectAndAdvance("tone", v, "length")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 6: Email Length ── */}
      {screen === "length" && (
        <FlowScreen
          question="What type of email do you want?"
          onBack={() => goTo("tone")}
        >
          <OptionGroup
            options={LENGTH_OPTIONS}
            value={formData.length}
            onChange={(v) => selectAndAdvance("length", v, "name")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 7: Name Input ── */}
      {screen === "name" && (
        <FlowScreen
          question="What's your name?"
          subtitle="Used for the professional closing line."
          onBack={() => goTo("length")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              ref={inputRef}
              type="text"
              className="flow-input"
              placeholder="e.g. Bukhosi"
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
              Create My Email
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 8: Loading ── */}
      {screen === "loading" && (
        <LoadingSequence
          error={error}
          onRetry={generate}
          title="Writing your professional email…"
          messages={[
            "Structuring your message...",
            "Making it sound professional...",
            "Customising for your situation...",
            "Formatting for easy reading..."
          ]}
        />
      )}
    </>
  );
}
