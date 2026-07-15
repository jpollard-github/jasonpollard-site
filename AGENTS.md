# AGENTS.md

## Start here

Read this file and `README.md` before changing the repository. This is Jason Pollard's public professional site; keep its content factual, calm, direct, and public-safe.

## Privacy and content

- Never import, expose, serve, copy, or commit anything from `personal/`.
- Never invent career facts, metrics, clients, users, testimonials, or outcomes.
- Use `content/site-content.ts` as the résumé-backed public content source.
- Do not publish a phone number, private address, private email, uncurated GitHub profile, or résumé file.
- Keep `siteConfig.resumeUrl` disabled until a deliberately public-safe résumé is added outside `personal/`.

## Engineering rules

- Make the smallest coherent change and do not rewrite unrelated work.
- Prefer Server Components. Add client components only for necessary browser behavior.
- Use npm and the Node version in `.nvmrc`; keep dependencies minimal.
- Preserve accessibility, semantic structure, visible focus, contrast, performance, mobile safety, and reduced-motion behavior.
- Do not add a database, CMS, auth, analytics, forms, API routes, or server actions without an explicit request.
- Do not commit unless explicitly asked.

## Validation and reporting

Use `npm run verify:fast` for docs or focused styling, `npm run verify` for logic/content-shape changes, and `npm run verify:full` for dependencies, configuration, routes, or cross-cutting work. Run relevant Playwright tests for navigation or layout changes.

Report changed files, exact commands and results, manual steps, and uncertainties. Never claim a browser or build check passed unless it ran.
