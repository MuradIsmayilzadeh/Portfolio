import { FiArrowUpRight, FiLock } from 'react-icons/fi'

const STATUS = {
  live: 'Live',
  active: 'In progress',
  done: 'Shipped',
  paused: 'Paused',
}

export default function ProjectCard({ project, index, compact = false }) {
  const { title, summary, description, tech, link, linkLabel, status, year } = project
  const external = link && /^https?:/.test(link)
  const Tag = link ? 'a' : 'article'
  const linkProps = link
    ? { href: link, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : {}

  return (
    <Tag className={`card ${link ? 'card--link' : ''}`} {...linkProps}>
      <div className="card__head">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <span className={`tag tag--${status}`}>
          <i aria-hidden="true" />
          {STATUS[status]}
        </span>
      </div>

      <h3 className="card__title">{title}</h3>
      <p className="card__text">{compact ? summary : description}</p>

      <ul className="card__tech" aria-label="Tech stack">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div className="card__foot">
        <span className="mono muted">{year}</span>
        {link ? (
          <span className="card__cta">
            {linkLabel || 'Open'} <FiArrowUpRight aria-hidden="true" />
          </span>
        ) : (
          <span className="card__cta muted">
            <FiLock aria-hidden="true" /> Private
          </span>
        )}
      </div>
    </Tag>
  )
}
