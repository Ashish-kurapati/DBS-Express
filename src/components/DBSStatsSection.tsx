/* ─── Data (matching DBS service targets) ────────────────────────── */
const cards = [
  {
    id: 'basic',
    num: '01',
    label: 'BASIC DBS CHECK',
    stat: '85%',
    turnaround: 'Within 2 days',
    scope: 'Reveals unspent convictions and conditional cautions.',
    note: 'Available to anyone aged 16 or over.',
    href: '/individuals',
    linkLabel: 'Individual application',
  },
  {
    id: 'standard',
    num: '02',
    label: 'STANDARD DBS CHECK',
    stat: '85%',
    turnaround: 'Within 3 days',
    scope: 'Reveals relevant spent and unspent convictions and cautions, subject to filtering rules.',
    note: 'Available for eligible roles.',
    href: '/employers',
    linkLabel: 'Employer application',
  },
  {
    id: 'enhanced',
    num: '03',
    label: 'ENHANCED DBS CHECK',
    stat: '80%',
    turnaround: 'Within 14 days',
    scope: 'Includes Standard-level information, plus relevant information held by local police.',
    note: 'Available for eligible roles.',
    href: '/employers',
    linkLabel: 'Employer application',
  },
]

/* ─── SVG Illustrations (inline, CSS-animated) ───────────────────── */
function BasicIllustration() {
  return (
    <svg
      className="dbs-card__illustration"
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
    >
      <rect x="20" y="10" width="80" height="70" rx="6" fill="#EEF7F3" stroke="#CCEBE0" strokeWidth="1.2" />
      <rect x="20" y="10" width="80" height="18" rx="6" fill="#037554" opacity="0.12" />
      <rect x="20" y="22" width="80" height="6" rx="0" fill="#037554" opacity="0.12" />
      <rect x="30" y="36" width="45" height="4" rx="2" fill="#1D232A" opacity="0.25" />
      <rect x="30" y="47" width="60" height="3" rx="1.5" fill="#037554" opacity="0.3" className="dbs-doc-line dbs-doc-line--1" />
      <rect x="30" y="54" width="52" height="3" rx="1.5" fill="#037554" opacity="0.2" className="dbs-doc-line dbs-doc-line--2" />
      <rect x="30" y="61" width="38" height="3" rx="1.5" fill="#037554" opacity="0.15" className="dbs-doc-line dbs-doc-line--3" />
      <circle cx="93" cy="20" r="5" fill="#037554" opacity="0.2" />
      <path d="M91 20l1.5 1.5L95 18" stroke="#037554" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  )
}

function StandardIllustration() {
  return (
    <svg
      className="dbs-card__illustration"
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
    >
      <rect x="28" y="14" width="68" height="60" rx="5" fill="#EEF7F3" stroke="#CCEBE0" strokeWidth="1" opacity="0.6" />
      <rect x="23" y="11" width="68" height="60" rx="5" fill="#F7F8F7" stroke="#CCEBE0" strokeWidth="1" opacity="0.8" />
      <rect x="18" y="8" width="68" height="60" rx="6" fill="#fff" stroke="#CCEBE0" strokeWidth="1.2" />
      <rect x="18" y="8" width="68" height="16" rx="6" fill="#037554" opacity="0.1" />
      <rect x="18" y="18" width="68" height="6" rx="0" fill="#037554" opacity="0.1" />
      <rect x="27" y="31" width="40" height="4" rx="2" fill="#1D232A" opacity="0.25" />
      <rect x="27" y="41" width="50" height="3" rx="1.5" fill="#037554" opacity="0.3" className="dbs-doc-line dbs-doc-line--1" />
      <rect x="27" y="48" width="44" height="3" rx="1.5" fill="#037554" opacity="0.2" className="dbs-doc-line dbs-doc-line--2" />
      <rect x="27" y="55" width="35" height="3" rx="1.5" fill="#037554" opacity="0.15" className="dbs-doc-line dbs-doc-line--3" />
      <rect x="27" y="61" width="30" height="3" rx="1.5" fill="#037554" opacity="0.1" className="dbs-doc-line dbs-doc-line--4" />
      <circle cx="77" cy="22" r="6" fill="#037554" opacity="0.15" />
      <path d="M75 22l1.5 1.5L79 19" stroke="#037554" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

function EnhancedIllustration() {
  return (
    <svg
      className="dbs-card__illustration"
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
    >
      <rect x="30" y="16" width="62" height="55" rx="5" fill="#EEF7F3" stroke="#CCEBE0" strokeWidth="1" opacity="0.5" />
      <rect x="24" y="12" width="62" height="55" rx="5" fill="#F7F8F7" stroke="#CCEBE0" strokeWidth="1" opacity="0.75" />
      <rect x="18" y="8" width="62" height="55" rx="6" fill="#fff" stroke="#CCEBE0" strokeWidth="1.2" />
      <rect x="18" y="8" width="62" height="14" rx="6" fill="#037554" opacity="0.1" />
      <rect x="18" y="17" width="62" height="5" rx="0" fill="#037554" opacity="0.1" />
      <rect x="26" y="27" width="36" height="3.5" rx="1.75" fill="#1D232A" opacity="0.25" />
      <rect x="26" y="36" width="46" height="3" rx="1.5" fill="#037554" opacity="0.3" className="dbs-doc-line dbs-doc-line--1" />
      <rect x="26" y="43" width="40" height="3" rx="1.5" fill="#037554" opacity="0.2" className="dbs-doc-line dbs-doc-line--2" />
      <rect x="26" y="50" width="30" height="3" rx="1.5" fill="#037554" opacity="0.15" className="dbs-doc-line dbs-doc-line--3" />
      <rect x="26" y="56" width="20" height="3" rx="1.5" fill="#037554" opacity="0.1" className="dbs-doc-line dbs-doc-line--4" />
      <path
        d="M86 28 C86 28 94 24 94 24 L94 36 C94 41 90 44 86 46 C82 44 78 41 78 36 L78 24 L86 28Z"
        fill="#037554"
        opacity="0.15"
        className="dbs-shield"
      />
      <path
        d="M83 35l2 2 4-4"
        stroke="#037554"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
        className="dbs-shield-check"
      />
    </svg>
  )
}


function DBSCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const illustrations = [BasicIllustration, StandardIllustration, EnhancedIllustration]
  const Illustration = illustrations[index]

  return (
    <article
      className={`dbs-stat-card dbs-stat-card--${card.id} reveal-on-scroll`}
      style={{ '--card-delay': `${index * 90}ms` } as React.CSSProperties}
    >
      <div className="dbs-stat-card__meta">
        <span className="dbs-stat-card__num">{card.num}</span>
        <span className="dbs-stat-card__label">{card.label}</span>
      </div>

      <div className="dbs-stat-card__panel">
        <div className="dbs-stat-card__visual">
          <Illustration />
        </div>

        <div className="dbs-stat-card__stat-block">
          <span className="dbs-stat-card__stat" aria-label={`${card.stat} of applications complete`}>
            {card.stat}
          </span>
          <span className="dbs-stat-card__turnaround">{card.turnaround}</span>
        </div>

        <div className="dbs-stat-card__body">
          <p className="dbs-stat-card__scope">{card.scope}</p>
          <p className="dbs-stat-card__note">{card.note}</p>
        </div>

        <a href={card.href} className="dbs-stat-card__action" aria-label={`${card.label} — ${card.linkLabel}`}>
          <span>{card.linkLabel}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="dbs-stat-card__arrow">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export function DBSStatsSection() {
  return (
    <section
      className="dbs-stats-section section-pad"
      aria-labelledby="dbs-stats-title"
    >
      <div className="dbs-stats-section__header reveal-on-scroll">
        <p className="eyebrow"><span /> PERFORMANCE TARGETS</p>
        <h2 id="dbs-stats-title" className="dbs-stats-section__title">
          DBS checks,{' '}
          <span className="text-accent">at a glance.</span>
        </h2>
        <p className="dbs-stats-section__sub">
          Understand your check options, what they reveal and how long processing typically takes.
        </p>
      </div>

      <div className="dbs-stats-grid reveal-on-scroll">
        {cards.map((card, i) => (
          <DBSCard key={card.id} card={card} index={i} />
        ))}
      </div>

      <p className="dbs-stats-disclaimer reveal-on-scroll">
        These are service performance targets, not guaranteed completion times.
        Some applications may take longer.
      </p>
    </section>
  )
}
