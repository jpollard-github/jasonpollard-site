import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../app/page";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

test("home renders positioning, evidence, résumé, and contact", () => { const html = renderToStaticMarkup(<Home />); assert.match(html, /I build, repair, modernize/); assert.match(html, /22 → 14/); assert.match(html, /30 → 1/); assert.doesNotMatch(html, /direct reports/); assert.match(html, /href="\/Jason-Pollard-Resume\.pdf" download=""/); assert.match(html, /Download résumé/); assert.match(html, /mailto:hello@jasonpollard.com/); });
test("navigation includes every public route", () => { const html = renderToStaticMarkup(<SiteHeader />); for (const route of ["/", "/work", "/ai-engineering", "/projects"]) assert.match(html, new RegExp(`href="${route}"`)); });
test("footer renders the role-oriented contact invitation", () => { const html = renderToStaticMarkup(<SiteFooter />); assert.match(html, /Looking for an engineer who stays close to the work\?/); assert.doesNotMatch(html, /Working on a difficult system\?/); assert.match(html, /href="mailto:hello@jasonpollard.com"/); });
