import { mergeBannerContent } from "../data/bannerContent";

export default function Manifesto({ content }) {
  const banner = mergeBannerContent(content);

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
        <span
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            fontSize: "10px",
            color: "#666666",
            textTransform: "uppercase",
          }}
        >
          {banner.manifesto_label}
        </span>

        <p
          style={{
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
            color: "#E8E8E8",
            fontSize: "clamp(18px, 2vw, 26px)",
            maxWidth: "640px",
          }}
        >
          {banner.manifesto_body}
        </p>
      </div>
    </section>
  );
}
