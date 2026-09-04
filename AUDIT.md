# PHASE 0 — FULL CODEBASE AUDIT
**Galaxy Interior Website — Production Readiness Report**
Date: 2026-08-21

---

## Executive Summary

Galaxy Interior is a Next.js 16 (App Router) website for an interior design and construction company serving Jharkhand, Bihar and surrounding regions. The visual identity is strong — dark navy + yellow color palette, GSAP-powered cursor, a rich set of pages (Home, Services, Projects, Gallery, Pricing, About, Contact). However, the project has numerous **critical and high-priority issues** that prevent it from being considered production-grade: unauthenticated public Firestore writes, unvalidated and unfired contact forms, missing SEO metadata, no error/loading/404 states, poor accessibility, and significant code smell throughout.

---

## Current Architecture

```
Galaxy Interior (Next.js 16, App Router)
├── src/
│   ├── app/
│   │   ├── page.tsx           (467 lines — monolith, MUST be split)
│   │   ├── layout.tsx
│   │   ├── globals.css        (Tailwind v4 @theme — minimal)
│   │   ├── about/page.tsx     (325 lines)
│   │   ├── contact/page.tsx   (237 lines — form is FAKE, no DB write)
│   │   ├── gallery/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── projects/page.tsx
│   │   └── services/
│   │       └── [5 sub-routes]
│   ├── components/
│   │   ├── CircularGallery.jsx  (20KB — OGL/WebGL, .jsx not .tsx)
│   │   ├── TargetCursor.jsx     (14KB — GSAP, .jsx not .tsx)
│   │   ├── Tooltip.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Logo.tsx
│   ├── data/
│   │   └── cursorTooltips.json
│   └── types/
│       └── review.ts
├── firebase.js                (root-level, not in src/, hardcoded credentials)
└── public/
    ├── ceo.png                (7.87 MB — CRITICAL: enormous unoptimized image)
    ├── logo.png               (5.06 MB — CRITICAL: enormous unoptimized image)
    └── [other public assets]
```

---

## Scores

| Category | Score | Notes |
|---|---|---|
| **Architecture** | 4/10 | Monolith page.tsx, all pages force client rendering, firebase.js at root |
| **UI/UX** | 6/10 | Strong brand identity, but mobile needs work, inconsistent states |
| **Performance** | 3/10 | Massive unoptimized images, no Next/Image on key hero images, all pages client-side |
| **SEO** | 2/10 | No page-level metadata, no sitemap, no robots.txt, no structured data |
| **Security** | 2/10 | Public unauthenticated Firestore writes, hardcoded Firebase config in .js |
| **Accessibility** | 3/10 | No ARIA labels, no form labels, no focus-visible states, missing alt text |
| **Code Quality** | 4/10 | Lint errors, unused imports everywhere, duplicate tooltip key in JSON |
| **Maintainability** | 4/10 | 467-line monolith, data mixed with UI, no Server Components |
| **Production Readiness** | 2/10 | No loading states, no error pages, contact form does nothing, no 404 page |

---

## Critical Problems

### CRIT-1: Contact Form Does Nothing
**File:** `src/app/contact/page.tsx`
The contact form uses `setTimeout` to simulate submission. **No data is ever saved to Firebase or any backend.** Users who fill out the form believe they have submitted an inquiry, but nothing happens. This is the primary business-critical failure.

### CRIT-2: Completely Open Firestore — Anyone Can Write Reviews
**File:** `firebase.js`, `src/app/page.tsx`
The review submission form writes directly to Firestore with **zero validation, zero rate limiting, and zero authentication.** Anyone can spam the public-facing reviews with malicious content.

### CRIT-3: Giant Unoptimized Images
**Files:** `public/ceo.png` (7.87 MB), `public/logo.png` (5.06 MB)
These files are loaded raw, bypassing Next.js optimization. These alone will cause catastrophically slow LCP scores on mobile.

### CRIT-4: Firebase Config is a `.js` file with Hardcoded Credentials
**File:** `firebase.js`
Firebase API keys are hardcoded directly in a non-TypeScript `.js` file at the project root (outside `src/`). Should live in `src/lib/firebase.ts` driven by environment variables.

---

## High Priority Problems

### HIGH-1: `page.tsx` is a 467-line Client Monolith
The entire homepage is one `'use client'` component. It should be split into sub-components with server components where possible.

### HIGH-2: Zero SEO Metadata on Any Page
Only `title: 'Galaxy Interior'` and `description: 'Elite Living Redefined.'` exist globally. No per-page metadata, no Open Graph, no Twitter Cards, no `sitemap.xml`, no `robots.txt`, no JSON-LD structured data.

### HIGH-3: All Pages Forced to `'use client'` Unnecessarily
Every page starts with `"use client"`. About, pricing, and services have no interactivity and should be server components.

### HIGH-4: No Loading, Error, or 404 Pages
Missing `loading.tsx`, `error.tsx`, `not-found.tsx`. When Firebase fails, users see nothing.

### HIGH-5: 8 Lint Errors, 15+ Lint Warnings
- `react/no-unescaped-entities` errors in 5 files
- Unused import warnings across almost every file
- `no-img-element` warnings — should use `<Image />` from Next.js

---

## Medium Priority Problems

### MED-1: Hero Images Are Raw Unsplash `<img>` Tags
3 high-res Unsplash images loaded without optimization or priority hints.

### MED-2: Duplicate Key in `cursorTooltips.json`
`"services-construction-project"` defined on lines 26 AND 27. Second silently overwrites first.

### MED-3: Firebase Initialized Without `getApps()` Guard
Can throw "Firebase App already exists" in development Fast Refresh.

### MED-4: `analytics` Variable Assigned But Never Used
Creates a dead code lint warning in `firebase.js`.

### MED-5: Mobile Cursor Experience Broken
TargetCursor DOM renders on mobile where touch events behave inconsistently.

### MED-6: Navbar Hardcoded Color `bg-[#6b768a]`
Not part of the design token system. Should use `bg-brand-gray` or similar.

### MED-7: Review Form Has No Spam Protection
No debouncing, no server-side rate limiting, no honeypot.

### MED-8: Social Media Links in Footer All Point to `#`
All 5 social buttons are dead links.

### MED-9: `TargetCursor` Instantiated on Every Page Separately
Should be in root `layout.tsx` once.

### MED-10: Consultation Form on Homepage Does Nothing
Name, phone, and location are collected but never saved anywhere.

---

## Low Priority Problems

### LOW-1: `package.json` name is `"temp_next"`
Should be `"galaxy-interior"`.

### LOW-2: Nested `<main>` Elements — Invalid HTML
`layout.tsx` wraps children in `<main>`. `page.tsx` also opens with `<main>`. Results in nested `<main>` which is invalid HTML and an accessibility violation.

### LOW-3: `.jsx` Components Without TypeScript
`CircularGallery.jsx` (20KB) and `TargetCursor.jsx` (14KB) have no type safety.

### LOW-4: `next.config.ts` Is Completely Empty
No image `remotePatterns`, no security headers, no redirects.

### LOW-5: Unused Variables/Imports Across All Files
`TEAM` array in `about/page.tsx`, `loading` state in `projects/page.tsx`, `MapPin` in `contact/page.tsx`, and many more.

---

## Security Issues

| Severity | Issue | File |
|---|---|---|
| HIGH | Anyone can write to `reviews` Firestore collection without auth | `page.tsx` |
| HIGH | Contact form saves nothing — leads are silently lost | `contact/page.tsx` |
| MED | Firebase config not in environment variables | `firebase.js` |
| MED | No input sanitization on any form fields | Multiple |
| LOW | No CSP/security headers in `next.config.ts` | `next.config.ts` |

---

## Performance Issues

| Severity | Issue |
|---|---|
| CRITICAL | `public/ceo.png` = 7.87 MB, `public/logo.png` = 5.06 MB |
| HIGH | 4 raw `<img>` tags loading 2000px Unsplash images without optimization |
| HIGH | Every page is `'use client'` — no server rendering |
| MED | TargetCursor instantiated on every page route |
| MED | No `prefers-reduced-motion` support in any animation |
| MED | OGL/WebGL CircularGallery loads on mobile unnecessarily |

---

## SEO Issues

| Severity | Issue |
|---|---|
| CRITICAL | No unique page-level `<title>` or `<meta description>` |
| HIGH | No `sitemap.xml` |
| HIGH | No `robots.txt` |
| HIGH | No Open Graph / Twitter Card metadata |
| HIGH | No LocalBusiness JSON-LD structured data |
| MED | Non-descriptive image alt text ("Background", "Partner Logo") |
| MED | Missing canonical URLs |

---

## UX Issues

| Severity | Issue |
|---|---|
| CRITICAL | Contact form — user thinks message sent, nothing happens |
| CRITICAL | Hero consultation form — same problem |
| HIGH | No loading states for Firebase data (projects, gallery) |
| MED | Mobile cursor ghost appears on touch screens |
| MED | Social links in footer are dead |
| MED | CTA buttons ("Enquire Now", "View Projects", "Explore Packages") go nowhere |

---

## Recommended Architecture

```
src/
├── app/
│   ├── layout.tsx              (TargetCursor moved here — single instance)
│   ├── page.tsx                (imports section components, not a monolith)
│   ├── loading.tsx             (global loading skeleton)
│   ├── error.tsx               (global error boundary)
│   ├── not-found.tsx           (custom 404)
│   ├── sitemap.ts              (auto-generated sitemap)
│   ├── robots.ts               (robots.txt)
│   ├── about/page.tsx          (server component — no 'use client')
│   ├── contact/page.tsx        (real Firebase write)
│   ├── pricing/page.tsx        (server component)
│   └── services/
├── components/
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── FurnitureSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── CTASection.tsx
│   │   └── PartnersSection.tsx
│   ├── layout/
│   └── ui/
├── lib/
│   └── firebase.ts             (moved, typed, env-var driven)
└── types/
    └── review.ts
```

---

## Phase Roadmap

| Phase | Focus | Priority |
|---|---|---|
| **1** | Architecture: split `page.tsx`, move `firebase.js` to `src/lib/firebase.ts` | Critical |
| **2** | Wire Contact & Consultation forms to Firebase | Critical |
| **3** | Fix all lint errors (unescaped entities, unused imports) | High |
| **4** | Performance: Next/Image, compress images, `remotePatterns` | High |
| **5** | SEO: page metadata, sitemap, robots, JSON-LD | High |
| **6** | Error/Loading/404 pages | High |
| **7** | Security: Firebase rules, form validation | High |
| **8** | Remove unnecessary `'use client'` directives | Medium |
| **9** | Accessibility: labels, ARIA, focus-visible, alt text | Medium |
| **10** | Mobile polish: fix cursor on touch, responsive audit | Medium |
| **11** | UI polish: dead CTAs, social links, Navbar color | Medium |
| **12** | Final audit & documentation | Low |

---

## Risk Assessment

| Risk | Impact | Likelihood |
|---|---|---|
| Spam reviews flood Firestore | High — damages brand reputation | High — zero protection |
| Lost customer leads from broken contact form | Critical — direct revenue impact | Certain — confirmed |
| Slow mobile load from 13MB+ images | High — user bounces | High — confirmed |
| Poor Google indexing with no metadata | High — lost organic traffic | Certain — confirmed |
| Nested `<main>` — invalid HTML | Medium — a11y failures | Certain — confirmed |

---

**Phase 0 is complete. No source code was modified during this audit.**

**Ready to proceed to Phase 1 on approval.**
