import {
	ArrowSquareOut,
	BracketsCurly,
	Broadcast,
	Browser,
	Check,
	CheckCircle,
	Copy,
	Cpu,
	Database,
	ImageSquare,
	ShareNetwork,
	Warning,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import {
	BUILD_OPTIONS,
	DEPTH_OPTIONS,
	encodeStackHash,
	NEED_OPTIONS,
	parseStackHash,
	recommendStack,
	type BuildType,
	type NeedId,
	type RecommendationDepth,
} from "@/domain/stack-builder";
import { MotionReveal } from "@/components/motion-reveal";

type CopyState = "idle" | "copied" | "failed";

function BuildIcon({ buildType }: { readonly buildType: BuildType }) {
	switch (buildType) {
		case "website":
			return <Browser aria-hidden="true" weight="duotone" />;
		case "fullstack":
			return <Database aria-hidden="true" weight="duotone" />;
		case "api":
			return <BracketsCurly aria-hidden="true" weight="duotone" />;
		case "media":
			return <ImageSquare aria-hidden="true" weight="duotone" />;
		case "realtime":
			return <Broadcast aria-hidden="true" weight="duotone" />;
		case "ai":
			return <Cpu aria-hidden="true" weight="duotone" />;
	}
}

/**
 * Interactive, deterministic Cloudflare architecture recommender.
 *
 * @returns A single-page configurator with shareable results.
 */
export function StackBuilder() {
	const [buildType, setBuildType] = useState<BuildType | null>(null);
	const [needs, setNeeds] = useState<ReadonlySet<NeedId>>(() => new Set());
	const [depth, setDepth] = useState<RecommendationDepth>("essentials");
	const [copyState, setCopyState] = useState<CopyState>("idle");
	const [sharedNotice, setSharedNotice] = useState<string | null>(null);

	useEffect(() => {
		if (!window.location.hash.startsWith("#stack=")) {
			return;
		}

		const parsed = parseStackHash(window.location.hash);
		if (parsed._tag === "err") {
			setSharedNotice(parsed.error.message);
			return;
		}

		setBuildType(parsed.value.buildType);
		setNeeds(new Set(parsed.value.needs));
		setDepth(parsed.value.depth);
		setSharedNotice("Shared architecture loaded.");

		const frameId = window.requestAnimationFrame(() => {
			document.getElementById("stack-builder")?.scrollIntoView();
		});
		return () => window.cancelAnimationFrame(frameId);
	}, []);

	const recommendations = useMemo(
		() =>
			buildType === null
				? []
				: recommendStack({
						buildType,
						needs: [...needs],
						depth,
					}),
		[buildType, depth, needs],
	);

	const toggleNeed = (needId: NeedId) => {
		setNeeds((current) => {
			const next = new Set(current);
			if (next.has(needId)) {
				next.delete(needId);
			} else {
				next.add(needId);
			}
			return next;
		});
		setCopyState("idle");
	};

	const copyShareLink = async (): Promise<void> => {
		if (buildType === null) {
			return;
		}

		const url = new URL(window.location.href);
		url.hash = encodeStackHash({
			buildType,
			needs: [...needs],
			depth,
		}).slice(1);
		window.history.replaceState(null, "", url);

		try {
			await window.navigator.clipboard.writeText(url.toString());
			setCopyState("copied");
		} catch {
			setCopyState("failed");
		}
	};

	return (
		<section
			className="section stack-builder-section"
			id="stack-builder"
			aria-labelledby="stack-builder-title"
		>
			<MotionReveal className="section-heading section-heading-centered">
				<h2 id="stack-builder-title">Tell us what you are building.</h2>
				<p>
					Pick the jobs your app needs. We will assemble a sensible stack and
					explain every choice.
				</p>
			</MotionReveal>

			{sharedNotice !== null ? (
				<div className="builder-notice" role="status">
					{sharedNotice.startsWith("Shared") ? (
						<CheckCircle aria-hidden="true" weight="fill" />
					) : (
						<Warning aria-hidden="true" weight="fill" />
					)}
					{sharedNotice}
				</div>
			) : null}

			<div className="builder-shell">
				<div className="builder-controls">
					<fieldset className="builder-fieldset">
						<legend>What are you building?</legend>
						<div className="build-type-grid">
							{BUILD_OPTIONS.map((option) => {
								const selected = buildType === option.id;
								return (
									<button
										className={
											selected ? "build-type is-selected" : "build-type"
										}
										type="button"
										key={option.id}
										onClick={() => {
											setBuildType(option.id);
											setCopyState("idle");
										}}
										aria-pressed={selected}
									>
										<BuildIcon buildType={option.id} />
										<span>
											<strong>{option.label}</strong>
											<small>{option.description}</small>
										</span>
										<span className="selection-mark" aria-hidden="true">
											{selected ? <Check weight="bold" /> : null}
										</span>
									</button>
								);
							})}
						</div>
					</fieldset>

					<fieldset className="builder-fieldset">
						<legend>What else does it need to do?</legend>
						<div className="needs-grid">
							{NEED_OPTIONS.map((option) => {
								const selected = needs.has(option.id);
								return (
									<label
										className={selected ? "need-option is-selected" : "need-option"}
										key={option.id}
									>
										<input
											type="checkbox"
											checked={selected}
											onChange={() => toggleNeed(option.id)}
										/>
										<span className="checkbox-mark" aria-hidden="true">
											{selected ? <Check weight="bold" /> : null}
										</span>
										<span>
											<strong>{option.label}</strong>
											<small>{option.description}</small>
										</span>
									</label>
								);
							})}
						</div>
					</fieldset>

					<fieldset className="builder-fieldset">
						<legend>How much should we recommend?</legend>
						<div className="depth-options">
							{DEPTH_OPTIONS.map((option) => (
								<label
									className={
										depth === option.id
											? "depth-option is-selected"
											: "depth-option"
									}
									key={option.id}
								>
									<input
										type="radio"
										name="recommendation-depth"
										value={option.id}
										checked={depth === option.id}
										onChange={() => {
											setDepth(option.id);
											setCopyState("idle");
										}}
									/>
									<span className="radio-mark" aria-hidden="true" />
									<span>
										<strong>{option.label}</strong>
										<small>{option.description}</small>
									</span>
								</label>
							))}
						</div>
					</fieldset>
				</div>

				<aside
					className="stack-result"
					id="stack-result"
					aria-labelledby="stack-result-title"
				>
					<div className="result-heading">
						<ShareNetwork aria-hidden="true" weight="duotone" />
						<div>
							<h3 id="stack-result-title">Your Cloudflare stack</h3>
							<strong aria-live="polite">
								{buildType === null
									? "Choose what you are building"
									: `${recommendations.length} products, one platform`}
							</strong>
						</div>
					</div>

					{buildType === null ? (
						<div className="result-empty">
							<p>
								Start with the application shape. Your recommendations will
								appear here.
							</p>
						</div>
					) : (
						<>
							<div className="result-products">
								{recommendations.map((product, index) => (
									<a
										className="result-product"
										href={product.docsUrl}
										target="_blank"
										rel="noreferrer"
										aria-label={`${product.shortName} documentation (opens in a new tab)`}
										key={product.id}
									>
										<span className="product-index" aria-hidden="true">
											{String(index + 1).padStart(2, "0")}
										</span>
										<span>
											<strong>{product.shortName}</strong>
											<small>{product.description}</small>
										</span>
										<ArrowSquareOut aria-hidden="true" weight="bold" />
									</a>
								))}
							</div>
							<button
								className="button button-primary result-share"
								type="button"
								onClick={() => {
									void copyShareLink();
								}}
							>
								{copyState === "copied" ? (
									<CheckCircle aria-hidden="true" weight="fill" />
								) : (
									<Copy aria-hidden="true" weight="bold" />
								)}
								{copyState === "copied" ? "Link copied" : "Copy share link"}
							</button>
							{copyState === "failed" ? (
								<p className="copy-error" role="alert">
									Copy failed. Your share link is now in the address bar.
								</p>
							) : null}
						</>
					)}
				</aside>
			</div>
			{buildType === null ? null : (
				<a className="mobile-result-jump" href="#stack-result">
					View {recommendations.length} product
					{recommendations.length === 1 ? "" : "s"} in your stack
				</a>
			)}
		</section>
	);
}
