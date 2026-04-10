# GrantCare SEO Operations Plan

## Goal

GrantCare should rank for high-intent South African grant-help searches without sounding official, misleading users, or publishing thin pages.

The SEO system should do four things well:

1. Publish crawlable server-rendered public pages.
2. Keep metadata, canonicals, and sitemaps consistent across locales.
3. Use internal links to move users from broad hubs to exact help pages.
4. Keep private product pages out of search.

## Indexing Rules

Indexable pages:

- `/{locale}`
- `/{locale}/payment-dates`
- `/{locale}/payment-dates/{year}/{month}`
- `/{locale}/payment-dates/{year}/{month}/{grantType}`
- `/{locale}/status`
- `/{locale}/status/{statusSlug}`
- `/{locale}/eligibility-checker`
- `/{locale}/grants`
- `/{locale}/grants/{grantType}`
- `/{locale}/guides`
- `/{locale}/guides/{slug}`
- `/{locale}/faq`
- `/{locale}/privacy`

Non-indexable pages:

- `/{locale}/sign-in`
- `/{locale}/sign-up`
- `/{locale}/forgot-password`
- `/{locale}/reset-password`
- `/{locale}/dashboard`
- `/{locale}/unsubscribe`
- `/{locale}/admin/*`
- `/api/*`

## Metadata Rules

Every indexable public page should have:

- a unique title
- a useful description
- a canonical URL
- locale alternates
- Open Graph fields

Detail pages should also prefer:

- titles tied to the exact user intent
- descriptions based on the actual published record
- article or FAQ schema where appropriate

## Sitemap Rules

The sitemap should include:

- all locale homepages
- all public hubs
- all published guide pages
- all published status pages
- all published grant pages
- all published payment-date month pages
- all published payment-date grant pages

The sitemap should exclude:

- account routes
- dashboard routes
- admin routes
- unsubscribe routes
- API routes

## Internal Linking Rules

Every public hub page should link into the next level down:

- homepage -> payment dates, status, eligibility, guides, FAQ
- payment dates hub -> month pages, payment help guides
- status hub -> status detail pages, fix guides
- grants hub -> grant detail pages, eligibility checker, payment dates
- guides hub -> guide detail pages and key support hubs
- FAQ hub -> payment dates, status, eligibility, guides

Every public detail page should link sideways and upward:

- guide detail -> related guides, FAQ, key hubs
- status detail -> related statuses, relevant guides
- grant detail -> related grants, relevant statuses, payment dates
- payment month -> related months, relevant guides
- payment grant detail -> relevant guides, grant page, payment hub

## Publishing Checklist

Before publishing a new guide or monthly page:

1. Confirm the page is marked `published`.
2. Confirm the title targets one clear search intent.
3. Confirm the summary answers the intent quickly.
4. Confirm the page includes at least 3 useful internal links.
5. Confirm official actions point only to official routes.
6. Confirm the page does not imply GrantCare is official.
7. Confirm the route appears in the sitemap.

## Launch QA Checklist

Run before major content drops:

1. Open `/sitemap.xml` and confirm new public URLs are present.
2. Open `/robots.txt` and confirm private routes remain blocked.
3. Spot-check canonical tags on homepage, one hub page, and one detail page.
4. Spot-check one guide, one status page, one grant page, and one payment-date page for related-link sections.
5. Confirm unpublished admin content does not render publicly.
6. Confirm auth and dashboard routes return `noindex`.
7. Run `npm run lint`, `npm run typecheck`, and `npm run build`.

## Next SEO Work

Recommended next improvements:

- add XML sitemap splitting once the URL count grows further
- add breadcrumb schema to public detail pages
- add smarter topic clustering for related FAQ and related status linking
- add an editorial review queue for thin or duplicate guide titles
- add locale-specific metadata strings as translated content coverage improves
