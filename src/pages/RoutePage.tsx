import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { basicApplicationUrl, dbsEligibilityUrl, dbsPerformanceUrl, dbsUmbrellaDirectoryUrl, digitalIdPricing, googleFontsPrivacyUrl, individualApplicationUrl, pricingTiers, researchFindings, selfEmployedDbsGuidanceUrl, signUpUrl, volunteerPricing } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { CandidateCheckWorkflow } from '../components/CandidateCheckWorkflow'
import { FloatingStartButton } from '../components/FloatingStartButton'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'

type PageSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  links?: { label: string; href: string }[]
}

const articleSummaries = [
  {
    category: 'Guides',
    readTime: '4 min read',
    date: 'August 10, 2026',
    title: 'DBS Check Levels: Three Types',
    summary: 'Which DBS check does your role or employee require? Learn the key differences and legal guidelines for 2026.',
    path: '/resources/understanding-dbs-check-levels-2026',
  },
  {
    category: 'Compliance',
    readTime: '5 min read',
    date: 'August 05, 2026',
    title: 'How Fast Are DBS Checks Processed?',
    summary: 'Discover current government processing times and tips for avoiding delays with your DBS application.',
    path: '/resources/how-fast-are-dbs-checks-processed',
  },
  {
    category: 'Legal',
    readTime: '6 min read',
    date: 'July 28, 2026',
    title: 'Protect Candidate DBS Records',
    summary: 'Important legal rules every employer must follow when managing DBS certificate information.',
    path: '/resources/gdpr-and-criminal-record-checks',
  },
  {
    category: 'Guides',
    readTime: '4 min read',
    date: 'July 15, 2026',
    title: 'The DBS Update Service',
    summary: 'Learn how registering certificates on the DBS Update Service saves time and money on annual checks.',
    path: '/resources/dbs-update-service-explained',
  },
]

const faqItems = [
  ['How do DBS check levels differ?', 'Each level can show different information, and Standard and Enhanced checks are only available for roles that meet legal eligibility requirements.'],
  ['Can I apply for Basic?', 'Yes. A person can apply for a Basic check directly; an employer can also apply with the applicant’s consent.'],
  ['Who can request higher-level checks?', 'No. These checks are limited to roles that meet the legal eligibility criteria. The recruiting organisation should confirm the correct level for the role.'],
  ['Can I apply without an employer?', 'Yes. Any individual in England or Wales can request a Basic DBS check for themselves online without employer sponsorship.'],
  ['Which ID documents do I need?', 'You will need a valid Passport or Photocard Driving Licence, plus proof of address such as a bank statement or utility bill issued within the last 3 months.'],
  ['How long do DBS checks take?', 'DBS publishes service targets by check level. See the targets and timing disclaimer on the homepage.'],
  ['Will I get a paper certificate?', 'Yes. An official DBS paper certificate is dispatched by post to your home address, and a digital summary is accessible online.'],
  ['What is the Update Service?', 'The DBS Update Service allows you to keep your certificate up to date online for £13/year, letting future employers check your status instantly.'],
  ['Where can I get application help?', 'Contact the DBS-Express team for support with choosing a check or completing an application.'],
]

const digitalIdDisclosure = `Digital ID verification is required for every employer-portal DBS application and is included in the prices above: ${digitalIdPricing.governmentFee} government fee + ${digitalIdPricing.adminFee} administration fee = ${digitalIdPricing.total} per check.`
const volunteerPricingDisclosure = `Only eligible non-remunerated volunteer roles qualify for the waived government fee. For eligible organisation-submitted Standard or Enhanced checks, the total is ${volunteerPricing.governmentFee} government fee + ${volunteerPricing.adminFee} administration fee + ${digitalIdPricing.total} required Digital ID = ${volunteerPricing.total}. Volunteer pricing is available through an organisation only; individuals cannot order a volunteer check through this site. Check eligibility for each role.`
const employerDigitalIdDisclosure = `Digital ID verification is required for every employer-portal DBS application: ${digitalIdPricing.governmentFee} government fee + ${digitalIdPricing.adminFee} administration fee = ${digitalIdPricing.total}, included in the displayed check totals. The external portal order summary should match the all-in prices shown here; contact support if it adds Digital ID again.`

function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <header className="route-page__hero">
      {eyebrow && <p className="eyebrow"><span /> {eyebrow}</p>}
      <h1>{title}</h1>
      <p className="route-page__hero-desc">{description}</p>
    </header>
  )
}

function CtaBand({ title, description, href = '/apply', label = 'Choose an application route' }: { title: string; description: string; href?: string; label?: string }) {
  const external = href.startsWith('http')
  return (
    <section className="route-page__cta section-pad">
      <div>
        <h2>{title}</h2>
        <p className="route-page__cta-desc">{description}</p>
      </div>
      <a className="button button-primary" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {label} <span aria-hidden="true">↗</span>
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </section>
  )
}

function SectionList({ sections, className = '' }: { sections: PageSection[]; className?: string }) {
  return (
    <div className={`route-page__sections${className ? ` ${className}` : ''}`}>
      {sections.map((section) => (
        <details className="route-page__section" key={section.title}>
          <summary>
            <h2>{section.title}</h2>
            <span className="route-page__section-toggle" aria-hidden="true">+</span>
          </summary>
          <div className="route-page__section-content">
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className="bullet-dot" aria-hidden="true">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.links?.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <p key={link.href}>
                  <a href={link.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {link.label} <span aria-hidden="true">↗</span>
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </p>
              )
            })}
          </div>
        </details>
      ))}
    </div>
  )
}

function EmployersPage() {
  return (
    <RouteLayout pageClassName="route-page--employers">
      {/* ── B2B Employer Hero with Portal Preview ── */}
      <header className="employer-hero reveal-on-scroll">
        <div className="employer-hero__content">
          <div className="employer-hero__badge-row">
            <span className="employer-hero__pill">
              <span aria-hidden="true">★</span> Official Registered Umbrella Body
            </span>
            <span className="employer-hero__pill">Fast-Track Verification</span>
            <span className="employer-hero__pill">Secure eBulk Gateway</span>
          </div>

          <p className="eyebrow"><span /> EMPLOYERS</p>
          <h1>DBS checks for employers</h1>
          <p className="employer-hero__desc">
            Order and track candidate checks from one employer portal, with required Digital ID and application progress.
          </p>

          <div className="employer-hero__actions">
            <a
              className="button button-primary"
              href={signUpUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Employer Account <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="button button-secondary" href="#check-levels">
              Compare check levels <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="employer-hero__preview" aria-label="UK employers and HR teams managing background screening">
          <div className="employer-hero__preview-bar">
            <div className="employer-hero__preview-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="employer-hero__preview-label">dbs-express.co.uk/employers</span>
            <span className="employer-hero__preview-label" style={{ opacity: 0.6 }}>eBulk · Registered Body</span>
          </div>
          <img
            src="/assets/employer-meeting.jpg"
            alt="UK business leadership and compliance team conducting applicant background vetting in London overlooking Tower Bridge"
            className="employer-hero__preview-img"
            width="580"
            height="360"
            loading="eager"
          />
        </div>
      </header>

      {/* ── Interactive Candidate Check Workflow ── */}
      <CandidateCheckWorkflow />

      {/* ── Check Level Selection & Criteria ── */}
      <section className="employer-levels-section section-pad reveal-on-scroll" id="check-levels" aria-labelledby="check-levels-title">
        <div className="employer-levels__header">
          <p className="eyebrow"><span /> ELIGIBILITY &amp; SELECTION</p>
          <h2 id="check-levels-title">Choose a check level</h2>
          <p className="employer-levels__intro-p">
            Compare Basic, Standard, and Enhanced eligibility criteria for your candidate roles.
          </p>
          <p className="employer-levels__intro-p">
            Basic DBS checks show unspent convictions and conditional cautions. They are available for any purpose, including employment and personal use. Standard and Enhanced checks require an eligible role and an authorised application route.
          </p>
        </div>

        <div className="employer-levels__grid">
          {/* Basic */}
          <article className="employer-level-card">
            <span className="employer-level-card__badge">Universal</span>
            <h3 className="employer-level-card__title">Basic DBS Check</h3>
            <p className="employer-level-card__eligibility">Any position or role</p>
            <p className="employer-level-card__desc">
              Reveals unspent convictions and conditional cautions. Available for any purpose, including employment and personal use.
            </p>
            <div className="employer-level-card__footer">
              <span>Consent required · Fast digital result</span>
            </div>
          </article>

          {/* Standard */}
          <article className="employer-level-card">
            <span className="employer-level-card__badge">Specified Roles</span>
            <h3 className="employer-level-card__title">Standard DBS Check</h3>
            <p className="employer-level-card__eligibility">Eligible positions under ROA 1974</p>
            <p className="employer-level-card__desc">
              Shows relevant spent and unspent convictions and cautions subject to statutory filtering rules. Requires an eligible organisation route.
            </p>
            <div className="employer-level-card__footer">
              <span>Financial, security &amp; court roles</span>
            </div>
          </article>

          {/* Enhanced */}
          <article className="employer-level-card">
            <span className="employer-level-card__badge">Regulated Activity</span>
            <h3 className="employer-level-card__title">Enhanced DBS Check</h3>
            <p className="employer-level-card__eligibility">Regulated activity &amp; vulnerable groups</p>
            <p className="employer-level-card__desc">
              Includes Standard-level information plus relevant police force intelligence, with optional Children’s or Adults’ Barred List checks.
            </p>
            <div className="employer-level-card__footer">
              <span>Healthcare, education &amp; care roles</span>
            </div>
          </article>
        </div>

        {/* Preserved Volunteer Pricing Disclosure */}
        <div className="employer-volunteer-banner" role="region" aria-label="Volunteer check pricing disclosure">
          <div className="employer-volunteer-banner__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="employer-volunteer-banner__content">
            <h3>Volunteer role pricing</h3>
            <p>{volunteerPricingDisclosure}</p>
          </div>
        </div>
      </section>

      {/* ── Workforce Compliance Tools ── */}
      <section className="employer-tools-section section-pad reveal-on-scroll" aria-labelledby="compliance-tools-title">
        <div className="employer-tools__header">
          <p className="eyebrow"><span /> WORKFORCE COMPLIANCE</p>
          <h2 id="compliance-tools-title">Workforce compliance tools</h2>
          <p>
            Integrated screening, verification, and candidate management capabilities built for high-volume recruitment.
          </p>
        </div>

        <div className="employer-tools__grid">
          {/* Tool 1 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">Free Right to Work Checks</h3>
            <p className="employer-tool-card__desc">
              Fully compliant UK Home Office Right to Work checks provided at zero extra cost alongside candidate DBS applications.
            </p>
          </article>

          {/* Tool 2 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M9 14h6" />
                <path d="M9 18h6" />
                <path d="M9 10h1" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">Automated Reference Checks (£2.95)</h3>
            <p className="employer-tool-card__desc">
              Hands-off referee management with automated chase reminders.
            </p>
          </article>

          {/* Tool 3 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="M15 8h2" />
                <path d="M15 12h2" />
                <path d="M7 16h10" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">Required Digital ID Verification</h3>
            <p className="employer-tool-card__desc">
              {employerDigitalIdDisclosure}
            </p>
          </article>

          {/* Tool 4 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">Flexible Payment Splitting</h3>
            <p className="employer-tool-card__desc">
              Configure whether your organisation pays 100%, splits costs, or has the candidate pay.
            </p>
          </article>

          {/* Tool 5 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">Role-Based Team Access</h3>
            <p className="employer-tool-card__desc">
              Assign Company Admins and departmental Evidence Checkers.
            </p>
          </article>

          {/* Tool 6 */}
          <article className="employer-tool-card">
            <div className="employer-tool-card__icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="employer-tool-card__title">One-Click Excel Reports</h3>
            <p className="employer-tool-card__desc">
              Export compliance matrices and candidate progress trackers directly to Excel.
            </p>
          </article>
        </div>
      </section>

      {/* ── Conversion Band ── */}
      <CtaBand
        title="Set up your employer account"
        description="Create an organisation account to manage candidates and checks online."
        href={signUpUrl}
        label="Open Employer Account"
      />
    </RouteLayout>
  )
}

function IndividualsPage() {
  return (
    <RouteLayout pageClassName="route-page--individuals">
      {/* ── Individuals Hero ── */}
      <header className="individual-hero reveal-on-scroll">
        <div className="individual-hero__content">
          <p className="eyebrow"><span /> INDIVIDUALS</p>
          <h1>Apply for your own DBS check</h1>
          <p className="individual-hero__desc">
            Compare Basic and eligible Enhanced routes. No organisation account required.
          </p>

          <div className="individual-hero__trust-strip">
            <span className="individual-hero__trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Direct Personal Application
            </span>
            <span className="individual-hero__trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Official DBS Certificate
            </span>
            <span className="individual-hero__trust-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              No Employer Sponsorship Required
            </span>
          </div>
        </div>

        <div className="individual-hero__visual" aria-label="Individual applicant completing DBS verification">
          <img
            src="/assets/individual-applicant.jpg"
            alt="Individual applicant in consultation for personal DBS criminal record check"
            className="individual-hero__img"
            width="520"
            height="346"
            loading="eager"
          />
        </div>
      </header>

      {/* ── Step-by-Step Journey & Preparation ── */}
      <section className="individual-steps-section section-pad reveal-on-scroll" aria-labelledby="individual-journey-title">
        <div className="individual-steps__header">
          <p className="eyebrow"><span /> PROCESS</p>
          <h2 id="individual-journey-title">Your check in three steps</h2>
          <p>Simple, transparent online verification designed for personal applicants.</p>
        </div>

        {/* Document Preparation Checklist */}
        <div className="individual-ready-card" role="region" aria-label="Documents required for individual check">
          <div className="individual-ready-card__left">
            <h3>Have these ready</h3>
            <p>Gather your information beforehand to complete your application in under 5 minutes.</p>
          </div>
          <ul className="individual-ready-card__list">
            <li className="individual-ready-card__item">
              <span className="individual-ready-card__check" aria-hidden="true">✓</span>
              <span>Last five years of addresses</span>
            </li>
            <li className="individual-ready-card__item">
              <span className="individual-ready-card__check" aria-hidden="true">✓</span>
              <span>Passport or driving licence</span>
            </li>
            <li className="individual-ready-card__item">
              <span className="individual-ready-card__check" aria-hidden="true">✓</span>
              <span>National Insurance number, if available</span>
            </li>
          </ul>
        </div>

        {/* 3 Step Timeline */}
        <div className="individual-journey-grid">
          <article className="individual-step-card">
            <div className="individual-step-card__top">
              <span className="individual-step-card__num">Step 01</span>
            </div>
            <h3 className="individual-step-card__title">Fill in your details</h3>
            <p className="individual-step-card__desc">
              Enter your personal information and address history.
            </p>
          </article>

          <article className="individual-step-card">
            <div className="individual-step-card__top">
              <span className="individual-step-card__num">Step 02</span>
            </div>
            <h3 className="individual-step-card__title">Verify your ID</h3>
            <p className="individual-step-card__desc">
              Complete the identity check requested by the provider.
            </p>
          </article>

          <article className="individual-step-card">
            <div className="individual-step-card__top">
              <span className="individual-step-card__num">Step 03</span>
            </div>
            <h3 className="individual-step-card__title">Get your certificate</h3>
            <p className="individual-step-card__desc">
              DBS sends the certificate to you by post.
            </p>
          </article>
        </div>

        <div className="individual-steps__cta-wrap">
          <a className="button button-primary" href="/apply/individual">
            Apply for my own check <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ── Individual Check Pricing ── */}
      <section className="individual-pricing-section section-pad reveal-on-scroll" aria-labelledby="individual-pricing-title">
        <div className="individual-pricing-header">
          <p className="eyebrow"><span /> PRICING</p>
          <h2 id="individual-pricing-title">Individual check pricing</h2>
          <p className="individual-pricing-subtitle">
            Clear, upfront pricing with all government and administration fees included.
          </p>
        </div>

        <div className="individual-pricing-grid">
          {/* Card 1: Basic DBS Check */}
          <article className="individual-price-card">
            <div className="individual-price-card__badge-row">
              <span className="individual-price-card__badge">DIRECT APPLICATION</span>
            </div>
            <h3 className="individual-price-card__title">Basic DBS Check</h3>
            <p className="individual-price-card__desc">
              Official criminal record check showing unspent convictions and conditional cautions.
            </p>
            <div className="individual-price-card__price-wrap">
              <span className="individual-price-card__currency">£</span>
              <span className="individual-price-card__amount">42</span>
              <span className="individual-price-card__period">total per check</span>
            </div>
            <p className="individual-price-card__breakdown">
              £20.00 government fee + £22.00 administration fee
            </p>
            <a
              className="button button-primary individual-price-card__cta"
              href="/apply/individual"
            >
              Apply for Basic check <span aria-hidden="true">→</span>
            </a>
          </article>

          {/* Card 2: Digital ID Verification */}
          <article className="individual-price-card">
            <div className="individual-price-card__badge-row">
              <span className="individual-price-card__badge individual-price-card__badge--neutral">ID ADD-ON</span>
            </div>
            <h3 className="individual-price-card__title">Digital ID Verification</h3>
            <p className="individual-price-card__desc">
              Fast online identity check completed on your smartphone without posting documents.
            </p>
            <div className="individual-price-card__price-wrap">
              <span className="individual-price-card__currency">£</span>
              <span className="individual-price-card__amount">6.50</span>
              <span className="individual-price-card__period">per applicant</span>
            </div>
            <p className="individual-price-card__breakdown">
              Identity verification add-on · Requirements verified during application
            </p>
            <a
              className="button button-primary individual-price-card__cta"
              href="/apply/individual"
            >
              Verify ID online <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>

        <p className="individual-pricing-govuk-note">
          Applying directly on GOV.UK? Basic checks are £20.00 directly through GOV.UK without an administration fee.{' '}
          <a href={basicApplicationUrl} target="_blank" rel="noreferrer">
            Apply on GOV.UK <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </section>

      {/* ── Eligibility Guidance ── */}
      <section className="individual-eligibility-v2 section-pad reveal-on-scroll" aria-labelledby="individual-eligibility-title">
        <div className="individual-eligibility-v2__header">
          <p className="eyebrow"><span /> ELIGIBILITY</p>
          <h2 id="individual-eligibility-title">Which DBS check can you apply for?</h2>
          <p>
            Legal criteria determine which check type you can request directly.
          </p>
        </div>

        <div className="individual-eligibility-v2__grid">
          {/* Card 1 */}
          <article className="individual-eligibility-card">
            <div className="individual-eligibility-card__top">
              <div className="individual-eligibility-card__icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="individual-eligibility-card__status">Available now</span>
            </div>
            <h3 className="individual-eligibility-card__title">Individuals: Basic</h3>
            <p className="individual-eligibility-card__desc">
              Individuals can apply for Basic DBS checks.
            </p>
            <a className="individual-eligibility-card__action" href="/apply/individual">
              Start Basic application <span aria-hidden="true">→</span>
            </a>
          </article>

          {/* Card 2 */}
          <article className="individual-eligibility-card">
            <div className="individual-eligibility-card__top">
              <div className="individual-eligibility-card__icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className="individual-eligibility-card__status individual-eligibility-card__status--neutral">Role dependent</span>
            </div>
            <h3 className="individual-eligibility-card__title">Self-employed: Enhanced may be possible</h3>
            <p className="individual-eligibility-card__desc">
              Enhanced checks may be available depending on the role and eligibility requirements.
            </p>
            <a className="individual-eligibility-card__action" href="/self-employed">
              Read guidance <span aria-hidden="true">→</span>
            </a>
          </article>

          {/* Card 3 */}
          <article className="individual-eligibility-card">
            <div className="individual-eligibility-card__top">
              <div className="individual-eligibility-card__icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                </svg>
              </div>
              <span className="individual-eligibility-card__status individual-eligibility-card__status--neutral">Organisation required</span>
            </div>
            <h3 className="individual-eligibility-card__title">Employers: All three</h3>
            <p className="individual-eligibility-card__desc">
              Employers can request Basic, Standard and Enhanced checks where the role is eligible.
            </p>
            <a className="individual-eligibility-card__action" href="/employers">
              See employer options <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </section>

      {/* ── Conversion Band ── */}
      <CtaBand
        title="Continue your application"
        description="Basic and eligible Enhanced checks are available through the supported personal application route."
        href="/apply/individual"
        label="Apply for my own check"
      />
    </RouteLayout>
  )
}

function ApplicationChoicePage() {
  return <RouteLayout pageClassName="route-page--application-choice">
    <PageHero
      eyebrow="APPLICATIONS"
      title="Choose your application route"
      description="Choose whether you are applying for your own check or registering an organisation to manage checks."
    />
    <div className="application-choice-grid section-pad">
      <section className="application-choice-card application-choice-card--individual">
        <p className="eyebrow"><span /> INDIVIDUALS</p>
        <h2>Applying for yourself?</h2>
        <p>Apply for a Basic or eligible Enhanced check. No organisation account needed.</p>
        <a className="button button-primary" href="/apply/individual">
          Apply for my own check <span aria-hidden="true">→</span>
        </a>
      </section>
      <section className="application-choice-card application-choice-card--employer">
        <p className="eyebrow"><span /> EMPLOYERS</p>
        <h2>Registering as an employer?</h2>
        <p>Create an organisation account to manage DBS checks for employees, candidates, and eligible volunteers.</p>
        <a className="button button-secondary" href={signUpUrl} target="_blank" rel="noreferrer">
          Register my organisation <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
    </div>
  </RouteLayout>
}

function IndividualApplicationPage() {
  return (
    <RouteLayout pageClassName="route-page--individual-application">
      <PageHero
        eyebrow="INDIVIDUAL APPLICATION"
        title="Apply for your own DBS check"
        description="Continue to the personal application service for Basic and eligible Enhanced checks."
      />
      <div className="individual-application-options section-pad">
        <article className="individual-app-option-card">
          <h2>Basic or eligible Enhanced</h2>
          <p>
            The supported individual service provides the personal application form and explains the
            checks available to you. Its published prices include digital identity and address checks.
          </p>
          <a
            className="button button-primary"
            href={individualApplicationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Continue to individual DBS service <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
        <article className="individual-app-option-card">
          <h2>Apply directly on GOV.UK</h2>
          <p>
            For a Basic DBS check only, you can also apply directly through GOV.UK for the £20
            government fee, without a provider administration fee.
          </p>
          <a
            className="button button-secondary"
            href={basicApplicationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Apply for a Basic check on GOV.UK <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
      </div>
    </RouteLayout>
  )
}

function PricingTable({ enhanced = false }: { enhanced?: boolean }) {
  const rows = pricingTiers.map((tier) => ({
    tier: tier.tier,
    volume: tier.volume,
    governmentFee: enhanced ? tier.enhancedGovernmentFee : tier.basicStandardGovernmentFee,
    adminFee: enhanced ? tier.enhancedAdminFee : tier.basicStandardAdminFee,
    digitalIdFee: digitalIdPricing.total,
    total: enhanced ? tier.enhanced : tier.basicStandard,
  }))

  return (
    <div className="route-table-wrap" aria-label={`${enhanced ? 'Enhanced' : 'Basic and Standard'} DBS pricing`}>
      <table className="route-table">
        <thead>
          <tr>
            <th scope="col">Volume Tier</th>
            <th scope="col">Annual Volume</th>
            <th scope="col">Government Fee</th>
            <th scope="col">Admin Fee</th>
            <th scope="col">Required Digital ID</th>
            <th scope="col" className="route-table__total-heading">Total to Client</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.tier}>
              <td className="route-table__volume-tier">
                <span className="route-table__compact-volume">{row.tier} · {row.volume}</span>
                <span className="route-table__desktop-volume">{row.tier}</span>
              </td>
              <td>{row.volume}</td>
              <td data-label="Government Fee">{row.governmentFee}</td>
              <td data-label="Admin Fee">{row.adminFee}</td>
              <td data-label="Required Digital ID">{row.digitalIdFee}</td>
              <td className="route-table__total" data-label="Total to Client">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PricingPage() {
  return <RouteLayout pageClassName="route-page--pricing">
    <PageHero eyebrow="PRICING" title="Official DBS check prices" description="All-in prices include government fees, administration, and required Digital ID. No subscription charges." />
    <div className="route-page__pricing section-pad">
      <section className="route-price-card">
        <h2>DBS check prices</h2>
        <p>Government fees, administration, and required Digital ID included in every check tier.</p>
        <div className="pricing-tables-stack">
          <div className="pricing-table-block">
            <h3>Basic &amp; Standard checks</h3>
            <p className="pricing-table-subtitle">Annual volume pricing for organisations. Digital ID included.</p>
            <PricingTable />
          </div>
          <div className="pricing-table-block">
            <h3>Enhanced checks</h3>
            <p className="pricing-table-subtitle">For eligible roles only. Digital ID included.</p>
            <PricingTable enhanced />
          </div>
        </div>
      </section>
      <SectionList className="pricing-billing-panel" sections={[{ title: 'Pricing & billing details', bullets: ['Each total combines the official DBS government fee, administration fee, and required Digital ID fee.', 'Basic and Standard administration fees decrease with annual submission volume, from £17.70 in Tier 1 to £14.10 in Tier 3.', 'Employers can choose whether the business covers 100% of the check fee, splits a designated percentage with the applicant, or has the applicant pay directly.', volunteerPricingDisclosure, digitalIdDisclosure] }]} />
    </div>
    <CtaBand title="Ready to start?" description="Choose an application route to submit checks and manage applicants." />
  </RouteLayout>
}

function ResourcesPage() {
  return (
    <RouteLayout pageClassName="route-page--resources">
      <PageHero
        eyebrow="RESOURCES &amp; RESEARCH"
        title="Resources, research and guides"
        description="Official guidance, industry benchmarks and articles about DBS checks in England and Wales."
      />

      <section className="resources-research-section section-pad" aria-labelledby="resources-research-title">
        <div className="resources-research-header">
          <p className="eyebrow"><span /> RESEARCH &amp; INSIGHTS</p>
          <h2 id="resources-research-title">Facts for better hiring</h2>
          <p className="resources-research-desc">Evidence on screening, identity, and fair hiring from official and industry sources.</p>
        </div>

        <div className="resources-research-grid">
          {researchFindings.map((finding) => (
            <article className="resources-research-card" key={finding.category}>
              <div className="resources-research-card__header">
                <span className="resources-research-card__tag">{finding.category}</span>
                <span className="resources-research-card__metric">{finding.metric}</span>
              </div>
              <h3 className="resources-research-card__title">{finding.title}</h3>
              <p className="resources-research-card__label">{finding.metricLabel}</p>
              <a
                className="resources-research-card__link"
                href={finding.href}
                target="_blank"
                rel="noreferrer"
              >
                Read official source <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-list-section section-pad" aria-labelledby="resources-articles-title">
        <div className="resources-research-header">
          <p className="eyebrow"><span /> GUIDES &amp; ARTICLES</p>
          <h2 id="resources-articles-title">DBS guidance library</h2>
          <p className="resources-research-desc">Key updates, turnaround time benchmarks and compliance obligations.</p>
        </div>
        <div className="resource-list">
          {articleSummaries.map((article) => (
            <article className="resource-card" key={article.path}>
              <div className="resource-card__meta">
                <span>{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h2>
                <a href={article.path}>{article.title}</a>
              </h2>
              <p>{article.summary}</p>
              <div className="resource-card__footer">
                <span>{article.date}</span>
                <a href={article.path}>Read article →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </RouteLayout>
  )
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articleSummaries.find((item) => item.path.endsWith(slug)) ?? articleSummaries[0]
  const isFirstArticle = article.path.endsWith('understanding-dbs-check-levels-2026')
  return (
    <RouteLayout pageClassName={`route-page--article${isFirstArticle ? '' : ' route-page--article-summary'}`}>
      <article className="route-article section-pad">
        <a className="route-article__back" href="/resources">← Back to Resources</a>
        <PageHero
          eyebrow={article.category}
          title={article.title}
          description={`${article.date} · DBS-Express compliance team · ${article.readTime}`}
        />
        <div className="route-article__body">
          <div className="route-article__body-content">
            <p className="route-article__lead">
              {isFirstArticle
                ? 'Navigating Disclosure and Barring Service (DBS) requirements can feel complex. This guide breaks down essential rules for employers and applicants in England and Wales.'
                : article.summary}
            </p>
            {isFirstArticle ? (
              <>
                <h2>Key regulatory guidelines</h2>
                <p>
                  When conducting criminal record checks in England and Wales, organisations must ensure
                  they hold a lawful basis for requesting information. Requesting an Enhanced check for an
                  ineligible role is an offence under the Rehabilitation of Offenders Act 1974.
                </p>
                <h2>Best practices for onboarding</h2>
                <ul>
                  <li>
                    <span className="bullet-dot" aria-hidden="true">•</span>
                    <span>Verify original ID documents in person or via approved digital identity service providers (IDSPs).</span>
                  </li>
                  <li>
                    <span className="bullet-dot" aria-hidden="true">•</span>
                    <span>Maintain clear written policies on the recruitment of ex-offenders.</span>
                  </li>
                  <li>
                    <span className="bullet-dot" aria-hidden="true">•</span>
                    <span>Ensure DBS certificate data is stored securely and destroyed in line with your retention schedule.</span>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h2>Source content status</h2>
                <p>
                  The reference listing provides the summary shown above. The full source article body was not
                  independently available during this audit, so no additional wording has been invented here.
                </p>
              </>
            )}
          </div>
        </div>
      </article>
      <CtaBand
        title="Need advice for your organisation?"
        description="Our team can help verify which check level your employees legally require under statutory legislation."
        href="/contact"
        label="Contact compliance advisors"
      />
    </RouteLayout>
  )
}

function AboutPage() {
  return (
    <RouteLayout pageClassName="route-page--about">
      <PageHero
        title="About DBS-Express"
        description="DBS-Express is a trading name of Talaty Group Ltd. Find DBS guidance and application routes."
      />
      <SectionList
        sections={[
          {
            title: 'How the service works',
            paragraphs: [
              'This website provides information and directs applicants to external application services. DBS processes and issues DBS certificates.',
            ],
          },
          {
            title: 'Processing partner identity pending',
            paragraphs: [
              'The public website and project materials do not identify the processing partner or provide a verifiable DBS Umbrella Body reference. These details must be confirmed against the official directory before they can be published.',
            ],
            links: [
              {
                label: 'Search the official DBS Umbrella Body directory',
                href: dbsUmbrellaDirectoryUrl,
              },
            ],
          },
          {
            title: 'Customer support',
            paragraphs: [
              'For help choosing a route or using the employer service, contact the DBS-Express team through the contact page.',
            ],
            links: [{ label: 'Contact support', href: '/contact' }],
          },
        ]}
      />
      <CtaBand
        title="Questions about DBS-Express?"
        description="Contact the team for help with routes and service information."
        href="/contact"
        label="Contact support"
      />
    </RouteLayout>
  )
}

function FaqPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () =>
      faqItems.filter(([question, answer]) =>
        `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )
  return (
    <RouteLayout pageClassName="route-page--faq">
      <PageHero
        eyebrow="FAQ"
        title="DBS questions, answered"
        description="Answers about check levels, applications, eligibility, processing, and support."
      />
      <section className="faq-page section-pad">
        <div className="faq-page__search-wrap">
          <label htmlFor="faq-search">Search questions</label>
          <input
            id="faq-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions (e.g., turnaround, ID documents, basic)"
          />
        </div>
        {filtered.length ? (
          <div className="faq-page__list">
            {filtered.map(([question, answer]) => (
              <details key={question} className="faq-page-item">
                <summary>
                  <span>{question}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 4.5L6 8l3.5-3.5" /></svg>
                  </span>
                </summary>
                <div className="faq-content">
                  <p>{answer}</p>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="faq-page__empty">No questions matched your search.</p>
        )}
      </section>
    </RouteLayout>
  )
}

function ContactPage() {
  return <RouteLayout pageClassName="route-page--contact">
    <PageHero eyebrow="CONTACT" title="Get in touch" description="Direct telephone, email, and postal channels for individual and employer support." />
    <div className="contact-grid section-pad">
      <article className="contact-card">
        <p className="eyebrow"><span /> TELEPHONE SUPPORT</p>
        <h2>01254 432655</h2>
        <p>Lines open Monday to Friday, 9:00am – 5:00pm. Direct access to our UK team for questions on check levels and registration.</p>
        <a className="button button-primary" href="tel:01254432655">Call 01254 432655</a>
      </article>

      <article className="contact-card">
        <p className="eyebrow"><span /> EMAIL ENQUIRIES</p>
        <h2>contact@dbs-express.co.uk</h2>
        <p>Email our dedicated support desk. We respond Monday through Friday, usually within 24 hours.</p>
        <a className="button button-secondary" href="mailto:contact@dbs-express.co.uk">Send an email</a>
      </article>

      <article className="contact-card">
        <p className="eyebrow"><span /> REGISTERED OFFICE</p>
        <h2>Talaty Group Ltd</h2>
        <p>London, United Kingdom. Registered in England &amp; Wales. Providing compliant DBS processing nationwide.</p>
      </article>
    </div>
    <SectionList sections={[{ title: 'Existing application updates', paragraphs: ['If you have already submitted an application through our platform, please log in directly to your dashboard to view real-time tracking updates.', 'Official paper certificates are dispatched by DBS directly to the applicant’s home address upon completion.'] }]} />
    <CtaBand title="Ready to apply?" description="Choose the personal application route or register your organisation." href="/apply" label="Choose an application route" />
  </RouteLayout>
}

function MaintenancePage() {
  return <RouteLayout pageClassName="route-page--maintenance">  <PageHero eyebrow="SERVICE STATUS" title="System status and maintenance" description="Check the published service status and maintenance information." /><SectionList sections={[{ title: 'Core services status', bullets: ['DBS-Express Web Portal — Operational', 'eBulk Application Submission Gateway — Operational', 'ID Document Verification Engine — Operational', 'Barred List Query System — Operational', 'Payment Processing (Stripe/Bank) — Operational'] }, { title: 'Routine maintenance', paragraphs: ['Standard DBS eBulk gateway maintenance is scheduled during off-peak Sunday mornings (02:00 – 06:00 GMT). Submissions made during maintenance windows are securely queued and processed immediately when services resume.', 'Support desk: 01254 432655 (Lines open 9am–5pm, Mon–Fri) · contact@dbs-express.co.uk'] }]} /><CtaBand title="Report a service issue" description="Contact the team about access, submission status, or service availability." href="/contact" label="Report an Issue" /></RouteLayout>
}

function OfflinePage() {
  return <RouteLayout pageClassName="route-page--offline"><PageHero eyebrow="CONNECTIVITY SUPPORT" title="Connection and offline help" description="Troubleshoot connection issues while browsing DBS guidance or applying for a check." /><SectionList sections={[{ title: 'Connection status', paragraphs: ['Your browser is able to reach DBS-Express services normally.'] }, { title: 'Troubleshooting steps', bullets: ['Check Wi-Fi or Cellular — Verify your router signal or toggle mobile data off and on. Ensure airplane mode is disabled.', 'Corporate VPNs & Firewalls — Workplace networks occasionally filter external application portals. Try disconnecting a corporate VPN or contacting your network admin.', 'Reload or Clear Cache — Press Ctrl+F5 (or Cmd+Shift+R on Mac) to bypass cached pages and initiate a fresh handshake with our servers.', 'Government Gateway Status — The Disclosure and Barring Service (DBS eBulk) periodically performs maintenance on weekends or late nights.'] }, { title: 'Urgent offline support', paragraphs: ['Call our support team. We can assist with verification or application dispatch by phone: 01254 432655.'] }]} /></RouteLayout>
}

function TeamPage() {
  return <RouteLayout pageClassName="route-page--how-we-work">
    <PageHero eyebrow="HOW WE WORK" title="How we work" description="Understand check eligibility, choose an application route, and contact support when you need help." />
    <div className="how-we-work-grid section-pad">
      <article><span aria-hidden="true">01</span><h2>Start with eligibility</h2><p>Check the role against official DBS guidance before choosing a check level.</p><a href={dbsEligibilityUrl} target="_blank" rel="noreferrer">Read GOV.UK guidance <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></article>
      <article><span aria-hidden="true">02</span><h2>Choose your route</h2><p>Individuals and employers use separate application routes on this website.</p><a href="/apply">Choose an application route <span aria-hidden="true">→</span></a></article>
      <article><span aria-hidden="true">03</span><h2>Ask for support</h2><p>Contact the DBS-Express team for questions about site information and employer access.</p><a href="/contact">Contact support <span aria-hidden="true">→</span></a></article>
      <article><span aria-hidden="true">04</span><h2>DBS service targets</h2><p>Published processing targets are not guarantees. DBS controls processing and extra checks can take longer.</p><a href={dbsPerformanceUrl} target="_blank" rel="noreferrer">DBS performance and annual report <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></article>
    </div>
  </RouteLayout>
}

function SelfEmployedPage() {
  return <RouteLayout pageClassName="route-page--self-employed">
    <PageHero eyebrow="SELF-EMPLOYED" title="Self-employed DBS checks" description="Eligible people can apply for Enhanced checks through a DBS Umbrella Body." />
    <SectionList sections={[
      { title: 'Eligibility depends on your role', paragraphs: ['The work must meet the legal criteria for an Enhanced or Enhanced with Barred List(s) check. Being self-employed alone does not make a role eligible.', 'Self-employed people and personal employees can apply through a DBS Umbrella Body. If you contract your services to an organisation, it may apply on your behalf under its policies.'] },
      { title: 'Find an umbrella body', paragraphs: ['Use the official directory to find a registered DBS Umbrella Body that processes applications for self-employed people. This website does not process these applications.'], links: [{ label: 'Read GOV.UK guidance for self-employed applicants', href: selfEmployedDbsGuidanceUrl }, { label: 'Find a DBS Umbrella Body on GOV.UK', href: dbsUmbrellaDirectoryUrl }, { label: 'Read official eligibility guidance', href: dbsEligibilityUrl }] },
    ]} />
    <CtaBand title="Check your eligibility" description="Review the legal criteria before contacting an Umbrella Body." href={selfEmployedDbsGuidanceUrl} label="Read GOV.UK guidance" />
  </RouteLayout>
}

function PoliciesPage() {
  return <RouteLayout pageClassName="route-page--policies"><PageHero eyebrow="LEGAL & COMPLIANCE" title="Company policies" description="Policy documents and compliance information linked from the DBS-Express reference website." /><SectionList sections={[{ title: 'Policy library', bullets: ['Information Handling Policy for Information Provided By DBS — How we manage information received directly from the Disclosure and Barring Service.', 'Talaty Group Ltd DBS eBulk Data Retention Policy — Data retention periods and practices for eBulk DBS processing.', 'Privacy Policy — How we collect, use, and protect your personal data.', 'Data Protection — Our data protection obligations and your rights under UK GDPR.', 'Terms & Conditions — Terms governing the use of DBS-Express services.'] }, { title: 'Source status', paragraphs: ['The reference website links some policy documents to the external DBS-Express application portal. Those documents are not reproduced here without independently verifying their full legal wording.'] }]} /><CtaBand title="Need a policy document?" description="Contact the DBS-Express team for the current policy or compliance document relevant to your query." href="/contact" label="Contact support" /></RouteLayout>
}

function PrivacyPage() {
  return <RouteLayout pageClassName="route-page--privacy"><PageHero eyebrow="LEGAL" title="Privacy policy" description="How this website handles information and connects you to external services." /><SectionList sections={[
    { title: 'Information on this site', paragraphs: ['Contact enquiries may include the information you choose to provide. Application forms are hosted by external services linked from this website.'] },
    { title: 'External application services', paragraphs: ['Information entered on an external application service is handled under that service’s own privacy information. Review it before submitting personal details.'] },
    { title: 'Cookie information', paragraphs: ['This website’s cookie and browser-storage practices are described separately.'], links: [{ label: 'Read the Cookie Policy', href: '/cookie-policy' }] },
  ]} /></RouteLayout>
}

function CookiePolicyPage() {
  return <RouteLayout pageClassName="route-page--cookie-policy">
    <PageHero eyebrow="PRIVACY" title="Cookie policy" description="What this website stores, what it does not, and how to manage it." />
    <SectionList sections={[
      { title: 'Cookies and tracking on this website', paragraphs: ['The live public website does not set cookies or use analytics or advertising tags, tracking pixels, or similar tracking technologies. It does not provide a cookie preference manager.'] },
      { title: 'Browser storage', paragraphs: ['The live public website does not read or write localStorage or sessionStorage. Your browser may use its own cache to load site resources; this is managed by your browser.'] },
      { title: 'External services and fonts', paragraphs: ['The site requests the Inter font from Google Fonts. Google may receive technical connection information, such as your IP address and browser details, when that request is made. Links to GOV.UK and application services leave this website; those providers control their own cookies and tracking.'], links: [{ label: 'Google Privacy Policy', href: googleFontsPrivacyUrl }] },
      { title: 'Managing cookies', paragraphs: ['Use your browser settings to review, block, or delete cookies and cached site data. Blocking third-party requests may affect externally hosted fonts or services.'], links: [{ label: 'Read the Privacy Policy', href: '/privacy-policy' }] },
    ]} />
  </RouteLayout>
}

function TermsPage() {
  return <RouteLayout pageClassName="route-page--terms"><PageHero eyebrow="LEGAL" title="Terms & conditions" description="Last updated: August 2026" /><SectionList sections={[{ title: 'Agreement', paragraphs: ['Welcome to DBS-Express, operated by Talaty Group Ltd. By accessing our site or using our services, you agree to these Terms and Conditions.'] }, { title: '1. Scope of service', paragraphs: ['DBS-Express provides guidance and links to application services. DBS processes applications and issues DBS certificates. The public website does not identify the umbrella body used for employer submissions; its identity and reference must be verified before they are stated.'] }, { title: '2. User responsibilities', paragraphs: ['Users and employers must ensure they hold the necessary legal entitlement to request criminal record checks under the Rehabilitation of Offenders Act 1974.'] }]} /></RouteLayout>
}

function NotFoundPage({ path }: { path: string }) {
  return <RouteLayout pageClassName="route-page--not-found"><PageHero eyebrow="404" title="Page not found" description={`We could not find ${path}.`} /><section className="route-page__notice section-pad"><h2>Try another destination</h2><p>Use the main navigation to find DBS guidance, support, resources, and company information.</p><div className="route-page__actions"><a className="button button-primary" href="/">Return home</a><a className="button button-secondary" href="/contact">Contact support</a></div></section></RouteLayout>
}

function RouteLayout({ children, pageClassName = '' }: { children: ReactNode; pageClassName?: string }) {
  const mainRef = useScrollRevealContainer<HTMLElement>()
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" ref={mainRef} className={`route-page${pageClassName ? ` ${pageClassName}` : ''}`}>
        {children}
      </main>
      <SiteFooter />
      <FloatingStartButton />
    </div>
  )
}

export function RoutePage({ pathname }: { pathname: string }) {
  useEffect(() => {
    const labels: Record<string, string> = {
      '/apply': 'Choose an application route',
      '/apply/individual': 'Individual application',
      '/self-employed': 'Self-employed',
      '/employers': 'Employers',
      '/individuals': 'Individuals',
      '/pricing': 'Pricing',
      '/resources': 'Resources',
      '/about': 'About',
      '/faq': 'FAQ',
      '/contact': 'Contact',
      '/maintenance': 'System status',
      '/offline': 'Offline help',
      '/team': 'How we work',
      '/policies': 'Company policies',
      '/privacy-policy': 'Privacy policy',
      '/cookie-policy': 'Cookie policy',
      '/terms': 'Terms & conditions',
    }
    const label = labels[pathname] ?? (pathname.startsWith('/resources/') ? 'Resources' : 'DBS-Express')
    document.title = `${label} | DBS-Express`
  }, [pathname])
  if (pathname === '/apply') return <ApplicationChoicePage />
  if (pathname === '/apply/individual') return <IndividualApplicationPage />
  if (pathname === '/self-employed') return <SelfEmployedPage />
  if (pathname === '/employers') return <EmployersPage />
  if (pathname === '/individuals') return <IndividualsPage />
  if (pathname === '/pricing') return <PricingPage />
  if (pathname === '/resources') return <ResourcesPage />
  if (pathname.startsWith('/resources/')) return <ArticlePage slug={pathname.slice('/resources/'.length)} />
  if (pathname === '/about') return <AboutPage />
  if (pathname === '/faq') return <FaqPage />
  if (pathname === '/contact') return <ContactPage />
  if (pathname === '/maintenance') return <MaintenancePage />
  if (pathname === '/offline') return <OfflinePage />
  if (pathname === '/team') return <TeamPage />
  if (pathname === '/policies') return <PoliciesPage />
  if (pathname === '/privacy-policy') return <PrivacyPage />
  if (pathname === '/cookie-policy') return <CookiePolicyPage />
  if (pathname === '/terms') return <TermsPage />
  return <NotFoundPage path={pathname} />
}
