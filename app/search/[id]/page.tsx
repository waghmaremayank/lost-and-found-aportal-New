import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  Palette,
  User,
  ShieldCheck,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { ItemCard, ItemStatusBadge } from '@/components/items/item-card'
import { ClaimPanel } from '@/components/items/claim-panel'
import { ITEMS } from '@/lib/mock-data'

export function generateStaticParams() {
  return ITEMS.map((i) => ({ id: i.id }))
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = ITEMS.find((i) => i.id === id)
  if (!item) notFound()

  const related = ITEMS.filter(
    (i) => i.id !== item.id && (i.category === item.category || i.type !== item.type),
  ).slice(0, 3)

  return (
    <ModernShell
      activeKey="search"
      title={item.title}
      subtitle={`Verified ${item.type.toLowerCase()} property record registered on campus.`}
      badge={`#${item.id}`}
      action={
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Catalog</span>
        </Link>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left Column: Item Gallery & Full Specs */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#12131d]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                    item.type === 'LOST'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {item.type}
                </span>
                <ItemStatusBadge status={item.status} />
              </div>

              <span className="font-mono text-xs text-zinc-500">
                Reporter: <span className="text-zinc-300">{item.reporter}</span>
              </span>
            </div>

            {/* Photo Preview */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-zinc-500">
                  <Camera className="h-10 w-10 text-zinc-600" />
                  <span className="text-xs font-mono uppercase">[ IMAGE WITHHELD ]</span>
                </div>
              )}
            </div>

            {/* Smart Match Banner */}
            {item.matchConfidence ? (
              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 text-xs text-indigo-200 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span>AI Proximity Match Detected</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {item.matchConfidence}% Confidence
                </span>
              </div>
            ) : null}

            {/* Specs Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                PROPERTY SPECIFICATIONS
              </h3>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Category</dt>
                  <dd className="text-xs font-bold text-white mt-1">{item.category}</dd>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Primary Color</dt>
                  <dd className="text-xs font-bold text-white mt-1">{item.color}</dd>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Campus Location</dt>
                  <dd className="text-xs font-bold text-white mt-1 truncate">{item.generalLocation}</dd>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Date Occurred</dt>
                  <dd className="text-xs font-bold text-white mt-1">{item.dateOccurred}</dd>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Brand / Maker</dt>
                  <dd className="text-xs font-bold text-white mt-1">{item.brand || 'Unbranded'}</dd>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <dt className="text-[10px] font-mono uppercase text-zinc-500">Recovery State</dt>
                  <dd className="text-xs font-bold text-indigo-300 mt-1">{item.status}</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-xs font-semibold text-zinc-300 mb-1.5">Public Narrative</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
              <p className="mt-3 text-[11px] text-zinc-500 flex items-center gap-1.5 border-t border-white/5 pt-2.5">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>Confidential serial numbers &amp; internal secrets are protected by zero-knowledge encryption.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Ownership Verification & Claim Widget */}
          <ClaimPanel item={item} />
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 font-['var(--font-heading)']">
              Similar Items in {item.category}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ItemCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ModernShell>
  )
}
