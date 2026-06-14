"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = ["Building", "Today.", "Scaling", "Tomorrow."];

export default function VisionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "120px clamp(24px, 6vw, 80px)",
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Parallax orb */}
      <motion.div style={{
        position: "absolute",
        left: "50%", top: "50%",
        x: "-50%", y,
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(155,111,232,0.07) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 900, textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 36,
          }}
        >
          Our Mandate
        </motion.p>

        <div style={{ overflow: "hidden", marginBottom: 40 }}>
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.85,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(40px, 7vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: i % 2 === 0 ? "var(--text-primary)" : "var(--text-tertiary)",
                marginRight: "0.22em",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 18px)",
            lineHeight: 1.75, color: "var(--text-tertiary)", fontWeight: 300,
            maxWidth: 580, margin: "0 auto",
          }}
        >
          Apex Ventures is focused on creating products that solve meaningful problems —
          continuously exploring new opportunities across AI, mobility, productivity, and beyond.
        </motion.p>
      </div>
    </section>
  );
}
