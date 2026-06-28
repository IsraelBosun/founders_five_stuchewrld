"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);

  const reelProjects = useMemo(() => projects.filter((p) => p.category !== "BTS"), [projects]);
  const filtered = useMemo(
    () => (active === "ALL" ? reelProjects : reelProjects.filter((p) => p.category === active)),
    [active, reelProjects]
  );
  const homepageProjects = filtered.slice(0, 4);
  const showViewMore = filtered.length > 4 || active === "ALL";

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track || window.innerWidth < 900) {
        setScrollDistance(0);
        setTrackOffset(0);
        return;
      }

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setScrollDistance(distance);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [homepageProjects.length, showViewMore, active]);

  useEffect(() => {
    if (!scrollDistance) return;

    function update() {
      const section = sectionRef.current;
      if (!section || window.innerWidth < 900) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));
      setTrackOffset(progress * scrollDistance);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="selected-work-section"
      style={{ "--work-scroll-distance": `${scrollDistance}px` }}
    >
      <div className="selected-work-sticky">
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
            <p>Four sharp cuts from the archive. Scroll through the row, then open the full body of work.</p>
          </div>
        </ScrollReveal>

        <div ref={viewportRef} className="selected-work-viewport no-scrollbar">
          <div
            ref={trackRef}
            className="selected-work-track"
            style={{ transform: `translate3d(${-trackOffset}px, 0, 0)` }}
          >
            {homepageProjects.map((project, index) => (
              <div key={project.slug} className="selected-work-card">
                <WorkPreviewCard project={project} index={index} />
              </div>
            ))}
            {showViewMore && (
              <div className="selected-work-card">
                <ViewMoreCard active={active} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
