'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function RetroDesktopIcon({
  label,
  icon,
  href,
  className,
}: {
  label: string
  icon: ReactNode
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex w-20 flex-col items-center gap-1 p-1 text-center dotted-focus',
        className,
      )}
    >
      <span className="grid h-10 w-10 place-items-center text-win-title-text">{icon}</span>
      <span className="px-1 text-[12px] leading-tight text-win-white group-hover:bg-win-title group-focus-visible:bg-win-title">
        {label}
      </span>
    </Link>
  )
}

/** A small beveled tile used as a retro "bitmap" icon container. */
export function RetroIconTile({
  icon,
  tone = 'face',
  className,
}: {
  icon: ReactNode
  tone?: 'face' | 'white' | 'blue'
  className?: string
}) {
  return (
    <span
      className={cn(
        'bevel-out grid place-items-center',
        tone === 'face' && 'bg-win-face text-win-text',
        tone === 'white' && 'bg-win-white text-win-title',
        tone === 'blue' && 'bg-win-title text-win-title-text',
        className,
      )}
    >
      {icon}
    </span>
  )
}
