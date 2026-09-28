'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ModernNavbar } from '@/components/modern/navbar'
import { ModernFooter } from '@/components/modern/footer'
import { ChevronRight, Home } from 'lucide-react'

export function ModernShell({
  children,
  activeKey,
  title,
  subtitle,
  badge,
  action,
}: {
  children: ReactNode
  activeKey?: string
  title?: string
  subtitle?: string
  badge?: string
  action?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      <ModernNavbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Optional Page Header */}
          {title && (
            <div className="mb-8 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mb-2">
                  <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                    <Home className="h-3 w-3" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="h-3 w-3 text-zinc-600" />
                  <span className="text-zinc-200 capitalize">{activeKey || title}</span>
                </div>

                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-['var(--font-heading)']">
                    {title}
                  </h1>
                  {badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {badge}
                    </span>
                  )}
                </div>

                {subtitle && (
                  <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {action && <div className="shrink-0">{action}</div>}
            </div>
          )}

          {/* Main Body Content */}
          <div className="min-w-0">{children}</div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}
