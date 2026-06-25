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
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, title, client, category, label, year, gradient, video_url, preview_url")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <Nav />
      <main style={{ maxWidth: "1440px", marginLeft: "auto", marginRight: "auto", paddingLeft: "clamp(1.25rem, 3vw, 3rem)", paddingRight: "clamp(1.25rem, 3vw, 3rem)" }}>
        <Hero />
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
