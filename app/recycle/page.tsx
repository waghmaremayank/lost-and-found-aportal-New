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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroDialog,
} from '@/components/retro'
import { ITEMS, type Item } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export default function RecycleBinPage() {
  const [archivedItems, setArchivedItems] = useState<Item[]>(
    ITEMS.filter((i) => i.status === 'RESOLVED' || i.status === 'CLOSED'),
  )
  const [emptyModalOpen, setEmptyModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleRestore = (id: string) => {
    setArchivedItems((prev) => prev.filter((i) => i.id !== id))
    setToast(`Case #${id} reopened and restored to Active Reports.`)
    setTimeout(() => setToast(null), 3500)
  }

  const handleEmpty = () => {
    setArchivedItems([])
    setEmptyModalOpen(false)
    setToast('Recycle Bin emptied. Resolved logs archived to deep cold storage.')
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <DesktopShell activeKey="recycle">
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

        {/* Empty Confirm Dialog */}
        <RetroDialog
          open={emptyModalOpen}
          onClose={() => setEmptyModalOpen(false)}
          title="CONFIRM EMPTY RECYCLE BIN"
          icon={<AlertTriangle className="h-4 w-4 text-win-red" aria-hidden />}
          className="max-w-sm"
        >
          <div className="flex flex-col gap-3 text-[12px]">
            <p>
              Are you sure you want to permanently purge these {archivedItems.length} resolved case records from local cache?
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <RetroButton variant="primary" onClick={handleEmpty}>
                Yes, Empty Bin
              </RetroButton>
              <RetroButton onClick={() => setEmptyModalOpen(false)}>Cancel</RetroButton>
            </div>
          </div>
        </RetroDialog>

        <RetroWindow
          title="Recycle Bin — Case Archive & Resolution Vault"
          icon={<Trash2 className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-[12px] text-win-shadow">
                Archived cases that have been returned to owners or closed by time limit.
              </div>

              {archivedItems.length > 0 && (
                <RetroButton
                  onClick={() => setEmptyModalOpen(true)}
                  className="gap-1 text-[12px] text-win-red"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Empty Recycle Bin
                </RetroButton>
              )}
            </div>

            {archivedItems.length === 0 ? (
              <div className="bevel-in bg-win-white flex flex-col items-center justify-center gap-2 p-10 text-center">
                <Trash2 className="h-10 w-10 text-win-shadow" aria-hidden />
                <p className="font-pixel text-sm text-win-title">RECYCLE BIN IS EMPTY</p>
                <p className="text-[12px] text-win-shadow">No deleted or archived cases in storage.</p>
              </div>
            ) : (
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-2">Case ID</th>
                      <th className="px-2 py-2">Item Name</th>
                      <th className="px-2 py-2">Category</th>
                      <th className="px-2 py-2">Location</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Resolution Date</th>
                      <th className="px-2 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light">
                    {archivedItems.map((item) => (
                      <tr key={item.id} className="hover:bg-win-title/10">
                        <td className="font-mono-sys px-2 py-2 font-bold text-win-title">
                          #{item.id}
                        </td>
                        <td className="px-2 py-2 font-bold">{item.title}</td>
                        <td className="px-2 py-2 text-win-shadow">{item.category}</td>
                        <td className="px-2 py-2">{item.generalLocation}</td>
                        <td className="px-2 py-2">
                          <ItemStatusBadge status={item.status} />
                        </td>
                        <td className="px-2 py-2 text-win-shadow">{item.dateOccurred}</td>
                        <td className="px-2 py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/search/${item.id}`}>
                              <RetroButton className="px-2 py-0.5 text-[11px]">
                                Inspect
                              </RetroButton>
                            </Link>
                            <RetroButton
                              onClick={() => handleRestore(item.id)}
                              className="px-2 py-0.5 text-[11px] text-win-title"
                            >
                              <RotateCcw className="mr-1 h-3 w-3 inline" aria-hidden />
                              Restore
                            </RetroButton>
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
                <span key="cnt" className="flex items-center gap-1">
                  <Archive className="h-3.5 w-3.5" aria-hidden />
                  {archivedItems.length} archived record{archivedItems.length === 1 ? '' : 's'}
                </span>,
                <RetroBadge key="sec" tone="neutral">
                  COLD STORAGE
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
