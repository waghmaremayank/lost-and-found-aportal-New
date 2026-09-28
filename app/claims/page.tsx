'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckSquare,
  ShieldCheck,
  HelpCircle,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Send,
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroTabs,
  RetroInput,
  RetroTextarea,
  RetroField,
  RetroDialog,
} from '@/components/retro'

type Claim = {
  id: string
  reportId: string
  itemTitle: string
  type: 'INCOMING' | 'OUTGOING'
  claimant: string
  finder: string
  date: string
  status: 'PENDING_ANSWERS' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED'
  questions: { question: string; answer?: string }[]
  safeLocation: string
}

const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'CLM-101',
    reportId: 'L98-2048',
    itemTitle: 'Black Backpack',
    type: 'OUTGOING',
    claimant: 'U-2048 (You)',
    finder: 'U-1180',
    date: '2026-09-24 10:30',
    status: 'UNDER_REVIEW',
    questions: [
      {
        question: 'What items or notebooks were inside the main compartment?',
        answer: 'Two blue spiral math notebooks, a silver Parker pen, and a TI-84 calculator.',
      },
      {
        question: 'What unique keychain is on the front zipper?',
        answer: 'A small red pixelated heart keychain.',
      },
    ],
    safeLocation: 'Campus Security Main Desk (Bldg A)',
  },
  {
    id: 'CLM-102',
    reportId: 'L98-2054',
    itemTitle: 'Gold Ring',
    type: 'INCOMING',
    claimant: 'U-7788',
    finder: 'U-2048 (You)',
    date: '2026-09-24 14:15',
    status: 'UNDER_REVIEW',
    questions: [
      {
        question: 'Is there an engraving inside the band? If so, what does it say?',
        answer: 'Engraved with "Forever 2024" on the inner rim.',
      },
      {
        question: 'Approximate ring size or specific karat hallmark?',
        answer: '14K gold hallmark near the date.',
      },
    ],
    safeLocation: 'Sports Complex Front Desk',
  },
]

export default function ClaimsCenterPage() {
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS)
  const [tab, setTab] = useState<'all' | 'outgoing' | 'incoming'>('all')
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(INITIAL_CLAIMS[0])
  const [toast, setToast] = useState<string | null>(null)

  const filteredClaims = claims.filter((c) => {
    if (tab === 'outgoing') return c.type === 'OUTGOING'
    if (tab === 'incoming') return c.type === 'INCOMING'
    return true
  })

  const handleApprove = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'VERIFIED' } : c)),
    )
    if (selectedClaim && selectedClaim.id === claimId) {
      setSelectedClaim({ ...selectedClaim, status: 'VERIFIED' })
    }
    setToast(`Claim ${claimId} approved! Ownership verified.`)
    setTimeout(() => setToast(null), 4000)
  }

  const handleReject = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'REJECTED' } : c)),
    )
    if (selectedClaim && selectedClaim.id === claimId) {
      setSelectedClaim({ ...selectedClaim, status: 'REJECTED' })
    }
    setToast(`Claim ${claimId} rejected. Answers did not match secrets.`)
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <DesktopShell activeKey="claims">
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

        <div className="grid gap-3 lg:grid-cols-[1.1fr_1.3fr]">
          {/* Claims List Explorer */}
          <RetroWindow
            title="Ownership Claims & Verification Station"
            icon={<CheckSquare className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'maximize', 'close']}
          >
            <div className="flex flex-col gap-3">
              <RetroTabs
                tabs={[
                  { key: 'all', label: `All Claims (${claims.length})` },
                  {
                    key: 'outgoing',
                    label: `Claims I Filed (${claims.filter((c) => c.type === 'OUTGOING').length})`,
                  },
                  {
                    key: 'incoming',
                    label: `Claims to Review (${claims.filter((c) => c.type === 'INCOMING').length})`,
                  },
                ]}
                active={tab}
                onChange={(k) => setTab(k as 'all' | 'outgoing' | 'incoming')}
              />

              <div className="flex flex-col gap-2">
                {filteredClaims.map((c) => {
                  const isSelected = selectedClaim?.id === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClaim(c)}
                      className={`flex flex-col gap-1 p-2 text-left transition-colors dotted-focus ${
                        isSelected ? 'bevel-in bg-win-white' : 'bevel-out bg-win-face hover:bg-win-face-light'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono-sys text-[12px] font-bold text-win-title">
                          #{c.id} — {c.itemTitle}
                        </span>
                        <ClaimStatusBadge status={c.status} />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-win-shadow">
                        <span>
                          {c.type === 'OUTGOING' ? `Finder: ${c.finder}` : `Claimant: ${c.claimant}`}
                        </span>
                        <span>{c.date}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="bevel-groove p-2 text-[11px] text-win-shadow">
                <strong>Anti-Fraud Protocol:</strong> Never hand over an item until verification answers are evaluated. Always meet at the campus safety desk.
              </div>
            </div>
          </RetroWindow>

          {/* Selected Claim Inspector & Action Window */}
          {selectedClaim ? (
            <RetroWindow
              title={`Verification Inspector — ${selectedClaim.itemTitle} (#${selectedClaim.id})`}
              icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
              controls={['minimize', 'maximize', 'close']}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-win-face-light pb-2">
                  <div>
                    <h3 className="text-[14px] font-bold text-win-text">
                      {selectedClaim.itemTitle}{' '}
                      <span className="font-mono-sys text-[12px] text-win-shadow">
                        (Report #{selectedClaim.reportId})
                      </span>
                    </h3>
                    <p className="text-[11px] text-win-shadow">
                      {selectedClaim.type === 'OUTGOING'
                        ? `You are claiming this item from finder ${selectedClaim.finder}`
                        : `Claimant ${selectedClaim.claimant} is claiming your found item`}
                    </p>
                  </div>
                  <ClaimStatusBadge status={selectedClaim.status} />
                </div>

                {/* Verification Questions & Submitted Answers */}
                <RetroGroupBox legend="Ownership Verification Test Responses">
                  <div className="flex flex-col gap-3">
                    {selectedClaim.questions.map((q, idx) => (
                      <div key={idx} className="bevel-in bg-win-white p-2">
                        <p className="flex items-center gap-1.5 text-[12px] font-bold text-win-title">
                          <HelpCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          Q{idx + 1}: {q.question}
                        </p>
                        <div className="mt-1 border-t border-win-face-light pt-1 text-[12px] text-win-text">
                          <span className="font-bold text-win-shadow">Answer: </span>
                          <span>{q.answer ?? 'No answer submitted yet.'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RetroGroupBox>

                {/* Safe Handover Coordination */}
                <RetroGroupBox legend="Safe Handover & Campus Meeting Point">
                  <div className="flex flex-col gap-2 text-[12px]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-win-green shrink-0" aria-hidden />
                      <span className="font-bold">Location:</span>
                      <span>{selectedClaim.safeLocation}</span>
                    </div>
                    <p className="text-[11px] text-win-shadow">
                      Items must be exchanged in public during operational security hours (08:00–18:00).
                    </p>
                  </div>
                </RetroGroupBox>

                {/* Actions depending on role and status */}
                <div className="bevel-out bg-win-face-light flex flex-wrap items-center justify-between gap-2 p-2">
                  <Link href="/messages">
                    <RetroButton className="gap-1.5 text-[12px]">
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                      Open Secure Chat
                    </RetroButton>
                  </Link>

                  {selectedClaim.type === 'INCOMING' && selectedClaim.status === 'UNDER_REVIEW' && (
                    <div className="flex gap-2">
                      <RetroButton
                        onClick={() => handleReject(selectedClaim.id)}
                        className="gap-1 text-win-red text-[12px]"
                      >
                        <XCircle className="h-3.5 w-3.5" aria-hidden />
                        Reject Claim
                      </RetroButton>
                      <RetroButton
                        onClick={() => handleApprove(selectedClaim.id)}
                        variant="primary"
                        className="gap-1 text-win-green text-[12px]"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                        Approve & Release
                      </RetroButton>
                    </div>
                  )}

                  {selectedClaim.status === 'VERIFIED' && (
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-win-green">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      OWNERSHIP CONFIRMED — READY FOR HANDOVER
                    </div>
                  )}
                </div>

                <RetroStatusBar
                  segments={[
                    <span key="id" className="font-mono-sys">
                      CLAIM RECORD: #{selectedClaim.id}
                    </span>,
                    <RetroBadge key="sec" tone="green">
                      VERIFIED ENCLAVE
                    </RetroBadge>,
                  ]}
                />
              </div>
            </RetroWindow>
          ) : null}
        </div>
      </div>
    </DesktopShell>
  )
}

function ClaimStatusBadge({ status }: { status: Claim['status'] }) {
  switch (status) {
    case 'VERIFIED':
      return <RetroBadge tone="green">VERIFIED</RetroBadge>
    case 'UNDER_REVIEW':
      return <RetroBadge tone="yellow">UNDER REVIEW</RetroBadge>
    case 'REJECTED':
      return <RetroBadge tone="red">REJECTED</RetroBadge>
    default:
      return <RetroBadge tone="neutral">PENDING</RetroBadge>
  }
}
