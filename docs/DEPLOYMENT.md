# Deployment checklist

No deployment or DNS changes are automated by this repository.

## Vercel project

- [x] In Vercel, create a project by importing this repository.
- [x] Confirm Vercel detects Next.js and the repository root.
- [x] Keep the standard install command (`npm install`), build command (`next build`), and output settings unless Vercel detects otherwise.
- [x] Confirm Node.js 24 is selected from `package.json` / `.nvmrc`.
- [x] Configure production deployments from `main` and complete an initial deployment.
- [x] Confirm the deployed four routes, 404 page, and generated Open Graph image.

## Domains and DNS

- [x] Add `jasonpollard.com` and `www.jasonpollard.com` in the Vercel project Domains settings.
- [x] Make the apex `jasonpollard.com` the canonical production domain.
- [x] Configure `www.jasonpollard.com` to permanently redirect to the apex domain.
- [x] At the registrar/DNS provider, apply the exact DNS records Vercel displays. Do not substitute hard-coded values from documentation.
- [x] Wait for Vercel to report valid configuration and HTTPS certificates for both names.
- [x] Verify HTTP-to-HTTPS and `www`-to-apex redirects are permanent and preserve paths.

## Launch verification

- [x] Confirm canonical tags use `https://jasonpollard.com` on every route.
- [x] Open `/sitemap.xml` and `/robots.txt` on the production domain.
- [x] Validate Person and WebSite JSON-LD with a structured-data testing tool.
- [x] Test the Open Graph preview in at least one social preview tool.
- [x] Test desktop and mobile navigation, keyboard focus, 404 behavior, and the external ArcadeGhoss link.
- [x] Complete `docs/EMAIL-SETUP.md` and verify `hello@jasonpollard.com` before announcing or broadly sharing the site.

## Preview outreach-readiness check

Run the automated deployed smoke suite against the actual Vercel preview origin:

```bash
PLAYWRIGHT_BASE_URL=https://jasonpollard.com npm run test:e2e:deployed
npm run test:links:external
npm run test:no-js
```

Then complete these human checks:

- [x] Click **Download résumé**. Confirm the approved two-page PDF opens or downloads, and test its links to `mailto:hello@jasonpollard.com`, `https://jasonpollard.com`, and `https://arcadeghosts.org`.
- [x] Confirm the PDF contains no private phone, private email, local path, personal note, or unexpected metadata.
- [x] In Chrome or Edge DevTools, open the Command Menu, choose **Disable JavaScript**, reload `/`, `/work`, `/ai-engineering`, and `/projects`, and confirm content, navigation, email, résumé, and ArcadeGhosts links remain useful. Re-enable JavaScript afterward. For an automated, extension-free alternative, run `npm run test:no-js` locally.
- [x] From the preview, click every internal navigation link, the résumé link, ArcadeGhosts, and the email link. Confirm the composer addresses `hello@jasonpollard.com`; send one message, reply through Namecheap Private Email, and verify the From address and signature.
- [x] Confirm no link points to localhost, a Vercel staging path, or a private file.
- [x] Review Vercel’s deployment output and route information.
  - Confirmed `/`, `/work`, `/ai-engineering`, and `/projects`
    are prerendered as static content during `next build`.
  - Vercel packages the Next.js page routes as serverless-function
    artifacts, all with `revalidate: false`.
  - No application API routes, server actions, runtime fetching,
    authentication, database access, or other dynamic server logic exist.
