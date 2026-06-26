"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const filters = ["ALL", "MUSIC", "BRAND", "CORPORATE", "EVENTS"];

function PlayCircle() {
  return (
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1px solid rgba(245,230,211,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      <svg width="9" height="11" viewBox="0 0 9 11" fill="#F5E6D3" style={{ marginLeft: "2px", opacity: 0.7 }}>
        <path d="M0 0 L9 5.5 L0 11 Z" />
      </svg>
    </div>
  );
}

function VideoCard({ project }) {
  const videoRef = useRef(null);
  const src = project.preview_url || project.video_url;

  function handleMouseEnter() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "3/4",
        background: project.gradient,
        position: "relative",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          loop
          preload="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ position: "absolute", top: "12px", right: "12px" }}>
        <PlayCircle />
      </div>
    </div>
  );
}

export default function SelectedWork({ projects = [] }) {
  const [active, setActive] = useState("ALL");
  const reelProjects = projects.filter((p) => p.category !== "BTS");

  const visible =
    active === "ALL" ? reelProjects : reelProjects.filter((p) => p.category === active);

  return (
    <section id="work" style={{ background: "#0A0A0A", paddingTop: "6rem" }}>
      {/* Header row */}
      <div
        className="section-pad"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.2em",
              fontSize: "10px",
              color: "#666666",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            02 / SELECTED WORK
          </span>

          {/* Filter chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: active === f ? "#F5E6D3" : "#666666",
                  transition: "color 0.2s",
                  padding: 0,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1.05,
            color: "#F5E6D3",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          The reel.
        </h2>
      </div>

      {/* Horizontal scroll — padding-left matches section-pad so cards align */}
      <div
        className="no-scrollbar"
        style={{
          overflowX: "auto",
          paddingLeft: "var(--page-px)",
          paddingRight: "var(--page-px)",
          paddingBottom: "5rem",
        }}
      >
        <div style={{ display: "flex", gap: "1.25rem", width: "max-content" }}>
          {visible.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              style={{ textDecoration: "none", flexShrink: 0, width: "clamp(280px, 26vw, 400px)" }}
            >
              <article className="work-card" style={{ cursor: "pointer" }}>
                <VideoCard project={project} />

                {/* Card info */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.15em",
                    fontSize: "9px",
                    color: "#666666",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {project.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    lineHeight: 1.1,
                    color: "#F5E6D3",
                    fontSize: "22px",
                    fontWeight: 500,
                  }}
                >
                  {project.title}
                </h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
