import type React from "react";
import { useState } from "react";

export const ShareLink: React.FC = () => {
  const [theirName, setTheirName] = useState("");
  const [yourName, setYourName] = useState("");
  const [copied, setCopied] = useState(false);

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
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const isDisabled = !(theirName.trim() && yourName.trim());

  // Normalize names for preview (capitalize first letter)
  const normalizeForPreview = (name: string) => {
    if (!name.trim()) {
      return "";
    }
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const previewTheirName = normalizeForPreview(theirName);
  const previewYourName = normalizeForPreview(yourName);

  return (
    <section className="border-neutral-800 border-b bg-neutral-950 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 font-anton text-4xl text-white uppercase tracking-tight md:text-5xl lg:text-6xl">
          KNOW SOMEONE WHO NEEDS <span className="text-orange-500">HELP</span>?
        </h2>
        <p className="mb-8 font-mono text-base text-neutral-400 md:text-lg">
          Share this link with them. They'll see a personalized version just for
          them.
        </p>

        <div className="space-y-6">
          <div>
            <label
              className="mb-2 block font-bold font-mono text-neutral-300 text-sm uppercase tracking-tight"
              htmlFor="your-name"
            >
              Your Name
            </label>
            <input
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 font-mono text-white placeholder:text-neutral-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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
              className="mb-2 block font-bold font-mono text-neutral-300 text-sm uppercase tracking-tight"
              htmlFor="their-name"
            >
              Their Name
            </label>
            <input
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 font-mono text-white placeholder:text-neutral-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
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
            <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
              <p className="font-mono text-neutral-400 text-sm">
                They'll see:{" "}
                <span className="text-orange-500">
                  "Hey {previewTheirName}, if {previewYourName} sent you this
                  link, you need to..."
                </span>
              </p>
            </div>
          )}

          <button
            aria-label="Copy share link"
            className="w-full rounded-full border-2 border-orange-500 bg-orange-500 px-10 py-5 font-bold font-mono text-black uppercase tracking-tight transition-all hover:bg-orange-400 hover:shadow-[0_0_40px_rgba(246,130,31,0.4)] focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-4 active:bg-orange-600 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:hover:bg-neutral-800 disabled:hover:shadow-none sm:w-auto"
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
