"use client";

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-black w-full border-t border-white/5 overflow-hidden flex flex-col items-center justify-center">
      <div className="relative z-10 max-w-5xl w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        
        {/* Stat 1 */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <h4 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            3
          </h4>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Products Shipped
          </p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <h4 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            1,000+
          </h4>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Hours Built
          </p>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <h4 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-sans">
            ∞
          </h4>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Ideas Ahead
          </p>
        </div>

      </div>
    </section>
  );
}
