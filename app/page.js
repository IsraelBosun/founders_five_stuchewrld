import { supabase } from "../lib/supabase";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import SelectedWork from "./components/SelectedWork";
import TrustedBy from "./components/TrustedBy";
import OffCamera from "./components/OffCamera";
import Founder from "./components/Founder";
import Testimonial from "./components/Testimonial";
import BookSlot from "./components/BookSlot";
import Footer from "./components/Footer";

export default async function Home() {
  const videoCdn = process.env.NEXT_PUBLIC_VIDEO_CDN;
  const bannerVideoUrl = videoCdn ? `${videoCdn}/banner-hero.mp4` : "";
  const bannerPosterUrl = videoCdn ? `${videoCdn}/banner-hero-poster.jpg` : "";

  const { data: projects } = await supabase
    .from("projects")
    .select("slug, title, client, category, label, year, gradient, video_url, preview_url, thumbnail_url")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <Nav />
      <main>
        <Hero bannerVideoUrl={bannerVideoUrl} bannerPosterUrl={bannerPosterUrl} />
        <Manifesto />
        <SelectedWork projects={projects ?? []} />
        <TrustedBy />
        <OffCamera />
        <Founder />
        <Testimonial />
        <BookSlot />
      </main>
      <Footer />
    </>
  );
}
