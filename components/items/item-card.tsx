import Link from 'next/link'
import {
  MapPin,
  Calendar,
  Tag,
  Sparkles,
  Backpack,
  Smartphone,
  Wallet,
  KeyRound,
  Gem,
  Shirt,
  FileText,
  Glasses,
  Milk,
  Package,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RetroBadge } from '@/components/retro'
import { type Item, statusTone } from '@/lib/mock-data'

export function ItemStatusBadge({ status }: { status: Item['status'] }) {
  return <RetroBadge tone={statusTone(status)}>{status}</RetroBadge>
}

export function ItemCard({ item, view = 'grid' }: { item: Item; view?: 'grid' | 'list' }) {
  return (
    <Link
      href={`/search/${item.id}`}
      className={cn(
        'bevel-out bg-win-face block dotted-focus',
        view === 'list' && 'sm:flex sm:items-stretch',
      )}
    >
      <div
        className={cn(
          'bevel-in bg-win-white grid place-items-center',
          view === 'list' ? 'sm:w-28 sm:shrink-0 h-24 sm:h-auto' : 'h-32',
        )}
      >
        <ItemGlyph item={item} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>{item.type}</RetroBadge>
            <ItemStatusBadge status={item.status} />
          </div>
          <span className="font-mono-sys text-[11px] text-win-shadow">#{item.id}</span>
        </div>

        <h3 className="text-[14px] font-bold leading-tight text-win-text">{item.title}</h3>

        <ul className="flex flex-col gap-0.5 text-[12px] text-win-shadow">
          <li className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            {item.category}
            {item.brand ? ` · ${item.brand}` : ''}
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {item.generalLocation}
          </li>
          <li className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {item.dateOccurred}
          </li>
        </ul>

        {item.matchConfidence ? (
          <div className="bevel-groove mt-auto flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold text-win-title">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {item.matchConfidence}% MATCH · {item.possibleMatches} possible
          </div>
        ) : null}
      </div>
    </Link>
  )
}

const GLYPH: Record<string, LucideIcon> = {
  Bags: Backpack,
  Electronics: Smartphone,
  'Wallets & Cards': Wallet,
  Keys: KeyRound,
  Jewelry: Gem,
  Clothing: Shirt,
  Documents: FileText,
  Eyewear: Glasses,
  'Water Bottles': Milk,
  Other: Package,
}

function ItemGlyph({ item }: { item: Item }) {
  const Icon = GLYPH[item.category] ?? Package
  return <Icon className="h-8 w-8 text-win-title" aria-hidden />
}
