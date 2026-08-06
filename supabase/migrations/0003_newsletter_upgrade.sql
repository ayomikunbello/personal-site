-- Upgrades newsletter_sends into a proper campaign record (draft / scheduled /
-- sent), adds a preview-text field, and sets up a public storage bucket for
-- images embedded in newsletter emails.

alter table newsletter_sends rename column body to body_html;

alter table newsletter_sends
  add column if not exists preview_text text,
  add column if not exists status text not null default 'sent' check (status in ('draft', 'scheduled', 'sent')),
  add column if not exists scheduled_at timestamptz,
  add column if not exists resend_ids text[];

alter table newsletter_sends alter column sent_at drop not null;
alter table newsletter_sends alter column sent_at drop default;

-- Storage bucket for images embedded in newsletter bodies.
insert into storage.buckets (id, name, public)
values ('newsletter-images', 'newsletter-images', true)
on conflict (id) do nothing;

drop policy if exists "admin upload newsletter images" on storage.objects;
create policy "admin upload newsletter images" on storage.objects for insert
  to authenticated with check (bucket_id = 'newsletter-images');

drop policy if exists "public read newsletter images" on storage.objects;
create policy "public read newsletter images" on storage.objects for select
  using (bucket_id = 'newsletter-images');
