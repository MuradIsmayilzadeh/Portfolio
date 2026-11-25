'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { subscribe, scrollToY, clamp } from '../lib/scroll'

// Desktop scrollbar replacement: a 3D prism riding a thin rail.
// It tilts and stretches with scroll speed, turns toward the cursor,
// marks each section with a tick, and can be dragged or clicked like a
// normal scrollbar. Touch screens keep their native overlay scrollbar.
export default function ScrollRail() {
  const root = useRef(null)
  const thumb = useRef(null)
  const ticks = useRef(null)
  const label = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    const html = document.documentElement
    html.classList.add('has-rail')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let railH = 0
    let thumbH = 40
    let max = 1
    const measure = () => {
      railH = el.clientHeight
      const doc = html.scrollHeight
      max = Math.max(1, doc - window.innerHeight)
      thumbH = clamp((window.innerHeight / doc) * railH, 36, railH * 0.5)
      thumb.current.style.height = `${thumbH}px`
      el.classList.toggle('is-off', doc <= window.innerHeight + 2)
      // one tick per section that drives the 3D model
      const list = ticks.current
      list.textContent = ''
      document.querySelectorAll('main [data-shape]').forEach((s) => {
        const top = s.getBoundingClientRect().top + window.scrollY
        const i = document.createElement('i')
        i.style.top = `${clamp(top / max) * 100}%`
        list.appendChild(i)
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)

    // cursor proximity turns the prism
    let near = 0
    let mouseY = 0
    const onMove = (e) => {
      near = clamp(1 - (window.innerWidth - e.clientX) / 160)
      mouseY = e.clientY
      el.classList.toggle('is-near', near > 0.05)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // drag + click
    let drag = null
    const yToScroll = (clientY, offset) => {
      const r = el.getBoundingClientRect()
      return clamp((clientY - r.top - offset) / Math.max(1, railH - thumbH)) * max
    }
    const down = (e) => {
      if (e.button !== 0) return
      e.preventDefault()
      const tr = thumb.current.getBoundingClientRect()
      const onThumb = e.clientY >= tr.top && e.clientY <= tr.bottom
      const offset = onThumb ? e.clientY - tr.top : thumbH / 2
      if (!onThumb) scrollToY(yToScroll(e.clientY, offset))
      drag = { offset }
      el.setPointerCapture(e.pointerId)
      el.classList.add('is-drag')
      html.classList.add('is-dragging')
    }
    const move = (e) => {
      if (drag) scrollToY(yToScroll(e.clientY, drag.offset), true)
    }
    const up = () => {
      drag = null
      el.classList.remove('is-drag')
      html.classList.remove('is-dragging')
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)

    const cur = { rx: 0, ry: 0, s: 1, near: 0 }
    let idle = 0
    let lastKey = ''
    const unsub = subscribe(({ y, v }) => {
      const p = clamp(y / max)
      const speed = reduced ? 0 : clamp(v / 40, -1, 1)
      cur.rx += (-speed * 55 - cur.rx) * 0.12
      cur.s += (1 + Math.abs(speed) * 0.6 - cur.s) * 0.12
      cur.near += (near - cur.near) * 0.12
      const tY = mouseY ? clamp((mouseY - el.getBoundingClientRect().top) / railH - p, -1, 1) : 0
      cur.ry += ((reduced ? 0 : -30 - cur.near * 25 + tY * 10) - cur.ry) * 0.1
      const top = p * (railH - thumbH)
      const key = `${top.toFixed(1)}${cur.rx.toFixed(1)}${cur.ry.toFixed(1)}${cur.s.toFixed(2)}`
      if (Math.abs(v) > 0.3 || drag) {
        idle = 0
        el.classList.add('is-active')
      } else if (++idle > 90) el.classList.remove('is-active')
      if (key === lastKey) return
      lastKey = key
      el.style.setProperty('--p', p.toFixed(4))
      thumb.current.style.transform =
        `translate3d(0, ${top}px, 0) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) scaleY(${cur.s.toFixed(3)})`
      label.current.textContent = String(Math.round(p * 100)).padStart(3, '0')
      label.current.style.transform = `translate3d(0, ${top + thumbH / 2}px, 0)`
    })

    return () => {
      unsub()
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      html.classList.remove('has-rail', 'is-dragging')
    }
  }, [pathname])

  return (
    <div ref={root} className="rail" aria-hidden="true">
      <div className="rail__line">
        <span className="rail__fill" />
      </div>
      <div ref={ticks} className="rail__ticks" />
      <div ref={thumb} className="rail__thumb">
        <span className="rail__face rail__face--front" />
        <span className="rail__face rail__face--back" />
        <span className="rail__face rail__face--left" />
        <span className="rail__face rail__face--right" />
      </div>
      <span ref={label} className="rail__label" />
    </div>
  )
}
