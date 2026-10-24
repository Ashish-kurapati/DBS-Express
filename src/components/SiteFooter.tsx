import { footerGroups, sourceLink } from '../data/siteContent'

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="footer-brand" href="/" aria-label="DBS-Express home">
            <img
              src="/assets/dbs-express-logo.jpg"
              alt="DBS-Express"
              width="320"
              height="64"
            />
          </a>
          <p>
            Information about Basic, Standard, and Enhanced DBS checks for employers and
            individuals.
          </p>
        </div>
        <div className="footer-link-groups">
          {footerGroups.map((group) => (
            <div className="footer-link-group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, path]) => (
                  <li key={label}>
                    <a href={sourceLink(path)} target="_blank" rel="noreferrer">
                      {label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>DBS-Express design preview</p>
        <a href="/" className="footer-preview-link">
          Return to prototype selection
        </a>
      </div>
    </footer>
  )
}
