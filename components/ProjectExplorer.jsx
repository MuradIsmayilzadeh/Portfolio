'use client'

import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'
import Tilt from './Tilt'

export default function ProjectExplorer({ projects, categories }) {
  const [active, setActive] = useState('all')
  const [liveOnly, setLiveOnly] = useState(false)

  const isLive = (p) => p.links?.some((l) => l.kind === 'live')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1
    })
    return c
  }, [projects])

  const visible = projects.filter(
    (p) => (active === 'all' || p.category === active) && (!liveOnly || isLive(p))
  )

  return (
    <>
      <div className="filters-bar">
        <div className="filters" role="tablist" aria-label="Filter projects">
          {categories
            .filter((c) => counts[c.id])
            .map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === c.id}
                className={`filter ${active === c.id ? 'is-active' : ''}`}
                onClick={() => setActive(c.id)}
              >
                {c.label}
                <sup>{counts[c.id]}</sup>
              </button>
            ))}
        </div>
        <button
          className={`toggle ${liveOnly ? 'is-on' : ''}`}
          aria-pressed={liveOnly}
          onClick={() => setLiveOnly((v) => !v)}
        >
          <i aria-hidden="true" /> Live demos only
        </button>
      </div>

      <p className="filters-count mono" aria-live="polite">
        Showing {String(visible.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
      </p>

      <div className="grid grid--cards" key={`${active}-${liveOnly}`}>
        {visible.map((p, i) => (
          <div className="fade-up" style={{ animationDelay: `${i * 55}ms` }} key={p.id}>
            <Tilt>
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </Tilt>
          </div>
        ))}
        {visible.length === 0 && <p className="muted">Nothing here with live demos yet.</p>}
      </div>
    </>
  )
}
