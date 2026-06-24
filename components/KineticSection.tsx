"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   KineticSection  –  "Every. Problem. Has. An. Answer."

   Rules of Hooks are respected throughout:
   • CharSpan  — one component per character (hooks at top level)
   • ProgressBar — one component per line  (hooks at top level)
   No useTransform anywhere inside a .map() call.

   Content starts at 28 % opacity so the section is NEVER blank.
   Lenis handles easing; no useSpring needed here.
   Height: 220 vh  (was 500 vh — was the source of tedium)
──────────────────────────────────────────────────────────────── */

const LINES = [
  { word: "Every",   litColor: "rgba(240,239,233,0.38)", accent: "#4A90E2" },
  { word: "problem", litColor: "rgba(240,239,233,0.52)", accent: "#9B6FE8" },
  { word: "has",     litColor: "rgba(240,239,233,0.68)", accent: "#3ECF8E" },
  { word: "an",      litColor: "rgba(240,239,233,0.84)", accent: "#F0A500" },
  { word: "answer.", litColor: "var(--text-primary)",    accent: "#F0EFE9" },
] as const;

/* ── Each character: hooks at component top level ── */
function CharSpan({
  char, progress, startP, endP, litColor,
}: {
  char: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
  litColor: string;
}) {
  const y   = useTransform(progress, [startP, endP], [46, 0]);
  const op  = useTransform(progress, [startP, endP], [0.22, 1]);
  const blV = useTransform(progress, [startP, endP], [6, 0]);
  const blr = useTransform(blV, (b: number) => `blur(${b}px)`);

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
        y, opacity: op, filter: blr,
        willChange: "transform, opacity, filter",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/* ── Right-edge progress bar per line — hooks at component top level ── */
function ProgressBar({
  accent, progress, startP, endP,
}: {
  accent: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const sc = useTransform(progress, [startP, endP], [0.10, 1]);
  const op = useTransform(progress, [startP, endP], [0.18, 0.85]);

  return (
    <motion.div style={{
      width: 2, height: 26, borderRadius: 1,
      background: accent,
      scaleY: sc, opacity: op,
      transformOrigin: "top",
    }} />
  );
}

/* ── Word row: accent bar + individual CharSpan components ── */
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
  const segPeak  = segStart + segSize * 0.72;
  const chars    = line.word.split("");

  /* Accent bar hooks live here at top level of this component */
  const barSc = useTransform(progress, [segStart, segPeak], [0, 1]);
  const barOp = useTransform(progress, [segStart, segPeak], [0, 0.80]);

  return (
    <div style={{ position: "relative", lineHeight: 0.9 }}>
      <motion.div style={{
        position: "absolute", left: -18, top: "50%", y: "-50%",
        width: 2, height: "80%", borderRadius: 2,
        background: line.accent,
        scaleY: barSc, opacity: barOp,
        transformOrigin: "top",
      }} />

      <span aria-label={line.word} style={{ display: "inline-flex", gap: "0.01em" }}>
        {chars.map((ch, ci) => {
          const charStart = segStart + (ci / chars.length) * segSize * 0.52;
          const charEnd   = charStart + segSize * 0.28;
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
      </span>
    </div>
  );
}

export default function KineticSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress; // Lenis handles easing — no extra spring needed

  /* CTA — hooks at component top level */
  const ctaOp = useTransform(progress, [0.80, 1], [0, 1]);
  const ctaY  = useTransform(progress, [0.80, 1], [14, 0]);

  return (
    <div ref={containerRef} style={{ height: "220vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", left: "50%", top: "52%",
          transform: "translate(-50%, -50%)",
          width: 900, height: 480,
          background: "radial-gradient(ellipse, rgba(155,111,232,0.06) 0%, transparent 68%)",
          filter: "blur(100px)", pointerEvents: "none",
        }} />

        {/* Main content */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(24px, 6vw, 80px)", width: "100%",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Eyebrow — static, always visible */}
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--text-tertiary)", margin: "0 0 44px",
            }}>
              The Apex thesis
            </p>

            {/* Words */}
            <div style={{
              display: "flex", flexDirection: "column",
              gap: "clamp(2px, 0.3vh, 6px)",
              paddingLeft: 24,
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

            {/* Bottom hint */}
            <motion.div style={{
              marginTop: 52, paddingLeft: 24,
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
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}>
                Five products built on this
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right-edge progress indicator — each bar is its own component */}
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
