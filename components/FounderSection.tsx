"use client";

import Image from "next/image";
import { motion, Transition } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};
const t: Transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export default function FounderSection() {
  return (
    <section id="founder" className="relative border-t border-white/5 bg-black py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={t}
            className="md:col-span-4"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/founder/neil.jpg"
                alt="Neil Surjiani"
                fill
                className="object-cover"
                quality={95}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...t, delay: 0.15 }}
            className="md:col-span-8 space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Neil Surjiani</h3>
              <p className="text-sm font-mono text-zinc-500 mt-1 uppercase tracking-widest">Founder, Apex Ventures</p>
            </div>

            <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
              <p>
                I enjoy building things.
              </p>
              <p>
                Apex Ventures is my platform for turning ideas into products that people can use every day. I'm not interested in perfect planning — I'm interested in shipping, learning, and improving.
              </p>
              <p>
                These three products represent the first chapter. There's a lot more being worked on.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
