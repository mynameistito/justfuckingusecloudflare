import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { TurnstileAction } from "../domain/turnstile";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileOptions {
  readonly sitekey: string;
  readonly action: TurnstileAction;
  readonly theme: "auto";
  readonly execution: "execute";
  readonly appearance: "interaction-only";
  readonly callback: (token: string) => void;
  readonly "error-callback": () => void;
  readonly "expired-callback": () => void;
  readonly "timeout-callback": () => void;
}

interface TurnstileApi {
  readonly render: (
    container: HTMLElement,
    options: TurnstileOptions
  ) => string;
  readonly execute: (widgetId: string) => void;
  readonly reset: (widgetId: string) => void;
  readonly remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type GateState =
  | { readonly _tag: "loading" }
  | { readonly _tag: "ready" }
  | { readonly _tag: "challenging" }
  | { readonly _tag: "submitting" }
  | { readonly _tag: "error"; readonly message: string };

interface TurnstileProviderProps {
  readonly children: ReactNode;
}

interface TurnstileActionButtonProps {
  readonly action: TurnstileAction;
  readonly children: ReactNode;
  readonly busyLabel: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly onVerified: (token: string) => Promise<void>;
}

type TurnstileStatus = "loading" | "ready" | "error";

const TURNSTILE_ERROR_MESSAGE =
  "The human check could not load. Check content blockers and retry.";
const TurnstileStatusContext = createContext<TurnstileStatus>("loading");
const TurnstileSitekeyContext = createContext<string | null>(null);

const parseSitekey = (value: unknown): string | null => {
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
};

/** Load the public Turnstile configuration and script once for all Live Lab actions. */
export const TurnstileProvider = ({ children }: TurnstileProviderProps) => {
  const [scriptState, setScriptState] = useState<"loading" | "ready" | "error">(
    () =>
      typeof window !== "undefined" && window.turnstile !== undefined
        ? "ready"
        : "loading"
  );
  const [sitekeyState, setSitekeyState] = useState<
    | { readonly _tag: "loading" }
    | { readonly _tag: "ready"; readonly sitekey: string }
    | { readonly _tag: "error" }
  >({ _tag: "loading" });

  useEffect(() => {
    if (window.turnstile !== undefined) {
      return;
    }

    const existing = document.querySelector(`#${TURNSTILE_SCRIPT_ID}`);
    const script =
      existing instanceof HTMLScriptElement
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
      document.head.insertBefore(script, null);
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
          sitekey === null ? { _tag: "error" } : { _tag: "ready", sitekey }
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

  let status: TurnstileStatus = "loading";
  if (scriptState === "error" || sitekeyState._tag === "error") {
    status = "error";
  } else if (scriptState === "ready" && sitekeyState._tag === "ready") {
    status = "ready";
  }
  const sitekey = sitekeyState._tag === "ready" ? sitekeyState.sitekey : null;

  return (
    <TurnstileStatusContext.Provider value={status}>
      <TurnstileSitekeyContext.Provider value={sitekey}>
        {children}
      </TurnstileSitekeyContext.Provider>
    </TurnstileStatusContext.Provider>
  );
};

/** Execute and reset an isolated Turnstile widget for one protected action. */
export const TurnstileActionButton = ({
  action,
  busyLabel,
  children,
  className = "demo-run",
  disabled = false,
  onVerified,
}: TurnstileActionButtonProps) => {
  const status = useContext(TurnstileStatusContext);
  const sitekey = useContext(TurnstileSitekeyContext);
  const [state, setState] = useState<GateState>({ _tag: "loading" });
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifiedRef = useRef(onVerified);

  useEffect(() => {
    onVerifiedRef.current = onVerified;
  }, [onVerified]);

  useEffect(() => {
    let mounted = true;
    const scheduleState = (next: GateState): void => {
      queueMicrotask(() => {
        if (mounted) {
          setState(next);
        }
      });
    };

    if (status === "error") {
      scheduleState({ _tag: "error", message: TURNSTILE_ERROR_MESSAGE });
      return () => {
        mounted = false;
      };
    }
    if (status !== "ready" || sitekey === null) {
      scheduleState({ _tag: "loading" });
      return () => {
        mounted = false;
      };
    }

    const api = window.turnstile;
    const container = containerRef.current;
    if (api === undefined || container === null) {
      scheduleState({
        _tag: "error",
        message: "The human check is unavailable.",
      });
      return () => {
        mounted = false;
      };
    }

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
      action,
      appearance: "interaction-only",
      callback: (token) => {
        if (!mounted) {
          return;
        }
        setState({ _tag: "submitting" });
        const submit = async (): Promise<void> => {
          try {
            await onVerifiedRef.current(token);
            reset();
            if (mounted) {
              setState({ _tag: "ready" });
            }
          } catch {
            reset();
            if (mounted) {
              setState({
                _tag: "error",
                message: "The protected action could not be completed.",
              });
            }
          }
        };
        void submit();
      },
      "error-callback": () =>
        fail("Cloudflare could not complete the human check."),
      execution: "execute",
      "expired-callback": () => fail("The human check expired. Try again."),
      sitekey,
      theme: "auto",
      "timeout-callback": () => fail("The human check timed out. Try again."),
    });
    widgetIdRef.current = widgetId;
    scheduleState({ _tag: "ready" });

    return () => {
      mounted = false;
      api.remove(widgetId);
      widgetIdRef.current = null;
    };
  }, [action, sitekey, status]);

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
        <p className="turnstile-error" role="alert">
          {state.message}
        </p>
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
};
