'use client'

import { useEffect, useRef } from 'react'

// 3D tilt + cursor spotlight for cards. Writes CSS vars only:
// --rx / --ry (deg) and --mx / --my (spotlight position, %).
export default function Tilt({ children, max = 7 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
        el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [max])

  return (
    <div ref={ref} className="tilt">
      {children}
    </div>
  )
}
