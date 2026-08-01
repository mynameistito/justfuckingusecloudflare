/** Allow-listed Turnstile actions shared by the browser and Worker. */
export const TURNSTILE_ACTIONS = {
	liveLab: "live_lab",
	d1: "demo_d1",
	kv: "demo_kv",
	r2: "demo_r2",
	cache: "demo_cache",
	images: "demo_images",
	r2Download: "r2_download",
} as const;

/** One action value accepted by the Turnstile verification boundary. */
export type TurnstileAction =
	(typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS];
