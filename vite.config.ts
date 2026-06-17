import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = import.meta.dirname;

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
      configPath: path.resolve(__dirname, "wrangler.jsonc"),
    }),
    tailwindcss(),
    react({
      include: "**/*.{jsx,tsx}",
      jsxRuntime: "automatic",
    }),
  ],
  publicDir: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  root: "src",
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
