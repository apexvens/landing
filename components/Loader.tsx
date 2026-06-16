"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

// ── Timing ────────────────────────────────────────────────────────────────
const T = {
  GRID_IN:      0.0,   // grid lines draw
  BADGE_IN:     0.3,   // top-left badge
  LINE1_IN:     0.5,   // "WE" slides up
  LINE2_IN:     0.78,  // "BUILD" slides up
  LINE3_IN:     1.05,  // "DIFFERENTLY" slides up
  SUB_IN:       1.5,   // sub label fades
  COUNTER_IN:   0.4,   // counter starts
  COUNTER_DUR:  2.8,   // counter runs for
  EXIT:         3.2,   // curtain starts
  DONE:         4.0,   // unmount
};

// ── Counter hook ──────────────────────────────────────────────────────────
function useCounter(from: number, to: number, duration: number, delayMs: number) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const t = setTimeout(() => {
      let start: number | null = null;
      let raf: number;
      const step = (ts: number) => {
        if (!start) start = ts;
        const pct = Math.min((ts - start) / (duration * 1000), 1);
        const e = pct < 0.5 ? 4 * pct ** 3 : 1 - (-2 * pct + 2) ** 3 / 2;
        setVal(Math.round(from + (to - from) * e));
        if (pct < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, delayMs);
    return () => clearTimeout(t);
  }, []);
  return val;
}

// ── Diagonal grid SVG overlay ──────────────────────────────────────────
function GridOverlay({ animate: shouldAnimate }: { animate: boolean }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      preserveAspectRatio="none"
    >
      {/* Horizontal lines */}
      {[20, 35, 50, 65, 80].map((pct, i) => (
        <motion.line
          key={`h${i}`}
          x1="0" y1={`${pct}%`} x2="100%" y2={`${pct}%`}
          stroke="rgba(240,239,233,0.055)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: T.GRID_IN + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Vertical lines */}
      {[16, 33, 50, 67, 84].map((pct, i) => (
        <motion.line
          key={`v${i}`}
          x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%"
          stroke="rgba(240,239,233,0.04)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={shouldAnimate ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: T.GRID_IN + 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Single diagonal accent */}
      <motion.line
        x1="0" y1="100%" x2="100%" y2="0"
        stroke="rgba(240,239,233,0.03)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={shouldAnimate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

// ── Main Loader ────────────────────────────────────────────────────────────
export default function Loader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const counter = useCounter(0, 100, T.COUNTER_DUR, T.COUNTER_IN * 1000);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), T.EXIT * 1000);
    const t2 = setTimeout(() => { setGone(true); onDone(); }, T.DONE * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  if (gone) return null;

  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#000",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── Grid ── */}
      <GridOverlay animate={!exiting} />

      {/* ── Noise texture overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
      }} />

      {/* ── Top-left badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: T.BADGE_IN, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 36, left: "clamp(24px, 5vw, 64px)",
          zIndex: 10,
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        {/* Logo mark */}
        <svg width="24" height="24" viewBox="0 0 52 52" fill="none">
          <rect x="1.5" y="1.5" width="49" height="49" rx="10" stroke="#F0EFE9" strokeWidth="1.5" fill="none" />
          <path d="M16 38 L26 14 L36 38" stroke="#F0EFE9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M19.5 30 L32.5 30" stroke="#F0EFE9" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(240,239,233,0.4)",
        }}>
          Apex Ventures
        </span>
      </motion.div>

      {/* ── Top-right meta ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: T.BADGE_IN + 0.1 }}
        style={{
          position: "absolute", top: 40, right: "clamp(24px, 5vw, 64px)",
          zIndex: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(240,239,233,0.2)",
        }}
      >
        Est. 2024
      </motion.div>

      {/* ── Main headline ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        paddingLeft: "clamp(24px, 7vw, 96px)",
        paddingRight: "clamp(24px, 7vw, 96px)",
      }}>

        {/* LINE 1 */}
        <div style={{ overflow: "hidden", marginBottom: "-0.06em" }}>
          <motion.h1
            initial={{ y: "105%", skewY: 2 }}
            animate={!exiting ? { y: "0%", skewY: 0 } : { y: "-105%", skewY: -1 }}
            transition={
              !exiting
                ? { duration: 1.0, delay: T.LINE1_IN, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.7, delay: 0, ease: ease }
            }
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: "clamp(72px, 14vw, 180px)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "#F0EFE9",
              margin: 0,
            }}
          >
            WE
          </motion.h1>
        </div>

        {/* LINE 2 */}
        <div style={{ overflow: "hidden", marginBottom: "-0.06em" }}>
          <motion.h1
            initial={{ y: "105%", skewY: 2 }}
            animate={!exiting ? { y: "0%", skewY: 0 } : { y: "-105%", skewY: -1 }}
            transition={
              !exiting
                ? { duration: 1.0, delay: T.LINE2_IN, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.7, delay: 0.04, ease: ease }
            }
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: "clamp(72px, 14vw, 180px)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "rgba(240,239,233,0.18)",
              margin: 0,
            }}
          >
            BUILD
          </motion.h1>
        </div>

        {/* LINE 3 */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "105%", skewY: 2 }}
            animate={!exiting ? { y: "0%", skewY: 0 } : { y: "-105%", skewY: -1 }}
            transition={
              !exiting
                ? { duration: 1.0, delay: T.LINE3_IN, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.7, delay: 0.08, ease: ease }
            }
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: "clamp(72px, 14vw, 180px)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "#F0EFE9",
              margin: 0,
            }}
          >
            PRODUCTS.
          </motion.h1>
        </div>

        {/* Sub label row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={!exiting ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={
            !exiting
              ? { duration: 0.7, delay: T.SUB_IN, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.35 }
          }
          style={{
            marginTop: "clamp(28px, 4vw, 52px)",
            display: "flex", alignItems: "center", gap: 20,
          }}
        >
          {/* Horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={!exiting ? { scaleX: 1 } : { scaleX: 0 }}
            transition={!exiting ? { duration: 0.8, delay: T.SUB_IN + 0.1 } : { duration: 0.3 }}
            style={{
              width: 48, height: 1,
              background: "rgba(240,239,233,0.25)",
              transformOrigin: "left",
            }}
          />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(9px, 1vw, 11px)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,239,233,0.3)",
          }}>
            AI-powered · Independent · Pune, India
          </span>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 clamp(24px, 5vw, 64px) 36px",
        zIndex: 10,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
      }}>
        {/* Progress track */}
        <div style={{ flex: 1, maxWidth: 320 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10,
          }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: T.COUNTER_IN }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(240,239,233,0.2)",
              }}
            >
              Loading
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: T.COUNTER_IN }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, letterSpacing: "0.08em",
                color: "rgba(240,239,233,0.45)",
                minWidth: 36, textAlign: "right",
              }}
            >
              {String(counter).padStart(3, "0")}
            </motion.span>
          </div>

          {/* Full-width progress bar */}
          <div style={{
            height: 1,
            background: "rgba(240,239,233,0.08)",
            borderRadius: 1, overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(to right, rgba(240,239,233,0.4), rgba(240,239,233,0.9))",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: counter / 100 }}
            />
          </div>
        </div>

        {/* Right: product count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: T.COUNTER_IN + 0.2 }}
          style={{
            textAlign: "right",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(240,239,233,0.18)",
            lineHeight: 1.8,
          }}
        >
          <div>3 Products</div>
          <div>1 Studio</div>
        </motion.div>
      </div>

      {/* ── Curtain exit — two panels wipe up ── */}
      <AnimatePresence>
        {exiting && (
          <>
            {/* Top half wipes up */}
            <motion.div
              key="curtain-top"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.75, ease: ease }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "50%", background: "#000", zIndex: 20,
              }}
            />
            {/* Bottom half wipes down */}
            <motion.div
              key="curtain-bot"
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.75, ease: ease, delay: 0.04 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "50%", background: "#000", zIndex: 20,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
