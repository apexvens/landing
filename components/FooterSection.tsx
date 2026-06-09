"use client";

import { ArrowUpRight } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative w-full bg-black border-t border-white/5 px-6 md:px-12 py-16">
      
      {/* Main Closing Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12 py-12">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
            Building products <br />
            that matter.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest">
            And we're just getting started.
          </p>
        </div>

        <div>
          <a
            href="mailto:hello@apexventures.studio"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-6 py-4 text-sm font-semibold tracking-wide transition-all hover:bg-zinc-200"
          >
            Connect With Us
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Info links and copyright details */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 font-mono text-[10px] text-zinc-600 gap-4">
        <div className="flex items-center gap-6">
          <span>APEX VENTURES STUDIO</span>
          <span className="hidden sm:inline">•</span>
          <span>"I LIKE TO BUILD"</span>
        </div>
        <div>
          <span>©2026 APEX VENTURES. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}
