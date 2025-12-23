import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src",
  publicDir: path.resolve(__dirname, "public"),
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: "automatic",
      include: "**/*.{jsx,tsx}",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    outDir: "../dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
});
