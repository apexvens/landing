"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BIO = [
  "Apex Ventures is where ideas become products. Every tool starts with a real problem — something I've experienced, something people around me have experienced, something that should already have a good solution but doesn't.",
  "I'm not interested in perfect planning. I'm interested in shipping, learning, and improving. The fastest way to know if something works is to put it in front of people who actually need it.",
  "These three products represent the first chapter. The pipeline is full, and every new product will be built the same way: start with the problem, build the simplest thing that solves it, then make it exceptional.",
];

const LINKS = [
  { label: "GitHub",   href: "https://github.com/neil-surjiani" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/neil-surjiani" },
  { label: "YouTube",  href: "https://youtube.com/@NeilSurjiani" },
];

export default function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      id="founder"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "100px clamp(24px, 6vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        style={{
          position: "absolute", left: "20%", bottom: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(62,207,142,0.05) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}
          className="founder-grid"
        >
          {/* Left: photo + name */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 24,
            }}>
              Founder
            </p>

            {/* Photo with parallax */}
            <motion.div
              style={{
                width: "100%", maxWidth: 220,
                aspectRatio: "3/4",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--border)",
                marginBottom: 24,
                position: "relative",
                y: imgY,
              }}
            >
              <img
                src="/founder/photo.png"
                alt="Neil Surjiani"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.style.background = "var(--bg-raised)";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    `<span style="display:flex;align-items:center;justify-content:center;height:100%;font-family:var(--font-display);font-size:64px;font-weight:700;color:var(--text-ghost)">N</span>`;
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)",
                pointerEvents: "none",
              }} />
            </motion.div>

            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
              letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: 6,
            }}>
              Neil Surjiani
            </h3>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--text-tertiary)",
            }}>
              Founder — Apex Ventures
            </p>

            {/* Pulsing "live" indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "#3ECF8E",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "#3ECF8E", opacity: 0.7,
              }}>
                Currently building
              </span>
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            style={{ paddingTop: 44 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {BIO.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75,
                    color: "var(--text-secondary)", fontWeight: 300,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: 1, background: "var(--border)", marginBottom: 32,
                transformOrigin: "left",
              }}
            />

            {/* Links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "var(--text-tertiary)",
                    textDecoration: "none", transition: "color 0.2s",
                    display: "inline-flex", alignItems: "center", gap: 4,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
                >
                  {link.label} ↗
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
