-- 0002_leads_capture_fields.sql
-- Adds fields the book-launch capture forms need:
--   message        — the reader's question / story text (feedback form)
--   consent_share  — "you may share my story" checkbox (feedback form)
-- Safe to run multiple times.

alter table leads add column if not exists message text;
alter table leads add column if not exists consent_share boolean not null default false;
