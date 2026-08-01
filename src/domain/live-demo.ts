export const JSON_DEMO_IDS = ["d1", "kv", "r2", "cache"] as const;

export type JsonDemoId = (typeof JSON_DEMO_IDS)[number];

export type DemoFact = {
	readonly label: string;
	readonly value: string;
};

export type DemoQuotaReceipt = {
	readonly used: number;
	readonly limit: number;
	readonly resetAt: string;
};

export type DemoReceipt = {
	readonly products: ReadonlyArray<string>;
	readonly proof: string;
	readonly colo: string;
	readonly requestId: string;
	readonly generatedAt: string;
	readonly quota: DemoQuotaReceipt;
};

export type DemoArtifact = {
	readonly href: string;
	readonly label: string;
};

export type DemoResponse = {
	readonly demo: JsonDemoId;
	readonly receipt: DemoReceipt;
	readonly facts: ReadonlyArray<DemoFact>;
	readonly artifact?: DemoArtifact;
};

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === "object" && value !== null;
}

function isDemoId(value: unknown): value is JsonDemoId {
	return typeof value === "string" && JSON_DEMO_IDS.some((id) => id === value);
}

function parseFact(value: unknown): DemoFact | null {
	if (
		!isRecord(value) ||
		typeof value.label !== "string" ||
		typeof value.value !== "string"
	) {
		return null;
	}

	return { label: value.label, value: value.value };
}

function parseQuota(value: unknown): DemoQuotaReceipt | null {
	if (
		!isRecord(value) ||
		typeof value.used !== "number" ||
		typeof value.limit !== "number" ||
		typeof value.resetAt !== "string"
	) {
		return null;
	}

	return {
		used: value.used,
		limit: value.limit,
		resetAt: value.resetAt,
	};
}

function parseReceipt(value: unknown): DemoReceipt | null {
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
		products: value.products,
		proof: value.proof,
		colo: value.colo,
		requestId: value.requestId,
		generatedAt: value.generatedAt,
		quota,
	};
}

function parseArtifact(value: unknown): DemoArtifact | null {
	if (
		!isRecord(value) ||
		typeof value.href !== "string" ||
		typeof value.label !== "string"
	) {
		return null;
	}

	return { href: value.href, label: value.label };
}

/** Parse an untrusted live-demo response at the browser boundary. */
export function parseDemoResponse(value: unknown): DemoResponse | null {
	if (!isRecord(value) || !isDemoId(value.demo) || !Array.isArray(value.facts)) {
		return null;
	}

	const receipt = parseReceipt(value.receipt);
	const facts = value.facts.map(parseFact);
	if (receipt === null || facts.some((fact) => fact === null)) {
		return null;
	}

	const artifact = value.artifact === undefined
		? undefined
		: parseArtifact(value.artifact);
	if (value.artifact !== undefined && artifact === null) {
		return null;
	}

	return {
		demo: value.demo,
		receipt,
		facts: facts.filter((fact): fact is DemoFact => fact !== null),
		...(artifact === undefined || artifact === null ? {} : { artifact }),
	};
}
