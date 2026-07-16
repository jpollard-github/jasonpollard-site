# Maintenance notes

## Production dependency audit

Reviewed: 2026-07-15

Command:

```bash
npm audit --omit=dev
```

Current result: two moderate-severity production findings and no high- or critical-severity production findings.

Affected dependency path:

```text
next → postcss < 8.5.10
```

The reported advisory is [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93), an XSS risk caused by unescaped `</style>` text in PostCSS CSS-stringification output. The installed Next.js dependency currently resolves to a vulnerable PostCSS version.

npm proposes `npm audit fix --force`, which would install `next@9.3.3`. That is a breaking downgrade from the current Next.js 16 application and was deliberately not applied. Do not use `npm audit fix` or `npm audit fix --force` blindly.

Recheck with:

```bash
npm audit --omit=dev
npm outdated next postcss
```

Recheck whenever Next.js or PostCSS is upgraded, when Dependabot or GitHub reports a related advisory, before a dependency-maintenance release, and at least monthly while this advisory remains open. Prefer a normal compatible Next.js update that resolves PostCSS to a fixed version, followed by `npm run verify:full` and `npm run test:e2e`.
