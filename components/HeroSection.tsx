"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const TICKER_ITEMS = [
  "TripWise AI",
  "·",
  "FolioAI",
  "·",
  "EVMate",
  "·",
  "TripWise AI",
  "·",
  "FolioAI",
  "·",
  "EVMate",
  "·",
  "TripWise AI",
  "·",
  "FolioAI",
  "·",
  "EVMate",
  "·",
];

export default function HeroSection() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let x = 0;
    let frame: number;
    const speed = 0.4;

    const animate = () => {
      x -= speed;
      const half = ticker.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      ticker.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />

      {/* Top-left corner label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          top: 80,
          left: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "rgba(248,248,245,0.2)",
          textTransform: "uppercase",
        }}
        className="hidden lg:block"
      >
        Est. 2025 — Pune, India
      </motion.div>

      {/* Top-right corner label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{
          position: "absolute",
          top: 80,
          right: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "rgba(248,248,245,0.2)",
          textTransform: "uppercase",
          textAlign: "right",
        }}
        className="hidden lg:block"
      >
        3 Products Shipped
      </motion.div>

      {/* Main content — centered vertically */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20">
        <div className="max-w-[1100px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "rgba(248,248,245,0.3)",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            Apex Ventures — Product Studio
          </motion.div>

          {/* Headline lines */}
          {[
            { text: "We build", delay: 0.2 },
            { text: "tools that", delay: 0.3 },
            { text: "actually work.", delay: 0.4, accent: true },
          ].map(({ text, delay, accent }) => (
            <div key={text} style={{ overflow: "hidden", lineHeight: 1 }}>
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(52px, 10vw, 120px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: accent ? "rgba(248,248,245,0.92)" : "rgba(248,248,245,0.45)",
                  lineHeight: 1.02,
                  marginBottom: 4,
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}

          {/* Subtext + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            style={{
              marginTop: 56,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "rgba(248,248,245,0.35)",
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: 420,
              }}
            >
              An independent studio building AI-powered software.
              No niche. No category. Just real problems — solved fast.
            </p>

            <a
              href="#products"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F8F8F5",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,248,245,0.25)",
                paddingBottom: 4,
                transition: "border-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.borderColor = "rgba(248,248,245,0.8)"))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.borderColor = "rgba(248,248,245,0.25)"))
              }
            >
              See the products ↓
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
        style={{
          borderTop: "1px solid rgba(248,248,245,0.06)",
          overflow: "hidden",
          padding: "14px 0",
          position: "relative",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, #000, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, #000, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div ref={tickerRef} style={{ display: "flex", gap: 32, width: "max-content" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily:
                  item === "·" ? "var(--font-body)" : "var(--font-mono)",
                fontSize: item === "·" ? 14 : 10,
                letterSpacing: item === "·" ? 0 : "0.15em",
                textTransform: "uppercase",
                color:
                  item === "·"
                    ? "rgba(248,248,245,0.12)"
                    : "rgba(248,248,245,0.22)",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
