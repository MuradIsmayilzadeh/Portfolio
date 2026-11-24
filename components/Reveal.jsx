'use client'

import { useEffect, useRef } from 'react'

// Adds `.is-in` once the element enters the viewport (after the boot screen,
// if one is showing). CSS handles the actual animation.
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', variant = 'up', margin = '0px 0px -8% 0px', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let io
    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: margin }
      )
      // A fully clipped element never reports as intersecting: watch its parent.
      io.observe(variant === 'clip' && el.parentElement ? el.parentElement : el)
    }
    if (document.documentElement.classList.contains('is-booting')) {
      window.addEventListener('boot:done', start, { once: true })
    } else start()
    return () => {
      io?.disconnect()
      window.removeEventListener('boot:done', start)
    }
  }, [variant, margin])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={delay ? { '--d': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
