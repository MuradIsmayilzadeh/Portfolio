'use client'

import { useEffect, useState } from 'react'

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // Mark as visited immediately
      sessionStorage.setItem('hasVisited', 'true')
      
      // Animate progress over 3.5 seconds
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + (100 / 70) // 70 intervals over 3.5 seconds
        })
      }, 50)

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3500)

      return () => {
        clearInterval(progressInterval)
        clearTimeout(timer)
      }
    } else {
      // Already visited, hide immediately
      setIsLoading(false)
    }
  }, [])

  if (!mounted) return null
  if (!isLoading) return null

  return (
    <div className="initial-loader">
      <div className="loader-content">
        <div className="neon-text">UE5 Developer</div>
        
        {/* Rotating circles loader */}
        <div className="circle-loader">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
        </div>
        
        {/* Scanning lines effect */}
        <div className="scan-lines">
          <div className="scan-line"></div>
          <div className="scan-line"></div>
          <div className="scan-line"></div>
        </div>
        
        <div className="loader-percentage">{Math.round(progress)}%</div>
      </div>
    </div>
  )
}
