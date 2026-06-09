"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "TripWise AI",
    desc: "AI travel planning",
    href: "https://tripwiseai.vercel.app/",
    color: "text-blue-400",
  },
  {
    name: "Folio AI",
    desc: "Portfolio generation",
    href: "https://tryfolioai.vercel.app/",
    color: "text-violet-400",
  },
  {
    name: "EVMate",
    desc: "EV route planning",
    href: "https://evmate-8ce3d.web.app/",
    color: "text-emerald-400",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 bg-black overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern" />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />

      <div className="relative z-10 max-w-5xl">
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Image
            src="/apex/logo-white.png"
            alt="Apex Ventures"
            width={120}
            height={36}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-6"
        >
          I like to build.
        </motion.h1>

        {/* Subheading */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl space-y-3 mb-14"
        >
          <p className="text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed">
            Apex Ventures is where ideas become products.
          </p>
          <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
            From AI travel planning to EV mobility and portfolio generation, we build software that solves real problems.
          </p>
        </motion.div>

        {/* Product pills */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {products.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-200"
            >
              <span className={`text-xs font-semibold ${p.color}`}>{p.name}</span>
              <span className="text-xs text-zinc-600">{p.desc}</span>
              <ArrowRight className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </Link>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <a
            href="#products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            See what I've built
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <span className="text-zinc-700">•</span>
          <a
            href="#founder"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            About
          </a>
        </motion.div>
      </div>
    </section>
  );
}
