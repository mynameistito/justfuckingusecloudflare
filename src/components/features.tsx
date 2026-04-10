import { Badge, Tabs, Text } from "@cloudflare/kumo";
import type React from "react";
import { useState } from "react";

type Tab = "compute" | "storage" | "network" | "developer";

const tabConfig: { value: Tab; label: string }[] = [
  { value: "compute", label: "Compute" },
  { value: "storage", label: "Storage" },
  { value: "network", label: "Network" },
  { value: "developer", label: "Developer" },
];

const features: Record<Tab, { label: string; detail: string }[]> = {
  compute: [
    { label: "Workers", detail: "0ms cold starts at 300+ edge locations" },
    { label: "Pages", detail: "Unlimited bandwidth, real preview deploys" },
    {
      label: "Workflows",
      detail: "Durable execution that auto-resumes on failure",
    },
    { label: "Workers AI", detail: "Run LLMs at the edge — no GPUs, no infra" },
    {
      label: "Durable Objects",
      detail: "Stateful coordination with global consistency",
    },
  ],
  storage: [
    {
      label: "R2",
      detail: "S3-compatible storage — zero egress fees, forever",
    },
    { label: "D1", detail: "SQLite at the edge with read replication" },
    {
      label: "KV",
      detail: "Global key-value store with sub-millisecond reads",
    },
    { label: "Queues", detail: "At-least-once delivery, zero egress" },
    {
      label: "Vectorize",
      detail: "Vector database for AI embeddings at the edge",
    },
  ],
  network: [
    { label: "CDN", detail: "Global anycast with smart caching built in" },
    { label: "DDoS Protection", detail: "Included on every plan, always on" },
    {
      label: "Free SSL",
      detail: "Automatic certificate provisioning and renewal",
    },
    { label: "Zero Trust", detail: "Security without the VPN tax" },
    {
      label: "Load Balancing",
      detail: "Global traffic management across origins",
    },
  ],
  developer: [
    {
      label: "Git Integration",
      detail: "Connects to your repo and just works",
    },
    {
      label: "Preview Deployments",
      detail: "Real previews per branch, not fake ones",
    },
    { label: "One Dashboard", detail: "Everything in one place, one login" },
    { label: "One Bill", detail: "Not seventeen separate invoices" },
    {
      label: "Wholesale Domains",
      detail: "Registrar pricing with no renewal traps",
    },
  ],
};

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("compute");

  return (
    <section className="relative overflow-hidden border-kumo-line border-b bg-kumo-elevated px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(246,130,31,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        <h2 className="mb-4 text-center font-anton text-3xl text-kumo-default uppercase tracking-tight md:text-5xl lg:text-6xl">
          One platform. <span className="text-kumo-brand">Everything</span> you
          need.
        </h2>
        <p className="mb-10 text-center font-mono text-kumo-inactive text-sm uppercase tracking-widest">
          One bill. One dashboard. Zero excuses.
        </p>

        <Tabs
          onValueChange={(v) => setActiveTab(v as Tab)}
          tabs={tabConfig}
          value={activeTab}
          variant="underline"
        />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features[activeTab].map((f) => (
            <div
              className="flex flex-col gap-1 rounded-xl border border-kumo-line bg-kumo-canvas p-4"
              key={f.label}
            >
              <Badge variant="orange">{f.label}</Badge>
              <Text color="subtle" size="sm">
                {f.detail}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
