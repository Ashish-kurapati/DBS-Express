import { useEffect } from 'react'
import { dbsPerformanceUrl, pricingTiers } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { WorkflowSection } from '../components/WorkflowSection'
import { DBSStatsSection } from '../components/DBSStatsSection'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'
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
        <p className="eyebrow"><span /> DBS CHECKS &amp; CLEARANCE</p>
        <h1 id="hero-title">
          DBS checks, <span className="text-accent">done fast.</span>
        </h1>
        <p className="hero-tagline">Verify smarter. Move faster. Trust better.</p>
        <p className="hero-description">
          Simple online DBS checks for individuals and organisations. Choose the right check, apply securely and follow your application.
        </p>

        {/* ── 3 Icon-led Benefits ── */}
        <ul className="hero-benefits" aria-label="Key service benefits">
          <li className="hero-benefit-item" style={{ '--benefit-delay': '100ms' } as React.CSSProperties}>
            <span className="hero-benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="7" />
                <polyline points="10 6 10 10 13 12" />
              </svg>
            </span>
            <span>Most Basic checks back in 2 days</span>
          </li>
          <li className="hero-benefit-item" style={{ '--benefit-delay': '200ms' } as React.CSSProperties}>
            <span className="hero-benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="14" height="12" rx="2" />
                <polyline points="7 10 9 12 13 8" />
              </svg>
            </span>
            <span>Track your check online</span>
          </li>
          <li className="hero-benefit-item" style={{ '--benefit-delay': '300ms' } as React.CSSProperties}>
            <span className="hero-benefit-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h3l1.5 3-2 1.5a10 10 0 0 0 4 4L12 11.5l3 1.5v3c0 .6-.4 1-1 1A14 14 0 0 1 3 5c0-.6.4-1 1-1z" />
              </svg>
            </span>
            <span>Real people on the phone, 9–5</span>
          </li>
        </ul>
        <p className="hero-turnaround-note">Turnaround times are service targets, not guarantees.</p>

        {/* ── Hero pricing ── */}
        <div className="hero-pricing" aria-label="Starting prices">
          <div className="hero-pricing__row">
            <div className="hero-pricing__item">
              <span className="hero-pricing__label">Basic checks from</span>
              <span className="hero-pricing__amount">{startingPrices.basicStandard}</span>
            </div>
            <div className="hero-pricing__divider" aria-hidden="true" />
            <div className="hero-pricing__item">
              <span className="hero-pricing__label">Enhanced checks from</span>
              <span className="hero-pricing__amount">{startingPrices.enhanced}</span>
            </div>
          </div>
          <p className="hero-pricing__note">All-in pricing. No hidden fees.</p>
        </div>

        {/* ── Updated CTA Buttons: Start my check (Green) & For employers (White) ── */}
        <div className="hero-actions">
          <a className="button button-primary" href="/apply">
            Start my check <span aria-hidden="true">→</span>
          </a>
          <a className="button button-secondary" href="/employers">
            For employers <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ── Authentic DBS Application & Dashboard Screenshot ── */}
      <div className="hero-media-preview reveal-on-scroll" aria-label="DBS Express application dashboard preview">
        <div className="hero-media-frame">
          <img
            src="/assets/candidate-dashboard.jpg"
            alt="DBS Express applicant compliance and tracking dashboard"
            className="hero-media-img"
            width="800"
            height="520"
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
    <section className="pricing-overview section-pad reveal-on-scroll" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-overview__copy">
        <p className="eyebrow"><span /> PRICING</p>
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
          <details className="dbs-turnaround-details" name="page-details">
            <summary>More about processing times</summary>
            <p>DBS controls processing. Some applications need additional checks or police enquiries.</p>
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
