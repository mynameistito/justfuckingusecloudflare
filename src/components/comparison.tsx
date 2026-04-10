import { Badge, cn, Surface } from "@cloudflare/kumo";
import {
  Brain,
  CloudLightning,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Lightning,
  Link,
  Package,
} from "@phosphor-icons/react";
import type React from "react";

const cards = [
  {
    icon: <Globe className="h-6 w-6" weight="bold" />,
    title: "CDN",
    vs: "CloudFront, Akamai, Fastly",
    desc: "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    free: "Global CDN included on every plan",
  },
  {
    icon: <Database className="h-6 w-6" weight="bold" />,
    title: "D1 Database",
    vs: "PlanetScale, Supabase, Neon",
    desc: "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    free: "5M reads/day FREE",
  },
  {
    icon: <Link className="h-6 w-6" weight="bold" />,
    title: "Registrar",
    vs: "GoDaddy scams",
    desc: "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
  },
  {
    icon: <Package className="h-6 w-6" weight="bold" />,
    title: "R2 Storage",
    vs: "S3, GCS, Azure Blob",
    desc: "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    free: "10GB storage FREE · $0 egress FOREVER",
  },
  {
    icon: <CloudLightning className="h-6 w-6" weight="bold" />,
    title: "Queues",
    vs: "SQS, SNS, RabbitMQ",
    desc: "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    free: "Zero egress fees · At-least-once delivery",
  },
  {
    icon: <Gauge className="h-6 w-6" weight="bold" />,
    title: "Pages",
    vs: "Vercel, Netlify",
    desc: "Unlimited bandwidth. Real previews. Git integration. Just works.",
    free: "Unlimited sites FREE",
  },
  {
    icon: <Brain className="h-6 w-6" weight="bold" />,
    title: "Workers AI",
    vs: "OpenAI, Replicate",
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
  },
  {
    icon: <Lightning className="h-6 w-6" weight="bold" />,
    title: "Workers",
    vs: "Lambda, Vercel Functions",
    desc: "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    free: "100k requests/day FREE",
  },
  {
    icon: <GitBranch className="h-6 w-6" weight="bold" />,
    title: "Workflows",
    vs: "Step Functions, Temporal",
    desc: "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    free: "Built into Workers platform",
  },
];

export const Comparison: React.FC = () => (
  <section className="border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-12 text-center font-anton text-3xl text-kumo-default uppercase tracking-tight md:mb-20 md:text-5xl lg:text-6xl">
        STOP PAYING FOR THIS{" "}
        <span className="text-kumo-brand underline decoration-8 decoration-kumo-brand/20 underline-offset-8">
          BULLSHIT
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const isCdnCard = card.title === "CDN";

          return (
            <Surface
              className={cn(
                "group rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,130,31,0.1)] hover:ring-kumo-brand/50 md:p-8"
              )}
              key={card.title}
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-xl bg-kumo-brand/10 p-3 text-kumo-brand transition-colors group-hover:bg-kumo-brand group-hover:text-kumo-canvas">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-anton text-2xl text-kumo-default uppercase tracking-wide transition-colors group-hover:text-kumo-brand">
                    {card.title}
                  </h3>
                  <p className="mt-1 font-mono text-kumo-subtle text-xs uppercase">
                    vs. {card.vs}
                  </p>
                </div>
              </div>
              <p
                className={
                  isCdnCard
                    ? "mb-6 min-h-[60px] text-kumo-subtle text-xs leading-snug md:h-16 md:text-sm"
                    : "mb-6 min-h-[80px] text-kumo-subtle text-sm leading-relaxed md:h-20 md:text-base"
                }
              >
                {card.desc}
              </p>
              <div className="border-kumo-line border-t pt-6">
                <Badge variant="orange">{card.free}</Badge>
              </div>
            </Surface>
          );
        })}
      </div>
    </div>
  </section>
);
