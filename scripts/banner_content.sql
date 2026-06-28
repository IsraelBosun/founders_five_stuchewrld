create table if not exists public.banner_content (
  id text primary key default 'main',
  hero_eyebrow text not null default 'EST. STUCHEWRLD INC · CINEMATIC STORYTELLING',
  hero_headline text not null default 'Every brand has
a story. We bring
yours to life.',
  hero_headline_emphasis text not null default 'yours',
  showreel_label text not null default 'SHOWREEL · 2026',
  scroll_label text not null default 'SCROLL ↓',
  manifesto_label text not null default '01 / MFSTO',
  manifesto_body text not null default 'We make films that don''t let go. Cinematic storytelling that resonates long after the screen goes dark — for the brands and the dreamers building something worth watching.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.banner_content enable row level security;

drop policy if exists "Public can read banner content" on public.banner_content;
create policy "Public can read banner content"
on public.banner_content
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can insert banner content" on public.banner_content;
create policy "Authenticated users can insert banner content"
on public.banner_content
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update banner content" on public.banner_content;
create policy "Authenticated users can update banner content"
on public.banner_content
for update
to authenticated
using (true)
with check (true);

insert into public.banner_content (
  id,
  hero_eyebrow,
  hero_headline,
  hero_headline_emphasis,
  showreel_label,
  scroll_label,
  manifesto_label,
  manifesto_body
)
values (
  'main',
  'EST. STUCHEWRLD INC · CINEMATIC STORYTELLING',
  'Every brand has
a story. We bring
yours to life.',
  'yours',
  'SHOWREEL · 2026',
  'SCROLL ↓',
  '01 / MFSTO',
  'We make films that don''t let go. Cinematic storytelling that resonates long after the screen goes dark — for the brands and the dreamers building something worth watching.'
)
on conflict (id) do nothing;
