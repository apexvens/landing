"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PRODUCTS = [
  { name: "TripWise AI", tag: "Travel", color: "#4A90E2", href: "https://tripwiseai.vercel.app/", desc: "Plan any trip in under 2 min" },
  { name: "FolioAI",     tag: "Dev Tools", color: "#9B6FE8", href: "https://tryfolioai.vercel.app/", desc: "Resume → live portfolio in 60s" },
  { name: "EVMate",      tag: "Mobility",  color: "#3ECF8E", href: "https://evmate-8ce3d.web.app/",  desc: "Zero range anxiety, forever" },
];

// Typewriter that reveals text char-by-char with a blinking cursor
function Typewriter({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length === text.length) {
      setDone(true);
      onDone?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 38 + Math.random() * 24); // slight jitter = feels human
    return () => clearTimeout(t);
  }, [started, displayed, text, onDone]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-block", width: "0.5em", background: "#F8F8F5", height: "0.85em", marginLeft: 3, verticalAlign: "middle", borderRadius: 2 }}
        />
      )}
    </span>
  );
}

export default function HeroSection() {
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    if (line2Done) {
      const t = setTimeout(() => setShowRest(true), 200);
      return () => clearTimeout(t);
    }
  }, [line2Done]);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Corner labels */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ position: "absolute", top: 80, left: 24, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "rgba(248,248,245,0.18)", textTransform: "uppercase" }}
        className="hidden lg:block"
      >
        Est. 2025 — Pune, India
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ position: "absolute", top: 80, right: 24, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "rgba(248,248,245,0.18)", textTransform: "uppercase", textAlign: "right" }}
        className="hidden lg:block"
      >
        3 Products Shipped
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div style={{ maxWidth: 1100 }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "rgba(248,248,245,0.25)", textTransform: "uppercase", marginBottom: 28 }}
          >
            Apex Ventures — Product Studio
          </motion.div>

          {/* Headline — typewriter reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01, delay: 0.3 }}
          >
            {/* Line 1 */}
            <div style={{ overflow: "visible", marginBottom: 6 }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 10vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "rgba(248,248,245,0.38)",
                lineHeight: 1.0,
              }}>
                <Typewriter text="We build" delay={0.4} onDone={() => setLine1Done(true)} />
              </h1>
            </div>

            {/* Line 2 — starts when line 1 finishes */}
            <div style={{ overflow: "visible", marginBottom: 6 }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 10vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "rgba(248,248,245,0.38)",
                lineHeight: 1.0,
                visibility: line1Done ? "visible" : "hidden",
              }}>
                {line1Done && <Typewriter text="tools that" delay={0} onDone={() => setLine2Done(true)} />}
              </h1>
            </div>

            {/* Line 3 — full brightness, starts when line 2 finishes */}
            <div style={{ overflow: "visible" }}>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 10vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "rgba(248,248,245,0.95)",
                lineHeight: 1.0,
                visibility: line2Done ? "visible" : "hidden",
              }}>
                {line2Done && <Typewriter text="actually work." delay={0} />}
              </h1>
            </div>
          </motion.div>

          {/* Subtext + CTA — appears after all lines done */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={showRest ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: 52,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 2vw, 17px)",
              color: "rgba(248,248,245,0.32)",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: 380,
            }}>
              An independent studio building AI-powered software.
              No niche. No category. Just real problems — solved fast.
            </p>
            <a
              href="#products"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#F8F8F5",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,248,245,0.3)",
                paddingBottom: 4,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#F8F8F5")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(248,248,245,0.3)")}
            >
              See the products ↓
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom product grid — replaces ticker, actually useful */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={showRest ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        style={{
          borderTop: "1px solid rgba(248,248,245,0.1)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {PRODUCTS.map((p, i) => (
          <Link
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "20px 24px",
              borderRight: i < 2 ? "1px solid rgba(248,248,245,0.1)" : "none",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              transition: "background 0.2s",
              background: "transparent",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(248,248,245,0.03)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", color: "#F8F8F5" }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(248,248,245,0.3)", fontWeight: 300, marginTop: 1 }}>
                  {p.desc}
                </div>
              </div>
            </div>
            <ArrowUpRight size={12} color="rgba(248,248,245,0.25)" />
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
