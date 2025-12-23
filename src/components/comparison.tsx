import {
  Brain,
  Database,
  GitBranch,
  Globe,
  Link,
  Package,
  Zap,
} from "lucide-react";
import type React from "react";

const cards = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "CDN",
    vs: "CloudFront, Akamai, Fastly",
    desc: "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    free: "Global CDN included on every plan",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "D1 Database",
    vs: "PlanetScale, Supabase, Neon",
    desc: "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    free: "5M reads/day FREE",
  },
  {
    icon: <Link className="h-6 w-6" />,
    title: "Registrar",
    vs: "GoDaddy scams",
    desc: "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "R2 Storage",
    vs: "S3, GCS, Azure Blob",
    desc: "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    free: "10GB storage FREE • $0 egress FOREVER",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Queues",
    vs: "SQS, SNS, RabbitMQ",
    desc: "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    free: "Zero egress fees • At-least-once delivery",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Pages",
    vs: "Vercel, Netlify",
    desc: "Unlimited bandwidth. Real previews. Git integration. Just works.",
    free: "Unlimited sites FREE",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Workers AI",
    vs: "OpenAI, Replicate",
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Workers",
    vs: "Lambda, Vercel Functions",
    desc: "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    free: "100k requests/day FREE",
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: "Workflows",
    vs: "Step Functions, Temporal",
    desc: "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    free: "Built into Workers platform",
  },
];

export const Comparison: React.FC = () => (
  <section className="border-neutral-800 border-b bg-neutral-950 px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-12 text-center font-anton text-3xl uppercase tracking-tight md:mb-20 md:text-5xl lg:text-6xl">
        STOP PAYING FOR THIS{" "}
        <span className="text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">
          BULLSHIT
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const isCdnCard = card.title === "CDN";

          return (
            <article
              className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(246,130,31,0.1)] md:p-8"
              key={card.title}
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-black">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-anton text-2xl uppercase tracking-wide transition-colors group-hover:text-orange-400">
                    {card.title}
                  </h3>
                  <p className="mt-1 font-mono text-neutral-500 text-xs uppercase">
                    vs. {card.vs}
                  </p>
                </div>
              </div>
              <p
                className={
                  isCdnCard
                    ? "mb-6 min-h-[60px] text-neutral-400 text-xs leading-snug md:h-16 md:text-sm"
                    : "mb-6 min-h-[80px] text-neutral-400 text-sm leading-relaxed md:h-20 md:text-base"
                }
              >
                {card.desc}
              </p>
              <div className="border-neutral-800 border-t pt-6">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 font-bold font-mono text-orange-500 text-xs uppercase tracking-tighter">
                  {card.free}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
