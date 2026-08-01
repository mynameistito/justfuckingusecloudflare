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
    description: "Static Assets delivers the interface from Cloudflare.",
    icon: Browser,
    name: "Browser",
  },
  {
    description: "A Worker routes the request and runs application logic.",
    icon: Lightning,
    name: "Worker",
  },
  {
    description: "D1, KV, and R2 match the shape and lifetime of the data.",
    icon: Database,
    name: "Data",
  },
  {
    description: "Durable Objects, Queues, and Workflows handle shared work.",
    icon: GitBranch,
    name: "Coordination",
  },
  {
    description:
      "The result returns through Cloudflare with security in the path.",
    icon: CloudArrowUp,
    name: "Response",
  },
] as const;

/**
 * Visual walkthrough of a representative request across Cloudflare primitives.
 *
 * @returns A generated platform image and an ordered request flow.
 */
export const Architecture = () => (
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

      <ol className="request-flow">
        {FLOW.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <MotionReveal className="flow-node" delay={index * 0.05}>
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
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);
