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
      {/* Label */}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
        className="founder-grid"
      >
        {/* Portrait — blank card */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            aspectRatio: "3/4",
            background: "linear-gradient(160deg, #141010 0%, #0d0b0a 50%, #080707 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              fontSize: "10px",
              color: "#444444",
              position: "absolute",
              bottom: "16px",
              left: "16px",
              textTransform: "uppercase",
            }}
          >
            FOUNDER SHOT
          </span>
        </div>

        {/* Quote + bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
            Stephen Uche · Creative Director, STUCHEWRLD Inc. A storyteller
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
              FOUNDER FILM
            </span>
            <button
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
              }}
            >
              WATCH THE FOUNDER FILM →
            </button>
          </div>
        </div>
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
