'use client'

import { useEffect, useState } from 'react'

// Live local time in Baku (UTC+4), rendered after mount to avoid hydration drift.
export default function Clock() {
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Baku',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>BAKU {time}</span>
}
