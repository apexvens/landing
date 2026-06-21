"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "./SplitText";

export default function VisionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "140px clamp(24px, 6vw, 80px)",
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
        width: 700, height: 350,
        background: "radial-gradient(ellipse, rgba(155,111,232,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1000, textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 48,
          }}
        >
          Our Mandate
        </motion.p>

        {/* Giant scroll-scrubbed split-text headline */}
        <div style={{ marginBottom: 52, lineHeight: 0.95 }}>
          <h2 style={{
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(56px, 10vw, 128px)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 0.95,
            margin: 0,
          }}>
            <SplitText
              text="Building"
              by="chars"
              scrubStart="start 0.85"
              scrubEnd="start 0.4"
              y={80}
              rotate={4}
              stagger={0.025}
              style={{ color: "var(--text-primary)" }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
            {" "}
            <SplitText
              text="Today."
              by="chars"
              scrubStart="start 0.72"
              scrubEnd="start 0.28"
              y={80}
              rotate={-4}
              stagger={0.025}
              style={{ color: "var(--text-ghost)" }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
            {" "}
            <SplitText
              text="Scaling"
              by="chars"
              scrubStart="start 0.6"
              scrubEnd="start 0.15"
              y={80}
              rotate={4}
              stagger={0.025}
              style={{ color: "var(--text-primary)" }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
            {" "}
            <SplitText
              text="Tomorrow."
              by="chars"
              scrubStart="start 0.48"
              scrubEnd="start 0.05"
              y={80}
              rotate={-4}
              stagger={0.02}
              style={{ color: "var(--text-ghost)" }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
          </h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
