"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 bg-black px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* CTA block */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Building products that matter.
          </h2>
          <p className="text-zinc-500 text-sm">And we're just getting started.</p>
        </div>

        <Link
          href="mailto:hello@apexventures.studio"
          className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-zinc-100 transition-colors"
        >
          Connect With Us
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-700">
        <span>APEX VENTURES STUDIO</span>
        <span>©2026 APEX VENTURES. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
