# jasonpollard.com

Professional site for Jason Pollard, positioning him for remote U.S. Staff / Principal Software Engineer, Solutions Architect, AI-enabled application architecture, and senior hands-on technical leadership roles.

The site is intentionally static and direct: résumé-backed evidence, selected work, practical AI engineering, and independent projects—without a CMS, database, analytics, or contact form.

## Stack

- Node.js 24.16.0 (Node 24.x in `package.json`)
- Next.js 16.2.x App Router
- React 19.2.x
- TypeScript 5.7.x
- Ordinary CSS
- Node test runner through `tsx`
- Playwright with Chromium

## Repository map

- `app/` — routes, metadata, robots, sitemap, Open Graph image, and global styles
- `components/` — shared header, footer, page introduction, and JSON-LD
- `content/site-content.ts` — single public-safe, résumé-backed content source and site configuration
- `tests/unit/` — content, configuration, and server-rendering invariants
- `tests/e2e/` — navigation, contact, metadata, and mobile overflow checks
- `docs/` — manual Vercel/domain and email setup checklists
- `personal/` — private ignored source material; never import, copy, expose, or commit it

## Setup

Use the Node version in `.nvmrc`:

```bash
nvm use
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

- `npm run dev` — start local development
- `npm run build` — create a production build
- `npm run start` — serve a production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript without emitting files
- `npm run test:unit` — run focused unit/rendering tests
- `npm run test:e2e` — run Playwright in Chromium
- `npm run test:no-js` — run focused browser checks with JavaScript disabled
- `npm run test:static` — verify built public routes have prerendered HTML artifacts
- `npm run test:e2e:deployed` — smoke-test the URL supplied through `PLAYWRIGHT_BASE_URL`
- `npm run test:links:external` — make the explicitly network-dependent external destination check
- `npm run test:e2e:headed` — run Playwright visibly
- `npm run test:e2e:install` — install Playwright Chromium
- `npm run verify:fast` — lint and typecheck
- `npm run verify` — fast checks plus unit tests
- `npm run verify:full` — normal checks plus production build

## Editing public content

Update `content/site-content.ts`. Keep facts traceable to the current résumé and preserve exact metrics. The job filter informs role fit only; its private constraints and commentary are not public content.

`siteConfig.resumeUrl` points to the deliberately approved public-safe PDF in `public/`. Do not replace it with, or copy another résumé from, `personal/`.

## Validation

For broad changes, run:

```bash
npm run verify:full
npm run test:e2e
```

After a Vercel preview exists, run the deployed smoke suite without starting a local server:

```bash
PLAYWRIGHT_BASE_URL=https://your-preview.example npm run test:e2e:deployed
```

PowerShell equivalent:

```powershell
$env:PLAYWRIGHT_BASE_URL="https://your-preview.example"; npm run test:e2e:deployed
```

Run `npm run test:links:external` separately when network access is available; it follows redirects and reports the final ArcadeGhosts URL.

CI runs a production dependency audit, full verification, and Playwright in separate jobs. No secrets or external services are required.

## Deployment

Deploy as a standard Next.js project on Vercel. No environment variables are currently needed. Follow [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for project, domain, redirect, DNS, HTTPS, and launch checks. Follow [docs/EMAIL-SETUP.md](docs/EMAIL-SETUP.md) before treating `hello@jasonpollard.com` as operational.

## Privacy boundary

Everything under `personal/` is private and ignored. It must never be imported, served, copied into public assets, included in test fixtures, or committed. Never add private contact details, confidential employer details, client names, or invented career claims.

## Future work

- Add a real portrait only if Jason supplies and approves one.
- Curate a GitHub profile before adding any GitHub link.
