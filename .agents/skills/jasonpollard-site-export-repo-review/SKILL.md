---
name: jasonpollard-site-export-repo-review
description: Create a public-safe jasonpollard-site repository-review ZIP containing tracked and non-ignored files, then reveal the exact archive in macOS Finder when available. Use when exporting this repository for review in ChatGPT or another external review tool.
---

1. Read the repository-root `AGENTS.md` and `README.md`.
2. Confirm the current directory is the `jasonpollard-site` repository root and `package.json` defines `zip:repo-review`. Do not modify unrelated files.
3. Run `npm run zip:repo-review`. Do not run broader verification and do not delete older archives.
4. Parse the relative path from the line beginning `Created ` and resolve it from the repository root. If parsing fails, use only a new or modified ZIP directly under `repo-reviews/` from this run.
5. Verify the path exists, is a regular non-empty `.zip`, and inspect its file listing. Confirm it contains no ignored material and no path under `personal/`, `node_modules/`, `.next/`, `repo-reviews/`, `playwright-report/`, or `test-results/`.
6. On macOS, if `open` is available, run `open -R "/absolute/path/to/archive.zip"` against the exact ZIP. Reveal the file; do not open the archive or only its directory. If `open` is unavailable or the platform is not macOS, never claim Finder opened.
7. Report whether export succeeded, the absolute archive path and size, the printed file count, the ignore-boundary check, and whether Finder reveal succeeded.
