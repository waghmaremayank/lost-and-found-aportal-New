'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Item } from '@/lib/mock-data'

export function ItemStatusBadge({ status }: { status: Item['status'] }) {
  const statusStyles: Record<string, string> = {
    ACTIVE: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    MATCHED: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    CLAIMED: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    RESOLVED: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    CLOSED: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
        statusStyles[status] || statusStyles.ACTIVE,
      )}
    >
      {status}
    </span>
  )
}

export function ItemCard({ item, view = 'grid' }: { item: Item; view?: 'grid' | 'list' }) {
  const isLost = item.type === 'LOST'

  return (
    <Link
      href={`/search/${item.id}`}
      className={cn(
        'group relative rounded-3xl bg-[#12131d]/70 hover:bg-[#181926]/90 border border-white/10 hover:border-white/25 backdrop-blur-xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between',
        view === 'list' && 'sm:flex-row sm:items-center sm:gap-4',
      )}
    >
      <div className={cn('flex flex-col', view === 'list' && 'sm:flex-row sm:items-center sm:gap-4 sm:flex-1')}>
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shrink-0',
            view === 'list' ? 'h-24 w-full sm:w-32' : 'aspect-[4/3] w-full',
          )}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-zinc-900">
              <ItemGlyph item={item} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Type and ID Badges */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase backdrop-blur-md border',
                isLost
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
              )}
            >
              {item.type}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-black/60 text-zinc-300 backdrop-blur-md border border-white/10">
              #{item.id}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="mt-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-indigo-400">{item.category}</span>
              <ItemStatusBadge status={item.status} />
            </div>

            <h3 className="text-sm font-bold text-white mt-1 line-clamp-1 group-hover:text-indigo-300 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-col gap-1 text-[11px] text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 truncate max-w-[130px]">
                <MapPin className="h-3 w-3 text-zinc-500 shrink-0" />
                <span className="truncate">{item.generalLocation}</span>
              </span>
              <span className="flex items-center gap-1 text-zinc-500">
                <Calendar className="h-3 w-3" />
                {item.dateOccurred}
              </span>
            </div>

            {item.matchConfidence ? (
              <div className="mt-1 flex items-center justify-between px-2.5 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-[11px] text-indigo-200">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="h-3 w-3 text-indigo-400" />
                  AI Similarity Match
                </span>
                <span className="font-mono font-bold text-emerald-400">{item.matchConfidence}%</span>
              </div>
            ) : null}
          </div>
        </div>
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
  return <Icon className="h-8 w-8 text-indigo-400" aria-hidden />
}
