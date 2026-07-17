import { expect, test } from "@playwright/test";

test.beforeEach(({}, testInfo) => test.skip(testInfo.project.name !== "no-js", "JavaScript-disabled project only"));

test("public pages remain useful without JavaScript", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("build, repair, modernize");
  await expect(page.locator('a[href="mailto:hello@jasonpollard.com"]')).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Download résumé" })).toHaveAttribute("href", "/Jason-Pollard-Resume.pdf");

  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Difficult systems");

  await page.goto("/ai-engineering");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI accelerates");
  await expect(page.getByText("Generated output is a draft, not a decision.")).toBeVisible();

  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Curiosity");
  const projectHeadings = await page.locator(".project h2").allTextContents();
  expect(projectHeadings).toEqual(["ArcadeGhosts", "Spotify History Analyzer", "Mood Switcher"]);
  await expect(page.getByRole("heading", { name: "Spotify History Analyzer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mood Switcher" })).toBeVisible();
  await expect(page.getByRole("link", { name: /View Spotify History Analyzer on GitHub/ })).toHaveAttribute("href", "https://github.com/jpollard-github/spotify-history-analyzer");
  await expect(page.getByRole("link", { name: /View Mood Switcher on GitHub/ })).toHaveAttribute("href", "https://github.com/jpollard-github/mood-switcher");
  await expect(page.getByRole("link", { name: /Visit arcadeghosts\.org/ })).toHaveAttribute("href", "https://arcadeghosts.org");
  await expect(page.locator(".project-image")).toHaveCount(1);
  await expect(page.locator(".project-visual")).toHaveCount(1);
});

test("mobile pages and the 404 remain complete without JavaScript", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const [path, heading] of [["/", "build, repair, modernize"], ["/work", "Difficult systems"], ["/ai-engineering", "AI accelerates"], ["/projects", "Curiosity"]] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
    expect((await page.locator("main").innerText()).trim().length).toBeGreaterThan(80);
  }
  const response = await page.goto("/missing-launch-check");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn’t lead anywhere useful");
});
