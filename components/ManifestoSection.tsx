"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── ManifestoSection ──────────────────────────────────────────
   Each principle animates in as it enters the viewport.
   No SplitText on rows — was causing all 4 to fire at once since
   they shared the same scrub offsets. Instead: a cinematic
   clip-path reveal per title + staggered slide-in per row.
────────────────────────────────────────────────────────────── */

const PRINCIPLES = [
  { index: "01", bold: "No niche.",   body: "We go where the problem is — not where the market report says to go.",          accent: "#4A90E2" },
  { index: "02", bold: "No trends.",  body: "We build what should exist, not what everyone else is already building.",        accent: "#9B6FE8" },
  { index: "03", bold: "No fluff.",   body: "Ship, measure, improve. Repeat until it's obvious. Then do it again.",           accent: "#3ECF8E" },
  { index: "04", bold: "No ceiling.", body: "Five products shipped. Thousands of ideas queued. We're just getting started.",  accent: "#F0A500" },
];

function PrincipleRow({ p, i }: { p: typeof PRINCIPLES[0]; i: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr auto",
        alignItems: "center",
        gap: "clamp(20px, 4vw, 60px)",
        padding: "clamp(32px, 4vw, 52px) 0",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        cursor: "default",
        overflow: "hidden",
      }}
      className="principle-row"
    >
      {/* Accent underline that draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: 0, left: 0,
          width: "100%", height: 1,
          background: p.accent,
          transformOrigin: "left",
          opacity: 0.5,
        }}
      />

      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at left center, ${p.accent}0A 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Index — slides in from left */}
      <motion.span
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 0.7, x: 0 } : {}}
        transition={{ duration: 0.55, delay: i * 0.08 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.12em", color: p.accent, flexShrink: 0,
        }}
      >
        {p.index}
      </motion.span>

      {/* Title — clip-path reveal (different from every other section) */}
      <div style={{ overflow: "hidden" }}>
        <motion.h3
          initial={{ y: "100%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: 0, padding: 0,
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(32px, 5vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "var(--text-primary)",
          }}
        >
          {p.bold}
        </motion.h3>
      </div>

      {/* Body — fades in from right */}
      <motion.p
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: i * 0.08 + 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="principle-body"
        style={{
          fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.1vw, 15px)",
          lineHeight: 1.65, color: "var(--text-tertiary)", fontWeight: 300,
          maxWidth: 260, textAlign: "right",
        }}
      >
        {p.body}
      </motion.p>
    </div>
  );
}

export default function ManifestoSection() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const headerView = useInView(headerRef, { once: true });

  return (
    <section
      id="manifesto"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px clamp(24px, 6vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: 16, paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--text-tertiary)",
            }}
          >
            How we think
          </motion.p>

          {/* Large display text — scale in (different from everything else) */}
          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={headerView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              color: "var(--text-ghost)", fontWeight: 300,
              maxWidth: 300, textAlign: "right", lineHeight: 1.6,
            }}
            className="manifesto-subtext"
          >
            Four principles that shape every product decision we make.
          </motion.p>
        </div>

        {/* Rows */}
        <div>
          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.index} p={p} i={i} />
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
