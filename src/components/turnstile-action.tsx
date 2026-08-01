import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { TurnstileAction } from "../domain/turnstile";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileOptions = {
	readonly sitekey: string;
	readonly action: TurnstileAction;
	readonly theme: "auto";
	readonly execution: "execute";
	readonly appearance: "interaction-only";
	readonly callback: (token: string) => void;
	readonly "error-callback": () => void;
	readonly "expired-callback": () => void;
	readonly "timeout-callback": () => void;
};

type TurnstileApi = {
	readonly render: (container: HTMLElement, options: TurnstileOptions) => string;
	readonly execute: (widgetId: string) => void;
	readonly reset: (widgetId: string) => void;
	readonly remove: (widgetId: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

type TurnstileContextState =
	| { readonly _tag: "loading" }
	| { readonly _tag: "ready"; readonly sitekey: string }
	| { readonly _tag: "error"; readonly message: string };

type GateState =
	| { readonly _tag: "loading" }
	| { readonly _tag: "ready" }
	| { readonly _tag: "challenging" }
	| { readonly _tag: "submitting" }
	| { readonly _tag: "error"; readonly message: string };

type TurnstileProviderProps = {
	readonly children: ReactNode;
};

type TurnstileActionButtonProps = {
	readonly action: TurnstileAction;
	readonly children: ReactNode;
	readonly busyLabel: string;
	readonly className?: string;
	readonly disabled?: boolean;
	readonly onVerified: (token: string) => Promise<void>;
};

const TurnstileContext = createContext<TurnstileContextState>({ _tag: "loading" });

function parseSitekey(value: unknown): string | null {
	if (
		typeof value !== "object" ||
		value === null ||
		!("sitekey" in value) ||
		typeof value.sitekey !== "string" ||
		value.sitekey.length === 0
	) {
		return null;
	}

	return value.sitekey;
}

/** Load the public Turnstile configuration and script once for all Live Lab actions. */
export function TurnstileProvider({ children }: TurnstileProviderProps) {
	const [scriptState, setScriptState] = useState<"loading" | "ready" | "error">(
		"loading",
	);
	const [sitekeyState, setSitekeyState] = useState<
		| { readonly _tag: "loading" }
		| { readonly _tag: "ready"; readonly sitekey: string }
		| { readonly _tag: "error" }
	>({ _tag: "loading" });

	useEffect(() => {
		if (window.turnstile !== undefined) {
			setScriptState("ready");
			return;
		}

		const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
		const script = existing instanceof HTMLScriptElement
			? existing
			: document.createElement("script");
		const handleLoad = (): void => setScriptState("ready");
		const handleError = (): void => setScriptState("error");

		script.addEventListener("load", handleLoad);
		script.addEventListener("error", handleError);
		if (!(existing instanceof HTMLScriptElement)) {
			script.id = TURNSTILE_SCRIPT_ID;
			script.src = TURNSTILE_SCRIPT_URL;
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
		}

		return () => {
			script.removeEventListener("load", handleLoad);
			script.removeEventListener("error", handleError);
		};
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		const loadConfiguration = async (): Promise<void> => {
			try {
				const response = await fetch("/api/demos/turnstile/config", {
					headers: { Accept: "application/json" },
					signal: controller.signal,
				});
				if (!response.ok) {
					setSitekeyState({ _tag: "error" });
					return;
				}

				const sitekey = parseSitekey(await response.json());
				setSitekeyState(
					sitekey === null
						? { _tag: "error" }
						: { _tag: "ready", sitekey },
				);
			} catch (error: unknown) {
				if (!(error instanceof DOMException && error.name === "AbortError")) {
					setSitekeyState({ _tag: "error" });
				}
			}
		};

		void loadConfiguration();
		return () => controller.abort();
	}, []);

	const context = useMemo<TurnstileContextState>(() => {
		if (scriptState === "error" || sitekeyState._tag === "error") {
			return {
				_tag: "error",
				message: "The human check could not load. Check content blockers and retry.",
			};
		}
		if (scriptState === "ready" && sitekeyState._tag === "ready") {
			return { _tag: "ready", sitekey: sitekeyState.sitekey };
		}
		return { _tag: "loading" };
	}, [scriptState, sitekeyState]);

	return (
		<TurnstileContext.Provider value={context}>
			{children}
		</TurnstileContext.Provider>
	);
}

/** Execute and reset an isolated Turnstile widget for one protected action. */
export function TurnstileActionButton({
	action,
	busyLabel,
	children,
	className = "demo-run",
	disabled = false,
	onVerified,
}: TurnstileActionButtonProps) {
	const availability = useContext(TurnstileContext);
	const [state, setState] = useState<GateState>({ _tag: "loading" });
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);
	const onVerifiedRef = useRef(onVerified);

	useEffect(() => {
		onVerifiedRef.current = onVerified;
	}, [onVerified]);

	useEffect(() => {
		if (availability._tag === "error") {
			setState({ _tag: "error", message: availability.message });
			return;
		}
		if (availability._tag !== "ready") {
			setState({ _tag: "loading" });
			return;
		}

		const api = window.turnstile;
		const container = containerRef.current;
		if (api === undefined || container === null) {
			setState({ _tag: "error", message: "The human check is unavailable." });
			return;
		}

		let mounted = true;
		const reset = (): void => {
			const widgetId = widgetIdRef.current;
			if (widgetId !== null) {
				api.reset(widgetId);
			}
		};
		const fail = (message: string): void => {
			reset();
			if (mounted) {
				setState({ _tag: "error", message });
			}
		};

		const widgetId = api.render(container, {
			sitekey: availability.sitekey,
			action,
			theme: "auto",
			execution: "execute",
			appearance: "interaction-only",
			callback: (token) => {
				if (!mounted) {
					return;
				}
				setState({ _tag: "submitting" });
				void onVerifiedRef.current(token)
					.catch(() => {
						if (mounted) {
							setState({
								_tag: "error",
								message: "The protected action could not be completed.",
							});
						}
					})
					.finally(() => {
						reset();
						if (mounted) {
							setState((current) =>
								current._tag === "error" ? current : { _tag: "ready" },
							);
						}
					});
			},
			"error-callback": () => fail("Cloudflare could not complete the human check."),
			"expired-callback": () => fail("The human check expired. Try again."),
			"timeout-callback": () => fail("The human check timed out. Try again."),
		});
		widgetIdRef.current = widgetId;
		setState({ _tag: "ready" });

		return () => {
			mounted = false;
			api.remove(widgetId);
			widgetIdRef.current = null;
		};
	}, [action, availability]);

	const run = (): void => {
		const api = window.turnstile;
		const widgetId = widgetIdRef.current;
		if (api === undefined || widgetId === null) {
			setState({ _tag: "error", message: "The human check is not ready yet." });
			return;
		}

		setState({ _tag: "challenging" });
		api.execute(widgetId);
	};

	const isBusy = state._tag === "challenging" || state._tag === "submitting";
	return (
		<div className="turnstile-action">
			<div className="turnstile-widget" ref={containerRef} />
			{state._tag === "error" ? (
				<p className="turnstile-error" role="alert">{state.message}</p>
			) : null}
			<button
				className={className}
				type="button"
				disabled={disabled || state._tag === "loading" || isBusy}
				onClick={run}
			>
				{isBusy ? busyLabel : children}
			</button>
		</div>
	);
}
