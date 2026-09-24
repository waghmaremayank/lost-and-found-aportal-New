'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type MenuItem = { label: string; shortcut?: string; disabled?: boolean; separator?: boolean }
export type Menu = { label: string; items: MenuItem[] }

export function RetroMenuBar({ menus, className }: { menus: Menu[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className={cn('bevel-groove bg-win-face flex items-stretch text-[13px]', className)}>
      {menus.map((menu, i) => (
        <div key={menu.label} className="relative">
          <button
            type="button"
            className={cn(
              'px-2 py-0.5 dotted-focus',
              open === i ? 'bg-win-title text-win-title-text' : 'hover:bg-win-title/10',
            )}
            onClick={() => setOpen(open === i ? null : i)}
            onMouseEnter={() => open !== null && setOpen(i)}
          >
            <span className="underline decoration-1 underline-offset-2">{menu.label[0]}</span>
            {menu.label.slice(1)}
          </button>
          {open === i ? (
            <div className="bevel-out bg-win-face absolute left-0 top-full z-50 min-w-[180px] p-0.5 text-win-text">
              {menu.items.map((item, j) =>
                item.separator ? (
                  <div key={j} className="bevel-groove my-1 h-0.5" />
                ) : (
                  <button
                    key={j}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => setOpen(null)}
                    className={cn(
                      'flex w-full items-center justify-between gap-6 px-4 py-1 text-left',
                      item.disabled
                        ? 'text-win-disabled'
                        : 'hover:bg-win-title hover:text-win-title-text',
                    )}
                  >
                    <span>{item.label}</span>
                    {item.shortcut ? <span className="text-[11px]">{item.shortcut}</span> : null}
                  </button>
                ),
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
