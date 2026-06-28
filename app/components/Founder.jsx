import ScrollReveal from "./ScrollReveal";

const founderImage = "/bts/photo_4.jpeg";

export default function Founder() {
  return (
    <section
      id="founder"
      className="section-pad"
      style={{
        background: "#0A0A0A",
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      <ScrollReveal delay={40}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            fontSize: "10px",
            color: "#666666",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "3rem",
          }}
        >
          04 / THE FOUNDER
        </span>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
        className="founder-grid"
      >
        <ScrollReveal
          delay={120}
          style={{
            width: "100%",
            maxWidth: "480px",
            aspectRatio: "3/4",
            background: "linear-gradient(160deg, #141010 0%, #0d0b0a 50%, #080707 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={founderImage}
            alt="Stephen Uche filming behind the scenes"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "58% center",
              display: "block",
              filter: "contrast(1.02) saturate(0.9)",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.42), transparent 46%), linear-gradient(120deg, rgba(10,10,10,0.1), rgba(10,10,10,0.4))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              fontSize: "10px",
              color: "rgba(245,230,211,0.66)",
              position: "absolute",
              bottom: "16px",
              left: "16px",
              textTransform: "uppercase",
            }}
          >
            STEPHEN UCHE
          </span>
        </ScrollReveal>

        <ScrollReveal delay={220} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 1.1,
                color: "#F5E6D3",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              &ldquo;I don&apos;t shoot scenes.
              <br />I chase feelings.&rdquo;
            </p>
          </blockquote>

          <p
            style={{
              fontFamily: "var(--font-body)",
              lineHeight: 1.7,
              color: "#888888",
              fontSize: "14px",
              maxWidth: "380px",
            }}
          >
            Stephen Uche, Creative Director of STUCHEWRLD Inc. A storyteller
            behind the lens for over a decade, building visual worlds for
            brands and artists across the continent.
          </p>

          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.15em",
                fontSize: "10px",
                color: "#666666",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "10px",
              }}
            >
              FOUNDER PROFILE
            </span>
            <a
              href="/founder"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.15em",
                fontSize: "10px",
                color: "#F5E6D3",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "gap 0.2s",
                textDecoration: "none",
              }}
            >
              VIEW MORE &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .founder-grid {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
