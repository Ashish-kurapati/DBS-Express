import { useState } from 'react'
import { loginUrl, navigation, signUpUrl } from '../data/siteContent'

type SiteHeaderProps = {
  variant: 'a' | 'b' | 'c'
}

export function SiteHeader({ variant }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="DBS-Express home">
          <img
            src="/assets/dbs-express-logo.jpg"
            alt="DBS-Express"
            width="320"
            height="64"
          />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const href = item.label === 'Pricing' ? '#pricing' : item.href
            const isExternal = href.startsWith('https://')

            return (
              <a
                href={href}
                key={item.label}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            )
          })}
          <a
            className="mobile-login"
            href={loginUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Login <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            className="mobile-register"
            href={signUpUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Register <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
        <div className="header-actions">
          <a href={loginUrl} target="_blank" rel="noreferrer">
            Login <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="register-link" href={signUpUrl} target="_blank" rel="noreferrer">
            Register <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
