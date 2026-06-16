"use client";

import { useEffect, useRef, useState } from "react";
import { useReady } from "./PageWrapper";

// Typewriter that only starts when `go` flips true
function Typewriter({ text, go, onDone }: { text: string; go: boolean; onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const cbRef = useRef(onDone);
  cbRef.current = onDone;

  useEffect(() => {
    if (!go) return;
    setCount(0);
    setFinished(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setCount(i);
      if (i >= text.length) {
        clearInterval(iv);
        setFinished(true);
        cbRef.current?.();
      }
    }, 50);
    return () => clearInterval(iv);
  }, [go, text]);

  return (
    <span aria-label={text}>
      {/* Visible typed chars */}
      <span>{text.slice(0, count)}</span>
      {/* Cursor */}
      {go && !finished && (
        <span style={{
          display: "inline-block", width: 3, height: "0.72em",
          background: "var(--text-primary)", marginLeft: 5,
          verticalAlign: "middle", borderRadius: 1,
          animation: "tw-blink 0.85s step-start infinite",
        }} aria-hidden="true" />
      )}
      {/* Invisible placeholder — holds the width so layout never shifts */}
      <span aria-hidden="true" style={{ visibility: "hidden", pointerEvents: "none" }}>
        {text.slice(count)}
      </span>
    </span>
  );
}

export default function HeroSection() {
  // Only starts when the loader calls onDone → PageWrapper sets ready=true
  const ready = useReady();

  const [l1Done, setL1Done] = useState(false);
  const [l2Done, setL2Done] = useState(false);
  const [l3Done, setL3Done] = useState(false);

  // Sub-content fades in after all three lines finish
  const showRest = l3Done;

  const PAD = "clamp(24px, 6vw, 80px)";

  return (
    <section style={{
      background: "var(--bg)", position: "relative",
      minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: `120px ${PAD} 0`,
      }}>
        {/* Eyebrow — fades in when ready */}
        <p className="label" style={{
          marginBottom: 32,
          opacity:    ready ? 0.6 : 0,
          transform:  ready ? "none" : "translateY(8px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          Apex Ventures — Product Studio
        </p>

        {/* Lines — each typewriter waits for the previous */}
        <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 4 }}>
          <Typewriter text="We build" go={ready} onDone={() => setL1Done(true)} />
        </h1>
        <h1 className="hero-headline" style={{ color: "var(--text-ghost)", marginBottom: 4 }}>
          <Typewriter text="tools that" go={l1Done} onDone={() => setL2Done(true)} />
        </h1>
        <h1 className="hero-headline" style={{ color: "var(--text-primary)" }}>
          <Typewriter text="actually matter." go={l2Done} onDone={() => setL3Done(true)} />
        </h1>

        {/* Sub content */}
        <div style={{
          marginTop: 60,
          display: "flex", flexWrap: "wrap",
          alignItems: "flex-end", justifyContent: "space-between", gap: 32,
          opacity:    showRest ? 1 : 0,
          transform:  showRest ? "none" : "translateY(14px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <p className="body-lg" style={{ maxWidth: 420 }}>
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
              transition: "opacity 0.2s",
              cursor: "pointer",
            }}
          >
            See the products ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: PAD,
        display: "flex", alignItems: "center", gap: 10,
        opacity:    showRest ? 1 : 0,
        transition: "opacity 1s ease 0.5s",
      }}>
        <div style={{
          width: 1, height: 32,
          background: "linear-gradient(to bottom, var(--text-tertiary), transparent)",
          animation: showRest ? "scroll-bob 2.2s ease-in-out infinite" : "none",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.2em",
          color: "var(--text-ghost)", textTransform: "uppercase",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>Scroll</span>
      </div>

      <style>{`
        @keyframes tw-blink   { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes scroll-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
      `}</style>
    </section>
  );
}
