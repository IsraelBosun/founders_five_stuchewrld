import { createClient } from "@supabase/supabase-js";

// Public client — anon key, respects RLS. Safe to use in server and client components.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
