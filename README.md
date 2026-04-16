# GrantCare

GrantCare is a multilingual, mobile-first Next.js app for South African grant-help flows. It is an independent companion product, not an official government system.

## Included

- Locale-aware App Router structure for `en`, `zu`, `xh`, `af`, `nso`, and `tn`
- Auth.js credentials authentication with protected dashboard and admin routes
- Prisma schema for PostgreSQL-backed users, content, notices, reminders, and saved guides
- Reminder processing pipeline with Resend-ready email delivery, unsubscribe links, and cron route
- Provider-agnostic analytics event logging with API ingestion and client beacon helpers
- Admin-controlled monetization placements for payment-date, guide, and dashboard zones
- Mobile-first homepage with clear disclaimers and core actions
- Payment dates tool with month/grant routes and reminder preferences
- News section for published SASSA updates and announcement coverage
- Status meaning tool with detailed guidance routes
- Eligibility checker with step-by-step flow
- Grant guides, FAQ, dashboard, privacy, and admin CRUD screens
- PWA manifest, robots, and sitemap endpoints
- Static fallback content for local development when `DATABASE_URL` is not configured

## Commands

```bash
npm install
npm run db:up
npm run prisma:generate
npm run db:push
npm run db:seed
npm run db:setup:local
npm run lint
npm run build
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` if you want custom values. This repo also includes a local `.env` configured for the Docker database below.

- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED` (recommended for Prisma direct operations)
- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `REMINDER_FROM_EMAIL`
- `CRON_SECRET`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_CONTENT_FILE` (optional)

## Database options

The repo includes [compose.yaml](/Users/maxx/Projects/Grantcare/compose.yaml) for a local PostgreSQL container, but you can also point local development at Neon or another managed Postgres database.

```bash
npm run db:up
npm run db:push
npm run db:seed
```

The previous Docker example connection is:

`postgresql://grantcare:grantcare@localhost:54329/grantcare?schema=public`

## Route map

- `/[locale]`
- `/[locale]/payment-dates`
- `/[locale]/payment-dates/[year]/[month]`
- `/[locale]/payment-dates/[year]/[month]/[grantType]`
- `/[locale]/status`
- `/[locale]/status/[statusSlug]`
- `/[locale]/eligibility-checker`
- `/[locale]/grants`
- `/[locale]/grants/[grantType]`
- `/[locale]/guides`
- `/[locale]/guides/[slug]`
- `/[locale]/news`
- `/[locale]/news/[slug]`
- `/[locale]/faq`
- `/[locale]/dashboard`
- `/[locale]/admin`
- `/[locale]/privacy`

## Notes

- Payment dates are modeled as `expected`, `pending`, or `portal_only` and should only be published when confirmed.
- Public pages render from Prisma when the database is configured and fall back to local content in non-production development.
- Reminder processing runs through `/api/cron/reminders`; in production the included `vercel.json` schedules it hourly.
- Content publishing helpers live in [docs/sassa-content-automation.md](/Users/maxx/Projects/Grantcare/docs/sassa-content-automation.md).
- `REMINDER_FROM_EMAIL` must use a sender from a verified Resend domain such as `GrantCare <hello@grantcare.co.za>`. Replies can still go to `hello@symaxx.com`.
- Analytics events are stored in the database and can be forwarded to an external provider later from the shared analytics service.
- `npm run db:seed` uses the built-in launch bundle by default and can load a custom JSON bundle when `SEED_CONTENT_FILE` is set.
- Official applications and official status actions must remain on the relevant government systems.
