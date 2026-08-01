import path from "node:path";

import {
  buildPagesASSETSBinding,
  cloudflareTest,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

const projectRoot = import.meta.dirname;

export default defineConfig({
  plugins: [
    cloudflareTest(async () => ({
      miniflare: {
        bindings: {
          TEST_MIGRATIONS: await readD1Migrations(
            path.join(projectRoot, "migrations")
          ),
          TURNSTILE_SECRET: "local-test-secret",
        },
        serviceBindings: {
          ASSETS: await buildPagesASSETSBinding(
            path.join(projectRoot, "public")
          ),
        },
      },
      wrangler: { configPath: path.join(projectRoot, "wrangler.jsonc") },
    })),
  ],
  resolve: {
    alias: {
      "@": path.join(projectRoot, "src"),
    },
  },
  test: {
    include: ["test/**/*.test.ts"],
    setupFiles: ["./test/apply-migrations.ts"],
  },
});
