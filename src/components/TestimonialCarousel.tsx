import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type TouchEvent } from 'react'
import { testimonials } from '../data/siteContent'

type TestimonialCarouselProps = {
  variant: 'a' | 'b' | 'c'
}

export function TestimonialCarousel({ variant }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [announcement, setAnnouncement] = useState('')
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      setReducedMotion(preference.matches)
      setPlaying(!preference.matches)
    }
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (!playing || hovered || focused || reducedMotion) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [focused, hovered, index, playing, reducedMotion])

  const moveTo = (nextIndex: number) => {
    const next = (nextIndex + testimonials.length) % testimonials.length
    setIndex(next)
    setAnnouncement(`Slide ${next + 1} of ${testimonials.length}: ${testimonials[next].name}`)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveTo(index - 1)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false)
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current
    const end = event.changedTouches[0]?.clientX
    if (start !== null && end !== undefined && Math.abs(start - end) >= 48) {
      moveTo(index + (start > end ? 1 : -1))
    }
    touchStart.current = null
  }

  return (
    <section
      className={`testimonial-carousel testimonial-carousel--${variant}`}
      aria-label="DBS-Express customer feedback"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="quote-card" aria-live="off">
        {testimonials.map((testimonial, slideIndex) => (
          <article
            className={`quote-slide${slideIndex === index ? ' is-active' : ''}`}
            key={testimonial.name}
            aria-hidden={slideIndex !== index}
          >
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="quote-attribution">
              <span className="avatar-fallback" aria-hidden="true">
                {testimonial.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <div className="carousel-arrows">
          <button
            className="carousel-arrow"
            type="button"
            aria-label="Previous testimonial"
            onClick={() => moveTo(index - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className="carousel-arrow"
            type="button"
            aria-label="Next testimonial"
            onClick={() => moveTo(index + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="carousel-dots" role="group" aria-label="Choose a testimonial">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              className={`carousel-dot${dotIndex === index ? ' is-active' : ''}`}
              type="button"
              key={testimonial.name}
              aria-label={`Show testimonial ${dotIndex + 1}: ${testimonial.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              onClick={() => moveTo(dotIndex)}
            />
          ))}
        </div>
        <button
          className="carousel-play"
          type="button"
          disabled={reducedMotion}
          onClick={() => setPlaying((current) => !current)}
          aria-label={
            reducedMotion
              ? 'Automatic slide changes disabled due to reduced motion preference'
              : playing
                ? 'Pause testimonial carousel'
                : 'Start testimonial carousel'
          }
        >
          <span aria-hidden="true">{reducedMotion ? '◌' : playing ? 'Ⅱ' : '▶'}</span>
          <span>{reducedMotion ? 'Motion reduced' : playing ? 'Pause' : 'Play'}</span>
        </button>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </section>
  )
}
