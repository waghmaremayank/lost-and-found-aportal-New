'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Trash2,
  RotateCcw,
  Archive,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Clock,
  ShieldCheck,
  FolderArchive,
  ExternalLink,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { ITEMS, type Item } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export default function RecycleBinPage() {
  const [archivedItems, setArchivedItems] = useState<Item[]>(
    ITEMS.filter((i) => i.status === 'RESOLVED' || i.status === 'CLOSED'),
  )
  const [emptyModalOpen, setEmptyModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleRestore = (id: string) => {
    setArchivedItems((prev) => prev.filter((i) => i.id !== id))
    setToast(`Case #${id} successfully reopened and returned to Active Index.`)
    setTimeout(() => setToast(null), 3500)
  }

  const handleEmpty = () => {
    setArchivedItems([])
    setEmptyModalOpen(false)
    setToast('Recycle storage purged. Resolved logs backed up to cryptographic cold archive.')
    setTimeout(() => setToast(null), 3500)
  }

  const filteredItems = archivedItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.generalLocation.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <ModernShell activeKey="recycle">
      <div className="flex flex-col gap-6">
        {/* Toast Alert */}
        {toast && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md text-sm font-medium text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden />
              {toast}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 text-emerald-400/70 hover:bg-emerald-500/20 hover:text-emerald-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal: Confirm Empty */}
        {emptyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f111a] p-6 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-rose-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Purge Case Archive</h3>
                  <p className="text-xs text-white/50">Permanent cryptographic deletion</p>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Are you sure you want to permanently purge these{' '}
                <span className="font-bold text-white">{archivedItems.length} resolved records</span> from local
                storage? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEmptyModalOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEmpty}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 hover:bg-rose-500 transition-all"
                >
                  Yes, Purge Archive
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header & Metric Bento */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-400">
                <FolderArchive className="h-4 w-4" />
                <span>Cold Storage Archive</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Case Resolution & Recycle Bin
              </h1>
              <p className="text-sm text-white/60">
                Historical record vault of reconciled cases, closed items, and audit trails.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Filter archive by title, ID, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              {archivedItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setEmptyModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Purge Storage
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/30 to-purple-950/20 p-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Storage Status</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                RLS Encrypted
              </span>
            </div>
            <div className="my-4">
              <div className="text-4xl font-extrabold tracking-tight text-white">
                {archivedItems.length}
              </div>
              <p className="text-xs text-white/60 mt-1">Archived case manifests retained</p>
            </div>
            <div className="text-[11px] text-white/40 border-t border-white/5 pt-3">
              Compliant with campus data retention policy (180 days).
            </div>
          </div>
        </div>

        {/* Records Table or Empty State */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          {archivedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Recycle Storage is Empty</h3>
              <p className="max-w-sm text-xs text-white/50">
                No archived or resolved cases currently reside in local storage cache.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-5 py-3.5">Case ID</th>
                    <th className="px-5 py-3.5">Item Manifest</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Location</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Timestamp</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4 font-mono font-bold text-indigo-400">
                        #{item.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-white/40 line-clamp-1 max-w-xs mt-0.5">
                          {item.description}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/70">{item.generalLocation}</td>
                      <td className="px-5 py-4">
                        <ItemStatusBadge status={item.status} />
                      </td>
                      <td className="px-5 py-4 text-white/50">{item.dateOccurred}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/search/${item.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="h-3 w-3 text-white/50" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRestore(item.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-colors"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Restore
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.01] px-5 py-3 text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Archive className="h-3.5 w-3.5" />
              Showing {filteredItems.length} of {archivedItems.length} records
            </span>
            <span className="flex items-center gap-1 font-mono text-emerald-400/80">
              <ShieldCheck className="h-3 w-3" />
              AES-256 VAULT OK
            </span>
          </div>
        </div>
      </div>
    </ModernShell>
  )
}
