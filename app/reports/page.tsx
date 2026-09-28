'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PackageSearch,
  FilePlus2,
  MapPin,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Printer,
  Search,
  ExternalLink,
  ShieldCheck,
  FolderOpen,
  CheckSquare,
  AlertCircle,
  X,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { MY_REPORTS, ITEMS, type UserReport, type ReportStatus } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export default function MyReportsPage() {
  const [reports, setReports] = useState<UserReport[]>(MY_REPORTS)
  const [tab, setTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [printModalReport, setPrintModalReport] = useState<UserReport | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const filteredReports = reports.filter((r) => {
    if (tab === 'lost' && r.type !== 'LOST') return false
    if (tab === 'found' && r.type !== 'FOUND') return false
    if (tab === 'resolved' && r.status !== 'RESOLVED' && r.status !== 'CLOSED') return false
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false
    return true
  })

  const handleResolve = (id: string) => {
    setReports((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'RESOLVED' as ReportStatus } : item)),
    )
    setToastMessage(`Case #${id} marked as RESOLVED & item confirmed returned!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <ModernShell
      activeKey="reports"
      title="My Reports Directory"
      subtitle="Track your active lost cases, submitted found property, and AI similarity match status."
      badge="USER U-2048"
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/lost"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-colors"
          >
            + Report Lost
          </Link>
          <Link
            href="/found"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-colors"
          >
            + Report Found
          </Link>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between backdrop-blur-xl animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Printable Summary Modal */}
        {printModalReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setPrintModalReport(null)}
                aria-label="Close summary modal"
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="border-b border-white/10 pb-3 text-center">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase">CAMPUS LOST &amp; FOUND RECORD</span>
                <h3 className="text-lg font-bold text-white mt-1">Official Case Receipt</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-zinc-500 block text-[10px] font-mono">REPORT ID</span>
                  <strong className="text-white">#{printModalReport.id}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-zinc-500 block text-[10px] font-mono">TYPE</span>
                  <strong className="text-white">{printModalReport.type}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-zinc-500 block text-[10px] font-mono">ITEM</span>
                  <strong className="text-white">{printModalReport.title}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03]">
                  <span className="text-zinc-500 block text-[10px] font-mono">LOCATION</span>
                  <strong className="text-white">{printModalReport.generalLocation}</strong>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-white/[0.03] text-xs text-zinc-300">
                <span className="text-zinc-500 block text-[10px] font-mono mb-1">DESCRIPTION</span>
                {printModalReport.description}
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPrintModalReport(null)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Directory Card */}
        <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#090a0f] border border-white/10">
              {[
                { key: 'all', label: `All Reports (${reports.length})` },
                { key: 'lost', label: `Lost (${reports.filter((r) => r.type === 'LOST').length})` },
                { key: 'found', label: `Found (${reports.filter((r) => r.type === 'FOUND').length})` },
                {
                  key: 'resolved',
                  label: `Resolved (${reports.filter((r) => r.status === 'RESOLVED').length})`,
                },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    tab === t.key
                      ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {(['ALL', 'ACTIVE', 'MATCHED', 'CLAIMED', 'RESOLVED'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    statusFilter === st
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {filteredReports.length === 0 ? (
            <div className="py-12 text-center">
              <FolderOpen className="h-10 w-10 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No reports in this category</p>
              <p className="text-xs text-zinc-400 mt-1">Try selecting another filter or report a new item.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-500">
                    <th className="pb-3 font-semibold">Report ID</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Item Title</th>
                    <th className="pb-3 font-semibold">Location</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Matches</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredReports.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-mono font-bold text-indigo-400">#{item.id}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            item.type === 'LOST'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-white">{item.title}</div>
                        <div className="text-[11px] text-zinc-500">{item.category}</div>
                      </td>
                      <td className="py-3.5 text-zinc-400">{item.generalLocation}</td>
                      <td className="py-3.5 text-zinc-500 font-mono text-[11px]">{item.dateOccurred}</td>
                      <td className="py-3.5">
                        <ItemStatusBadge status={item.status} />
                      </td>
                      <td className="py-3.5">
                        {item.possibleMatches > 0 ? (
                          <Link
                            href={`/search?q=${encodeURIComponent(item.title)}`}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25 transition-colors"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>{item.possibleMatches} Match</span>
                          </Link>
                        ) : (
                          <span className="text-[11px] text-zinc-600">0 detected</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/search/${item.id}`}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                          >
                            View
                          </Link>
                          <button
                            type="button"
                            onClick={() => setPrintModalReport(item)}
                            aria-label="Print report summary"
                            className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
                          >
                            <Printer className="h-3.5 w-3.5" />
                          </button>
                          {item.status !== 'RESOLVED' && item.status !== 'CLOSED' && (
                            <button
                              type="button"
                              onClick={() => handleResolve(item.id)}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-colors"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ModernShell>
  )
}
