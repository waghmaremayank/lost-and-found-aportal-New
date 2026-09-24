'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Lock, Power, Search, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from './nav-config'
import { RetroClock } from './retro-clock'

export function RetroTaskbar({ activeKey }: { activeKey?: string }) {
  const [startOpen, setStartOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setStartOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const activeItem = NAV_ITEMS.find((n) => n.key === activeKey)

  return (
    <div
      ref={ref}
      className="bevel-out bg-win-face fixed inset-x-0 bottom-0 z-50 flex h-11 items-center gap-1 px-1"
    >
      {startOpen ? (
        <div className="bevel-out bg-win-face absolute bottom-11 left-1 z-50 w-64 p-0.5">
          <div className="flex">
            <div
              className="flex w-7 shrink-0 items-end justify-center pb-2 text-win-title-text"
              style={{
                writingMode: 'vertical-rl',
                background: 'linear-gradient(0deg, var(--color-win-title) 0%, var(--color-win-title-2) 100%)',
              }}
            >
              <span className="rotate-180 font-pixel text-[10px] tracking-widest">LOST//98</span>
            </div>
            <ul className="flex-1 p-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => setStartOpen(false)}
                      className="flex items-center gap-3 px-3 py-1.5 text-[13px] hover:bg-win-title hover:text-win-title-text dotted-focus"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
              <li className="bevel-groove my-1 h-0.5" />
              <li>
                <Link
                  href="/login"
                  onClick={() => setStartOpen(false)}
                  className="flex items-center gap-3 px-3 py-1.5 text-[13px] hover:bg-win-title hover:text-win-title-text dotted-focus"
                >
                  <Power className="h-4 w-4" aria-hidden />
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setStartOpen((v) => !v)}
        aria-expanded={startOpen}
        className={cn(
          'flex h-8 items-center gap-1.5 px-2 font-bold text-[13px] dotted-focus',
          startOpen ? 'bevel-in bg-win-face' : 'bevel-out bg-win-face',
        )}
      >
        <span className="grid h-5 w-5 place-items-center bg-win-title text-win-title-text text-[10px] font-black">
          98
        </span>
        Start
      </button>

      <Link
        href="/search"
        aria-label="Search"
        className="bevel-out hidden h-8 items-center gap-1.5 bg-win-face px-2 text-[13px] active:bevel-in sm:flex dotted-focus"
      >
        <Search className="h-4 w-4" aria-hidden />
        Search
      </Link>

      {activeItem ? (
        <div className="bevel-in bg-win-face ml-1 hidden h-8 items-center gap-1.5 px-2 text-[13px] font-bold md:flex">
          <activeItem.icon className="h-4 w-4" aria-hidden />
          {activeItem.label}
        </div>
      ) : null}

      <div className="ml-auto flex items-center gap-1">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="bevel-groove grid h-7 w-7 place-items-center dotted-focus"
        >
          <Bell className="h-4 w-4" aria-hidden />
        </Link>
        <div className="bevel-groove flex h-7 items-center gap-1.5 px-2 text-[12px] font-bold text-win-green">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          SECURE
        </div>
        <div className="bevel-groove flex h-7 items-center px-2 text-[12px]">
          <RetroClock />
        </div>
      </div>
    </div>
  )
}
