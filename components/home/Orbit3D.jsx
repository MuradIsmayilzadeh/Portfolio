'use client'

import { useEffect, useRef } from 'react'
import { pinProgress, subscribe } from '../../lib/scroll'
import Decode from '../Decode'

// Pinned 3D carousel: tech tiles on a cylinder around the point-cloud "core".
// Scroll turns the ring, dragging spins it with inertia, the cursor tilts it.
export default function Orbit3D({ items, title = 'The stack' }) {
  const root = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const count = useRef(null)

  useEffect(() => {
    const el = root.current
    const rg = ring.current
    const tiles = [...rg.children]
    const n = tiles.length
    const step = 360 / n
    tiles.forEach((t, i) => t.style.setProperty('--a', `${i * step}deg`))
    const size = () => {
      const w = tiles[0].offsetWidth + 18
      el.style.setProperty('--r', `${Math.round((w * n) / (2 * Math.PI))}px`)
    }
    size()
    window.addEventListener('resize', size)

    let drag = 0 // degrees added by dragging
    let vel = 0
    let tilt = 0
    let tiltGoal = 0
    let down = null
    let front = -1

    const onDown = (e) => {
      down = { x: e.clientX, t: performance.now() }
      el.classList.add('is-grabbing')
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tiltGoal = ((e.clientY - r.top) / r.height - 0.5) * -14
      if (!down) return
      const dx = e.clientX - down.x
      down.x = e.clientX
      drag += dx * 0.25
      vel = dx * 0.25
    }
    const onUp = () => {
      down = null
      el.classList.remove('is-grabbing')
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)

    const unsub = subscribe(({ h, reduced }) => {
      const rect = el.getBoundingClientRect()
      if (rect.bottom < -h || rect.top > h * 2) return
      const p = pinProgress(rect, h)
      if (!down) {
        drag += vel
        vel *= 0.94
      }
      tilt += (tiltGoal - tilt) * 0.06
      const rot = (reduced ? 0 : -p * 300) - drag
      rg.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${(-10 + tilt).toFixed(2)}deg) rotateY(${rot.toFixed(2)}deg)`

      // fade tiles by how much they face the viewer, find the front one
      let best = 0
      let bestC = -2
      for (let i = 0; i < n; i++) {
        const a = ((i * step + rot) * Math.PI) / 180
        const c = Math.cos(a)
        tiles[i].style.opacity = (0.12 + Math.max(0, c) * 0.88).toFixed(3)
        if (c > bestC) {
          bestC = c
          best = i
        }
      }
      if (best !== front) {
        tiles[front]?.classList.remove('is-front')
        front = best
        tiles[front].classList.add('is-front')
        if (!label.current || !count.current) return
        label.current.textContent = items[front].group
        count.current.textContent = `${String(front + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
      }
    })

    return () => {
      unsub()
      window.removeEventListener('resize', size)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [items])

  return (
    <section
      ref={root}
      className="orbit"
      data-shape="sphere"
      data-shape-x="0"
      data-shape-scale="0.42"
      data-shape-o="0.9"
      data-cursor="drag"
    >
      <div className="orbit__sticky">
        <div className="orbit__head wrap">
          <Decode className="eyebrow" text={`// ${title}`} />
          <span className="orbit__count mono" ref={count}>01</span>
        </div>

        <div className="orbit__stage" aria-hidden="true">
          <div className="orbit__halo orbit__halo--a" />
          <div className="orbit__halo orbit__halo--b" />
          <div className="orbit__ring" ref={ring}>
            {items.map((it, i) => (
              <div className="orbit__tile" key={it.name + i}>
                <span className="mono">{it.group}</span>
                <b>{it.name}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="orbit__foot wrap">
          <p className="orbit__label" ref={label}>{items[0].group}</p>
          <p className="mono muted">
            <span className="hide-touch">Scroll or drag to spin</span>
            <span className="show-touch">Scroll or swipe to spin</span>
          </p>
        </div>

        <ul className="sr-only">
          {items.map((it, i) => <li key={it.name + i}>{it.name} ({it.group})</li>)}
        </ul>
      </div>
    </section>
  )
}
