import { ArrowUpRight, List, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  let savedTheme: string | null = null;
  try {
    savedTheme = window.localStorage.getItem("jfu-theme");
  } catch {
    // Storage can be disabled by browser privacy settings.
  }
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
    try {
      window.localStorage.setItem("jfu-theme", theme);
    } catch {
      // Theme selection remains available without persistence.
    }
  }, [theme]);

  useEffect(() => {
    const closeForDesktop = (): void => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeForDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeForDesktop);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    const id = event.currentTarget.hash.slice(1);
    document.querySelector(`#${id}`)?.scrollIntoView();
    closeMenu();
  };

  return (
    <header className="site-header">
      <a
        className="brand-mark"
        href="#top"
        aria-label="Just Fucking Use Cloudflare home"
        onClick={scrollToSection}
      >
        <span>JFU</span>
        <strong>CF</strong>
      </a>

      <nav
        className={menuOpen ? "site-nav is-open" : "site-nav"}
        id="primary-navigation"
        aria-label="Primary"
      >
        <a href="#stack-builder" onClick={scrollToSection}>
          Stack Builder
        </a>
        <a href="#platform" onClick={scrollToSection}>
          Platform
        </a>
        <a href="#live-lab" onClick={scrollToSection}>
          Live Lab
        </a>
        <a href="#architecture" onClick={scrollToSection}>
          Architecture
        </a>
        <a href="#this-site" onClick={scrollToSection}>
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
