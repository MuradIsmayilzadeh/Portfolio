'use client'

import { useEffect, useRef } from 'react'

// Counts from 0 to `value` when scrolled into view. Keeps any suffix ("+").
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null)
  const str = String(value)
  const num = parseInt(str, 10)
  const suffix = str.replace(/^\d+/, '')

  useEffect(() => {
    const el = ref.current
    if (!el || Number.isNaN(num)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.textContent = `0${suffix}`
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - k, 4)
        el.textContent = `${Math.round(num * eased)}${suffix}`
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [num, suffix, duration])

  return <span ref={ref}>{str}</span>
}
