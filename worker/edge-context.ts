/**
 * Coarse, non-identifying request information shown in the live proof panel.
 */
export interface EdgeContext {
  readonly colo: string;
  readonly country: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly timezone: string | null;
  readonly httpProtocol: string | null;
  readonly tlsVersion: string | null;
  readonly edgeRttMs: number | null;
  readonly generatedAt: string;
}

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

const readString = (
  record: Readonly<Record<string, unknown>>,
  key: string
): string | null => {
  const value = record[key];
  return typeof value === "string" ? value : null;
};

const readNumber = (
  record: Readonly<Record<string, unknown>>,
  key: string
): number | null => {
  const value = record[key];
  return typeof value === "number" ? value : null;
};

/**
 * Project Cloudflare request metadata into the small, privacy-conscious shape
 * used by the public API.
 *
 * @param cf - Metadata attached by Cloudflare, or undefined in local tests.
 * @param generatedAt - ISO timestamp created at the HTTP boundary.
 * @returns Coarse request context with local-development fallbacks.
 */
export const toEdgeContext = (
  cf: unknown,
  generatedAt: string
): EdgeContext => {
  const metadata: Readonly<Record<string, unknown>> = isRecord(cf) ? cf : {};

  return {
    city: readString(metadata, "city"),
    colo: readString(metadata, "colo") ?? "LOCAL",
    country: readString(metadata, "country"),
    edgeRttMs: readNumber(metadata, "clientTcpRtt"),
    generatedAt,
    httpProtocol: readString(metadata, "httpProtocol"),
    region: readString(metadata, "region"),
    timezone: readString(metadata, "timezone"),
    tlsVersion: readString(metadata, "tlsVersion"),
  };
};
