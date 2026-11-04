import { useState } from 'react'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('dbs_privacy_notice_dismissed')
    } catch {
      return true
    }
  })

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('dbs_privacy_notice_dismissed', 'true')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-consent" aria-label="Privacy notice">
      <div className="cookie-consent__inner">
        <div className="cookie-consent__copy">
          <p className="cookie-consent__title">Privacy notice</p>
          <p className="cookie-consent__text">
            This website does not use analytics or advertising cookies. A session storage entry remembers this notice dismissal.
            Read our <a href="/cookie-policy" className="cookie-consent__link">Cookie Policy</a>.
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--accept"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  )
}
