# Interest intake and mobile improvements

This version measures demand for bank accounts, airtime/data and payment updates. It creates no bank applications, sells no data and contacts no partner automatically. All submissions start as unverified, self-reported interest. Phone/email deduplication measures unique contact details, not verified people.

## Deployment

1. Deploy the feature code with `INTEREST_CAPTURE_ENABLED` absent or `false`. The public form and footer link stay hidden. The official SRD action and mobile improvements work independently.
2. Back up the database and apply the additive tables using `npx prisma db execute --file prisma/interest-intake.sql --schema prisma/schema.prisma`. This script only creates the two new types, tables and indexes; it does not change existing tables. Do not use a destructive reset.
3. Keep `AUTH_SECRET` stable: it keys private deduplication hashes. Confirm `DATABASE_URL`, `DATABASE_URL_UNPOOLED` and `CRON_SECRET` in the existing deployment. No provider account or SMS service is needed.
4. Test in preview with a disposable database and `INTEREST_CAPTURE_ENABLED=true`: submit a test interest, repeat it, inspect `/admin/interests`, confirm the aggregate CSV contains no contact details, withdraw with the receipt code and verify that contact access is removed. Test capture-disabled and database-failure cases.
5. After the same checks pass against the intended environment, enable `INTEREST_CAPTURE_ENABLED=true` and deploy. On non-Vercel hosting, implement the trusted proxy header before using this intake at scale: the current fallback applies one conservative shared network bucket.
6. Confirm the protected daily `/api/cron/interests` job runs. Records and counters expire; expired interests disappear from active reports immediately, and the cleanup job removes expired stored records. Never enable capture without scheduling cleanup.

The form is initially available in English, on the two main status guides, after the current payment schedule on `/payment-dates`, and on `/interests`. Existing grant content stays accessible without submitting. New public form routes are noindexed and are not added to the sitemap.

## Operation

- Use `Interest leads` in the existing admin area. New interest is not evidence of product eligibility or identity verification. A manual `confirmed` status requires a personal response confirming the selected interest.
- Keep bank-account and payment-update demand separate. The partner-facing CSV contains aggregate topic counts and confirmation status, no contact details. There is deliberately no raw-contact export or partner delivery integration.
- The consent wording, version, selected topic and source path are stored with each record. The source excludes query strings, fragments, arbitrary external URLs and unsupported routes. Contact data never enter the interest view event.
- A request creates a one-time withdrawal receipt. Duplicate requests return a neutral success without revealing an existing record or rotating its code. Withdrawing immediately blanks its contact value and suppresses resubmissions until the 90-day expiry. Admins can also withdraw a record after a support request.
- Rate limits persist across application instances: five attempts per contact per UTC day and 30 per trusted network address per ten-minute window. Do not log raw addresses or entered contacts.
- Contact only about the requested topic and channel, within 90 days. No automatic messages are sent. A future partner referral needs a separately identified recipient and new permission.

## Verification

Run schema validation, TypeScript, lint and `node --import tsx --test tests/interest-schema.test.ts tests/interest-database.test.ts`. Database tests run only when `INTEREST_TEST_DATABASE_URL` points to `localhost` or `127.0.0.1` and the database name is exactly `grantcare_interest_test`; never point these tests at production.

The public mobile changes keep guide URLs, article copy, metadata, canonicals and structured data intact. They add an official portal link, full-width phone actions and a collapsible table of contents. The release must be based on the current GitHub source, preserving the newer public redesign and translated-content rules.
