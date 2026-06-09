"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Title Area */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Studio Philosophy</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
              Why Apex Ventures?
            </h2>
            <div className="w-16 h-[2px] bg-white" />
          </div>

          {/* Copy Area */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl sm:text-2xl text-white font-medium leading-relaxed">
              We believe great products emerge when technology solves real problems.
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Apex Ventures is focused on identifying everyday friction points and building practical solutions powered by modern software and artificial intelligence. Rather than building for trends, we build for utility.
              </p>
              <p>
                Every product in our portfolio is designed to save time, reduce complexity, and improve user experiences. We measure our success not by the hype generated, but by the daily value our software delivers to users.
              </p>
            </div>

            <div className="border-t border-white/5 pt-8 grid grid-cols-3 gap-6 font-mono text-xs text-zinc-500">
              <div>
                <span className="block text-white font-semibold text-lg mb-1">01</span>
                <span>Utility First</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-lg mb-1">02</span>
                <span>Zero Complexity</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-lg mb-1">03</span>
                <span>Rapid Execution</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
