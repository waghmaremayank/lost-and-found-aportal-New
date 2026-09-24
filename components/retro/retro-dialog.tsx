'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { RetroButton } from './retro-controls'
import { RetroTitleBar } from './retro-window'

export function RetroDialog({
  open,
  title,
  icon,
  children,
  onClose,
  className,
}: {
  open: boolean
  title: ReactNode
  icon?: ReactNode
  children: ReactNode
  onClose?: () => void
  className?: string
}) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className={cn('bevel-out bg-win-face w-full max-w-md', className)} style={{ padding: 3 }}>
        <RetroTitleBar title={title} icon={icon} controls={['close']} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

/** Icon + message + actions convenience layout for message-box style dialogs. */
export function RetroMessageBox({
  glyph,
  children,
  actions,
}: {
  glyph?: ReactNode
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        {glyph ? <div className="shrink-0 text-2xl leading-none">{glyph}</div> : null}
        <div className="text-[13px] leading-relaxed">{children}</div>
      </div>
      {actions ? <div className="flex justify-center gap-2">{actions}</div> : null}
    </div>
  )
}

export { RetroButton }
