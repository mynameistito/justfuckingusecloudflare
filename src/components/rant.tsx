import type React from "react";

import { usePersonalization } from "../hooks/use-personalization";

export const Rant: React.FC = () => {
  const { to } = usePersonalization();

  return (
    <section className="border-line bg-surface border-b px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-anton mb-8 text-4xl tracking-tight text-white uppercase md:text-5xl lg:text-6xl">
          {to ? (
            <>
              <span className="text-brand">{to.toUpperCase()}</span>,
              YOU&apos;RE <span className="text-brand">FUCKING</span> KILLING ME
              HERE
            </>
          ) : (
            <>
              YOU&apos;RE <span className="text-brand">FUCKING</span> KILLING ME
              HERE
            </>
          )}
        </h2>
        <div className="text-foreground-soft space-y-6 font-mono text-base leading-relaxed md:text-lg">
          <p>
            {to ? `${to}, y` : "Y"}ou&apos;ve got Vercel for frontend, Railway
            for backend, AWS S3 for storage, PlanetScale for DB, Redis Labs for
            cache, Cloudinary for images, and you&apos;re paying{" "}
            <strong className="text-white">
              FIVE DIFFERENT CORPORATE OVERLORDS
            </strong>{" "}
            to keep your half-baked blog alive.
          </p>
          <p>
            Meanwhile Cloudflare is literally{" "}
            <span className="from-brand to-brand-light bg-gradient-to-r bg-clip-text font-bold text-transparent">
              BEGGING
            </span>{" "}
            you to use their{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/workers/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Workers
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/pages/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pages
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/r2/"
              rel="noopener noreferrer"
              target="_blank"
            >
              R2
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/d1/"
              rel="noopener noreferrer"
              target="_blank"
            >
              D1
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/workers-kv/"
              rel="noopener noreferrer"
              target="_blank"
            >
              KV
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/durable-objects/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Durable Objects
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/cloudflare-queues/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Queues
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/workflows/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Workflows
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/workers-ai/"
              rel="noopener noreferrer"
              target="_blank"
            >
              AI
            </a>
            ,{" "}
            <a
              className="from-brand to-brand-light decoration-brand bg-gradient-to-r bg-clip-text font-bold text-transparent hover:underline"
              href="https://www.cloudflare.com/developer-platform/products/vectorize/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vectorize
            </a>{" "}
            — ALL ON ONE PLATFORM, ONE BILL, AND{" "}
            <strong className="text-white">ACTUALLY GENEROUS FREE TIERS</strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
