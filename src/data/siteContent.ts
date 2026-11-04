export const sourceSite = 'https://db-ssubmit.vercel.app'
export const signUpUrl = 'https://www.dbs-express.co.uk/app/ci/index_controller/sign_up'
export const loginUrl = 'https://www.dbs-express.co.uk/app/login_direct'
export const basicApplicationUrl = 'https://www.gov.uk/request-copy-criminal-record'
export const individualApplicationUrl = 'https://www.dbs-check.co.uk/'
export const trackDbsUrl = 'https://www.gov.uk/guidance/dbs-check-requests-guidance-for-employers#how-to-track-a-dbs-application'
export const dbsEligibilityUrl = 'https://www.gov.uk/government/collections/dbs-eligibility-guidance'
export const dbsPerformanceUrl = 'https://www.gov.uk/government/collections/dbs-performance--2'
export const dbsUmbrellaDirectoryUrl = 'https://www.gov.uk/find-dbs-umbrella-body'
export const selfEmployedDbsGuidanceUrl = 'https://www.gov.uk/guidance/dbs-checks-for-self-employed-people-and-personal-employees'
export const googleFontsPrivacyUrl = 'https://policies.google.com/privacy'

export const navigation = [
  { label: 'Individuals', href: '/individuals' },
  { label: 'Employers', href: '/employers' },
  { label: 'Self-employed', href: '/self-employed' },
  { label: 'Track my DBS', href: trackDbsUrl, external: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Check guidance', href: '/#check-guidance' },
  { label: 'How we work', href: '/team' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

// Client verification required before display: these promotional claims are retained as source material.
export const benefits = [
  {
    title: 'Built for SMEs & high-volume teams',
    description: 'Pay for what you use, with no contracts',
  },
  {
    title: 'Turnaround times',
    description: 'Same-day processing before 4pm',
  },
  {
    title: 'UK compliance made simple',
    description: 'DBS certificate dispatch information',
  },
]

// Preserve the original values; do not display until the client verifies source and context.
export const statistics = [
  {
    value: '99.4%',
    label: 'First-time application accuracy rate across all sectors',
  },
  {
    value: '< 24h',
    label: 'Average turnaround for electronic Basic check results',
  },
  {
    value: '50k+',
    label: 'UK criminal record checks processed annually',
  },
]

// Government fees effective 5 October 2026. Totals include mandatory Digital ID.
export const pricingTiers = [
  {
    tier: 'Tier 1',
    volume: '1 to 99 checks per year',
    basicStandardGovernmentFee: '£20.00',
    basicStandardAdminFee: '£17.70',
    basicStandard: '£44.20',
    enhancedGovernmentFee: '£41.00',
    enhancedAdminFee: '£24.70',
    enhanced: '£72.20',
  },
  {
    tier: 'Tier 2',
    volume: '100 to 499 checks per year',
    basicStandardGovernmentFee: '£20.00',
    basicStandardAdminFee: '£15.30',
    basicStandard: '£41.80',
    enhancedGovernmentFee: '£41.00',
    enhancedAdminFee: '£22.30',
    enhanced: '£69.80',
  },
  {
    tier: 'Tier 3',
    volume: '500 to 1,499 checks per year',
    basicStandardGovernmentFee: '£20.00',
    basicStandardAdminFee: '£14.10',
    basicStandard: '£40.60',
    enhancedGovernmentFee: '£41.00',
    enhancedAdminFee: '£21.10',
    enhanced: '£68.60',
  },
]

export const volunteerPricing = {
  governmentFee: '£0.00',
  adminFee: '£18.00',
  total: '£24.50',
}

export const digitalIdPricing = {
  governmentFee: '£0.00',
  adminFee: '£6.50',
  total: '£6.50',
}

export const pricingPageUrl = `${sourceSite}/pricing`

// Confirm current availability and wording with the client before display.
export const integrations = [
  {
    number: '01',
    title: 'Build with API',
    description: 'Developer-First Automation',
    details: [
      'Direct REST endpoints for applicant dispatch and tracking',
      'Instant webhook notifications as soon as certificates are issued',
    ],
  },
  {
    number: '02',
    title: 'Partner integrations',
    description: 'Prebuilt Zero-Code Connectors',
    details: [
      'Plug-and-play connectors for leading HR and ATS platforms',
      'Automated candidate status sync with zero manual re-entry',
    ],
  },
  {
    number: '03',
    title: 'Native web portal',
    description: 'Zero Setup or Coding',
    details: [
      'Dedicated cloud portal to invite candidates and monitor progress',
      'Automated candidate SMS reminders and instant digital downloads',
    ],
  },
]

// Confirm process steps and service details with the client before display.
export const workflow = [
  {
    title: 'Candidate & Role Setup',
    description:
      'Enter applicant details, assign company departments, and use our smart eligibility questionnaire to determine the lawful DBS level (Basic, Standard, or Enhanced).',
  },
  {
    title: 'Bundle Checks & Digital ID',
    description:
      'Select DBS checks with required Digital ID included in the total, plus optional Right to Work verification and reference checks.',
  },
  {
    title: 'Track & Receive Results',
    description:
      'Follow application status, export compliance records, and receive results. The website says paper certificates are dispatched.',
  },
]

export const footerGroups = [
  {
    title: 'Services',
    links: [
      ['Basic DBS check', '/pricing'],
      ['Standard DBS check', '/pricing'],
      ['Enhanced DBS check', '/pricing'],
      ['Rate matrix & pricing', '/pricing'],
    ],
  },
  {
    title: 'Solutions',
    links: [
      ['Employers & HR teams', '/employers'],
      ['Individual applicants', '/individuals'],
      ['Self-employed', '/self-employed'],
      ['Track my DBS', trackDbsUrl],
      ['Portal login →', loginUrl],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Blog & guidance', '/resources'],
      ['Knowledge base & FAQ', '/faq'],
      ['System status', '/maintenance'],
      ['Offline & connectivity help', '/offline'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About DBS-Express', '/about'],
      ['Contact support', '/contact'],
      ['How we work', '/team'],
    ],
  },
  {
    title: 'Legal & compliance',
    links: [
      ['Company policies', '/policies'],
      ['Privacy policy', '/privacy-policy'],
      ['Terms & conditions', '/terms'],
      ['Cookie policy', '/cookie-policy'],
    ],
  },
]

export function sourceLink(path: string) {
  return path.startsWith('https://') ? path : path
}
