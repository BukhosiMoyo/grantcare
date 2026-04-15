# Grant Keyword Opportunity Backlog

Source keyword file: `/Users/maxx/Downloads/related_ubersuggest_grant.csv`

Audit date: `2026-04-15`

## Goal

Use the new grant-focused keyword list to extend GrantCare's topic authority without duplicating clusters that are already well covered.

This backlog separates three kinds of work:

- optimize an existing page that already matches the intent
- build a net-new page or tool where the intent does not have a strong destination
- skip noisy keywords that should not become content

## Current Coverage Snapshot

The repo already ships a large public SEO footprint:

- 384 guide pages
- 8 grant-type pages
- 7 status meaning pages
- payment-date coverage for 2025, 2026, and 2027
- existing product surfaces for payment dates, status help, eligibility checking, grants, reminders, and grant amounts

Primary source files:

- [src/lib/fallback-content.ts](/Users/maxx/Projects/Grantcare/src/lib/fallback-content.ts:1)
- [docs/seo-content-roadmap.md](/Users/maxx/Projects/Grantcare/docs/seo-content-roadmap.md:1)
- [src/app/[locale]/payment-dates/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/payment-dates/page.tsx:1)
- [src/app/[locale]/status/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/status/page.tsx:1)
- [src/app/[locale]/grants/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/grants/page.tsx:1)
- [src/app/[locale]/eligibility-checker/page.tsx](/Users/maxx/Projects/Grantcare/src/app/[locale]/eligibility-checker/page.tsx:1)

## Already Covered Well

These clusters already have enough content depth. Do not expand them aggressively unless performance data shows a clear gap:

- status-check intent
- appeals and reconsideration
- banking details, phone changes, identity verification
- application and reapplication help
- payment readiness, delays, release wording, and missing-payment help
- official route and trust/safety guidance
- R350 and SRD date variants already represented in long-tail guides

## Main Gaps From The New CSV

The keyword list still exposes five meaningful opportunities:

1. Broad hub intent is under-optimized.
   Broad terms like `sassa grant`, `grant`, `grant sassa`, `social grant`, and `s r d grant` are high-volume but currently route into pages that were built more for structured utility than for broad-topic authority.

2. Payment-date alias intent is larger than the current naming system.
   Searches heavily use `grant dates`, `grant pay date`, `social grant dates`, and `old age grant pay date` rather than the site's more exact route language.

3. Grant amount and increase intent does not have one strong destination.
   GrantCare has embedded amount tables and several increase-related guides, but not one obvious authority page or tool for `grant amounts`, `grant increase`, and grant-specific increase checks.

4. Myth and scam intent is real traffic, not just edge noise.
   Queries around fake or unclear grants such as `r700 grant`, `youth grant`, `r1400 grant`, `r2090 grant`, and `senior grant bonus` deserve a clearer myth-busting cluster.

5. A few niche operational queries still lack precise destinations.
   The strongest one in the CSV is `capitec sassa grant payment delays`.

## Priority 0: Optimize Existing Pages First

These should happen before adding large amounts of new content.

### 1. Optimize `/grants`

Type: `optimize existing page`

Current route:

- `/grants`

Target keywords:

- `sassa grant`
- `grant`
- `grant sassa`
- `social grant`

Why this should be optimized instead of replaced:

- the hub already exists
- it already aggregates grant types and current amounts
- creating a separate broad `grant` page would likely cannibalize `/grants`

Recommended changes:

- expand metadata to include South Africa and social-grant language
- make broad-grant terminology more explicit in the top copy
- link more directly to `social-relief`, `older-persons`, `disability`, `child-support`, and `grant-in-aid`
- add stronger internal links from this hub to payment dates and eligibility

Suggested title direction:

- `SASSA Grants in South Africa — Grant Types, Amounts, Eligibility and How to Apply`

### 2. Optimize `/payment-dates`

Type: `optimize existing page`

Current route:

- `/payment-dates`

Target keywords:

- `sassa grant pay date`
- `sassa grant dates`
- `grant dates`
- `grant pay date`
- `social grant dates`
- `sassa grant payment dates 2025`

Why this should be optimized instead of replaced:

- the route already owns the schedule intent
- many CSV terms are just aliases of the same hub and month pages
- more exact-match guide pages would create unnecessary overlap

Recommended changes:

- tune metadata toward `grant pay date` and `grant dates` language
- make the hub copy explicitly mention `social grant dates` and `grant pay dates`
- strengthen links into SRD and Older Persons monthly pages because those are the most searched variants

Suggested title direction:

- `SASSA Grant Pay Dates {year} — Payment Dates for All Grants`

### 3. Optimize `/grants/social-relief`

Type: `optimize existing page`

Current route:

- `/grants/social-relief`

Target keywords:

- `s r d grant`
- `srd grant`
- `sassa srd grant`
- `srd sassa grant`
- `covid 19 social relief of distress grant`

Why this should be optimized instead of replaced:

- the grant page already exists
- the missing piece is alias handling, not topic coverage

Recommended changes:

- include `SRD grant`, `R350`, `R370`, and `social relief of distress` aliases in metadata and opening copy
- add direct internal links to application, status, payment-date, and reapplication content
- explicitly connect historical `COVID-19 social relief` wording to the current SRD terminology

Suggested title direction:

- `SRD Grant — SASSA Social Relief of Distress, Eligibility, Payment Dates and How to Apply`

### 4. Optimize `/grants/older-persons`

Type: `optimize existing page`

Current route:

- `/grants/older-persons`

Target keywords:

- `sassa old age grant`
- `old age grant`
- `sassa old age grant pay date`
- `old age grant pay date`
- `old age grant pay dates`
- `pension increase` style searches where the real intent is the Older Persons Grant

Why this should be optimized instead of replaced:

- the route already owns the grant-type intent
- a separate `old-age-grant` page would duplicate the same service

Recommended changes:

- add `Old Age Grant` and `pension` aliases to metadata and copy
- link directly to the relevant payment-date route and increase/amount content
- make sure related guides use both `older persons` and `old age` wording

Suggested title direction:

- `Older Persons Grant (Old Age Grant) — Amount, Eligibility, Pay Dates and How to Apply`

### 5. Optimize payment-date detail metadata for aliases

Type: `optimize existing page templates`

Current routes:

- `/payment-dates/[year]/[month]/social-relief`
- `/payment-dates/[year]/[month]/older-persons`

Target keywords:

- `sassa r350 grant payment date`
- `sassa srd grant payment date`
- `sassa old age grant pay date`
- `sassa payment date for old age`

Recommended changes:

- enrich metadata templates with `SRD`, `R350`, `R370`, `Old Age Grant`, and `pay date` aliases
- keep the canonical route structure unchanged

## Priority 1: Net-New Pages And Tools

These are the strongest genuinely missing destinations.

### 1. Build `/grant-amounts`

Type: `new page / tool`

Suggested route:

- `/grant-amounts`

Suggested title:

- `SASSA Grant Amounts {year} — Current Amounts, Increase Updates and Payment Groups`

Target keywords:

- `sassa grant increase 2025`
- `sassa grant increase april 2025`
- `sassa srd grant increase`
- `sassa grant payment increase 2025`
- `sassa grant amounts november 2025`
- `disability grant amount`
- `sassa older person grant increase`
- `sassa old age grant increase 2025`

Why it is missing today:

- current amounts are embedded on the homepage and grants hub
- increase intent is split across many guides
- there is no single indexable destination that clearly owns `grant amounts` or `grant increase` intent

Recommended scope:

- current amount table
- grant-type filter
- official source reference
- links to relevant grant pages
- links to payment dates and increase guides
- archive section for year-based increase updates

### 2. Build `/claim-checker`

Type: `new tool`

Suggested route:

- `/claim-checker`

Suggested title:

- `SASSA Claim Checker — Is This Grant, Increase or Payment Story Real?`

Target keyword themes:

- fake grant amount claims
- bonus claims
- double-payment claims
- suspension claims
- unclear new-grant claims

Why it is missing today:

- current scam coverage is guide-based only
- there is no simple product surface for checking whether a viral claim sounds real, fake, outdated, or needs official confirmation

Recommended scope:

- choose claim type
- choose grant type if relevant
- see guided result with official-source reminder
- deep-link into the correct myth-busting guide

### 3. Build `/guides/is-the-r700-grant-real`

Type: `new guide`

Suggested title:

- `Is the R700 grant real?`

Target keywords:

- `sassa r700 grant 2025`
- `sassa r700 grant 2025 eligibility`
- `sassa r700 grant application`
- `sassa r700 social grant`

Why this page is worth creating:

- the fake-grant demand is large enough to deserve an exact destination
- current fake-amount guides are broader and may not capture this query cleanly

### 4. Build `/guides/is-the-youth-grant-real`

Type: `new guide`

Suggested title:

- `Is the youth grant real?`

Target keywords:

- `youth grant application`
- `youth grant`
- `sassa youth grant application`
- `12500 youth grant`

Why this page is worth creating:

- this cluster has persistent volume
- it is likely to generate confused or vulnerable traffic
- the intent is myth-busting, not normal application help

### 5. Build `/guides/is-the-r1400-grant-real`

Type: `new guide`

Suggested title:

- `Is the R1400 grant real?`

Target keywords:

- `sassa r1400 monthly grant 2025`
- `south africa r1 400 grant 2025`
- related `beneficiary list` claim variants

### 6. Build `/guides/is-the-r2090-grant-real`

Type: `new guide`

Suggested title:

- `Is the R2090 grant real?`

Target keywords:

- `sassa r2090 grant`
- `r2090 sassa grant payment date eligibility`
- `sassa r2 090 grant 2025`

### 7. Build `/guides/is-the-senior-grant-bonus-real`

Type: `new guide`

Suggested title:

- `Is the senior grant bonus real?`

Target keywords:

- `sassa senior grant bonus`

Notes:

- keep this page narrow
- link back to `/grant-amounts` and `/grants/older-persons`

## Priority 2: Smaller Supporting Opportunities

These are useful, but they should not come before the work above.

### 1. Build `/guides/capitec-sassa-payment-delay-help`

Type: `new guide`

Suggested title:

- `Capitec SASSA payment delays: what to check first`

Target keywords:

- `capitec sassa grant payment delays`

Why it is lower priority:

- volume exists
- the topic is narrower and more operational than the broader authority gaps

### 2. Build `/guides/what-social-grant-usually-means`

Type: `new guide`

Suggested title:

- `What social grant usually means in South Africa`

Target keywords:

- `social grant`
- `social grant dates`

When to build it:

- only if `/grants` and `/payment-dates` optimization does not absorb those queries well enough

## Do Not Build

These keywords should not become dedicated pages:

- celebrity or person-name noise such as `hugh grant`, `grant williams`, `grant kekana`, and `prince grant`
- very small wording variants that are already covered by existing payment-date routes
- exact-match clones for `grant dates` month variants when the month page already exists
- separate `old age` duplicate grant pages if `/grants/older-persons` is optimized properly
- duplicate SRD application pages that overlap existing application, reapplication, and status guides

## Recommended Implementation Order

1. Optimize `/grants`, `/payment-dates`, `/grants/social-relief`, and `/grants/older-persons`.
2. Add alias-aware metadata support to grant and payment-date templates.
3. Build `/grant-amounts` as the main authority page for amount and increase intent.
4. Build `/claim-checker` if product bandwidth allows a new tool.
5. Publish the myth-busting exact-match guides for `R700`, `youth grant`, `R1400`, `R2090`, and `senior bonus`.
6. Publish niche support pages only after the broader authority work ships.

## Guardrails

- do not create more payment-date near-duplicates unless there is no matching month or grant route
- do not create separate pages for every fake amount claim unless the keyword cluster has clear independent volume
- route broad intent into hubs and exact intent into guides
- keep official confirmation on official sources and keep GrantCare positioned as an independent guide

