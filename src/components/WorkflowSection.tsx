export function WorkflowSection() {
  return (
    <section
      className="workflow-visual-section section-pad reveal-on-scroll"
      id="workflow"
      aria-labelledby="workflow-title"
    >
      <div className="workflow-visual-section__header">
        <h2 id="workflow-title" className="workflow-visual-section__title">
          How it works
        </h2>
        <p className="workflow-visual-section__subtitle">
          Three simple steps. One straightforward process.
        </p>
      </div>

        <div className="workflow-visual-grid">
          {/* CARD 01 */}
          <article className="workflow-visual-card">
            <div className="workflow-visual-card__media" aria-hidden="true">
              <svg
                className="workflow-visual-card__graphic"
                viewBox="0 0 320 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Browser / Modal window */}
                <rect
                  x="16"
                  y="14"
                  width="288"
                  height="172"
                  rx="12"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                />
                {/* Window header */}
                <rect x="16" y="14" width="288" height="28" rx="12" fill="#F8FAFC" />
                <rect x="16" y="30" width="288" height="12" fill="#F8FAFC" />
                <line x1="16" y1="42" x2="304" y2="42" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="32" cy="28" r="3.5" fill="#EF4444" opacity="0.6" />
                <circle cx="44" cy="28" r="3.5" fill="#F59E0B" opacity="0.6" />
                <circle cx="56" cy="28" r="3.5" fill="#10B981" opacity="0.6" />
                <rect x="76" y="23" width="90" height="10" rx="5" fill="#E2E8F0" />

                {/* Form fields */}
                <rect x="36" y="56" width="60" height="7" rx="3.5" fill="#94A3B8" />
                <rect
                  x="36"
                  y="68"
                  width="180"
                  height="24"
                  rx="6"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <text
                  x="46"
                  y="84"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="10"
                  fill="#1E293B"
                  fontWeight="500"
                >
                  Alex Morgan
                </text>
                <circle cx="204" cy="80" r="6" fill="#007A52" />
                <path
                  d="M201 80 L203 82 L207 77"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <rect x="36" y="100" width="70" height="7" rx="3.5" fill="#94A3B8" />
                <rect
                  x="36"
                  y="112"
                  width="134"
                  height="24"
                  rx="6"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <text
                  x="46"
                  y="128"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="10"
                  fill="#64748B"
                >
                  14 / 08 / 1992
                </text>

                <rect
                  x="180"
                  y="112"
                  width="104"
                  height="24"
                  rx="6"
                  fill="#EBF7F2"
                  stroke="#A7DBC8"
                  strokeWidth="1"
                />
                <circle cx="192" cy="124" r="5" fill="#007A52" />
                <path
                  d="M189.5 124 L191 125.5 L194.5 121.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="202"
                  y="127"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="9"
                  fill="#007A52"
                  fontWeight="600"
                >
                  Verified match
                </text>

                {/* Action button */}
                <rect x="36" y="148" width="112" height="24" rx="6" fill="#007A52" />
                <text
                  x="60"
                  y="163"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="10"
                  fill="#FFFFFF"
                  fontWeight="600"
                >
                  Save &amp; submit
                </text>
                <path
                  d="M134 160 L138 160 M136 157 L139 160 L136 163"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="workflow-visual-card__body">
              <span className="workflow-visual-card__step" aria-hidden="true">
                01
              </span>
              <h3 className="workflow-visual-card__title">Fill in your details</h3>
            </div>
          </article>

          {/* CARD 02 */}
          <article className="workflow-visual-card">
            <div className="workflow-visual-card__media" aria-hidden="true">
              <svg
                className="workflow-visual-card__graphic"
                viewBox="0 0 320 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Phone Outer Chassis */}
                <rect x="95" y="10" width="130" height="180" rx="20" fill="#1D232A" />
                <rect x="99" y="14" width="122" height="172" rx="16" fill="#FFFFFF" />

                {/* Speaker / Dynamic Island */}
                <rect x="136" y="20" width="48" height="8" rx="4" fill="#1D232A" />
                <circle cx="172" cy="24" r="2" fill="#334155" />

                {/* Header */}
                <text
                  x="160"
                  y="43"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="8.5"
                  fill="#64748B"
                  fontWeight="600"
                  textAnchor="middle"
                  letterSpacing="0.04em"
                >
                  DIGITAL ID CHECK
                </text>

                {/* Verification Scan Box */}
                <rect
                  x="114"
                  y="52"
                  width="92"
                  height="78"
                  rx="10"
                  fill="#F0FDF4"
                  stroke="#86EFAC"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Corner Brackets */}
                <path
                  d="M120 62 H126 M120 62 V68"
                  stroke="#007A52"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M200 62 H194 M200 62 V68"
                  stroke="#007A52"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M120 120 H126 M120 120 V114"
                  stroke="#007A52"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M200 120 H194 M200 120 V114"
                  stroke="#007A52"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Avatar Silhouette */}
                <circle cx="160" cy="78" r="14" fill="#CBD5E1" />
                <path
                  d="M144 105 C144 97 151 93 160 93 C169 93 176 97 176 105"
                  fill="#CBD5E1"
                />

                {/* Scan Beam */}
                <line
                  x1="116"
                  y1="90"
                  x2="204"
                  y2="90"
                  stroke="#007A52"
                  strokeWidth="1.6"
                  strokeOpacity="0.8"
                />

                {/* Pill status */}
                <rect x="115" y="142" width="90" height="24" rx="12" fill="#007A52" />
                <circle cx="127" cy="154" r="5" fill="#FFFFFF" />
                <path
                  d="M124.5 154 L126 155.5 L129.5 152"
                  stroke="#007A52"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="138"
                  y="157"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="9"
                  fill="#FFFFFF"
                  fontWeight="600"
                >
                  ID Verified
                </text>
              </svg>
            </div>
            <div className="workflow-visual-card__body">
              <span className="workflow-visual-card__step" aria-hidden="true">
                02
              </span>
              <h3 className="workflow-visual-card__title">Verify your ID on your phone</h3>
            </div>
          </article>

          {/* CARD 03 */}
          <article className="workflow-visual-card">
            <div className="workflow-visual-card__media" aria-hidden="true">
              <svg
                className="workflow-visual-card__graphic"
                viewBox="0 0 320 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Certificate Sheet */}
                <rect
                  x="55"
                  y="12"
                  width="210"
                  height="176"
                  rx="8"
                  fill="#FFFFFF"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                />
                <rect
                  x="63"
                  y="20"
                  width="194"
                  height="160"
                  rx="4"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />

                {/* Certificate Header Banner */}
                <rect
                  x="75"
                  y="30"
                  width="170"
                  height="20"
                  rx="4"
                  fill="#007A52"
                  fillOpacity="0.08"
                />
                <text
                  x="160"
                  y="43"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="8.5"
                  fill="#007A52"
                  fontWeight="700"
                  textAnchor="middle"
                  letterSpacing="0.06em"
                >
                  DBS DISCLOSURE CERTIFICATE
                </text>

                {/* Content lines */}
                <rect x="75" y="60" width="80" height="5" rx="2.5" fill="#94A3B8" />
                <rect x="75" y="70" width="110" height="4" rx="2" fill="#CBD5E1" />
                <rect x="75" y="78" width="95" height="4" rx="2" fill="#CBD5E1" />

                {/* Result Badge */}
                <rect
                  x="75"
                  y="94"
                  width="105"
                  height="18"
                  rx="4"
                  fill="#ECFDF5"
                  stroke="#A7F3D0"
                  strokeWidth="1"
                />
                <circle cx="85" cy="103" r="4" fill="#007A52" />
                <path
                  d="M83 103 L84.5 104.5 L87.5 101"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="93"
                  y="106"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="7.5"
                  fill="#065F46"
                  fontWeight="700"
                >
                  NO DISCLOSURES
                </text>

                {/* Subtle watermark */}
                <circle cx="160" cy="115" r="24" stroke="#F1F5F9" strokeWidth="3" fill="none" />

                {/* Seal & Rosette */}
                <g transform="translate(195, 114)">
                  <path d="M12 24 L6 42 L16 38 L24 42 L20 24" fill="#007A52" opacity="0.9" />
                  <path d="M20 24 L26 42 L36 38 L44 42 L40 24" fill="#005A3C" opacity="0.9" />
                  <circle cx="26" cy="18" r="18" fill="#F59E0B" />
                  <circle cx="26" cy="18" r="14" fill="#D97706" />
                  <circle cx="26" cy="18" r="11" fill="#FEF3C7" />
                  <path
                    d="M21 18 L24 21 L31 14"
                    stroke="#007A52"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Dispatched line */}
                <rect
                  x="75"
                  y="152"
                  width="84"
                  height="14"
                  rx="3"
                  fill="#F8FAFC"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
                <text
                  x="81"
                  y="162"
                  fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  fontSize="7.5"
                  fill="#64748B"
                  fontWeight="600"
                >
                  DISPATCHED · 2 DAYS
                </text>
              </svg>
            </div>
            <div className="workflow-visual-card__body">
              <span className="workflow-visual-card__step" aria-hidden="true">
                03
              </span>
              <h3 className="workflow-visual-card__title">Get your certificate</h3>
            </div>
          </article>
        </div>
    </section>
  )
}
