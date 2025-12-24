import { copyFileSync, existsSync, unlinkSync } from "node:fs";

// Remove _redirects file if it exists (not needed for Workers SPA mode)
const redirectsPath = "dist/_redirects";
if (existsSync(redirectsPath)) {
  unlinkSync(redirectsPath);
  console.log("✓ Removed _redirects file (not needed for Workers SPA mode)");
}

// Copy index.html to 404.html for fallback (though SPA mode handles this)
copyFileSync("dist/index.html", "dist/404.html");
console.log("✓ Copied index.html to 404.html for SPA routing");
