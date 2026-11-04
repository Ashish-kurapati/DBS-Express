import { dbsPerformanceUrl } from '../data/siteContent'
import { SectionIcon } from './SectionIcon'

const individualSteps = [
  { number: '01', icon: '✎', title: 'Fill in your details', description: 'Enter your personal information and address history.' },
  { number: '02', icon: '▣', title: 'Verify your ID', description: 'Complete the identity check requested by the provider.' },
  { number: '03', icon: '✓', title: 'Get your certificate', description: 'DBS sends the certificate to you by post.' },
]

const serviceTargets = [
  { level: 'Basic', percentage: '85%', time: 'within 2 days' },
  { level: 'Standard', percentage: '85%', time: 'within 3 days' },
  { level: 'Enhanced', percentage: '80%', time: 'within 14 days' },
]

export function IndividualJourneySections() {
  return (
    <>
      <section className="individual-journey-section section-pad reveal-on-scroll" aria-labelledby="individual-journey-title">
        <div className="individual-journey-section__header">
          <SectionIcon label="Individual application illustration" />
          <p className="eyebrow"><span /> FOR INDIVIDUALS</p>
          <h2 id="individual-journey-title">Your check in three steps</h2>
        </div>
        <div className="individual-journey-ready">
          <span className="individual-journey-ready__icon" aria-hidden="true">✓</span>
          <div>
            <h3>Have these ready</h3>
            <ul>
              <li>Last five years of addresses</li>
              <li>Passport or driving licence</li>
              <li>National Insurance number, if available</li>
            </ul>
          </div>
        </div>
        <div className="individual-journey-steps">
          {individualSteps.map((step) => (
            <article className="individual-journey-step" key={step.number}>
              <span className="individual-journey-step__icon" aria-hidden="true">{step.icon}</span>
              <span className="individual-journey-step__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <a className="button button-primary individual-journey-cta" href="/apply/individual">
          Apply for my own check <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="dbs-turnaround-section section-pad reveal-on-scroll" aria-labelledby="dbs-turnaround-title">
        <div className="dbs-turnaround-section__header">
          <SectionIcon label="DBS turnaround illustration" />
          <p className="eyebrow"><span /> DBS SERVICE TARGETS</p>
          <h2 id="dbs-turnaround-title">DBS service targets</h2>
        </div>
        <div className="dbs-turnaround-grid">
          {serviceTargets.map((target) => (
            <article className="dbs-turnaround-card" key={target.level}>
              <h3>{target.level}</h3>
              <p><strong>{target.percentage}</strong></p>
              <p className="dbs-turnaround-card__time">{target.time}</p>
            </article>
          ))}
        </div>
        <p className="dbs-turnaround-disclaimer">
          DBS targets are not guarantees. Extra checks or police enquiries can take longer.
        </p>
        <details className="dbs-turnaround-details" name="page-details">
          <summary>More about processing times</summary>
          <p>DBS controls processing. Some applications need additional checks or police enquiries.</p>
        </details>
        <a className="dbs-turnaround-source" href={dbsPerformanceUrl} target="_blank" rel="noreferrer">
          DBS performance and annual report <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
    </>
  )
}
