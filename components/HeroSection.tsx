"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Typewriter({ text, startNow, onDone }: { text: string; startNow: boolean; onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!startNow) return;
    setCount(0);
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDoneRef.current?.();
      }
    }, 52);
    return () => clearInterval(interval);
  }, [startNow, text]);

  return (
    <span>
      {text.slice(0, count)}
      {startNow && !done && (
        <span style={{
          display: "inline-block", width: 3,
          background: "var(--text-primary)",
          height: "0.75em", marginLeft: 6,
          verticalAlign: "middle", borderRadius: 1,
          animation: "tw-blink 0.85s step-start infinite",
        }} />
      )}
      {/* Reserve space so layout doesn't shift */}
      <span style={{ opacity: 0, pointerEvents: "none" }}>{text.slice(count)}</span>
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

  const PAD = "clamp(24px, 6vw, 80px)";

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
      <div style={{
        position: "absolute", top: 80, right: PAD,
        fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
        color: "var(--text-ghost)", textTransform: "uppercase",
        display: "none",
      }} className="lg-label">
        3 Products Shipped
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: `120px ${PAD} 0`,
      }}>
        {/* Eyebrow */}
        <p className="label" style={{ marginBottom: 32, opacity: 0.6 }}>
          Apex Ventures — Product Studio
        </p>

        {/* Headline — always occupies space, typewriter reveals text */}
        <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 4 }}>
          <Typewriter text="We build" startNow={true} onDone={() => setLine1Done(true)} />
        </h1>
        <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 4 }}>
          <Typewriter text="tools that" startNow={line1Done} onDone={() => setLine2Done(true)} />
        </h1>
        <h1 className="hero-headline" style={{ color: "var(--text-primary)" }}>
          <Typewriter text="actually matter." startNow={line2Done} />
        </h1>

        {/* Subtext + CTA — fade in after typewriter */}
        <div style={{
          marginTop: 60,
          display: "flex", flexWrap: "wrap",
          alignItems: "flex-end", justifyContent: "space-between", gap: 32,
          opacity: showRest ? 1 : 0,
          transform: showRest ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <p className="body-lg" style={{ maxWidth: 400 }}>
            An independent studio building AI-powered software.
            No niche. No category. Just real problems — solved fast.
          </p>
          <a
            href="#products"
            onClick={e => {
              e.preventDefault();
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none",
              borderBottom: "1px solid var(--border)", paddingBottom: 4,
              transition: "border-color 0.2s",
            }}
          >
            See the products ↓
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 40, left: PAD,
        display: "flex", alignItems: "center", gap: 10,
        opacity: showRest ? 1 : 0, transition: "opacity 1s ease 0.4s",
      }}>
        <div style={{
          width: 1, height: 32,
          background: "linear-gradient(to bottom, var(--text-tertiary), transparent)",
          borderRadius: 1,
          animation: showRest ? "scroll-bob 2s ease-in-out infinite" : "none",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.2em",
          color: "var(--text-ghost)", textTransform: "uppercase",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>Scroll</span>
      </div>

      <style>{`
        @keyframes scroll-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes tw-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @media(min-width:1024px){ .lg-label{display:block!important} }
      `}</style>
    </section>
  );
}
