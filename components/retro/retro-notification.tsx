'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { X, Sparkles } from 'lucide-react'
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
    <div
      className={cn(
        'w-[300px] rounded-2xl bg-[#12131d]/90 border border-indigo-500/30 text-white p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-300',
        className,
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          {icon ? <span className="shrink-0 text-indigo-400">{icon}</span> : <Sparkles className="h-3.5 w-3.5 text-indigo-400" />}
          <span className="truncate text-xs font-bold text-white font-['var(--font-heading)']">{title}</span>
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => setOpen(false)}
          className="h-5 w-5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="py-2.5 text-xs text-zinc-300 leading-relaxed">{children}</div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  )
}

export { RetroTitleBar }
