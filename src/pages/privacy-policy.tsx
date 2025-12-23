import type React from "react";

export const PrivacyPolicyPage: React.FC = () => (
  <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
    <header className="space-y-3">
      <p className="font-mono text-orange-500 text-xs uppercase tracking-[0.2em]">
        Privacy, Analytics & Cookies
      </p>
      <h1 className="font-anton text-4xl text-white uppercase tracking-tight sm:text-5xl">
        Privacy, Analytics & Cookies
      </h1>
    </header>

    <div className="space-y-6 font-mono text-neutral-300 text-sm leading-relaxed">
      <p>
        This project uses privacy-conscious analytics to understand how the site
        is used and to improve the content over time. It is a community-built,
        satirical, open-source project, not official guidance from any provider.
      </p>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Analytics tooling
        </h2>
        <p>
          Analytics is provided by{" "}
          <span className="font-semibold">Google Analytics</span>, delivered
          through <span className="font-semibold">Cloudflare Zaraz</span>.
          Cloudflare Zaraz acts as a proxy, so Google&apos;s scripts are not
          loaded directly from your browser.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          IP handling
        </h2>
        <p>
          Cloudflare Zaraz&apos;s{" "}
          <span className="font-semibold">Hide originating IP address</span>{" "}
          feature is enabled. This means{" "}
          <span className="font-semibold">
            Google Analytics does not receive your raw IP address
          </span>
          . Instead, Google Analytics only sees IP information proxied by
          Cloudflare, which reduces how directly identifiable the analytics data
          is, while still allowing approximate geolocation (for example,
          country/region).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          What is generally collected
        </h2>
        <p>Typical analytics data includes:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Pages visited and basic navigation paths</li>
          <li>Timestamps and approximate visit duration</li>
          <li>Approximate location (for example, country/region)</li>
          <li>
            Device and browser information (for example, mobile vs desktop)
          </li>
          <li>Referrer information (for example, which site sent you here)</li>
        </ul>
        <p>
          The maintainers intentionally avoid sending{" "}
          <span className="font-semibold">
            direct identifiers such as names, email addresses, or raw user IDs
          </span>{" "}
          into Google Analytics events.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Why this data is collected
        </h2>
        <p>This data is used to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand which parts of the site are useful or confusing</li>
          <li>Prioritise improvements and content updates</li>
        </ul>
        <p>
          It is <span className="font-semibold">not</span> used for ads,
          behavioural profiling, or selling user data.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Who processes the data
        </h2>
        <p>
          <span className="font-semibold">Cloudflare</span> provides the
          infrastructure and Zaraz proxy/consent tooling.{" "}
          <span className="font-semibold">Google</span> acts as the analytics
          provider that receives pseudonymised and aggregated usage data. Data
          may be processed outside of New Zealand, including in the United
          States or other regions where Cloudflare and Google operate.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Consent and cookies
        </h2>
        <p>
          If you see a consent modal on the live site, it is powered by the{" "}
          <span className="font-semibold">
            Cloudflare Zaraz Consent Management Platform (CMP)
          </span>
          . Tools like Google Analytics are associated with an{" "}
          <span className="font-semibold">Analytics</span> purpose and are only
          loaded when you consent to that purpose.
        </p>
        <p>
          Your consent preferences are stored in a{" "}
          <span className="font-semibold">first-party cookie</span> managed by
          Cloudflare Zaraz, which records which purposes you have accepted or
          declined.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Your controls
        </h2>
        <p>You can:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Use the on-site consent controls (where available) to accept or
            decline analytics
          </li>
          <li>
            Reopen the consent modal via any{" "}
            <span className="font-semibold">
              Cookie settings / Privacy settings
            </span>{" "}
            link exposed by the site
          </li>
          <li>
            Use your browser settings, extensions, or privacy tools to block
            analytics or cookies entirely
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-anton text-white text-xl uppercase tracking-tight">
          Disclaimer
        </h2>
        <p>
          Nothing on this page is legal advice. It is a good-faith description
          of how this open-source project uses analytics, written from the
          perspective of a maintainer based in New Zealand with a potentially
          global audience. If you have privacy questions or concerns, please
          raise an issue on the project&apos;s GitHub repository.
        </p>
      </section>
    </div>
  </section>
);
