import {
	ArrowClockwise,
	CheckCircle,
	Database,
	DownloadSimple,
	HardDrives,
	ImageSquare,
	Key,
	Lightning,
	LockKey,
	Play,
	ShieldCheck,
	WarningCircle,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
	parseDemoResponse,
	type DemoResponse,
	type JsonDemoId,
} from "@/domain/live-demo";
import {
	TURNSTILE_ACTIONS,
	type TurnstileAction,
} from "@/domain/turnstile";
import { MotionReveal } from "@/components/motion-reveal";
import {
	TurnstileActionButton,
	TurnstileProvider,
} from "@/components/turnstile-action";

type DemoState =
	| { readonly _tag: "idle" }
	| { readonly _tag: "loading" }
	| { readonly _tag: "ready"; readonly result: DemoResponse }
	| { readonly _tag: "error"; readonly message: string };

type DemoDefinition = {
	readonly id: JsonDemoId;
	readonly title: string;
	readonly eyebrow: string;
	readonly description: string;
	readonly endpoint: string;
	readonly action: TurnstileAction;
};

type ProofState =
	| { readonly _tag: "idle" }
	| { readonly _tag: "loading" }
	| { readonly _tag: "ready"; readonly hostname: string; readonly message: string }
	| { readonly _tag: "error"; readonly message: string };

const DEMOS: ReadonlyArray<DemoDefinition> = [
	{
		id: "d1",
		title: "Query the product ledger",
		eyebrow: "D1 + Workers",
		description: "Run a real SQL query against a migrated, seeded D1 database.",
		endpoint: "/api/demos/d1",
		action: TURNSTILE_ACTIONS.d1,
	},
	{
		id: "kv",
		title: "Read today's edge key",
		eyebrow: "Workers KV",
		description: "Fetch one date-keyed product recommendation from global KV.",
		endpoint: "/api/demos/kv",
		action: TURNSTILE_ACTIONS.kv,
	},
	{
		id: "r2",
		title: "Inspect a private object",
		eyebrow: "R2 + Workers",
		description: "Read metadata for one fixed object with no public bucket or uploads.",
		endpoint: "/api/demos/r2",
		action: TURNSTILE_ACTIONS.r2,
	},
	{
		id: "cache",
		title: "Make the edge remember",
		eyebrow: "Cache API",
		description: "Run twice to turn a data-center cache miss into a cache hit.",
		endpoint: "/api/demos/cache",
		action: TURNSTILE_ACTIONS.cache,
	},
] as const;

function DemoIcon({ id }: { readonly id: JsonDemoId }) {
	switch (id) {
		case "d1":
			return <Database aria-hidden="true" weight="duotone" />;
		case "kv":
			return <Key aria-hidden="true" weight="duotone" />;
		case "r2":
			return <HardDrives aria-hidden="true" weight="duotone" />;
		case "cache":
			return <Lightning aria-hidden="true" weight="duotone" />;
	}
}

async function readError(response: Response): Promise<string> {
	try {
		const payload: unknown = await response.json();
		if (
			typeof payload === "object" &&
			payload !== null &&
			"error" in payload &&
			typeof payload.error === "string"
		) {
			return payload.error;
		}
	} catch {
		return "The live demo returned an unreadable response.";
	}

	return `The live demo returned HTTP ${response.status}.`;
}

function turnstileRequest(token: string): RequestInit {
	return {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ turnstileToken: token }),
	};
}

function ProtectedDownload({ href, label }: { readonly href: string; readonly label: string }) {
	const [status, setStatus] = useState<"idle" | "downloading" | "ready" | "error">(
		"idle",
	);

	const download = async (token: string): Promise<void> => {
		setStatus("downloading");
		try {
			const response = await fetch(href, turnstileRequest(token));
			if (!response.ok) {
				setStatus("error");
				return;
			}

			const objectUrl = URL.createObjectURL(await response.blob());
			const anchor = document.createElement("a");
			anchor.href = objectUrl;
			anchor.download = "cloudflare-primitives.json";
			anchor.click();
			URL.revokeObjectURL(objectUrl);
			setStatus("ready");
		} catch {
			setStatus("error");
		}
	};

	return (
		<>
			<TurnstileActionButton
				action={TURNSTILE_ACTIONS.r2Download}
				busyLabel="Verifying download"
				className="demo-artifact"
				disabled={status === "downloading"}
				onVerified={download}
			>
				<DownloadSimple aria-hidden="true" weight="bold" />
				{status === "ready" ? "Download again" : label}
			</TurnstileActionButton>
			{status === "error" ? (
				<p className="artifact-error" role="alert">The protected download failed.</p>
			) : null}
		</>
	);
}

function DemoCard({ demo }: { readonly demo: DemoDefinition }) {
	const [state, setState] = useState<DemoState>({ _tag: "idle" });

	const run = async (token: string): Promise<void> => {
		setState({ _tag: "loading" });
		try {
			const response = await fetch(demo.endpoint, turnstileRequest(token));
			if (!response.ok) {
				setState({ _tag: "error", message: await readError(response) });
				return;
			}

			const payload: unknown = await response.json();
			const result = parseDemoResponse(payload);
			if (result === null || result.demo !== demo.id) {
				setState({
					_tag: "error",
					message: "The live demo returned an unexpected response.",
				});
				return;
			}

			setState({ _tag: "ready", result });
		} catch {
			setState({
				_tag: "error",
				message: "The live demo is unreachable right now.",
			});
		}
	};

	return (
		<article className="demo-card">
			<div className="demo-card-heading">
				<div className="demo-icon">
					<DemoIcon id={demo.id} />
				</div>
				<div>
					<p>{demo.eyebrow}</p>
					<h3>{demo.title}</h3>
				</div>
			</div>
			<p className="demo-description">{demo.description}</p>

			<div className="demo-console" aria-live="polite">
				{state._tag === "idle" ? (
					<div className="demo-empty">
						<span>READY</span>
						<p>No request has been sent.</p>
					</div>
				) : null}
				{state._tag === "loading" ? (
					<div className="demo-loading">
						<ArrowClockwise aria-hidden="true" weight="bold" />
						<span>Running at the edge</span>
					</div>
				) : null}
				{state._tag === "error" ? (
					<div className="demo-error" role="alert">
						<WarningCircle aria-hidden="true" weight="fill" />
						<p>{state.message}</p>
					</div>
				) : null}
				{state._tag === "ready" ? (
					<div className="demo-result">
						<div className="demo-result-status">
							<CheckCircle aria-hidden="true" weight="fill" />
							<span>LIVE PROOF</span>
							<small>{state.result.receipt.colo}</small>
						</div>
						<dl>
							{state.result.facts.map((fact) => (
								<div key={fact.label}>
									<dt>{fact.label}</dt>
									<dd>{fact.value}</dd>
								</div>
							))}
						</dl>
						<p className="demo-proof">{state.result.receipt.proof}</p>
						<div className="demo-receipt">
							<span>Request {state.result.receipt.requestId.slice(0, 8)}</span>
							<span>
								Daily guard {state.result.receipt.quota.used}/
								{state.result.receipt.quota.limit}
							</span>
						</div>
						{state.result.artifact === undefined ? null : (
							<ProtectedDownload
								href={state.result.artifact.href}
								label={state.result.artifact.label}
							/>
						)}
					</div>
				) : null}
			</div>

			<TurnstileActionButton
				action={demo.action}
				busyLabel="Checking then running"
				disabled={state._tag === "loading"}
				onVerified={run}
			>
				{state._tag === "ready" ? (
					<ArrowClockwise aria-hidden="true" weight="bold" />
				) : (
					<Play aria-hidden="true" weight="fill" />
				)}
				{state._tag === "ready" ? "Run again" : "Run demo"}
			</TurnstileActionButton>
		</article>
	);
}

function HumanProofDemo() {
	const [state, setState] = useState<ProofState>({ _tag: "idle" });

	const prove = async (token: string): Promise<void> => {
		setState({ _tag: "loading" });
		try {
			const response = await fetch(
				"/api/demos/turnstile",
				turnstileRequest(token),
			);
			if (!response.ok) {
				setState({ _tag: "error", message: await readError(response) });
				return;
			}

			const payload: unknown = await response.json();
			if (
				typeof payload !== "object" ||
				payload === null ||
				!("verified" in payload) ||
				payload.verified !== true ||
				!("hostname" in payload) ||
				typeof payload.hostname !== "string" ||
				!("message" in payload) ||
				typeof payload.message !== "string"
			) {
				setState({ _tag: "error", message: "The proof response was malformed." });
				return;
			}

			setState({
				_tag: "ready",
				hostname: payload.hostname,
				message: payload.message,
			});
		} catch {
			setState({ _tag: "error", message: "The human proof is unreachable." });
		}
	};

	return (
		<article className="demo-card human-proof-card">
			<div className="demo-card-heading">
				<div className="demo-icon"><ShieldCheck aria-hidden="true" weight="duotone" /></div>
				<div>
					<p>Turnstile + Workers</p>
					<h3>Prove you're human</h3>
				</div>
			</div>
			<p className="demo-description">
				Generate a single-use token, verify it server-side, then enforce its action and hostname.
			</p>
			<div className="demo-console" aria-live="polite">
				{state._tag === "idle" ? (
					<div className="demo-empty"><span>UNVERIFIED</span><p>No challenge has run.</p></div>
				) : null}
				{state._tag === "loading" ? (
					<div className="demo-loading"><ArrowClockwise aria-hidden="true" weight="bold" /><span>Checking Siteverify</span></div>
				) : null}
				{state._tag === "error" ? (
					<div className="demo-error" role="alert"><WarningCircle aria-hidden="true" weight="fill" /><p>{state.message}</p></div>
				) : null}
				{state._tag === "ready" ? (
					<div className="human-proof-result">
						<ShieldCheck aria-hidden="true" weight="fill" />
						<strong>HUMAN VERIFIED</strong>
						<p>{state.message}</p>
						<code>{state.hostname}</code>
					</div>
				) : null}
			</div>
			<TurnstileActionButton
				action={TURNSTILE_ACTIONS.liveLab}
				busyLabel="Verifying human"
				disabled={state._tag === "loading"}
				onVerified={prove}
			>
				<ShieldCheck aria-hidden="true" weight="fill" />
				{state._tag === "ready" ? "Verify again" : "Run human check"}
			</TurnstileActionButton>
		</article>
	);
}

type ImageState =
	| { readonly _tag: "idle" }
	| { readonly _tag: "loading" }
	| { readonly _tag: "ready"; readonly src: string }
	| { readonly _tag: "error"; readonly message: string };

function ImagesDemo() {
	const [width, setWidth] = useState(640);
	const [state, setState] = useState<ImageState>({ _tag: "idle" });

	useEffect(() => {
		return () => {
			if (state._tag === "ready") {
				URL.revokeObjectURL(state.src);
			}
		};
	}, [state]);

	const run = async (token: string): Promise<void> => {
		setState({ _tag: "loading" });
		try {
			const response = await fetch(
				`/api/demos/images?width=${width}`,
				turnstileRequest(token),
			);
			if (!response.ok) {
				setState({ _tag: "error", message: await readError(response) });
				return;
			}

			setState({ _tag: "ready", src: URL.createObjectURL(await response.blob()) });
		} catch {
			setState({ _tag: "error", message: "The image transform is unavailable right now." });
		}
	};

	return (
		<article className="demo-card demo-card-wide">
			<div className="demo-card-heading">
				<div className="demo-icon"><ImageSquare aria-hidden="true" weight="duotone" /></div>
				<div><p>Images + Static Assets</p><h3>Transform an image at the edge</h3></div>
			</div>
			<p className="demo-description">
				Choose an allow-listed width. Images transforms the bundled source asset and returns WebP directly from the Worker.
			</p>

			<div className="image-demo-layout">
				<div className="image-demo-controls">
					<span>Output width</span>
					<div className="image-width-options" role="group" aria-label="Image output width">
						{[320, 640, 960].map((candidate) => (
							<button
								type="button"
								aria-pressed={width === candidate}
								className={width === candidate ? "is-active" : ""}
								key={candidate}
								onClick={() => setWidth(candidate)}
							>{candidate}px</button>
						))}
					</div>
					<ul><li>Fixed source asset</li><li>Three accepted widths</li><li>100 transformations per day</li></ul>
					<TurnstileActionButton
						action={TURNSTILE_ACTIONS.images}
						busyLabel="Checking then transforming"
						disabled={state._tag === "loading"}
						onVerified={run}
					>
						<Play aria-hidden="true" weight="fill" />
						Transform image
					</TurnstileActionButton>
				</div>

				<div className="image-demo-output" aria-live="polite">
					{state._tag === "idle" ? (
						<div className="image-placeholder"><ImageSquare aria-hidden="true" weight="thin" /><span>OUTPUT WAITS HERE</span></div>
					) : null}
					{state._tag === "loading" ? (
						<div className="image-placeholder"><ArrowClockwise aria-hidden="true" weight="bold" /><span>Transforming at the edge</span></div>
					) : null}
					{state._tag === "error" ? (
						<div className="image-placeholder demo-error" role="alert"><WarningCircle aria-hidden="true" weight="fill" /><span>{state.message}</span></div>
					) : null}
					{state._tag === "ready" ? (
						<>
							<img src={state.src} alt={`Cloudflare platform artwork transformed to ${width} pixels wide`} />
							<span className="image-ready"><CheckCircle aria-hidden="true" weight="fill" />{width}px WebP ready</span>
						</>
					) : null}
				</div>
			</div>
		</article>
	);
}

/** Interactive, quota-protected proofs for the site's live Cloudflare bindings. */
export function LiveLab() {
	return (
		<TurnstileProvider>
			<section className="section live-lab-section" id="live-lab" aria-labelledby="live-lab-title">
				<MotionReveal className="section-heading live-lab-heading">
					<p className="eyebrow">No mocks. No surprise bill.</p>
					<h2 id="live-lab-title">Touch the actual primitives.</h2>
					<p>Every action below invokes the deployed Worker and names the products that did the work. A fresh Turnstile token guards every request.</p>
					<div className="free-contract">
						<LockKey aria-hidden="true" weight="duotone" />
						<div><strong>THE FREE CONTRACT</strong><span>Allow-listed inputs, human checks, private storage, daily hard stops.</span></div>
					</div>
				</MotionReveal>

				<div className="demo-grid">
					<MotionReveal><HumanProofDemo /></MotionReveal>
					{DEMOS.map((demo, index) => (
						<MotionReveal delay={(index + 1) * 0.05} key={demo.id}><DemoCard demo={demo} /></MotionReveal>
					))}
					<MotionReveal className="demo-grid-wide" delay={0.25}><ImagesDemo /></MotionReveal>
				</div>
			</section>
		</TurnstileProvider>
	);
}
