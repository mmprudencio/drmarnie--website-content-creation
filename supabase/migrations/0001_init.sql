create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  slug text unique not null,
  body text,
  category text,
  status text not null default 'draft',
  published_at timestamptz,
  cover_image_url text,
  ai_draft_value text,
  ai_draft_source text,
  ai_draft_confidence numeric,
  ai_draft_review_status text default 'unreviewed',
  created_at timestamptz not null default now()
);

alter table posts enable row level security;
drop policy if exists "posts_v1_read" on posts;
create policy "posts_v1_read" on posts for select using (true);
drop policy if exists "posts_v1_write" on posts;
create policy "posts_v1_write" on posts for all using (true) with check (true);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  description text,
  appointment_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
drop policy if exists "services_v1_read" on services;
create policy "services_v1_read" on services for select using (true);
drop policy if exists "services_v1_write" on services;
create policy "services_v1_write" on services for all using (true) with check (true);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  type text not null default 'book',
  description text,
  external_url text,
  cover_image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
drop policy if exists "products_v1_read" on products;
create policy "products_v1_read" on products for select using (true);
drop policy if exists "products_v1_write" on products;
create policy "products_v1_write" on products for all using (true) with check (true);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  email text,
  phone text,
  source_path text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;
drop policy if exists "leads_v1_read" on leads;
create policy "leads_v1_read" on leads for select using (true);
drop policy if exists "leads_v1_write" on leads;
create policy "leads_v1_write" on leads for all using (true) with check (true);

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  created_at timestamptz not null default now()
);

alter table page_views enable row level security;
drop policy if exists "page_views_v1_read" on page_views;
create policy "page_views_v1_read" on page_views for select using (true);
drop policy if exists "page_views_v1_write" on page_views;
create policy "page_views_v1_write" on page_views for all using (true) with check (true);

insert into posts (title, slug, body, category, status, published_at) values
(
  '5 Early Signs of Developmental Delay Every Parent Should Know',
  '5-early-signs-developmental-delay',
  'Early intervention is one of the most powerful tools we have for children with developmental delays. Here are five signs to watch for in the first three years of life: not babbling by 12 months, limited eye contact, not walking by 18 months, loss of previously acquired skills, and difficulty understanding simple instructions. If you notice any of these, schedule an evaluation — early support changes outcomes.',
  'neurodevelopment',
  'published',
  now() - interval '2 days'
),
(
  'How to Build a Reading Routine With Your Toddler',
  'reading-routine-toddler',
  'Reading together for even 15 minutes a day builds language, bonding, and brain development. Choose board books with high contrast images for infants, and let toddlers pick the book — ownership increases engagement. Read slowly, point to pictures, ask "what is that?" and pause for their answer. Repetition is not boring to a toddler — it is how they learn.',
  'parenting',
  'published',
  now() - interval '1 day'
),
(
  'Teaching Kids About Money: Starting at Age 4',
  'teaching-kids-about-money-age-4',
  'Financial literacy starts earlier than most parents think. At age 4, children can understand that things cost money and that money is earned. Use a clear jar for savings so they can literally see it grow. Give small tasks with small rewards. Delay gratification games — "wait 5 minutes and you can have two" — build the same executive function that predicts financial success in adults.',
  'financial-literacy',
  'published',
  now()
)
on conflict (slug) do nothing;

insert into services (title, description, appointment_url, is_active) values
(
  'Developmental Pediatric Consultation',
  'A comprehensive evaluation for children with concerns about developmental milestones, speech, behavior, or learning. Book a 60-minute initial consultation with Dr. Marnie.',
  'https://drmarnie.com/book',
  true
),
(
  'Early Intervention Guidance Session',
  'Already have a diagnosis? This session helps parents build a practical home plan aligned with therapy goals. Available via telehealth.',
  'https://drmarnie.com/book',
  true
)
on conflict do nothing;

insert into products (title, type, description, external_url, is_active) values
(
  'The Milestone Map: A Parent''s Guide to Early Development',
  'book',
  'Dr. Marnie''s flagship book covering the first five years of child development — what to expect, what to watch for, and what to do when something feels off. Available on Amazon and major booksellers.',
  'https://amazon.com',
  true
),
(
  'Understanding Your Child''s Brain — Online Course',
  'course',
  'A self-paced video course for parents covering neurodevelopment, sensory processing, and practical strategies you can use at home today. Includes workbooks and a parent Q&A library.',
  'https://drmarnie.com/courses',
  true
)
on conflict do nothing;