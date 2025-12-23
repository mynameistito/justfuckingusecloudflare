import type React from "react";
import { Link } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => (
  <div className="mx-auto max-w-4xl px-6 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="font-anton text-5xl text-white uppercase tracking-tight md:text-6xl">
        The Fucking Privacy Policy
      </h1>
      <p className="mt-4 font-mono text-neutral-400 text-sm">
        Last updated: December 24, 2025
      </p>

      <div className="mt-12 space-y-8 font-sans text-neutral-300">
        <section>
          <p className="mt-4 leading-relaxed">
            Yeah we know, another goddamn wall of lawyer text. But here's the
            deal, degenerate: This site collects basically jack shit about you.
            We're not those creepy corporate overlords you're already running
            from.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            What We Collect (Spoiler: Not Your Soul)
          </h2>
          <p className="mt-4 leading-relaxed">
            We use Umami Cloud — the privacy-respecting analytics that doesn't
            track you like a stalker ex. It grabs only anonymized, aggregated
            garbage like:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>Page views and how you stumble around the site</li>
            <li>How long you stare at our beautiful rage</li>
            <li>Referrer (just the domain, not your life story)</li>
            <li>Browser/device type (anonymized, chill)</li>
            <li>
              Country/region level location (no street address, no IP stored on
              our end)
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            <strong className="text-white">
              NO names. NO emails. NO IP addresses. NO creepy account IDs. NO
              PII. PERIOD.
            </strong>{" "}
            We're not harvesting your data to sell to the highest bidder. We
            just want to know if anyone actually reads this manifesto or just
            rage-clicks away.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Public Shame (Aggregated Only)
          </h2>
          <p className="mt-4 leading-relaxed">
            Sometimes we might screenshot or tweet some high-level stats like
            "10k degenerates visited today and didn't immediately close the
            tab". That's it. Pure aggregated numbers. Impossible to backtrack to
            you. No individuals harmed in the making of these shitposts.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            No Cookies. No Bullshit Banners.
          </h2>
          <p className="mt-4 leading-relaxed">
            Umami doesn't use cookies or local storage. So no "ACCEPT ALL
            COOKIES OR WE CRY" popup. You're not being fingerprinted or tracked
            across the internet like some normie on Google Analytics. Freedom,
            baby.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Third-Party Services (The Only Ones We Couldn't Avoid)
          </h2>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>
              <strong className="text-white">Umami Cloud</strong> → analytics
              (privacy-first, no cookies, anonymized before it even hits their
              servers)
            </li>
            <li>
              <strong className="text-white">Google Fonts</strong> → pretty
              letters (they see your IP when fetching fonts because capitalism —
              check their policy if you care, we're not your mom)
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            That's literally it. No ad networks. No trackers. No pixel hell.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Data Goes Where?
          </h2>
          <p className="mt-4 leading-relaxed">
            Umami processes it, anonymizes it, aggregates it, and doesn't sell
            it or profile you. We don't touch it. It's their problem, not ours.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Your Rights (GDPR & Friends)
          </h2>
          <p className="mt-4 leading-relaxed">
            Since we collect zero personal data, there's nothing for you to
            "access, rectify, delete or rage-quit over". You win by default.
          </p>
          <p className="mt-4 leading-relaxed">Still wanna fight the power?</p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>Block analytics requests with uBlock/uMatrix/whatever</li>
            <li>
              Cry to Umami at{" "}
              <a
                className="text-orange-500 transition-colors hover:text-orange-400"
                href="https://umami.is"
                rel="noopener noreferrer"
                target="_blank"
              >
                umami.is
              </a>{" "}
              if you hate their vibe
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            We're trying to stay GDPR-compliant without being annoying about it.
            If you're in the EU, congrats — you're already safe here.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Changes to This Policy
          </h2>
          <p className="mt-4 leading-relaxed">
            We might update this when we feel like it. The date at the top is
            the truth. If you keep coming back and screaming at the screen, we
            take that as consent.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Contact
          </h2>
          <p className="mt-4 leading-relaxed">
            Got beef? Open an issue here and yell into the void:
          </p>
          <div className="mt-4 space-y-2 font-mono text-neutral-400">
            <p>
              GitHub:{" "}
              <a
                className="text-orange-500 transition-colors hover:text-orange-400"
                href="https://github.com/mynameistito/justfuckingusecloudflare"
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/mynameistito/justfuckingusecloudflare/issues
              </a>
            </p>
          </div>
        </section>

        <section className="mt-12 border-neutral-800 border-t pt-8">
          <p className="font-anton text-2xl text-white uppercase leading-relaxed tracking-tight">
            Stop Fucking Worrying About Privacy Here.
          </p>
          <p className="mt-4 font-anton text-2xl text-white uppercase leading-relaxed tracking-tight">
            We're Not The Villains.
          </p>
          <p className="mt-4 font-anton text-2xl text-white uppercase leading-relaxed tracking-tight">
            We're The Ones Telling You To Stop Paying serveral Bills.
          </p>
          <p className="mt-4 font-anton text-2xl text-orange-500 uppercase leading-relaxed tracking-tight">
            Just FuckingUse Cloudflare.
          </p>
        </section>
      </div>

      <div className="mt-12 border-neutral-800 border-t pt-8">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-transparent px-4 py-2 font-mono text-neutral-400 text-sm transition-all hover:border-orange-500 hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-2"
          to="/"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  </div>
);
