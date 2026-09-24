'use client'

import { useMemo, useState } from 'react'
import { Search, LayoutGrid, List, Filter, RotateCcw } from 'lucide-react'
import { DesktopShell } from '@/components/shell/desktop-shell'
import {
  RetroWindow,
  RetroMenuBar,
  RetroField,
  RetroInput,
  RetroSelect,
  RetroButton,
  RetroGroupBox,
  RetroStatusBar,
  RetroBadge,
} from '@/components/retro'
import { ItemCard } from '@/components/items/item-card'
import { ITEMS, CATEGORIES, LOCATIONS, type ReportType } from '@/lib/mock-data'

const MENUS = [
  { label: 'File', items: [{ label: 'New Report' }, { label: 'Export Results' }] },
  { label: 'View', items: [{ label: 'Grid' }, { label: 'List' }] },
  { label: 'Sort', items: [{ label: 'Newest' }, { label: 'Best Match' }] },
]

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
    <DesktopShell activeKey="search">
      <div className="flex flex-col gap-3">
        <RetroWindow
          title="Search Lost & Found Database"
          icon={<Search className="h-3.5 w-3.5" aria-hidden />}
          controls={['minimize', 'maximize', 'close']}
        >
          <RetroMenuBar menus={MENUS} className="mb-3" />

          <RetroGroupBox legend="Search Filters">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <RetroField label="Keyword" htmlFor="q" className="sm:col-span-2 lg:col-span-1">
                <RetroInput
                  id="q"
                  placeholder="e.g. black wallet"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </RetroField>
              <RetroField label="Type" htmlFor="type">
                <RetroSelect id="type" value={type} onChange={(e) => setType(e.target.value as TypeFilter)}>
                  <option value="ALL">All Reports</option>
                  <option value="LOST">Lost</option>
                  <option value="FOUND">Found</option>
                </RetroSelect>
              </RetroField>
              <RetroField label="Category" htmlFor="cat">
                <RetroSelect id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="ALL">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </RetroSelect>
              </RetroField>
              <RetroField label="Location" htmlFor="loc">
                <RetroSelect id="loc" value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="ALL">All Locations</option>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </RetroSelect>
              </RetroField>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <RetroButton variant="primary" className="gap-2">
                <Filter className="h-4 w-4" aria-hidden />
                Apply Filters
              </RetroButton>
              <RetroButton className="gap-2" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden />
                Reset
              </RetroButton>
              <div className="ml-auto flex items-center gap-1">
                <RetroButton
                  aria-pressed={view === 'grid'}
                  className={view === 'grid' ? 'bevel-in pt-[5px]' : ''}
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden />
                </RetroButton>
                <RetroButton
                  aria-pressed={view === 'list'}
                  className={view === 'list' ? 'bevel-in pt-[5px]' : ''}
                  onClick={() => setView('list')}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" aria-hidden />
                </RetroButton>
              </div>
            </div>
          </RetroGroupBox>

          <RetroStatusBar
            segments={[
              <span key="count" className="flex items-center gap-1">
                <Search className="h-3.5 w-3.5" aria-hidden />
                {results.length} item{results.length === 1 ? '' : 's'} found
              </span>,
              <RetroBadge key="live" tone="green">
                LIVE INDEX
              </RetroBadge>,
            ]}
          />
        </RetroWindow>

        <RetroWindow title={`Results (${results.length})`} controls={['minimize', 'maximize', 'close']}>
          {results.length === 0 ? (
            <div className="bevel-in bg-win-white grid place-items-center gap-2 p-10 text-center">
              <p className="font-pixel text-sm text-win-title">NO MATCHES</p>
              <p className="text-[13px] text-win-shadow">
                Try removing a filter or searching a different keyword.
              </p>
              <RetroButton className="mt-1 gap-2" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden />
                Clear Filters
              </RetroButton>
            </div>
          ) : (
            <div
              className={
                view === 'grid'
                  ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'
                  : 'flex flex-col gap-2'
              }
            >
              {results.map((item) => (
                <ItemCard key={item.id} item={item} view={view} />
              ))}
            </div>
          )}
        </RetroWindow>
      </div>
    </DesktopShell>
  )
}
