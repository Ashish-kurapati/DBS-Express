import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { testimonials } from '../data/siteContent'

// The reference customer-review section contains the three entries after the standalone quote.
const testimonialItems = testimonials.slice(1)

type CardPosition = 'active' | 'next' | 'previous'

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isAnimating = useRef(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => () => {
    isAnimating.current = false
  }, [])

  function moveDeck(step: 1 | -1) {
    if (isAnimating.current) return

    isAnimating.current = true
    setActiveIndex((current) => (current + step + testimonialItems.length) % testimonialItems.length)
    const motionDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520
    window.setTimeout(() => {
      isAnimating.current = false
    }, motionDuration)
  }

  function getCardPosition(index: number): CardPosition {
    const offset = (index - activeIndex + testimonialItems.length) % testimonialItems.length
    return offset === 0 ? 'active' : offset === 1 ? 'next' : 'previous'
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current
    touchStartX.current = null
    if (startX === null) return

    const distance = (event.changedTouches[0]?.clientX ?? startX) - startX
    if (Math.abs(distance) < 48) return
    moveDeck(distance < 0 ? 1 : -1)
  }

  return (
    <section className="testimonials-section section-pad reveal-on-scroll" aria-labelledby="testimonials-title">
      <div className="testimonials-section__header">
        <h2 id="testimonials-title" className="testimonials-section__title">
          Trusted by organisations and applicants alike
        </h2>
        <p className="testimonials-section__subtitle">
          Here is what hiring teams and individuals say about our screening service.
        </p>
      </div>

      <div
        className="testimonials-deck"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Customer testimonials"
      >
        {testimonialItems.map((item, index) => {
          const position = getCardPosition(index)

          return (
            <article
              className={`testimonial-card testimonial-card--${position}`}
              key={item.name}
              aria-hidden={position !== 'active'}
            >
              <blockquote className="testimonial-card__quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="testimonial-card__author">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="testimonial-card__avatar"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                ) : item.initials ? (
                  <span className="testimonial-card__initials" aria-hidden="true">
                    {item.initials}
                  </span>
                ) : null}
                <div className="testimonial-card__meta">
                  <strong className="testimonial-card__name">{item.name}</strong>
                  <span className="testimonial-card__role">{item.role}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="testimonials-controls" aria-label="Testimonial navigation">
        <button type="button" className="testimonials-control" onClick={() => moveDeck(-1)}>
          <span aria-hidden="true">←</span>
          Previous
        </button>
        <span className="testimonials-progress" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} / {String(testimonialItems.length).padStart(2, '0')}
        </span>
        <button type="button" className="testimonials-control" onClick={() => moveDeck(1)}>
          Next
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
