"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitText from "./SplitText";

const PRINCIPLES = [
  { index: "01", bold: "No niche.",    body: "We go where the problem is — not where the market report says to go.",         accent: "#4A90E2" },
  { index: "02", bold: "No trends.",   body: "We build what should exist, not what everyone else is already building.",       accent: "#9B6FE8" },
  { index: "03", bold: "No fluff.",    body: "Ship, measure, improve. Repeat until it's obvious. Then do it again.",          accent: "#3ECF8E" },
  { index: "04", bold: "No ceiling.",  body: "Five products shipped. Thousands of ideas queued. We're just getting started.", accent: "#F0A500" },
];

function PrincipleRow({ principle }: { principle: typeof PRINCIPLES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "start 0.3"],
  });
  const rowOp = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rowX  = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity: rowOp, x: rowX }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr auto",
          alignItems: "center",
          gap: "clamp(20px, 4vw, 60px)",
          padding: "clamp(28px, 3.5vw, 44px) 0",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          cursor: "default",
        }}
        className="principle-row"
      >
        {/* Scan line */}
        <motion.div
          style={{
            position: "absolute", left: 0, top: 0,
            width: "100%", height: 1,
            background: principle.accent,
            scaleX: scrollYProgress,
            transformOrigin: "left",
            opacity: 0.45,
          }}
        />

        {/* Hover glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at left center, ${principle.accent}08 0%, transparent 70%)`,
            pointerEvents: "none",
            transition: "opacity 0.3s",
          }}
        />

        {/* Index */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.12em", color: principle.accent, opacity: 0.8, flexShrink: 0,
        }}>
          {principle.index}
        </span>

        {/* Bold statement — char split */}
        <h3 style={{ margin: 0, padding: 0 }}>
          <SplitText
            text={principle.bold}
            by="chars"
            scrubStart="start 0.94"
            scrubEnd="start 0.35"
            y={60}
            rotate={3}
            stagger={0.03}
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(28px, 4.5vw, 72px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "var(--text-primary)",
            }}
          />
        </h3>

        {/* Body text — right aligned */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.2vw, 15px)",
            lineHeight: 1.65, color: "var(--text-tertiary)", fontWeight: 300,
            maxWidth: 280, textAlign: "right",
          }}
          className="principle-body"
        >
          {principle.body}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px clamp(24px, 6vw, 80px) 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax ambient blob */}
      <motion.div
        style={{
          position: "absolute", right: "-10%", top: "10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,144,226,0.06) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
          y: bgY,
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: 16, paddingBottom: 48,
            borderBottom: "1px solid var(--border)", marginBottom: 0,
          }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--text-tertiary)",
          }}>
            How we think
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 13,
            color: "var(--text-ghost)", fontWeight: 300,
            maxWidth: 300, textAlign: "right", lineHeight: 1.6,
          }} className="manifesto-subtext">
            Four principles that shape every product decision we make.
          </p>
        </motion.div>

        {/* Principle rows */}
        <div>
          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.index} principle={p} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .principle-row { grid-template-columns: 40px 1fr !important; }
          .principle-body { display: none !important; }
          .manifesto-subtext { display: none !important; }
        }
      `}</style>
    </section>
  );
}
