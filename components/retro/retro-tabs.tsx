'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type RetroTabItem = {
  key?: string
  label: string
  content?: ReactNode
}

export function RetroTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: RetroTabItem[]
  active?: string | number
  onChange?: (key: string) => void
  className?: string
}) {
  const [internalActive, setInternalActive] = useState(0)

  const isControlled = active !== undefined

  const getIsActive = (tab: RetroTabItem, index: number) => {
    if (isControlled) {
      if (typeof active === 'number') return active === index
      return (tab.key ?? tab.label) === active
    }
    return internalActive === index
  }

  const handleSelect = (tab: RetroTabItem, index: number) => {
    if (onChange) {
      onChange(tab.key ?? tab.label)
    }
    if (!isControlled) {
      setInternalActive(index)
    }
  }

  const activeIndex = tabs.findIndex((tab, i) => getIsActive(tab, i))
  const currentContent = activeIndex >= 0 ? tabs[activeIndex]?.content : null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div role="tablist" className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#10111a] border border-white/10 overflow-x-auto scrollbar-none">
        {tabs.map((tab, i) => {
          const selected = getIsActive(tab, i)
          return (
            <button
              key={tab.key ?? tab.label}
              role="tab"
              aria-selected={selected}
              type="button"
              onClick={() => handleSelect(tab, i)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer',
                selected
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {currentContent ? (
        <div className="rounded-2xl bg-[#10111a]/60 border border-white/10 p-4 sm:p-5 backdrop-blur-xl">
          {currentContent}
        </div>
      ) : null}
    </div>
  )
}
