'use client'

import { useEffect, useRef } from 'react'
import { clamp, subscribe } from '../lib/scroll'

// Words light up one by one as the paragraph scrolls through the viewport.
export default function ScrubText({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    const spans = el.querySelectorAll('.scrub__w')
    let lit = -1
    return subscribe(({ h, reduced }) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > h) return
      // fully lit once the block's bottom reaches ~40% of the viewport
      const p = reduced ? 1 : clamp((h * 0.85 - r.top) / (r.height + h * 0.45))
      const k = Math.round(p * spans.length)
      if (k === lit) return
      lit = k
      spans.forEach((s, i) => s.classList.toggle('is-lit', i < k))
    })
  }, [text])

  return (
    <Tag ref={ref} className={`scrub ${className}`}>
      {words.map((w, i) => (
        <span className="scrub__w" key={i}>
          {w}{' '}
        </span>
      ))}
    </Tag>
  )
}
