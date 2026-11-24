'use client'

import { useEffect, useRef } from 'react'
import { state as scroll, subscribe } from '../lib/scroll'

// A rotating 3D point cloud that morphs between shapes.
// Any element with data-shape="<name>" picks the shape while it crosses the
// middle of the viewport. Optional: data-shape-x (-0.5..0.5 horizontal offset,
// fraction of width), data-shape-scale, data-shape-o (opacity 0..1).

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
    const view = { x: 0.22, s: 1, o: 1 }
    const goal = { x: 0.22, s: 1, o: 1 }
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 }
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
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)

    const pick = () => {
      const mid = H * 0.5
      for (const el of sections) {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom >= mid) {
          const d = el.dataset
          const name = d.shape
          if (name !== current) {
            current = name
            target = shape(name)
          }
          const narrow = W < 900
          goal.x = narrow ? 0 : parseFloat(d.shapeX ?? 0)
          goal.s = parseFloat(d.shapeScale ?? 1) * (narrow ? 0.9 : 1)
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
        rotY += 0.0028 + spin
      }
      const ay = rotY + mouse.sx * 0.9
      const ax = -0.35 + mouse.sy * 0.6
      const cy = Math.cos(ay), sy = Math.sin(ay)
      const cx = Math.cos(ax), sx = Math.sin(ax)

      const R = Math.min(W, H) * 0.34 * view.s
      const ox = W * (0.5 + view.x)
      const oy = H * 0.5
      const D = 3.2

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < N; i++) {
        const j = i * 3
        const x0 = pos[j], y0 = pos[j + 1], z0 = pos[j + 2]
        // rotate Y then X
        const x1 = x0 * cy - z0 * sy
        const z1 = x0 * sy + z0 * cy
        const y2 = y0 * cx - z1 * sx
        const z2 = y0 * sx + z1 * cx
        const p = 2.2 / (D - z2)
        const px = ox + x1 * p * R
        const py = oy + y2 * p * R
        const depth = (z2 + 1.2) / 2.4 // 0 far .. 1 near
        const size = 0.7 + depth * 1.9
        ctx.globalAlpha = 0.12 + depth * 0.7
        ctx.fillStyle = tint[i] === 1 ? '#ffffff' : tint[i] === 2 ? '#5ee1ff' : '#c4ff4d'
        ctx.fillRect(px - size / 2, py - size / 2, size, size)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const unsub = subscribe(draw)
    return () => {
      unsub()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvas} className="shape-field" aria-hidden="true" />
}
