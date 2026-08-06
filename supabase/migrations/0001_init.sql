-- Personal site schema: editable content, publications, highlights,
-- newsletter subscribers, and contact messages.
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).

-- ── site_content ──────────────────────────────────────────────────────────
-- Key/value store for dashboard-editable text blocks (hero, about, etc).
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  section text unique not null,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ── publications ──────────────────────────────────────────────────────────
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('journal', 'conference', 'project')),
  text text not null,
  href text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── highlights (Featured news) ───────────────────────────────────────────
create table if not exists highlights (
  id uuid primary key default gen_random_uuid(),
  date_label text not null,
  text text not null,
  href text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ── subscribers (newsletter) ─────────────────────────────────────────────
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique not null,
  subscribed_at timestamptz not null default now()
);

-- ── contact_messages ──────────────────────────────────────────────────────
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── newsletter_sends (log of past newsletter broadcasts) ────────────────
create table if not exists newsletter_sends (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body text not null,
  recipient_count int not null default 0,
  sent_at timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────────────────
alter table site_content enable row level security;
alter table publications enable row level security;
alter table highlights enable row level security;
alter table subscribers enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_sends enable row level security;

-- Public (anon) can read content that powers the public pages.
create policy "public read site_content" on site_content for select using (true);
create policy "public read publications" on publications for select using (true);
create policy "public read highlights" on highlights for select using (true);

-- Only authenticated users (you, the admin) can write to any table.
create policy "admin write site_content" on site_content for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin write publications" on publications for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin write highlights" on highlights for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

-- Subscribers / contact messages: anyone can submit (insert), only the
-- admin can read or manage the resulting rows.
create policy "public insert subscribers" on subscribers for insert
  with check (true);
create policy "admin read subscribers" on subscribers for select
  using (auth.uid() is not null);
create policy "admin manage subscribers" on subscribers for update
  using (auth.uid() is not null);
create policy "admin delete subscribers" on subscribers for delete
  using (auth.uid() is not null);

create policy "public insert contact_messages" on contact_messages for insert
  with check (true);
create policy "admin read contact_messages" on contact_messages for select
  using (auth.uid() is not null);
create policy "admin manage contact_messages" on contact_messages for update
  using (auth.uid() is not null);
create policy "admin delete contact_messages" on contact_messages for delete
  using (auth.uid() is not null);

-- Newsletter sends: admin only, both read and write.
create policy "admin all newsletter_sends" on newsletter_sends for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
