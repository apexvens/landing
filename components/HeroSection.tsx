"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReady } from "./PageWrapper";

/* ── Orb ─────────────────────────────────────────────────────── */
function Orb({ color, size, top, left, anim, delay, blur = 90 }: {
  color: string; size: number; top: string; left: string;
  anim: string; delay: string; blur?: number;
}) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      width: size, height: size, top, left,
      background: `radial-gradient(circle at 40% 40%, ${color} 0%, transparent 68%)`,
      filter: `blur(${blur}px)`,
      animation: anim, animationDelay: delay,
      pointerEvents: "none", willChange: "transform",
    }} />
  );
}

/* ── Typewriter — supports \n for explicit line breaks ───────── */
function Typewriter({
  text,
  startDelay = 0,
  speed = 52,
  active = true,
}: {
  text:        string;
  startDelay?: number;
  speed?:      number;
  active?:     boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done,      setDone]      = useState(false);

  useEffect(() => {
    if (!active) return;
    let typeTimer: ReturnType<typeof setInterval>;
    let i = 0;
    const startTimer = setTimeout(() => {
      typeTimer = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(typeTimer);
          setTimeout(() => setDone(true), 1400);
        }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(startTimer); clearInterval(typeTimer); };
  }, [text, startDelay, speed, active]);

  /* Render with explicit <br> at every \n */
  const lines = displayed.split("\n");

  return (
    <>
      {lines.map((line, idx) => (
        <span key={idx}>
          {idx > 0 && <br />}
          {line}
        </span>
      ))}
      {!done && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "clamp(3px, 0.32vw, 5px)",
            height: "0.80em",
            background: "var(--violet)",
            borderRadius: 2,
            marginLeft: "0.05em",
            verticalAlign: "text-bottom",
            animation: "tw-blink 1.05s step-end infinite",
          }}
        />
      )}
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
export default function HeroSection() {
  const ready      = useReady();
  const PAD        = "clamp(24px, 6vw, 80px)";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY  = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        background: "var(--bg)", overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ opacity: 0.6 }} />

      {/* Orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <Orb color="rgba(74,144,226,0.18)"  size={700} top="5%"  left="55%" anim="orb-a 14s ease-in-out infinite" delay="0s"  blur={100} />
        <Orb color="rgba(155,111,232,0.15)" size={600} top="30%" left="5%"  anim="orb-b 18s ease-in-out infinite" delay="-5s" blur={90}  />
        <Orb color="rgba(62,207,142,0.10)"  size={450} top="55%" left="65%" anim="orb-c 12s ease-in-out infinite" delay="-3s" blur={80}  />
        <Orb color="rgba(240,165,0,0.08)"   size={380} top="70%" left="15%" anim="orb-d 20s ease-in-out infinite" delay="-8s" blur={100} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 40%, var(--bg) 80%)",
        }} />
      </div>

      {/* Content */}
      <motion.div style={{ y: heroY, opacity: heroOp }}>
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          padding: `120px ${PAD} 0`, position: "relative", zIndex: 1,
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}
          >
            <span style={{
              display: "inline-block", width: 5, height: 5, borderRadius: "50%",
              background: "var(--emerald)",
              animation: "pulse-dot 2.2s ease-in-out infinite",
            }} />
            <span className="label">Apex Ventures — Independent Product Studio · Pune</span>
          </motion.div>

          {/* Typewriter headline — 3 explicit lines */}
          <div
            className="hero-headline"
            style={{ display: "block" }}
          >
            <Typewriter
              text={"We build tools\nthat actually\nmatter."}
              startDelay={320}
              speed={52}
              active={ready}
            />
          </div>

          {/* Sub-row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: 64,
              display: "flex", flexWrap: "wrap",
              alignItems: "flex-end", justifyContent: "space-between", gap: 32,
            }}
          >
            <p className="body-lg" style={{ maxWidth: 420 }}>
              An independent studio building AI‑powered software.
              No niche. No category. Just real problems, solved fast.
            </p>

            <a
              href="#products"
              onClick={e => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600,
                letterSpacing: "-0.01em",
                /* Uses bg/fg swap so it reads in both light + dark mode */
                color: "var(--bg)",
                background: "var(--text-primary)",
                padding: "12px 24px", borderRadius: 8,
                textDecoration: "none", flexShrink: 0,
                transition: "opacity 0.2s ease, transform 0.25s var(--ease-out-expo)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              See products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 40, left: PAD,
          display: "flex", alignItems: "center", gap: 10, zIndex: 1,
        }}
      >
        <div style={{
          width: 1, height: 36,
          background: "linear-gradient(to bottom, var(--text-tertiary), transparent)",
          animation: "scroll-bob 2.2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.2em",
          color: "var(--text-ghost)", textTransform: "uppercase",
          writingMode: "vertical-rl", transform: "rotate(180deg)",
        }}>Scroll</span>
      </motion.div>

      {/* Corner stat */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: 40, right: PAD, zIndex: 1, textAlign: "right" }}
      >
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,56px)",
          fontWeight: 700, letterSpacing: "-0.04em",
          color: "var(--text-ghost)", lineHeight: 1,
        }}>6</div>
        <div className="label" style={{ marginTop: 4 }}>Products live / soon</div>
      </motion.div>
    </section>
  );
}
