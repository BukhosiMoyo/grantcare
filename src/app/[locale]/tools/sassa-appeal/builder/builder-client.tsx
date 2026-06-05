"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "@/components/interview-guide/progress-bar";
import { FlowScreen } from "@/components/interview-guide/flow-screen";
import { OptionGroup } from "@/components/interview-guide/option-card";
import { LoadingSequence } from "@/components/interview-guide/loading-sequence";
import { buildLocalePath, type Locale } from "@/lib/site";
import { getSassaAppealCopy } from "../copy";

import "./builder.css";

const TOTAL_STEPS = 6;

/* ── Types ── */

type FlowData = {
  grantType: string;
  rejectionReason: string;
  decisionDate: string;
  declinedMonth: string;
  defense: string;
  fullName: string;
  idNumber: string;
  wantsReminder: string;
};

type Screen = "grant" | "date" | "reason" | "defense" | "identity" | "reminder" | "loading";

/* ── Component ── */

export function BuilderClient({ locale }: { locale: Locale }) {
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const copy = getSassaAppealCopy(locale);

  const [screen, setScreen] = useState<Screen>("grant");
  const [formData, setFormData] = useState<FlowData>({
    grantType: "",
    rejectionReason: "",
    decisionDate: "",
    declinedMonth: "",
    defense: "",
    fullName: "",
    idNumber: "",
    wantsReminder: "yes",
  });
  const [error, setError] = useState<string | null>(null);

  const stepIndex: Record<Screen, number> = {
    grant: 1,
    date: 2,
    reason: 3,
    defense: 4,
    identity: 5,
    reminder: 6,
    loading: 6,
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
        headers: { "Content-Type": "application/json", "x-grantcare-locale": locale },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || copy.failedGenerate);
      }

      const data = await res.json();
      router.push(buildLocalePath(locale, `/tools/sassa-appeal/result/${data.id}`));
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

      {/* ── Screen 1: Grant Type ── */}
      {screen === "grant" && (
        <FlowScreen
          question={copy.grantQuestion}
        >
          <OptionGroup
            options={copy.grantTypes}
            value={formData.grantType}
            onChange={(v) => selectAndAdvance("grantType", v, "date")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 2: Decline Date ── */}
      {screen === "date" && (
        <FlowScreen
          question={copy.dateQuestion}
          onBack={() => goTo("grant")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="space-y-4 text-left w-full max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-semibold mb-1">{copy.decisionDate}</label>
                <input
                  type="date"
                  className="flow-input w-full"
                  placeholder={copy.decisionDatePlaceholder}
                  value={formData.decisionDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, decisionDate: e.target.value }))}
                />
              </div>
              {formData.grantType === "srd_r370" && (
                <div>
                  <label className="block text-sm font-semibold mb-1">{copy.declinedMonth}</label>
                  <input
                    type="month"
                    className="flow-input w-full"
                    placeholder={copy.declinedMonthPlaceholder}
                    value={formData.declinedMonth}
                    onChange={(e) => setFormData((prev) => ({ ...prev, declinedMonth: e.target.value }))}
                  />
                </div>
              )}
            </div>
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              disabled={!formData.decisionDate || (formData.grantType === "srd_r370" && !formData.declinedMonth)}
              onClick={() => goTo("reason")}
            >
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 3: Rejection Reason ── */}
      {screen === "reason" && (
        <FlowScreen
          question={copy.reasonQuestion}
          subtitle={copy.reasonSubtitle}
          onBack={() => goTo("date")}
        >
          <OptionGroup
            options={copy.rejectionReasons}
            value={formData.rejectionReason}
            onChange={(v) => selectAndAdvance("rejectionReason", v, "defense")}
          />
        </FlowScreen>
      )}

      {/* ── Screen 4: Your Correction ── */}
      {screen === "defense" && (
        <FlowScreen
          question={copy.defenseQuestion}
          subtitle={copy.defenseSubtitle}
          onBack={() => goTo("reason")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <textarea
              ref={inputRef}
              className="flow-input w-full p-4 min-h-[120px]"
              placeholder={copy.defensePlaceholder}
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
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 5: Identity Details ── */}
      {screen === "identity" && (
        <FlowScreen
          question={copy.identityQuestion}
          subtitle={copy.identitySubtitle}
          onBack={() => goTo("defense")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="space-y-4 text-left w-full max-w-sm mx-auto">
              <div>
                <label className="block text-sm font-semibold mb-1">{copy.fullName}</label>
                <input
                  type="text"
                  className="flow-input w-full"
                  placeholder={copy.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">{copy.idNumber}</label>
                <input
                  type="text"
                  className="flow-input w-full"
                  placeholder={copy.idNumberPlaceholder}
                  value={formData.idNumber}
                  maxLength={13}
                  onChange={(e) => setFormData((prev) => ({ ...prev, idNumber: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && formData.fullName.length > 2 && formData.idNumber.length >= 13) {
                      goTo("reminder");
                    }
                  }}
                />
              </div>
            </div>
            
            <button
              type="button"
              className="flow-btn flow-btn-primary mt-4"
              disabled={formData.fullName.trim().length < 2 || formData.idNumber.trim().length < 13}
              onClick={() => goTo("reminder")}
            >
              {copy.continue}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Screen 6: Reminder ── */}
      {screen === "reminder" && (
        <FlowScreen
          question={copy.reminderQuestion}
          subtitle={copy.reminderSubtitle}
          onBack={() => goTo("identity")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <OptionGroup
              options={copy.reminderOptions}
              value={formData.wantsReminder}
              onChange={(v) => setFormData((prev) => ({ ...prev, wantsReminder: v }))}
            />
            <button
              type="button"
              className="flow-btn flow-btn-primary"
              onClick={generate}
            >
              {copy.cta}
            </button>
          </div>
        </FlowScreen>
      )}

      {/* ── Loading ── */}
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
