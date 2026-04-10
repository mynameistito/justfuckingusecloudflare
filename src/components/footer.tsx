import type React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Footer: React.FC = () => (
  <footer className="border-kumo-line border-t bg-kumo-canvas px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-anton text-kumo-default text-xl uppercase tracking-tight">
            Just Fucking Use Cloudflare
          </p>
          <p className="mt-2 font-mono text-kumo-subtle text-sm">
            Stop fucking around. Start fucking building.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <a
            aria-label="Sign up for Cloudflare"
            className="rounded-full border border-kumo-line bg-transparent px-4 py-2 font-mono text-kumo-subtle text-sm transition-all hover:border-kumo-brand hover:text-kumo-brand focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-2"
            href="https://dash.cloudflare.com/sign-up"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign Up
          </a>
          <a
            aria-label="Cloudflare Developer Documentation"
            className="rounded-full border border-kumo-line bg-transparent px-4 py-2 font-mono text-kumo-subtle text-sm transition-all hover:border-kumo-brand hover:text-kumo-brand focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-2"
            href="https://developers.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
          </a>
          <a
            aria-label="Cloudflare Blog"
            className="rounded-full border border-kumo-line bg-transparent px-4 py-2 font-mono text-kumo-subtle text-sm transition-all hover:border-kumo-brand hover:text-kumo-brand focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-2"
            href="https://blog.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
          <a
            aria-label="Cloudflare Community"
            className="rounded-full border border-kumo-line bg-transparent px-4 py-2 font-mono text-kumo-subtle text-sm transition-all hover:border-kumo-brand hover:text-kumo-brand focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-2"
            href="https://community.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Community
          </a>
        </div>
      </div>
      <div className="mt-8 border-kumo-line border-t pt-8 text-center">
        <p className="font-mono text-kumo-inactive text-xs">
          <RouterLink
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            to="/privacy-policy"
          >
            Privacy Policy
          </RouterLink>
        </p>
        <p className="mt-4 font-mono text-kumo-inactive text-xs">
          Not affiliated with Cloudflare. Just someone who loves their products.
        </p>
        <p className="mt-2 font-mono text-kumo-inactive text-xs">
          Inspired by{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://justfuckingusehtml.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusehtml.com
          </a>
          ,{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://justfuckingusetailwind.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusetailwind.com
          </a>
          ,{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://justfuckingusereact.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusereact.com
          </a>{" "}
          and the{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://justfuckinguse.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckinguse.com
          </a>{" "}
          ecosystem.
        </p>
        <p className="mt-2 font-mono text-kumo-inactive text-xs">
          Made by:{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://mynameistito.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            mynameistito
          </a>{" "}
          (
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://buymeacoffee.com/mynameistito"
            rel="noopener noreferrer"
            target="_blank"
          >
            Buy Me a Coffee
          </a>
          ,{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://discord.com/users/611746802122620937"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
          ,{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
            href="https://github.com/mynameistito/justfuckingusecloudflare"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          ,{" "}
          <a
            className="text-kumo-brand transition-colors hover:text-kumo-brand-hover"
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
