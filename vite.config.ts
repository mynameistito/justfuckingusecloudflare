import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = import.meta.dirname;

export default defineConfig({
  build: {
    assetsDir: "assets",
    emptyOutDir: true,
    outDir: "../dist",
    rollupOptions: {
      output: {
        format: "es",
      },
    },
    sourcemap: false,
  },
  plugins: [
    cloudflare({
      configPath: path.resolve(projectRoot, "wrangler.jsonc"),
    }),
    tailwindcss(),
    react({
      include: "**/*.{jsx,tsx}",
      jsxRuntime: "automatic",
    }),
  ],
  publicDir: path.resolve(projectRoot, "public"),
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  root: "src",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
