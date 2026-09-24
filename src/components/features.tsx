import { CheckCircle2 } from "lucide-react";
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
  <section className="border-line bg-surface-raised border-b px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="font-anton mb-4 text-center text-3xl tracking-tight text-white uppercase md:text-5xl lg:text-6xl">
        One platform. Everything you need.
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            className="border-line bg-surface hover:border-brand/50 hover:bg-surface-raised flex items-center gap-3 rounded-xl border p-4 transition-colors"
            key={feature}
          >
            <CheckCircle2 className="text-brand h-5 w-5 flex-shrink-0" />
            <span className="text-foreground-soft font-mono text-sm">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
