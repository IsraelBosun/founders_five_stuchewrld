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
    slug: "caleb-clay-fosa-militant-boy",
    title: "Militant Boy Official Visualizer",
    client: "Caleb Clay ft Fosa",
    category: "MUSIC",
    label: "OFFICIAL VISUALIZER - 2026",
    year: "2026",
    gradient: "linear-gradient(135deg, #0D1B2A 0%, #0a1018 50%, #06090d 100%)",
    hero_gradient: "linear-gradient(160deg, #0d1b2a 0%, #080f18 40%, #050709 100%)",
    synopsis: "An official visualizer for Caleb Clay ft Fosa, built around the energy and attitude of Militant Boy.",
    story: "Militant Boy called for a visual treatment that moves with the track without overexplaining it. The piece is shaped as a compact music visual: direct, rhythmic, and performance-led, with the edit carrying the momentum of the song and the frame giving the artists room to own the mood.",
    credits: { Director: "Stephen Uche", Producer: "STUCHEWRLD Inc.", Artist: "Caleb Clay ft Fosa", Format: "Official Visualizer", Editor: "Stephen Uche", Year: "2026" },
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
    slug: "mon-cheri-greek-yoghurt-parfait",
    title: "Mon Cheri Greek Yoghurt Parfait",
    client: "Mon Cheri",
    category: "BRAND",
    label: "ADVERT VIDEO - 2026",
    year: "2026",
    gradient: "linear-gradient(135deg, #17100d 0%, #1b1510 48%, #080605 100%)",
    hero_gradient: "linear-gradient(160deg, #1d130e 0%, #15100c 42%, #070504 100%)",
    synopsis: "A product advert for Mon Cheri, a parfait company making Greek yoghurt parfaits with a fresh, indulgent feel.",
    story: "The Mon Cheri Greek Yoghurt Parfait advert is built to make the product feel premium, fresh, and instantly desirable. The film gives the parfait room to lead: texture, ingredients, packaging, and appetite appeal carry the story, while the edit keeps the brand polished and direct.",
    credits: { Director: "Stephen Uche", Producer: "STUCHEWRLD Inc.", Client: "Mon Cheri", Product: "Greek Yoghurt Parfait", Format: "Advert Video", Year: "2026" },
    testimonial: null,
    sort_order: 5,
    published: true,
  },
  {
    slug: "access-bank-international-womens-day-conference-2026",
    title: "Access Bank International Women's Day Conference 2026",
    client: "Access Bank",
    category: "EVENTS",
    label: "EVENT COVERAGE - ACCESS BANK",
    year: "2026",
    gradient: "linear-gradient(135deg, #12110d 0%, #0b0d10 48%, #050608 100%)",
    hero_gradient: "linear-gradient(160deg, #17140d 0%, #0b0d10 42%, #050608 100%)",
    synopsis: "Video coverage for Access Bank's International Women's Day Conference 2026, shaped around the speakers, audience, conversations, and atmosphere of the event.",
    story: "The Access Bank International Women's Day Conference 2026 film is prepared as a polished event-coverage piece. Once the final video is uploaded, the page will carry the conference story through arrival moments, keynote highlights, panel conversations, audience reactions, brand details, and the energy of the day.",
    credits: { Director: "Stephen Uche", Producer: "STUCHEWRLD Inc.", Client: "Access Bank", Event: "International Women's Day Conference", Coverage: "Video coverage", Status: "Video upload pending", Year: "2026" },
    testimonial: null,
    sort_order: 6,
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
