const socials = [
  { label: "IG", href: "https://instagram.com/stuchewrldinc" },
  { label: "TIKTOK", href: "https://tiktok.com/stuchewrldinc" },
  { label: "YT", href: "https://youtube.com/stuchewrld.inc" },
  { label: "VIMEO", href: "https://vimeo.com/stuchewrldinc" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="section-pad"
      style={{
        background: "#050505",
        paddingTop: "1.75rem",
        paddingBottom: "1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "0.15em",
          fontSize: "13px",
          color: "rgba(245,230,211,0.45)",
          fontWeight: 500,
        }}
      >
        STUCHEWRLD © 2026
      </span>

      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.2em",
              fontSize: "10px",
              color: "#666666",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
