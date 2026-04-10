import { Surface } from "@cloudflare/kumo";
import type React from "react";
import { useEffect, useState } from "react";
import {
  normalizeName,
  usePersonalization,
} from "../hooks/use-personalization";

export const ShareLink: React.FC = () => {
  const { to } = usePersonalization();
  const [theirName, setTheirName] = useState("");
  const [yourName, setYourName] = useState(to || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
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
    <section className="border-kumo-line border-b bg-kumo-canvas px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 font-anton text-4xl text-kumo-default uppercase tracking-tight md:text-5xl lg:text-6xl">
          KNOW SOMEONE WHO NEEDS <span className="text-kumo-brand">HELP</span>?
        </h2>
        <p className="mb-8 font-mono text-kumo-subtle text-lg md:text-lg">
          Share this link with them. They'll see a personalized version just for
          them.
        </p>

        <div className="space-y-6">
          <div>
            <label
              className="mb-2 block font-bold font-mono text-kumo-default text-sm uppercase tracking-tight"
              htmlFor="your-name"
            >
              Your Name
            </label>
            <input
              className="w-full rounded-lg border border-kumo-line bg-kumo-elevated px-4 py-3 font-mono text-kumo-default placeholder:text-kumo-inactive focus:border-kumo-brand focus:outline-none focus:ring-2 focus:ring-kumo-brand/50"
              id="your-name"
              onChange={(e) => {
                setYourName(e.target.value);
              }}
              placeholder="Enter your name"
              type="text"
              value={yourName}
            />
          </div>

          <div>
            <label
              className="mb-2 block font-bold font-mono text-kumo-default text-sm uppercase tracking-tight"
              htmlFor="their-name"
            >
              Their Name
            </label>
            <input
              className="w-full rounded-lg border border-kumo-line bg-kumo-elevated px-4 py-3 font-mono text-kumo-default placeholder:text-kumo-inactive focus:border-kumo-brand focus:outline-none focus:ring-2 focus:ring-kumo-brand/50"
              id="their-name"
              onChange={(e) => {
                setTheirName(e.target.value);
              }}
              placeholder="Enter their name"
              type="text"
              value={theirName}
            />
          </div>

          {previewTheirName && previewYourName && (
            <Surface className="rounded-lg p-4">
              <p className="font-mono text-kumo-subtle text-sm">
                They'll see:{" "}
                <span className="text-kumo-brand">
                  "Hey {previewTheirName}, if {previewYourName} sent you this
                  link, you need to..."
                </span>
              </p>
            </Surface>
          )}

          <button
            aria-label="Copy share link"
            className="brand-glow w-full rounded-full border-2 border-kumo-brand bg-kumo-brand px-10 py-5 font-bold font-mono text-kumo-canvas uppercase tracking-tight transition-all hover:bg-kumo-brand-hover focus-visible:outline-2 focus-visible:outline-kumo-brand focus-visible:outline-offset-4 active:opacity-80 disabled:cursor-not-allowed disabled:border-kumo-line disabled:bg-kumo-fill disabled:text-kumo-inactive disabled:hover:bg-kumo-fill disabled:hover:shadow-none sm:w-auto"
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
