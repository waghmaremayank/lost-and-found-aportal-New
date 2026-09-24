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
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

export const RetroButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'primary' }
>(function RetroButton({ className, variant = 'default', children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        'bevel-out bg-win-face relative min-h-[28px] min-w-[72px] px-3 py-1 text-[13px] font-bold text-win-text',
        'active:bevel-in active:pt-[5px] disabled:text-win-disabled disabled:cursor-not-allowed dotted-focus',
        variant === 'primary' && 'font-black',
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
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-bold">
        {label}
        {required ? <span className="text-win-red"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-[11px] text-win-shadow">{hint}</p> : null}
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
          'bevel-field bg-win-white px-2 py-1 text-[13px] text-win-text placeholder:text-win-shadow',
          'focus:outline-none focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-win-dark',
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
          'bevel-field retro-scroll bg-win-white px-2 py-1 text-[13px] text-win-text placeholder:text-win-shadow',
          'focus:outline-none focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-win-dark',
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
          'bevel-out bg-win-face px-2 py-1 text-[13px] text-win-text dotted-focus',
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
    <label htmlFor={props.id ?? id} className={cn('flex items-center gap-2 text-[13px]', className)}>
      <input
        id={props.id ?? id}
        type="checkbox"
        className="bevel-field h-4 w-4 shrink-0 appearance-none bg-win-white checked:bg-win-white relative
          checked:after:absolute checked:after:inset-0 checked:after:grid checked:after:place-items-center
          checked:after:text-[11px] checked:after:font-black checked:after:leading-none checked:after:content-['x']"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

const badgeTones: Record<string, string> = {
  neutral: 'bg-win-face text-win-text',
  green: 'bg-win-green text-win-white',
  red: 'bg-win-red text-win-white',
  blue: 'bg-win-title text-win-title-text',
  yellow: 'bg-win-yellow text-win-text',
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
        'bevel-out inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Group box                                                                  */
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
    <fieldset className={cn('bevel-groove p-3 pt-2', className)}>
      <legend className="px-1 text-[13px] font-bold">{legend}</legend>
      {children}
    </fieldset>
  )
}

/* -------------------------------------------------------------------------- */
/* Status bar                                                                 */
/* -------------------------------------------------------------------------- */

export function RetroStatusBar({ segments }: { segments: ReactNode[] }) {
  return (
    <div className="mt-2 flex items-stretch gap-0.5">
      {segments.map((seg, i) => (
        <div
          key={i}
          className={cn(
            'bevel-groove min-h-[22px] px-2 py-0.5 text-[12px] flex items-center gap-1',
            i === 0 ? 'flex-1' : 'shrink-0',
          )}
        >
          {seg}
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Progress bar (segmented)                                                   */
/* -------------------------------------------------------------------------- */

export function RetroProgressBar({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value))
  const blocks = Math.round((clamped / 100) * 20)
  return (
    <div
      className={cn('bevel-field bg-win-white flex items-center gap-0.5 p-1', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className={cn('h-3 flex-1', i < blocks ? 'bg-win-title' : 'bg-transparent')}
          aria-hidden
        />
      ))}
    </div>
  )
}
