# GALAXY INTERIOR — COMPLETE USER + ADMIN PLATFORM

## 50-PHASE PRODUCTION IMPLEMENTATION MASTER PROMPT

You are the **Lead Full-Stack Architect, Senior Next.js Engineer, Firebase Architect, UI/UX Designer, Security Engineer, Product Designer, QA Engineer and Technical Auditor** for this project.

Existing repository:

`https://github.com/akm12109/galaxyinterior/`

Build a complete production-grade **Customer Portal + Admin Management System + Dynamic Pricing Calculator + Project Management + Support Ticket System** on top of the existing Galaxy Interior website.

The existing public website must NOT be destroyed.

Preserve the existing visual identity, premium interior/construction design language, animations, responsive behavior and existing working functionality.

---

# PRIMARY PRODUCT VISION

Galaxy Interior should become more than a marketing website.

It should become a complete customer-management platform:

```text
PUBLIC WEBSITE
      │
      ├── Services
      ├── Projects
      ├── Gallery
      ├── Pricing Calculator
      ├── Contact
      └── Login/Register
               │
               ▼
        CUSTOMER DASHBOARD
               │
       ┌───────┼────────┐
       │       │        │
    Projects  Quotes   Support
       │       │        │
       └───────┼────────┘
               │
               ▼
          ADMIN PANEL
               │
   ┌───────────┼────────────┐
   │           │            │
 Pricing     Projects      Tickets
   │           │            │
 Content     Customers      Leads
   │           │            │
 Homepage    Quotes       Analytics
```

---

# NON-NEGOTIABLE RULES

## RULE 1 — DO NOT BUILD EVERYTHING AT ONCE

Work strictly through the 50 phases below.

Never skip a phase.

Never silently combine major phases.

---

## RULE 2 — INSPECT BEFORE MODIFYING

Before every phase:

1. Inspect the current implementation.
2. Understand existing dependencies.
3. Identify affected files.
4. Identify possible regressions.
5. Create a small implementation plan.
6. Implement.
7. Test.
8. Review.
9. Fix.
10. Mark the phase complete.

---

## RULE 3 — NEVER DESTROY EXISTING FUNCTIONALITY

Before changing anything, identify existing behavior.

Do not remove:

* existing homepage
* existing services
* existing projects
* existing gallery
* existing animations
* existing Firebase functionality
* existing forms
* existing navigation

unless there is a strong technical reason.

---

# PHASE 1 — COMPLETE EXISTING PROJECT AUDIT

Do not modify code.

Analyze:

* Next.js architecture
* routes
* components
* Firebase
* authentication
* current forms
* current pricing
* project pages
* gallery
* animations
* CSS
* responsive behavior
* dependencies
* environment variables
* current database structure

Create:

`docs/ADMIN-USER-AUDIT.md`

Document:

* current architecture
* proposed architecture
* conflicts
* reusable components
* files that must change
* database requirements
* security requirements

---

# PHASE 2 — DEFINE PRODUCT ARCHITECTURE

Define three experiences:

```text
PUBLIC
CUSTOMER
ADMIN
```

Suggested routes:

```text
/
 /about
 /services
 /projects
 /gallery
 /pricing
 /contact

/login
/register

/dashboard
/dashboard/projects
/dashboard/projects/[id]
/dashboard/quotes
/dashboard/support
/dashboard/support/[ticketId]
/dashboard/profile
/dashboard/notifications

/admin
/admin/dashboard
/admin/customers
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/pricing
/admin/pricing/categories
/admin/pricing/items
/admin/pricing/packages
/admin/quotes
/admin/tickets
/admin/hero
/admin/gallery
/admin/services
/admin/testimonials
/admin/notifications
/admin/settings
/admin/audit-logs
```

Adjust routing according to the existing project architecture instead of blindly copying this structure.

---

# PHASE 3 — DATABASE ARCHITECTURE

Design a proper Firebase/Firestore data model.

Suggested collections:

```text
users
projects
projectUpdates
quotes
quoteRequests
pricingPackages
pricingCategories
pricingItems
supportTickets
supportMessages
heroSlides
gallery
services
testimonials
notifications
settings
auditLogs
```

Document relationships.

Do not duplicate large amounts of data unnecessarily.

---

# PHASE 4 — USER AUTHENTICATION

Implement production-ready authentication.

Support:

* registration
* login
* logout
* password reset
* authenticated session
* protected dashboard
* protected admin panel

Never trust frontend-only authentication.

---

# PHASE 5 — ROLE-BASED ACCESS CONTROL

Implement roles.

Minimum:

```text
customer
admin
```

Prepare architecture for future:

```text
super_admin
manager
designer
sales
support
```

Admin authorization must be enforced server-side/security-rule-side where applicable.

Never rely only on hiding UI buttons.

---

# PHASE 6 — USER PROFILE SYSTEM

Customer profile:

* name
* email
* phone
* profile photo
* address
* city
* state
* preferred contact method

Allow users to update allowed information.

Protect sensitive fields.

---

# PHASE 7 — CUSTOMER DASHBOARD SHELL

Create premium dashboard UI.

Dashboard should show:

```text
Welcome, Customer

Active Projects
Pending Quotes
Open Tickets
Completed Projects

Recent Activity

Upcoming Project Updates

Quick Actions:
+ Start Project
+ Get Estimate
+ Raise Support Ticket
```

Use the existing Galaxy Interior visual language.

Do not create a generic SaaS dashboard.

---

# PHASE 8 — CUSTOMER PROJECT INITIALIZATION

Customer can click:

**Start New Project**

Flow:

```text
Project Type
      ↓
Property Details
      ↓
Location
      ↓
Area
      ↓
Requirements
      ↓
Budget
      ↓
Preferred Timeline
      ↓
Design Preferences
      ↓
Submit
```

Possible project types:

* Interior Design
* Home Interior
* Office Interior
* Construction
* Renovation
* Turnkey Project
* Commercial Project
* Other

---

# PHASE 9 — PROJECT DATA MODEL

Every project should have:

```text
projectId
customerId
projectName
projectType
location
propertyType
area
budget
description
requirements
status
assignedTeam
createdAt
updatedAt
```

Statuses:

```text
Draft
Submitted
Under Review
Consultation
Planning
Design
Quotation
Approved
In Progress
On Hold
Completed
Cancelled
```

Admin must be able to change status.

---

# PHASE 10 — CUSTOMER PROJECT LIST

Dashboard:

```text
My Projects
```

Display:

* project name
* type
* location
* budget
* status
* created date
* last update

Provide filters:

* Active
* Completed
* Pending
* Cancelled

---

# PHASE 11 — CUSTOMER PROJECT DETAIL

Create:

```text
/dashboard/projects/[id]
```

Display:

* project overview
* property information
* budget
* current status
* assigned team
* timeline
* project updates
* documents
* quotation
* support tickets

---

# PHASE 12 — PROJECT TIMELINE

Create visual timeline:

```text
Project Started
      ↓
Requirement Review
      ↓
Site Inspection
      ↓
Design
      ↓
Quotation
      ↓
Approval
      ↓
Execution
      ↓
Completed
```

Admin controls timeline stages.

Customer can see progress but cannot manipulate internal status.

---

# PHASE 13 — PROJECT UPDATES

Admin/team can post updates:

```text
Title
Description
Images
Attachments
Date
Author
Stage
```

Customer sees updates inside project.

---

# PHASE 14 — DOCUMENT MANAGEMENT

Allow project documents:

* quotation
* BOQ
* design files
* invoices
* agreements
* project reports

Customer:

* view
* download

Admin:

* upload
* replace
* delete

Validate file types and sizes.

---

# PHASE 15 — PRICING ENGINE ARCHITECTURE

Build a fully dynamic pricing engine.

The frontend must NOT hardcode prices.

Pricing comes from Firebase/admin-managed configuration.

Formula should support:

```text
Base Package
+
Material Add-ons
+
Service Add-ons
+
Optional Features
+
Location Adjustment
+
Area Multiplier
+
Taxes
-
Discount
=
Estimated Total
```

---

# PHASE 16 — PRICING CATEGORIES

Admin can create categories.

Example:

```text
Foundation & Structure
Flooring & Tiling
Doors & Windows
Plumbing
Electrical
Paint & Finishes
Interior
Kitchen
Wardrobe
Smart Home
Landscaping
Solar
Other
```

Admin can:

* create
* edit
* disable
* reorder
* delete where safe

---

# PHASE 17 — PRICING ITEMS

Each pricing item:

```text
name
description
category
unit
price
pricingType
minimumQuantity
maximumQuantity
image
isActive
sortOrder
```

Pricing types:

```text
per_sqft
per_unit
fixed
percentage
custom
```

This is important.

Do not assume everything is `/sqft`.

---

# PHASE 18 — BASE PACKAGES

Admin can create packages.

Example:

```text
Standard
Gold
Platinum
Premium
Custom
```

Each package:

```text
name
description
baseRate
unit
features
recommended
active
```

Admin can change package rates without changing code.

---

# PHASE 19 — PRICING CALCULATOR UI

Create `/pricing`.

Use the concept of the Stavya calculator as inspiration, not as a copy.

The calculator should have:

### Step 1

Property details:

* area
* property type
* site type
* city/location

### Step 2

Base package.

### Step 3

Categories and optional add-ons.

### Step 4

Summary.

### Step 5

Customer information.

### Step 6

Submit estimate.

The Stavya reference currently uses base packages and many category-based add-ons, with the estimated cost calculated from area, package and selected additions.

---

# PHASE 20 — LIVE PRICE CALCULATION

Calculator must update instantly.

Example:

```text
Area = 1500 sqft

Gold = ₹1950/sqft

Base:
1500 × 1950
= ₹29,25,000

Selected Add-ons:
Kitchen
₹350/sqft

1500 × 350
= ₹5,25,000

Subtotal:
₹34,50,000
```

Then apply:

```text
Discount
Tax
Other charges
```

according to admin configuration.

Never hardcode these values.

---

# PHASE 21 — TAX CONFIGURATION

Admin can configure:

```text
GST enabled
GST percentage
Other taxes
Service charge
```

Do not permanently hardcode 18%.

The reference calculator currently shows GST as 18%, but Galaxy Interior's admin should control its own applicable configuration.

---

# PHASE 22 — DISCOUNT SYSTEM

Admin can create:

```text
percentage discount
fixed discount
package discount
category discount
limited-time offer
```

Support:

```text
activeFrom
activeUntil
minimumBudget
maximumDiscount
```

---

# PHASE 23 — CALCULATOR ESTIMATE SUMMARY

Show:

```text
Property
Area
Package
Selected Services

Base Cost
Add-ons
Discount
Tax
Estimated Total
```

Clearly label:

**Estimated Price**

and:

**Final quotation may change after site inspection and detailed BOQ.**

Never represent an automated estimate as a legally binding final quote.

---

# PHASE 24 — SAVE ESTIMATE

Logged-in user:

**Save Estimate**

Create:

```text
quoteRequest
```

Store:

* user
* project
* calculator inputs
* selected package
* selected items
* price snapshot
* tax snapshot
* discount snapshot
* estimated total
* timestamp

IMPORTANT:

When an estimate is submitted, store the actual price values used at that time.

Do not recalculate old quotations from today's prices.

---

# PHASE 25 — SUBMIT FOR DETAILED QUOTE

Button:

**Request Detailed Quote**

Customer submits:

```text
calculator data
+
personal information
+
project requirements
```

Admin receives complete request.

---

# PHASE 26 — ADMIN DASHBOARD

Create a professional admin dashboard.

Cards:

```text
Total Customers
Active Projects
Pending Quotes
Open Tickets
New Leads
Completed Projects
Estimated Pipeline Value
```

Charts:

* projects by status
* quotes by month
* leads
* support tickets
* project value

Do not overcomplicate charts.

---

# PHASE 27 — ADMIN CUSTOMER MANAGEMENT

Admin can:

* view customers
* search
* filter
* open customer profile
* view customer projects
* view quotes
* view tickets
* disable account where appropriate

Do not allow accidental deletion of important customer data.

Prefer soft delete/deactivation.

---

# PHASE 28 — ADMIN PROJECT MANAGEMENT

Admin:

```text
Create Project
Edit Project
Assign Customer
Assign Team
Change Status
Add Update
Upload Documents
Set Budget
Set Timeline
```

Admin project detail should provide a complete operational view.

---

# PHASE 29 — ADMIN PRICING MANAGEMENT

Create:

```text
Pricing
├── Packages
├── Categories
├── Items
├── Taxes
├── Discounts
└── Settings
```

Admin must be able to manage everything used by the public calculator.

No code deployment should be required to change normal prices.

---

# PHASE 30 — PRICING VERSIONING

Critical requirement.

When admin changes pricing:

Do NOT alter historical quote calculations.

Use pricing snapshots or versioning.

Example:

```text
Pricing Version 12
₹1950/sqft
```

Old quote:

```text
Version 12
```

New quote:

```text
Version 13
```

This prevents historical quote corruption.

---

# PHASE 31 — HERO SLIDESHOW MANAGEMENT

Admin should manage homepage hero slides.

Admin can:

* add slide
* upload image
* title
* subtitle
* CTA text
* CTA URL
* ordering
* active/inactive
* scheduling
* desktop image
* mobile image

Homepage automatically displays active slides.

---

# PHASE 32 — HERO MEDIA OPTIMIZATION

Admin upload validation:

* allowed formats
* maximum file size
* dimensions
* compression
* optimized delivery

Do not let admin upload a 20MB image and blindly serve it to every visitor.

---

# PHASE 33 — GALLERY MANAGEMENT

Admin:

* upload image
* category
* title
* description
* project
* featured
* ordering
* active/inactive

Customer/public gallery automatically reflects published content.

---

# PHASE 34 — SERVICES MANAGEMENT

Admin can manage:

```text
Service name
Description
Image
Icon
Features
Starting price
SEO title
SEO description
Active
Order
```

Do not hardcode all service content if it is intended to be admin-managed.

---

# PHASE 35 — TESTIMONIAL MANAGEMENT

Admin:

* add review
* edit
* approve
* reject
* feature
* rating
* customer name
* project/location
* image

Only approved testimonials appear publicly.

---

# PHASE 36 — SUPPORT TICKET SYSTEM

Contact page should have two major sections:

```text
Raise a Support Ticket

Check Existing Ticket
```

Logged-in users can submit tickets.

Fields:

```text
subject
category
priority
description
project
attachment
```

---

# PHASE 37 — TICKET NUMBER SYSTEM

Generate human-readable ticket IDs.

Example:

```text
GXY-2026-000124
```

Never expose Firestore document IDs as the public ticket number.

---

# PHASE 38 — TICKET STATUS SYSTEM

Statuses:

```text
Open
Under Review
In Progress
Waiting for Customer
Resolved
Closed
```

Admin can change status.

Customer can track status.

---

# PHASE 39 — TICKET STATUS CHECKER

Create:

```text
/support/track
```

Also show it directly on Contact page.

User enters:

```text
Ticket ID
```

and appropriate verification information.

Display:

```text
Ticket ID
Subject
Created Date
Current Status
Last Updated
Assigned Support
Latest Message
```

Do not expose another customer's ticket.

---

# PHASE 40 — TICKET CONVERSATION

Create ticket messaging:

```text
Customer
   ↕
Support Team
```

Messages should contain:

```text
senderId
senderRole
message
attachments
createdAt
```

Admin can reply.

Customer can reply.

---

# PHASE 41 — TICKET PRIORITY + SLA

Support priority:

```text
Low
Medium
High
Urgent
```

Admin can see:

* age
* priority
* SLA status
* last response

Highlight overdue tickets.

---

# PHASE 42 — ADMIN TICKET MANAGEMENT

Admin page:

```text
All Tickets

Open
Under Review
In Progress
Waiting
Resolved
Closed
```

Features:

* search
* filters
* priority
* project
* customer
* assigned staff
* date
* status

Admin can bulk-update where safe.

---

# PHASE 43 — NOTIFICATION SYSTEM

Create notifications for:

Customer:

* project created
* quote received
* quote updated
* project status changed
* ticket reply
* ticket resolved
* document uploaded

Admin:

* new project
* new quote request
* new ticket
* customer reply
* important updates

---

# PHASE 44 — ADMIN ACTIVITY/AUDIT LOG

Every sensitive admin operation should be logged.

Example:

```text
Admin
Action
Resource
Old Value
New Value
Timestamp
IP/metadata where appropriate
```

Examples:

```text
Changed Gold price
₹1900 → ₹1950

Changed project status
Planning → Design

Resolved ticket
GXY-2026-000124
```

Audit logs should not be editable from normal UI.

---

# PHASE 45 — SECURITY AUDIT

Perform a full security review.

Check:

* Firestore rules
* Storage rules
* authentication
* authorization
* admin permissions
* customer isolation
* ticket privacy
* project privacy
* document privacy
* file upload validation
* XSS
* malicious input
* abuse
* rate limiting opportunities

CRITICAL:

A customer must NEVER be able to read another customer's:

* project
* quote
* ticket
* documents
* profile

Do not rely on frontend filtering.

---

# PHASE 46 — CUSTOMER DATA ISOLATION

Test scenarios:

```text
Customer A
Customer B
Admin
```

Verify:

Customer A cannot access B's:

* project
* quote
* ticket
* documents
* notifications

Admin can access according to role.

---

# PHASE 47 — RESPONSIVE + MOBILE DASHBOARDS

Test:

```text
320
360
375
390
414
480
768
1024
1440
1920
```

Dashboard must work properly.

Admin tables on mobile should become:

* cards
* horizontal scroll
* responsive layouts

Do not make mobile users operate a desktop table squeezed into 320px.

---

# PHASE 48 — QA + AUTOMATED TESTING

Test complete journeys.

## CUSTOMER JOURNEY

```text
Register
↓
Login
↓
Dashboard
↓
Start Project
↓
Pricing Calculator
↓
Save Estimate
↓
Request Detailed Quote
↓
View Quote
↓
View Project
↓
Raise Ticket
↓
Track Ticket
↓
Reply to Ticket
```

## ADMIN JOURNEY

```text
Login
↓
Dashboard
↓
View Customer
↓
View Project
↓
Create/Edit Pricing
↓
Update Hero
↓
View Quote
↓
Create Project
↓
Update Project
↓
Reply Ticket
↓
Resolve Ticket
↓
Review Audit Log
```

Every flow must be tested.

---

# PHASE 49 — FINAL PRODUCTION AUDIT

Perform an independent review.

Do NOT assume previous phases are correct.

Check:

### Architecture

* clean
* maintainable
* reusable

### Security

* customer isolation
* admin authorization
* Firebase rules

### Pricing

* dynamic
* versioned
* historically safe

### Projects

* complete lifecycle

### Tickets

* private
* trackable
* conversational

### Admin

* operationally useful
* not just UI mockups

### Customer

* useful dashboard
* clear actions

### Performance

* images optimized
* animations optimized
* dashboard optimized

### SEO

* public pages remain SEO friendly

---

# PHASE 50 — FINAL DOUBLE-CHECK + RELEASE GATE

Before saying the work is complete, run:

```bash
npm run lint
npm run build
```

Run all available tests.

Check console for:

* errors
* warnings
* hydration problems
* Firebase errors
* network failures

Perform manual testing of every critical route.

Create:

```text
docs/
├── USER-DASHBOARD.md
├── ADMIN-PANEL.md
├── PRICING-SYSTEM.md
├── PROJECT-MANAGEMENT.md
├── SUPPORT-TICKETS.md
├── DATABASE-SCHEMA.md
├── SECURITY.md
└── QA-CHECKLIST.md
```

Create final report:

```text
FINAL-IMPLEMENTATION-REPORT.md
```

Include:

```text
Architecture
Database
Authentication
Customer Dashboard
Admin Dashboard
Pricing Engine
Project System
Support System
Notifications
Security
Performance
SEO
Testing
Known Limitations
Future Improvements
```

---

# REQUIRED PHASE REPORT FORMAT

After EVERY phase output:

```text
━━━━━━━━━━━━━━━━━━━━━━
PHASE X COMPLETE
━━━━━━━━━━━━━━━━━━━━━━

Objective:

What I inspected:

Problems found:

What I changed:

Files created:

Files modified:

Database changes:

Security considerations:

Tests performed:

Build status:

Regression check:

Remaining issues:

Next phase:
━━━━━━━━━━━━━━━━━━━━━━
```

Do not simply say:

"Phase completed."

---

# CRITICAL PRICING REQUIREMENT

The calculator must NEVER have business prices hardcoded in UI code.

Bad:

```text
const price = 1950;
```

Good:

```text
pricingPackages
pricingCategories
pricingItems
```

from the database.

Admin changes:

```text
Gold ₹1950
```

to:

```text
Gold ₹2100
```

and the public calculator automatically reflects ₹2100 without a deployment.

Historical quotations must remain at their original price.

---

# CRITICAL ADMIN REQUIREMENT

The admin panel is NOT a visual dashboard mockup.

Every button must perform a real operation.

For example:

```text
Add Pricing Item
```

must actually create the pricing item.

```text
Change Project Status
```

must actually update the project.

```text
Resolve Ticket
```

must actually update the ticket.

```text
Add Hero Slide
```

must actually affect the public homepage.

```text
Change Price
```

must actually affect the calculator.

---

# CRITICAL CUSTOMER REQUIREMENT

Customer dashboard must be useful.

Customer should be able to understand:

```text
What projects do I have?
What is their current status?
What estimate did I request?
What quotation did I receive?
What documents are available?
What support tickets are open?
What changed recently?
What should I do next?
```

---

# UI/UX REQUIREMENT

Do NOT copy Stavya Design & Construction.

Use its calculator as a **functional reference only**.

The reference calculator currently structures the estimate around property information, base packages, categorized add-ons and a final estimated total.

Galaxy Interior must have its own:

* branding
* colors
* typography
* spacing
* components
* animations
* interaction design

The admin panel should feel like the operational control center of Galaxy Interior.

The customer dashboard should feel like a premium client portal.

---

# FINAL ARCHITECTURE TARGET

Aim for:

```text
                         GALAXY INTERIOR
                               │
              ┌────────────────┼────────────────┐
              │                │                │
           PUBLIC           CUSTOMER          ADMIN
              │                │                │
          Marketing        Dashboard        Dashboard
              │                │                │
          Calculator       Projects         Projects
              │             Quotes           Quotes
          Contact           Tickets         Tickets
              │             Documents        Pricing
              │             Profile          Hero
              │             Notifications    Gallery
              │                              Services
              │                              Reviews
              │                              Customers
              │                              Analytics
              │                              Audit Logs
              │
              └────────────────┬────────────────┘
                               │
                            FIREBASE
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
          Firestore         Storage             Auth
             │                 │                 │
          Business          Images            Users
            Data           Documents           Roles
```

---

# DEFINITION OF DONE

The implementation is NOT complete until:

* Customer can register/login.
* Customer dashboard works.
* Customer can initialize a project.
* Customer can view project progress.
* Customer can view documents.
* Customer can use dynamic pricing calculator.
* Admin can create/edit pricing.
* Admin can create packages.
* Admin can create categories.
* Admin can create pricing items.
* Calculator uses admin-controlled prices.
* Historical quotes preserve their original pricing.
* Customer can submit quote request.
* Admin can manage quote requests.
* Admin can manage projects.
* Admin can manage hero slideshow.
* Admin can manage gallery.
* Admin can manage services.
* Admin can manage testimonials.
* Customer can raise support tickets.
* Customer can track ticket status.
* Customer can reply to tickets.
* Admin can manage ticket lifecycle.
* Notifications work.
* Audit logs work.
* Security rules prevent cross-customer access.
* Mobile dashboards work.
* Production build succeeds.
* No critical console errors remain.
* Documentation exists.
* Existing public website functionality remains intact.

---

# STARTING INSTRUCTION

Start with:

## PHASE 1 — COMPLETE EXISTING PROJECT AUDIT

Do NOT write implementation code yet.

First inspect the existing Galaxy Interior repository deeply and create the architecture/database/security plan.

Do not move to Phase 2 until Phase 1 audit is complete and verified.
