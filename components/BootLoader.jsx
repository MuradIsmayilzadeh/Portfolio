'use client'

import { useEffect, useState } from 'react'

const LINES = [
  'init kernel.render',
  'mount /projects',
  'link engine.imgui',
  'ready',
]

// Short boot sequence, shown once per browser session (~1.2s).
export default function BootLoader() {
  const [phase, setPhase] = useState('pending') // pending | show | exit | done
  const [step, setStep] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('booted') === '1'
      sessionStorage.setItem('booted', '1')
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setPhase('done')
      return
    }

    setPhase('show')
    const timers = LINES.map((_, i) => setTimeout(() => setStep(i + 1), 180 + i * 200))
    timers.push(setTimeout(() => setPhase('exit'), 1150))
    timers.push(setTimeout(() => setPhase('done'), 1650))
    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`boot ${phase === 'exit' ? 'boot--exit' : ''} ${phase === 'pending' ? 'boot--pending' : ''}`} aria-hidden="true">
      <div className="boot__inner">
        <div className="boot__logo">M<span>/</span>I</div>
        <ul className="boot__lines">
          {LINES.slice(0, step).map((l) => (
            <li key={l}><span>&gt;</span> {l}</li>
          ))}
        </ul>
        <div className="boot__bar"><span style={{ width: `${(step / LINES.length) * 100}%` }} /></div>
      </div>
    </div>
  )
}
