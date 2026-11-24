'use client'

import { useState } from 'react'

// Re-mounts on every navigation. On client-side route changes (not the first
// load) a panel wipe reveals the new page.
let firstMount = true

export default function Template({ children }) {
  const [wipe] = useState(() => {
    if (typeof window === 'undefined') return false
    const show = !firstMount
    firstMount = false
    return show
  })

  return (
    <>
      {wipe && (
        <div className="wipe" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </div>
      )}
      <div className={wipe ? 'page-enter' : undefined}>{children}</div>
    </>
  )
}
