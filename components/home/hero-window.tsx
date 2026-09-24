import Link from 'next/link'
import { Search, FilePlus2, MapPin, ShieldCheck, Database, RefreshCcw } from 'lucide-react'
import { RetroWindow, RetroMenuBar, RetroButton, RetroBadge } from '@/components/retro'
import { STATS } from '@/lib/mock-data'

const MENUS = [
  { label: 'File', items: [{ label: 'New Report' }, { label: 'Open Search' }, { separator: true, label: '' }, { label: 'Exit' }] },
  { label: 'Edit', items: [{ label: 'Preferences' }, { label: 'Filters' }] },
  { label: 'View', items: [{ label: 'Grid' }, { label: 'List' }, { label: 'Map' }] },
  { label: 'Help', items: [{ label: 'How It Works' }, { label: 'Safety Tips' }, { label: 'About LOST//98' }] },
]

export function HeroWindow() {
  return (
    <RetroWindow
      title="LOST//98 — Lost & Found Terminal"
      icon={<Search className="h-3.5 w-3.5" aria-hidden />}
      controls={['minimize', 'maximize', 'close']}
    >
      <RetroMenuBar menus={MENUS} className="mb-3" />

      <div className="flex flex-col gap-4 p-1">
        <div className="flex items-center gap-2">
          <RetroBadge tone="blue">SYSTEM ONLINE</RetroBadge>
          <RetroBadge tone="green">SECURE CONNECTION</RetroBadge>
        </div>

        <div>
          <h1 className="font-pixel text-lg leading-relaxed text-win-title sm:text-xl">
            Lost it? Found it?
            <br />
            Reunite it.
          </h1>
          <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-win-text">
            A secure lost &amp; found network with private messaging, verified ownership claims,
            and smart matching. Report what you lost or found, and let the system connect the dots
            — without ever exposing your personal details.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/lost">
            <RetroButton variant="default" className="gap-2">
              <FilePlus2 className="h-4 w-4" aria-hidden />
              Report Lost Item
            </RetroButton>
          </Link>
          <Link href="/found">
            <RetroButton className="gap-2">
              <MapPin className="h-4 w-4" aria-hidden />
              Report Found Item
            </RetroButton>
          </Link>
          <Link href="/search">
            <RetroButton className="gap-2">
              <Search className="h-4 w-4" aria-hidden />
              Browse Items
            </RetroButton>
          </Link>
        </div>

        <div className="bevel-in grid grid-cols-3 gap-px bg-win-shadow">
          <Stat label="Total Reports" value={STATS.reports.toLocaleString()} icon={<Database className="h-4 w-4" aria-hidden />} />
          <Stat label="Items Returned" value={STATS.returned.toLocaleString()} icon={<RefreshCcw className="h-4 w-4" aria-hidden />} />
          <Stat label="Active Cases" value={STATS.active.toLocaleString()} icon={<ShieldCheck className="h-4 w-4" aria-hidden />} />
        </div>
      </div>
    </RetroWindow>
  )
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-win-face flex flex-col items-center gap-1 p-3 text-center">
      <span className="text-win-title">{icon}</span>
      <span className="font-pixel text-sm text-win-text">{value}</span>
      <span className="text-[11px] text-win-shadow">{label}</span>
    </div>
  )
}
