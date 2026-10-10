
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
  