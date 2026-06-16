import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Apex Ventures — Building Products That Matter",
  description:
    "Apex Ventures is an independent product studio. We build AI-powered tools that solve real problems — TripWise, FolioAI, EVMate.",
  openGraph: {
    title: "Apex Ventures",
    description: "AI products built to solve real problems.",
    type: "website",
  },
};

// 1) Read saved theme before first paint — zero FOUC
// 2) Show a black blocking overlay immediately so there's no white flash before React hydrates
const headScript = `
(function() {
  try {
    var t = localStorage.getItem('apex-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}

  // Inject a CSS-only full-screen black cover that disappears once React takes over
  var style = document.createElement('style');
  style.id = '__apex_cover';
  style.textContent =
    '#apex-cover{position:fixed;inset:0;z-index:99998;background:#000;pointer-events:none;}';
  document.head.appendChild(style);

  var div = document.createElement('div');
  div.id = 'apex-cover';
  // Remove once DOM is interactive so React loader takes over seamlessly
  document.addEventListener('DOMContentLoaded', function() {
    // Small raf so React has painted its loader first
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        var el = document.getElementById('apex-cover');
        if (el) el.remove();
        var st = document.getElementById('__apex_cover');
        if (st) st.remove();
      });
    });
  });
  document.currentScript
    ? document.currentScript.parentNode.insertBefore(div, document.currentScript.nextSibling)
    : document.body && document.body.prepend(div);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="noise" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
