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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroInput,
  RetroField,
  RetroDialog,
  RetroProgressBar,
} from '@/components/retro'
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
    <DesktopShell activeKey="security">
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

        {/* Change Password Dialog */}
        <RetroDialog
          open={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          title="CHANGE ACCOUNT PASSWORD"
          icon={<KeyRound className="h-4 w-4 text-win-title" aria-hidden />}
          className="max-w-md"
        >
          <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
            <RetroField label="Current Password" htmlFor="curr-pw" required>
              <RetroInput
                id="curr-pw"
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </RetroField>

            <RetroField label="New Secure Password" htmlFor="new-pw" required>
              <RetroInput
                id="new-pw"
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Minimum 10 characters"
                required
              />
            </RetroField>

            <div className="bevel-field bg-win-face-light p-2 text-[11px] text-win-shadow">
              Password requirements: Mix of uppercase, lowercase, numbers, and special symbols.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <RetroButton type="submit" variant="primary">
                Update Password
              </RetroButton>
              <RetroButton type="button" onClick={() => setPasswordModalOpen(false)}>
                Cancel
              </RetroButton>
            </div>
          </form>
        </RetroDialog>

        {/* 2FA Setup Modal */}
        <RetroDialog
          open={twoFactorModalOpen}
          onClose={() => setTwoFactorModalOpen(false)}
          title="TWO-FACTOR AUTHENTICATION CONFIGURATION"
          icon={<Smartphone className="h-4 w-4 text-win-title" aria-hidden />}
          className="max-w-md"
        >
          <div className="flex flex-col gap-3 text-[12px]">
            <p>
              Two-Factor Authentication adds an extra layer of defense against account takeover.
            </p>
            <div className="bevel-in bg-win-white flex flex-col items-center gap-2 p-3 text-center">
              <div className="bevel-out grid h-24 w-24 place-items-center bg-win-face font-mono-sys text-[11px] font-bold">
                [ 2FA QR CODE ]
              </div>
              <p className="font-mono-sys text-[11px] font-bold text-win-title">KEY: LOST98-AUTH-SEC-2048</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <RetroButton
                variant="primary"
                onClick={() => {
                  setTwoFactorEnabled(true)
                  setTwoFactorModalOpen(false)
                  setToast('2FA Authenticator enabled.')
                  setTimeout(() => setToast(null), 3500)
                }}
              >
                Confirm Setup
              </RetroButton>
              <RetroButton onClick={() => setTwoFactorModalOpen(false)}>Close</RetroButton>
            </div>
          </div>
        </RetroDialog>

        <RetroWindow
          title="LOST//98 Cybersecurity Center"
          icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Account Status Grid */}
            <RetroGroupBox legend="Account Security Posture">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bevel-in bg-win-white flex items-center gap-2.5 p-2">
                  <CheckCircle2 className="h-5 w-5 text-win-green shrink-0" aria-hidden />
                  <div>
                    <p className="text-[12px] font-bold">Email Verified</p>
                    <p className="text-[10px] text-win-shadow">a***@mail.com</p>
                  </div>
                </div>

                <div className="bevel-in bg-win-white flex items-center gap-2.5 p-2">
                  <CheckCircle2 className="h-5 w-5 text-win-green shrink-0" aria-hidden />
                  <div>
                    <p className="text-[12px] font-bold">Strong Password</p>
                    <p className="text-[10px] text-win-shadow">Changed 1 day ago</p>
                  </div>
                </div>

                <div className="bevel-in bg-win-white flex items-center gap-2.5 p-2">
                  <CheckCircle2 className="h-5 w-5 text-win-green shrink-0" aria-hidden />
                  <div>
                    <p className="text-[12px] font-bold">Active Sessions</p>
                    <p className="text-[10px] text-win-shadow">{sessions.length} authorized</p>
                  </div>
                </div>

                <div className="bevel-in bg-win-white flex items-center gap-2.5 p-2">
                  {twoFactorEnabled ? (
                    <CheckCircle2 className="h-5 w-5 text-win-green shrink-0" aria-hidden />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-win-red shrink-0" aria-hidden />
                  )}
                  <div>
                    <p className="text-[12px] font-bold">2FA Protection</p>
                    <p className="text-[10px] text-win-shadow">
                      {twoFactorEnabled ? 'Enabled (TOTP)' : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex flex-wrap gap-2">
                <RetroButton onClick={() => setPasswordModalOpen(true)} className="gap-1.5 text-[12px]">
                  <KeyRound className="h-3.5 w-3.5" aria-hidden />
                  Change Password
                </RetroButton>

                <RetroButton
                  onClick={() => {
                    if (twoFactorEnabled) {
                      setTwoFactorEnabled(false)
                      setToast('2FA has been disabled.')
                      setTimeout(() => setToast(null), 3000)
                    } else {
                      setTwoFactorModalOpen(true)
                    }
                  }}
                  className="gap-1.5 text-[12px]"
                >
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                  {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </RetroButton>
              </div>
            </RetroGroupBox>

            {/* Active Sessions Manager */}
            <RetroGroupBox legend="Active Sessions & Devices">
              <div className="flex flex-col gap-2">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    className="bevel-out bg-win-face flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="bevel-in grid h-7 w-7 place-items-center bg-win-white text-win-title">
                        {s.device.includes('iPhone') ? (
                          <Smartphone className="h-4 w-4" aria-hidden />
                        ) : (
                          <Laptop className="h-4 w-4" aria-hidden />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-[12px] font-bold">
                          <span>{s.device}</span>
                          {s.current && (
                            <RetroBadge tone="green" className="text-[9px]">
                              CURRENT SESSION
                            </RetroBadge>
                          )}
                        </div>
                        <p className="text-[11px] text-win-shadow">
                          {s.location} • Last active: {s.lastActive}
                        </p>
                      </div>
                    </div>

                    {!s.current && (
                      <RetroButton
                        onClick={() => handleKillSession(s.id)}
                        className="self-end sm:self-center text-[11px] text-win-red"
                      >
                        Terminate
                      </RetroButton>
                    )}
                  </div>
                ))}

                {sessions.length > 1 && (
                  <div className="flex justify-end pt-1">
                    <RetroButton
                      onClick={handleLogoutAllOther}
                      className="gap-1 text-[12px] text-win-red"
                    >
                      <LogOut className="h-3.5 w-3.5" aria-hidden />
                      Log Out From All Other Devices
                    </RetroButton>
                  </div>
                )}
              </div>
            </RetroGroupBox>

            {/* Live Security Log & Audit Trail */}
            <RetroGroupBox legend="Live Security Event Log & Audit Trail">
              <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
                <table className="w-full text-left text-[12px]">
                  <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                    <tr>
                      <th className="px-2 py-1.5">Timestamp</th>
                      <th className="px-2 py-1.5">Event Type</th>
                      <th className="px-2 py-1.5">Status</th>
                      <th className="px-2 py-1.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-win-face-light font-mono-sys">
                    {logs.map((l, i) => (
                      <tr key={i} className="hover:bg-win-title/10">
                        <td className="px-2 py-1.5 text-win-shadow">{l.at}</td>
                        <td className="px-2 py-1.5 font-bold text-win-title">{l.type}</td>
                        <td className="px-2 py-1.5">
                          <RetroBadge
                            tone={
                              l.status === 'SUCCESS'
                                ? 'green'
                                : l.status === 'BLOCKED'
                                ? 'red'
                                : 'blue'
                            }
                          >
                            {l.status}
                          </RetroBadge>
                        </td>
                        <td className="px-2 py-1.5 text-win-text">{l.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </RetroGroupBox>

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="sec" className="flex items-center gap-1 font-bold text-win-green">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  FIREWALL & RLS ACTIVE
                </span>,
                <RetroBadge key="prot" tone="green">
                  ALL SESSIONS GUARDED
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
