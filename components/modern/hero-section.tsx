'use client'

import Link from 'next/link'
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Search,
  FilePlus2,
  MapPin,
  CheckCircle2,
  Lock,
  Activity,
  Layers,
  Clock,
  Compass,
} from 'lucide-react'

export function ModernHeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-[300px] h-[250px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Top Capsule Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-zinc-300 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Campus Intelligent Network</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">Nagpur &amp; University Hubs</span>
          </div>
        </div>

        {/* Big Display Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-['var(--font-heading)']">
            Recover what’s lost.{' '}
            <span className="text-gradient-accent block sm:inline">
              Reconnect what’s found.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            The next-generation campus lost &amp; found portal. Powered by AI similarity matching, encrypted ownership verification, and trusted campus security desks.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/lost"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 group"
            >
              <span>Report Lost Item</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/found"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Report Found Item</span>
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Search className="h-4 w-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>

        {/* Bento Grid Metrics / Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Match Accuracy */}
          <div className="p-5 rounded-3xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                01 // Intelligence
              </span>
              <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-white tracking-tight font-['var(--font-heading)']">
                98.4%
              </div>
              <p className="text-xs font-semibold text-zinc-300 mt-1">Smart Match Accuracy</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Color, brand, and visual feature scoring automatically connects finders to rightful owners.
              </p>
            </div>
          </div>

          {/* Card 2: Successful Reconnections */}
          <div className="p-5 rounded-3xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                02 // Impact
              </span>
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-white tracking-tight font-['var(--font-heading)']">
                1,204+
              </div>
              <p className="text-xs font-semibold text-zinc-300 mt-1">Items Reunited</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Wallets, IDs, keys, AirPods, notebooks, and water bottles safely returned to students.
              </p>
            </div>
          </div>

          {/* Card 3: Encrypted Ownership Vault */}
          <div className="p-5 rounded-3xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                03 // Security
              </span>
              <div className="h-8 w-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Lock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-white tracking-tight font-['var(--font-heading)']">
                Zero-Leak
              </div>
              <p className="text-xs font-semibold text-zinc-300 mt-1">Encrypted Proof Vault</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Private serial numbers and secret markings are sealed until verification challenge is passed.
              </p>
            </div>
          </div>

          {/* Card 4: Verified Campus Hubs */}
          <div className="p-5 rounded-3xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400">
                04 // Network
              </span>
              <div className="h-8 w-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-white tracking-tight font-['var(--font-heading)']">
                8 Hubs
              </div>
              <p className="text-xs font-semibold text-zinc-300 mt-1">Physical Safe Desks</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Central Library, Student Union, North Campus, Metro Station, and Sports Complex lockers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
