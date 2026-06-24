"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

/* ── Products data ─────────────────────────────────────────── */
const products = [
  {
    id: "tripwise",
    index: "01",
    name: "TripWise AI",
    tagline: "Travel planning, reimagined.",
    description: "From 'I want to go somewhere' to a full day-by-day itinerary in under two minutes — flights, hotels, visa requirements, and budget in one place.",
    href: "https://tripwiseai.vercel.app/",
    color: "#4A90E2",
    tag: "Travel · AI",
    stat: { value: "< 2 min", label: "Full itinerary" },
    imagePath: "/tripwise/hero.png",
    comingSoon: false,
    emoji: "✈️",
  },
  {
    id: "nutrisense",
    index: "02",
    name: "NutriSense",
    tagline: "Point. Scan. Know what you eat.",
    description: "No logging, no guesswork. Point at a plate — get calories, macros, and personalised coaching. Data that actually changes behaviour.",
    href: "https://mynutrisense.vercel.app/#/home",
    color: "#5DBB6A",
    tag: "Health · AI",
    stat: { value: "0", label: "Manual logging" },
    imagePath: "/nutrisense/hero.png",
    comingSoon: false,
    emoji: "🥗",
  },
  {
    id: "folioai",
    index: "03",
    name: "FolioAI",
    tagline: "Your portfolio in 60 seconds.",
    description: "Paste a resume. Get a live, beautiful portfolio site instantly — built for developers who want to look great online without the design work.",
    href: "https://tryfolioai.vercel.app/",
    color: "#9B6FE8",
    tag: "Dev Tools · AI",
    stat: { value: "60 s", label: "Resume → live site" },
    imagePath: "/folioai/hero.png",
    comingSoon: false,
    emoji: "💼",
  },
  {
    id: "evmate",
    index: "04",
    name: "EVMate",
    tagline: "EV ownership, simplified.",
    description: "Real-time charger maps, range-aware routing, and long-distance planning — so owning an EV finally feels as simple as any other car.",
    href: "https://evmate-8ce3d.web.app/",
    color: "#3ECF8E",
    tag: "Mobility · EV",
    stat: { value: "0", label: "Range anxiety" },
    imagePath: "/evmate/hero.png",
    comingSoon: false,
    emoji: "⚡",
  },
  {
    id: "unipilot",
    index: "05",
    name: "UniPilot",
    tagline: "Your AI admissions strategist.",
    description: "Reads your profile, extracurriculars, and timeline — then builds a realistic, time-aware college roadmap instead of a generic list of dream schools.",
    href: "",
    color: "#F5A623",
    tag: "EdTech · AI",
    stat: { value: "Soon", label: "In development" },
    imagePath: "/unipilot/hero.png",
    comingSoon: true,
    emoji: "🎓",
  },
];

/* ── 3-D tilt card ─────────────────────────────────────────── */
function ProductCard({ p, i }: { p: typeof products[0]; i: number }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const rotX  = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),  { stiffness: 220, damping: 28 });
  const rotY  = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 28 });
  const glrX  = useTransform(rawX, [-0.5, 0.5], ["5%", "95%"]);
  const glrY  = useTransform(rawY, [-0.5, 0.5], ["5%", "95%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); setHov(false); };

  const showPlaceholder = p.comingSoon || imgFailed;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.10, ease: [0.22, 1, 0.36, 1] }}
      className="product-card-box"
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        borderRadius: 18,
        background: "var(--bg-card)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        border: `1px solid ${hov ? `${p.color}45` : "var(--border)"}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease",
        willChange: "transform",
        cursor: "default",
      }}
    >
      {/* Glare overlay */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          borderRadius: 18,
          background: useTransform(
            [glrX, glrY],
            ([x, y]: string[]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.065) 0%, transparent 52%)`
          ),
          opacity: hov ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Top accent line */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        opacity: hov ? 1 : 0.5,
        transition: "opacity 0.3s ease",
        flexShrink: 0,
      }} />

      {/* Screenshot area */}
      <div style={{
        position: "relative",
        height: 230,
        overflow: "hidden",
        background: "var(--bg-raised)",
        flexShrink: 0,
      }}>
        {showPlaceholder ? (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 14,
            background: `linear-gradient(145deg, ${p.color}14 0%, ${p.color}05 100%)`,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: `${p.color}1C`,
              border: `1px solid ${p.color}2E`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 28,
            }}>
              {p.emoji}
            </div>
            {p.comingSoon && (
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9, letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: p.color, opacity: 0.7,
              }}>
                Coming Soon
              </span>
            )}
          </div>
        ) : (
          <>
            <img
              src={p.imagePath}
              alt={p.name}
              onError={() => setImgFailed(true)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                transform: hov ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)",
                willChange: "transform",
              }}
            />
            {/* Branded accent tint per product */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${p.color}10 0%, transparent 50%)`,
              pointerEvents: "none",
              zIndex: 1,
            }} />
          </>
        )}

        {/* Theme-aware vignette — see globals.css .product-img-vignette */}
        <div className="product-img-vignette" />
      </div>

      {/* Card body */}
      <div style={{
        padding: "22px 24px 26px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {/* Tag row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: p.color, opacity: 0.9,
          }}>
            {p.tag}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.12em",
            color: "var(--text-ghost)",
          }}>
            {p.index}
          </span>
        </div>

        {/* Name + tagline */}
        <div>
          <h3 style={{
            margin: "0 0 4px",
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(20px, 2vw, 24px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "var(--text-primary)", lineHeight: 1.15,
          }}>
            {p.name}
          </h3>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: 13, fontWeight: 400,
            color: "var(--text-tertiary)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}>
            {p.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 13, lineHeight: 1.75,
          color: "var(--text-secondary)",
          fontWeight: 300, margin: 0,
          flex: 1,
        }}>
          {p.description}
        </p>

        {/* Separator */}
        <div style={{ height: 1, background: "var(--border-faint)" }} />

        {/* Stat + CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}>
          {/* Stat */}
          <div style={{ borderLeft: `2px solid ${p.color}`, paddingLeft: 11 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2vw, 22px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: p.color, lineHeight: 1,
            }}>
              {p.stat.value}
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 8, letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-ghost)", marginTop: 3,
            }}>
              {p.stat.label}
            </div>
          </div>

          {/* CTA */}
          {p.comingSoon ? (
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9, letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: p.color, opacity: 0.65,
              padding: "9px 14px",
              border: `1px solid ${p.color}30`,
              borderRadius: 8,
              background: `${p.color}0C`,
              flexShrink: 0,
            }}>
              Soon
            </span>
          ) : (
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "var(--font-display)",
                fontSize: 13, fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#000",
                background: p.color,
                padding: "9px 16px",
                borderRadius: 8,
                textDecoration: "none",
                flexShrink: 0,
                transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = "0.82";
                (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              Open
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1.5 9.5 L9.5 1.5 M4 1.5 H9.5 V7"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function ProductShowcase() {
  return (
    <section
      id="products"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "96px clamp(24px, 6vw, 80px) 96px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginBottom: 64,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9, letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              marginBottom: 16, margin: "0 0 16px",
            }}>
              What we've built
            </p>
            <h2 style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              lineHeight: 1.05, margin: 0,
              color: "var(--text-primary)",
            }}>
              Five products.{" "}
              <span style={{ color: "var(--text-tertiary)" }}>
                Five real problems solved.
              </span>
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--text-tertiary)",
            maxWidth: 240, lineHeight: 1.65, fontWeight: 300,
          }}>
            No niche. No category. We find friction and remove it — fast.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            perspective: 1200,
          }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) { .product-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px)  { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
