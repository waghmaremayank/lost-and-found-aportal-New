'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HardDrive,
  Folder,
  Search,
  FilePlus2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  AlertCircle,
  Activity,
  ArrowRight,
  Database,
  Cpu,
  Lock,
  ExternalLink,
  ChevronRight,
  Bell,
  Clock,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { ITEMS, STATS } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export default function DashboardPage() {
  const [selectedVolume, setSelectedVolume] = useState<'vault' | 'index' | 'cache'>('vault')

  const recentItems = ITEMS.slice(0, 5)
  const matchedItem = ITEMS.find((i) => i.status === 'MATCHED')

  return (
    <ModernShell activeKey="dashboard">
      <div className="flex flex-col gap-6">
        {/* Welcome & Command Launchpad */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Cpu className="h-4 w-4" />
                <span>Command & Control Center</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mt-1">
                Campus Recovery Dashboard
              </h1>
              <p className="text-xs text-white/60 mt-1 max-w-xl">
                Real-time visibility into active lost items, found handovers, AI similarity matching, and security custody vaults.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Link
                href="/lost"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-center hover:bg-rose-500/20 hover:border-rose-500/40 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300 group-hover:scale-110 transition-transform">
                  <FilePlus2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-rose-200">Report Lost</span>
              </Link>

              <Link
                href="/found"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-center hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-emerald-200">Report Found</span>
              </Link>

              <Link
                href="/search"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-center hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 group-hover:scale-110 transition-transform">
                  <Search className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-indigo-200">Search DB</span>
              </Link>

              <Link
                href="/messages"
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 p-3.5 text-center hover:bg-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-purple-200">Inbox</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Tile */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Engine Status</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live 99.9%
              </span>
            </div>

            <div className="space-y-3 my-4">
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <span className="text-white/60">Total Tracked Reports</span>
                <span className="font-mono font-bold text-white">{STATS.reports.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <span className="text-white/60">Successful Reunions</span>
                <span className="font-mono font-bold text-emerald-400">{STATS.returned.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Active Claims in Escrow</span>
                <span className="font-mono font-bold text-indigo-400">{STATS.active.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
              <span>Security Hub: Bldg A Desk</span>
              <span className="font-mono text-indigo-400">RLS Active</span>
            </div>
          </div>
        </div>

        {/* High Confidence Match Banner */}
        {matchedItem ? (
          <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/20 p-5 backdrop-blur-md">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      High Confidence AI Match
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      {matchedItem.matchConfidence}% Match
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">
                    Found item <strong>#{matchedItem.id} ({matchedItem.title})</strong> closely correlates with a pending lost report.
                  </p>
                </div>
              </div>

              <Link
                href={`/search/${matchedItem.id}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-all"
              >
                <span>Inspect Match</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : null}

        {/* Storage Volumes & Index Health */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div
            onClick={() => setSelectedVolume('vault')}
            className={`cursor-pointer rounded-2xl border p-5 backdrop-blur-sm transition-all ${
              selectedVolume === 'vault'
                ? 'border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-500/10'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Lock className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] text-indigo-300">VOLUME 01</span>
            </div>
            <h3 className="text-sm font-bold text-white">Cryptographic Vault</h3>
            <p className="text-xs text-white/50 mt-0.5">AES-256 GCM claim verification hashes</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-white/60">Integrity:</span>
              <span className="font-bold text-emerald-400">100% Sealed</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedVolume('index')}
            className={`cursor-pointer rounded-2xl border p-5 backdrop-blur-sm transition-all ${
              selectedVolume === 'index'
                ? 'border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-500/10'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Database className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] text-emerald-300">VOLUME 02</span>
            </div>
            <h3 className="text-sm font-bold text-white">Item Knowledge Graph</h3>
            <p className="text-xs text-white/50 mt-0.5">Vector embeddings & category nodes</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-white/60">Sync State:</span>
              <span className="font-bold text-emerald-400">Real-time Stream</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedVolume('cache')}
            className={`cursor-pointer rounded-2xl border p-5 backdrop-blur-sm transition-all ${
              selectedVolume === 'cache'
                ? 'border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-500/10'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <HardDrive className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] text-purple-300">VOLUME 03</span>
            </div>
            <h3 className="text-sm font-bold text-white">Edge Cache Hub</h3>
            <p className="text-xs text-white/50 mt-0.5">Sub-5ms image & report distribution</p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-white/60">Hit Ratio:</span>
              <span className="font-bold text-white">99.4%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white">Recent Activity & Ingest Stream</h2>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View Full Index</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Item</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-4 font-mono font-bold text-indigo-400">
                      #{item.id}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          item.type === 'LOST'
                            ? 'border border-rose-500/30 bg-rose-500/10 text-rose-300'
                            : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </td>
                    <td className="px-5 py-4 text-white/60">{item.category}</td>
                    <td className="px-5 py-4 text-white/70">{item.generalLocation}</td>
                    <td className="px-5 py-4 text-white/50">{item.dateOccurred}</td>
                    <td className="px-5 py-4">
                      <ItemStatusBadge status={item.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/search/${item.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <span>Open</span>
                        <ExternalLink className="h-3 w-3 text-white/50" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ModernShell>
  )
}
