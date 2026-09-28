import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LOST & FOUND // Campus Recovery Network',
  description:
    'A modern, high-precision lost and found platform with AI photo matching, encrypted ownership proof, and secure campus pickup desks.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#090a0f] text-zinc-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
