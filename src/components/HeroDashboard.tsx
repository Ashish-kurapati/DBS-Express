import { useEffect, useRef } from 'react'

export function HeroDashboard() {
  const artworkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const artwork = artworkRef.current
    if (!artwork) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      artwork.classList.add('hero-artwork--fanned')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        artwork.classList.add('hero-artwork--fanned')
        observer.disconnect()
      },
      { threshold: 0.25 },
    )

    observer.observe(artwork)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="hero-artwork"
      ref={artworkRef}
      role="img"
      aria-label="Illustration of Basic, Standard, and Enhanced DBS check documents"
    >
      <div className="hero-artwork__glow" aria-hidden="true" />
      <div className="hero-document hero-document--basic" aria-hidden="true">
        <span className="hero-document__eyebrow">DBS CHECK</span>
        <strong>Basic</strong>
        <span className="hero-document__line" />
        <span className="hero-document__line hero-document__line--short" />
        <span className="hero-document__stamp">01</span>
      </div>
      <div className="hero-document hero-document--standard" aria-hidden="true">
        <span className="hero-document__eyebrow">DBS CHECK</span>
        <strong>Standard</strong>
        <span className="hero-document__line" />
        <span className="hero-document__line hero-document__line--short" />
        <span className="hero-document__stamp">02</span>
      </div>
      <div className="hero-document hero-document--enhanced" aria-hidden="true">
        <span className="hero-document__eyebrow">DBS CHECK</span>
        <strong>Enhanced</strong>
        <span className="hero-document__line" />
        <span className="hero-document__line hero-document__line--short" />
        <span className="hero-document__stamp">03</span>
      </div>
      <div className="hero-folder" aria-hidden="true">
        <span className="hero-folder__tab" />
        <span className="hero-folder__mark">DBS</span>
        <span className="hero-folder__label">A clearer way to check</span>
      </div>
      <div className="hero-artwork__note" aria-hidden="true">
        <span className="hero-artwork__note-dot" />
        Basic · Standard · Enhanced
      </div>
    </div>
  )
}
