'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
} from 'lucide-react'
import {
  RetroWindow,
  RetroButton,
  RetroInput,
  RetroField,
  RetroCheckbox,
  RetroStatusBar,
} from '@/components/retro'
import { RetroTaskbar } from '@/components/shell/retro-taskbar'

export default function RegisterPage() {
  const router = useRouter()
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [agree, setAgree] = useState(true)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handle || !email || !password) return
    router.push('/dashboard')
  }

  return (
    <div className="min-h-dvh bg-win-desktop flex items-center justify-center p-3 pb-16">
      <div className="w-full max-w-md">
        <RetroWindow
          title="Create New LOST//98 Account"
          icon={<UserPlus className="h-3.5 w-3.5 text-win-title" aria-hidden />}
          controls={['close']}
        >
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="bevel-out bg-win-face-light p-2.5 text-[12px] text-win-text">
              <p className="font-bold">Welcome to LOST//98!</p>
              <p className="text-win-shadow">
                Create your verified profile to submit lost/found reports and participate in ownership verification quizzes.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <RetroField label="Display Handle" htmlFor="reg-handle" required className="sm:col-span-2">
                <RetroInput
                  id="reg-handle"
                  placeholder="e.g. jordan.k"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  required
                />
              </RetroField>

              <RetroField label="Email Address" htmlFor="reg-email" required className="sm:col-span-2">
                <RetroInput
                  id="reg-email"
                  type="email"
                  placeholder="name@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </RetroField>

              <RetroField label="Password" htmlFor="reg-pw" required>
                <RetroInput
                  id="reg-pw"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </RetroField>

              <RetroField label="Confirm Password" htmlFor="reg-cpw" required>
                <RetroInput
                  id="reg-cpw"
                  type="password"
                  placeholder="••••••••••••"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                />
              </RetroField>

              <div className="sm:col-span-2">
                <RetroCheckbox
                  id="reg-agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  label={
                    <span>
                      <strong>I agree to the Community Safety Guidelines</strong>
                      <span className="block text-[11px] text-win-shadow">
                        I will only conduct handovers at verified public security desks.
                      </span>
                    </span>
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-win-face-light">
              <Link href="/login" className="text-[12px] text-win-title underline">
                Already have an account? Log on
              </Link>

              <div className="flex gap-2">
                <Link href="/">
                  <RetroButton type="button">Cancel</RetroButton>
                </Link>
                <RetroButton type="submit" variant="primary" className="gap-1.5 min-w-[100px]">
                  <span>Sign Up</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </RetroButton>
              </div>
            </div>
          </form>
        </RetroWindow>
      </div>

      <RetroTaskbar />
    </div>
  )
}
