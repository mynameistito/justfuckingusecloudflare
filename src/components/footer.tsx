import type React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => (
  <footer className="border-neutral-800 border-t bg-neutral-950 px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-anton text-white text-xl uppercase tracking-tight">
            Just Fucking Use Cloudflare
          </p>
          <p className="mt-2 font-mono text-neutral-500 text-sm">
            Stop fucking around. Start fucking building.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <a
            aria-label="Sign up for Cloudflare"
            className="rounded-full border border-neutral-700 bg-transparent px-4 py-2 font-mono text-neutral-400 text-sm transition-all hover:border-orange-500 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
            href="https://dash.cloudflare.com/sign-up"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign Up
          </a>
          <a
            aria-label="Cloudflare Developer Documentation"
            className="rounded-full border border-neutral-700 bg-transparent px-4 py-2 font-mono text-neutral-400 text-sm transition-all hover:border-orange-500 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
            href="https://developers.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs
          </a>
          <a
            aria-label="Cloudflare Blog"
            className="rounded-full border border-neutral-700 bg-transparent px-4 py-2 font-mono text-neutral-400 text-sm transition-all hover:border-orange-500 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
            href="https://blog.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog
          </a>
          <a
            aria-label="Cloudflare Community"
            className="rounded-full border border-neutral-700 bg-transparent px-4 py-2 font-mono text-neutral-400 text-sm transition-all hover:border-orange-500 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
            href="https://community.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Community
          </a>
        </div>
      </div>
      <div className="mt-8 border-neutral-800 border-t pt-8 text-center">
        <p className="font-mono text-neutral-600 text-xs">
          <Link
            className="text-orange-500 transition-colors hover:text-orange-400"
            to="/privacy"
          >
            Privacy Policy
          </Link>
        </p>
        <p className="mt-4 font-mono text-neutral-600 text-xs">
          Not affiliated with Cloudflare. Just someone who's love's their
          products.
        </p>
        <p className="mt-2 font-mono text-neutral-600 text-xs">
          Inspired by{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://justfuckingusehtml.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusehtml.com
          </a>
          ,{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://justfuckingusetailwind.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusetailwind.com
          </a>
          ,{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://justfuckingusereact.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            justfuckingusereact.com
          </a>
          .
        </p>
        <p className="mt-2 font-mono text-neutral-600 text-xs">
          Made by:{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://mynameistito.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            mynameistito
          </a>{" "}
          (
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://discord.com/users/611746802122620937"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
          ,{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
            href="https://github.com/mynameistito/justfuckingusecloudflare"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          ,{" "}
          <a
            className="text-orange-500 transition-colors hover:text-orange-400"
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
