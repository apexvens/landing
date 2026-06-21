"use client";

import React, { useRef, useMemo, CSSProperties } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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
  tag?: string;
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
  const rangeStart = (index / total) * (1 - stagger * total);
  const inputRange: [number, number] = [
    Math.max(0, rangeStart),
    Math.min(1, rangeStart + 0.35),
  ];

  const unitY    = useTransform(scrollYProgress, inputRange, [`${y}px`, "0px"]);
  const unitOp   = useTransform(scrollYProgress, inputRange, [0, 1]);
  const unitRot  = useTransform(scrollYProgress, inputRange, [rotate, 0]);
  const unitBlur = useTransform(scrollYProgress, inputRange, [6, 0]);
  const color    = colorMap?.[index];

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
        {children === " " ? "\u00A0" : children}
      </motion.span>
    </span>
  );
}

export default function SplitText({
  text,
  by = "chars",
  style,
  wrapperStyle,
  stagger = 0.018,
  scrubStart = "start 0.88",
  scrubEnd = "start 0.22",
  y = 70,
  rotate = 0,
  colorMap,
  tag = "span",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

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
    return text.split("");
  }, [text, by]);

  const inner = units.map((unit, i) => (
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
  ));

  // Use React.createElement to avoid TypeScript's "union too complex" error
  // that occurs when using a dynamic JSX tag variable.
  return React.createElement(
    tag,
    {
      ref,
      "aria-label": text,
      style: { display: "inline", ...wrapperStyle },
    },
    ...inner
  );
}
