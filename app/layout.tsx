import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Apex Ventures — Building Products That Matter",
  description: "Apex Ventures is an independent product studio. We build AI-powered tools that solve real problems.",
  openGraph: {
    title: "Apex Ventures",
    description: "AI products built to solve real problems.",
    type: "website",
  },
};

// Runs synchronously before first paint — sets theme, nothing else
const themeScript = `(function(){try{var t=localStorage.getItem('apex-theme')||(window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="noise" suppressHydrationWarning>
        {/*
          This div is rendered by the SERVER — it appears on the very first HTML byte,
          before any JS loads. PageWrapper removes it the instant React mounts,
          at which point the JS loader is already painted. Zero gap.
        */}
        <div
          id="__apex_preload"
          style={{
            position: "fixed", inset: "0", zIndex: 99998,
            background: "#0A0A09", pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
