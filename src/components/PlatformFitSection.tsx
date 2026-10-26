import { integrations } from '../data/siteContent'

function FitIcon({ type }: { type: 'api' | 'partners' | 'portal' }) {
  if (type === 'api') {
    return (
      <svg className="platform-fit-card__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="m17 14-9 10 9 10M31 14l9 10-9 10M27 9l-6 30" />
      </svg>
    )
  }

  if (type === 'partners') {
    return (
      <svg className="platform-fit-card__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="12" cy="24" r="4" />
        <circle cx="36" cy="12" r="4" />
        <circle cx="36" cy="36" r="4" />
        <path d="m16 22 16-8M16 26l16 8" />
      </svg>
    )
  }

  return (
    <svg className="platform-fit-card__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="28" rx="3" />
      <path d="M8 17h32M14 13.5h.01M18 13.5h.01M22 13.5h.01M14 24h20M14 29h12" />
    </svg>
  )
}

export function PlatformFitSection() {
  return (
    <section className="platform-fit-section section-pad reveal-on-scroll" aria-labelledby="platform-fit-title">
      <div className="platform-fit-section__header">
        <p className="eyebrow"><span /> PLATFORM FIT</p>
        <h2 id="platform-fit-title">Wherever your team hires, DBS-Express fits.</h2>
      </div>

      <div className="platform-fit-grid">
        {integrations.map((item, index) => (
          <article className="platform-fit-card" key={item.title}>
            <div className="platform-fit-card__topline">
              <span className="platform-fit-card__number" aria-hidden="true">{item.number}</span>
              <FitIcon type={index === 0 ? 'api' : index === 1 ? 'partners' : 'portal'} />
            </div>
            <h3>{item.title}</h3>
            <p className="platform-fit-card__subtitle">{item.description}</p>
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
