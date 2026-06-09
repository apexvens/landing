"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const imgScale = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
};

const transition: Transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ── TripWise ─────────────────────────────────────────────── */
function TripWise() {
  const features = [
    "AI-generated itineraries",
    "Flight recommendations",
    "Hotel suggestions",
    "Visa guidance",
    "Budget estimation",
    "Day-by-day plans",
    "Packing list builder",
    "Local transit planning",
    "Destination insights",
  ];

  return (
    <div id="tripwise" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
        className="mb-16"
      >
        <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">Product 01</span>
        <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
          Travel Planning<br />Reimagined
        </h2>
      </motion.div>

      {/* Hero screenshot */}
      <motion.div
        variants={imgScale}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        transition={transition}
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16"
      >
        <Image
          src="/tripwise/hero.png"
          alt="TripWise AI hero"
          width={1600}
          height={900}
          className="w-full h-auto object-cover"
          quality={95}
        />
      </motion.div>

      {/* Info + features grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <p className="text-lg text-zinc-300 leading-relaxed">
            TripWise helps travelers generate complete travel plans including flights, hotels, visas, transportation, budgets, packing lists and personalized itineraries — in minutes.
          </p>
          <Link
            href="https://tripwiseai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all"
          >
            Open TripWise AI
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
          className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-zinc-400 text-sm">
              <Check className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Screenshots row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { src: "/tripwise/dashboard.png", label: "Dashboard" },
          { src: "/tripwise/itinerary.png", label: "Itinerary" },
          { src: "/tripwise/budget.png", label: "Budget" },
        ].map(({ src, label }, i) => (
          <motion.div
            key={label}
            variants={imgScale}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...transition, delay: i * 0.1 }}
            className="relative rounded-xl overflow-hidden border border-white/8 shadow-xl"
          >
            <Image
              src={src}
              alt={`TripWise ${label}`}
              width={800}
              height={520}
              className="w-full h-auto object-cover"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Folio AI ─────────────────────────────────────────────── */
function FolioAI() {
  const features = [
    "Portfolio generation",
    "Professional templates",
    "Project showcases",
    "Skill organization",
    "Resume integration",
    "Personal branding",
  ];

  return (
    <div id="folioai" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
        className="mb-16"
      >
        <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">Product 02</span>
        <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
          Build Your Portfolio<br />in Minutes
        </h2>
      </motion.div>

      {/* Hero screenshot */}
      <motion.div
        variants={imgScale}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        transition={transition}
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16"
      >
        <Image
          src="/folioai/hero.png"
          alt="Folio AI hero"
          width={1600}
          height={900}
          className="w-full h-auto object-cover"
          quality={95}
        />
      </motion.div>

      {/* Info + features grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <p className="text-lg text-zinc-300 leading-relaxed">
            Folio AI helps students, developers and professionals create beautiful portfolios quickly so they can focus on building skills rather than websites.
          </p>
          <Link
            href="https://tryfolioai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all"
          >
            Open Folio AI
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
          className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-zinc-400 text-sm">
              <Check className="h-4 w-4 text-violet-400 flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Screenshots row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { src: "/folioai/portfolio1.png", label: "Example Portfolio 1" },
          { src: "/folioai/portfolio2.png", label: "Example Portfolio 2" },
          { src: "/folioai/editor.png", label: "Editor" },
        ].map(({ src, label }, i) => (
          <motion.div
            key={label}
            variants={imgScale}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...transition, delay: i * 0.1 }}
            className="relative rounded-xl overflow-hidden border border-white/8 shadow-xl"
          >
            <Image
              src={src}
              alt={`Folio AI ${label}`}
              width={800}
              height={520}
              className="w-full h-auto object-cover"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── EVMate ───────────────────────────────────────────────── */
function EVMate() {
  const features = [
    "Nearby charger discovery",
    "Route optimization",
    "Range-aware planning",
    "Battery monitoring",
    "Charging stop recommendations",
    "Long-distance trip planning",
  ];

  return (
    <div id="evmate" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
        className="mb-16"
      >
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Product 03</span>
        <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
          Making EV Ownership<br />Hassle-Free
        </h2>
      </motion.div>

      {/* Hero screenshot */}
      <motion.div
        variants={imgScale}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-40px" }}
        transition={transition}
        className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-16"
      >
        <Image
          src="/evmate/hero.png"
          alt="EVMate hero"
          width={1600}
          height={900}
          className="w-full h-auto object-cover"
          quality={95}
        />
      </motion.div>

      {/* Info + features grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <p className="text-lg text-zinc-300 leading-relaxed">
            EVMate helps EV owners discover chargers, optimize routes and plan trips based on battery range and charging requirements.
          </p>
          <Link
            href="https://evmate-8ce3d.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all"
          >
            Open EVMate
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
          className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-zinc-400 text-sm">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Screenshots row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { src: "/evmate/chargers.png", label: "Charger Map" },
          { src: "/evmate/route-planner.png", label: "Route Planner" },
          { src: "/evmate/battery.png", label: "Battery Dashboard" },
        ].map(({ src, label }, i) => (
          <motion.div
            key={label}
            variants={imgScale}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...transition, delay: i * 0.1 }}
            className="relative rounded-xl overflow-hidden border border-white/8 shadow-xl"
          >
            <Image
              src={src}
              alt={`EVMate ${label}`}
              width={800}
              height={520}
              className="w-full h-auto object-cover"
              quality={90}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Export ───────────────────────────────────────────────── */
export default function ProductShowcase() {
  return (
    <section id="products" className="relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-4">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={transition}
        >
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">What I've Built</span>
          <p className="mt-2 text-zinc-600 text-sm max-w-xl">
            Three products across travel, professional branding, and electric mobility.
          </p>
        </motion.div>
      </div>
      <div className="divide-y divide-white/5">
        <TripWise />
        <FolioAI />
        <EVMate />
      </div>
    </section>
  );
}
