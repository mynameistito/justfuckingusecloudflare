import { domAnimation, LazyMotion } from "motion/react";

import { Architecture } from "@/components/architecture";
import { Hero } from "@/components/hero";
import { LiveLab } from "@/components/live-lab";
import { PlatformExplorer } from "@/components/platform-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StackBuilder } from "@/components/stack-builder";
import { ThisSite } from "@/components/this-site";

/**
 * Compose the complete single-page Cloudflare manifesto and Stack Builder.
 *
 * @returns The application root.
 */
export const App = () => (
  <LazyMotion features={domAnimation}>
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <StackBuilder />
        <PlatformExplorer />
        <LiveLab />
        <Architecture />
        <ThisSite />
      </main>
      <SiteFooter />
    </div>
  </LazyMotion>
);
