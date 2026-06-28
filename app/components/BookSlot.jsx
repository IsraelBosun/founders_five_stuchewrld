import { supabase } from "../../lib/supabase";
import { mergeContactContent } from "../data/contactContent";
import ScrollReveal from "./ScrollReveal";

export default async function BookSlot() {
  const { data } = await supabase
    .from("contact_content")
    .select("*")
    .eq("id", "main")
    .maybeSingle();
  const contact = mergeContactContent(data);

  return (
    <section
      id="book"
      className="section-pad"
      style={{
        background: "#0A0A0A",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        textAlign: "center",
      }}
    >
      <ScrollReveal delay={80} style={{ maxWidth: "640px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1.05,
            color: "#F5E6D3",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 500,
            marginBottom: "4rem",
          }}
        >
          {contact.book_heading.split("\n").map((line, index) => (
            <span key={`${line}-${index}`}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="btn-outline"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              fontSize: "11px",
              textTransform: "uppercase",
              padding: "14px 28px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {contact.book_email_label}
          </a>

          <a
            href={contact.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              fontSize: "11px",
              textTransform: "uppercase",
              padding: "14px 28px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {contact.book_whatsapp_label}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
