import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { RoutePage } from './pages/RoutePage'
import './styles/tokens.css'
import './shaders/threeui.css'
import './styles/global.css'
import './styles/site.css'

function App() {
  const getPathname = () => {
    const current = window.location.pathname
    return current.endsWith('/index.html') ? '/' : current.replace(/\/$/, '') || '/'
  }
  const [pathname, setPathname] = useState(getPathname)

  useEffect(() => {
    const handlePopState = () => setPathname(getPathname())
    window.addEventListener('popstate', handlePopState)

    const handleDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      const target = anchor.getAttribute('target')

      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || target === '_blank') {
        return
      }

      if (href.startsWith('#')) {
        return
      }

      if (href.startsWith('/#')) {
        const hash = href.replace('/#', '')
        const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')
        if (isHome) {
          e.preventDefault()
          const el = document.getElementById(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            window.history.pushState(null, '', `#${hash}`)
          }
        } else {
          e.preventDefault()
          window.history.pushState(null, '', href)
          setPathname('/')
          setTimeout(() => {
            const el = document.getElementById(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
        return
      }

      if (href.startsWith('/')) {
        e.preventDefault()
        if (window.location.pathname !== href) {
          window.history.pushState(null, '', href)
          setPathname(getPathname())
        }
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return pathname === '/' ? <HomePage /> : <RoutePage pathname={pathname} />
}

export default App
