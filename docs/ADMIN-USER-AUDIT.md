# ADMIN & USER PLATFORM AUDIT
**Date:** August 21, 2026
**Project:** Galaxy Interior

## 1. Current Architecture
The current Galaxy Interior project (`k:\galaxy\Galaxy_Interior`) is a Next.js 16 (App Router) application serving as the primary marketing website.
- **Frontend Stack:** Next.js 16, React 19, Tailwind CSS, Lucide React, Framer Motion.
- **Backend/BaaS:** Firebase (Firestore).
- **Public Routes:** `/`, `/about`, `/services`, `/projects`, `/gallery`, `/pricing`, `/contact`.
- **Admin Panel:** An independent Next.js project exists at `k:\galaxy\galaxy_interior_admin` which currently has a basic layout, `/login` page, and a `/` dashboard, connected to the same Firebase instance.

## 2. Existing Database Structure
Currently, Firestore is utilized in a limited, flat structure:
- `inquiries`: Used for contact form submissions and hero section quote requests.
- `reviews`: Stores customer testimonials.
- `projects`: Stores portfolio projects.
- `gallery_images`: Stores gallery media.

**Conflicts / Gaps for New Architecture:**
- **No User Management:** There is no `users` collection or role-based access control (RBAC).
- **Hardcoded Pricing:** The `/pricing` page currently hardcodes `PRICING_DATA` and `PACKAGES`. This violates Phase 15.
- **Missing Collections:** We need to introduce `quoteRequests`, `pricingPackages`, `pricingCategories`, `pricingItems`, `supportTickets`, `supportMessages`, `heroSlides`, `services`, `notifications`, `settings`, and `auditLogs`.

## 3. Proposed Architecture

We will implement a 3-tier experience across the two codebases:

### Public Website (`Galaxy_Interior`)
Will consume dynamic data for Pricing, Hero Slides, Services, Gallery, and Testimonials from Firestore. Hardcoded constants will be replaced with real-time listeners or SSR fetches.

### Customer Dashboard (`Galaxy_Interior/src/app/dashboard`)
A new protected route group within the main app for authenticated customers.
- **Auth:** Firebase Auth (Email/Password or OAuth).
- **Routes:** `/dashboard/projects`, `/dashboard/quotes`, `/dashboard/support`, `/dashboard/profile`.
- **Data Isolation:** Firestore security rules will ensure `request.auth.uid == resource.data.customerId`.

### Admin Management System (`galaxy_interior_admin`)
The dedicated admin portal will be expanded significantly to handle all business operations.
- **Routes:** `/customers`, `/projects`, `/pricing/*`, `/quotes`, `/tickets`, `/content/*`, `/audit-logs`.
- **Auth:** Firebase Auth protected via `AuthContext`. Only users with `role == 'admin'` in their Firestore document (or Custom Claims) will be authorized.

## 4. Reusable Components & Affected Files
- **Reusable:** Existing UI components (`Logo`, layout wrappers, buttons) can be leveraged for the Customer Dashboard.
- **Must Change in Main App:**
  - `src/app/pricing/page.tsx` (Must become dynamic)
  - `src/components/home/HeroSection.tsx` (Must pull slides dynamically)
  - `src/components/home/ReviewsSection.tsx` (Must filter by `status == 'approved'`)
  - `src/app/contact/page.tsx` (Must add Support Ticket logic for logged-in users)
- **Security:** `firestore.rules` currently allows public writes to `inquiries` and `reviews`. This will need to be significantly expanded to support data isolation, pricing versioning, and ticket privacy.

## 5. Security Requirements
- **Customer Data Privacy:** Customers must NEVER read other customers' projects, quotes, tickets, or profiles.
- **Admin Authorization:** Admin operations must verify role on the server/Firestore-rules side.
- **Audit Logging:** All pricing, project status, and ticket updates performed by admins must write an immutable record to `auditLogs`.
- **Pricing Integrity:** Historical quotes must save a snapshot of the prices to prevent corruption when admins update live rates.

---
**Audit Status:** Complete. Ready for Phase 2.
