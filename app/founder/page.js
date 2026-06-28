import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const founderImage = "/bts/photo_4.jpeg";

export const metadata = {
  title: "Founder - STUCHEWRLD Inc.",
  description: "Stephen Uche, founder and creative director of STUCHEWRLD Inc.",
};

export default function FounderPage() {
  return (
    <>
      <Nav />
      <main className="founder-page">
        <section className="section-pad founder-page-hero">
          <ScrollReveal className="founder-page-kicker" delay={40}>
            04 / THE FOUNDER
          </ScrollReveal>

          <div className="founder-page-grid">
            <ScrollReveal className="founder-page-copy" delay={100}>
              <p className="founder-page-eyebrow">Stephen Uche / Creative Director</p>
              <h1 className="founder-page-title">Behind the lens, chasing the feeling.</h1>
              <p className="founder-page-lede">
                Stephen Uche is the founder and creative director of STUCHEWRLD Inc.,
                a cinematic storytelling studio built around films that carry mood,
                memory, and meaning.
              </p>
            </ScrollReveal>

            <ScrollReveal className="founder-page-image-wrap" delay={180}>
              <img src={founderImage} alt="Stephen Uche filming behind the scenes" />
              <span>On set / Lagos</span>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad founder-page-story">
          <ScrollReveal className="founder-page-quote" delay={80}>
            &ldquo;I don&apos;t shoot scenes. I chase feelings.&rdquo;
          </ScrollReveal>

          <div className="founder-page-story-grid">
            <ScrollReveal delay={140}>
              <p className="founder-page-body">
                His work sits between brand film, music visuals, event coverage, and
                documentary-style storytelling. The throughline is simple: make the
                subject feel alive before it feels produced.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="founder-page-body">
                STUCHEWRLD was shaped for clients who want more than clean footage.
                The studio builds visual worlds around people, products, founders,
                stages, launches, and campaigns, then turns those moments into films
                that can travel.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad founder-page-notes">
          {[
            ["01", "Direction", "Finding the emotional center of the story before the camera rolls."],
            ["02", "Production", "Building lean, cinematic shoots for brands, artists, and events."],
            ["03", "Post", "Shaping rhythm, color, sound, and sequence until the film holds."],
          ].map(([number, title, body], index) => (
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
