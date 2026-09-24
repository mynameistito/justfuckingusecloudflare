import { ArrowRight } from "lucide-react";
import type React from "react";

export const Cta: React.FC = () => (
  <section className="border-line from-surface-raised to-surface border-b bg-gradient-to-b px-6 py-24 md:py-32">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="font-anton mb-8 text-4xl tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
        STOP <span className="text-brand">FUCKING</span> AROUND.
        <br />
        JUST <span className="text-brand">USE CLOUDFLARE</span>.
      </h2>
      <p className="text-muted-foreground mb-12 font-mono text-lg md:text-xl">
        Your infrastructure is not a personality trait. Stop suffering. Start
        shipping. Sign up and never think about egress fees again.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          aria-label="Get started with Cloudflare for free"
          className="group border-brand bg-brand hover:bg-brand-light focus-visible:outline-brand active:bg-brand-dark inline-flex w-full items-center justify-center gap-3 rounded-full border-2 px-10 py-5 font-mono font-bold tracking-tight text-black uppercase transition-colors hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-auto"
          href="https://dash.cloudflare.com/sign-up"
          rel="noopener noreferrer"
          target="_blank"
        >
          FUCKING DO IT ALREADY
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
          />
        </a>
        <a
          aria-label="Read Cloudflare developer documentation"
          className="border-line-strong hover:border-brand hover:text-brand focus-visible:outline-brand active:border-brand-dark active:text-brand-dark inline-flex w-full items-center justify-center rounded-full border-2 bg-transparent px-8 py-5 font-mono font-bold tracking-tight text-white uppercase transition-colors hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-auto"
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
