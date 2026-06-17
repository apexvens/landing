"use client";

import { useEffect, useRef, useState } from "react";
import { useReady } from "./PageWrapper";

/* ── Typewriter ──────────────────────────────────────────────── */
function Typewriter({ text, go, onDone }: { text: string; go: boolean; onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done,  setDone]  = useState(false);
  const cbRef = useRef(onDone);
  cbRef.current = onDone;

  useEffect(() => {
    if (!go) return;
    setCount(0); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++; setCount(i);
      if (i >= text.length) { clearInterval(iv); setDone(true); cbRef.current?.(); }
    }, 50);
    return () => clearInterval(iv);
  }, [go, text]);

  return (
    <span aria-label={text}>
      <span>{text.slice(0, count)}</span>
      {go && !done && (
        <span style={{
          display:"inline-block", width:3, height:"0.72em",
          background:"var(--text-primary)", marginLeft:6,
          verticalAlign:"middle", borderRadius:1,
          animation:"tw-blink 0.85s step-start infinite",
        }} aria-hidden="true" />
      )}
      <span aria-hidden="true" style={{ visibility:"hidden", pointerEvents:"none" }}>
        {text.slice(count)}
      </span>
    </span>
  );
}

/* ── Orb ─────────────────────────────────────────────────────── */
function Orb({ color, size, top, left, anim, delay, blur = 90 }: {
  color: string; size: number; top: string; left: string;
  anim: string; delay: string; blur?: number;
}) {
  return (
    <div style={{
      position:"absolute", borderRadius:"50%",
      width:size, height:size,
      top, left,
      background:`radial-gradient(circle at 40% 40%, ${color} 0%, transparent 68%)`,
      filter:`blur(${blur}px)`,
      animation:anim,
      animationDelay:delay,
      pointerEvents:"none",
      willChange:"transform",
    }} />
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
export default function HeroSection() {
  const ready = useReady();
  const [l1, setL1] = useState(false);
  const [l2, setL2] = useState(false);
  const [l3, setL3] = useState(false);
  const PAD = "clamp(24px, 6vw, 80px)";

  return (
    <section style={{
      position:"relative", minHeight:"100vh",
      display:"flex", flexDirection:"column",
      background:"var(--bg)", overflow:"hidden",
    }}>
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" style={{ opacity:0.6 }} />

      {/* Gradient mesh orbs */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <Orb color="rgba(74,144,226,0.18)"  size={700} top="5%"  left="55%" anim="orb-a 14s ease-in-out infinite" delay="0s"    blur={100} />
        <Orb color="rgba(155,111,232,0.15)" size={600} top="30%" left="5%"  anim="orb-b 18s ease-in-out infinite" delay="-5s"   blur={90}  />
        <Orb color="rgba(62,207,142,0.10)"  size={450} top="55%" left="65%" anim="orb-c 12s ease-in-out infinite" delay="-3s"   blur={80}  />
        <Orb color="rgba(240,165,0,0.08)"   size={380} top="70%" left="15%" anim="orb-d 20s ease-in-out infinite" delay="-8s"   blur={100} />
        {/* Vignette to keep edges dark */}
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse at 50% 50%, transparent 40%, var(--bg) 80%)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex:1, display:"flex", flexDirection:"column", justifyContent:"center",
        padding:`120px ${PAD} 0`, position:"relative", zIndex:1,
      }}>
        {/* Eyebrow */}
        <div style={{
          display:"flex", alignItems:"center", gap:10,
          marginBottom:40,
          opacity: ready ? 1 : 0,
          transform: ready ? "none" : "translateY(8px)",
          transition:"opacity 0.7s ease, transform 0.7s ease",
        }}>
          <span style={{
            display:"inline-block", width:5, height:5, borderRadius:"50%",
            background:"var(--emerald)",
            animation:"pulse-dot 2.2s ease-in-out infinite",
          }} />
          <span className="label">Apex Ventures — Independent Product Studio · Pune</span>
        </div>

        {/* Headline */}
        <div style={{ marginBottom:0 }}>
          <h1 className="hero-headline" style={{ color:"var(--text-ghost)", marginBottom:4, display:"block" }}>
            <Typewriter text="We build" go={ready} onDone={() => setL1(true)} />
          </h1>
          <h1 className="hero-headline" style={{ color:"var(--text-ghost)", marginBottom:4, display:"block" }}>
            <Typewriter text="tools that" go={l1} onDone={() => setL2(true)} />
          </h1>
          <h1 className="hero-headline" style={{ color:"var(--text-primary)", display:"block" }}>
            <Typewriter text="actually matter." go={l2} onDone={() => setL3(true)} />
          </h1>
        </div>

        {/* Sub-row */}
        <div style={{
          marginTop:64,
          display:"flex", flexWrap:"wrap",
          alignItems:"flex-end", justifyContent:"space-between", gap:32,
          opacity: l3 ? 1 : 0,
          transform: l3 ? "none" : "translateY(16px)",
          transition:"opacity 0.9s ease, transform 0.9s ease",
        }}>
          <p className="body-lg" style={{ maxWidth:420 }}>
            An independent studio building AI‑powered software.
            No niche. No category. Just real problems, solved fast.
          </p>

          <a
            href="#products"
            data-magnetic
            onClick={e => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior:"smooth" }); }}
            style={{
              display:"inline-flex", alignItems:"center", gap:10,
              fontFamily:"var(--font-display)", fontSize:14, fontWeight:600,
              letterSpacing:"-0.01em", color:"#000",
              background:"var(--text-primary)",
              padding:"12px 24px", borderRadius:8,
              textDecoration:"none", flexShrink:0,
              transition:"background 0.2s ease, transform 0.25s var(--ease-out-expo)",
              willChange:"transform",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(240,239,233,0.88)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--text-primary)"; }}
          >
            See products
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12 L12 2 M5 2 H12 V9"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position:"absolute", bottom:40, left:PAD,
        display:"flex", alignItems:"center", gap:10, zIndex:1,
        opacity: l3 ? 1 : 0, transition:"opacity 1s ease 0.5s",
      }}>
        <div style={{
          width:1, height:36,
          background:"linear-gradient(to bottom, var(--text-tertiary), transparent)",
          animation: l3 ? "scroll-bob 2.2s ease-in-out infinite" : "none",
        }} />
        <span style={{
          fontFamily:"var(--font-mono)", fontSize:8, letterSpacing:"0.2em",
          color:"var(--text-ghost)", textTransform:"uppercase",
          writingMode:"vertical-rl", transform:"rotate(180deg)",
        }}>Scroll</span>
      </div>

      {/* Floating corner stat */}
      <div style={{
        position:"absolute", bottom:40, right:PAD, zIndex:1,
        opacity: l3 ? 1 : 0, transition:"opacity 1s ease 0.7s",
        textAlign:"right",
      }}>
        <div style={{
          fontFamily:"var(--font-display)", fontSize:"clamp(36px,5vw,56px)",
          fontWeight:700, letterSpacing:"-0.04em", color:"var(--text-ghost)",
          lineHeight:1,
        }}>3</div>
        <div className="label" style={{ marginTop:4 }}>Products live</div>
      </div>
    </section>
  );
}
