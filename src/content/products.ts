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
export interface Product {
  readonly id: ProductId;
  readonly name: string;
  readonly shortName: string;
  readonly group: ProductGroupId;
  readonly description: string;
  readonly docsUrl: string;
  readonly maturity?: "Beta";
}

/**
 * Display metadata for one product category.
 */
export interface ProductGroup {
  readonly id: ProductGroupId;
  readonly name: string;
  readonly strapline: string;
}

/**
 * Product category order used throughout the page.
 */
export const PRODUCT_GROUPS: readonly ProductGroup[] = [
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
    strapline:
      "Stop abuse, filter hostile traffic, and secure access by default.",
  },
];

/**
 * Verified Cloudflare product content and official documentation links.
 */
export const PRODUCTS: readonly Product[] = [
  {
    description:
      "Build, deploy, and scale full-stack applications and APIs across Cloudflare's global network.",
    docsUrl: "https://developers.cloudflare.com/workers/",
    group: "ship",
    id: "workers",
    name: "Workers",
    shortName: "Workers",
  },
  {
    description:
      "Deploy HTML, CSS, images, and other files with Worker code as one globally cached application.",
    docsUrl: "https://developers.cloudflare.com/workers/static-assets/",
    group: "ship",
    id: "static-assets",
    name: "Static Assets",
    shortName: "Assets",
  },
  {
    description:
      "Run code built for any language or runtime in serverless containers controlled by Workers.",
    docsUrl: "https://developers.cloudflare.com/containers/",
    group: "ship",
    id: "containers",
    name: "Containers",
    shortName: "Containers",
  },
  {
    description:
      "Use managed serverless SQL with SQLite semantics, disaster recovery, and Worker access.",
    docsUrl: "https://developers.cloudflare.com/d1/",
    group: "store",
    id: "d1",
    name: "D1",
    shortName: "D1",
  },
  {
    description:
      "Serve read-heavy key-value data with low-latency, edge-cached reads.",
    docsUrl: "https://developers.cloudflare.com/kv/",
    group: "store",
    id: "kv",
    name: "Workers KV",
    shortName: "KV",
  },
  {
    description:
      "Store large amounts of unstructured data through S3-compatible APIs.",
    docsUrl: "https://developers.cloudflare.com/r2/",
    group: "store",
    id: "r2",
    name: "R2",
    shortName: "R2",
  },
  {
    description:
      "Coordinate real-time state with strongly consistent, colocated compute and storage.",
    docsUrl: "https://developers.cloudflare.com/durable-objects/",
    group: "coordinate",
    id: "durable-objects",
    name: "Durable Objects",
    shortName: "Durable Objects",
  },
  {
    description:
      "Offload, buffer, batch, retry, and delay asynchronous work with guaranteed delivery.",
    docsUrl: "https://developers.cloudflare.com/queues/",
    group: "coordinate",
    id: "queues",
    name: "Queues",
    shortName: "Queues",
  },
  {
    description:
      "Run durable multi-step processes with persisted state and automatic retries.",
    docsUrl: "https://developers.cloudflare.com/workflows/",
    group: "coordinate",
    id: "workflows",
    name: "Workflows",
    shortName: "Workflows",
  },
  {
    description:
      "Run AI models on serverless GPUs from Workers or the Cloudflare API.",
    docsUrl: "https://developers.cloudflare.com/workers-ai/",
    group: "ai",
    id: "workers-ai",
    name: "Workers AI",
    shortName: "Workers AI",
  },
  {
    description:
      "Store embeddings for semantic search and AI-powered applications.",
    docsUrl: "https://developers.cloudflare.com/vectorize/",
    group: "ai",
    id: "vectorize",
    name: "Vectorize",
    shortName: "Vectorize",
  },
  {
    description:
      "Observe and control AI traffic with analytics, caching, rate limits, retries, and fallback.",
    docsUrl: "https://developers.cloudflare.com/ai-gateway/",
    group: "ai",
    id: "ai-gateway",
    name: "AI Gateway",
    shortName: "AI Gateway",
  },
  {
    description:
      "Add natural-language search without building the retrieval infrastructure yourself.",
    docsUrl: "https://developers.cloudflare.com/ai-search/",
    group: "ai",
    id: "ai-search",
    maturity: "Beta",
    name: "AI Search",
    shortName: "AI Search",
  },
  {
    description:
      "Build durable agents with state, real-time connections, scheduling, recovery, and tools.",
    docsUrl: "https://developers.cloudflare.com/agents/",
    group: "ai",
    id: "agents",
    name: "Agents",
    shortName: "Agents",
  },
  {
    description:
      "Cache frequently accessed content globally to reduce origin load and improve performance.",
    docsUrl: "https://developers.cloudflare.com/cache/",
    group: "deliver",
    id: "cache",
    name: "Cloudflare Cache",
    shortName: "Cache",
  },
  {
    description:
      "Resize, optimize, and transform images at the edge for each user.",
    docsUrl: "https://developers.cloudflare.com/images/",
    group: "deliver",
    id: "images",
    name: "Images",
    shortName: "Images",
  },
  {
    description:
      "Upload, store, encode, and deliver live or on-demand video through one API.",
    docsUrl: "https://developers.cloudflare.com/stream/",
    group: "deliver",
    id: "stream",
    name: "Stream",
    shortName: "Stream",
  },
  {
    description:
      "Add a smart CAPTCHA alternative to any website with less visitor friction.",
    docsUrl: "https://developers.cloudflare.com/turnstile/",
    group: "protect",
    id: "turnstile",
    name: "Turnstile",
    shortName: "Turnstile",
  },
  {
    description:
      "Inspect web and API requests and filter unwanted traffic with managed or custom rules.",
    docsUrl: "https://developers.cloudflare.com/waf/",
    group: "protect",
    id: "waf",
    name: "Web Application Firewall",
    shortName: "WAF",
  },
  {
    description:
      "Automatically detect and mitigate attacks across network and application layers.",
    docsUrl: "https://developers.cloudflare.com/ddos-protection/",
    group: "protect",
    id: "ddos",
    name: "DDoS Protection",
    shortName: "DDoS",
  },
  {
    description:
      "Connect and secure users, applications, and networks through a unified SASE and Zero Trust platform.",
    docsUrl: "https://developers.cloudflare.com/cloudflare-one/",
    group: "protect",
    id: "cloudflare-one",
    name: "Cloudflare One",
    shortName: "Cloudflare One",
  },
  {
    description:
      "Apply identity-aware access controls to private applications and infrastructure.",
    docsUrl:
      "https://developers.cloudflare.com/cloudflare-one/access-controls/",
    group: "protect",
    id: "access",
    name: "Cloudflare Access",
    shortName: "Access",
  },
];
