import type React from "react";
import { Link } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => (
  <div className="mx-auto max-w-4xl px-6 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="font-anton text-5xl tracking-tight text-white uppercase md:text-6xl">
        The Fucking Privacy Policy
      </h1>
      <p className="text-muted-foreground mt-4 font-mono text-sm">
        Last updated: April 25, 2026
      </p>

      <div className="text-foreground-soft mt-12 space-y-8 font-sans">
        <section>
          <p className="mt-4 leading-relaxed">
            Yeah we know, another goddamn wall of lawyer text. But here&apos;s
            the deal, degenerate: This site collects basically jack shit about
            you. We&apos;re not those creepy corporate overlords you&apos;re
            already running from.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            What We Collect (Spoiler: Not Your Soul)
          </h2>
          <p className="mt-4 leading-relaxed">
            We use Cloudflare Web Analytics — privacy-respecting, no cookies, no
            fingerprinting. It grabs only anonymized, aggregated garbage like:
          </p>
          <ul className="text-muted-foreground mt-4 ml-6 list-disc space-y-2 font-mono">
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
            We&apos;re not harvesting your data to sell to the highest bidder.
            We just want to know if anyone actually reads this manifesto or just
            rage-clicks away.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Public Shame (Aggregated Only)
          </h2>
          <p className="mt-4 leading-relaxed">
            Sometimes we might screenshot or tweet some high-level stats like
            &quot;10k degenerates visited today and didn&apos;t immediately
            close the tab&quot;. That&apos;s it. Pure aggregated numbers.
            Impossible to backtrack to you. No individuals harmed in the making
            of these shit posts.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            No Cookies. No Bullshit Banners.
          </h2>
          <p className="mt-4 leading-relaxed">
            Cloudflare Web Analytics doesn&apos;t use cookies or local storage.
            So no &quot;ACCEPT ALL COOKIES OR WE CRY&quot; popup. You&apos;re
            not being fingerprinted or tracked across the internet like some
            normie on Google Analytics. Freedom, baby.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Third-Party Services (The Only Ones We Couldn&apos;t Avoid)
          </h2>
          <ul className="text-muted-foreground mt-4 ml-6 list-disc space-y-2 font-mono">
            <li>
              <strong className="text-white">Cloudflare Web Analytics</strong> →
              analytics (privacy-first, no cookies, data stays on Cloudflare)
            </li>
            <li>
              <strong className="text-white">Cloudflare Fonts</strong> → pretty
              letters (Google Fonts, but served by Cloudflare — no Google
              tracking your eyeballs)
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            That&apos;s literally it. No ad networks. No trackers. No pixel
            hell.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Data Goes Where?
          </h2>
          <p className="mt-4 leading-relaxed">
            Cloudflare processes it, anonymizes it, aggregates it, and
            doesn&apos;t sell it or profile you. Data stays on Cloudflare&apos;s
            infrastructure — nowhere else.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Your Rights (GDPR & Friends)
          </h2>
          <p className="mt-4 leading-relaxed">
            Since we collect zero personal data, there&apos;s nothing for you to
            &quot;access, rectify, delete or rage-quit over&quot;. You win by
            default.
          </p>
          <p className="mt-4 leading-relaxed">Still wanna fight the power?</p>
          <ul className="text-muted-foreground mt-4 ml-6 list-disc space-y-2 font-mono">
            <li>Block analytics requests with uBlock/uMatrix/whatever</li>
            <li>
              Cry to Cloudflare at{" "}
              <a
                className="text-brand hover:text-brand-light transition-colors"
                href="https://www.cloudflare.com/privacypolicy/"
                rel="noopener noreferrer"
                target="_blank"
              >
                cloudflare.com/privacypolicy
              </a>{" "}
              if you hate their vibe
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            We&apos;re trying to stay GDPR-compliant without being annoying
            about it. If you&apos;re in the EU, congrats — you&apos;re already
            safe here.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Changes to This Policy
          </h2>
          <p className="mt-4 leading-relaxed">
            We might update this when we feel like it. The date at the top is
            the truth. If you keep coming back and screaming at the screen, we
            take that as consent.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl tracking-tight text-white uppercase">
            Contact
          </h2>
          <p className="mt-4 leading-relaxed">
            Got beef? Open an issue here and yell into the void:
          </p>
          <div className="text-muted-foreground mt-4 space-y-2 font-mono">
            <p>
              GitHub:{" "}
              <a
                className="text-brand hover:text-brand-light transition-colors"
                href="https://github.com/mynameistito/justfuckingusecloudflare"
                rel="noopener noreferrer"
                target="_blank"
              >
                github.com/mynameistito/justfuckingusecloudflare/issues
              </a>
            </p>
          </div>
        </section>

        <section className="border-line mt-12 border-t pt-8">
          <p className="font-anton text-2xl leading-relaxed tracking-tight text-white uppercase">
            Stop Fucking Worrying About Privacy Here.
          </p>
          <p className="font-anton mt-4 text-2xl leading-relaxed tracking-tight text-white uppercase">
            We&apos;re Not The Villains.
          </p>
          <p className="font-anton mt-4 text-2xl leading-relaxed tracking-tight text-white uppercase">
            We&apos;re The Ones Telling You To Stop Paying several Bills.
          </p>
          <p className="font-anton text-brand mt-4 text-2xl leading-relaxed tracking-tight uppercase">
            Just FuckingUse Cloudflare.
          </p>
        </section>
      </div>

      <div className="border-line mt-12 border-t pt-8">
        <Link
          className="border-line-strong text-muted-foreground hover:border-brand hover:text-brand focus-visible:outline-brand inline-flex items-center gap-2 rounded-full border bg-transparent px-4 py-2 font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          to="/"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  </div>
);
