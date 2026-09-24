'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function RetroTabs({
  tabs,
  className,
}: {
  tabs: { label: string; content: ReactNode }[]
  className?: string
}) {
  const [active, setActive] = useState(0)
  return (
    <div className={className}>
      <div role="tablist" className="relative z-10 flex gap-0.5 pl-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={active === i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'bevel-out bg-win-face rounded-t px-3 py-1 text-[13px] font-bold dotted-focus',
              active === i ? 'relative top-px pb-1.5 z-20' : 'text-win-shadow',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bevel-out bg-win-face -mt-px p-3">{tabs[active]?.content}</div>
    </div>
  )
}
