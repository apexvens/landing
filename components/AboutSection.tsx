"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref     = useRef<HTMLSpanElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const raw     = useMotionValue(0);
  const spring  = useSpring(raw, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toString()
  );
  useEffect(() => { if (inView) raw.set(to); }, [inView, raw, to]);
  return <span ref={ref}><motion.span>{display}</motion.span>{suffix}</span>;
}

const HOW_WE_WORK = [
  { step: "01", title: "Find the friction",         body: "We don't look for market gaps in reports. We look for things that genuinely annoy people — tasks that take ten tabs, apps that almost work, experiences that feel like 2010. If something makes us say \"why doesn't this exist?\" — we build it." },
  { step: "02", title: "Build the minimum version", body: "The first build is never meant to be perfect. It's meant to prove the idea works. We cut every non-essential feature until what's left is a single clear value proposition. Then we ship that." },
  { step: "03", title: "Put it in front of real users", body: "No more internal debate. Real users break things in ways we never imagined. Every bug report, every confused click, every \"I thought this would\" — is product intelligence we couldn't have bought." },
  { step: "04", title: "Iterate until it's obvious",  body: "The best version of any product feels inevitable — like it couldn't have been built any other way. We iterate until it reaches that point. Obvious design. Zero onboarding. Results in seconds." },
];

const BELIEFS = [
  "Utility over aesthetics", "Shipping beats planning", "Real users over surveys",
  "Speed is a feature",      "Less is permanent",       "AI is infrastructure",
  "Focus beats breadth",     "Problems first, solutions second",
];

const TECH = [
  "Next.js", "Flutter", "FastAPI", "TypeScript", "Firebase",
  "Supabase", "OpenAI", "Framer Motion", "Vercel",
];

export default function AboutSection() {
  const headRef  = useRef<HTMLDivElement>(null);
  const headView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "100px clamp(24px, 6vw, 80px) 80px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Header — horizontal slide apart (unique) ── */}
        <div
          ref={headRef}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap",
            gap: 32, marginBottom: 80,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 20,
            }}>
              Studio — About Apex Ventures
            </p>
            <h2 style={{
              margin: 0, lineHeight: 1.05,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: "var(--text-primary)",
            }}>
              Independent.<br />
              <span style={{ color: "var(--text-ghost)" }}>Intentional.</span><br />
              Unstoppable.
            </h2>
          </motion.div>

          {/* Right: rotating ring stat — visually distinct */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -12 }}
            animate={headView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 160, height: 160, borderRadius: "50%",
              border: "1px solid var(--border)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 4, flexShrink: 0,
              position: "relative",
            }}
          >
            <div style={{
              fontFamily: "var(--font-hero)",
              fontSize: 52, fontWeight: 700,
              letterSpacing: "-0.05em",
              color: "var(--text-primary)", lineHeight: 1,
            }}>
              <CountUp to={5} />
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--text-tertiary)",
            }}>
              products
            </div>
          </motion.div>
        </div>

        {/* ── Opening statement — staggered from centre ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 60, marginBottom: 80, paddingBottom: 80,
            borderBottom: "1px solid var(--border)",
          }}
          className="about-split"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.2vw, 26px)",
              fontWeight: 500, letterSpacing: "-0.02em",
              lineHeight: 1.45, color: "var(--text-primary)",
            }}
          >
            "The best software is invisible.
            It removes friction, delivers results,
            and gets out of the way."
          </motion.p>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            {[
              "Apex Ventures is a one-person studio. Every product is designed, built, and shipped by a single developer — which means every decision is intentional, nothing is built by committee, and nothing ships until it's genuinely useful.",
              "We're not trying to build the next unicorn. We're trying to build the ten tools that should obviously exist — tools that make people's lives meaningfully better, in ways they can feel immediately.",
            ].map((t, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75,
                  color: "var(--text-secondary)", fontWeight: 300,
                }}
              >
                {t}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* ── How we work — numbered steps ── */}
        <div style={{ marginBottom: 80 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 40,
            }}
          >
            How we work
          </motion.p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px", background: "var(--border)",
            border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden",
          }} className="steps-grid">
            {HOW_WE_WORK.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
                whileHover={{ background: "rgba(248,248,245,0.025)" } as any}
                style={{ background: "var(--bg)", padding: "40px 36px", cursor: "default" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em",
                    color: "var(--text-tertiary)", marginTop: 4, flexShrink: 0,
                  }}>{s.step}</span>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(17px, 1.8vw, 22px)",
                      fontWeight: 600, letterSpacing: "-0.02em",
                      color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.2,
                    }}>{s.title}</h3>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8,
                      color: "var(--text-secondary)", fontWeight: 300,
                    }}>{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── What we believe — stagger scale in ── */}
        <div style={{ marginBottom: 80 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 32,
            }}
          >
            What we believe
          </motion.p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {BELIEFS.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.045 }}
                whileHover={{ background: "var(--border)", color: "var(--text-primary)" } as any}
                style={{
                  fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400,
                  color: "var(--text-secondary)", letterSpacing: "-0.01em",
                  padding: "8px 16px", borderRadius: 100,
                  border: "1px solid var(--border)",
                  background: "transparent", cursor: "default",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {b}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── Tech stack — horizontal reveal ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            border: "1px solid var(--border)", borderRadius: 14,
            padding: "28px 36px",
            display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-tertiary)", flexShrink: 0,
          }}>
            Built with
          </p>
          <div style={{ width: 1, height: 14, background: "var(--border)", flexShrink: 0 }} />
          {TECH.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 400,
                color: "var(--text-secondary)", whiteSpace: "nowrap",
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-split  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .steps-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
