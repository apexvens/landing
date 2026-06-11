"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PRINCIPLES = [
  {
    index: "01",
    bold: "No niche.",
    body: "We go where the problem is — not where the market report says to go.",
    accent: "#4A90E2",
  },
  {
    index: "02",
    bold: "No trends.",
    body: "We build what should exist, not what everyone else is already building.",
    accent: "#9B6FE8",
  },
  {
    index: "03",
    bold: "No fluff.",
    body: "Ship, measure, improve. Repeat until it's obvious. Then do it again.",
    accent: "#3ECF8E",
  },
  {
    index: "04",
    bold: "No ceiling.",
    body: "Three products shipped. Thousands of ideas queued. We're just getting started.",
    accent: "#F0A500",
  },
];

function PrincipleRow({
  principle,
  index: rowIndex,
}: {
  principle: (typeof PRINCIPLES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.3"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      transition={{ ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr auto",
          alignItems: "center",
          gap: "clamp(20px, 4vw, 60px)",
          padding: "clamp(28px, 3.5vw, 44px) 0",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}
        className="principle-row"
      >
        {/* Accent line that animates in */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: 1,
            background: principle.accent,
            scaleX: scrollYProgress,
            transformOrigin: "left",
            opacity: 0.5,
          }}
        />

        {/* Index */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: principle.accent,
            opacity: 0.8,
            flexShrink: 0,
          }}
        >
          {principle.index}
        </span>

        {/* Bold statement */}
        <h3
          style={{
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(28px, 4.5vw, 64px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "var(--text-primary)",
          }}
        >
          {principle.bold}
        </h3>

        {/* Right: body text */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 1.2vw, 15px)",
            lineHeight: 1.65,
            color: "var(--text-tertiary)",
            fontWeight: 300,
            maxWidth: 280,
            textAlign: "right",
          }}
          className="principle-body"
        >
          {principle.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px clamp(24px, 6vw, 80px) 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            paddingBottom: 48,
            borderBottom: "1px solid var(--border)",
            marginBottom: 0,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
            }}
          >
            How we think
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-ghost)",
              fontWeight: 300,
              maxWidth: 300,
              textAlign: "right",
              lineHeight: 1.6,
            }}
            className="manifesto-subtext"
          >
            Four principles that shape every product decision we make.
          </p>
        </motion.div>

        {/* Principles — scroll-linked rows */}
        <div>
          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.index} principle={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .principle-row {
            grid-template-columns: 40px 1fr !important;
          }
          .principle-body { display: none !important; }
          .manifesto-subtext { display: none !important; }
        }
      `}</style>
    </section>
  );
}
