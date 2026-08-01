import { describe, expect, it } from "vitest";

import {
  encodeStackHash,
  parseStackHash,
  recommendStack,
} from "../../src/domain/stack-builder";

describe("Stack Builder recommendations", () => {
  it("deduplicates products and keeps editorial ordering", () => {
    const result = recommendStack({
      buildType: "media",
      depth: "production",
      needs: ["objects", "image-delivery", "video-delivery"],
    });

    expect(result.map((product) => product.id)).toStrictEqual([
      "workers",
      "static-assets",
      "r2",
      "images",
      "stream",
      "waf",
      "ddos",
    ]);
  });

  it("adds related primitives only at the explore depth", () => {
    const essentials = recommendStack({
      buildType: "ai",
      depth: "essentials",
      needs: [],
    });
    const explore = recommendStack({
      buildType: "ai",
      depth: "explore",
      needs: [],
    });

    expect(essentials.map((product) => product.id)).toStrictEqual([
      "workers",
      "workers-ai",
      "ai-gateway",
    ]);
    expect(explore.map((product) => product.id)).toContain("agents");
    expect(explore.map((product) => product.id)).toContain("vectorize");
    expect(explore.map((product) => product.id)).toContain("waf");
  });
});

describe("share fragments", () => {
  it("round-trips a canonical, versioned stack", () => {
    const encoded = encodeStackHash({
      buildType: "fullstack",
      depth: "production",
      needs: ["objects", "relational", "objects"],
    });

    expect(encoded).toBe("#stack=v1:fullstack:production:relational,objects");
    expect(parseStackHash(encoded)).toStrictEqual({
      _tag: "ok",
      value: {
        buildType: "fullstack",
        depth: "production",
        needs: ["relational", "objects"],
      },
    });
  });

  it("rejects unknown jobs and oversized input", () => {
    expect(parseStackHash("#stack=v1:api:essentials:unknown")._tag).toBe("err");
    expect(parseStackHash("#stack=v2:api:essentials:")._tag).toBe("err");
    expect(parseStackHash(`#stack=${"x".repeat(400)}`)._tag).toBe("err");
    expect(parseStackHash("#stack=v1:api:essentials::suffix")._tag).toBe("err");
  });
});
