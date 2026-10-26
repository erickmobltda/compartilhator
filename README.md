# Compartilhator

A social media content repurposing tool that transforms video links (Instagram Reels, YouTube, TikTok) or plain text into ready-to-publish posts for Instagram, LinkedIn, Facebook, and Newsletter — with one-click copy for each platform.

## Local Development

```bash
cp .env.example .env.local
# Edit .env.local: VITE_API_URL and the Firebase web config

npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Deploy

Push to `main` — GitHub Actions builds and deploys automatically to GitHub Pages.

Live URL: **https://compartilhator.erickmob.dev** (the old `erickmobltda.github.io/compartilhator/` redirects there).

## Required GitHub Secrets

In the repository → **Settings** → **Secrets and variables** → **Actions**:

| Name | Value |
|---|---|
| `VITE_API_URL` | `https://api.erickmob.dev` |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_APP_ID` | `firebase apps:sdkconfig WEB <compartilhator appId> --project erickmob-apps` |
| `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID` | `erickmob-apps.firebaseapp.com`, `erickmob-apps` |

## Live demo

Click **Try the demo** on https://compartilhator.erickmob.dev. It signs in with `demo@ledgenator.app` / `demo1234`, the public sandbox account shared by the erickmob apps, and lists two ready-made generations (a reel and a text) under **Recent** so you can browse the Instagram, LinkedIn, Facebook and Newsletter results.

Generating new posts is off for the demo account: erickmob-api answers `403` to `/repurpose` (it spends paid transcription and AI credits). The samples live in `src/lib/demo.ts`; there's nothing to reset.

## Login and backend

Generating posts requires signing in (Firebase Auth, project `erickmob-apps`, shared with the other apps; sign-up is off, accounts are created in the Firebase console). Each call to `POST /repurpose` on [erickmob-api](https://github.com/erickmobltda/erickmob-api) carries the user's Firebase ID token; the API downloads the video audio, transcribes it, and uses AI to generate platform-optimized posts. It runs on Oracle Cloud behind a Cloudflare Tunnel. The history of generated posts stays in the browser (localStorage).
