export const bannerContentDefaults = {
  id: "main",
  hero_eyebrow: "EST. STUCHEWRLD INC \u00B7 CINEMATIC STORYTELLING",
  hero_headline: "Every brand has\na story. We bring\nyours to life.",
  hero_headline_emphasis: "yours",
  showreel_label: "SHOWREEL \u00B7 2026",
  scroll_label: "SCROLL \u2193",
  manifesto_label: "01 / MFSTO",
  manifesto_body:
    "We make films that don't let go. Cinematic storytelling that resonates long after the screen goes dark \u2014 for the brands and the dreamers building something worth watching.",
};

export function mergeBannerContent(content) {
  return {
    ...bannerContentDefaults,
    ...(content || {}),
  };
}
