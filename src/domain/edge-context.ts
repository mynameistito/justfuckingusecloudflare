/** Coarse, non-identifying request information shown in the live proof panel. */
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
