'use client'

import { useEffect, useRef, useState } from 'react'

const PANELS = 5
const LINES = ['fonts', 'scene', 'assets', 'ready']

// First visit per session: shows real loading progress (fonts + window load,
// with a short minimum so it never just flickers), then lifts away in panels.
// The inline script in layout.jsx adds `html.is-booting` before first paint,
// so returning visitors never see it. CSS has a failsafe if JS never runs.
export default function BootLoader() {
  const [active, setActive] = useState(true)
  const num = useRef(null)
  const bar = useRef(null)
  const log = useRef(null)
  const root = useRef(null)

  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('is-booting')) {
      setActive(false)
      return
    }
    try { sessionStorage.setItem('booted', '1') } catch {}

    let target = 12
    let shown = 0
    let raf = 0
    let done = false
    const t0 = performance.now()
    const MIN = 1100

    const step = (k) => {
      target = Math.max(target, k)
      const li = log.current?.children
      if (li) {
        const n = Math.min(LINES.length, Math.round((target / 100) * LINES.length))
        for (let i = 0; i < li.length; i++) li[i].classList.toggle('is-on', i < n)
      }
    }

    document.fonts?.ready.then(() => step(55))
    const onLoad = () => step(85)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    const capTimer = setTimeout(() => step(100), 3000) // never wait longer than this

    const finish = () => {
      done = true
      root.current?.classList.add('boot--exit')
      setTimeout(() => {
        html.classList.remove('is-booting')
        window.dispatchEvent(new Event('boot:done'))
      }, 350)
      setTimeout(() => setActive(false), 1300)
    }

    const tick = (t) => {
      const elapsed = t - t0
      const goal = elapsed > MIN && target >= 85 ? 100 : Math.min(target, 96)
      shown += (goal - shown) * 0.09
      if (goal === 100 && shown > 99.4) shown = 100
      const v = Math.floor(shown)
      if (num.current) num.current.textContent = String(v).padStart(3, '0')
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`
      if (v >= 100 && !done) return finish()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(capTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (!active) return null

  return (
    <div className="boot" ref={root} aria-hidden="true">
      <div className="boot__panels">
        {Array.from({ length: PANELS }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="boot__ui">
        <div className="boot__top mono">
          <span>M<b>/</b>I — PORTFOLIO</span>
          <span>SYS.BOOT v2</span>
        </div>
        <ul className="boot__log mono" ref={log}>
          {LINES.map((l) => (
            <li key={l}>
              <span>&gt;</span> load.{l}
            </li>
          ))}
        </ul>
        <div className="boot__bottom">
          <span className="boot__num" ref={num}>000</span>
          <div className="boot__bar"><span ref={bar} /></div>
        </div>
      </div>
    </div>
  )
}
