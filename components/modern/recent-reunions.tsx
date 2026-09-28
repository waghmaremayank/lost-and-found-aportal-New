'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, MapPin, Sparkles, Shield, ArrowRight } from 'lucide-react'

export function ModernRecentReunions() {
  const reunions = [
    {
      id: 'R-1',
      title: 'Prescription Glasses (Ray-Ban)',
      location: 'Student Union Front Desk',
      time: '2 hours ago',
      resolvedTime: 'Returned within 45 mins',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'R-2',
      title: 'Calculus Notebook & Casio FX',
      location: 'Central Library 3rd Floor',
      time: 'Yesterday',
      resolvedTime: 'Returned within 3 hours',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'R-3',
      title: 'Gym Keyfob & Student ID Card',
      location: 'Sports Complex Desk',
      time: '2 days ago',
      resolvedTime: 'Returned same day',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&auto=format&fit=crop&q=80',
    },
  ]

  return (
    <section className="relative py-14 border-t border-white/10 bg-[#090a0f]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-mono tracking-wider uppercase text-zinc-400">
              COMMUNITY TRUST // RECENT VERIFIED REUNIONS
            </h3>
          </div>
          <Link
            href="/community"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View Community Feed</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reunions.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-3xl bg-[#12131d]/60 border border-white/10 flex items-center gap-3.5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-200"
            >
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-zinc-900 shrink-0 border border-white/10">
                <Image src={r.image} alt={r.title} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{r.resolvedTime}</span>
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-0.5">{r.title}</h4>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="h-2.5 w-2.5 shrink-0 text-zinc-500" />
                  <span className="truncate">{r.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
