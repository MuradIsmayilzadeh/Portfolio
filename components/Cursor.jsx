'use client'

import { useEffect, useRef } from 'react'

// Lightweight cursor: refs + a single rAF loop, no React re-renders per frame.
// Disabled on touch devices and when the user prefers reduced motion.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    document.documentElement.classList.add('has-cursor')
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let raf

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      }
    }

    const onOver = (e) => {
      const hit = e.target.closest('a, button, [data-hover]')
      const zone = !hit && e.target.closest('[data-cursor]')
      const r = ring.current
      if (!r) return
      r.classList.toggle('is-hover', Boolean(hit))
      r.classList.toggle('is-label', Boolean(zone))
      r.dataset.label = zone ? zone.dataset.cursor : ''
    }

    const onLeave = () => ring.current?.classList.add('is-hidden')
    const onEnter = () => ring.current?.classList.remove('is-hidden')
    const onDown = () => {
      ring.current?.classList.add('is-down')
      dot.current?.classList.add('is-down')
    }
    const onUp = () => {
      ring.current?.classList.remove('is-down')
      dot.current?.classList.remove('is-down')
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('blur', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
