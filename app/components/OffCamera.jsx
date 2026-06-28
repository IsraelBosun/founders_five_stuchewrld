import { supabase } from "../../lib/supabase";
import { btsPolaroids } from "../data/btsPolaroids";
import ScrollReveal from "./ScrollReveal";

export default async function OffCamera() {
  const { data: btsVideos } = await supabase
    .from("projects")
    .select("slug, title, label, year, video_url, thumbnail_url")
    .eq("published", true)
    .eq("category", "BTS")
    .order("sort_order", { ascending: true })
    .limit(2);
  const { data: uploadedBtsImages } = await supabase
    .from("bts_images")
    .select("id, label, alt_text, image_url, sort_order, rotate")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  const polaroids = uploadedBtsImages?.length
    ? uploadedBtsImages.map((image) => ({
        src: image.image_url,
        label: image.label,
        alt: image.alt_text || `BTS - ${image.label}`,
        rotate: image.rotate || "0deg",
      }))
    : btsPolaroids;

  return (
    <section
      id="off-camera"
      className="section-pad"
      style={{
        background: "#111111",
        paddingTop: "7rem",
        paddingBottom: "7rem",
      }}
    >
      <ScrollReveal delay={40}>
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            fontSize: "10px",
            color: "#666666",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "2.5rem",
          }}
        >
          03 / OFF CAMERA
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1.05,
            color: "#F5E6D3",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 500,
            fontStyle: "italic",
            marginBottom: "1.25rem",
          }}
        >
          The cutting room.
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            lineHeight: 1.6,
            color: "#888888",
            fontSize: "15px",
            maxWidth: "480px",
            marginBottom: "4rem",
          }}
        >
          Behind every cinematic frame is a mess of cables, coffee cups, and
          creative chaos. This is where the magic actually happens.
        </p>
      </ScrollReveal>

      {(btsVideos?.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
            marginBottom: "4rem",
          }}
        >
          {btsVideos.map((video, index) => (
            <ScrollReveal
              key={video.slug}
              delay={120 + index * 80}
            >
              <article
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <video
                src={video.video_url}
                poster={video.thumbnail_url || undefined}
                controls
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  display: "block",
                  background: "#050505",
                }}
              />
              <div style={{ padding: "0.85rem 1rem 1rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.14em",
                    fontSize: "9px",
                    color: "#666666",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  {video.label || `BTS - ${video.year}`}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#F5E6D3",
                    lineHeight: 1.15,
                  }}
                >
                  {video.title}
                </h3>
              </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Polaroid grid */}
      <div
        className="bts-polaroid-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {polaroids.map((p, i) => (
          <ScrollReveal
            key={i}
            delay={(i % 4) * 70}
          >
            <div
            className="polaroid bts-polaroid-card"
            style={{
              background: "white",
              padding: "12px",
              paddingBottom: "36px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              transform: `rotate(${p.rotate})`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                background: "#111111",
                overflow: "hidden",
              }}
            >
              <img
                src={p.src}
                alt={p.alt || `BTS - ${p.label}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.12em",
                fontSize: "9px",
                color: "#999999",
                textTransform: "uppercase",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {p.label}
            </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}


