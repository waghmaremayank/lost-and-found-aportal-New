import Link from 'next/link'
import { Sparkles, MessageSquare } from 'lucide-react'
import { RetroTaskbar } from '@/components/shell/retro-taskbar'
import { RetroButton, RetroNotification } from '@/components/retro'
import { DesktopIcons } from '@/components/home/desktop-icons'
import { HeroWindow } from '@/components/home/hero-window'
import { SecurityWindow } from '@/components/home/security-window'

export default function HomePage() {
  return (
    <div
      className="min-h-dvh bg-win-desktop"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
      }}
    >
      <div className="mx-auto flex max-w-6xl gap-4 px-3 pb-16 pt-3">
        <div className="hidden shrink-0 sm:block">
          <DesktopIcons />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <HeroWindow />
          <SecurityWindow />

          <footer className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-win-white/80">
            <span>© 1998–2026 LOST//98 SYSTEMS. All items returned responsibly.</span>
            <div className="flex gap-3">
              <Link href="/login" className="underline underline-offset-2 hover:text-win-white">
                Log In
              </Link>
              <Link href="/register" className="underline underline-offset-2 hover:text-win-white">
                Create Account
              </Link>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating notification demo */}
      <div className="fixed right-3 top-3 z-40 hidden lg:block">
        <RetroNotification
          title="POSSIBLE MATCH FOUND"
          icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />}
          action={
            <Link href="/search">
              <RetroButton className="w-full gap-2 text-[12px]">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                Review Match
              </RetroButton>
            </Link>
          }
        >
          A found item may match your lost report{' '}
          <span className="font-bold">#L98-2049</span>. Confidence: 87%.
        </RetroNotification>
      </div>

      <RetroTaskbar />
    </div>
  )
}
