/** Allow-listed Turnstile actions shared by the browser and Worker. */
export const TURNSTILE_ACTIONS = {
  cache: "demo_cache",
  d1: "demo_d1",
  images: "demo_images",
  kv: "demo_kv",
  liveLab: "live_lab",
  r2: "demo_r2",
  r2Download: "r2_download",
} as const;

/** One action value accepted by the Turnstile verification boundary. */
export type TurnstileAction =
  (typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS];
