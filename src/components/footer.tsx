import type React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => (
  <footer className="border-line bg-surface border-t px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-anton text-xl tracking-tight text-white uppercase">
            Just Fucking Use Cloudflare
          </p>
          <p className="text-muted mt-2 font-mono text-sm">
            Stop fucking around. Start fucking building.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <a
            aria-label="Sign up for Cloudflare"
            className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://dash.cloudflare.com/sign-up"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign Up
          </a>
          <a
            aria-label="Cloudflare Developer Documentation"
            className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://developers.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
          </a>
          <a
            aria-label="Cloudflare Blog"
            className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://blog.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
          <a
            aria-label="Cloudflare Community"
            className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://community.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Community
          </a>
          <a
            aria-label="Cloudflare Domains"
            className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            href="https://www.cloudflare.com/products/registrar/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Domains
          </a>
        </div>
      </div>
      <div className="border-line mt-8 border-t pt-8 text-center">
        <p className="text-muted-dim font-mono text-xs">
          <Link
            className="text-brand hover:text-brand-light transition-colors"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </p>
        <p className="text-muted-dim mt-4 font-mono text-xs">
          Not affiliated with Cloudflare. Just someone who loves their products.
        </p>
        <p className="text-muted-dim mt-2 font-mono text-xs">
          Inspired by{" "}
          <a
            className="text-brand hover:text-brand-light transition-colors"
            href="https://justfuckingusehtml.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusehtml.com
          </a>
          ,{" "}
          <a
            className="text-brand hover:text-brand-light transition-colors"
            href="https://justfuckingusetailwind.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusetailwind.com
          </a>
          ,{" "}
          <a
            className="text-brand hover:text-brand-light transition-colors"
            href="https://justfuckingusereact.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusereact.com
          </a>{" "}
          and the{" "}
          <a
            className="text-brand hover:text-brand-light transition-colors"
            href="https://justfuckinguse.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckinguse.com
          </a>{" "}
          ecosystem.
        </p>
        <p className="text-muted-dim mt-2 font-mono text-xs">
          Made by:{" "}
          <a
            className="text-brand hover:text-brand-light transition-colors"
            href="https://mynameistito.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            mynameistito
          </a>
        </p>
      </div>
    </div>
  </footer>
);
