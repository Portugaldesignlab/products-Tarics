# 🛠️ Setup Guide — GitHub + Vercel

Complete step-by-step instructions to get TARIC·NET live in under 5 minutes.

---

## Step 1 — Initialize Git Repository

Open your terminal inside the `taric-net` folder:

```bash
git init
git add .
git commit -m "feat: initial TARIC·NET platform 🚀"
```

---

## Step 2 — Create GitHub Repository

**Via GitHub website:**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `taric-net`
3. Set to **Public** (required for free Vercel hobby plan)
4. Do **NOT** initialize with README (we already have one)
5. Click **Create repository**

**Push your code:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/taric-net.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3 — Deploy to Vercel

### Method A: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**)
2. Click **"Add New…"** → **"Project"**
3. Find and click **"Import"** next to `taric-net`
4. Vercel auto-detects **Vite** framework
5. Leave all settings as default
6. Click **"Deploy"**
7. ✅ Live at `https://taric-net.vercel.app` in ~60 seconds

### Method B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project folder
vercel --prod
```

Follow the prompts — it will ask to link to your GitHub repo.

---

## Step 4 — Enable Auto-Deploy via GitHub Actions (Optional)

This enables automatic deployments whenever you push to `main`.

### Get your Vercel credentials:

```bash
# Link project to Vercel (creates .vercel/project.json)
vercel link

# Print your IDs
cat .vercel/project.json
```

You'll see:
```json
{
  "orgId": "team_xxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxx"
}
```

### Get your Vercel Token:
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create"**
3. Name it `github-actions`
4. Copy the token (shown once only)

### Add secrets to GitHub:
1. Go to your repo on GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Add these 3 secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Your token from above |
| `VERCEL_ORG_ID` | `orgId` from `project.json` |
| `VERCEL_PROJECT_ID` | `projectId` from `project.json` |

Now every `git push origin main` auto-deploys! 🎉

---

## Step 5 — Custom Domain (Optional)

1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g. `taric-net.com`)
4. Follow the DNS configuration instructions
5. Vercel provisions a free SSL certificate automatically

---

## 🔄 Workflow Going Forward

```bash
# Make changes to src/App.jsx
# Test locally
npm run dev

# When ready to deploy
git add .
git commit -m "feat: add new TARIC categories"
git push origin main
# → GitHub Actions triggers automatically
# → Vercel deploys in ~45 seconds
```

---

## ❓ Troubleshooting

**Build fails with "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Vercel shows 404 on refresh**
The `vercel.json` `rewrites` rule handles this. Make sure `vercel.json` is committed.

**GitHub Actions not triggering**
Check that secrets are added correctly and the workflow file is at `.github/workflows/ci.yml`.

**Font not loading**
The app loads DM Mono from Google Fonts. Ensure the browser has internet access.
