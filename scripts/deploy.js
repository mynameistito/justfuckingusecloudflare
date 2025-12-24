#!/usr/bin/env node

/**
 * Simplified deployment script for Cloudflare Workers
 *
 * Uses native wrangler commands from the build output directory.
 * For production: deploys directly using wrangler deploy
 * For previews: uploads version with preview alias
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const WORKER_OUTPUT_DIR = "dist/justfuckingusecloudflare";

// Get environment variables from Cloudflare Pages/Workers CI
const branch =
  process.env.CF_PAGES_BRANCH || process.env.WORKERS_CI_BRANCH || "unknown";
const prNumber =
  process.env.CF_PAGES_PR_NUMBER || process.env.PULL_REQUEST_NUMBER || null;
const isProduction =
  branch === "main" || branch === "master" || branch === "production";

// Create preview alias (sanitized for Cloudflare)
function createPreviewAlias() {
  if (prNumber) {
    return `pr-${prNumber}`;
  }
  return (
    branch
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 63) || "preview"
  );
}

const workerDir = join(process.cwd(), WORKER_OUTPUT_DIR);

// Verify build output exists
if (!existsSync(workerDir)) {
  console.error(`❌ Build output directory not found: ${workerDir}`);
  console.error("   Make sure you run 'npm run build' before deploying.");
  process.exit(1);
}

try {
  if (isProduction) {
    console.log("🚀 Deploying to production...");
    console.log(`📌 Branch: ${branch}\n`);
    execSync("npx wrangler deploy", { stdio: "inherit", cwd: workerDir });
  } else {
    const previewAlias = createPreviewAlias();
    console.log("🔍 Creating preview deployment");
    console.log(`📌 Branch: ${branch}`);
    if (prNumber) {
      console.log(`🔢 PR: #${prNumber}`);
    }
    console.log(`🏷️  Preview alias: ${previewAlias}\n`);
    execSync(`npx wrangler versions upload --preview-alias ${previewAlias}`, {
      stdio: "inherit",
      cwd: workerDir,
    });
  }
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
