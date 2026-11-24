'use client'

import { useEffect, useRef } from 'react'
import { subscribe } from '../lib/scroll'

// Infinite marquee rows. Each row drifts; scrolling speeds it up and the
// scroll direction flips which way it runs. Alternate rows run in reverse.
export default function Marquee({ rows }) {
  const refs = useRef([])

  useEffect(() => {
    const offs = rows.map(() => 0)
    let boost = 0
    return subscribe(({ v, dir, reduced, h }) => {
      if (reduced) return
      const first = refs.current[0]
      if (!first) return
      const r = first.getBoundingClientRect()
      if (r.bottom < -100 || r.top > h + 100) return
      boost += (Math.min(Math.abs(v), 60) * 0.12 - boost) * 0.1
      refs.current.forEach((el, i) => {
        if (!el) return
        const half = el.scrollWidth / 2
        const sign = (i % 2 ? -1 : 1) * dir
        offs[i] = (offs[i] + (0.6 + boost) * sign) % half
        if (offs[i] > 0) offs[i] -= half
        el.style.transform = `translate3d(${offs[i]}px,0,0) skewX(${(-v * 0.15 * (i % 2 ? -1 : 1)).toFixed(2)}deg)`
      })
    })
  }, [rows])

  return (
    <div className="marquee" aria-hidden="true">
      {rows.map((items, i) => (
        <div className={`marquee__row ${i % 2 ? 'marquee__row--alt' : ''}`} key={i}>
          <div className="marquee__track" ref={(el) => (refs.current[i] = el)}>
            {[...items, ...items].map((t, j) => (
              <span className="marquee__item" key={j}>
                {t}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
