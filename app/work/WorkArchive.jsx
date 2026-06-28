"use client";

import { useMemo, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import WorkPreviewCard from "../components/WorkPreviewCard";

const filters = ["ALL", "MUSIC", "BRAND", "CORPORATE", "EVENTS", "OUTREACH", "BTS"];

export default function WorkArchive({ projects = [], initialCategory = "ALL" }) {
  const normalizedInitial = filters.includes(initialCategory) ? initialCategory : "ALL";
  const [active, setActive] = useState(normalizedInitial);

  const visible = useMemo(
    () => (active === "ALL" ? projects : projects.filter((project) => project.category === active)),
    [active, projects]
  );

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
        <span className="archive-count">{String(visible.length).padStart(2, "0")} pieces</span>
      </ScrollReveal>

      <div className="section-pad work-archive-grid">
        {visible.map((project, index) => (
          <ScrollReveal key={project.slug} className="archive-card" delay={(index % 6) * 70}>
            <WorkPreviewCard project={project} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
