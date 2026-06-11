"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PRODUCTS = [
  { name: "TripWise AI", color: "#4A90E2", href: "https://tripwiseai.vercel.app/",  desc: "Plan any trip in under 2 min" },
  { name: "FolioAI",     color: "#9B6FE8", href: "https://tryfolioai.vercel.app/", desc: "Resume → live portfolio in 60s" },
  { name: "EVMate",      color: "#3ECF8E", href: "https://evmate-8ce3d.web.app/",  desc: "Zero range anxiety, forever" },
];

function Typewriter({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    indexRef.current = 0;
    setCount(0);
    setDone(false);
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setCount(indexRef.current);
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDoneRef.current?.();
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(startDelay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  return (
    <span>
      {text.slice(0, count)}
      {!done && (
        <span style={{
          display: "inline-block", width: 3,
          background: "var(--text-primary)",
          height: "0.78em", marginLeft: 5,
          verticalAlign: "middle", borderRadius: 1,
          animation: "tw-blink 0.9s step-start infinite",
        }} />
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
      const t = setTimeout(() => setShowRest(true), 180);
      return () => clearTimeout(t);
    }
  }, [line2Done]);

  return (
    <section style={{ background: "var(--bg)", position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Only right corner label — "3 Products Shipped" */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: "absolute", top: 80, right: "clamp(24px, 6vw, 80px)",
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
          color: "var(--text-ghost)", textTransform: "uppercase",
        }}
        className="hidden lg:block"
      >
        3 Products Shipped
      </motion.div>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px clamp(24px, 6vw, 80px) 0",
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="label"
          style={{ marginBottom: 28 }}
        >
          Apex Ventures — Product Studio
        </motion.p>

        {/* Headline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.01, delay: 0.28 }}>
          {/* Line 1 */}
          <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 2 }}>
            <Typewriter text="We build" delay={0.32} onDone={() => setLine1Done(true)} />
          </h1>
          {/* Line 2 */}
          <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 2, visibility: line1Done ? "visible" : "hidden" }}>
            {line1Done && <Typewriter text="tools that" delay={0} onDone={() => setLine2Done(true)} />}
          </h1>
          {/* Line 3 — full brightness */}
          <h1 className="hero-headline" style={{ color: "var(--text-primary)", visibility: line2Done ? "visible" : "hidden" }}>
            {line2Done && <Typewriter text="actually matter." delay={0} />}
          </h1>
        </motion.div>

        {/* Subtext + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={showRest ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 56,
            display: "flex", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between", gap: 32,
          }}
        >
          <p className="body-lg" style={{ maxWidth: 400 }}>
            An independent studio building AI-powered software.
            No niche. No category. Just real problems — solved fast.
          </p>
          <a href="#products" style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none",
            borderBottom: "1px solid var(--border)", paddingBottom: 4,
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
            See the products ↓
          </a>
        </motion.div>
      </div>

      {/* Bottom product strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={showRest ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        style={{
          borderTop: "1px solid var(--border)",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {PRODUCTS.map((p, i) => (
          <Link key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
            style={{
              padding: "22px clamp(24px, 6vw, 80px)",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              background: "transparent", transition: "background 0.2s",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, letterSpacing: "-0.015em", color: "var(--text-primary)" }}>
                  {p.name}
                </div>
                <div className="body-sm" style={{ marginTop: 2, fontSize: 11 }}>
                  {p.desc}
                </div>
              </div>
            </div>
            <ArrowUpRight size={12} color="var(--text-ghost)" />
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
