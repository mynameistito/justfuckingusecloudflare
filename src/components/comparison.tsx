import { Badge, LayerCard, Table, Text } from "@cloudflare/kumo";
import {
  BrainIcon,
  CloudIcon,
  DatabaseIcon,
  GlobeIcon,
  HardDrivesIcon,
  LightningIcon,
  LinkIcon,
  ListBulletsIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import type React from "react";

const rows = [
  {
    icon: <GlobeIcon className="h-5 w-5" weight="bold" />,
    product: "CDN",
    replaces: "CloudFront, Akamai, Fastly",
    desc: "Global anycast CDN with DDoS protection and smart caching.",
    free: "Included on every plan",
    variant: "green" as const,
  },
  {
    icon: <DatabaseIcon className="h-5 w-5" weight="bold" />,
    product: "D1 Database",
    replaces: "PlanetScale, Supabase, Neon",
    desc: "Serverless SQLite with read replication at the edge.",
    free: "5M reads/day FREE",
    variant: "orange" as const,
  },
  {
    icon: <LinkIcon className="h-5 w-5" weight="bold" />,
    product: "Registrar",
    replaces: "GoDaddy, Namecheap",
    desc: "Domains at wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
    variant: "blue" as const,
  },
  {
    icon: <HardDrivesIcon className="h-5 w-5" weight="bold" />,
    product: "R2 Storage",
    replaces: "S3, GCS, Azure Blob",
    desc: "S3-compatible object storage with zero egress fees.",
    free: "10GB FREE · $0 egress FOREVER",
    variant: "green" as const,
  },
  {
    icon: <ListBulletsIcon className="h-5 w-5" weight="bold" />,
    product: "Queues",
    replaces: "SQS, SNS, RabbitMQ",
    desc: "Guaranteed delivery with zero egress. Connect Workers seamlessly.",
    free: "Zero egress fees",
    variant: "orange" as const,
  },
  {
    icon: <CloudIcon className="h-5 w-5" weight="bold" />,
    product: "Pages",
    replaces: "Vercel, Netlify",
    desc: "Unlimited bandwidth. Real previews. Git integration.",
    free: "Unlimited sites FREE",
    variant: "blue" as const,
  },
  {
    icon: <BrainIcon className="h-5 w-5" weight="bold" />,
    product: "Workers AI",
    replaces: "OpenAI, Replicate",
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
    variant: "orange" as const,
  },
  {
    icon: <LightningIcon className="h-5 w-5" weight="bold" />,
    product: "Workers",
    replaces: "Lambda, Vercel Functions",
    desc: "V8 isolates, 0ms cold starts, 300+ edge locations.",
    free: "100k requests/day FREE",
    variant: "green" as const,
  },
  {
    icon: <TreeStructureIcon className="h-5 w-5" weight="bold" />,
    product: "Workflows",
    replaces: "Step Functions, Temporal",
    desc: "Durable execution. Auto-resumes on failure.",
    free: "Built into Workers platform",
    variant: "blue" as const,
  },
];

export const Comparison: React.FC = () => (
  <section
    className="border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32"
    id="comparison"
  >
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-4 text-center font-anton text-3xl text-kumo-default uppercase tracking-tight md:mb-6 md:text-5xl lg:text-6xl">
        STOP PAYING FOR THIS{" "}
        <span className="text-kumo-brand underline decoration-8 decoration-kumo-brand/20 underline-offset-8">
          BULLSHIT
        </span>
      </h2>
      <p className="mb-12 text-center font-mono text-kumo-inactive text-sm uppercase tracking-widest md:mb-16">
        One platform. Zero excuses.
      </p>

      <LayerCard>
        <LayerCard.Primary className="overflow-x-auto p-0">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Cloudflare Product</Table.Head>
                <Table.Head>Replaces</Table.Head>
                <Table.Head className="hidden md:table-cell">
                  What it does
                </Table.Head>
                <Table.Head>Free Tier</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row key={row.product}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <span className="text-kumo-brand">{row.icon}</span>
                      <Text bold size="sm">
                        {row.product}
                      </Text>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Text color="subtle" size="sm">
                      {row.replaces}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Text color="subtle" size="sm">
                      {row.desc}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={row.variant}>{row.free}</Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </LayerCard.Primary>
      </LayerCard>
    </div>
  </section>
);
