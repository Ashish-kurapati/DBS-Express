import { useState } from 'react'

interface WorkflowStep {
  id: string
  number: string
  emoji: string
  title: string
  summary: string
  requiredItems: {
    label: string
    detail: string
  }[]
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'setup',
    number: '01',
    emoji: '👤',
    title: 'Candidate Setup',
    summary: 'Enter candidate details, assign departments, and select targeted job roles.',
    requiredItems: [
      { label: 'Candidate Details', detail: 'Full legal name, contact email & telephone' },
      { label: 'Department Assignment', detail: 'Route applications to the relevant internal hiring team' },
      { label: 'Targeted Job Role', detail: 'Specify position to determine lawful check eligibility' },
    ],
  },
  {
    id: 'bundling',
    number: '02',
    emoji: '📦',
    title: 'Service Bundling',
    summary: 'Select DBS check tier and add supplementary verification services.',
    requiredItems: [
      { label: 'DBS Level', detail: 'Choose Basic, Standard, or Enhanced check' },
      { label: 'Digital Identity', detail: 'Accredited fast-track biometric ID verification' },
      { label: 'Additional Screening', detail: 'Optional Right to Work checks and automated reference chasing' },
    ],
  },
  {
    id: 'verification',
    number: '03',
    emoji: '🔍',
    title: 'Candidate Verification',
    summary: 'Review submitted candidate information and identity documents.',
    requiredItems: [
      { label: 'Data Accuracy', detail: 'Review applicant address history and personal disclosures' },
      { label: 'Identity Proofs', detail: 'Automated verification against passport or driving licence' },
      { label: 'Referee Status', detail: 'Live status tracking with automated reminder dispatches' },
    ],
  },
  {
    id: 'billing',
    number: '04',
    emoji: '💳',
    title: 'Billing & Split',
    summary: 'Configure cost allocation between the organisation and candidate.',
    requiredItems: [
      { label: 'Payment Split', detail: '100% employer paid, candidate paid, or custom ratio' },
      { label: 'Checkout Options', detail: 'Instant card payment or monthly aggregated invoice' },
      { label: 'Government Submission', detail: 'Direct accredited dispatch upon payment confirmation' },
    ],
  },
]

export function CandidateCheckWorkflow() {
  const [activeStep, setActiveStep] = useState(0)
  const current = WORKFLOW_STEPS[activeStep]

  return (
    <section
      className="candidate-workflow-section section-pad"
      id="candidate-workflow"
      aria-labelledby="candidate-workflow-title"
    >
      <div className="candidate-workflow-container">
        {/* Section Header */}
        <div className="candidate-workflow-header">
          <p className="eyebrow">
            <span /> ACCREDITED PORTAL
          </p>
          <h2 id="candidate-workflow-title" className="candidate-workflow-title">
            Candidate check workflow
          </h2>
        </div>

        {/* Step Navigation Bar */}
        <nav
          className="candidate-workflow-nav"
          role="tablist"
          aria-label="Candidate check workflow navigation"
        >
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStep
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                id={`workflow-tab-${step.id}`}
                aria-selected={isActive}
                aria-controls={`workflow-panel-${step.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`candidate-workflow-nav__item ${
                  isActive ? 'candidate-workflow-nav__item--active' : ''
                }`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="candidate-workflow-nav__icon-wrap">
                  <span className="candidate-workflow-nav__emoji" role="img" aria-label={step.title}>
                    {step.emoji}
                  </span>
                  <span className="candidate-workflow-nav__num">{step.number}</span>
                </div>
                <div className="candidate-workflow-nav__info">
                  <span className="candidate-workflow-nav__step-label">Step {step.number}</span>
                  <strong className="candidate-workflow-nav__title">{step.title}</strong>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Active Step Panel */}
        <div
          role="tabpanel"
          id={`workflow-panel-${current.id}`}
          aria-labelledby={`workflow-tab-${current.id}`}
          className="candidate-workflow-panel"
        >
          <div className="candidate-workflow-panel__top">
            <div className="candidate-workflow-panel__badge-row">
              <span className="candidate-workflow-panel__emoji-badge">{current.emoji}</span>
              <span className="candidate-workflow-panel__step-badge">
                Step {current.number} of {WORKFLOW_STEPS.length}
              </span>
            </div>
            <h3 className="candidate-workflow-panel__heading">{current.title}</h3>
            <p className="candidate-workflow-panel__summary">{current.summary}</p>
          </div>

          <div className="candidate-workflow-panel__grid">
            {current.requiredItems.map((item) => (
              <div key={item.label} className="candidate-workflow-card">
                <div className="candidate-workflow-card__header">
                  <span className="candidate-workflow-card__check">✓</span>
                  <h4 className="candidate-workflow-card__title">{item.label}</h4>
                </div>
                <p className="candidate-workflow-card__detail">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="candidate-workflow-panel__footer">
            <button
              type="button"
              className="candidate-workflow-btn candidate-workflow-btn--prev"
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            >
              ← Previous
            </button>
            <div className="candidate-workflow-panel__dots">
              {WORKFLOW_STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Jump to ${s.title}`}
                  className={`candidate-workflow-dot ${
                    i === activeStep ? 'candidate-workflow-dot--active' : ''
                  }`}
                  onClick={() => setActiveStep(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="candidate-workflow-btn candidate-workflow-btn--next"
              disabled={activeStep === WORKFLOW_STEPS.length - 1}
              onClick={() => setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))}
            >
              Next step →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

