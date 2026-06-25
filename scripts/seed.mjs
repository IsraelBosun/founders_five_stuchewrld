import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const projects = [
  {
    slug: "dhamana-built-on-trust",
    title: "Built on Trust",
    client: "Dhamana Guarantee Company",
    category: "BRAND",
    label: "BRAND · DHAMANA",
    year: "2025",
    gradient: "linear-gradient(135deg, #1a0d07 0%, #120908 50%, #080606 100%)",
    hero_gradient: "linear-gradient(160deg, #1a0d07 0%, #0e0705 40%, #060404 100%)",
    synopsis: "Dhamana needed more than an ad. They needed people to feel the weight of a promise — what it means for a company to stake its name on someone else's future. We built a film around that single idea.",
    story: "The brief was simple: trust is invisible. You can't film it. So we filmed everything around it — the handshake, the pause before a signature, a father watching his son walk into a building for the first time. We let the product disappear into the background and let the feeling take over. Dhamana didn't need to be explained. It needed to be believed.",
    credits: { Director: "Stephen Uche", Producer: "STUCHEWRLD Inc.", Client: "Dhamana Guarantee Company", "Creative Lead": "Stephen Uche", Year: "2025" },
    testimonial: { quote: "Stephen didn't just make us a video — he made us look like who we always wanted to be.", author: "Chris Olobo", role: "CEO, Dhamana Guarantee Company" },
    sort_order: 1,
    published: true,
  },
  {
    slug: "midnight-echoes",
    title: "Midnight Echoes",
    client: "Independent Artist",
    category: "MUSIC",
    label: "MUSIC VIDEO · 2025",
    year: "2025",
    gradient: "linear-gradient(135deg, #0D1B2A 0%, #0a1018 50%, #06090d 100%)",
    hero_gradient: "linear-gradient(160deg, #0d1b2a 0%, #080f18 40%, #050709 100%)",
    synopsis: "A musician processing grief through sound. We built a visual language around absence — empty rooms, slow motion, light that arrives too late.",
    story: "The track was already finished when Stephen heard it. Three minutes of someone trying to hold on to something that had already left. The visual response wasn't choreography or performance — it was architecture. Every shot was designed to feel like a memory: slightly out of focus, slightly too quiet, always just a second behind. The edit follows the breath of the music, not the beat.",
    credits: { Director: "Stephen Uche", Cinematography: "STUCHEWRLD Inc.", Artist: "Undisclosed", Editor: "Stephen Uche", Year: "2025" },
    testimonial: null,
    sort_order: 2,
    published: true,
  },
  {
    slug: "summit-2024",
    title: "Access Holdings Art Exhibition",
    client: "Access Bank Holding Company",
    category: "EVENTS",
    label: "EVENT COVERAGE - ACCESS HOLDINGS",
    year: "2025",
    gradient: "linear-gradient(135deg, #12110d 0%, #0b0d10 48%, #050608 100%)",
    hero_gradient: "linear-gradient(160deg, #17140d 0%, #0b0d10 42%, #050608 100%)",
    synopsis: "Video coverage for Access Bank Holding Company's 2025 art exhibition, shaped as a cinematic record of the opening, the work on the walls, and the people moving through the room.",
    story: "This project is prepared as a video-coverage template for the exhibition film. Once the final video is uploaded, the page will carry the full piece with a poster frame, selected stills from the gallery floor, and a concise edit that moves through arrivals, artwork details, guest reactions, host moments, and the closing atmosphere. The tone should feel polished and cultural, not like a routine event recap.",
    credits: { Director: "Stephen Uche", Producer: "STUCHEWRLD Inc.", Client: "Access Bank Holding Company", Event: "Art Exhibition", Coverage: "Video coverage", Status: "Video upload pending", Year: "2025" },
    testimonial: null,
    sort_order: 3,
    published: true,
  },
  {
    slug: "roots-campaign",
    title: "Roots Campaign",
    client: "Community Outreach Initiative",
    category: "EVENTS",
    label: "OUTREACH · 2025",
    year: "2025",
    gradient: "linear-gradient(135deg, #100d17 0%, #0c0a12 50%, #07060b 100%)",
    hero_gradient: "linear-gradient(160deg, #110e18 0%, #0d0b14 40%, #07060b 100%)",
    synopsis: "A grassroots campaign documenting a community rebuilding itself. No script. No talent brief. Just people, place, and purpose.",
    story: "The Roots Campaign came with one instruction: don't make it look like charity. These were people building something, not waiting to be helped. We showed up with minimal kit — two cameras, natural light only — and spent a week inside the community before we ever started recording. What came out was less a campaign film and more a portrait of momentum.",
    credits: { Director: "Stephen Uche", Approach: "Documentary / Verité", Producer: "STUCHEWRLD Inc.", Duration: "1 week embed", Year: "2025" },
    testimonial: null,
    sort_order: 4,
    published: true,
  },
  {
    slug: "frequency",
    title: "Frequency",
    client: "Independent Artist",
    category: "MUSIC",
    label: "MUSIC VIDEO · 2024",
    year: "2024",
    gradient: "linear-gradient(135deg, #0a1215 0%, #080e10 50%, #050809 100%)",
    hero_gradient: "linear-gradient(160deg, #0a1418 0%, #080f12 40%, #050809 100%)",
    synopsis: "High-energy visual for a track about movement and escape. Practical locations, no VFX — just momentum and light.",
    story: "Frequency was shot across three Lagos locations in a single night. The brief was kinetic — the artist wanted the video to feel like the music sounds: fast, urgent, alive. We leaned into practical light sources, long lenses, and handheld work throughout. No crane shots, no colour grading tricks. What you see is what was there.",
    credits: { Director: "Stephen Uche", Cinematography: "STUCHEWRLD Inc.", Location: "Lagos, Nigeria", Artist: "Undisclosed", Year: "2024" },
    testimonial: null,
    sort_order: 5,
    published: true,
  },
];

const { error } = await supabase.from("projects").upsert(projects, { onConflict: "slug" });

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
} else {
  console.log(`Seeded ${projects.length} projects successfully.`);
}
