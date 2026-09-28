'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, LayoutGrid, List, Filter, RotateCcw, Sparkles, X, MapPin } from 'lucide-react'
import { ModernShell } from '@/components/shell/modern-shell'
import { ItemCard } from '@/components/items/item-card'
import { ITEMS, CATEGORIES, LOCATIONS, type ReportType } from '@/lib/mock-data'

type TypeFilter = ReportType | 'ALL'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<TypeFilter>('ALL')
  const [category, setCategory] = useState('ALL')
  const [location, setLocation] = useState('ALL')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ITEMS.filter((item) => {
      if (type !== 'ALL' && item.type !== type) return false
      if (category !== 'ALL' && item.category !== category) return false
      if (location !== 'ALL' && item.generalLocation !== location) return false
      if (q) {
        const hay = `${item.title} ${item.description} ${item.brand ?? ''} ${item.color} ${item.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [query, type, category, location])

  const reset = () => {
    setQuery('')
    setType('ALL')
    setCategory('ALL')
    setLocation('ALL')
  }

  return (
    <ModernShell
      activeKey="search"
      title="Search Database"
      subtitle="Explore and filter verified campus lost reports, found inventory, and high-confidence AI matches."
      badge={`${results.length} LISTINGS`}
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/lost"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-colors"
          >
            + Report Lost
          </Link>
          <Link
            href="/found"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-colors"
          >
            + Report Found
          </Link>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Search & Filter Bar */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#12131d]/70 border border-white/10 backdrop-blur-xl flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="sm:col-span-2 lg:col-span-1 relative">
              <label htmlFor="search-kw" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  id="search-kw"
                  type="text"
                  placeholder="e.g. black wallet, AirPods..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Type */}
            <div>
              <label htmlFor="search-type" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Listing Type
              </label>
              <select
                id="search-type"
                value={type}
                onChange={(e) => setType(e.target.value as TypeFilter)}
                className="w-full px-3.5 py-2 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="ALL">All Reports</option>
                <option value="LOST">Lost Only</option>
                <option value="FOUND">Found Only</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="search-cat" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Category
              </label>
              <select
                id="search-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="ALL">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="search-loc" className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Campus Zone
              </label>
              <select
                id="search-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="ALL">All Locations</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row & View Mode */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </button>
            </div>

            <div className="flex items-center gap-1.5 bg-[#090a0f] p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-xl transition-colors ${
                  view === 'grid' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`p-1.5 rounded-xl transition-colors ${
                  view === 'list' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div>
          {results.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#12131d]/50 border border-white/10 backdrop-blur-xl">
              <Search className="h-10 w-10 text-zinc-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No matching items in the index</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                Try loosening your search keywords or switching to a broader category.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              className={
                view === 'grid'
                  ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-3'
              }
            >
              {results.map((item) => (
                <ItemCard key={item.id} item={item} view={view} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ModernShell>
  )
}
