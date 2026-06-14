import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Apex Ventures — Building Products That Matter",
  description:
    "Apex Ventures is an independent product studio. We build AI-powered tools that solve real problems — TripWise, FolioAI, EVMate.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Apex Ventures",
    description: "AI products built to solve real problems.",
    type: "website",
  },
};

// Blocks rendering until theme is known → zero flash
const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('apex-theme');
      var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', saved || system);
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="noise" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
