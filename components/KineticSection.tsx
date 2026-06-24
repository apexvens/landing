"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   KineticSection
   Full-screen scroll-pinned typography interlude.
   "Every. Problem. Has. An. Answer."

   FIX: Removed useSpring — Lenis already provides smooth scroll.
   Double-smoothing was preventing animations from progressing.
   FIX: Word colors upgraded from near-invisible text-ghost to
   readable, progressive opacity values.
   FIX: Reduced from 500vh to 300vh for better UX.
────────────────────────────────────────────────────────────── */

const LINES = [
  { word: "Every",   color: "rgba(240,239,233,0.30)", accent: "#4A90E2" },
  { word: "problem", color: "rgba(240,239,233,0.48)", accent: "#9B6FE8" },
  { word: "has",     color: "rgba(240,239,233,0.66)", accent: "#3ECF8E" },
  { word: "an",      color: "rgba(240,239,233,0.82)", accent: "#F0A500" },
  { word: "answer.", color: "var(--text-primary)",    accent: "#F0EFE9" },
];

function KineticWord({
  word, color, accent, globalProgress, index, total,
}: {
  word: string; color: string; accent: string;
  globalProgress: any; index: number; total: number;
}) {
  const segSize = 1 / total;
  const start   = index * segSize;
  const peak    = start + segSize * 0.62;
  const chars   = word.split("");

  return (
    <div style={{ position: "relative", lineHeight: 0.92, overflow: "visible" }}>
      {/* Accent slash */}
      <motion.div
        style={{
          position: "absolute",
          left: -20,
          top: "50%",
          width: 3,
          height: "108%",
          background: accent,
          borderRadius: 2,
          originY: "bottom",
          scaleY: useTransform(globalProgress, [start, peak], [0, 1]),
          y: "-50%",
          opacity: useTransform(globalProgress, [start, peak], [0, 0.85]),
        }}
      />

      {/* Characters */}
      <div style={{ display: "inline-flex", gap: "0.015em" }}>
        {chars.map((ch, ci) => {
          const charStart = start + (ci / chars.length) * segSize * 0.52;
          const charEnd   = charStart + segSize * 0.30;
          return (
            <motion.span
              key={ci}
              aria-hidden="true"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(60px, 10.5vw, 144px)",
                fontWeight: 700,
                letterSpacing: "-0.045em",
                color,
                y:       useTransform(globalProgress, [charStart, charEnd], [72, 0]),
                opacity: useTransform(globalProgress, [charStart, charEnd], [0, 1]),
                rotateZ: useTransform(globalProgress, [charStart, charEnd], [5, 0]),
                filter:  useTransform(
                  useTransform(globalProgress, [charStart, charEnd], [10, 0]),
                  (b) => `blur(${b}px)`
                ),
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

export default function KineticSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // No useSpring — Lenis already provides smooth scroll.
  // Adding a spring on top causes double-lag that freezes the animation.
  const progress = scrollYProgress;

  // Scanning line y position
  const scanY = useTransform(progress, [0, 1], ["-2vh", "102vh"]);

  // Right-side progress bars
  const rightOpacity = useTransform(progress, [0.05, 0.18], [0, 1]);

  // Bottom CTA opacity
  const ctaOpacity = useTransform(progress, [0.82, 1], [0, 1]);

  return (
    /* 300vh — was 500vh. More focused, less dead-air scrolling. */
    <div
      ref={containerRef}
      style={{ height: "300vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Ambient scanning line */}
        <motion.div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(155,111,232,0.5), transparent)",
            y: scanY,
            opacity: 0.7,
          }}
        />

        {/* Subtle background glow that builds with scroll */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            x: "-50%", y: "-50%",
            width: 900, height: 450,
            background: "radial-gradient(ellipse, rgba(155,111,232,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            opacity: useTransform(progress, [0, 0.3, 0.9, 1], [0, 0.8, 0.8, 0]),
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(24px, 6vw, 80px)", width: "100%" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Eyebrow — visible immediately, no fade-in from 0 */}
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              marginBottom: 40,
            }}>
              The Apex thesis
            </p>

            {/* Word lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2px, 0.5vh, 8px)", paddingLeft: 28 }}>
              {LINES.map((line, i) => (
                <KineticWord
                  key={line.word}
                  {...line}
                  globalProgress={progress}
                  index={i}
                  total={LINES.length}
                />
              ))}
            </div>

            {/* Bottom keep-scrolling hint */}
            <motion.div
              style={{
                marginTop: 52,
                paddingLeft: 28,
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: ctaOpacity,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "#3ECF8E",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}>
                  Apex Ventures · Keep scrolling
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: scroll progress indicator */}
        <motion.div
          style={{
            position: "absolute",
            right: "clamp(24px, 4vw, 60px)",
            top: "50%",
            y: "-50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: rightOpacity,
          }}
        >
          {LINES.map((line, i) => {
            const segStart = i / LINES.length;
            const segEnd   = (i + 1) / LINES.length;
            return (
              <motion.div
                key={i}
                style={{
                  width: 2,
                  height: 28,
                  borderRadius: 1,
                  background: line.accent,
                  scaleY: useTransform(progress, [segStart, segEnd], [0.12, 1]),
                  opacity: useTransform(progress, [segStart, segEnd], [0.18, 0.85]),
                  transformOrigin: "top",
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
