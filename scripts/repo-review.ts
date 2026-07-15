import path from "node:path";

const forbiddenRoots = [
  "personal/",
  "node_modules/",
  ".next/",
  "repo-reviews/",
  "playwright-report/",
  "test-results/",
];

export function selectReviewFiles(repoFiles: string[]) {
  const normalized = repoFiles.map((file) => file.split(path.sep).join("/"));
  const forbidden = normalized.filter((file) => forbiddenRoots.some((root) => file === root.slice(0, -1) || file.startsWith(root)));

  if (forbidden.length > 0) {
    throw new Error(`Refusing to include private or generated paths: ${forbidden.join(", ")}`);
  }

  return [...new Set(normalized)].sort();
}
