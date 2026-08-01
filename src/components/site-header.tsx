import { ArrowUpRight, List, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute(
      "content",
      theme === "light" ? "#f2efe7" : "#0c0c0b"
    );
    try {
      window.localStorage.setItem("jfu-theme", theme);
    } catch {
      // Theme selection remains available without persistence.
    }
  }, [theme]);

  useEffect(() => {
    const closeForDesktop = (): void => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeForDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeForDesktop);
    };
  }, [menuOpen]);

  const closeMenu = (restoreFocus = false): void => {
    setMenuOpen(false);
    if (restoreFocus) {
      menuButtonRef.current?.focus();
    }
  };

  return (
    <header className="site-header">
      <a
        className="brand-mark"
        href="#top"
        aria-label="Just Fucking Use Cloudflare home"
        onClick={() => closeMenu(true)}
      >
        <span>JFU</span>
        <strong>CF</strong>
      </a>

      <nav
        className={menuOpen ? "site-nav is-open" : "site-nav"}
        id="primary-navigation"
        aria-label="Primary"
      >
        <a href="#stack-builder" onClick={() => closeMenu(true)}>
          Stack Builder
        </a>
        <a href="#platform" onClick={() => closeMenu(true)}>
          Platform
        </a>
        <a href="#live-lab" onClick={() => closeMenu(true)}>
          Live Lab
        </a>
        <a href="#architecture" onClick={() => closeMenu(true)}>
          Architecture
        </a>
        <a href="#this-site" onClick={() => closeMenu(true)}>
          This Site
        </a>
        <a
          className="nav-cta"
          href="https://dash.cloudflare.com/sign-up"
          target="_blank"
          rel="noreferrer"
          onClick={() => closeMenu(true)}
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
          ref={menuButtonRef}
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
