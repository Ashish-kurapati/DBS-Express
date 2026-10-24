# DBS-Express website design previews

Three responsive frontend concepts for the DB-Express website, built with React, TypeScript and Vite. Applications and account access link to the existing DB-Express service; this project does not implement application processing or backend functionality.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

## Preview routes

- `/` — prototype picker (compare the three visual directions + animation experiment)
- `/prototype-a` — Clean & Trustworthy (primary candidate with enriched overview & interactions)
- `/prototype-a-animated` — Prototype A with the signature three-card extension animation & scroll-reveals
- `/prototype-b` — Bold & Conversion-Focused (high-contrast CTA focus, confident hero action panel)
- `/prototype-c` — Editorial & Sophisticated (asymmetric editorial layout, Georgia serif display typography)

## Design system & visual language

The design system is grounded in the approved DB-Express brand identity:
- **Surface palette (~75%)**: Pure white (`#ffffff`), soft white (`#f7f8f7`), mint white (`#eef7f3`), warm ivory (`#f7f3ea`), soft ivory (`#efe7d8`).
- **Brand & supporting accents (~20%)**: Dark emerald (`#035a41`), brand emerald (`#037554`), pale emerald (`#ccebe0`), deep charcoal (`#1d232a`), mid charcoal (`#3f4552`).
- **Detail accents (~5%)**: Muted gold (`#c9a64d`), dark gold (`#9a772d`), pale gold (`#f6f1e3`).
- **Typography**: Georgia serif display typography for editorial emphasis and major headings; clean sans-serif (Inter/system) for body text and interfaces.
- **Components**: Softly rounded rectangular buttons (`--radius-small: 6px`), structured cards with fine borders, restrained shadows (`--shadow-card`, `--shadow-hover`), and no pill buttons or distracting neon glow effects.

## Signature animation & motion system

### Three-card extension animation
Available at `/prototype-a-animated`:
1. **Initial state**: A compact, layered stack of three rounded rectangular cards in the hero area (01 Basic in front, 02 Standard in the middle, 03 Enhanced in the rear).
2. **Extension sequence**:
   - The foremost card (01 Basic) settles firmly into position.
   - The middle card (02 Standard) extends outward to the right (`+46px`, `+4.8deg`, `scale(0.985)`).
   - The rear card (03 Enhanced) extends farther outward to the left (`-70px`, `-8.5deg`, `scale(0.96)`).
   - Card headers, badges, content, and links sequentially fade in with smooth easing (`cubic-bezier(0.22, 1, 0.36, 1)`).
3. **Settled state**: Stable layered fan composition where all three cards remain readable, fully accessible, and hover-elevated on pointer devices.
4. **Mobile adaptation (<= 620px)**: The cards stack vertically in natural reading order without horizontal clipping or overflow.

### Interaction & scroll-reveal system across A, B, and C
- **Universal focus visibility**: Explicit `:focus-visible` emerald rings (`outline: 2px solid var(--brand-emerald); outline-offset: 2px`) for keyboard accessibility.
- **Hover interactions**: Scoped with `@media (hover: hover) and (pointer: fine)` so touch and mobile users experience no layout jump or sticky hover states.
- **Scroll-reveals**: Lightweight `IntersectionObserver` system that gently fades in section headings (`translateY(14px)` -> `0`).
- **Accessibility (`prefers-reduced-motion: reduce`)**: When the user requests reduced motion, all animations are immediately disabled, the cards display statically in their completed layout, and scroll-reveals are rendered as immediate visible blocks.

## Checks

```sh
npm run lint
npm run build
npm run preview
```

## Deployment

Build with `npm run build` and publish the generated `dist` directory to a static host such as Vercel. The project includes a `vercel.json` rewrite so the three prototype routes resolve to the app on direct navigation.

## Content, claims and imagery

The visible prototypes use the DB-Express name, the Basic, Standard and Enhanced check labels, employer/individual audience wording, and links to the existing service. They do not show local pricing values, turnaround promises, statistics, testimonials, company-registration details, phone numbers, or unverified integration claims.

Existing values and claims remain in `src/data/siteContent.ts` as source material for client review. This includes the 99.4%, under-24-hours and 50k+ figures; published pricing tiers; turnaround statements; testimonials; and benefits, workflow and integration copy. None are represented as independently verified by these prototypes. The handwritten workforce percentages are not included. Obtain confirmation of each claim, its source and any publication permission before displaying it.

The existing local assets include `dbs-express-logo.jpg`, a dashboard illustration, generic office/team scenes, and testimonial portraits. The logo is retained. The dashboard illustration includes unapproved colours and unsupported interface/credential claims; the people and office images have no established connection to DB-Express. Those images and portraits are therefore not used. The service cards use text rather than fabricated or unverified imagery. Approved DB-Express business imagery is still needed to make them image-led.

Prototype A's Basic check card attributes its description to the current public individual-check page. Standard and Enhanced cards link to the current employer-check information without asserting differences in eligibility or scope. Confirm all descriptions and destinations with the client before publication.

Each prototype has a different section sequence and presentation. The flash-card autoplay/scroll-linked interaction is intentionally not implemented pending client direction. The page is a design preview, not a production release; legal approval, final business claims, approved imagery, and client release approval remain outstanding.

### Prototype A client-approval checklist

Answer each question or mark “not approved/pending” with the correct information or source.

1. **DBS check descriptions and eligibility**
   - Is the Basic description “unspent convictions and conditional cautions” accurate and approved? What authoritative source and eligibility wording should be used?
   - What are the approved descriptions and eligibility requirements for Standard and Enhanced checks? In particular, please confirm whether Standard/Enhanced require an employer request and which roles qualify for Enhanced checks.

2. **Individual and employer pricing**
   - Which current fees apply to individual Basic checks and to employer Basic/Standard/Enhanced checks? Current linked pages differ: individual Basic £42.00 versus employer-tier Basic/Standard £37.70, £35.30, and £34.10; Enhanced £65.70, £63.30, and £62.10.
   - Please confirm the government/admin fee split, VAT treatment, volume thresholds, effective date, and the approved pricing-page destination.

3. **Processing times and service promises**
   - What processing and setup times are approved, and how should they be qualified? The reviewed pages mention under 24–48 hours, under 24 hours, same-day before 4pm, setup under 10 minutes, and employer setup under 5 minutes.
   - Are “no contracts,” free Right to Work checks, integrations, portal features, certificate dispatch, and other retained service claims accurate and currently available? Please provide evidence/source and any applicable terms.

4. **Application and registration destinations**
   - Is the current application destination (`https://www.dbs-express.co.uk/app/ci/index_controller/sign_up`) correct for employers and individuals? It currently begins with organisation details; should individuals use another route?
   - Are the login destination (`https://www.dbs-express.co.uk/app/login_direct`) and the Employers, Individuals, Pricing, Resources, About, FAQ, Contact, and footer destinations on `https://db-ssubmit.vercel.app` the intended live destinations? Are the `/resources`, `/faq`, `/policies`, and `/team` pages complete?

5. **Statistics, testimonials, credentials, and approved imagery**
   - May the statistics `99.4%`, `< 24h`, and `50k+` be published? For each, provide source, population, method, reporting period, and date.
   - Are the four retained testimonials authentic, correctly attributed, and approved for publication? Confirm written permission for names, roles, organizations, quotes, and portraits.
   - Are “ICO data registered,” “DBS umbrella body,” “Accredited DBS processing,” and the Talaty Group Ltd relationship current and approved? Please provide the exact evidence and entity wording.
   - Which DB-Express business images are approved for use, and what is their source/provenance? Otherwise, confirm text-only service cards.

6. **Privacy Policy, Terms and Conditions, and Cookie Policy**
   - Which versions and canonical destinations are approved: the preview-host web pages or the official-domain policy PDFs linked from registration? Who is the correct legal entity/controller, and are the policies complete and current?
   - What approved Cookie Policy/notice and consent behavior should be used? The current footer’s Cookie Policy link duplicates the Privacy Policy URL. Please provide the correct destination or confirm the label/target should change.

7. **Flash-card interaction preferences**
   - Should the cards remain static, advance automatically, respond to scrolling, or use another explicit user-triggered interaction? Static cards are the current default; no autoplay or scroll-linked behavior has been added.

8. **Final design approval for Prototype A**
   - Do you approve Prototype A (“Clean & Trustworthy”) as the primary design candidate for client review, including its current layout, content hierarchy, service cards, links, and restrained interactions?
   - Are any specific corrections required before sign-off? Please identify the exact section or issue; Prototypes B and C remain available for comparison.

No answers or business/legal claims have been assumed. The project remains a design preview; approval and verification are still required before publication.
