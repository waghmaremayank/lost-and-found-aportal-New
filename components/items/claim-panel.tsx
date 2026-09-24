'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  MessageSquare,
  Flag,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import {
  RetroWindow,
  RetroButton,
  RetroField,
  RetroTextarea,
  RetroBadge,
  RetroProgressBar,
  RetroDialog,
  RetroNotification,
} from '@/components/retro'
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
    <div className="flex flex-col gap-3">
      <RetroWindow
        title={isOwnerAction ? 'Claim This Item' : 'Help Return This Item'}
        icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
        controls={['minimize', 'close']}
      >
        {stage === 'submitted' ? (
          <div className="flex flex-col items-center gap-3 p-2 text-center">
            <span className="bevel-out grid h-12 w-12 place-items-center bg-win-green text-win-white">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </span>
            <p className="font-pixel text-sm text-win-title">CLAIM SUBMITTED</p>
            <p className="text-[13px] leading-relaxed text-win-shadow">
              Your verification answers were sent to the finder for review. You&apos;ll get a secure
              message if the claim is approved. Your contact details stay private until both sides
              confirm.
            </p>
            <RetroBadge tone="yellow">STATUS: PENDING REVIEW</RetroBadge>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="bevel-groove flex items-start gap-2 p-2 text-[12px] text-win-text">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-win-title" aria-hidden />
              <p>
                Contact is anonymous. To {isOwnerAction ? 'claim' : 'coordinate'} this item you must
                pass ownership verification. This protects both parties from fraud.
              </p>
            </div>

            {stage === 'idle' ? (
              <>
                <RetroButton variant="primary" className="w-full gap-2" onClick={() => setStage('verify')}>
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  {isOwnerAction ? 'Start Ownership Claim' : 'Verify & Contact'}
                </RetroButton>
                <RetroButton className="w-full gap-2" onClick={() => setShowContact(true)}>
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Send a Message
                </RetroButton>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-[12px] font-bold">
                    <span>Verification</span>
                    <span className="text-win-shadow">
                      {answered}/{VERIFICATION_QUESTIONS.length}
                    </span>
                  </div>
                  <RetroProgressBar value={progress} />
                </div>

                {VERIFICATION_QUESTIONS.map((q, i) => (
                  <RetroField key={q.id} label={`${i + 1}. ${q.question}`} htmlFor={q.id} required>
                    <RetroTextarea
                      id={q.id}
                      rows={2}
                      value={answers[q.id] ?? ''}
                      onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      placeholder="Be specific — only the true owner would know."
                    />
                  </RetroField>
                ))}

                <div className="flex gap-2">
                  <RetroButton className="flex-1" onClick={() => setStage('idle')}>
                    Cancel
                  </RetroButton>
                  <RetroButton
                    variant="primary"
                    className="flex-1 gap-2"
                    disabled={!canSubmit}
                    onClick={() => setStage('submitted')}
                  >
                    Submit
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </RetroButton>
                </div>
              </div>
            )}
          </div>
        )}
      </RetroWindow>

      <RetroWindow title="Report a Problem" controls={['close']}>
        {flagged ? (
          <p className="flex items-center gap-2 p-1 text-[13px] text-win-green">
            <CheckCircle2 className="h-4 w-4" aria-hidden />
            Thanks — our moderators will review this listing.
          </p>
        ) : (
          <RetroButton className="w-full gap-2" onClick={() => setFlagged(true)}>
            <Flag className="h-4 w-4" aria-hidden />
            Flag as Suspicious
          </RetroButton>
        )}
      </RetroWindow>

      <RetroDialog
        open={showContact}
        title="Send Secure Message"
        onClose={() => setShowContact(false)}
        icon={<MessageSquare className="h-3.5 w-3.5" aria-hidden />}
      >
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-win-text">
              Messages are relayed anonymously. Never share passwords or full personal details.
            </p>
            <RetroField label="Your message" htmlFor="msg">
              <RetroTextarea id="msg" rows={4} placeholder="Hi, I think this may be mine..." />
            </RetroField>
            <div className="flex justify-end gap-2">
              <RetroButton onClick={() => setShowContact(false)}>Cancel</RetroButton>
              <RetroButton variant="primary" onClick={() => setShowContact(false)}>
                Send
              </RetroButton>
            </div>
          </div>
        </RetroDialog>

      {stage === 'submitted' ? (
        <RetroNotification
          title="VERIFICATION SENT"
          icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
        >
          Claim <span className="font-bold">#{item.id}</span> is now pending finder review.
        </RetroNotification>
      ) : null}
    </div>
  )
}
