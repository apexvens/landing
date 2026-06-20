"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id:"tripwise", index:"01", name:"TripWise AI", tagline:"Travel planning, reimagined.",
    description:"From 'I want to go somewhere' to a complete day-by-day itinerary in under two minutes. Flights, hotels, visa requirements, budgets — one platform, zero tab-switching.",
    href:"https://tripwiseai.vercel.app/",
    color:"#4A90E2", tag:"Travel & AI",
    stat:{ value:"< 2 min", label:"To full itinerary" },
    imagePath:"/tripwise/hero.png",
    features:["AI day-by-day itineraries","Flight & hotel recs","Visa guidance","Budget breakdown","Smart packing list","Group co-planning"],
    comingSoon: false,
  },
  {
    id:"nutrisense", index:"02", name:"NutriSense", tagline:"Point. Scan. Understand what you eat.",
    description:"No manual logging, no guesswork. Point the camera at a plate and NutriSense breaks down calories, macros and quality — then layers personalized coaching on top so the data turns into better habits, not just numbers.",
    href:"https://mynutrisense.vercel.app/#/home",
    color:"#5DBB6A", tag:"Health & AI",
    stat:{ value:"0", label:"Manual logging" },
    imagePath:"/nutrisense/hero.png",
    features:["Instant food scanning","Calories & macro breakdown","Daily coaching","Health trend tracking","Personalized goals","Zero food diary"],
    comingSoon: false,
  },
  {
    id:"folioai", index:"03", name:"FolioAI", tagline:"Your portfolio in 60 seconds.",
    description:"Paste your resume. Get a live, beautiful portfolio site instantly. Built for developers and professionals who want to look great online without spending hours on design.",
    href:"https://tryfolioai.vercel.app/",
    color:"#9B6FE8", tag:"Developer Tools",
    stat:{ value:"60s", label:"Resume to live site" },
    imagePath:"/folioai/hero.png",
    features:["Resume-to-portfolio in 1 step","5 pro templates","Project showcase","Skill visualization","Personal branding","Instant deployment"],
    comingSoon: false,
  },
  {
    id:"evmate", index:"04", name:"EVMate", tagline:"EV ownership, made easy.",
    description:"Stop worrying about range. EVMate finds nearby chargers, plans routes around your battery, and makes long-distance EV trips as simple as any other drive.",
    href:"https://evmate-8ce3d.web.app/",
    color:"#3ECF8E", tag:"Mobility & EV",
    stat:{ value:"0", label:"Range anxiety" },
    imagePath:"/evmate/hero.png",
    features:["Real-time charger map","Range-aware routing","Battery alerts","Multi-stop trips","Charging recommendations","Long-distance planning"],
    comingSoon: false,
  },
  {
    id:"unipilot", index:"05", name:"UniPilot", tagline:"Your AI admissions strategist.",
    description:"The goal isn't to find colleges — search engines already do that. UniPilot reads your academic profile, extracurriculars and timeline, then builds a realistic, time-aware roadmap instead of a generic list of dream schools.",
    href:"",
    color:"#F5A623", tag:"EdTech & AI",
    stat:{ value:"Reach", label:"Target · Safety tiers" },
    imagePath:"/unipilot/hero.png",
    features:["Realistic odds scoring","Time-aware roadmap","Reach/Target/Safety tiers","Application strategy","Progress tracking","AI strategist chat"],
    comingSoon: true,
  },
];

/* ── 3-D tilt card ──────────────────────────────────────────── */
function ProductCard({ p, i }: { p: typeof products[0]; i: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  { stiffness:200, damping:28 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness:200, damping:28 });
  const glareX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); setHov(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      initial={{ opacity:0, y:50 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.8, delay:i * 0.12, ease:[0.22,1,0.36,1] }}
      style={{
        rotateX:rotX, rotateY:rotY,
        transformStyle:"preserve-3d",
        borderRadius:20,
        background:"var(--bg-card)",
        backdropFilter:"blur(16px)",
        WebkitBackdropFilter:"blur(16px)",
        border:`1px solid ${hov ? p.color + "55" : "var(--border)"}`,
        overflow:"hidden",
        position:"relative",
        display:"flex", flexDirection:"column",
        transition:"border-color 0.35s ease",
        willChange:"transform",
      }}
    >
      {/* Glare */}
      <motion.div
        style={{
          position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
          borderRadius:20,
          background:useTransform([glareX, glareY], ([x,y]: string[]) =>
            `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.07) 0%, transparent 55%)`
          ),
          opacity: hov ? 1 : 0,
          transition:"opacity 0.3s ease",
        }}
      />

      {/* Top accent line — animated gradient */}
      <div style={{
        height:2, width:"100%", flexShrink:0,
        background:`linear-gradient(to right, transparent 0%, ${p.color} 50%, transparent 100%)`,
        opacity: hov ? 0.9 : 0.4,
        transition:"opacity 0.3s ease",
      }} />

      {/* Screenshot */}
      <div style={{
        overflow:"hidden", position:"relative",
        height:220, flexShrink:0, background:"var(--bg-raised)",
      }}>
        {p.comingSoon ? (
          /* Coming Soon placeholder */
          <div style={{
            width:"100%", height:"100%", display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:12,
            background:`linear-gradient(135deg, ${p.color}12 0%, ${p.color}06 100%)`,
          }}>
            <div style={{
              width:56, height:56, borderRadius:14,
              background:`${p.color}20`, border:`1px solid ${p.color}30`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:24,
            }}>🎓</div>
            <div style={{
              fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.2em",
              textTransform:"uppercase", color:p.color, opacity:0.7,
            }}>Coming Soon</div>
          </div>
        ) : (
          <img
            src={p.imagePath}
            alt={p.name}
            style={{
              width:"100%", height:"100%", objectFit:"cover", display:"block",
              transform: hov ? "scale(1.04)" : "scale(1)",
              transition:"transform 0.6s var(--ease-out-expo)",
              willChange:"transform",
            }}
          />
        )}
        {/* Vignette bottom */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:80,
          background:"linear-gradient(to top, var(--bg), transparent)",
          pointerEvents:"none",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding:"28px 28px 32px", flex:1, display:"flex", flexDirection:"column", gap:16 }}>
        {/* Tag + index */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{
            fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.18em",
            textTransform:"uppercase", color:p.color, opacity:0.8,
          }}>{p.tag}</span>
          <span style={{
            fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.12em",
            color:"var(--text-ghost)",
          }}>{p.index}</span>
        </div>

        {/* Name + tagline */}
        <div>
          <h3 style={{
            fontFamily:"var(--font-display)", fontSize:"clamp(22px,2.4vw,28px)",
            fontWeight:700, letterSpacing:"-0.03em",
            color:"var(--text-primary)", lineHeight:1.15, marginBottom:6,
          }}>{p.name}</h3>
          <p style={{
            fontFamily:"var(--font-display)", fontSize:14, fontWeight:400,
            color:"var(--text-tertiary)", letterSpacing:"-0.01em",
          }}>{p.tagline}</p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily:"var(--font-body)", fontSize:13, lineHeight:1.75,
          color:"var(--text-secondary)", fontWeight:300, flex:1,
        }}>{p.description}</p>

        {/* Features */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:4 }}>
          {p.features.slice(0,4).map(f => (
            <span key={f} style={{
              fontFamily:"var(--font-body)", fontSize:11, fontWeight:400,
              color:"var(--text-tertiary)", padding:"4px 10px", borderRadius:100,
              border:"1px solid var(--border-faint)",
              background:"var(--bg-card)",
              whiteSpace:"nowrap",
            }}>{f}</span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"var(--border-faint)", margin:"4px 0" }} />

        {/* Stat + CTA row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          {/* Stat */}
          <div style={{ borderLeft:`2px solid ${p.color}`, paddingLeft:12 }}>
            <div style={{
              fontFamily:"var(--font-display)", fontSize:"clamp(22px,2.5vw,28px)",
              fontWeight:700, letterSpacing:"-0.04em", color:p.color, lineHeight:1,
            }}>{p.stat.value}</div>
            <div style={{
              fontFamily:"var(--font-mono)", fontSize:8, letterSpacing:"0.12em",
              textTransform:"uppercase", color:"var(--text-ghost)", marginTop:3,
            }}>{p.stat.label}</div>
          </div>

          {/* CTA */}
          {p.comingSoon ? (
            <span style={{
              display:"inline-flex", alignItems:"center", gap:8,
              fontFamily:"var(--font-display)", fontSize:13, fontWeight:600,
              letterSpacing:"-0.01em", color:p.color,
              background:`${p.color}18`,
              padding:"10px 18px", borderRadius:8,
              border:`1px solid ${p.color}40`,
              flexShrink:0,
            }}>
              Coming Soon
            </span>
          ) : (
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:"var(--font-display)", fontSize:13, fontWeight:600,
                letterSpacing:"-0.01em", color:"#000",
                background:`${p.color}`,
                padding:"10px 18px", borderRadius:8,
                textDecoration:"none", flexShrink:0,
                transition:"opacity 0.2s ease, transform 0.25s var(--ease-out-expo)",
                willChange:"transform",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Open ↗
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
    <section id="products" style={{
      background:"var(--bg)",
      borderTop:"1px solid var(--border)",
      padding:"100px clamp(24px,6vw,80px) 100px",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.75, ease:[0.22,1,0.36,1] }}
          style={{ marginBottom:72, display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}
        >
          <div>
            <p className="label" style={{ marginBottom:14 }}>What we've built</p>
            <h2 className="section-heading">
              Five products.
              <br />
              <span style={{ color:"var(--text-tertiary)" }}>Five real problems solved.</span>
            </h2>
          </div>
          <p style={{
            fontFamily:"var(--font-body)", fontSize:14, color:"var(--text-tertiary)",
            maxWidth:260, lineHeight:1.65, fontWeight:300,
          }}>
            No niche, no category. We find friction and remove it.
          </p>
        </motion.div>

        {/* Card grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3, 1fr)",
          gap:24,
          perspective:1200,
        }} className="product-grid-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .product-grid-5 { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 580px) { .product-grid-5 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
