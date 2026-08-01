/**
 * Stable identifier used by the Stack Builder and share-link format.
 */
export type ProductId =
	| "workers"
	| "static-assets"
	| "containers"
	| "d1"
	| "kv"
	| "r2"
	| "durable-objects"
	| "queues"
	| "workflows"
	| "workers-ai"
	| "vectorize"
	| "ai-gateway"
	| "ai-search"
	| "agents"
	| "cache"
	| "images"
	| "stream"
	| "turnstile"
	| "waf"
	| "ddos"
	| "cloudflare-one"
	| "access";

/**
 * Editorial category used to organize products around developer jobs.
 */
export type ProductGroupId =
	| "ship"
	| "store"
	| "coordinate"
	| "ai"
	| "deliver"
	| "protect";

/**
 * One official Cloudflare product entry.
 */
export type Product = {
	readonly id: ProductId;
	readonly name: string;
	readonly shortName: string;
	readonly group: ProductGroupId;
	readonly description: string;
	readonly docsUrl: string;
	readonly maturity?: "Beta";
};

/**
 * Display metadata for one product category.
 */
export type ProductGroup = {
	readonly id: ProductGroupId;
	readonly name: string;
	readonly strapline: string;
};

/**
 * Product category order used throughout the page.
 */
export const PRODUCT_GROUPS: ReadonlyArray<ProductGroup> = [
	{
		id: "ship",
		name: "Ship",
		strapline: "Code, assets, and containers on one global platform.",
	},
	{
		id: "store",
		name: "Store",
		strapline: "Structured data, hot keys, and files without a database fleet.",
	},
	{
		id: "coordinate",
		name: "Coordinate",
		strapline: "Reliable state and work that outlives a request.",
	},
	{
		id: "ai",
		name: "Add intelligence",
		strapline: "Models, retrieval, agents, and control in the same platform.",
	},
	{
		id: "deliver",
		name: "Deliver",
		strapline: "Cache and transform rich content close to every user.",
	},
	{
		id: "protect",
		name: "Protect",
		strapline: "Stop abuse, filter hostile traffic, and secure access by default.",
	},
];

/**
 * Verified Cloudflare product content and official documentation links.
 */
export const PRODUCTS: ReadonlyArray<Product> = [
	{
		id: "workers",
		name: "Workers",
		shortName: "Workers",
		group: "ship",
		description:
			"Build, deploy, and scale full-stack applications and APIs across Cloudflare's global network.",
		docsUrl: "https://developers.cloudflare.com/workers/",
	},
	{
		id: "static-assets",
		name: "Static Assets",
		shortName: "Assets",
		group: "ship",
		description:
			"Deploy HTML, CSS, images, and other files with Worker code as one globally cached application.",
		docsUrl: "https://developers.cloudflare.com/workers/static-assets/",
	},
	{
		id: "containers",
		name: "Containers",
		shortName: "Containers",
		group: "ship",
		description:
			"Run code built for any language or runtime in serverless containers controlled by Workers.",
		docsUrl: "https://developers.cloudflare.com/containers/",
	},
	{
		id: "d1",
		name: "D1",
		shortName: "D1",
		group: "store",
		description:
			"Use managed serverless SQL with SQLite semantics, disaster recovery, and Worker access.",
		docsUrl: "https://developers.cloudflare.com/d1/",
	},
	{
		id: "kv",
		name: "Workers KV",
		shortName: "KV",
		group: "store",
		description:
			"Serve read-heavy key-value data with low-latency, edge-cached reads.",
		docsUrl: "https://developers.cloudflare.com/kv/",
	},
	{
		id: "r2",
		name: "R2",
		shortName: "R2",
		group: "store",
		description:
			"Store large amounts of unstructured data through S3-compatible APIs.",
		docsUrl: "https://developers.cloudflare.com/r2/",
	},
	{
		id: "durable-objects",
		name: "Durable Objects",
		shortName: "Durable Objects",
		group: "coordinate",
		description:
			"Coordinate real-time state with strongly consistent, colocated compute and storage.",
		docsUrl: "https://developers.cloudflare.com/durable-objects/",
	},
	{
		id: "queues",
		name: "Queues",
		shortName: "Queues",
		group: "coordinate",
		description:
			"Offload, buffer, batch, retry, and delay asynchronous work with guaranteed delivery.",
		docsUrl: "https://developers.cloudflare.com/queues/",
	},
	{
		id: "workflows",
		name: "Workflows",
		shortName: "Workflows",
		group: "coordinate",
		description:
			"Run durable multi-step processes with persisted state and automatic retries.",
		docsUrl: "https://developers.cloudflare.com/workflows/",
	},
	{
		id: "workers-ai",
		name: "Workers AI",
		shortName: "Workers AI",
		group: "ai",
		description:
			"Run AI models on serverless GPUs from Workers or the Cloudflare API.",
		docsUrl: "https://developers.cloudflare.com/workers-ai/",
	},
	{
		id: "vectorize",
		name: "Vectorize",
		shortName: "Vectorize",
		group: "ai",
		description:
			"Store embeddings for semantic search and AI-powered applications.",
		docsUrl: "https://developers.cloudflare.com/vectorize/",
	},
	{
		id: "ai-gateway",
		name: "AI Gateway",
		shortName: "AI Gateway",
		group: "ai",
		description:
			"Observe and control AI traffic with analytics, caching, rate limits, retries, and fallback.",
		docsUrl: "https://developers.cloudflare.com/ai-gateway/",
	},
	{
		id: "ai-search",
		name: "AI Search",
		shortName: "AI Search",
		group: "ai",
		description:
			"Add natural-language search without building the retrieval infrastructure yourself.",
		docsUrl: "https://developers.cloudflare.com/ai-search/",
		maturity: "Beta",
	},
	{
		id: "agents",
		name: "Agents",
		shortName: "Agents",
		group: "ai",
		description:
			"Build durable agents with state, real-time connections, scheduling, recovery, and tools.",
		docsUrl: "https://developers.cloudflare.com/agents/",
	},
	{
		id: "cache",
		name: "Cloudflare Cache",
		shortName: "Cache",
		group: "deliver",
		description:
			"Cache frequently accessed content globally to reduce origin load and improve performance.",
		docsUrl: "https://developers.cloudflare.com/cache/",
	},
	{
		id: "images",
		name: "Images",
		shortName: "Images",
		group: "deliver",
		description:
			"Resize, optimize, and transform images at the edge for each user.",
		docsUrl: "https://developers.cloudflare.com/images/",
	},
	{
		id: "stream",
		name: "Stream",
		shortName: "Stream",
		group: "deliver",
		description:
			"Upload, store, encode, and deliver live or on-demand video through one API.",
		docsUrl: "https://developers.cloudflare.com/stream/",
	},
	{
		id: "turnstile",
		name: "Turnstile",
		shortName: "Turnstile",
		group: "protect",
		description:
			"Add a smart CAPTCHA alternative to any website with less visitor friction.",
		docsUrl: "https://developers.cloudflare.com/turnstile/",
	},
	{
		id: "waf",
		name: "Web Application Firewall",
		shortName: "WAF",
		group: "protect",
		description:
			"Inspect web and API requests and filter unwanted traffic with managed or custom rules.",
		docsUrl: "https://developers.cloudflare.com/waf/",
	},
	{
		id: "ddos",
		name: "DDoS Protection",
		shortName: "DDoS",
		group: "protect",
		description:
			"Automatically detect and mitigate attacks across network and application layers.",
		docsUrl: "https://developers.cloudflare.com/ddos-protection/",
	},
	{
		id: "cloudflare-one",
		name: "Cloudflare One",
		shortName: "Cloudflare One",
		group: "protect",
		description:
			"Connect and secure users, applications, and networks through a unified SASE and Zero Trust platform.",
		docsUrl: "https://developers.cloudflare.com/cloudflare-one/",
	},
	{
		id: "access",
		name: "Cloudflare Access",
		shortName: "Access",
		group: "protect",
		description:
			"Apply identity-aware access controls to private applications and infrastructure.",
		docsUrl: "https://developers.cloudflare.com/cloudflare-one/access-controls/",
	},
];

/**
 * Fast product lookup keyed by stable product ID.
 */
export const PRODUCTS_BY_ID: ReadonlyMap<ProductId, Product> = new Map(
	PRODUCTS.map((product) => [product.id, product]),
);
