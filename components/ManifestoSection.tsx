"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  {
    text: "We don't chase trends.",
    sub: "Most tools are built because everyone else is building one.",
  },
  {
    text: "We find friction.",
    sub: "Friction is the gap between what exists and what should.",
  },
  {
    text: "We ship fast.",
    sub: "The best feedback is a real user hitting a real problem.",
  },
  {
    text: "We build to last.",
    sub: "Then we make it so good, people can't imagine life before it.",
  },
];

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each line occupies 0.25 of the scroll range
  const getOpacity = (i: number) => {
    const start = i * 0.25;
    const peak = start + 0.1;
    const end = start + 0.25;
    const exit = start + 0.3;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(
      scrollYProgress,
      i < 3
        ? [start, peak, end, exit]
        : [start, peak, 1.0],
      i < 3 ? [0, 1, 1, 0] : [0, 1, 1]
    );
  };

  const getY = (i: number) => {
    const start = i * 0.25;
    const peak = start + 0.1;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, peak], [30, 0]);
  };

  return (
    <section
      id="manifesto"
      ref={containerRef}
      style={{
        height: "500vh",
        background: "#000",
        position: "relative",
        borderTop: "1px solid rgba(248,248,245,0.06)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Label */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,248,245,0.15)",
          }}
        >
          Our Approach
        </div>

        {/* Scroll progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(248,248,245,0.15)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 48,
              height: 1,
              background: "rgba(248,248,245,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                scaleX: scrollYProgress,
                transformOrigin: "left",
                position: "absolute",
                inset: 0,
                background: "#F8F8F5",
              }}
            />
          </div>
        </div>

        {/* Lines */}
        {LINES.map((line, i) => (
          <motion.div
            key={line.text}
            style={{
              opacity: getOpacity(i),
              y: getY(i),
              position: "absolute",
              textAlign: "center",
              padding: "0 24px",
              maxWidth: 800,
              width: "100%",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 8vw, 100px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#F8F8F5",
                lineHeight: 1.0,
                marginBottom: 20,
              }}
            >
              {line.text}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 2vw, 16px)",
                color: "rgba(248,248,245,0.3)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {line.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
