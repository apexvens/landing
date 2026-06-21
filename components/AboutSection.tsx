"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import SplitText from "./SplitText";

// ─── animated count-up number ────────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toString()
  );

  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────
const HOW_WE_WORK = [
  {
    step: "01",
    title: "Find the friction",
    body: "We don't look for market gaps in reports. We look for things that genuinely annoy people — tasks that take ten tabs, apps that almost work, experiences that feel like 2010. If something makes us say \"why doesn't this exist?\" — we build it.",
  },
  {
    step: "02",
    title: "Build the minimum version",
    body: "The first build is never meant to be perfect. It's meant to prove the idea works. We cut every non-essential feature until what's left is a single clear value proposition. Then we ship that.",
  },
  {
    step: "03",
    title: "Put it in front of real users",
    body: "No more internal debate. Real users break things in ways we never imagined. Every bug report, every confused click, every \"I thought this would\" — is product intelligence we couldn't have bought.",
  },
  {
    step: "04",
    title: "Iterate until it's obvious",
    body: "The best version of any product feels inevitable — like it couldn't have been built any other way. We iterate until it reaches that point. Obvious design. Zero onboarding. Results in seconds.",
  },
];

const BELIEFS = [
  "Utility over aesthetics",
  "Shipping beats planning",
  "Real users over surveys",
  "Speed is a feature",
  "Less is permanent",
  "AI is infrastructure",
  "Focus beats breadth",
  "Problems first, solutions second",
];

const STATS = [
  { value: 5,     suffix: "",      label: "Products live/soon" },
  { value: 1000,  suffix: "+",     label: "Dev hours logged" },
  { value: 100,   suffix: "%",     label: "AI-powered" },
  { value: 0,     suffix: "",      label: "VC funding needed" },
];

const TECH = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Firebase", "Vercel", "OpenAI API",
  "Google Maps API", "Node.js",
];

// ─── component ────────────────────────────────────────────────────────────────
export default function AboutSection() {
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

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 80 }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: 20,
          }}>
            Studio — About Apex Ventures
          </p>
          <h2 style={{ margin: 0, lineHeight: 1.05 }}>
            <SplitText
              text="An independent studio that builds"
              by="words"
              scrubStart="start 0.9"
              scrubEnd="start 0.5"
              y={50}
              stagger={0.04}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 700, letterSpacing: "-0.04em",
                color: "var(--text-primary)",
              }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
            <SplitText
              text="software people actually use."
              by="words"
              scrubStart="start 0.78"
              scrubEnd="start 0.38"
              y={50}
              stagger={0.05}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 700, letterSpacing: "-0.04em",
                color: "var(--text-secondary)",
              }}
              wrapperStyle={{ display: "block" }}
              tag="span"
            />
          </h2>
        </motion.div>

        {/* ── Opening statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            marginBottom: 80,
            paddingBottom: 80,
            borderBottom: "1px solid var(--border)",
          }}
          className="about-split"
        >
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.45,
            color: "var(--text-primary)",
          }}>
            "The best software is invisible.
            It removes friction, delivers results,
            and gets out of the way."
          </p>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            {[
              "Apex Ventures is a one-person studio. Every product is designed, built, and shipped by a single developer — which means every decision is intentional, nothing is built by committee, and nothing ships until it's genuinely useful.",
              "We're not trying to build the next unicorn. We're trying to build the ten tools that should obviously exist — tools that make people's lives meaningfully better, in ways they can feel immediately.",
            ].map((t, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.75,
                color: "var(--text-secondary)", fontWeight: 300,
              }}>{t}</p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 }}
                whileHover={{ background: "rgba(248,248,245,0.025)" }}
                style={{ background: "var(--bg)", padding: "40px 36px", cursor: "default", transition: "background 0.25s" }}
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

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px", background: "var(--border)",
            border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden",
            marginBottom: 80,
          }}
          className="stats-grid"
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--bg)", padding: "36px 28px", textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700, letterSpacing: "-0.04em",
                color: "var(--text-primary)", marginBottom: 8, lineHeight: 1,
              }}>
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "var(--text-tertiary)",
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── What we believe ── */}
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
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.055 }}
                whileHover={{ background: "var(--border)", color: "var(--text-primary)" }}
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

        {/* ── Tech stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            border: "1px solid var(--border)", borderRadius: 14,
            padding: "32px 36px",
            display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          }}
        >
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--text-tertiary)", flexShrink: 0,
          }}>
            Built with
          </p>
          <div style={{ width: 1, height: 14, background: "rgba(248,248,245,0.12)", flexShrink: 0 }} />
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
          .stats-grid   { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
