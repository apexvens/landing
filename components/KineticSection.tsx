"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   KineticSection
   Full-screen scroll-pinned typography interlude.
   One word explodes in per scroll segment, stacked vertically,
   building the sentence: "Every. Problem. Has. An. Answer."
   
   The section is sticky for ~400vh so the scroll budget is
   generous — the user feels they're "cranking" words in.
────────────────────────────────────────────────────────────── */

const LINES = [
  { word: "Every",  color: "var(--text-ghost)",   accent: "#4A90E2" },
  { word: "problem", color: "var(--text-ghost)",  accent: "#9B6FE8" },
  { word: "has",    color: "var(--text-secondary)", accent: "#3ECF8E" },
  { word: "an",     color: "var(--text-secondary)", accent: "#F0A500" },
  { word: "answer.", color: "var(--text-primary)", accent: "#F0EFE9" },
];

function KineticWord({
  word,
  color,
  accent,
  globalProgress,
  index,
  total,
}: {
  word: string;
  color: string;
  accent: string;
  globalProgress: any;
  index: number;
  total: number;
}) {
  const segSize = 1 / total;
  const start   = index * segSize;
  const peak    = start + segSize * 0.6;
  const chars   = word.split("");

  return (
    <div style={{ position: "relative", lineHeight: 0.92, overflow: "visible" }}>
      {/* Accent slash behind word */}
      <motion.div
        style={{
          position: "absolute",
          left: -24,
          top: "50%",
          width: 4,
          height: "110%",
          background: accent,
          borderRadius: 2,
          originY: "bottom",
          scaleY: useTransform(globalProgress, [start, peak], [0, 1]),
          y: "-50%",
          opacity: useTransform(globalProgress, [start, peak], [0, 0.9]),
        }}
      />

      {/* Characters */}
      <div style={{ display: "inline-flex", gap: "0.02em" }}>
        {chars.map((ch, ci) => {
          const charStart = start + (ci / chars.length) * segSize * 0.55;
          const charEnd   = charStart + segSize * 0.32;
          return (
            <motion.span
              key={ci}
              aria-hidden="true"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(64px, 11vw, 148px)",
                fontWeight: 700,
                letterSpacing: "-0.045em",
                color,
                y:      useTransform(globalProgress, [charStart, charEnd], [80, 0]),
                opacity: useTransform(globalProgress, [charStart, charEnd], [0, 1]),
                rotateZ: useTransform(globalProgress, [charStart, charEnd], [6, 0]),
                filter: useTransform(
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

  // Smooth it slightly so it feels physical
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  // Counter: how many words are "revealed" (0 → LINES.length)
  const counterDisplay = useTransform(smooth, [0, 1], [0, LINES.length]);

  return (
    /* Outer: 500vh tall — provides the scroll budget */
    <div
      ref={containerRef}
      style={{ height: "500vh", position: "relative" }}
    >
      {/* Sticky inner — stays in view for the entire scroll budget */}
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
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(155,111,232,0.4), transparent)",
            y: useTransform(smooth, [0, 1], ["-2vh", "102vh"]),
            opacity: 0.6,
          }}
        />

        {/* Left: word stack */}
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(24px, 6vw, 80px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Eyebrow label */}
            <motion.p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--text-ghost)",
                marginBottom: 40,
                opacity: useTransform(smooth, [0, 0.08], [0, 1]),
              }}
            >
              The Apex thesis
            </motion.p>

            {/* Word lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2px, 0.6vh, 10px)", paddingLeft: 32 }}>
              {LINES.map((line, i) => (
                <KineticWord
                  key={line.word}
                  {...line}
                  globalProgress={smooth}
                  index={i}
                  total={LINES.length}
                />
              ))}
            </div>

            {/* Bottom: scroll counter + CTA */}
            <motion.div
              style={{
                marginTop: 48,
                paddingLeft: 32,
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: useTransform(smooth, [0.85, 1], [0, 1]),
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

        {/* Right: floating scroll progress indicator */}
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
            opacity: useTransform(smooth, [0.05, 0.15], [0, 1]),
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
                  scaleY: useTransform(smooth, [segStart, segEnd], [0.15, 1]),
                  opacity: useTransform(smooth, [segStart, segEnd], [0.2, 0.9]),
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
