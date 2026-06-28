"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero({ bannerVideoUrl, bannerPosterUrl }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!isPlayerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPlayerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    playerRef.current?.play?.().catch(() => {});

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlayerOpen]);

  return (
    <section
      className="hero-section"
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
        className="container hero-content"
        style={{
          display: "flex",
          flexDirection: "column",
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
          className="hero-title"
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 1.05,
            color: "#F5E6D3",
            fontWeight: 500,
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
              disabled={!bannerVideoUrl}
              onClick={() => setIsPlayerOpen(true)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(245,230,211,0.3)",
                background: "none",
                cursor: bannerVideoUrl ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                opacity: bannerVideoUrl ? 1 : 0.45,
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
      {isPlayerOpen && bannerVideoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video player"
          onClick={() => setIsPlayerOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(1rem, 4vw, 3rem)",
          }}
        >
          <button
            type="button"
            aria-label="Close showreel"
            onClick={() => setIsPlayerOpen(false)}
            style={{
              position: "absolute",
              top: "clamp(1rem, 3vw, 2rem)",
              right: "clamp(1rem, 3vw, 2rem)",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid rgba(245,230,211,0.35)",
              background: "rgba(10,10,10,0.55)",
              color: "#F5E6D3",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              lineHeight: 1,
            }}
          >
            X
          </button>
          <video
            ref={playerRef}
            src={bannerVideoUrl}
            poster={bannerPosterUrl || undefined}
            controls
            playsInline
            autoPlay
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(100%, 1180px)",
              maxHeight: "82vh",
              aspectRatio: "16 / 9",
              background: "#050505",
              objectFit: "contain",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
            }}
          />
        </div>
      )}
    </section>
  );
}
