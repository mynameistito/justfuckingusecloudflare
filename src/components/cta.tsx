import { Button } from "@cloudflare/kumo";
import { ArrowRightIcon, BookOpenIcon } from "@phosphor-icons/react";
import type React from "react";

export const CTA: React.FC = () => (
  <section className="relative overflow-hidden border-kumo-line border-b bg-gradient-to-b from-kumo-elevated to-kumo-canvas px-6 py-24 md:py-32">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(246,130,31,0.10) 0%, transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-4xl text-center">
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
        <Button
          icon={ArrowRightIcon}
          onClick={() =>
            window.open(
              "https://dash.cloudflare.com/sign-up",
              "_blank",
              "noopener,noreferrer"
            )
          }
          size="lg"
          variant="primary"
        >
          FUCKING DO IT ALREADY
        </Button>
        <Button
          icon={BookOpenIcon}
          onClick={() =>
            window.open(
              "https://developers.cloudflare.com",
              "_blank",
              "noopener,noreferrer"
            )
          }
          size="lg"
          variant="secondary"
        >
          FINE, READ THE DOCS FIRST
        </Button>
      </div>
    </div>
  </section>
);
