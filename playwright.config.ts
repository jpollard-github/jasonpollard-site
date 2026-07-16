import { defineConfig, devices } from "@playwright/test";
const port = 3000;
const deployedBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = deployedBaseURL ?? `http://127.0.0.1:${port}`;
const localServerCommand = process.env.CI ? `npm run start -- --hostname 127.0.0.1 --port ${port}` : `npm run dev -- --hostname 127.0.0.1 --port ${port}`;
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html"], ["github"]] : [["list"], ["html", { open: "never" }]],
  use: { baseURL, trace: "on-first-retry" },
  webServer: deployedBaseURL ? undefined : { command: localServerCommand, url: baseURL, reuseExistingServer: !process.env.CI, timeout: 120000 },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "no-js", use: { ...devices["Desktop Chrome"], javaScriptEnabled: false } },
  ],
});
