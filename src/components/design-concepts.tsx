import type { LucideIcon } from "lucide-react";
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
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  normalizeName,
  usePersonalization,
} from "../hooks/use-personalization";

const cx = (...classes: Array<false | null | string | undefined>) =>
  classes.filter(Boolean).join(" ");

interface ProductCard {
  desc: string;
  free: string;
  icon: LucideIcon;
  title: string;
  vs: string;
}

const cards: ProductCard[] = [
  {
    icon: Globe,
    title: "CDN",
    vs: "CloudFront, Akamai, Fastly",
    desc: "Global anycast CDN with built-in DDoS protection and smart caching. No extra boxes, no multi-vendor dance.",
    free: "Global CDN included on every plan",
  },
  {
    icon: Database,
    title: "D1 Database",
    vs: "PlanetScale, Supabase, Neon",
    desc: "Serverless SQLite with read replication. Query at the edge. No connection pooling headaches.",
    free: "5M reads/day FREE",
  },
  {
    icon: LinkIcon,
    title: "Registrar",
    vs: "GoDaddy scams",
    desc: "Domains at actual wholesale cost. No renewal traps. Free privacy.",
    free: "No bullshit pricing",
  },
  {
    icon: Package,
    title: "R2 Storage",
    vs: "S3, GCS, Azure Blob",
    desc: "S3-compatible object storage with zero egress fees. Stop letting AWS rob you blind.",
    free: "10GB storage FREE • $0 egress FOREVER",
  },
  {
    icon: Zap,
    title: "Queues",
    vs: "SQS, SNS, RabbitMQ",
    desc: "Guaranteed message delivery with zero egress fees. Offload work, batch data, and connect Workers seamlessly.",
    free: "Zero egress fees • At-least-once delivery",
  },
  {
    icon: Globe,
    title: "Pages",
    vs: "Vercel, Netlify",
    desc: "Unlimited bandwidth. Real previews. Git integration. Just works.",
    free: "Unlimited sites FREE",
  },
  {
    icon: Brain,
    title: "Workers AI",
    vs: "OpenAI, Replicate",
    desc: "Run LLMs at the edge. No infra. No GPUs to manage.",
    free: "10k neurons/day FREE",
  },
  {
    icon: Zap,
    title: "Workers",
    vs: "Lambda, Vercel Functions",
    desc: "V8 isolates with 0ms cold starts. No containers, no VMs, just instant execution at 300+ edge locations.",
    free: "100k requests/day FREE",
  },
  {
    icon: GitBranch,
    title: "Workflows",
    vs: "Step Functions, Temporal",
    desc: "Durable execution for reliable long-running tasks. Auto-resumes on failure. No infrastructure to manage.",
    free: "Built into Workers platform",
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

interface ConceptStyles {
  accent: string;
  cardDesc: string;
  cardFree: string;
  cardFreeWrap: string;
  cardMeta: string;
  cardTilts: string[];
  cardTitle: string;
  comparisonCard: string;
  comparisonGrid: string;
  copy: string;
  ctaHeading: string;
  ctaSection: string;
  ctaText: string;
  decorations: React.ReactNode;
  downIcon: string;
  featureCard: string;
  featureGrid: string;
  featureIcon: string;
  featureSection: string;
  footer: string;
  footerBottom: string;
  footerLink: string;
  footerNavLink: string;
  footerText: string;
  footerTitle: string;
  footerTop: string;
  fromLine: string;
  fromName: string;
  gradientAccent: string;
  heading: string;
  headingCenter: string;
  heroAccent: string;
  heroInner: string;
  heroLead: string;
  heroSection: string;
  heroTitle: string;
  iconWrap: string;
  input: string;
  justLine: string;
  label: string;
  narrow: string;
  preview: string;
  primaryButton: string;
  secondaryButton: string;
  section: string;
  sharePanel: string;
  shareSection: string;
  shell: string;
  skipLink: string;
  thankSection: string;
  wide: string;
}

const controlRoom: ConceptStyles = {
  shell:
    "min-h-screen overflow-hidden bg-[#050607] text-[#f7efe6] [background-image:linear-gradient(rgba(246,130,31,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(246,130,31,0.08)_1px,transparent_1px),radial-gradient(circle_at_20%_15%,rgba(246,130,31,0.24),transparent_32rem),radial-gradient(circle_at_85%_8%,rgba(255,185,102,0.12),transparent_26rem)] [background-size:48px_48px,48px_48px,auto,auto]",
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-none focus:border focus:border-orange-400 focus:bg-black focus:px-6 focus:py-3 focus:font-bold focus:font-mono focus:text-orange-300 focus:uppercase focus:outline-none",
  heroSection:
    "relative min-h-screen overflow-hidden border-orange-500/20 border-b px-5 py-24 md:px-8 md:py-32",
  heroInner:
    "relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]",
  fromLine:
    "mb-7 border-orange-500/30 border-l-4 bg-black/50 px-5 py-4 font-mono text-orange-100 text-sm uppercase tracking-[0.22em] md:text-base",
  fromName: "font-bold text-orange-400",
  justLine:
    "mb-5 inline-flex border border-orange-500/40 bg-orange-500/10 px-4 py-2 font-bold font-mono text-orange-300 text-sm uppercase tracking-[0.5em] md:text-base",
  heroTitle:
    "font-anton text-6xl uppercase leading-[0.82] tracking-tight md:text-8xl lg:text-[8.5rem] xl:text-[10rem]",
  heroAccent:
    "block bg-orange-500 px-3 text-black shadow-[12px_12px_0_rgba(255,255,255,0.08)]",
  heroLead:
    "mt-8 max-w-xl border-orange-500/25 border-t pt-6 font-mono text-base text-orange-50/75 leading-relaxed md:text-lg",
  downIcon:
    "h-9 w-9 text-orange-400 drop-shadow-[0_0_18px_rgba(246,130,31,0.8)]",
  section: "relative border-orange-500/15 border-b px-5 py-24 md:px-8 md:py-32",
  narrow: "relative z-10 mx-auto max-w-4xl",
  wide: "relative z-10 mx-auto max-w-7xl",
  heading:
    "font-anton text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl",
  headingCenter:
    "mb-14 text-center font-anton text-4xl uppercase leading-[0.9] tracking-tight md:mb-20 md:text-6xl lg:text-7xl",
  accent: "text-orange-400",
  gradientAccent:
    "bg-gradient-to-r from-orange-300 via-orange-500 to-amber-200 bg-clip-text font-bold text-transparent",
  copy: "space-y-6 border-orange-500/20 border-l bg-black/35 p-6 font-mono text-base text-orange-50/75 leading-relaxed shadow-[24px_24px_0_rgba(246,130,31,0.05)] md:p-8 md:text-lg",
  comparisonGrid: "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
  comparisonCard:
    "group relative overflow-hidden border border-orange-500/20 bg-black/55 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/70 hover:bg-orange-950/30 md:p-7",
  cardTilts: ["", "lg:translate-y-6", "lg:-translate-y-4"],
  iconWrap:
    "mb-6 inline-flex border border-orange-400/30 bg-orange-500/10 p-3 text-orange-300 transition-colors group-hover:bg-orange-500 group-hover:text-black",
  cardTitle:
    "font-anton text-3xl text-orange-50 uppercase tracking-wide transition-colors group-hover:text-orange-300",
  cardMeta:
    "mt-2 font-mono text-orange-200/45 text-xs uppercase tracking-[0.2em]",
  cardDesc:
    "mt-6 min-h-[112px] font-mono text-orange-50/65 text-sm leading-relaxed md:text-base",
  cardFreeWrap: "mt-7 border-orange-500/20 border-t pt-5",
  cardFree:
    "inline-flex border border-orange-400/40 bg-orange-500/10 px-3 py-2 font-bold font-mono text-orange-300 text-xs uppercase tracking-tight",
  featureSection:
    "relative border-orange-500/15 border-b bg-black/35 px-5 py-24 md:px-8 md:py-32",
  featureGrid: "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3",
  featureCard:
    "flex items-center gap-3 border border-orange-500/20 bg-[#080a0a]/80 p-4 font-mono text-orange-50/75 text-sm transition-all hover:border-orange-400 hover:bg-orange-500/10",
  featureIcon: "h-5 w-5 flex-shrink-0 text-orange-400",
  ctaSection:
    "relative border-orange-500/15 border-b px-5 py-24 text-center md:px-8 md:py-32",
  ctaHeading:
    "mx-auto max-w-5xl font-anton text-5xl text-orange-50 uppercase leading-[0.9] tracking-tight md:text-7xl lg:text-8xl",
  ctaText:
    "mx-auto mt-8 max-w-3xl font-mono text-lg text-orange-50/65 leading-relaxed md:text-xl",
  primaryButton:
    "group inline-flex w-full items-center justify-center gap-3 border-2 border-orange-400 bg-orange-500 px-10 py-5 font-bold font-mono text-black uppercase tracking-tight transition-all hover:bg-orange-300 hover:shadow-[0_0_42px_rgba(246,130,31,0.45)] focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-4 active:bg-orange-600 sm:w-auto",
  secondaryButton:
    "inline-flex w-full items-center justify-center border-2 border-orange-500/35 bg-black/35 px-8 py-5 font-bold font-mono text-orange-100 uppercase tracking-tight transition-all hover:border-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-4 active:border-orange-600 active:text-orange-600 sm:w-auto",
  shareSection:
    "relative border-orange-500/15 border-b bg-black/45 px-5 py-24 md:px-8 md:py-32",
  sharePanel:
    "space-y-6 border border-orange-500/20 bg-[#070808]/85 p-5 shadow-[18px_18px_0_rgba(246,130,31,0.08)] md:p-8",
  label:
    "mb-2 block font-bold font-mono text-orange-100/75 text-sm uppercase tracking-[0.2em]",
  input:
    "w-full border border-orange-500/25 bg-black px-4 py-4 font-mono text-orange-50 placeholder:text-orange-200/30 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/25",
  preview:
    "border border-orange-500/20 bg-orange-500/10 p-4 font-mono text-orange-50/65 text-sm",
  thankSection:
    "border-orange-500/15 border-b bg-black/60 px-5 py-14 text-center md:px-8",
  footer: "border-orange-500/15 border-t bg-[#040505] px-5 py-12 md:px-8",
  footerTop:
    "flex flex-col items-center justify-between gap-8 md:flex-row md:items-start",
  footerTitle: "font-anton text-2xl text-orange-50 uppercase tracking-tight",
  footerText: "mt-2 font-mono text-orange-50/45 text-sm",
  footerNavLink:
    "border border-orange-500/25 bg-black/40 px-4 py-2 font-mono text-orange-50/55 text-sm transition-all hover:border-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2",
  footerBottom: "mt-8 border-orange-500/15 border-t pt-8 text-center",
  footerLink: "text-orange-400 transition-colors hover:text-orange-200",
  decorations: (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-10 right-6 z-0 hidden h-72 w-72 rounded-full border border-orange-500/10 lg:block"
      />
    </>
  ),
};

const billboard: ConceptStyles = {
  shell:
    "min-h-screen overflow-hidden bg-[#f5dfb8] text-[#160d08] [background-image:radial-gradient(#160d08_0.9px,transparent_0.9px),linear-gradient(135deg,rgba(246,130,31,0.28),transparent_34rem),linear-gradient(45deg,rgba(22,13,8,0.08)_25%,transparent_25%,transparent_50%,rgba(22,13,8,0.08)_50%,rgba(22,13,8,0.08)_75%,transparent_75%,transparent)] [background-size:9px_9px,auto,52px_52px]",
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-full focus:border-4 focus:border-black focus:bg-orange-500 focus:px-6 focus:py-3 focus:font-bold focus:font-mono focus:text-black focus:uppercase focus:outline-none",
  heroSection:
    "relative min-h-screen overflow-hidden border-black border-b-4 px-5 py-20 md:px-8 md:py-28",
  heroInner:
    "relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]",
  fromLine:
    "mb-7 rotate-[-1.5deg] border-4 border-black bg-white px-5 py-4 font-bold font-mono text-base uppercase tracking-tight shadow-[8px_8px_0_#160d08] md:text-lg",
  fromName: "bg-orange-500 px-2 text-black",
  justLine:
    "mb-5 inline-flex -rotate-2 rounded-full border-4 border-black bg-orange-500 px-5 py-2 font-black font-mono text-black text-lg uppercase tracking-[0.32em] shadow-[6px_6px_0_#160d08]",
  heroTitle:
    "font-bebas text-7xl uppercase leading-[0.78] tracking-[-0.04em] md:text-9xl lg:text-[10rem] xl:text-[12rem]",
  heroAccent:
    "block rotate-[-1deg] bg-[#160d08] px-4 text-[#f5dfb8] shadow-[12px_12px_0_#f6821f]",
  heroLead:
    "mt-9 max-w-2xl rotate-[0.5deg] border-4 border-black bg-white px-5 py-5 font-bold font-mono text-base leading-relaxed shadow-[10px_10px_0_#f6821f] md:text-lg",
  downIcon: "h-10 w-10 text-black",
  section: "relative border-black border-b-4 px-5 py-20 md:px-8 md:py-28",
  narrow: "relative z-10 mx-auto max-w-4xl",
  wide: "relative z-10 mx-auto max-w-7xl",
  heading:
    "font-bebas text-6xl uppercase leading-[0.82] tracking-[-0.035em] md:text-8xl lg:text-9xl",
  headingCenter:
    "mb-14 text-center font-bebas text-6xl uppercase leading-[0.82] tracking-[-0.035em] md:mb-20 md:text-8xl lg:text-9xl",
  accent: "bg-orange-500 px-2 text-black",
  gradientAccent: "bg-orange-500 px-1 font-black text-black",
  copy: "space-y-6 rotate-[-0.6deg] border-4 border-black bg-white p-6 font-bold font-mono text-base leading-relaxed shadow-[14px_14px_0_#160d08] md:p-8 md:text-lg",
  comparisonGrid: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
  comparisonCard:
    "group border-4 border-black bg-[#fff8ea] p-6 shadow-[10px_10px_0_#160d08] transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:bg-white hover:shadow-[14px_14px_0_#f6821f] md:p-7",
  cardTilts: [
    "lg:-rotate-1",
    "lg:rotate-1 lg:translate-y-8",
    "lg:-rotate-2 lg:-translate-y-2",
  ],
  iconWrap:
    "mb-5 inline-flex rounded-full border-4 border-black bg-orange-500 p-3 text-black transition-transform group-hover:rotate-[-8deg]",
  cardTitle: "font-bebas text-4xl uppercase tracking-tight",
  cardMeta: "mt-1 font-black font-mono text-xs uppercase tracking-tight",
  cardDesc:
    "mt-6 min-h-[116px] font-bold font-mono text-sm leading-relaxed md:text-base",
  cardFreeWrap: "mt-7 border-black border-t-4 pt-5",
  cardFree:
    "inline-flex rounded-full border-2 border-black bg-orange-500 px-3 py-2 font-black font-mono text-black text-xs uppercase tracking-tighter",
  featureSection:
    "relative border-black border-b-4 bg-[#160d08] px-5 py-20 text-[#f5dfb8] md:px-8 md:py-28",
  featureGrid: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
  featureCard:
    "flex items-center gap-3 border-2 border-[#f5dfb8]/40 bg-[#24140b] p-4 font-bold font-mono text-sm transition-all hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500 hover:text-black",
  featureIcon: "h-5 w-5 flex-shrink-0 text-orange-500",
  ctaSection:
    "relative border-black border-b-4 px-5 py-20 text-center md:px-8 md:py-28",
  ctaHeading:
    "mx-auto max-w-5xl font-bebas text-7xl uppercase leading-[0.78] tracking-[-0.04em] md:text-9xl lg:text-[10rem]",
  ctaText:
    "mx-auto mt-8 max-w-3xl border-4 border-black bg-white p-5 font-bold font-mono text-lg leading-relaxed shadow-[10px_10px_0_#160d08] md:text-xl",
  primaryButton:
    "group inline-flex w-full items-center justify-center gap-3 rounded-full border-4 border-black bg-orange-500 px-10 py-5 font-black font-mono text-black uppercase tracking-tight shadow-[7px_7px_0_#160d08] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[10px_10px_0_#160d08] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 active:translate-y-0 sm:w-auto",
  secondaryButton:
    "inline-flex w-full items-center justify-center rounded-full border-4 border-black bg-[#160d08] px-8 py-5 font-black font-mono text-[#f5dfb8] uppercase tracking-tight shadow-[7px_7px_0_#f6821f] transition-all hover:-translate-y-1 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-4 active:translate-y-0 sm:w-auto",
  shareSection: "relative border-black border-b-4 px-5 py-20 md:px-8 md:py-28",
  sharePanel:
    "space-y-6 rotate-[0.4deg] border-4 border-black bg-white p-5 shadow-[14px_14px_0_#f6821f] md:p-8",
  label: "mb-2 block font-black font-mono text-sm uppercase tracking-tight",
  input:
    "w-full border-4 border-black bg-[#fff8ea] px-4 py-4 font-bold font-mono text-black placeholder:text-black/35 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/50",
  preview:
    "border-4 border-black bg-[#fff8ea] p-4 font-bold font-mono text-black text-sm",
  thankSection:
    "border-black border-b-4 bg-orange-500 px-5 py-14 text-center md:px-8",
  footer:
    "border-black border-t-4 bg-[#160d08] px-5 py-12 text-[#f5dfb8] md:px-8",
  footerTop:
    "flex flex-col items-center justify-between gap-8 md:flex-row md:items-start",
  footerTitle: "font-bebas text-4xl uppercase tracking-tight",
  footerText: "mt-2 font-bold font-mono text-[#f5dfb8]/65 text-sm",
  footerNavLink:
    "rounded-full border-2 border-[#f5dfb8]/45 bg-transparent px-4 py-2 font-bold font-mono text-[#f5dfb8]/75 text-sm transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-black focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2",
  footerBottom: "mt-8 border-[#f5dfb8]/20 border-t pt-8 text-center",
  footerLink: "text-orange-400 transition-colors hover:text-[#f5dfb8]",
  decorations: (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-[-6rem] h-32 w-96 rotate-12 border-4 border-black bg-orange-500/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 left-[-5rem] h-28 w-80 -rotate-6 border-4 border-black bg-white/70"
      />
    </>
  ),
};

const ledger: ConceptStyles = {
  shell:
    "min-h-screen overflow-hidden bg-[#201711] text-[#22150d] [background-image:radial-gradient(circle_at_50%_0%,rgba(246,130,31,0.22),transparent_30rem),linear-gradient(90deg,rgba(255,244,220,0.04)_1px,transparent_1px),linear-gradient(rgba(255,244,220,0.04)_1px,transparent_1px)] [background-size:auto,34px_34px,34px_34px]",
  skipLink:
    "sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-full focus:bg-[#fff4dc] focus:px-6 focus:py-3 focus:font-bold focus:font-mono focus:text-[#22150d] focus:uppercase focus:outline-none",
  heroSection:
    "relative min-h-screen overflow-hidden px-5 py-20 md:px-8 md:py-28",
  heroInner:
    "relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]",
  fromLine:
    "mb-7 rounded-t-3xl border-[#5b3b26] border-x border-t bg-[#fff4dc] px-5 py-4 font-mono text-[#6d4329] text-sm uppercase tracking-[0.18em] shadow-[0_24px_55px_rgba(0,0,0,0.28)] md:text-base",
  fromName: "font-bold text-[#d85f14]",
  justLine:
    "mb-5 inline-flex rounded-full border border-[#6d4329]/40 bg-[#fff4dc] px-5 py-2 font-bold font-mono text-[#d85f14] text-sm uppercase tracking-[0.42em] shadow-[0_16px_35px_rgba(0,0,0,0.2)]",
  heroTitle:
    "font-instrument text-6xl uppercase italic leading-[0.86] tracking-[-0.06em] text-[#fff4dc] md:text-8xl lg:text-[8.8rem] xl:text-[10rem]",
  heroAccent:
    "block rounded-[2rem] bg-[#fff4dc] px-5 text-[#d85f14] shadow-[0_28px_65px_rgba(0,0,0,0.32)]",
  heroLead:
    "mt-8 max-w-xl rounded-3xl border border-[#6d4329]/25 bg-[#fff4dc] p-6 font-mono text-base text-[#4a2e1e] leading-relaxed shadow-[0_30px_75px_rgba(0,0,0,0.28)] md:text-lg",
  downIcon: "h-9 w-9 text-[#fff4dc] drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]",
  section: "relative px-5 py-20 md:px-8 md:py-28",
  narrow: "relative z-10 mx-auto max-w-4xl",
  wide: "relative z-10 mx-auto max-w-7xl",
  heading:
    "font-instrument text-5xl uppercase italic leading-[0.9] tracking-[-0.055em] text-[#fff4dc] md:text-7xl lg:text-8xl",
  headingCenter:
    "mb-14 text-center font-instrument text-5xl uppercase italic leading-[0.9] tracking-[-0.055em] text-[#fff4dc] md:mb-20 md:text-7xl lg:text-8xl",
  accent: "text-[#ff8a24]",
  gradientAccent:
    "bg-gradient-to-r from-[#ffb45f] via-[#f6821f] to-[#fff4dc] bg-clip-text font-bold text-transparent",
  copy: "space-y-6 rounded-[2rem] border border-[#6d4329]/25 bg-[#fff4dc] p-6 font-mono text-base text-[#4a2e1e] leading-relaxed shadow-[0_30px_75px_rgba(0,0,0,0.28)] md:p-8 md:text-lg",
  comparisonGrid: "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
  comparisonCard:
    "group rounded-[2rem] border border-[#6d4329]/25 bg-[#fff4dc] p-6 shadow-[0_25px_65px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-2 hover:bg-[#fff8ea] md:p-7",
  cardTilts: ["", "lg:translate-y-8", "lg:-translate-y-3"],
  iconWrap:
    "mb-5 inline-flex rounded-full bg-[#22150d] p-3 text-[#ff8a24] transition-all group-hover:rotate-6 group-hover:bg-[#f6821f] group-hover:text-[#22150d]",
  cardTitle:
    "font-instrument text-4xl text-[#22150d] uppercase italic tracking-[-0.04em]",
  cardMeta:
    "mt-2 font-bold font-mono text-[#8f6040] text-xs uppercase tracking-[0.14em]",
  cardDesc:
    "mt-6 min-h-[116px] font-mono text-[#4a2e1e] text-sm leading-relaxed md:text-base",
  cardFreeWrap: "mt-7 border-[#6d4329]/20 border-t pt-5",
  cardFree:
    "inline-flex rounded-full bg-[#22150d] px-3 py-2 font-bold font-mono text-[#ffb45f] text-xs uppercase tracking-tight",
  featureSection: "relative px-5 py-20 md:px-8 md:py-28",
  featureGrid: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
  featureCard:
    "flex items-center gap-3 rounded-full border border-[#fff4dc]/15 bg-[#fff4dc]/10 p-4 font-mono text-[#fff4dc]/82 text-sm backdrop-blur transition-all hover:bg-[#fff4dc] hover:text-[#22150d]",
  featureIcon: "h-5 w-5 flex-shrink-0 text-[#ff8a24]",
  ctaSection: "relative px-5 py-20 text-center md:px-8 md:py-28",
  ctaHeading:
    "mx-auto max-w-5xl font-instrument text-6xl text-[#fff4dc] uppercase italic leading-[0.86] tracking-[-0.06em] md:text-8xl lg:text-[9.5rem]",
  ctaText:
    "mx-auto mt-8 max-w-3xl rounded-[2rem] bg-[#fff4dc] p-6 font-mono text-[#4a2e1e] text-lg leading-relaxed shadow-[0_30px_75px_rgba(0,0,0,0.28)] md:text-xl",
  primaryButton:
    "group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#fff4dc] px-10 py-5 font-bold font-mono text-[#22150d] uppercase tracking-tight shadow-[0_24px_55px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-1 hover:bg-[#ff8a24] focus-visible:outline-2 focus-visible:outline-[#fff4dc] focus-visible:outline-offset-4 active:translate-y-0 sm:w-auto",
  secondaryButton:
    "inline-flex w-full items-center justify-center rounded-full border border-[#fff4dc]/25 bg-[#fff4dc]/10 px-8 py-5 font-bold font-mono text-[#fff4dc] uppercase tracking-tight backdrop-blur transition-all hover:-translate-y-1 hover:bg-[#fff4dc] hover:text-[#22150d] focus-visible:outline-2 focus-visible:outline-[#fff4dc] focus-visible:outline-offset-4 active:translate-y-0 sm:w-auto",
  shareSection: "relative px-5 py-20 md:px-8 md:py-28",
  sharePanel:
    "space-y-6 rounded-[2rem] border border-[#6d4329]/25 bg-[#fff4dc] p-5 shadow-[0_30px_75px_rgba(0,0,0,0.28)] md:p-8",
  label:
    "mb-2 block font-bold font-mono text-[#6d4329] text-sm uppercase tracking-[0.16em]",
  input:
    "w-full rounded-full border border-[#6d4329]/25 bg-white/60 px-5 py-4 font-mono text-[#22150d] placeholder:text-[#6d4329]/45 focus:border-[#f6821f] focus:outline-none focus:ring-4 focus:ring-[#f6821f]/20",
  preview:
    "rounded-3xl border border-[#6d4329]/20 bg-white/55 p-4 font-mono text-[#4a2e1e] text-sm",
  thankSection: "bg-[#fff4dc] px-5 py-14 text-center md:px-8",
  footer: "bg-[#120c08] px-5 py-12 text-[#fff4dc] md:px-8",
  footerTop:
    "flex flex-col items-center justify-between gap-8 md:flex-row md:items-start",
  footerTitle: "font-instrument text-4xl uppercase italic tracking-[-0.04em]",
  footerText: "mt-2 font-mono text-[#fff4dc]/55 text-sm",
  footerNavLink:
    "rounded-full border border-[#fff4dc]/20 bg-[#fff4dc]/5 px-4 py-2 font-mono text-[#fff4dc]/70 text-sm transition-all hover:border-[#ff8a24] hover:text-[#ff8a24] focus-visible:outline-2 focus-visible:outline-[#fff4dc] focus-visible:outline-offset-2",
  footerBottom: "mt-8 border-[#fff4dc]/10 border-t pt-8 text-center",
  footerLink: "text-[#ff8a24] transition-colors hover:text-[#fff4dc]",
  decorations: (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#f6821f]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-6 hidden h-80 w-48 rotate-6 rounded-[2rem] border border-[#fff4dc]/10 bg-[#fff4dc]/5 lg:block"
      />
    </>
  ),
};

interface ConceptPageProps {
  style: ConceptStyles;
}

const ConceptPage: React.FC<ConceptPageProps> = ({ style }) => {
  const { from } = usePersonalization();

  return (
    <div className={style.shell}>
      <a className={style.skipLink} href="#main-content">
        Skip to main content
      </a>
      <main id="main-content">
        <HeroSection style={style} />
        <RantSection style={style} />
        <ComparisonSection style={style} />
        <FeaturesSection style={style} />
        <CtaSection style={style} />
        <ShareSection style={style} />
        {from && <ThankYouSection from={from} style={style} />}
      </main>
      <ConceptFooter style={style} />
    </div>
  );
};

const HeroSection: React.FC<ConceptPageProps> = ({ style }) => {
  const { from, to } = usePersonalization();

  return (
    <section className={style.heroSection}>
      {style.decorations}
      <div className={style.heroInner}>
        <div>
          {from && (
            <p className={style.fromLine}>
              Hey there, if <span className={style.fromName}>{from}</span> sent
              you this link, you need to:{" "}
            </p>
          )}
          <p className={style.justLine}>JUST</p>
          <h1 className={style.heroTitle}>
            <span className="block">FUCKING</span>
            <span className={style.heroAccent}>USE</span>
            <span className="block">CLOUDFLARE</span>
            <span className="block">
              {to ? `${to.toUpperCase()}` : "YOU DEGENERATE"}
            </span>
          </h1>
        </div>
        <p className={style.heroLead}>
          Stop paying{" "}
          <strong className={style.accent}>SEVENTEEN DIFFERENT BILLS</strong>{" "}
          for your shitty todo app. Stop pretending you're an infra genius when
          you're just <strong className={style.accent}>bleeding money</strong>.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          aria-label="Scroll down"
          className={style.downIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Scroll down</title>
          <path
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
    </section>
  );
};

const RantSection: React.FC<ConceptPageProps> = ({ style }) => {
  const { to } = usePersonalization();

  return (
    <section className={style.section}>
      {style.decorations}
      <div className={style.narrow}>
        <h2 className={cx(style.heading, "mb-8")}>
          {to ? (
            <>
              <span className={style.accent}>{to.toUpperCase()}</span>, YOU'RE{" "}
              <span className={style.accent}>FUCKING</span> KILLING ME HERE
            </>
          ) : (
            <>
              YOU'RE <span className={style.accent}>FUCKING</span> KILLING ME
              HERE
            </>
          )}
        </h2>
        <div className={style.copy}>
          <p>
            {to ? `${to}, y` : "Y"}ou've got Vercel for frontend, Railway for
            backend, AWS S3 for storage, PlanetScale for DB, Redis Labs for
            cache, Cloudinary for images, and you're paying{" "}
            <strong>FIVE DIFFERENT CORPORATE OVERLORDS</strong> to keep your
            half-baked blog alive.
          </p>
          <p>
            Meanwhile Cloudflare is literally{" "}
            <span className={style.gradientAccent}>BEGGING</span> you to use
            their <span className={style.gradientAccent}>Workers</span>,{" "}
            <span className={style.gradientAccent}>Pages</span>,{" "}
            <span className={style.gradientAccent}>R2</span>,{" "}
            <span className={style.gradientAccent}>D1</span>,{" "}
            <span className={style.gradientAccent}>KV</span>,{" "}
            <span className={style.gradientAccent}>Durable Objects</span>,{" "}
            <span className={style.gradientAccent}>Queues</span>,{" "}
            <span className={style.gradientAccent}>Workflows</span>,{" "}
            <span className={style.gradientAccent}>AI</span>,{" "}
            <span className={style.gradientAccent}>Vectorize</span> — ALL ON ONE
            PLATFORM, ONE BILL, AND{" "}
            <strong>ACTUALLY GENEROUS FREE TIERS</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection: React.FC<ConceptPageProps> = ({ style }) => (
  <section className={style.section}>
    {style.decorations}
    <div className={style.wide}>
      <h2 className={style.headingCenter}>
        STOP PAYING FOR THIS <span className={style.accent}>BULLSHIT</span>
      </h2>
      <div className={style.comparisonGrid}>
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <article
              className={cx(
                style.comparisonCard,
                style.cardTilts[index % style.cardTilts.length]
              )}
              key={card.title}
            >
              <div className={style.iconWrap}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className={style.cardTitle}>{card.title}</h3>
              <p className={style.cardMeta}>vs. {card.vs}</p>
              <p className={style.cardDesc}>{card.desc}</p>
              <div className={style.cardFreeWrap}>
                <span className={style.cardFree}>{card.free}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const FeaturesSection: React.FC<ConceptPageProps> = ({ style }) => (
  <section className={style.featureSection}>
    {style.decorations}
    <div className={style.wide}>
      <h2 className={style.headingCenter}>
        One platform. Everything you need.
      </h2>
      <div className={style.featureGrid}>
        {features.map((feature) => (
          <div className={style.featureCard} key={feature}>
            <CheckCircle2 className={style.featureIcon} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection: React.FC<ConceptPageProps> = ({ style }) => (
  <section className={style.ctaSection}>
    {style.decorations}
    <div className="relative z-10 mx-auto max-w-5xl">
      <h2 className={style.ctaHeading}>
        STOP <span className={style.accent}>FUCKING</span> AROUND.
        <br />
        JUST <span className={style.accent}>USE CLOUDFLARE</span>.
      </h2>
      <p className={style.ctaText}>
        Your infrastructure is not a personality trait. Stop suffering. Start
        shipping. Sign up and never think about egress fees again.
      </p>
      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          aria-label="Get started with Cloudflare for free"
          className={style.primaryButton}
          href="https://dash.cloudflare.com/sign-up"
          rel="noopener noreferrer"
          target="_blank"
        >
          FUCKING DO IT ALREADY
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
          />
        </a>
        <a
          aria-label="Read Cloudflare developer documentation"
          className={style.secondaryButton}
          href="https://developers.cloudflare.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          FINE, READ THE DOCS FIRST
        </a>
      </div>
    </div>
  </section>
);

const ShareSection: React.FC<ConceptPageProps> = ({ style }) => {
  const { to } = usePersonalization();
  const [theirName, setTheirName] = useState("");
  const [yourName, setYourName] = useState(to || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopyLink = async () => {
    if (!(theirName.trim() && yourName.trim())) {
      return;
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?from=${encodeURIComponent(
      yourName.trim()
    )}&to=${encodeURIComponent(theirName.trim())}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const isDisabled = !(theirName.trim() && yourName.trim());
  const previewTheirName = normalizeName(theirName) ?? "";
  const previewYourName = normalizeName(yourName) ?? "";

  return (
    <section className={style.shareSection}>
      {style.decorations}
      <div className={style.narrow}>
        <h2 className={cx(style.heading, "mb-8")}>
          KNOW SOMEONE WHO NEEDS <span className={style.accent}>HELP</span>?
        </h2>
        <p className={cx(style.copy, "mb-8")}>
          Share this link with them. They'll see a personalized version just for
          them.
        </p>
        <div className={style.sharePanel}>
          <div>
            <label className={style.label} htmlFor="your-name">
              Your Name
            </label>
            <input
              className={style.input}
              id="your-name"
              onChange={(event) => {
                setYourName(event.target.value);
              }}
              placeholder="Enter your name"
              type="text"
              value={yourName}
            />
          </div>

          <div>
            <label className={style.label} htmlFor="their-name">
              Their Name
            </label>
            <input
              className={style.input}
              id="their-name"
              onChange={(event) => {
                setTheirName(event.target.value);
              }}
              placeholder="Enter their name"
              type="text"
              value={theirName}
            />
          </div>

          {previewTheirName && previewYourName && (
            <div className={style.preview}>
              <p>
                They'll see:{" "}
                <span className={style.accent}>
                  "Hey {previewTheirName}, if {previewYourName} sent you this
                  link, you need to..."
                </span>
              </p>
            </div>
          )}

          <button
            aria-label="Copy share link"
            className={cx(
              style.primaryButton,
              "disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-neutral-800 sm:w-auto"
            )}
            disabled={isDisabled}
            onClick={handleCopyLink}
            type="button"
          >
            {copied ? "LINK COPIED!" : "COPY SHARE LINK"}
          </button>
        </div>
      </div>
    </section>
  );
};

interface ThankYouProps extends ConceptPageProps {
  from: string;
}

const ThankYouSection: React.FC<ThankYouProps> = ({ from, style }) => (
  <section className={style.thankSection}>
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-lg leading-relaxed md:text-xl">
        Don't forget to fucking thank{" "}
        <span className={cx(style.accent, "font-bold")}>{from}</span> for
        sending you this link. They're looking out for you.
      </p>
    </div>
  </section>
);

const ConceptFooter: React.FC<ConceptPageProps> = ({ style }) => (
  <footer className={style.footer}>
    <div className="mx-auto max-w-7xl">
      <div className={style.footerTop}>
        <div className="text-center md:text-left">
          <p className={style.footerTitle}>Just Fucking Use Cloudflare</p>
          <p className={style.footerText}>
            Stop fucking around. Start fucking building.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <a
            aria-label="Sign up for Cloudflare"
            className={style.footerNavLink}
            href="https://dash.cloudflare.com/sign-up"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign Up
          </a>
          <a
            aria-label="Cloudflare Developer Documentation"
            className={style.footerNavLink}
            href="https://developers.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
          </a>
          <a
            aria-label="Cloudflare Blog"
            className={style.footerNavLink}
            href="https://blog.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
          <a
            aria-label="Cloudflare Community"
            className={style.footerNavLink}
            href="https://community.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Community
          </a>
        </div>
      </div>
      <div className={style.footerBottom}>
        <p className="font-mono text-xs opacity-70">
          <RouterLink className={style.footerLink} to="/privacy-policy">
            Privacy Policy
          </RouterLink>
        </p>
        <p className="mt-4 font-mono text-xs opacity-60">
          Not affiliated with Cloudflare. Just someone who loves their products.
        </p>
        <p className="mt-2 font-mono text-xs opacity-60">
          Inspired by{" "}
          <a
            className={style.footerLink}
            href="https://justfuckingusehtml.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusehtml.com
          </a>
          ,{" "}
          <a
            className={style.footerLink}
            href="https://justfuckingusetailwind.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusetailwind.com
          </a>
          ,{" "}
          <a
            className={style.footerLink}
            href="https://justfuckingusereact.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusereact.com
          </a>{" "}
          and the{" "}
          <a
            className={style.footerLink}
            href="https://justfuckinguse.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckinguse.com
          </a>{" "}
          ecosystem.
        </p>
        <p className="mt-2 font-mono text-xs opacity-60">
          Made by:{" "}
          <a
            className={style.footerLink}
            href="https://mynameistito.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            mynameistito
          </a>{" "}
          (
          <a
            className={style.footerLink}
            href="https://buymeacoffee.com/mynameistito"
            rel="noopener noreferrer"
            target="_blank"
          >
            Buy Me a Coffee
          </a>
          ,{" "}
          <a
            className={style.footerLink}
            href="https://discord.com/users/611746802122620937"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
          ,{" "}
          <a
            className={style.footerLink}
            href="https://github.com/mynameistito/justfuckingusecloudflare"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          ,{" "}
          <a
            className={style.footerLink}
            href="https://x.com/mynameistito"
            rel="noopener noreferrer"
            target="_blank"
          >
            X
          </a>
          )
        </p>
      </div>
    </div>
  </footer>
);

export const ControlRoomConcept: React.FC = () => (
  <ConceptPage style={controlRoom} />
);

export const BillboardConcept: React.FC = () => (
  <ConceptPage style={billboard} />
);

export const LedgerConcept: React.FC = () => <ConceptPage style={ledger} />;
