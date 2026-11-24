'use client'

import { useEffect, useRef } from 'react'
import { state as scroll, subscribe } from '../lib/scroll'

// A rotating 3D point cloud that morphs between shapes.
// Any element with data-shape="<name>" picks the shape while it crosses the
// middle of the viewport. Optional: data-shape-x (-0.5..0.5 horizontal offset,
// fraction of width), data-shape-scale, data-shape-o (opacity 0..1).
//
// Interaction: points flee the cursor (with "link" lines to the nearest ones),
// dragging spins the model with inertia, and a click blasts it apart and
// cycles to the next shape.

const SHAPES = ['sphere', 'knot', 'torus', 'cube', 'helix', 'galaxy', 'grid']

const TAU = Math.PI * 2

function rng(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

function build(name, n) {
  const out = new Float32Array(n * 3)
  const r = rng(name.length * 977 + n)
  for (let i = 0; i < n; i++) {
    let x = 0, y = 0, z = 0
    const t = i / n
    switch (name) {
      case 'knot': {
        // (2,3) torus knot with a little thickness
        const a = t * TAU
        const q = 2, p = 3
        const rr = 0.62 + 0.28 * Math.cos(p * a)
        const j = (r() - 0.5) * 0.1
        x = rr * Math.cos(q * a) + j
        y = 0.28 * Math.sin(p * a) + (r() - 0.5) * 0.1
        z = rr * Math.sin(q * a) + j
        break
      }
      case 'torus': {
        const u = r() * TAU, v = r() * TAU
        x = (0.72 + 0.28 * Math.cos(v)) * Math.cos(u)
        y = 0.28 * Math.sin(v)
        z = (0.72 + 0.28 * Math.cos(v)) * Math.sin(u)
        break
      }
      case 'cube': {
        // points on the edges and faces of a cube (wireframe-ish)
        const f = Math.floor(r() * 6)
        const a = r() * 2 - 1, b = r() * 2 - 1
        const edge = r() < 0.82
        const ea = edge ? Math.sign(a) || 1 : a
        const s = 0.68
        const face = [[1, ea, b], [-1, ea, b], [ea, 1, b], [ea, -1, b], [ea, b, 1], [ea, b, -1]][f]
        x = face[0] * s; y = face[1] * s; z = face[2] * s
        break
      }
      case 'helix': {
        // two strands + discrete base-pair rungs
        const strand = i % 3
        const turns = 2.6
        if (strand < 2) {
          const a = t * TAU * turns
          const o = strand * Math.PI
          x = 0.5 * Math.cos(a + o) + (r() - 0.5) * 0.03
          z = 0.5 * Math.sin(a + o) + (r() - 0.5) * 0.03
          y = t * 2.5 - 1.25
        } else {
          const rungs = 26
          const q = Math.floor(r() * rungs) / rungs
          const a = q * TAU * turns
          const k = r() * 2 - 1
          x = 0.5 * Math.cos(a) * k
          z = 0.5 * Math.sin(a) * k
          y = q * 2.5 - 1.25
        }
        break
      }
      case 'galaxy': {
        const arm = i % 3
        const d = Math.pow(r(), 0.7)
        const a = d * 5 + (arm / 3) * TAU + (r() - 0.5) * 0.5
        x = Math.cos(a) * d * 1.05
        z = Math.sin(a) * d * 1.05
        y = (r() - 0.5) * 0.12 * (1 - d)
        break
      }
      case 'grid': {
        const side = Math.ceil(Math.sqrt(n))
        const gx = (i % side) / side - 0.5
        const gz = Math.floor(i / side) / side - 0.5
        x = gx * 2.2
        z = gz * 2.2
        y = Math.sin(gx * 9) * Math.cos(gz * 9) * 0.14
        break
      }
      default: {
        // fibonacci sphere
        const phi = Math.acos(1 - 2 * (i + 0.5) / n)
        const th = Math.PI * (1 + Math.sqrt(5)) * i
        x = Math.cos(th) * Math.sin(phi)
        y = Math.cos(phi)
        z = Math.sin(th) * Math.sin(phi)
      }
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

export default function ShapeField() {
  const canvas = useRef(null)

  useEffect(() => {
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const small = window.innerWidth < 700
    const N = small ? 750 : 1500
    const cache = {}
    const shape = (name) => (cache[name] ||= build(name, N))

    const pos = new Float32Array(shape('sphere'))
    // start scattered so the first frame "assembles"
    const r0 = rng(7)
    for (let i = 0; i < pos.length; i++) pos[i] = (r0() - 0.5) * 6
    const speed = new Float32Array(N)
    const tint = new Uint8Array(N)
    for (let i = 0; i < N; i++) {
      speed[i] = 0.035 + r0() * 0.05
      tint[i] = r0() < 0.08 ? 1 : r0() < 0.05 ? 2 : 0
    }

    let target = shape('sphere')
    let current = 'sphere'
    const view = { x: 0.22, y: 0, s: 1, o: 1 }
    const goal = { x: 0.22, y: 0, s: 1, o: 1 }
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, px: -9999, py: -9999 }
    const off = new Float32Array(N * 2) // smoothed screen-space push per point
    const drag = { on: false, x: 0, y: 0, moved: 0 }
    let velY = 0 // drag spin (inertia)
    let tiltX = 0
    let velX = 0
    let flash = 0
    let override = null // shape picked by clicking, until the section changes
    let sectionShape = 'sphere'
    let rotY = 0
    let spin = 0
    let dpr = 1
    let W = 0, H = 0
    let sections = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      W = window.innerWidth
      H = window.innerHeight
      cv.width = W * dpr
      cv.height = H * dpr
      cv.style.width = W + 'px'
      cv.style.height = H + 'px'
    }
    resize()
    const collect = () => (sections = [...document.querySelectorAll('[data-shape]')])
    collect()
    const mo = new MutationObserver(collect)
    mo.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })

    const onMove = (e) => {
      mouse.x = e.clientX / W - 0.5
      mouse.y = e.clientY / H - 0.5
      if (e.pointerType === 'mouse') {
        mouse.px = e.clientX
        mouse.py = e.clientY
      }
      if (drag.on) {
        const dx = e.clientX - drag.x
        const dy = e.clientY - drag.y
        drag.x = e.clientX
        drag.y = e.clientY
        drag.moved += Math.abs(dx) + Math.abs(dy)
        velY += dx * 0.0009
        velX += dy * 0.0007
      }
    }
    const interactive = (t) =>
      t.closest?.('a, button, input, textarea, select, label, summary, [role="button"], .card, .split__panel, .nav')
    const onDown = (e) => {
      if (view.o < 0.25 || e.button > 0 || interactive(e.target)) return
      drag.type = e.pointerType
      drag.on = e.pointerType === 'mouse'
      drag.x = e.clientX
      drag.y = e.clientY
      drag.moved = 0
      drag.tap = true
      if (drag.on) document.documentElement.classList.add('is-dragging')
    }
    const onUp = (e) => {
      // on touch, only taps inside the hero blast the model (not taps that stop a scroll)
      const zoneOk = drag.type === 'mouse' || e.target.closest?.('.hero')
      const tapped = drag.tap && drag.moved < 6 && zoneOk && !interactive(e.target)
      drag.on = false
      drag.tap = false
      document.documentElement.classList.remove('is-dragging')
      if (!tapped || window.getSelection?.().toString()) return
      // blast + next shape
      const base = override || current
      const next = SHAPES[(SHAPES.indexOf(base) + 1) % SHAPES.length]
      override = next
      current = next
      target = shape(next)
      for (let i = 0; i < N * 3; i += 3) {
        const k = 1.5 + r0() * 1.6
        pos[i] *= k
        pos[i + 1] *= k
        pos[i + 2] *= k
      }
      flash = 1
      velY += 0.06
    }
    const onLeave = () => {
      mouse.px = mouse.py = -9999
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', resize)

    const pick = () => {
      const mid = H * 0.5
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom >= mid) {
          const d = el.dataset
          const name = d.shape
          if (name !== sectionShape) {
            sectionShape = name
            override = null
          }
          const want = override || name
          if (want !== current) {
            current = want
            target = shape(want)
          }
          const narrow = W < 900
          goal.x = narrow ? 0 : parseFloat(d.shapeX ?? 0)
          goal.y = narrow ? parseFloat(d.shapeMy ?? 0) : parseFloat(d.shapeY ?? 0)
          goal.s = narrow && d.shapeMs ? parseFloat(d.shapeMs) : parseFloat(d.shapeScale ?? 1) * (narrow ? 0.9 : 1)
          goal.o = parseFloat(d.shapeO ?? 1) * (narrow ? 0.55 : 1)
          return
        }
      }
      goal.o = 0
    }

    const reduced = scroll.reduced
    let frame = 0

    const draw = () => {
      if (++frame % 6 === 1) pick()
      // ease view parameters
      view.x += (goal.x - view.x) * 0.06
      view.y += (goal.y - view.y) * 0.06
      view.s += (goal.s - view.s) * 0.06
      view.o += (goal.o - view.o) * 0.08
      mouse.sx += (mouse.x - mouse.sx) * 0.05
      mouse.sy += (mouse.y - mouse.sy) * 0.05
      cv.style.opacity = view.o.toFixed(3)
      if (view.o < 0.01) return

      // morph
      for (let i = 0; i < N * 3; i += 3) {
        const k = reduced ? 1 : speed[i / 3]
        pos[i] += (target[i] - pos[i]) * k
        pos[i + 1] += (target[i + 1] - pos[i + 1]) * k
        pos[i + 2] += (target[i + 2] - pos[i + 2]) * k
      }

      if (!reduced) {
        spin += (Math.abs(scroll.v) * 0.0009 - spin) * 0.08
        rotY += 0.0028 + spin + velY
        tiltX += velX
        velY *= 0.94
        velX *= 0.9
        tiltX *= 0.97
      }
      flash *= 0.94
      const ay = rotY + mouse.sx * 0.9
      const ax = -0.35 + mouse.sy * 0.6 + tiltX
      const cy = Math.cos(ay), sy = Math.sin(ay)
      const cx = Math.cos(ax), sx = Math.sin(ax)

      const R = Math.min(W, H) * 0.34 * view.s
      const ox = W * (0.5 + view.x)
      const oy = H * (0.5 + view.y)
      const D = 3.2

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const mx = mouse.px, my = mouse.py
      const RAD = Math.min(W, H) * 0.16
      const RAD2 = RAD * RAD
      const links = []

      for (let i = 0; i < N; i++) {
        const j = i * 3
        const x0 = pos[j], y0 = pos[j + 1], z0 = pos[j + 2]
        // rotate Y then X
        const x1 = x0 * cy - z0 * sy
        const z1 = x0 * sy + z0 * cy
        const y2 = y0 * cx - z1 * sx
        const z2 = y0 * sx + z1 * cx
        const p = 2.2 / (D - z2)
        let px = ox + x1 * p * R
        let py = oy + y2 * p * R
        // cursor repulsion (smoothed per point)
        let tx = 0, ty = 0
        if (!reduced) {
          const dx = px - mx, dy = py - my
          const d2 = dx * dx + dy * dy
          if (d2 < RAD2 && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = (1 - d / RAD) ** 2 * RAD * 0.55
            tx = (dx / d) * f
            ty = (dy / d) * f
          }
        }
        const k2 = i * 2
        off[k2] += (tx - off[k2]) * 0.16
        off[k2 + 1] += (ty - off[k2 + 1]) * 0.16
        px += off[k2]
        py += off[k2 + 1]
        const depth = (z2 + 1.2) / 2.4 // 0 far .. 1 near
        const size = 0.7 + depth * 1.9
        ctx.globalAlpha = Math.min(1, 0.12 + depth * 0.7 + flash * 0.3)
        ctx.fillStyle = tint[i] === 1 || flash > 0.5 ? '#ffffff' : tint[i] === 2 ? '#5ee1ff' : '#c4ff4d'
        ctx.fillRect(px - size / 2, py - size / 2, size, size)
        if (tx !== 0 && links.length < 48 && depth > 0.35) links.push(px, py, depth)
      }

      // "neural" link lines from the cursor to the nearest pushed points
      if (links.length) {
        ctx.lineWidth = 1
        ctx.strokeStyle = '#c4ff4d'
        for (let i = 0; i < links.length; i += 3) {
          ctx.globalAlpha = 0.05 + links[i + 2] * 0.18
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(links[i], links[i + 1])
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const unsub = subscribe(draw)
    return () => {
      unsub()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('is-dragging')
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvas} className="shape-field" aria-hidden="true" />
}
