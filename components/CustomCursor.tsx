"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    let frame: number;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const enterLink = () => {
      dotRef.current?.classList.add("cursor-hover");
      ringRef.current?.classList.add("ring-hover");
    };
    const leaveLink = () => {
      dotRef.current?.classList.remove("cursor-hover");
      ringRef.current?.classList.remove("ring-hover");
    };

    const bindLinks = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", enterLink);
        el.addEventListener("mouseleave", leaveLink);
      });
    };
    bindLinks();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          background: #F8F8F5;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: width 0.2s, height 0.2s, background 0.2s;
          will-change: transform;
        }
        .cursor-dot.cursor-hover {
          width: 10px; height: 10px;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1px solid rgba(248,248,245,0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          mix-blend-mode: difference;
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
          will-change: transform;
        }
        .cursor-ring.ring-hover {
          width: 56px; height: 56px;
          border-color: rgba(248,248,245,0.6);
          margin-top: -10px; margin-left: -10px;
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
