export type CloudflareTestEnvironment = Cloudflare.Env;

declare global {
  namespace Cloudflare {
    interface Env {
      readonly TEST_MIGRATIONS: D1Migration[];
    }
  }
}
