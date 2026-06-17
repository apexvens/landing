"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-active");

    let mx = -100, my = -100;
    let dx = -100, dy = -100;
    let rx = -100, ry = -100;
    let rafId: number;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    // Track mouse
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    // Hover states
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tag = t.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") {
        dot.classList.add("is-text"); ring.classList.add("is-text");
      } else if (t.closest("a, button, [data-magnetic]")) {
        dot.classList.add("is-hovering"); ring.classList.add("is-hovering");
      }
    };
    const onLeave = () => {
      dot.className  = "cursor-dot";
      ring.className = "cursor-ring";
    };
    const onDown = () => { dot.classList.add("is-clicking"); ring.classList.add("is-clicking"); };
    const onUp   = () => { dot.classList.remove("is-clicking"); ring.classList.remove("is-clicking"); };

    // Magnetic pull — move ELEMENT toward cursor
    const onMagneticMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el => {
        const r   = el.getBoundingClientRect();
        const cx  = r.left + r.width  / 2;
        const cy  = r.top  + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const threshold = 90;
        if (dist < threshold) {
          const strength = (1 - dist / threshold) * 0.42;
          el.style.transform = `translate(${(mx - cx) * strength}px, ${(my - cy) * strength}px)`;
        } else {
          el.style.transform = "";
        }
      });
    };

    const tick = () => {
      dx = lerp(dx, mx, 0.18);
      dy = lerp(dy, my, 0.18);
      rx = lerp(rx, mx, 0.07);
      ry = lerp(ry, my, 0.07);
      dot.style.transform  = `translate(${dx}px, ${dy}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    document.addEventListener("mousemove",   onMove,         { passive: true });
    document.addEventListener("mousemove",   onMagneticMove, { passive: true });
    document.addEventListener("mouseover",   onEnter);
    document.addEventListener("mouseout",    onLeave);
    document.addEventListener("mousedown",   onDown);
    document.addEventListener("mouseup",     onUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",   onMove);
      document.removeEventListener("mousemove",   onMagneticMove);
      document.removeEventListener("mouseover",   onEnter);
      document.removeEventListener("mouseout",    onLeave);
      document.removeEventListener("mousedown",   onDown);
      document.removeEventListener("mouseup",     onUp);
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach(el => (el.style.transform = ""));
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
