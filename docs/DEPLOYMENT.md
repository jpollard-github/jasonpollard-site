# Deployment checklist

No deployment or DNS changes are automated by this repository.

## Vercel project

- [ ] In Vercel, create a project by importing this repository.
- [ ] Confirm Vercel detects Next.js and the repository root.
- [ ] Keep the standard install command (`npm install`), build command (`next build`), and output settings unless Vercel detects otherwise.
- [ ] Confirm Node.js 24 is selected from `package.json` / `.nvmrc`.
- [ ] Configure production deployments from `main` and complete an initial deployment.
- [ ] Confirm the deployed four routes, 404 page, and generated Open Graph image.

## Domains and DNS

- [ ] Add `jasonpollard.com` and `www.jasonpollard.com` in the Vercel project Domains settings.
- [ ] Make the apex `jasonpollard.com` the canonical production domain.
- [ ] Configure `www.jasonpollard.com` to permanently redirect to the apex domain.
- [ ] At the registrar/DNS provider, apply the exact DNS records Vercel displays. Do not substitute hard-coded values from documentation.
- [ ] Wait for Vercel to report valid configuration and HTTPS certificates for both names.
- [ ] Verify HTTP-to-HTTPS and `www`-to-apex redirects are permanent and preserve paths.

## Launch verification

- [ ] Confirm canonical tags use `https://jasonpollard.com` on every route.
- [ ] Open `/sitemap.xml` and `/robots.txt` on the production domain.
- [ ] Validate Person and WebSite JSON-LD with a structured-data testing tool.
- [ ] Test the Open Graph preview in at least one social preview tool.
- [ ] Test desktop and mobile navigation, keyboard focus, 404 behavior, and the external ArcadeGhosts link.
- [ ] Complete `docs/EMAIL-SETUP.md` and verify `hello@jasonpollard.com` before announcing or broadly sharing the site.

## Preview outreach-readiness check

Run the automated deployed smoke suite against the actual Vercel preview origin:

```bash
PLAYWRIGHT_BASE_URL=https://your-preview.example npm run test:e2e:deployed
npm run test:links:external
```

Then complete these human checks:

- [ ] Click **Download résumé**. Confirm the approved two-page PDF opens or downloads, and test its links to `mailto:hello@jasonpollard.com`, `https://jasonpollard.com`, and `https://arcadeghosts.org`.
- [ ] Confirm the PDF contains no private phone, private email, local path, personal note, or unexpected metadata.
- [ ] In Chrome or Edge DevTools, open the Command Menu, choose **Disable JavaScript**, reload `/`, `/work`, `/ai-engineering`, and `/projects`, and confirm content, navigation, email, résumé, and ArcadeGhosts links remain useful. Re-enable JavaScript afterward. For an automated, extension-free alternative, run `npm run test:no-js` locally.
- [ ] From the preview, click every internal navigation link, the résumé link, ArcadeGhosts, and the email link. Confirm the composer addresses `hello@jasonpollard.com`; send one message, reply through Namecheap Private Email, and verify the From address and signature.
- [ ] Confirm no link points to localhost, a Vercel staging path, or a private file.
- [ ] Review Vercel’s deployment output and route information. Confirm the four pages are static/prerendered assets and no serverless functions were created for them.
