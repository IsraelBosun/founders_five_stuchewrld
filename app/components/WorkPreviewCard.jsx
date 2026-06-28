"use client";

import Link from "next/link";
import { useRef, useState } from "react";

function PlayCircle() {
  return (
    <div className="play-circle" aria-hidden="true">
      <svg width="9" height="11" viewBox="0 0 9 11" fill="#F5E6D3">
        <path d="M0 0 L9 5.5 L0 11 Z" />
      </svg>
    </div>
  );
}

export function WorkMedia({ project }) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const videoRef = useRef(null);
  const src = project.preview_url || project.video_url;
  const poster = project.thumbnail_url;

  function handleMouseEnter() {
    setIsPreviewing(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    setIsPreviewing(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className="work-media"
      style={{ background: project.gradient }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {poster && <img src={poster} alt="" aria-hidden="true" className="work-media-poster" />}
      {src && (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          muted
          playsInline
          loop
          preload="none"
          className="work-media-video"
          style={{ opacity: isPreviewing || !poster ? 1 : 0 }}
        />
      )}
      <div className="work-media-shade" />
      <div className="work-media-play">
        <PlayCircle />
      </div>
    </div>
  );
}

export default function WorkPreviewCard({ project, index, className = "" }) {
  return (
    <Link href={`/work/${project.slug}`} className={`work-preview-link ${className}`}>
      <article className="work-card">
        <WorkMedia project={project} />
        <div className="work-card-copy">
          <div className="work-card-meta-row">
            <p className="work-card-meta">{project.label}</p>
            {typeof index === "number" && <span className="work-card-index">{String(index + 1).padStart(2, "0")}</span>}
          </div>
          <h3 className="work-card-title">{project.title}</h3>
          <p className="work-card-client">{project.client}</p>
        </div>
      </article>
    </Link>
  );
}
