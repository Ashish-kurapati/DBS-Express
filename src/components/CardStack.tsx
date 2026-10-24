import { useEffect, useRef, useState } from 'react'
import { signUpUrl, sourceSite } from '../data/siteContent'

const cards = [
  {
    id: 'enhanced',
    index: '03',
    badge: 'Comprehensive',
    title: 'Enhanced DBS check',
    body: 'The highest level of check, including relevant police information for eligible positions.',
    href: `${sourceSite}/employers`,
    linkLabel: 'Employer information',
  },
  {
    id: 'standard',
    index: '02',
    badge: 'Regulated Roles',
    title: 'Standard DBS check',
    body: 'Includes spent and unspent convictions and cautions. Required for specified roles.',
    href: `${sourceSite}/employers`,
    linkLabel: 'Employer information',
  },
  {
    id: 'basic',
    index: '01',
    badge: 'Most Common',
    title: 'Basic DBS check',
    body: 'Covers unspent convictions and conditional cautions. Suitable for individuals and roles.',
    href: `${sourceSite}/individuals`,
    linkLabel: 'Learn more',
  },
]

export function CardStack() {
  const [phase, setPhase] = useState<'stacked' | 'fanning' | 'settled'>('stacked')
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const hasPlayed = useRef(false)

  /* Listen for OS preference changes at runtime */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Trigger animation once the container enters the viewport */
  useEffect(() => {
    if (reducedMotion) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true
          setTimeout(() => setPhase('fanning'), 120)
          setTimeout(() => setPhase('settled'), 120 + 1100)
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  const fanning = phase === 'fanning' || phase === 'settled'
  const settled = phase === 'settled'

  return (
    <div
      className={[
        'card-stack-scene',
        reducedMotion ? 'card-stack-scene--reduced' : '',
        fanning ? 'card-stack-scene--fanning' : '',
        settled ? 'card-stack-scene--settled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      ref={containerRef}
      aria-label="DBS check types overview"
      role="group"
    >
      {cards.map((card, i) => (
        <article
          key={card.title}
          className={`stack-card stack-card--${i}`}
          aria-label={card.title}
        >
          <div className="stack-card__inner">
            <div className="stack-card__header">
              <span className="stack-card__index" aria-hidden="true">
                {card.index}
              </span>
              <span className="stack-card__badge">{card.badge}</span>
            </div>
            <h3 className="stack-card__title">{card.title}</h3>
            <p className="stack-card__body">{card.body}</p>
            <div className="stack-card__footer">
              <a
                className="stack-card__link"
                href={card.href}
                target="_blank"
                rel="noreferrer"
              >
                {card.linkLabel}{' '}
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </article>
      ))}

      <div className="card-stack__cta">
        <a className="button button-primary" href={signUpUrl} target="_blank" rel="noreferrer">
          Get started <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a className="button button-secondary" href="#pricing">
          View pricing <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  )
}
