import {
  ArrowRight,
  BracketsCurly,
  Broadcast,
  Cloud,
  Link,
} from "@phosphor-icons/react";

import { MotionReveal } from "@/components/motion-reveal";

const BLUEPRINT = [
  {
    detail: "One deployable unit for code and globally cached assets.",
    icon: Cloud,
    label: "Site delivery",
    value: "Worker + Static Assets",
  },
  {
    detail: "Coarse edge metadata from the request serving this page.",
    icon: Broadcast,
    label: "Live proof",
    value: "request.cf",
  },
  {
    detail: "Deterministic recommendations with no external service.",
    icon: BracketsCurly,
    label: "Stack logic",
    value: "Typed functional core",
  },
  {
    detail: "Portable architectures without a database or tracking token.",
    icon: Link,
    label: "Share links",
    value: "Versioned URL state",
  },
  {
    detail: "Real bindings protected by per-product daily usage gates.",
    icon: Cloud,
    label: "Live lab",
    value: "D1 + KV + R2 + Cache + Images",
  },
] as const;

/**
 * Honest dogfooding section that lists only integrations present in v1.
 *
 * @returns The current site's production blueprint.
 */
export const ThisSite = () => (
  <section
    className="section this-site-section"
    id="this-site"
    aria-labelledby="this-site-title"
  >
    <MotionReveal className="this-site-intro">
      <p className="eyebrow">Built on the thing it recommends</p>
      <h2 id="this-site-title">This site is the proof.</h2>
      <p>
        No pretend integrations. Every item listed here has a real job in the
        deployed application.
      </p>
    </MotionReveal>

    <div className="blueprint-list">
      {BLUEPRINT.map((item, index) => {
        const Icon = item.icon;
        return (
          <MotionReveal
            className="blueprint-row"
            delay={index * 0.06}
            key={item.label}
          >
            <Icon aria-hidden="true" weight="duotone" />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </MotionReveal>
        );
      })}
    </div>

    <MotionReveal className="final-cta">
      <h2>NOW BUILD THE FUCKING THING.</h2>
      <p>Pick the primitives, read the docs, and ship.</p>
      <div className="final-actions">
        <a className="button button-primary" href="#stack-builder">
          Build your stack
          <ArrowRight aria-hidden="true" weight="bold" />
        </a>
        <a
          className="button button-secondary"
          href="https://developers.cloudflare.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Cloudflare Docs (opens in a new tab)"
        >
          Open Cloudflare Docs
          <ArrowRight aria-hidden="true" weight="bold" />
        </a>
      </div>
    </MotionReveal>
  </section>
);
