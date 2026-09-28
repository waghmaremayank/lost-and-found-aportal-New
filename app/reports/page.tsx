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
    <DesktopShell activeKey="reports">
      <div className="flex flex-col gap-3">
        {/* Printable Official Report Card Modal */}
        {printModalReport && (
          <RetroDialog
            open={!!printModalReport}
            onClose={() => setPrintModalReport(null)}
            title={`OFFICIAL CASE SUMMARY #${printModalReport.id}`}
            icon={<Printer className="h-4 w-4" aria-hidden />}
            className="max-w-lg"
          >
            <div className="bevel-in bg-win-white flex flex-col gap-3 p-4 text-win-text">
              <div className="border-b-2 border-win-dark pb-2 text-center">
                <p className="font-pixel text-base">LOST//98 SYSTEM CASE RECORD</p>
                <p className="text-[11px] text-win-shadow">
                  CONFIDENTIAL COMMUNITY LOST & FOUND DISPATCH
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div>
                  <span className="font-bold">REPORT ID:</span> #{printModalReport.id}
                </div>
                <div>
                  <span className="font-bold">TYPE:</span> {printModalReport.type}
                </div>
                <div>
                  <span className="font-bold">ITEM:</span> {printModalReport.title}
                </div>
                <div>
                  <span className="font-bold">CATEGORY:</span> {printModalReport.category}
                </div>
                <div>
                  <span className="font-bold">LOCATION:</span> {printModalReport.generalLocation}
                </div>
                <div>
                  <span className="font-bold">DATE:</span> {printModalReport.dateOccurred}
                </div>
                <div className="col-span-2">
                  <span className="font-bold">STATUS:</span> {printModalReport.status}
                </div>
              </div>

              <div className="bevel-field bg-win-face-light p-2 text-[12px]">
                <p className="font-bold">PUBLIC DESCRIPTION:</p>
                <p>{printModalReport.description}</p>
              </div>

              <div className="border-t border-dashed border-win-shadow pt-2 text-[10px] text-win-shadow">
                Cryptographic Signature: SHA-256: 8f4a9b2...verified by campus auth service.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <RetroButton onClick={() => window.print()} variant="primary" className="gap-1.5">
                  <Printer className="h-3.5 w-3.5" aria-hidden />
                  Print / Save PDF
                </RetroButton>
                <RetroButton onClick={() => setPrintModalReport(null)}>Close</RetroButton>
              </div>
            </div>
          </RetroDialog>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bevel-out bg-win-yellow flex items-center justify-between p-2.5 text-[13px] font-bold text-win-text">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-win-green" aria-hidden />
              {toastMessage}
            </span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[11px] font-bold text-win-shadow hover:text-win-dark"
            >
              ✕
            </button>
          </div>
        )}

        <RetroWindow
          title="My Reports Directory — [User U-2048]"
          icon={<PackageSearch className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Quick Action Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <RetroTabs
                  tabs={[
                    { key: 'all', label: `All Reports (${reports.length})` },
                    { key: 'lost', label: `Lost (${reports.filter((r) => r.type === 'LOST').length})` },
                    { key: 'found', label: `Found (${reports.filter((r) => r.type === 'FOUND').length})` },
                    {
                      key: 'resolved',
                      label: `Resolved (${reports.filter((r) => r.status === 'RESOLVED').length})`,
                    },
                  ]}
                  active={tab}
                  onChange={setTab}
                />
              </div>

              <div className="flex items-center gap-2">
                <Link href="/lost">
                  <RetroButton variant="primary" className="gap-1 text-[12px]">
                    <FilePlus2 className="h-3.5 w-3.5" aria-hidden />
                    Report Lost
                  </RetroButton>
                </Link>
                <Link href="/found">
                  <RetroButton className="gap-1 text-[12px]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    Report Found
                  </RetroButton>
                </Link>
              </div>
            </div>

            {/* Filter Bar */}
            <RetroGroupBox legend="Report Status Filter">
              <div className="flex flex-wrap items-center gap-2">
                {(['ALL', 'ACTIVE', 'MATCHED', 'CLAIMED', 'RESOLVED', 'CLOSED'] as const).map(
                  (st) => (
                    <RetroButton
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`text-[11px] ${
                        statusFilter === st ? 'bevel-in font-bold' : ''
                      }`}
                    >
                      {st}
                    </RetroButton>
                  ),
                )}
              </div>
            </RetroGroupBox>

            {/* Reports Explorer Table */}
            {filteredReports.length === 0 ? (
              <div className="bevel-in bg-win-white flex flex-col items-center justify-center gap-2 p-10 text-center">
                <FolderOpen className="h-10 w-10 text-win-shadow" aria-hidden />
                <p className="font-pixel text-sm text-win-title">DIRECTORY EMPTY</p>
                <p className="text-[12px] text-win-shadow">
                  No reports found matching the selected folder or filter.
                </p>
              </div>
            ) : (
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-2">Report ID</th>
                      <th className="px-2 py-2">Type</th>
                      <th className="px-2 py-2">Item Title</th>
                      <th className="px-2 py-2">Location</th>
                      <th className="px-2 py-2">Date Occurred</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Matches</th>
                      <th className="px-2 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light">
                    {filteredReports.map((item) => (
                      <tr key={item.id} className="hover:bg-win-title/10">
                        <td className="font-mono-sys px-2 py-2 font-bold text-win-title">
                          #{item.id}
                        </td>
                        <td className="px-2 py-2">
                          <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>
                            {item.type}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-2 font-bold">
                          <div>{item.title}</div>
                          <span className="text-[11px] font-normal text-win-shadow">{item.category}</span>
                        </td>
                        <td className="px-2 py-2">{item.generalLocation}</td>
                        <td className="px-2 py-2 text-win-shadow">{item.dateOccurred}</td>
                        <td className="px-2 py-2">
                          <ItemStatusBadge status={item.status} />
                        </td>
                        <td className="px-2 py-2">
                          {item.possibleMatches > 0 ? (
                            <Link href={`/search?q=${encodeURIComponent(item.title)}`}>
                              <span className="bevel-out bg-win-yellow inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold text-win-text">
                                <Sparkles className="h-3 w-3 text-win-title" aria-hidden />
                                {item.possibleMatches} Match{item.possibleMatches === 1 ? '' : 'es'}
                              </span>
                            </Link>
                          ) : (
                            <span className="text-[11px] text-win-shadow">0 detected</span>
                          )}
                        </td>
                        <td className="px-2 py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/search/${item.id}`}>
                              <RetroButton className="px-2 py-0.5 text-[11px]" title="Inspect report">
                                View
                              </RetroButton>
                            </Link>
                            <RetroButton
                              onClick={() => setPrintModalReport(item)}
                              className="px-2 py-0.5 text-[11px]"
                              title="Print report record"
                            >
                              <Printer className="h-3 w-3" aria-hidden />
                            </RetroButton>
                            {item.status !== 'RESOLVED' && item.status !== 'CLOSED' && (
                              <RetroButton
                                onClick={() => handleResolve(item.id)}
                                variant="primary"
                                className="px-2 py-0.5 text-[11px] text-win-green"
                                title="Mark item as recovered"
                              >
                                Resolve
                              </RetroButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="st" className="flex items-center gap-1">
                  <PackageSearch className="h-3.5 w-3.5" aria-hidden />
                  {filteredReports.length} user record{filteredReports.length === 1 ? '' : 's'} displayed
                </span>,
                <RetroBadge key="sec" tone="green">
                  AUTHENTICATED AS U-2048
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
