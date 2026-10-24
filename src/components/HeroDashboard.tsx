export function HeroDashboard() {
  return (
    <div className="hero-dashboard-preview" role="img" aria-label="DB-Express candidate management dashboard preview">
      <div className="hero-dashboard-frame">
        <div className="hero-dashboard-topbar">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
          <span className="hero-dashboard-url">app.dbs-express.com</span>
        </div>
        <div className="hero-dashboard-image-wrapper">
          <img
            src="/assets/candidate-dashboard.jpg"
            alt="DB-Express user and candidate compliance dashboard"
            className="hero-dashboard-img"
            width="800"
            height="520"
            loading="eager"
          />
          {/* Floating feature pills as shown in the original design */}
          <div className="hero-floating-pill hero-floating-pill--services" aria-hidden="true">
            <span className="hero-floating-pill__label">Services Selection:</span>
            <strong className="hero-floating-pill__title">DBS Check, Free Right to Work, Digital ID</strong>
            <span className="hero-floating-pill__price">£6.50</span>
          </div>

          <div className="hero-floating-pill hero-floating-pill--turnaround" aria-hidden="true">
            <span className="hero-floating-pill__label">Turnaround:</span>
            <strong className="hero-floating-pill__title">Same-Day Before 4PM</strong>
            <span className="hero-floating-pill__sub">&middot; Accredited UK Processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
