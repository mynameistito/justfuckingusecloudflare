import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	buildPagesASSETSBinding,
	cloudflareTest,
	readD1Migrations,
} from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		cloudflareTest(async () => ({
			miniflare: {
				bindings: {
					TURNSTILE_SECRET: "local-test-secret",
					TEST_MIGRATIONS: await readD1Migrations(
						join(projectRoot, "migrations"),
					),
				},
				serviceBindings: {
					ASSETS: await buildPagesASSETSBinding(join(projectRoot, "public")),
				},
			},
			wrangler: { configPath: join(projectRoot, "wrangler.jsonc") },
		})),
	],
	resolve: {
		alias: {
			"@": join(projectRoot, "src"),
		},
	},
	test: {
		include: ["test/**/*.spec.ts"],
		setupFiles: ["./test/apply-migrations.ts"],
	},
});
