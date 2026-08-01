import { ArrowUpRight, List, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem("jfu-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

/**
 * Persistent navigation and page-level theme control.
 *
 * @returns The responsive site header.
 */
export const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("jfu-theme", theme);
  }, [theme]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a
        className="brand-mark"
        href="#top"
        aria-label="Just Fucking Use Cloudflare home"
      >
        <span>JFU</span>
        <strong>CF</strong>
      </a>

      <nav
        className={menuOpen ? "site-nav is-open" : "site-nav"}
        id="primary-navigation"
        aria-label="Primary"
      >
        <a href="#stack-builder" onClick={closeMenu}>
          Stack Builder
        </a>
        <a href="#platform" onClick={closeMenu}>
          Platform
        </a>
        <a href="#live-lab" onClick={closeMenu}>
          Live Lab
        </a>
        <a href="#architecture" onClick={closeMenu}>
          Architecture
        </a>
        <a href="#this-site" onClick={closeMenu}>
          This Site
        </a>
        <a
          className="nav-cta"
          href="https://dash.cloudflare.com/sign-up"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
          aria-label="Start building with Cloudflare (opens in a new tab)"
        >
          Start building
          <ArrowUpRight aria-hidden="true" weight="bold" />
        </a>
      </nav>

      <div className="header-actions">
        <button
          className="icon-button"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? (
            <Sun aria-hidden="true" weight="bold" />
          ) : (
            <Moon aria-hidden="true" weight="bold" />
          )}
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? (
            <X aria-hidden="true" weight="bold" />
          ) : (
            <List aria-hidden="true" weight="bold" />
          )}
        </button>
      </div>
    </header>
  );
};
