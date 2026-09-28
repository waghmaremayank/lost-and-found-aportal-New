'use client'

import type { ReactNode } from 'react'
import { ModernShell } from './modern-shell'

export function DesktopShell({
  activeKey,
  children,
}: {
  activeKey?: string
  children: ReactNode
}) {
  return (
    <ModernShell activeKey={activeKey}>
      {children}
    </ModernShell>
  )
}
