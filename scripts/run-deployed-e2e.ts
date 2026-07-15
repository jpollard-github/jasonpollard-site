import { spawn } from "node:child_process";

const baseURL = process.env.PLAYWRIGHT_BASE_URL;
if (!baseURL) throw new Error("Set PLAYWRIGHT_BASE_URL to the Vercel preview or production origin.");
const parsed = new URL(baseURL);
if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error("PLAYWRIGHT_BASE_URL must use HTTP or HTTPS.");

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(command, ["playwright", "test", "tests/e2e/deployed-links.spec.ts"], { stdio: "inherit", env: process.env });
child.on("error", (error) => { throw error; });
child.on("close", (code) => { process.exitCode = code ?? 1; });
