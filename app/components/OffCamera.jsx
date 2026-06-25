import Image from "next/image";

const polaroids = [
  { src: "/bts/photo_1.jpeg", label: "SET · A4:24", rotate: "-2deg" },
  { src: "/bts/photo_2.jpeg", label: "GHP · B30", rotate: "1.5deg" },
  { src: "/bts/photo_3.jpeg", label: "LAPS", rotate: "-1deg" },
  { src: "/bts/photo_4.jpeg", label: "LAGOS · 12PM", rotate: "2deg" },
  { src: "/bts/photo_5.jpeg", label: "SET · CALL", rotate: "-1.5deg" },
  { src: "/bts/photo_6.jpeg", label: "TAKE TWO", rotate: "1deg" },
  { src: "/bts/photo_7.jpeg", label: "GRIP · 09AM", rotate: "-0.5deg" },
  { src: "/bts/photo_8.jpeg", label: "WRAP", rotate: "2.5deg" },
];

export default function OffCamera() {
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

      {/* Polaroid grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {polaroids.map((p, i) => (
          <div
            key={i}
            className="polaroid"
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
              <Image
                src={p.src}
                alt={`BTS — ${p.label}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 200px"
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
        ))}
      </div>
    </section>
  );
}
