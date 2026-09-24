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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroProgressBar,
} from '@/components/retro'
import { ITEMS, STATS } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export default function DashboardPage() {
  const [selectedDrive, setSelectedDrive] = useState<'c' | 'd' | 'e'>('c')

  const recentItems = ITEMS.slice(0, 5)
  const matchedItem = ITEMS.find((i) => i.status === 'MATCHED')

  return (
    <DesktopShell activeKey="dashboard">
      <div className="flex flex-col gap-3">
        {/* Main System Window */}
        <RetroWindow
          title="My Computer — LOST//98 System Station"
          icon={<HardDrive className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* System Drives & Volumes */}
            <RetroGroupBox legend="System Drives & Storage Volumes">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setSelectedDrive('c')}
                  className={`flex items-start gap-3 p-2 text-left transition-colors dotted-focus ${
                    selectedDrive === 'c' ? 'bevel-in bg-win-white' : 'bevel-out bg-win-face'
                  }`}
                >
                  <div className="bevel-out grid h-10 w-10 shrink-0 place-items-center bg-win-face text-win-title">
                    <HardDrive className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold">System (C:)</p>
                    <p className="text-[11px] text-win-shadow">32.4 MB free of 64.0 MB</p>
                    <RetroProgressBar value={52} className="mt-1" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDrive('d')}
                  className={`flex items-start gap-3 p-2 text-left transition-colors dotted-focus ${
                    selectedDrive === 'd' ? 'bevel-in bg-win-white' : 'bevel-out bg-win-face'
                  }`}
                >
                  <div className="bevel-out grid h-10 w-10 shrink-0 place-items-center bg-win-face text-win-green">
                    <Database className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold">Reports DB (D:)</p>
                    <p className="text-[11px] text-win-shadow">2,481 index records</p>
                    <RetroProgressBar value={76} className="mt-1" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDrive('e')}
                  className={`flex items-start gap-3 p-2 text-left transition-colors dotted-focus ${
                    selectedDrive === 'e' ? 'bevel-in bg-win-white' : 'bevel-out bg-win-face'
                  }`}
                >
                  <div className="bevel-out grid h-10 w-10 shrink-0 place-items-center bg-win-face text-win-title">
                    <Lock className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold">Vault (E:)</p>
                    <p className="text-[11px] text-win-shadow">AES-256 Encrypted</p>
                    <RetroProgressBar value={100} className="mt-1" />
                  </div>
                </button>
              </div>
            </RetroGroupBox>

            {/* Quick Launchpad */}
            <RetroGroupBox legend="Command Launchpad">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Link href="/lost" className="flex">
                  <RetroButton variant="primary" className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-3 text-center">
                    <FilePlus2 className="h-5 w-5" aria-hidden />
                    <span>Report Lost</span>
                  </RetroButton>
                </Link>

                <Link href="/found" className="flex">
                  <RetroButton className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-3 text-center">
                    <MapPin className="h-5 w-5 text-win-green" aria-hidden />
                    <span>Report Found</span>
                  </RetroButton>
                </Link>

                <Link href="/search" className="flex">
                  <RetroButton className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-3 text-center">
                    <Search className="h-5 w-5 text-win-title" aria-hidden />
                    <span>Search Index</span>
                  </RetroButton>
                </Link>

                <Link href="/messages" className="flex">
                  <RetroButton className="flex h-full w-full flex-col items-center justify-center gap-1.5 py-3 text-center">
                    <MessageSquare className="h-5 w-5 text-win-title" aria-hidden />
                    <span>Secure Inbox</span>
                  </RetroButton>
                </Link>
              </div>
            </RetroGroupBox>

            {/* Live Match Alert if Available */}
            {matchedItem ? (
              <div className="bevel-out bg-win-yellow flex flex-col gap-2 p-3 text-win-text sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-5 w-5 shrink-0 text-win-title" aria-hidden />
                  <div>
                    <p className="text-[13px] font-black">HIGH CONFIDENCE SMART MATCH DETECTED</p>
                    <p className="text-[12px]">
                      Found report <strong>#{matchedItem.id}</strong> ({matchedItem.title}) matches a lost report with{' '}
                      <strong>{matchedItem.matchConfidence}% confidence</strong>.
                    </p>
                  </div>
                </div>
                <Link href={`/search/${matchedItem.id}`} className="shrink-0">
                  <RetroButton variant="primary" className="w-full gap-1.5 sm:w-auto">
                    <span>Review Match</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </RetroButton>
                </Link>
              </div>
            ) : null}

            {/* System Status and Metrics Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="bevel-in bg-win-white p-3">
                <div className="flex items-center justify-between text-win-shadow">
                  <span className="text-[11px] font-bold uppercase">Total Database Reports</span>
                  <Folder className="h-4 w-4" aria-hidden />
                </div>
                <p className="font-pixel mt-2 text-2xl text-win-title">{STATS.reports.toLocaleString()}</p>
                <p className="mt-1 text-[11px] text-win-green">● 14 new reports today</p>
              </div>

              <div className="bevel-in bg-win-white p-3">
                <div className="flex items-center justify-between text-win-shadow">
                  <span className="text-[11px] font-bold uppercase">Items Safely Returned</span>
                  <PackageCheck className="h-4 w-4" aria-hidden />
                </div>
                <p className="font-pixel mt-2 text-2xl text-win-green">{STATS.returned.toLocaleString()}</p>
                <p className="mt-1 text-[11px] text-win-shadow">Verification rate 98.2%</p>
              </div>

              <div className="bevel-in bg-win-white p-3">
                <div className="flex items-center justify-between text-win-shadow">
                  <span className="text-[11px] font-bold uppercase">Active Inquiries</span>
                  <Activity className="h-4 w-4" aria-hidden />
                </div>
                <p className="font-pixel mt-2 text-2xl text-win-text">{STATS.active.toLocaleString()}</p>
                <p className="mt-1 text-[11px] text-win-title">● 42 claims pending review</p>
              </div>
            </div>

            {/* Recent File Directory Table */}
            <RetroGroupBox legend="Recent File Directory Activity">
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-1.5">File / Report ID</th>
                      <th className="px-2 py-1.5">Type</th>
                      <th className="px-2 py-1.5">Item Name</th>
                      <th className="px-2 py-1.5">Category</th>
                      <th className="px-2 py-1.5">Location</th>
                      <th className="px-2 py-1.5">Date</th>
                      <th className="px-2 py-1.5">Status</th>
                      <th className="px-2 py-1.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light">
                    {recentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-win-title/10">
                        <td className="font-mono-sys px-2 py-1.5 font-bold text-win-title">
                          #{item.id}
                        </td>
                        <td className="px-2 py-1.5">
                          <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>
                            {item.type}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-1.5 font-bold">{item.title}</td>
                        <td className="px-2 py-1.5 text-win-shadow">{item.category}</td>
                        <td className="px-2 py-1.5">{item.generalLocation}</td>
                        <td className="px-2 py-1.5 text-win-shadow">{item.dateOccurred}</td>
                        <td className="px-2 py-1.5">
                          <ItemStatusBadge status={item.status} />
                        </td>
                        <td className="px-2 py-1.5 text-right">
                          <Link href={`/search/${item.id}`}>
                            <RetroButton className="px-2 py-0.5 text-[11px]">
                              Open
                            </RetroButton>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RetroGroupBox>

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="sys" className="flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-win-green" aria-hidden />
                  KERNEL 98.4.1 — ONLINE
                </span>,
                <span key="sec" className="flex items-center gap-1 font-bold text-win-green">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  ROW LEVEL SECURITY: ENFORCED
                </span>,
                <span key="count" className="text-win-shadow">
                  {ITEMS.length} items loaded
                </span>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
