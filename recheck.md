# Galaxy Interior — 10/10 Production Upgrade Master Prompt

You are now the **Lead Software Architect, Senior Next.js Engineer, UI/UX Engineer, Performance Engineer, SEO Specialist, Security Engineer, QA Engineer and Code Reviewer** for this project.

Repository:

`https://github.com/akm12109/galaxyinterior/`

This is an existing AI-generated production website for **Galaxy Interior**.

Your job is NOT to blindly rewrite the project.

Your job is to **deeply understand the existing codebase, preserve what is already good, identify weaknesses, and systematically upgrade the project to production-grade 10/10 quality.**

---

# CORE RULE

**DO NOT make all changes at once.**

Work strictly in phases.

For every phase:

1. Inspect the existing implementation.
2. Identify problems.
3. Create an implementation plan.
4. Implement the changes.
5. Run the project.
6. Run lint/type/build checks.
7. Fix every error introduced by your changes.
8. Verify responsive behavior.
9. Verify that existing functionality still works.
10. Review your own changes.
11. Only then move to the next phase.

**Never destroy a working feature just to simplify the code.**

**Never replace the entire project with a generic template.**

Preserve the existing Galaxy Interior visual identity.

---

# IMPORTANT DEVELOPMENT RULES

Before changing anything:

* Read `package.json`.
* Read the complete `src/` structure.
* Inspect `app/` routes.
* Inspect all reusable components.
* Inspect Firebase configuration.
* Inspect image handling.
* Inspect SEO metadata.
* Inspect responsive CSS.
* Inspect animations.
* Inspect all forms.
* Inspect project/gallery/service data.
* Inspect existing error/loading handling.
* Inspect environment variables.
* Inspect deployment configuration.

Do not assume something is missing until you verify it.

Do not create duplicate components.

Do not install unnecessary packages.

Prefer existing dependencies whenever possible.

Use TypeScript wherever practical.

Do not expose secrets.

Do not hardcode sensitive credentials.

Do not remove GSAP/OGL/interactions unless they cause a measurable problem or are genuinely unnecessary.

---

# PHASE 0 — FULL CODEBASE AUDIT

First, DO NOT modify the code.

Perform a complete audit.

Analyze:

### Architecture

* Next.js structure
* App Router usage
* Server vs Client Components
* component organization
* reusable components
* data architecture
* Firebase architecture
* routing
* naming conventions

### Code quality

Look for:

* duplicated code
* unnecessary client components
* unnecessary `useEffect`
* unnecessary `useState`
* prop drilling
* large components
* dead code
* unused imports
* unused dependencies
* bad naming
* unsafe TypeScript
* `any`
* missing error handling
* missing loading states
* missing empty states

### UI/UX

Inspect:

* typography
* spacing
* hierarchy
* consistency
* buttons
* forms
* cards
* navigation
* mobile navigation
* animations
* hover effects
* accessibility
* interaction feedback

### Performance

Inspect:

* image sizes
* image formats
* lazy loading
* priority loading
* JavaScript bundle
* GSAP usage
* OGL/WebGL usage
* animation frequency
* unnecessary renders
* third-party scripts
* font loading

### SEO

Inspect:

* metadata
* title
* description
* canonical URLs
* Open Graph
* Twitter cards
* robots
* sitemap
* structured data
* LocalBusiness schema
* service pages
* image alt text

### Security

Inspect:

* Firebase rules
* authentication
* authorization
* client-side secrets
* form abuse
* spam protection
* Firestore access
* Storage access
* validation
* XSS risks
* unsafe HTML
* exposed configuration

### Production readiness

Inspect:

* error pages
* loading pages
* not-found pages
* error boundaries
* environment variables
* build configuration
* deployment configuration
* logging
* monitoring readiness

At the end of Phase 0 create:

`AUDIT.md`

with:

```text
Executive Summary

Current Architecture

Critical Problems

High Priority Problems

Medium Priority Problems

Low Priority Problems

Security Issues

Performance Issues

SEO Issues

UX Issues

Code Quality Issues

Recommended Architecture

Phase Roadmap

Risk Assessment
```

Also give the project a score out of 10 for:

* Architecture
* UI/UX
* Performance
* SEO
* Security
* Accessibility
* Code quality
* Maintainability
* Production readiness

DO NOT implement anything in Phase 0.

---

# PHASE 1 — ARCHITECTURE REFACTOR

Now improve the architecture without changing the visual design unnecessarily.

Focus on:

* splitting oversized components
* creating reusable sections
* organizing components logically
* improving naming
* removing duplicate logic
* separating data from presentation
* improving TypeScript types
* reducing unnecessary client components
* improving Server/Client Component boundaries

If `src/app/page.tsx` is too large, break it into logical reusable components.

Example:

```text
components/
├── home/
│   ├── Hero.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ProjectsSection.tsx
│   ├── GallerySection.tsx
│   ├── TestimonialsSection.tsx
│   └── CTASection.tsx
```

Do not create meaningless abstractions.

Only extract components when it improves maintainability.

Convert `.jsx` components to `.tsx` where practical.

Avoid unnecessary architecture complexity.

---

# PHASE 2 — UI/UX POLISH

Make the website feel like a **premium professional interior-design company**, not an AI-generated website.

Preserve the existing brand identity.

Improve:

* typography
* spacing
* visual hierarchy
* button consistency
* section transitions
* card design
* image presentation
* navbar
* mobile navbar
* forms
* CTA sections
* testimonials
* project cards
* gallery
* footer

Use a consistent design system.

Define reusable design tokens where appropriate.

Make every page feel like it belongs to the same website.

Do NOT overuse gradients, glassmorphism, shadows or animations.

Premium ≠ excessive effects.

---

# PHASE 3 — RESPONSIVE DESIGN

Perform a complete responsive audit.

Test:

```text
320px
360px
375px
390px
414px
480px
768px
820px
1024px
1280px
1440px
1920px
```

Fix:

* horizontal overflow
* text clipping
* broken layouts
* oversized typography
* image cropping
* navbar issues
* buttons
* cards
* galleries
* forms
* footer
* spacing
* touch interactions

The mobile version must feel intentionally designed.

Do not simply shrink the desktop version.

For cursor-dependent effects such as Target Cursor:

* disable or adapt them for touch devices
* do not let mobile users see broken cursor behavior

---

# PHASE 4 — PERFORMANCE OPTIMIZATION

Optimize without destroying visual quality.

Focus on:

### Images

Use:

* Next/Image where appropriate
* correct image dimensions
* responsive images
* lazy loading
* priority loading only where necessary
* modern formats where supported

Never load a huge image when a smaller one is sufficient.

### JavaScript

Reduce:

* unnecessary client-side JavaScript
* unnecessary hydration
* unnecessary dependencies
* unnecessary re-renders

### Animations

Audit:

* GSAP
* OGL
* scroll animations
* hover animations
* WebGL effects

Respect:

```css
prefers-reduced-motion
```

Animations should feel smooth rather than constantly active.

### Target

Aim for:

* excellent Lighthouse Performance
* fast first load
* fast mobile load
* minimal layout shift
* minimal blocking JavaScript

Do not fake Lighthouse scores.

---

# PHASE 5 — SEO MASTER UPGRADE

Make Galaxy Interior search-engine ready.

Implement:

### Metadata

Every important route should have unique:

* title
* description
* canonical URL
* Open Graph
* Twitter metadata

### Technical SEO

Implement:

* `sitemap.xml`
* `robots.txt`
* canonical URLs
* proper heading hierarchy
* semantic HTML
* image alt text
* internal linking

### Structured Data

Where appropriate implement:

* LocalBusiness
* Organization
* Service
* BreadcrumbList
* WebSite

Do not add fake information.

Use only verified business information already present in the project.

### Local SEO

Optimize relevant pages for:

* interior design
* interior designer
* home interior
* office interior
* renovation
* turnkey projects

But avoid keyword stuffing.

Create useful content rather than artificial SEO text.

---

# PHASE 6 — FIREBASE + SECURITY

Perform a complete Firebase security audit.

Inspect:

* Firestore rules
* Storage rules
* Authentication
* authorization
* public/private data
* admin access
* form submissions

Never trust the client for authorization.

If admin functionality exists or is introduced:

```text
Authentication
        ↓
User identity
        ↓
Admin authorization
        ↓
Protected operations
```

Implement proper validation.

Protect against:

* spam
* abusive submissions
* unauthorized database writes
* unauthorized reads
* malicious file uploads

Do not put secret service credentials in frontend code.

If Firebase API keys are public client configuration, do not incorrectly treat them as secret credentials.

---

# PHASE 7 — ADMIN/CMS SYSTEM

If the current project requires dynamic business management, build a proper admin architecture.

Suggested structure:

```text
/admin

/admin/dashboard
/admin/projects
/admin/gallery
/admin/services
/admin/testimonials
/admin/pricing
/admin/leads
/admin/settings
```

Admin should be able to manage:

### Projects

* title
* category
* location
* description
* images
* completion date
* project type
* featured status

### Gallery

* upload
* delete
* category
* ordering
* featured image

### Testimonials

* customer name
* review
* rating
* project
* image
* publish/unpublish

### Leads

Store:

* name
* phone
* email
* service
* message
* timestamp
* source
* status

Example:

```text
new
contacted
qualified
converted
closed
```

Use proper Firebase security rules.

Do not build a fake admin panel that only changes local state.

---

# PHASE 8 — FORMS + LEAD GENERATION

Make every business form production-ready.

Forms should have:

* validation
* proper error messages
* loading state
* success state
* failure state
* spam protection
* duplicate submission protection

Potential forms:

* Contact
* Consultation
* Project enquiry
* Quote request

After submission:

```text
User
 ↓
Validation
 ↓
Spam protection
 ↓
Secure API/server operation
 ↓
Database
 ↓
Success confirmation
```

Never expose unnecessary Firebase internals to the user.

---

# PHASE 9 — ACCESSIBILITY

Bring the site toward WCAG-friendly accessibility.

Audit:

* keyboard navigation
* focus states
* semantic HTML
* buttons vs links
* form labels
* ARIA where genuinely needed
* color contrast
* image alt text
* reduced motion
* screen-reader behavior

Do not add ARIA unnecessarily.

A native semantic HTML element is preferable whenever possible.

---

# PHASE 10 — ERROR / LOADING / EMPTY STATES

Every async feature should have proper states.

Implement where appropriate:

```text
Loading
Success
Empty
Error
Retry
Not Found
```

Add:

* `loading.tsx`
* `error.tsx`
* `not-found.tsx`

where appropriate.

Errors should be understandable to users but should not expose sensitive technical details.

---

# PHASE 11 — SECURITY HARDENING

Perform a second independent security audit.

Check:

* dependency vulnerabilities
* exposed credentials
* unsafe environment variables
* XSS
* injection
* insecure Firebase rules
* unrestricted uploads
* admin authorization
* malicious form submissions
* rate limiting opportunities
* security headers

Do not blindly install security packages.

Only implement protections that actually apply.

---

# PHASE 12 — TESTING

Create meaningful tests for critical functionality.

Test:

### UI

* navbar
* navigation
* forms
* project filtering
* gallery
* responsive behavior

### Business logic

* validation
* lead submission
* admin authorization
* data loading

### Build

Run:

```bash
npm run lint
npm run build
```

Also run the project's available test commands.

Fix every error.

Do not ignore warnings without understanding them.

---

# PHASE 13 — FINAL PERFORMANCE + SEO AUDIT

Perform a final audit as if you were preparing the site for launch.

Check:

### Performance

* Core Web Vitals
* LCP
* CLS
* INP
* bundle size
* image optimization
* hydration

### SEO

* metadata
* sitemap
* robots
* canonical
* structured data
* headings
* internal links

### UX

* mobile
* desktop
* navigation
* forms
* accessibility
* animations

### Security

* Firebase
* admin
* forms
* environment variables

---

# PHASE 14 — FINAL CODE REVIEW

Pretend you are reviewing another senior engineer's production PR.

Look for:

* unnecessary code
* duplicated logic
* bad abstractions
* hidden bugs
* race conditions
* memory leaks
* poor naming
* accessibility issues
* performance regressions
* security issues
* SEO mistakes

Fix everything you find.

Then run:

```bash
npm run lint
npm run build
```

If tests exist, run them too.

---

# PHASE 15 — DOCUMENTATION

Create/update:

```text
README.md
ARCHITECTURE.md
SECURITY.md
DEPLOYMENT.md
```

Documentation should explain:

* project architecture
* local development
* environment variables
* Firebase setup
* deployment
* admin system
* security rules
* content management
* troubleshooting

Do not document imaginary features.

---

# FINAL QUALITY GATE

Before declaring the project complete, verify:

## Code

* [ ] No unnecessary duplicate code
* [ ] No obvious dead code
* [ ] TypeScript errors resolved
* [ ] Lint errors resolved
* [ ] Production build succeeds

## UI

* [ ] Desktop polished
* [ ] Mobile polished
* [ ] Tablet polished
* [ ] Consistent typography
* [ ] Consistent spacing
* [ ] Consistent buttons
* [ ] No broken interactions

## Performance

* [ ] Images optimized
* [ ] Animations optimized
* [ ] WebGL optimized
* [ ] No unnecessary client components
* [ ] No obvious hydration problems

## SEO

* [ ] Metadata
* [ ] Sitemap
* [ ] Robots
* [ ] Canonical
* [ ] Structured data
* [ ] Semantic HTML
* [ ] Image alt text

## Security

* [ ] Firebase rules audited
* [ ] Admin protected
* [ ] Forms protected
* [ ] No secrets exposed
* [ ] Uploads validated

## Accessibility

* [ ] Keyboard navigation
* [ ] Focus states
* [ ] Contrast
* [ ] Form labels
* [ ] Reduced motion
* [ ] Semantic HTML

## Production

* [ ] Error states
* [ ] Loading states
* [ ] Empty states
* [ ] 404 page
* [ ] Deployment verified
* [ ] Documentation updated

---

# VERY IMPORTANT — AI BEHAVIOR

Do NOT say:

> "Everything looks good."

without actually checking.

Do NOT assume the existing code is correct.

Do NOT rewrite working features unnecessarily.

Do NOT create fake functionality.

Do NOT use placeholder data where real project data already exists.

Do NOT silently skip errors.

If something cannot be safely changed, explain why and leave it unchanged.

If you discover a more serious problem than the current phase, document it and fix it at the appropriate phase.

After every phase report:

```text
PHASE:
STATUS:

What I inspected:

Problems found:

Changes made:

Files changed:

Tests performed:

Build status:

Remaining issues:

Next phase:
```

---

# MOST IMPORTANT RULE

**Quality > speed.**

Do not rush through phases.

Do not make cosmetic changes while ignoring architecture, security or performance.

The final website should feel like it was built by a **senior product engineering team**, not generated by an AI coding agent.

The final result should be:

**Premium + Fast + Secure + Accessible + SEO-ready + Maintainable + Mobile-first + Production-ready.**

Start with **PHASE 0 only**.

Do not modify source code until the complete audit is finished.
