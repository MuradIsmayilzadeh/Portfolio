'use client'

import { useState } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
      {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}
