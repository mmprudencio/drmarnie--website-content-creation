# Tasks & Sprints

## Sprint 1 — Database & Public Site (v1 core)
**Goal**: Schema live, seed data visible, public pages render without login.
- [ ] Run migration SQL (posts, services, products, leads, page_views + RLS v1 policies)
- [ ] Seed 3 posts, 2 services, 2 products with realistic content
- [ ] Public homepage: hero, published posts grid, services section, products section
- [ ] Individual post page `/posts/[slug]`
- [ ] Lead capture form component (name, email, phone) — writes to `leads` table
- [ ] Page view tracker — fires on every route, writes to `page_views`
- [ ] All five states handled: loading skeleton, empty state, partial data, error banner, ready
- [ ] Deploy to Vercel, connect custom domain

**Definition of Done**: A fresh browser on the live domain shows posts, services, and products from the DB; submitting the lead form creates a real DB row; page views accumulate in the table.

---

## Sprint 2 — Admin Panel (content management engine) ✅ v1 functional milestone
**Goal**: Dr. Marnie can publish and manage all content without touching code.
- [ ] `/admin` route (no auth yet — access by URL; lock-down sprint adds auth)
- [ ] Posts list with status badges; Create / Edit / Publish / Unpublish / Archive actions
- [ ] Rich text editor for post body (markdown or WYSIWYG)
- [ ] Services CRUD (add, edit, toggle active)
- [ ] Products CRUD (add, edit, toggle active, type: book/course)
- [ ] Leads list: name, email, phone, source page, date — sortable by date
- [ ] Top Pages panel: page_views grouped by path, top 10
- [ ] Every button/form persists to DB; no dead buttons
- [ ] Empty states for each list ("No leads yet", "No posts — create your first")

**Definition of Done**: Dr. Marnie creates a post, publishes it, sees it on the public homepage, and sees a new lead row after a visitor submits the form — all in one sitting.

---

## Sprint 3 — Lock It Down (auth + RLS)
**Goal**: Admin panel protected; visitor data isolated.
- [ ] Supabase Auth: email/password login for Dr. Marnie
- [ ] `/admin` redirects to `/login` if unauthenticated
- [ ] Set `user_id` on all rows created by Dr. Marnie
- [ ] Replace v1 open RLS write policies with `auth.uid() = user_id` on posts, services, products, leads
- [ ] Public SELECT policies remain open (anonymous reads OK)
- [ ] Verify no service-role key exposed to client

**Definition of Done**: Visiting `/admin` without a session redirects to login; a logged-in Dr. Marnie can still do all Sprint 2 actions; anonymous visitors still see all public content.

---

## Sprint 4 — Intelligence & Growth (later)
**Goal**: AI drafting, content gap alerts, lead source analytics.
- [ ] AI post draft tool (GPT-4o): input bullet notes → stored draft in `ai_draft_*` fields
- [ ] Admin: review/edit AI draft before publish
- [ ] Content gap alert: flag categories with no posts in 7 days
- [ ] Lead source breakdown chart
- [ ] UTM parameter capture on lead form

**Definition of Done**: Dr. Marnie pastes bullet notes, receives an AI draft, edits it, publishes — draft stored with source/confidence/review_status.

---

## Gantt (sprint → weeks)
```
Week 1: Sprint 1 (DB + public site)
Week 2: Sprint 2 (admin panel) ← v1 functional
Week 3: Sprint 3 (lock it down)
Week 4+: Sprint 4 (AI + analytics)
```
