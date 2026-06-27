export default function Hero({ bannerVideoUrl, bannerPosterUrl }) {
  return (
    <section
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {bannerVideoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={bannerPosterUrl || undefined}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.45,
          }}
        >
          <source src={bannerVideoUrl} type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.72) 66%, #0A0A0A 100%)",
        }}
      />
      {/* Constrained content */}
      <div
        className="container"
        style={{
          paddingTop: "120px",
          paddingBottom: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          position: "relative",
          zIndex: 1,
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

      </div>
    </section>
  );
}
