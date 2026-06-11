"use client";

import { motion } from "framer-motion";

const STATEMENTS = [
  { bold: "No niche.", rest: " We go where the problem is." },
  { bold: "No trends.", rest: " We build what should exist." },
  { bold: "No fluff.", rest: " We ship, measure, improve." },
  { bold: "No ceiling.", rest: " Three products. Thousands more ideas." },
];

const MARQUEE_ITEMS = [
  "Build fast", "·", "Ship real", "·", "Solve hard", "·",
  "Think different", "·", "Stay lean", "·", "Build fast", "·",
  "Ship real", "·", "Solve hard", "·", "Think different", "·", "Stay lean", "·",
];

function MarqueeRow({ reverse = false, speed = 28 }: { reverse?: boolean; speed?: number }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", gap: 40, width: "max-content", willChange: "transform" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item === "·" ? "var(--font-body)" : "var(--font-display)",
              fontSize: item === "·" ? 20 : "clamp(40px, 5vw, 72px)",
              fontWeight: item === "·" ? 400 : 700,
              letterSpacing: item === "·" ? 0 : "-0.03em",
              color: item === "·" ? "rgba(248,248,245,0.1)" : "rgba(248,248,245,0.07)",
              whiteSpace: "nowrap",
              lineHeight: 1,
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        paddingTop: 80,
        paddingBottom: 80,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Stacked marquee rows — pure atmosphere, no scroll lock */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, pointerEvents: "none" }}>
        <MarqueeRow speed={35} />
        <MarqueeRow reverse speed={28} />
        <MarqueeRow speed={40} />
      </div>

      {/* Foreground statements grid — sits on top of the marquee */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
        }}
        className="manifesto-grid"
      >
        {STATEMENTS.map((s, i) => (
          <motion.div
            key={s.bold}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            style={{
              background: "var(--bg)",
              padding: "36px 32px",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                color: "var(--text-primary)",
              }}
            >
              {s.bold}
              <span style={{ color: "var(--text-secondary)", fontWeight: 300 }}>{s.rest}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .manifesto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
