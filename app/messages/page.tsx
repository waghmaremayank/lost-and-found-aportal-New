'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Send,
  ShieldCheck,
  ShieldAlert,
  UserX,
  Tag,
  AlertTriangle,
  Lock,
  RotateCcw,
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroInput,
  RetroBadge,
  RetroStatusBar,
  RetroDialog,
} from '@/components/retro'
import { CONVERSATIONS, type Conversation } from '@/lib/mock-data'

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS)
  const [activeId, setActiveId] = useState<string>(CONVERSATIONS[0]?.id || '')
  const [inputMessage, setInputMessage] = useState('')
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [blockedModalOpen, setBlockedModalOpen] = useState(false)

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !activeConv) return

    const newMsg = {
      id: `m_${Date.now()}`,
      from: 'me' as const,
      body: inputMessage.trim(),
      at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? {
              ...c,
              lastMessage: newMsg.body,
              lastAt: newMsg.at,
              messages: [...c.messages, newMsg],
            }
          : c,
      ),
    )
    setInputMessage('')

    // Auto reply simulation after 1.5s
    setTimeout(() => {
      const replyMsg = {
        id: `m_rep_${Date.now()}`,
        from: 'them' as const,
        body: 'Understood! I will bring the item to the security desk at the scheduled time.',
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConv.id
            ? {
                ...c,
                lastMessage: replyMsg.body,
                lastAt: replyMsg.at,
                messages: [...c.messages, replyMsg],
              }
            : c,
        ),
      )
    }, 1200)
  }

  return (
    <DesktopShell activeKey="messages">
      <div className="flex flex-col gap-3">
        {/* Report Abuse Modal */}
        <RetroDialog
          open={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          title="REPORT CONVERSATION TO MODERATOR"
          icon={<ShieldAlert className="h-4 w-4 text-win-red" aria-hidden />}
          className="max-w-md"
        >
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">
              Flag user <strong>{activeConv?.withUser}</strong> regarding report{' '}
              <strong>#{activeConv?.reportId}</strong>?
            </p>
            <div className="bevel-field bg-win-white p-2">
              <label className="text-[11px] font-bold text-win-shadow">Reason for report:</label>
              <select className="bevel-out mt-1 w-full bg-win-face p-1 text-[12px]">
                <option>Suspicious claim / false identity</option>
                <option>Harassment or spam</option>
                <option>Off-platform money/fee demand</option>
                <option>Refusal to meet at verified safe location</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <RetroButton
                variant="primary"
                onClick={() => {
                  setReportModalOpen(false)
                  alert('Report submitted to system moderators for security triage.')
                }}
              >
                Submit Report
              </RetroButton>
              <RetroButton onClick={() => setReportModalOpen(false)}>Cancel</RetroButton>
            </div>
          </div>
        </RetroDialog>

        {/* Block User Modal */}
        <RetroDialog
          open={blockedModalOpen}
          onClose={() => setBlockedModalOpen(false)}
          title="BLOCK USER"
          icon={<UserX className="h-4 w-4 text-win-red" aria-hidden />}
          className="max-w-sm"
        >
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">
              Are you sure you want to block <strong>{activeConv?.withUser}</strong>? They will no longer be able to message you or view your active claims.
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <RetroButton
                variant="primary"
                onClick={() => {
                  setBlockedModalOpen(false)
                  alert(`User ${activeConv?.withUser} has been blocked.`)
                }}
              >
                Confirm Block
              </RetroButton>
              <RetroButton onClick={() => setBlockedModalOpen(false)}>Cancel</RetroButton>
            </div>
          </div>
        </RetroDialog>

        <div className="grid gap-3 lg:grid-cols-[260px_1fr]">
          {/* Conversation List */}
          <RetroWindow
            title="Inbox Folders"
            icon={<MessageSquare className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'close']}
          >
            <div className="flex flex-col gap-1">
              <div className="bevel-groove mb-1 p-1 text-[11px] font-bold text-win-shadow">
                ACTIVE CHANNELS ({conversations.length})
              </div>

              {conversations.map((c) => {
                const isSelected = activeConv?.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`flex flex-col gap-1 p-2 text-left transition-colors dotted-focus ${
                      isSelected ? 'bevel-in bg-win-white' : 'bevel-out bg-win-face hover:bg-win-face-light'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[13px] text-win-text">{c.withUser}</span>
                      <span className="font-mono-sys text-[10px] text-win-shadow">{c.lastAt}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-win-title font-bold">
                      <Tag className="h-3 w-3 shrink-0" aria-hidden />
                      <span className="truncate">{c.reportTitle}</span>
                    </div>

                    <p className="line-clamp-1 text-[11px] text-win-shadow">{c.lastMessage}</p>

                    {c.unread > 0 && (
                      <RetroBadge tone="yellow" className="self-start text-[9px]">
                        {c.unread} NEW
                      </RetroBadge>
                    )}
                  </button>
                )
              })}
            </div>
          </RetroWindow>

          {/* Active Chat Conversation Pane */}
          {activeConv ? (
            <RetroWindow
              title={`Secure Channel: ${activeConv.withUser} — [${activeConv.reportTitle}]`}
              icon={<Lock className="h-3.5 w-3.5 text-win-green" aria-hidden />}
              controls={['minimize', 'maximize', 'close']}
            >
              <div className="flex flex-col gap-3">
                {/* Safety Warning Header */}
                <div className="bevel-out bg-win-yellow flex items-center justify-between p-2 text-[12px] text-win-text">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-win-green shrink-0" aria-hidden />
                    <span>
                      Protected by LOST//98 Relay. Never send passwords or money transfers.
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link href={`/search/${activeConv.reportId}`}>
                      <RetroButton className="px-1.5 py-0.5 text-[11px]">
                        View Item #{activeConv.reportId}
                      </RetroButton>
                    </Link>
                    <RetroButton
                      onClick={() => setReportModalOpen(true)}
                      className="px-1.5 py-0.5 text-[11px] text-win-red"
                    >
                      Report
                    </RetroButton>
                    <RetroButton
                      onClick={() => setBlockedModalOpen(true)}
                      className="px-1.5 py-0.5 text-[11px]"
                    >
                      Block
                    </RetroButton>
                  </div>
                </div>

                {/* Message Scroll View */}
                <div className="bevel-field retro-scroll flex h-80 flex-col gap-2 overflow-y-auto bg-win-white p-3">
                  <div className="my-2 border-b border-win-face-light pb-1 text-center text-[10px] text-win-shadow">
                    --- ENCRYPTED SESSION INITIALIZED ON ITEM #{activeConv.reportId} ---
                  </div>

                  {activeConv.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[80%] ${
                        m.from === 'me' ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-win-shadow">
                        <span className="font-bold">
                          {m.from === 'me' ? 'You (U-2048)' : activeConv.withUser}
                        </span>
                        <span>{m.at}</span>
                      </div>

                      <div
                        className={`p-2 text-[13px] leading-relaxed mt-0.5 ${
                          m.from === 'me'
                            ? 'bevel-out bg-win-title text-win-title-text font-medium'
                            : 'bevel-out bg-win-face text-win-text'
                        }`}
                      >
                        {m.body}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Bar */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <RetroInput
                    placeholder="Type a secure message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1"
                  />
                  <RetroButton type="submit" variant="primary" className="gap-1.5">
                    <Send className="h-3.5 w-3.5" aria-hidden />
                    Send
                  </RetroButton>
                </form>

                <RetroStatusBar
                  segments={[
                    <span key="chan" className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5 text-win-green" aria-hidden />
                      CHANNEL: {activeConv.id}
                    </span>,
                    <span key="sec" className="text-win-shadow">
                      Zero Personal Contact Exposure
                    </span>,
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
