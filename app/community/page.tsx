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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
} from '@/components/retro'

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
    item: 'TI-84 Plus Graphing Calculator',
    owner: 'U-8821',
    finder: 'U-9021 (Moderator)',
    location: 'North Campus Room 302',
    date: '2026-09-22',
    story:
      'Left my calculator right before midterm exam week. Verified using the unique Pikachu sticker on the battery cover. Huge lifesaver!',
  },
  {
    id: 'S-3',
    item: 'MacBook Air M2 in Leather Sleeve',
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
    features: 'Guarded entrance, CCTV monitored, official case receipt signed',
  },
  {
    name: 'Student Union Information Center',
    hours: 'Mon-Fri 08:00 – 20:00',
    features: 'High foot-traffic, campus staff present, lockers available',
  },
  {
    name: 'Central Library Front Circulation Desk',
    hours: 'Mon-Sun 08:00 – 22:00',
    features: 'Well lit, staff verification available, central campus access',
  },
  {
    name: 'Metro Transit Station Customer Care Office',
    hours: 'Mon-Sun 06:00 – 23:00',
    features: 'Transit police on duty, formal lost & found log system',
  },
]

export default function CommunityPage() {
  return (
    <DesktopShell activeKey="community">
      <div className="flex flex-col gap-3">
        <RetroWindow
          title="Community Bulletin Board & Safe Handover Network"
          icon={<Users className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Banner */}
            <div className="bevel-out bg-win-face-light p-3 text-win-text">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-win-red shrink-0" aria-hidden />
                <h3 className="font-pixel text-sm text-win-title">THE LOST//98 COMMUNITY PLEDGE</h3>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed">
                Over <strong>1,204 items</strong> have been safely reunited with their rightful owners. We protect finders and owners with zero-disclosure in-platform messaging, verification tests, and designated safe campus handover spots.
              </p>
            </div>

            {/* Success Stories Wall */}
            <RetroGroupBox legend="Recent Reunited Success Stories">
              <div className="grid gap-3 sm:grid-cols-3">
                {STORIES.map((s) => (
                  <div key={s.id} className="bevel-in bg-win-white flex flex-col justify-between p-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[13px] text-win-title">{s.item}</span>
                        <PackageCheck className="h-4 w-4 text-win-green" aria-hidden />
                      </div>
                      <p className="mt-0.5 text-[10px] text-win-shadow">
                        {s.location} • {s.date}
                      </p>
                      <p className="mt-2 text-[11px] italic text-win-text leading-relaxed">
                        &quot;{s.story}&quot;
                      </p>
                    </div>

                    <div className="mt-3 border-t border-win-face-light pt-1.5 flex items-center justify-between text-[10px] text-win-shadow">
                      <span>Owner: {s.owner}</span>
                      <span>Finder: {s.finder}</span>
                    </div>
                  </div>
                ))}
              </div>
            </RetroGroupBox>

            {/* Designated Safe Handover Locations */}
            <RetroGroupBox legend="Official Designated Safe Handover Locations">
              <div className="grid gap-2 sm:grid-cols-2">
                {SAFE_LOCATIONS.map((loc, i) => (
                  <div key={i} className="bevel-out bg-win-face p-2.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-win-green shrink-0" aria-hidden />
                      <span className="text-[13px] font-bold text-win-text">{loc.name}</span>
                    </div>
                    <p className="mt-1 text-[11px] font-semibold text-win-title">
                      Operating Hours: {loc.hours}
                    </p>
                    <p className="mt-0.5 text-[11px] text-win-shadow">{loc.features}</p>
                  </div>
                ))}
              </div>
            </RetroGroupBox>

            {/* Safety & Anti-Fraud Rules */}
            <div className="bevel-out bg-win-yellow flex flex-col gap-1.5 p-3 text-win-text">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-win-green shrink-0" aria-hidden />
                <span className="text-[13px] font-bold">COMMUNITY SAFETY & ANTI-SCAM PROTOCOLS</span>
              </div>
              <ul className="list-disc pl-5 text-[12px] space-y-1">
                <li>Never agree to pay wire transfer or courier fees to recover your item.</li>
                <li>Never meet in private residential addresses or secluded parking lots after dark.</li>
                <li>Verify ownership questions on LOST//98 before releasing property.</li>
                <li>If someone acts suspicious or demands money, report them instantly to moderators.</li>
              </ul>
            </div>

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="com" className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-win-title" aria-hidden />
                  COMMUNITY TRUST RATING: 99.4%
                </span>,
                <RetroBadge key="sec" tone="green">
                  SAFE NETWORK
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
