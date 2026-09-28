'use client'

import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

export function ModernFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How does the private ownership verification lock work?',
      a: 'When you report a lost item, you provide secret details (such as interior pocket items, serial number fragments, or unique scratches) that are encrypted in our zero-knowledge vault. When someone finds the item, a claimant must correctly match these verification challenges before pickup is authorized, eliminating fraudulent claims.',
    },
    {
      q: 'Where are the physical safe handover points on campus?',
      a: 'We have 8 verified safe pickup stations across campus, including the Central Library Front Desk, Student Union Information Counter, Sports Complex Reception, and North Campus Security Station. Items can also be placed into smart NFC drop-lockers.',
    },
    {
      q: 'Is my personal phone number or email exposed publicly?',
      a: 'Never. All communication occurs through our end-to-end masked messaging relay. Your real name, student ID, and phone number remain completely private and are replaced by an anonymous campus identifier (e.g. U-2048).',
    },
    {
      q: 'What happens to items that remain unclaimed?',
      a: 'Items held in campus custody for more than 90 days are transitioned to our Sustainability & Recycle Center (/recycle), where eligible items (such as clothing, reusable water bottles, and stationery) are donated to student welfare or recycled responsibly.',
    },
    {
      q: 'How quickly does the AI similarity matching notify me?',
      a: 'The system computes visual and metadata similarity instantly upon submission. If a newly reported found item matches your lost report with high confidence (e.g. >80%), you will receive an immediate in-app and email alert.',
    },
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="relative py-16 md:py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Tag & Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/10 text-zinc-400">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>FAQs // KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4 font-['var(--font-heading)']">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Everything you need to know about campus item recovery, data privacy, and verification protocol.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#12131d]/60 border border-white/10 overflow-hidden backdrop-blur-xl transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-zinc-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : ''
                    }`}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 mt-1 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
