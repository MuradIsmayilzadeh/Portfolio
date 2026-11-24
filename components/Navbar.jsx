'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { lockScroll, subscribe } from '../lib/scroll'

const LINKS = [
  { href: '/', label: 'Index', n: '00' },
  { href: '/projects', label: 'Work', n: '01' },
  { href: '/about', label: 'About', n: '02' },
  { href: '/contact', label: 'Contact', n: '03' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const openRef = useRef(false)

  useEffect(() => setOpen(false), [pathname])

  // Hide on scroll down, show on scroll up; solid background once scrolled.
  useEffect(() => {
    let hidden = false
    let scrolled = false
    let anchor = 0
    return subscribe(({ y, dir }) => {
      const el = header.current
      if (!el) return
      const s = y > 12
      if (s !== scrolled) {
        scrolled = s
        el.classList.toggle('nav--scrolled', s)
      }
      if (openRef.current) return
      if (dir < 0) anchor = Math.min(anchor, y)
      else anchor = Math.max(anchor, y - 80)
      const h = y > 140 && dir > 0 && y - anchor > 60
      const show = dir < 0 || y < 140
      if (h && !hidden) {
        hidden = true
        el.classList.add('nav--hidden')
      } else if (show && hidden) {
        hidden = false
        anchor = y
        el.classList.remove('nav--hidden')
      }
    })
  }, [])

  useEffect(() => {
    openRef.current = open
    if (open) header.current?.classList.remove('nav--hidden')
    document.body.style.overflow = open ? 'hidden' : ''
    lockScroll(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <header ref={header} className={`nav ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner wrap">
        <Link href="/" className="nav__logo" aria-label="Home">
          M<span>/</span>I
        </Link>

        <nav aria-label="Main">
          <ul className="nav__links">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ '--i': i }}>
                <Link
                  href={l.href}
                  className={`nav__link ${isActive(l.href) ? 'is-active' : ''}`}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                >
                  <span className="nav__n">{l.n}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
