
# AKEP Landing Page

This project contains:

- A Vite + React frontend (static site, suitable for S3/CloudFront)
- A Node/Express email API in `server/` (suitable for Render)

## Local development

1. Install frontend dependencies:

```bash
npm install
```

2. Install backend dependencies:

```bash
npm --prefix server install
```

3. Configure frontend env:

```bash
cp .env.example .env
```

4. Configure backend env:

```bash
cp server/.env.example server/.env
```

Set `RESEND_API_KEY` in `server/.env` to your own Resend API key, and set
`FROM_EMAIL` to an address on a domain verified in Resend. Do not share the key
in chat or commit the `.env` file. Add the exact frontend origin to
`ALLOWED_ORIGINS` if you use a different local host or port.

5. Run frontend:

```bash
npm run dev
```

6. Run backend (separate terminal):

```bash
npm run dev:api
```

The frontend sends form submissions to `VITE_API_BASE_URL`. Development defaults
to `http://localhost:8787`, but production builds default to the live API if
this variable is unset. For `npm run preview` to use the local API, set
`VITE_API_BASE_URL=http://localhost:8787` in the root `.env` **before** running
`npm run build`, then restart the preview.
Both frontend and backend must be running to send email. Check
`http://localhost:8787/health` if the form reports a network error, and check
the backend terminal for email-provider errors. A successful health check alone
does not verify that the Resend key or sender domain is valid.

## Demo and pilot enquiries

The institutional form requires a name, email, institution and role. Country,
goal and additional details are optional. Both `/api/contact` and
`/api/waitlist` accept these fields and enforce the required fields when
`formType` is `institutional`; older email-only submissions remain supported.
Notifications include the submitted qualification fields.

After both emails are accepted by the email provider, the site displays a
confirmation page. The email address is passed in browser navigation state,
not in the URL. The booking button is disabled until a booking link is supplied.
Deploy the updated email API before deploying the frontend so it does not discard
the new fields. The French site remains a work in progress and should not be
published until its outstanding translations and reviews are complete. University
directory descriptions, mottos and focus areas come from the university API and
may still be in English. Dashboard screenshots also contain English text and need
French replacements. The translation CSV covers the website dictionaries and SEO,
but not the email templates or API-provided content; it needs a native review.

The English demo overview now describes an illustrative workflow instead of
claiming a verified two-minute video or a fully automated pipeline. Its mock
university and onboarding, topic-review and supervisor-selection labels were
changed to avoid implying a real university deployment or unverified automation.

## Backend deployment (email API)

The repository includes `render.yaml` configured to deploy `server/` as a web service, but your current production API is the `api.akepapp.com` subdomain.

Set these backend environment variables for the service:

- `ALLOWED_ORIGINS` (for example: `https://your-frontend-domain.com`)
- `RESEND_API_KEY`
- `NOTIFY_TO`
- `FROM_EMAIL`

API endpoints exposed by the backend:

- `POST /api/waitlist`
- `POST /api/contact`
- `GET /health`

## Frontend production env

For your Amplify frontend deployment, set:

- `VITE_API_BASE_URL=https://api.akepapp.com`

This keeps frontend and backend fully decoupled.

## Search and social sharing

The official public address is `https://www.akepapp.com`. `npm run build`
generates page-specific HTML metadata, `robots.txt` and `sitemap.xml` using
`src/seo.json`. Keep the manifest in sync when adding public routes.
Metadata is available without JavaScript; page content still renders in React.
University profiles are dynamic and are not included in the static sitemap.

The social preview uses `public/og-image.png` (1200 x 630); its editable source
is `public/og-image.svg`. Update both when changing the artwork.

After deploying:

1. Redirect alternative public domains to `https://www.akepapp.com`, preserving
   paths. Configure redirects in Cloudflare; do not redirect the API or dashboard.
2. Verify `akepapp.com` as a Domain property in Google Search Console using the
   supplied DNS TXT record. Submit `https://www.akepapp.com/sitemap.xml`.
3. Inspect the homepage URL and request indexing. Indexing and rankings are not
   guaranteed by submitting a sitemap.
4. Test shared links with LinkedIn Post Inspector and check the preview image.
5. Publish helpful, accurate content for university research teams and earn
   relevant links. Social shares do not guarantee a Google ranking.

Search Console verification, Cloudflare redirects and social account ownership
must be configured in the respective accounts; this build does not set them up.
  