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
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}

/**
 * Hook for a single element ref scroll reveal
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed')
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
