# Changelog

## 2026-10-25 — Domain moved to erickmob.dev

**Why:** `erickmob.dev` was bought back and is the main domain again. GitHub Pages serves one custom domain per repo, so `.dev` is the canonical one and `.com` redirects to it.

| | Before | After |
|---|---|---|
| URL | `https://compartilhator.erickmob.com` | **`https://compartilhator.erickmob.dev`** (`.com` and `erickmobltda.github.io/compartilhator/` redirect here) |
| API | `https://api.erickmob.com` | `https://api.erickmob.dev` (`.com` keeps answering) |

- Changed: the custom domain in the Pages settings (this repo deploys with `actions/deploy-pages`), the `VITE_API_URL` repo secret, `.env.example`, README.
- The login session is stored per domain: sign in again once on `.dev`.

## 2026-10-24 — Login + erickmob-api, new domain

**Why:** the backend at `transcriptor.erickmob.dev` stopped resolving when `erickmob.dev` was lost, so the app could no longer generate posts. Its replacement, [erickmob-api](https://github.com/erickmobltda/erickmob-api), only answers signed-in users. Before, anyone with the link could spend the Claude and Groq credits behind the app (the only limit was 20 requests/hour per IP — and behind the Cloudflare tunnel every request had the same IP).

### Where things moved

| | Before | After |
|---|---|---|
| URL | `erickmobltda.github.io/compartilhator/` | **`https://compartilhator.erickmob.com`** (old URL redirects) |
| Backend | `https://transcriptor.erickmob.dev/repurpose`, no auth | `https://api.erickmob.com/repurpose`, requires the user's Firebase ID token |
| Login | none | Firebase Auth, project `erickmob-apps`, shared with the other apps. Password only; sign-up off |
| History | browser localStorage | unchanged |

### Changes

- `src/lib/firebase.ts`, `src/hooks/useAuth.ts`, `src/components/LoginForm.tsx` added; the form, results and errors only render for a signed-in user; the header shows the account and a sign-out link.
- `useRepurpose` sends `Authorization: Bearer <ID token>` and maps `401` to "session expired".
- Vite `base` is `/`; the Pages custom domain is `compartilhator.erickmob.com`.
- Repo secrets: `VITE_API_URL=https://api.erickmob.com` and `VITE_FIREBASE_*`.

Commits: `2f0ba25` (domain), `1606a37` (login + API).
