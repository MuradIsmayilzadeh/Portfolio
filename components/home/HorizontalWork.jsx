'use client'

import { useEffect, useRef } from 'react'
import { pinProgress, subscribe } from '../../lib/scroll'
import ProjectCard from '../ProjectCard'
import Tilt from '../Tilt'

// Vertical scroll drives a horizontal rail of project cards (pinned).
// On touch / narrow screens it becomes a native swipeable row.
export default function HorizontalWork({ projects, allProjects, children }) {
  const root = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    const el = root.current
    const tr = track.current
    let pinned = false

    const measure = () => {
      pinned = window.innerWidth >= 900
      el.classList.toggle('hwork--pinned', pinned)
      el.style.height = pinned ? `${tr.scrollWidth - window.innerWidth + window.innerHeight}px` : ''
      if (!pinned) tr.style.transform = ''
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(tr)
    window.addEventListener('resize', measure)

    let lastP = -1
    const unsub = subscribe(({ h }) => {
      if (!pinned) return
      const rect = el.getBoundingClientRect()
      if (rect.bottom < -h || rect.top > h * 2) return
      const p = pinProgress(rect, h)
      if (Math.abs(p - lastP) < 0.0002) return
      lastP = p
      const max = tr.scrollWidth - window.innerWidth
      tr.style.transform = `translate3d(${Math.round(-p * max)}px, 0, 0)`
      bar.current.style.transform = `scaleX(${p})`
    })
    return () => {
      unsub()
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section ref={root} className="hwork" data-shape="galaxy" data-shape-x="0" data-shape-scale="1.25" data-shape-o="0.45">
      <div className="hwork__sticky">
        <div className="hwork__track" ref={track}>
          <div className="hwork__intro">{children}</div>
          {projects.map((p) => (
            <div className="hwork__item" key={p.id}>
              <Tilt>
                <ProjectCard project={p} index={allProjects.indexOf(p)} compact />
              </Tilt>
            </div>
          ))}
        </div>
        <div className="hwork__progress"><span ref={bar} /></div>
      </div>
    </section>
  )
}
