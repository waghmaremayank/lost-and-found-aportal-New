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
  RetroSelect,
  RetroCheckbox,
} from '@/components/retro'

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('alex.m')
  const [email, setEmail] = useState('alex.miller@campus.edu')
  const [preferredSpot, setPreferredSpot] = useState('Campus Security Main Desk (Bldg A)')
  const [anonMode, setAnonMode] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [toast, setToast] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setToast('User profile preferences updated successfully.')
    setTimeout(() => setToast(null), 3500)
  }

  const handleExportData = () => {
    const data = {
      user: 'U-2048',
      displayName,
      email,
      created: '2026-06-01',
      reportsCount: 4,
      karmaRating: '100%',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lost98_user_U2048_profile.json`
    a.click()
    setToast('Personal data package downloaded (GDPR compliant).')
    setTimeout(() => setToast(null), 3500)
  }

  return (
    <DesktopShell activeKey="profile">
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

        <div className="grid gap-3 lg:grid-cols-[1fr_1.4fr]">
          {/* User ID Card */}
          <RetroWindow
            title="User Identity Card"
            icon={<UserRound className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'close']}
          >
            <div className="flex flex-col gap-3">
              <div className="bevel-in bg-win-white flex flex-col items-center gap-2 p-4 text-center">
                <div className="bevel-out grid h-20 w-20 place-items-center bg-win-title text-win-white text-3xl font-black">
                  AM
                </div>
                <div>
                  <h3 className="font-pixel text-base text-win-title">{displayName}</h3>
                  <p className="font-mono-sys text-[12px] font-bold text-win-shadow">ID: U-2048</p>
                </div>
                <RetroBadge tone="green">VERIFIED COMMUNITY MEMBER</RetroBadge>
              </div>

              <RetroGroupBox legend="Account Reputation & Karma">
                <div className="flex flex-col gap-2 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-win-shadow">Member Since:</span>
                    <span className="font-bold">June 1, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-win-shadow">Reports Filed:</span>
                    <span className="font-bold">4 cases</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-win-shadow">Items Reunited:</span>
                    <span className="font-bold text-win-green">2 items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-win-shadow">Trust Score:</span>
                    <span className="font-bold text-win-title">100% (High Trust)</span>
                  </div>
                </div>
              </RetroGroupBox>

              <div className="flex flex-col gap-2 pt-1">
                <RetroButton onClick={handleExportData} className="gap-1.5 text-[12px]">
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  Export Personal Data (JSON)
                </RetroButton>
                <Link href="/security">
                  <RetroButton className="w-full gap-1.5 text-[12px]">
                    <KeyRound className="h-3.5 w-3.5" aria-hidden />
                    Open Security Center
                  </RetroButton>
                </Link>
              </div>
            </div>
          </RetroWindow>

          {/* Profile Settings Form */}
          <RetroWindow
            title="Profile & Privacy Settings"
            icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'maximize', 'close']}
          >
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <RetroGroupBox legend="Public & Private Profile Information">
                <div className="grid gap-3 sm:grid-cols-2">
                  <RetroField label="Display Handle / Nickname" htmlFor="prof-name" required>
                    <RetroInput
                      id="prof-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Registered Email (Hidden)" htmlFor="prof-email" required>
                    <RetroInput
                      id="prof-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </RetroField>

                  <RetroField
                    label="Default Preferred Meetup Spot"
                    htmlFor="prof-spot"
                    className="sm:col-span-2"
                  >
                    <RetroSelect
                      id="prof-spot"
                      value={preferredSpot}
                      onChange={(e) => setPreferredSpot(e.target.value)}
                    >
                      <option value="Campus Security Main Desk (Bldg A)">
                        Campus Security Main Desk (Bldg A)
                      </option>
                      <option value="Student Union Information Center">
                        Student Union Information Center
                      </option>
                      <option value="Central Library Front Circulation Desk">
                        Central Library Front Circulation Desk
                      </option>
                    </RetroSelect>
                  </RetroField>
                </div>
              </RetroGroupBox>

              <RetroGroupBox legend="Privacy Controls">
                <div className="flex flex-col gap-2.5">
                  <RetroCheckbox
                    id="anon"
                    checked={anonMode}
                    onChange={(e) => setAnonMode(e.target.checked)}
                    label={
                      <span>
                        <strong>Mask Email & Identity in Community Listings</strong>
                        <span className="block text-[11px] text-win-shadow">
                          All communications will go strictly through encrypted relay.
                        </span>
                      </span>
                    }
                  />

                  <RetroCheckbox
                    id="em-up"
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                    label={
                      <span>
                        <strong>Send Match Notifications to Email</strong>
                        <span className="block text-[11px] text-win-shadow">
                          Immediate alerts when high-confidence matches are found.
                        </span>
                      </span>
                    }
                  />
                </div>
              </RetroGroupBox>

              <div className="flex justify-end gap-2 pt-1">
                <RetroButton type="submit" variant="primary" className="gap-1.5">
                  <Save className="h-3.5 w-3.5" aria-hidden />
                  Save Preferences
                </RetroButton>
              </div>

              <RetroStatusBar
                segments={[
                  <span key="role" className="font-mono-sys">
                    ROLE: USER (LEVEL 1)
                  </span>,
                  <RetroBadge key="sec" tone="green">
                    RLS RESTRICTED
                  </RetroBadge>,
                ]}
              />
            </form>
          </RetroWindow>
        </div>
      </div>
    </DesktopShell>
  )
}
