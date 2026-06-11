"use client";

import Link from "next/link";

const products = [
  { name: "TripWise AI", href: "https://tripwiseai.vercel.app/" },
  { name: "FolioAI", href: "https://tryfolioai.vercel.app/" },
  { name: "EVMate", href: "https://evmate-8ce3d.web.app/" },
];

const social = [
  { name: "GitHub", href: "https://github.com/neil-surjiani" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/neil-surjiani" },
  { name: "YouTube", href: "https://youtube.com/@NeilSurjiani" },
];

export default function FooterSection() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px clamp(24px, 6vw, 80px) 48px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top: big CTA + nav columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 60,
            paddingBottom: 60,
            borderBottom: "1px solid var(--border)",
            marginBottom: 40,
          }}
          className="footer-grid"
        >
          {/* Left: CTA */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Building products
              <br />
              <span style={{ color: "var(--text-tertiary)" }}>
                that matter.
              </span>
            </h2>
            <a
              href="mailto:hello@apexventures.studio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,248,245,0.12)",
                paddingBottom: 4,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#F8F8F5";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(248,248,245,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(248,248,245,0.4)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(248,248,245,0.12)";
              }}
            >
              hello@apexventures.studio ↗
            </a>
          </div>

          {/* Products col */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-ghost)",
                marginBottom: 20,
              }}
            >
              Products
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {products.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-tertiary)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F8F8F5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(248,248,245,0.3)")
                  }
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social col */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-ghost)",
                marginBottom: 20,
              }}
            >
              Follow
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-tertiary)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F8F8F5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(248,248,245,0.3)")
                  }
                >
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-ghost)",
            }}
          >
            Apex Ventures Studio
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-ghost)",
            }}
          >
            © 2026 — All Rights Reserved
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  );
}
