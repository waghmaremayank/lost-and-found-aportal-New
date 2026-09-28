'use client'

import Link from 'next/link'
import {
  FilePlus2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
  QrCode,
  BellRing,
  Building,
} from 'lucide-react'

export function ModernHowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Precision Item Reporting',
      tag: 'INPUT // ENCRYPTED',
      description:
        'Submit public visual details with photo tags, while keeping private serials and secret marks securely locked in the zero-knowledge vault.',
      bullets: ['Fast photo upload & category tagging', 'Campus hotspot selector', 'Private proof encryption'],
      actionHref: '/lost',
      actionText: 'Start Lost Report',
    },
    {
      num: '02',
      title: 'AI Similarity Engine',
      tag: 'MATCH // REAL-TIME',
      description:
        'The matching engine continuously computes similarity vectors between lost and found entries, scoring color, brand, and temporal proximity.',
      bullets: ['Automated similarity alerts', 'Temporal & spatial proximity scoring', 'Instant push notifications'],
      actionHref: '/search',
      actionText: 'Explore Match Matrix',
    },
    {
      num: '03',
      title: 'Zero-Fraud Campus Handover',
      tag: 'VERIFY // SECURE',
      description:
        'Claimants must successfully answer secret verification challenges. Safe handoffs occur at official campus security hubs or via masked chats.',
      bullets: ['Anti-fraud question challenge', 'Verified campus desk lockers', 'Masked identity messaging'],
      actionHref: '/claims',
      actionText: 'View Verification Process',
    },
  ]

  return (
    <section className="relative py-16 md:py-24 border-t border-white/10 bg-[#0c0d14]/40">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400">
              <span className="text-indigo-400 font-bold">//</span>
              <span>WORKFLOW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-2 font-['var(--font-heading)']">
              How the System Works
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Built from the ground up for university campuses and organizations to eliminate fraudulent claims and speed up recovery times.
          </p>
        </div>

        {/* 3-Column Framer Numbered Cards (01, 02, 03) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-3xl bg-[#12131d]/60 border border-white/10 hover:border-white/20 p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="text-3xl sm:text-4xl font-black font-['var(--font-heading)'] text-zinc-600 group-hover:text-indigo-400 transition-colors">
                    {step.num}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 text-zinc-400 border border-white/10">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-6 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  {step.description}
                </p>

                <ul className="mt-6 flex flex-col gap-2">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <Link
                  href={step.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors"
                >
                  <span>{step.actionText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
