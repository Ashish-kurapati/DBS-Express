import { statistics } from '../data/siteContent'

export function StatisticsSection() {
  return (
    <section className="stats-section section-pad reveal-on-scroll" aria-labelledby="stats-title">
      <div className="stats-section__header">
        <h2 id="stats-title" className="stats-section__title">
          Speed and accuracy{' '}
          <span className="text-accent">measured in data.</span>
        </h2>
        <p className="stats-section__subtitle">
          Built on certified government screening infrastructure with industry-leading speed.
        </p>
      </div>

      <div className="stats-grid">
        {statistics.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong className="stat-card__value">{stat.value}</strong>
            <p className="stat-card__label">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
