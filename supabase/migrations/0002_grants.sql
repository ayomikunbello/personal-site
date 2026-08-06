-- Table-level privileges. RLS policies (from 0001_init.sql) control which
-- *rows* a role can touch, but Postgres also requires a base GRANT before a
-- role can attempt the operation at all. Run this after 0001_init.sql.

-- Public (anon) can read the content that powers public pages.
grant select on site_content, publications, highlights to anon, authenticated;

-- Public (anon) can submit the newsletter and contact forms.
grant insert on subscribers, contact_messages to anon, authenticated;

-- The authenticated (admin) role needs full read/write on everything,
-- since RLS policies already restrict writes to auth.uid() is not null.
grant select, insert, update, delete on
  site_content, publications, highlights, subscribers, contact_messages, newsletter_sends
  to authenticated;
