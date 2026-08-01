import {
	ArrowDown,
	Browser,
	CloudArrowUp,
	Database,
	GitBranch,
	Lightning,
} from "@phosphor-icons/react";
import { MotionReveal } from "@/components/motion-reveal";

const FLOW = [
	{
		name: "Browser",
		description: "Static Assets delivers the interface from Cloudflare.",
		icon: Browser,
	},
	{
		name: "Worker",
		description: "A Worker routes the request and runs application logic.",
		icon: Lightning,
	},
	{
		name: "Data",
		description: "D1, KV, and R2 match the shape and lifetime of the data.",
		icon: Database,
	},
	{
		name: "Coordination",
		description: "Durable Objects, Queues, and Workflows handle shared work.",
		icon: GitBranch,
	},
	{
		name: "Response",
		description: "The result returns through Cloudflare with security in the path.",
		icon: CloudArrowUp,
	},
] as const;

/**
 * Visual walkthrough of a representative request across Cloudflare primitives.
 *
 * @returns A generated platform image and an ordered request flow.
 */
export function Architecture() {
	return (
		<section
			className="section architecture-section"
			id="architecture"
			aria-labelledby="architecture-title"
		>
			<div className="architecture-media">
				<img
					src="/art/platform-core.webp"
					alt="Six dark physical modules connected to one orange-lit application core"
					width="900"
					height="1499"
					loading="lazy"
				/>
			</div>

			<div className="architecture-copy">
				<MotionReveal className="section-heading">
					<h2 id="architecture-title">One request. A whole platform.</h2>
					<p>
						Follow a request from the browser to application logic, data,
						background work, and back again.
					</p>
				</MotionReveal>

				<div className="request-flow">
					{FLOW.map((item, index) => {
						const Icon = item.icon;
						return (
							<MotionReveal
								className="flow-node"
								delay={index * 0.05}
								key={item.name}
							>
								<div className="flow-icon">
									<Icon aria-hidden="true" weight="duotone" />
								</div>
								<div>
									<strong>{item.name}</strong>
									<p>{item.description}</p>
								</div>
								{index < FLOW.length - 1 ? (
									<ArrowDown
										className="flow-arrow"
										aria-hidden="true"
										weight="bold"
									/>
								) : null}
							</MotionReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
