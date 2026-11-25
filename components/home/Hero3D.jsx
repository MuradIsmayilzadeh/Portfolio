'use client'

import { useEffect, useRef } from 'react'
import { subscribe } from '../../lib/scroll'

// Turns the hero name in 3D toward the cursor; the two lines sit at
// different depths and the solid line casts an extruded shadow that shifts
// with the angle. On touch screens scrolling gives it a gentle sway.
export default function Hero3D({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const goal = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let fine = window.matchMedia('(pointer: fine)').matches

    const move = (e) => {
      if (e.pointerType !== 'mouse') return
      fine = true
      goal.x = e.clientX / window.innerWidth - 0.5
      goal.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', move, { passive: true })

    let last = ''
    const unsub = subscribe(({ v, h }) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > h) return
      if (!fine) {
        goal.x = Math.max(-0.4, Math.min(0.4, v * 0.015))
        goal.y = 0
      }
      cur.x += (goal.x - cur.x) * 0.07
      cur.y += (goal.y - cur.y) * 0.07
      const ry = (cur.x * 18).toFixed(2)
      const rx = (-cur.y * 14).toFixed(2)
      const key = ry + rx
      if (key === last) return
      last = key
      el.style.setProperty('--h-ry', `${ry}deg`)
      el.style.setProperty('--h-rx', `${rx}deg`)
      el.style.setProperty('--h-sx', (-cur.x * 2).toFixed(3))
      el.style.setProperty('--h-sy', (-cur.y * 2).toFixed(3))
    })

    return () => {
      unsub()
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div ref={ref} className="hero3d">
      {children}
    </div>
  )
}
