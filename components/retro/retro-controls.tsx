'use client'

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Modern Button                                                              */
/* -------------------------------------------------------------------------- */

export const RetroButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' }
>(function RetroButton({ className, variant = 'default', children, ...props }, ref) {
  const variantStyles = {
    default:
      'bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border-white/10 hover:border-white/20 active:scale-95',
    primary:
      'bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-lg shadow-white/10 active:scale-95',
    secondary:
      'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/50 active:scale-95',
    danger:
      'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border-rose-500/30 active:scale-95',
    success:
      'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30 active:scale-95',
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
        variantStyles[variant as keyof typeof variantStyles] || variantStyles.default,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

/* -------------------------------------------------------------------------- */
/* Field wrapper                                                              */
/* -------------------------------------------------------------------------- */

export function RetroField({
  label,
  htmlFor,
  hint,
  required,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  hint?: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-xs font-semibold text-zinc-300">
        {label}
        {required ? <span className="text-rose-400"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-[11px] text-zinc-500 leading-normal">{hint}</p> : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Input / Textarea / Select                                                  */
/* -------------------------------------------------------------------------- */

export const RetroInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function RetroInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-3.5 py-2 rounded-xl text-xs bg-[#10111a] border border-white/10 text-white placeholder:text-zinc-600',
          'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200',
          className,
        )}
        {...props}
      />
    )
  },
)

export const RetroTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function RetroTextarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-3.5 py-2 rounded-xl text-xs bg-[#10111a] border border-white/10 text-white placeholder:text-zinc-600',
          'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200',
          className,
        )}
        {...props}
      />
    )
  },
)

export const RetroSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function RetroSelect({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full px-3.5 py-2 rounded-xl text-xs bg-[#10111a] border border-white/10 text-white',
          'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
  },
)

/* -------------------------------------------------------------------------- */
/* Checkbox / Radio                                                           */
/* -------------------------------------------------------------------------- */

export function RetroCheckbox({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }) {
  const id = useId()
  return (
    <label htmlFor={props.id ?? id} className={cn('flex items-start gap-2.5 text-xs text-zinc-300 cursor-pointer select-none', className)}>
      <input
        id={props.id ?? id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded bg-[#10111a] border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
        {...props}
      />
      <span className="leading-tight">{label}</span>
    </label>
  )
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

const badgeTones: Record<string, string> = {
  neutral: 'bg-white/5 text-zinc-300 border-white/10',
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  red: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  blue: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  yellow: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
}

export function RetroBadge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: keyof typeof badgeTones
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
        badgeTones[tone] || badgeTones.neutral,
        className,
      )}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Group box / Card section                                                   */
/* -------------------------------------------------------------------------- */

export function RetroGroupBox({
  legend,
  children,
  className,
}: {
  legend: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl bg-[#10111a]/70 border border-white/10 p-4', className)}>
      <div className="text-xs font-bold text-white uppercase tracking-wider mb-3 pb-2 border-b border-white/5">
        {legend}
      </div>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Status bar                                                                 */
/* -------------------------------------------------------------------------- */

export function RetroStatusBar({ segments }: { segments: ReactNode[] }) {
  return (
    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
      {segments.map((seg, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {seg}
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Progress bar                                                               */
/* -------------------------------------------------------------------------- */

export function RetroProgressBar({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn('w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
