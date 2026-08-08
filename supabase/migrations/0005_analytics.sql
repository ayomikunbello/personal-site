-- Self-hosted, privacy-conscious page-view analytics. No cookies, no raw IP
-- storage — visitor_hash is a one-way hash of (IP + user agent + day), just
-- enough to count "unique visitors" without identifying anyone.

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer_domain text,
  country text,
  city text,
  device text,
  browser text,
  visitor_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on page_views (created_at);
create index if not exists page_views_path_idx on page_views (path);
create index if not exists page_views_visitor_hash_idx on page_views (visitor_hash);

alter table page_views enable row level security;

-- The tracking beacon runs unauthenticated from every visitor's browser.
create policy "public insert page_views" on page_views for insert with check (true);
-- Only you (logged in) can read the collected data.
create policy "admin read page_views" on page_views for select using (auth.uid() is not null);

grant insert on page_views to anon, authenticated;
grant select on page_views to authenticated;
