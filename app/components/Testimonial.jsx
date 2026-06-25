export default function Testimonial() {
  return (
    <section
      className="section-pad"
      style={{
        background: "#111111",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <blockquote style={{ margin: 0 }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 1.3,
              color: "#F5E6D3",
              fontSize: "clamp(24px, 3.5vw, 48px)",
              fontWeight: 500,
              fontStyle: "italic",
              marginBottom: "2.5rem",
            }}
          >
            &ldquo;Oh wow&hellip; this is super super. You guys did a wonderful
            job. This will hit our socials in a big way.&rdquo;
          </p>

          <footer>
            <cite
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.15em",
                fontSize: "10px",
                color: "#666666",
                textTransform: "uppercase",
                fontStyle: "normal",
              }}
            >
              — CHRIS OLOBO · DHAMANA GUARANTEE COMPANY
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
