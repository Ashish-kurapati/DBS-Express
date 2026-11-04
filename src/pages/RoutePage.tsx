import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { basicApplicationUrl, dbsEligibilityUrl, dbsPerformanceUrl, dbsUmbrellaDirectoryUrl, digitalIdPricing, googleFontsPrivacyUrl, individualApplicationUrl, pricingTiers, selfEmployedDbsGuidanceUrl, signUpUrl, volunteerPricing } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { IndividualJourneySections } from '../components/IndividualJourneySections'
import { SectionIcon } from '../components/SectionIcon'
import { FloatingStartButton } from '../components/FloatingStartButton'

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
  const words = description.trim().split(/\s+/)
  const summary = words.slice(0, 16).join(' ')
  const detail = words.length > 16 ? words.slice(16).join(' ') : ''
  return (
    <header className="route-page__hero">
      <SectionIcon label="DBS check illustration" />
      {eyebrow && <p className="eyebrow"><span /> {eyebrow}</p>}
      <h1>{title}</h1>
      <p>{summary}</p>
      {detail && <details className="route-page__hero-detail" name="page-details">
        <summary>Read more</summary>
        <p>{detail}</p>
      </details>}
    </header>
  )
}

function CtaBand({ title, description, href = '/apply', label = 'Choose an application route' }: { title: string; description: string; href?: string; label?: string }) {
  const external = href.startsWith('http')
  const words = description.trim().split(/\s+/)
  const summary = words.slice(0, 16).join(' ')
  const detail = words.length > 16 ? words.slice(16).join(' ') : ''
  return (
    <section className="route-page__cta section-pad">
      <div>
        <SectionIcon label="Application support illustration" />
        <h2>{title}</h2>
        <p>{summary}</p>
        {detail && <details className="route-page__hero-detail" name="page-details">
          <summary>Read more</summary>
          <p>{detail}</p>
        </details>}
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
      {sections.map((section) => <details className="route-page__section" key={section.title} name="page-details">
        <summary>
          <SectionIcon label="Section illustration" />
          <h2>{section.title}</h2>
          <span className="route-page__section-toggle" aria-hidden="true">+</span>
        </summary>
        <div className="route-page__section-content">
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>)}
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
      </details>)}
    </div>
  )
}

function EmployersPage() {
  return <RouteLayout pageClassName="route-page--employers">
    <PageHero eyebrow="EMPLOYERS" title="DBS checks for employers" description="Order and track candidate checks from one employer portal, with required Digital ID and application progress." />
    <SectionList sections={[
      { title: 'Candidate check workflow', paragraphs: ['Take a look at the actual 4-step workflow inside our accredited portal. From user creation to automated referee reminders and government submission.'], bullets: ['Candidate Setup — Add candidate details, assign internal departments, and enter targeted job roles in seconds.', 'Service Bundling — Select DBS checks and available additional services.', 'Eligibility Check — Confirm the lawful DBS level for the role.', 'Billing & Split — Configure how the organisation and candidate pay.'] },
      { title: 'Choose a check level', paragraphs: ['Compare Basic, Standard, and Enhanced eligibility criteria for your candidate roles.', 'Basic DBS checks show unspent convictions and conditional cautions. They are available for any purpose, including employment and personal use. Standard and Enhanced checks require an eligible role and an authorised application route.', volunteerPricingDisclosure] },
      { title: 'Workforce compliance tools', bullets: ['Free Right to Work Checks — Fully compliant UK Home Office Right to Work checks provided at zero extra cost alongside candidate DBS applications.', 'Automated Reference Checks (£2.95) — Hands-off referee management with automated chase reminders.', employerDigitalIdDisclosure, 'Flexible Payment Splitting — Configure whether your organisation pays 100%, splits costs, or has the candidate pay.', 'Role-Based Team Access — Assign Company Admins and departmental Evidence Checkers.', 'One-Click Excel Reports — Export compliance matrices and candidate progress trackers directly to Excel.'] },
    ]} />
    <CtaBand title="Set up your employer account" description="Create an organisation account to manage candidates and checks online." href={signUpUrl} label="Open Employer Account" />
  </RouteLayout>
}

function IndividualsPage() {
  return <RouteLayout pageClassName="route-page--individuals">
    <PageHero eyebrow="INDIVIDUALS" title="Apply for your own DBS check" description="Compare Basic and eligible Enhanced routes. No organisation account required." />
    <IndividualJourneySections />
    <SectionList sections={[
      {
        title: 'Individual application pricing',
        paragraphs: [
          'DBS Express Basic check breakdown: £20.00 government fee + £22.00 administration fee + £6.50 required Digital ID = £48.50 total. This breakdown is separate from the external personal application service linked below; this website does not provide an individual checkout.',
          'The supported individual application provider publishes a Basic DBS price of £38.00 (£20.00 government fee + £18.00 administration fee) and an Enhanced DBS price of £71.00 (£41.00 government fee + £30.00 administration fee).',
          'Digital identity and address checks are included in those published individual-service prices; no separate £6.50 Digital ID charge is added on that route. For employer-portal checks, required Digital ID is included in the displayed total.',
          'You can also apply directly to GOV.UK for a Basic DBS check for the £20.00 government fee, without an administration charge.',
        ],
      },
      {
        title: 'Eligibility and options',
        paragraphs: [
          'Anyone can apply directly for a Basic DBS check. A Basic check costs £20.00 through GOV.UK.',
          'Standard and Enhanced checks are available only when the role meets DBS eligibility rules. For checks submitted by an organisation, see the employer application options.',
        ],
        links: [{ label: 'See employer DBS check options', href: '/employers' }],
      },
      {
        title: 'Self-employed? Enhanced checks may be available.',
        paragraphs: [
          'Eligible self-employed people and personal employees can apply for their own Enhanced or Enhanced with Barred List(s) check through a DBS Umbrella Body.',
          'Eligibility depends on the role and applicable DBS rules. If you contract your services to an organisation, it may apply on your behalf under its policies. This site does not process self-employed applications.',
        ],
        links: [{ label: 'Read GOV.UK guidance for self-employed applicants', href: selfEmployedDbsGuidanceUrl }, { label: 'Find a DBS Umbrella Body on GOV.UK', href: dbsUmbrellaDirectoryUrl }],
      },
    ]} />
    <CtaBand
      title="Continue your application"
      description="Basic and eligible Enhanced checks are available through the supported personal application route."
      href="/apply/individual"
      label="Apply for my own check"
    />
  </RouteLayout>
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
        <SectionIcon label="Individual application illustration" />
        <p className="eyebrow"><span /> INDIVIDUALS</p>
        <h2>Applying for yourself?</h2>
        <p>Apply for a Basic or eligible Enhanced check. No organisation account needed.</p>
        <a className="button button-primary" href="/apply/individual">
          Apply for my own check <span aria-hidden="true">→</span>
        </a>
      </section>
      <section className="application-choice-card application-choice-card--employer">
        <SectionIcon label="Employer application illustration" />
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
  return <RouteLayout pageClassName="route-page--individual-application">
    <PageHero
      eyebrow="INDIVIDUAL APPLICATION"
      title="Apply for your own DBS check"
      description="Continue to the personal application service for Basic and eligible Enhanced checks."
    />
    <div className="individual-application-options section-pad">
      <details className="route-page__section" name="page-details">
        <summary><SectionIcon label="Individual check illustration" /><h2>Basic or eligible Enhanced</h2><span className="route-page__section-toggle" aria-hidden="true">+</span></summary>
        <div className="route-page__section-content">
        <p>The supported individual service provides the personal application form and explains the checks available to you. Its published prices include digital identity and address checks.</p>
        <a className="button button-primary" href={individualApplicationUrl} target="_blank" rel="noreferrer">
          Continue to individual DBS service <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        </div>
      </details>
      <details className="route-page__section" name="page-details">
        <summary><SectionIcon label="GOV.UK application illustration" /><h2>Apply directly on GOV.UK</h2><span className="route-page__section-toggle" aria-hidden="true">+</span></summary>
        <div className="route-page__section-content">
        <p>For a Basic DBS check only, you can also apply directly through GOV.UK for the £20 government fee, without a provider administration fee.</p>
        <a className="button button-secondary" href={basicApplicationUrl} target="_blank" rel="noreferrer">
          Apply for a Basic check on GOV.UK <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        </div>
      </details>
    </div>
  </RouteLayout>
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
            <th scope="col">Admin fee</th>
            <th scope="col">Required Digital ID</th>
            <th scope="col" className="route-table__total-heading">Total to client</th>
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
              <td data-label="Government fee">{row.governmentFee}</td>
              <td data-label="Admin fee">{row.adminFee}</td>
              <td data-label="Required Digital ID">{row.digitalIdFee}</td>
              <td className="route-table__total" data-label="Total to client">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PricingPage() {
  return <RouteLayout>
    <PageHero eyebrow="PRICING" title="Official DBS check prices" description="All-in prices include government fees, administration, and required Digital ID. No subscription charges." />
    <div className="route-page__pricing section-pad">
      <section className="route-price-card"><SectionIcon label="DBS pricing illustration" /><h2>DBS check prices</h2><p>Government fees, administration, and required Digital ID included.</p><details name="page-details"><summary>Basic &amp; Standard checks</summary><p>Annual volume pricing. Digital ID included.</p><PricingTable /></details><details name="page-details"><summary>Enhanced checks</summary><p>Eligible roles only. Digital ID included.</p><PricingTable enhanced /></details></section>
      <SectionList className="pricing-billing-panel" sections={[{ title: 'Pricing & billing details', bullets: ['Each total combines the official DBS government fee, administration fee, and required Digital ID fee.', 'Basic and Standard administration fees decrease with annual submission volume, from £17.70 in Tier 1 to £14.10 in Tier 3.', 'Employers can choose whether the business covers 100% of the check fee, splits a designated percentage with the applicant, or has the applicant pay directly.', volunteerPricingDisclosure, digitalIdDisclosure] }]} />
    </div>
    <CtaBand title="Ready to start?" description="Choose an application route to submit checks and manage applicants." />
  </RouteLayout>
}

function ResourcesPage() {
  return <RouteLayout pageClassName="route-page--resources">
    <PageHero eyebrow="RESOURCES" title="Resources and guides" description="Articles and official guidance about DBS checks in England and Wales." />
    <div className="resource-list section-pad">{articleSummaries.map((article) => <article className="resource-card" key={article.path}><SectionIcon label={`${article.category} illustration`} /><div className="resource-card__meta"><span>{article.category}</span><span>{article.readTime}</span></div><h2><a href={article.path}>{article.title}</a></h2><p>{article.summary}</p><div className="resource-card__footer"><span>{article.date}</span><a href={article.path}>Read article →</a></div></article>)}</div>
  </RouteLayout>
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articleSummaries.find((item) => item.path.endsWith(slug)) ?? articleSummaries[0]
  const isFirstArticle = article.path.endsWith('understanding-dbs-check-levels-2026')
  return <RouteLayout pageClassName={`route-page--article${isFirstArticle ? '' : ' route-page--article-summary'}`}>
    <article className="route-article section-pad">
      <a className="route-article__back" href="/resources">← Resources</a>
      <PageHero eyebrow={article.category} title={article.title} description={`${article.date} · DBS-Express compliance team · ${article.readTime}`} />
      <details className="route-article__body" name="page-details"><summary><SectionIcon label="Article illustration" /><span>Read article</span></summary><div className="route-article__body-content"><p>{isFirstArticle ? 'Navigating Disclosure and Barring Service (DBS) requirements can feel complex. This guide breaks down essential rules for employers and applicants in England and Wales.' : article.summary}</p>{isFirstArticle ? <><h2>Key regulatory guidelines</h2><p>When conducting criminal record checks in England and Wales, organisations must ensure they hold a lawful basis for requesting information. Requesting an Enhanced check for an ineligible role is an offence under the Rehabilitation of Offenders Act 1974.</p><h2>Best practices for onboarding</h2><ul><li>Verify original ID documents in person or via approved digital identity service providers (IDSPs).</li><li>Maintain clear written policies on the recruitment of ex-offenders.</li><li>Ensure DBS certificate data is stored securely and destroyed in line with your retention schedule.</li></ul></> : <><h2>Source content status</h2><p>The reference listing provides the summary shown above. The full source article body was not independently available during this audit, so no additional wording has been invented here.</p></>}</div></details>
    </article>
    <CtaBand title="Need advice for your organisation?" description="Our team can help verify which check level your employees legally require under statutory legislation." href="/contact" label="Contact compliance advisors" />
  </RouteLayout>
}

function AboutPage() {
  return <RouteLayout><PageHero title="About DBS-Express" description="DBS-Express is a trading name of Talaty Group Ltd. Find DBS guidance and application routes." /><SectionList sections={[
    { title: 'How the service works', paragraphs: ['This website provides information and directs applicants to external application services. DBS processes and issues DBS certificates.'] },
    { title: 'Processing partner identity pending', paragraphs: ['The public website and project materials do not identify the processing partner or provide a verifiable DBS Umbrella Body reference. These details must be confirmed against the official directory before they can be published.'], links: [{ label: 'Search the official DBS Umbrella Body directory', href: dbsUmbrellaDirectoryUrl }] },
    { title: 'Customer support', paragraphs: ['For help choosing a route or using the employer service, contact the DBS-Express team through the contact page.'], links: [{ label: 'Contact support', href: '/contact' }] },
  ]} /><CtaBand title="Questions about DBS-Express?" description="Contact the team for help with routes and service information." href="/contact" label="Contact support" /></RouteLayout>
}

function FaqPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => faqItems.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <RouteLayout pageClassName="route-page--faq"><PageHero eyebrow="FAQ" title="DBS questions, answered" description="Answers about check levels, applications, eligibility, processing, and support." /><section className="faq-page section-pad"><SectionIcon label="Frequently asked questions illustration" /><label htmlFor="faq-search">Search questions</label><input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the FAQ" />{filtered.length ? <div className="faq-page__list">{filtered.map(([question, answer]) => <details key={question} name="page-details"><summary>{question}</summary><p>{answer}</p></details>)}</div> : <p className="faq-page__empty">No questions matched your search.</p>}</section></RouteLayout>
}

function ContactPage() {
  return <RouteLayout pageClassName="route-page--contact"><PageHero eyebrow="CONTACT" title="Get in touch" description="For application updates, use your dashboard. Contact support when you need help." /><SectionList sections={[{ title: 'Direct channels', paragraphs: ['Reach our team by phone, email, or post for guidance on organisational registration and eligibility.', 'Office address: Talaty Group Ltd, London, United Kingdom', 'Phone support: 01254 432655. Lines open 9am–5pm, Mon–Fri', 'Email enquiry: contact@dbs-express.co.uk. Mon–Fri responses within 24 hours', 'If you have already submitted an application through our platform, please log in directly to your dashboard to view real-time tracking updates.'] }]} /><CtaBand title="Ready to apply?" description="Choose the personal application route or register your organisation." href="/apply" label="Choose an application route" /></RouteLayout>
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
      <article><SectionIcon label="Eligibility illustration" /><span aria-hidden="true">01</span><h2>Start with eligibility</h2><p>Check the role against official DBS guidance before choosing a check level.</p><a href={dbsEligibilityUrl} target="_blank" rel="noreferrer">Read GOV.UK guidance <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></article>
      <article><SectionIcon label="Application route illustration" /><span aria-hidden="true">02</span><h2>Choose your route</h2><p>Individuals and employers use separate application routes on this website.</p><a href="/apply">Choose an application route <span aria-hidden="true">→</span></a></article>
      <article><SectionIcon label="Support illustration" /><span aria-hidden="true">03</span><h2>Ask for support</h2><p>Contact the DBS-Express team for questions about site information and employer access.</p><a href="/contact">Contact support <span aria-hidden="true">→</span></a></article>
      <article><SectionIcon label="Service target illustration" /><span aria-hidden="true">04</span><h2>DBS service targets</h2><p>Published processing targets are not guarantees. DBS controls processing and extra checks can take longer.</p><a href={dbsPerformanceUrl} target="_blank" rel="noreferrer">DBS performance and annual report <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></article>
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
  return <RouteLayout><PageHero eyebrow="LEGAL & COMPLIANCE" title="Company policies" description="Policy documents and compliance information linked from the DBS-Express reference website." /><SectionList sections={[{ title: 'Policy library', bullets: ['Information Handling Policy for Information Provided By DBS — How we manage information received directly from the Disclosure and Barring Service.', 'Talaty Group Ltd DBS eBulk Data Retention Policy — Data retention periods and practices for eBulk DBS processing.', 'Privacy Policy — How we collect, use, and protect your personal data.', 'Data Protection — Our data protection obligations and your rights under UK GDPR.', 'Terms & Conditions — Terms governing the use of DBS-Express services.'] }, { title: 'Source status', paragraphs: ['The reference website links some policy documents to the external DBS-Express application portal. Those documents are not reproduced here without independently verifying their full legal wording.'] }]} /><CtaBand title="Need a policy document?" description="Contact the DBS-Express team for the current policy or compliance document relevant to your query." href="/contact" label="Contact support" /></RouteLayout>
}

function PrivacyPage() {
  return <RouteLayout><PageHero eyebrow="LEGAL" title="Privacy policy" description="How this website handles information and connects you to external services." /><SectionList sections={[
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
  return <RouteLayout><PageHero eyebrow="LEGAL" title="Terms & conditions" description="Last updated: August 2026" /><SectionList sections={[{ title: 'Agreement', paragraphs: ['Welcome to DBS-Express, operated by Talaty Group Ltd. By accessing our site or using our services, you agree to these Terms and Conditions.'] }, { title: '1. Scope of service', paragraphs: ['DBS-Express provides guidance and links to application services. DBS processes applications and issues DBS certificates. The public website does not identify the umbrella body used for employer submissions; its identity and reference must be verified before they are stated.'] }, { title: '2. User responsibilities', paragraphs: ['Users and employers must ensure they hold the necessary legal entitlement to request criminal record checks under the Rehabilitation of Offenders Act 1974.'] }]} /></RouteLayout>
}

function NotFoundPage({ path }: { path: string }) {
  return <RouteLayout><PageHero eyebrow="404" title="Page not found" description={`We could not find ${path}.`} /><section className="route-page__notice section-pad"><SectionIcon label="Page not found illustration" /><h2>Try another destination</h2><p>Use the main navigation to find DBS guidance, support, resources, and company information.</p><div className="route-page__actions"><a className="button button-primary" href="/">Return home</a><a className="button button-secondary" href="/contact">Contact support</a></div></section></RouteLayout>
}

function RouteLayout({ children, pageClassName = '' }: { children: ReactNode; pageClassName?: string }) {
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className={`route-page${pageClassName ? ` ${pageClassName}` : ''}`}>{children}</main><SiteFooter /><FloatingStartButton /></div>
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
