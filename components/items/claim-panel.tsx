'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  MessageSquare,
  Flag,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react'
import { VERIFICATION_QUESTIONS, type Item } from '@/lib/mock-data'

type Stage = 'idle' | 'verify' | 'submitted'

export function ClaimPanel({ item }: { item: Item }) {
  const [stage, setStage] = useState<Stage>('idle')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showContact, setShowContact] = useState(false)
  const [flagged, setFlagged] = useState(false)

  const answered = VERIFICATION_QUESTIONS.filter((q) => (answers[q.id] ?? '').trim().length > 0).length
  const progress = Math.round((answered / VERIFICATION_QUESTIONS.length) * 100)
  const canSubmit = answered === VERIFICATION_QUESTIONS.length

  const isOwnerAction = item.type === 'FOUND'

  return (
    <div className="flex flex-col gap-4">
      {/* Main Claim / Contact Card */}
      <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-xs font-mono text-indigo-400 uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>{isOwnerAction ? 'OWNERSHIP VERIFICATION' : 'RETURN COORDINATION'}</span>
        </div>

        {stage === 'submitted' ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center animate-in fade-in duration-300">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-base font-bold text-white font-['var(--font-heading)']">
              Verification Proof Submitted
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Your secret ownership proof has been sent for encrypted comparison. You will receive an instant notification once campus security validates the details.
            </p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 mt-2">
              STATUS: PENDING REVIEW
            </span>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200/90 flex items-start gap-2.5">
              <Lock className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Communications are anonymous and protected. Passing the ownership challenge unlocks security desk pickup without exposing phone numbers.
              </span>
            </div>

            {stage === 'idle' ? (
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStage('verify')}
                  className="w-full py-3 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10 active:scale-95"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{isOwnerAction ? 'Start Ownership Verification' : 'Verify & Coordinate Return'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowContact(true)}
                  className="w-full py-2.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Anonymous Message</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>Verification Challenge</span>
                    <span className="font-mono text-indigo-400">
                      {answered}/{VERIFICATION_QUESTIONS.length} Answered
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {VERIFICATION_QUESTIONS.map((q, i) => (
                  <div key={q.id} className="flex flex-col gap-1.5">
                    <label htmlFor={q.id} className="text-xs font-semibold text-zinc-300">
                      {i + 1}. {q.question} *
                    </label>
                    <textarea
                      id={q.id}
                      rows={2}
                      value={answers[q.id] ?? ''}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      placeholder="Provide specific details only the true owner would know..."
                      className="w-full p-3 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStage('idle')}
                    className="flex-1 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={() => setStage('submitted')}
                    className="flex-1 py-2.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <span>Submit Proof</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Flag suspicious card */}
      <div className="p-4 rounded-2xl bg-[#12131d]/60 border border-white/10 backdrop-blur-xl flex items-center justify-between text-xs">
        {flagged ? (
          <p className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Report received — moderators will review.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setFlagged(true)}
            className="w-full py-2 rounded-xl text-zinc-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Flag className="h-3.5 w-3.5" />
            <span>Flag listing as suspicious</span>
          </button>
        )}
      </div>

      {/* Anonymous message modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowContact(false)}
              aria-label="Close message dialog"
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>MASKED MESSAGE RELAY</span>
            </div>
            <h3 className="text-base font-bold text-white">Send Anonymous Message</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Never share passwords, bank information, or personal private addresses.
            </p>

            <div className="mt-4">
              <textarea
                rows={4}
                placeholder="Hi, I believe this item might be mine. I lost it around the same time..."
                className="w-full p-3.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
