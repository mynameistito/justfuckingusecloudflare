import {
  Button,
  Input,
  LayerCard,
  Link,
  LinkButton,
  Text,
} from "@cloudflare/kumo";
import {
  ArrowRightIcon,
  CloudIcon,
  DatabaseIcon,
  GlobeIcon,
  LightningIcon,
  LockKeyIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { normalizeName, usePersonalization } from "./hooks/use-personalization";

const products = [
  {
    description:
      "Deploy Workers close to your users. Your code gets around more than your infrastructure team does.",
    icon: LightningIcon,
    title: "Compute that goes everywhere",
  },
  {
    description:
      "Store objects with R2, query data with D1, and give your growing pile of side projects a home.",
    icon: DatabaseIcon,
    title: "Storage without the circus",
  },
  {
    description:
      "Protect your apps and APIs with a network that handles the ugly stuff before it reaches you.",
    icon: LockKeyIcon,
    title: "Security built in",
  },
  {
    description:
      "Build, connect, and deliver from one platform. Fewer dashboards, fewer invoices, fewer existential crises.",
    icon: GlobeIcon,
    title: "One global network",
  },
];

const Header: React.FC = () => {
  const { search } = useLocation();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href={`/${search}`} variant="plain" className="brand">
          <CloudIcon weight="fill" size={30} aria-hidden="true" />
          <span>
            Just fucking use <strong>Cloudflare</strong>
          </span>
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
        <Link
          className="header-action"
          href="https://dash.cloudflare.com/sign-up"
        >
          Start building <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
};

const NetworkVisual: React.FC = () => (
  <div className="network" aria-hidden="true">
    <div className="network-grid" />
    <div className="orbit orbit-one" />
    <div className="orbit orbit-two" />
    <div className="orbit orbit-three" />
    <div className="network-center">
      <CloudIcon weight="fill" size={65} />
      <span>
        One network.
        <br />A lot less bullshit.
      </span>
    </div>
    <span className="node node-one" />
    <span className="node node-two" />
    <span className="node node-three" />
    <span className="node node-four" />
    <span className="network-label label-one">COMPUTE</span>
    <span className="network-label label-two">STORAGE</span>
    <span className="network-label label-three">SECURITY</span>
    <span className="network-label label-four">NETWORK</span>
  </div>
);

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
      <div className="shell share-layout">
        <div>
          <p className="eyebrow">Spread the word</p>
          <h2>Know someone who needs a little intervention?</h2>
          <Text>
            Send them a personalized nudge. Because friends don’t let friends
            manage seventeen dashboards.
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
          <p aria-live="polite" className="status">
            {status}
          </p>
        </LayerCard>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="shell footer-top">
      <div>
        <div className="footer-brand">
          <CloudIcon weight="fill" size={28} aria-hidden="true" /> Just fucking
          use Cloudflare
        </div>
        <Text variant="secondary">
          Stop fucking around. Start fucking building.
        </Text>
      </div>
      <div className="footer-links">
        <Link href="https://developers.cloudflare.com">Developer docs</Link>
        <Link href="https://community.cloudflare.com">Community</Link>
        <Link href="https://github.com/mynameistito/justfuckingusecloudflare">
          GitHub
        </Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </div>
    </div>
    <div className="shell footer-bottom">
      <Text variant="secondary">
        A community-made satire. Not affiliated with or endorsed by Cloudflare.
      </Text>
      <Text variant="secondary">
        Made by <Link href="https://mynameistito.com">mynameistito</Link>.
      </Text>
    </div>
  </footer>
);

const HomePage: React.FC = () => {
  const { to, from } = usePersonalization();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">The internet is complicated enough</p>
              {(to || from) && (
                <Text variant="secondary">
                  {to ? `Hey ${to}` : "Hey there"}
                  {from ? `, ${from} sent you a message` : ""}.
                </Text>
              )}
              <h1>
                Just fucking use <span>Cloudflare.</span>
              </h1>
              <Text>
                Stop paying seventeen different bills for your shitty todo app.
                Build, secure, and ship your next big idea on a platform that
                brings it all together.
              </Text>
              <div className="actions">
                <LinkButton
                  variant="primary"
                  href="https://dash.cloudflare.com/sign-up"
                >
                  Start building <ArrowRightIcon aria-hidden="true" />
                </LinkButton>
                <Link href="#platform">
                  Explore the platform <ArrowRightIcon aria-hidden="true" />
                </Link>
              </div>
            </div>
            <NetworkVisual />
          </div>
        </section>
        <section className="intro" id="why">
          <div className="shell intro-grid">
            <div>
              <p className="eyebrow">A better way to build</p>
              <h2>Your infrastructure shouldn’t be your full-time job.</h2>
            </div>
            <div className="intro-copy">
              <Text>
                Somewhere along the way, deploying an app became an elaborate
                ritual involving a dozen vendors, a spreadsheet, and a small
                fortune.
              </Text>
              <Text>
                There’s another way. Cloudflare puts the tools you need on one
                global network, so you can spend less time connecting services
                and more time actually making things.
              </Text>
              <Link href="https://www.cloudflare.com/developer-platform/">
                Meet the developer platform{" "}
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="platform" id="platform">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">The platform</p>
                <h2>Everything you need. Less of the nonsense.</h2>
              </div>
              <Text variant="secondary">
                From your first request to your next million, there’s a tool for
                that.
              </Text>
            </div>
            <div className="product-grid">
              {products.map(({ icon: Icon, title, description }) => (
                <LayerCard className="product-card" key={title}>
                  <Icon className="product-icon" size={28} aria-hidden="true" />
                  <h3>{title}</h3>
                  <Text variant="secondary">{description}</Text>
                </LayerCard>
              ))}
            </div>
          </div>
        </section>
        <section className="cta">
          <div className="shell cta-inner">
            <div>
              <p className="eyebrow">Ready when you are</p>
              <h2>Go build something already.</h2>
              <Text>
                Your idea deserves better than another weekend configuring
                infrastructure.
              </Text>
            </div>
            <LinkButton
              variant="primary"
              href="https://dash.cloudflare.com/sign-up"
            >
              Get started with Cloudflare <ArrowRightIcon aria-hidden="true" />
            </LinkButton>
          </div>
        </section>
        <ShareLink />
        {from && (
          <div className="shell attribution">
            <Text>
              Don’t forget to thank {from}. They’re looking out for you.
            </Text>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

const PrivacyPolicy: React.FC = () => (
  <>
    <Header />
    <main className="shell policy" id="main-content" tabIndex={-1}>
      <Link href="/">← Back to home</Link>
      <p className="eyebrow">The fine print</p>
      <h1>The fucking privacy policy</h1>
      <Text variant="secondary">Last updated: April 25, 2026</Text>
      <div className="policy-content">
        <Text>
          Here’s the deal: this is a community-made site, not a scheme to
          collect your life story.
        </Text>
        <section>
          <h2>Personalized links</h2>
          <Text>
            Names you enter to create a share link are included in its URL.
            Anyone with the link can see them, and URLs may appear in browser
            history, server logs, or referrer information. Please don’t put
            sensitive information in them.
          </Text>
        </section>
        <section>
          <h2>Analytics and infrastructure</h2>
          <Text>
            This site is served using Cloudflare. Cloudflare may process
            technical information about requests to deliver and protect the
            site. If Cloudflare Web Analytics is enabled, it provides aggregated
            usage information without analytics cookies. See{" "}
            <Link href="https://www.cloudflare.com/privacypolicy/">
              Cloudflare’s privacy policy
            </Link>{" "}
            for details.
          </Text>
        </section>
        <section>
          <h2>Cookies and third parties</h2>
          <Text>
            This site does not set its own advertising cookies or sell your
            personal information. External links take you to services with their
            own privacy practices.
          </Text>
        </section>
        <section>
          <h2>Questions or changes</h2>
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
