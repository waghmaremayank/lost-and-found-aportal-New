'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Smartphone,
  Laptop,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Lock,
  LogOut,
  History,
  X,
  QrCode,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { SESSIONS, SECURITY_LOG, type SecuritySession, type SecurityLogEntry } from '@/lib/mock-data'

export default function SecurityCenterPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessions, setSessions] = useState<SecuritySession[]>(SESSIONS)
  const [logs, setLogs] = useState<SecurityLogEntry[]>(SECURITY_LOG)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const handleKillSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setToast(`Remote session ${id} revoked successfully.`)
    setTimeout(() => setToast(null), 3500)
  }

  const handleLogoutAllOther = () => {
    setSessions((prev) => prev.filter((s) => s.current))
    setToast('Logged out of all 2 other remote devices.')
    setTimeout(() => setToast(null), 3500)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPw) return
    setPasswordModalOpen(false)
    setCurrentPw('')
    setNewPw('')
    setLogs((prev) => [
      {
        at: 'Just now',
        type: 'PASSWORD CHANGED',
        status: 'SUCCESS',
        detail: 'User: U-2048 (SHA-256 updated)',
      },
      ...prev,
    ])
    setToast('Password updated securely with bcrypt 12-round hashing.')
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <ModernShell
      activeKey="security"
      title="Security &amp; Encryption Center"
      subtitle="Manage two-factor authentication, active device sessions, and audit trail records."
      badge="ZERO-TRUST ENCLAVE"
    >
      <div className="flex flex-col gap-6">
        {/* Toast */}
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

        {/* Change Password Modal */}
        {passwordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                aria-label="Close password modal"
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="text-base font-bold text-white">Update Account Password</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Enter your current and new credentials to update your encrypted hash.
              </p>

              <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Current Password *</label>
                  <input
                    type="password"
                    required
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">New Secure Password *</label>
                  <input
                    type="password"
                    required
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Min 10 characters"
                    className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2FA Setup Modal */}
        {twoFactorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl text-center">
              <button
                type="button"
                onClick={() => setTwoFactorModalOpen(false)}
                aria-label="Close 2FA modal"
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="text-base font-bold text-white">Configure Authenticator App</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Scan this QR code in Google Authenticator or 1Password.
              </p>

              <div className="my-5 p-6 rounded-2xl bg-white w-36 h-36 mx-auto flex items-center justify-center text-zinc-950">
                <QrCode className="h-28 w-28" />
              </div>

              <span className="font-mono text-xs text-indigo-300 block bg-white/5 p-2 rounded-xl border border-white/10">
                KEY: LOST-AUTH-CAMPUS-2048
              </span>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(true)
                    setTwoFactorModalOpen(false)
                    setToast('2FA Authenticator activated.')
                    setTimeout(() => setToast(null), 3500)
                  }}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors"
                >
                  Confirm &amp; Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posture Overview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="font-bold text-white uppercase">SECURITY POSTURE RATING: 100/100</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OPTIMAL DEFENSE
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Email Verified</span>
                <span className="text-[11px] text-zinc-500 font-mono">a***@mail.com</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Strong Password</span>
                <span className="text-[11px] text-zinc-500">Updated 1 day ago</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Active Devices</span>
                <span className="text-[11px] text-zinc-500">{sessions.length} authorized</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              {twoFactorEnabled ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
              )}
              <div>
                <span className="text-xs font-bold text-white block">2FA Status</span>
                <span className="text-[11px] text-zinc-500">{twoFactorEnabled ? 'Active (TOTP)' : 'Disabled'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPasswordModalOpen(true)}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <KeyRound className="h-3.5 w-3.5" />
              Change Password
            </button>
            <button
              type="button"
              onClick={() => {
                if (twoFactorEnabled) {
                  setTwoFactorEnabled(false)
                  setToast('2FA has been disabled.')
                  setTimeout(() => setToast(null), 3000)
                } else {
                  setTwoFactorModalOpen(true)
                }
              }}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <Smartphone className="h-3.5 w-3.5" />
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white font-['var(--font-heading)']">
              Authorized Devices &amp; Sessions
            </h3>
            {sessions.length > 1 && (
              <button
                type="button"
                onClick={handleLogoutAllOther}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
              >
                Log Out All Other Devices
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0">
                    {s.device.includes('iPhone') ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{s.device}</span>
                      {s.current && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          CURRENT DEVICE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      {s.location} • {s.lastActive}
                    </span>
                  </div>
                </div>

                {!s.current && (
                  <button
                    type="button"
                    onClick={() => handleKillSession(s.id)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 self-end sm:self-center transition-colors"
                  >
                    Terminate Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Security Log */}
        <div className="p-6 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white font-['var(--font-heading)']">
              Audit Log &amp; Security Events
            </h3>
            <span className="text-xs font-mono text-zinc-500">{logs.length} AUDITED EVENTS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-zinc-500">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Event Type</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {logs.map((l, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-zinc-500 text-[11px]">{l.at}</td>
                    <td className="py-3 font-bold text-indigo-300">{l.type}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          l.status === 'SUCCESS'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : l.status === 'BLOCKED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-white/10 text-zinc-300 border border-white/10'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-300">{l.detail}</td>
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
