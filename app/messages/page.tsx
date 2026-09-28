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
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
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

    // Simulated reply
    setTimeout(() => {
      const replyMsg = {
        id: `m_rep_${Date.now()}`,
        from: 'them' as const,
        body: 'Understood! I will bring the item to the campus security desk at the designated time.',
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
    <ModernShell
      activeKey="messages"
      title="Masked Campus Messaging"
      subtitle="Communicate safely with finders and claimants through an anonymous, encrypted relay."
      badge="ZERO-CONTACT EXPOSURE"
    >
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Conversation List */}
        <div className="p-5 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
            <span className="font-bold text-white uppercase">INBOX CHANNELS</span>
            <span>{conversations.length} CONVERSATIONS</span>
          </div>

          <div className="flex flex-col gap-2">
            {conversations.map((c) => {
              const isSelected = activeConv?.id === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/40 shadow-sm'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{c.withUser}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{c.lastAt}</span>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[11px] text-indigo-400 font-medium">
                    <Tag className="h-3 w-3 shrink-0" />
                    <span className="truncate">{c.reportTitle}</span>
                  </div>

                  <p className="mt-1 text-xs text-zinc-400 line-clamp-1">{c.lastMessage}</p>

                  {c.unread > 0 && (
                    <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {c.unread} NEW
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Chat Conversation Pane */}
        {activeConv ? (
          <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col justify-between min-h-[500px]">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-['var(--font-heading)']">
                      {activeConv.withUser}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      MASKED RELAY
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Regarding Item:{' '}
                    <strong className="text-zinc-200">{activeConv.reportTitle}</strong> (
                    <span className="font-mono text-indigo-400">#{activeConv.reportId}</span>)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/search/${activeConv.reportId}`}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
                  >
                    <span>View Item</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Notice */}
              <div className="my-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Your real phone number and identity are masked by the system.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setReportModalOpen(true)}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Report User
                </button>
              </div>

              {/* Message Feed */}
              <div className="flex flex-col gap-3 py-4 max-h-[360px] overflow-y-auto pr-1">
                {activeConv.messages.map((m) => {
                  const isMe = m.from === 'me'
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col max-w-[80%] ${
                        isMe ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mb-1">
                        <span>{isMe ? 'You' : activeConv.withUser}</span>
                        <span>•</span>
                        <span>{m.at}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                            : 'bg-[#10111a] border border-white/10 text-zinc-200 rounded-bl-none'
                        }`}
                      >
                        {m.body}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Type a secure message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </ModernShell>
  )
}
