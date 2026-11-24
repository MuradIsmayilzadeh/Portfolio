'use client'

import { useEffect, useRef } from 'react'
import { clamp, pinProgress, subscribe } from '../../lib/scroll'

// Pinned three-column section:
//   left column scrolls up, right column scrolls DOWN (reverse),
//   the middle stays open so the 3D model shows through and morphs per step.
export default function SplitScroll({ steps, tiles }) {
  const root = useRef(null)
  const left = useRef(null)
  const right = useRef(null)
  const bar = useRef(null)
  const counter = useRef(null)

  useEffect(() => {
    let lastStep = -1
    let lastP = -1
    return subscribe(({ h }) => {
      const el = root.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.bottom < -h || rect.top > h * 2) return
      const p = pinProgress(rect, h)
      if (Math.abs(p - lastP) < 0.0002) return
      lastP = p

      const L = left.current
      const Rc = right.current
      const rMax = Rc.scrollHeight - h
      // Panels hold, then glide to the next one (a stepped "snap" feel).
      const last = steps.length - 1
      const t = p * last
      const i0 = Math.min(last, Math.floor(t))
      const f = clamp((t - i0 - 0.3) / 0.4)
      const v = Math.min(last, i0 + f * f * (3 - 2 * f))
      const panelH = L.firstElementChild.offsetHeight
      L.style.transform = `translate3d(0, ${Math.round(-v * panelH)}px, 0)`
      Rc.style.transform = `translate3d(0, ${Math.round(-(1 - p) * rMax)}px, 0)`
      bar.current.style.transform = `scaleY(${p})`

      const step = Math.round(v)
      if (step !== lastStep) {
        lastStep = step
        el.dataset.shape = steps[step].shape
        counter.current.textContent = String(step + 1).padStart(2, '0')
        L.querySelectorAll('.split__panel').forEach((n, i) => n.classList.toggle('is-active', i === step))
      }
    })
  }, [steps])

  return (
    <section
      ref={root}
      className="split"
      data-shape={steps[0].shape}
      data-shape-x="0"
      data-shape-my="-0.27"
      data-shape-ms="1.05"
      data-shape-scale="0.8"
      style={{ '--steps': steps.length }}
    >
      <div className="split__sticky">
        <div className="split__col split__col--left" ref={left}>
          {steps.map((s, i) => (
            <article className={`split__panel ${i === 0 ? 'is-active' : ''}`} key={s.title}>
              <span className="split__n mono">{s.n} / {String(steps.length).padStart(2, '0')}</span>
              <h3 className="split__title">{s.title}</h3>
              <p className="split__text">{s.text}</p>
              <ul className="split__points mono">
                {s.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="split__center" aria-hidden="true">
          <div className="split__hud mono">
            <span>// CAPABILITY</span>
            <span className="split__count" ref={counter}>01</span>
          </div>
          <div className="split__rail"><span ref={bar} /></div>
          <div className="split__crosshair" />
        </div>

        <div className="split__col split__col--right" ref={right} aria-hidden="true">
          {tiles.map((t, i) => (
            <div className="split__tile" key={t + i}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
