'use client'

import { useMemo, useState } from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectExplorer({ projects, categories }) {
  const [active, setActive] = useState('all')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1
    })
    return c
  }, [projects])

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
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

      <div className="grid grid--cards" key={active}>
        {visible.map((p, i) => (
          <div className="fade-up" style={{ animationDelay: `${i * 50}ms` }} key={p.id}>
            <ProjectCard project={p} index={projects.indexOf(p)} />
          </div>
        ))}
      </div>
    </>
  )
}
