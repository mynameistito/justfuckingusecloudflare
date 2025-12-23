import type React from "react";

export const Hero: React.FC = () => (
  <section className="relative overflow-hidden border-neutral-800 border-b bg-linear-to-b from-neutral-950 to-neutral-900 px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl text-center">
      <p className="mb-4 font-mono text-2xl text-orange-500 uppercase tracking-[0.4em] md:text-3xl lg:text-4xl">
        JUST
      </p>
      <h1 className="mb-6 font-anton text-5xl text-white uppercase tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
        <span className="block">FUCKING</span>
        <span className="block text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">
          USE
        </span>
        <span className="block">CLOUDFLARE</span>
        <span className="block">YOU DEGENERATE</span>
      </h1>
      <p className="mx-auto mb-8 max-w-2xl font-mono text-base text-neutral-400 md:text-lg lg:text-xl">
        Stop paying{" "}
        <strong className="text-orange-500">SEVENTEEN DIFFERENT BILLS</strong>{" "}
        for your shitty todo app. Stop pretending you're an infra genius when
        you're just <strong className="text-orange-500">bleeding money</strong>.
      </p>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg
        aria-label="Scroll down"
        className="h-8 w-8 text-orange-500 md:h-10 md:w-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Scroll down</title>
        <path
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </div>
  </section>
);
