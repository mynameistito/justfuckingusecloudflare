import type React from "react";

import { usePersonalization } from "../hooks/use-personalization";

export const Hero: React.FC = () => {
  const { to, from } = usePersonalization();

  return (
    <section className="border-line from-surface to-surface-raised relative min-h-screen overflow-hidden border-b bg-linear-to-b px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl text-center">
        {from && (
          <p className="text-foreground-soft mb-6 font-mono text-lg md:text-xl">
            Hey there, if <span className="text-brand font-bold">{from}</span>{" "}
            sent you this link, you need to:{" "}
          </p>
        )}
        <p className="text-brand tracking-kicker mb-4 font-mono text-2xl uppercase md:text-3xl lg:text-4xl">
          JUST
        </p>
        <h1 className="font-anton mb-6 text-5xl tracking-tight text-white uppercase md:text-7xl lg:text-8xl xl:text-9xl">
          <span className="block">FUCKING</span>
          <span className="text-brand decoration-brand/20 block underline decoration-8 underline-offset-8">
            USE
          </span>
          <span className="block">CLOUDFLARE</span>
          <span className="block">
            {to ? `${to.toUpperCase()}` : "YOU DEGENERATE"}
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl font-mono text-base md:text-lg lg:text-xl">
          Stop paying{" "}
          <strong className="text-brand">SEVENTEEN DIFFERENT BILLS</strong> for
          your shitty todo app. Stop pretending you&apos;re an infra genius when
          you&apos;re just{" "}
          <strong className="text-brand">bleeding money</strong>.
        </p>
      </div>
      <div className="animate-soft-bounce absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg
          aria-label="Scroll down"
          className="text-brand h-8 w-8 md:h-10 md:w-10"
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
};
