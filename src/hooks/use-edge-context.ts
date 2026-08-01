import { useEffect, useRef, useState } from "react";

import type { EdgeContext } from "../domain/edge-context";

export type { EdgeContext } from "../domain/edge-context";

/**
 * Complete state cycle for the live Worker proof panel.
 */
export type EdgeContextState =
  | { readonly _tag: "idle" }
  | { readonly _tag: "loading" }
  | {
      readonly _tag: "ready";
      readonly context: EdgeContext;
      readonly roundTripMs: number;
    }
  | { readonly _tag: "error"; readonly message: string };

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

const isNullableString = (value: unknown): value is string | null =>
  typeof value === "string" || value === null;

const parseEdgeContext = (value: unknown): EdgeContext | null => {
  if (
    !isRecord(value) ||
    typeof value.colo !== "string" ||
    !isNullableString(value.country) ||
    !isNullableString(value.city) ||
    !isNullableString(value.region) ||
    !isNullableString(value.timezone) ||
    !isNullableString(value.httpProtocol) ||
    !isNullableString(value.tlsVersion) ||
    !(typeof value.edgeRttMs === "number" || value.edgeRttMs === null) ||
    typeof value.generatedAt !== "string"
  ) {
    return null;
  }

  return {
    city: value.city,
    colo: value.colo,
    country: value.country,
    edgeRttMs: value.edgeRttMs,
    generatedAt: value.generatedAt,
    httpProtocol: value.httpProtocol,
    region: value.region,
    timezone: value.timezone,
    tlsVersion: value.tlsVersion,
  };
};

/**
 * Fetch live request metadata from the co-deployed Cloudflare Worker.
 *
 * @returns Loading, ready, or error state for the proof panel.
 */
export const useEdgeContext = (): {
  readonly state: EdgeContextState;
  readonly load: () => void;
} => {
  const [state, setState] = useState<EdgeContextState>({ _tag: "idle" });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const load = (): void => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    const timeout = AbortSignal.timeout(8000);
    controllerRef.current = controller;
    setState({ _tag: "loading" });

    const isCurrentRequest = (): boolean =>
      controllerRef.current === controller && !controller.signal.aborted;

    const fetchContext = async (): Promise<void> => {
      const startedAt = performance.now();

      try {
        const response = await fetch("/api/context", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.any([controller.signal, timeout]),
        });
        if (!response.ok && isCurrentRequest()) {
          setState({
            _tag: "error",
            message: "The edge proof endpoint did not answer.",
          });
          return;
        }

        const payload: unknown = await response.json();
        const context = parseEdgeContext(payload);
        if (context === null) {
          if (isCurrentRequest()) {
            setState({
              _tag: "error",
              message: "The edge returned an unexpected response.",
            });
          }
          return;
        }

        if (isCurrentRequest()) {
          setState({
            _tag: "ready",
            context,
            roundTripMs: Math.max(1, Math.round(performance.now() - startedAt)),
          });
        }
      } catch {
        if (!isCurrentRequest()) {
          return;
        }

        setState({
          _tag: "error",
          message: timeout.aborted
            ? "The edge proof timed out. Try again."
            : "Live edge details are unavailable right now.",
        });
      }
    };

    void fetchContext();
  };

  return { load, state };
};
