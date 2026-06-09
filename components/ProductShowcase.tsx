"use client";

import { Badge } from "@/components/ui/badge";
import { Check, ArrowUpRight, Globe, Layers, Navigation, Calendar, Shield, CreditCard, ChevronRight, User, FolderGit, Cpu, Zap, BatteryCharging, Compass } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section id="products" className="relative bg-black border-t border-white/5 py-24 space-y-36">
      
      {/* SECTION INTRO */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Product Portfolio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            What We Build
          </h2>
          <p className="text-zinc-400 font-light text-base sm:text-lg">
            We focus on turning utility-driven concepts into functional software. Explore our flagship products.
          </p>
        </div>
      </div>

      {/* PRODUCT 1: TRIPWISE AI */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Product 01</span>
                <Badge variant="outline" className="border-white/10 bg-white/5 font-mono text-[10px] text-zinc-300">Active Beta</Badge>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                TripWise AI
              </h3>
              <h4 className="text-xl text-zinc-400 font-medium font-sans">
                Travel Planning Reimagined
              </h4>
            </div>

            <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
              TripWise AI transforms the way people plan trips. Instead of juggling multiple websites for flights, hotels, transportation, budgets, visas, and itineraries, users receive a complete travel plan in minutes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "AI-generated itineraries",
                "Flight recommendations",
                "Hotel suggestions",
                "Visa guidance",
                "Budget estimation",
                "Local transit planning",
                "Packing list builder",
                "Day-by-day travel plans",
                "Destination insights"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 text-zinc-300 font-mono text-xs">
                  <div className="p-0.5 rounded bg-zinc-800 border border-white/5">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <a
                href="https://tripwiseai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all group"
              >
                Launch TripWise
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Premium UI Mockup Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl border border-white/10 bg-zinc-950/40 p-4 sm:p-6 backdrop-blur-md shadow-2xl overflow-hidden w-full font-sans">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-zinc-500">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span>tripwise.apexventures.studio/itinerary/hnd-tokyo</span>
                <span className="opacity-0 sm:opacity-100">v1.4.2</span>
              </div>

              {/* Fake Dashboard Area */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Left Mini Sidebar */}
                <div className="sm:col-span-3 space-y-2 text-xs font-mono border-r border-white/5 pr-2 hidden sm:block">
                  <div className="px-2 py-1.5 rounded bg-white/5 text-white flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Overview</span>
                  </div>
                  <div className="px-2 py-1.5 text-zinc-500 hover:text-zinc-300 flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Itinerary</span>
                  </div>
                  <div className="px-2 py-1.5 text-zinc-500 hover:text-zinc-300 flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Budgeting</span>
                  </div>
                  <div className="px-2 py-1.5 text-zinc-500 hover:text-zinc-300 flex items-center gap-2 cursor-pointer">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Visa Setup</span>
                  </div>
                </div>

                {/* Right Content Panel */}
                <div className="sm:col-span-9 space-y-4">
                  
                  {/* Trip Header block */}
                  <div className="border border-white/5 rounded-lg bg-black/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-white">Autumn in Tokyo & Kyoto</h5>
                      <span className="text-[10px] font-mono text-zinc-500">9 Days • Solo Explorer Mode</span>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-mono text-[10px] self-start sm:self-auto">Ready to Export</Badge>
                  </div>

                  {/* Daily details grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Itinerary Preview</span>
                    
                    <div className="border border-white/5 rounded-lg bg-black/35 p-3 flex gap-3.5 items-start">
                      <span className="font-mono text-xs font-bold text-white px-2 py-1 rounded bg-zinc-900 border border-white/5">01</span>
                      <div className="space-y-1">
                        <h6 className="text-xs font-semibold text-white">Arrive HND & Shibuya Explore</h6>
                        <p className="text-[11px] text-zinc-400">Transfer via Monorail, check-in at Cerulean Tower. Late evening walk through Shibuya Crossing and dinner at local Izakaya.</p>
                      </div>
                    </div>

                    <div className="border border-white/5 rounded-lg bg-black/35 p-3 flex gap-3.5 items-start">
                      <span className="font-mono text-xs font-bold text-white px-2 py-1 rounded bg-zinc-900 border border-white/5">02</span>
                      <div className="space-y-1">
                        <h6 className="text-xs font-semibold text-white">Meiji Shrine & Harajuku Vintage</h6>
                        <p className="text-[11px] text-zinc-400">Morning walk through Yoyogi Park. Specialty coffee in Omotesando, afternoon vintage shopping in Harajuku's back alleys.</p>
                      </div>
                    </div>
                  </div>

                  {/* Budget breakdown progress */}
                  <div className="border border-white/5 rounded-lg bg-black/50 p-3 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-400">Estimated Budget</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">$2,450 USD</span>
                      <span className="text-[10px] font-mono text-zinc-500">($270/day)</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* PRODUCT 2: FOLIO AI */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Mockup Column (Left for Zig-zag structure) */}
          <div className="lg:col-span-7 order-last lg:order-first">
            <div className="relative rounded-xl border border-white/10 bg-zinc-950/40 p-4 sm:p-6 backdrop-blur-md shadow-2xl overflow-hidden w-full font-sans">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-zinc-500">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span>folioai.studio/creatives/neilsurjiani</span>
                <span className="opacity-0 sm:opacity-100">Live Preview</span>
              </div>

              {/* Dashboard/Preview container */}
              <div className="border border-white/5 bg-black/85 rounded-lg p-6 space-y-6">
                
                {/* Profile header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-white/15 bg-zinc-900 flex items-center justify-center text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white">Neil Surjiani</h5>
                      <span className="text-[10px] font-mono text-zinc-500">Systems Designer & Engineer</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-zinc-400 text-[9px] uppercase font-mono tracking-widest self-start sm:self-auto">Design System V2</Badge>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/5 bg-zinc-900/35 rounded-lg p-4 space-y-2 hover:border-white/20 transition-all cursor-pointer">
                    <FolderGit className="h-4 w-4 text-zinc-400" />
                    <h6 className="text-xs font-semibold text-white">Apollo Protocol</h6>
                    <p className="text-[10px] text-zinc-400 font-light">Custom caching and state synchronization middleware built for Next.js.</p>
                  </div>
                  
                  <div className="border border-white/5 bg-zinc-900/35 rounded-lg p-4 space-y-2 hover:border-white/20 transition-all cursor-pointer">
                    <Cpu className="h-4 w-4 text-zinc-400" />
                    <h6 className="text-xs font-semibold text-white">Vertex Engine</h6>
                    <p className="text-[10px] text-zinc-400 font-light">Lightweight vector index database designed for resource-constrained edge systems.</p>
                  </div>
                </div>

                {/* Skills metrics tags */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Active Core Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Next.js", "Rust", "WebAssembly", "Tailwind CSS", "Postgres"].map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full border border-white/5 bg-zinc-900 text-[10px] font-mono text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Product 02</span>
                <Badge variant="outline" className="border-white/10 bg-white/5 font-mono text-[10px] text-zinc-300">Live</Badge>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Folio AI
              </h3>
              <h4 className="text-xl text-zinc-400 font-medium font-sans">
                Build Your Portfolio in Minutes
              </h4>
            </div>

            <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
              Folio AI helps students, developers, creators, and professionals build beautiful portfolios without spending days designing websites. Users can focus on developing skills and projects while Folio AI handles presentation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Portfolio generation",
                "Professional templates",
                "Project showcases",
                "Skill organization",
                "Resume integration",
                "Personal branding"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 text-zinc-300 font-mono text-xs">
                  <div className="p-0.5 rounded bg-zinc-800 border border-white/5">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <a
                href="https://tryfolioai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all group"
              >
                Launch Folio AI
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* PRODUCT 3: EVMATE */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Product 03</span>
                <Badge variant="outline" className="border-white/10 bg-white/5 font-mono text-[10px] text-zinc-300">Active Alpha</Badge>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                EVMate
              </h3>
              <h4 className="text-xl text-zinc-400 font-medium font-sans">
                Making EV Ownership Hassle-Free
              </h4>
            </div>

            <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
              EVMate simplifies electric vehicle ownership by helping drivers find chargers, optimize routes, and plan trips around battery constraints.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Nearby charger discovery",
                "Route optimization",
                "Range-aware planning",
                "Battery monitoring",
                "Charging stop recommendations",
                "Long-distance trip planning"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 text-zinc-300 font-mono text-xs">
                  <div className="p-0.5 rounded bg-zinc-800 border border-white/5">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <a
                href="https://evmate-8ce3d.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border-b border-white/20 pb-0.5 hover:border-white transition-all group"
              >
                Launch EVMate
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Premium UI Mockup Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl border border-white/10 bg-zinc-950/40 p-4 sm:p-6 backdrop-blur-md shadow-2xl overflow-hidden w-full font-sans">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-xs font-mono text-zinc-500">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span>evmate.apexventures.studio/navigation/route-66</span>
                <span className="opacity-0 sm:opacity-100">Live telemetry</span>
              </div>

              {/* Fake Navigation Interface */}
              <div className="space-y-4">
                
                {/* Route status summary card */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-white/5 bg-black/60 rounded-lg p-3 space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">Battery State</span>
                    <div className="flex items-center gap-2 text-white">
                      <BatteryCharging className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold font-mono">82% SoC</span>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-black/60 rounded-lg p-3 space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">Next Charger</span>
                    <div className="flex items-center gap-2 text-white">
                      <Zap className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-bold font-mono">34 miles</span>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-black/60 rounded-lg p-3 space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">Optimized Range</span>
                    <div className="flex items-center gap-2 text-white">
                      <Compass className="h-4 w-4 text-white" />
                      <span className="text-xs font-bold font-mono">245 miles</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry Route line visualization */}
                <div className="border border-white/5 bg-black/85 rounded-lg p-4 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs text-zinc-500">
                    <span>Active Optimization Model: Tesla Model 3 Long Range</span>
                    <span>98% Accuracy</span>
                  </div>
                  
                  {/* Schematic Path indicator */}
                  <div className="relative h-12 border border-white/5 rounded bg-zinc-900/40 flex items-center justify-between px-6 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-3/4 bg-white/[0.02] border-r border-white/10" />
                    
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-white">Home</span>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center text-[7px] text-black font-bold">⚡</div>
                      <span className="text-[10px] text-zinc-300">Supercharger V3 (12m charge)</span>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-600" />
                      <span className="text-[10px] text-zinc-500">Dest</span>
                    </div>
                  </div>

                  {/* Charger info checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-zinc-400 pt-1">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-zinc-600" />
                      <span>Avoided 2 high-traffic peak rate chargers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-zinc-600" />
                      <span>Adjusted for 15mph headwind factors</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
