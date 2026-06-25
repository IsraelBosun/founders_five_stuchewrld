"use client";
import { useRef, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TrustedBy() {
  const [logos, setLogos] = useState([]);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const pausedRef = useRef(false);
  const animRef = useRef(null);
  const [dragging, setDragging] = useState(false);


  
  useEffect(() => {
    supabase
      .from("client_logos")
      .select("*")
      .order("sort_order")
      .then(({ data }) => setLogos(data ?? []));
  }, []);

  const doubled = [...logos, ...logos];

  useEffect(() => {
    if (logos.length === 0) return;
    const speed = 0.6;

    const tick = () => {
      if (!pausedRef.current) offsetRef.current += speed;

      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          offsetRef.current = ((offsetRef.current % halfWidth) + halfWidth) % halfWidth;
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [logos]);

  const startDrag = (clientX) => {
    pausedRef.current = true;
    dragRef.current = { active: true, startX: clientX, startOffset: offsetRef.current };
    setDragging(true);
  };

  const moveDrag = (clientX) => {
    if (!dragRef.current.active) return;
    const delta = dragRef.current.startX - clientX;
    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      offsetRef.current = ((dragRef.current.startOffset + delta) % halfWidth + halfWidth) % halfWidth;
    }
  };

  const endDrag = () => {
    dragRef.current.active = false;
    pausedRef.current = false;
    setDragging(false);
  };

  if (logos.length === 0) return null;

  return (
    <section
      style={{
        background: "#0A0A0A",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}
    >
      <div style={{ marginBottom: "2.5rem", paddingLeft: "clamp(1.25rem, 3vw, 3rem)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            fontSize: "10px",
            color: "#666666",
            textTransform: "uppercase",
          }}
        >
          TRUSTED BY
        </span>
      </div>

      <div
        style={{ overflow: "hidden", cursor: dragging ? "grabbing" : "grab", userSelect: "none" }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
        onTouchEnd={endDrag}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7rem",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {doubled.map((logo, i) => (
            <img
              key={i}
              src={logo.logo_url}
              alt={logo.name}
              draggable={false}
              style={{
                maxHeight: "64px",
                maxWidth: "200px",
                width: "auto",
                height: "auto",
                flexShrink: 0,
                opacity: 0.85,
                userSelect: "none",
                pointerEvents: "none",
                display: "block",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
