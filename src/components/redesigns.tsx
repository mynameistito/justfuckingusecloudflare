import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Database,
  GitBranch,
  Globe,
  Link as LinkIcon,
  Package,
  Zap,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

import {
  normalizeName,
  usePersonalization,
} from "../hooks/use-personalization";

gsap.registerPlugin(ScrollTrigger);

const productCards = [
  {
    desc: "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    free: "Global CDN included on every plan",
    icon: Globe,
    title: "CDN",
    url: "https://www.cloudflare.com/application-services/products/cdn/",
    vs: "CloudFront, Akamai, Fastly",
  },
  {
    desc: "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    free: "5M reads/day FREE",
    icon: Database,
    title: "D1 Database",
    url: "https://www.cloudflare.com/developer-platform/products/d1/",
    vs: "PlanetScale, Supabase, Neon",
  },
  {
    desc: "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
    icon: LinkIcon,
    title: "Registrar",
    url: "https://domains.cloudflare.com",
    vs: "GoDaddy scams",
  },
  {
    desc: "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    free: "10GB storage FREE - $0 egress FOREVER",
    icon: Package,
    title: "R2 Storage",
    url: "https://www.cloudflare.com/developer-platform/products/r2/",
    vs: "S3, GCS, Azure Blob",
  },
  {
    desc: "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    free: "Zero egress fees - At-least-once delivery",
    icon: Zap,
    title: "Queues",
    url: "https://www.cloudflare.com/developer-platform/products/cloudflare-queues/",
    vs: "SQS, SNS, RabbitMQ",
  },
  {
    desc: "Unlimited bandwidth. Real previews. Git integration. Just works.",
    free: "Unlimited sites FREE",
    icon: Globe,
    title: "Pages",
    url: "https://www.cloudflare.com/developer-platform/products/pages/",
    vs: "Vercel, Netlify",
  },
  {
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
    icon: Brain,
    title: "Workers AI",
    url: "https://www.cloudflare.com/developer-platform/products/workers-ai/",
    vs: "OpenAI, Replicate",
  },
  {
    desc: "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    free: "100k requests/day FREE",
    icon: Zap,
    title: "Workers",
    url: "https://www.cloudflare.com/developer-platform/products/workers/",
    vs: "Lambda, Vercel Functions",
  },
  {
    desc: "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    free: "Built into Workers platform",
    icon: GitBranch,
    title: "Workflows",
    url: "https://www.cloudflare.com/developer-platform/products/workflows/",
    vs: "Step Functions, Temporal",
  },
];

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

const navItems = ["Rant", "Stack", "Features", "Share"];
const marqueeCards = productCards.flatMap((card) => [
  { ...card, marqueeId: `${card.title}-first` },
  { ...card, marqueeId: `${card.title}-second` },
]);

type VariantId = "1" | "2" | "3";

interface RedesignPageProps {
  variant: VariantId;
}

const variantStyles = {
  "1": {
    accent: "text-orange-400",
    button: "bg-orange-400 text-black hover:bg-orange-300",
    card: "border-white/10 bg-white/[0.035] shadow-2xl shadow-orange-950/20 backdrop-blur-xl",
    glow: "from-orange-500/30 via-amber-500/10 to-transparent",
    heading: "mx-auto",
    heroAlign: "text-center",
    heroGrid: "mx-auto max-w-7xl",
    heroImage: "https://picsum.photos/seed/orange-edge-network/1920/1080",
    heroMedia: "absolute inset-x-4 top-24 bottom-8 md:inset-x-10",
    name: "Orbital Control Room",
    outline:
      "border-white/15 text-white hover:border-orange-400 hover:text-orange-300",
    root: "bg-[#050505] text-stone-50",
    stackTitle: "max-w-6xl",
  },
  "2": {
    accent: "text-cyan-200",
    button: "bg-cyan-200 text-slate-950 hover:bg-white",
    card: "border-cyan-200/10 bg-slate-950/70 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl",
    glow: "from-cyan-500/25 via-blue-500/10 to-transparent",
    heading: "",
    heroAlign: "text-left",
    heroGrid:
      "mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]",
    heroImage: "https://picsum.photos/seed/blue-edge-grid/1920/1080",
    heroMedia: "relative min-h-[340px] md:min-h-[620px]",
    name: "Midnight Network Map",
    outline:
      "border-cyan-100/20 text-cyan-50 hover:border-cyan-200 hover:text-cyan-100",
    root: "bg-[#020617] text-slate-50",
    stackTitle: "ml-auto max-w-5xl text-right",
  },
  "3": {
    accent: "text-rose-200",
    button: "bg-rose-100 text-[#100607] hover:bg-white",
    card: "border-rose-100/10 bg-black/40 shadow-2xl shadow-rose-950/30 backdrop-blur-xl",
    glow: "from-rose-500/25 via-orange-500/15 to-transparent",
    heading: "",
    heroAlign: "text-left",
    heroGrid: "mx-auto max-w-7xl",
    heroImage: "https://picsum.photos/seed/red-cloudflare-terminal/1920/1080",
    heroMedia: "absolute right-0 bottom-0 h-[72vh] w-[54vw] max-md:hidden",
    name: "Brutalist Infra Poster",
    outline:
      "border-rose-100/20 text-rose-50 hover:border-rose-100 hover:text-white",
    root: "bg-[#100607] text-rose-50",
    stackTitle: "max-w-7xl",
  },
} as const;

const getHeroLine = (to: string | null) =>
  `Just fucking use Cloudflare ${to ? to.toUpperCase() : "you degenerate"}`;

const RedesignNav: React.FC<{ variant: VariantId }> = ({ variant }) => {
  const style = variantStyles[variant];

  return (
    <nav className="fixed top-4 right-4 left-4 z-40 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] backdrop-blur-2xl md:top-6 md:px-6">
      <a className="font-bold text-white" href={`/${variant}`}>
        JFUCF/{variant}
      </a>
      <div className="hidden items-center gap-5 text-white/55 md:flex">
        {navItems.map((item) => (
          <a
            className="transition-colors hover:text-white"
            href={`#${item.toLowerCase()}`}
            key={item}
          >
            {item}
          </a>
        ))}
      </div>
      <a
        className={`rounded-full px-4 py-2 font-bold transition-colors ${style.button}`}
        href="https://dash.cloudflare.com/sign-up"
        rel="noopener noreferrer"
        target="_blank"
      >
        Sign up
      </a>
    </nav>
  );
};

const RedesignShare: React.FC<{ variant: VariantId }> = ({ variant }) => {
  const { to } = usePersonalization();
  const [theirName, setTheirName] = useState("");
  const [yourName, setYourName] = useState(to || "");
  const [copied, setCopied] = useState(false);
  const style = variantStyles[variant];
  const previewTheirName = normalizeName(theirName) ?? "";
  const previewYourName = normalizeName(yourName) ?? "";
  const isDisabled = !(theirName.trim() && yourName.trim());

  const handleCopyLink = async () => {
    if (isDisabled) {
      return;
    }

    const shareUrl = `${window.location.origin}/${variant}?from=${encodeURIComponent(
      yourName.trim()
    )}&to=${encodeURIComponent(theirName.trim())}`;

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="px-5 py-32 md:py-48" id="share">
      <div
        className={`mx-auto grid max-w-6xl gap-8 rounded-[2rem] border p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10 ${style.card}`}
      >
        <div>
          <h2 className="max-w-xl font-anton text-5xl uppercase leading-none tracking-tight md:text-7xl">
            Know someone who needs <span className={style.accent}>help</span>?
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/62">
            Share this link with them. They'll see a personalized version just
            for them.
          </p>
        </div>
        <div className="space-y-5">
          <label
            className="block font-mono text-sm text-white/60 uppercase tracking-[0.18em]"
            htmlFor={`your-name-${variant}`}
          >
            Your Name
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 focus:border-white/40 focus:outline-none"
            id={`your-name-${variant}`}
            onChange={(event) => {
              setYourName(event.target.value);
            }}
            placeholder="Enter your name"
            type="text"
            value={yourName}
          />
          <label
            className="block font-mono text-sm text-white/60 uppercase tracking-[0.18em]"
            htmlFor={`their-name-${variant}`}
          >
            Their Name
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 focus:border-white/40 focus:outline-none"
            id={`their-name-${variant}`}
            onChange={(event) => {
              setTheirName(event.target.value);
            }}
            placeholder="Enter their name"
            type="text"
            value={theirName}
          />
          {previewTheirName && previewYourName && (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white/60">
              They'll see:{" "}
              <span className={style.accent}>
                Hey {previewTheirName}, if {previewYourName} sent you this link,
                you need to...
              </span>
            </p>
          )}
          <button
            className={`w-full rounded-full px-8 py-5 font-bold font-mono uppercase tracking-tight transition-all disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 ${style.button}`}
            disabled={isDisabled}
            onClick={handleCopyLink}
            type="button"
          >
            {copied ? "Link copied!" : "Copy share link"}
          </button>
        </div>
      </div>
    </section>
  );
};

export const RedesignPage: React.FC<RedesignPageProps> = ({ variant }) => {
  const { to, from } = usePersonalization();
  const scope = useRef<HTMLElement>(null);
  const style = variantStyles[variant];

  useGSAP(
    () => {
      gsap.from(".reveal-word", {
        opacity: 0.14,
        scrollTrigger: {
          end: "bottom 45%",
          scrub: true,
          start: "top 78%",
          trigger: ".rant-copy",
        },
        stagger: 0.05,
        y: 18,
      });

      gsap.from(".stack-card", {
        opacity: 0,
        scale: 0.92,
        scrollTrigger: {
          end: "bottom 55%",
          scrub: true,
          start: "top 72%",
          trigger: ".stack-grid",
        },
        stagger: 0.12,
        y: 90,
      });
    },
    { scope }
  );

  const rantWords =
    `${to ? `${to}, y` : "Y"}ou've got Vercel for frontend, Railway for backend, AWS S3 for storage, PlanetScale for DB, Redis Labs for cache, Cloudinary for images, and you're paying FIVE DIFFERENT CORPORATE OVERLORDS to keep your half-baked blog alive.`.split(
      " "
    );
  const keyedRantWords = rantWords.map((word, index) => ({
    id: `${index}-${word}`,
    word,
  }));

  return (
    <main
      className={`w-full max-w-full overflow-x-hidden ${style.root}`}
      ref={scope}
    >
      <RedesignNav variant={variant} />
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-36 md:py-44">
        <div
          className={`absolute inset-0 bg-radial-[at_50%_0%] ${style.glow}`}
        />
        <div className={`relative ${style.heroGrid} ${style.heroAlign}`}>
          <div>
            {from && (
              <p className="mb-8 font-mono text-lg text-white/70">
                Hey there, if <span className={style.accent}>{from}</span> sent
                you this link, you need to:
              </p>
            )}
            <h1
              className={`max-w-7xl font-anton text-[clamp(4rem,10vw,10.5rem)] text-white uppercase leading-[0.82] tracking-[-0.07em] ${style.heading}`}
            >
              {getHeroLine(to)}
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-white/67 md:text-2xl">
              Stop paying{" "}
              <strong className={style.accent}>
                SEVENTEEN DIFFERENT BILLS
              </strong>{" "}
              for your shitty todo app. Stop pretending you're an infra genius
              when you're just{" "}
              <strong className={style.accent}>bleeding money</strong>.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className={`inline-flex items-center gap-3 rounded-full px-8 py-5 font-bold font-mono uppercase ${style.button}`}
                href="https://dash.cloudflare.com/sign-up"
                rel="noopener noreferrer"
                target="_blank"
              >
                Fucking do it already <ArrowRight className="h-5 w-5" />
              </a>
              <a
                className={`rounded-full border px-8 py-5 font-bold font-mono uppercase ${style.outline}`}
                href="https://developers.cloudflare.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Fine, read the docs first
              </a>
            </div>
          </div>
          <div
            className={`${style.heroMedia} rounded-[2rem] bg-center bg-cover opacity-30 mix-blend-luminosity contrast-125 grayscale`}
            style={{ backgroundImage: `url(${style.heroImage})` }}
          />
        </div>
      </section>

      <section className="px-5 py-32 md:py-48" id="rant">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <h2 className="sticky top-32 font-anton text-5xl text-white uppercase leading-none tracking-tight md:text-7xl">
            {to ? (
              <>
                <span className={style.accent}>{to.toUpperCase()}</span>, you're
                fucking killing me here
              </>
            ) : (
              <>
                You're <span className={style.accent}>fucking</span> killing me
                here
              </>
            )}
          </h2>
          <div
            className={`rant-copy rounded-[2rem] border p-6 text-2xl text-white/74 leading-relaxed md:p-10 md:text-4xl ${style.card}`}
          >
            {keyedRantWords.map(({ id, word }) => (
              <span className="reveal-word inline-block pr-2" key={id}>
                {word}
              </span>
            ))}
            <p className="mt-8 text-lg text-white/60 md:text-2xl">
              Meanwhile Cloudflare is literally{" "}
              <span className={style.accent}>BEGGING</span> you to use Workers,
              Pages, R2, D1, KV, Durable Objects, Queues, Workflows, AI,
              Vectorize - all on one platform, one bill, and actually generous
              free tiers.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-32 md:py-48" id="stack">
        <div className="mx-auto max-w-7xl">
          <h2
            className={`font-anton text-5xl uppercase leading-none tracking-tight md:text-8xl ${style.stackTitle}`}
          >
            Stop paying for this <span className={style.accent}>bullshit</span>
          </h2>
          <div className="stack-grid mt-14 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-12">
            {productCards.map((card, index) => {
              const Icon = card.icon;
              const span =
                index === 0 || index === 3 || index === 7
                  ? "md:col-span-6"
                  : "md:col-span-3";

              return (
                <a
                  className={`stack-card group overflow-hidden rounded-[2rem] border p-6 transition-transform duration-700 hover:-translate-y-2 ${span} ${style.card}`}
                  href={card.url}
                  key={card.title}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-white/35 text-xs uppercase tracking-[0.2em]">
                        vs. {card.vs}
                      </p>
                      <h3 className="mt-4 font-anton text-4xl text-white uppercase tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 transition-transform duration-700 group-hover:scale-110">
                      <Icon className={`h-6 w-6 ${style.accent}`} />
                    </div>
                  </div>
                  <p className="mt-8 text-white/60">{card.desc}</p>
                  <p
                    className={`mt-8 font-bold font-mono text-sm uppercase ${style.accent}`}
                  >
                    {card.free}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-32 md:py-48" id="features">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-anton text-5xl uppercase leading-none tracking-tight md:text-8xl">
            One platform. Everything you need.
          </h2>
          <div className="mt-12 grid grid-flow-dense grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {features.map((feature) => (
              <div
                className={`group flex min-h-28 items-center gap-3 overflow-hidden rounded-3xl border p-5 ${style.card}`}
                key={feature}
              >
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 transition-transform duration-700 group-hover:scale-125 ${style.accent}`}
                />
                <span className="font-mono text-sm text-white/70">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-6 font-anton text-6xl text-white/10 uppercase md:text-9xl">
          {marqueeCards.map((card) => (
            <span key={card.marqueeId}>{card.title}</span>
          ))}
        </div>
      </section>

      <section className="px-5 py-32 md:py-48">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-anton text-6xl uppercase leading-none tracking-tight md:text-9xl">
            Stop <span className={style.accent}>fucking</span> around. Just{" "}
            <span className={style.accent}>use Cloudflare</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-white/62 text-xl">
            Your infrastructure is not a personality trait. Stop suffering.
            Start shipping. Sign up and never think about egress fees again.
          </p>
        </div>
      </section>

      <RedesignShare variant={variant} />

      {from && (
        <section className="px-5 pb-24">
          <p className="mx-auto max-w-4xl text-center font-mono text-white/55 text-xl">
            Don't forget to fucking thank{" "}
            <span className={style.accent}>{from}</span> for sending you this
            link. They're looking out for you.
          </p>
        </section>
      )}

      <footer className="border-white/10 border-t px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 font-mono text-sm text-white/45 md:flex-row">
          <p>
            {style.name}. Not affiliated with Cloudflare. Just someone who loves
            their products.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-white" href="/privacy-policy">
              Privacy Policy
            </a>
            <a
              className="hover:text-white"
              href="https://blog.cloudflare.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Blog
            </a>
            <a
              className="hover:text-white"
              href="https://community.cloudflare.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Community
            </a>
            <a
              className="hover:text-white"
              href="https://mynameistito.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              mynameistito
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
