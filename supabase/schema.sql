-- MegaBlog schema for Supabase.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement is idempotent.

-- ─────────────────────────────────────────────────────────────
-- Posts table
-- ─────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title          text not null check (char_length(title) between 1 and 200),
  content        text not null default '',
  featured_image text,                                   -- path inside the storage bucket
  status         text not null default 'active' check (status in ('active', 'inactive')),
  user_id        uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists posts_status_created_at_idx on public.posts (status, created_at desc);
create index if not exists posts_user_id_idx on public.posts (user_id);

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security: who can do what with posts
-- ─────────────────────────────────────────────────────────────
alter table public.posts enable row level security;

-- Signed-in users can read published posts, plus their own drafts.
-- To make published posts public to visitors too, change "to authenticated" to "to anon, authenticated".
drop policy if exists "Read published posts and own drafts" on public.posts;
create policy "Read published posts and own drafts"
  on public.posts for select
  to authenticated
  using (status = 'active' or user_id = (select auth.uid()));

drop policy if exists "Authors create their own posts" on public.posts;
create policy "Authors create their own posts"
  on public.posts for insert
  to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Authors update their own posts" on public.posts;
create policy "Authors update their own posts"
  on public.posts for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "Authors delete their own posts" on public.posts;
create policy "Authors delete their own posts"
  on public.posts for delete
  to authenticated
  using (user_id = (select auth.uid()));

-- ─────────────────────────────────────────────────────────────
-- Storage: cover images
-- Public bucket (images are served by URL), 5 MB limit, images only.
-- Each user may only write to their own "<user id>/" folder.
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/png', 'image/jpeg', 'image/gif', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users read their own images" on storage.objects;
create policy "Users read their own images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'post-images' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users upload to their own folder" on storage.objects;
create policy "Users upload to their own folder"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users update their own images" on storage.objects;
create policy "Users update their own images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users delete their own images" on storage.objects;
create policy "Users delete their own images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
