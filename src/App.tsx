import { PrototypePicker } from './pages/PrototypePicker'
import { PrototypePage, type PrototypeVariant } from './pages/PrototypePage'
import { PrototypeAAnimated } from './pages/PrototypeAAnimated'
import './styles/tokens.css'
import './styles/global.css'
import './styles/site.css'
import './styles/prototype-a-animated.css'


function App() {
  const route = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/'
  if (route === '/prototype-a-animated') {
    return <PrototypeAAnimated />
  }

  const variants: Record<string, PrototypeVariant> = {
    '/prototype-a': 'a',
    '/prototype-b': 'b',
    '/prototype-c': 'c',
  } as const
  const variant = variants[route]

  return variant
    ? <PrototypePage variant={variant} />
    : <PrototypePicker />
}

export default App
