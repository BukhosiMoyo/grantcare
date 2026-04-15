"use client";

import { useEffect, useRef, useState } from "react";

import {
  CLAIM_CHECKER_TYPES,
  getClaimCheckerOptions,
  getClaimCheckerResult,
  type ClaimCheckerType,
} from "@/lib/claim-checker";
import { trackClientEvent } from "@/lib/analytics-client";
import { buildLocalePath, type Locale } from "@/lib/site";
import { ButtonLink, Field, Pill, Select, StatusMessage } from "@/components/ui";

const CLAIM_TYPE_NOTES: Record<ClaimCheckerType, string> = {
  "amount-claim":
    "Open the guide first, then compare the claim with current grant amounts or the official route before you trust it.",
  "increase-update":
    "Use the guide first, then confirm the update on the latest official published source before you act on it.",
  "payment-story":
    "Check the guide first, then match the story to the correct payment page or official result before you assume it is real.",
  "warning-message":
    "Check the wording and the source first, then use the official route only if the warning still looks real.",
};

export function ClaimChecker({ locale }: { locale: Locale }) {
  const [claimType, setClaimType] = useState<ClaimCheckerType | "">("");
  const [claimTopic, setClaimTopic] = useState("");
  const lastClickedKeyRef = useRef("");
  const lastTrackedKeyRef = useRef("");

  const topicOptions = claimType ? getClaimCheckerOptions(claimType) : [];
  const selectedType = claimType
    ? CLAIM_CHECKER_TYPES.find((item) => item.value === claimType) ?? null
    : null;
  const selectedTopic = topicOptions.find((item) => item.value === claimTopic) ?? null;
  const result = claimType && claimTopic ? getClaimCheckerResult(claimType, claimTopic) : null;

  useEffect(() => {
    if (!claimType || !claimTopic || !result) {
      return;
    }

    const trackingKey = `${claimType}:${claimTopic}`;
    if (lastTrackedKeyRef.current === trackingKey) {
      return;
    }

    lastTrackedKeyRef.current = trackingKey;

    trackClientEvent({
      name: "claim_checker.used",
      locale,
      payload: {
        claimType,
        claimTypeLabel: selectedType?.label ?? claimType,
        claimTopic,
        claimTopicLabel: selectedTopic?.label ?? claimTopic,
        primaryHref: result.primaryHref,
        secondaryHref: result.secondaryHref,
      },
    });
  }, [claimTopic, claimType, locale, result, selectedTopic, selectedType]);

  function trackCheckerLinkClick(targetSlot: "primary" | "secondary", targetHref: string) {
    if (!claimType || !claimTopic || !result) {
      return;
    }

    const trackingKey = `${claimType}:${claimTopic}`;
    if (lastClickedKeyRef.current === trackingKey) {
      return;
    }

    lastClickedKeyRef.current = trackingKey;

    trackClientEvent({
      name: "claim_checker.link_clicked",
      locale,
      payload: {
        claimType,
        claimTypeLabel: selectedType?.label ?? claimType,
        claimTopic,
        claimTopicLabel: selectedTopic?.label ?? claimTopic,
        targetHref,
        targetSlot,
      },
    });
  }

  return (
    <div className="surface-card space-y-5 rounded-[var(--radius-card)] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Claim type">
          <Select
            aria-label="Claim type"
            className="h-12"
            value={claimType}
            onChange={(event) => {
              const nextValue = event.target.value as ClaimCheckerType | "";
              const nextType = CLAIM_CHECKER_TYPES.find((item) => item.value === nextValue) ?? null;

              setClaimType(nextValue);
              setClaimTopic("");
              lastClickedKeyRef.current = "";
              lastTrackedKeyRef.current = "";

              if (nextValue) {
                trackClientEvent({
                  name: "claim_checker.started",
                  locale,
                  payload: {
                    claimType: nextValue,
                    claimTypeLabel: nextType?.label ?? nextValue,
                  },
                });
              }
            }}
          >
            <option value="">Select</option>
            {CLAIM_CHECKER_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Topic">
          <Select
            aria-label="Topic"
            className="h-12"
            disabled={!claimType}
            value={claimTopic}
            onChange={(event) => {
              setClaimTopic(event.target.value);
              lastClickedKeyRef.current = "";
              lastTrackedKeyRef.current = "";
            }}
          >
            <option value="">Select</option>
            {topicOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {claimType && result ? (
        <div className="space-y-4 rounded-[1.35rem] border border-border bg-surface p-4 sm:p-5">
          <Pill>Likely next page</Pill>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">{result.title}</h3>
            <p className="text-sm leading-7 text-muted">{result.summary}</p>
          </div>

          <StatusMessage>{CLAIM_TYPE_NOTES[claimType]}</StatusMessage>

          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={buildLocalePath(locale, result.primaryHref)}
              onClick={() => trackCheckerLinkClick("primary", result.primaryHref)}
            >
              {result.primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={buildLocalePath(locale, result.secondaryHref)}
              onClick={() => trackCheckerLinkClick("secondary", result.secondaryHref)}
              variant="secondary"
            >
              {result.secondaryLabel}
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setClaimType("");
                setClaimTopic("");
                lastClickedKeyRef.current = "";
                lastTrackedKeyRef.current = "";
              }}
              className="focus-ring tap-target rounded-full border border-border bg-surface px-5 text-sm font-semibold"
            >
              Start again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
