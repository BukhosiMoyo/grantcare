# Independent SEO Competition Plan

Audit date: `2026-04-23`

## Sources

- keyword CSV: `/Users/maxx/Downloads/ubersuggest https___check-status.co.za.csv`
- offline competitor crawl: `/Users/maxx/Projects/Httrackmaxx/downloaded-sites/check-status-sitegrab-2026-04-13`
- offline competitor crawl: `/Users/maxx/Projects/Httrackmaxx/downloaded-sites/statusdate-sitegrab-2026-04-13`

## Core Decision

GrantCare should rank for high-intent SASSA-related searches as an independent information site.

GrantCare should not publish routes, CTAs, or product copy that suggest we:

- change banking details on behalf of users
- perform identity verification
- submit reapplications
- process official status checks
- act as SASSA, DSD, or an official government portal

The safe model is:

- guides
- status explainers
- official-route finders
- preparation checklists
- interpretation tools
- drafting helpers where the user still submits through the official route

## Cleanup Completed

The following high-risk `/tools` routes were removed:

- `/tools/banking-details`
- `/tools/identity-verification`
- `/tools/reapplication`

Supporting builder routes, placeholder assets, and sitemap exposure for those routes were also removed.

The following copy was tightened to reduce impersonation risk:

- [src/app/[locale]/claim-checker/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/claim-checker/page.tsx:1)
- [src/app/[locale]/tools/sassa-appeal/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/tools/sassa-appeal/page.tsx:1)
- [src/app/[locale]/tools/sassa-appeal/builder/builder-client.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/tools/sassa-appeal/builder/builder-client.tsx:1)
- [src/app/[locale]/tools/sassa-appeal/result/[id]/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/tools/sassa-appeal/result/[id]/page.tsx:1)
- [src/app/api/tools/sassa-appeal/generate/route.ts](/Users/maxx/Projects/Grantcare/src/app/api/tools/sassa-appeal/generate/route.ts:1)

## Competitor Patterns To Avoid

The competitor pages that rank well often cross the line into official-action framing.

Examples from the offline crawls:

- `statusdate.co.za/srd-sassa-gov-za-banking-details-update/`
  - title: `Change/Update/Submit SASSA Banking Details srd.sassa.gov.za`
  - h1: `Update or Submit or Change SASSA Banking Details using srd.sassa.gov.za`
- `statusdate.co.za/ekyc-sassa-verification-sassa/`
  - title: `eKYC SASSA Identity Verification Online Link 2026`
  - h1: `eKYC SASSA Identity Verification Online Link`
- `statusdate.co.za/sassa-reapplication-for-r350-grant/`
  - title: `How to Do SASSA Reapplication for R350 SRD Grant? 2026`
  - h1: `SASSA SRD Reapplication for R370 Grant for 2026`

We should target the same demand, but with safer framing:

- `how to update banking details`
- `what banking details pending means`
- `how to use identity verification links safely`
- `how to know if reapplication is the right step`
- `how to find the official page safely`

## Competitor Intent Map

Top competitor landing pages from the CSV:

1. `http://check-status.co.za/`
   - top queries: `sassa status check for r350`, `sassa status check for r350 payment date`, `srd r350 check status`, `sassa status`, `sassa srd status`
2. `http://check-status.co.za/update-banking-details/`
   - top queries: `sassa change banking details`, `srd banking details update`, `sassa banking details`, `sassa bank details update`, `srd change banking details`
3. `http://check-status.co.za/sassa-reapplication/`
   - top queries: `srd sassa gov za status check online`, `srd sassa gov za status check`, `www srd sassa gov za status`, `sassa srd reapplication`, `reapplication of srd grant`
4. `http://check-status.co.za/sassa-srd-appeal/`
   - top queries: `sassa appeals`, `srd appeal`, `sassa appeals status`, `sassa status check appeal`, `sassa appeal online`
5. `http://check-status.co.za/change-srd-phone-number/`
   - top queries: `sassa srd change number`, `sc19 change number`, `update srd phone number`

Important observation:

- the competitor is using risky or mismatched pages to capture adjacent search intent
- we should not copy that pattern
- we should instead route each cluster to the safest matching GrantCare destination

## Page-by-Page Competitor Map

Use this map when deciding whether to optimize an existing page or add a new safe guide.

1. `check-status.co.za/`
   - captured intent: broad status check, SRD, payment dates
   - risk pattern: one page mixes status, payments, banking, and verification
   - safest GrantCare destinations:
     - `/status`
     - `/payment-dates`
     - `/grants/social-relief`
     - `/claim-checker`
     - `/guides/how-to-check-your-status`
     - `/guides/official-status-check-vs-independent-guide`

2. `check-status.co.za/sassa-status-check/`
   - captured intent: status-check failure, identity-verification confusion
   - risk pattern: a narrow problem page pulls broad status-check demand
   - safest GrantCare destinations:
     - `/guides/why-identity-verification-fails`
     - `/guides/identity-verification-required-meaning`
     - `/guides/what-identity-verification-link-means`
     - `/status/identity-verification`

3. `statusdate.co.za/sassa-reapplication-for-r350-grant/`
   - captured intent: mixed reapplication and `srd sassa gov za` route confusion
   - risk pattern: a reapplication page ranks for official-route and status-check queries
   - safest GrantCare destinations:
     - `/guides/what-srd-sassa-gov-za-usually-means`
     - `/guides/how-to-find-the-official-reapplication-page-safely`
     - `/guides/reapplication-needed-meaning`
     - `/guides/how-to-know-if-reapplication-is-the-right-step`

4. `statusdate.co.za/srd-sassa-gov-za-banking-details-update/`
   - captured intent: banking changes, banking pending, official banking route confusion
   - risk pattern: official-action phrasing around changing or submitting bank details
   - safest GrantCare destinations:
     - `/guides/how-to-update-banking-details`
     - `/guides/banking-details-pending-meaning`
     - `/guides/what-to-do-if-your-bank-details-changed`
     - `/guides/how-to-find-official-banking-and-verification-pages-safely`
     - `/status/banking-issue`

5. `statusdate.co.za/ekyc-sassa-verification-sassa/`
   - captured intent: identity-verification link searches
   - risk pattern: eKYC and online verification framing that can sound official and operational
   - safest GrantCare destinations:
     - `/guides/what-identity-verification-link-means`
     - `/guides/how-to-use-an-identity-verification-link-safely`
     - `/guides/why-identity-verification-fails`
     - `/guides/how-to-know-if-a-verification-request-is-official`
     - `/status/identity-verification`

6. `statusdate.co.za/change-phone-number/`
   - captured intent: phone-number changes, lost access, no-OTP edge cases
   - risk pattern: process-heavy phrasing that can read like direct account handling
   - safest GrantCare destinations:
     - `/guides/how-to-change-phone-number`
     - `/guides/how-to-change-your-phone-number-online-safely`
     - `/guides/what-to-do-if-you-need-to-change-phone-number-without-otp`
     - `/guides/how-phone-number-changes-affect-status-checks`

7. `statusdate.co.za/sassa-online-services-portal/`
   - captured intent: services portal, login, eForms, official website searches
   - risk pattern: one page tries to absorb portal, website, and login intent at once
   - safest GrantCare destinations:
     - `/guides/how-to-use-services-sassa-gov-za-safely`
     - `/guides/how-to-use-services-sassa-gov-za-login-safely`
     - `/guides/what-sassa-portal-login-is-for`
     - `/guides/what-srd-sassa-gov-za-usually-means`
     - `/guides/how-to-find-official-portal-updates-without-fake-login-pages`

8. `statusdate.co.za/sassa-status-pending/`
   - captured intent: pending meaning, delays, what to do next
   - risk pattern: lower risk; mostly a straightforward status-explainer play
   - safest GrantCare destinations:
     - `/guides/why-is-my-status-pending`
     - `/guides/status-stuck-pending`
     - `/guides/how-long-approval-can-take`
     - `/status/pending`

## CSV-Derived Priority

The CSV confirms that the biggest safe upside is not inventing new tools. It is covering the same search demand with better independent routing and clearer intent matching.

Top keyword clusters from `/Users/maxx/Downloads/ubersuggest https___check-status.co.za.csv`:

1. `status-check`
   - `225` keywords
   - about `3.7M` total monthly volume in the export
2. `appeal`
   - `106` keywords
   - about `966k` total monthly volume
3. `official-route-safety`
   - `56` keywords
   - about `913k` total monthly volume
4. `payment-dates`
   - `90` keywords
   - about `733k` total monthly volume
5. `banking`
   - `52` keywords
   - about `186k` total monthly volume
6. `reapplication`
   - `20` keywords
   - about `36k` total monthly volume
7. `phone-number`
   - `13` keywords
   - about `15.6k` total monthly volume
8. `verification`
   - `11` keywords
   - about `6.5k` total monthly volume

Important takeaways from that export:

- the competitor home page is absorbing most of the raw status demand
- the competitor `sassa-reapplication` page is ranking for many `srd sassa gov za status check` queries that are really official-route confusion, not pure reapplication intent
- that means our next safe leverage point is the official-route and portal-safety cluster, not more pseudo-tools

Highest-value official-route queries in the export:

- `srd sassa gov za` - `368000`
- `srd sassa gov za application` - `201000`
- `srd sassa gov za status check online` - `74000`
- `srd sassa gov za status check` - `74000`
- `www srd sassa gov za status` - `40500`
- `srd sassa gov za status` - `33100`
- `srd sassa gov za status check balance check` - `33100`
- `sassa srd gov za status check` - `8100`

These queries should be captured with:

- official-route finder pages
- status-check safety guides
- portal/login safety guides
- clear distinction between GrantCare and the official route

Not with:

- reapplication tools
- banking tools
- identity-verification tools
- anything that looks like a government-owned workflow

## Safe Opportunity Map

### 1. Status checking and payment dates

Use existing hubs first:

- `/status`
- `/payment-dates`
- `/grants/social-relief`
- `/claim-checker`
- `/guides/how-to-know-if-a-sassa-website-is-official`
- `/guides/official-status-check-vs-independent-guide`

Primary work:

- strengthen metadata on `/status`, `/payment-dates`, and `/grants/social-relief`
- improve internal links between status, payment dates, and safety guides
- keep `claim-checker` positioned as independent fact-checking, not an official checker
- use status-check and portal-safety guides to absorb `srd sassa gov za status check` style searches without pretending to be the official route

Recommended supporting guides:

- `/guides/how-to-check-your-status`
- `/guides/how-to-check-srd-status-online`
- `/guides/how-to-check-your-status-without-making-mistakes`
- `/guides/how-to-read-your-status-check-result`
- `/guides/official-srd-status-check-link-guide`
- `/guides/how-to-find-official-status-check-updates-safely`

### 2. Banking details and bank verification

Use existing guides:

- `/guides/how-to-update-banking-details`
- `/guides/banking-details-pending-meaning`
- `/guides/what-to-do-if-your-bank-details-changed`
- `/guides/why-bank-verification-fails`
- `/guides/how-to-find-official-banking-and-verification-pages-safely`
- `/status/banking-issue`

Do not build:

- banking details tools
- bank detail submission forms
- anything that asks for account details or OTPs

### 3. Identity verification

Use existing guides:

- `/guides/identity-verification-required-meaning`
- `/guides/why-identity-verification-fails`
- `/guides/what-identity-verification-link-means`
- `/guides/how-to-use-an-identity-verification-link-safely`
- `/guides/how-to-know-if-a-verification-request-is-official`
- `/status/identity-verification`

Do not build:

- identity verification tools
- eKYC flows
- selfie, biometric, or OTP collection

### 4. Reapplication

Use existing guides:

- `/guides/reapplication-needed-meaning`
- `/guides/how-to-know-if-reapplication-is-the-right-step`
- `/guides/how-reapplication-pages-usually-work`
- `/guides/how-to-prepare-before-reapplying`
- `/guides/how-to-find-the-official-reapplication-page-safely`
- `/guides/how-to-check-reapplication-status-safely`
- `/guides/appeal-vs-reapplication-guide`
- `/status/reapplication-needed`

Do not build:

- reapplication tools
- fresh-application builders that look official
- submission flows for reapplication

### 5. Appeals

This is the one helper tool we can keep, with careful framing:

- `/tools/sassa-appeal`
- `/guides/how-sassa-appeals-work`
- `/guides/how-to-check-your-appeal-status`
- `/guides/what-pending-appeal-means`
- `/guides/appeal-vs-reapplication-guide`

Rule:

- the appeal product must always be framed as a draft helper
- the user submits the appeal through the official route
- no wording should describe the output as an official letter from SASSA or the Tribunal

### 6. Phone number changes

Use existing guides:

- `/guides/how-to-change-phone-number`
- `/guides/how-to-change-your-phone-number-online-safely`
- `/guides/what-to-do-if-you-need-to-change-phone-number-without-otp`
- `/guides/how-to-check-status-after-changing-details`

### 7. Portal, website, and login safety

Use existing guides:

- `/guides/how-to-use-services-sassa-gov-za-safely`
- `/guides/how-to-use-services-sassa-gov-za-login-safely`
- `/guides/what-sassa-portal-login-is-for`
- `/guides/how-to-use-srd-sassa-gov-za-login-safely`
- `/guides/what-srd-sassa-gov-za-usually-means`
- `/guides/how-to-find-the-official-srd-application-page-safely`
- `/guides/how-to-know-if-a-sassa-website-is-official`
- `/guides/how-to-find-the-right-sassa-website-for-your-task`
- `/guides/how-to-find-official-portal-updates-without-fake-login-pages`
- `/guides/what-to-do-if-the-portal-login-page-keeps-failing`
- `/guides/what-to-do-if-you-cannot-log-in-to-the-sassa-portal`
- `/guides/how-to-keep-your-portal-login-details-safe`

This cluster matters because competitor data shows a lot of demand that looks like status or reapplication intent at first, but is actually confusion about the official route.

## Priority Todo List

### Priority 0: Keep compliance tight

- [ ] run a final sitewide wording audit for `official`, `submit`, `verify`, `update`, `tool`, and `portal` phrases that could read as impersonation
- [ ] review SERP-facing metadata for `/claim-checker`, `/status`, `/payment-dates`, `/grants/social-relief`, and `/tools/sassa-appeal`
- [ ] make sure every route that discusses official action clearly separates GrantCare guidance from the official step

### Priority 1: Optimize existing pages before creating new ones

- [ ] optimize `/status` for broad status-check intent
- [ ] optimize `/payment-dates` for `payment date` and `pay date` aliases
- [ ] optimize `/grants/social-relief` for SRD, R350, and R370 alias intent
- [ ] optimize `/claim-checker` as an independent fact-checking page
- [ ] tighten internal links between status, payment dates, safety guides, and reapplication guides

### Priority 2: Push the safest clusters harder

- [ ] strengthen banking-details guide cluster
- [ ] strengthen identity-verification guide cluster
- [ ] strengthen reapplication decision/preparation cluster
- [ ] strengthen phone-number-change cluster
- [ ] strengthen portal, website, and login safety cluster
- [ ] keep appeal helper copy accurate and non-official

### Priority 3: Add pages only where coverage is still weak

- [ ] identify any missing guide destination for high-volume safe intent
- [ ] add only guide-style or explainer-style pages where no strong route exists
- [ ] avoid creating new `/tools` routes unless the helper stays clearly independent and non-official

## Terms To Avoid In New Product Copy

Avoid these patterns unless the sentence clearly points users away from GrantCare and toward the official route:

- `update your banking details here`
- `verify your identity here`
- `submit reapplication here`
- `official status check`
- `official portal` when referring to GrantCare
- `SASSA tool`
- `government tool`

Safer patterns:

- `guide`
- `explainer`
- `how it works`
- `what this status means`
- `how to find the official page safely`
- `prepare before you submit`
- `draft your appeal letter`
