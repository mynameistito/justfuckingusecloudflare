import { Button } from "@cloudflare/kumo";
import { CaretDownIcon } from "@phosphor-icons/react";
import type React from "react";
import { usePersonalization } from "../hooks/use-personalization";

export const Hero: React.FC = () => {
  const { to, from } = usePersonalization();

  const scrollToContent = () => {
    const el = document.getElementById("comparison");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32">
      {/* Orange radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(246,130,31,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,130,31,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(246,130,31,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative mx-auto max-w-7xl text-center">
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
        <p className="mx-auto mb-10 max-w-2xl font-mono text-base text-kumo-subtle md:text-lg lg:text-xl">
          Stop paying{" "}
          <strong className="text-kumo-brand">SEVENTEEN DIFFERENT BILLS</strong>{" "}
          for your shitty todo app. Stop pretending you're an infra genius when
          you're just{" "}
          <strong className="text-kumo-brand">bleeding money</strong>.
        </p>
        <div className="flex justify-center">
          <Button
            icon={CaretDownIcon}
            onClick={scrollToContent}
            size="lg"
            variant="primary"
          >
            SHOW ME THE RECEIPTS
          </Button>
        </div>
      </div>
    </section>
  );
};
