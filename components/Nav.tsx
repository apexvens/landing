"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "Products", href: "#products" },
  { label: "About",    href: "#about"    },
  { label: "Founder",  href: "#founder"  },
];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
      <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
      <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function smoothScrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active nav link on scroll
  useEffect(() => {
    const ids = ["products", "about", "founder"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(`#${e.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const PAD = "clamp(24px, 6vw, 80px)";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{
          paddingLeft: PAD,
          paddingRight: PAD,
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
          background: scrolled ? "var(--nav-bg-scrolled)" : "transparent",
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
        >
          <img src="/logo.png" alt="Apex Ventures" width={30} height={30} style={{ display: "block", objectFit: "contain" }} />
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600,
            color: "var(--text-primary)", letterSpacing: "-0.02em",
          }}>
            Apex Ventures
          </span>
        </a>

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {links.map((l) => {
              const isActive = activeSection === l.href;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href); setMenuOpen(false); }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                    textDecoration: "none", transition: "color 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? "var(--text-primary)" : "var(--text-tertiary)")}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      style={{
                        position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                        width: 3, height: 3, borderRadius: "50%", background: "var(--text-primary)",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle theme"
            className="theme-btn"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s",
              flexShrink: 0,
              opacity: 0.65,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--text-secondary)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = "0.65";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.22 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", padding: 4, cursor: "none", display: "none" }}
            className="mobile-hamburger"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: 18, height: 1,
                background: "var(--text-primary)",
                display: "block",
                marginBottom: i < 2 ? 5 : 0,
                transition: "transform 0.22s, opacity 0.22s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed", inset: 0,
              background: "var(--mobile-menu-bg)",
              zIndex: 999,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 40,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href); setMenuOpen(false); }}
                style={{
                  fontFamily: "var(--font-hero)", fontSize: 44, fontWeight: 600,
                  color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.03em",
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 720px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
