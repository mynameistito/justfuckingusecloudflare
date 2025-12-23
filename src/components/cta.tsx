import { ArrowRight } from "lucide-react";
import type React from "react";

export const CTA: React.FC = () => (
  <section className="border-neutral-800 border-b bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-24 md:py-32">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="mb-8 font-anton text-4xl text-white uppercase tracking-tight md:text-6xl lg:text-7xl">
        STOP <span className="text-orange-500">FUCKING</span> AROUND.
        <br />
        JUST <span className="text-orange-500">USE CLOUDFLARE</span>.
      </h2>
      <p className="mb-12 font-mono text-lg text-neutral-400 md:text-xl">
        Your infrastructure is not a personality trait. Stop suffering. Start
        shipping. Sign up and never think about egress fees again.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          aria-label="Get started with Cloudflare for free"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-orange-500 bg-orange-500 px-10 py-5 font-bold font-mono text-black uppercase tracking-tight transition-all hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(246,130,31,0.4)] focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 active:bg-orange-600 sm:w-auto"
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
          className="inline-flex w-full items-center justify-center rounded-full border-2 border-neutral-700 bg-transparent px-8 py-5 font-bold font-mono text-white uppercase tracking-tight transition-all hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(246,130,31,0.2)] focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 active:border-orange-600 active:text-orange-600 sm:w-auto"
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
