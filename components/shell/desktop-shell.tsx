import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './nav-config'
import { RetroTaskbar } from './retro-taskbar'

export function DesktopShell({
  activeKey,
  children,
}: {
  activeKey?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-dvh bg-win-desktop">
      <div className="mx-auto flex max-w-6xl gap-3 px-3 pb-16 pt-3">
        {/* Sidebar nav — desktop/tablet */}
        <nav className="hidden w-52 shrink-0 md:block" aria-label="Primary">
          <div className="bevel-out bg-win-face sticky top-3" style={{ padding: 3 }}>
            <Link
              href="/"
              title="Return to Desktop Home"
              className="flex items-center gap-2 px-2 py-1 text-win-title-text hover:brightness-110 dotted-focus"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-win-title) 0%, var(--color-win-title-2) 100%)',
              }}
            >
              <span className="font-pixel text-[10px]">LOST//98</span>
            </Link>
            <ul className="p-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = item.key === activeKey
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-2.5 px-2 py-1.5 text-[13px] dotted-focus',
                        active
                          ? 'bg-win-title text-win-title-text font-bold'
                          : 'hover:bg-win-title/10',
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav activeKey={activeKey} />

      <RetroTaskbar activeKey={activeKey} />
    </div>
  )
}

function MobileNav({ activeKey }: { activeKey?: string }) {
  const items = NAV_ITEMS.filter((n) =>
    ['dashboard', 'search', 'lost', 'messages', 'security'].includes(n.key),
  )
  return (
    <nav
      className="bevel-out bg-win-face fixed inset-x-0 bottom-11 z-40 flex md:hidden"
      aria-label="Mobile"
    >
      {items.map((item) => {
        const Icon = item.icon
        const active = item.key === activeKey
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] dotted-focus',
              active ? 'bevel-in font-bold' : '',
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="truncate px-0.5">{item.label.split(' ')[0]}</span>
          </Link>
        )
      })}
    </nav>
  )
}
