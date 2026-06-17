"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const doc  = document.documentElement;
      const top  = window.scrollY;
      const max  = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? top / max : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={barRef} className="scroll-progress" />;
}
