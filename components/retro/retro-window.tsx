import type { ReactNode } from 'react'
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
}: {
  title: ReactNode
  icon?: ReactNode
  controls?: WindowControl[]
  className?: string
  bodyClassName?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <section
      className={cn('bevel-out bg-win-face text-win-text', className)}
      style={{ padding: 3 }}
    >
      <RetroTitleBar title={title} icon={icon} controls={controls} />
      <div className={cn('p-3', bodyClassName)}>{children}</div>
      {footer ? <div className="px-1 pb-1">{footer}</div> : null}
    </section>
  )
}

export function RetroTitleBar({
  title,
  icon,
  controls = ['minimize', 'maximize', 'close'],
}: {
  title: ReactNode
  icon?: ReactNode
  controls?: WindowControl[]
}) {
  return (
    <div
      className="flex items-center gap-2 px-1 py-0.5 text-win-title-text select-none"
      style={{
        background: 'linear-gradient(90deg, var(--color-win-title) 0%, var(--color-win-title-2) 100%)',
      }}
    >
      {icon ? <span className="shrink-0 leading-none">{icon}</span> : null}
      <span className="truncate text-[13px] font-bold tracking-wide">{title}</span>
      <div className="ml-auto flex items-center gap-0.5">
        {controls.includes('minimize') && <TitleButton label="Minimize" glyph="_" />}
        {controls.includes('maximize') && <TitleButton label="Maximize" glyph="□" />}
        {controls.includes('close') && <TitleButton label="Close" glyph="✕" />}
      </div>
    </div>
  )
}

function TitleButton({ label, glyph }: { label: string; glyph: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="bevel-out bg-win-face grid h-4 w-4 place-items-center text-[10px] font-bold leading-none text-win-text active:bevel-in"
    >
      <span aria-hidden>{glyph}</span>
    </button>
  )
}
