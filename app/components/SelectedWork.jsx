"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import WorkPreviewCard from "./WorkPreviewCard";

const filters = ["ALL", "MUSIC", "BRAND", "CORPORATE", "EVENTS"];

function ViewMoreCard({ active }) {
  const href = active === "ALL" ? "/work" : `/work?category=${encodeURIComponent(active)}`;
  return (
    <Link href={href} className="work-view-more-card">
      <span className="work-view-more-kicker">Archive</span>
      <strong>View more work</strong>
      <span className="work-view-more-line" />
      <small>All films, campaigns, events and brand stories.</small>
    </Link>
  );
}

export default function SelectedWork({ projects = [] }) {
  const [active, setActive] = useState("ALL");

  const reelProjects = useMemo(() => projects.filter((p) => p.category !== "BTS"), [projects]);
  const filtered = useMemo(
    () => (active === "ALL" ? reelProjects : reelProjects.filter((p) => p.category === active)),
    [active, reelProjects]
  );
  const homepageProjects = filtered.slice(0, 4);
  const showViewMore = filtered.length > 4 || active === "ALL";

  return (
    <section id="work" className="selected-work-section">
      <ScrollReveal className="section-pad selected-work-header" delay={40}>
        <div className="selected-work-topline">
          <span className="section-kicker">02 / SELECTED WORK</span>
          <div className="work-filters" aria-label="Work filters">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={active === f ? "is-active" : ""}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="selected-work-title-row">
          <h2>The reel.</h2>
          <p>Four sharp cuts from the archive. Swipe or scroll the row, then open the full body of work.</p>
        </div>
      </ScrollReveal>

      <div className="selected-work-viewport no-scrollbar">
        <div className="selected-work-track">
          {homepageProjects.map((project, index) => (
            <ScrollReveal key={project.slug} className="selected-work-card" delay={120 + index * 80}>
              <WorkPreviewCard project={project} index={index} />
            </ScrollReveal>
          ))}
          {showViewMore && (
            <ScrollReveal className="selected-work-card" delay={120 + homepageProjects.length * 80}>
              <ViewMoreCard active={active} />
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
