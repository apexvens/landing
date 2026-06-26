"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS DATA
═══════════════════════════════════════════════════════════════ */
interface Product {
  id:              string;
  index:           string;
  name:            string;
  tagline:         string;
  description:     string;
  longDescription: string;
  href:            string;
  color:           string;
  tag:             string;
  stat:            { value: string; label: string };
  imagePath:       string;
  comingSoon:      boolean;
  emoji:           string;
  features:        string[];
}

const products: Product[] = [
  {
    id:    "tripwise",
    index: "01",
    name:  "TripWise AI",
    tagline: "Travel planning, reimagined.",
    description: "From 'I want to go somewhere' to a complete day-by-day itinerary in under two minutes — flights, hotels, visa info, and budget all in one place.",
    longDescription: "TripWise AI turns the overwhelming process of trip planning into a two-minute conversation. Tell it where you want to go, your travel dates, budget, and preferences — and it generates a complete day-by-day itinerary covering flights, hotels, local attractions, restaurant picks, visa requirements, and detailed cost breakdowns. Built for solo travellers, couples, and groups who want the expertise of a personal travel agent without the cost or waiting.",
    href:  "https://tripwiseai.vercel.app/",
    color: "#4A90E2",
    tag:   "Travel · AI",
    stat:  { value: "< 2 min", label: "Full itinerary" },
    imagePath:  "/tripwise/hero.png",
    comingSoon: false,
    emoji:      "✈️",
    features: [
      "AI day-by-day itineraries",
      "Flight & hotel recommendations",
      "Visa & entry requirements",
      "Full budget breakdown",
      "Smart packing list",
      "Group co-planning",
    ],
  },
  {
    id:    "nutrisense",
    index: "02",
    name:  "NutriSense",
    tagline: "Point. Scan. Know what you eat.",
    description: "No logging, no guesswork. Point your camera at any meal — get instant calories, macros, and personalised coaching that actually changes behaviour.",
    longDescription: "NutriSense eliminates every barrier between eating and understanding what you eat. Point your camera at any meal and get an instant breakdown of calories, macros, vitamins, and nutritional quality — no logging, no barcode scanning, no manual entry. The AI layers personalised coaching on top of the data, identifying patterns in your eating habits and suggesting incremental improvements that fit your lifestyle and goals, not a rigid diet plan.",
    href:  "https://mynutrisense.vercel.app/#/home",
    color: "#5DBB6A",
    tag:   "Health · AI",
    stat:  { value: "0", label: "Manual logging required" },
    imagePath:  "/nutrisense/hero.png",
    comingSoon: false,
    emoji:      "🥗",
    features: [
      "Instant camera food scanning",
      "Calories & macro breakdown",
      "Vitamin & nutrient tracking",
      "Daily personalised coaching",
      "Habit pattern recognition",
      "Zero manual food diary",
    ],
  },
  {
    id:    "folioai",
    index: "03",
    name:  "FolioAI",
    tagline: "Your portfolio in 60 seconds.",
    description: "Paste a resume. Get a live, beautiful portfolio site instantly — for developers and creators who want to look great online without the design work.",
    longDescription: "FolioAI lets developers and creatives skip the portfolio-building grind entirely. Upload your resume or paste your GitHub profile — FolioAI extracts your projects, skills, and experience, then instantly generates a live, beautifully designed portfolio website in your choice of five professional templates. The result deploys immediately to a shareable link. No coding, no design tools, no configuration, no waiting.",
    href:  "https://tryfolioai.vercel.app/",
    color: "#9B6FE8",
    tag:   "Dev Tools · AI",
    stat:  { value: "60 s", label: "Resume → live site" },
    imagePath:  "/folioai/hero.png",
    comingSoon: false,
    emoji:      "💼",
    features: [
      "Resume-to-portfolio in one step",
      "Five professional templates",
      "GitHub profile integration",
      "Project & skills showcase",
      "Instant shareable link",
      "Zero design or code needed",
    ],
  },
  {
    id:    "evmate",
    index: "04",
    name:  "EVMate",
    tagline: "EV ownership, simplified.",
    description: "Real-time charger maps, range-aware routing, and long-distance trip planning — so owning an EV feels as simple as any other car.",
    longDescription: "EVMate makes range anxiety a thing of the past. Open the map and see every nearby charger in real time — filtered by speed, availability, and compatibility with your specific EV model. Plan multi-stop trips with intelligent routing that accounts for your current battery level, charging times at each stop, and your arrival targets. Whether it's a daily commute or a cross-country drive, EVMate plots the most efficient path automatically.",
    href:  "https://evmate-8ce3d.web.app/",
    color: "#3ECF8E",
    tag:   "Mobility · EV",
    stat:  { value: "0", label: "Range anxiety" },
    imagePath:  "/evmate/hero.png",
    comingSoon: false,
    emoji:      "⚡",
    features: [
      "Real-time charger availability",
      "Model-specific compatibility",
      "Range-aware route planning",
      "Multi-stop trip builder",
      "Battery & charge alerts",
      "Long-distance optimisation",
    ],
  },
  {
    id:    "unipilot",
    index: "05",
    name:  "UniPilot",
    tagline: "Your AI admissions strategist.",
    description: "Reads your full profile, extracurriculars, and timeline — then builds a realistic, time-aware roadmap instead of a generic dream school list.",
    longDescription: "UniPilot is the college admissions strategist most students can't afford. It reads your full academic profile — GPA, extracurriculars, test scores, essays in progress, and application timeline — then builds a personalised college list with realistic probability scores for each school. Rather than a static spreadsheet, UniPilot creates a time-aware action plan: what to strengthen, when to apply, and how — updating dynamically as your profile evolves throughout the year.",
    href:  "",
    color: "#F5A623",
    tag:   "EdTech · AI",
    stat:  { value: "Soon", label: "In development" },
    imagePath:  "/unipilot/hero.png",
    comingSoon: true,
    emoji:      "🎓",
    features: [
      "Realistic admission odds scoring",
      "Reach / Target / Safety tiers",
      "Time-aware action roadmap",
      "Essay strategy & review",
      "Profile gap analysis",
      "AI admissions chat",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   EXPANDED DETAIL MODAL
═══════════════════════════════════════════════════════════════ */
function ExpandedModal({
  product: p,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  /* Lock body scroll while open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const showPlaceholder = p.comingSoon || imgFailed;

  return (
    /* Backdrop */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
      }}
    >
      {/* Modal panel */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 28 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{   scale: 0.95,  opacity: 0, y: 16 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 960,
          maxHeight: "min(88vh, 700px)",
          borderRadius: 22,
          background: "var(--bg-raised)",
          border: `1px solid ${p.color}35`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: 2, flexShrink: 0,
          background: `linear-gradient(90deg, transparent 0%, ${p.color} 50%, transparent 100%)`,
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18, right: 18,
            zIndex: 10,
            width: 34, height: 34,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            color: "var(--text-tertiary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16, lineHeight: 1,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
          }}
        >
          ×
        </button>

        {/* Body — horizontal on desktop, vertical on mobile */}
        <div style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          minHeight: 0,
        }}>

          {/* ── Left: screenshot ── */}
          <div style={{
            width: "42%",
            flexShrink: 0,
            position: "relative",
            background: "var(--bg)",
            borderRight: "1px solid var(--border-faint)",
          }}>
            {showPlaceholder ? (
              <div style={{
                width: "100%", height: "100%",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 18,
                background: `linear-gradient(145deg, ${p.color}12 0%, ${p.color}04 100%)`,
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 22,
                  background: `${p.color}1C`,
                  border: `1px solid ${p.color}30`,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 36,
                }}>
                  {p.emoji}
                </div>
                {p.comingSoon && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 9,
                    letterSpacing: "0.2em", textTransform: "uppercase",
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
                  }}
                />
                {/* Accent tint */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(140deg, ${p.color}12 0%, transparent 55%)`,
                  pointerEvents: "none",
                }} />
                {/* Bottom vignette */}
                <div className="product-img-vignette" />
              </>
            )}
          </div>

          {/* ── Right: details ── */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 36px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            minHeight: 0,
          }}>
            {/* Tag + index */}
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
                {p.index} / 05
              </span>
            </div>

            {/* Name + tagline */}
            <div>
              <h2 style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 700, letterSpacing: "-0.04em",
                color: "var(--text-primary)", lineHeight: 1.1,
                margin: "0 0 8px",
              }}>
                {p.name}
              </h2>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 15, fontWeight: 400,
                color: "var(--text-tertiary)",
                letterSpacing: "-0.01em", margin: 0,
              }}>
                {p.tagline}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border-faint)" }} />

            {/* Long description */}
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 14, lineHeight: 1.80,
              color: "var(--text-secondary)",
              fontWeight: 300, margin: 0,
            }}>
              {p.longDescription}
            </p>

            {/* Features */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-ghost)",
                margin: "0 0 12px",
              }}>
                Key Features
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
              }}>
                {p.features.map(f => (
                  <div key={f} style={{
                    display: "flex", alignItems: "flex-start", gap: 8,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: p.color,
                      flexShrink: 0,
                      marginTop: 6,
                      opacity: 0.85,
                    }} />
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13, lineHeight: 1.5,
                      color: "var(--text-secondary)",
                      fontWeight: 400,
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border-faint)" }} />

            {/* Stat + CTA */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <div style={{ borderLeft: `2px solid ${p.color}`, paddingLeft: 14 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  fontWeight: 700, letterSpacing: "-0.04em",
                  color: p.color, lineHeight: 1,
                }}>
                  {p.stat.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8, letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-ghost)", marginTop: 4,
                }}>
                  {p.stat.label}
                </div>
              </div>

              {p.comingSoon ? (
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10, letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: p.color,
                  padding: "11px 20px",
                  border: `1px solid ${p.color}35`,
                  borderRadius: 10,
                  background: `${p.color}0C`,
                }}>
                  In Development
                </span>
              ) : (
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-display)",
                    fontSize: 14, fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "#000",
                    background: p.color,
                    padding: "11px 22px",
                    borderRadius: 10,
                    textDecoration: "none",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  Open App
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 11 L11 1 M4.5 1 H11 V7.5"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 640px) {
            .modal-body { flex-direction: column !important; }
            .modal-image { width: 100% !important; height: 200px !important; border-right: none !important; border-bottom: 1px solid var(--border-faint) !important; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT CARD  (click to expand — no tilt)
═══════════════════════════════════════════════════════════════ */
function ProductCard({
  p, i, onSelect,
}: {
  p: Product;
  i: number;
  onSelect: (p: Product) => void;
}) {
  const [hov, setHov]           = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const showPlaceholder = p.comingSoon || imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(p)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="product-card-box"
      style={{
        borderRadius: 18,
        background: "var(--bg-card)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        border: `1px solid ${hov ? `${p.color}50` : "var(--border)"}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: hov ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? `0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px ${p.color}20`
          : "none",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 2, flexShrink: 0,
        background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        opacity: hov ? 1 : 0.45,
        transition: "opacity 0.25s ease",
      }} />

      {/* Screenshot */}
      <div style={{
        position: "relative",
        height: 225,
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
              width: 60, height: 60, borderRadius: 16,
              background: `${p.color}1C`,
              border: `1px solid ${p.color}2E`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 26,
            }}>
              {p.emoji}
            </div>
            {p.comingSoon && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
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
                transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                willChange: "transform",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${p.color}10 0%, transparent 50%)`,
              pointerEvents: "none", zIndex: 1,
            }} />
          </>
        )}

        <div className="product-img-vignette" />

        {/* Expand hint on hover */}
        <motion.div
          initial={false}
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.88 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "absolute",
            top: 12, right: 12,
            zIndex: 4,
            padding: "5px 10px",
            borderRadius: 6,
            background: "rgba(0,0,0,0.62)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8, letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}>
            View details
          </span>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 8 L8 1 M3.5 1 H8 V5.5"/>
          </svg>
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{
        padding: "20px 22px 24px",
        flex: 1, display: "flex",
        flexDirection: "column", gap: 11,
      }}>
        {/* Tag + index */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
            margin: "0 0 3px",
            fontFamily: "var(--font-hero)",
            fontSize: "clamp(19px, 1.9vw, 23px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "var(--text-primary)", lineHeight: 1.15,
          }}>
            {p.name}
          </h3>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: 12.5, fontWeight: 400,
            color: "var(--text-tertiary)",
            letterSpacing: "-0.01em", margin: 0,
          }}>
            {p.tagline}
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 12.5, lineHeight: 1.72,
          color: "var(--text-secondary)",
          fontWeight: 300, margin: 0, flex: 1,
        }}>
          {p.description}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border-faint)" }} />

        {/* Stat + click prompt */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12,
        }}>
          <div style={{ borderLeft: `2px solid ${p.color}`, paddingLeft: 10 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(17px, 1.9vw, 21px)",
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

          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9, letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hov ? p.color : "var(--text-ghost)",
            transition: "color 0.2s ease",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            Details
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
              stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 8 L8 1 M3.5 1 H8 V5.5"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════════════ */
export default function ProductShowcase() {
  const [selected, setSelected] = useState<Product | null>(null);

  const handleSelect = useCallback((p: Product) => setSelected(p), []);
  const handleClose  = useCallback(() => setSelected(null), []);

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
          initial={{ opacity: 0, y: 20 }}
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
              margin: "0 0 16px",
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
            fontSize: 14, color: "var(--text-tertiary)",
            maxWidth: 240, lineHeight: 1.65, fontWeight: 300,
          }}>
            Click any product to explore it in detail.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {selected && (
          <ExpandedModal product={selected} onClose={handleClose} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1080px) { .product-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px)  { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
