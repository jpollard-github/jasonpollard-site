import { expect, test } from "@playwright/test";

test.skip(!process.env.PLAYWRIGHT_BASE_URL, "Set PLAYWRIGHT_BASE_URL to run deployed smoke tests");

const routes = [
  ["/", "build, repair, modernize"],
  ["/work", "Difficult systems"],
  ["/ai-engineering", "AI accelerates"],
  ["/projects", "Curiosity"],
] as const;

test("deployed public routes, links, and metadata are healthy", async ({ page, request }) => {
  for (const [path, heading] of routes) {
    const response = await page.goto(path);
    expect(response?.ok(), `${path} should return successfully`).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`^https://jasonpollard\\.com${path === "/" ? "" : path}$`));
  }
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Download résumé" })).toHaveAttribute("href", "/Jason-Pollard-Resume.pdf");
  await expect(page.locator('a[href="mailto:hello@jasonpollard.com"]')).toHaveCount(2);
  await page.goto("/projects");
  await expect(page.getByRole("link", { name: /Visit arcadeghosts\.org/ })).toHaveAttribute("href", "https://arcadeghosts.org");

  const resume = await request.get("/Jason-Pollard-Resume.pdf");
  expect(resume.ok()).toBe(true);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  for (const path of ["/robots.txt", "/sitemap.xml"]) expect((await request.get(path)).ok(), `${path} should return successfully`).toBe(true);
});

test("deployed pages do not overflow at desktop or mobile widths", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 800 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport);
    for (const [path] of routes) {
      await page.goto(path);
      const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
    }
  }
});
