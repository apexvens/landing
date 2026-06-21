"use client";

import React, { useRef, useMemo, CSSProperties } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   SplitText  — scroll-scrubbed character / word reveal
   
   Props:
     text        — the string to split
     by          — "chars" | "words" (default "chars")
     className   — applied to each unit's outer clip-wrapper
     style       — applied to each unit's inner span
     stagger     — seconds between units (default 0.025)
     scrubStart  — IntersectionObserver / scroll offset start (default "start 0.88")
     scrubEnd    — scroll offset end (default "start 0.25")
     y           — translation distance (default 60px)
     once        — only animate in once (default true)
     color       — optional per-char color map (index => color)
─────────────────────────────────────────────────────────────── */

interface SplitTextProps {
  text: string;
  by?: "chars" | "words";
  className?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  stagger?: number;
  scrubStart?: string;
  scrubEnd?: string;
  y?: number;
  rotate?: number;
  once?: boolean;
  colorMap?: Record<number, string>;
  tag?: keyof React.JSX.IntrinsicElements;
}

function Unit({
  children,
  index,
  total,
  scrollYProgress,
  stagger,
  y,
  rotate,
  style,
  colorMap,
}: {
  children: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  stagger: number;
  y: number;
  rotate: number;
  style?: CSSProperties;
  colorMap?: Record<number, string>;
}) {
  // Map each unit to a portion of the scroll range
  const rangeStart = (index / total) * (1 - stagger * total);
  const inputRange: [number, number] = [
    Math.max(0, rangeStart),
    Math.min(1, rangeStart + 0.35),
  ];

  const unitY     = useTransform(scrollYProgress, inputRange, [`${y}px`, "0px"]);
  const unitOp    = useTransform(scrollYProgress, inputRange, [0, 1]);
  const unitRot   = useTransform(scrollYProgress, inputRange, [rotate, 0]);
  const unitBlur  = useTransform(scrollYProgress, inputRange, [6, 0]);

  const color = colorMap?.[index];

  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
    >
      <motion.span
        style={{
          display: "inline-block",
          y: unitY,
          opacity: unitOp,
          rotateZ: unitRot,
          filter: useTransform(unitBlur, (b) => `blur(${b}px)`),
          color: color ?? "inherit",
          ...style,
        }}
      >
        {/* Preserve spaces */}
        {children === " " ? "\u00A0" : children}
      </motion.span>
    </span>
  );
}

export default function SplitText({
  text,
  by = "chars",
  className,
  style,
  wrapperStyle,
  stagger = 0.018,
  scrubStart = "start 0.88",
  scrubEnd = "start 0.22",
  y = 70,
  rotate = 0,
  colorMap,
  tag: Tag = "span" as keyof React.JSX.IntrinsicElements,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [scrubStart as any, scrubEnd as any],
  });

  const units = useMemo(() => {
    if (by === "words") {
      return text.split(" ").flatMap((word, wi, arr) =>
        wi < arr.length - 1 ? [word, " "] : [word]
      );
    }
    // chars — split into individual characters, preserve spaces
    return text.split("");
  }, [text, by]);

  return (
    <Tag
      ref={ref as any}
      aria-label={text}
      style={{ display: "inline", ...(wrapperStyle as any) }}
    >
      {units.map((unit, i) => (
        <Unit
          key={i}
          index={i}
          total={units.length}
          scrollYProgress={scrollYProgress}
          stagger={stagger}
          y={y}
          rotate={rotate}
          style={style}
          colorMap={colorMap}
        >
          {unit}
        </Unit>
      ))}
    </Tag>
  );
}
