import { FiArrowUpRight, FiGithub, FiLock, FiPlay, FiGlobe } from 'react-icons/fi'

const STATUS = {
  live: 'Live',
  active: 'In progress',
  done: 'Shipped',
  paused: 'Paused',
}

const KIND_ICON = {
  live: FiGlobe,
  code: FiGithub,
  video: FiPlay,
}

// The whole card opens the first link (via a stretched link on the title);
// any further links sit above it as separate buttons.
export default function ProjectCard({ project, index, compact = false }) {
  const { title, summary, description, tech, status, year, links = [] } = project
  const [primary] = links
  const hasDemo = links.some((l) => l.kind === 'live')

  return (
    <article className={`card ${primary ? 'card--link' : ''}`}>
      <div className="card__head">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <span className={`tag tag--${status}`}>
          <i aria-hidden="true" />
          {STATUS[status]}
        </span>
      </div>

      <h3 className="card__title">
        {primary ? (
          <a href={primary.href} target="_blank" rel="noopener noreferrer" className="card__stretch">
            {title}
          </a>
        ) : (
          title
        )}
        {hasDemo && <span className="card__badge mono">demo</span>}
      </h3>
      <p className="card__text">{compact ? summary : description}</p>

      <ul className="card__tech" aria-label="Tech stack">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card__foot">
        <span className="mono muted">{year}</span>
        <div className="card__links">
          {links.length ? (
            links.map((l) => {
              const Icon = KIND_ICON[l.kind] || FiArrowUpRight
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card__cta ${l.kind === 'live' ? 'card__cta--live' : ''}`}
                >
                  <Icon aria-hidden="true" /> {l.label}
                </a>
              )
            })
          ) : (
            <span className="card__cta muted">
              <FiLock aria-hidden="true" /> Private
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
