import type React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Comparison } from "./components/comparison";
import { Cta } from "./components/cta";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { PrivacyPolicy } from "./components/privacy-policy";
import { Rant } from "./components/rant";
import { ShareLink } from "./components/share-link";
import { ThankYou } from "./components/thank-you";
import { usePersonalization } from "./hooks/use-personalization";

const HomePage: React.FC = () => {
  const { from } = usePersonalization();

  useEffect(() => {
    // Console easter egg from original content
    console.log(
      "%c🖕 LISTEN UP, DEVELOPER",
      "font-size: 32px; font-weight: bold; color: #F6821F;"
    );
    console.log(
      "%cStop paying AWS for oxygen.",
      "font-size: 18px; color: white;"
    );
    console.log(
      "%cJust use Cloudflare: https://dash.cloudflare.com/sign-up",
      "font-size: 16px; color: #F6821F;"
    );
  }, []);

  return (
    <>
      <main id="main-content">
        <Hero />
        <Rant />
        <Comparison />
        <Features />
        <Cta />
        <ShareLink />
        {from && <ThankYou from={from} />}
      </main>
      <Footer />
    </>
  );
};

const RouterContent: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    if (pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="selection:bg-brand min-h-screen selection:text-black">
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<PrivacyPolicy />} path="/privacy-policy" />
      </Routes>
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <RouterContent />
  </BrowserRouter>
);

export default App;
