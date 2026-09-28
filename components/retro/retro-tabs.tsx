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
    <div className={className}>
      <div role="tablist" className="relative z-10 flex flex-wrap gap-0.5 pl-1">
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
                'bevel-out bg-win-face rounded-t px-2.5 py-1 text-[12px] font-bold dotted-focus select-none',
                selected ? 'relative top-px pb-1.5 z-20 font-black text-win-text bg-win-face' : 'text-win-shadow hover:text-win-text',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {currentContent ? (
        <div className="bevel-out bg-win-face -mt-px p-3">{currentContent}</div>
      ) : null}
    </div>
  )
}
