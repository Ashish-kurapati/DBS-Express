# DBS-Express

A single, responsive DBS-Express website built with React, TypeScript, and Vite. The homepage brings together Basic, Standard, and Enhanced check guidance, a short service workflow, integrations, FAQs, and links to current pricing, applications, and support.

Applications, account access, and business-information pages are provided by the existing DB-Express service; this project is the public website and does not implement application processing or a backend.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

## Routes

The site is a single-page website served at `/`. Vercel rewrites requests to the app entry point so direct navigation works. The former prototype URLs do not select separate designs.

The header uses the ThreeUI AnimatedTopDock modern command bar, with its proximity animation connected to the DBS checks, workflow, pricing, FAQ, contact, login, and enquiry actions. Its motion respects reduced-motion settings and is disabled on narrow or non-fine-pointer viewports by the source controller. The hero uses a static illustration of the three DBS check types. Other sections and check cards reveal gently as they enter view, and the FAQ uses native keyboard-accessible disclosure controls.

The dock's component, controller, shader sources, and shared stylesheet are copied from the registered ThreeUI source bundle. A locally bundled Fragment Mono font from Fontsource is used as the authorized substitute for the unavailable registered font binary; see `src/shaders/fonts/OFL.txt` and `src/shaders/THIRD-PARTY-NOTICES.md`.

## Checks

```sh
npm run lint
npm run build
npm run preview
```

## Content and deployment

The application, login, pricing, and business-page links point to the configured DB-Express service in `src/data/siteContent.ts`. Check eligibility guidance against GOV.UK. Confirm current business claims, integration details, legal copy, and service links with DB-Express before publishing. Deploy the generated `dist` directory to a static host; `vercel.json` provides the SPA rewrite.
