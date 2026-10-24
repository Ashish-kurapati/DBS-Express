export function IntegrationsSection() {
  return (
    <section className="integrations-section section-pad reveal-on-scroll" aria-labelledby="integrations-title">
      <div className="integrations-section__header">
        <h2 id="integrations-title" className="integrations-section__title">
          Wherever your team hires,{' '}
          <span className="text-accent">DBS-Express fits.</span>
        </h2>
      </div>

      <div className="integrations-grid">
        <article className="integration-card">
          <div className="integration-card__icon integration-card__icon--api" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <h3 className="integration-card__title">Build with API</h3>
          <p className="integration-card__eyebrow">DEVELOPER-FIRST AUTOMATION</p>
          <ul className="integration-card__bullets">
            <li>Direct REST endpoints for applicant dispatch and tracking</li>
            <li>Instant webhook notifications as soon as certificates are issued</li>
          </ul>
        </article>

        <article className="integration-card">
          <div className="integration-card__icon integration-card__icon--connectors" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h3 className="integration-card__title">Partner integrations</h3>
          <p className="integration-card__eyebrow">PREBUILT ZERO-CODE CONNECTORS</p>
          <ul className="integration-card__bullets">
            <li>Plug-and-play connectors for leading HR and ATS platforms</li>
            <li>Automated candidate status sync with zero manual re-entry</li>
          </ul>
        </article>

        <article className="integration-card">
          <div className="integration-card__icon integration-card__icon--portal" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <path d="m9 10 2 2 4-4" />
            </svg>
          </div>
          <h3 className="integration-card__title">Native web portal</h3>
          <p className="integration-card__eyebrow">ZERO SETUP OR CODING</p>
          <ul className="integration-card__bullets">
            <li>Dedicated cloud portal to invite candidates and monitor progress</li>
            <li>Automated candidate SMS reminders and instant digital downloads</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
