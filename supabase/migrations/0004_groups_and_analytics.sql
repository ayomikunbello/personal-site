-- Subscriber groups/segments, block-based campaign storage, and per-recipient
-- send tracking (needed for real open/click analytics via Resend webhooks).

create table if not exists subscriber_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists subscriber_group_members (
  subscriber_id uuid not null references subscribers(id) on delete cascade,
  group_id uuid not null references subscriber_groups(id) on delete cascade,
  primary key (subscriber_id, group_id)
);

alter table newsletter_sends
  add column if not exists group_id uuid references subscriber_groups(id) on delete set null,
  add column if not exists body_blocks jsonb;

-- One row per recipient per campaign, so opens/clicks can be attributed
-- individually (requires sending one email per recipient, not one BCC blast).
create table if not exists newsletter_recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references newsletter_sends(id) on delete cascade,
  subscriber_id uuid references subscribers(id) on delete set null,
  email text not null,
  resend_email_id text,
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  bounced_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_recipients_campaign_idx on newsletter_recipients (campaign_id);
create index if not exists newsletter_recipients_resend_id_idx on newsletter_recipients (resend_email_id);

alter table subscriber_groups enable row level security;
alter table subscriber_group_members enable row level security;
alter table newsletter_recipients enable row level security;

create policy "admin all subscriber_groups" on subscriber_groups for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin all subscriber_group_members" on subscriber_group_members for all
  using (auth.uid() is not null) with check (auth.uid() is not null);
create policy "admin all newsletter_recipients" on newsletter_recipients for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

grant select, insert, update, delete on
  subscriber_groups, subscriber_group_members, newsletter_recipients
  to authenticated;
