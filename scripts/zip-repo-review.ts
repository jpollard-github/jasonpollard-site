import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { selectReviewFiles } from "./repo-review";

const repoRoot = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(repoRoot, "repo-reviews");

function run(command: string, args: string[], input?: string, allowedExitCodes = [0]) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn(command, args, { cwd: repoRoot, stdio: [input ? "pipe" : "ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout!.on("data", (chunk) => { stdout += String(chunk); });
    child.stderr!.on("data", (chunk) => { stderr += String(chunk); });
    child.on("error", (error: NodeJS.ErrnoException) => reject(new Error(`${command} is unavailable: ${error.message}`)));
    child.on("close", (code) => code !== null && allowedExitCodes.includes(code) ? resolve(stdout) : reject(new Error(`${command} exited with code ${code ?? "unknown"}: ${stderr.trim()}`)));
    if (input) child.stdin!.end(input);
  });
}

function timestamp(date: Date) {
  const part = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${part(date.getMonth() + 1)}-${part(date.getDate())}-${part(date.getHours())}${part(date.getMinutes())}${part(date.getSeconds())}`;
}

async function main() {
  await run("git", ["--version"]);
  await run("zip", ["-v"]);
  const stdout = await run("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"]);
  const candidates = stdout.split("\0").filter(Boolean);
  const ignoredStdout = await run("git", ["check-ignore", "--no-index", "-z", "--stdin"], `${candidates.join("\0")}\0`, [0, 1]);
  const ignored = new Set(ignoredStdout.split("\0").filter(Boolean));
  const files = selectReviewFiles(candidates.filter((file) => !ignored.has(file)));
  if (files.length === 0) throw new Error("No repository files were selected for review.");

  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `jasonpollard-site-${timestamp(new Date())}.zip`);
  await run("zip", ["-q", outputPath, "-@"], `${files.join("\n")}\n`);
  const archive = await stat(outputPath);

  console.log(`Created ${path.relative(repoRoot, outputPath)}`);
  console.log(`Files included: ${files.length}`);
  console.log(`Archive size: ${archive.size} bytes`);
}

main().catch((error: unknown) => {
  console.error(`Repository review export failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
