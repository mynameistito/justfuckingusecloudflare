export const JSON_DEMO_IDS = ["d1", "kv", "r2", "cache"] as const;

export type JsonDemoId = (typeof JSON_DEMO_IDS)[number];

/** Hard daily caps that keep each Live Lab demonstration bounded. */
export const DEMO_LIMITS = {
  cache: 5000,
  d1: 1000,
  images: 100,
  kv: 100,
  r2: 500,
} as const;

/** A Live Lab demo that has a per-day quota. */
export type DemoQuotaId = keyof typeof DEMO_LIMITS;

export interface DemoFact {
  readonly label: string;
  readonly value: string;
}

export interface DemoQuotaReceipt {
  readonly used: number;
  readonly limit: number;
  readonly resetAt: string;
}

export interface DemoReceipt {
  readonly products: readonly string[];
  readonly proof: string;
  readonly colo: string;
  readonly requestId: string;
  readonly generatedAt: string;
  readonly quota: DemoQuotaReceipt;
}

export interface DemoArtifact {
  readonly href: string;
  readonly label: string;
}

export interface DemoResponse {
  readonly demo: JsonDemoId;
  readonly receipt: DemoReceipt;
  readonly facts: readonly DemoFact[];
  readonly artifact?: DemoArtifact;
}

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

const isDemoId = (value: unknown): value is JsonDemoId =>
  typeof value === "string" && JSON_DEMO_IDS.some((id) => id === value);

const parseFact = (value: unknown): DemoFact | null => {
  if (
    !isRecord(value) ||
    typeof value.label !== "string" ||
    typeof value.value !== "string"
  ) {
    return null;
  }

  return { label: value.label, value: value.value };
};

const parseQuota = (value: unknown): DemoQuotaReceipt | null => {
  if (
    !isRecord(value) ||
    typeof value.used !== "number" ||
    typeof value.limit !== "number" ||
    !Number.isSafeInteger(value.used) ||
    !Number.isSafeInteger(value.limit) ||
    value.used < 0 ||
    value.limit < 1 ||
    value.used > value.limit ||
    typeof value.resetAt !== "string"
  ) {
    return null;
  }

  return {
    limit: value.limit,
    resetAt: value.resetAt,
    used: value.used,
  };
};

const parseReceipt = (value: unknown): DemoReceipt | null => {
  if (
    !isRecord(value) ||
    !Array.isArray(value.products) ||
    !value.products.every((product) => typeof product === "string") ||
    typeof value.proof !== "string" ||
    typeof value.colo !== "string" ||
    typeof value.requestId !== "string" ||
    typeof value.generatedAt !== "string"
  ) {
    return null;
  }

  const quota = parseQuota(value.quota);
  if (quota === null) {
    return null;
  }

  return {
    colo: value.colo,
    generatedAt: value.generatedAt,
    products: value.products,
    proof: value.proof,
    quota,
    requestId: value.requestId,
  };
};

const parseArtifact = (value: unknown): DemoArtifact | null => {
  if (
    !isRecord(value) ||
    value.href !== "/api/demos/r2/download" ||
    typeof value.label !== "string"
  ) {
    return null;
  }

  return { href: value.href, label: value.label };
};

/** Parse an untrusted live-demo response at the browser boundary. */
export const parseDemoResponse = (value: unknown): DemoResponse | null => {
  if (
    !isRecord(value) ||
    !isDemoId(value.demo) ||
    !Array.isArray(value.facts)
  ) {
    return null;
  }

  const receipt = parseReceipt(value.receipt);
  const facts = value.facts.map(parseFact);
  if (receipt === null || facts.some((fact) => fact === null)) {
    return null;
  }

  const artifact =
    value.artifact === undefined ? undefined : parseArtifact(value.artifact);
  if (value.artifact !== undefined && artifact === null) {
    return null;
  }

  return {
    demo: value.demo,
    facts: facts.filter((fact): fact is DemoFact => fact !== null),
    receipt,
    ...(artifact === undefined || artifact === null ? {} : { artifact }),
  };
};
