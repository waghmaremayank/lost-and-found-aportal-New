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
        'bevel-out bg-win-face block dotted-focus transition-transform active:scale-[0.99] group',
        view === 'list' && 'sm:flex sm:items-stretch',
      )}
    >
      <div
        className={cn(
          'bevel-in bg-win-face-light relative overflow-hidden flex items-center justify-center',
          view === 'list' ? 'sm:w-36 sm:shrink-0 h-28 sm:h-auto' : 'h-36',
        )}
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <ItemGlyph item={item} />
        )}
        <div className="absolute bottom-1 right-1 bevel-out bg-win-face/90 px-1 py-0.5 text-[9px] font-mono-sys font-bold text-win-title backdrop-blur-sm">
          #{item.id}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>{item.type}</RetroBadge>
            <ItemStatusBadge status={item.status} />
          </div>
          <span className="font-mono-sys text-[11px] text-win-shadow">{item.category}</span>
        </div>

        <h3 className="text-[14px] font-bold leading-tight text-win-text group-hover:text-win-title">
          {item.title}
        </h3>

        <ul className="flex flex-col gap-0.5 text-[12px] text-win-shadow">
          {item.brand ? (
            <li className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" aria-hidden />
              <span>{item.brand}</span>
            </li>
          ) : null}
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            <span>{item.generalLocation}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            <span>{item.dateOccurred}</span>
          </li>
        </ul>

        {item.matchConfidence ? (
          <div className="bevel-groove mt-auto flex items-center gap-1.5 bg-win-yellow/40 px-2 py-1 text-[11px] font-bold text-win-title">
            <Sparkles className="h-3.5 w-3.5 text-win-title" aria-hidden />
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
