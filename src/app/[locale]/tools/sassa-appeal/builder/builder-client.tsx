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

const GRANT_TYPES = [
  { label: "SRD R370 Grant", value: "srd_r370" },
  { label: "Child Support Grant", value: "child_support" },
  { label: "Disability Grant", value: "disability" },
  { label: "Older Persons Grant", value: "older_persons" },
];

const REJECTION_REASONS = [
  { label: "Alternative Income Source", value: "alternative_income" },
  { label: "UIF Registered", value: "uif_registered" },
  { label: "NSFAS Registered", value: "nsfas_registered" },
  { label: "Identity Verification Failed", value: "identity_failed" },
  { label: "Medical Assessment Failed", value: "medical_failed" },
  { label: "Other / Unsure", value: "other" },
];

const TOTAL_STEPS = 4;

/* ── Types ── */

type FlowData = {
  grantType: string;
  rejectionReason: string;
  defense: string;
  fullName: string;
  idNumber: string;
};

type Screen = "grant" | "reason" | "defense" | "identity" | "loading";

/* ── Component ── */

export function BuilderClient({ locale }: { locale: Locale }) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [screen, setScreen] = useState<Screen>("grant");
  const [formData, setFormData] = useState<FlowData>({
    grantType: "",
    rejectionReason: "",
    defense: "",
    fullName: "",
    idNumber: "",
  });
  const [error, setError] = useState<string | null>(null);

  const stepIndex: Record<Screen, number> = {
    grant: 1,
    reason: 2,
    defense: 3,
    identity: 4,
    loading: 4,
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
      const res = await fetch("/api/tools/sassa-appeal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate appeal letter");
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/sassa-appeal/result/${data.id}`));
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

      {/* ── Screen 1: Grant Type ── */}
      {screen === "grant" && (
        <FlowScreen
          question="Which SASSA grant was rejected?"
        >
          <OptionGroup
            options={GRANT_TYPES}
            value={formData.grantType}
            onChange={(v) => selectAndAdvance("grantType", v, "reason")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 2: Rejection Reason ── */}
      {screen === "reason" && (
        <FlowScreen
          question="Why did SASSA reject your application?"
          subtitle="You can check your status on the SASSA portal to confirm."
          onBack={() => goTo("grant")}
        >
          <OptionGroup
            options={REJECTION_REASONS}
            value={formData.rejectionReason}
            onChange={(v) => selectAndAdvance("rejectionReason", v, "defense")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 3: Your Defense ── */}
      {screen === "defense" && (
        <FlowScreen
          question="Why is this rejection incorrect?"
          subtitle="Briefly explain the truth. We will structure it professionally for the Tribunal."
          onBack={() => goTo("reason")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <textarea
              ref={inputRef}
              className="flow-input w-full p-4 min-h-[120px]"
              placeholder="e.g. I have not received any income since 2021. The bank deposit was a gift from my sister..."
              value={formData.defense}
              onChange={(e) => setFormData((prev) => ({ ...prev, defense: e.target.value }))}
              autoFocus
            />
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              disabled={formData.defense.trim().length < 5}
              onClick={() => goTo("identity")}
            >
              Continue
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 4: Identity Details ── */}
      {screen === "identity" && (
        <FlowScreen
          question="Your Details for the Appeal"
          subtitle="Your information is used to generate your appeal draft."
          onBack={() => goTo("defense")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="space-y-4 text-left w-full max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  className="flow-input w-full"
                  placeholder="e.g. Sipho Nkosi"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">ID Number</label>
                <input
                  type="text"
                  className="flow-input w-full"
                  placeholder="e.g. 9001015043081"
                  value={formData.idNumber}
                  maxLength={13}
                  onChange={(e) => setFormData((prev) => ({ ...prev, idNumber: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && formData.fullName.length > 2 && formData.idNumber.length >= 13) {
                      generate();
                    }
                  }}
                />
              </div>
            </div>
            
            <button
              type="button"
              className="flow-btn flow-btn-primary mt-4"
              disabled={formData.fullName.trim().length < 2 || formData.idNumber.trim().length < 13}
              onClick={generate}
            >
              Draft My Appeal Letter
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 5: Loading ── */}
      {screen === "loading" && (
        <LoadingSequence
          error={error}
          onRetry={generate}
          title="Drafting appeal letter…"
          messages={[
            "Structuring format for the Independent Tribunal...",
            "Formalising your defense and circumstances...",
            "Generating list of required supporting affidavits...",
            "Preparing final document..."
          ]}
        />
      )}
    </>
  );
}
