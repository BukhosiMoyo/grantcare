# SASSA Content Automation

This repo now supports an automated content workflow for:

- payment-date updates
- news posts
- evergreen guide posts

## Publishing commands

```bash
npm run content:sync:dates -- ./path/to/payment-period.json
npm run content:publish:news -- ./path/to/news-article.json
npm run content:publish:guide -- ./path/to/guide-article.json
```

Each command also accepts `-` and reads JSON from stdin.

## Payment-period payload

```json
{
  "year": 2026,
  "month": 4,
  "published": true,
  "entries": [
    {
      "grantSlug": "older-persons",
      "state": "expected",
      "paymentDate": "2026-04-03",
      "note": "Confirmed from the official payment-dates announcement.",
      "published": true
    }
  ]
}
```

## News payload

```json
{
  "title": "SASSA payment dates updated for May 2026",
  "summary": "GrantCare updated the May 2026 payment schedule after a new official announcement.",
  "sections": [
    {
      "title": "What changed",
      "body": "Explain the date change clearly."
    },
    {
      "title": "What to check next",
      "body": "1. Compare the new dates.\n2. Check your grant type.\n3. Use the official route if your case is different."
    }
  ],
  "sourceUrls": [
    "https://www.gov.za/",
    "https://www.sassa.gov.za/"
  ],
  "internalLinks": [
    "/payment-dates",
    "/guides/how-to-understand-payment-dates",
    "/grants"
  ],
  "featured": true,
  "status": "published"
}
```

## Guide payload

```json
{
  "title": "How to read a new SASSA payment-date update",
  "summary": "Use this guide when an official SASSA date update changes what you expected for the month.",
  "sections": [
    {
      "title": "Start with the month page",
      "body": "Explain how to compare the current month and the grant-specific page."
    }
  ],
  "internalLinks": [
    "/payment-dates",
    "/news",
    "/faq"
  ],
  "status": "published"
}
```

## Agent rules

- Use official SASSA and South African Government sources first for dates and factual claims.
- Only publish a payment-date change after an official source confirms it.
- News posts should include source URLs and at least 3 internal links.
- Guides should stay evergreen when possible and should not impersonate official systems.
- Keep product UI unchanged; publish content into the existing news, guide, and payment-date structures.
- When nothing materially changed, do not publish filler content.

## Paperclip / scheduled-agent brief

Use one agent with this responsibility:

- watch official SASSA and South African Government sources every 2 hours
- update payment dates when official dates change
- create news posts for new official announcements
- create evergreen guides only when a durable new topic appears
- use the publishing commands above instead of hand-editing the database
