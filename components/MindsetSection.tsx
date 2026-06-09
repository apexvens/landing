"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MindsetSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress (0 to 1) to opacity/scale values for each phrase
  // We have 4 phases:
  // Phase 1: We don't chase trends (0.0 to 0.25)
  // Phase 2: We build (0.25 to 0.5)
  // Phase 3: We ship (0.5 to 0.75)
  // Phase 4: We scale (0.75 to 1.0)
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0.9, 1, 1, 0.95]);

  const opacity2 = useTransform(scrollYProgress, [0.28, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.28, 0.4, 0.5, 0.55], [0.9, 1, 1, 0.95]);

  const opacity3 = useTransform(scrollYProgress, [0.53, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.53, 0.65, 0.75, 0.8], [0.9, 1, 1, 0.95]);

  const opacity4 = useTransform(scrollYProgress, [0.78, 0.9, 1.0], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.78, 0.9, 1.0], [0.9, 1, 1]);

  return (
    <div
      id="mindset-section"
      ref={containerRef}
      className="relative h-[400vh] w-full bg-black"
    >
      {/* Sticky container that keeps elements pinned while scrolling */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Animated backdrop grid lines that change opacity with progress */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="relative w-full max-w-7xl px-6 md:px-12 text-center flex items-center justify-center">
          
          {/* Phase 1: We don't chase trends */}
          <motion.div
            style={{ opacity: opacity1, scale: scale1 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h3 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight text-white max-w-5xl leading-none select-none">
              We don't chase <span className="text-zinc-600 block sm:inline">trends.</span>
            </h3>
          </motion.div>

          {/* Phase 2: We build */}
          <motion.div
            style={{ opacity: opacity2, scale: scale2 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h3 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white select-none">
              We <span className="text-zinc-500">build.</span>
            </h3>
          </motion.div>

          {/* Phase 3: We ship */}
          <motion.div
            style={{ opacity: opacity3, scale: scale3 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h3 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white select-none">
              We <span className="text-zinc-400">ship.</span>
            </h3>
          </motion.div>

          {/* Phase 4: We scale */}
          <motion.div
            style={{ opacity: opacity4, scale: scale4 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <h3 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white select-none">
              We <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">scale.</span>
            </h3>
          </motion.div>
          
        </div>

        {/* Cinematic horizontal bar scroll progress */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span>Mindset</span>
          <div className="w-24 h-[2px] bg-zinc-800 relative rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
