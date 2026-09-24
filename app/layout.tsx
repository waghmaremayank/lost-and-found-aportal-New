import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pixel = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LOST//98 — The Lost & Found Operating System',
  description:
    'Lost something? Found something? Check the system. A secure community Lost & Found portal with a Windows 98-inspired interface.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0a7d7d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${pixel.variable}`} style={{ colorScheme: 'light' }}>
      <body
        className="antialiased text-win-text"
        style={{ fontFamily: '"Segoe UI", Tahoma, "MS Sans Serif", Geneva, sans-serif' }}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
