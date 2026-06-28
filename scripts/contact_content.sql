create table if not exists public.contact_content (
  id text primary key default 'main',
  contact_kicker text,
  contact_headline text,
  contact_body text,
  email text,
  whatsapp_display text,
  whatsapp_url text,
  address text,
  hours text,
  email_button_label text,
  whatsapp_button_label text,
  book_heading text,
  book_email_label text,
  book_whatsapp_label text,
  footer_brand text,
  socials jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_content enable row level security;

drop policy if exists "Public can read contact content" on public.contact_content;
create policy "Public can read contact content"
  on public.contact_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert contact content" on public.contact_content;
create policy "Authenticated users can insert contact content"
  on public.contact_content
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update contact content" on public.contact_content;
create policy "Authenticated users can update contact content"
  on public.contact_content
  for update
  to authenticated
  using (true)
  with check (true);

insert into public.contact_content (
  id,
  contact_kicker,
  contact_headline,
  contact_body,
  email,
  whatsapp_display,
  whatsapp_url,
  address,
  hours,
  email_button_label,
  whatsapp_button_label,
  book_heading,
  book_email_label,
  book_whatsapp_label,
  footer_brand,
  socials
)
values (
  'main',
  'CONTACT / BOOKING',
  'Let''s make the story impossible to ignore.',
  'For brand storytelling, music videos, corporate events, social content, YouTube production, and films that need a cinematic pulse.',
  'stuchewrld.inc@gmail.com',
  '09034320189',
  'https://wa.me/2349034320189?text=Hi%2C%20I%27d%20like%20to%20book%20a%20slot%20with%20STUCHEWRLD%20Inc.',
  'Online only',
  'Mon-Sat, 8am-8pm',
  'Email the studio',
  'WhatsApp booking',
  'Got a story
worth telling?',
  'BOOK A SLOT ↓',
  'WHATSAPP US',
  'STUCHEWRLD © 2026',
  '[
    {"label":"Instagram","value":"Instagram.com/stuchewrldinc","href":"https://instagram.com/stuchewrldinc","footer_label":"IG","show_footer":true},
    {"label":"TikTok","value":"TikTok.com/stuchewrldinc","href":"https://tiktok.com/stuchewrldinc","footer_label":"TIKTOK","show_footer":true},
    {"label":"X","value":"X.com/stuchewrld.inc","href":"https://x.com/stuchewrld.inc","footer_label":"X","show_footer":false},
    {"label":"YouTube","value":"YouTube.com/stuchewrld.inc","href":"https://youtube.com/stuchewrld.inc","footer_label":"YT","show_footer":true},
    {"label":"Vimeo","value":"Vimeo.com/stuchewrldinc","href":"https://vimeo.com/stuchewrldinc","footer_label":"VIMEO","show_footer":true}
  ]'::jsonb
)
on conflict (id) do nothing;
