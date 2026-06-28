"use client";

import { useMemo, useState } from "react";
import { btsPolaroids } from "../data/btsPolaroids";
import ScrollReveal from "../components/ScrollReveal";
import WorkPreviewCard from "../components/WorkPreviewCard";

const filters = ["ALL", "MUSIC", "BRAND", "CORPORATE", "EVENTS", "OUTREACH", "BTS"];

export default function WorkArchive({ projects = [], btsImages = [], initialCategory = "ALL" }) {
  const normalizedInitial = filters.includes(initialCategory) ? initialCategory : "ALL";
  const [active, setActive] = useState(normalizedInitial);

  const visible = useMemo(
    () => (active === "ALL" ? projects : projects.filter((project) => project.category === active)),
    [active, projects]
  );
  const showBtsStills = active === "BTS";
  const btsStills = btsImages.length > 0
    ? btsImages.map((image) => ({
        src: image.image_url,
        label: image.label,
        alt: image.alt_text || `BTS - ${image.label}`,
      }))
    : btsPolaroids;
  const visibleCount = visible.length + (showBtsStills ? btsStills.length : 0);

  return (
    <section className="work-archive">
      <ScrollReveal className="section-pad work-archive-hero" delay={40}>
        <span className="section-kicker">WORK / ARCHIVE</span>
        <div className="work-archive-heading">
          <h1>Films that carry the feeling.</h1>
          <p>
            Music visuals, brand stories, event coverage and off-camera moments from STUCHEWRLD.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="section-pad work-archive-toolbar" delay={120}>
        <div className="work-filters" aria-label="Archive filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={active === filter ? "is-active" : ""}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="archive-count">{String(visibleCount).padStart(2, "0")} pieces</span>
      </ScrollReveal>

      <div className="section-pad work-archive-grid">
        {visible.map((project, index) => (
          <ScrollReveal key={project.slug} className="archive-card" delay={(index % 6) * 70}>
            <WorkPreviewCard project={project} index={index} />
          </ScrollReveal>
        ))}
        {showBtsStills && btsStills.map((photo, index) => (
          <ScrollReveal key={photo.src} className="archive-card" delay={(index % 6) * 70}>
            <article className="bts-photo-card">
              <div className="bts-photo-card-media">
                <img src={photo.src} alt={photo.alt || `BTS - ${photo.label}`} />
              </div>
              <div className="work-card-copy">
                <div className="work-card-meta-row">
                  <p className="work-card-meta">BTS STILL</p>
                  <span className="work-card-index">{String(visible.length + index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="work-card-title">{photo.label}</h3>
                <p className="work-card-client">STUCHEWRLD Inc.</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
