# STUCHEWRLD Inc. — Website Build

A creative agency site for **Stephen Uche**, Creative Director of STUCHEWRLD Inc. The brief: a cinematic, editorial site where the work does the talking. Not a normal agency website — this is a film studio masquerading as a website.

> "Every brand has a story. We bring yours to life."

---

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + Lenis (smooth scroll)
- **Video:** Cloudflare R2 (free tier — 10GB storage, unlimited egress)
- **CMS (optional):** Sanity for projects, BTS, testimonials
- **Hosting:** Vercel
- **Forms:** Resend for booking submissions → email

---

## Brand

**Wordmark:** `STUCHEWRLD` — serif, letterspaced (0.15em), weight 500. No icon mark.

**Colors**
```
--bg-primary:    #0A0A0A   /* near-black, not pure black */
--bg-secondary:  #111111   /* section breaks */
--bg-tertiary:   #050505   /* footer */
--text-primary:  #F5E6D3   /* warm cream — headlines, accents */
--text-body:     #E8E8E8   /* body copy */
--text-muted:    #888888   /* secondary copy */
--text-faint:    #666666   /* labels, metadata */
--divider:       rgba(255,255,255,0.06)
```

**Type**
- **Display:** Editorial New / Migra / Instrument Serif (free fallback: Fraunces)
- **Body:** Inter
- **Mono:** JetBrains Mono — used for labels, section numbers, metadata
- All section labels in mono, uppercase, letter-spaced 0.2em

---

## Site Structure

Single-page scroll with anchor sections. Individual case studies get their own `/work/[slug]` route.

1. **Hero** — full-bleed showreel with title card overlay
2. **Manifesto** — one big serif paragraph, `01 / MFSTO`
3. **Selected Work** — `02 / SELECTED WORK` — horizontal scroll, filterable (ALL · MUSIC · BRAND · CORPORATE · EVENTS · OUTREACH · BTS)
4. **Trusted By** — marquee logo wall, monochrome
5. **Off Camera** — `03 / OFF CAMERA` — BTS section, polaroid grid, deliberately raw
6. **The Founder** — `04 / THE FOUNDER` — portrait + film + quote
7. **Testimonial** — single rotating pull-quote, centered
8. **Book a Slot** — CTA + WhatsApp + email
9. **Footer** — wordmark, socials, copyright

---

## Key Interactions

- **Hero showreel:** muted autoplay loop, click play button → full-screen with sound
- **Work horizontal scroll:** desktop = wheel/drag horizontal; mobile = swipe carousel
- **Filter chips:** client-side filter, no page reload
- **Off Camera polaroids:** subtle rotation (-1.5° to +1.2°), slight stagger on scroll-in
- **Founder film:** click portrait → modal video player
- **Book a Slot:** opens overlay modal with WhatsApp + email + short form
- **Smooth scroll:** Lenis throughout, easing on section transitions
- **Cursor:** custom cursor on hover over videos (play icon)

---

## Content Sources (from Stephen)

- [ ] **Showreel** — single best 30–60s cut for hero
- [ ] **Project videos** — categorized: music videos, brand storytelling, corporate, events, outreach
- [ ] **Client logos** — full list, transparent PNG/SVG, will be tinted to cream
- [ ] **BTS stills + clips** — handheld, raw, vertical preferred
- [ ] **Founder portrait + short film** (60s)
- [ ] **Founder quote** — placeholder: *"I don't shoot scenes. I chase feelings."*
- [ ] **Testimonials** — at least Chris Olobo (Dhamana) confirmed
- [ ] **Project case study copy** — for individual `/work/[slug]` pages

---

## Contact & Socials

- **Address:** Online only
- **Hours:** Mon–Sat, 8am–8pm
- **Email:** stuchewrld.inc@gmail.com
- **WhatsApp:** 09034320189
- **Instagram:** instagram.com/stuchewrldinc
- **TikTok:** tiktok.com/stuchewrldinc
- **X:** x.com/stuchewrld.inc
- **YouTube:** youtube.com/stuchewrld.inc
- **Vimeo:** vimeo.com/stuchewrldinc

---

## Voice & Copy Rules

- Film studio, not service provider. Less "we offer X," more "we make films that don't let go."
- Section headers in sentence case, never title case.
- Labels in mono uppercase only (e.g. `02 / SELECTED WORK`).
- Italic serif for editorial moments (manifesto, testimonials, founder quote).
- No emoji. No exclamation marks except inside real testimonial quotes.

---

## Video Pipeline

All videos are pre-compressed locally, then hosted on **Cloudflare R2** (free tier: 10GB storage, unlimited egress). No transcoding service — short pre-compressed MP4s served directly.

### 1. Compress with Handbrake before upload

Every video runs through Handbrake on desktop before it touches R2.

**Settings:**
- Codec: H.264
- Resolution: 1080p (or 720p for BTS / non-critical)
- Framerate: same as source
- Constant Quality (RF): 23 (drop to 25 for further size reduction)
- Encoder Preset: Slow
- Web Optimized: ✅
- Format: MP4

**Size budget per video:**

| Section | Length | Target size |
|---|---|---|
| Hero showreel | 30–60s | 8–15 MB |
| Project card preview | 15–30s | 5–10 MB |
| Project full video | 1–3 min | 20–40 MB |
| BTS clip | 5–15s | 2–5 MB |

Any single file over 50MB after compression is too long or still over-bitrated — re-encode.

### 2. File naming convention

Lowercase, hyphens only, no spaces or special characters:

```
showreel-hero.mp4
project-midnight-echoes.mp4
project-dhamana-built-on-trust.mp4
bts-set-lagos-2024.mp4
founder-film.mp4
```

### 3. Poster frames

For every video, export the first or hero frame as a JPG (~50–100KB), drop in `/public/posters/` with matching filename:

```
/public/posters/showreel-hero.jpg
/public/posters/project-midnight-echoes.jpg
```

Used in the `poster` attribute so the video looks instant before bytes arrive.

### 4. R2 setup

- Bucket: `stuchewrld-videos`
- Public access: enabled (via r2.dev subdomain during dev, custom domain `videos.stuchewrld.com` at launch)
- CORS policy (paste in bucket Settings → CORS):

```json
[
  {
    "AllowedOrigins": ["https://stuchewrld.com", "https://*.vercel.app", "http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 5. Environment variable

```bash
# .env.local
NEXT_PUBLIC_VIDEO_CDN=https://pub-xxxxxxxxxxxx.r2.dev
```

Swap to the custom domain at launch — only one line changes.

### 6. Usage in code

```tsx
const CDN = process.env.NEXT_PUBLIC_VIDEO_CDN;

// Hero (autoplay, muted, loop)
<video
  autoPlay muted loop playsInline
  poster="/posters/showreel-hero.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src={`${CDN}/showreel-hero.mp4`} type="video/mp4" />
</video>

// Project card (click to play with sound)
<video
  controls
  poster="/posters/project-midnight-echoes.jpg"
  className="w-full aspect-video"
>
  <source src={`${CDN}/project-midnight-echoes.mp4`} type="video/mp4" />
</video>
```

### 7. When R2 isn't the right home

- **Long-form director's cuts (3+ min):** link out to Stephen's existing YouTube or Vimeo. Don't burn R2 storage on full pieces.
- **Off Camera tiny clips (<5MB):** can also live in `/public/videos/` on Vercel directly — fewer round trips.

---



- LCP < 2.0s (hero video poster image preloaded, video lazy)
- All videos pre-compressed (Handbrake, H.264, RF 23, Web Optimized), served from Cloudflare R2
- Hero showreel under 15MB, poster preloaded
- Lazy-load all non-hero videos (only fetch when scrolled into view)
- Lighthouse: 90+ on Performance, 100 on Accessibility
- Mobile-first; everything tested at 375px before scaling up

---

## Build Status — last updated 2026-06-21

### Done

- Full single-page site built: Nav, Hero, Manifesto, SelectedWork, TrustedBy, OffCamera, Founder, Testimonial, BookSlot, Footer
- Mobile nav — full-screen overlay with staggered serif links, hamburger → X animation
- TrustedBy marquee — auto-scrolls + drag/touch to scrub manually
- `/work/[slug]` case study pages — hero, story, film, stills, credits, testimonial, next project
- `app/data/projects.js` — local data file with 5 placeholder projects (kept as reference/seed source)
- Supabase wired up — `projects` table, RLS, site reads from Supabase server-side
- 5 projects seeded into Supabase (`scripts/seed.mjs`)
- `lib/supabase.js` (anon/public), `lib/supabase-admin.js` (service role)
- Global max-width + padding on `<main>` — `max-width: 1440px`, `clamp(1.25rem, 3vw, 3rem)` sides
- All blank gradient cards as video placeholders throughout

### In Progress / Next Session

1. **Cloudflare R2** — blocked on card payment. Account ID saved. Still need:
   - R2 API token (Access Key ID + Secret) — create in R2 → Manage R2 API Tokens
   - Create bucket `stuchewrld-videos`, enable public access, grab `pub-xxxx.r2.dev` URL
   - Paste all three into `.env.local` where placeholders are

2. **`/api/r2-presign` route** — generates short-lived presigned PUT URL so browser uploads directly to R2

3. **`/admin` page** — protected by Supabase Auth, lets Stephen:
   - Log in with email/password
   - Create / edit projects (all fields)
   - Upload video → triggers presigned URL flow → saves R2 URL to Supabase
   - Toggle published on/off

### Credentials in .env.local

| Key | Status |
|-----|--------|
| NEXT_PUBLIC_SUPABASE_URL | ✅ set |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ✅ set |
| SUPABASE_SERVICE_ROLE_KEY | ✅ set |
| CLOUDFLARE_ACCOUNT_ID | ✅ set |
| CLOUDFLARE_R2_ACCESS_KEY_ID | ⏳ pending card |
| CLOUDFLARE_R2_SECRET_ACCESS_KEY | ⏳ pending card |
| NEXT_PUBLIC_VIDEO_CDN | ⏳ pending bucket creation |