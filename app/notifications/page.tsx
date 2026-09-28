'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { NOTIFICATIONS, type Notification } from '@/lib/mock-data'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS)
  const [filter, setFilter] = useState<'ALL' | 'MATCH' | 'MESSAGE' | 'SECURITY'>('ALL')

  const filtered = notifications.filter((n) => {
    if (filter === 'ALL') return true
    return n.type === filter
  })

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <ModernShell
      activeKey="notifications"
      title="Alerts &amp; Notifications"
      subtitle="Live feed for AI similarity matches, safe messages, and security verifications."
      badge="LIVE STREAM"
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={markAllRead}
            className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark all read
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Category Filters */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#12131d] border border-white/10 overflow-x-auto scrollbar-none">
          {[
            { key: 'ALL', label: `All Alerts (${notifications.length})` },
            {
              key: 'MATCH',
              label: `Matches (${notifications.filter((n) => n.type === 'MATCH').length})`,
            },
            {
              key: 'MESSAGE',
              label: `Messages (${notifications.filter((n) => n.type === 'MESSAGE').length})`,
            },
            {
              key: 'SECURITY',
              label: `Security (${notifications.filter((n) => n.type === 'SECURITY').length})`,
            },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key as typeof filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === t.key
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Notification Stream */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#12131d]/50 border border-white/10 backdrop-blur-xl">
            <Bell className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No active notifications</h3>
            <p className="text-xs text-zinc-400 mt-1">You are all caught up on matches and messages.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((n) => {
              let Icon = Bell
              let colorClass = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
              let actionHref = '/search'

              if (n.type === 'MATCH') {
                Icon = Sparkles
                colorClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                actionHref = '/search/L98-2049'
              } else if (n.type === 'MESSAGE') {
                Icon = MessageSquare
                colorClass = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                actionHref = '/messages'
              } else if (n.type === 'SECURITY') {
                Icon = ShieldCheck
                colorClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                actionHref = '/security'
              }

              return (
                <div
                  key={n.id}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    !n.read
                      ? 'bg-[#12131d]/90 border-indigo-500/40 shadow-lg shadow-indigo-500/5'
                      : 'bg-[#12131d]/50 border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`h-10 w-10 rounded-2xl border flex items-center justify-center shrink-0 ${colorClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white">{n.title}</h4>
                        {!n.read && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] font-mono text-zinc-500 mt-1 block">{n.at}</span>
                    </div>
                  </div>

                  <Link
                    href={actionHref}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 shrink-0 self-end sm:self-center transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </ModernShell>
  )
}
