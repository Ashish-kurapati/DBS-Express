import { useEffect, useRef } from 'react'

/**
 * Hook to observe elements with `.reveal-on-scroll` within a container,
 * adding `.is-revealed` when they enter the viewport.
 * Fully respects `prefers-reduced-motion: reduce`.
 */
export function useScrollRevealContainer<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = root.querySelectorAll<HTMLElement>('.reveal-on-scroll')

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            entry.target.classList.remove('will-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    elements.forEach((el) => {
      const bounds = el.getBoundingClientRect()
      if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
        el.classList.add('is-revealed')
        return
      }

      el.classList.add('will-reveal')
      observer.observe(el)
    })

    const revealVisibleElements = () => {
      elements.forEach((el) => {
        if (!el.classList.contains('will-reveal')) return
        const bounds = el.getBoundingClientRect()
        if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
          el.classList.add('is-revealed')
          el.classList.remove('will-reveal')
          observer.unobserve(el)
        }
      })
    }

    window.addEventListener('scroll', revealVisibleElements, { passive: true })
    window.addEventListener('resize', revealVisibleElements)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', revealVisibleElements)
      window.removeEventListener('resize', revealVisibleElements)
    }
  }, [])

  return containerRef
}
