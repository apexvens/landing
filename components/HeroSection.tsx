"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Cpu, Box } from "lucide-react";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 py-20 bg-black overflow-hidden">
      {/* Clean Grid Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
      
      {/* Radial overlay to make corners darker and focus on center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_80%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center space-y-8 mt-10">
        
        {/* Subtitle Badge */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono tracking-wider text-zinc-300 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Venture Studio
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          Building products that solve real problems.
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed"
        >
          Apex Ventures is an AI-first venture studio creating technology that simplifies travel, professional branding, and electric mobility.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-6 py-3.5 text-sm font-semibold tracking-wide transition-all hover:bg-zinc-200"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-950/50 text-white px-6 py-3.5 text-sm font-semibold tracking-wide transition-all hover:bg-zinc-900 hover:border-white/20"
          >
            About Apex Ventures
          </a>
        </motion.div>

        {/* Trust Indicators Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full pt-16 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-3xl"
        >
          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white flex-shrink-0">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">3 Products Built</h4>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Actively shipped & iterating</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Multiple Industries</h4>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Travel, mobility & branding</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white flex-shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">AI-First Approach</h4>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">Thoughtful automation core</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
