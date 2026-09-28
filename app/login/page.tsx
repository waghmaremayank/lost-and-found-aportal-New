'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  KeyRound,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Laptop,
} from 'lucide-react'
import {
  RetroWindow,
  RetroButton,
  RetroInput,
  RetroField,
  RetroDialog,
  RetroBadge,
} from '@/components/retro'
import { RetroTaskbar } from '@/components/shell/retro-taskbar'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('alex.m')
  const [password, setPassword] = useState('••••••••••••')
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  const handleDemoSelect = (user: string) => {
    setUsername(user)
    setPassword('••••••••••••')
  }

  return (
    <div className="min-h-dvh bg-win-desktop flex items-center justify-center p-3 pb-16">
      {/* Password Recovery Modal */}
      <RetroDialog
        open={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false)
          setResetSent(false)
        }}
        title="PASSWORD RECOVERY DISPATCH"
        icon={<HelpCircle className="h-4 w-4 text-win-title" aria-hidden />}
        className="max-w-sm"
      >
        <div className="flex flex-col gap-3 text-[12px]">
          {resetSent ? (
            <div className="bevel-in bg-win-white p-3 text-center">
              <p className="font-bold text-win-green">RECOVERY LINK DISPATCHED</p>
              <p className="mt-1 text-win-shadow">
                Check your verified email inbox for one-time reset token instructions.
              </p>
            </div>
          ) : (
            <>
              <p>
                Enter your verified email address to receive an authenticated reset link.
              </p>
              <RetroField label="Registered Email" htmlFor="rec-email">
                <RetroInput
                  id="rec-email"
                  type="email"
                  placeholder="name@campus.edu"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </RetroField>
            </>
          )}

          <div className="flex justify-end gap-2 pt-1">
            {!resetSent ? (
              <RetroButton variant="primary" onClick={() => setResetSent(true)}>
                Send Reset Link
              </RetroButton>
            ) : null}
            <RetroButton
              onClick={() => {
                setForgotModalOpen(false)
                setResetSent(false)
              }}
            >
              Close
            </RetroButton>
          </div>
        </div>
      </RetroDialog>

      <div className="w-full max-w-md">
        <RetroWindow
          title="Log On to LOST//98 Domain"
          icon={<KeyRound className="h-3.5 w-3.5 text-win-title" aria-hidden />}
          controls={['close']}
        >
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="bevel-out hidden sm:grid h-16 w-16 shrink-0 place-items-center bg-win-face text-win-title">
                <KeyRound className="h-10 w-10" aria-hidden />
              </div>

              <div className="flex-1 text-[12px] leading-relaxed text-win-text">
                <p className="font-bold">LOST//98 Community Operating System</p>
                <p className="text-win-shadow">
                  Type a user name and password to log on to the secure Lost & Found network.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <RetroField label="User Name:" htmlFor="login-user">
                <RetroInput
                  id="login-user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </RetroField>

              <RetroField label="Password:" htmlFor="login-pw">
                <RetroInput
                  id="login-pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </RetroField>

              <div className="flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-win-shadow underline hover:text-win-title"
                >
                  Forgot password?
                </button>
                <Link href="/register" className="text-win-title underline font-bold">
                  Create new account
                </Link>
              </div>
            </div>

            {/* Quick Demo Persona Switcher */}
            <div className="bevel-groove p-2">
              <p className="text-[11px] font-bold text-win-shadow">FAST DEMO SWITCHER:</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDemoSelect('alex.m (User)')}
                  className="bevel-out bg-win-face px-2 py-0.5 text-[11px] hover:bg-win-face-light"
                >
                  Alex M. (User)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect('sam.r (Moderator)')}
                  className="bevel-out bg-win-face px-2 py-0.5 text-[11px] hover:bg-win-face-light"
                >
                  Sam R. (Moderator)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect('sysadmin (Root Admin)')}
                  className="bevel-out bg-win-face px-2 py-0.5 text-[11px] hover:bg-win-face-light"
                >
                  Admin (Root)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-win-face-light">
              <Link href="/">
                <RetroButton type="button">Cancel</RetroButton>
              </Link>
              <RetroButton type="submit" variant="primary" className="gap-1.5 min-w-[90px]">
                <span>Log On</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </RetroButton>
            </div>
          </form>
        </RetroWindow>
      </div>

      <RetroTaskbar />
    </div>
  )
}
