export {};

declare global {
	namespace Cloudflare {
		interface Env {
			readonly TEST_MIGRATIONS: D1Migration[];
		}
	}
}
