import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { m, useReducedMotion } from "motion/react";

import { useEdgeContext } from "@/hooks/use-edge-context";

const EdgeProof = () => {
  const state = useEdgeContext();

  if (state._tag === "loading") {
    return (
      <div className="edge-proof" aria-live="polite">
        <div className="edge-proof-status">
          <span className="status-dot" aria-hidden="true" />
          Contacting the edge
        </div>
        <div className="edge-proof-loading">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (state._tag === "error") {
    return (
      <div className="edge-proof" aria-live="polite">
        <div className="edge-proof-status">Worker proof unavailable</div>
        <p>{state.message}</p>
      </div>
    );
  }

  const location =
    state.context.city ??
    state.context.region ??
    state.context.country ??
    "Cloudflare edge";

  return (
    <div className="edge-proof" aria-live="polite">
      <div className="edge-proof-status">
        <span className="status-dot" aria-hidden="true" />
        Live Worker response
      </div>
      <dl className="edge-proof-grid">
        <div>
          <dt>Location</dt>
          <dd>{location}</dd>
        </div>
        <div>
          <dt>Colo</dt>
          <dd>{state.context.colo}</dd>
        </div>
        <div>
          <dt>Round trip</dt>
          <dd>{state.roundTripMs} ms</dd>
        </div>
        <div>
          <dt>Protocol</dt>
          <dd>{state.context.httpProtocol ?? "Local HTTP"}</dd>
        </div>
      </dl>
    </div>
  );
};

/**
 * Manifesto hero with generated network imagery and live Worker context.
 *
 * @returns The first viewport of the landing page.
 */
export const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <m.p
          className="eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          One platform. Use the parts you need.
        </m.p>
        <m.h1
          id="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.08,
            duration: reduceMotion ? 0 : 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span>JUST FUCKING</span>
          <span>
            USE <em>CLOUDFLARE.</em>
          </span>
        </m.h1>
        <m.p
          className="hero-body"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.18,
            duration: reduceMotion ? 0 : 0.65,
          }}
        >
          Compute, storage, security, media, and AI. Pick what you need and ship
          the damn thing.
        </m.p>
        <m.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.26,
            duration: reduceMotion ? 0 : 0.6,
          }}
        >
          <a className="button button-primary" href="#stack-builder">
            Build your stack
            <ArrowDown aria-hidden="true" weight="bold" />
          </a>
          <a className="button button-secondary" href="#platform">
            Explore the platform
            <ArrowRight aria-hidden="true" weight="bold" />
          </a>
        </m.div>
      </div>

      <m.div
        className="hero-visual"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: reduceMotion ? 0 : 0.12,
          duration: reduceMotion ? 0 : 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <img
          src="/art/edge-network.webp"
          alt="A physical network of orange fiber paths converging at global routing nodes"
          width="1600"
          height="853"
          fetchPriority="high"
        />
        <EdgeProof />
      </m.div>
    </section>
  );
};
