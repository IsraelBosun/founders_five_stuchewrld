"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "WORK", href: "#work" },
  { label: "OFF CAMERA", href: "#off-camera" },
  { label: "FOUNDER", href: "#founder" },
  { label: "CONTACT", href: "#contact" },
];

const monoBase = {
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.2em",
  fontSize: "10px",
  textTransform: "uppercase",
  textDecoration: "none",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "clamp(1.25rem, 3vw, 3rem)",
            paddingRight: "clamp(1.25rem, 3vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Wordmark */}
          <a
            href="/"
            onClick={closeMenu}
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.15em",
              fontSize: "14px",
              color: "#F5E6D3",
              fontWeight: 500,
              textDecoration: "none",
              flexShrink: 0,
              zIndex: 10,
            }}
          >
            STUCHEWRLD
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="nav-link"
                  style={{ ...monoBase, color: "#888888" }}
                >
                  {label}
                </a>
              ))}
              <a
                href="#book"
                className="btn-outline"
                style={{ ...monoBase, padding: "8px 16px", color: "#F5E6D3" }}
              >
                BOOK A SLOT
              </a>
            </nav>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
                width: "36px",
                height: "36px",
              }}
            >
              {/* Animate bars into X when open */}
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "#F5E6D3",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transformOrigin: "center",
                  transform: menuOpen ? "translateY(3.75px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "#F5E6D3",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transformOrigin: "center",
                  transform: menuOpen ? "translateY(-3.75px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          )}
        </div>
      </header>

      {/* Mobile full-screen menu overlay */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "clamp(1.25rem, 3vw, 3rem)",
            paddingRight: "clamp(1.25rem, 3vw, 3rem)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {links.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                onClick={closeMenu}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px, 9vw, 56px)",
                  fontWeight: 500,
                  color: "#F5E6D3",
                  textDecoration: "none",
                  lineHeight: 1.15,
                  paddingTop: "0.6rem",
                  paddingBottom: "0.6rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  transition: `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                }}
              >
                {label}
              </a>
            ))}

            <a
              href="#book"
              onClick={closeMenu}
              style={{
                marginTop: "2rem",
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em",
                fontSize: "11px",
                textTransform: "uppercase",
                color: "#F5E6D3",
                textDecoration: "none",
                border: "1px solid rgba(245,230,211,0.4)",
                padding: "12px 24px",
                transition: `opacity 0.3s ease ${links.length * 0.06 + 0.05}s, transform 0.3s ease ${links.length * 0.06 + 0.05}s`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
              }}
            >
              BOOK A SLOT
            </a>
          </nav>

          {/* Bottom socials row */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "clamp(1.25rem, 3vw, 3rem)",
              right: "clamp(1.25rem, 3vw, 3rem)",
              display: "flex",
              gap: "2rem",
              transition: `opacity 0.3s ease 0.3s`,
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {["IG", "TIKTOK", "YT", "VIMEO"].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#666666",
                  textTransform: "uppercase",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
