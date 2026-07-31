# AKEP Deployment Guide (akepapp.com)

Complete setup for Cloudflare domain → S3/CloudFront frontend + Render backend email API.

---

## Phase 1: Deploy Backend (Render) — ~5 minutes

### 1.1 Create Render Account
- Go to https://render.com
- Sign up with GitHub

### 1.2 Connect GitHub & Deploy from render.yaml
- In Render dashboard, click "New +" > "Web Service"
- Select "Build and deploy from a Git repository"
- Connect your GitHub repo (Akeplandingpage)
- Configure:
  - **Name:** `akep-email-api`
  - **Root Directory:** `server`
  - **Build Command:** `npm install`
  - **Start Command:** `npm run start`
  - **Plan:** Free (or Starter if you want better uptime)
- Click "Create Web Service"

### 1.3 Wait for first deploy (2–3 min)
- Render will build and deploy automatically
- Once deployed, you'll get a URL like: `https://akep-email-api-xxxxx.onrender.com`
- Note this URL — you'll need it in step 2.4

### 1.4 Set Environment Variables on Render
In Render dashboard for your service:
- Go to "Environment" tab
- Add these variables:

```
ALLOWED_ORIGINS=https://akepapp.com,https://www.akepapp.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_google_app_password
NOTIFY_TO=your_gmail@gmail.com
FROM_EMAIL=your_gmail@gmail.com
PORT=8787
NODE_ENV=production
```

- Update SMTP values with your real Gmail/SMTP credentials
- Click "Save changes"
- Render will auto-restart the service with new env vars

### 1.5 Test the backend
- In terminal or Postman, test:
  ```bash
  curl https://akep-email-api-xxxxx.onrender.com/health
  ```
- Should return: `{"ok":true}`

---

## Phase 2: Build & Deploy Frontend (AWS Amplify) — ~10 minutes

### 2.1 Build Frontend Locally
```bash
# From project root
npm install
npm run build
```
- Output goes to `dist/`

### 2.2 Set Frontend Environment Variable
```bash
echo "VITE_API_BASE_URL=https://api.akepapp.com" > .env.production
```

### 2.3 Rebuild with API URL
```bash
npm run build
```

### 2.4 Deploy on Amplify
1. AWS Console → search **Amplify** → **Host web app**
2. Connect GitHub repo and select the `main` branch
3. Confirm Amplify picks up [amplify.yml](amplify.yml)
4. Add environment variable in Amplify:
   ```
   VITE_API_BASE_URL=https://api.akepapp.com
   ```
5. Save and deploy
6. Note the Amplify URL, then add the custom domain `www.akepapp.com`

---

## Phase 3: Configure Cloudflare DNS — ~5 minutes

### 3.1 Add Records in Cloudflare
1. Log into Cloudflare console for `akepapp.com`
2. Go to **DNS** and add these records:

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | www | your Amplify domain | Auto |
| CNAME | dash | your dashboard host | Auto |
| CNAME | api | api.akepapp.com target host | Auto |

### 3.2 (Optional) Root Domain (@)
If you want `akepapp.com` to work, set a redirect rule:
- Match: hostname equals `akepapp.com`
- Action: Redirect to `https://www.akepapp.com`

### 3.3 Enable HTTPS in Cloudflare
- Cloudflare console > SSL/TLS
- **Encryption mode:** Full (strict)
- **Always Use HTTPS:** ON
- **HSTS:** Enable (optional but recommended)

### 3.4 Wait for DNS propagation
- Can take 5 minutes to 24 hours
- Test: `nslookup www.akepapp.com` or `dig www.akepapp.com`
- You should see your Amplify CNAME target

---

## Phase 4: Update Your Application — ~2 minutes

### 4.1 Update Frontend Environment (Production)
Create `.env.production` in project root:
```
VITE_API_BASE_URL=https://api.akepapp.com
```

### 4.2 Build & Deploy Again
```bash
npm run build
```

### 4.3 Redeploy Amplify
- Push to `main` or click **Redeploy** in Amplify

---

## Phase 5: Test End-to-End

### 5.1 Frontend
- Visit `https://www.akepapp.com`
- Forms should load
- Open browser DevTools Network tab
- Submit a waitlist/demo form
- Check that the request goes to `https://api.akepapp.com/api/waitlist`

### 5.2 Backend
- Visit `https://api.akepapp.com/health`
- Should return `{"ok":true}`

### 5.3 Email
- Submit a form on the site
- Check your NOTIFY_TO email inbox
- You should receive the submission email within seconds

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend loads but forms fail | Check VITE_API_BASE_URL in .env.production; rebuild; invalidate CloudFront cache |
| API returns CORS error | Update ALLOWED_ORIGINS on Render to include your Cloudflare domain |
| Emails not sent | Check SMTP credentials on Render env vars; verify Gmail app password is correct |
| DNS not resolving | Wait longer (up to 24h); use `nslookup` to verify; check Cloudflare DNS records |
| S3 access denied | Verify bucket policy allows CloudFront; check IAM user permissions |

---

## Quick Reference: Your URLs

Once deployed:
- **Frontend:** https://www.akepapp.com
- **Dashboard:** https://dash.akepapp.com
- **API:** https://api.akepapp.com
- **Amplify:** your Amplify app domain

---

## What Not To Do

❌ Don't use S3 static website endpoint directly in DNS (use CloudFront instead)
❌ Don't commit .env files to git (already in .gitignore)
❌ Don't expose SMTP passwords in frontend code (they stay in Render env only)
❌ Don't forget to rebuild frontend when you change VITE_* env vars

---

## Optional: Setup CI/CD for Auto-Deploy on Push

If you want frontend to auto-deploy when you push to GitHub:

### Netlify (easiest alternative to manual S3)
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set env vars in Netlify dashboard
5. Push to GitHub → auto-deploys

### GitHub Actions (for S3)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to S3
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install && npm run build
      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: akepapp-frontend
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
          SOURCE_DIR: dist
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

**Need help with any step? Let me know the phase you're at.**
