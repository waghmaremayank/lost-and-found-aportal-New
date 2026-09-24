'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RetroTitleBar } from './retro-window'

export function RetroNotification({
  title,
  icon,
  children,
  action,
  className,
}: {
  title: ReactNode
  icon?: ReactNode
  children: ReactNode
  action?: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className={cn('bevel-out bg-win-face w-[260px]', className)} style={{ padding: 3 }}>
      <div
        className="flex items-center gap-2 px-1 py-0.5 text-win-title-text"
        style={{
          background:
            'linear-gradient(90deg, var(--color-win-title) 0%, var(--color-win-title-2) 100%)',
        }}
      >
        {icon ? <span className="shrink-0 leading-none">{icon}</span> : null}
        <span className="truncate text-[12px] font-bold">{title}</span>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => setOpen(false)}
          className="bevel-out ml-auto grid h-4 w-4 place-items-center bg-win-face text-[10px] font-bold text-win-text active:bevel-in"
        >
          <span aria-hidden>✕</span>
        </button>
      </div>
      <div className="p-2 text-[12px] leading-relaxed">{children}</div>
      {action ? <div className="px-2 pb-2">{action}</div> : null}
    </div>
  )
}

export { RetroTitleBar }
