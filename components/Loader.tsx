"use client";

import { useEffect, useRef, useState } from "react";

// All animation done with CSS keyframes — zero Framer Motion, zero hydration issues.
// Simple state machine: "in" → "exit" → parent unmounts

const WORDMARK = "APEX VENTURES".split("");
const FILL_MS  = 2400;  // how long progress bar fills
const EXIT_MS  = 2800;  // when fade-out starts
const DONE_MS  = 3600;  // when onDone fires (after fade completes)

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress]   = useState(0);
  const [exiting,  setExiting]    = useState(false);
  const rafRef  = useRef<number | undefined>(undefined);
  const t1Ref   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t2Ref   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let start: number | undefined;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const pct  = Math.min((ts - start) / FILL_MS, 1);
      // Ease-in-out quad
      const ease = pct < 0.5 ? 2 * pct * pct : 1 - Math.pow(-2 * pct + 2, 2) / 2;
      setProgress(Math.round(ease * 100));
      if (pct < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    t1Ref.current = setTimeout(() => setExiting(true), EXIT_MS);
    t2Ref.current = setTimeout(() => onDone(),          DONE_MS);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      clearTimeout(t1Ref.current!);
      clearTimeout(t2Ref.current!);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`
        @keyframes _ldraw {
          from { stroke-dashoffset: var(--dl); opacity: 0; }
          to   { stroke-dashoffset: 0;         opacity: 1; }
        }
        @keyframes _lfade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes _lchar {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .__lp {
          stroke-dasharray: var(--dl);
          stroke-dashoffset: var(--dl);
          opacity: 0;
          animation: _ldraw var(--dur, 0.8s) cubic-bezier(0.22,1,0.36,1) var(--del, 0s) forwards;
        }
        .__lc {
          display: inline-block;
          opacity: 0;
          animation: _lchar 0.45s cubic-bezier(0.22,1,0.36,1) var(--del, 0s) forwards;
        }
        .__lb { opacity: 0; animation: _lfade 0.6s ease var(--del, 0s) forwards; }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#0A0A09",
        display: "flex", flexDirection: "column",
        // Single CSS property drives the exit — no library needed
        opacity:    exiting ? 0 : 1,
        transition: exiting ? "opacity 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: exiting ? "none" : "auto",
        overflow: "hidden",
      }}>

        {/* Subtle background grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: [
            "linear-gradient(rgba(240,239,233,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(240,239,233,0.025) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "80px 80px",
        }} />

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div className="__lb" style={{ "--del": "0.1s" } as React.CSSProperties}
          aria-hidden="true"
        >
          <div style={{
            position: "absolute", top: 32, left: "clamp(24px,5vw,64px)", right: "clamp(24px,5vw,64px)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            zIndex: 1,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(240,239,233,0.25)",
            }}>
              Apex Ventures
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(240,239,233,0.15)",
            }}>
              Est. 2024
            </span>
          </div>
        </div>

        {/* ── Centre mark ─────────────────────────────────────── */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 24,
          position: "relative", zIndex: 1,
        }}>

          {/* SVG logo */}
          <svg width="60" height="60" viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <rect
              className="__lp"
              style={{ "--dl": "196", "--del": "0s", "--dur": "1s" } as React.CSSProperties}
              x="1.5" y="1.5" width="49" height="49" rx="11"
              stroke="#F0EFE9" strokeWidth="1.5"
            />
            <path
              className="__lp"
              style={{ "--dl": "72", "--del": "0.25s", "--dur": "0.7s" } as React.CSSProperties}
              d="M16.5 37.5 L26 15 L35.5 37.5"
              stroke="#F0EFE9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
              className="__lp"
              style={{ "--dl": "18", "--del": "0.62s", "--dur": "0.35s" } as React.CSSProperties}
              d="M20.5 30.5 L31.5 30.5"
              stroke="#F0EFE9" strokeWidth="2" strokeLinecap="round"
            />
          </svg>

          {/* Wordmark — characters stagger in */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(11px, 1.2vw, 13px)",
            letterSpacing: "0.3em",
            fontWeight: 500,
            color: "#F0EFE9",
            userSelect: "none",
          }} aria-label="Apex Ventures">
            {WORDMARK.map((ch, i) =>
              ch === " " ? (
                <span key={i} style={{ display: "inline-block", width: "0.6em" }} />
              ) : (
                <span
                  key={i}
                  className="__lc"
                  style={{ "--del": `${0.65 + i * 0.042}s` } as React.CSSProperties}
                >
                  {ch}
                </span>
              )
            )}
          </div>

          {/* Tagline */}
          <p className="__lb" style={{
            "--del": "1.4s",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(240,239,233,0.2)", margin: 0,
          } as React.CSSProperties}>
            AI-Powered · Independent · Pune, India
          </p>
        </div>

        {/* ── Bottom progress ──────────────────────────────────── */}
        <div className="__lb" style={{
          "--del": "0.3s",
          padding: "0 clamp(24px,6vw,80px) 40px",
          position: "relative", zIndex: 1,
        } as React.CSSProperties}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(240,239,233,0.18)",
            }}>
              Loading
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: "0.06em",
              color: "rgba(240,239,233,0.45)",
              minWidth: 34, textAlign: "right",
            }}>
              {String(progress).padStart(3, "0")}
            </span>
          </div>

          {/* Track */}
          <div style={{
            height: 1, background: "rgba(240,239,233,0.08)",
            borderRadius: 1, overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(to right, rgba(240,239,233,0.25), rgba(240,239,233,0.85))",
              transition: "width 60ms linear",
            }} />
          </div>
        </div>

      </div>
    </>
  );
}
