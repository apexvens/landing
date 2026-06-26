"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   KineticSection  —  "Every. Problem. Has. An. Answer."

   FIX: Colors now use CSS vars so they're visible in both
   light mode and dark mode. The light rgba values were invisible
   on the light-mode background.
──────────────────────────────────────────────────────────────── */

interface Line { word: string; color: string; accent: string; }

const LINES: Line[] = [
  { word: "Every",   color: "var(--text-tertiary)",  accent: "#4A90E2" },
  { word: "problem", color: "var(--text-secondary)", accent: "#9B6FE8" },
  { word: "has",     color: "var(--text-secondary)", accent: "#3ECF8E" },
  { word: "an",      color: "var(--text-primary)",   accent: "#F0A500" },
  { word: "answer.", color: "var(--text-primary)",   accent: "#9B6FE8" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function KineticSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "100px clamp(24px, 6vw, 80px)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: 900, height: 500,
        background: "radial-gradient(ellipse, rgba(155,111,232,0.055) 0%, transparent 68%)",
        filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--text-tertiary)", margin: "0 0 48px",
          }}
        >
          The Apex thesis
        </motion.p>

        {/* Words */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: "clamp(2px, 0.4vh, 8px)", paddingLeft: 28,
        }}>
          {LINES.map((line, i) => (
            <div key={line.word} style={{ position: "relative" }}>
              {/* Accent bar */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 0.75 } : { scaleY: 0, opacity: 0 }}
                transition={{ delay: i * 0.11 + 0.15, duration: 0.55, ease: EASE }}
                style={{
                  position: "absolute", left: -20, top: "50%", translateY: "-50%",
                  width: 2, height: "72%", borderRadius: 2,
                  background: line.accent, transformOrigin: "top",
                }}
              />
              {/* Word */}
              <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
                <motion.div
                  initial={{ y: "105%" }}
                  animate={inView ? { y: "0%" } : { y: "105%" }}
                  transition={{ delay: i * 0.11, duration: 0.72, ease: EASE }}
                >
                  <span
                    aria-label={line.word}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-hero)",
                      fontSize: "clamp(56px, 10vw, 132px)",
                      fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.9,
                      color: line.color,
                    }}
                  >
                    {line.word}
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: LINES.length * 0.11 + 0.2, duration: 0.55 }}
          style={{ marginTop: 52, paddingLeft: 28, display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: "#3ECF8E",
            display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--text-tertiary)",
          }}>
            Six products built on this
          </span>
        </motion.div>
      </div>

      {/* Right edge indicators */}
      <div style={{
        position: "absolute", right: "clamp(24px, 4vw, 60px)",
        top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {LINES.map((line, i) => (
          <motion.div
            key={line.word}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 0.75 } : { scaleY: 0, opacity: 0 }}
            transition={{ delay: i * 0.11 + 0.05, duration: 0.5, ease: EASE }}
            style={{
              width: 2, height: 26, borderRadius: 1,
              background: line.accent, transformOrigin: "top",
            }}
          />
        ))}
      </div>
    </section>
  );
}
