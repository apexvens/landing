"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Philosophy",
    text: "Build for utility, not trends. Every product starts with a real problem — not a market gap report.",
  },
  {
    label: "Process",
    text: "Ship fast, iterate faster. The best version of any product is shaped by real-world use, not internal debate.",
  },
  {
    label: "Ambition",
    text: "These three products are the first chapter. The pipeline is full. We're just getting started.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(248,248,245,0.06)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top: large editorial quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 80 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(248,248,245,0.2)",
              marginBottom: 24,
            }}
          >
            Studio — Why Apex Ventures
          </p>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.25,
              color: "rgba(248,248,245,0.7)",
              maxWidth: 800,
              borderLeft: "none",
            }}
          >
            "The best software is invisible.{" "}
            <span style={{ color: "rgba(248,248,245,0.25)" }}>
              It just gets things done."
            </span>
          </blockquote>
        </motion.div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(248,248,245,0.06)",
            border: "1px solid rgba(248,248,245,0.06)",
            borderRadius: 12,
            overflow: "hidden",
          }}
          className="about-grid"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              style={{
                background: "#000",
                padding: "36px 32px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(248,248,245,0.2)",
                  marginBottom: 16,
                }}
              >
                {String(i + 1).padStart(2, "0")} — {p.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(248,248,245,0.45)",
                  fontWeight: 300,
                }}
              >
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(248,248,245,0.06)",
            border: "1px solid rgba(248,248,245,0.06)",
            borderRadius: 12,
            overflow: "hidden",
          }}
          className="stats-grid"
        >
          {[
            { value: "3", label: "Products Shipped" },
            { value: "1,000+", label: "Dev Hours" },
            { value: "2025", label: "Founded" },
            { value: "∞", label: "Ideas Ahead" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#000",
                padding: "32px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#F8F8F5",
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(248,248,245,0.2)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
