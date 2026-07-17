import { expect, test } from "@playwright/test";

test("home presents the core positioning, evidence, résumé, and contact", async ({ page }) => { await page.goto("/"); await expect(page.getByRole("heading", { level: 1 })).toContainText("build, repair, modernize"); await expect(page.getByText("30 → 1", { exact: true })).toBeVisible(); await expect(page.getByText(/direct reports/)).toHaveCount(0); await expect(page.getByRole("link", { name: "Download résumé" })).toHaveAttribute("href", "/Jason-Pollard-Resume.pdf"); await expect(page.getByRole("link", { name: "Download résumé" })).toHaveAttribute("download", ""); await expect(page.getByRole("link", { name: "Email Jason" })).toHaveAttribute("href", "mailto:hello@jasonpollard.com"); await expect(page.getByRole("heading", { name: "Looking for an engineer who stays close to the work?" })).toBeVisible(); await expect(page.getByText("Working on a difficult system?")).toHaveCount(0); });
test("primary navigation reaches all routes", async ({ page }) => { await page.goto("/"); for (const [name, path, heading] of [["Work", "/work", "Difficult systems"], ["AI Engineering", "/ai-engineering", "AI accelerates"], ["Projects", "/projects", "Curiosity"]] as const) { await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name }).click(); await expect(page).toHaveURL(new RegExp(`${path}$`)); await expect(page.getByRole("heading", { level: 1 })).toContainText(heading); } });
test("mobile pages do not overflow horizontally", async ({ page }) => { await page.setViewportSize({ width: 375, height: 812 }); for (const path of ["/", "/work", "/ai-engineering", "/projects"]) { await page.goto(path); const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth })); expect(sizes.scroll).toBeLessThanOrEqual(sizes.client); } });
test("metadata, icon, and structured data are present", async ({ page, request }) => { await page.goto("/"); await expect(page).toHaveTitle(/Jason Pollard/); await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://jasonpollard.com"); await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /icon\.svg/); await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2); const icon = await request.get("/icon.svg"); expect(icon.ok()).toBe(true); expect(icon.headers()["content-type"]).toContain("image/svg+xml"); });
test("public links, the ArcadeGhosts image, and résumé asset are valid", async ({ page, request }) => {
  await page.goto("/");
  for (const href of ["/", "/work", "/ai-engineering", "/projects"]) {
    const response = await request.get(href);
    expect(response.ok(), `${href} should return successfully`).toBe(true);
  }

  const resume = await request.get("/Jason-Pollard-Resume.pdf");
  expect(resume.ok()).toBe(true);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  const bytes = await resume.body();
  expect(bytes.byteLength).toBeGreaterThan(0);
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  await expect(page.locator('a[href="mailto:hello@jasonpollard.com"]')).toHaveCount(2);

  await page.goto("/projects");
  const links = [
    ["View Spotify History Analyzer on GitHub", "https://github.com/jpollard-github/spotify-history-analyzer"],
    ["View Mood Switcher on GitHub", "https://github.com/jpollard-github/mood-switcher"],
    ["Visit arcadeghosts.org", "https://arcadeghosts.org"],
  ] as const;
  for (const [name, href] of links) {
    const link = page.getByRole("link", { name: new RegExp(name) });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }

  const arcadeGhostsImage = await request.get("/projects/arcadeghosts/home.png");
  expect(arcadeGhostsImage.ok()).toBe(true);
  expect(arcadeGhostsImage.headers()["content-type"]).toMatch(/^image\//);
  const removedImagePaths = [
    ["", "projects", "spotify-history-analyzer", ["report", "screenshot"].join("-") + ".jpeg"].join("/"),
    ["", "projects", "mood-switcher", "dashboard.png"].join("/"),
    ["", "projects", "mood-switcher", "sidebar.png"].join("/"),
  ];
  for (const src of removedImagePaths) {
    expect((await request.get(src)).status(), `${src} should not exist`).toBe(404);
  }
  await expect(page.locator(".project-image")).toHaveCount(1);
  await expect(page.locator(".project-visual")).toHaveCount(1);
  await expect(page.locator(".project-body-text .project-visual")).toHaveCount(0);
});
