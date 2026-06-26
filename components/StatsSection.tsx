"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "./SplitText";

function AnimatedNumber({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const dur = 1400;
      const tick = () => {
        const p    = Math.min((performance.now() - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        setVal(Math.round(ease * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, to, delay]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* Updated to reflect real numbers: 4 shipped, 2 in progress, ∞ ideas */
const STATS = [
  { value: 4,   suffix: "",  label: "Products Shipped",   accent: "#4A90E2", symbol: null },
  { value: 2,   suffix: "",  label: "In Development",     accent: "#9B6FE8", symbol: null },
  { value: 0,   suffix: "",  label: "Ideas Ahead",         accent: "#3ECF8E", symbol: "∞"  },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "100px clamp(24px, 6vw, 80px)",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(155,111,232,0.05) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 20,
            }}
          >
            By the numbers
          </motion.p>
          <div style={{ lineHeight: 1 }}>
            <SplitText
              text="Numbers don't lie."
              by="chars"
              scrubStart="start 0.88"
              scrubEnd="start 0.5"
              y={60}
              rotate={3}
              stagger={0.022}
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(36px, 6vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
              }}
              tag="h2"
            />
          </div>
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }} className="stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "var(--bg)",
                padding: "clamp(40px, 5vw, 72px) clamp(24px, 4vw, 56px)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 12, textAlign: "center",
                position: "relative", overflow: "hidden",
              }}
              whileHover={{ background: `${stat.accent}08` } as any}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: stat.accent, transformOrigin: "left", opacity: 0.6,
                }}
              />
              <div style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(52px, 8vw, 96px)",
                fontWeight: 700, letterSpacing: "-0.045em",
                color: stat.accent, lineHeight: 1,
              }}>
                {stat.symbol ?? (
                  <AnimatedNumber to={stat.value} suffix={stat.suffix} delay={i * 120} />
                )}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
