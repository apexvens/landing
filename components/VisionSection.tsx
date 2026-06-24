"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   VisionSection  –  "Building Today. Scaling Tomorrow."

   Rules of Hooks respected throughout:
   • WordLine    — component per word  (hooks at top level)
   • ProgressBar — component per bar   (hooks at top level)
   • BodyLine    — component per line  (hooks at top level)
   No useTransform inside any .map() call.

   Content starts at 18 % opacity — never blank.
   Height: 200 vh (was 400 vh).
──────────────────────────────────────────────────────────────── */

const WORDS = [
  { text: "Building",   primary: true,  skewX: "-1.5deg" },
  { text: "Today.",     primary: false, skewX: "1deg"    },
  { text: "Scaling",    primary: true,  skewX: "-1deg"   },
  { text: "Tomorrow.",  primary: false, skewX: "0.8deg"  },
] as const;

/* ── Word — hooks at component top level ── */
function WordLine({
  text, primary, skewX, progress, startP, endP,
}: {
  text: string;
  primary: boolean;
  skewX: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const y   = useTransform(progress, [startP, endP], [50, 0]);
  const op  = useTransform(progress, [startP, endP], [0.16, primary ? 1 : 0.33]);
  const blV = useTransform(progress, [startP, endP], [8, 0]);
  const blr = useTransform(blV, (b: number) => `blur(${b}px)`);

  return (
    <div style={{ overflow: "hidden" }}>
      <motion.span
        aria-label={text}
        style={{
          display: "inline-block",
          fontFamily: "var(--font-hero)",
          fontSize: "clamp(48px, 9.5vw, 128px)",
          fontWeight: 700,
          letterSpacing: "-0.045em",
          lineHeight: 0.92,
          color: primary ? "var(--text-primary)" : "var(--text-secondary)",
          skewX,
          y, opacity: op, filter: blr,
          willChange: "transform, opacity, filter",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ── Right-edge bar — hooks at component top level ── */
function ProgressBar({
  primary, progress, startP, endP,
}: {
  primary: boolean;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const sc = useTransform(progress, [startP, endP], [0.08, 1]);
  const op = useTransform(progress, [startP, endP], [0.14, primary ? 0.85 : 0.42]);

  return (
    <motion.div style={{
      width: 2, height: 30, borderRadius: 1,
      background: primary ? "var(--text-primary)" : "var(--text-tertiary)",
      scaleY: sc, opacity: op,
      transformOrigin: "top",
    }} />
  );
}

/* ── Body paragraph — hooks at component top level ── */
function BodyLine({
  text, progress, startP, endP,
}: {
  text: string;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const op = useTransform(progress, [startP, endP], [0, 1]);
  const y  = useTransform(progress, [startP, endP], [14, 0]);

  return (
    <motion.p style={{
      fontFamily: "var(--font-body)",
      fontSize: "clamp(13px, 1.2vw, 15px)",
      lineHeight: 1.72,
      color: "var(--text-tertiary)",
      fontWeight: 300,
      margin: 0,
      opacity: op, y,
    }}>
      {text}
    </motion.p>
  );
}

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress; // Lenis handles easing; no spring needed

  const orbScale = useTransform(progress, [0, 1], [0.82, 1.14]);
  const orbOp    = useTransform(progress, [0, 0.15, 0.85, 1], [0.25, 1, 1, 0.25]);

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", alignItems: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}>
        {/* Ambient orb */}
        <motion.div style={{
          position: "absolute", left: "50%", top: "50%",
          x: "-50%", y: "-50%",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(74,144,226,0.08) 0%, transparent 68%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          scale: orbScale, opacity: orbOp,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(24px, 6vw, 80px)",
          width: "100%", maxWidth: 1200, margin: "0 auto",
        }}>
          {/* Eyebrow — static, always visible */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--text-tertiary)", margin: "0 0 48px",
          }}>
            Our mandate
          </p>

          {/* Words — each rendered as its own component */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.02em" }}>
            {WORDS.map((word, i) => {
              const seg   = 1 / WORDS.length;
              const start = i * seg;
              const end   = start + seg * 0.68;
              return (
                <WordLine
                  key={word.text}
                  text={word.text}
                  primary={word.primary}
                  skewX={word.skewX}
                  progress={progress}
                  startP={start}
                  endP={end}
                />
              );
            })}
          </div>

          {/* Body copy */}
          <div style={{
            marginTop: 48,
            display: "flex", flexDirection: "column", gap: 8,
            maxWidth: 460,
          }}>
            <BodyLine
              text="Building AI-powered tools across mobility, health, productivity, and education."
              progress={progress}
              startP={0.72}
              endP={0.90}
            />
            <BodyLine
              text="No niche. No category. Just real problems, solved exceptionally."
              progress={progress}
              startP={0.82}
              endP={1.00}
            />
          </div>
        </div>

        {/* Right-edge progress — each is its own component */}
        <div style={{
          position: "absolute",
          right: "clamp(24px, 4vw, 60px)",
          top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {WORDS.map((word, i) => {
            const seg   = 1 / WORDS.length;
            const start = i * seg;
            const end   = (i + 1) * seg;
            return (
              <ProgressBar
                key={word.text}
                primary={word.primary}
                progress={progress}
                startP={start}
                endP={end}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
