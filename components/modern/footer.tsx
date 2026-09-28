'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Globe,
  Lock,
  HardDrive,
  Compass,
  FilePlus2,
  MapPin,
  CheckCircle2,
  Users,
} from 'lucide-react'

export function ModernFooter() {
  return (
    <footer className="relative pt-20 pb-12 border-t border-white/10 bg-[#07080c] overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Big Callout Header (Framer Portfolio Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              // RECONNECT WITH CONFIDENCE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mt-3 font-['var(--font-heading)']">
              Lost something? <br className="hidden sm:inline" />
              <span className="text-gradient-accent">Let’s find it together.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/lost"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 group"
            >
              <span>Report Lost Item</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/found"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 backdrop-blur-md hover:scale-105"
            >
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Report Found Item</span>
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
              Explore &amp; Search
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Live Items Catalog
                </Link>
              </li>
              <li>
                <Link href="/lost" className="hover:text-white transition-colors">
                  Lost Reports Wizard
                </Link>
              </li>
              <li>
                <Link href="/found" className="hover:text-white transition-colors">
                  Found Items Registry
                </Link>
              </li>
              <li>
                <Link href="/claims" className="hover:text-white transition-colors">
                  Claim Ownership Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
              Campus Hubs
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <span className="text-zinc-300">Central Library Desk</span>
              </li>
              <li>
                <span className="text-zinc-300">Student Union Desk</span>
              </li>
              <li>
                <span className="text-zinc-300">Sports Complex Locker</span>
              </li>
              <li>
                <span className="text-zinc-300">North Campus Station</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
              Platform &amp; Tools
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Community Feed
                </Link>
              </li>
              <li>
                <Link href="/messages" className="hover:text-white transition-colors">
                  Encrypted Messaging
                </Link>
              </li>
              <li>
                <Link href="/recycle" className="hover:text-white transition-colors">
                  Sustainability &amp; Recycle Hub
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Security &amp; Audit Logs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
              Account &amp; Admin
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  My Profile &amp; Reports
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student/Staff Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Create Campus Account
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-indigo-400">
                  Moderator Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Live System Status */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-zinc-400">
              System Live &amp; Operational · 99.98% Verification Uptime
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>LOST &amp; FOUND // CAMPUS</span>
            <span>•</span>
            <span>Nagpur &amp; University Network</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
