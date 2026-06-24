"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   KineticSection  —  "Every. Problem. Has. An. Answer."

   FIX: Per-character Y-stagger was making each letter appear at a
   different height during scroll, creating a "diagonal cascade"
   that looked like a rendering bug.

   Solution:
   • Y-transform applied to the WHOLE WORD as a unit (clipped with
     overflow:hidden so it slides up cleanly from below)
   • Per-character opacity ONLY — creates a "light sweeping across"
     illumination effect without any vertical misalignment
   • Blur filter removed — was smearing text during animation
   • All hooks at component top level (no hooks in .map() calls)
──────────────────────────────────────────────────────────────── */

const LINES = [
  { word: "Every",   litColor: "rgba(240,239,233,0.38)", accent: "#4A90E2" },
  { word: "problem", litColor: "rgba(240,239,233,0.52)", accent: "#9B6FE8" },
  { word: "has",     litColor: "rgba(240,239,233,0.68)", accent: "#3ECF8E" },
  { word: "an",      litColor: "rgba(240,239,233,0.84)", accent: "#F0A500" },
  { word: "answer.", litColor: "var(--text-primary)",    accent: "#F0EFE9" },
] as const;

/* ── Character: opacity-only cascade (no y, no blur) ── */
function CharSpan({
  char, progress, startP, endP, litColor,
}: {
  char: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
  litColor: string;
}) {
  const op = useTransform(progress, [startP, endP], [0.16, 1]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontFamily: "var(--font-hero)",
        fontSize: "clamp(56px, 10vw, 132px)",
        fontWeight: 700,
        letterSpacing: "-0.045em",
        color: litColor,
        opacity: op,
        willChange: "opacity",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/* ── Accent bar: hooks at component top level ── */
function AccentBar({
  accent, progress, startP, peakP,
}: {
  accent: string;
  progress: MotionValue<number>;
  startP: number;
  peakP: number;
}) {
  const sc = useTransform(progress, [startP, peakP], [0, 1]);
  const op = useTransform(progress, [startP, peakP], [0, 0.75]);

  return (
    <motion.div style={{
      position: "absolute",
      left: -20, top: "50%", y: "-50%",
      width: 2, height: "78%",
      borderRadius: 2,
      background: accent,
      scaleY: sc, opacity: op,
      transformOrigin: "top",
    }} />
  );
}

/* ── Right-edge progress bar: hooks at component top level ── */
function ProgressBar({
  accent, progress, startP, endP,
}: {
  accent: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const sc = useTransform(progress, [startP, endP], [0.08, 1]);
  const op = useTransform(progress, [startP, endP], [0.15, 0.80]);

  return (
    <motion.div style={{
      width: 2, height: 26,
      borderRadius: 1,
      background: accent,
      scaleY: sc, opacity: op,
      transformOrigin: "top",
    }} />
  );
}

/* ── Word row: slides up as a unit, chars illuminate ── */
function KineticWord({
  line, progress, index, total,
}: {
  line: typeof LINES[number];
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const segSize  = 1 / total;
  const segStart = index * segSize;
  const slideEnd = segStart + segSize * 0.40; // word fully in by 40% of its segment

  /* Word-level slide — hooks at top of THIS component */
  const wordY  = useTransform(progress, [segStart, slideEnd], [60, 0]);
  const wordOp = useTransform(progress, [segStart, slideEnd], [0, 1]);

  const chars = line.word.split("");

  return (
    <div style={{ position: "relative" }}>
      {/* Accent bar lives outside the overflow:hidden clip */}
      <AccentBar
        accent={line.accent}
        progress={progress}
        startP={segStart}
        peakP={segStart + segSize * 0.65}
      />

      {/* overflow:hidden clips the slide-up so it emerges from below */}
      <div style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
        <motion.span
          aria-label={line.word}
          style={{
            display: "inline-flex",
            gap: "0.01em",
            y: wordY,
            opacity: wordOp,
            willChange: "transform, opacity",
          }}
        >
          {chars.map((ch, ci) => {
            /* Stagger opacity across the remaining 60% of the segment */
            const charStart = slideEnd + (ci / chars.length) * segSize * 0.42;
            const charEnd   = charStart + segSize * 0.25;
            return (
              <CharSpan
                key={ci}
                char={ch}
                progress={progress}
                startP={charStart}
                endP={charEnd}
                litColor={line.litColor}
              />
            );
          })}
        </motion.span>
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

  const progress = scrollYProgress; // Lenis handles easing; no spring needed

  const ctaOp = useTransform(progress, [0.82, 1], [0, 1]);
  const ctaY  = useTransform(progress, [0.82, 1], [12, 0]);

  return (
    <div ref={containerRef} style={{ height: "220vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        /* No overflow:hidden — would clip word slide animations */
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: 900, height: 480,
          background: "radial-gradient(ellipse, rgba(155,111,232,0.055) 0%, transparent 68%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(24px, 6vw, 80px)",
          width: "100%",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Eyebrow */}
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              margin: "0 0 44px",
            }}>
              The Apex thesis
            </p>

            {/* Words */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2px, 0.4vh, 8px)",
              paddingLeft: 28,
            }}>
              {LINES.map((line, i) => (
                <KineticWord
                  key={line.word}
                  line={line}
                  progress={progress}
                  index={i}
                  total={LINES.length}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div style={{
              marginTop: 52, paddingLeft: 28,
              display: "flex", alignItems: "center", gap: 10,
              opacity: ctaOp, y: ctaY,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#3ECF8E", display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}>
                Five products built on this
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right edge progress bars */}
        <div style={{
          position: "absolute",
          right: "clamp(24px, 4vw, 60px)",
          top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 5,
        }}>
          {LINES.map((line, i) => {
            const segStart = i / LINES.length;
            const segEnd   = (i + 1) / LINES.length;
            return (
              <ProgressBar
                key={line.word}
                accent={line.accent}
                progress={progress}
                startP={segStart}
                endP={segEnd}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
