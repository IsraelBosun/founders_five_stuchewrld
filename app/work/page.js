import { supabase } from "../../lib/supabase";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import WorkArchive from "./WorkArchive";

export const metadata = {
  title: "Work - STUCHEWRLD Inc.",
  description: "Selected films, brand stories, event coverage and BTS work from STUCHEWRLD Inc.",
};

export default async function WorkIndexPage({ searchParams }) {
  const params = await searchParams;
  const initialCategory = typeof params?.category === "string" ? params.category.toUpperCase() : "ALL";

  const { data: projects } = await supabase
    .from("projects")
    .select("slug, title, client, category, label, year, gradient, video_url, preview_url, thumbnail_url")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  const { data: btsImages } = await supabase
    .from("bts_images")
    .select("id, label, alt_text, image_url, sort_order, rotate")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <Nav />
      <main>
        <WorkArchive projects={projects ?? []} btsImages={btsImages ?? []} initialCategory={initialCategory} />
      </main>
      <Footer />
    </>
  );
}
