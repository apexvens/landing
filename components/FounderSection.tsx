"use client";

import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(248,248,245,0.1)",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 80,
            alignItems: "start",
          }}
          className="founder-grid"
        >
          {/* Left: label + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(248,248,245,0.2)",
                marginBottom: 20,
              }}
            >
              Founder
            </p>

            {/* Founder avatar placeholder */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 16,
                background: "rgba(248,248,245,0.1)",
                border: "1px solid rgba(248,248,245,0.12)",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* If /founder/neil.jpg exists, use it; otherwise initials */}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(248,248,245,0.3)",
                }}
              >
                N
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#F8F8F5",
                marginBottom: 6,
              }}
            >
              Neil Surjiani
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(248,248,245,0.2)",
              }}
            >
              Founder — Apex Ventures
            </p>
          </motion.div>

          {/* Right: bio paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            style={{ paddingTop: 44 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              {[
                "Apex Ventures is where ideas become products. Every tool starts with a real problem — something I've experienced, something people around me have experienced, something that should already have a good solution but doesn't.",
                "I'm not interested in perfect planning. I'm interested in shipping, learning, and improving. The fastest way to know if something works is to put it in front of people who actually need it.",
                "These three products represent the first chapter. The pipeline is full, and every new product will be built the same way: start with the problem, build the simplest thing that solves it, then make it exceptional.",
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: "rgba(248,248,245,0.45)",
                    fontWeight: 300,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Links row */}
            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/neil-surjiani",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/neil-surjiani",
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com/@NeilSurjiani",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(248,248,245,0.3)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget.style.color = "#F8F8F5")
                  )}
                  onMouseLeave={(e) =>
                    ((e.currentTarget.style.color = "rgba(248,248,245,0.3)")
                  )}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
