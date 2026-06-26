"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  { name:"TripWise AI", href:"https://tripwiseai.vercel.app/" },
  { name:"NutriSense",  href:"https://mynutrisense.vercel.app/#/home" },
  { name:"FolioAI",     href:"https://tryfolioai.vercel.app/" },
  { name:"EVMate",      href:"https://evmate-8ce3d.web.app/" },
  { name:"UniPilot",    href:"" },
  { name:"InboxOS",     href:"" },
];
const social = [
  { name:"GitHub",   href:"https://github.com/neil-surjiani" },
  { name:"LinkedIn", href:"https://www.linkedin.com/in/neil-surjiani" },
  { name:"YouTube",  href:"https://youtube.com/@NeilSurjiani" },
];

export default function FooterSection() {
  const PAD = "clamp(24px,6vw,80px)";
  return (
    <footer style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", padding:`80px ${PAD} 48px` }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{
          display:"grid", gridTemplateColumns:"2fr 1fr 1fr",
          gap:60, paddingBottom:64,
          borderBottom:"1px solid var(--border)", marginBottom:40,
        }} className="footer-grid">

          {/* CTA */}
          <div>
            <motion.h2
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{
                fontFamily:"var(--font-hero)",
                fontSize:"clamp(28px,4.5vw,52px)",
                fontWeight:700, letterSpacing:"-0.04em",
                color:"var(--text-primary)", lineHeight:1.05, marginBottom:28,
              }}
            >
              Building products
              <br />
              <span style={{ color:"var(--text-ghost)" }}>that matter.</span>
            </motion.h2>
            <p style={{
                fontFamily:"var(--font-body)", fontSize:14, fontWeight:300,
                color:"var(--text-tertiary)", lineHeight:1.65, margin:0, maxWidth:320,
              }}>
                An independent studio out of Pune, India.
                Building AI products that actually make a dent.
              </p>
          </div>

          {/* Products */}
          <div>
            <p className="label" style={{ marginBottom:20 }}>Products</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {products.map((p,i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity:0, x:-8 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.5, delay:i*0.07 }}
                >
                  <Link href={p.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily:"var(--font-body)", fontSize:13,
                      color:"var(--text-tertiary)", textDecoration:"none", fontWeight:300,
                      transition:"color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}
                  >{p.name}</Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="label" style={{ marginBottom:20 }}>Follow</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {social.map((s,i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity:0, x:-8 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.5, delay:i*0.07 }}
                >
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily:"var(--font-body)", fontSize:13,
                      color:"var(--text-tertiary)", textDecoration:"none", fontWeight:300,
                      transition:"color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}
                  >{s.name} ↗</a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <span className="label">Apex Ventures Studio</span>
          <span className="label">© 2026 — All Rights Reserved</span>
        </div>
      </div>

      <style>{`
        @media (max-width:680px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1/-1; }
        }
      `}</style>
    </footer>
  );
}
