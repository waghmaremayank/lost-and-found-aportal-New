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
  CheckSquare,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroStatusBar,
  RetroTabs,
  RetroGroupBox,
} from '@/components/retro'
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
    <DesktopShell activeKey="notifications">
      <div className="flex flex-col gap-3">
        <RetroWindow
          title="LOST//98 Notification Subsystem"
          icon={<Bell className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <RetroTabs
                tabs={[
                  { key: 'ALL', label: `All (${notifications.length})` },
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
                ]}
                active={filter}
                onChange={(k) => setFilter(k as typeof filter)}
              />

              <div className="flex items-center gap-2">
                <RetroButton onClick={markAllRead} className="gap-1 text-[12px]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  Mark All Read
                </RetroButton>
                <RetroButton onClick={clearAll} className="gap-1 text-[12px]">
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Clear Log
                </RetroButton>
              </div>
            </div>

            {/* Notification Stream */}
            {filtered.length === 0 ? (
              <div className="bevel-in bg-win-white flex flex-col items-center justify-center gap-2 p-10 text-center">
                <Bell className="h-8 w-8 text-win-shadow" aria-hidden />
                <p className="font-pixel text-sm text-win-title">NO ACTIVE NOTIFICATIONS</p>
                <p className="text-[12px] text-win-shadow">
                  Your event stream is up to date. You will be alerted when matches or claims arrive.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filtered.map((n) => {
                  let Icon = Bell
                  let tone: 'yellow' | 'blue' | 'green' | 'neutral' = 'neutral'
                  let actionHref = '/search'

                  if (n.type === 'MATCH') {
                    Icon = Sparkles
                    tone = 'yellow'
                    actionHref = '/search/L98-2049'
                  } else if (n.type === 'MESSAGE') {
                    Icon = MessageSquare
                    tone = 'blue'
                    actionHref = '/messages'
                  } else if (n.type === 'SECURITY') {
                    Icon = ShieldCheck
                    tone = 'green'
                    actionHref = '/security'
                  }

                  return (
                    <div
                      key={n.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 transition-colors ${
                        !n.read ? 'bevel-out bg-win-face font-semibold' : 'bevel-groove bg-win-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`bevel-out grid h-8 w-8 shrink-0 place-items-center ${
                            tone === 'yellow'
                              ? 'bg-win-yellow text-win-title'
                              : tone === 'green'
                              ? 'bg-win-green text-win-white'
                              : 'bg-win-title text-win-white'
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-win-text">{n.title}</span>
                            {!n.read && (
                              <RetroBadge tone="yellow" className="text-[9px]">
                                NEW
                              </RetroBadge>
                            )}
                          </div>
                          <p className="text-[12px] text-win-shadow leading-relaxed">{n.message}</p>
                          <span className="font-mono-sys text-[10px] text-win-disabled">{n.at}</span>
                        </div>
                      </div>

                      <div className="shrink-0 self-end sm:self-center">
                        <Link href={actionHref}>
                          <RetroButton variant="primary" className="text-[12px]">
                            Open Item
                          </RetroButton>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="cnt" className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {filtered.length} alert{filtered.length === 1 ? '' : 's'} registered
                </span>,
                <RetroBadge key="sec" tone="green">
                  LISTENER ONLINE
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
