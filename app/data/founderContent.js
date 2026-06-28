export const founderContentDefaults = {
  id: "main",
  section_kicker: "04 / THE FOUNDER",
  name: "STEPHEN UCHE",
  role: "Creative Director",
  image_url: "/bts/photo_4.jpeg",
  image_alt: "Stephen Uche filming behind the scenes",
  image_caption: "On set / Lagos",
  homepage_quote: "I don't shoot scenes.\nI chase feelings.",
  homepage_body:
    "Stephen Uche, Creative Director of STUCHEWRLD Inc. A storyteller behind the lens for over a decade, building visual worlds for brands and artists across the continent.",
  homepage_profile_label: "FOUNDER PROFILE",
  homepage_link_text: "VIEW MORE",
  page_eyebrow: "Stephen Uche / Creative Director",
  page_title: "Behind the lens, chasing the feeling.",
  page_lede:
    "Stephen Uche is the founder and creative director of STUCHEWRLD Inc., a cinematic storytelling studio built around films that carry mood, memory, and meaning.",
  page_quote: "I don't shoot scenes. I chase feelings.",
  story_body_one:
    "His work sits between brand film, music visuals, event coverage, and documentary-style storytelling. The throughline is simple: make the subject feel alive before it feels produced.",
  story_body_two:
    "STUCHEWRLD was shaped for clients who want more than clean footage. The studio builds visual worlds around people, products, founders, stages, launches, and campaigns, then turns those moments into films that can travel.",
  note_one_title: "Direction",
  note_one_body: "Finding the emotional center of the story before the camera rolls.",
  note_two_title: "Production",
  note_two_body: "Building lean, cinematic shoots for brands, artists, and events.",
  note_three_title: "Post",
  note_three_body: "Shaping rhythm, color, sound, and sequence until the film holds.",
};

export function mergeFounderContent(content) {
  return { ...founderContentDefaults, ...(content || {}) };
}
