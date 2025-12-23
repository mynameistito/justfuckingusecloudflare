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
  "Real preview deployments",
  "Git integration that just works",
  "Wholesale domain pricing",
  "Free SSL certificates",
  "DDoS protection included",
];

export const Features: React.FC = () => (
  <section className="border-neutral-800 border-b bg-neutral-900 px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-4 text-center font-anton text-3xl text-white uppercase tracking-tight md:text-5xl lg:text-6xl">
        One platform. Everything you need.
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-4 transition-all hover:border-orange-500/50 hover:bg-neutral-900"
            key={feature}
          >
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-orange-500" />
            <span className="font-mono text-neutral-300 text-sm">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
