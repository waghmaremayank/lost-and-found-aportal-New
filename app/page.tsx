'use client'

import { ModernNavbar } from '@/components/modern/navbar'
import { ModernHeroSection } from '@/components/modern/hero-section'
import { ModernItemShowcase } from '@/components/modern/item-showcase'
import { ModernHowItWorks } from '@/components/modern/how-it-works'
import { ModernRecentReunions } from '@/components/modern/recent-reunions'
import { ModernFAQSection } from '@/components/modern/faq-section'
import { ModernFooter } from '@/components/modern/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Floating Modern Capsule Navbar */}
      <ModernNavbar />

      {/* Hero Section with Live Stats Bento Grid */}
      <ModernHeroSection />

      {/* Live Item Showcase with Filters & In-Page Modal */}
      <ModernItemShowcase />

      {/* Numbered Services / Workflow Section (01, 02, 03) */}
      <ModernHowItWorks />

      {/* Verified Campus Reunions Trust Strip */}
      <ModernRecentReunions />

      {/* Framer-Style FAQs Accordion */}
      <ModernFAQSection />

      {/* Modern High-Impact Footer */}
      <ModernFooter />
    </div>
  )
}
