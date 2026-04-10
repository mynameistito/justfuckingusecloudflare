import { cn } from "@cloudflare/kumo";
import type React from "react";
import { usePersonalization } from "../hooks/use-personalization";

export const Hero: React.FC = () => {
  const { to, from } = usePersonalization();

  return (
    <section className="relative min-h-screen overflow-hidden border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl text-center">
        {from && (
          <p className="mb-6 font-mono text-kumo-default text-lg md:text-xl">
            Hey there, if{" "}
            <span className="font-bold text-kumo-brand">{from}</span> sent you
            this link, you need to:{" "}
          </p>
        )}
        <p className="mb-4 font-mono text-2xl text-kumo-brand uppercase tracking-[0.4em] md:text-3xl lg:text-4xl">
          JUST
        </p>
        <h1 className="mb-6 font-anton text-5xl text-kumo-default uppercase tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
          <span className="block">FUCKING</span>
          <span className="block text-kumo-brand underline decoration-8 decoration-kumo-brand/20 underline-offset-8">
            USE
          </span>
          <span className="block">CLOUDFLARE</span>
          <span className="block">
            {to ? `${to.toUpperCase()}` : "YOU DEGENERATE"}
          </span>
        </h1>
        <p
          className={cn(
            "mx-auto mb-8 max-w-2xl font-mono text-base text-kumo-subtle md:text-lg lg:text-xl"
          )}
        >
          Stop paying{" "}
          <strong className="text-kumo-brand">SEVENTEEN DIFFERENT BILLS</strong>{" "}
          for your shitty todo app. Stop pretending you're an infra genius when
          you're just{" "}
          <strong className="text-kumo-brand">bleeding money</strong>.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          aria-label="Scroll down"
          className="h-8 w-8 text-kumo-brand md:h-10 md:w-10"
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
