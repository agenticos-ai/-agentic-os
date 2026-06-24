# AgenticOS — Deployment Guide

## Your folder structure (must look exactly like this)
```
agentic-os/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.jsx
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```

---

## STEP 1 — Create a GitHub account
Go to https://github.com → Sign up (free)

---

## STEP 2 — Create a new repository on GitHub
1. Click the green **"New"** button on your GitHub dashboard
2. Name it: `agentic-os`
3. Set it to **Public**
4. Click **"Create repository"**

---

## STEP 3 — Upload your files to GitHub
1. On your new repo page, click **"uploading an existing file"**
2. Drag and drop ALL files from this folder (keep the folder structure intact)
3. Click **"Commit changes"**

---

## STEP 4 — Create a Vercel account
Go to https://vercel.com → Sign up with your GitHub account (free)

---

## STEP 5 — Deploy to Vercel
1. On your Vercel dashboard, click **"Add New Project"**
2. Click **"Import"** next to your `agentic-os` GitHub repo
3. Leave all settings as-is
4. Click **"Deploy"**
5. Wait ~60 seconds — your site is now LIVE ✓

You'll get a URL like: `agentic-os.vercel.app`

---

## STEP 6 — Add your Anthropic API key (powers the Execute tab)
1. Go to https://console.anthropic.com → sign up → click "API Keys" → create a key
2. Back in Vercel → click your project → **Settings** → **Environment Variables**
3. Add:
   - **Name:** `REACT_APP_ANTHROPIC_KEY`
   - **Value:** your API key (starts with `sk-ant-...`)
4. Click **Save** → go to **Deployments** → click **Redeploy**

---

## STEP 7 — Buy your domain (optional but recommended)
1. Go to https://namecheap.com
2. Search `agentigos.com` or `useagentic.ai` (~$12/year)
3. In Vercel → Settings → Domains → add your custom domain
4. Follow Vercel's 2-step DNS instructions (takes 10 min)

---

## You're live. Now sell it.
- Record a 90-second demo video of the Execute tab in action
- Post it to LinkedIn, TikTok, Instagram, YouTube
- Add a waitlist form at https://tally.so (free, 5 min setup)
- Set up Stripe at https://stripe.com to take payments
