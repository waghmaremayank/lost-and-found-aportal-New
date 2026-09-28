'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  Users,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Activity,
  UserX,
  UserCheck,
  Lock,
  RotateCcw,
  CheckCircle2,
  Trash2,
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroTabs,
  RetroDialog,
} from '@/components/retro'
import {
  ADMIN_METRICS,
  ADMIN_USERS,
  SECURITY_EVENTS,
  ABUSE_REPORTS,
  type AdminUser,
  type SecurityEvent,
  type AbuseReport,
} from '@/lib/mock-data'

export default function AdminConsolePage() {
  const [tab, setTab] = useState<'users' | 'abuse' | 'events' | 'overview'>('overview')
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS)
  const [abuseReports, setAbuseReports] = useState<AbuseReport[]>(ABUSE_REPORTS)
  const [events, setEvents] = useState<SecurityEvent[]>(SECURITY_EVENTS)
  const [toast, setToast] = useState<string | null>(null)

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'ACTIVE' ? 'FLAGGED' : u.status === 'FLAGGED' ? 'SUSPENDED' : 'ACTIVE'
          return { ...u, status: nextStatus }
        }
        return u
      }),
    )
    setToast(`User ${userId} status toggled.`)
    setTimeout(() => setToast(null), 3000)
  }

  const handleResolveAbuse = (id: string) => {
    setAbuseReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'RESOLVED' } : r)),
    )
    setToast(`Abuse report ${id} marked as resolved.`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <DesktopShell activeKey="admin">
      <div className="flex flex-col gap-3">
        {/* Toast */}
        {toast && (
          <div className="bevel-out bg-win-yellow flex items-center justify-between p-2.5 text-[13px] font-bold text-win-text">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
              {toast}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-[11px] font-bold text-win-shadow hover:text-win-dark"
            >
              ✕
            </button>
          </div>
        )}

        <RetroWindow
          title="LOST//98 Administrative & Security Operations Console"
          icon={<ShieldAlert className="h-3.5 w-3.5 text-win-red" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Top Navigation Tabs */}
            <RetroTabs
              tabs={[
                { key: 'overview', label: 'System Overview' },
                { key: 'users', label: `User Directory (${users.length})` },
                { key: 'abuse', label: `Abuse Reports (${abuseReports.filter((a) => a.status !== 'RESOLVED').length} Open)` },
                { key: 'events', label: `Security Incidents (${events.length})` },
              ]}
              active={tab}
              onChange={(k) => setTab(k as typeof tab)}
            />

            {/* TAB: SYSTEM OVERVIEW */}
            {tab === 'overview' && (
              <div className="flex flex-col gap-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bevel-in bg-win-white p-3">
                    <p className="text-[11px] font-bold uppercase text-win-shadow">Active Reports</p>
                    <p className="font-pixel mt-1 text-2xl text-win-title">{ADMIN_METRICS.activeReports}</p>
                    <p className="mt-1 text-[11px] text-win-shadow">
                      {ADMIN_METRICS.lostReports} lost • {ADMIN_METRICS.foundReports} found
                    </p>
                  </div>

                  <div className="bevel-in bg-win-white p-3">
                    <p className="text-[11px] font-bold uppercase text-win-shadow">Resolved & Returned</p>
                    <p className="font-pixel mt-1 text-2xl text-win-green">{ADMIN_METRICS.resolvedCases}</p>
                    <p className="mt-1 text-[11px] text-win-green">98.2% accuracy</p>
                  </div>

                  <div className="bevel-in bg-win-white p-3">
                    <p className="text-[11px] font-bold uppercase text-win-shadow">Pending Claims</p>
                    <p className="font-pixel mt-1 text-2xl text-win-title">{ADMIN_METRICS.pendingClaims}</p>
                    <p className="mt-1 text-[11px] text-win-shadow">Awaiting quiz answers</p>
                  </div>

                  <div className="bevel-in bg-win-white p-3">
                    <p className="text-[11px] font-bold uppercase text-win-shadow">Security Threat Level</p>
                    <p className="font-pixel mt-1 text-2xl text-win-red">ELEVATED</p>
                    <p className="mt-1 text-[11px] text-win-red">
                      {ADMIN_METRICS.flaggedUsers} flagged users • {ADMIN_METRICS.securityEvents} events
                    </p>
                  </div>
                </div>

                <RetroGroupBox legend="Automated Protection Engine Status">
                  <div className="grid gap-2 text-[12px] sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
                      <span>PostgreSQL Row Level Security: <strong>ACTIVE</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
                      <span>Spam / Flood Rate Limiting: <strong>ENFORCING (10 req/min)</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
                      <span>Malware / MIME Upload Filter: <strong>STRICT</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
                      <span>Secret Identifiers Encryption: <strong>AES-256-GCM</strong></span>
                    </div>
                  </div>
                </RetroGroupBox>
              </div>
            )}

            {/* TAB: USERS DIRECTORY */}
            {tab === 'users' && (
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-2">User ID</th>
                      <th className="px-2 py-2">Display Name</th>
                      <th className="px-2 py-2">Email</th>
                      <th className="px-2 py-2">Role</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Reports</th>
                      <th className="px-2 py-2">Joined</th>
                      <th className="px-2 py-2 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light font-mono-sys">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-win-title/10">
                        <td className="px-2 py-2 font-bold text-win-title">#{u.id}</td>
                        <td className="px-2 py-2 font-bold font-sans">{u.displayName}</td>
                        <td className="px-2 py-2 text-win-shadow">{u.email}</td>
                        <td className="px-2 py-2">
                          <RetroBadge tone={u.role === 'ADMIN' ? 'red' : u.role === 'MODERATOR' ? 'blue' : 'neutral'}>
                            {u.role}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-2">
                          <RetroBadge tone={u.status === 'ACTIVE' ? 'green' : u.status === 'FLAGGED' ? 'yellow' : 'red'}>
                            {u.status}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-2 text-center">{u.reports}</td>
                        <td className="px-2 py-2 text-win-shadow">{u.joined}</td>
                        <td className="px-2 py-2 text-right font-sans">
                          <RetroButton
                            onClick={() => handleToggleStatus(u.id)}
                            className="px-2 py-0.5 text-[11px]"
                          >
                            {u.status === 'ACTIVE' ? 'Flag' : u.status === 'FLAGGED' ? 'Suspend' : 'Unsuspend'}
                          </RetroButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB: ABUSE REPORTS */}
            {tab === 'abuse' && (
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-2">Ticket</th>
                      <th className="px-2 py-2">Reported Target</th>
                      <th className="px-2 py-2">Reason</th>
                      <th className="px-2 py-2">Reported By</th>
                      <th className="px-2 py-2">Date</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light">
                    {abuseReports.map((a) => (
                      <tr key={a.id} className="hover:bg-win-title/10">
                        <td className="font-mono-sys px-2 py-2 font-bold text-win-title">#{a.id}</td>
                        <td className="px-2 py-2 font-bold">{a.target}</td>
                        <td className="px-2 py-2 text-win-red font-medium">{a.reason}</td>
                        <td className="px-2 py-2 text-win-shadow">{a.reportedBy}</td>
                        <td className="px-2 py-2 text-win-shadow">{a.at}</td>
                        <td className="px-2 py-2">
                          <RetroBadge tone={a.status === 'OPEN' ? 'red' : a.status === 'REVIEWING' ? 'yellow' : 'green'}>
                            {a.status}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-2 text-right">
                          {a.status !== 'RESOLVED' ? (
                            <RetroButton
                              onClick={() => handleResolveAbuse(a.id)}
                              variant="primary"
                              className="px-2 py-0.5 text-[11px]"
                            >
                              Resolve Ticket
                            </RetroButton>
                          ) : (
                            <span className="text-[11px] text-win-shadow">Resolved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB: SECURITY EVENTS */}
            {tab === 'events' && (
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-2">Event ID</th>
                      <th className="px-2 py-2">Security Description</th>
                      <th className="px-2 py-2">Risk</th>
                      <th className="px-2 py-2">Actor / User</th>
                      <th className="px-2 py-2">Automated Action Taken</th>
                      <th className="px-2 py-2">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light font-mono-sys">
                    {events.map((e) => (
                      <tr key={e.id} className="hover:bg-win-title/10">
                        <td className="px-2 py-2 font-bold text-win-title">#{e.id}</td>
                        <td className="px-2 py-2 font-sans font-bold">{e.event}</td>
                        <td className="px-2 py-2">
                          <RetroBadge tone={e.risk === 'HIGH' ? 'red' : e.risk === 'MEDIUM' ? 'yellow' : 'blue'}>
                            {e.risk} RISK
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-2 text-win-shadow">{e.user}</td>
                        <td className="px-2 py-2 font-sans text-win-green">{e.action}</td>
                        <td className="px-2 py-2 text-win-shadow">{e.at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="role" className="font-mono-sys font-bold text-win-red">
                  ADMIN STATION: ROOT ACCESS
                </span>,
                <RetroBadge key="sec" tone="green">
                  AUDIT LOGGING ON
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
