"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    let frame: number;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const enter = () => {
      dotRef.current?.classList.add("cur-hover");
      ringRef.current?.classList.add("ring-hover");
    };
    const leave = () => {
      dotRef.current?.classList.remove("cur-hover");
      ringRef.current?.classList.remove("ring-hover");
    };

    const bind = () => document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        .cur-dot {
          position: fixed; top: 0; left: 0;
          width: 6px; height: 6px;
          background: var(--text-primary);
          border-radius: 50%;
          pointer-events: none; z-index: 99999;
          will-change: transform;
          transition: width .18s, height .18s;
        }
        .cur-dot.cur-hover { width: 10px; height: 10px; }
        .cur-ring {
          position: fixed; top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1px solid var(--text-tertiary);
          border-radius: 50%;
          pointer-events: none; z-index: 99998;
          will-change: transform;
          transition: width .28s, height .28s, border-color .28s;
        }
        .cur-ring.ring-hover { width: 54px; height: 54px; margin: -9px 0 0 -9px; border-color: var(--text-secondary); }
        @media (pointer: coarse) { .cur-dot,.cur-ring { display:none; } body { cursor:auto; } }
      `}</style>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
