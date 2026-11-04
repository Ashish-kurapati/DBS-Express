import { useState } from 'react'
import { dbsEligibilityUrl } from '../data/siteContent'
import { SectionIcon } from './SectionIcon'

type Answers = {
  applicant?: 'self' | 'self-employed' | 'employer'
  role?: 'basic' | 'standard' | 'enhanced' | 'unsure'
  eligibility?: 'yes' | 'no' | 'unsure'
}

const questions = [
  {
    prompt: 'Which best describes you?',
    options: [
      { value: 'self', label: 'I am applying for my own check' },
      { value: 'self-employed', label: 'I am self-employed or a personal employee' },
      { value: 'employer', label: 'I am an employer arranging a check' },
    ],
  },
  {
    prompt: 'What type of role or activity is it?',
    options: [
      { value: 'basic', label: 'A role with no known higher-level eligibility' },
      { value: 'standard', label: 'A role listed as Standard-eligible' },
      { value: 'enhanced', label: 'A role listed as Enhanced-eligible' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
  {
    prompt: 'Have you checked the specific role against official DBS eligibility guidance?',
    options: [
      { value: 'yes', label: 'Yes, this role is eligible for the selected check level' },
      { value: 'no', label: 'No, it does not meet the criteria for that level' },
      { value: 'unsure', label: 'I am not sure' },
    ],
  },
]

function getResult(answers: Answers) {
  if (answers.role === 'basic') {
    return {
      title: 'Basic may be suitable',
      description: 'Basic checks are available for any purpose. They do not require a role to meet higher-level eligibility rules.',
      level: 'Basic',
    }
  }

  if (answers.role === 'unsure' || answers.eligibility !== 'yes') {
    return {
      title: 'Confirm eligibility first',
      description: 'Standard and Enhanced checks are available only when the specific role meets the legal criteria. Check the actual duties against official guidance; a Basic check is available if higher-level eligibility is not met.',
      level: 'unsure',
    }
  }

  if (answers.role === 'standard' && answers.applicant === 'employer') {
    return {
      title: 'Standard may be suitable',
      description: 'A recruiting organisation may request a Standard check only when the specific position is eligible under the Rehabilitation of Offenders Act 1974 (Exceptions) Order. Confirm the role before applying.',
      level: 'Standard',
    }
  }

  if (answers.role === 'standard') {
    return {
      title: 'Ask the recruiting organisation',
      description: 'Individuals cannot apply for a Standard check on their own. The recruiting organisation must confirm the role is eligible and arrange the check.',
      level: 'Standard',
    }
  }

  if (answers.role === 'enhanced' && answers.applicant === 'self-employed') {
    return {
      title: 'Enhanced may be suitable',
      description: 'If the specific role is eligible, a self-employed person or personal employee can apply for an Enhanced check through a DBS Umbrella Body. A Barred List check is available only where the role meets its separate legal criteria.',
      level: 'Enhanced',
    }
  }

  if (answers.role === 'enhanced' && answers.applicant === 'employer') {
    return {
      title: 'Enhanced may be suitable',
      description: 'The recruiting organisation must confirm that the specific position is eligible for an Enhanced check. An Enhanced check with a Barred List check is available only where the role meets the separate legal criteria.',
      level: 'Enhanced',
    }
  }

  return {
    title: 'Ask the recruiting organisation',
    description: 'For most roles, the recruiting organisation must arrange an Enhanced check. Speak to the organisation that asked for the check and confirm the role’s eligibility before applying.',
    level: 'Enhanced',
  }
}

export function CheckGuidanceTool() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [complete, setComplete] = useState(false)
  const answerKey = ['applicant', 'role', 'eligibility'][step] as keyof Answers
  const selected = answers[answerKey]
  const result = getResult(answers)
  const applicationHref = answers.applicant === 'employer'
    ? '/employers'
    : answers.applicant === 'self-employed'
      ? '/self-employed'
      : result.level === 'Basic'
        ? '/apply/individual'
        : '/employers'
  const resultHref = result.level === 'unsure'
    ? dbsEligibilityUrl
    : result.level === 'Standard' && answers.applicant !== 'employer'
      ? '/employers'
      : applicationHref

  const selectOption = (value: string) => {
    setAnswers((current) => ({ ...current, [answerKey]: value }))
  }

  const goBack = () => {
    if (complete) {
      setComplete(false)
      setStep(2)
    } else {
      setStep((current) => Math.max(0, current - 1))
    }
  }

  return (
    <section className="check-guidance-section section-pad reveal-on-scroll" id="check-guidance" aria-labelledby="check-guidance-title">
      <div className="check-guidance-section__intro">
        <SectionIcon label="DBS eligibility illustration" />
        <p className="eyebrow"><span /> CHECK GUIDANCE</p>
        <h2 id="check-guidance-title">Which check do I need?</h2>
        <p>Answer three short questions for general guidance. Only roles that meet legal criteria qualify for Standard or Enhanced checks.</p>
      </div>
      <div className="check-guidance-card">
        <div className="check-guidance-card__visual" aria-hidden="true">
          <span className="check-guidance-card__visual-icon">✓</span>
          <span className="check-guidance-card__visual-caption">Role first</span>
        </div>
        {!complete ? (
          <div className="check-guidance-card__body">
            <p className="check-guidance-card__progress">Question {step + 1} of 3</p>
            <div className="check-guidance-card__progress-track" role="progressbar" aria-label="Guidance progress" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>
              <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
            </div>
            <fieldset className="check-guidance-card__question">
              <legend>{questions[step].prompt}</legend>
              <div className="check-guidance-card__options" aria-label={questions[step].prompt}>
                {questions[step].options.map((option) => (
                  <button
                    className="check-guidance-card__option"
                    type="button"
                    aria-pressed={selected === option.value}
                    key={option.value}
                    onClick={() => selectOption(option.value)}
                  >
                    <span className="check-guidance-card__radio" aria-hidden="true" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="check-guidance-card__actions">
              {step > 0 && <button className="button button-secondary" type="button" onClick={goBack}>Back</button>}
              <button
                className="button button-primary"
                type="button"
                disabled={!selected}
                onClick={() => step === 2 ? setComplete(true) : setStep((current) => current + 1)}
              >
                {step === 2 ? 'See guidance' : 'Continue'}
              </button>
            </div>
          </div>
        ) : (
          <div className="check-guidance-card__body" aria-live="polite">
            <p className="check-guidance-card__progress">Possible result</p>
            <h3>{result.title}</h3>
            <p>{result.description.split(/\s+/).slice(0, 16).join(' ')}</p>
            {result.description.split(/\s+/).length > 16 && (
              <details className="check-guidance-card__detail" name="page-details">
                <summary>Read more</summary>
                <p>{result.description.split(/\s+/).slice(16).join(' ')}</p>
              </details>
            )}
            <p className="check-guidance-card__disclaimer">This tool provides guidance, not a definitive eligibility decision. The actual role and applicable legislation determine eligibility.</p>
            <div className="check-guidance-card__links">
              <a className="button button-primary" href={resultHref} target={resultHref.startsWith('https://') ? '_blank' : undefined} rel={resultHref.startsWith('https://') ? 'noreferrer' : undefined}>
                {result.level === 'unsure' ? 'Check GOV.UK eligibility' : result.level === 'Standard' && answers.applicant !== 'employer' ? 'Employer check options' : answers.applicant === 'employer' ? 'Employer check options' : result.level === 'Enhanced' && answers.applicant === 'self-employed' ? 'Self-employed guidance' : result.level === 'Enhanced' ? 'Employer check options' : 'Individual application'}
                {(result.level === 'unsure' || resultHref.startsWith('https://')) && <span aria-hidden="true"> ↗</span>}
              </a>
              {result.level === 'unsure' && <a href={applicationHref}>See application options</a>}
            </div>
            {result.level === 'Enhanced' && answers.applicant === 'self-employed' && <p className="check-guidance-card__note">Read the <a href="/self-employed">self-employed guidance</a> and confirm that the specific role is eligible.</p>}
            <button className="check-guidance-card__restart" type="button" onClick={() => { setAnswers({}); setStep(0); setComplete(false) }}>Start again</button>
          </div>
        )}
      </div>
      <p className="check-guidance-section__source">Source: <a href={dbsEligibilityUrl} target="_blank" rel="noreferrer">Official GOV.UK eligibility guidance <span aria-hidden="true">↗</span></a></p>
    </section>
  )
}
