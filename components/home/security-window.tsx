import { ShieldCheck, Lock, EyeOff, BadgeCheck, Zap } from 'lucide-react'
import { RetroWindow, RetroGroupBox } from '@/components/retro'

const FEATURES = [
  { icon: EyeOff, title: 'Private by design', body: 'Your email and identity stay hidden. Contact happens through anonymous relay messaging.' },
  { icon: BadgeCheck, title: 'Verified claims', body: 'Owners answer verification questions before any item is released. No proof, no handover.' },
  { icon: Zap, title: 'Smart matching', body: 'Lost and found reports are compared automatically to surface likely matches fast.' },
  { icon: Lock, title: 'Hardened access', body: 'Rate limiting, session controls, and audit logging protect every account.' },
]

export function SecurityWindow() {
  return (
    <RetroWindow
      title="Security & Privacy.exe"
      icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}
      controls={['minimize', 'close']}
    >
      <RetroGroupBox legend="Why LOST//98 is safe">
        <ul className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <li key={f.title} className="flex gap-3">
                <span className="bevel-out grid h-9 w-9 shrink-0 place-items-center bg-win-face text-win-title">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-win-text">{f.title}</p>
                  <p className="text-[12px] leading-relaxed text-win-shadow">{f.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </RetroGroupBox>
    </RetroWindow>
  )
}
