import { Button, Input, Surface, Text } from "@cloudflare/kumo";
import { CopyIcon } from "@phosphor-icons/react";
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
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 font-anton text-4xl text-kumo-default uppercase tracking-tight md:text-5xl lg:text-6xl">
          KNOW SOMEONE WHO NEEDS <span className="text-kumo-brand">HELP</span>?
        </h2>
        <p className="mb-10 font-mono text-kumo-subtle text-lg">
          Generate a personalised link. They'll see a version addressed directly
          to them.
        </p>

        <div className="flex flex-col gap-6">
          <Input
            label="Your Name"
            onChange={(e) => setYourName(e.target.value)}
            placeholder="Enter your name"
            value={yourName}
          />

          <Input
            label="Their Name"
            onChange={(e) => setTheirName(e.target.value)}
            placeholder="Enter their name"
            value={theirName}
          />

          {previewTheirName && previewYourName && (
            <Surface className="rounded-lg p-4">
              <Text color="subtle" size="sm">
                They'll see:{" "}
                <span className="text-kumo-brand">
                  "Hey {previewTheirName}, if {previewYourName} sent you this
                  link, you need to..."
                </span>
              </Text>
            </Surface>
          )}

          <div>
            <Button
              disabled={isDisabled}
              icon={CopyIcon}
              onClick={handleCopyLink}
              size="lg"
              variant="primary"
            >
              {copied ? "LINK COPIED!" : "COPY SHARE LINK"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
