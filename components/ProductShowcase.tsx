"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: "tripwise",
    index: "01",
    name: "TripWise AI",
    tagline: "Travel planning, reimagined.",
    description:
      "From \"I want to go somewhere\" to a complete day-by-day itinerary in under two minutes. Flights, hotels, visa requirements, budgets, packing lists — one platform, zero tab-switching.",
    href: "https://tripwiseai.vercel.app/",
    color: "#4A90E2",
    colorLabel: "accent-blue",
    tag: "Travel",
    features: [
      "AI-generated day-by-day itineraries",
      "Flight & hotel recommendations",
      "Visa guidance & requirements",
      "Budget estimation & breakdown",
      "Smart packing list builder",
      "Local transit planning",
      "Destination insights & alerts",
      "Group trip co-planning",
    ],
    stat: { value: "< 2 min", label: "To full itinerary" },
    imagePath: "/tripwise/hero.png",
  },
  {
    id: "folioai",
    index: "02",
    name: "FolioAI",
    tagline: "Your portfolio in seconds.",
    description:
      "Paste your resume. Get a live, beautiful portfolio site. Built for students, developers, and professionals who want to look great online without spending hours on design.",
    href: "https://tryfolioai.vercel.app/",
    color: "#9B6FE8",
    colorLabel: "accent-violet",
    tag: "Developer Tools",
    features: [
      "Resume-to-portfolio in one step",
      "Professional design templates",
      "Showcases projects & work history",
      "Clean skill organization",
      "Personal branding controls",
      "Instant live deployment",
    ],
    stat: { value: "60s", label: "From resume to live site" },
    imagePath: "/folioai/hero.png",
  },
  {
    id: "evmate",
    index: "03",
    name: "EVMate",
    tagline: "EV ownership, made easy.",
    description:
      "Stop worrying about range. EVMate finds nearby chargers, plans routes around your battery, and makes long-distance EV trips as simple as any other drive.",
    href: "https://evmate-8ce3d.web.app/",
    color: "#3ECF8E",
    colorLabel: "accent-emerald",
    tag: "Mobility",
    features: [
      "Real-time nearby charger discovery",
      "Range-aware route optimization",
      "Battery monitoring & alerts",
      "Charging stop recommendations",
      "Long-distance trip planning",
      "Multi-stop journey support",
    ],
    stat: { value: "0", label: "Range anxiety" },
    imagePath: "/evmate/hero.png",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <section id="products" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>

      {/* Section header */}
      <div
        style={{
          padding: "80px clamp(24px, 6vw, 80px) 40px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              marginBottom: 12,
            }}
          >
            What we've built
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            Three products.
            <br />
            <span style={{ color: "var(--text-tertiary)" }}>
              Three real problems solved.
            </span>
          </h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--text-tertiary)",
            maxWidth: 280,
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          No niche, no category. We find friction and remove it.
        </p>
      </div>

      {/* Product selector tabs */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          gap: 0,
        }}
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            style={{
              background: "none",
              border: "none",
              borderBottom: active === i ? `2px solid ${p.color}` : "2px solid transparent",
              padding: "16px 28px 14px",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.2s",
              marginBottom: -1,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: active === i ? p.color : "rgba(248,248,245,0.2)",
                transition: "color 0.2s",
              }}
            >
              {p.index}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: active === i ? "#F8F8F5" : "rgba(248,248,245,0.3)",
                transition: "color 0.2s",
              }}
            >
              {p.name}
            </span>
          </button>
        ))}
      </div>

      {/* Active product panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 1200, margin: "0 auto", padding: "60px clamp(24px, 6vw, 80px) 80px" }}
        >
          {/* Top row: name + tag + link */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: product.color,
                  }}
                >
                  {product.tag}
                </span>
                <span
                  style={{
                    width: 1,
                    height: 10,
                    background: "rgba(248,248,245,0.12)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Product {product.index}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "var(--text-primary)",
                  lineHeight: 1.0,
                  marginBottom: 8,
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  fontWeight: 400,
                  color: "var(--text-tertiary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {product.tagline}
              </p>
            </div>

            <Link
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--text-primary)",
                color: "#000",
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                padding: "10px 20px",
                borderRadius: 6,
                textDecoration: "none",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#E8E8E4";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F8F8F5";
              }}
            >
              Open {product.name}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Main grid: description + stat | features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              marginBottom: 56,
            }}
            className="product-grid"
          >
            {/* Left: description + stat */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                  fontWeight: 300,
                  marginBottom: 40,
                }}
              >
                {product.description}
              </p>

              {/* Stat callout */}
              <div
                style={{
                  borderLeft: `2px solid ${product.color}`,
                  paddingLeft: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 44,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: product.color,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {product.stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {product.stat.label}
                </div>
              </div>
            </div>

            {/* Right: features grid */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  marginBottom: 20,
                }}
              >
                Features
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px 16px",
                }}
              >
                {product.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: product.color,
                        marginTop: 6,
                        flexShrink: 0,
                        opacity: 0.7,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        fontWeight: 300,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshot placeholder — gracefully handles missing images */}
          <div
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid var(--border)",
              overflow: "hidden",
              aspectRatio: "16/6",
              background: `linear-gradient(135deg, rgba(${
                product.color === "#4A90E2"
                  ? "74,144,226"
                  : product.color === "#9B6FE8"
                  ? "155,111,232"
                  : "62,207,142"
              }, 0.05) 0%, transparent 60%), #0A0A0A`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Grid lines inside the mock-browser */}
            <div className="grid-overlay absolute inset-0 opacity-40" />
            <div style={{ textAlign: "center", position: "relative" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: product.color,
                  opacity: 0.15,
                  margin: "0 auto 12px",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-ghost)",
                }}
              >
                {product.name} — Screenshot Preview
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--text-ghost)",
                  marginTop: 4,
                }}
              >
                Add /public/{product.id}/hero.png to display
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
