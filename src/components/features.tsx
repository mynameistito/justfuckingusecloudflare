import { Surface } from "@cloudflare/kumo";
import { CheckCircle } from "@phosphor-icons/react";
import type React from "react";

const features = [
  "Zero cold starts. Ever.",
  "300+ edge locations worldwide",
  "Free tier that's actually usable",
  "No egress fees on R2 storage",
  "SQLite at the edge with D1",
  "Unlimited bandwidth on Pages",
  "Workers AI at the edge",
  "Message queues with zero egress fees",
  "Durable workflows that auto-resume",
  "Real preview deployments",
  "Git integration that just works",
  "Wholesale domain pricing",
  "Free SSL certificates",
  "DDoS protection included",
  "Security, performance & Zero Trust",
];

export const Features: React.FC = () => (
  <section className="border-kumo-line border-b bg-kumo-elevated px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-4 text-center font-anton text-3xl text-kumo-default uppercase tracking-tight md:text-5xl lg:text-6xl">
        One platform. Everything you need.
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Surface
            className="flex items-center gap-3 rounded-xl p-4 transition-all hover:ring-kumo-brand/50"
            key={feature}
          >
            <CheckCircle
              className="h-5 w-5 shrink-0 text-kumo-brand"
              weight="fill"
            />
            <span className="font-mono text-kumo-subtle text-sm">
              {feature}
            </span>
          </Surface>
        ))}
      </div>
    </div>
  </section>
);
