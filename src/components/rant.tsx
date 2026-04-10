import { Banner, Surface, Text } from "@cloudflare/kumo";
import { WarningIcon } from "@phosphor-icons/react";
import type React from "react";
import { usePersonalization } from "../hooks/use-personalization";

export const Rant: React.FC = () => {
  const { to } = usePersonalization();

  return (
    <section className="border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 font-anton text-4xl text-kumo-default uppercase tracking-tight md:text-5xl lg:text-6xl">
          {to ? (
            <>
              <span className="text-kumo-brand">{to.toUpperCase()}</span>,
              YOU'RE <span className="text-kumo-brand">FUCKING</span> KILLING ME
              HERE
            </>
          ) : (
            <>
              YOU'RE <span className="text-kumo-brand">FUCKING</span> KILLING ME
              HERE
            </>
          )}
        </h2>

        <div className="mb-8">
          <Banner
            description={`${to ? `${to}, you've` : "You've"} got Vercel for frontend, Railway for backend, AWS S3 for storage, PlanetScale for DB, Redis Labs for cache, Cloudinary for images — and you're paying FIVE DIFFERENT CORPORATE OVERLORDS to keep your half-baked blog alive.`}
            icon={<WarningIcon weight="fill" />}
            title="You're burning money"
            variant="alert"
          />
        </div>

        <Surface className="rounded-xl p-6 md:p-8">
          <Text size="base">
            Meanwhile Cloudflare is literally{" "}
            <span className="font-bold text-kumo-brand">BEGGING</span> you to
            use their <span className="font-bold text-kumo-brand">Workers</span>
            , <span className="font-bold text-kumo-brand">Pages</span>,{" "}
            <span className="font-bold text-kumo-brand">R2</span>,{" "}
            <span className="font-bold text-kumo-brand">D1</span>,{" "}
            <span className="font-bold text-kumo-brand">KV</span>,{" "}
            <span className="font-bold text-kumo-brand">Durable Objects</span>,{" "}
            <span className="font-bold text-kumo-brand">Queues</span>,{" "}
            <span className="font-bold text-kumo-brand">Workflows</span>,{" "}
            <span className="font-bold text-kumo-brand">AI</span>,{" "}
            <span className="font-bold text-kumo-brand">Vectorize</span> — ALL
            ON ONE PLATFORM, ONE BILL, AND{" "}
            <strong>ACTUALLY GENEROUS FREE TIERS</strong>.
          </Text>
        </Surface>
      </div>
    </section>
  );
};
