import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "../../lib/supabase";
import { mergeContactContent } from "../data/contactContent";

export const metadata = {
  title: "Contact - STUCHEWRLD Inc.",
  description: "Reach STUCHEWRLD Inc. for cinematic brand films, music videos, event coverage and video production.",
};

export default async function ContactPage() {
  const { data } = await supabase
    .from("contact_content")
    .select("*")
    .eq("id", "main")
    .maybeSingle();
  const contact = mergeContactContent(data);

  return (
    <>
      <Nav />
      <main className="contact-page">
        <section className="section-pad contact-hero">
          <ScrollReveal className="contact-kicker" delay={40}>
            {contact.contact_kicker}
          </ScrollReveal>

          <div className="contact-hero-grid">
            <ScrollReveal className="contact-heading" delay={100}>
              <h1>{contact.contact_headline}</h1>
              <p>{contact.contact_body}</p>
            </ScrollReveal>

            <ScrollReveal className="contact-actions" delay={180}>
              <a href={`mailto:${contact.email}`} className="contact-primary-link">
                {contact.email_button_label}
              </a>
              <a href={contact.whatsapp_url} target="_blank" rel="noopener noreferrer" className="contact-secondary-link">
                {contact.whatsapp_button_label}
              </a>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad contact-details">
          <ScrollReveal className="contact-detail-card" delay={80}>
            <span>EMAIL</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={140}>
            <span>WHATSAPP</span>
            <a href={contact.whatsapp_url} target="_blank" rel="noopener noreferrer">
              {contact.whatsapp_display}
            </a>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={200}>
            <span>ADDRESS</span>
            <p>{contact.address}</p>
          </ScrollReveal>

          <ScrollReveal className="contact-detail-card" delay={260}>
            <span>HOURS</span>
            <p>{contact.hours}</p>
          </ScrollReveal>
        </section>

        <section className="section-pad contact-socials">
          <ScrollReveal className="contact-kicker" delay={60}>
            SOCIALS
          </ScrollReveal>

          <div className="contact-social-list">
            {contact.socials.map(({ label, value, href }, index) => (
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
