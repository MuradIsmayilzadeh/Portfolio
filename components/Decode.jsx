'use client'

import { useEffect, useRef } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEFXYZ'

// "Decrypts" its text: random glyphs resolve left to right.
// Runs when it scrolls into view and again when the nearest link/button
// (or the element itself) is hovered. Screen readers get the plain text.
export default function Decode({ text, className = '', as: Tag = 'span', hover = true }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let running = false

    const run = () => {
      if (running) return
      running = true
      const start = performance.now()
      const dur = Math.min(900, 220 + text.length * 32)
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur)
        const solved = Math.floor(t * text.length)
        let s = ''
        for (let i = 0; i < text.length; i++) {
          const c = text[i]
          s += i < solved || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        }
        el.textContent = s
        if (t < 1) raf = requestAnimationFrame(tick)
        else {
          el.textContent = text
          running = false
        }
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        run()
        io.disconnect()
      }
    })
    io.observe(el)

    const host = hover ? el.closest('a, button') || el : null
    host?.addEventListener('pointerenter', run)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      host?.removeEventListener('pointerenter', run)
      el.textContent = text
    }
  }, [text, hover])

  return (
    <Tag className={`decode ${className}`}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">{text}</span>
    </Tag>
  )
}
