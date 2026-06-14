"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "APEX VENTURES".split("");

// Timing constants (seconds) — start immediately
const T_LOGO_START   = 0.0;
const T_LOGO_DUR     = 0.7;
const T_WORD_START   = 0.6;
const T_LETTER_STEP  = 0.04;
const T_LINE_START   = 1.2;
const T_LINE_DUR     = 0.5;
const T_EXIT_START   = 1.9;
const T_DONE         = 2.6;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "exit" | "gone">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), T_EXIT_START * 1000);
    const t2 = setTimeout(() => {
      setPhase("gone");
      onDone();
    }, T_DONE * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          key="loader"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* SVG logomark */}
          <motion.svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.rect
              x="1.5" y="1.5" width="49" height="49" rx="12"
              stroke="#F0EFE9" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: T_LOGO_DUR, delay: T_LOGO_START, ease: [0.4, 0, 0.2, 1] },
                opacity:    { duration: 0.01, delay: T_LOGO_START },
              }}
            />
            <motion.path
              d="M16 38 L26 14 L36 38"
              stroke="#F0EFE9" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: T_LOGO_DUR * 0.7, delay: T_LOGO_START + 0.15, ease: [0.4, 0, 0.2, 1] },
                opacity:    { duration: 0.01, delay: T_LOGO_START + 0.15 },
              }}
            />
            <motion.path
              d="M19.5 30 L32.5 30"
              stroke="#F0EFE9" strokeWidth="2" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.22, delay: T_LOGO_START + 0.55, ease: [0.4, 0, 0.2, 1] },
                opacity:    { duration: 0.01, delay: T_LOGO_START + 0.55 },
              }}
            />
          </motion.svg>

          {/* Wordmark */}
          <div style={{ display: "flex", gap: 0, overflow: "hidden" }}>
            {LETTERS.map((char, i) => (
              <div key={i} style={{ overflow: "hidden", display: "inline-block" }}>
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: char === " " ? 0 : 1 }}
                  transition={{
                    y:       { duration: 0.5, delay: T_WORD_START + i * T_LETTER_STEP, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.25, delay: T_WORD_START + i * T_LETTER_STEP },
                  }}
                  style={{
                    display: "inline-block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: char === " " ? "0.3em" : "0.22em",
                    color: "#F0EFE9",
                    width: char === " " ? "0.6em" : "auto",
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Progress line */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 1,
              background: "rgba(240,239,233,0.1)",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <motion.div
              style={{ height: "100%", background: "#F0EFE9", transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: T_LINE_DUR, delay: T_LINE_START, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: T_LINE_START }}
            style={{
              position: "absolute",
              bottom: 52,
              right: "clamp(24px, 6vw, 80px)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "rgba(240,239,233,0.2)",
            }}
          >
            <CounterText from={0} to={100} duration={T_LINE_DUR} delay={T_LINE_START} />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CounterText({ from, to, duration, delay }: { from: number; to: number; duration: number; delay: number }) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      const pct = Math.min(elapsed / duration, 1);
      const eased = pct < 0.5 ? 4 * pct ** 3 : 1 - (-2 * pct + 2) ** 3 / 2;
      setVal(Math.round(from + (to - from) * eased));
      if (pct < 1) raf = requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => { raf = requestAnimationFrame(step); }, delay * 1000);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [from, to, duration, delay]);

  return <>{String(val).padStart(3, "0")}</>;
}
