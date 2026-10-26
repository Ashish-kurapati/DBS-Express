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
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return pathname === '/' ? <HomePage /> : <RoutePage pathname={pathname} />
}

export default App
