create table if not exists public.founder_content (
  id text primary key default 'main',
  section_kicker text,
  name text,
  role text,
  image_url text,
  image_alt text,
  image_caption text,
  homepage_quote text,
  homepage_body text,
  homepage_profile_label text,
  homepage_link_text text,
  page_eyebrow text,
  page_title text,
  page_lede text,
  page_quote text,
  story_body_one text,
  story_body_two text,
  note_one_title text,
  note_one_body text,
  note_two_title text,
  note_two_body text,
  note_three_title text,
  note_three_body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.founder_content enable row level security;

drop policy if exists "Public can read founder content" on public.founder_content;
create policy "Public can read founder content"
  on public.founder_content
  for select
  using (true);

drop policy if exists "Authenticated users can read founder content" on public.founder_content;
create policy "Authenticated users can read founder content"
  on public.founder_content
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert founder content" on public.founder_content;
create policy "Authenticated users can insert founder content"
  on public.founder_content
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update founder content" on public.founder_content;
create policy "Authenticated users can update founder content"
  on public.founder_content
  for update
  to authenticated
  using (true)
  with check (true);
