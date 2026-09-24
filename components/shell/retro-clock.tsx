'use client'

import { useEffect, useState } from 'react'

export function RetroClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  const time = now
    ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  )
}
