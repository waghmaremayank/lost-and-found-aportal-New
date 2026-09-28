'use client'

import Link from 'next/link'
import {
  Users,
  Heart,
  MapPin,
  ShieldCheck,
  PackageCheck,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Building,
  Clock,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'

const STORIES = [
  {
    id: 'S-1',
    item: 'Gold Vintage Watch',
    owner: 'U-3190',
    finder: 'U-1180',
    location: 'Central Library',
    date: '2026-09-23',
    story:
      'Lost my grandfather’s watch in the library study carrels. The finder deposited it with verification questions and I got it back within 3 hours. Best community ever!',
  },
  {
    id: 'S-2',
    item: 'TI-84 Plus Calculator',
    owner: 'U-8821',
    finder: 'U-9021 (Moderator)',
    location: 'North Campus Room 302',
    date: '2026-09-22',
    story:
      'Left my calculator right before midterm exam week. Verified using the unique Pikachu sticker on the battery cover. Huge lifesaver!',
  },
  {
    id: 'S-3',
    item: 'MacBook Air in Leather Sleeve',
    owner: 'U-4412',
    finder: 'U-2048',
    location: 'Student Union Lounge',
    date: '2026-09-20',
    story:
      'Finder securely held the laptop and verified ownership through the security desk handover protocol. Completely safe transaction.',
  },
]

const SAFE_LOCATIONS = [
  {
    name: 'Campus Security Main Desk (Bldg A)',
    hours: '24 Hours / 7 Days',
    features: 'Guarded entrance, CCTV monitored, official signed release form',
  },
  {
    name: 'Student Union Information Center',
    hours: 'Mon-Fri 08:00 – 20:00',
    features: 'High foot-traffic, campus staff present, secure lockers available',
  },
  {
    name: 'Central Library Front Circulation Desk',
    hours: 'Mon-Sun 08:00 – 22:00',
    features: 'Well lit, staff verification available, central campus access',
  },
  {
    name: 'Metro Transit Customer Care Office',
    hours: 'Mon-Sun 06:00 – 23:00',
    features: 'Transit security on duty, formal lost & found registry',
  },
]

export default function CommunityPage() {
  return (
    <ModernShell
      activeKey="community"
      title="Community Trust & Safe Handover Network"
      subtitle="Discover verified student reunion stories and locate physical 24/7 security handover desks."
      badge="CAMPUS NETWORK"
    >
      <div className="flex flex-col gap-8">
        {/* Community Pledge Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#12131d]/90 to-[#12131d]/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span>THE INTEGRITY PLEDGE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['var(--font-heading)']">
              1,200+ Recoveries Powered by Student Honesty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              We protect both finders and owners with masked identity routing, anti-fraud verification tests, and official supervised campus pickup desks.
            </p>
          </div>

          <Link
            href="/lost"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors shrink-0 shadow-lg shadow-white/10"
          >
            Report an Item Now →
          </Link>
        </div>

        {/* Stories Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white font-['var(--font-heading)']">
              Recent Verified Reunions
            </h3>
            <span className="text-xs text-zinc-400 font-mono">LIVE FEED</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {STORIES.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-3xl bg-[#12131d]/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="font-bold text-sm text-white">{s.item}</span>
                    <PackageCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-500 font-mono">
                    {s.location} • {s.date}
                  </p>
                  <p className="mt-3 text-xs text-zinc-300 leading-relaxed italic">
                    &quot;{s.story}&quot;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Owner: <strong className="text-zinc-200">{s.owner}</strong></span>
                  <span>Finder: <strong className="text-zinc-200">{s.finder}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safe Hub Locations */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 font-['var(--font-heading)']">
            Designated Campus Safe Pickup Stations
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {SAFE_LOCATIONS.map((loc, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                    <h4 className="text-sm font-bold text-white">{loc.name}</h4>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{loc.hours}</span>
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{loc.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Protocol Banner */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
            <span className="text-sm font-bold text-white">SAFETY &amp; FRAUD PREVENTION GUIDELINES</span>
          </div>
          <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1.5 mt-2">
            <li>Never pay wire transfer, crypto, or courier charges to claim your item.</li>
            <li>All in-person handoffs should occur in public spaces during operational hours.</li>
            <li>Always confirm secret ownership quiz answers before releasing property.</li>
            <li>Report suspicious users or harassment immediately to moderators.</li>
          </ul>
        </div>
      </div>
    </ModernShell>
  )
}
