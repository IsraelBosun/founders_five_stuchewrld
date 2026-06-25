export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="section-pad"
      style={{
        background: "#0A0A0A",
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
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
          }}
        >
          01 / MFSTO
        </span>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
            color: "#E8E8E8",
            fontSize: "clamp(18px, 2vw, 26px)",
            maxWidth: "640px",
          }}
        >
          We make films that don&apos;t let go. Cinematic storytelling that
          resonates long after the screen goes dark — for the brands and the
          dreamers building something worth watching.
        </p>
      </div>
    </section>
  );
}
