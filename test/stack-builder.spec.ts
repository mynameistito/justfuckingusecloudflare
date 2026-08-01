import { describe, expect, it } from "vitest";
import {
	encodeStackHash,
	parseStackHash,
	recommendStack,
} from "../src/domain/stack-builder";

describe("Stack Builder recommendations", () => {
	it("deduplicates products and keeps editorial ordering", () => {
		const result = recommendStack({
			buildType: "media",
			needs: ["objects", "image-delivery", "video-delivery"],
			depth: "production",
		});

		expect(result.map((product) => product.id)).toEqual([
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
			needs: [],
			depth: "essentials",
		});
		const explore = recommendStack({
			buildType: "ai",
			needs: [],
			depth: "explore",
		});

		expect(essentials.map((product) => product.id)).toEqual([
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
			needs: ["objects", "relational", "objects"],
			depth: "production",
		});

		expect(encoded).toBe("#stack=v1:fullstack:production:relational,objects");
		expect(parseStackHash(encoded)).toEqual({
			_tag: "ok",
			value: {
				buildType: "fullstack",
				needs: ["relational", "objects"],
				depth: "production",
			},
		});
	});

	it("rejects unknown jobs and oversized input", () => {
		expect(parseStackHash("#stack=v1:api:essentials:unknown")._tag).toBe(
			"err",
		);
		expect(parseStackHash(`#stack=${"x".repeat(400)}`)._tag).toBe("err");
		expect(parseStackHash("#stack=v1:api:essentials::suffix")._tag).toBe(
			"err",
		);
	});
});
