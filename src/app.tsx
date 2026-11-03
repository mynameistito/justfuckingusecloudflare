import { Button, Input, LayerCard, Link, Text } from "@cloudflare/kumo";
import { CloudIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { FinalCta, Marketing } from "./components/marketing";
import { normalizeName, usePersonalization } from "./hooks/use-personalization";

const Header: React.FC = () => {
  const { search } = useLocation();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href={`/${search}`} variant="plain" className="brand">
          <CloudIcon weight="fill" size={28} aria-hidden="true" /> Just fucking
          use Cloudflare
        </Link>
        <nav aria-label="Main navigation" className="nav">
          <Link href={`/${search}#platform`} variant="plain">
            The platform
          </Link>
          <Link href={`/${search}#why`} variant="plain">
            Why Cloudflare
          </Link>
          <Link href={`/${search}#share`} variant="plain">
            Share
          </Link>
        </nav>
        <Link href="https://dash.cloudflare.com/sign-up">Start building →</Link>
      </div>
    </header>
  );
};

const ShareLink: React.FC = () => {
  const { to } = usePersonalization();
  const [yourName, setYourName] = useState(to ?? "");
  const [theirName, setTheirName] = useState("");
  const [status, setStatus] = useState("");
  const shareUrl =
    yourName.trim() && theirName.trim()
      ? `${window.location.origin}/?${new URLSearchParams({ from: yourName.trim(), to: theirName.trim() }).toString()}`
      : "";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("Link copied. Go make someone's day.");
    } catch {
      setStatus("Couldn't copy automatically. Select and copy the link below.");
    }
  };
  return (
    <section className="share-section" id="share">
      <div className="content-grid share-layout">
        <div>
          <Text as="h2">Know someone who needs help?</Text>
          <Text>
            Share this link with them. They’ll see a personalized version just
            for them.
          </Text>
        </div>
        <LayerCard className="share-card">
          <div className="form-grid">
            <Input
              label="Your name"
              placeholder="Your name"
              value={yourName}
              onChange={(event) => {
                setYourName(event.target.value);
                setStatus("");
              }}
            />
            <Input
              label="Their name"
              placeholder="Their name"
              value={theirName}
              onChange={(event) => {
                setTheirName(event.target.value);
                setStatus("");
              }}
            />
          </div>
          {shareUrl && (
            <>
              <Text variant="secondary">
                Hey {normalizeName(theirName)}, {normalizeName(yourName)} has
                something to tell you.
              </Text>
              <Input
                label="Your share link"
                value={shareUrl}
                readOnly
                onFocus={(event) => event.currentTarget.select()}
              />
            </>
          )}
          <Button variant="primary" disabled={!shareUrl} onClick={copyLink}>
            Copy share link
          </Button>
          <Text aria-live="polite">{status}</Text>
        </LayerCard>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const { search } = useLocation();
  return (
    <footer className="site-footer">
      <div className="shell footer-layout">
        <div>
          <div className="footer-brand">
            <CloudIcon weight="fill" size={28} aria-hidden="true" /> Just
            fucking use Cloudflare
          </div>
          <Text variant="secondary">
            Stop fucking around. Start fucking building.
          </Text>
        </div>
        <div className="footer-column">
          <Text as="h3">Get started</Text>
          <Link href="https://dash.cloudflare.com/sign-up">Sign up</Link>
          <Link href="https://developers.cloudflare.com">Docs</Link>
          <Link href="https://blog.cloudflare.com">Blog</Link>
        </div>
        <div className="footer-column">
          <Text as="h3">Explore</Text>
          <Link href="https://community.cloudflare.com">Community</Link>
          <Link href="https://www.cloudflare.com/products/registrar/">
            Domains
          </Link>
          <Link href="https://github.com/mynameistito/justfuckingusecloudflare">
            GitHub
          </Link>
        </div>
        <div className="footer-column">
          <Text as="h3">About</Text>
          <Link href={`/privacy-policy${search}`}>Privacy policy</Link>
          <Link href="https://mynameistito.com">Made by mynameistito</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <Text variant="secondary">
          Not affiliated with Cloudflare. Just someone who loves their products.
        </Text>
        <Text variant="secondary">
          Inspired by{" "}
          <Link href="https://justfuckingusehtml.com">
            justfuckingusehtml.com
          </Link>
          ,{" "}
          <Link href="https://justfuckingusetailwind.com">
            justfuckingusetailwind.com
          </Link>
          ,{" "}
          <Link href="https://justfuckingusereact.com">
            justfuckingusereact.com
          </Link>{" "}
          and the{" "}
          <Link href="https://justfuckinguse.com">justfuckinguse.com</Link>{" "}
          ecosystem.
        </Text>
      </div>
    </footer>
  );
};

const HomePage: React.FC = () => {
  const { from } = usePersonalization();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Marketing />
        <ShareLink />
        {from && (
          <div className="shell attribution">
            <Text>
              Don’t forget to fucking thank {from} for sending you this link.
              They’re looking out for you.
            </Text>
          </div>
        )}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
};

const PrivacyPolicy: React.FC = () => {
  const { search } = useLocation();
  return (
    <>
      <Header />
      <main className="shell policy" id="main-content" tabIndex={-1}>
        <Link href={`/${search}`}>← Back to home</Link>
        <Text as="h1">The fucking privacy policy</Text>
        <Text variant="secondary">Last updated: November 3, 2026</Text>
        <div className="policy-content">
          <Text>
            Here’s the deal: this is a community-made site, not a scheme to
            collect your life story.
          </Text>
          <section>
            <Text as="h2">Personalized links</Text>
            <Text>
              Names you enter to create a share link are included in its URL.
              Anyone with the link can see them, and URLs may appear in browser
              history, server logs, or referrer information. Please don’t put
              sensitive information in them.
            </Text>
          </section>
          <section>
            <Text as="h2">Analytics and infrastructure</Text>
            <Text>
              This site is served using Cloudflare. Cloudflare may process
              technical information about requests to deliver and protect the
              site. If Cloudflare Web Analytics is enabled, it provides
              aggregated usage information without analytics cookies. See{" "}
              <Link href="https://www.cloudflare.com/privacypolicy/">
                Cloudflare’s privacy policy
              </Link>{" "}
              for details.
            </Text>
          </section>
          <section>
            <Text as="h2">What analytics tells us</Text>
            <Text>
              The original site uses Cloudflare Web Analytics to understand page
              views, visits, referring domains, browser and device types, and
              country-level usage. These are aggregate reports, rather than a
              list of people who visited. We may share high-level totals or
              screenshots of aggregate statistics publicly.
            </Text>
          </section>
          <section>
            <Text as="h2">Data processing and your choices</Text>
            <Text>
              Cloudflare delivers the site and processes its analytics. Its
              privacy policy explains its handling of technical request data. We
              do not run a separate visitor account database. You can block
              analytics requests with your browser or a content blocker, and
              contact us about privacy questions or requests through GitHub.
              Avoid posting personal information in a public issue.
            </Text>
          </section>
          <section>
            <Text as="h2">Cookies and third parties</Text>
            <Text>
              This site does not set its own advertising cookies or sell your
              personal information. External links take you to services with
              their own privacy practices.
            </Text>
          </section>
          <Text>
            Stop fucking worrying about your cloud bill. We’re here to help you
            ship, not sell your life story. Just fucking use Cloudflare.
          </Text>
          <section>
            <Text as="h2">Questions or changes</Text>
            <Text>
              We may update this policy as the site changes. Have a question?{" "}
              <Link href="https://github.com/mynameistito/justfuckingusecloudflare/issues">
                Open an issue on GitHub
              </Link>
              .
            </Text>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  </BrowserRouter>
);
export default App;
