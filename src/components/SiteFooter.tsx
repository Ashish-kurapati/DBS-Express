import { footerGroups, sourceLink } from '../data/siteContent'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="footer-brand" href="/" aria-label="DBS-Express home">
            <span aria-hidden="true">DBS-Express</span>
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
                    <a
                      href={sourceLink(path)}
                      {...(path.startsWith('https://') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {label}
                      {path.startsWith('https://') && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>DBS-Express</p>
        <p>Basic, Standard and Enhanced DBS checks.</p>
      </div>
    </footer>
  )
}
