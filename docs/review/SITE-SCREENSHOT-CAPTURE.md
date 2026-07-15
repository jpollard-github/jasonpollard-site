# Site screenshot capture

This note records the one-off process used to create desktop review screenshots of every public page. It is intentionally documentation only; no package script has been added yet.

## Output convention

Create a new directory for every run:

```text
repo-reviews/screenshots-YYYY-MM-DD-HHMMSS/
```

Use route-based filenames so review tools can identify each image without extra context:

```text
home--full-page.png
work--full-page.png
ai-engineering--full-page.png
projects--full-page.png
```

If a full-page image is not legible, keep it and add viewport-sized captures named `<page>--top.png` and `<page>--bottom.png`. Add `--middle-01`, `--middle-02`, and so on when a page needs more than two parts.

## Process used on 2026-07-15

1. Use the Node version from `.nvmrc` and install dependencies.
2. Install the project-pinned Chromium build with `npm run test:e2e:install` if Playwright reports that its browser executable is missing.
3. Start the site with `npm run dev` and confirm `http://localhost:3000` responds.
4. Open Chromium in headed mode through Playwright.
5. Use a deterministic desktop context:
   - viewport: 1440 by 1000 CSS pixels
   - device scale factor: 1
   - light color scheme
   - reduced motion enabled
6. Visit `/`, `/work`, `/ai-engineering`, and `/projects` one at a time.
7. Wait for network idle and `document.fonts.ready` before each capture.
8. Save a lossless PNG with `fullPage: true` and animations disabled.
9. Record the HTTP status, document title, rendered dimensions, and whether horizontal overflow is present.
10. Inspect every saved image at its original resolution. Add clearly named top, middle, or bottom captures only when the full-page version is not practical to read.

The 2026-07-15 run used Playwright's MCP workflow first. The managed MCP browser backend was unavailable, and macOS GUI permissions prevented its sandboxed Chromium process from launching. The captures were therefore completed with the same project-pinned Playwright API in an approved unsandboxed headed process. This fallback may not be necessary in a session with an available managed browser backend.

## Future automation

A future command should discover or centrally define the public route list, create a fresh timestamped directory, fail on non-200 responses or horizontal overflow, and print a small manifest containing each route, title, filename, and image dimensions. Keep the command focused on review artifacts and avoid reading from or packaging anything under `personal/`.
