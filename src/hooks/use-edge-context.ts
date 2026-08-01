import { useEffect, useState } from "react";

/**
 * Privacy-conscious edge context returned by the Worker.
 */
export type EdgeContext = {
	readonly colo: string;
	readonly country: string | null;
	readonly city: string | null;
	readonly region: string | null;
	readonly timezone: string | null;
	readonly httpProtocol: string | null;
	readonly tlsVersion: string | null;
	readonly edgeRttMs: number | null;
	readonly generatedAt: string;
};

/**
 * Complete state cycle for the live Worker proof panel.
 */
export type EdgeContextState =
	| { readonly _tag: "loading" }
	| {
			readonly _tag: "ready";
			readonly context: EdgeContext;
			readonly roundTripMs: number;
	  }
	| { readonly _tag: "error"; readonly message: string };

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return typeof value === "object" && value !== null;
}

function isNullableString(value: unknown): value is string | null {
	return typeof value === "string" || value === null;
}

function parseEdgeContext(value: unknown): EdgeContext | null {
	if (
		!isRecord(value) ||
		typeof value.colo !== "string" ||
		!isNullableString(value.country) ||
		!isNullableString(value.city) ||
		!isNullableString(value.region) ||
		!isNullableString(value.timezone) ||
		!isNullableString(value.httpProtocol) ||
		!isNullableString(value.tlsVersion) ||
		!(
			typeof value.edgeRttMs === "number" ||
			value.edgeRttMs === null
		) ||
		typeof value.generatedAt !== "string"
	) {
		return null;
	}

	return {
		colo: value.colo,
		country: value.country,
		city: value.city,
		region: value.region,
		timezone: value.timezone,
		httpProtocol: value.httpProtocol,
		tlsVersion: value.tlsVersion,
		edgeRttMs: value.edgeRttMs,
		generatedAt: value.generatedAt,
	};
}

/**
 * Fetch live request metadata from the co-deployed Cloudflare Worker.
 *
 * @returns Loading, ready, or error state for the proof panel.
 */
export function useEdgeContext(): EdgeContextState {
	const [state, setState] = useState<EdgeContextState>({ _tag: "loading" });

	useEffect(() => {
		const controller = new AbortController();

		const load = async (): Promise<void> => {
			const startedAt = performance.now();

			try {
				const response = await fetch("/api/context", {
					headers: { Accept: "application/json" },
					signal: controller.signal,
				});
				if (!response.ok) {
					setState({
						_tag: "error",
						message: "The edge proof endpoint did not answer.",
					});
					return;
				}

				const payload: unknown = await response.json();
				const context = parseEdgeContext(payload);
				if (context === null) {
					setState({
						_tag: "error",
						message: "The edge returned an unexpected response.",
					});
					return;
				}

				setState({
					_tag: "ready",
					context,
					roundTripMs: Math.max(1, Math.round(performance.now() - startedAt)),
				});
			} catch (error: unknown) {
				if (error instanceof DOMException && error.name === "AbortError") {
					return;
				}

				setState({
					_tag: "error",
					message: "Live edge details are unavailable right now.",
				});
			}
		};

		void load();
		return () => controller.abort();
	}, []);

	return state;
}
