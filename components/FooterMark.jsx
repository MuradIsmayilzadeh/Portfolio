'use client'

import { useEffect, useRef } from 'react'
import { clamp, subscribe } from '../lib/scroll'

// Full-width outlined wordmark. It rises in as the footer scrolls into view,
// and a glowing fill follows the cursor across the letters.
export default function FooterMark({ text }) {
  const ref = useRef(null)
  const inner = useRef(null)

  useEffect(() => {
    const el = ref.current
    const tx = inner.current
    const footer = el.closest('footer') || el.parentElement

    // Fit the text to the container width on one line.
    const fit = () => {
      el.style.setProperty('--fs', '100px')
      // phones stack the words: fit the widest one
      const stacked = getComputedStyle(tx).flexDirection === 'column'
      const w = stacked ? Math.max(...[...tx.children].map((c) => c.scrollWidth)) : tx.scrollWidth
      const avail = el.clientWidth
      if (w > 0) el.style.setProperty('--fs', `${Math.floor((100 * avail) / w) - 1}px`)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    document.fonts?.ready.then(fit)

    const move = (e) => {
      const r = tx.getBoundingClientRect()
      el.style.setProperty('--fx', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--fy', `${((e.clientY - r.top) / r.height) * 100}%`)
      el.classList.add('is-lit')
    }
    const leave = () => el.classList.remove('is-lit')
    footer.addEventListener('pointermove', move)
    footer.addEventListener('pointerleave', leave)

    let last = -1
    const unsub = subscribe(({ h, reduced }) => {
      const r = el.getBoundingClientRect()
      if (r.top > h * 1.2) return
      const p = reduced ? 1 : clamp((h - r.top) / (r.height * 1.4))
      if (Math.abs(p - last) < 0.002) return
      last = p
      el.style.setProperty('--rise', p.toFixed(3))
    })

    return () => {
      ro.disconnect()
      unsub()
      footer.removeEventListener('pointermove', move)
      footer.removeEventListener('pointerleave', leave)
    }
  }, [])

  let n = 0
  const letters = text.split(' ').map((word, wi) => (
    <span className="fmark__word" key={wi}>
      {word.split('').map((c) => {
        const i = n++
        return <span key={i} style={{ '--i': i }}>{c}</span>
      })}
    </span>
  ))

  return (
    <div ref={ref} className="fmark" aria-hidden="true">
      <div ref={inner} className="fmark__text">{letters}</div>
      <div className="fmark__text fmark__text--glow">{letters}</div>
    </div>
  )
}
