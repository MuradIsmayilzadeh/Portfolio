import { Fragment } from 'react'

// Splits text into masked words/characters. Animates in when an ancestor gets
// `.is-in` (e.g. <Reveal>) or when the element itself has it.
// Server component: no JS shipped. Screen readers get the plain text.
export default function SplitText({ text, as: Tag = 'span', by = 'char', className = '', delay = 0, step }) {
  const words = text.split(' ')
  let i = 0
  const s = step ?? (by === 'char' ? 28 : 60)

  return (
    <Tag className={`split-text ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
        <span className="split-text__word" aria-hidden="true">
          {by === 'char' ? (
            [...w].map((c, ci) => (
              <span className="split-text__mask" key={ci}>
                <span className="split-text__ch" style={{ transitionDelay: `${delay + i++ * s}ms` }}>
                  {c}
                </span>
              </span>
            ))
          ) : (
            <span className="split-text__mask">
              <span className="split-text__ch" style={{ transitionDelay: `${delay + i++ * s}ms` }}>
                {w}
              </span>
            </span>
          )}
        </span>
        {/* the space must sit outside the inline-block word or it collapses */}
        {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
