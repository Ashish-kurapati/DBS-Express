import { useState, type KeyboardEvent } from 'react'
import { researchFindings } from '../data/siteContent'

export function IntegrationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const totalCards = researchFindings.length

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (index + 1) % totalCards
      const nextEl = document.getElementById(`fanned-card-${next}`)
      nextEl?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + totalCards) % totalCards
      const prevEl = document.getElementById(`fanned-card-${prev}`)
      prevEl?.focus()
    }
  }

  return (
    <section
      className="integrations-section research-section section-pad reveal-on-scroll"
      aria-labelledby="integrations-title"
    >
      <div className="research-section__intro">
        <p className="research-section__label">RESEARCH &amp; INSIGHTS</p>
        <h2 id="integrations-title" className="research-section__title">
          Facts for better hiring.
        </h2>
        <p className="research-section__summary">
          Evidence on screening, identity, and fair hiring.
        </p>
      </div>

      <div
        className="fanned-deck-wrapper"
        onMouseLeave={() => setHoveredIndex(null)}
        role="region"
        aria-label="Research findings fanned cards"
      >
        <div className="fanned-deck">
          {researchFindings.map((finding, index) => {
            const isHovered = hoveredIndex === index
            const isThemeDark = index % 2 === 1

            // Geometry calculations for resting fan layout:
            // Centered normalized offset (-1.5, -0.5, 0.5, 1.5 for 4 cards)
            const norm = index - (totalCards - 1) / 2
            const restRotate = norm * 4.0 // Exactly -6deg, -2deg, +2deg, +6deg matching reference video
            const restY = Math.abs(norm) * 5
            const restZ = index + 1

            // Dynamic transforms matching reference video:
            // Hovered card: lifts up vertically (-52px), straightens to 0deg, elevates to zIndex 50
            // Neighboring cards remain stable in their resting fanned positions without horizontal drift
            const translateY = isHovered ? -52 : restY
            const rotate = isHovered ? 0 : restRotate
            const zIndex = isHovered ? 50 : restZ

            return (
              <a
                key={finding.category}
                id={`fanned-card-${index}`}
                href={finding.href}
                target="_blank"
                rel="noreferrer"
                className={`fanned-card ${isThemeDark ? 'fanned-card--dark' : 'fanned-card--light'} ${
                  isHovered ? 'is-lifted' : ''
                }`}
                style={{
                  transform: `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`,
                  zIndex,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`${finding.category}: ${finding.title}. Metric: ${finding.metric} - ${finding.metricLabel} (opens in a new tab)`}
              >
                <div className="fanned-card__top">
                  <span className="fanned-card__index">{`0${index + 1}`}</span>
                  <span className="fanned-card__category">{finding.category}</span>
                </div>

                <h3 className="fanned-card__title">{finding.title}</h3>

                <div
                  className="fanned-card__metric-box"
                  aria-label={`${finding.metric}: ${finding.metricLabel}`}
                >
                  <strong className="fanned-card__metric-val">{finding.metric}</strong>
                  <span className="fanned-card__metric-label">{finding.metricLabel}</span>
                  {finding.source && (
                    <span className="fanned-card__source">{finding.source}</span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
