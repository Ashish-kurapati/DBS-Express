const steps = [
  {
    step: '1',
    title: 'Candidate & Role Setup',
    description:
      'Enter applicant details, assign company departments, and use our smart eligibility questionnaire to determine the lawful DBS level (Basic, Standard, or Enhanced).',
  },
  {
    step: '2',
    title: 'Bundle Checks & Digital ID',
    description:
      'Select services in one click: DBS checks, free Right to Work verification, biometric Digital ID (£6.50), and hands-off reference checks (£2.95) with flexible payment splitting.',
  },
  {
    step: '3',
    title: 'Track & Receive Results',
    description:
      'Monitor status in real time on your dashboard, export Excel compliance records, and receive government-backed results with official paper certificates dispatched.',
  },
]

export function WorkflowSection() {
  return (
    <section className="workflow-cards-section section-pad reveal-on-scroll" aria-labelledby="workflow-title">
      <div className="workflow-cards-section__header">
        <h2 id="workflow-title" className="workflow-cards-section__title">
          Three simple steps to your result.
        </h2>
        <p className="workflow-cards-section__subtitle">
          Whether ordering a single check or bulk submissions, the same clear workflow applies.
        </p>
      </div>

      <div className="workflow-cards-grid">
        {steps.map((item) => (
          <article className="workflow-step-card" key={item.step}>
            <span className="workflow-step-card__badge" aria-hidden="true">
              {item.step}
            </span>
            <h3 className="workflow-step-card__title">{item.title}</h3>
            <p className="workflow-step-card__text">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
