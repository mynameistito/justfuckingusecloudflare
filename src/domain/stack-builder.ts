import { PRODUCTS, type Product, type ProductId } from "@/content/products";

/**
 * Small result type used for expected parsing failures.
 */
export type Result<T, E> =
	| { readonly _tag: "ok"; readonly value: T }
	| { readonly _tag: "err"; readonly error: E };

/**
 * High-level application shape selected by the visitor.
 */
export type BuildType =
	| "website"
	| "fullstack"
	| "api"
	| "media"
	| "realtime"
	| "ai";

/**
 * Extra job that the visitor's application needs to perform.
 */
export type NeedId =
	| "relational"
	| "fast-reads"
	| "objects"
	| "realtime-state"
	| "background"
	| "long-running"
	| "image-delivery"
	| "video-delivery"
	| "semantic-search"
	| "bot-protection"
	| "private-access";

/**
 * Controls how far beyond the essential product set recommendations should go.
 */
export type RecommendationDepth = "essentials" | "production" | "explore";

/**
 * Parsed Stack Builder state.
 */
export type StackInput = {
	readonly buildType: BuildType;
	readonly needs: ReadonlyArray<NeedId>;
	readonly depth: RecommendationDepth;
};

/**
 * One selectable item shown in the Stack Builder.
 */
export type BuilderOption<T extends string> = {
	readonly id: T;
	readonly label: string;
	readonly description: string;
};

/**
 * Known failure returned when a shared Stack Builder fragment is malformed.
 */
export type ParseStackHashError = {
	readonly _tag: "ParseStackHashError";
	readonly message: string;
};

const BASE_RECOMMENDATIONS: Readonly<Record<BuildType, ReadonlyArray<ProductId>>> = {
	website: ["workers", "static-assets"],
	fullstack: ["workers", "static-assets", "d1"],
	api: ["workers"],
	media: ["workers", "static-assets", "r2", "images"],
	realtime: ["workers", "durable-objects"],
	ai: ["workers", "workers-ai", "ai-gateway"],
};

const NEED_RECOMMENDATIONS: Readonly<Record<NeedId, ReadonlyArray<ProductId>>> = {
	relational: ["d1"],
	"fast-reads": ["kv"],
	objects: ["r2"],
	"realtime-state": ["durable-objects"],
	background: ["queues"],
	"long-running": ["workflows"],
	"image-delivery": ["images"],
	"video-delivery": ["stream"],
	"semantic-search": ["ai-search"],
	"bot-protection": ["turnstile"],
	"private-access": ["access"],
};

const EXPLORE_RECOMMENDATIONS: Readonly<
	Record<BuildType, ReadonlyArray<ProductId>>
> = {
	website: ["cache", "images"],
	fullstack: ["kv", "r2", "queues"],
	api: ["kv", "queues"],
	media: ["stream", "cache"],
	realtime: ["queues", "workflows"],
	ai: ["vectorize", "ai-search", "agents"],
};

/**
 * Primary application options shown in the first builder step.
 */
export const BUILD_OPTIONS: ReadonlyArray<BuilderOption<BuildType>> = [
	{
		id: "website",
		label: "Website or frontend",
		description: "A fast interface, content site, or client application.",
	},
	{
		id: "fullstack",
		label: "Full-stack application",
		description: "Frontend, application logic, and relational data.",
	},
	{
		id: "api",
		label: "API or backend",
		description: "Request handling without a traditional server fleet.",
	},
	{
		id: "media",
		label: "Media platform",
		description: "Files, images, or video delivered around the world.",
	},
	{
		id: "realtime",
		label: "Realtime application",
		description: "Shared state, collaboration, rooms, or live coordination.",
	},
	{
		id: "ai",
		label: "AI product",
		description: "Models, retrieval, observability, and durable agents.",
	},
];

/**
 * Optional jobs shown in the second builder step.
 */
export const NEED_OPTIONS: ReadonlyArray<BuilderOption<NeedId>> = [
	{
		id: "relational",
		label: "Store relational data",
		description: "Tables, transactions, and SQL queries.",
	},
	{
		id: "fast-reads",
		label: "Serve fast key-value reads",
		description: "Configuration, flags, metadata, and read-heavy values.",
	},
	{
		id: "objects",
		label: "Store files and objects",
		description: "Uploads, archives, datasets, and generated assets.",
	},
	{
		id: "realtime-state",
		label: "Coordinate realtime state",
		description: "Strong consistency for shared, live application state.",
	},
	{
		id: "background",
		label: "Process background jobs",
		description: "Buffer and retry work away from the request path.",
	},
	{
		id: "long-running",
		label: "Run long workflows",
		description: "Durable steps that continue through failures and delays.",
	},
	{
		id: "image-delivery",
		label: "Deliver images",
		description: "Store, resize, optimize, and deliver images.",
	},
	{
		id: "video-delivery",
		label: "Deliver video",
		description: "Upload, encode, and stream live or on-demand video.",
	},
	{
		id: "semantic-search",
		label: "Search by meaning",
		description: "Embeddings, retrieval, and natural-language search.",
	},
	{
		id: "bot-protection",
		label: "Block automated abuse",
		description: "Protect public actions without frustrating real people.",
	},
	{
		id: "private-access",
		label: "Protect private access",
		description: "Control who can reach internal applications and services.",
	},
];

/**
 * Recommendation-detail choices shown in the final builder step.
 */
export const DEPTH_OPTIONS: ReadonlyArray<
	BuilderOption<RecommendationDepth>
> = [
	{
		id: "essentials",
		label: "Just the essentials",
		description: "The smallest stack that handles the selected jobs.",
	},
	{
		id: "production",
		label: "Add baseline protection",
		description: "Include WAF and DDoS protection for a public application.",
	},
	{
		id: "explore",
		label: "Show related products",
		description: "Include useful adjacent primitives worth considering.",
	},
];

function isBuildType(value: string): value is BuildType {
	return BUILD_OPTIONS.some((option) => option.id === value);
}

function isNeedId(value: string): value is NeedId {
	return NEED_OPTIONS.some((option) => option.id === value);
}

function isRecommendationDepth(value: string): value is RecommendationDepth {
	return DEPTH_OPTIONS.some((option) => option.id === value);
}

/**
 * Build a stable, deduplicated product recommendation.
 *
 * @param input - Parsed Stack Builder choices.
 * @returns Products ordered by the editorial platform taxonomy.
 */
export function recommendStack(input: StackInput): ReadonlyArray<Product> {
	const selected = new Set<ProductId>(BASE_RECOMMENDATIONS[input.buildType]);

	for (const need of input.needs) {
		for (const productId of NEED_RECOMMENDATIONS[need]) {
			selected.add(productId);
		}
	}

	if (input.depth === "production" || input.depth === "explore") {
		selected.add("waf");
		selected.add("ddos");
	}

	if (input.depth === "explore") {
		for (const productId of EXPLORE_RECOMMENDATIONS[input.buildType]) {
			selected.add(productId);
		}

		if (input.needs.includes("semantic-search")) {
			selected.add("vectorize");
		}
	}

	return PRODUCTS.filter((product) => selected.has(product.id));
}

/**
 * Encode Stack Builder choices into a compact, versioned URL fragment.
 *
 * @param input - Parsed Stack Builder choices.
 * @returns Canonical share fragment beginning with `#stack=`.
 */
export function encodeStackHash(input: StackInput): string {
	const uniqueNeeds = new Set(input.needs);
	const orderedNeeds = NEED_OPTIONS.flatMap((option) =>
		uniqueNeeds.has(option.id) ? [option.id] : [],
	);

	return `#stack=v1:${input.buildType}:${input.depth}:${orderedNeeds.join(",")}`;
}

/**
 * Parse a versioned Stack Builder URL fragment.
 *
 * @param hash - Untrusted fragment from `window.location.hash`.
 * @returns Parsed Stack Builder state or a typed parse error.
 */
export function parseStackHash(
	hash: string,
): Result<StackInput, ParseStackHashError> {
	if (!hash.startsWith("#stack=")) {
		return {
			_tag: "err",
			error: {
				_tag: "ParseStackHashError",
				message: "This link does not contain a shared stack.",
			},
		};
	}

	if (hash.length > 320) {
		return {
			_tag: "err",
			error: {
				_tag: "ParseStackHashError",
				message: "This shared stack is too large.",
			},
		};
	}

	const segments = hash.slice("#stack=".length).split(":");
	if (segments.length !== 4) {
		return {
			_tag: "err",
			error: {
				_tag: "ParseStackHashError",
				message: "This shared stack uses an unsupported format.",
			},
		};
	}

	const [version, buildTypeValue, depthValue, needsValue = ""] = segments;

	if (
		version !== "v1" ||
		buildTypeValue === undefined ||
		!isBuildType(buildTypeValue) ||
		depthValue === undefined ||
		!isRecommendationDepth(depthValue)
	) {
		return {
			_tag: "err",
			error: {
				_tag: "ParseStackHashError",
				message: "This shared stack uses an unsupported format.",
			},
		};
	}

	const needValues =
		needsValue === "" ? [] : needsValue.split(",").filter(Boolean);
	if (needValues.length > NEED_OPTIONS.length || !needValues.every(isNeedId)) {
		return {
			_tag: "err",
			error: {
				_tag: "ParseStackHashError",
				message: "This shared stack contains an unknown job.",
			},
		};
	}

	const uniqueNeeds = new Set<NeedId>(needValues);
	return {
		_tag: "ok",
		value: {
			buildType: buildTypeValue,
			depth: depthValue,
			needs: NEED_OPTIONS.flatMap((option) =>
				uniqueNeeds.has(option.id) ? [option.id] : [],
			),
		},
	};
}
