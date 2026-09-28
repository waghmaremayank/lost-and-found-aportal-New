'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Minus, Square, X, Maximize2, Minimize2 } from 'lucide-react'

type WindowControl = 'minimize' | 'maximize' | 'close'

export function RetroWindow({
  title,
  icon,
  controls = ['minimize', 'maximize', 'close'],
  className,
  bodyClassName,
  children,
  footer,
  onClose,
  onMinimize,
  onMaximize,
  defaultClosed = false,
}: {
  title: ReactNode
  icon?: ReactNode
  controls?: WindowControl[]
  className?: string
  bodyClassName?: string
  children: ReactNode
  footer?: ReactNode
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  defaultClosed?: boolean
}) {
  const router = useRouter()
  const [closed, setClosed] = useState(defaultClosed)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      setClosed(true)
    }
  }

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize()
    } else {
      setMinimized((v) => !v)
    }
  }

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize()
    } else {
      setMaximized((v) => !v)
    }
  }

  if (closed) {
    return (
      <div className="rounded-2xl bg-[#12131d]/60 border border-white/10 flex items-center justify-between p-3 text-xs text-zinc-400 select-none backdrop-blur-xl">
        <div className="flex items-center gap-2">
          {icon ? <span className="shrink-0 text-indigo-400">{icon}</span> : null}
          <span className="font-semibold text-zinc-200">Closed Card: {title}</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors"
          >
            Re-open
          </button>
        </div>
      </div>
    )
  }

  return (
    <section
      className={cn(
        'rounded-3xl bg-[#12131d]/80 border border-white/10 text-zinc-100 backdrop-blur-2xl transition-all duration-300 shadow-2xl overflow-hidden',
        maximized && 'fixed inset-4 z-50 overflow-y-auto shadow-2xl flex flex-col',
        className,
      )}
    >
      <RetroTitleBar
        title={title}
        icon={icon}
        controls={controls}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        isMaximized={maximized}
      />
      {!minimized ? (
        <>
          <div className={cn('p-4 sm:p-6', maximized && 'flex-1 overflow-y-auto', bodyClassName)}>
            {children}
          </div>
          {footer ? <div className="px-6 pb-4">{footer}</div> : null}
        </>
      ) : null}
    </section>
  )
}

export function RetroTitleBar({
  title,
  icon,
  controls = ['minimize', 'maximize', 'close'],
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: {
  title: ReactNode
  icon?: ReactNode
  controls?: WindowControl[]
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isMaximized?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02] select-none">
      <div className="flex items-center gap-2.5 min-w-0">
        {icon ? <span className="shrink-0 text-indigo-400 leading-none">{icon}</span> : null}
        <span className="truncate text-xs sm:text-sm font-bold tracking-tight text-white font-['var(--font-heading)']">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-4">
        {controls.includes('minimize') && (
          <button
            type="button"
            aria-label="Minimize"
            onClick={onMinimize}
            className="h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
        )}
        {controls.includes('maximize') && (
          <button
            type="button"
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            onClick={onMaximize}
            className="h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            {isMaximized ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </button>
        )}
        {controls.includes('close') && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="h-6 w-6 rounded-full bg-white/5 hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-300 border border-white/10 flex items-center justify-center text-zinc-400 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
