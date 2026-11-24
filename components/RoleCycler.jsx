'use client'

import { useEffect, useState } from 'react'

// Types and deletes each role in turn. Falls back to a static role
// for reduced-motion users and before hydration.
export default function RoleCycler({ roles }) {
  const [text, setText] = useState(roles[0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    let len = roles[0].length
    let deleting = true
    let timer

    const tick = () => {
      const word = roles[i]
      if (deleting) {
        len -= 1
        if (len <= 0) {
          deleting = false
          i = (i + 1) % roles.length
        }
      } else {
        len += 1
        if (len >= roles[i].length) {
          deleting = true
          setText(roles[i])
          timer = setTimeout(tick, 1800)
          return
        }
      }
      setText((deleting ? word : roles[i]).slice(0, Math.max(len, 0)))
      timer = setTimeout(tick, deleting ? 35 : 65)
    }

    timer = setTimeout(tick, 2200)
    return () => clearTimeout(timer)
  }, [roles])

  return (
    <span className="role-cycler">
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  )
}
