import type React from "react";
import { Link } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => (
  <div className="mx-auto max-w-4xl px-6 py-16">
    <div className="mx-auto max-w-3xl">
      <h1 className="font-anton text-5xl text-white uppercase tracking-tight md:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-4 font-mono text-neutral-400 text-sm">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-12 space-y-8 font-sans text-neutral-300">
        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Introduction
          </h2>
          <p className="mt-4 leading-relaxed">
            This privacy policy explains how we collect, use, and protect
            information when you visit{" "}
            <span className="font-mono text-orange-500">
              justfuckingusecloudflare.com
            </span>{" "}
            (the "Website").
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Information We Collect
          </h2>
          <p className="mt-4 leading-relaxed">
            We use Umami Cloud, a privacy-focused web analytics service, to
            understand how visitors interact with our Website. Umami Cloud
            collects the following anonymized data:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>Page views and navigation paths</li>
            <li>Time spent on pages</li>
            <li>Referrer information (which website you came from)</li>
            <li>Browser type and device information (anonymized)</li>
            <li>General geographic location (country/region level only)</li>
          </ul>
          <p className="mt-4 leading-relaxed">
            <strong className="text-white">
              No personal information is collected.
            </strong>{" "}
            We do not collect names, email addresses, IP addresses, or any other
            personally identifiable information (PII).
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            No Cookies Used
          </h2>
          <p className="mt-4 leading-relaxed">
            Umami Cloud does not use cookies or any other tracking technologies
            that store data on your device. This means:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>No cookie consent banner is required</li>
            <li>You are not tracked across different websites</li>
            <li>Your browsing history remains private</li>
            <li>No data is stored on your device</li>
          </ul>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Data Processing and Storage
          </h2>
          <p className="mt-4 leading-relaxed">
            Analytics data is collected and processed by Umami Cloud. All data
            is:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>Anonymized before collection</li>
            <li>Aggregated for statistical purposes only</li>
            <li>Not used to identify individual users</li>
            <li>Not shared with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Your Rights (GDPR Compliance)
          </h2>
          <p className="mt-4 leading-relaxed">
            Since we do not collect personally identifiable information, there
            is no personal data to access, modify, or delete. However, if you
            have any privacy concerns, you can:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>Contact us using the information provided below</li>
            <li>Use browser privacy tools to block analytics requests</li>
            <li>
              Review Umami Cloud's privacy practices at{" "}
              <a
                className="text-orange-500 transition-colors hover:text-orange-400"
                href="https://umami.is"
                rel="noopener noreferrer"
                target="_blank"
              >
                umami.is
              </a>
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            This Website and our use of Umami Cloud are designed to be compliant
            with the General Data Protection Regulation (GDPR) and other
            applicable privacy laws.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Third-Party Services
          </h2>
          <p className="mt-4 leading-relaxed">
            This Website uses the following third-party services:
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 font-mono text-neutral-400">
            <li>
              <strong className="text-white">Umami Cloud</strong> - Web
              analytics (privacy-focused, no cookies, GDPR compliant)
            </li>
            <li>
              <strong className="text-white">Google Fonts</strong> - Web fonts
              (may collect IP addresses per Google's privacy policy)
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            We recommend reviewing each service's privacy policy for more
            information about their data practices.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Changes to This Privacy Policy
          </h2>
          <p className="mt-4 leading-relaxed">
            We may update this privacy policy from time to time. The "Last
            updated" date at the top of this page indicates when changes were
            last made. Your continued use of the Website after any changes
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-tight">
            Contact Us
          </h2>
          <p className="mt-4 leading-relaxed">
            If you have any questions about this privacy policy, please create
            an issue on our GitHub repository:
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
                github.com/mynameistito/justfuckingusecloudflare
              </a>
            </p>
          </div>
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
