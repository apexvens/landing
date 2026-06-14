"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      }, 48);
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
    <section style={{
      background: "var(--bg)",
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Right corner label */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="label"
          style={{ marginBottom: 28 }}
        >
          Apex Ventures — Product Studio
        </motion.p>

        {/* Headline - always visible, typewriter plays over it */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: 0.15 }}
        >
          {/* Line 1 */}
          <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 2 }}>
            <Typewriter text="We build" delay={0.2} onDone={() => setLine1Done(true)} />
          </h1>
          {/* Line 2 */}
          <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 2 }}>
            {line1Done && <Typewriter text="tools that" delay={0} onDone={() => setLine2Done(true)} />}
            {!line1Done && <span style={{ opacity: 0 }}>tools that</span>}
          </h1>
          {/* Line 3 */}
          <h1 className="hero-headline" style={{ color: "var(--text-primary)" }}>
            {line2Done && <Typewriter text="actually matter." delay={0} />}
            {!line2Done && <span style={{ opacity: 0 }}>actually matter.</span>}
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showRest ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "clamp(24px, 6vw, 80px)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, var(--text-tertiary), transparent)",
            borderRadius: 1,
          }}
        />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          letterSpacing: "0.2em",
          color: "var(--text-ghost)",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
