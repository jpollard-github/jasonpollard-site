import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../app/page";
import ProjectsPage from "../../app/projects/page";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

test("home renders positioning, evidence, résumé, and contact", () => { const html = renderToStaticMarkup(<Home />); assert.match(html, /I build, repair, modernize/); assert.match(html, /22 → 14/); assert.match(html, /30 → 1/); assert.doesNotMatch(html, /direct reports/); assert.match(html, /href="\/Jason-Pollard-Resume\.pdf" download=""/); assert.match(html, /Download résumé/); assert.match(html, /mailto:hello@jasonpollard.com/); });
test("navigation includes every public route", () => { const html = renderToStaticMarkup(<SiteHeader />); for (const route of ["/", "/work", "/ai-engineering", "/projects"]) assert.match(html, new RegExp(`href="${route}"`)); });
test("footer renders the role-oriented contact invitation", () => { const html = renderToStaticMarkup(<SiteFooter />); assert.match(html, /Looking for an engineer who stays close to the work\?/); assert.doesNotMatch(html, /Working on a difficult system\?/); assert.match(html, /href="mailto:hello@jasonpollard.com"/); });
test("projects render all approved projects and only the ArcadeGhosts image", () => {
  const html = renderToStaticMarkup(<ProjectsPage />);
  for (const name of ["ArcadeGhosts", "Spotify History Analyzer", "Mood Switcher"]) assert.match(html, new RegExp(name));
  for (const href of ["https://github.com/jpollard-github/spotify-history-analyzer", "https://github.com/jpollard-github/mood-switcher", "https://arcadeghosts.org"]) assert.match(html, new RegExp(`href="${href}"`));
  assert.match(html, /target="_blank" rel="noopener noreferrer"/);
  assert.equal((html.match(/<img /g) ?? []).length, 1);
  assert.equal((html.match(/class="project-visual"/g) ?? []).length, 1);
  assert.match(html, /alt="ArcadeGhosts homepage with a neon roadside scene and personal site introduction"/);
  assert.doesNotMatch(html.toLowerCase(), new RegExp(["brand", "kit"].join("")));
});
