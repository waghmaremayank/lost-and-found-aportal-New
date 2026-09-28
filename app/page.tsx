import Link from 'next/link'
import { Sparkles, MessageSquare, HardDrive, ShieldCheck, FileText } from 'lucide-react'
import { RetroTaskbar } from '@/components/shell/retro-taskbar'
import { RetroButton, RetroNotification, RetroWindow } from '@/components/retro'
import { DesktopIcons } from '@/components/home/desktop-icons'
import { HeroWindow } from '@/components/home/hero-window'
import { RecentItemsWindow } from '@/components/home/recent-items-window'
import { SecurityWindow } from '@/components/home/security-window'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-win-desktop">
      <div className="mx-auto flex max-w-7xl gap-4 px-3 pb-16 pt-3">
        {/* Desktop Icons Column */}
        <div className="hidden shrink-0 sm:block">
          <DesktopIcons />
        </div>

        {/* Desktop Main Workspace Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <HeroWindow />
          <RecentItemsWindow />
          <SecurityWindow />

          {/* Desktop Footer Info */}
          <footer className="bevel-out bg-win-face flex flex-wrap items-center justify-between gap-2 p-2 text-[11px] text-win-text">
            <span>
              <strong>LOST//98 v1.0</strong> — Designed for campus &amp; community lost property recovery.
            </span>
            <div className="flex gap-3">
              <Link href="/login" className="text-win-title font-bold underline">
                Log In to Domain
              </Link>
              <Link href="/register" className="text-win-title font-bold underline">
                New User Registration
              </Link>
              <Link href="/security" className="text-win-green font-bold underline">
                Security Center
              </Link>
            </div>
          </footer>
        </div>
      </div>

      {/* Floating Notification Widget */}
      <div className="fixed right-3 top-3 z-40 hidden lg:block">
        <RetroNotification
          title="POSSIBLE MATCH FOUND"
          icon={<Sparkles className="h-3.5 w-3.5 text-win-title" aria-hidden />}
          action={
            <Link href="/search/L98-2048">
              <RetroButton variant="primary" className="w-full gap-2 text-[12px]">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                Review Match
              </RetroButton>
            </Link>
          }
        >
          A found item may match your lost report{' '}
          <span className="font-bold">#L98-2049</span>. Match confidence:{' '}
          <strong className="text-win-title">87%</strong>.
        </RetroNotification>
      </div>

      <RetroTaskbar />
    </div>
  )
}
