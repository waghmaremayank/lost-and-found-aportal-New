'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  PackageSearch,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Tag,
  Search,
  LayoutGrid,
  List,
} from 'lucide-react'
import { RetroWindow, RetroButton, RetroBadge, RetroStatusBar, RetroTabs } from '@/components/retro'
import { ITEMS, type Item } from '@/lib/mock-data'
import { ItemStatusBadge } from '@/components/items/item-card'

export function RecentItemsWindow() {
  const [tab, setTab] = useState<'all' | 'lost' | 'found'>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const items = ITEMS.filter((item) => {
    if (tab === 'lost') return item.type === 'LOST'
    if (tab === 'found') return item.type === 'FOUND'
    return true
  }).slice(0, 6)

  return (
    <RetroWindow
      title="Live Item Explorer — [Recent Database Activity]"
      icon={<PackageSearch className="h-3.5 w-3.5" aria-hidden />}
      controls={['minimize', 'maximize', 'close']}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-win-face-light pb-2">
          <RetroTabs
            tabs={[
              { key: 'all', label: `All Items (${ITEMS.length})` },
              { key: 'lost', label: `Lost (${ITEMS.filter((i) => i.type === 'LOST').length})` },
              { key: 'found', label: `Found (${ITEMS.filter((i) => i.type === 'FOUND').length})` },
            ]}
            active={tab}
            onChange={(k) => setTab(k as typeof tab)}
          />

          <div className="flex items-center gap-1.5">
            <RetroButton
              onClick={() => setView('grid')}
              className={view === 'grid' ? 'bevel-in pt-[5px]' : ''}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
            </RetroButton>
            <RetroButton
              onClick={() => setView('list')}
              className={view === 'list' ? 'bevel-in pt-[5px]' : ''}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" aria-hidden />
            </RetroButton>
            <Link href="/search">
              <RetroButton className="gap-1 text-[11px]">
                <Search className="h-3 w-3" aria-hidden />
                Full Database
              </RetroButton>
            </Link>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/search/${item.id}`}
                className="bevel-out bg-win-face flex flex-col overflow-hidden transition-transform active:scale-[0.99] group dotted-focus"
              >
                <div className="bevel-in bg-win-dark relative h-32 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1">
                    <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>
                      {item.type}
                    </RetroBadge>
                  </div>
                  <div className="absolute bottom-1 right-1 bevel-out bg-win-face/90 px-1 py-0.5 font-mono-sys text-[9px] font-bold text-win-title">
                    #{item.id}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-win-text truncate group-hover:text-win-title">
                      {item.title}
                    </h4>
                    <ItemStatusBadge status={item.status} />
                  </div>

                  <div className="flex flex-col gap-0.5 text-[11px] text-win-shadow">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 shrink-0" aria-hidden />
                      {item.category} {item.brand ? `· ${item.brand}` : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                      {item.generalLocation}
                    </span>
                  </div>

                  {item.matchConfidence ? (
                    <div className="bevel-groove mt-1 flex items-center gap-1 bg-win-yellow/50 px-1.5 py-0.5 text-[10px] font-bold text-win-title">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      {item.matchConfidence}% Match ({item.possibleMatches} possible)
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bevel-field retro-scroll overflow-x-auto bg-win-white">
            <table className="w-full text-left text-[12px]">
              <thead className="bevel-out bg-win-face text-[11px] font-bold text-win-text">
                <tr>
                  <th className="px-2 py-1.5">Photo</th>
                  <th className="px-2 py-1.5">ID</th>
                  <th className="px-2 py-1.5">Type</th>
                  <th className="px-2 py-1.5">Item Name</th>
                  <th className="px-2 py-1.5">Category</th>
                  <th className="px-2 py-1.5">Location</th>
                  <th className="px-2 py-1.5">Status</th>
                  <th className="px-2 py-1.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-win-face-light">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-win-title/10">
                    <td className="px-2 py-1">
                      <div className="bevel-in h-8 w-8 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="font-mono-sys px-2 py-1 font-bold text-win-title">#{item.id}</td>
                    <td className="px-2 py-1">
                      <RetroBadge tone={item.type === 'LOST' ? 'red' : 'green'}>{item.type}</RetroBadge>
                    </td>
                    <td className="px-2 py-1 font-bold">{item.title}</td>
                    <td className="px-2 py-1 text-win-shadow">{item.category}</td>
                    <td className="px-2 py-1">{item.generalLocation}</td>
                    <td className="px-2 py-1">
                      <ItemStatusBadge status={item.status} />
                    </td>
                    <td className="px-2 py-1 text-right">
                      <Link href={`/search/${item.id}`}>
                        <RetroButton className="px-2 py-0.5 text-[11px]">View</RetroButton>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <RetroStatusBar
          segments={[
            <span key="st" className="flex items-center gap-1">
              <PackageSearch className="h-3.5 w-3.5" aria-hidden />
              Displaying {items.length} featured records from live catalog
            </span>,
            <RetroBadge key="sec" tone="green">
              INDEX SYNCED
            </RetroBadge>,
          ]}
        />
      </div>
    </RetroWindow>
  )
}
