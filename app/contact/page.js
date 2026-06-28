import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

const email = "stuchewrld.inc@gmail.com";
const whatsapp = "09034320189";
const whatsappUrl =
  "https://wa.me/2349034320189?text=Hi%2C%20I%27d%20like%20to%20book%20a%20slot%20with%20STUCHEWRLD%20Inc.";

const socials = [
  { label: "Instagram", value: "Instagram.com/stuchewrldinc", href: "https://instagram.com/stuchewrldinc" },
  { label: "TikTok", value: "TikTok.com/stuchewrldinc", href: "https://tiktok.com/stuchewrldinc" },
  { label: "X", value: "X.com/stuchewrld.inc", href: "https://x.com/stuchewrld.inc" },
  { label: "YouTube", value: "YouTube.com/stuchewrld.inc", href: "https://youtube.com/stuchewrld.inc" },
  { label: "Vimeo", value: "Vimeo.com/stuchewrldinc", href: "https://vimeo.com/stuchewrldinc" },
];

export const metadata = {
  title: "Contact - STUCHEWRLD Inc.",
  description: "Reach STUCHEWRLD Inc. for cinematic brand films, music videos, event coverage and video production.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="contact-page">
        <section className="section-pad contact-hero">
          <ScrollReveal className="contact-kicker" delay={40}>
            CONTACT / BOOKING
          </ScrollReveal>

          <div className="contact-hero-grid">
            <ScrollReveal className="contact-heading" delay={100}>
              <h1>Let&apos;s make the story impossible to ignore.</h1>
              <p>
                For brand storytelling, music videos, corporate events, social
                content, YouTube production, and films that need a cinematic pulse.
              </p>
            </ScrollReveal>

            <ScrollReveal className="contact-actions" delay={180}>
              <a href={`mailto:${email}`} className="contact-primary-link">
                Email the studio
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-secondary-link">
                WhatsApp booking
              </a>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad contact-details">
          <ScrollReveal className="contact-detail-card" delay={80}>
            <span>EMAIL</span>
            <a href={`mailto:${email}`}>{email}</a>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={140}>
            <span>WHATSAPP</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {whatsapp}
            </a>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={200}>
            <span>ADDRESS</span>
            <p>Online only</p>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={260}>
            <span>HOURS</span>
            <p>Mon-Sat, 8am-8pm</p>
          </ScrollReveal>
        </section>

        <section className="section-pad contact-socials">
          <ScrollReveal className="contact-kicker" delay={60}>
            SOCIALS
          </ScrollReveal>

          <div className="contact-social-list">
            {socials.map(({ label, value, href }, index) => (
              <ScrollReveal key={label} delay={100 + index * 55}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="contact-social-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
