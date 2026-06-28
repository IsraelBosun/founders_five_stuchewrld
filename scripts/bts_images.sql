create table if not exists public.bts_images (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  alt_text text,
  image_url text not null,
  sort_order integer not null default 99,
  rotate text not null default '0deg',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bts_images_published_sort_idx
  on public.bts_images (published, sort_order, created_at);

alter table public.bts_images enable row level security;

drop policy if exists "Public can read published BTS images" on public.bts_images;
create policy "Public can read published BTS images"
  on public.bts_images
  for select
  using (published = true);

drop policy if exists "Authenticated users can read BTS images" on public.bts_images;
create policy "Authenticated users can read BTS images"
  on public.bts_images
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert BTS images" on public.bts_images;
create policy "Authenticated users can insert BTS images"
  on public.bts_images
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update BTS images" on public.bts_images;
create policy "Authenticated users can update BTS images"
  on public.bts_images
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete BTS images" on public.bts_images;
create policy "Authenticated users can delete BTS images"
  on public.bts_images
  for delete
  to authenticated
  using (true);
