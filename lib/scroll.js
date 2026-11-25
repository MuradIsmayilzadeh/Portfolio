'use client'

// One requestAnimationFrame loop for the whole site.
// - Drives Lenis smooth scrolling (desktop, fine pointers, motion allowed)
// - Tracks scroll position + smoothed velocity
// - Calls every subscriber once per frame with the shared state
//
// Subscribers do their own DOM writes; keep them cheap (transforms / CSS vars).

import Lenis from 'lenis'

export const state = {
  y: 0, // scroll position (px)
  v: 0, // smoothed velocity (px / frame)
  dir: 1, // last scroll direction: 1 down, -1 up
  w: 0, // viewport width
  h: 0, // viewport height
  t: 0, // time (ms)
  reduced: false,
  touch: false,
}

const subs = new Set()
let lenis = null
let raf = 0
let started = false
let lastY = 0

function frame(t) {
  raf = requestAnimationFrame(frame)
  lenis?.raf(t)
  const y = window.scrollY
  const dy = y - lastY
  lastY = y
  state.v += (dy - state.v) * 0.2
  if (Math.abs(dy) > 0.1) state.dir = dy > 0 ? 1 : -1
  state.y = y
  state.t = t
  // one failing effect must not stop the others (or the loop)
  subs.forEach((fn) => {
    try {
      fn(state)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error(e)
    }
  })
}

function onResize() {
  state.w = window.innerWidth
  state.h = window.innerHeight
}

export function startScroll() {
  if (started || typeof window === 'undefined') return
  started = true
  state.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  state.touch = !window.matchMedia('(pointer: fine)').matches
  onResize()
  window.addEventListener('resize', onResize, { passive: true })
  if (!state.reduced && !state.touch) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true })
    document.documentElement.classList.add('lenis')
  }
  lastY = window.scrollY
  raf = requestAnimationFrame(frame)
  // Pause the loop while the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf)
    if (!document.hidden) raf = requestAnimationFrame(frame)
  })
}

export function subscribe(fn) {
  subs.add(fn)
  return () => subs.delete(fn)
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
  lastY = 0
  state.v = 0
}

export function scrollToY(y, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate, force: true, duration: 1.1 })
  else window.scrollTo({ top: y, behavior: immediate || state.reduced ? 'auto' : 'smooth' })
}

export function lockScroll(locked) {
  if (!lenis) return
  locked ? lenis.stop() : lenis.start()
}

// Progress helpers ---------------------------------------------------------

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// 0 when the element's top hits the viewport top, 1 when its bottom hits the
// viewport bottom. Use for sticky / pinned sections.
export function pinProgress(rect, h) {
  const dist = rect.height - h
  return dist > 0 ? clamp(-rect.top / dist) : rect.top < 0 ? 1 : 0
}

// 0 when the element enters at the bottom, 1 when it leaves at the top.
export function passProgress(rect, h) {
  return clamp((h - rect.top) / (h + rect.height))
}
