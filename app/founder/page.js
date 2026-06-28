import { supabase } from "../../lib/supabase";
import { mergeFounderContent } from "../data/founderContent";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

export const metadata = {
  title: "Founder - STUCHEWRLD Inc.",
  description: "Stephen Uche, founder and creative director of STUCHEWRLD Inc.",
};

export default async function FounderPage() {
  const { data } = await supabase
    .from("founder_content")
    .select("*")
    .eq("id", "main")
    .maybeSingle();
  const founder = mergeFounderContent(data);
  const notes = [
    ["01", founder.note_one_title, founder.note_one_body],
    ["02", founder.note_two_title, founder.note_two_body],
    ["03", founder.note_three_title, founder.note_three_body],
  ];

  return (
    <>
      <Nav />
      <main className="founder-page">
        <section className="section-pad founder-page-hero">
          <ScrollReveal className="founder-page-kicker" delay={40}>
            {founder.section_kicker}
          </ScrollReveal>

          <div className="founder-page-grid">
            <ScrollReveal className="founder-page-copy" delay={100}>
              <p className="founder-page-eyebrow">{founder.page_eyebrow}</p>
              <h1 className="founder-page-title">{founder.page_title}</h1>
              <p className="founder-page-lede">
                {founder.page_lede}
              </p>
            </ScrollReveal>

            <ScrollReveal className="founder-page-image-wrap" delay={180}>
              <img
                src={founder.image_url}
                alt={founder.image_alt}
                crossOrigin={founder.image_url?.startsWith("http") ? "anonymous" : undefined}
              />
              <span>{founder.image_caption}</span>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad founder-page-story">
          <ScrollReveal className="founder-page-quote" delay={80}>
            &ldquo;{founder.page_quote}&rdquo;
          </ScrollReveal>

          <div className="founder-page-story-grid">
            <ScrollReveal delay={140}>
              <p className="founder-page-body">
                {founder.story_body_one}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="founder-page-body">
                {founder.story_body_two}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad founder-page-notes">
          {notes.map(([number, title, body], index) => (
            <ScrollReveal key={title} className="founder-page-note" delay={100 + index * 80}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p className="founder-page-body">{body}</p>
            </ScrollReveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
