import { describe, expect, it } from "vitest";

import { parseDemoResponse } from "../../src/domain/live-demo";

const validResponse = () => ({
  demo: "r2",
  facts: [{ label: "Visibility", value: "PRIVATE BINDING" }],
  receipt: {
    colo: "LOCAL",
    generatedAt: "2026-08-01T00:00:00.000Z",
    products: ["R2"],
    proof: "A real demo ran.",
    quota: { limit: 500, resetAt: "2026-08-02T00:00:00.000Z", used: 1 },
    requestId: "request-id",
  },
});

describe("live demo response parser", () => {
  it("rejects a response missing receipt fields", () => {
    const response = validResponse();
    const { generatedAt: _generatedAt, ...receipt } = response.receipt;

    expect(parseDemoResponse({ ...response, receipt })).toBeNull();
  });

  it("rejects invalid quota values", () => {
    const response = validResponse();
    response.receipt.quota.used = 501;

    expect(parseDemoResponse(response)).toBeNull();
  });

  it("rejects artifacts outside the fixed R2 download route", () => {
    const response = {
      ...validResponse(),
      artifact: { href: "/api/demos/r2/other", label: "Download" },
    };

    expect(parseDemoResponse(response)).toBeNull();
  });
});
