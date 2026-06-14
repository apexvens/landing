"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "No Niche", "·", "No Trends", "·", "No Fluff", "·", "No Ceiling", "·",
  "Ship Fast", "·", "Think Deep", "·", "Build Real", "·", "Stay Lean", "·",
  "AI-Native", "·", "Problem First", "·", "Zero Funding", "·", "100% Independent", "·",
  "No Niche", "·", "No Trends", "·", "No Fluff", "·", "No Ceiling", "·",
  "Ship Fast", "·", "Think Deep", "·", "Build Real", "·", "Stay Lean", "·",
  "AI-Native", "·", "Problem First", "·", "Zero Funding", "·", "100% Independent", "·",
];

export default function MarqueeTicker() {
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-raised)",
      overflow: "hidden",
      position: "relative",
      height: 44,
      display: "flex",
      alignItems: "center",
    }}>
      {/* Edge fades */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to right, var(--bg-raised), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to left, var(--bg-raised), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item === "·" ? undefined : "var(--font-mono)",
              fontSize: item === "·" ? 16 : 9,
              letterSpacing: item === "·" ? 0 : "0.18em",
              textTransform: "uppercase",
              color: item === "·" ? "var(--text-ghost)" : "var(--text-tertiary)",
              paddingRight: 20,
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
