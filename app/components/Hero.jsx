export default function Hero() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Constrained content */}
      <div
        className="container"
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {/* Top label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            fontSize: "10px",
            color: "#666666",
            textTransform: "uppercase",
          }}
        >
          EST. STUCHEWRLD INC · CINEMATIC STORYTELLING
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1.05,
            color: "#F5E6D3",
            fontWeight: 500,
            fontSize: "clamp(48px, 7vw, 96px)",
            maxWidth: "860px",
          }}
        >
          Every brand has
          <br />
          a story. We bring
          <br />
          <em>yours</em> to life.
        </h1>

        {/* Showreel row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              aria-label="Play showreel"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(245,230,211,0.3)",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12" fill="#F5E6D3">
                <path d="M0 0 L10 6 L0 12 Z" />
              </svg>
            </button>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em",
                fontSize: "10px",
                color: "#888888",
                textTransform: "uppercase",
              }}
            >
              SHOWREEL · 2026
            </span>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.2em",
              fontSize: "10px",
              color: "#666666",
              textTransform: "uppercase",
            }}
          >
            SCROLL ↓
          </span>
        </div>

        {/* Showreel blank card */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "linear-gradient(135deg, #0d1520 0%, #0a0e14 50%, #080808 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              aria-label="Play"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "1px solid rgba(245,230,211,0.2)",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="16" viewBox="0 0 10 12" fill="#F5E6D3" style={{ marginLeft: "2px", opacity: 0.6 }}>
                <path d="M0 0 L10 6 L0 12 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
