import type React from "react";
import { usePersonalization } from "../hooks/use-personalization";

export const Rant: React.FC = () => {
  const { to } = usePersonalization();

  return (
    <section className="border-neutral-800 border-b bg-neutral-950 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 font-anton text-4xl text-white uppercase tracking-tight md:text-5xl lg:text-6xl">
          {to ? (
            <>
              <span className="text-orange-500">{to.toUpperCase()}</span>,
              YOU'RE <span className="text-orange-500">FUCKING</span> KILLING ME
              HERE
            </>
          ) : (
            <>
              YOU'RE <span className="text-orange-500">FUCKING</span> KILLING ME
              HERE
            </>
          )}
        </h2>
        <div className="space-y-6 font-mono text-base text-neutral-300 leading-relaxed md:text-lg">
          <p>
            {to ? `${to}, y` : "Y"}ou've got Vercel for frontend, Railway for
            backend, AWS S3 for storage, PlanetScale for DB, Redis Labs for
            cache, Cloudinary for images, and you're paying{" "}
            <strong className="text-white">
              FIVE DIFFERENT CORPORATE OVERLORDS
            </strong>{" "}
            to keep your half-baked blog alive.
          </p>
          <p>
            Meanwhile Cloudflare is literally{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              BEGGING
            </span>{" "}
            you to use their{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Workers
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Pages
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              R2
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              D1
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              KV
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Durable Objects
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Queues
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Workflows
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              AI
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text font-bold text-transparent">
              Vectorize
            </span>{" "}
            — ALL ON ONE PLATFORM, ONE BILL, AND{" "}
            <strong className="text-white">ACTUALLY GENEROUS FREE TIERS</strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
