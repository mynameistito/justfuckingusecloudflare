import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const skippedDirectories = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".wrangler",
  "coverage",
]);
const forbiddenPatterns = [
  /node\s+\.github\/setup\.js/u,
  /\.github\/setup\.js/u,
  /runOn"\s*:\s*"folderOpen"/u,
  /SessionStart/u,
];
const allowedFiles = new Set(["scripts/security-check.ts"]);

const files: string[] = [];
const collectFiles = (directory: string) => {
  for (const entry of readdirSync(directory)) {
    if (skippedDirectories.has(entry)) {
      continue;
    }

    const path = join(directory, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      collectFiles(path);
      continue;
    }

    if (stats.isFile()) {
      files.push(path);
    }
  }
};

collectFiles(root);

const violations: string[] = [];
for (const file of files) {
  const relativePath = relative(root, file).replaceAll("\\", "/");
  if (allowedFiles.has(relativePath)) {
    continue;
  }

  const content = readFileSync(file, "utf8");
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      violations.push(`${relativePath} matches ${pattern}`);
    }
  }
}

if (existsSync(join(root, ".github", "setup.js"))) {
  violations.push(".github/setup.js must not exist");
}

if (violations.length > 0) {
  console.error("Security check failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Security check passed");

