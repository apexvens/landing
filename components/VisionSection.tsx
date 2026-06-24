"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── VisionSection ─────────────────────────────────────────────
   "Building Today. Scaling Tomorrow."

   FIX: Removed useSpring — Lenis + Framer Motion useScroll is
   enough. The extra spring was causing near-zero progress updates,
   making both sections look completely blank.

   FIX: "Today." and "Tomorrow." upgraded from text-ghost (10%)
   to 35% opacity — readable and intentionally dimmer than the
   primary words, creating a light/shadow rhythm.

   FIX: Height reduced 400vh → 260vh for tighter, more focused UX.
────────────────────────────────────────────────────────────── */

const WORDS = [
  { text: "Building",  color: "var(--text-primary)",        skew: "-2deg"  },
  { text: "Today.",    color: "rgba(240,239,233,0.32)",     skew: "1.5deg" },
  { text: "Scaling",   color: "var(--text-primary)",        skew: "-1deg"  },
  { text: "Tomorrow.", color: "rgba(240,239,233,0.32)",     skew: "1deg"   },
];

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // No useSpring — Lenis handles the smoothing.
  const progress = scrollYProgress;

  const orbScale = useTransform(progress, [0, 1], [0.7, 1.2]);

  return (
    /* 260vh — was 400vh */
    <div ref={containerRef} style={{ height: "260vh", position: "relative" }}>
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
        {/* Ambient orb */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            x: "-50%", y: "-50%",
            width: 700, height: 350,
            background: "radial-gradient(ellipse, rgba(155,111,232,0.08) 0%, transparent 70%)",
            filter: "blur(90px)",
            pointerEvents: "none",
            scale: orbScale,
          }}
        />

        <div style={{
          position: "relative", zIndex: 1,
          padding: "0 clamp(24px, 6vw, 80px)",
          width: "100%", maxWidth: 1200,
        }}>
          {/* Eyebrow — always visible */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: 52,
          }}>
            Our Mandate
          </p>

          {/* Words */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.04em" }}>
            {WORDS.map((word, i) => {
              const seg   = 1 / WORDS.length;
              const start = i * seg;
              const end   = start + seg * 0.65;

              const wordOp  = useTransform(progress, [start, end], [0, 1]);
              const wordY   = useTransform(progress, [start, end], [64, 0]);
              const wordBlr = useTransform(progress, [start, end], [12, 0]);

              return (
                <div key={word.text} style={{ overflow: "hidden" }}>
                  <motion.span
                    aria-label={word.text}
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-hero)",
                      fontSize: "clamp(52px, 10vw, 136px)",
                      fontWeight: 700,
                      letterSpacing: "-0.045em",
                      lineHeight: 0.93,
                      color: word.color,
                      opacity: wordOp,
                      y: wordY,
                      filter: useTransform(wordBlr, (b) => `blur(${b}px)`),
                      skewX: word.skew,
                    }}
                  >
                    {word.text}
                  </motion.span>
                </div>
              );
            })}
          </div>

          {/* Body text — appears at end */}
          <motion.p
            style={{
              marginTop: 52,
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.3vw, 17px)",
              lineHeight: 1.75,
              color: "var(--text-tertiary)",
              fontWeight: 300,
              maxWidth: 480,
              opacity: useTransform(progress, [0.78, 1], [0, 1]),
              y:       useTransform(progress, [0.78, 1], [20, 0]),
            }}
          >
            Building AI-powered tools that solve real problems — across mobility,
            health, productivity, and beyond. No niche. No category. Just impact.
          </motion.p>
        </div>

        {/* Right: progress bar */}
        <div style={{
          position: "absolute",
          right: "clamp(24px, 4vw, 60px)",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
          {WORDS.map((word, i) => {
            const seg   = 1 / WORDS.length;
            const start = i * seg;
            const end   = start + seg;
            return (
              <motion.div
                key={word.text}
                style={{
                  width: 2, height: 32, borderRadius: 1,
                  background: "var(--border)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <motion.div style={{
                  position: "absolute", inset: 0,
                  background: "#9B6FE8",
                  scaleY: useTransform(progress, [start, end], [0, 1]),
                  transformOrigin: "top",
                }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
