const steps = [
  {
    step: '1',
    title: 'Choose the right check',
    description:
      'Start with the role and the level of check it is eligible for: Basic, Standard, or Enhanced.',
  },
  {
    step: '2',
    title: 'Invite your applicant',
    description:
      'Send an online application so your applicant can provide the details needed for their check.',
  },
  {
    step: '3',
    title: 'Follow progress',
    description:
      'Use the online portal to keep track of applications and see when results are ready.',
  },
]

export function WorkflowSection() {
  return (
    <section className="workflow-cards-section section-pad reveal-on-scroll" id="workflow" aria-labelledby="workflow-title">
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
