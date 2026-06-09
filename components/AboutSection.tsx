"use client";

import { motion, Transition } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};
const t: Transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export default function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/5 bg-black py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={t}
            className="lg:col-span-4 space-y-3"
          >
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Studio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Apex Ventures?
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...t, delay: 0.15 }}
            className="lg:col-span-8 space-y-6 text-zinc-400 text-base leading-relaxed"
          >
            <p>
              Apex Ventures started with a simple idea: instead of leaving ideas in notebooks, build them.
            </p>
            <p>
              Every product begins with a real problem. Every launch is an opportunity to learn. Every iteration makes the product better.
            </p>
            <p>
              I don't build for trends. I build for utility — software that saves time, reduces friction, and works the way people actually expect it to.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
