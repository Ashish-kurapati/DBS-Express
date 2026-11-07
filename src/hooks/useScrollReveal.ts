import { useEffect, useRef } from 'react'

/**
 * Hook to observe elements with `.reveal-on-scroll` within a container,
 * adding `.is-revealed` when they enter the viewport.
 * Fully respects `prefers-reduced-motion: reduce`.
 * Guarantees that content never stays faded or invisible during scrolling.
 */
export function useScrollRevealContainer<T extends HTMLElement>(threshold = 0.05) {
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = root.querySelectorAll<HTMLElement>('.reveal-on-scroll')

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => {
        el.classList.add('is-revealed')
        el.classList.remove('will-reveal')
      })
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
        threshold,
        rootMargin: '50px 0px 50px 0px',
      },
    )

    elements.forEach((el) => {
      const bounds = el.getBoundingClientRect()
      if (bounds.top < window.innerHeight * 0.95 && bounds.bottom > 0) {
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
        if (bounds.top < window.innerHeight * 0.95 && bounds.bottom > 0) {
          el.classList.add('is-revealed')
          el.classList.remove('will-reveal')
          observer.unobserve(el)
        }
      })
    }

    // Safety fallback: Ensure all elements are revealed so no content is ever stuck hidden
    const safetyTimer = window.setTimeout(() => {
      elements.forEach((el) => {
        el.classList.add('is-revealed')
        el.classList.remove('will-reveal')
      })
    }, 800)

    window.addEventListener('scroll', revealVisibleElements, { passive: true })
    window.addEventListener('resize', revealVisibleElements)

    return () => {
      window.clearTimeout(safetyTimer)
      observer.disconnect()
      window.removeEventListener('scroll', revealVisibleElements)
      window.removeEventListener('resize', revealVisibleElements)
    }
  }, [threshold])

  return containerRef
}

export const useReveal = useScrollRevealContainer
