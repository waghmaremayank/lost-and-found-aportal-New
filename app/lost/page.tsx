'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FilePlus2,
  Lock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  AlertTriangle,
  RotateCcw,
  Search,
  MapPin,
  Tag,
  Eye,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { CATEGORIES, LOCATIONS } from '@/lib/mock-data'

export default function ReportLostPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  // Step 1: Public Details
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0] as string)
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('Black')
  const [generalLocation, setGeneralLocation] = useState(LOCATIONS[0] as string)
  const [dateOccurred, setDateOccurred] = useState('2026-09-24')
  const [description, setDescription] = useState('')
  const [imageAttached, setImageAttached] = useState(false)

  // Step 2: Private Ownership Info
  const [privateMarking, setPrivateMarking] = useState('')
  const [serialHint, setSerialHint] = useState('')
  const [privateContents, setPrivateContents] = useState('')
  const [uniqueScratches, setUniqueScratches] = useState('')

  // Step 3: Privacy & Security Preferences
  const [allowMessaging, setAllowMessaging] = useState(true)
  const [emailNotify, setEmailNotify] = useState(true)
  const [hideName, setHideName] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(true)

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
    setPrivateMarking('')
    setSerialHint('')
    setPrivateContents('')
    setUniqueScratches('')
    setImageAttached(false)
    setSubmittedId(null)
    setStep(1)
  }

  return (
    <ModernShell
      activeKey="lost"
      title="Report a Lost Item"
      subtitle="File an item report with AI-assisted campus matching and confidential zero-leak ownership protection."
      badge="STEP-BY-STEP WIZARD"
    >
      <div className="max-w-3xl mx-auto">
        {/* Step Progress Indicators */}
        <div className="mb-8 p-4 rounded-3xl bg-[#12131d]/70 border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { num: 1, label: 'Public Details' },
              { num: 2, label: 'Secret Proof' },
              { num: 3, label: 'Privacy Settings' },
              { num: 4, label: 'AI Match Scan' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  step === s.num
                    ? 'text-white font-bold'
                    : step > s.num
                    ? 'text-indigo-400 font-semibold'
                    : 'text-zinc-600'
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                    step === s.num
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
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

          {/* Progress bar */}
          <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
          {/* STEP 1: PUBLIC ITEM DETAILS */}
          {step === 1 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300 flex items-start gap-2.5">
                <Tag className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Step 1: Public Information.</strong> Provide general visual characteristics visible to the campus community. Do not enter secret passwords or sensitive codes here.
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Item Title / Name *
                  </label>
                  <input
                    id="title-inp"
                    type="text"
                    required
                    placeholder="e.g. Black Leather Bifold Wallet"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="cat-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Category *
                  </label>
                  <select
                    id="cat-inp"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brand-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Brand / Manufacturer (Optional)
                  </label>
                  <input
                    id="brand-inp"
                    type="text"
                    placeholder="e.g. Fossil, Apple, Sony"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="color-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Primary Color *
                  </label>
                  <input
                    id="color-inp"
                    type="text"
                    placeholder="e.g. Matte Black, Navy Blue, Silver"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="loc-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Campus Zone Lost *
                  </label>
                  <select
                    id="loc-inp"
                    value={generalLocation}
                    onChange={(e) => setGeneralLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Estimated Date Lost *
                  </label>
                  <input
                    id="date-inp"
                    type="date"
                    value={dateOccurred}
                    onChange={(e) => setDateOccurred(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Photo Attachment
                  </label>
                  <button
                    type="button"
                    onClick={() => setImageAttached(!imageAttached)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-dashed border-white/20 hover:border-indigo-500 text-zinc-400 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">
                      {imageAttached ? 'photo_lost_ref_1.jpg (240 KB)' : 'Upload reference photo'}
                    </span>
                    <UploadCloud className="h-4 w-4 text-indigo-400 shrink-0 ml-2" />
                  </button>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="desc-inp" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    General Description *
                  </label>
                  <textarea
                    id="desc-inp"
                    rows={3}
                    placeholder="e.g. Lost somewhere between the library 2nd floor and the courtyard benches during the afternoon lecture break."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PRIVATE OWNERSHIP INFORMATION */}
          {step === 2 && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-xs flex items-start gap-3">
                <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">CONFIDENTIAL ZERO-LEAK VAULT</h4>
                  <p className="mt-1 leading-relaxed">
                    These secret details are <strong>encrypted and NEVER shown publicly</strong>. When a campus finder logs a matching item, these secret answers verify that you are the genuine owner and instantly block fraud.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="priv-mark" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Hidden Markings / Secret Identifier
                  </label>
                  <p className="text-[11px] text-zinc-500 mb-1.5">e.g. Small star sticker on inner seam, initials etched underneath</p>
                  <input
                    id="priv-mark"
                    type="text"
                    placeholder="e.g. Initials 'AM' stamped on interior flap"
                    value={privateMarking}
                    onChange={(e) => setPrivateMarking(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="serial-hint" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Serial Number / Last 4 Digits
                  </label>
                  <p className="text-[11px] text-zinc-500 mb-1.5">Used for verification match confirmation</p>
                  <input
                    id="serial-hint"
                    type="text"
                    placeholder="e.g. Last 4 digits: 9021"
                    value={serialHint}
                    onChange={(e) => setSerialHint(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="priv-contents" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Secret Internal Contents
                  </label>
                  <p className="text-[11px] text-zinc-500 mb-1.5">Exact contents only known to the owner</p>
                  <textarea
                    id="priv-contents"
                    rows={2}
                    placeholder="e.g. Blue student transit card, folded café receipt, green USB drive with key."
                    value={privateContents}
                    onChange={(e) => setPrivateContents(e.target.value)}
                    className="w-full p-4 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="scratches" className="text-xs font-semibold text-zinc-300 block mb-1">
                    Unique Scratches / Imperfections
                  </label>
                  <input
                    id="scratches"
                    type="text"
                    placeholder="e.g. Small hairline crack on bottom left edge"
                    value={uniqueScratches}
                    onChange={(e) => setUniqueScratches(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PRIVACY & CONTACT PREFERENCES */}
          {step === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-white mb-1 font-['var(--font-heading)']">
                Communication &amp; Identity Privacy Preferences
              </h3>

              <div className="flex flex-col gap-3">
                <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={allowMessaging}
                    onChange={(e) => setAllowMessaging(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded bg-[#090a0f] border-white/20 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Enable Masked In-Platform Messaging</span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Communicate with finders safely without ever exposing your personal phone number or email address.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={emailNotify}
                    onChange={(e) => setEmailNotify(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded bg-[#090a0f] border-white/20 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Instant Match &amp; Claim Alerts</span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Receive instant notifications whenever the AI similarity engine flags a matching found item.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={hideName}
                    onChange={(e) => setHideName(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded bg-[#090a0f] border-white/20 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Anonymize Public Reporter Tag</span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Show your handle as <code className="text-indigo-400">U-2048</code> instead of your full name across public listings.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded bg-[#090a0f] border-white/20 text-rose-600 focus:ring-rose-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-rose-300 block">Certify Ownership Accuracy</span>
                    <span className="text-[11px] text-rose-200/80 block mt-0.5">
                      I confirm that all details provided are accurate. False claims violate campus trust and code of conduct.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: SUBMISSION SUCCESS & MATCH SCANNER */}
          {step === 4 && (
            <div className="flex flex-col gap-6 text-center animate-in fade-in duration-300">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-['var(--font-heading)']">
                  Lost Report Successfully Registered
                </h3>
                <p className="text-sm font-mono text-indigo-400 font-bold mt-1">
                  REPORT ID: #{submittedId}
                </p>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  Your report has been securely indexed with encrypted vault protection. The AI similarity scanner is actively checking all found item listings.
                </p>
              </div>

              {/* AI Match Card */}
              <div className="p-5 rounded-3xl bg-indigo-950/40 border border-indigo-500/40 text-left backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">POTENTIAL MATCH DISCOVERED</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    87% SIMILARITY
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&auto=format&fit=crop&q=80"
                      alt="Match Thumbnail"
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">Found Item: Black Backpack (Herschel)</h4>
                    <p className="text-[11px] text-zinc-400 truncate">Found at North Campus lecture hall • Stored at Desk</p>
                  </div>
                  <Link
                    href="/search/L98-2048"
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 shrink-0 transition-colors"
                  >
                    Inspect Match →
                  </Link>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  File Another Report
                </button>
                <Link
                  href="/reports"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
                >
                  View My Active Reports
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
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-white/10"
              >
                <span>{step === 3 ? 'Register & Scan Matches' : 'Next Step'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </ModernShell>
  )
}
