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
  Lock,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'

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
    itemTitle: 'Black Backpack (Herschel)',
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
    itemTitle: '14K Gold Band Ring',
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
        answer: '14K gold hallmark stamped near the date.',
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
    setToast(`Claim ${claimId} approved! Ownership verified. Handover unlocked.`)
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
    <ModernShell
      activeKey="claims"
      title="Ownership Verification & Claims Hub"
      subtitle="Inspect ownership proof challenges, validate secret answers, and schedule safe pickup at campus security desks."
      badge="ZERO-FRAUD GATEWAY"
    >
      <div className="flex flex-col gap-6">
        {/* Toast Notification */}
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

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
          {/* Claims List Column */}
          <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span className="font-bold text-white">CLAIMS QUEUE</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{claims.length} ACTIVE</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#090a0f] border border-white/10">
              {[
                { key: 'all', label: `All (${claims.length})` },
                {
                  key: 'outgoing',
                  label: `Filed (${claims.filter((c) => c.type === 'OUTGOING').length})`,
                },
                {
                  key: 'incoming',
                  label: `To Review (${claims.filter((c) => c.type === 'INCOMING').length})`,
                },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key as 'all' | 'outgoing' | 'incoming')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    tab === t.key
                      ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-2.5">
              {filteredClaims.map((c) => {
                const isSelected = selectedClaim?.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedClaim(c)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-white truncate">{c.itemTitle}</span>
                      <ClaimStatusBadge status={c.status} />
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="font-mono text-zinc-500">#{c.id}</span>
                      <span>
                        {c.type === 'OUTGOING' ? `Finder: ${c.finder}` : `Claimant: ${c.claimant}`}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Claim Inspector */}
          {selectedClaim ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-['var(--font-heading)']">
                      {selectedClaim.itemTitle}
                    </h3>
                    <ClaimStatusBadge status={selectedClaim.status} />
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Claim ID: <span className="font-mono text-indigo-400">#{selectedClaim.id}</span> • Report:{' '}
                    <span className="font-mono text-zinc-300">#{selectedClaim.reportId}</span>
                  </p>
                </div>
              </div>

              {/* Questionnaire verification */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>OWNERSHIP VERIFICATION TEST RESPONSES</span>
                </h4>

                <div className="flex flex-col gap-3">
                  {selectedClaim.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#090a0f] border border-white/10 flex flex-col gap-1.5"
                    >
                      <span className="text-xs font-semibold text-indigo-300">
                        Q{idx + 1}: {q.question}
                      </span>
                      <p className="text-xs text-zinc-200 mt-1 pl-3 border-l-2 border-indigo-500/40 leading-relaxed">
                        {q.answer ?? 'No response provided.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handover Spot */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-white block">Safe Handover Point</span>
                  <span className="text-xs text-zinc-400 block mt-0.5">{selectedClaim.safeLocation}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/messages?report=${selectedClaim.reportId}`}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Open Masked Chat
                </Link>

                {selectedClaim.type === 'INCOMING' && selectedClaim.status === 'UNDER_REVIEW' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReject(selectedClaim.id)}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject Claim
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(selectedClaim.id)}
                      className="px-5 py-2 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve &amp; Release
                    </button>
                  </div>
                )}

                {selectedClaim.status === 'VERIFIED' && (
                  <div className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>OWNERSHIP CONFIRMED — PICKUP ACTIVE</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ModernShell>
  )
}

function ClaimStatusBadge({ status }: { status: Claim['status'] }) {
  switch (status) {
    case 'VERIFIED':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          VERIFIED
        </span>
      )
    case 'UNDER_REVIEW':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
          UNDER REVIEW
        </span>
      )
    case 'REJECTED':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-rose-500/15 text-rose-300 border border-rose-500/30">
          REJECTED
        </span>
      )
    default:
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-white/10 text-zinc-400 border border-white/10">
          PENDING
        </span>
      )
  }
}
