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
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const isDisabled = !(theirName.trim() && yourName.trim());

  const previewTheirName = normalizeName(theirName) ?? "";
  const previewYourName = normalizeName(yourName) ?? "";

  return (
    <section className="border-line bg-surface border-b px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-anton mb-8 text-4xl tracking-tight text-white uppercase md:text-5xl lg:text-6xl">
          KNOW SOMEONE WHO NEEDS <span className="text-brand">HELP</span>?
        </h2>
        <p className="text-muted-foreground mb-8 font-mono text-base md:text-lg">
          Share this link with them. They&apos;ll see a personalized version
          just for them.
        </p>

        <div className="space-y-6">
          <div>
            <label
              className="text-foreground-soft mb-2 block font-mono text-sm font-bold tracking-tight uppercase"
              htmlFor="your-name"
            >
              Your Name
            </label>
            <input
              className="border-line-strong bg-surface-raised placeholder:text-muted-dim focus:border-brand focus:ring-brand/50 w-full rounded-lg border px-4 py-3 font-mono text-white focus:ring-2 focus:outline-none"
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
              className="text-foreground-soft mb-2 block font-mono text-sm font-bold tracking-tight uppercase"
              htmlFor="their-name"
            >
              Their Name
            </label>
            <input
              className="border-line-strong bg-surface-raised placeholder:text-muted-dim focus:border-brand focus:ring-brand/50 w-full rounded-lg border px-4 py-3 font-mono text-white focus:ring-2 focus:outline-none"
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
            <div className="border-line-strong bg-surface-raised rounded-lg border p-4">
              <p className="text-muted-foreground font-mono text-sm">
                They&apos;ll see:{" "}
                <span className="text-brand">
                  &quot;Hey {previewTheirName}, if {previewYourName} sent you
                  this link, you need to...&quot;
                </span>
              </p>
            </div>
          )}

          <button
            aria-label="Copy share link"
            className="border-brand bg-brand hover:bg-brand-light focus-visible:outline-brand active:bg-brand-dark disabled:border-line-strong disabled:bg-line disabled:text-muted disabled:hover:bg-line w-full rounded-full border-2 px-10 py-5 font-mono font-bold tracking-tight text-black uppercase transition-colors hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:hover:shadow-none sm:w-auto"
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
