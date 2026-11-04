import { useEffect } from 'react'
import { pricingTiers, signUpUrl } from '../data/siteContent'
import { HeroDashboard } from '../components/HeroDashboard'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { WorkflowSection } from '../components/WorkflowSection'
import { IndividualJourneySections } from '../components/IndividualJourneySections'
import { CheckGuidanceTool } from '../components/CheckGuidanceTool'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'
import { SectionIcon } from '../components/SectionIcon'
import { FloatingStartButton } from '../components/FloatingStartButton'

const checkTypes = ['Basic DBS check', 'Standard DBS check', 'Enhanced DBS check']
const startingPrices = pricingTiers[pricingTiers.length - 1]

const checkDetails = [
  {
    image: '/assets/team-collaboration.jpg',
    badge: 'For any purpose',
    description:
      'For any purpose, including employment. Shows unspent convictions and conditional cautions.',
    href: '/individuals',
    linkLabel: 'Basic check details',
  },
  {
    image: '/assets/compliance-documents.jpg',
    badge: 'Eligible roles only',
    description:
      'For certain roles. Shows relevant spent and unspent convictions and cautions that are not filtered.',
    href: '/employers',
    linkLabel: 'Standard check details',
  },
  {
    image: '/assets/fast-turnaround.jpg',
    badge: 'Eligible roles only',
    description:
      'For roles eligible for an Enhanced check. It may also include relevant information held by local police.',
    href: '/employers',
    linkLabel: 'Enhanced check details',
  },
]

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECK GUIDANCE</p>
        <h1 id="hero-title">
          DBS checks, <span className="text-accent">made clear.</span>
        </h1>
        <p className="hero-description">
          Compare check levels, understand eligibility, and choose your next step.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/apply/individual">
            Apply for my own check <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href={signUpUrl} target="_blank" rel="noreferrer">
            Register my organisation <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="hero-note">For individuals and employers <span aria-hidden="true">·</span> Clear guidance, all in one place</p>
      </div>
      <HeroDashboard />
    </section>
  )
}

function CheckTypesSection() {
  return (
    <section className="check-types-section section-pad" id="services" aria-labelledby="check-types-title">
      <div className="check-types-heading reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECKS</p>
        <SectionIcon label="DBS check levels illustration" />
        <h2 id="check-types-title">Choose by role.</h2>
        <p>Check eligibility before choosing a DBS level.</p>
      </div>
      <div className="check-types-grid check-types-grid--deck reveal-on-scroll">
        {checkTypes.map((checkType, index) => (
          <a
            className="check-type-card check-type-card--featured-image"
            href={checkDetails[index].href}
            aria-label={`${checkType} details`}
            key={checkType}
          >
            <div className="check-type-card__media">
              {checkDetails[index].image && (
                <img
                  src={checkDetails[index].image}
                  alt={checkType}
                  className="check-type-card__img"
                  loading="lazy"
                />
              )}
              <span className="check-type-card__badge">{checkDetails[index].badge}</span>
            </div>
            <div className="check-type-card__body">
              <h3>{checkType}</h3>
              <p>{checkDetails[index].description}</p>
              <span className="check-type-card__action">
                {checkDetails[index].linkLabel}
                {' '}<span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="pricing-overview section-pad reveal-on-scroll" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-overview__copy">
        <p className="eyebrow"><span /> PRICING</p>
        <SectionIcon label="Pricing illustration" />
        <h2 id="pricing-title">See your check price.</h2>
        <p>All-in totals include government, administration, and Digital ID fees.</p>
        <p className="pricing-overview__price">
          Basic <strong>{startingPrices.basicStandard}</strong> · Enhanced{' '}
          <strong>{startingPrices.enhanced}</strong>
        </p>
        <p className="pricing-overview__price-note">
          From prices apply to 500–1,499 checks yearly. Digital ID included.
        </p>
      </div>
      <a className="button button-primary" href="/pricing">
        View current pricing <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="faq-section section-pad reveal-on-scroll" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__intro">
        <p className="eyebrow"><span /> HERE TO HELP</p>
        <SectionIcon label="DBS help illustration" />
        <h2 id="faq-title">DBS questions, answered.</h2>
        <p>Short answers about check levels, applications, and eligibility.</p>
      </div>
      <div className="faq-list">
        <details className="faq-item" name="page-details">
          <summary>How do DBS check levels differ?</summary>
          <p>
            Each level can show different information, and Standard and Enhanced checks are only
            available for roles that meet legal eligibility requirements.{' '}
            <a href="https://www.gov.uk/government/organisations/disclosure-and-barring-service/about" target="_blank" rel="noreferrer">
              Read the DBS guidance <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
        <details className="faq-item" name="page-details">
          <summary>Can I apply for Basic?</summary>
          <p>
            Yes. A person can apply for a Basic check directly; an employer can also apply with the
            applicant’s consent.{' '}
            <a href="/apply/individual">
              Apply for a Basic check <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
        <details className="faq-item" name="page-details">
          <summary>Who can request higher-level checks?</summary>
          <p>
            No. These checks are limited to roles that meet the legal eligibility criteria. The
            recruiting organisation should confirm the correct level for the role.
          </p>
        </details>
        <details className="faq-item" name="page-details">
          <summary>Where can I get application help?</summary>
          <p>
            Contact the DBS-Express team for support with choosing a check or completing an
            application.{' '}
            <a href="/contact">
              Contact DBS-Express <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
      </div>
    </section>
  )
}

function NextStepsSection() {
  return (
    <section className="next-steps-section section-pad reveal-on-scroll" id="contact" aria-labelledby="next-steps-title">
      <div>
        <p className="eyebrow"><span /> NEED A HAND?</p>
        <SectionIcon label="Application support illustration" />
        <h2 id="next-steps-title">Need help choosing?</h2>
        <p className="next-steps-copy">Get guidance or start an application.</p>
      </div>
      <div className="next-steps-actions">
        <a className="button button-primary" href="/contact">
          Make an enquiry <span aria-hidden="true">↗</span>
        </a>
        <a className="button button-secondary" href="/apply">
          Start an application <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

export function HomePage() {
  const mainRef = useScrollRevealContainer<HTMLElement>()

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '').toLowerCase()
      if (!rawHash) return
      const targetId =
        rawHash === 'dbs-checks'
          ? 'services'
          : rawHash === 'how-it-works'
            ? 'workflow'
            : rawHash === 'faqs'
              ? 'faq'
              : rawHash

      const el = document.getElementById(targetId) || document.getElementById(rawHash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <CheckTypesSection />
        <WorkflowSection />
        <IndividualJourneySections />
        <CheckGuidanceTool />
        <IntegrationsSection />
        <PricingSection />
        <FaqSection />
        <NextStepsSection />
      </main>
      <SiteFooter />
      <FloatingStartButton />
    </div>
  )
}
