import { ArrowRight } from "@phosphor-icons/react";
import type React from "react";

export const CTA: React.FC = () => (
  <section className="border-kumo-line border-b bg-gradient-to-b from-kumo-elevated to-kumo-canvas px-6 py-24 md:py-32">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-8 font-anton text-4xl text-kumo-default uppercase tracking-tight md:text-6xl lg:text-7xl">
        STOP <span className="text-kumo-brand">FUCKING</span> AROUND.
        <br />
        JUST <span className="text-kumo-brand">USE CLOUDFLARE</span>.
      </h2>
      <p className="mb-12 font-mono text-kumo-subtle text-lg md:text-xl">
        Your infrastructure is not a personality trait. Stop suffering. Start
        shipping. Sign up and never think about egress fees again.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          aria-label="Get started with Cloudflare for free"
          className="group brand-glow inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-kumo-brand bg-kumo-brand px-10 py-5 font-bold font-mono text-kumo-canvas uppercase tracking-tight transition-all hover:bg-kumo-brand-hover focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-4 active:opacity-80 sm:w-auto"
          href="https://dash.cloudflare.com/sign-up"
          rel="noopener noreferrer"
          target="_blank"
        >
          FUCKING DO IT ALREADY
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            weight="bold"
          />
        </a>
        <a
          aria-label="Read Cloudflare developer documentation"
          className="brand-glow-focus inline-flex w-full items-center justify-center rounded-full border-2 border-kumo-line bg-transparent px-8 py-5 font-bold font-mono text-kumo-default uppercase tracking-tight transition-all hover:border-kumo-brand hover:text-kumo-brand focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-4 sm:w-auto"
          href="https://developers.cloudflare.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          FINE, READ THE DOCS FIRST
        </a>
      </div>
    </div>
  </section>
);
