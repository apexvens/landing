"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   VisionSection  —  "Building Today. Scaling Tomorrow."

   Same approach as KineticSection: useInView viewport trigger,
   no scroll scrubbing, no complex hook chains.
──────────────────────────────────────────────────────────────── */

interface Word {
  text:    string;
  primary: boolean;
}

const WORDS: Word[] = [
  { text: "Building",   primary: true  },
  { text: "Today.",     primary: false },
  { text: "Scaling",    primary: true  },
  { text: "Tomorrow.",  primary: false },
];

const BODY_LINES = [
  "Building AI-powered tools across mobility, health, productivity, and education.",
  "No niche. No category. Just real problems, solved exceptionally well.",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function VisionSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "100px clamp(24px, 6vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "50%", top: "50%",
          x: "-50%", y: "-50%",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(74,144,226,0.075) 0%, transparent 68%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div style={{
        maxWidth: 1200, margin: "0 auto", width: "100%",
        position: "relative", zIndex: 1,
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            margin: "0 0 48px",
          }}
        >
          Our mandate
        </motion.p>

        {/* Words */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.03em" }}>
          {WORDS.map((word, i) => (
            <div key={word.text} style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
              <motion.div
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : { y: "105%" }}
                transition={{ delay: i * 0.12, duration: 0.75, ease: EASE }}
              >
                <span
                  aria-label={word.text}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-hero)",
                    fontSize: "clamp(48px, 9.5vw, 128px)",
                    fontWeight: 700,
                    letterSpacing: "-0.045em",
                    lineHeight: 0.92,
                    color: word.primary ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  {word.text}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <div style={{ marginTop: 52, display: "flex", flexDirection: "column", gap: 8, maxWidth: 460 }}>
          {BODY_LINES.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: WORDS.length * 0.12 + i * 0.1 + 0.1, duration: 0.6, ease: EASE }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 1.72,
                color: "var(--text-tertiary)",
                fontWeight: 300,
                margin: 0,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Right edge indicators */}
      <div style={{
        position: "absolute",
        right: "clamp(24px, 4vw, 60px)",
        top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {WORDS.map((word, i) => (
          <motion.div
            key={word.text}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView
              ? { scaleY: 1, opacity: word.primary ? 0.85 : 0.40 }
              : { scaleY: 0, opacity: 0 }
            }
            transition={{ delay: i * 0.12 + 0.05, duration: 0.5, ease: EASE }}
            style={{
              width: 2, height: 30, borderRadius: 1,
              background: word.primary ? "var(--text-primary)" : "var(--text-tertiary)",
              transformOrigin: "top",
            }}
          />
        ))}
      </div>
    </section>
  );
}
