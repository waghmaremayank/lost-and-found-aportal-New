'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  AlertTriangle,
  RotateCcw,
  Search,
  HelpCircle,
  Building,
  Tag,
  Lock,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { CATEGORIES, LOCATIONS } from '@/lib/mock-data'

export default function ReportFoundPage() {
  const [securityNoticeDismissed, setSecurityNoticeDismissed] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  // Step 1: Found Item Basics
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0] as string)
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('Black')
  const [generalLocation, setGeneralLocation] = useState(LOCATIONS[0] as string)
  const [dateFound, setDateFound] = useState('2026-09-24')
  const [description, setDescription] = useState('')
  const [photoAttached, setPhotoAttached] = useState(false)

  // Step 2: Condition & Safe Handover Spot
  const [condition, setCondition] = useState('Good / Working')
  const [handoverSpot, setHandoverSpot] = useState('Campus Security Main Desk (Bldg A)')
  const [heldBy, setHeldBy] = useState<'finder' | 'security'>('finder')

  // Step 3: Ownership Verification Questions
  const [q1, setQ1] = useState('What items or cards were inside?')
  const [q2, setQ2] = useState('What distinct sticker, scratch, or keychain is attached?')
  const [acceptGuidelines, setAcceptGuidelines] = useState(true)

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4)
    } else if (step === 3) {
      const generated = `L98-${Math.floor(2056 + Math.random() * 800)}`
      setSubmittedId(generated)
      setStep(4)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as 1 | 2 | 3 | 4)
    }
  }

  const resetForm = () => {
    setTitle('')
    setBrand('')
    setDescription('')
    setPhotoAttached(false)
    setSubmittedId(null)
    setStep(1)
  }

  return (
    <ModernShell
      activeKey="found"
      title="Report a Found Item"
      subtitle="Safely register found property and set ownership challenges to protect against fraud."
      badge="FINDER WIZARD"
    >
      <div className="max-w-3xl mx-auto">
        {/* Anti-fraud banner */}
        {!securityNoticeDismissed && (
          <div className="mb-6 p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-xl flex items-start justify-between gap-3 text-amber-200/90 text-xs">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Fraud Prevention Rule:</strong> Do not disclose serial numbers, secret contents, or unique inner marks in your public description. Claimants must prove ownership through verification answers.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSecurityNoticeDismissed(true)}
              className="text-xs font-semibold text-amber-300 hover:text-white px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Wizard Steps indicator */}
        <div className="mb-8 p-4 rounded-3xl bg-[#12131d]/70 border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, label: 'Discovery Info' },
              { num: 2, label: 'Custody & Desk' },
              { num: 3, label: 'Claim Questions' },
              { num: 4, label: 'Scan & Publish' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  step === s.num
                    ? 'text-white font-bold'
                    : step > s.num
                    ? 'text-emerald-400 font-semibold'
                    : 'text-zinc-600'
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                    step === s.num
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                      : step > s.num
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/5 text-zinc-500 border border-white/5'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                </div>
                <span className="text-[10px] sm:text-xs truncate max-w-full">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Body Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
          {/* STEP 1: ITEM BASICS */}
          {step === 1 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300 flex items-start gap-2.5">
                <Tag className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Step 1: General Discovery Information.</strong> Log the object you found so the rightful owner can recognize it in the feed.
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="found-title" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Item Title / Name *
                  </label>
                  <input
                    id="found-title"
                    type="text"
                    required
                    placeholder="e.g. Silver iPhone 14, Black Backpack, Gold Ring"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="found-cat" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Category *
                  </label>
                  <select
                    id="found-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="found-brand" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Brand / Manufacturer (if visible)
                  </label>
                  <input
                    id="found-brand"
                    type="text"
                    placeholder="e.g. Apple, Herschel, Ray-Ban"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="found-color" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Primary Color *
                  </label>
                  <input
                    id="found-color"
                    type="text"
                    placeholder="e.g. Silver, Black, Navy"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="found-loc" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Campus Zone Found *
                  </label>
                  <select
                    id="found-loc"
                    value={generalLocation}
                    onChange={(e) => setGeneralLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="found-date" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Date Found *
                  </label>
                  <input
                    id="found-date"
                    type="date"
                    value={dateFound}
                    onChange={(e) => setDateFound(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Found Item Photo
                  </label>
                  <button
                    type="button"
                    onClick={() => setPhotoAttached(!photoAttached)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-dashed border-white/20 hover:border-emerald-500 text-zinc-400 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">
                      {photoAttached ? 'found_item_photo.jpg (310 KB)' : 'Upload item photo'}
                    </span>
                    <UploadCloud className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="found-desc" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Public Description *
                  </label>
                  <textarea
                    id="found-desc"
                    rows={3}
                    placeholder="e.g. Found on a bench near the auditorium steps after 3 PM lecture. Left in safe custody."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SAFE HANDOVER & CUSTODY */}
          {step === 2 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white font-['var(--font-heading)']">
                Item Custody &amp; Verified Drop-off Station
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="found-cond" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Current Item Condition *
                  </label>
                  <select
                    id="found-cond"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Like New / Pristine">Like New / Pristine</option>
                    <option value="Good / Working">Good / Working</option>
                    <option value="Scratched / Worn">Scratched / Worn</option>
                    <option value="Damaged / Screen Cracked">Damaged / Screen Cracked</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="found-spot" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Designated Safe Handover Hub *
                  </label>
                  <select
                    id="found-spot"
                    value={handoverSpot}
                    onChange={(e) => setHandoverSpot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Campus Security Main Desk (Bldg A)">Campus Security Main Desk (Bldg A)</option>
                    <option value="Student Union Information Center">Student Union Information Center</option>
                    <option value="Central Library Front Reception">Central Library Front Reception</option>
                    <option value="Metro Transit Station Lost Office">Metro Transit Station Lost Office</option>
                    <option value="Sports Complex Desk">Sports Complex Desk</option>
                  </select>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-3 pt-2">
                  <span className="text-xs font-semibold text-zinc-300">Physical Custody State</span>
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="custody"
                      checked={heldBy === 'finder'}
                      onChange={() => setHeldBy('finder')}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">I currently hold the item</span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        You will meet the verified claimant at the designated campus hub or hand over via masked chat.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="radio"
                      name="custody"
                      checked={heldBy === 'security'}
                      onChange={() => setHeldBy('security')}
                      className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Deposited at official Campus Security desk</span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        Campus staff will oversee claimant verification and physical handover.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: VERIFICATION CHALLENGE SETUP */}
          {step === 3 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-200/90 flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">SET OWNERSHIP VERIFICATION QUESTIONS</h4>
                  <p className="mt-1 leading-relaxed">
                    When someone attempts to claim this item, they must answer these questions. You will review their answers before confirming handoff.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="q1-inp" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Verification Question 1 *
                  </label>
                  <p className="text-[11px] text-zinc-500 mb-1.5">e.g. What items or cards were inside the bag/wallet?</p>
                  <input
                    id="q1-inp"
                    type="text"
                    value={q1}
                    onChange={(e) => setQ1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="q2-inp" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Verification Question 2
                  </label>
                  <p className="text-[11px] text-zinc-500 mb-1.5">e.g. What unique sticker, wallpaper, or scratch is on the item?</p>
                  <input
                    id="q2-inp"
                    type="text"
                    value={q2}
                    onChange={(e) => setQ2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptGuidelines}
                      onChange={(e) => setAcceptGuidelines(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded bg-[#090a0f] border-white/20 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Strict Handover Commitment</span>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        I will only release this item to a claimant whose answers accurately match the physical item.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PUBLISHED SUCCESS */}
          {step === 4 && (
            <div className="flex flex-col gap-6 text-center animate-in fade-in duration-300">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-['var(--font-heading)']">
                  Found Item Published Responsibly
                </h3>
                <p className="text-sm font-mono text-emerald-400 font-bold mt-1">
                  REPORT ID: #{submittedId}
                </p>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  Thank you for being a responsible member of the campus community. Your report is live and guarded by the verification gate.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 text-left backdrop-blur-xl">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Sparkles className="h-4 w-4" />
                  <span>CAMPUS RECOVERY SCAN COMPLETED</span>
                </div>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                  The engine identified <strong>2 possible lost item tickets</strong> in the database matching these categories. Automatic match notifications have been sent to potential owners.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Log Another Found Item
                </button>
                <Link
                  href="/reports"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
                >
                  View My Found Reports
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Bottom Controls */}
          {step < 4 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </Link>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={step === 1 && !title.trim()}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <span>{step === 3 ? 'Publish Found Report' : 'Next Step'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </ModernShell>
  )
}
