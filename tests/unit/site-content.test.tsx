import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, caseStudies, evidence, projects, siteConfig } from "../../content/site-content";

const approvedResumeSha256 = "dc04d6c92abedf39814bbb59c5b5aa066ad0c6318f00daeb6a0c232c277286a5";
const repositoryRoot = fileURLToPath(new URL("../..", import.meta.url));
const removedProjectTerms = [["brand", "kit"].join(""), ["brand", "-kit"].join("")];

function publicFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? publicFiles(entryPath) : [entryPath];
  });
}

test("site configuration generates canonical URLs and exposes the approved résumé", () => { assert.equal(siteConfig.url, "https://jasonpollard.com"); assert.equal(absoluteUrl("/work"), "https://jasonpollard.com/work"); assert.equal(siteConfig.resumeUrl, "/Jason-Pollard-Resume.pdf"); });
test("public content keeps required evidence exact", () => { assert.equal(caseStudies.length, 4); assert.equal(evidence.length, 4); assert.ok(evidence.some((item) => item.value === "22 → 14")); assert.ok(evidence.some((item) => item.value === "15")); assert.deepEqual(evidence.find((item) => item.value === "30 → 1"), { value: "30 → 1", label: "unstable VB6 applications replaced by one .NET Windows Service, eliminating recurring server crashes" }); assert.equal(evidence.some((item) => item.label.includes("direct reports")), false); });
test("projects expose the approved content, links, and image metadata", () => {
  assert.equal(projects.length, 3);
  assert.deepEqual(projects.map(({ name, href, linkLabel, primaryImage }) => ({ name, href, linkLabel, image: primaryImage?.src })), [
    { name: "ArcadeGhosts", href: "https://arcadeghosts.org", linkLabel: "Visit arcadeghosts.org", image: "/projects/arcadeghosts/home.png" },
    { name: "Spotify History Analyzer", href: "https://github.com/jpollard-github/spotify-history-analyzer", linkLabel: "View Spotify History Analyzer on GitHub", image: undefined },
    { name: "Mood Switcher", href: "https://github.com/jpollard-github/mood-switcher", linkLabel: "View Mood Switcher on GitHub", image: undefined },
  ]);
  assert.deepEqual(projects[0].primaryImage, {
    src: "/projects/arcadeghosts/home.png",
    width: 1440,
    height: 900,
    alt: "ArcadeGhosts homepage with a neon roadside scene and personal site introduction",
  });
  assert.equal(projects[1].primaryImage, undefined);
  assert.equal(projects[2].primaryImage, undefined);
});
test("public content excludes private paths and blocked topics", () => { const content = JSON.stringify({ caseStudies, evidence, projects, siteConfig }).toLowerCase(); for (const term of ["personal/", "rabbit hole", "salary", "therapy"]) assert.equal(content.includes(term), false, `found blocked term: ${term}`); });
test("removed project cannot return to public source or asset paths", () => {
  const textExtensions = new Set([".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs", ".svg", ".ts", ".tsx", ".txt"]);
  const files = ["app", "components", "content", "public"].flatMap((directory) => publicFiles(path.join(repositoryRoot, directory))).concat(path.join(repositoryRoot, "README.md"));
  for (const file of files) {
    const relativePath = path.relative(repositoryRoot, file).toLowerCase();
    for (const term of removedProjectTerms) assert.equal(relativePath.includes(term), false, `found removed project in path: ${relativePath}`);
    if (!textExtensions.has(path.extname(file).toLowerCase())) continue;
    const content = readFileSync(file, "utf8").toLowerCase();
    for (const term of removedProjectTerms) assert.equal(content.includes(term), false, `found removed project in ${relativePath}`);
  }
});
test("the approved résumé checksum remains unchanged", () => {
  const resume = readFileSync(new URL("../../public/Jason-Pollard-Resume.pdf", import.meta.url));
  assert.equal(createHash("sha256").update(resume).digest("hex"), approvedResumeSha256);
});
test("critical microtype does not fall below 13px", () => { const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8"); const fontDeclarations = css.match(/font(?:-size)?:[^;}]+/g)?.join("\n") ?? ""; for (const size of [".7rem", ".72rem", ".75rem", ".76rem", ".78rem", ".8rem", "11px", "12px"]) assert.doesNotMatch(fontDeclarations, new RegExp(`(^|[^\\d.])${size.replace(".", "\\.")}`), `found undersized type token: ${size}`); });
