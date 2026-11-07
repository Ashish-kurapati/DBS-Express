import { dbsPerformanceUrl } from '../data/siteContent'
import { DBSStatsSection } from './DBSStatsSection'

const individualSteps = [
  { number: '01', title: 'Fill in your details', description: 'Enter your personal information and address history.' },
  { number: '02', title: 'Verify your ID', description: 'Complete the identity check requested by the provider.' },
  { number: '03', title: 'Get your certificate', description: 'DBS sends the certificate to you by post.' },
]

export function IndividualJourneySections() {
  return (
    <>
      <section className="individual-journey-section section-pad reveal-on-scroll" aria-labelledby="individual-journey-title">
        <div className="individual-journey-section__header">
          <p className="eyebrow"><span /> FOR INDIVIDUALS</p>
          <h2 id="individual-journey-title">Your check in three steps</h2>
        </div>
        <div className="individual-journey-ready">
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

      {/* Redesigned Premium DBS Service Targets & Geographic Coverage */}
      <DBSStatsSection />

      <div className="dbs-turnaround-source-wrap section-pad">
        <details className="dbs-turnaround-details" name="page-details">
          <summary>More about processing times</summary>
          <p>DBS controls processing. Some applications need additional checks or police enquiries.</p>
        </details>
        <a className="dbs-turnaround-source" href={dbsPerformanceUrl} target="_blank" rel="noreferrer">
          DBS performance and annual report <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </>
  )
}
