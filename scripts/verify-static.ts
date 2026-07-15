import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const nextDir = path.join(root, ".next");
const manifestPath = path.join(nextDir, "prerender-manifest.json");
assert.ok(existsSync(manifestPath), "Missing .next/prerender-manifest.json; run npm run build first.");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { routes?: Record<string, { initialRevalidateSeconds?: number | false }> };
const expectedPages = ["/", "/work", "/ai-engineering", "/projects"] as const;
for (const route of expectedPages) {
  assert.ok(manifest.routes?.[route], `${route} is missing from the prerender manifest.`);
  assert.equal(manifest.routes[route].initialRevalidateSeconds, false, `${route} is not a fully static prerender.`);
  const htmlName = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const htmlPath = path.join(nextDir, "server", "app", htmlName);
  assert.ok(existsSync(htmlPath), `${route} is missing its generated HTML artifact.`);
  assert.ok(statSync(htmlPath).size > 500, `${route} generated an unexpectedly small HTML artifact.`);
}

const resumePath = path.join(root, "public", "Jason-Pollard-Resume.pdf");
assert.ok(existsSync(resumePath), "The approved public résumé PDF is missing.");
assert.ok(statSync(resumePath).size > 0, "The approved public résumé PDF is empty.");
assert.equal(readFileSync(resumePath).subarray(0, 5).toString(), "%PDF-", "The approved résumé does not have a PDF signature.");

console.log(`Verified ${expectedPages.length} static pages and the public résumé asset.`);
