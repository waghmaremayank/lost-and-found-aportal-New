'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

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
      <div className="bevel-out bg-win-face flex items-center justify-between p-1.5 text-[12px] text-win-shadow select-none">
        <div className="flex items-center gap-2">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <span className="font-bold text-win-text">Window Closed: {title}</span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="bevel-out bg-win-face px-2 py-0.5 text-[11px] font-bold text-win-title active:bevel-in"
          >
            Re-open Window
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bevel-out bg-win-face px-2 py-0.5 text-[11px] text-win-text active:bevel-in"
          >
            Go to Desktop
          </button>
        </div>
      </div>
    )
  }

  return (
    <section
      className={cn(
        'bevel-out bg-win-face text-win-text transition-all duration-150',
        maximized && 'fixed inset-3 z-50 overflow-y-auto shadow-2xl flex flex-col',
        className,
      )}
      style={{ padding: 3 }}
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
          <div className={cn('p-3', maximized && 'flex-1 overflow-y-auto', bodyClassName)}>
            {children}
          </div>
          {footer ? <div className="px-1 pb-1">{footer}</div> : null}
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
    <div
      className="flex items-center gap-2 px-1 py-0.5 text-win-title-text select-none cursor-default"
      style={{
        background: 'linear-gradient(90deg, var(--color-win-title) 0%, var(--color-win-title-2) 100%)',
      }}
    >
      {icon ? <span className="shrink-0 leading-none">{icon}</span> : null}
      <span className="truncate text-[13px] font-bold tracking-wide">{title}</span>
      <div className="ml-auto flex items-center gap-0.5">
        {controls.includes('minimize') && (
          <TitleButton label="Minimize" glyph="_" onClick={onMinimize} />
        )}
        {controls.includes('maximize') && (
          <TitleButton
            label={isMaximized ? 'Restore' : 'Maximize'}
            glyph={isMaximized ? '❐' : '□'}
            onClick={onMaximize}
          />
        )}
        {controls.includes('close') && (
          <TitleButton label="Close" glyph="✕" onClick={onClose} />
        )}
      </div>
    </div>
  )
}

function TitleButton({
  label,
  glyph,
  onClick,
}: {
  label: string
  glyph: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className="bevel-out bg-win-face grid h-4 w-4 place-items-center text-[10px] font-bold leading-none text-win-text active:bevel-in cursor-pointer hover:bg-win-face-light"
    >
      <span aria-hidden>{glyph}</span>
    </button>
  )
}
