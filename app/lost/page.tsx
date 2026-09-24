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
} from '@/components/retro'
import { CATEGORIES, LOCATIONS } from '@/lib/mock-data'

export default function ReportLostPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  // Step 1: Public Info
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

  // Step 3: Privacy & Contact Preferences
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
    <DesktopShell activeKey="lost">
      <div className="flex flex-col gap-3">
        <RetroWindow
          title="LOST//98 — Report Lost Item Wizard"
          icon={<FilePlus2 className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <div className="flex flex-col gap-4">
            {/* Wizard Step Progress Bar */}
            <div className="bevel-groove p-2">
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className={step >= 1 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  1. Public Details
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step >= 2 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  2. Private Ownership Proof
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step >= 3 ? 'text-win-title font-black' : 'text-win-shadow'}>
                  3. Contact Security
                </span>
                <span className="text-win-shadow">►</span>
                <span className={step === 4 ? 'text-win-green font-black' : 'text-win-shadow'}>
                  4. Verification & Match
                </span>
              </div>
              <RetroProgressBar value={(step / 4) * 100} className="mt-1.5" />
            </div>

            {/* STEP 1: PUBLIC ITEM DETAILS */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                <div className="bevel-out bg-win-face-light p-2 text-[12px] text-win-text">
                  <strong>Step 1:</strong> Provide general details visible to the community. Never enter sensitive personal secrets or serial numbers in public fields.
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <RetroField label="Item Name / Title" htmlFor="lost-title" required className="sm:col-span-2">
                    <RetroInput
                      id="lost-title"
                      placeholder="e.g. Black Leather Bifold Wallet"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Category" htmlFor="lost-cat" required>
                    <RetroSelect id="lost-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </RetroSelect>
                  </RetroField>

                  <RetroField label="Brand / Manufacturer" htmlFor="lost-brand">
                    <RetroInput
                      id="lost-brand"
                      placeholder="e.g. Fossil, Apple, Sony (optional)"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Primary Color" htmlFor="lost-color" required>
                    <RetroInput
                      id="lost-color"
                      placeholder="e.g. Black, Navy, Silver"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="General Discovery / Lost Area" htmlFor="lost-loc" required>
                    <RetroSelect id="lost-loc" value={generalLocation} onChange={(e) => setGeneralLocation(e.target.value)}>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </RetroSelect>
                  </RetroField>

                  <RetroField label="Date Lost" htmlFor="lost-date" required>
                    <RetroInput
                      id="lost-date"
                      type="date"
                      value={dateOccurred}
                      onChange={(e) => setDateOccurred(e.target.value)}
                    />
                  </RetroField>

                  <RetroField label="Photo Attachment (Optional)" className="sm:col-span-1">
                    <div className="bevel-field flex items-center justify-between bg-win-white p-2">
                      <span className="text-[12px] text-win-shadow">
                        {imageAttached ? 'photo_reference_1.jpg (240 KB)' : 'No file chosen'}
                      </span>
                      <RetroButton
                        type="button"
                        onClick={() => setImageAttached((v) => !v)}
                        className="text-[11px]"
                      >
                        <UploadCloud className="mr-1 h-3.5 w-3.5" aria-hidden />
                        {imageAttached ? 'Remove' : 'Select BMP/JPG'}
                      </RetroButton>
                    </div>
                  </RetroField>

                  <RetroField
                    label="Public Description"
                    htmlFor="lost-desc"
                    required
                    hint="Describe general appearance. Do NOT reveal secret contents or private markings."
                    className="sm:col-span-2"
                  >
                    <RetroTextarea
                      id="lost-desc"
                      rows={3}
                      placeholder="e.g. Lost somewhere between the library entrance and the courtyard benches on Thursday morning."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </RetroField>
                </div>
              </div>
            )}

            {/* STEP 2: PRIVATE OWNERSHIP INFORMATION */}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                <div className="bevel-out bg-win-yellow flex items-start gap-2.5 p-3 text-win-text">
                  <Lock className="h-5 w-5 shrink-0 text-win-title" aria-hidden />
                  <div>
                    <p className="text-[13px] font-black">CONFIDENTIAL VERIFICATION DATA</p>
                    <p className="text-[12px] leading-relaxed">
                      These details are <strong>encrypted and NEVER shown publicly</strong>. When a finder locates a matching item, these secret answers verify that you are the legitimate owner and prevent fraudulent claims.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <RetroField
                    label="Hidden Markings / Secret Identifier"
                    htmlFor="lost-priv-mark"
                    hint="e.g. Small star sticker on inner seam, initials etched underneath"
                  >
                    <RetroInput
                      id="lost-priv-mark"
                      placeholder="e.g. Initials 'AM' stamped on interior flap"
                      value={privateMarking}
                      onChange={(e) => setPrivateMarking(e.target.value)}
                    />
                  </RetroField>

                  <RetroField
                    label="Serial Number Hint / Last 4 Digits"
                    htmlFor="lost-serial"
                    hint="Only the last digits or prefix used for verification"
                  >
                    <RetroInput
                      id="lost-serial"
                      placeholder="e.g. Last 4 digits: 9021"
                      value={serialHint}
                      onChange={(e) => setSerialHint(e.target.value)}
                    />
                  </RetroField>

                  <RetroField
                    label="Private Contents / Internal Items"
                    htmlFor="lost-contents"
                    hint="Exact contents only known to the owner"
                    className="sm:col-span-2"
                  >
                    <RetroTextarea
                      id="lost-contents"
                      rows={2}
                      placeholder="e.g. Blue student card, folded receipt from campus café, green USB drive."
                      value={privateContents}
                      onChange={(e) => setPrivateContents(e.target.value)}
                    />
                  </RetroField>

                  <RetroField
                    label="Unique Scratches / Imperfections"
                    htmlFor="lost-scratches"
                    className="sm:col-span-2"
                  >
                    <RetroInput
                      id="lost-scratches"
                      placeholder="e.g. Small hairline crack on bottom left edge"
                      value={uniqueScratches}
                      onChange={(e) => setUniqueScratches(e.target.value)}
                    />
                  </RetroField>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & SECURITY PREFERENCES */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <RetroGroupBox legend="Privacy & In-Platform Communication Settings">
                  <div className="flex flex-col gap-3 p-1">
                    <RetroCheckbox
                      id="chk-msg"
                      checked={allowMessaging}
                      onChange={(e) => setAllowMessaging(e.target.checked)}
                      label={
                        <span>
                          <strong>Enable In-Platform Secure Messaging</strong>
                          <span className="block text-[11px] text-win-shadow">
                            Communicate with finders safely without disclosing personal phone numbers or home addresses.
                          </span>
                        </span>
                      }
                    />

                    <RetroCheckbox
                      id="chk-email"
                      checked={emailNotify}
                      onChange={(e) => setEmailNotify(e.target.checked)}
                      label={
                        <span>
                          <strong>Receive Email Notifications on Match</strong>
                          <span className="block text-[11px] text-win-shadow">
                            Get immediate encrypted alerts whenever an AI match or claim is submitted.
                          </span>
                        </span>
                      }
                    />

                    <RetroCheckbox
                      id="chk-hidename"
                      checked={hideName}
                      onChange={(e) => setHideName(e.target.checked)}
                      label={
                        <span>
                          <strong>Anonymize Public Handle</strong>
                          <span className="block text-[11px] text-win-shadow">
                            Display your user ID as <code>U-2048</code> instead of your real full name.
                          </span>
                        </span>
                      }
                    />

                    <div className="bevel-groove my-1" />

                    <RetroCheckbox
                      id="chk-agree"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      label={
                        <span>
                          <strong>I certify that all provided details are true and accurate</strong>
                          <span className="block text-[11px] text-win-red font-bold">
                            Filing false ownership reports is logged and violates platform terms.
                          </span>
                        </span>
                      }
                    />
                  </div>
                </RetroGroupBox>
              </div>
            )}

            {/* STEP 4: SUBMITTED SUCCESS & MATCH SCANNER */}
            {step === 4 && (
              <div className="flex flex-col gap-4">
                <div className="bevel-out bg-win-face-light flex flex-col items-center gap-2 p-4 text-center">
                  <div className="bevel-out grid h-12 w-12 place-items-center bg-win-green text-win-white">
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                  </div>
                  <h3 className="font-pixel text-base text-win-title">REPORT REGISTERED IN DATABASE</h3>
                  <p className="font-mono-sys text-[14px] font-bold text-win-text">
                    REPORT ID: <span className="text-win-title">#{submittedId}</span>
                  </p>
                  <p className="max-w-md text-[12px] text-win-shadow">
                    Your lost item report has been saved to the database with Row Level Security. Private verification details are locked in the secure vault.
                  </p>
                </div>

                <div className="bevel-out bg-win-yellow flex flex-col gap-2 p-3 text-win-text">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-win-title" aria-hidden />
                    <span className="text-[13px] font-bold">SMART MATCH SCAN IN PROGRESS...</span>
                  </div>
                  <p className="text-[12px]">
                    The algorithm scanned <strong>2,481 items</strong> and detected <strong>1 high-confidence match</strong> in the North Campus zone!
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Link href="/search/L98-2048">
                      <RetroButton variant="primary" className="gap-1.5 text-[12px]">
                        <Search className="h-3.5 w-3.5" aria-hidden />
                        Inspect Matching Found Item #L98-2048 (87% Match)
                      </RetroButton>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <RetroButton onClick={resetForm} className="gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    File Another Report
                  </RetroButton>

                  <div className="flex gap-2">
                    <Link href="/reports">
                      <RetroButton>View My Reports</RetroButton>
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
                  <span>{step === 3 ? 'Save & Search Matches' : 'Next Step'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </RetroButton>
              </div>
            )}

            {/* Status bar */}
            <RetroStatusBar
              segments={[
                <span key="st" className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-win-green" aria-hidden />
                  {step === 4 ? 'REPORT SAVED TO INDEX' : `WIZARD STEP ${step} OF 3`}
                </span>,
                <RetroBadge key="sec" tone="green">
                  ENCRYPTED POST
                </RetroBadge>,
              ]}
            />
          </div>
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
