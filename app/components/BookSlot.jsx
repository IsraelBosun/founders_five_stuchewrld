export default function BookSlot() {
  const whatsappUrl =
    "https://wa.me/2349034320189?text=Hi%2C%20I%27d%20like%20to%20book%20a%20slot%20with%20STUCHEWRLD%20Inc.";

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
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
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
          Got a story
          <br />
          worth telling?
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
            href="mailto:stuchewrld.inc@gmail.com"
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
            BOOK A SLOT ↓
          </a>

          <a
            href={whatsappUrl}
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
            WHATSAPP US
          </a>
        </div>
      </div>
    </section>
  );
}
