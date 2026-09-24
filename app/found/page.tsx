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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroField,
  RetroInput,
  RetroTextarea,
  RetroSelect,
  RetroCheckbox,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
  RetroProgressBar,
  RetroDialog,
} from '@/components/retro'
import { CATEGORIES, LOCATIONS } from '@/lib/mock-data'

export default function ReportFoundPage() {
  const [securityNoticeOpen, setSecurityNoticeOpen] = useState(true)
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

  // Step 2: Condition & Safe Handover
  const [condition, setCondition] = useState('Good / Working')
  const [handoverSpot, setHandoverSpot] = useState('Campus Security Main Desk')
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
    <DesktopShell activeKey="found">
      <div className="flex flex-col gap-3">
        {/* Security Warning Dialog */}
        <RetroDialog
          open={securityNoticeOpen}
          onClose={() => setSecurityNoticeOpen(false)}
          title="SECURITY WARNING — Found Item Guidelines"
          icon={<ShieldAlert className="h-4 w-4 text-win-red" aria-hidden />}
          className="max-w-md"
        >
          <div className="flex flex-col gap-3">
            <div className="bevel-out bg-win-yellow flex items-start gap-2.5 p-3 text-win-text">
              <AlertTriangle className="h-5 w-5 shrink-0 text-win-red" aria-hidden />
              <div className="text-[12px] leading-relaxed">
                <p className="font-bold">CRITICAL FRAUD PREVENTION NOTICE:</p>
                <p className="mt-1">
                  Do <strong>NOT</strong> post serial numbers, secret contents, passwords, or unique internal identifying marks in public description or photos.
                </p>
                <p className="mt-1">
                  Claimants must prove ownership by answering verification questions before you hand over any property.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <RetroButton variant="primary" onClick={() => setSecurityNoticeOpen(false)}>
                I Understand & Comply
              </RetroButton>
            </div>
          </div>
        </RetroDialog>

        <RetroWindow
          title="LOST//98 — Report Found Item Wizard"
          icon={<MapPin className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Wizard Step Progress Bar */}
            <div className="bevel-groove p-2">
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className={step >= 1 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  1. Discovery Details
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step >= 2 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  2. Safe Handover
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step >= 3 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  3. Verification Setup
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step === 4 ? 'text-win-green font-black' : 'text-win-shadow'}>
                  4. Published & Scanned
                </span>
              </div>
              <RetroProgressBar value={(step / 4) * 100} className="mt-1.5" />
            </div>

            {/* STEP 1: DISCOVERY DETAILS */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <div className="bevel-out bg-win-face-light p-2 text-[12px] text-win-text">
                  <strong>Step 1:</strong> Tell the system what item you discovered. Provide general visual info without disclosing private secrets.
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <RetroField label="Item Name / Title" htmlFor="found-title" required className="sm:col-span-2">
                    <RetroInput
                      id="found-title"
                      placeholder="e.g. Silver iPhone, Black Backpack, Ray-Ban Sunglasses"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Category" htmlFor="found-cat" required>
                    <RetroSelect id="found-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </RetroSelect>
                  </RetroField>

                  <RetroField label="Brand (if known)" htmlFor="found-brand">
                    <RetroInput
                      id="found-brand"
                      placeholder="e.g. Apple, Herschel, Samsonite"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Primary Color" htmlFor="found-color" required>
                    <RetroInput
                      id="found-color"
                      placeholder="e.g. Silver, Black, Navy"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Discovery Location Area" htmlFor="found-loc" required>
                    <RetroSelect id="found-loc" value={generalLocation} onChange={(e) => setGeneralLocation(e.target.value)}>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </RetroSelect>
                  </RetroField>

                  <RetroField label="Date Found" htmlFor="found-date" required>
                    <RetroInput
                      id="found-date"
                      type="date"
                      value={dateFound}
                      onChange={(e) => setDateFound(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Item Photo" className="sm:col-span-1">
                    <div className="bevel-field flex items-center justify-between bg-win-white p-2">
                      <span className="text-[12px] text-win-shadow">
                        {photoAttached ? 'found_item_preview.jpg (310 KB)' : 'No image chosen'}
                      </span>
                      <RetroButton
                        type="button"
                        onClick={() => setPhotoAttached((v) => !v)}
                        className="text-[11px]"
                      >
                        <UploadCloud className="mr-1 h-3.5 w-3.5" aria-hidden />
                        {photoAttached ? 'Remove' : 'Select Photo'}
                      </RetroButton>
                    </div>
                  </RetroField>

                  <RetroField
                    label="General Public Description"
                    htmlFor="found-desc"
                    required
                    hint="Give broad context. Keep unique identifiers hidden for ownership quiz."
                    className="sm:col-span-2"
                  >
                    <RetroTextarea
                      id="found-desc"
                      rows={3}
                      placeholder="e.g. Found on a wooden bench near the auditorium steps after 3 PM lecture."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </RetroField>
                </div>
              </div>
            )}

            {/* STEP 2: SAFE HANDOVER & CUSTODY */}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                <RetroGroupBox legend="Safe Custody & Handover Protocols">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <RetroField label="Current Item Condition" htmlFor="found-cond" required>
                      <RetroSelect id="found-cond" value={condition} onChange={(e) => setCondition(e.target.value)}>
                        <option value="Like New / Pristine">Like New / Pristine</option>
                        <option value="Good / Working">Good / Working</option>
                        <option value="Scratched / Worn">Scratched / Worn</option>
                        <option value="Damaged / Screen Cracked">Damaged / Screen Cracked</option>
                      </RetroSelect>
                    </RetroField>

                    <RetroField label="Designated Safe Handover Location" htmlFor="found-spot" required>
                      <RetroSelect id="found-spot" value={handoverSpot} onChange={(e) => setHandoverSpot(e.target.value)}>
                        <option value="Campus Security Main Desk (Bldg A)">Campus Security Main Desk (Bldg A)</option>
                        <option value="Student Union Information Center">Student Union Information Center</option>
                        <option value="Central Library Front Reception">Central Library Front Reception</option>
                        <option value="Metro Transit Station Lost Office">Metro Transit Station Lost Office</option>
                        <option value="Sports Complex Desk">Sports Complex Desk</option>
                      </RetroSelect>
                    </RetroField>

                    <RetroField label="Item Custody State" className="sm:col-span-2">
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-[13px]">
                          <input
                            type="radio"
                            name="custody"
                            checked={heldBy === 'finder'}
                            onChange={() => setHeldBy('finder')}
                            className="bevel-field h-4 w-4"
                          />
                          <span>I currently have physical possession of the item</span>
                        </label>
                        <label className="flex items-center gap-2 text-[13px]">
                          <input
                            type="radio"
                            name="custody"
                            checked={heldBy === 'security'}
                            onChange={() => setHeldBy('security')}
                            className="bevel-field h-4 w-4"
                          />
                          <span>I deposited the item at the official campus security / lost & found desk</span>
                        </label>
                      </div>
                    </RetroField>
                  </div>
                </RetroGroupBox>
              </div>
            )}

            {/* STEP 3: VERIFICATION QUIZ SETUP */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <div className="bevel-out bg-win-face-light flex items-start gap-2.5 p-3 text-win-text">
                  <HelpCircle className="h-5 w-5 shrink-0 text-win-title" aria-hidden />
                  <div>
                    <p className="text-[13px] font-bold">SET OWNERSHIP VERIFICATION QUESTIONS</p>
                    <p className="text-[12px] text-win-shadow">
                      When someone clicks <em>&quot;I Think This Is Mine&quot;</em>, they must answer these questions. You will review their answers before agreeing to a safe handover.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <RetroField
                    label="Verification Question 1"
                    htmlFor="q1"
                    hint="Ask about interior contents, specific wallpaper, etc."
                    className="sm:col-span-2"
                  >
                    <RetroInput id="q1" value={q1} onChange={(e) => setQ1(e.target.value)} />
                  </RetroField>

                  <RetroField
                    label="Verification Question 2"
                    htmlFor="q2"
                    hint="Ask about markings, stickers, or serial hints"
                    className="sm:col-span-2"
                  >
                    <RetroInput id="q2" value={q2} onChange={(e) => setQ2(e.target.value)} />
                  </RetroField>

                  <div className="sm:col-span-2">
                    <RetroCheckbox
                      id="chk-found-guide"
                      checked={acceptGuidelines}
                      onChange={(e) => setAcceptGuidelines(e.target.checked)}
                      label={
                        <span>
                          <strong>I will only release this item to a claimant whose answers match reality</strong>
                          <span className="block text-[11px] text-win-shadow">
                            Handovers must take place in daylight at verified public security desks.
                          </span>
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SUBMITTED SUCCESS & SCAN */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <div className="bevel-out bg-win-face-light flex flex-col items-center gap-2 p-4 text-center">
                  <div className="bevel-out grid h-12 w-12 place-items-center bg-win-green text-win-white">
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                  </div>
                  <h3 className="font-pixel text-base text-win-title">FOUND ITEM LOGGED RESPONSIBLY</h3>
                  <p className="font-mono-sys text-[14px] font-bold text-win-text">
                    REPORT ID: <span className="text-win-title">#{submittedId}</span>
                  </p>
                  <p className="max-w-md text-[12px] text-win-shadow">
                    Thank you for doing the right thing. Your found item is now searchable and protected by the verification checkpoint.
                  </p>
                </div>

                <div className="bevel-out bg-win-yellow flex flex-col gap-2 p-3 text-win-text">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-win-title" aria-hidden />
                    <span className="text-[13px] font-bold">CROSS-DATABASE MATCH SCAN COMPLETE</span>
                  </div>
                  <p className="text-[12px]">
                    Identified <strong>2 possible lost item owners</strong> registered within the last 7 days. Automated notifications have been dispatched.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <RetroButton onClick={resetForm} className="gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Log Another Item
                  </RetroButton>

                  <div className="flex gap-2">
                    <Link href="/reports">
                      <RetroButton>My Reports</RetroButton>
                    </Link>
                    <Link href="/dashboard">
                      <RetroButton variant="primary">Return to Desktop</RetroButton>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between pt-2">
                {step > 1 ? (
                  <RetroButton type="button" onClick={handleBack} className="gap-1.5">
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back
                  </RetroButton>
                ) : (
                  <Link href="/dashboard">
                    <RetroButton type="button">Cancel</RetroButton>
                  </Link>
                )}

                <RetroButton
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  disabled={step === 1 && !title.trim()}
                  className="gap-1.5"
                >
                  <span>{step === 3 ? 'Publish Found Report' : 'Next Step'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </RetroButton>
              </div>
            )}

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="st" className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-win-green" aria-hidden />
                  {step === 4 ? 'FOUND LISTING ACTIVE' : `WIZARD STEP ${step} OF 3`}
                </span>,
                <RetroBadge key="sec" tone="blue">
                  SAFE HANDOVER ENABLED
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
