import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getPublishedGrantAmount } from "../src/lib/grant-amounts";
import { getGrantAmountDetails } from "../src/lib/official-resources";
import { EVIDENCE_SOURCES, getEvidenceSources, getEvidenceTopic, isEvidenceUrl } from "../src/lib/content-evidence";
import { getEligibilityResult } from "../src/lib/eligibility-wizard";
import { ContentSources } from "../src/components/content-sources";
import { FALLBACK_GUIDES } from "../src/lib/fallback-content";
import { correctGuide } from "../src/lib/content-corrections";

test("enacted foster amount changes in October, not at an annual or monthly estimate", () => {
  assert.equal(getPublishedGrantAmount("foster-child", "2026-09-30")?.amount,1290);
  assert.equal(getPublishedGrantAmount("foster-child", "2026-10-01")?.amount,1300);
  assert.equal(getPublishedGrantAmount("foster-child", "2026-11-26")?.sourceId,"grant-amount-notice-2026");
  for(const locale of ["en","zu","xh","tn"] as const) assert.equal(getGrantAmountDetails("foster-child",locale,"2026-11-26")?.[0].amount,"R1 300");
});

test("unsupported dates and future cycles do not silently inherit current grant amounts", () => {
  for(const date of ["2026-03-31","2027-04-01","2026-02-30","no-date","2026-13-01"]) assert.equal(getPublishedGrantAmount("child-support",date),null,date);
  assert.equal(getGrantAmountDetails("child-support","en","2027-04-01"),null);
  assert.equal(getPublishedGrantAmount("unknown","2026-11-26"),null);
  assert.equal(getPublishedGrantAmount("older-persons-75","2026-11-26")?.amount,2420);
  assert.equal(getPublishedGrantAmount("child-support-top-up-total","2026-11-26")?.amount,870);
});

test("references expose scope and genuine checks without certifying an unreviewed article", () => {
  const html=renderToStaticMarkup(React.createElement(ContentSources,{locale:"en",topic:"amounts",path:"/guides/test",article:true}));
  assert.match(html,/data-review-state="pending"/);
  assert.match(html,/full factual review.*still pending/);
  assert.match(html,/2026-11-26/);
  assert.match(html,/Report a correction/);
  assert.match(html,/subject=GrantCare%20correction/);
  const pending=renderToStaticMarkup(React.createElement(ContentSources,{locale:"en",topic:"banking",path:"/guides/test",article:true}));
  assert.match(pending,/<time/);
  assert.match(pending,/registered|Registered/);
  assert.equal(EVIDENCE_SOURCES.grants.state,"limited");
});

test("evidence links are public HTTPS and topic selection uses relevant references", () => {
  for(const source of Object.values(EVIDENCE_SOURCES)) assert.ok(isEvidenceUrl(source.href),source.id);
  for(const value of ["javascript:alert(1)","http://example.com","https://user:secret@example.com","/relative"]) assert.equal(isEvidenceUrl(value),false);
  assert.equal(getEvidenceTopic("how-to-update-banking-details"),"banking");
  assert.ok(getEvidenceSources("appeals").some(source=>source.href==="https://srd.sassa.gov.za/appeals/"));
});

test("SRD does not exclude asylum seekers merely for lacking citizen or permanent resident status", () => {
  const answers={focus:"srd",ageBand:"18to59",citizenship:"asylum-special",residesInSa:"yes",meansConcern:"likely",srdNoSupport:"yes"};
  assert.ok(!getEligibilityResult(answers).blockers.includes("Status"));
  const ordinary=getEligibilityResult({...answers,focus:"myself",ageBand:"60plus"});
  assert.ok(ordinary.blockers.includes("Status"));
});

test("unsupported clearance guarantees are removed without overwriting later CMS edits", () => {
  const original = FALLBACK_GUIDES.find(guide=>guide.slug === "what-payment-released-means")!;
  const corrected = correctGuide(original);
  const steps = corrected.sections.find(section=>section.title === "What you can do next")!;
  assert.doesNotMatch(steps.body,/48 hours|three business days|money is safe/);
  assert.equal(corrected.updatedAt,"2026-11-26");
  assert.deepEqual(corrected.translations,{});
  const edited = {...corrected,sections:corrected.sections.map(section=>section.title === steps.title ? {...section,body:"Later independently checked payment instructions."} : section)};
  assert.equal(correctGuide(edited),edited);
});

test("a missed appeal date is not presented as extinguishing every legal remedy", () => {
  const guide=correctGuide(FALLBACK_GUIDES.find(guide=>guide.slug === "what-to-do-if-you-missed-the-appeal-window")!);
  assert.doesNotMatch(JSON.stringify(guide),/closed forever|lost cause|missed deadlines cannot be fixed/);
  assert.match(guide.sections[0].body,/tribunal|qualified adviser/);
});

test("SRD age screening does not report a child as likely eligible", () => {
  const result=getEligibilityResult({focus:"srd",ageBand:"under16",citizenship:"yes",residesInSa:"yes",srdNoSupport:"yes",meansConcern:"likely"});
  assert.ok(result.blockers.some(reason=>reason.startsWith("Age")));
  assert.equal(result.status,"unlikely");
});
