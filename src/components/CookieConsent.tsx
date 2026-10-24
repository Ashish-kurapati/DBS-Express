import { useState } from 'react'
import { sourceSite } from '../data/siteContent'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('dbs_cookie_consent')
    } catch {
      return true
    }
  })

  const handleDismiss = (choice: 'accepted' | 'declined') => {
    try {
      sessionStorage.setItem('dbs_cookie_consent', choice)
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-consent" aria-label="Cookie and Privacy Consent">
      <div className="cookie-consent__inner">
        <div className="cookie-consent__copy">
          <p className="cookie-consent__title">Cookie &amp; Privacy Consent</p>
          <p className="cookie-consent__text">
            We use essential cookies to enable secure platform hand-off and analyze website traffic.
            By clicking &ldquo;Accept All&rdquo;, you consent to the use of cookies in accordance with our{' '}
            <a
              href={`${sourceSite}/policies`}
              target="_blank"
              rel="noreferrer"
              className="cookie-consent__link"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--decline"
            onClick={() => handleDismiss('declined')}
          >
            Decline
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--accept"
            onClick={() => handleDismiss('accepted')}
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  )
}
