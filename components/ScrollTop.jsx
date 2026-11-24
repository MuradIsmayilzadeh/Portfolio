'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { scrollToTop, startScroll, subscribe } from '../lib/scroll'

// Boots the scroll engine, resets scroll on route change and drives the
// top progress bar.
export default function ScrollTop() {
  const pathname = usePathname()
  const bar = useRef(null)

  useEffect(() => {
    startScroll()
    let last = -1
    return subscribe(({ y, h }) => {
      const max = document.documentElement.scrollHeight - h
      const p = max > 0 ? y / max : 0
      if (Math.abs(p - last) < 0.0005) return
      last = p
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    })
  }, [])

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />
}
