'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Tag,
  Eye,
  X,
  MessageSquare,
  AlertCircle,
  Share2,
} from 'lucide-react'
import { ITEMS, CATEGORIES, LOCATIONS, type Item, type ReportType, type ReportStatus } from '@/lib/mock-data'

export function ModernItemShowcase() {
  const [activeType, setActiveType] = useState<'ALL' | 'LOST' | 'FOUND' | 'MATCHED'>('ALL')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedLocation, setSelectedLocation] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [claimModalItem, setClaimModalItem] = useState<Item | null>(null)
  const [claimStep, setClaimStep] = useState<1 | 2>(1)
  const [claimAnswer, setClaimAnswer] = useState('')
  const [claimSubmitted, setClaimSubmitted] = useState(false)

  // Filter items
  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      // Type filter
      if (activeType === 'LOST' && item.type !== 'LOST') return false
      if (activeType === 'FOUND' && item.type !== 'FOUND') return false
      if (activeType === 'MATCHED' && item.status !== 'MATCHED') return false

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false

      // Location filter
      if (selectedLocation !== 'All' && item.generalLocation !== selectedLocation) return false

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchDesc = item.description.toLowerCase().includes(q)
        const matchBrand = item.brand?.toLowerCase().includes(q)
        const matchLoc = item.generalLocation.toLowerCase().includes(q)
        const matchCat = item.category.toLowerCase().includes(q)
        if (!matchTitle && !matchDesc && !matchBrand && !matchLoc && !matchCat) return false
      }

      return true
    })
  }, [activeType, selectedCategory, selectedLocation, searchQuery])

  const handleOpenClaim = (item: Item) => {
    setClaimModalItem(item)
    setClaimStep(1)
    setClaimAnswer('')
    setClaimSubmitted(false)
  }

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault()
    setClaimSubmitted(true)
  }

  return (
    <section id="explore" className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-400">
              <span className="text-indigo-400 font-bold">//</span>
              <span>LIVE RECOVERY FEED</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-2 font-['var(--font-heading)']">
              Recent Lost &amp; Found Listings
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              Real-time campus database. Browse active lost reports, inspect found items safely stored at security hubs, or submit an instant ownership claim.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/lost"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 transition-all duration-200"
            >
              + Report Lost
            </Link>
            <Link
              href="/found"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all duration-200"
            >
              + Report Found
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4">
          {/* Main Type Tabs & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Type Switcher Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#12131d] border border-white/10 overflow-x-auto scrollbar-none">
              {(
                [
                  { key: 'ALL', label: 'All Listings' },
                  { key: 'LOST', label: 'Lost Items' },
                  { key: 'FOUND', label: 'Found Items' },
                  { key: 'MATCHED', label: 'Possible Matches' },
                ] as const
              ).map((tab) => {
                const active = activeType === tab.key
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveType(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      active
                        ? 'bg-white text-zinc-950 font-semibold shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Search Input & Location Dropdown */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search brand, item, color, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-[#12131d] border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Location Select */}
              <select
                aria-label="Filter by campus location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-2 px-3 rounded-full text-xs bg-[#12131d] border border-white/10 text-zinc-300 focus:outline-none focus:border-indigo-500 transition-colors shrink-0"
              >
                <option value="All">All Campus Hubs</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                selectedCategory === 'All'
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-200'
              }`}
            >
              All Categories ({ITEMS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              const count = ITEMS.filter((i) => i.category === cat).length
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                    active
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:border-white/15 hover:text-zinc-200'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-60 text-[10px]">({count})</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Showing <strong className="text-zinc-300">{filteredItems.length}</strong> items
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {selectedLocation !== 'All' ? ` around ${selectedLocation}` : ''}
          </span>
          {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSelectedLocation('All')
                setSearchQuery('')
                setActiveType('ALL')
              }}
              className="text-indigo-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Bento Grid Item Cards */}
        {filteredItems.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const isLost = item.type === 'LOST'
              const isMatched = item.status === 'MATCHED'
              const isResolved = item.status === 'RESOLVED'

              return (
                <div
                  key={item.id}
                  className="group relative rounded-3xl bg-[#12131d]/60 border border-white/10 hover:border-white/25 backdrop-blur-xl p-3.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <div>
                    {/* Image Container with Badges */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Status & Type Pills */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border ${
                            isLost
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          {item.type}
                        </span>

                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/60 text-zinc-300 backdrop-blur-md border border-white/10">
                          #{item.id}
                        </span>
                      </div>

                      {/* Match Confidence Badge */}
                      {isMatched && item.matchConfidence && (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between px-2.5 py-1 rounded-xl bg-indigo-950/80 backdrop-blur-md border border-indigo-500/40 text-[11px] font-semibold text-indigo-200">
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-indigo-400" />
                            Smart Match
                          </span>
                          <span className="font-mono text-emerald-400 font-bold">{item.matchConfidence}%</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-3.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <span className="text-indigo-400 font-medium">{item.category}</span>
                        {item.brand && (
                          <>
                            <span>•</span>
                            <span className="text-zinc-300">{item.brand}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white mt-1 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Meta & Action */}
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2.5">
                      <span className="flex items-center gap-1 truncate max-w-[140px]" title={item.generalLocation}>
                        <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                        <span className="truncate">{item.generalLocation}</span>
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar className="h-3 w-3 text-zinc-400" />
                        {item.dateOccurred}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="w-full py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </button>

                      {isLost ? (
                        <button
                          type="button"
                          onClick={() => handleOpenClaim(item)}
                          className="w-full py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Found It?
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenClaim(item)}
                          className="w-full py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition-colors flex items-center justify-center gap-1"
                        >
                          <Lock className="h-3.5 w-3.5" />
                          Claim Item
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-12 p-12 text-center rounded-3xl bg-[#12131d]/40 border border-white/10">
            <AlertCircle className="h-10 w-10 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No items found matching your filter</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Try modifying your search keywords, switching categories, or file a new lost report.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedLocation('All')
                  setSearchQuery('')
                  setActiveType('ALL')
                }}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/15"
              >
                Clear all filters
              </button>
              <Link
                href="/lost"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200"
              >
                + Report Lost Item
              </Link>
            </div>
          </div>
        )}

        {/* Quick View Item Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close details modal"
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors z-10"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto pr-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                      selectedItem.type === 'LOST'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {selectedItem.type}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">ID #{selectedItem.id}</span>
                  <span className="text-xs text-zinc-500">• Reported by {selectedItem.reporter}</span>
                </div>

                <h2 className="text-xl font-bold text-white">{selectedItem.title}</h2>

                {/* Cover Image */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mt-4 bg-zinc-900 border border-white/10">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Category</span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">{selectedItem.category}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Location</span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block truncate">{selectedItem.generalLocation}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Date Occurred</span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">{selectedItem.dateOccurred}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Primary Color</span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">{selectedItem.color}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Brand</span>
                    <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">{selectedItem.brand || 'Unbranded'}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Status</span>
                    <span className="text-xs font-semibold text-indigo-300 mt-0.5 block">{selectedItem.status}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-semibold text-zinc-300 block mb-1">Public Description</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">{selectedItem.description}</p>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    To protect true ownership, secret serial numbers and private contents are kept in the encrypted vault until a claim challenge is answered.
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <Link
                    href={`/messages?report=${selectedItem.id}`}
                    className="px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Message Finder/Reporter
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const itm = selectedItem
                      setSelectedItem(null)
                      handleOpenClaim(itm)
                    }}
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verify &amp; Claim Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ownership Claim Verification Modal */}
        {claimModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#12131d] border border-white/15 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setClaimModalItem(null)}
                aria-label="Close claim modal"
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {!claimSubmitted ? (
                <form onSubmit={handleSubmitClaim}>
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>SMART OWNERSHIP VERIFICATION</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    Claim Item: {claimModalItem.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Please provide proof of ownership to unlock security desk pickup and peer handover.
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
                      <strong>Verification Challenge:</strong> State any hidden marks, last 4 digits of serial/ID, or specific items inside that only the genuine owner knows.
                    </div>

                    <div>
                      <label htmlFor="claim-proof" className="text-xs font-medium text-zinc-300 block mb-1.5">
                        Private Ownership Proof / Secret Answer *
                      </label>
                      <textarea
                        id="claim-proof"
                        rows={3}
                        required
                        placeholder="e.g. Inside the front zipper pocket is a student ID ending in 481, plus a silver keychain."
                        value={claimAnswer}
                        onChange={(e) => setClaimAnswer(e.target.value)}
                        className="w-full p-3 rounded-2xl text-xs bg-[#090a0f] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Encrypted and verified against reporter vault data.</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setClaimModalItem(null)}
                      className="px-4 py-2 rounded-full text-xs font-medium text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!claimAnswer.trim()}
                      className="px-6 py-2 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      Submit Verification Claim
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Claim Submitted Successfully</h2>
                  <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
                    Your ownership proof has been sent for verification. You will receive an instant notification once campus security validates the details.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setClaimModalItem(null)}
                      className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200"
                    >
                      Close
                    </button>
                    <Link
                      href="/claims"
                      className="px-5 py-2 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/15"
                    >
                      View in My Claims
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
