import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'

const researchFindings = [
  {
    category: 'Recruitment practice',
    title: 'More applications do not guarantee better shortlists.',
    metric: '58% / 33%',
    metricLabel: 'unsuitable / suitable application increases',
    description:
      'CIPD found that unsuitable-candidate increases were reported more often than suitable-candidate increases. More applications can add noise, so consistent selection still matters.',
    source: 'CIPD, Resourcing and talent planning report',
    date: '22 September 2026',
    href: 'https://www.cipd.org/uk/knowledge/reports/resourcing-surveys/',
    linkLabel: 'Read the research',
  },
  {
    category: 'DBS eligibility',
    title: 'The role determines the right DBS level.',
    metric: 'ROLE-LED',
    metricLabel: 'eligibility follows the work involved',
    description:
      'The DBS says organisations must assess the role and its activities before choosing Basic, Standard, or Enhanced. Standard and Enhanced checks are not general-purpose screening options.',
    source: 'Disclosure and Barring Service, eligibility guidance',
    date: 'Updated 13 October 2026',
    href: 'https://www.gov.uk/government/collections/dbs-eligibility-guidance',
    linkLabel: 'Read the guidance',
  },
  {
    category: 'Right to work',
    title: 'Right-to-work checks come before employment.',
    metric: 'BEFORE HIRE',
    metricLabel: 'a prescribed employer check',
    description:
      'The Home Office guide explains what employers must do before employing someone. The related code of practice also requires checks to be carried out consistently and without discrimination.',
    source: 'UK Visas and Immigration & Immigration Enforcement',
    date: 'Updated 1 October 2026',
    href: 'https://www.gov.uk/government/publications/right-to-work-checks-employers-guide',
    linkLabel: 'Read the guidance',
  },
  {
    category: 'Candidate privacy',
    title: 'Screening should be necessary and proportionate.',
    metric: 'NEED-TO-KNOW',
    metricLabel: 'collect only relevant information',
    description:
      'The ICO treats conviction information as sensitive. Employers need a lawful basis and appropriate authority, should explain the checks to candidates, and should give people a chance to explain discrepancies.',
    source: 'Information Commissioner’s Office, pre-employment vetting guidance',
    date: '',
    href: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/recruitment-and-selection/pre-employment-vetting-of-candidates/',
    linkLabel: 'Read the guidance',
  },
]

export function IntegrationsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [trackOffset, setTrackOffset] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const updateTrackOffset = useCallback(() => {
    const container = containerRef.current
    const activeCard = cardRefs.current[activeIndex]
    if (!container || !activeCard) return

    const containerWidth = container.offsetWidth
    const cardWidth = activeCard.offsetWidth
    const cardLeft = activeCard.offsetLeft
    // Center the active card within the container view
    const targetOffset = (containerWidth - cardWidth) / 2 - cardLeft
    setTrackOffset(targetOffset)
  }, [activeIndex])

  useEffect(() => {
    updateTrackOffset()
    window.addEventListener('resize', updateTrackOffset)
    return () => window.removeEventListener('resize', updateTrackOffset)
  }, [updateTrackOffset])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < researchFindings.length) {
      setActiveIndex(index)
    }
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    const diffY = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0 && activeIndex < researchFindings.length - 1) {
        goToSlide(activeIndex + 1)
      } else if (diffX > 0 && activeIndex > 0) {
        goToSlide(activeIndex - 1)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (activeIndex > 0) goToSlide(activeIndex - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (activeIndex < researchFindings.length - 1) goToSlide(activeIndex + 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      goToSlide(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goToSlide(researchFindings.length - 1)
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
          The facts behind better hiring decisions.
        </h2>
        <p className="research-section__summary">
          Understand the evidence behind background screening, identity verification, and informed hiring decisions.
        </p>
      </div>

      <div
        className="research-slider"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Research findings carousel"
      >
        <div
          className="research-slider__track"
          style={{ transform: `translate3d(${trackOffset}px, 0, 0)` }}
        >
          {researchFindings.map((finding, index) => {
            const isActive = index === activeIndex
            return (
              <article
                className={`research-slide ${isActive ? 'is-active' : ''}`}
                key={finding.category}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                onClick={() => {
                  if (!isActive) goToSlide(index)
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${researchFindings.length}: ${finding.title}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="research-slide__body">
                  <div className="research-slide__primary">
                    <p className="research-slide__index">{`0${index + 1} / ${finding.category}`}</p>
                    <h3 className="research-slide__title">{finding.title}</h3>
                    <div
                      className="research-slide__metric-box"
                      aria-label={`${finding.metric}: ${finding.metricLabel}`}
                    >
                      <strong>{finding.metric}</strong>
                      <span>{finding.metricLabel}</span>
                    </div>
                  </div>

                  <div className="research-slide__supporting">
                    <p className="research-slide__description">{finding.description}</p>
                    <div className="research-slide__footer">
                      <p className="research-slide__source">
                        {finding.source}
                        {finding.date ? ` · ${finding.date}` : ''}
                      </p>
                      <a
                        href={finding.href}
                        target="_blank"
                        rel="noreferrer"
                        className="research-slide__link"
                        tabIndex={isActive ? 0 : -1}
                      >
                        {finding.linkLabel}
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="research-slider__controls" aria-label="Research slide controls">
        <button
          type="button"
          className="research-slider__btn"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous research slide"
        >
          <span aria-hidden="true">←</span>
          <span>Previous</span>
        </button>

        <div className="research-slider__center">
          <div className="research-slider__dots" role="tablist" aria-label="Research slides pagination">
            {researchFindings.map((finding, idx) => (
              <button
                key={finding.category}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to slide ${idx + 1}: ${finding.category}`}
                className={`research-slider__dot ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
          <span className="research-slider__counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(researchFindings.length).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          className="research-slider__btn"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex === researchFindings.length - 1}
          aria-label="Next research slide"
        >
          <span>Next</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
