import type React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Comparison } from "./components/comparison";
import { CTA } from "./components/cta";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { PrivacyPolicy } from "./components/privacy-policy";
import { Rant } from "./components/rant";

const HomePage: React.FC = () => {
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
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-full focus:bg-orange-500 focus:px-6 focus:py-3 focus:font-bold focus:font-mono focus:text-black focus:uppercase focus:tracking-tight focus:outline-none"
        href="#main-content"
      >
        Skip to main content
      </a>
      <main id="main-content">
        <Hero />
        <Rant />
        <Comparison />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen selection:bg-orange-500 selection:text-black">
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<PrivacyPolicy />} path="/privacy-policy" />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
