import { useEffect } from 'react'
import { dbsPerformanceUrl } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { WorkflowSection } from '../components/WorkflowSection'
import { DBSStatsSection } from '../components/DBSStatsSection'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'
import { FloatingStartButton } from '../components/FloatingStartButton'

const checkTypes = ['Basic DBS check', 'Standard DBS check', 'Enhanced DBS check']

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
        <div className="hero-rating-badge">
          <div className="hero-rating-stars" aria-hidden="true">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <span className="hero-rating-text">Official Registered Umbrella Body · Fast-Track Verification</span>
        </div>

        <h1 id="hero-title" className="hero-quote-headline">
          Verify smarter.<br />
          Move faster.<br />
          <span className="text-accent">Trust better.</span>
        </h1>

        <p className="hero-description">
          Fast, accredited UK DBS criminal record checks and digital identity verification for employers and individual applicants.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="hero-actions">
          <a className="button button-primary" href="/apply">
            Start my check <span aria-hidden="true">→</span>
          </a>
          <a className="button button-secondary" href="/employers">
            For employers <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ── Premium Zinc-Inspired Professional Photography ── */}
      <div className="hero-visual-wrap reveal-on-scroll" aria-label="Approachable professional in modern UK office">
        <div className="hero-geometric-shape" aria-hidden="true">
          <svg
            viewBox="0 0 520 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-geometric-svg"
          >
            <path
              d="M 107.1 124.6 Q 110.0 110.0 123.7 104.2 L 284.8 36.4 Q 300.0 30.0 313.0 40.2 L 477.3 170.0 Q 490.0 180.0 487.6 196.0 L 452.9 430.1 Q 450.0 450.0 430.3 453.6 L 242.2 487.8 Q 230.0 490.0 220.2 482.5 L 73.9 370.6 Q 60.0 360.0 63.4 342.9 Z"
              fill="url(#hero-emerald-grad)"
            />
            <defs>
              <linearGradient id="hero-emerald-grad" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#CCEBE0" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A8DEC9" stopOpacity="0.75" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="hero-photo-frame">
          <img
            src="/assets/hero-professional.jpg"
            alt="Approachable professional in a modern UK business environment"
            className="hero-photo-img"
            width="500"
            height="500"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}

function CheckTypesSection() {
  return (
    <section className="check-types-section section-pad" id="services" aria-labelledby="check-types-title">
      <div className="check-types-heading reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECKS</p>
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
    <section className="pricing-section section-pad reveal-on-scroll" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-section__header">
        <p className="eyebrow"><span /> PRICING</p>
        <h2 id="pricing-title">See your check price.</h2>
        <p className="pricing-section__subtitle">All-in totals include government, administration, and Digital ID fees.</p>
      </div>

      <div className="pricing-cards-grid">
        {/* Card 1: Basic Checks */}
        <article className="pricing-card">
          <div className="pricing-card__badge-wrap">
            <span className="pricing-card__badge">BASIC CHECKS</span>
          </div>
          <div className="pricing-card__price">
            <span className="pricing-card__from">from</span>
            <strong className="pricing-card__amount">£42.00</strong>
          </div>
          <p className="pricing-card__desc">
            Statutory disclosure for any job role or personal reference. Covers unspent convictions.
          </p>
          <a className="button button-primary pricing-card__btn" href="/pricing">
            View pricing <span aria-hidden="true">↗</span>
          </a>
        </article>

        {/* Card 2: Enhanced */}
        <article className="pricing-card">
          <div className="pricing-card__badge-wrap">
            <span className="pricing-card__badge">ENHANCED</span>
          </div>
          <div className="pricing-card__price">
            <span className="pricing-card__from">from</span>
            <strong className="pricing-card__amount">£73.00</strong>
          </div>
          <p className="pricing-card__desc">
            For eligible roles in healthcare, education, and regulated activity with vulnerable groups.
          </p>
          <a className="button button-primary pricing-card__btn" href="/pricing">
            View pricing <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="faq-section section-pad reveal-on-scroll" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__intro">
        <p className="eyebrow"><span /> HERE TO HELP</p>
        <h2 id="faq-title">DBS questions, answered.</h2>
        <p>Short answers about check levels, applications, and eligibility.</p>
      </div>
      <div className="faq-list">
          <details className="faq-item">
            <summary>
              <span>How do DBS check levels differ?</span>
              <span className="faq-toggle" aria-hidden="true">+</span>
            </summary>
            <div className="faq-content">
              <p>
                Each level can show different information, and Standard and Enhanced checks are only
                available for roles that meet legal eligibility requirements.{' '}
                <a href="https://www.gov.uk/government/organisations/disclosure-and-barring-service/about" target="_blank" rel="noreferrer">
                  Read the DBS guidance <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </details>
            <details className="faq-item">
              <summary>
                <span>Can I apply for Basic?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="faq-content">
                <p>
                  Yes. A person can apply for a Basic check directly; an employer can also apply with the
                  applicant’s consent.{' '}
                  <a href="/apply/individual">
                    Apply for a Basic check <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
            </details>
              <details className="faq-item">
                <summary>
                  <span>Who can request higher-level checks?</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="faq-content">
                  <p>
                    No. These checks are limited to roles that meet the legal eligibility criteria. The
                    recruiting organisation should confirm the correct level for the role.
                  </p>
                </div>
              </details>
                <details className="faq-item">
                  <summary>
                    <span>Where can I get application help?</span>
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-content">
                    <p>
                      Contact the DBS-Express team for support with choosing a check or completing an
                      application.{' '}
                      <a href="/contact">
                        Contact DBS-Express <span aria-hidden="true">↗</span>
                      </a>
                    </p>
                  </div>
                </details>
              </div>
            </section>
            )
}

            function NextStepsSection() {
  return (
            <section className="next-steps-section section-pad reveal-on-scroll" id="contact" aria-labelledby="next-steps-title">
              <div>
                <p className="eyebrow"><span /> CONTACT &amp; SUPPORT</p>
                <h2 id="next-steps-title">Have questions or need help?</h2>
                <p className="next-steps-copy">
                  Speak with our UK team directly on <strong>01254 432655</strong> (9am–5pm, Mon–Fri) or email <strong>contact@dbs-express.co.uk</strong>.
                </p>
              </div>
              <div className="next-steps-actions">
                <a className="button button-primary" href="/contact">
                  Contact support <span aria-hidden="true">→</span>
                </a>
                <a className="button button-secondary" href="/apply">
                  Start an application <span aria-hidden="true">→</span>
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
                  <DBSStatsSection />
                  <div className="dbs-turnaround-source-wrap section-pad">
                      <details className="dbs-turnaround-details">
                        <summary>
                          <span>More about processing times</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-content">
                          <p>DBS controls processing. Some applications need additional checks or police enquiries.</p>
                        </div>
                      </details>
                      <a className="dbs-turnaround-source" href={dbsPerformanceUrl} target="_blank" rel="noreferrer">
                        DBS performance and annual report <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                  </div>
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
