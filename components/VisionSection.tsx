"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   VisionSection  —  "Building Today. Scaling Tomorrow."

   Same fix as KineticSection:
   • No blur filter (smears text during animation)
   • No per-character Y (causes diagonal stagger glitch)
   • Word slides up as a unit via overflow:hidden clip
   • No overflow:hidden on sticky wrapper (would clip words)
   • All hooks at component top level — zero hooks inside .map()
──────────────────────────────────────────────────────────────── */

const WORDS = [
  { text: "Building",   primary: true  },
  { text: "Today.",     primary: false },
  { text: "Scaling",    primary: true  },
  { text: "Tomorrow.",  primary: false },
] as const;

/* ── Word line: slides up as a unit, hooks at top level ── */
function WordLine({
  text, primary, progress, startP, endP,
}: {
  text: string;
  primary: boolean;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const slideEnd = startP + (endP - startP) * 0.45;

  const y  = useTransform(progress, [startP, slideEnd], [58, 0]);
  const op = useTransform(progress, [startP, endP],     [0,  primary ? 1 : 0.32]);

  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
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
          y, opacity: op,
          willChange: "transform, opacity",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ── Right-edge progress bar ── */
function ProgressBar({
  primary, progress, startP, endP,
}: {
  primary: boolean;
  progress: MotionValue<number>;
  startP: number;
  endP: number;
}) {
  const sc = useTransform(progress, [startP, endP], [0.08, 1]);
  const op = useTransform(progress, [startP, endP], [0.12, primary ? 0.85 : 0.40]);

  return (
    <motion.div style={{
      width: 2, height: 30, borderRadius: 1,
      background: primary ? "var(--text-primary)" : "var(--text-tertiary)",
      scaleY: sc, opacity: op,
      transformOrigin: "top",
    }} />
  );
}

/* ── Body copy lines ── */
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

  const progress = scrollYProgress;

  const orbScale = useTransform(progress, [0, 1],          [0.82, 1.14]);
  const orbOp    = useTransform(progress, [0, 0.2, 0.8, 1],[0.25, 1, 1, 0.25]);

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        /* No overflow:hidden — would clip word slide animations */
      }}>
        {/* Ambient orb */}
        <motion.div style={{
          position: "absolute",
          left: "50%", top: "50%",
          x: "-50%", y: "-50%",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(74,144,226,0.075) 0%, transparent 68%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          scale: orbScale,
          opacity: orbOp,
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(24px, 6vw, 80px)",
          width: "100%", maxWidth: 1200, margin: "0 auto",
        }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            margin: "0 0 48px",
          }}>
            Our mandate
          </p>

          {/* Words */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.03em" }}>
            {WORDS.map((word, i) => {
              const seg   = 1 / WORDS.length;
              const start = i * seg;
              const end   = start + seg * 0.68;
              return (
                <WordLine
                  key={word.text}
                  text={word.text}
                  primary={word.primary}
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
              startP={0.74}
              endP={0.90}
            />
            <BodyLine
              text="No niche. No category. Just real problems, solved exceptionally well."
              progress={progress}
              startP={0.84}
              endP={1.00}
            />
          </div>
        </div>

        {/* Right edge progress bars */}
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
