import {
  Button,
  LayerCard,
  Link,
  LinkButton,
  Select,
  Tabs,
  Text,
} from "@cloudflare/kumo";
import {
  CheckCircleIcon,
  GlobeHemisphereWestIcon,
  LightningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { useMarketingMotion } from "../hooks/use-marketing-motion";
import { usePersonalization } from "../hooks/use-personalization";
import { MarketingGlobe } from "./marketing-globe";

const products = [
  [
    "CDN",
    "CloudFront, Akamai, Fastly",
    "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    "Global CDN included on every plan",
    "https://www.cloudflare.com/application-services/products/cdn/",
  ],
  [
    "D1 Database",
    "PlanetScale, Supabase, Neon",
    "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    "5M reads/day free",
    "https://www.cloudflare.com/developer-platform/products/d1/",
  ],
  [
    "Registrar",
    "GoDaddy scams",
    "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    "No bullshit pricing",
    "https://domains.cloudflare.com",
  ],
  [
    "R2 Storage",
    "S3, GCS, Azure Blob",
    "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    "10GB storage free · $0 egress forever",
    "https://www.cloudflare.com/developer-platform/products/r2/",
  ],
  [
    "Queues",
    "SQS, SNS, RabbitMQ",
    "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    "Zero egress fees · At-least-once delivery",
    "https://www.cloudflare.com/developer-platform/products/cloudflare-queues/",
  ],
  [
    "Pages",
    "Vercel, Netlify",
    "Unlimited bandwidth. Real previews. Git integration. Just works.",
    "Unlimited sites free",
    "https://www.cloudflare.com/developer-platform/products/pages/",
  ],
  [
    "Workers AI",
    "OpenAI, Replicate",
    "Run LLMs at the edge. No infra. No GPUs to manage.",
    "10k neurons/day free",
    "https://www.cloudflare.com/developer-platform/products/workers-ai/",
  ],
  [
    "Workers",
    "Lambda, Vercel Functions",
    "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    "100k requests/day free",
    "https://www.cloudflare.com/developer-platform/products/workers/",
  ],
  [
    "Workflows",
    "Step Functions, Temporal",
    "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    "Built into Workers platform",
    "https://www.cloudflare.com/developer-platform/products/workflows/",
  ],
] as const;

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
const featureArt = [
  "~ $ deploy",
  "● — ● — ●",
  "✓  Ready to ship",
  "◇  Secure by default",
];
const extraProducts = [
  ["KV", "workers-kv"],
  ["Durable Objects", "durable-objects"],
  ["Vectorize", "vectorize"],
] as const;

const categories = [
  {
    label: "Compute",
    names: ["Workers", "Queues", "Workflows"],
    value: "compute",
  },
  {
    label: "Data",
    names: ["D1 Database", "R2 Storage", "Workers AI"],
    value: "data",
  },
  { label: "Web", names: ["CDN", "Registrar", "Pages"], value: "web" },
];
const stories = [
  {
    detail:
      "Workers and Pages bring your code and frontend together, with Git integration and real preview deployments.",
    label: "Build",
    title: "Build and deploy without the infrastructure circus.",
    value: "build",
  },
  {
    detail:
      "Use D1 for SQLite at the edge and R2 for object storage without egress fees.",
    label: "Store",
    title: "Keep your data close to your code.",
    value: "data",
  },
  {
    detail:
      "Queues and Workflows connect your services and keep long-running tasks moving.",
    label: "Connect",
    title: "Let the platform handle the moving parts.",
    value: "connect",
  },
];

const CategoryPicker: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  panelId: string;
}> = ({ value, onChange, options, label, panelId }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Kumo's compact Tabs API does not yet expose tab-list ARIA props.
    const list = pickerRef.current?.querySelector('[role="tablist"]');
    list?.setAttribute("aria-label", label);
    for (const tab of pickerRef.current?.querySelectorAll('[role="tab"]') ??
      []) {
      tab.setAttribute("aria-controls", panelId);
    }
  }, [label, panelId]);
  return (
    <div className="category-picker" ref={pickerRef}>
      <div className="desktop-picker">
        <Tabs tabs={options} value={value} onValueChange={onChange} />
      </div>
      <div className="mobile-picker">
        <Select
          aria-label={label}
          items={options}
          value={value}
          onValueChange={(next) => {
            if (next) {
              onChange(next);
            }
          }}
        />
      </div>
    </div>
  );
};

/** Main landing page sections and the original product comparisons. */
export const Marketing: React.FC = () => {
  const { to, from } = usePersonalization();
  const [category, setCategory] = useState("compute");
  const [story, setStory] = useState("build");
  const selectedStory =
    stories.find((item) => item.value === story) ?? stories[0];
  const selectedCategory =
    categories.find((item) => item.value === category) ?? categories[0];
  const selectedNames = new Set(selectedCategory.names);
  const {
    rootRef,
    videoRef,
    motionAllowed,
    playing,
    setPlaying,
    videoReady,
    motionRunning,
    globeVisible,
  } = useMarketingMotion();
  return (
    <div ref={rootRef} data-motion-running={motionRunning}>
      <section className="shell hero" data-motion-region>
        {/* Background footage and poster: Cloudflare homepage, https://www.cloudflare.com/ */}
        <video
          ref={videoRef}
          className="hero-video"
          poster="/cloudflare-hero-poster.avif"
          src={videoReady ? "/cloudflare-hero.mp4" : undefined}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          {from && (
            <Text>
              Hey {to || "there"}, if {from} sent you this link, you need to:
            </Text>
          )}
          <Text as="h1">
            Just fucking use Cloudflare{to ? `, ${to}` : ", you degenerate"}.
          </Text>
          <Text>
            Stop paying seventeen different bills for your shitty todo app. Stop
            pretending you’re an infra genius when you’re just bleeding money.
          </Text>
          <LinkButton
            href="https://dash.cloudflare.com/sign-up"
            variant="secondary"
          >
            Start building for free
          </LinkButton>
        </div>
        {motionAllowed && (
          <Button
            className="motion-toggle"
            variant="secondary"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? "Pause animations" : "Play animations"}
          </Button>
        )}
      </section>
      <section
        className="section platform-section"
        id="platform"
        data-motion-region
      >
        <div className="section-title">
          <Text as="h2">Region: Earth</Text>
          <Text variant="secondary">
            One network for your apps, data, and all the shit in between.
          </Text>
        </div>
        <MarketingGlobe autoRotate={motionRunning && globeVisible} />
        <div className="stats-grid">
          <LayerCard className="stat">
            <GlobeHemisphereWestIcon size={22} />
            <Text as="h3">Run everywhere</Text>
            <Text variant="secondary">
              A global network close to your users, wherever the hell they are.
            </Text>
          </LayerCard>
          <LayerCard className="stat">
            <LightningIcon size={22} />
            <Text as="h3">Build anything</Text>
            <Text variant="secondary">
              Compute, storage, databases, AI, and more on one platform.
            </Text>
          </LayerCard>
          <LayerCard className="stat">
            <ShieldCheckIcon size={22} />
            <Text as="h3">Secure by default</Text>
            <Text variant="secondary">
              DDoS protection, SSL, performance, and Zero Trust included.
            </Text>
          </LayerCard>
        </div>
      </section>
      <div className="content-grid">
        <section className="section" data-motion-region>
          <div className="section-title">
            <Text as="h2">Your stack could be this simple</Text>
            <Text variant="secondary">
              One platform for the things you actually need to build.
            </Text>
          </div>
          <div className="story-frame">
            <CategoryPicker
              value={story}
              onChange={setStory}
              options={stories}
              label="Choose a use case"
              panelId="use-case-panel"
            />
            <div
              className="story-content"
              aria-live="polite"
              id="use-case-panel"
              role="tabpanel"
              aria-label={selectedStory.label}
              tabIndex={0}
            >
              <div>
                <Text as="h3">{selectedStory.title}</Text>
                <Text>{selectedStory.detail}</Text>
              </div>
              <div className="story-diagram" aria-hidden="true">
                <span>Code</span>
                <span>Cloudflare</span>
                <span>Everywhere</span>
              </div>
            </div>
          </div>
          <div className="story-strip">
            <span>Workers</span>
            <span>Pages</span>
            <span>D1</span>
            <span>R2</span>
            <span>Queues</span>
            <span>Workflows</span>
          </div>
        </section>
        <section className="section" id="why" data-motion-region>
          <div className="section-title">
            <Text as="h2">
              {to ? `${to}, you're` : "You're"} fucking killing me here
            </Text>
            <Text variant="secondary">
              Your infrastructure shouldn’t be your full-time job.
            </Text>
          </div>
          <div className="versus-grid">
            <LayerCard className="versus incident-panel">
              <div className="incident-labels" aria-hidden="true">
                <span>Vercel</span>
                <span>Railway</span>
                <span>AWS S3</span>
                <span>PlanetScale</span>
                <span>Redis Labs</span>
                <span>Cloudinary</span>
              </div>
              <Text as="h3">Fighting infrastructure</Text>
              <Text>
                You’ve got Vercel for frontend, Railway for backend, AWS S3 for
                storage, PlanetScale for DB, Redis Labs for cache, and
                Cloudinary for images. You’re paying five different corporate
                overlords to keep your half-baked blog alive.
              </Text>
            </LayerCard>
            <LayerCard className="versus orange-panel">
              <Text as="h3">Shipping with Cloudflare</Text>
              <div className="shipping-status">
                <span aria-hidden="true" /> Ready to ship{" "}
                <span className="sr-only">(illustration)</span>
              </div>
              <Text>
                Meanwhile Cloudflare is begging you to use Workers, Pages, R2,
                D1, KV, Durable Objects, Queues, Workflows, AI, and Vectorize.
                All on one platform, one bill, and actually generous free tiers.
              </Text>
              <div className="extra-links">
                {extraProducts.map(([name, path]) => (
                  <Link
                    key={name}
                    href={`https://www.cloudflare.com/developer-platform/products/${path}/`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </LayerCard>
          </div>
        </section>
        <section className="section" id="comparison" data-motion-region>
          <div className="section-title">
            <Text as="h2">Stop paying for this bullshit</Text>
            <Text variant="secondary">
              The same jobs, without the multi-vendor circus.
            </Text>
          </div>
          <CategoryPicker
            value={category}
            onChange={setCategory}
            options={categories}
            label="Choose a product category"
            panelId="product-category-panel"
          />
          <div
            className="comparison-frame"
            id="product-category-panel"
            role="tabpanel"
            aria-label={selectedCategory.label}
            tabIndex={0}
          >
            <div className="comparison-intro">
              <div>
                <Text as="h3">{selectedCategory.label} on one platform</Text>
                <Text>Pick the tools you need and get back to building.</Text>
              </div>
              <div className="comparison-visual" aria-hidden="true">
                <span>Build</span>
                <span>Deploy</span>
                <span>Run everywhere</span>
              </div>
            </div>
            <div className="product-grid" aria-live="polite">
              {products
                .filter(([title]) => selectedNames.has(title))
                .map(([title, vs, description, free, url]) => (
                  <LayerCard className="product-card" key={title}>
                    <Text as="h3">{title}</Text>
                    <Text variant="secondary">vs. {vs}</Text>
                    <Text>{description}</Text>
                    <Text DANGEROUS_className="product-free">{free}</Text>
                    <Link href={url}>Explore {title} →</Link>
                  </LayerCard>
                ))}
            </div>
          </div>
        </section>
        <section className="section" data-motion-region>
          <div className="section-title">
            <Text as="h2">One platform. Everything you need.</Text>
            <Text variant="secondary">
              A lot less wiring things together. A lot more shipping.
            </Text>
          </div>
          <div className="feature-mosaic">
            {[
              features.slice(0, 4),
              features.slice(4, 7),
              features.slice(7, 11),
              features.slice(11),
            ].map((group, index) => (
              <LayerCard
                className={`feature-panel feature-panel-${index + 1}`}
                key={group[0]}
              >
                <div className="feature-art" aria-hidden="true">
                  {featureArt[index]}
                </div>
                <div className="feature-list">
                  {group.map((feature) => (
                    <div className="feature-point" key={feature}>
                      <CheckCircleIcon size={18} />
                      <Text>{feature}</Text>
                    </div>
                  ))}
                </div>
              </LayerCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

/** Final call to action. */
export const FinalCta: React.FC = () => (
  <section className="shell final-cta">
    <Text as="h2">
      Stop fucking around.
      <br />
      Just use Cloudflare.
    </Text>
    <Text>
      Your infrastructure is not a personality trait. Stop suffering. Start
      shipping. Sign up and never think about egress fees again.
    </Text>
    <div className="cta-actions">
      <LinkButton
        href="https://dash.cloudflare.com/sign-up"
        variant="secondary"
      >
        Fucking do it already
      </LinkButton>
      <LinkButton href="https://developers.cloudflare.com" variant="secondary">
        Fine, read the docs first
      </LinkButton>
    </div>
    <div className="benefits-strip">
      <span>Zero cold starts. Ever.</span>
      <span>No egress fees on R2 storage</span>
      <span>Real preview deployments</span>
      <span>DDoS protection included</span>
    </div>
  </section>
);
