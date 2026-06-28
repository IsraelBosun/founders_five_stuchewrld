export const contactContentDefaults = {
  id: "main",
  contact_kicker: "CONTACT / BOOKING",
  contact_headline: "Let's make the story impossible to ignore.",
  contact_body:
    "For brand storytelling, music videos, corporate events, social content, YouTube production, and films that need a cinematic pulse.",
  email: "stuchewrld.inc@gmail.com",
  whatsapp_display: "09034320189",
  whatsapp_url:
    "https://wa.me/2349034320189?text=Hi%2C%20I%27d%20like%20to%20book%20a%20slot%20with%20STUCHEWRLD%20Inc.",
  address: "Online only",
  hours: "Mon-Sat, 8am-8pm",
  email_button_label: "Email the studio",
  whatsapp_button_label: "WhatsApp booking",
  book_heading: "Got a story\nworth telling?",
  book_email_label: "BOOK A SLOT ↓",
  book_whatsapp_label: "WHATSAPP US",
  footer_brand: "STUCHEWRLD © 2026",
  socials: [
    {
      label: "Instagram",
      value: "Instagram.com/stuchewrldinc",
      href: "https://instagram.com/stuchewrldinc",
      footer_label: "IG",
      show_footer: true,
    },
    {
      label: "TikTok",
      value: "TikTok.com/stuchewrldinc",
      href: "https://tiktok.com/stuchewrldinc",
      footer_label: "TIKTOK",
      show_footer: true,
    },
    {
      label: "X",
      value: "X.com/stuchewrld.inc",
      href: "https://x.com/stuchewrld.inc",
      footer_label: "X",
      show_footer: false,
    },
    {
      label: "YouTube",
      value: "YouTube.com/stuchewrld.inc",
      href: "https://youtube.com/stuchewrld.inc",
      footer_label: "YT",
      show_footer: true,
    },
    {
      label: "Vimeo",
      value: "Vimeo.com/stuchewrldinc",
      href: "https://vimeo.com/stuchewrldinc",
      footer_label: "VIMEO",
      show_footer: true,
    },
  ],
};

export function normalizeSocials(socials) {
  return Array.isArray(socials)
    ? socials.map((social) => ({
        label: social?.label || "",
        value: social?.value || "",
        href: social?.href || "",
        footer_label: social?.footer_label || social?.label || "",
        show_footer: social?.show_footer !== false,
      }))
    : contactContentDefaults.socials;
}

export function mergeContactContent(content) {
  const merged = {
    ...contactContentDefaults,
    ...(content || {}),
  };

  return {
    ...merged,
    socials: normalizeSocials(merged.socials),
  };
}

export function getFooterSocials(content) {
  return mergeContactContent(content).socials.filter(
    (social) => social.show_footer && social.href && social.footer_label
  );
}
