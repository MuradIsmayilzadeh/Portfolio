'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const routeOrder = {
  '/': 0,
  '/about': 1,
  '/projects': 2,
  '/contact': 3,
}

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [prevChildren, setPrevChildren] = useState(null)
  const [prevPathname, setPrevPathname] = useState(pathname)
  const [direction, setDirection] = useState('right')

  useEffect(() => {
    // Check if this is initial site entry
    const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem('hasVisited') : null
    
    if (isInitialLoad && !hasVisited) {
      // Wait for loader to finish (3.5 seconds)
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 3500)
      return () => clearTimeout(timer)
    } else if (isInitialLoad && hasVisited) {
      // Skip initial load animation if already visited
      setIsInitialLoad(false)
    }

    if (pathname !== prevPathname && !isInitialLoad) {
      const currentIndex = routeOrder[pathname] ?? 0
      const prevIndex = routeOrder[prevPathname] ?? 0
      const newDirection = currentIndex > prevIndex ? 'right' : 'left'
      setDirection(newDirection)
      
      setPrevChildren(displayChildren)
      setIsTransitioning(true)
      
      const switchTimer = setTimeout(() => {
        setDisplayChildren(children)
        setPrevPathname(pathname)
      }, 200)

      const completeTimer = setTimeout(() => {
        setIsTransitioning(false)
        setPrevChildren(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)

      return () => {
        clearTimeout(switchTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [pathname, children, isInitialLoad, prevPathname])

  if (isInitialLoad) {
    return (
      <div className="page-transition initial-load">
        {displayChildren}
      </div>
    )
  }

  if (isTransitioning && prevChildren) {
    return (
      <div className="page-transition-wrapper">
        <div className={`page-transition exiting exiting-${direction}`}>
          {prevChildren}
        </div>
        <div className={`page-transition entering entering-${direction}`}>
          {displayChildren}
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition loaded">
      {displayChildren}
    </div>
  )
}
