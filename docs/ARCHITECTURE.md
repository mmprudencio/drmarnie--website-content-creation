# Architecture

## Stack
- **Frontend/Backend**: Next.js 14 (App Router) on Vercel
- **Database**: Supabase (Postgres + RLS)
- **Auth** (later sprint): Supabase Auth — admin only
- **Styling**: Tailwind CSS

## Now vs Later
**Now**: public site, post CRUD, lead capture, page-view counter, admin panel (no login wall on public pages)  
**Later**: admin login/RLS lockdown, AI content drafting assistant, lead email notifications, analytics dashboard with rankings

## Key Action Flow — Publish a Post
1. Dr. Marnie types title + body in admin editor and clicks **Publish**
2. Next.js API route validates fields and writes a `post` row (`status='published'`) to Supabase
3. Homepage query fetches all `status='published'` posts ordered by `published_at` desc
4. Visitor loads homepage — post appears immediately
5. Visitor submits lead form → `lead` row written to Supabase → admin leads list updates
6. Every page load fires a lightweight POST → `page_view` row (path, referrer, timestamp)

## Layer Plan
1. **Data first** — tables, constraints, seed rows, open RLS policies
2. **App logic** — CRUD routes + public pages + lead form
3. **Smart features** (later) — AI drafting, content scoring, lead scoring

## Core Without AI
Publishing, lead capture, and page-view tracking are pure DB reads/writes — AI is additive only.
