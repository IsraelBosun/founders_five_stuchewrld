import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import VideoModal from "./VideoModal";

async function fetchProject(slug) {
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

async function fetchNextProject(slug) {
  const { data: all } = await supabase
    .from("projects")
    .select("slug, title, label, gradient")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (!all || all.length === 0) return null;
  const idx = all.findIndex((p) => p.slug === slug);
  return all[(idx + 1) % all.length];
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("projects")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — STUCHEWRLD Inc.`,
    description: project.synopsis,
  };
}

const mono = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.2em",
  fontSize: "10px",
  textTransform: "uppercase",
};

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const [project, next] = await Promise.all([fetchProject(slug), fetchNextProject(slug)]);
  if (!project) notFound();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>

      {/* Back nav */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1.25rem clamp(1.25rem, 3vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link
          href="/#work"
          style={{
            ...mono,
            color: "#666666",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "color 0.2s",
          }}
        >
          ← BACK
        </Link>

        <span
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.15em",
            fontSize: "13px",
            color: "rgba(245,230,211,0.5)",
            fontWeight: 500,
          }}
        >
          STUCHEWRLD
        </span>
      </div>

      {/* Hero — full bleed */}
      <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <VideoModal videoUrl={project.video_url} gradient={project.hero_gradient} label={project.title} fill />
        </div>

        {/* Title overlay — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "3rem clamp(1.25rem, 3vw, 3rem)",
            background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        >
          <p style={{ ...mono, color: "#888888", marginBottom: "0.75rem" }}>
            {project.label} · {project.year}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 500,
              color: "#F5E6D3",
              lineHeight: 1.05,
              maxWidth: "800px",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "#888888",
              marginTop: "0.5rem",
            }}
          >
            {project.client}
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: "1440px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(1.25rem, 3vw, 3rem)",
          paddingRight: "clamp(1.25rem, 3vw, 3rem)",
        }}
      >

        {/* Synopsis + story */}
        <div
          style={{
            paddingTop: "6rem",
            paddingBottom: "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div>
            <span style={{ ...mono, color: "#666666", display: "block", marginBottom: "1.5rem" }}>
              THE WORK
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontStyle: "italic",
                color: "#F5E6D3",
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              {project.synopsis}
            </p>
          </div>

          <div style={{ paddingTop: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                color: "#888888",
                lineHeight: 1.8,
              }}
            >
              {project.story}
            </p>
          </div>
        </div>

        {/* Full video */}
        <div style={{ paddingTop: "5rem", paddingBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ ...mono, color: "#666666", display: "block", marginBottom: "2rem" }}>
            THE FILM
          </span>
          <VideoModal videoUrl={project.video_url} gradient={project.hero_gradient} label="film" />
        </div>

        {/* Stills grid */}
        {(project.stills_urls?.length > 0) && (
          <div style={{ paddingTop: "5rem", paddingBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ ...mono, color: "#666666", display: "block", marginBottom: "2rem" }}>
              ON SET
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(project.stills_urls.length, 3)}, 1fr)`,
                gap: "0.75rem",
              }}
            >
              {project.stills_urls.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: i === 0 && project.stills_urls.length === 4 ? "16/9" : "3/4",
                    gridColumn: i === 0 && project.stills_urls.length === 4 ? "span 2" : "span 1",
                    background: `#111 url(${url}) center/cover no-repeat`,
                    overflow: "hidden",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Credits */}
        <div style={{ paddingTop: "4rem", paddingBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ ...mono, color: "#666666", display: "block", marginBottom: "2rem" }}>
            CREDITS
          </span>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.5rem 3rem",
            }}
          >
            {Object.entries(project.credits).map(([role, name]) => (
              <div key={role}>
                <dt style={{ ...mono, color: "#555555", fontSize: "9px", marginBottom: "4px" }}>
                  {role}
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "#E8E8E8",
                    margin: 0,
                  }}
                >
                  {name}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Testimonial — only if present */}
        {project.testimonial && (
          <div
            style={{
              paddingTop: "5rem",
              paddingBottom: "5rem",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              maxWidth: "720px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontStyle: "italic",
                color: "#F5E6D3",
                lineHeight: 1.5,
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              "{project.testimonial.quote}"
            </p>
            <p style={{ ...mono, color: "#555555" }}>
              — {project.testimonial.author}, {project.testimonial.role}
            </p>
          </div>
        )}

        {/* Next project */}
        <div style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
          <span style={{ ...mono, color: "#666666", display: "block", marginBottom: "2rem" }}>
            NEXT PROJECT
          </span>
          <Link
            href={`/work/${next.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              className="next-project-card"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "2rem",
                padding: "2.5rem",
                background: next.gradient,
              }}
            >
              <div>
                <p style={{ ...mono, color: "#888888", marginBottom: "0.5rem" }}>
                  {next.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    fontWeight: 500,
                    color: "#F5E6D3",
                    lineHeight: 1.1,
                  }}
                >
                  {next.title}
                </h3>
              </div>
              <span style={{ ...mono, color: "#888888", flexShrink: 0 }}>VIEW →</span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
