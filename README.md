# Compartilhator

A social media content repurposing tool that transforms video links (Instagram Reels, YouTube, TikTok) or plain text into ready-to-publish posts for Instagram, LinkedIn, Facebook, and Newsletter — with one-click copy for each platform.

## Local Development

```bash
cp .env.example .env.local
# Edit .env.local and set VITE_API_URL

npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Deploy

Push to `main` — GitHub Actions builds and deploys automatically to GitHub Pages.

Live URL: `https://erickmob.github.io/compartilhator/`

## Required GitHub Secret

In the repository → **Settings** → **Secrets and variables** → **Actions**, add:

| Name | Value |
|---|---|
| `VITE_API_URL` | `https://transcriptor.erickmob.dev` |

## Backend

This app calls the **transcriptor** service (`/repurpose` endpoint), which downloads video audio, transcribes it, and uses AI to generate platform-optimized posts. The backend runs on Oracle Cloud behind a Cloudflare Tunnel.
