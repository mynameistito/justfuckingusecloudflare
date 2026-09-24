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
    desc: "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    free: "Global CDN included on every plan",
    icon: <Globe className="h-6 w-6" />,
    title: "CDN",
    url: "https://www.cloudflare.com/application-services/products/cdn/",
    vs: "CloudFront, Akamai, Fastly",
  },
  {
    desc: "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    free: "5M reads/day FREE",
    icon: <Database className="h-6 w-6" />,
    title: "D1 Database",
    url: "https://www.cloudflare.com/developer-platform/products/d1/",
    vs: "PlanetScale, Supabase, Neon",
  },
  {
    desc: "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
    icon: <Link className="h-6 w-6" />,
    title: "Registrar",
    url: "https://domains.cloudflare.com",
    vs: "GoDaddy scams",
  },
  {
    desc: "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    free: "10GB storage FREE • $0 egress FOREVER",
    icon: <Package className="h-6 w-6" />,
    title: "R2 Storage",
    url: "https://www.cloudflare.com/developer-platform/products/r2/",
    vs: "S3, GCS, Azure Blob",
  },
  {
    desc: "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    free: "Zero egress fees • At-least-once delivery",
    icon: <Zap className="h-6 w-6" />,
    title: "Queues",
    url: "https://www.cloudflare.com/developer-platform/products/cloudflare-queues/",
    vs: "SQS, SNS, RabbitMQ",
  },
  {
    desc: "Unlimited bandwidth. Real previews. Git integration. Just works.",
    free: "Unlimited sites FREE",
    icon: <Globe className="h-6 w-6" />,
    title: "Pages",
    url: "https://www.cloudflare.com/developer-platform/products/pages/",
    vs: "Vercel, Netlify",
  },
  {
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
    icon: <Brain className="h-6 w-6" />,
    title: "Workers AI",
    url: "https://www.cloudflare.com/developer-platform/products/workers-ai/",
    vs: "OpenAI, Replicate",
  },
  {
    desc: "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    free: "100k requests/day FREE",
    icon: <Zap className="h-6 w-6" />,
    title: "Workers",
    url: "https://www.cloudflare.com/developer-platform/products/workers/",
    vs: "Lambda, Vercel Functions",
  },
  {
    desc: "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    free: "Built into Workers platform",
    icon: <GitBranch className="h-6 w-6" />,
    title: "Workflows",
    url: "https://www.cloudflare.com/developer-platform/products/workflows/",
    vs: "Step Functions, Temporal",
  },
];

export const Comparison: React.FC = () => (
  <section className="border-line bg-surface border-b px-6 py-24 md:py-32">
    <div className="mx-auto max-w-7xl">
      <h2 className="font-anton mb-12 text-center text-3xl tracking-tight uppercase md:mb-20 md:text-5xl lg:text-6xl">
        STOP PAYING FOR THIS{" "}
        <span className="text-brand decoration-brand/20 underline decoration-8 underline-offset-8">
          BULLSHIT
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const isCdnCard = card.title === "CDN";

          return (
            <a
              aria-label={`Open Cloudflare ${card.title} product page`}
              href={card.url}
              key={card.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <article className="group border-line bg-surface-raised hover:border-brand/50 transition-card rounded-2xl border p-6 transition-colors duration-300 hover:shadow-lg md:p-8">
                <div className="mb-6 flex items-start gap-4">
                  <div className="bg-brand/10 text-brand group-hover:bg-brand rounded-xl p-3 transition-colors group-hover:text-black">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-anton group-hover:text-brand-light text-2xl tracking-wide uppercase transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-muted mt-1 font-mono text-xs uppercase">
                      vs. {card.vs}
                    </p>
                  </div>
                </div>
                <p
                  className={
                    isCdnCard
                      ? "text-muted-foreground mb-6 min-h-[60px] text-xs leading-snug md:h-16 md:text-sm"
                      : "text-muted-foreground mb-6 min-h-[80px] text-sm leading-relaxed md:h-20 md:text-base"
                  }
                >
                  {card.desc}
                </p>
                <div className="border-line border-t pt-6">
                  <span className="border-brand/20 bg-brand/5 text-brand rounded-full border px-3 py-1 font-mono text-xs font-bold tracking-tighter uppercase">
                    {card.free}
                  </span>
                </div>
              </article>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);
