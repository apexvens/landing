import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
