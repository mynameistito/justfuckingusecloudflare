import { Link, Text } from "@cloudflare/kumo";
import type React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Footer: React.FC = () => (
  <footer className="border-kumo-line border-t bg-kumo-canvas px-6 py-12">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <Text bold size="base">
            Just Fucking Use Cloudflare
          </Text>
          <Text color="subtle" size="sm">
            Stop fucking around. Start fucking building.
          </Text>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <Link
            href="https://dash.cloudflare.com/sign-up"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign Up <Link.ExternalIcon />
          </Link>
          <Link
            href="https://developers.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Docs <Link.ExternalIcon />
          </Link>
          <Link
            href="https://blog.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Blog <Link.ExternalIcon />
          </Link>
          <Link
            href="https://community.cloudflare.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Community <Link.ExternalIcon />
          </Link>
        </div>
      </div>

      <div className="mt-8 border-kumo-line border-t pt-8 text-center">
        <Text color="subtle" size="sm">
          <Link render={<RouterLink to="/privacy-policy" />} variant="inline">
            Privacy Policy
          </Link>
        </Text>
        <div className="mt-3">
          <Text color="subtle" size="sm">
            Not affiliated with Cloudflare. Just someone who loves their
            products.
          </Text>
        </div>
        <div className="mt-2">
          <Text color="subtle" size="sm">
            Inspired by{" "}
            <Link
              href="https://justfuckingusehtml.com"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              justfuckingusehtml.com
            </Link>
            ,{" "}
            <Link
              href="https://justfuckingusetailwind.com"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              justfuckingusetailwind.com
            </Link>
            ,{" "}
            <Link
              href="https://justfuckingusereact.com"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              justfuckingusereact.com
            </Link>{" "}
            and the{" "}
            <Link
              href="https://justfuckinguse.com"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              justfuckinguse.com
            </Link>{" "}
            ecosystem.
          </Text>
        </div>
        <div className="mt-2">
          <Text color="subtle" size="sm">
            Made by:{" "}
            <Link
              href="https://mynameistito.com"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              mynameistito
            </Link>{" "}
            (
            <Link
              href="https://buymeacoffee.com/mynameistito"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              Buy Me a Coffee
            </Link>
            ,{" "}
            <Link
              href="https://discord.com/users/611746802122620937"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              Discord
            </Link>
            ,{" "}
            <Link
              href="https://github.com/mynameistito/justfuckingusecloudflare"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              GitHub
            </Link>
            ,{" "}
            <Link
              href="https://x.com/mynameistito"
              rel="noopener noreferrer"
              target="_blank"
              variant="inline"
            >
              X
            </Link>
            )
          </Text>
        </div>
      </div>
    </div>
  </footer>
);
