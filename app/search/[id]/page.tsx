import Link from 'next/link'
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
} from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroButton,
  RetroBadge,
  RetroGroupBox,
  RetroStatusBar,
} from '@/components/retro'
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
    <DesktopShell activeKey="search">
      <div className="flex flex-col gap-3">
        <Link href="/search" className="inline-flex w-fit">
          <RetroButton className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Results
          </RetroButton>
        </Link>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <RetroWindow
            title={`${item.title} — Report #${item.id}`}
            icon={<Tag className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'maximize', 'close']}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>{item.type}</RetroBadge>
                <ItemStatusBadge status={item.status} />
                <span className="font-mono-sys ml-auto text-[12px] text-win-shadow">#{item.id}</span>
              </div>

              {/* Photo Preview Container */}
              <div className="bevel-in bg-win-dark relative overflow-hidden rounded-none h-64 flex items-center justify-center">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-win-face">
                    <Camera className="h-10 w-10 text-win-shadow" aria-hidden />
                    <span className="font-pixel text-sm">[ IMAGE WITHHELD ]</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bevel-out bg-win-face/90 px-2 py-1 text-[11px] font-bold text-win-title backdrop-blur-sm">
                  {item.type === 'LOST' ? 'LOST PROPERTY PHOTO' : 'FOUND EVIDENCE PHOTO'}
                </div>
              </div>

              {item.matchConfidence ? (
                <div className="bevel-out bg-win-yellow flex items-center gap-2 p-2 text-[13px] font-bold text-win-text">
                  <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                  Smart match: {item.matchConfidence}% confidence with {item.possibleMatches} report
                  {item.possibleMatches === 1 ? '' : 's'}.
                </div>
              ) : null}

              <RetroGroupBox legend="Item Details">
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Detail icon={Tag} label="Category" value={item.category} />
                  <Detail icon={Palette} label="Color" value={item.color} />
                  <Detail icon={MapPin} label="General Area" value={item.generalLocation} />
                  <Detail icon={Calendar} label="Date" value={item.dateOccurred} />
                  {item.brand ? <Detail icon={Tag} label="Brand" value={item.brand} /> : null}
                  <Detail icon={User} label="Reporter" value={item.reporter} />
                </dl>
              </RetroGroupBox>

              <RetroGroupBox legend="Description">
                <p className="text-[13px] leading-relaxed text-win-text">{item.description}</p>
                <p className="mt-2 text-[11px] text-win-shadow">
                  Note: sensitive identifying details (serial numbers, interior contents) are hidden and confirmed only during verified ownership claims.
                </p>
              </RetroGroupBox>

              <RetroStatusBar
                segments={[
                  <span key="loc" className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {item.generalLocation}
                  </span>,
                  <span key="sec" className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    Protected by LOST//98 System
                  </span>,
                ]}
              />
            </div>
          </RetroWindow>

          <ClaimPanel item={item} />
        </div>

        {related.length > 0 ? (
          <RetroWindow
            title="Related Reports in this Category"
            icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />}
            controls={['minimize', 'close']}
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ItemCard key={r.id} item={r} />
              ))}
            </div>
          </RetroWindow>
        ) : null}
      </div>
    </DesktopShell>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-win-title" aria-hidden />
      <dt className="text-[12px] text-win-shadow">{label}:</dt>
      <dd className="text-[13px] font-bold text-win-text">{value}</dd>
    </div>
  )
}
