import { PRODUCTS } from "@/content/products";
import type { Product, ProductId } from "@/content/products";

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
export interface StackInput {
  readonly buildType: BuildType;
  readonly needs: readonly NeedId[];
  readonly depth: RecommendationDepth;
}

/**
 * One selectable item shown in the Stack Builder.
 */
export interface BuilderOption<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly description: string;
}

/**
 * Known failure returned when a shared Stack Builder fragment is malformed.
 */
export interface ParseStackHashError {
  readonly _tag: "ParseStackHashError";
  readonly message: string;
}

const BASE_RECOMMENDATIONS: Readonly<Record<BuildType, readonly ProductId[]>> =
  {
    ai: ["workers", "workers-ai", "ai-gateway"],
    api: ["workers"],
    fullstack: ["workers", "static-assets", "d1"],
    media: ["workers", "static-assets", "r2", "images"],
    realtime: ["workers", "durable-objects"],
    website: ["workers", "static-assets"],
  };

const NEED_RECOMMENDATIONS: Readonly<Record<NeedId, readonly ProductId[]>> = {
  background: ["queues"],
  "bot-protection": ["turnstile"],
  "fast-reads": ["kv"],
  "image-delivery": ["images"],
  "long-running": ["workflows"],
  objects: ["r2"],
  "private-access": ["access"],
  "realtime-state": ["durable-objects"],
  relational: ["d1"],
  "semantic-search": ["ai-search"],
  "video-delivery": ["stream"],
};

const EXPLORE_RECOMMENDATIONS: Readonly<
  Record<BuildType, readonly ProductId[]>
> = {
  ai: ["vectorize", "ai-search", "agents"],
  api: ["kv", "queues"],
  fullstack: ["kv", "r2", "queues"],
  media: ["stream", "cache"],
  realtime: ["queues", "workflows"],
  website: ["cache", "images"],
};

/**
 * Primary application options shown in the first builder step.
 */
export const BUILD_OPTIONS: readonly BuilderOption<BuildType>[] = [
  {
    description: "A fast interface, content site, or client application.",
    id: "website",
    label: "Website or frontend",
  },
  {
    description: "Frontend, application logic, and relational data.",
    id: "fullstack",
    label: "Full-stack application",
  },
  {
    description: "Request handling without a traditional server fleet.",
    id: "api",
    label: "API or backend",
  },
  {
    description: "Files, images, or video delivered around the world.",
    id: "media",
    label: "Media platform",
  },
  {
    description: "Shared state, collaboration, rooms, or live coordination.",
    id: "realtime",
    label: "Realtime application",
  },
  {
    description: "Models, retrieval, observability, and durable agents.",
    id: "ai",
    label: "AI product",
  },
];

/**
 * Optional jobs shown in the second builder step.
 */
export const NEED_OPTIONS: readonly BuilderOption<NeedId>[] = [
  {
    description: "Tables, transactions, and SQL queries.",
    id: "relational",
    label: "Store relational data",
  },
  {
    description: "Configuration, flags, metadata, and read-heavy values.",
    id: "fast-reads",
    label: "Serve fast key-value reads",
  },
  {
    description: "Uploads, archives, datasets, and generated assets.",
    id: "objects",
    label: "Store files and objects",
  },
  {
    description: "Strong consistency for shared, live application state.",
    id: "realtime-state",
    label: "Coordinate realtime state",
  },
  {
    description: "Buffer and retry work away from the request path.",
    id: "background",
    label: "Process background jobs",
  },
  {
    description: "Durable steps that continue through failures and delays.",
    id: "long-running",
    label: "Run long workflows",
  },
  {
    description: "Store, resize, optimize, and deliver images.",
    id: "image-delivery",
    label: "Deliver images",
  },
  {
    description: "Upload, encode, and stream live or on-demand video.",
    id: "video-delivery",
    label: "Deliver video",
  },
  {
    description: "Embeddings, retrieval, and natural-language search.",
    id: "semantic-search",
    label: "Search by meaning",
  },
  {
    description: "Protect public actions without frustrating real people.",
    id: "bot-protection",
    label: "Block automated abuse",
  },
  {
    description: "Control who can reach internal applications and services.",
    id: "private-access",
    label: "Protect private access",
  },
];

/**
 * Recommendation-detail choices shown in the final builder step.
 */
export const DEPTH_OPTIONS: readonly BuilderOption<RecommendationDepth>[] = [
  {
    description: "The smallest stack that handles the selected jobs.",
    id: "essentials",
    label: "Just the essentials",
  },
  {
    description: "Include WAF and DDoS protection for a public application.",
    id: "production",
    label: "Add baseline protection",
  },
  {
    description: "Include useful adjacent primitives worth considering.",
    id: "explore",
    label: "Show related products",
  },
];

const isBuildType = (value: string): value is BuildType =>
  BUILD_OPTIONS.some((option) => option.id === value);

const isNeedId = (value: string): value is NeedId =>
  NEED_OPTIONS.some((option) => option.id === value);

const isRecommendationDepth = (value: string): value is RecommendationDepth =>
  DEPTH_OPTIONS.some((option) => option.id === value);

/**
 * Build a stable, deduplicated product recommendation.
 *
 * @param input - Parsed Stack Builder choices.
 * @returns Products ordered by the editorial platform taxonomy.
 */
export const recommendStack = (input: StackInput): readonly Product[] => {
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
};

/**
 * Encode Stack Builder choices into a compact, versioned URL fragment.
 *
 * @param input - Parsed Stack Builder choices.
 * @returns Canonical share fragment beginning with `#stack=`.
 */
export const encodeStackHash = (input: StackInput): string => {
  const uniqueNeeds = new Set(input.needs);
  const orderedNeeds = NEED_OPTIONS.flatMap((option) =>
    uniqueNeeds.has(option.id) ? [option.id] : []
  );

  return `#stack=v1:${input.buildType}:${input.depth}:${orderedNeeds.join(",")}`;
};

/**
 * Parse a versioned Stack Builder URL fragment.
 *
 * @param hash - Untrusted fragment from `window.location.hash`.
 * @returns Parsed Stack Builder state or a typed parse error.
 */
export const parseStackHash = (
  hash: string
): Result<StackInput, ParseStackHashError> => {
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
        uniqueNeeds.has(option.id) ? [option.id] : []
      ),
    },
  };
};
