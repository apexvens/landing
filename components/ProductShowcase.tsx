"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS DATA
═══════════════════════════════════════════════════════════════ */
export interface Product {
  id:              string;
  index:           string;
  name:            string;
  tagline:         string;
  description:     string;
  longDescription: string;
  href:            string;
  color:           string;
  tag:             string;
  category:        "shipped" | "building" | "discontinued";
  stat:            { value: string; label: string };
  imagePath:       string;
  comingSoon?:     boolean;
  discontinued?:   boolean;
  statusBadge?:    string;
  emoji:           string;
  features:        string[];
}

const products: Product[] = [
  {
    id:          "tripwise",
    index:       "01",
    name:        "TripWise AI",
    tagline:     "Travel planning, reimagined.",
    description: "From 'I want to go somewhere' to a complete day-by-day itinerary in under two minutes — flights, hotels, visa info, and budget all in one place.",
    longDescription: "TripWise AI turns the overwhelming process of trip planning into a two-minute conversation. Tell it where you want to go, your travel dates, budget, and preferences — and it generates a complete day-by-day itinerary covering flights, hotels, local attractions, restaurant picks, visa requirements, and detailed cost breakdowns. Built for solo travellers, couples, and groups who want the expertise of a personal travel agent without the cost or waiting.",
    href:        "https://tripwiseai.vercel.app/",
    color:       "#4A90E2",
    tag:         "Travel · AI",
    category:    "shipped",
    stat:        { value: "< 2 min", label: "Full itinerary" },
    imagePath:   "/tripwise/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "✈️",
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
    id:          "nutrisense",
    index:       "02",
    name:        "NutriSense",
    tagline:     "Point. Scan. Know what you eat.",
    description: "No logging, no guesswork. Point your camera at any meal — get instant calories, macros, and personalised coaching that actually changes behaviour.",
    longDescription: "NutriSense eliminates every barrier between eating and understanding what you eat. Point your camera at any meal and get an instant breakdown of calories, macros, vitamins, and nutritional quality — no logging, no barcode scanning, no manual entry. The AI layers personalised coaching on top of the data, identifying patterns in your eating habits and suggesting incremental improvements that fit your lifestyle and goals, not a rigid diet plan.",
    href:        "https://mynutrisense.vercel.app/#/home",
    color:       "#5DBB6A",
    tag:         "Health · AI",
    category:    "shipped",
    stat:        { value: "0", label: "Manual logging required" },
    imagePath:   "/nutrisense/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "🥗",
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
    id:          "folioai",
    index:       "03",
    name:        "FolioAI",
    tagline:     "Your portfolio in 60 seconds.",
    description: "Paste a resume. Get a live, beautiful portfolio site instantly — for developers and creators who want to look great online without the design work.",
    longDescription: "FolioAI lets developers and creatives skip the portfolio-building grind entirely. Upload your resume or paste your GitHub profile — FolioAI extracts your projects, skills, and experience, then instantly generates a live, beautifully designed portfolio website in your choice of five professional templates. The result deploys immediately to a shareable link. No coding, no design tools, no configuration, no waiting.",
    href:        "https://tryfolioai.vercel.app/",
    color:       "#9B6FE8",
    tag:         "Dev Tools · AI",
    category:    "shipped",
    stat:        { value: "60 s", label: "Resume → live site" },
    imagePath:   "/folioai/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "💼",
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
    id:          "inboxos",
    index:       "04",
    name:        "InboxOS",
    tagline:     "Your inbox, finally intelligent.",
    description: "InboxOS takes over any email inbox and surfaces what actually matters — deadlines, opportunities, follow-ups — so you never miss what's important.",
    longDescription: "InboxOS connects to any email inbox and uses AI to read, categorise, and prioritise every message automatically. It surfaces emails containing deadlines, meeting requests, partnership opportunities, follow-ups, and critical alerts — presenting them in a clean priority feed instead of a chronological flood. InboxOS learns your patterns over time, getting smarter about what deserves your attention right now and what can safely wait.",
    href:        "https://inboxosai.vercel.app",
    color:       "#6366F1",
    tag:         "Productivity · AI",
    category:    "shipped",
    stat:        { value: "∞→0", label: "Inbox overload" },
    imagePath:   "/inboxos/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "📬",
    features: [
      "Multi-inbox support",
      "Deadline detection",
      "Opportunity surfacing",
      "Smart categorisation",
      "Priority feed view",
      "Pattern learning AI",
    ],
  },
  {
    id:          "airfitness",
    index:       "05",
    name:        "AirFitness",
    tagline:     "Train smarter with AI.",
    description: "A browser-based AI fitness trainer. Your webcam plus on-device pose estimation counts reps, scores form, and coaches you in real time — nothing ever leaves your device.",
    longDescription: "AirFitness turns any webcam into a personal trainer. On-device pose estimation tracks 33 body landmarks at up to 60 frames per second, computing joint angles to automatically count reps, score form, and deliver live coaching cues like \"Go Lower\" or \"Straighten Back\" the instant your form drifts. The entire pipeline — detection, angle math, rep counting — runs locally in the browser, with nine tracked exercises spanning strength, core, and cardio, and zero data ever recorded, uploaded, or stored.",
    href:        "https://airfittness.vercel.app/",
    color:       "#EF4444",
    tag:         "Fitness · AI",
    category:    "shipped",
    stat:        { value: "9", label: "Tracked exercises" },
    imagePath:   "/airfitness/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "🏋️",
    features: [
      "Real-time 33-point pose tracking",
      "Automatic rep counting",
      "Live form-correction cues",
      "Runs 100% on-device",
      "Nine tracked exercises",
      "Zero data collection",
    ],
  },
  {
    id:          "airwheel",
    index:       "06",
    name:        "AirWheel",
    tagline:     "Turn your webcam into a sim racing wheel.",
    description: "Play Assetto Corsa and PC racing sims without expensive hardware. 100% webcam-based hand tracking maps wrist angles and gestures into a virtual Xbox 360 controller.",
    longDescription: "AirWheel brings sim racing to everyone without requiring a $300+ force-feedback steering wheel. Using OpenCV and Google MediaPipe hand tracking, it tracks 21 skeletal landmarks on each hand in 3D space, computing steering angles between your wrists and measuring forward depth for throttle control. A closed fist initiates gear shifts or braking. The output maps directly to a virtual Xbox 360 controller via ViGEmBus, letting you drive in Assetto Corsa and other racing sims using zero extra hardware.",
    href:        "https://github.com/neil-surjiani/AirWheel",
    color:       "#FF6B4A",
    tag:         "Gaming · Computer Vision",
    category:    "shipped",
    stat:        { value: "60 FPS", label: "Webcam sim racing" },
    imagePath:   "/airwheel/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Open Source",
    emoji:       "🏎️",
    features: [
      "3D optical hand landmark tracking",
      "Virtual steering wheel angle calculation",
      "Gesture-based upshift, downshift & brake",
      "ViGEmBus virtual Xbox 360 controller emulation",
      "Guided onboarding & calibration wizard",
      "Assetto Corsa & PC sim racing ready",
    ],
  },
  {
    id:          "zeroscroll",
    index:       "07",
    name:        "ZeroScroll",
    tagline:     "DMs without the doomscroll.",
    description: "An intentional Android app and website showing ONLY your Instagram Direct Messages and notifications — zero feeds, zero reels tab, zero search explore, zero stories.",
    longDescription: "ZeroScroll is built for people who rely on Instagram to stay connected with friends and clients, but refuse to lose hours to algorithmic addiction. Built with Flutter, Drift (SQLite), and Next.js, it provides a clean, guarded container that displays only your DMs and notifications. Algorithmic discovery, search explore, reels feed, and stories are completely blocked. Single reels sent in DMs play once with zero infinite swipe-up continuous scrolling, supported by a daily reel budget and local SQLite storage.",
    href:        "https://github.com/neil-surjiani/zeroscroll",
    color:       "#0D9488",
    tag:         "Digital Wellbeing · Mobile",
    category:    "shipped",
    stat:        { value: "0", label: "Algorithmic feeds" },
    imagePath:   "/zeroscroll/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Available",
    emoji:       "📵",
    features: [
      "DMs & notifications only",
      "Blocks feed, reels tab & explore",
      "Single-play DM reels (no continuous swipe)",
      "Daily intentional reel budget",
      "Local-only encrypted SQLite storage",
      "Zero tracking, analytics, or external servers",
    ],
  },
  {
    id:          "fathomai",
    index:       "08",
    name:        "Fathom AI",
    tagline:     "Learn anything. Properly.",
    description: "A personal AI learning strategist and curriculum designer. Tell it what you want to learn — it builds the path, curates verified resources, and adapts as you learn.",
    longDescription: "Fathom AI eliminates the friction, rabbit holes, and tutorial fatigue of self-directed learning. Tell Fathom what you want to learn, your available timeframe, and your current level — it builds a sequenced modular roadmap, curates and scores verified learning resources, breaks concepts into daily practice sessions, and pairs you with a context-aware AI tutor to test your retention and accelerate true mastery.",
    href:        "https://fathomai.lovable.app/",
    color:       "#575ECF",
    tag:         "Learning · AI",
    category:    "shipped",
    stat:        { value: "10x", label: "Faster to mastery" },
    imagePath:   "/fathomai/hero.png",
    comingSoon:  false,
    discontinued: false,
    statusBadge: "Live",
    emoji:       "🧠",
    features: [
      "AI curriculum & modular roadmap architect",
      "Curated, verified & ranked learning resources",
      "Focused daily bite-sized learning sessions",
      "Context-aware AI tutor with retention checks",
      "Sequenced milestones from basics to mastery",
      "Real knowledge retention & progress tracking",
    ],
  },
  {
    id:          "drape",
    index:       "09",
    name:        "Drape",
    tagline:     "Virtual avatar try-on & digital wardrobe.",
    description: "Try clothes on your personal 3D avatar before you buy them online. Store your wardrobe inside the app and choose the perfect fit within the app itself.",
    longDescription: "Drape solves the biggest problem in online apparel shopping: not knowing how clothes will actually look or fit on your body. Upload your measurements to generate a high-fidelity personal 3D avatar that matches your exact proportions. Drape simulates fabric drape, tension, and fit in real time so you can preview garments before purchasing. Your entire physical wardrobe is stored inside the app, letting you test how new items coordinate with your existing clothes before spending a single dollar.",
    href:        "",
    color:       "#EC4899",
    tag:         "FashionTech · 3D AI",
    category:    "building",
    stat:        { value: "Soon", label: "In active development" },
    imagePath:   "/drape/hero.png",
    comingSoon:  true,
    discontinued: false,
    statusBadge: "Building",
    emoji:       "👗",
    features: [
      "Personalized 3D body avatar generation",
      "Physics-based virtual fabric try-on",
      "Digital wardrobe catalog & outfit builder",
      "Precision fit & tension prediction",
      "Pre-purchase wardrobe pairing simulation",
      "Direct online checkout integration",
    ],
  },
  {
    id:          "evmate",
    index:       "10",
    name:        "EVMate",
    tagline:     "EV ownership, simplified.",
    description: "Real-time charger maps, range-aware routing, and charging station finder. Discontinued because the standalone app idea was not commercially viable against native OS maps.",
    longDescription: "EVMate aimed to eliminate range anxiety by aggregating real-time charger availability, model-specific compatibility, and battery-aware route planning for electric vehicle drivers. After developing the core routing engine and charger map, we discontinued the product: standalone navigation apps face massive platform lock-in against built-in automotive OS and Google Maps, and the fundamental idea did not represent a viable independent product.",
    href:        "https://evmate-8ce3d.web.app/",
    color:       "#71717A",
    tag:         "Mobility · Discontinued",
    category:    "discontinued",
    stat:        { value: "Archived", label: "Idea discontinued" },
    imagePath:   "/evmate/hero.png",
    comingSoon:  false,
    discontinued: true,
    statusBadge: "Discontinued",
    emoji:       "⚡",
    features: [
      "Real-time charger availability map",
      "Model-specific connector compatibility",
      "Range-aware multi-stop route planner",
      "Battery arrival percentage calculation",
      "Discontinued: Idea lacked standalone defensibility",
      "Lessons applied directly to subsequent builds",
    ],
  },
  {
    id:          "crescendo",
    index:       "11",
    name:        "Crescendo",
    tagline:     "AI vocal and music practice.",
    description: "Interactive pitch tracking, voice lessons, and real-time audio feedback. Discontinued as user retention and self-directed practice friction made the standalone model unviable.",
    longDescription: "Crescendo was built as an intelligent vocal and music tutor combining Flutter, FastAPI, and Gemini AI for live audio pitch curve analysis and personalized lesson pacing. While the technical feedback loop worked smoothly, user retention and self-directed music practice posed fundamental friction that made the standalone consumer model unsuitable. We made the disciplined decision to discontinue development and carry the real-time audio pipeline learnings forward.",
    href:        "https://github.com/crescendo01",
    color:       "#8E8E93",
    tag:         "MusicTech · Discontinued",
    category:    "discontinued",
    stat:        { value: "Archived", label: "Idea discontinued" },
    imagePath:   "/crescendo/hero.png",
    comingSoon:  false,
    discontinued: true,
    statusBadge: "Discontinued",
    emoji:       "🎵",
    features: [
      "Real-time pitch curve visualization",
      "AI-powered vocal coaching & feedback",
      "FastAPI audio processing backend",
      "Structured lesson progressions",
      "Discontinued: Consumer retention model not viable",
      "Fast pivot to high-frequency utility products",
    ],
  },
  {
    id:          "unipilot",
    index:       "12",
    name:        "UniPilot",
    tagline:     "Your AI admissions strategist.",
    description: "Profile gap analysis and time-aware admissions roadmap. Discontinued due to extreme seasonal demand cycles and high advisory expectations that clashed with software scale.",
    longDescription: "UniPilot was designed to provide high school students with honest admissions odds and an evolving profile roadmap instead of generic dream-school lists. Despite strong initial interest, college admissions software suffers from extreme annual seasonality, rapid institutional policy shifts, and a strong user demand for human handholding that conflicted with an automated, scalable product model. We discontinued the project to focus entirely on high-frequency, year-round utility tools.",
    href:        "",
    color:       "#78716C",
    tag:         "EdTech · Discontinued",
    category:    "discontinued",
    stat:        { value: "Archived", label: "Idea discontinued" },
    imagePath:   "/unipilot/hero.png",
    comingSoon:  false,
    discontinued: true,
    statusBadge: "Discontinued",
    emoji:       "🎓",
    features: [
      "Realistic admission probability scoring",
      "Reach / Target / Safety school tiers",
      "Extracurricular profile gap analysis",
      "Dynamic multi-year timeline planner",
      "Discontinued: Extreme seasonality & advisory conflict",
      "Sharpened studio focus on daily-use tools",
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
  const [mounted, setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Lock body scroll cleanly without resetting scroll position */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  /* Escape key to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const showPlaceholder = imgFailed;

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="product-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="product-modal-panel"
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          borderColor: p.discontinued ? "rgba(255,255,255,0.12)" : `${p.color}45`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 48px ${p.color}15`,
        }}
      >
        {/* Accent top line */}
        <div
          className="product-modal-accent"
          style={{
            background: p.discontinued
              ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
              : `linear-gradient(90deg, transparent 0%, ${p.color} 50%, transparent 100%)`,
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="product-modal-close"
        >
          ×
        </button>

        <div className="product-modal-body">
          {/* Image */}
          <div className="product-modal-image">
            {showPlaceholder ? (
              <div
                className="product-modal-placeholder"
                style={{ background: `linear-gradient(145deg, ${p.color}18 0%, ${p.color}05 100%)` }}
              >
                <div
                  className="product-modal-placeholder-icon"
                  style={{ background: `${p.color}20`, borderColor: `${p.color}35` }}
                >
                  {p.emoji}
                </div>
                {p.comingSoon && (
                  <span className="product-modal-soon" style={{ color: p.color }}>
                    In Development
                  </span>
                )}
                {p.discontinued && (
                  <span className="product-modal-soon" style={{ color: "var(--text-tertiary)" }}>
                    Discontinued
                  </span>
                )}
              </div>
            ) : (
              <>
                <img
                  src={p.imagePath}
                  alt={p.name}
                  decoding="async"
                  onError={() => setImgFailed(true)}
                />
                <div
                  className="product-modal-image-tint"
                  style={{
                    background: p.discontinued
                      ? "linear-gradient(140deg, rgba(0,0,0,0.5) 0%, transparent 60%)"
                      : `linear-gradient(140deg, ${p.color}18 0%, transparent 55%)`,
                  }}
                />
                <div className="product-img-vignette" />
              </>
            )}
          </div>

          {/* Details column (scrollable) */}
          <div className="product-modal-details product-modal-scroll">
            <div className="product-modal-meta">
              <span
                className="product-modal-tag"
                style={{ color: p.discontinued ? "var(--text-tertiary)" : p.color }}
              >
                {p.tag}
              </span>
              <span className="product-modal-index">{p.index} / {products.length}</span>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h2 className="product-modal-title">{p.name}</h2>
                {p.discontinued && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    Discontinued
                  </span>
                )}
                {p.comingSoon && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: `${p.color}15`,
                      color: p.color,
                      border: `1px solid ${p.color}35`,
                    }}
                  >
                    In Development
                  </span>
                )}
              </div>
              <p className="product-modal-tagline">{p.tagline}</p>
            </div>

            {p.discontinued && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 13, lineHeight: 1.2 }}>ℹ️</span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  <strong style={{ color: "var(--text-primary)" }}>Status: Discontinued.</strong> This product was discontinued because the underlying idea itself was not viable as a sustainable venture. We believe in shipping honestly, cutting non-viable paths quickly, and documenting the learnings.
                </p>
              </div>
            )}

            <div className="product-modal-divider" />

            <p className="product-modal-desc">{p.longDescription}</p>

            <div>
              <p className="product-modal-features-label">Key Highlights & Architecture</p>
              <div className="product-modal-features">
                {p.features.map(f => (
                  <div key={f} className="product-modal-feature">
                    <span
                      className="product-modal-feature-dot"
                      style={{ background: p.discontinued ? "var(--text-tertiary)" : p.color }}
                    />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-modal-divider" />

            <div className="product-modal-footer">
              <div
                className="product-modal-stat"
                style={{ borderLeftColor: p.discontinued ? "var(--text-ghost)" : p.color }}
              >
                <div
                  className="product-modal-stat-value"
                  style={{ color: p.discontinued ? "var(--text-secondary)" : p.color }}
                >
                  {p.stat.value}
                </div>
                <div className="product-modal-stat-label">{p.stat.label}</div>
              </div>

              {p.discontinued ? (
                p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-modal-cta"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "var(--text-primary)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    View Archive / Code
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 11 L11 1 M4.5 1 H11 V7.5"/>
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="product-modal-badge"
                    style={{
                      color: "var(--text-tertiary)",
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    Project Discontinued
                  </span>
                )
              ) : p.comingSoon ? (
                p.href ? (
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-modal-cta"
                    style={{ background: p.color, color: "#000" }}
                  >
                    Preview App
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 11 L11 1 M4.5 1 H11 V7.5"/>
                    </svg>
                  </Link>
                ) : (
                  <span
                    className="product-modal-badge"
                    style={{
                      color: p.color,
                      borderColor: `${p.color}35`,
                      background: `${p.color}0E`,
                    }}
                  >
                    In Active Development
                  </span>
                )
              ) : (
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-modal-cta"
                  style={{ background: p.color, color: "#000" }}
                >
                  Open App / Project
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
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT CARD  (click to expand)
═══════════════════════════════════════════════════════════════ */
function ProductCard({
  p, i, onSelect,
}: {
  p: Product;
  i: number;
  onSelect: (p: Product) => void;
}) {
  const [hov, setHov]             = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const showPlaceholder = imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(p)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="product-card-box"
      style={{
        borderRadius: 18,
        background: "var(--bg-raised)",
        border: `1px solid ${hov ? (p.discontinued ? "rgba(255,255,255,0.2)" : `${p.color}55`) : "var(--border)"}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
        transform: hov ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hov
          ? `var(--shadow-card-hover), 0 0 0 1px ${p.discontinued ? "rgba(255,255,255,0.1)" : `${p.color}25`}`
          : "var(--shadow-card)",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 2, flexShrink: 0,
        background: p.discontinued
          ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
          : `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
        opacity: hov ? 1 : (p.discontinued ? 0.3 : 0.5),
        transition: "opacity 0.25s ease",
      }} />

      {/* Screenshot / Media */}
      <div style={{
        position: "relative",
        height: 220,
        overflow: "hidden",
        background: "var(--bg-raised)",
        flexShrink: 0,
      }}>
        {showPlaceholder ? (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 12,
            background: `linear-gradient(145deg, ${p.color}14 0%, ${p.color}05 100%)`,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `${p.color}1C`,
              border: `1px solid ${p.color}2E`,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24,
            }}>
              {p.emoji}
            </div>
            {p.comingSoon && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: p.color, opacity: 0.8,
              }}>
                In Development
              </span>
            )}
            {p.discontinued && (
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--text-tertiary)",
              }}>
                Discontinued
              </span>
            )}
          </div>
        ) : (
          <>
            <img
              src={p.imagePath}
              alt={p.name}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                filter: p.discontinued ? "grayscale(40%) opacity(0.85)" : "none",
                transform: hov ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease",
                willChange: "transform",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: p.discontinued
                ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)"
                : `linear-gradient(135deg, ${p.color}12 0%, transparent 50%)`,
              pointerEvents: "none", zIndex: 1,
            }} />
          </>
        )}

        <div className="product-img-vignette" />

        {/* Status Pill Badge */}
        <div style={{
          position: "absolute",
          top: 12, left: 12,
          zIndex: 4,
          padding: "4px 8px",
          borderRadius: 6,
          background: p.discontinued
            ? "rgba(18, 18, 20, 0.85)"
            : p.comingSoon
            ? `${p.color}20`
            : "rgba(0,0,0,0.7)",
          border: `1px solid ${p.discontinued ? "rgba(255,255,255,0.15)" : p.comingSoon ? `${p.color}45` : "rgba(255,255,255,0.12)"}`,
          display: "flex", alignItems: "center", gap: 5,
          backdropFilter: "blur(6px)",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: p.discontinued ? "#A1A1AA" : p.comingSoon ? p.color : "#10B981",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8.5, letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: p.discontinued ? "rgba(255,255,255,0.7)" : p.comingSoon ? p.color : "rgba(255,255,255,0.9)",
          }}>
            {p.statusBadge ?? (p.discontinued ? "Discontinued" : p.comingSoon ? "In Dev" : "Live")}
          </span>
        </div>

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
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.14)",
            display: "flex", alignItems: "center", gap: 5,
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8, letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
          }}>
            Details
          </span>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
            stroke="rgba(255,255,255,0.8)" strokeWidth="1.6"
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
            color: p.discontinued ? "var(--text-tertiary)" : p.color,
            opacity: 0.9,
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
          <div style={{
            borderLeft: `2px solid ${p.discontinued ? "var(--text-ghost)" : p.color}`,
            paddingLeft: 10,
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: p.discontinued ? "var(--text-secondary)" : p.color,
              lineHeight: 1,
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
            color: hov ? (p.discontinued ? "var(--text-primary)" : p.color) : "var(--text-ghost)",
            transition: "color 0.2s ease",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            Explore
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
   PRODUCT SHOWCASE SECTION
═══════════════════════════════════════════════════════════════ */
export default function ProductShowcase() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "shipped" | "building" | "discontinued">("all");

  const handleSelect = useCallback((p: Product) => setSelected(p), []);
  const handleClose  = useCallback(() => setSelected(null), []);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter(p => p.category === activeTab);
  }, [activeTab]);

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
            marginBottom: 44,
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
              What we've built · Studio Portfolio
            </p>
            <h2 style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              lineHeight: 1.05, margin: 0,
              color: "var(--text-primary)",
            }}>
              12 products.{" "}
              <span style={{ color: "var(--text-tertiary)" }}>
                Built, shipped, and iterated.
              </span>
            </h2>
          </div>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 14, color: "var(--text-tertiary)",
            maxWidth: 280, lineHeight: 1.65, fontWeight: 300,
          }}>
            Every product starts with real friction. Click any card to inspect the full architecture, code, and learnings.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 40,
        }}>
          {[
            { id: "all",          label: `All (${products.length})` },
            { id: "shipped",      label: `Shipped (${products.filter(p => p.category === "shipped").length})` },
            { id: "building",     label: `In Development (${products.filter(p => p.category === "building").length})` },
            { id: "discontinued", label: `Discontinued (${products.filter(p => p.category === "discontinued").length})` },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  borderRadius: 100,
                  border: `1px solid ${isActive ? "var(--text-primary)" : "var(--border)"}`,
                  background: isActive ? "var(--text-primary)" : "var(--bg-raised)",
                  color: isActive ? "var(--bg)" : "var(--text-tertiary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {filteredProducts.map((p, i) => (
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
        @media (max-width: 640px)  { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
