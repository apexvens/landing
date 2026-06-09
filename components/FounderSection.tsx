"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="relative py-28 md:py-36 bg-black border-t border-white/5 overflow-hidden flex items-center justify-center">
      <div className="relative z-10 max-w-4xl w-full px-6 md:px-12">
        <div className="border border-white/10 bg-zinc-950/20 rounded-2xl p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <h4 className="text-2xl font-bold text-white font-sans">
                Neil Surjiani
              </h4>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                Founder, Apex Ventures
              </p>
            </div>
          </div>

          <div className="relative space-y-4">
            <Quote className="absolute -top-4 -left-4 h-8 w-8 text-white/[0.03] pointer-events-none" />
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              Apex Ventures was born out of a simple passion: turning ideas into tangible, real-world products. I believe the best solutions are built when we focus on clarity, strip away unnecessary visual and operational noise, and construct software that resolves actual, everyday bottlenecks. 
            </p>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Whether optimizing EV journeys or streamlining travel workflows, our building block remains identical: write clean code, design clean interfaces, and deploy platforms that deliver immediate value from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
