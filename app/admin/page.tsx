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
  ExternalLink,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
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
  const [tab, setTab] = useState<'overview' | 'users' | 'abuse' | 'events'>('overview')
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
    setToast(`User ${userId} moderation status updated.`)
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
    <ModernShell
      activeKey="admin"
      title="Admin &amp; Security Operations"
      subtitle="Moderator dashboard for user access, dispute arbitration, and automated threat defense."
      badge="STAFF LEVEL 3"
    >
      <div className="flex flex-col gap-6">
        {/* Toast */}
        {toast && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-xl animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {toast}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#12131d] border border-white/10 overflow-x-auto scrollbar-none">
          {[
            { key: 'overview', label: 'System Health' },
            { key: 'users', label: `Users (${users.length})` },
            {
              key: 'abuse',
              label: `Disputes (${abuseReports.filter((a) => a.status !== 'RESOLVED').length} Open)`,
            },
            { key: 'events', label: `Security Incidents (${events.length})` },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                tab === t.key
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB: SYSTEM OVERVIEW */}
        {tab === 'overview' && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-5 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Active Inventory</span>
                <div className="text-3xl font-extrabold text-white mt-1 font-['var(--font-heading)']">
                  {ADMIN_METRICS.activeReports}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {ADMIN_METRICS.lostReports} lost • {ADMIN_METRICS.foundReports} found
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Recovered &amp; Closed</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-['var(--font-heading)']">
                  {ADMIN_METRICS.resolvedCases}
                </div>
                <p className="text-[11px] text-emerald-400/80 mt-1">98.4% Return Accuracy</p>
              </div>

              <div className="p-5 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Pending Claims</span>
                <div className="text-3xl font-extrabold text-amber-400 mt-1 font-['var(--font-heading)']">
                  {ADMIN_METRICS.pendingClaims}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">Awaiting ownership review</p>
              </div>

              <div className="p-5 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl">
                <span className="text-[10px] uppercase font-mono text-zinc-500 font-semibold">Security Guard</span>
                <div className="text-3xl font-extrabold text-indigo-400 mt-1 font-['var(--font-heading)']">
                  OPTIMAL
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {ADMIN_METRICS.flaggedUsers} flagged • {ADMIN_METRICS.securityEvents} incidents
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white font-['var(--font-heading)']">
                Automated Defense Guardrail Engines
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-300">
                    Row-Level Access Security: <strong className="text-white">ENFORCED</strong>
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-300">
                    Rate Limiter: <strong className="text-white">10 REQ/MIN ACTIVE</strong>
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-300">
                    Secret Verification Vault: <strong className="text-white">AES-256-GCM</strong>
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-zinc-300">
                    MIME Image Security Filter: <strong className="text-white">ACTIVE</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: USERS DIRECTORY */}
        {tab === 'users' && (
          <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-500">
                  <th className="pb-3">User ID</th>
                  <th className="pb-3">Display Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Reports</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono text-indigo-400 font-bold">#{u.id}</td>
                    <td className="py-3.5 font-semibold text-white">{u.displayName}</td>
                    <td className="py-3.5 text-zinc-500 font-mono text-[11px]">{u.email}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-zinc-300">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : u.status === 'FLAGGED'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400">{u.reports}</td>
                    <td className="py-3.5 text-zinc-500">{u.joined}</td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u.id)}
                        className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      >
                        {u.status === 'ACTIVE' ? 'Flag' : u.status === 'FLAGGED' ? 'Suspend' : 'Unsuspend'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: ABUSE REPORTS */}
        {tab === 'abuse' && (
          <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-500">
                  <th className="pb-3">Ticket</th>
                  <th className="pb-3">Target</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Reported By</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {abuseReports.map((a) => (
                  <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono text-indigo-400 font-bold">#{a.id}</td>
                    <td className="py-3.5 font-semibold text-white">{a.target}</td>
                    <td className="py-3.5 text-rose-400 font-medium">{a.reason}</td>
                    <td className="py-3.5 text-zinc-400">{a.reportedBy}</td>
                    <td className="py-3.5 text-zinc-500 font-mono text-[11px]">{a.at}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'OPEN'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : a.status === 'REVIEWING'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {a.status !== 'RESOLVED' ? (
                        <button
                          type="button"
                          onClick={() => handleResolveAbuse(a.id)}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
                        >
                          Resolve
                        </button>
                      ) : (
                        <span className="text-zinc-500 text-xs">Resolved</span>
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
          <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-500">
                  <th className="pb-3">Event ID</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Risk Level</th>
                  <th className="pb-3">Actor</th>
                  <th className="pb-3">Defense Action</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono text-indigo-400 font-bold">#{e.id}</td>
                    <td className="py-3.5 font-semibold text-white">{e.event}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          e.risk === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : e.risk === 'MEDIUM'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {e.risk} RISK
                      </span>
                    </td>
                    <td className="py-3.5 text-zinc-400 font-mono text-[11px]">{e.user}</td>
                    <td className="py-3.5 text-emerald-400 font-medium">{e.action}</td>
                    <td className="py-3.5 text-zinc-500 font-mono text-[11px]">{e.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ModernShell>
  )
}
