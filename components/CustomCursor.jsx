'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Check for hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]')
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    
    handleElementHover()
    
    // Re-check for hoverable elements on DOM changes
    const observer = new MutationObserver(handleElementHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [mounted])

  // Smooth follow for inner circle
  useEffect(() => {
    if (!mounted) return
    
    let animationId
    
    const animate = () => {
      setInnerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }))
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationId)
  }, [position, mounted])

  if (!mounted) return null

  return (
    <>
      {/* Outer circle - follows mouse directly */}
      <div
        className={`cursor-outer ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner circle - follows with delay */}
      <div
        className={`cursor-inner ${isHovering ? 'hovering' : ''} ${isVisible ? 'visible' : ''}`}
        style={{
          left: `${innerPosition.x}px`,
          top: `${innerPosition.y}px`,
        }}
      />
    </>
  )
}
