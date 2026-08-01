import type { TurnstileAction } from "../src/domain/turnstile";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const LOCAL_TEST_SITEKEY = "1x00000000000000000000AA";
const MAX_TOKEN_LENGTH = 2048;
const MAX_REQUEST_LENGTH = 4096;

interface RedactedSecret {
  readonly value: string;
}

interface SiteverifyResponse {
  readonly success: boolean;
  readonly action: string | null;
  readonly hostname: string | null;
}

/** The result of checking a Turnstile token at the Siteverify boundary. */
export type TurnstileVerification =
  | {
      readonly _tag: "verified";
      readonly action: TurnstileAction;
      readonly hostname: string;
    }
  | {
      readonly _tag: "rejected";
      readonly reason:
        | "invalid_request"
        | "invalid_configuration"
        | "siteverify_unavailable"
        | "challenge_rejected"
        | "action_mismatch"
        | "hostname_mismatch";
    };

/** Server-side verifier contract used by protected demo routes. */
export type TurnstileVerifier = (
  request: Request,
  env: Env,
  expectedAction: TurnstileAction
) => Promise<TurnstileVerification>;

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

const isLocalHostname = (hostname: string): boolean =>
  hostname === "localhost" || hostname === "127.0.0.1";

const parseToken = (value: unknown): string | null => {
  if (
    !isRecord(value) ||
    typeof value.turnstileToken !== "string" ||
    value.turnstileToken.length === 0 ||
    value.turnstileToken.length > MAX_TOKEN_LENGTH
  ) {
    return null;
  }

  return value.turnstileToken;
};

const parseSiteverifyResponse = (value: unknown): SiteverifyResponse | null => {
  if (!isRecord(value) || typeof value.success !== "boolean") {
    return null;
  }

  return {
    action: typeof value.action === "string" ? value.action : null,
    hostname: typeof value.hostname === "string" ? value.hostname : null,
    success: value.success,
  };
};

const readToken = async (request: Request): Promise<string | null> => {
  const contentType = request.headers.get("Content-Type") ?? "";
  const contentLengthHeader = request.headers.get("Content-Length");
  const contentLength = Number(contentLengthHeader);
  if (
    !contentType.toLowerCase().startsWith("application/json") ||
    contentLengthHeader === null ||
    !Number.isFinite(contentLength) ||
    contentLength > MAX_REQUEST_LENGTH
  ) {
    return null;
  }

  try {
    const value: unknown = await request.json();
    return parseToken(value);
  } catch {
    return null;
  }
};

const parseExpectedHostnames = (
  request: Request,
  env: Env
): ReadonlySet<string> => {
  const requestHostname = new URL(request.url).hostname;
  if (isLocalHostname(requestHostname)) {
    return new Set(["localhost", "127.0.0.1", "dummy-test-hostname"]);
  }

  return new Set(
    env.TURNSTILE_HOSTNAMES.split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter((hostname) => hostname.length > 0 && !isLocalHostname(hostname))
  );
};

/** Return the public widget key for the request's deployment. */
export const turnstileSitekeyForRequest = (
  request: Request,
  env: Env
): string =>
  isLocalHostname(new URL(request.url).hostname)
    ? LOCAL_TEST_SITEKEY
    : env.TURNSTILE_SITEKEY;

/** Validate a browser token with Cloudflare Siteverify and enforce action and hostname. */
export const verifyTurnstileRequest = async (
  request: Request,
  env: Env,
  expectedAction: TurnstileAction
): Promise<TurnstileVerification> => {
  const token = await readToken(request);
  if (token === null) {
    return { _tag: "rejected", reason: "invalid_request" };
  }

  const expectedHostnames = parseExpectedHostnames(request, env);
  if (expectedHostnames.size === 0 || env.TURNSTILE_SECRET.length === 0) {
    return { _tag: "rejected", reason: "invalid_configuration" };
  }

  const secret: RedactedSecret = { value: env.TURNSTILE_SECRET };
  const form = new URLSearchParams({
    idempotency_key: crypto.randomUUID(),
    response: token,
    secret: secret.value,
  });
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp !== null && remoteIp.length > 0) {
    form.set("remoteip", remoteIp);
  }

  let siteverify: Response;
  try {
    siteverify = await fetch(SITEVERIFY_URL, {
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { _tag: "rejected", reason: "siteverify_unavailable" };
  }

  if (!siteverify.ok) {
    return { _tag: "rejected", reason: "siteverify_unavailable" };
  }

  let parsed: SiteverifyResponse | null;
  try {
    parsed = parseSiteverifyResponse(await siteverify.json());
  } catch {
    return { _tag: "rejected", reason: "siteverify_unavailable" };
  }

  if (parsed === null || !parsed.success) {
    return { _tag: "rejected", reason: "challenge_rejected" };
  }
  if (parsed.action !== expectedAction) {
    return { _tag: "rejected", reason: "action_mismatch" };
  }
  if (
    parsed.hostname === null ||
    !expectedHostnames.has(parsed.hostname.toLowerCase())
  ) {
    return { _tag: "rejected", reason: "hostname_mismatch" };
  }

  return {
    _tag: "verified",
    action: expectedAction,
    hostname: parsed.hostname,
  };
};
