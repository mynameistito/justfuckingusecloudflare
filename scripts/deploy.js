#!/usr/bin/env node

/**
 * Deployment script for Cloudflare Workers
 * 
 * For PR/branch builds: Uploads version with preview alias and outputs preview URL
 * For production: Uploads version (doesn't auto-deploy to production)
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Read wrangler config to get worker name
const wranglerConfig = JSON.parse(
  readFileSync("wrangler.jsonc", "utf-8").replace(/\/\/.*$/gm, "").trim()
);
const workerName = wranglerConfig.name;

// Get environment variables
// Cloudflare Pages/Workers Builds provides these
const branch = process.env.CF_PAGES_BRANCH || 
               process.env.WORKERS_CI_BRANCH || 
               process.env.GITHUB_HEAD_REF ||
               "unknown";
const prNumber = process.env.CF_PAGES_PR_NUMBER || 
                 process.env.PULL_REQUEST_NUMBER ||
                 null;
const isProduction = branch === "main" || branch === "master" || branch === "production";

// Create preview alias from branch name or PR number
function createPreviewAlias() {
  if (prNumber) {
    return `pr-${prNumber}`;
  }
  // Sanitize branch name for use as alias
  // Alias must be lowercase, alphanumeric, hyphens, underscores, max 63 chars
  return branch
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 63) || "preview";
}

function getPreviewUrl(versionId) {
  try {
    const output = execSync("npx wrangler versions list --format json", {
      encoding: "utf-8",
      stdio: "pipe",
    });
    const versions = JSON.parse(output);
    const thisVersion = versions.find((v) => v.id === versionId);
    if (thisVersion?.preview_urls?.length > 0) {
      return thisVersion.preview_urls[0];
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}

try {
  if (isProduction) {
    console.log("🚀 Uploading version for production...");
    console.log("📦 Running: npx wrangler versions upload");
    
    const output = execSync("npx wrangler versions upload", {
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log(output);
    
    // Extract version ID from output
    const versionIdMatch = output.match(/Worker Version ID: ([a-f0-9-]+)/);
    if (versionIdMatch) {
      const versionId = versionIdMatch[1];
      console.log(`\n✅ Version uploaded: ${versionId}`);
      console.log("📋 To deploy this version to production, run:");
      console.log(`   npx wrangler versions deploy ${versionId}@100`);
    }
  } else {
    // For PR/branch builds, create preview with alias
    const previewAlias = createPreviewAlias();
    console.log(`🔍 Creating preview deployment`);
    console.log(`📌 Branch: ${branch}`);
    if (prNumber) console.log(`🔢 PR: #${prNumber}`);
    console.log(`🏷️  Preview alias: ${previewAlias}`);
    console.log(`\n📦 Running: npx wrangler versions upload --preview-alias ${previewAlias}`);
    
    const output = execSync(
      `npx wrangler versions upload --preview-alias ${previewAlias}`,
      {
        encoding: "utf-8",
        stdio: "pipe",
      }
    );
    console.log(output);
    
    // Extract version ID from output
    const versionIdMatch = output.match(/Worker Version ID: ([a-f0-9-]+)/);
    
    if (versionIdMatch) {
      const versionId = versionIdMatch[1];
      
      console.log("\n" + "=".repeat(70));
      console.log("✨ Preview Deployment Created!");
      console.log("=".repeat(70));
      console.log(`📦 Version ID: ${versionId}`);
      console.log(`🏷️  Preview Alias: ${previewAlias}`);
      
      // Try to get the actual preview URL
      const previewUrl = getPreviewUrl(versionId);
      if (previewUrl) {
        console.log(`🔗 Preview URL: ${previewUrl}`);
      } else {
        // Fallback: construct likely URL
        console.log(`🔗 Preview URL: https://${previewAlias}-${workerName}.workers.dev`);
        console.log("   (Check Cloudflare dashboard for exact URL)");
      }
      console.log("=".repeat(70));
    } else {
      console.log("\n⚠️  Could not extract version ID from output");
      console.log("📋 Preview URL should be available in Cloudflare dashboard");
      console.log(`   Expected format: https://${previewAlias}-${workerName}.workers.dev`);
    }
  }
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  if (error.stdout) console.error("STDOUT:", error.stdout);
  if (error.stderr) console.error("STDERR:", error.stderr);
  process.exit(1);
}

