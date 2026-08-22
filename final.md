# Galaxy Interior — Complete Integration Fix Prompt

You are a senior Next.js, Firebase, Firestore Security Rules, Firebase Storage Rules, TypeScript, UX, QA, and full-stack engineer.

You must fix and complete these two existing local projects together:

```text
Public website:
K:\galaxy\Galaxy_Interior

Admin panel:
K:\galaxy\galaxy_interior_admin
```

Both applications intentionally use the same Firebase project:

```text
galaxy-interior
```

Do not create a separate backend, separate Firebase project, mock API, duplicate database, or a third application.

Your goal is to make the public website and admin panel fully connected, secure, and production-ready while preserving the existing premium Galaxy Interior UI, responsive layouts, animations, pages, and brand styling.

---

## Mandatory working rules

1. Inspect both repositories completely before changing code.
2. Read existing `AGENTS.md` files before coding.
3. Do not delete working features or replace the design with generic UI.
4. Use TypeScript properly. Avoid `any` unless absolutely unavoidable.
5. Reuse the existing Firebase project and shared collections.
6. Use consistent schemas, collection names, field names, statuses, and Storage paths in both apps.
7. Do not use mock data when real Firebase data should exist.
8. Do not mark a feature complete until its full public → Firebase → admin → public flow works.
9. Update Firestore and Storage rules to exactly match the implemented data model.
10. Do not expose admin-only data publicly.
11. After every phase, run lint/build checks for the affected project and fix errors before continuing.
12. At the end, provide a concise implementation report with changed files, final schema, deployed-rule instructions, and test results.

---

# Existing architecture to preserve

Public app:

```text
K:\galaxy\Galaxy_Interior
```

Admin app:

```text
K:\galaxy\galaxy_interior_admin
```

Shared Firebase collections currently used:

```text
users
projects
project updates subcollection
project documents subcollection
quoteRequests
supportTickets
supportMessages
notifications
auditLogs
pricingPackages
pricingCategories
pricingItems
heroSlides
gallery_images
services
reviews
pageContent
settings
inquiries
```

---

# Phase 1 — Establish shared data contracts

Create consistent TypeScript schema/types in both projects, or preferably a shared identical schema module copied carefully into both apps.

Define typed interfaces for:

```text
UserProfile
Project
PortfolioProject
ProjectUpdate
ProjectDocument
QuoteRequest
QuoteCalculation
SupportTicket
SupportMessage
Notification
PricingPackage
PricingCategory
PricingItem
HeroSlide
GalleryImage
Service
Review
PageContent
AuditLog
```

Standardize these statuses:

```text
Project status:
Draft
Submitted
Under Review
Planning
In Progress
On Hold
Completed
Cancelled

Quote status:
New
Under Review
Contacted
Quoted
Accepted
Rejected
Expired

Ticket status:
Open
Under Review
In Progress
Waiting for Customer
Resolved
Closed
```

Use one consistent naming convention everywhere:

```text
customerId
projectName
portfolioTitle
coverImageUrl
isPublic
isFeatured
createdAt
updatedAt
```

Never mix `userId` and `customerId` for the same ownership concept.

---

# Phase 2 — Fix authentication and role protection

Keep Firebase Auth.

Use the Firestore path:

```text
users/{uid}
```

Each user profile must include:

```ts
{
  uid: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  phone?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Requirements:

- Public registration creates only `role: 'customer'`.
- Customers cannot change their own role.
- Admin app must only allow `role: 'admin'`.
- Disabled users must be denied access in both apps.
- Customer dashboard must require authenticated customer access.
- Admin dashboard must require authenticated admin access.
- Add clean loading, unauthorized, and redirect states.

Do not rely only on frontend protection; enforce it in Firestore rules.

---

# Phase 3 — Fix dynamic pricing end to end

The admin must control all calculator data through:

```text
pricingPackages
pricingCategories
pricingItems
```

Admin must be able to create, edit, activate/deactivate, reorder, and delete:

1. Base packages
2. Categories
3. Add-ons/items

Pricing item types:

```text
per_sqft
fixed
percentage
```

Add these fields to pricing items:

```ts
{
  categoryId: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  pricingType: 'per_sqft' | 'fixed' | 'percentage';
  isActive: boolean;
  isOptional: boolean;
  autoApply: boolean;
  applicablePackageIds?: string[];
  applicableProjectTypes?: string[];
  sortOrder: number;
}
```

Rules:

- Only `autoApply: true` percentage items should be automatically included.
- Optional items should only be included when selected by user.
- Percentage charges should calculate from an explicitly documented base.
- Prevent duplicate calculation items.
- Preserve itemized quote line items.
- Support taxes, GST, location surcharge, discounts, and optional add-ons safely.
- Admin must be able to configure all rates without code changes.

Public calculator must:

- Fetch active pricing from Firebase.
- Filter items by selected package/project type where applicable.
- Show a clean itemized estimate.
- Save the final pricing snapshot, selected options, customer details, and calculation into `quoteRequests`.
- Work for guest users and signed-in users.
- If logged in, save `customerId`.
- If guest, store `customerId: null` and customer contact details.
- Never fail because of a mismatch between rules and written fields.

---

# Phase 4 — Build a real quote management system

Replace the placeholder route:

```text
K:\galaxy\galaxy_interior_admin\src\app\quotes\page.tsx
```

Build a complete admin quotation module.

Admin features:

- View all quote requests.
- Search by customer name, email, phone, project type, city, and status.
- Filter by date and status.
- View full quote calculation and selected package/add-ons.
- Change quote status.
- Add internal admin notes.
- Add manual discount/adjustment with audit record.
- Convert accepted quote into a customer project.
- Send a customer notification when quote status changes.
- Show quote pipeline totals and counts.

Create a quote detail route if needed:

```text
/quotes/[id]
```

Every quote status change and manual price adjustment must create an immutable `auditLogs` record.

---

# Phase 5 — Fix customer projects and create admin project management

Keep the customer “Start New Project” wizard, but align it to the shared project schema.

Customer-created project:

```ts
{
  customerId: string;
  projectName: string;
  projectType: string;
  propertyType: string;
  location: string;
  areaSqft: number;
  estimatedBudget?: number;
  requirements: string;
  designPreferences?: string;
  timelinePreference?: string;
  status: 'Submitted';
  assignedTeam: [];
  isPublic: false;
  isFeatured: false;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Admin must be able to:

- Create a project manually.
- Edit project name, type, location, area, budget, requirements, assigned team, and status.
- Change project status.
- Add progress updates.
- Upload project documents.
- Upload progress images.
- Delete project safely.
- Notify the customer when status, update, or document changes.
- Link project to an accepted quote.
- Mark a project as public portfolio content.
- Set portfolio title, short description, cover image, gallery images, category, location, area, completion year, `isPublic`, and `isFeatured`.

Replace the placeholder route:

```text
K:\galaxy\galaxy_interior_admin\src\app\projects\new\page.tsx
```

with a complete project creation form.

---

# Phase 6 — Separate internal projects from public portfolio safely

Do not expose private customer project data on the public website.

Choose and implement one clean architecture:

Option A — Recommended:

```text
projects/{projectId}            = private customer/admin project
portfolioProjects/{portfolioId} = public portfolio project
```

Option B:

Use `projects` only, but carefully restrict every public field and ensure no private data is readable publicly.

Recommended implementation:

- Use `projects` for customer/internal operations.
- Use `portfolioProjects` for public project showcase.
- Admin can publish/copy selected approved project information into `portfolioProjects`.
- Never expose customer name, phone, email, private documents, budget, or internal notes publicly.

Update public project page:

```text
K:\galaxy\Galaxy_Interior\src\app\projects\page.tsx
```

It must read real public portfolio data, not mock projects.

Fields:

```ts
{
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  status: 'ongoing' | 'upcoming' | 'completed';
  location: string;
  area: string;
  category: string;
  completionYear?: number;
  isPublic: true;
  isFeatured: boolean;
  sortOrder: number;
}
```

Add a public project detail page:

```text
/projects/[slug]
```

---

# Phase 7 — Fix hero, gallery, services, turnkey, and supervision content

Keep existing connected admin content modules.

Ensure these flows work:

```text
Admin hero manager
→ heroSlides
→ homepage HeroSection

Admin gallery manager
→ gallery_images
→ public gallery page

Admin services manager
→ services
→ public services page

Admin turnkey editor
→ pageContent/turnkey
→ /pricing/packages

Admin supervision editor
→ pageContent/supervision
→ /pricing/supervision
```

Requirements:

- Hero slides support desktop image, mobile image, title, subtitle, CTA text, CTA URL, sort order, and active state.
- Gallery supports title, category, image, active state, featured state, sort order.
- Services support name, description, image, CTA and sort order.
- Deleting an image must also remove the linked Firebase Storage file where practical.
- Public pages should show fallback content only if Firebase has no active content.
- Do not let inactive content appear publicly.
- Public pages should handle empty content gracefully.

---

# Phase 8 — Fix testimonials/reviews completely

There is currently a mismatch:

```text
Public site uses: reviews
Admin panel uses: testimonials
```

Standardize to one collection:

```text
reviews
```

Use this schema:

```ts
{
  customerName: string;
  location: string;
  rating: number;
  review: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  isFeatured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

Public users can submit reviews as `pending`.

Admin can:

- View pending/approved/rejected reviews.
- Approve or reject.
- Edit.
- Feature/unfeature.
- Delete.
- Upload customer image if required.

Public homepage must only show approved reviews, preferably featured reviews first.

Remove or replace dead `testimonials` collection usage.

---

# Phase 9 — Fix support ticket system end to end

Keep the existing support UI and status workflow.

Use this support ticket structure:

```ts
supportTickets/{ticketDocId}
{
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  projectId?: string;
  status: 'Open' | 'Under Review' | 'In Progress' | 'Waiting for Customer' | 'Resolved' | 'Closed';
  attachmentUrl?: string;
  attachmentPath?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastResponseAt?: Timestamp;
}
```

Use the Firestore document ID for references. Do not use a human-readable ticket number as a Firestore document path.

Support messages should be a subcollection:

```text
supportTickets/{ticketDocId}/messages/{messageId}
```

Each message:

```ts
{
  senderId: string;
  senderRole: 'customer' | 'admin';
  content: string;
  attachmentUrl?: string;
  attachmentPath?: string;
  createdAt: Timestamp;
}
```

Requirements:

- Customer sees only their own tickets.
- Admin sees all tickets.
- Customer can reply only to their own ticket.
- Admin can reply, update status, and close/resolve ticket.
- Ticket tracking screen should clearly require login if ownership verification is required.
- Or implement a secure public tracker using ticket number plus an additional secret verification field; do not expose ticket details publicly through guessable IDs.
- Every admin ticket status change and reply must notify the customer.
- Every customer reply must notify admin.
- Add audit log entries for admin status changes and admin actions.

---

# Phase 10 — Fix Firebase Storage paths and rules

Use consistent Storage paths:

```text
hero/{slideId}/{fileName}
gallery/{imageId}/{fileName}
services/{serviceId}/{fileName}
reviews/{reviewId}/{fileName}

tickets/{ticketDocId}/customer/{fileName}
tickets/{ticketDocId}/admin/{fileName}

projects/{projectId}/documents/{fileName}
projects/{projectId}/updates/{fileName}

portfolio/{portfolioProjectId}/{fileName}
```

Requirements:

- Only admins may upload/update/delete hero, gallery, services, portfolio, and approved review media.
- Customers may upload only to their own ticket attachments.
- Customers can read only documents/images belonging to projects they own.
- Admins can read/write all internal project/ticket files.
- Public can read only published public asset paths.
- Enforce MIME type and size limits where possible.
- Never use a project ID as a substitute for user ID in a rule unless the rule verifies ownership/admin role.

Update:

```text
K:\galaxy\Galaxy_Interior\storage.rules
```

---

# Phase 11 — Rewrite Firestore rules to match final schema

Update:

```text
K:\galaxy\Galaxy_Interior\firestore.rules
```

Rules must cover:

```text
users
inquiries
pricingPackages
pricingCategories
pricingItems
quoteRequests
projects
portfolioProjects
supportTickets
supportTickets/{ticketId}/messages
notifications
auditLogs
heroSlides
gallery_images
services
reviews
pageContent
settings
```

Rules requirements:

- Default deny.
- Public read only for explicit public content collections.
- Only admins can manage configuration/content/pricing.
- Customers can read/update only their own profile, without role escalation.
- Customers can access only their own projects, tickets, quote requests, notifications, and appropriate files.
- Guests may create contact inquiries and quote requests with validated required fields.
- Guests must not read private quotes, tickets, projects, users, or notifications.
- Audit logs are admin-write and admin-read only; immutable afterward.
- Do not allow unrestricted notification creation.
- Validate essential fields and ownership checks.

---

# Phase 12 — Complete notifications and audit logs

Use `notifications` consistently.

Notification schema:

```ts
{
  userId: string;
  title: string;
  message: string;
  type: 'ticket' | 'project' | 'quote' | 'system';
  link?: string;
  read: boolean;
  createdAt: Timestamp;
}
```

Admin notifications may use a deliberate system recipient such as:

```text
ADMIN
```

but only secure backend/admin-authorized flows may create them.

Implement:

- Customer notification bell.
- Admin notification bell.
- Full notifications page in admin.
- Mark-as-read.
- Links that open the relevant ticket/project/quote.

Replace placeholder route:

```text
K:\galaxy\galaxy_interior_admin\src\app\notifications\page.tsx
```

Audit logs should record:

```text
actorId
actorEmail
action
entityType
entityId
before
after
createdAt
```

Use audit logs for:

- Quote status and manual-price changes.
- Ticket status changes.
- Project status changes.
- Admin content deletion.
- Pricing changes.
- User activation/deactivation.

---

# Phase 13 — Complete admin settings and dashboard accuracy

Replace placeholder:

```text
K:\galaxy\galaxy_interior_admin\src\app\settings\page.tsx
```

Implement settings for:

- Company name.
- Contact email.
- Phone.
- Business address.
- Default GST percentage.
- Currency.
- Default quote validity days.
- Public site contact details.
- Supported cities.

Store in:

```text
settings/general
```

Use settings dynamically on public contact/footer/pricing areas where relevant.

Fix admin dashboard metrics:

- Count only customers, not admins, as customers.
- Correct project status categorization.
- Count only open/active tickets for “Open Tickets.”
- Use real quote date data rather than mock graph data.
- Include pipeline value based on valid quote statuses.

Dashboard file:

```text
K:\galaxy\galaxy_interior_admin\src\app\page.tsx
```

---

# Phase 14 — Remove dead routes and duplicated confusion

Identify duplicate placeholder routes such as:

```text
/hero
/gallery
/services
/testimonials
```

Either:

- Redirect them to the valid `/content/*` routes, or
- Replace them with useful functioning pages.

Do not leave dead routes that display plain placeholder text.

---

# Phase 15 — Validation and final QA

Perform complete testing using at least these scenarios:

## Public visitor

1. Opens homepage and sees active hero slides.
2. Opens gallery and sees active admin-uploaded images.
3. Opens services and sees active admin-created services.
4. Uses calculator as guest.
5. Submits quote request successfully.
6. Submits contact enquiry successfully.
7. Cannot access customer dashboard/private data.

## Customer

1. Registers and gets a `customer` profile.
2. Creates a project.
3. Views only their projects.
4. Creates a ticket with attachment.
5. Sends ticket replies.
6. Receives ticket/project/quote notifications.
7. Cannot access admin pages or other customer data.
8. Can view own quote requests.

## Admin

1. Signs in only if `role === 'admin'`.
2. Creates/updates/deactivates pricing package/category/item.
3. Public calculator reflects changes.
4. Views and manages quotes.
5. Creates/manages internal projects.
6. Publishes safe portfolio projects.
7. Updates hero/gallery/services content.
8. Approves reviews.
9. Replies to tickets with attachment.
10. Uploads/deletes project documents.
11. Views notifications and audit logs.
12. Cannot be blocked by Storage/Firestore path mismatches.

Run:

```bash
npm run lint
npm run build
```

for both projects and fix all relevant failures.

---

# Final deliverables

When work is complete, provide:

1. A list of every changed file.
2. Final Firestore collection schema.
3. Final Firebase Storage path schema.
4. Final Firestore rules.
5. Final Storage rules.
6. Any Firestore composite indexes required.
7. Steps to deploy rules.
8. Steps to create the first admin user safely.
9. A completed test checklist.
10. A list of anything intentionally deferred.

Do not claim completion if quote submission, ticket messaging, admin uploads, public portfolio publishing, or testimonials are still disconnected.