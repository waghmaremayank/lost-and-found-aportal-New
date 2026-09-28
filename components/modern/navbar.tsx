'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Bell,
  Menu,
  X,
  Compass,
  FilePlus2,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Users,
  ShieldAlert,
  HardDrive,
  ChevronDown,
} from 'lucide-react'
import { NOTIFICATIONS } from '@/lib/mock-data'

export function ModernNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Explore', href: '/search' },
    { label: 'Lost Items', href: '/lost' },
    { label: 'Found Items', href: '/found' },
    { label: 'Claims', href: '/claims' },
    { label: 'Community', href: '/community' },
    { label: 'Messages', href: '/messages' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Capsule Bar */}
        <div
          className={`w-full flex items-center justify-between px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 border ${
            scrolled
              ? 'bg-[#0b0c13]/85 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/60'
              : 'bg-[#10111a]/70 backdrop-blur-lg border-white/10 shadow-lg'
          }`}
        >
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                LF
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-['var(--font-heading)']">
                  LOST &amp; FOUND
                  <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    CAMPUS
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Icons & Report Capsule */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <Link
              href="/search"
              aria-label="Search lost and found catalog"
              className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
            </Link>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen(!notifOpen)}
                aria-label="Toggle notifications"
                className="relative h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              >
                <Bell className="h-3.5 w-3.5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-[#090a0f]" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#12131d] border border-white/15 p-3 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                      Live Alerts ({unreadCount} new)
                    </span>
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[11px] text-zinc-400 hover:text-indigo-300 transition-colors"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-white/5 max-h-64 overflow-y-auto py-1">
                    {NOTIFICATIONS.map((n) => (
                      <Link
                        key={n.id}
                        href="/notifications"
                        onClick={() => setNotifOpen(false)}
                        className="block p-2 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <span className="h-2 w-2 mt-1.5 rounded-full bg-indigo-400 shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-zinc-200">{n.title}</p>
                            <p className="text-[11px] text-zinc-400 line-clamp-1">{n.message}</p>
                            <span className="text-[10px] text-zinc-500">{n.at}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="block text-center pt-2 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 border-t border-white/5"
                  >
                    View all notifications →
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Report CTA */}
            <Link
              href="/lost"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              <span>+ Report Item</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 px-4 pointer-events-auto">
          <div className="p-4 rounded-3xl bg-[#10111a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              <Link
                href="/lost"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold"
              >
                <FilePlus2 className="h-4 w-4 text-rose-400" />
                Report Lost
              </Link>
              <Link
                href="/found"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold"
              >
                <MapPin className="h-4 w-4 text-emerald-400" />
                Report Found
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              {[
                { label: 'Home Feed', href: '/', icon: Compass },
                { label: 'Search Database', href: '/search', icon: Search },
                { label: 'Claims & Verify', href: '/claims', icon: CheckCircle2 },
                { label: 'Community Hub', href: '/community', icon: Users },
                { label: 'Messages', href: '/messages', icon: MessageSquare },
                { label: 'Security Center', href: '/security', icon: ShieldCheck },
                { label: 'Admin Dashboard', href: '/admin', icon: ShieldAlert },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-indigo-400" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
