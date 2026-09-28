'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  UserRound,
  ShieldCheck,
  Award,
  Download,
  CheckCircle2,
  Mail,
  MapPin,
  Save,
  KeyRound,
  Sparkles,
  Shield,
  Activity,
  History,
  QrCode,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('Alex Miller')
  const [email, setEmail] = useState('alex.miller@campus.edu')
  const [handle, setHandle] = useState('alex.m')
  const [studentId, setStudentId] = useState('STU-882941')
  const [preferredSpot, setPreferredSpot] = useState('Campus Security Main Desk (Bldg A)')
  const [anonMode, setAnonMode] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setToast('Profile preferences saved successfully.')
    setTimeout(() => setToast(null), 3500)
  }

  const handleExportData = () => {
    const data = {
      user: 'U-2048',
      displayName,
      handle,
      email,
      studentId,
      created: '2026-06-01',
      reportsCount: 4,
      reunitedCount: 2,
      karmaRating: '100%',
      reputationLevel: 'Tier 3 Trusted Finder',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lostfound_user_profile_${handle}.json`
    a.click()
    setToast('Data export package downloaded (GDPR / FERPA Compliant).')
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <ModernShell activeKey="profile">
      <div className="flex flex-col gap-6">
        {/* Toast Alert */}
        {toast && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 backdrop-blur-md text-sm font-medium text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden />
              {toast}
            </span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 text-emerald-400/70 hover:bg-emerald-500/20 hover:text-emerald-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Profile Hero Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
          {/* Identity & Reputation Card */}
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-black text-white shadow-xl shadow-indigo-500/20 ring-4 ring-white/10">
                    AM
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black ring-2 ring-[#090a0f]" title="Verified Student">
                    <ShieldCheck className="h-3.5 w-3.5 text-black" />
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white">{displayName}</h2>
                <p className="font-mono text-xs text-indigo-400">@{handle} · ID: {studentId}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <Sparkles className="h-3 w-3" />
                    Verified Campus Finder
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <div className="text-2xl font-extrabold text-white">4</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Reports Filed</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400">2</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Reunions Closed</div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Community Trust Score</span>
                  <span className="font-bold text-emerald-400">100% (High Trust)</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/40 pt-1">
                  <span>Joined June 2026</span>
                  <span>Zero Dispute Flags</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Download className="h-3.5 w-3.5 text-indigo-400" />
                  Export Identity Vault (JSON)
                </button>
                <Link
                  href="/security"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  Manage Security & 2FA Keys
                </Link>
              </div>
            </div>
          </div>

          {/* Settings & Privacy Controls */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm flex flex-col justify-between">
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  <UserRound className="h-4 w-4" />
                  <span>Profile Configuration</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                  Account Details & Safe Contact Preferences
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Update public handles, safe rendezvous locations, and notification triggers.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/70">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/70">Public Handle</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/70">Campus Email (Authenticated)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white/70 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/70">Campus Student / Staff ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white/70 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/70">Default Preferred Rendezvous Spot</label>
                  <select
                    value={preferredSpot}
                    onChange={(e) => setPreferredSpot(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#0f111a] px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="Campus Security Main Desk (Bldg A)">Campus Security Main Desk (Bldg A)</option>
                    <option value="Student Union Information Center">Student Union Information Center</option>
                    <option value="Central Library Front Circulation Desk">Central Library Front Circulation Desk</option>
                    <option value="Engineering Quad Hub Desk">Engineering Quad Hub Desk</option>
                  </select>
                </div>
              </div>

              {/* Privacy toggles */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-3.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Privacy & Notification Settings
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={anonMode}
                    onChange={(e) => setAnonMode(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-500/50"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      Mask Direct Email in Community Listings
                    </span>
                    <p className="text-[11px] text-white/50">
                      Inquiries and claim matches will route through cryptographic relay without exposing your raw address.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-500/50"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      Instant Match Email Broadcasts
                    </span>
                    <p className="text-[11px] text-white/50">
                      Receive immediate push notifications whenever an AI confidence score exceeds 85%.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-white/40 font-mono">
                  ROLE: TIER-3 (VERIFIED)
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-purple-500 transition-all"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModernShell>
  )
}
