'use client'

import { useEffect, useRef } from 'react'
import { clamp, passProgress, subscribe } from '../lib/scroll'

// Exposes the element's scroll progress to CSS as --p (0..1).
// mode "pass": 0 entering at the bottom -> 1 leaving at the top.
// mode "read": 0 when its top reaches 75% of the viewport -> 1 when its bottom does.
export default function ScrollVar({ children, as: Tag = 'div', mode = 'pass', className = '', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let last = -1
    return subscribe(({ h, reduced }) => {
      const r = el.getBoundingClientRect()
      if (r.bottom < -h * 0.5 || r.top > h * 1.5) return
      let p
      if (reduced) p = mode === 'read' ? 1 : 0.5
      else if (mode === 'read') p = clamp((h * 0.75 - r.top) / Math.max(1, r.height))
      else p = passProgress(r, h)
      if (Math.abs(p - last) < 0.001) return
      last = p
      el.style.setProperty('--p', p.toFixed(4))
    })
  }, [mode])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
