
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

5. Run frontend:

```bash
npm run dev
```

6. Run backend (separate terminal):

```bash
npm run dev:api
```

The frontend sends form submissions to `VITE_API_BASE_URL` (default `http://localhost:8787`).

## Backend deployment (email API)

The repository includes `render.yaml` configured to deploy `server/` as a web service, but your current production API is the `api.akepapp.com` subdomain.

Set these backend environment variables for the service:

- `ALLOWED_ORIGINS` (for example: `https://your-frontend-domain.com`)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true` or `false`)
- `SMTP_USER`
- `SMTP_PASS`
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
  